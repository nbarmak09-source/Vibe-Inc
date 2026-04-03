"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type InteractiveCalloutVariant = "tip" | "warning" | "concept" | "challenge";

type InteractiveCalloutProps = {
  variant?: InteractiveCalloutVariant;
  title?: string;
  children: ReactNode;
  className?: string;
  defaultExpanded?: boolean;
  collapsible?: boolean;
  collapsedHeight?: number;
};

const variantStyles: Record<
  InteractiveCalloutVariant,
  { emoji: string; title: string; container: string; titleColor: string }
> = {
  tip: {
    emoji: "💡",
    title: "Tip",
    container: "border-electric-blue/30 bg-electric-blue/[0.08]",
    titleColor: "text-electric-blue",
  },
  warning: {
    emoji: "⚠️",
    title: "Warning",
    container: "border-amber-400/30 bg-amber-400/[0.08]",
    titleColor: "text-amber-300",
  },
  concept: {
    emoji: "🔑",
    title: "Concept",
    container: "border-vibe-purple/30 bg-vibe-purple/[0.1]",
    titleColor: "text-vibe-purple",
  },
  challenge: {
    emoji: "🎯",
    title: "Challenge",
    container: "border-green-400/30 bg-green-500/[0.08]",
    titleColor: "text-green-300",
  },
};

export function InteractiveCallout({
  variant = "concept",
  title,
  children,
  className,
  defaultExpanded = true,
  collapsible = true,
  collapsedHeight = 120,
}: InteractiveCalloutProps) {
  const style = variantStyles[variant];
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isLongContent, setIsLongContent] = useState(false);

  useEffect(() => {
    if (!collapsible || !contentRef.current) return;
    const isLong = contentRef.current.scrollHeight > collapsedHeight;
    setIsLongContent(isLong);
  }, [children, collapsible, collapsedHeight]);

  const canToggle = collapsible && isLongContent;
  const shouldCollapse = canToggle && !isExpanded;

  return (
    <div
      className={cn(
        "w-full rounded-xl border px-5 py-5 transition-all duration-200 sm:px-6 sm:py-6",
        style.container,
        className
      )}
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <p
          className={cn(
            "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider",
            style.titleColor
          )}
        >
          <span>{style.emoji}</span>
          <span>{title ?? style.title}</span>
        </p>

        {canToggle ? (
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="inline-flex items-center gap-1 rounded-md border border-border/70 px-2 py-1 text-[11px] text-muted-foreground transition-all duration-200 hover:border-electric-blue/40 hover:text-foreground"
          >
            {isExpanded ? "Collapse" : "Expand"}
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 transition-transform duration-200",
                isExpanded && "rotate-180"
              )}
            />
          </button>
        ) : null}
      </div>

      <div
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          shouldCollapse && "max-h-[120px]"
        )}
        style={{ maxHeight: shouldCollapse ? collapsedHeight : undefined }}
      >
        <div
          ref={contentRef}
          className="text-base leading-relaxed text-muted-foreground [&_strong]:text-foreground [&_strong]:font-semibold"
        >
          {children}
        </div>
        {shouldCollapse ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-background/85 to-transparent" />
        ) : null}
      </div>
    </div>
  );
}
