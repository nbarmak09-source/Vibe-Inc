import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/session-token";

function isStaticOrInternal(pathname: string): boolean {
  if (pathname === "/favicon.ico") return true;
  if (pathname.startsWith("/_next")) return true;
  if (/\.(ico|png|jpg|jpeg|gif|webp|svg|woff2?|ttf|eot)$/i.test(pathname)) {
    return true;
  }
  return false;
}

function redirectToGate(request: NextRequest, pathname: string) {
  const gate = new URL("/gate", request.url);
  if (pathname !== "/" && !pathname.startsWith("/gate")) {
    gate.searchParams.set("next", pathname);
  }
  return NextResponse.redirect(gate);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isStaticOrInternal(pathname)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/verify-code")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/logout")) {
    return NextResponse.next();
  }

  const secret = process.env.ACCESS_SESSION_SECRET?.trim();

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  let valid = false;
  if (secret && token) {
    valid = await verifySessionToken(token, secret);
  }

  const isGate = pathname === "/gate" || pathname.startsWith("/gate/");

  if (isGate) {
    if (valid) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (!secret) {
    return redirectToGate(request, pathname);
  }

  if (!valid) {
    const res = redirectToGate(request, pathname);
    if (token) res.cookies.delete(SESSION_COOKIE_NAME);
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.(?:svg|ico|png|jpg|jpeg|gif|webp|woff2?)$).*)",
  ],
};
