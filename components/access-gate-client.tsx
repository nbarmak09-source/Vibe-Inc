"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VIBE_ACCESS_STORAGE_KEY } from "@/lib/session-storage";

const SESSION_MARKER_MS = 30 * 24 * 60 * 60 * 1000;

function safeNextPath(raw: string | null): string {
  if (!raw || !raw.startsWith("/")) return "/dashboard";
  if (raw.startsWith("//") || raw.includes(":")) return "/dashboard";
  return raw;
}

export function AccessGateClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = safeNextPath(searchParams.get("next"));

  const inputRef = useRef<HTMLInputElement>(null);
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runShake = useCallback(() => {
    setShake(false);
    requestAnimationFrame(() => {
      setShake(true);
      window.setTimeout(() => setShake(false), 450);
    });
  }, []);

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (submitting || success) return;

      setErrorMessage(null);
      setShowError(false);

      const trimmed = code.trim();
      if (!trimmed) {
        setShowError(true);
        setErrorMessage("Invalid access code. Please try again.");
        runShake();
        return;
      }

      setSubmitting(true);
      try {
        const res = await fetch("/api/verify-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: trimmed }),
        });

        const data = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          error?: string;
          message?: string;
        };

        if (res.status === 429 || data.error === "rate_limited") {
          setShowError(true);
          setErrorMessage(
            data.message ?? "Too many attempts. Please try again later."
          );
          runShake();
          return;
        }

        if (res.status >= 500 || data.error === "server_config") {
          setShowError(true);
          setErrorMessage(
            data.message ??
              "Server is not configured for access codes yet. Set ACCESS_CODES and ACCESS_SESSION_SECRET in .env.local (local) or your host’s environment variables, then redeploy."
          );
          runShake();
          return;
        }

        if (!res.ok || !data.ok) {
          setShowError(true);
          setErrorMessage("Invalid access code. Please try again.");
          runShake();
          return;
        }

        const expMs = Date.now() + SESSION_MARKER_MS;
        try {
          localStorage.setItem(
            VIBE_ACCESS_STORAGE_KEY,
            JSON.stringify({ v: 1, exp: expMs })
          );
        } catch {
          /* ignore quota / private mode */
        }

        setSuccess(true);
        window.setTimeout(() => {
          router.replace(nextPath);
          router.refresh();
        }, 850);
      } finally {
        setSubmitting(false);
      }
    },
    [code, submitting, success, nextPath, router, runShake]
  );

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 py-16">
      {/* Animated backdrop */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -left-1/4 -top-1/4 h-[70vh] w-[70vh] rounded-full bg-electric-blue/25 blur-[120px] animate-gradient-shift"
        />
        <div
          className="absolute -bottom-1/4 -right-1/4 h-[65vh] w-[65vh] rounded-full bg-vibe-purple/20 blur-[110px] animate-gradient-shift"
          style={{ animationDelay: "-4s" }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-lg text-center">
        <div className="mb-10 inline-flex flex-col items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-bg shadow-xl shadow-electric-blue/25">
            <Zap className="h-7 w-7 text-white" strokeWidth={2.5} aria-hidden />
          </div>
          <div>
            <p className="text-2xl font-bold tracking-tight gradient-text">
              Vibe Inc.
            </p>
            <p className="mt-1 text-xs font-medium tracking-[0.2em] text-muted-foreground/70">
              WVibe × QVibe
            </p>
          </div>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Members Only
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          Enter your club access code to continue
        </p>

        <form onSubmit={onSubmit} className="mt-10 space-y-5">
          <div className="relative mx-auto max-w-md">
            {success && (
              <div
                className="absolute inset-0 z-10 flex items-center justify-center rounded-xl border border-emerald-500/40 bg-emerald-500/10 backdrop-blur-sm animate-success-pop"
                aria-live="polite"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20">
                  <Check
                    className="h-8 w-8 text-emerald-400"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                </div>
              </div>
            )}
            <input
              ref={inputRef}
              type="text"
              name="access-code"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              disabled={submitting || success}
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (showError) {
                  setShowError(false);
                  setErrorMessage(null);
                }
              }}
              className={cn(
                "w-full rounded-xl border px-5 py-4 text-center text-lg font-medium tracking-[0.12em] shadow-lg shadow-black/20 backdrop-blur-sm transition-[border-color,box-shadow] focus:outline-none focus:ring-2 focus:ring-electric-blue/60 disabled:opacity-60",
                /* Explicit contrast: theme vars + autofill can yield white bg + light text */
                "bg-zinc-950/95 text-zinc-100 caret-electric-blue placeholder:text-zinc-500",
                "[&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_rgb(9_9_11)] [&:-webkit-autofill]:[-webkit-text-fill-color:rgb(244_244_245)]",
                showError
                  ? "border-red-500/80 ring-2 ring-red-500/30"
                  : "border-white/10",
                shake && "animate-shake"
              )}
              placeholder="Access code"
              aria-invalid={showError}
              aria-describedby={showError ? "gate-error" : undefined}
            />
          </div>

          {showError && errorMessage && (
            <p
              id="gate-error"
              className="animate-fade-in text-sm text-red-400/95"
              role="alert"
            >
              {errorMessage}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            className="min-w-[140px] rounded-xl bg-primary px-8 text-base font-semibold shadow-lg shadow-electric-blue/20"
            disabled={submitting || success}
          >
            {submitting ? "Checking…" : "Submit"}
          </Button>
        </form>

        <p className="mt-14 text-xs leading-relaxed text-muted-foreground/80">
          Not a member? Learn more about{" "}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-electric-blue underline-offset-4 hover:underline"
          >
            WVibe
          </a>{" "}
          and{" "}
          <a
            href="https://www.qvibe.online/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-electric-blue underline-offset-4 hover:underline"
          >
            QVibe
          </a>
        </p>
      </div>
    </div>
  );
}
