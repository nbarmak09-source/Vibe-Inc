import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Scale,
  GraduationCap,
  Users,
  Sparkles,
  TrendingUp,
  Zap,
  Flame,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardNewsFeed } from "@/components/dashboard-news-feed";
import {
  getDashboardNewsFeed,
  getTrendingArticles,
} from "@/lib/rss-feed";
import { sourceBadgeClass } from "@/lib/feed-types";
import { cn } from "@/lib/utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Your hub for vibe coding news, AI model updates, and the future of software development.",
  openGraph: {
    title: "Dashboard | Vibe Inc.",
    description:
      "Your hub for vibe coding news, AI model updates, and the future of software development.",
  },
};

/* ─── Data ──────────────────────────────────────────────────────────────── */

const quickLinks = [
  {
    href: "/llm-comparison",
    label: "Explore LLMs",
    description:
      "Compare the top AI models side-by-side across reasoning, coding, speed, and cost benchmarks.",
    icon: Scale,
    accent: "text-electric-blue",
    glow: "shadow-electric-blue/10 hover:shadow-electric-blue/20 hover:border-electric-blue/30",
    gradient: "from-electric-blue/15 to-electric-blue/5",
    external: false,
  },
  {
    href: "/education",
    label: "Start Learning",
    description:
      "Structured learning paths on prompt engineering, RAG, fine-tuning, and building AI-native apps.",
    icon: GraduationCap,
    accent: "text-vibe-purple",
    glow: "shadow-vibe-purple/10 hover:shadow-vibe-purple/20 hover:border-vibe-purple/30",
    gradient: "from-vibe-purple/15 to-vibe-purple/5",
    external: false,
  },
  {
    href: "/about",
    label: "About Us",
    description:
      "Meet the team behind Vibe Inc. and learn about our mission to make AI development accessible.",
    icon: Users,
    accent: "text-green-400",
    glow: "shadow-green-400/10 hover:shadow-green-400/20 hover:border-green-400/30",
    gradient: "from-green-400/15 to-green-400/5",
    external: false,
  },
  {
    href: "https://www.qvibe.online/",
    label: "Visit QVibe",
    description:
      "Queen's University's applied AI club — workshops, events, and vibe coding sessions in Kingston.",
    icon: ArrowUpRight,
    accent: "text-vibe-purple",
    glow: "shadow-vibe-purple/10 hover:shadow-vibe-purple/20 hover:border-vibe-purple/30",
    gradient: "from-vibe-purple/15 to-vibe-purple/5",
    external: true,
  },
  {
    href: "#",
    label: "Visit WVibe",
    description:
      "Western University's vibe coding club — building AI-powered apps alongside Ivey and Western students.",
    icon: ArrowUpRight,
    accent: "text-electric-blue",
    glow: "shadow-electric-blue/10 hover:shadow-electric-blue/20 hover:border-electric-blue/30",
    gradient: "from-electric-blue/15 to-electric-blue/5",
    external: true,
  },
];

