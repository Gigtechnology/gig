const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Escapes text and wraps [PLACEHOLDER] tokens in a visible marker so the client can spot them. */
export function mark(text: string | undefined | null): string {
  if (!text) return '';
  return escape(text).replace(/\[[A-Z0-9_ ]+(?::[^\]]*)?\]/g, (m) => `<span class="todo">${m}</span>`);
}

export const isPlaceholder = (v: unknown) => typeof v === 'string' && /^\[[A-Z0-9_]+\]$/.test(v.trim());

/** US date format MM/DD/YYYY */
export function usDate(input: string | Date): string {
  const d = typeof input === 'string' ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return '';
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  return `${mm}/${dd}/${d.getUTCFullYear()}`;
}
