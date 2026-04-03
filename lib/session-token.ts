/**
 * HMAC-signed session tokens (Edge + Node compatible via Web Crypto).
 */

const SESSION_VERSION = 1;
export const SESSION_COOKIE_NAME = "vibe_access_session";
export const SESSION_MAX_AGE_SEC = 30 * 24 * 60 * 60; // 30 days

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(str: string): Uint8Array {
  const b64 =
    str.replace(/-/g, "+").replace(/_/g, "/") +
    "===".slice((str.length + 3) % 4);
  const binary = atob(b64);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    out[i] = binary.charCodeAt(i);
  }
  return out;
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(secret)
  );
  return crypto.subtle.importKey(
    "raw",
    digest,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function createSessionToken(secret: string): Promise<{
  token: string;
  maxAge: number;
}> {
  const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SEC;
  const payload = JSON.stringify({ v: SESSION_VERSION, exp });
  const enc = new TextEncoder();
  const key = await importHmacKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  const token = `${base64UrlEncode(enc.encode(payload))}.${base64UrlEncode(
    new Uint8Array(sig)
  )}`;
  return { token, maxAge: SESSION_MAX_AGE_SEC };
}

export async function verifySessionToken(
  token: string,
  secret: string
): Promise<boolean> {
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payloadB64, sigB64] = parts;
  if (!payloadB64 || !sigB64) return false;

  let payloadStr: string;
  try {
    payloadStr = new TextDecoder().decode(base64UrlDecode(payloadB64));
  } catch {
    return false;
  }

  const enc = new TextEncoder();
  let payload: { v?: number; exp?: number };
  try {
    payload = JSON.parse(payloadStr) as { v?: number; exp?: number };
  } catch {
    return false;
  }

  if (payload.v !== SESSION_VERSION || typeof payload.exp !== "number") {
    return false;
  }

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp < now) return false;

  const key = await importHmacKey(secret);
  let sig: Uint8Array;
  try {
    sig = base64UrlDecode(sigB64);
  } catch {
    return false;
  }

  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    new Uint8Array(sig),
    enc.encode(payloadStr)
  );
  return valid;
}
