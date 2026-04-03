"use client";

import { cn } from "@/lib/utils";

const LAYER_STYLES: Record<string, string> = {
  browser:
    "bg-sky-500/15 text-sky-300 border-sky-500/30 hover:bg-sky-500/25 hover:border-sky-500/50",
  frontend:
    "bg-blue-500/15 text-blue-300 border-blue-500/30 hover:bg-blue-500/25 hover:border-blue-500/50",
  backend:
    "bg-purple-500/15 text-purple-300 border-purple-500/30 hover:bg-purple-500/25 hover:border-purple-500/50",
  database:
    "bg-green-500/15 text-green-300 border-green-500/30 hover:bg-green-500/25 hover:border-green-500/50",
  infrastructure:
    "bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25 hover:border-amber-500/50",
};

type LayerBadgeProps = {
  label: string;
  layerId: string;
  className?: string;
};

export function LayerBadge({ label, layerId, className }: LayerBadgeProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const el = document.getElementById("architecture-diagram");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("architecture-expand-layer", {
          detail: { layerId },
        })
      );
    }, 500);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex cursor-pointer items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-200",
        LAYER_STYLES[layerId] ??
          "bg-muted text-muted-foreground border-border hover:bg-muted/80",
        className
      )}
      title={`View ${label} in diagram`}
    >
      ↑ {label}
    </button>
  );
}
