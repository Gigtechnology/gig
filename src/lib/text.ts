const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Editorial notes in the data, e.g. [TO_CONFIRM], [ABOUT_TEXT_TO_PROVIDE], [TEAM_TEXT_TO_PROVIDE: ...]
// They are stripped from the public site.
const ANNOTATION = /\s*\[(?:TO_CONFIRM|[A-Z0-9_]+_TO_(?:PROVIDE|CONFIRM))(?::[^\]]*)?\]\s*/g;
// Missing values, e.g. [HOURS], [EMERGENCY_HOURS]: anything that depends on them is hidden.
const MISSING = /\[[A-Z0-9_]+(?::[^\]]*)?\]/;

/**
 * Public-safe text: removes editorial notes; returns null when the text is empty
 * or still depends on a missing value (so the caller hides the element).
 */
export function clean(text: string | undefined | null): string | null {
  if (!text) return null;
  const t = text.replace(ANNOTATION, ' ').replace(/\s{2,}/g, ' ').trim();
  if (!t || MISSING.test(t)) return null;
  return t;
}

/** Escaped, public-safe HTML string ('' when the text should be hidden). */
export const mark = (text: string | undefined | null): string => {
  const t = clean(text);
  return t ? escape(t) : '';
};

export const usable = (text: string | undefined | null) => clean(text) !== null;

export const isPlaceholder = (v: unknown) => typeof v === 'string' && /^\[[A-Z0-9_]+\]$/.test(v.trim());

/** US date format MM/DD/YYYY */
export function usDate(input: string | Date): string {
  const d = typeof input === 'string' ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return '';
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  return `${mm}/${dd}/${d.getUTCFullYear()}`;
}
