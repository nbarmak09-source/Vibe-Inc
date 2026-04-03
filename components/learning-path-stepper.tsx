import {
  Lightbulb,
  Wrench,
  Rocket,
  Hammer,
  Bug,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    step: 1,
    title: "Understand the Basics",
    description:
      "Learn what vibe coding is, how AI assistants work, and how to think in outcomes instead of syntax.",
    icon: Lightbulb,
  },
  {
    step: 2,
    title: "Pick Your Tools",
    description:
      "Choose your editor, models, and stack — Cursor, repos, and deployment targets that fit your idea.",
    icon: Wrench,
  },
  {
    step: 3,
    title: "Brainstorm Your Idea",
    description:
      "Turn a rough concept into a clear brief: users, features, and constraints the AI can build toward.",
    icon: Rocket,
  },
  {
    step: 4,
    title: "Build & Iterate",
    description:
      "Prompt, generate, and refine — ship vertical slices fast and keep the loop tight.",
    icon: Hammer,
  },
  {
    step: 5,
    title: "Debug & Refine",
    description:
      "Read errors, test behavior, and tighten prompts until the app feels right.",
    icon: Bug,
  },
  {
    step: 6,
    title: "Deploy & Share",
    description:
      "Ship to production or a demo URL, gather feedback, and plan your next iteration.",
    icon: Share2,
  },
];

export function LearningPathStepper() {
  return (
    <div className="relative">
      <div
        className="absolute left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-electric-blue/60 via-vibe-purple/50 to-electric-blue/30 md:left-[23px]"
        aria-hidden
      />
      <ol className="relative space-y-0">
        {steps.map((item, index) => (
          <li key={item.step} className="relative flex gap-4 pb-10 last:pb-0">
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className={cn(
                  "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 text-xs font-bold shadow-lg md:h-12 md:w-12 md:text-sm",
                  "border-electric-blue/40 bg-gradient-to-br from-electric-blue/20 to-vibe-purple/20 text-foreground",
                  "ring-4 ring-background"
                )}
              >
                {item.step}
              </div>
            </div>
            <div className="min-w-0 flex-1 pt-0.5 md:pt-1">
              <div className="flex items-center gap-2 mb-1.5">
                <item.icon className="h-4 w-4 text-electric-blue flex-shrink-0" />
                <h3 className="text-base font-semibold text-foreground">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
              {index < steps.length - 1 && (
                <div className="hidden md:block h-4" aria-hidden />
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
