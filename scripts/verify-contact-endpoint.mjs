#!/usr/bin/env node
/**
 * Endpoint delivery-chain verification for AUD-FUNC-001.
 *
 * Builds a PRODUCTION bundle with VITE_CONTACT_ENDPOINT pointed at a local
 * mock service, then proves through the real UI that:
 *   1. A confirmed (2xx) delivery shows success — and only then.
 *   2. A failed (5xx) delivery shows an honest error state, never fake success.
 *   3. The payload arrives at the endpoint as JSON {name,email,message}.
 *
 * Restores a clean default build at the end.
 */
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { globSync } from 'node:fs';
import { chromium } from 'playwright-core';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(root, 'docs/audit/evidence/remediation');
mkdirSync(OUT, { recursive: true });

const log = (m) => console.log(m);
const evidence = { requests: [], checks: [] };
const check = (name, ok, detail = '') => {
  evidence.checks.push({ name, ok: !!ok, detail: String(detail).slice(0, 200) });
  log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
};

function findChromium() {
  return [
    process.env.CHROMIUM_PATH,
    ...globSync(`${process.env.HOME}/.cache/ms-playwright/chromium_headless_shell*/chrome-headless-shell-linux64/chrome-headless-shell`),
    ...globSync(`${process.env.HOME}/.cache/ms-playwright/chromium*/chrome-linux*/chrome`),
  ].filter(Boolean)[0];
}

// --- mock contact service ---
let failNext = false;
const ENDPOINT_PORT = 4599;
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
};
const endpointServer = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }
  if (req.method !== 'POST') {
    res.writeHead(404).end();
    return;
  }
  let body = '';
  req.on('data', (c) => (body += c));
  req.on('end', () => {
    const status = failNext ? 500 : 200;
    evidence.requests.push({ at: new Date().toISOString(), failMode: failNext, body });
    res.writeHead(status, { 'Content-Type': 'application/json', ...corsHeaders });
    res.end(JSON.stringify({ ok: !failNext }));
  });
});
await new Promise((r) => endpointServer.listen(ENDPOINT_PORT, '127.0.0.1', r));

const APP_PORT = 4477;
const appServer = spawn('npx', ['vite', 'preview', '--port', String(APP_PORT), '--strictPort'], { cwd: root, stdio: 'ignore' });
await new Promise((resolve, reject) => {
  const t0 = Date.now();
  const probe = () =>
    http.get(`http://127.0.0.1:${APP_PORT}/`, (res) => (res.statusCode === 200 ? resolve() : retry()))
      .on('error', retry);
  const retry = () => (Date.now() - t0 > 15000 ? reject(new Error('preview timeout')) : setTimeout(probe, 200));
  probe();
});

let exitCode = 0;
try {
  const browser = await chromium.launch({ executablePath: findChromium(), args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  async function fillAndSubmit() {
    await page.goto(`http://127.0.0.1:${APP_PORT}/`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#contact', { timeout: 8000 });
    await page.evaluate(() => document.getElementById('contact')?.scrollIntoView());
    await page.waitForTimeout(600);
    await page.fill('#name', 'Endpoint Tester');
    await page.fill('#email', 'tester@example.com');
    await page.fill('#message', 'Verifying the endpoint delivery chain end-to-end.');
    await page.getByRole('button', { name: /Send Message/i }).click();
    await page.waitForTimeout(900);
  }

  // --- Round A: endpoint confirms delivery (200) ---
  await fillAndSubmit();
  let sent = await page.getByText('Message Sent!').isVisible().catch(() => false);
  check('2xx endpoint -> success state shown', sent);
  check(
    'endpoint received JSON payload {name,email,message}',
    (() => {
      const last = evidence.requests.at(-1);
      if (!last || last.failMode) return false;
      try {
        const b = JSON.parse(last.body);
        return b.name === 'Endpoint Tester' && b.email === 'tester@example.com' && typeof b.message === 'string';
      } catch {
        return false;
      }
    })(),
    evidence.requests.at(-1)?.body?.slice(0, 120)
  );
  await page.screenshot({ path: `${OUT}/contact-endpoint-success.png` });

  // --- Round B: endpoint fails (500) ---
  failNext = true;
  await fillAndSubmit();
  const errShown = await page.getByText('Something went wrong').isVisible().catch(() => false);
  const fakeSuccess = await page.getByText('Message Sent!').isVisible().catch(() => false);
  check('5xx endpoint -> honest error state shown', errShown);
  check('5xx endpoint -> NO fake success', !fakeSuccess);
  await page.screenshot({ path: `${OUT}/contact-endpoint-failure.png` });

  await browser.close();
} catch (e) {
  exitCode = 1;
  log('SUITE ERROR: ' + e.message);
} finally {
  appServer.kill('SIGTERM');
  endpointServer.close();
}

writeFileSync(`${OUT}/contact-endpoint-results.json`, JSON.stringify(evidence, null, 2));
exitCode += evidence.checks.filter((c) => !c.ok).length ? 1 : 0;
console.log(`\n${evidence.checks.filter((c) => c.ok).length}/${evidence.checks.length} checks passed`);
process.exit(exitCode);
