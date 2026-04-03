"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { formatDistanceToNow } from "date-fns";
import { ArrowUpRight, ChevronRight, Clock } from "lucide-react";
import type { FeedArticle } from "@/lib/feed-types";
import { sourceBadgeClass } from "@/lib/feed-types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FilterId = "all" | "ai" | "tech" | "coding";

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI" },
  { id: "tech", label: "Tech" },
  { id: "coding", label: "Coding Tools" },
];

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

function filterArticles(articles: FeedArticle[], id: FilterId): FeedArticle[] {
  if (id === "all") return articles;
  return articles.filter((a) => a.filterTags.includes(id));
}

function RelativeTime({ iso }: { iso: string }) {
  const d = parseISO(iso);
  return (
    <span suppressHydrationWarning>
      {formatDistanceToNow(d, { addSuffix: true })}
    </span>
  );
}

function FeedCard({ article }: { article: FeedArticle }) {
  const external = isExternalHref(article.href);
  const badgeCls = sourceBadgeClass(article.sourceName);

  const titleLink = external ? (
    <a
      href={article.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm font-semibold leading-snug text-foreground transition-colors hover:text-electric-blue line-clamp-2"
    >
      {article.headline}
    </a>
  ) : (
    <Link
      href={article.href}
      className="text-sm font-semibold leading-snug text-foreground transition-colors hover:text-electric-blue line-clamp-2"
    >
      {article.headline}
    </Link>
  );

  const readBtnClass = cn(
    buttonVariants({ variant: "outline", size: "sm" }),
    "h-8 border-border/80 text-xs font-medium hover:bg-white/5"
  );

  const readBtn = external ? (
    <a
      href={article.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(readBtnClass, "inline-flex items-center gap-1")}
    >
      Read Article
      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  ) : (
    <Link
      href={article.href}
      className={cn(readBtnClass, "inline-flex items-center gap-1")}
    >
      Read Article
      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
    </Link>
  );

  return (
    <Card className="flex h-full flex-col border-border bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-muted-foreground/20 hover:shadow-lg hover:shadow-black/20">
      <CardHeader className="space-y-3 pb-0">
        <span
          className={cn(
            "inline-flex w-fit items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest",
            badgeCls
          )}
        >
          {article.sourceName}
        </span>
        <CardTitle className="text-base font-semibold leading-snug">
          {titleLink}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 py-3">
        <p className="text-xs leading-relaxed text-muted-foreground line-clamp-4">
          {article.summary}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-3 border-t border-border/60 bg-transparent py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1.5 text-muted-foreground/70">
          <Clock className="h-3 w-3 shrink-0" aria-hidden="true" />
          <span className="text-[11px]">
            <RelativeTime iso={article.publishedAt} />
          </span>
        </div>
        {readBtn}
      </CardFooter>
    </Card>
  );
}

export function DashboardNewsFeed({
  articles,
  lastUpdatedIso,
}: {
  articles: FeedArticle[];
  lastUpdatedIso: string;
}) {
  const [filter, setFilter] = useState<FilterId>("all");

  const visible = useMemo(
    () => filterArticles(articles, filter),
    [articles, filter]
  );

  const lastUpdatedLabel = format(
    parseISO(lastUpdatedIso),
    "MMM d, yyyy 'at' h:mm a"
  );

  return (
    <div className="min-w-0 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div
              className="h-5 w-1 rounded-full gradient-bg"
              aria-hidden="true"
            />
            <h2
              id="latest-ai"
              className="text-base font-semibold text-foreground"
            >
              Latest in AI & Dev
            </h2>
            <span className="rounded-full border border-border bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
              {visible.length} stories
            </span>
          </div>
          <p className="pl-3 text-[11px] text-muted-foreground sm:pl-4">
            Last updated: {lastUpdatedLabel}
          </p>
        </div>
        <Link
          href="/llm-comparison"
          className="flex shrink-0 items-center gap-1 self-start text-xs text-muted-foreground transition-colors hover:text-electric-blue sm:self-center"
        >
          View all
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </div>

      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter articles by category"
      >
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              filter === f.id
                ? "border-electric-blue/40 bg-electric-blue/15 text-electric-blue"
                : "border-border bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border bg-muted/30 px-4 py-8 text-center text-sm text-muted-foreground">
          No articles match this filter right now. Try another category or All.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((article) => (
            <FeedCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
