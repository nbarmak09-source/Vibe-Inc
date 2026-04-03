"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CodePlayground } from "./code-playground";
import type { CodePlaygroundTab } from "./code-playground";

export const EXPAND_LAYER_EVENT = "architecture-expand-layer";

type LayerDef = {
  id: string;
  icon: string;
  name: string;
  subtitle: string;
  description: string;
  techBadges: string[];
  tab: CodePlaygroundTab;
  gradient: string;
  border: string;
  badgeBg: string;
  activeRing: string;
};

const LAYERS: LayerDef[] = [
  {
    id: "browser",
    icon: "🖥️",
    name: "USER / BROWSER",
    subtitle: "Where the experience happens",
    gradient: "from-sky-500/15 to-sky-600/5",
    border: "border-sky-500/30",
    badgeBg: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    activeRing: "ring-1 ring-sky-500/40 shadow-sky-500/20 shadow-lg",
    description:
      "The browser is the window your users look through. It downloads HTML, CSS, and JavaScript from the frontend server, renders the visual interface, and sends HTTP requests when the user clicks, submits a form, or navigates to a new page. Every user interaction starts here.",
    techBadges: ["Chrome", "Safari", "Firefox", "HTTP/HTTPS", "WebSockets", "localStorage"],
    tab: {
      id: "browser-ex",
      filename: "http-request.txt",
      language: "text",
      code: `GET /api/students HTTP/1.1
Host: studyfocus.vercel.app
Accept: application/json
Authorization: Bearer eyJhbGci...

─── Response ─────────────────────────
HTTP/1.1 200 OK
Content-Type: application/json

[
  { "name": "Maya",   "score": 92 },
  { "name": "Jordan", "score": 87 }
]`,
    },
  },
  {
    id: "frontend",
    icon: "🎨",
    name: "FRONTEND",
    subtitle: "HTML · CSS · JavaScript / TypeScript",
    gradient: "from-blue-500/15 to-blue-600/5",
    border: "border-blue-500/30",
    badgeBg: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    activeRing: "ring-1 ring-blue-500/40 shadow-blue-500/20 shadow-lg",
    description:
      "The frontend is everything the user sees. React components build the UI, Tailwind CSS styles it, and TypeScript keeps it safe. When a user clicks a button, JavaScript fires a fetch() call to the backend API and re-renders the screen with new data — no full page reload needed.",
    techBadges: ["React", "Next.js", "Tailwind CSS", "TypeScript", "HTML", "CSS"],
    tab: {
      id: "frontend-ex",
      filename: "StudentCard.tsx",
      language: "typescript",
      code: `// components/StudentCard.tsx
export default function StudentCard({
  name,
  score,
}: {
  name: string;
  score: number;
}) {
  return (
    <div className="rounded-xl bg-card p-4 border border-border">
      <h2 className="font-bold text-foreground">{name}</h2>
      <p className="text-sm text-green-400 mt-1">Score: {score}</p>
    </div>
  );
}`,
      explanation:
        "A React component typed with TypeScript. Tailwind classes handle all styling. This gets rendered on the server and sent as HTML to the browser, then React takes over for interactive updates.",
    },
  },
  {
    id: "backend",
    icon: "⚙️",
    name: "BACKEND",
    subtitle: "Node.js · Python · APIs",
    gradient: "from-purple-500/15 to-purple-600/5",
    border: "border-purple-500/30",
    badgeBg: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    activeRing: "ring-1 ring-purple-500/40 shadow-purple-500/20 shadow-lg",
    description:
      "The backend is the brain of the app. API routes receive requests from the frontend, apply business logic (auth, calculations, validation), call external services like OpenAI or Stripe, and query the database. In Next.js, these live in app/api/ as server-side Route Handlers — the browser never sees this code.",
    techBadges: ["Node.js", "Next.js API Routes", "TypeScript", "Python", "REST", "OpenAI SDK"],
    tab: {
      id: "backend-ex",
      filename: "route.ts",
      language: "typescript",
      code: `// app/api/students/route.ts
import { createClient } from "@/lib/supabase";

export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("students")
    .select("name, score")
    .order("score", { ascending: false });

  if (error) {
    return Response.json({ error }, { status: 500 });
  }
  return Response.json(data);
}`,
      explanation:
        "A Next.js Route Handler that runs on the server only. The frontend calls GET /api/students and receives JSON back. The backend decides what data to expose and applies any auth checks before responding.",
    },
  },
  {
    id: "database",
    icon: "🗄️",
    name: "DATABASE",
    subtitle: "SQL · Supabase · PostgreSQL",
    gradient: "from-green-500/15 to-green-600/5",
    border: "border-green-500/30",
    badgeBg: "bg-green-500/15 text-green-300 border-green-500/30",
    activeRing: "ring-1 ring-green-500/40 shadow-green-500/20 shadow-lg",
    description:
      "The database stores everything your app needs to remember: users, sessions, scores, content, and the relationships between records. Supabase wraps PostgreSQL with a visual dashboard, row-level security, and a JavaScript SDK so your backend can read and write data with a single line of code.",
    techBadges: ["PostgreSQL", "Supabase", "SQL", "Row-Level Security", "Realtime", "Prisma"],
    tab: {
      id: "db-ex",
      filename: "query.sql",
      language: "sql",
      code: `-- Find top-scoring students at Western
SELECT
  name,
  score,
  enrolled_at
FROM students
WHERE school = 'Western'
  AND score > 85
ORDER BY score DESC
LIMIT 10;`,
      explanation:
        "The backend writes SQL queries like this (or uses a library like Supabase SDK that generates SQL automatically). The database executes the query and returns matching rows as structured data.",
    },
  },
  {
    id: "infrastructure",
    icon: "📡",
    name: "INFRASTRUCTURE",
    subtitle: "Vercel · GitHub · Domains",
    gradient: "from-amber-500/15 to-amber-600/5",
    border: "border-amber-500/30",
    badgeBg: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    activeRing: "ring-1 ring-amber-500/40 shadow-amber-500/20 shadow-lg",
    description:
      "Infrastructure makes your app available to the world. Vercel hosts your Next.js app on a global CDN and auto-deploys every time you push to GitHub — in about 60 seconds. Environment variables (API keys, database URLs) are stored securely in Vercel's dashboard, never in your code.",
    techBadges: ["Vercel", "GitHub", "Custom Domains", "SSL/TLS", "CDN", "Edge Network"],
    tab: {
      id: "infra-ex",
      filename: "vercel.json",
      language: "javascript",
      code: `// vercel.json — deployment config
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase_url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase_anon",
    "ANTHROPIC_API_KEY": "@anthropic_key"
  }
}`,
      explanation:
        "Every git push triggers a Vercel build. Environment variables live here securely — your API keys are injected at runtime and never appear in your code repository.",
    },
  },
];

