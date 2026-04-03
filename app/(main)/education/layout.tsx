import type { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import { EducationNav } from "@/components/education-nav";

export const metadata: Metadata = {
  title: {
    default: "Education",
    template: "%s | Education | Vibe Inc.",
  },
  description:
    "Learn to build with AI — vibe coding curriculum from WVibe and QVibe.",
};

export default function EducationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full">
      <div className="border-b border-border bg-card/30 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-5 pt-6 pb-0">
          <div className="flex items-start gap-3 mb-4">
            <div className="rounded-xl gradient-bg p-2.5 shadow-lg shadow-electric-blue/15">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-electric-blue">
                WVibe × QVibe
              </p>
              <h1 className="text-lg font-semibold text-foreground">
                Education
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5 max-w-2xl">
                Core curriculum — learn at your own pace or join our workshops.
              </p>
            </div>
          </div>
          <EducationNav />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-5 py-8">{children}</div>
    </div>
  );
}
