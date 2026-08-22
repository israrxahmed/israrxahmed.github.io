import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { submitContact, buildMailtoUrl } from '@/lib/contactSubmission';
import type { ContactFormData } from '@/types/portfolio.types';

const validData: ContactFormData = {
  name: 'Jane Recruiter',
  email: 'jane@example.com',
  message: 'We have a senior electrical engineering role you may be interested in.',
};

describe('contact submission', () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('rejects payloads that fail validation without contacting anything', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const navigate = vi.fn();

    const result = await submitContact(
      { name: '', email: 'not-an-email', message: 'short' },
      'me@example.com',
      navigate
    );

    expect(result.status).toBe('error');
    expect(fetchMock).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });

  it('POSTs JSON to the configured endpoint and reports success only on 2xx', async () => {
    vi.stubEnv('VITE_CONTACT_ENDPOINT', 'https://forms.example.com/abc');
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal('fetch', fetchMock);
    const navigate = vi.fn();

    const result = await submitContact(validData, 'me@example.com', navigate);

    expect(result.status).toBe('sent');
    expect(result.headline).toBe('Message Sent!');
    expect(fetchMock).toHaveBeenCalledWith(
      'https://forms.example.com/abc',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          name: validData.name,
          email: validData.email,
          message: validData.message,
        }),
      })
    );
    expect(navigate).not.toHaveBeenCalled();
  });

  it('reports an error state (never success) when the endpoint fails', async () => {
    vi.stubEnv('VITE_CONTACT_ENDPOINT', 'https://forms.example.com/abc');
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 500 });
    vi.stubGlobal('fetch', fetchMock);

    const result = await submitContact(validData, 'me@example.com', vi.fn());

    expect(result.status).toBe('error');
    expect(result.detail).toContain('me@example.com');
  });

  it('reports an error state when the network request throws', async () => {
    vi.stubEnv('VITE_CONTACT_ENDPOINT', 'https://forms.example.com/abc');
    const fetchMock = vi.fn().mockRejectedValue(new TypeError('network down'));
    vi.stubGlobal('fetch', fetchMock);

    const result = await submitContact(validData, 'me@example.com', vi.fn());

    expect(result.status).toBe('error');
  });

  it('falls back to an honest mailto hand-off (not fake success) with no endpoint', async () => {
    vi.stubEnv('VITE_CONTACT_ENDPOINT', '');
    const navigate = vi.fn();

    const result = await submitContact(validData, 'me@example.com', navigate);

    expect(navigate).toHaveBeenCalledTimes(1);
    const url = navigate.mock.calls[0][0] as string;
    expect(url.startsWith('mailto:me@example.com?')).toBe(true);
    expect(decodeURIComponent(url)).toContain(validData.message);
    expect(decodeURIComponent(url)).toContain(validData.email);
    // The UI must not claim the message was already delivered.
    expect(result.headline).not.toBe('Message Sent!');
    expect(result.detail.toLowerCase()).toContain('email');
  });

  it('truncates over-long mailto bodies for email-client compatibility', () => {
    const longData: ContactFormData = { ...validData, message: 'x'.repeat(3000) };
    const url = buildMailtoUrl('me@example.com', longData);
    expect(url.length).toBeLessThan(4200);
    expect(decodeURIComponent(url)).toContain('[Message truncated');
  });
});