const ARROW_LABELS = [
  "HTTP Request / Rendered Page",
  "API Calls / JSON Data",
  "Queries / Records",
  "Hosted on / Deployed to",
];

const WALKTHROUGH_ORDER = [
  "infrastructure",
  "database",
  "backend",
  "frontend",
  "browser",
];

export function ArchitectureDiagram({ className }: { className?: string }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isWalkthrough, setIsWalkthrough] = useState(false);
  const walkthroughRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopWalkthrough = useCallback(() => {
    setIsWalkthrough(false);
    if (walkthroughRef.current) {
      clearTimeout(walkthroughRef.current);
      walkthroughRef.current = null;
    }
  }, []);

  const startWalkthrough = useCallback(() => {
    stopWalkthrough();
    setIsWalkthrough(true);

    const advance = (index: number) => {
      if (index >= WALKTHROUGH_ORDER.length) {
        setIsWalkthrough(false);
        return;
      }
      setExpandedId(WALKTHROUGH_ORDER[index]);
      walkthroughRef.current = setTimeout(() => advance(index + 1), 3200);
    };

    advance(0);
  }, [stopWalkthrough]);

  useEffect(() => {
    const handleExpand = (e: Event) => {
      const layerId = (e as CustomEvent<{ layerId: string }>).detail?.layerId;
      if (layerId) {
        setExpandedId((prev) => (prev === layerId ? null : layerId));
      }
    };
    window.addEventListener(EXPAND_LAYER_EVENT, handleExpand);
    return () => window.removeEventListener(EXPAND_LAYER_EVENT, handleExpand);
  }, []);

  useEffect(() => {
    return () => {
      if (walkthroughRef.current) clearTimeout(walkthroughRef.current);
    };
  }, []);

  const toggleLayer = (id: string) => {
    if (isWalkthrough) stopWalkthrough();
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div id="architecture-diagram" className={cn("w-full scroll-mt-24", className)}>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4 sm:mb-8">
        <div className="min-w-0 max-w-3xl">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
            Interactive Diagram
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            Click any layer to expand it and explore the tools, code, and data flow.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "gap-2 transition-all duration-200",
            isWalkthrough
              ? "border-electric-blue/50 bg-electric-blue/10 text-electric-blue hover:bg-electric-blue/15"
              : "hover:border-electric-blue/40"
          )}
          onClick={isWalkthrough ? stopWalkthrough : startWalkthrough}
        >
          {isWalkthrough ? (
            <>
              <Square className="h-3 w-3 fill-current" />
              Stop Tour
            </>
          ) : (
            <>
              <Play className="h-3 w-3 fill-current" />
              🎬 Walk Through
            </>
          )}
        </Button>
      </div>

      {/* Layer stack */}
      <div className="space-y-0">
        {LAYERS.map((layer, index) => {
          const isExpanded = expandedId === layer.id;
          const arrowLabel = index < ARROW_LABELS.length ? ARROW_LABELS[index] : null;

          return (
            <div key={layer.id}>
              {/* Layer card */}
              <div
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                onClick={() => toggleLayer(layer.id)}
                onKeyDown={(e) => e.key === "Enter" && toggleLayer(layer.id)}
                className={cn(
                  "relative cursor-pointer rounded-xl border transition-all duration-250 bg-gradient-to-r",
                  layer.gradient,
                  layer.border,
                  isExpanded
                    ? layer.activeRing
                    : "hover:scale-[1.004] hover:shadow-md hover:shadow-black/20"
                )}
              >
                {/* Header row — always visible */}
                <div className="flex items-center justify-between gap-4 px-6 py-5 sm:px-8 sm:py-6">
                  <div className="flex min-w-0 items-center gap-4">
                    <span className="flex-shrink-0 text-2xl sm:text-3xl">{layer.icon}</span>
                    <div className="min-w-0">
                      <p className="text-base font-bold tracking-wide text-foreground sm:text-lg">
                        {layer.name}
                      </p>
                      <p className="mt-0.5 truncate text-sm text-muted-foreground">
                        {layer.subtitle}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 flex-shrink-0 text-muted-foreground/50 transition-transform duration-300",
                      isExpanded && "rotate-180"
                    )}
                  />
                </div>

                {/* Expandable content — CSS grid-rows trick for smooth animation */}
                <div
                  className={cn(
                    "grid transition-all duration-350 ease-in-out",
                    isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div
                      className="space-y-6 px-6 pb-8 pt-1 sm:px-8 sm:pb-10"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="h-px bg-white/10" />

                      <p className="text-base leading-relaxed text-muted-foreground">
                        {layer.description}
                      </p>

                      {/* Tech badges */}
                      <div className="flex flex-wrap gap-2.5">
                        {layer.techBadges.map((badge) => (
                          <span
                            key={badge}
                            className={cn(
                              "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                              layer.badgeBg
                            )}
                          >
                            {badge}
                          </span>
                        ))}
                      </div>

                      {/* Code example */}
                      <CodePlayground tabs={[layer.tab]} className="w-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated arrow between layers */}
              {arrowLabel && (
                <div className="flex items-center justify-center gap-3 py-2.5">
                  <ArrowConnector />
                  <span className="text-[11px] font-medium tracking-wide text-muted-foreground/50">
                    {arrowLabel}
                  </span>
                  <ArrowConnector />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ArrowConnector() {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="h-2.5 w-px animate-pulse bg-muted-foreground/25" />
      <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground/25" />
      <div className="h-2.5 w-px animate-pulse bg-muted-foreground/25" />
    </div>
  );
}
