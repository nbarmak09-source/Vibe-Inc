"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  EDUCATION_PROGRESS_EVENT,
  getCompletionState,
} from "./progress-storage";

type ProgressItemType = "lesson" | "knowledge-check";

export type ProgressSidebarItem = {
  id: string;
  title: string;
  type: ProgressItemType;
  completionId?: string;
};

type ProgressSidebarProps = {
  items: ProgressSidebarItem[];
};

function ProgressBody({
  items,
  activeSectionId,
  completionMap,
  onJump,
}: {
  items: ProgressSidebarItem[];
  activeSectionId: string;
  completionMap: Record<string, boolean>;
  onJump: (id: string) => void;
}) {
  const lessonItems = items.filter((item) => item.type === "lesson");
  const completeLessons = lessonItems.filter(
    (item) => completionMap[item.completionId ?? item.id]
  ).length;
  const progressPercent =
    lessonItems.length > 0
      ? Math.round((completeLessons / lessonItems.length) * 100)
      : 0;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card/70 p-3">
        <div className="mb-2 flex items-center justify-between gap-2 text-xs font-medium text-muted-foreground">
          <span>Progress</span>
          <span>
            {completeLessons}/{lessonItems.length} lessons complete
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-gradient-to-r from-electric-blue to-vibe-purple transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <ul className="space-y-1.5">
        {items.map((item) => {
          const completionId = item.completionId ?? item.id;
          const isDone = completionMap[completionId];
          const isActive = activeSectionId === item.id;

          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onJump(item.id)}
                className={cn(
                  "w-full rounded-lg border px-3 py-2 text-left text-sm transition-all duration-200",
                  "border-border bg-card/30 hover:border-electric-blue/40 hover:bg-card/60",
                  isActive && "border-electric-blue/50 bg-electric-blue/[0.08]",
                  isDone && "border-green-400/30 bg-green-500/[0.08]"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-foreground">{item.title}</span>
                  {isDone ? (
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-green-300" />
                  ) : (
                    <span className="h-4 w-4 rounded-full border border-border" />
                  )}
                </div>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                  {item.type === "lesson" ? "Lesson" : "Knowledge check"}
                </p>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function ProgressSidebar({ items }: ProgressSidebarProps) {
  const [activeSectionId, setActiveSectionId] = useState(items[0]?.id ?? "");
  const [completionMap, setCompletionMap] = useState<Record<string, boolean>>({});
  const [panelOpen, setPanelOpen] = useState(false);

  const completionIds = useMemo(
    () => items.map((item) => item.completionId ?? item.id),
    [items]
  );

  useEffect(() => {
    const syncCompletion = () => {
      const next: Record<string, boolean> = {};
      completionIds.forEach((id) => {
        next[id] = getCompletionState(id);
      });
      setCompletionMap(next);
    };

    syncCompletion();
    window.addEventListener("storage", syncCompletion);
    window.addEventListener(EDUCATION_PROGRESS_EVENT, syncCompletion);
    return () => {
      window.removeEventListener("storage", syncCompletion);
      window.removeEventListener(EDUCATION_PROGRESS_EVENT, syncCompletion);
    };
  }, [completionIds]);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (left, right) =>
              Math.abs(left.boundingClientRect.top) -
              Math.abs(right.boundingClientRect.top)
          )[0];

        const nextId = visible?.target?.id;
        if (!nextId) return;
        setActiveSectionId((prev) => (prev === nextId ? prev : nextId));
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: [0.1, 0.3, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setPanelOpen(false);
  };

  return (
    <>
      <Button
        type="button"
        size="lg"
        className="fixed right-6 z-[60] h-11 rounded-full px-4 shadow-xl shadow-electric-blue/20 bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] sm:right-8"
        onClick={() => setPanelOpen((prev) => !prev)}
        aria-expanded={panelOpen}
        aria-controls="education-progress-panel"
      >
        <Menu className="mr-1 h-4 w-4" aria-hidden />
        Progress
      </Button>

      <div
        className={cn(
          "fixed inset-0 z-[55] bg-black/45 transition-opacity duration-200",
          panelOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setPanelOpen(false)}
        aria-hidden
      />

      <div
        id="education-progress-panel"
        className={cn(
          "fixed inset-x-0 bottom-0 z-[60] max-h-[85vh] rounded-t-2xl border border-border bg-background shadow-2xl transition-transform duration-300",
          panelOpen ? "translate-y-0" : "translate-y-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Progress panel"
      >
        <div className="flex max-h-[85vh] flex-col p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <div className="mb-3 flex shrink-0 items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Your progress</h3>
            <Button variant="ghost" size="icon-sm" onClick={() => setPanelOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto pr-1">
            <ProgressBody
              items={items}
              activeSectionId={activeSectionId}
              completionMap={completionMap}
              onJump={scrollToSection}
            />
          </div>
        </div>
      </div>
    </>
  );
}
