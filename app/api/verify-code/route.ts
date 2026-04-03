import { NextResponse } from "next/server";
import { parseAccessCodes, isValidAccessCode } from "@/lib/access-codes";
import {
  checkRateLimit,
  getClientIp,
  recordFailure,
  recordSuccess,
} from "@/lib/rate-limit";
import { createSessionToken, SESSION_COOKIE_NAME } from "@/lib/session-token";

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "rate_limited",
        message: "Too many attempts. Please try again later.",
        retryAfterSec: rl.retryAfterSec,
      },
      { status: 429 }
    );
  }

  const sessionSecret = process.env.ACCESS_SESSION_SECRET;
  if (!sessionSecret?.trim()) {
    return NextResponse.json(
      {
        ok: false,
        error: "server_config",
        message:
          "ACCESS_SESSION_SECRET is missing. Add a long random string to .env.local (local dev) or your host’s Environment Variables (e.g. Vercel → Project → Settings → Environment Variables), then restart the dev server or redeploy.",
      },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const code =
    typeof body === "object" &&
    body !== null &&
    "code" in body &&
    typeof (body as { code: unknown }).code === "string"
      ? (body as { code: string }).code
      : "";

  if (!code.trim()) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const codes = parseAccessCodes(process.env.ACCESS_CODES);
  if (codes.length === 0) {
    return NextResponse.json(
      {
        ok: false,
        error: "server_config",
        message:
          "ACCESS_CODES is missing or empty. Set comma-separated codes in .env.local or your host’s Environment Variables, then restart or redeploy.",
      },
      { status: 500 }
    );
  }

  if (!isValidAccessCode(code, codes)) {
    recordFailure(ip);
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 401 });
  }

  recordSuccess(ip);
  const { token, maxAge } = await createSessionToken(sessionSecret);

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
  return res;
}
