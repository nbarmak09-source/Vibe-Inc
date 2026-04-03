import "server-only";
import Parser from "rss-parser";
import type { Item } from "rss-parser";
import type { FeedArticle, FeedFilterTag } from "@/lib/feed-types";

const FEEDS: { url: string; sourceName: string }[] = [
  {
    url: "https://techcrunch.com/category/artificial-intelligence/feed/",
    sourceName: "TechCrunch",
  },
  {
    url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
    sourceName: "The Verge",
  },
  {
    url: "https://feeds.arstechnica.com/arstechnica/technology-lab",
    sourceName: "Ars Technica",
  },
  {
    url: "https://www.technologyreview.com/feed/",
    sourceName: "MIT Technology Review",
  },
];

const MAX_PER_FEED = 18;
const MAX_ARTICLES = 12;

const parser = new Parser({
  timeout: 20000,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (compatible; VibeIncBot/1.0; +https://vibe.inc) RSS reader",
    Accept: "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
  },
});

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function truncateSummary(
  text: string,
  maxSentences = 3,
  maxChars = 360
): string {
  const cleaned = stripHtml(text);
  if (!cleaned) return "";
  const parts = cleaned
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  let out = parts.slice(0, maxSentences).join(" ");
  if (out.length > maxChars) {
    out = out.slice(0, maxChars).trim();
    const lastSpace = out.lastIndexOf(" ");
    if (lastSpace > maxChars * 0.65) out = out.slice(0, lastSpace);
    if (!/[.!?…]$/.test(out)) out += "…";
  }
  return out;
}

function computeFilterTags(
  title: string,
  description: string
): FeedFilterTag[] {
  const text = `${title} ${description}`.toLowerCase();
  const tags = new Set<FeedFilterTag>();
  if (
    /\b(ai|artificial intelligence|machine learning|llm|gpt|openai|anthropic|claude|gemini|neural|deep learning|chatgpt|generative)\b/i.test(
      text
    )
  ) {
    tags.add("ai");
  }
  if (
    /\b(tech|technology|software|hardware|startup|silicon|chip|internet|phone|device|laptop|tablet|semiconductor)\b/i.test(
      text
    )
  ) {
    tags.add("tech");
  }
  if (
    /\b(code|coding|developer|github|vscode|cursor|programming|stack|api|devops|compiler|debug|repository|npm|python|javascript|typescript)\b/i.test(
      text
    )
  ) {
    tags.add("coding");
  }
  return Array.from(tags);
}

function normalizeItem(item: Item, sourceName: string): FeedArticle | null {
  const href = (item.link || item.guid || "").toString().trim();
  const title = (item.title || "").trim();
  if (!href || !title) return null;

  const itemAny = item as Item & { description?: string };
  const raw =
    item.contentSnippet ||
    item.content ||
    item.summary ||
    itemAny.description ||
    "";
  const summary =
    truncateSummary(typeof raw === "string" ? raw : String(raw)) ||
    "No description available.";

  const pubRaw =
    item.isoDate ||
    item.pubDate ||
    (item as Item & { "dc:date"?: string })["dc:date"];
  const d = pubRaw ? new Date(pubRaw as string) : new Date();
  if (Number.isNaN(d.getTime())) return null;

  const filterTags = computeFilterTags(title, summary);

  return {
    id: href,
    sourceName,
    headline: title,
    summary,
    href,
    publishedAt: d.toISOString(),
    filterTags,
  };
}

async function parseFeed(url: string, sourceName: string): Promise<FeedArticle[]> {
  try {
    const feed = await parser.parseURL(url);
    const items = feed.items ?? [];
    const out: FeedArticle[] = [];
    for (let i = 0; i < Math.min(items.length, MAX_PER_FEED); i++) {
      const normalized = normalizeItem(items[i]!, sourceName);
      if (normalized) out.push(normalized);
    }
    return out;
  } catch {
    return [];
  }
}

