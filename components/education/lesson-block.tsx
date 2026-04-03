"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { CheckCircle2, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  EDUCATION_PROGRESS_EVENT,
  getCompletionState,
  setCompletionState,
} from "./progress-storage";

type LessonBlockProps = {
  lessonId: string;
  lessonNumber: number | string;
  title: string;
  estimatedReadingTime: string;
  children: ReactNode;
  className?: string;
  sectionId?: string;
};

export function LessonBlock({
  lessonId,
  lessonNumber,
  title,
  estimatedReadingTime,
  children,
  className,
  sectionId,
}: LessonBlockProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setIsCompleted(getCompletionState(lessonId));

    const syncFromStorage = () => {
      setIsCompleted(getCompletionState(lessonId));
    };

    window.addEventListener("storage", syncFromStorage);
    window.addEventListener(EDUCATION_PROGRESS_EVENT, syncFromStorage);
    return () => {
      window.removeEventListener("storage", syncFromStorage);
      window.removeEventListener(EDUCATION_PROGRESS_EVENT, syncFromStorage);
    };
  }, [lessonId]);

  const handleCompleteToggle = () => {
    const next = !isCompleted;
    setIsCompleted(next);
    setCompletionState(lessonId, next);
  };

  const sectionAnchorId = sectionId ?? lessonId;

  return (
    <Card
      id={sectionAnchorId}
      className={cn(
        "relative gap-0 overflow-hidden border-border bg-card/50 py-0",
        className
      )}
    >
      <CardHeader className="relative border-b border-border/80 px-6 pb-5 pt-8 sm:px-8 sm:pb-6 sm:pt-10">
        <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-electric-blue to-vibe-purple" />
        <div className="pl-4">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2">
              <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg gradient-bg px-2 text-xs font-bold text-white shadow-md shadow-electric-blue/20">
                {lessonNumber}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Lesson
              </span>
              {isCompleted ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-green-400/30 bg-green-500/10 px-2 py-0.5 text-[11px] font-semibold text-green-300">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Complete
                </span>
              ) : null}
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock3 className="h-3.5 w-3.5 text-electric-blue" />
              {estimatedReadingTime}
            </span>
          </div>
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-2 pt-8 sm:px-8 sm:pb-4 sm:pt-10">
        <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:space-y-6 [&_p]:text-base [&_li]:text-base">
          {children}
        </div>
      </CardContent>

      <CardFooter className="justify-end border-t border-border/60 bg-muted/20 px-6 py-6 sm:px-8 sm:py-8">
        <Button
          variant={isCompleted ? "secondary" : "outline"}
          size="sm"
          className={cn(
            "transition-all duration-200",
            isCompleted
              ? "border-green-400/40 bg-green-500/10 text-green-200 hover:bg-green-500/20"
              : "hover:border-electric-blue/40 hover:text-foreground"
          )}
          onClick={handleCompleteToggle}
        >
          {isCompleted ? "Completed ✓" : "Mark as Complete ✓"}
        </Button>
      </CardFooter>
    </Card>
  );
}
