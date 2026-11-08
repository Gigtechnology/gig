import type { APIRoute } from 'astro';
import { RESEND_API_KEY, QUOTE_TO_EMAIL, QUOTE_FROM_EMAIL } from 'astro:env/server';
import site from '../../data/site.json';
import { validateQuote, validateCallback, formatPhone, SERVICE_OPTIONS, type QuoteInput } from '../../lib/quote';

export const prerender = false; // Vercel serverless function

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export const POST: APIRoute = async ({ request }) => {
  // Maintenance mode: the site is suspended, no request is accepted
  if (site.maintenance) return json({ ok: false, message: 'This website is temporarily unavailable.' }, 503);
  let body: Record<string, unknown>;
  try {
    const type = request.headers.get('content-type') ?? '';
    body = type.includes('application/json') ? await request.json() : Object.fromEntries(await request.formData());
  } catch {
    return json({ ok: false, message: 'Invalid request.' }, 400);
  }

  // Anti-spam: honeypot filled, or form submitted < 3 s after load → pretend success, send nothing
  const ts = Number(body.ts);
  if (String(body.company_website ?? '').trim() !== '' || (ts && Date.now() - ts < 3000)) {
    return json({ ok: true });
  }

  const data: QuoteInput = {
    name: String(body.name ?? '').trim(),
    phone: String(body.phone ?? '').trim(),
    email: String(body.email ?? '').trim(),
    service: String(body.service ?? '').trim(),
    location: String(body.location ?? '').trim(),
    message: String(body.message ?? '').trim(),
    urgent: String(body.urgent ?? '').trim(),
  };
  const isCallback = body.type === 'callback';
  const errors = isCallback ? validateCallback(data) : validateQuote(data);
  if (Object.keys(errors).length) {
    return json({ ok: false, message: 'Please correct the highlighted fields.', errors }, 422);
  }

  const service = SERVICE_OPTIONS.find((o) => o.value === data.service)?.label ?? data.service;
  const urgent = data.urgent === 'yes';
  const subject = isCallback
    ? `Call back request: ${service} - ${formatPhone(data.phone)}`
    : `${urgent ? '[URGENT] ' : ''}New quote request: ${service} - ${data.name}`;
  const rows: [string, string][] = isCallback
    ? [
        ['Request', 'Please call this customer back'],
        ['Phone', formatPhone(data.phone)],
        ['Service', service],
        ['Borough / ZIP', data.location],
      ]
    : [
    ['Name', data.name],
    ['Phone', formatPhone(data.phone)],
    ['Email', data.email],
    ['Service', service],
    ['Borough / ZIP', data.location],
    ['Emergency', urgent ? 'YES' : 'No'],
    ['Message', data.message],
  ];
  const html = `<h2 style="font-family:Arial,sans-serif;color:#0a1f5c">${esc(subject)}</h2>
<table style="font-family:Arial,sans-serif;font-size:15px;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="padding:6px 14px 6px 0;font-weight:bold;vertical-align:top">${k}</td><td style="padding:6px 0;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join('')}</table>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');

  if (!RESEND_API_KEY) {
    // Local / preview simulation
    console.info('[quote] SIMULATED (no RESEND_API_KEY)\n' + subject + '\n' + text);
    return json({ ok: true, simulated: true });
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: QUOTE_FROM_EMAIL || 'GIG Technology Website <onboarding@resend.dev>',
        to: (QUOTE_TO_EMAIL || site.email).split(',').map((s) => s.trim()),
        ...(isCallback ? {} : { reply_to: data.email }),
        subject,
        html,
        text,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      console.error('[quote] Resend error', res.status, await res.text());
      return json({ ok: false, message: `We couldn't send your request. Please call us at ${site.phone.display}.` }, 502);
    }
    return json({ ok: true });
  } catch (err) {
    console.error('[quote] Resend failure', err);
    return json({ ok: false, message: `We couldn't send your request. Please call us at ${site.phone.display}.` }, 502);
  }
};

export const ALL: APIRoute = () => json({ ok: false, message: 'Method not allowed' }, 405);
