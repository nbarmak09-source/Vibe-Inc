"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";
import { AppFooter } from "@/components/app-footer";
import { TooltipProvider } from "@/components/ui/tooltip";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <TooltipProvider delay={200}>
      {/* Skip-to-content link for keyboard/screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
      >
        Skip to content
      </a>

      <div className="flex h-screen overflow-hidden bg-background">
        <AppSidebar
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />
        <div className="flex flex-col flex-1 overflow-hidden">
          <AppHeader onMenuClick={() => setMobileOpen(true)} />
          <main
            id="main-content"
            className="flex-1 overflow-y-auto flex flex-col"
            aria-label="Main content"
          >
            <div className="flex-1">{children}</div>
            <AppFooter />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
