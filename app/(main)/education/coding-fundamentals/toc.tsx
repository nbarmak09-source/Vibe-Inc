"use client";

import { useEffect, useRef, useState } from "react";
import { AlignLeft, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TocSection {
  id: string;
  label: string;
  items?: { id: string; label: string }[];
}

function TocList({
  sections,
  activeId,
  onSelect,
  compact = false,
}: {
  sections: TocSection[];
  activeId: string;
  onSelect: (id: string) => void;
  compact?: boolean;
}) {
  return (
    <nav className="space-y-0.5">
      {sections.map((section) => (
        <div key={section.id}>
          <button
            onClick={() => onSelect(section.id)}
            className={cn(
              "w-full rounded-md text-left transition-colors",
              compact ? "px-3 py-2 text-sm" : "px-2.5 py-1.5 text-xs font-semibold",
              activeId === section.id
                ? "bg-electric-blue/10 text-electric-blue"
                : "text-foreground/80 hover:bg-white/5 hover:text-foreground"
            )}
          >
            {section.label}
          </button>
          {section.items?.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={cn(
                "w-full rounded-md text-left transition-colors",
                compact ? "px-3 py-1.5 pl-6 text-sm" : "px-2.5 py-1 pl-5 text-[11px]",
                activeId === item.id
                  ? "text-electric-blue"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      ))}
    </nav>
  );
}

export function TocSidebar({
  sections,
  variant = "desktop",
}: {
  sections: TocSection[];
  variant?: "mobile" | "desktop";
}) {
  const [activeId, setActiveId] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const idsRef = useRef(
    sections.flatMap((section) => [
      section.id,
      ...(section.items?.map((item) => item.id) ?? []),
    ])
  );

  useEffect(() => {
    const update = () => {
      const offset = window.scrollY + 140;
      let current = idsRef.current[0] ?? "";

      for (const id of idsRef.current) {
        const element = document.getElementById(id);
        if (!element) continue;
        const top = element.getBoundingClientRect().top + window.scrollY;
        if (top <= offset) current = id;
      }

      setActiveId(current);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => window.removeEventListener("scroll", update);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  };

  if (variant === "mobile") {
    return (
      <div className="mb-6 lg:hidden">
        <button
          onClick={() => setMobileOpen((open) => !open)}
          className="flex w-full items-center justify-between rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary/40"
        >
          <span className="flex items-center gap-2 text-muted-foreground">
            <AlignLeft className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Contents
            </span>
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              mobileOpen && "rotate-180"
            )}
          />
        </button>
        {mobileOpen ? (
          <div className="mt-1.5 rounded-xl border border-border bg-card p-3 shadow-xl">
            <TocList
              sections={sections}
              activeId={activeId}
              onSelect={scrollTo}
              compact
            />
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-[88px]">
        <p className="mb-3 px-2.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
          On this page
        </p>
        <TocList sections={sections} activeId={activeId} onSelect={scrollTo} />
        <div className="mt-6 px-2.5">
          <div className="h-px w-full bg-border" />
          <p className="mt-3 text-[10px] text-muted-foreground/40">
            Foundations first
          </p>
        </div>
      </div>
    </aside>
  );
}
