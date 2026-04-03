/**
 * In-memory rate limit for verify-code (per server instance).
 */

const WINDOW_MS = 60_000;
const MAX_FAILURES = 10;
const BLOCK_MS = 5 * 60_000;

type Entry = {
  failures: number[];
  blockedUntil?: number;
};

const store = new Map<string, Entry>();

function pruneOldFailures(failures: number[], now: number): number[] {
  return failures.filter((t) => now - t < WINDOW_MS);
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = req.headers.get("x-real-ip");
  if (real?.trim()) return real.trim();
  return "unknown";
}

export type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfterSec: number };

export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  let entry = store.get(ip);
  if (!entry) {
    entry = { failures: [] };
    store.set(ip, entry);
  }

  if (entry.blockedUntil && now < entry.blockedUntil) {
    return {
      ok: false,
      retryAfterSec: Math.ceil((entry.blockedUntil - now) / 1000),
    };
  }

  if (entry.blockedUntil && now >= entry.blockedUntil) {
    entry.blockedUntil = undefined;
    entry.failures = [];
  }

  entry.failures = pruneOldFailures(entry.failures, now);
  return { ok: true };
}

export function recordFailure(ip: string): void {
  const now = Date.now();
  let entry = store.get(ip);
  if (!entry) {
    entry = { failures: [] };
    store.set(ip, entry);
  }

  entry.failures = pruneOldFailures(entry.failures, now);
  entry.failures.push(now);

  if (entry.failures.length >= MAX_FAILURES) {
    entry.blockedUntil = now + BLOCK_MS;
    entry.failures = [];
  }
}

export function recordSuccess(ip: string): void {
  store.delete(ip);
}
