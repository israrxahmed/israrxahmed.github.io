import { describe, it, expect } from 'vitest';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

/**
 * Production-artifact regression guards.
 *
 * AUDIT CONTEXT: the original audit shipped with every alpha-tinted cyan/violet
 * utility silently missing from the built CSS (Tailwind dropped classes whose
 * palette entries could not accept an alpha value) and with no SEO metadata.
 * These tests fail if either condition regresses.
 */
const distDir = path.resolve(__dirname, '../dist');
const distAvailable = existsSync(distDir);

describe.skipIf(!distAvailable)('production build artifacts', () => {
  const assetsDir = path.join(distDir, 'assets');
  const cssFile = readdirSync(assetsDir).find((f) => f.endsWith('.css'));
  const css = cssFile ? readFileSync(path.join(assetsDir, cssFile), 'utf8') : '';

  it('emits CSS for opacity-modified brand utilities (AUD-UI-001 regression guard)', () => {
    expect(cssFile, 'no CSS bundle found in dist/assets').toBeTruthy();
    for (const cls of [
      '.bg-cyan-500\\/10',
      '.bg-violet-500\\/5',
      '.border-cyan-500\\/30',
      '.from-cyan-500\\/20',
      '.text-cyan-500\\/70',
    ]) {
      expect(css.includes(cls), `built CSS is missing ${cls}`).toBe(true);
    }
  });

  it('index.html carries description + social metadata and a resolvable favicon', () => {
    const html = readFileSync(path.join(distDir, 'index.html'), 'utf8');
    expect(html).toContain('name="description"');
    expect(html).toContain('property="og:title"');
    expect(html.match(/rel="icon"[^>]*href="([^"]+)"/)).toBeTruthy();
  });

  it('does not ship unreferenced backup assets', () => {
    expect(existsSync(path.join(distDir, 'hero-portrait_backup.jpg'))).toBe(false);
  });
});
