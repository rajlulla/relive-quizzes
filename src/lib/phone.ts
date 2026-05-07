/**
 * US phone helpers — input formatting, validation, and storage normalization.
 *
 * The format we show users: `(XXX) XXX-XXXX`.
 * The format we store: E.164-ish `+1XXXXXXXXXX` (10 digits, US assumed).
 */

/** Format a free-text phone string into `(XXX) XXX-XXXX` as the user types. */
export function formatPhone(input: string): string {
  const digits = input.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/** True iff the input contains exactly 10 digits (US). */
export function isValidPhone(input: string): boolean {
  return input.replace(/\D/g, "").length === 10;
}

/** `+1XXXXXXXXXX`, or the raw digits if not 10. */
export function normalizePhone(input: string): string {
  const digits = input.replace(/\D/g, "").slice(-10);
  return digits.length === 10 ? `+1${digits}` : digits;
}
