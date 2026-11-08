// Shared quote-form validation (used by the browser and by /api/quote)
import services from '../data/services.json';

export const SERVICE_OPTIONS = services.map((s) => ({ value: s.slug, label: s.title }));

export interface QuoteInput {
  name: string;
  phone: string;
  email: string;
  service: string;
  location: string;
  message: string;
  urgent: string;
}

export type QuoteErrors = Partial<Record<keyof QuoteInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ZIP_RE = /^\d{5}(-\d{4})?$/;

export const digits = (s: string) => s.replace(/\D/g, '');

export function validateQuote(input: Partial<QuoteInput>): QuoteErrors {
  const e: QuoteErrors = {};
  const v = (k: keyof QuoteInput) => (input[k] ?? '').toString().trim();

  if (v('name').length < 2) e.name = 'Please enter your name.';
  else if (v('name').length > 100) e.name = 'Name is too long.';

  const ph = digits(v('phone'));
  const ph10 = ph.length === 11 && ph.startsWith('1') ? ph.slice(1) : ph;
  if (!ph) e.phone = 'Please enter your phone number.';
  else if (ph10.length !== 10) e.phone = 'Please enter a valid 10-digit US phone number.';

  if (!v('email')) e.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(v('email')) || v('email').length > 200) e.email = 'Please enter a valid email address.';

  if (!SERVICE_OPTIONS.some((o) => o.value === v('service'))) e.service = 'Please choose a service.';

  const loc = v('location');
  if (!loc) e.location = 'Please enter your borough or ZIP code.';
  else if (/^\d/.test(loc) && !ZIP_RE.test(loc)) e.location = 'Please enter a valid 5-digit ZIP code.';
  else if (loc.length > 80) e.location = 'Too long.';

  if (v('message').length < 10) e.message = 'Please describe your project (at least 10 characters).';
  else if (v('message').length > 3000) e.message = 'Message is too long (3,000 characters max).';

  if (!['yes', 'no'].includes(v('urgent'))) e.urgent = 'Please tell us if this is urgent.';

  return e;
}

export function formatPhone(raw: string): string {
  let d = digits(raw);
  if (d.length === 11 && d.startsWith('1')) d = d.slice(1);
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : raw;
}

/** Quick "call me back" form (hero): service + phone + borough/ZIP only */
export interface CallbackInput {
  service: string;
  phone: string;
  location: string;
}

export function validateCallback(input: Partial<CallbackInput>): Partial<Record<keyof CallbackInput, string>> {
  const full = validateQuote({ name: 'Callback', email: 'callback@example.com', message: 'Callback request', urgent: 'no', ...input });
  const e: Partial<Record<keyof CallbackInput, string>> = {};
  for (const k of ['service', 'phone', 'location'] as const) if (full[k]) e[k] = full[k];
  return e;
}
