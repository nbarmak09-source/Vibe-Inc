"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/llm-comparison": "LLM Comparison",
  "/education": "Education",
  "/education/vibe-coding-101": "Vibe Coding 101",
  "/education/coding-fundamentals": "Coding Fundamentals",
  "/about": "About Us",
};

function getPageTitle(pathname: string): string {
  // Exact match first so sub-page titles take precedence
  if (pageTitles[pathname]) return pageTitles[pathname];
  // Prefix fall-through for deeper nesting
  for (const [path, title] of Object.entries(pageTitles)) {
    if (pathname.startsWith(path + "/")) return title;
  }
  return "Vibe Inc.";
}

interface AppHeaderProps {
  onMenuClick: () => void;
}

export function AppHeader({ onMenuClick }: AppHeaderProps) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <header className="flex items-center gap-4 px-5 py-3.5 border-b border-border bg-card/40 backdrop-blur-md sticky top-0 z-10">
      <Button
        variant="ghost"
        size="icon"
        onClick={onMenuClick}
        className="md:hidden h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-white/5"
        aria-label="Open navigation menu"
      >
        <Menu className="w-5 h-5" />
      </Button>

      <div className="flex flex-col">
        <p className="text-base font-semibold text-foreground leading-tight">
          {pageTitle}
        </p>
        <p className="text-[11px] text-muted-foreground/70 leading-tight">
          The Future of Building is Here.
        </p>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-electric-blue/10 border border-electric-blue/20">
          <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse-slow" />
          <span className="text-xs font-medium text-electric-blue">Live</span>
        </div>
      </div>
    </header>
  );
}