/* ─── Components ────────────────────────────────────────────────────────── */

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function QuickLinkCard({
  link,
}: {
  link: (typeof quickLinks)[number];
}) {
  const cardInner = (
    <Card
      className={`border-border bg-gradient-to-br ${link.gradient} transition-all duration-200 shadow-sm ${link.glow} hover:scale-[1.01]`}
    >
      <CardContent className="py-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex-shrink-0 rounded-lg border border-border bg-card/80 p-2">
            <link.icon className={`h-4 w-4 ${link.accent}`} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center justify-between">
              <p className={`text-sm font-semibold ${link.accent}`}>
                {link.label}
              </p>
              {link.external ? (
                <ArrowUpRight
                  className={`h-3.5 w-3.5 flex-shrink-0 ${link.accent} opacity-60 transition-all group-hover:opacity-100`}
                />
              ) : (
                <ChevronRight
                  className={`h-3.5 w-3.5 flex-shrink-0 ${link.accent} opacity-60 transition-all group-hover:translate-x-0.5 group-hover:opacity-100`}
                />
              )}
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {link.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
      >
        {cardInner}
      </a>
    );
  }

  return (
    <Link href={link.href} className="group block">
      {cardInner}
    </Link>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default async function DashboardPage() {
  const feed = await getDashboardNewsFeed();
  const trending = getTrendingArticles(feed.articles, 3);

  return (
    <div className="mx-auto max-w-[1400px] space-y-7 p-5">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl border border-vibe-purple/25 bg-gradient-to-br from-[#1a0a35] via-[#0f0820] to-[#030a1a] p-8 md:p-12">
        {/* Glow orbs */}
        <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-vibe-purple/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-electric-blue/15 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-96 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-vibe-purple/10 to-electric-blue/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
          <div className="flex-1">
            <div className="mb-4 flex items-center gap-2.5">
              <div className="rounded-lg p-2 gradient-bg shadow-lg shadow-electric-blue/20">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <Badge
                variant="outline"
                className="border-electric-blue/30 bg-electric-blue/10 text-[10px] font-bold uppercase tracking-widest text-electric-blue"
              >
                Welcome
              </Badge>
            </div>

            <h1 className="mb-4 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              Welcome to{" "}
              <span className="gradient-text">Vibe Inc.</span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/60">
              The joint WVibe × QVibe hub for vibe coding, AI news, and the
              future of software development. Built by students, for students.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/education"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg gradient-bg px-5 text-sm font-semibold text-white shadow-lg shadow-electric-blue/25 transition-opacity hover:opacity-90"
              >
                <GraduationCap className="h-4 w-4" />
                Start Learning
              </Link>
              <Link
                href="/llm-comparison"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/15 px-5 text-sm font-medium text-white/80 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
              >
                <Scale className="h-4 w-4" />
                Explore LLMs
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          <div className="hidden w-52 flex-shrink-0 grid-cols-1 gap-3 lg:grid">
            {[
              {
                label: "Models Tracked",
                value: "47",
                icon: Zap,
                color: "text-electric-blue",
              },
              {
                label: "News Articles",
                value: "1,200+",
                icon: TrendingUp,
                color: "text-vibe-purple",
              },
              {
                label: "Active Learners",
                value: "8,400",
                icon: Users,
                color: "text-green-400",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm"
              >
                <s.icon className={`h-4 w-4 flex-shrink-0 ${s.color}`} />
                <div>
                  <p className="text-base font-bold leading-none text-white">
                    {s.value}
                  </p>
                  <p className="mt-0.5 text-[10px] text-white/50">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main layout: News Feed + Quick Links sidebar ───────────────────── */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_288px]">
        {/* Left: News Feed */}
        <div className="min-w-0 space-y-5">
          <DashboardNewsFeed
            articles={feed.articles}
            lastUpdatedIso={feed.lastUpdated}
          />
        </div>

        {/* Right: Quick Links sidebar */}
        <div className="space-y-5">
          {/* Trending strip */}
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <Flame className="h-4 w-4 text-orange-400" />
              <h3 className="text-sm font-semibold text-foreground">
                Trending Now
              </h3>
            </div>
            <div className="divide-y divide-border">
              {trending.map((article, i) => {
                const external = isExternalHref(article.href);
                const rowClass =
                  "group flex items-start gap-3 px-4 py-3 outline-none transition-colors hover:bg-white/[0.02] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-electric-blue";
                const rowInner = (
                  <>
                    <span className="mt-0.5 w-4 flex-shrink-0 tabular-nums text-xs font-bold text-muted-foreground/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <span
                        className={cn(
                          "mb-1.5 inline-block rounded-full border px-1.5 py-px text-[9px] font-bold uppercase tracking-widest",
                          sourceBadgeClass(article.sourceName)
                        )}
                      >
                        {article.sourceName}
                      </span>
                      <p className="line-clamp-2 text-xs font-medium leading-snug text-foreground transition-colors group-hover:text-electric-blue">
                        {article.headline}
                      </p>
                    </div>
                  </>
                );
                if (external) {
                  return (
                    <a
                      key={article.id}
                      href={article.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={rowClass}
                    >
                      {rowInner}
                    </a>
                  );
                }
                return (
                  <Link key={article.id} href={article.href} className={rowClass}>
                    {rowInner}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-5 w-1 rounded-full gradient-bg" />
              <h3 className="text-sm font-semibold text-foreground">
                Quick Access
              </h3>
            </div>
            {quickLinks.map((link) => (
              <QuickLinkCard key={link.label} link={link} />
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="rounded-xl border border-electric-blue/20 bg-gradient-to-b from-electric-blue/10 to-vibe-purple/5 p-5 text-center">
            <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full gradient-bg shadow-lg shadow-electric-blue/20">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <p className="mb-1 text-sm font-semibold text-foreground">
              Stay in the loop
            </p>
            <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
              Weekly digest of AI breakthroughs, tool releases, and vibe coding
              tips — straight to your inbox.
            </p>
            <Button className="h-8 w-full border-0 gradient-bg text-xs font-semibold text-white shadow-md shadow-electric-blue/20 hover:opacity-90">
              Subscribe Free
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
