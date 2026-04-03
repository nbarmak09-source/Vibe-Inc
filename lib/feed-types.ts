export type FeedFilterTag = "ai" | "tech" | "coding";

export type FeedArticle = {
  id: string;
  sourceName: string;
  headline: string;
  summary: string;
  href: string;
  publishedAt: string;
  filterTags: FeedFilterTag[];
};

/** Tailwind classes for source badges (matches existing dashboard accent palette) */
export const SOURCE_BADGE_CLASSES: Record<string, string> = {
  TechCrunch:
    "bg-electric-blue/15 text-electric-blue border-electric-blue/25",
  "The Verge": "bg-vibe-purple/15 text-vibe-purple border-vibe-purple/25",
  "Ars Technica": "bg-amber-400/15 text-amber-400 border-amber-400/25",
  "MIT Technology Review":
    "bg-green-400/15 text-green-400 border-green-400/25",
  "Vibe Inc.": "bg-electric-blue/15 text-electric-blue border-electric-blue/25",
};

export const DEFAULT_SOURCE_BADGE =
  "bg-muted/80 text-muted-foreground border-border";

export function sourceBadgeClass(sourceName: string): string {
  return SOURCE_BADGE_CLASSES[sourceName] ?? DEFAULT_SOURCE_BADGE;
}
