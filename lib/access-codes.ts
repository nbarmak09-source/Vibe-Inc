/**
 * Parse ACCESS_CODES env (comma-separated). Normalized to lowercase for lookup.
 */
export function parseAccessCodes(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function isValidAccessCode(
  input: string,
  codes: string[]
): boolean {
  const normalized = input.trim().toLowerCase();
  if (!normalized) return false;
  return codes.includes(normalized);
}
