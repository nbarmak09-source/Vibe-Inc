import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Code2,
  Sparkles,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LearningPathStepper } from "@/components/learning-path-stepper";

export const metadata: Metadata = {
  title: "Learn to Build with AI",
  description:
    "From zero to published app — your complete vibe coding curriculum.",
};

const sections = [
  {
    href: "/education/vibe-coding-101",
    title: "Vibe Coding 101",
    description:
      "The step-by-step guide to building apps with AI. No coding experience required.",
    icon: BookOpen,
    gradient: "from-vibe-purple/25 to-electric-blue/10",
    border: "border-vibe-purple/25 hover:border-vibe-purple/40",
  },
  {
    href: "/education/coding-fundamentals",
    title: "Coding Fundamentals",
    description:
      "Understand how code actually works — the languages, layers, and logic behind every app.",
    icon: Code2,
    gradient: "from-electric-blue/25 to-vibe-purple/10",
    border: "border-electric-blue/25 hover:border-electric-blue/40",
  },
];

export default function EducationOverviewPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-vibe-purple/25 bg-gradient-to-br from-[#1a0a35] via-[#0f0820] to-[#030a1a] p-8 md:p-12">
        <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-vibe-purple/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-electric-blue/15 blur-3xl" />

        <div className="relative z-10 max-w-3xl">
          <div className="mb-4 flex items-center gap-2">
            <div className="rounded-lg gradient-bg p-2 shadow-lg shadow-electric-blue/20">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="rounded-full border border-electric-blue/30 bg-electric-blue/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-electric-blue">
              Curriculum
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-white md:text-4xl">
            Learn to Build with{" "}
            <span className="gradient-text">AI</span>
          </h2>
          <p className="text-base leading-relaxed text-white/65 md:text-lg">
            From zero to published app — your complete vibe coding curriculum.
            Built by WVibe and QVibe for our members and the broader community.
          </p>
        </div>
      </div>

      {/* Section cards */}
      <div>
        <div className="mb-5 flex items-center gap-2">
          <div className="h-5 w-1 rounded-full gradient-bg" />
          <h3 className="text-base font-semibold text-foreground">
            Start here
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {sections.map((section) => (
            <Link key={section.href} href={section.href} className="group block">
              <Card
                className={`h-full border-border bg-gradient-to-br ${section.gradient} transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20 ${section.border}`}
              >
                <CardHeader className="pb-2">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card/80 shadow-sm">
                    <section.icon className="h-5 w-5 text-electric-blue" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground group-hover:text-electric-blue transition-colors">
                    {section.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-electric-blue">
                    Open track
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Learning path */}
      <div>
        <div className="mb-6 flex items-center gap-2">
          <div className="h-5 w-1 rounded-full gradient-bg" />
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Learning path
            </h3>
            <p className="text-sm text-muted-foreground">
              The journey from idea to shipped product — follow in order or jump
              to where you need help.
            </p>
          </div>
        </div>
        <Card className="border-border bg-card/80 p-6 md:p-8">
          <LearningPathStepper />
        </Card>
      </div>

      {/* Workshop callout */}
      <div className="rounded-xl border border-vibe-purple/30 bg-gradient-to-r from-vibe-purple/10 via-card to-electric-blue/10 p-6 md:p-8">
        <p className="text-center text-base leading-relaxed text-foreground md:text-lg">
          <span className="mr-1.5" aria-hidden>
            🎓
          </span>
          This curriculum is used in{" "}
          <span className="font-semibold text-electric-blue">WVibe</span> and{" "}
          <span className="font-semibold text-vibe-purple">QVibe</span>{" "}
          workshops. Follow along at your own pace or join us at our next
          event.
        </p>
      </div>
    </div>
  );
}
