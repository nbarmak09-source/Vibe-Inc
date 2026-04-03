import type { Metadata } from "next";
import { Suspense } from "react";
import { AccessGateClient } from "@/components/access-gate-client";

export const metadata: Metadata = {
  title: "Members Only",
};

function GateFallback() {
  return <div className="min-h-screen bg-background" aria-hidden />;
}

export default function GatePage() {
  return (
    <Suspense fallback={<GateFallback />}>
      <AccessGateClient />
    </Suspense>
  );
}
