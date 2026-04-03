"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, AlignLeft } from "lucide-react";

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
              "w-full text-left rounded-md transition-colors",
              compact ? "px-3 py-2 text-sm" : "px-2.5 py-1.5 text-xs font-semibold",
              activeId === section.id
                ? "text-electric-blue bg-electric-blue/10"
                : "text-foreground/80 hover:text-foreground hover:bg-white/5"
            )}
          >
            {section.label}
          </button>
          {section.items?.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={cn(
                "w-full text-left rounded-md transition-colors",
                compact ? "px-3 pl-6 py-1.5 text-sm" : "px-2.5 pl-5 py-1 text-[11px]",
                activeId === item.id
                  ? "text-electric-blue"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
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
  const [activeId, setActiveId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const idsRef = useRef<string[]>(
    sections.flatMap((s) => [s.id, ...(s.items?.map((i) => i.id) ?? [])])
  );

  useEffect(() => {
    const update = () => {
      const offset = window.scrollY + 140;
      let current = idsRef.current[0] ?? "";
      for (const id of idsRef.current) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= offset) current = id;
      }
      setActiveId(current);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  if (variant === "mobile") {
    return (
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl border border-border bg-card text-sm font-medium text-foreground hover:bg-secondary/40 transition-colors"
        >
          <span className="flex items-center gap-2 text-muted-foreground">
            <AlignLeft className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Contents</span>
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              mobileOpen && "rotate-180"
            )}
          />
        </button>
        {mobileOpen && (
          <div className="mt-1.5 rounded-xl border border-border bg-card p-3 shadow-xl">
            <TocList
              sections={sections}
              activeId={activeId}
              onSelect={scrollTo}
              compact
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-[88px]">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-3 px-2.5">
          On this page
        </p>
        <TocList sections={sections} activeId={activeId} onSelect={scrollTo} />
        {/* Progress bar */}
        <div className="mt-6 px-2.5">
          <div className="h-px w-full bg-border" />
          <p className="text-[10px] text-muted-foreground/40 mt-3">
            Part 1 of 2
          </p>
        </div>
      </div>
    </aside>
  );
}