/** Static articles when every RSS feed fails — mirrors previous dashboard placeholders. */
const FALLBACK_ARTICLES: FeedArticle[] = [
  {
    id: "fallback-1",
    sourceName: "Vibe Inc.",
    headline:
      "GPT-5.4 Codex Launches — OpenAI's Most Powerful Coding Model Yet",
    summary:
      "OpenAI's new GPT-5.4 Codex achieves a 99.1% pass rate on HumanEval and tops the SWE-bench leaderboard. With a 256K context window and autonomous agent capabilities, it can plan, write, test, and iterate entire features end-to-end without human intervention.",
    href: "/llm-comparison",
    publishedAt: new Date("2026-04-02T12:00:00Z").toISOString(),
    filterTags: ["ai", "coding"],
  },
  {
    id: "fallback-2",
    sourceName: "Vibe Inc.",
    headline: "Cursor Surpasses 5 Million Active Developers",
    summary:
      "The AI-native code editor hits another major milestone, with enterprise adoption doubling in Q1 2026. The team credits deep Agent mode integration with Claude Sonnet 4.6 and GPT-5.4 Codex as the primary driver behind the growth curve.",
    href: "/llm-comparison",
    publishedAt: new Date("2026-04-01T12:00:00Z").toISOString(),
    filterTags: ["ai", "coding", "tech"],
  },
  {
    id: "fallback-3",
    sourceName: "Vibe Inc.",
    headline:
      "Anthropic Ships Claude 4.6 — Sonnet and Opus Redefine the Frontier",
    summary:
      "Anthropic's Claude 4.6 family introduces a 500K token context window, dramatically improved agentic capabilities, and the cleanest code generation of any model tested. Opus 4.6's extended thinking mode produces unprecedented reasoning depth for complex refactors.",
    href: "/llm-comparison",
    publishedAt: new Date("2026-03-31T12:00:00Z").toISOString(),
    filterTags: ["ai", "tech"],
  },
  {
    id: "fallback-4",
    sourceName: "Vibe Inc.",
    headline: "Gemini 3.0 Ultra Ships with a 2 Million Token Context Window",
    summary:
      "Google DeepMind's Gemini 3.0 Ultra can ingest entire production codebases in a single prompt, unlocking full-repo architectural analysis. Code generation quality now matches Claude and Codex, while pricing remains 60% cheaper than competitors.",
    href: "/llm-comparison",
    publishedAt: new Date("2026-03-29T12:00:00Z").toISOString(),
    filterTags: ["ai", "tech"],
  },
  {
    id: "fallback-5",
    sourceName: "Vibe Inc.",
    headline:
      "GitHub Copilot Agent Mode Powered by GPT-5.4 Codex Goes GA",
    summary:
      "GitHub's autonomous multi-file coding agent, now running on GPT-5.4 Codex, exits preview for all users. Reviews praise its ability to plan and execute complex tasks across entire repos, though some developers still prefer Claude for instruction fidelity.",
    href: "/llm-comparison",
    publishedAt: new Date("2026-03-28T12:00:00Z").toISOString(),
    filterTags: ["ai", "coding", "tech"],
  },
  {
    id: "fallback-6",
    sourceName: "Vibe Inc.",
    headline: "Vibe Coding Is Reshaping How Software Teams Are Hired in 2026",
    summary:
      "As AI-assisted 'vibe coding' becomes the norm — developers describe intent in natural language while models like Claude Sonnet 4.6 and GPT-5.4 Codex write the code — companies are fundamentally restructuring how they hire and evaluate engineering talent.",
    href: "/education",
    publishedAt: new Date("2026-03-27T12:00:00Z").toISOString(),
    filterTags: ["ai", "coding", "tech"],
  },
  {
    id: "fallback-7",
    sourceName: "Vibe Inc.",
    headline: "DeepSeek R2 Matches Frontier Reasoning Models at 12x Lower Cost",
    summary:
      "DeepSeek's R2 model delivers reasoning performance on par with Claude Opus 4.6 and GPT-5.4 Codex extended thinking, but at just $0.40/1M input tokens. The 256K context window and improved code quality make it a serious contender for cost-conscious teams.",
    href: "/llm-comparison",
    publishedAt: new Date("2026-03-25T12:00:00Z").toISOString(),
    filterTags: ["ai", "tech"],
  },
  {
    id: "fallback-8",
    sourceName: "Vibe Inc.",
    headline:
      "QVibe Hosts Vibe Coding Workshop at the Factory in Kingston",
    summary:
      "Queen's University's QVibe club ran a packed two-hour workshop at Kingston's Factory innovation hub, taking students from zero to a deployed web app using Cursor and Claude Sonnet 4.6. Over 40 students attended, with half shipping their first project live on Vercel by the end of the session.",
    href: "https://www.qvibe.online/",
    publishedAt: new Date("2026-03-24T12:00:00Z").toISOString(),
    filterTags: ["coding", "tech"],
  },
  {
    id: "fallback-9",
    sourceName: "Vibe Inc.",
    headline: "WVibe Officially Launches at Western University",
    summary:
      "Western University's new vibe coding club, WVibe, has officially launched and is building its founding member community. The club aims to bring hands-on AI-assisted development workshops to Ivey, engineering, and social science students — making software creation accessible regardless of technical background.",
    href: "/about",
    publishedAt: new Date("2026-03-22T12:00:00Z").toISOString(),
    filterTags: ["ai", "tech"],
  },
  {
    id: "fallback-10",
    sourceName: "Vibe Inc.",
    headline: "WVibe × QVibe Announce Joint Hackathon for Fall 2026",
    summary:
      "Vibe Inc.'s two founding clubs have announced a joint cross-university hackathon for fall 2026. Teams of two to four students from Western and Queen's will compete to build and ship an AI-powered web app in 24 hours using Cursor, Supabase, and Vercel. Registration opens this summer.",
    href: "/education",
    publishedAt: new Date("2026-03-20T12:00:00Z").toISOString(),
    filterTags: ["ai", "coding", "tech"],
  },
];

export type DashboardFeedResult = {
  articles: FeedArticle[];
  lastUpdated: string;
  usedFallback: boolean;
};

export async function getDashboardNewsFeed(): Promise<DashboardFeedResult> {
  const settled = await Promise.allSettled(
    FEEDS.map((f) => parseFeed(f.url, f.sourceName))
  );

  const merged: FeedArticle[] = [];
  for (const s of settled) {
    if (s.status === "fulfilled") merged.push(...s.value);
  }

  const byUrl = new Map<string, FeedArticle>();
  for (const a of merged) {
    if (!byUrl.has(a.href)) byUrl.set(a.href, a);
  }

  const deduped = Array.from(byUrl.values()).sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const top = deduped.slice(0, MAX_ARTICLES);

  if (top.length === 0) {
    return {
      articles: FALLBACK_ARTICLES.slice(0, MAX_ARTICLES),
      lastUpdated: new Date().toISOString(),
      usedFallback: true,
    };
  }

  return {
    articles: top,
    lastUpdated: new Date().toISOString(),
    usedFallback: false,
  };
}

export function getTrendingArticles(articles: FeedArticle[], n = 3): FeedArticle[] {
  return [...articles]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, n);
}
