import { cn } from "@/lib/utils";
import {
  Lightbulb,
  AlertTriangle,
  Info,
  AlertCircle,
  GraduationCap,
} from "lucide-react";
import type { ReactNode } from "react";

type CalloutType = "tip" | "warning" | "info" | "danger" | "workshop";

const calloutConfig: Record<
  CalloutType,
  {
    icon: typeof Info;
    defaultTitle: string;
    container: string;
    iconCls: string;
    titleCls: string;
  }
> = {
  tip: {
    icon: Lightbulb,
    defaultTitle: "Pro Tip",
    container: "border-electric-blue/25 bg-electric-blue/[0.06]",
    iconCls: "text-electric-blue",
    titleCls: "text-electric-blue",
  },
  warning: {
    icon: AlertTriangle,
    defaultTitle: "Warning",
    container: "border-amber-400/25 bg-amber-400/[0.06]",
    iconCls: "text-amber-400",
    titleCls: "text-amber-400",
  },
  info: {
    icon: Info,
    defaultTitle: "Note",
    container: "border-vibe-purple/25 bg-vibe-purple/[0.06]",
    iconCls: "text-vibe-purple",
    titleCls: "text-vibe-purple",
  },
  danger: {
    icon: AlertCircle,
    defaultTitle: "Important",
    container: "border-red-400/25 bg-red-400/[0.06]",
    iconCls: "text-red-400",
    titleCls: "text-red-400",
  },
  workshop: {
    icon: GraduationCap,
    defaultTitle: "WVibe × QVibe",
    container:
      "border-vibe-purple/30 bg-gradient-to-r from-vibe-purple/10 to-electric-blue/[0.06]",
    iconCls: "text-vibe-purple",
    titleCls: "text-vibe-purple",
  },
};

export function Callout({
  type = "info",
  title,
  children,
  className,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  const cfg = calloutConfig[type];
  const Icon = cfg.icon;

  return (
    <div
      className={cn(
        "flex gap-3.5 rounded-xl border px-5 py-4",
        cfg.container,
        className
      )}
    >
      <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", cfg.iconCls)} />
      <div className="flex-1 min-w-0 text-sm leading-relaxed">
        <p className={cn("font-bold text-xs uppercase tracking-wider mb-1.5", cfg.titleCls)}>
          {title ?? cfg.defaultTitle}
        </p>
        <div className="text-muted-foreground [&_strong]:text-foreground [&_strong]:font-semibold [&_a]:text-electric-blue [&_a]:underline [&_a]:underline-offset-2 [&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs [&_code]:text-foreground">
          {children}
        </div>
      </div>
    </div>
  );
}
