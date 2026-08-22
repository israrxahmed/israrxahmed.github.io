import { z } from 'zod';
import type { ContactFormData } from '@/types/portfolio.types';

export type SubmissionStatus = 'sent' | 'handed-off' | 'error';

export interface SubmissionResult {
  status: SubmissionStatus;
  headline: string;
  detail: string;
}

const MAILTO_BODY_LIMIT = 1800;

const contactPayloadSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  message: z.string().trim().min(10).max(5000),
});

const getEndpoint = (): string => {
  const raw = import.meta.env.VITE_CONTACT_ENDPOINT;
  return typeof raw === 'string' ? raw.trim() : '';
};

export const buildMailtoUrl = (
  recipient: string,
  data: ContactFormData,
  subjectPrefix = 'Portfolio contact'
): string => {
  let message = data.message;
  if (message.length > MAILTO_BODY_LIMIT) {
    message = `${message.slice(0, MAILTO_BODY_LIMIT)}\n\n[Message truncated for email-client compatibility]`;
  }
  const subject = `${subjectPrefix} from ${data.name}`;
  const body = `${message}\n\n—\n${data.name}\n${data.email}`;
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

/**
 * Submits the contact form through the configured channel.
 *
 * - VITE_CONTACT_ENDPOINT set  -> POST JSON to that endpoint (e.g. Formspree).
 *   Returns 'sent' only when the endpoint confirms delivery (2xx).
 * - No endpoint configured     -> hands the composed message to the visitor's
 *   own email client via mailto:. Delivery happens there, so the UI must not
 *   claim a completed send.
 */
export async function submitContact(
  data: ContactFormData,
  recipientEmail: string,
  navigate: (url: string) => void = (url) => {
    window.location.href = url;
  }
): Promise<SubmissionResult> {
  // Validate at the trust boundary before anything leaves the application.
  const parsed = contactPayloadSchema.safeParse(data);
  if (!parsed.success) {
    return {
      status: 'error',
      headline: 'Please review your details',
      detail: 'Some fields are incomplete or invalid. Check the highlighted inputs and try again.',
    };
  }
  const payload = parsed.data;
  const endpoint = getEndpoint();

  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Endpoint responded with ${response.status}`);
      }
      return {
        status: 'sent',
        headline: 'Message Sent!',
        detail: 'Thank you for reaching out. I’ll get back to you soon.',
      };
    } catch {
      return {
        status: 'error',
        headline: 'Something went wrong',
        detail: `Your message could not be delivered. Please email me directly at ${recipientEmail}.`,
      };
    }
  }

  const url = buildMailtoUrl(recipientEmail, payload);
  navigate(url);
  return {
    status: 'handed-off',
    headline: 'Open your email app',
    detail: `Your email draft has been prepared to ${recipientEmail}. Please press send there to deliver your message.`,
  };
}
