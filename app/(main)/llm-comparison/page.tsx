"use client";

import type { LucideIcon } from "lucide-react";
import {
  Scale,
  Zap,
  Brain,
  Clock,
  DollarSign,
  Target,
  ChevronDown,
  Lightbulb,
  Sparkles,
  Check,
  X,
  Trophy,
  Code2,
  MessageSquare,
  Cpu,
  Layers,
  Flame,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

/* ─── Rating helpers ────────────────────────────────────────────────────── */

type Rating = "exceptional" | "strong" | "good" | "fair";

const ratingConfig: Record<Rating, { label: string; color: string; bg: string; dots: number }> = {
  exceptional: { label: "Exceptional", color: "text-green-400", bg: "bg-green-400", dots: 5 },
  strong:      { label: "Strong",      color: "text-electric-blue", bg: "bg-electric-blue", dots: 4 },
  good:        { label: "Good",        color: "text-amber-400", bg: "bg-amber-400", dots: 3 },
  fair:        { label: "Fair",        color: "text-orange-400", bg: "bg-orange-400", dots: 2 },
};

function RatingDots({ rating }: { rating: Rating }) {
  const cfg = ratingConfig[rating];
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              i < cfg.dots ? cfg.bg : "bg-secondary"
            )}
          />
        ))}
      </div>
      <span className={cn("text-[11px] font-medium", cfg.color)}>
        {cfg.label}
      </span>
    </div>
  );
}

/* ─── Data ──────────────────────────────────────────────────────────────── */

interface ComparisonRow {
  id: string;
  name: string;
  provider: string;
  badge: string;
  badgeColor: string;
  iconColor: string;
  codeGen: Rating;
  reasoning: Rating;
  contextWindow: string;
  speed: Rating;
  bestUseCase: string;
  pricing: string;
  pricingTier: "free" | "mid" | "premium";
}

const models: ComparisonRow[] = [
  {
    id: "claude",
    name: "Claude Sonnet 4.6 / Opus 4.6",
    provider: "Anthropic",
    badge: "Best for Vibe Coding",
    badgeColor: "text-vibe-purple bg-vibe-purple/10 border-vibe-purple/25",
    iconColor: "from-vibe-purple to-orange-400",
    codeGen: "exceptional",
    reasoning: "exceptional",
    contextWindow: "500K tokens",
    speed: "strong",
    bestUseCase: "Complex multi-file refactors, agentic coding, long reasoning chains",
    pricing: "$3 / $12 per 1M tokens (Sonnet) — $15 / $60 (Opus)",
    pricingTier: "premium",
  },
  {
    id: "gpt",
    name: "GPT-5.4 Codex",
    provider: "OpenAI",
    badge: "Most Versatile",
    badgeColor: "text-green-400 bg-green-400/10 border-green-400/25",
    iconColor: "from-green-400 to-emerald-600",
    codeGen: "exceptional",
    reasoning: "exceptional",
    contextWindow: "256K tokens",
    speed: "exceptional",
    bestUseCase: "Autonomous coding agents, full-stack prototyping, broad language support",
    pricing: "$5 / $15 per 1M tokens (Codex) — $2 / $8 (GPT-5.4 Lite)",
    pricingTier: "premium",
  },
  {
    id: "gemini",
    name: "Gemini 3.0 Ultra",
    provider: "Google",
    badge: "Largest Context",
    badgeColor: "text-electric-blue bg-electric-blue/10 border-electric-blue/25",
    iconColor: "from-electric-blue to-sky-400",
    codeGen: "exceptional",
    reasoning: "exceptional",
    contextWindow: "2M tokens",
    speed: "strong",
    bestUseCase: "Full-codebase analysis, massive context tasks, multimodal inputs",
    pricing: "$1.50 / $6 per 1M tokens (under 500K context)",
    pricingTier: "mid",
  },
  {
    id: "llama",
    name: "Llama 4 Maverick / Behemoth",
    provider: "Meta",
    badge: "Open Source",
    badgeColor: "text-amber-400 bg-amber-400/10 border-amber-400/25",
    iconColor: "from-amber-400 to-orange-500",
    codeGen: "strong",
    reasoning: "exceptional",
    contextWindow: "10M tokens (Maverick) — 2M (Behemoth)",
    speed: "exceptional",
    bestUseCase: "Self-hosted workflows, privacy-critical projects, cost optimization",
    pricing: "Free (self-hosted) — $0.15–0.60/1M via providers",
    pricingTier: "free",
  },
  {
    id: "deepseek",
    name: "DeepSeek R2 / V4",
    provider: "DeepSeek",
    badge: "Best Value",
    badgeColor: "text-pink-400 bg-pink-400/10 border-pink-400/25",
    iconColor: "from-pink-400 to-rose-600",
    codeGen: "exceptional",
    reasoning: "exceptional",
    contextWindow: "256K tokens",
    speed: "good",
    bestUseCase: "Reasoning-heavy tasks, math-intensive code, cost-conscious teams",
    pricing: "$0.40 / $1.80 per 1M tokens (R2) — free V4 tier",
    pricingTier: "free",
  },
];

interface ModelDetail {
  id: string;
  name: string;
  provider: string;
  icon: LucideIcon;
  iconGradient: string;
  bestFor: string;
  overview: string;
  strengths: string[];
  weaknesses: string[];
  cursorTip: string;
}

const modelDetails: ModelDetail[] = [
  {
    id: "claude",
    name: "Claude Sonnet 4.6 & Opus 4.6",
    provider: "Anthropic",
    icon: Brain,
    iconGradient: "from-vibe-purple to-orange-400",
    bestFor: "Best for complex multi-file projects",
    overview:
      "Claude 4.6 is the undisputed leader for vibe coding in 2026. Sonnet 4.6 delivers the ideal balance of speed and depth — it grasps entire project architectures, respects existing conventions, and produces clean, production-ready code with minimal hand-holding. Opus 4.6 is the most capable reasoning model available, able to plan and execute across dozens of interconnected files while maintaining perfect coherence. Both models now ship with a 500K token context window, enough to hold an entire large monorepo in working memory. Anthropic\u2019s continued focus on instruction-following fidelity means Claude almost never drifts off-task, even during long agentic sessions in Cursor.",
    strengths: [
      "Industry-leading code generation quality — produces the cleanest, most idiomatic code of any model across TypeScript, Python, Rust, Go, and more",
      "500K context window handles massive codebases without truncation, a major upgrade from the previous 200K limit",
      "Best instruction-following fidelity of any model — sticks precisely to your requirements without adding unnecessary changes or refactoring code you didn\u2019t ask it to touch",
      "Strongest agentic behavior in Cursor — can chain multi-file edits, run terminal commands, read errors, and self-correct across long sessions without drifting",
      "Opus 4.6\u2019s extended thinking mode produces the deepest step-by-step reasoning of any model, ideal for complex architecture decisions",
    ],
    weaknesses: [
      "Opus 4.6 is expensive at $60/1M output tokens — costs add up quickly in long coding sessions with extended thinking",
      "Can be overly cautious — sometimes declines to write code it considers potentially unsafe or harmful, requiring rephrasing",
      "Sonnet 4.6, while fast, is still slightly slower than GPT-5.4 Codex on simple single-file edits",
      "Occasional tendency to over-engineer solutions when a simpler, more pragmatic approach would suffice",
    ],
    cursorTip:
      "Use Claude Sonnet 4.6 as your default model in Cursor for all day-to-day coding — it has the best cost-to-quality ratio at the frontier. Switch to Opus 4.6 when you need deep multi-step reasoning: full-feature implementations, large refactors, or debugging gnarly architectural issues. In Agent mode, Claude excels — let it run terminal commands, read linter output, and self-correct. Always provide specific, clear instructions; Claude rewards precision over vagueness and will follow detailed prompts faithfully.",
  },
  {
    id: "gpt",
    name: "GPT-5.4 Codex",
    provider: "OpenAI",
    icon: Sparkles,
    iconGradient: "from-green-400 to-emerald-600",
    bestFor: "Best for autonomous coding agents & rapid prototyping",
    overview:
      "GPT-5.4 Codex represents OpenAI\u2019s most significant leap in code-focused AI. Built on the GPT-5 foundation with specialized code fine-tuning, Codex delivers near-instant responses for inline edits while also supporting deep extended-thinking mode for complex architectural problems. The 256K context window is a major step up from GPT-4o\u2019s 128K, and the model excels at autonomous multi-step task execution — planning, writing, testing, and iterating without human intervention. OpenAI has also shipped a lighter GPT-5.4 Lite variant for high-volume, cost-sensitive use cases. The ecosystem advantage remains massive: every major tool, extension, and platform supports GPT-5.4 out of the box.",
    strengths: [
      "Fastest time-to-first-token of any frontier model — Codex feels near-instant for inline edits and Tab completions",
      "Best autonomous coding agent capabilities — can plan, write, execute, test, and iterate multi-step tasks end-to-end",
      "256K token context window with minimal quality degradation at long lengths",
      "Broadest language and framework coverage — excels on niche stacks, legacy code, and less-common languages where other models stumble",
      "Massive ecosystem integration — first-class support in every editor, extension, and API wrapper from day one",
    ],
    weaknesses: [
      "Still occasionally introduces subtle bugs in complex logic — requires more careful review than Claude Sonnet 4.6",
      "Less disciplined at following long, detailed instructions — can skip requirements or add unrequested features and refactors",
      "Premium Codex pricing at $15/1M output tokens adds up in heavy agentic use compared to Claude Sonnet 4.6",
      "Extended thinking mode, while powerful, can be slow and expensive — sometimes overkill for straightforward tasks",
    ],
    cursorTip:
      "Use GPT-5.4 Codex as your go-to for speed-critical work — Tab completions, quick inline edits, and rapid prototyping where latency matters most. Its autonomous agent mode is excellent for multi-step tasks like \u201Cbuild this feature end-to-end.\u201D For long, precise refactoring sessions, Claude Sonnet 4.6 often produces tighter results. If you hit hallucinated imports or APIs, use @-mentions to pin specific files as context. GPT-5.4 Lite is a great option for high-volume background tasks like test generation.",
  },
  {
    id: "gemini",
    name: "Gemini 3.0 Ultra",
    provider: "Google",
    icon: Layers,
    iconGradient: "from-electric-blue to-sky-400",
    bestFor: "Best for full-codebase understanding",
    overview:
      "Gemini 3.0 Ultra pushes the context window to a staggering 2 million tokens — enough to ingest an entire large-scale production codebase, its test suites, documentation, and CI configs in a single prompt. This makes it uniquely dominant for tasks that require holistic understanding: full-codebase refactors, framework migrations, architectural audits, and tracing data flow across hundreds of files. Google has also dramatically improved code generation quality over the 2.5 generation — Gemini 3.0 now matches Claude and GPT-5.4 on standard coding benchmarks. The pricing remains aggressive at $1.50/1M input tokens, making it the most cost-effective frontier model for heavy context workloads.",
    strengths: [
      "2 million token context window — can ingest entire production codebases, design docs, and test suites in a single prompt",
      "Code generation quality now matches Claude Sonnet 4.6 and GPT-5.4 Codex on standard benchmarks, a major leap from Gemini 2.5",
      "Best multimodal capabilities — analyze screenshots, wireframes, Figma exports, or architecture diagrams alongside code",
      "Most affordable frontier model per token — roughly 60% cheaper than GPT-5.4 Codex for comparable quality",
      "Native thinking mode with transparent reasoning chains that you can inspect during generation",
    ],
    weaknesses: [
      "Speed degrades noticeably at very long context lengths (>1M tokens) — plan for slower responses on full-codebase prompts",
      "Can produce slightly verbose code with more boilerplate than Claude or Codex would write for the same task",
      "Less battle-tested in Cursor specifically — community has less shared knowledge on optimal prompt patterns",
      "Occasionally inconsistent with TypeScript types in deeply nested generic patterns",
    ],
    cursorTip:
      "Gemini 3.0 Ultra is your power tool for whole-codebase reasoning. Use @codebase in Cursor to let it index everything, then ask architectural questions, plan migrations, or trace complex data flows. For day-to-day coding, pair it with Claude: use Gemini for planning and analysis, Claude for execution. Its thinking mode is especially useful for debugging — ask it to trace through execution paths step by step. The 2M context window makes it unbeatable for \u201Crefactor this entire module\u201D style tasks.",
  },
  {
    id: "llama",
    name: "Llama 4 Maverick / Behemoth",
    provider: "Meta",
    icon: Flame,
    iconGradient: "from-amber-400 to-orange-500",
    bestFor: "Best for self-hosted & privacy-critical workflows",
    overview:
      "Meta\u2019s Llama 4 family has closed the gap with proprietary models faster than anyone expected. Maverick, with its 10 million token context window and mixture-of-experts architecture (400B total params, 17B active per forward pass), delivers frontier-competitive performance while remaining fully self-hostable. Behemoth (2T total params, ~50B active) is the open-source heavyweight, matching GPT-5.4 Codex on reasoning benchmarks while being free to run on your own infrastructure. Both models can be self-hosted via Ollama or vLLM, or accessed cheaply through API providers like Together, Groq, and Fireworks. For teams that need full data sovereignty or want to eliminate per-token costs, Llama 4 is now a genuinely frontier-class option.",
    strengths: [
      "Fully open-source and free to use — zero API costs when self-hosted, with permissive licensing for commercial use",
      "Maverick\u2019s 10M token context window is the largest of any model, enabling truly massive codebase ingestion",
      "Behemoth matches proprietary frontier models on reasoning and code generation benchmarks like SWE-bench and HumanEval",
      "Mixture-of-experts architecture keeps inference fast despite enormous total parameter counts — only 17–50B params active per pass",
      "Complete data sovereignty — nothing leaves your infrastructure, critical for proprietary codebases and regulated industries",
    ],
    weaknesses: [
      "Behemoth requires serious GPU infrastructure for self-hosting — multiple high-VRAM A100/H100 cards or equivalent",
      "Instruction following is less precise than Claude Sonnet 4.6 — needs more explicit, structured prompts to stay on track",
      "Quantized versions sacrifice meaningful quality — full-precision models require substantial compute",
      "Community tooling for fine-tuning and deployment is still maturing compared to the proprietary ecosystem",
    ],
    cursorTip:
      "Run Llama 4 Maverick locally via Ollama and connect it to Cursor as a custom model for zero-cost Tab completions and everyday edits — it\u2019s fast and free. Use Behemoth via Together or Fireworks for heavier tasks where you need reasoning depth but want to avoid Anthropic/OpenAI costs. Reserve Claude and Codex for the highest-stakes work. Llama is ideal for high-volume, cost-sensitive tasks: test generation, docstrings, boilerplate scaffolding, and code review summaries.",
  },
  {
    id: "deepseek",
    name: "DeepSeek R2 / V4",
    provider: "DeepSeek",
    icon: Cpu,
    iconGradient: "from-pink-400 to-rose-600",
    bestFor: "Best for reasoning-heavy tasks on a budget",
    overview:
      "DeepSeek R2 builds on the R1 breakthrough that shocked the industry, delivering reasoning capabilities that now match OpenAI\u2019s best extended-thinking models at a fraction of the cost. R2\u2019s chain-of-thought reasoning excels at algorithmic challenges, math-heavy code, complex debugging, and any task where the model needs to deeply think before writing. The 256K context window is a major upgrade from R1\u2019s 128K, and overall code generation quality has jumped significantly. V4 complements R2 as a fast, lightweight option for standard coding — competitive with GPT-5.4 Lite but at even lower cost. The pricing remains the most aggressive in the industry at $0.40/1M input tokens for R2.",
    strengths: [
      "Exceptional chain-of-thought reasoning — transparent thinking process you can follow, verify, and learn from",
      "Matches the best proprietary reasoning models on algorithmic and math-intensive programming tasks",
      "Dramatically lower cost than any comparable reasoning model — R2 at $0.40/1M input tokens is roughly 12x cheaper than GPT-5.4 Codex",
      "256K context window with strong performance at long lengths, up from R1\u2019s 128K",
      "V4 provides a fast, cheap daily-driver option — excellent code completion quality at near-free pricing",
    ],
    weaknesses: [
      "R2\u2019s extended reasoning is noticeably slower than Claude Sonnet 4.6 or GPT-5.4 Codex for simple tasks",
      "API availability and rate limits have improved but still lag behind OpenAI and Anthropic in reliability",
      "Front-end and UI code quality (CSS, React components, styling) still trails Claude and Codex",
      "Less effective at long multi-file agentic edits compared to Claude — better suited to focused, single-file deep-thinking tasks",
    ],
    cursorTip:
      "DeepSeek R2 is your secret weapon for hard algorithmic problems. When you\u2019re stuck on a logic bug, need to implement a complex data structure, or want to reason through a tricky optimization, switch to R2 and ask it to think step-by-step before coding. For everyday vibe coding, V4 is an excellent budget daily-driver — connect it through OpenRouter in Cursor\u2019s model settings. Avoid R2 for large UI builds; pair it with Claude instead — use R2 to solve the hard logic, then Claude to integrate it cleanly into your project.",
  },
];

/* ─── Sub-components ────────────────────────────────────────────────────── */

function PricingBadge({ tier }: { tier: ComparisonRow["pricingTier"] }) {
  const styles = {
    free: "text-green-400 bg-green-400/10 border-green-400/25",
    mid: "text-electric-blue bg-electric-blue/10 border-electric-blue/25",
    premium: "text-vibe-purple bg-vibe-purple/10 border-vibe-purple/25",
  };
  const labels = { free: "$ Free / Low", mid: "$$ Mid", premium: "$$$ Premium" };
  return (
    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap", styles[tier])}>
      {labels[tier]}
    </span>
  );
}

function ModelCard({ model }: { model: ModelDetail }) {
  const matching = models.find((m) => m.id === model.id);

  return (
    <Collapsible>
      <Card className="border-border bg-card hover:border-muted-foreground/20 transition-all">
        <CollapsibleTrigger className="w-full text-left cursor-pointer group">
          <CardHeader className="pb-0">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div
                className={cn(
                  "w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 shadow-lg",
                  model.iconGradient
                )}
              >
                <model.icon className="w-5 h-5 text-white" />
              </div>

              {/* Title + meta */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <CardTitle className="text-base font-semibold text-foreground">
                    {model.name}
                  </CardTitle>
                  {matching && (
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border", matching.badgeColor)}>
                      {matching.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{model.provider}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <Target className="w-3 h-3 text-electric-blue flex-shrink-0" />
                  <span className="text-[11px] font-medium text-electric-blue">
                    {model.bestFor}
                  </span>
                </div>
              </div>

              {/* Expand chevron */}
              <ChevronDown className="w-5 h-5 text-muted-foreground group-data-[panel-open]:rotate-180 transition-transform flex-shrink-0 mt-1" />
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-5 space-y-5">
            {/* Overview */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {model.overview}
            </p>

            {/* Strengths & Weaknesses side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-green-400/15 bg-green-400/5 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-green-400 mb-3 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  Key Strengths
                </h4>
                <ul className="space-y-2">
                  {model.strengths.map((s, i) => (
                    <li key={i} className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                      <Check className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-orange-400/15 bg-orange-400/5 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-3 flex items-center gap-1.5">
                  <X className="w-3.5 h-3.5" />
                  Key Weaknesses
                </h4>
                <ul className="space-y-2">
                  {model.weaknesses.map((w, i) => (
                    <li key={i} className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                      <X className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pro tip */}
            <div className="rounded-lg border border-vibe-purple/20 bg-gradient-to-r from-vibe-purple/10 to-electric-blue/5 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-vibe-purple mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                Pro Tip — Using in Cursor
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {model.cursorTip}
              </p>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function LLMComparisonPage() {
  return (
    <div className="p-5 space-y-8 max-w-[1400px] mx-auto">
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl border border-vibe-purple/25 bg-gradient-to-br from-[#1a0a35] via-[#0f0820] to-[#030a1a] p-8 md:p-10">
        <div className="absolute -left-16 -top-16 w-72 h-72 rounded-full bg-vibe-purple/20 blur-3xl pointer-events-none" />
        <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full bg-electric-blue/15 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="p-2 rounded-lg gradient-bg shadow-lg shadow-electric-blue/20">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-electric-blue bg-electric-blue/10 border border-electric-blue/25 px-2 py-0.5 rounded-full">
              2026 Rankings
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
            The Top 5 LLMs for{" "}
            <span className="gradient-text">Vibe Coding</span>
          </h1>
          <p className="text-sm md:text-base text-white/60 max-w-2xl leading-relaxed">
            Not all language models are created equal — especially when it comes to
            writing real code. Understanding each model&apos;s strengths in code generation,
            reasoning depth, context handling, and speed helps you pick the right tool
            for every task and get the most out of AI-assisted development in Cursor.
          </p>
        </div>
      </div>

      {/* ── Comparison Table ──────────────────────────────────────────────── */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-1 h-5 rounded-full gradient-bg" />
            <div>
              <h2 className="font-semibold text-foreground text-sm">
                Head-to-Head Comparison
              </h2>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Ratings based on standardized coding benchmarks, real-world developer testing, and community feedback
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400" /> Exceptional</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-electric-blue" /> Strong</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> Good</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-400" /> Fair</span>
          </div>
        </div>

        <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/30 hover:bg-secondary/30">
              <TableHead className="px-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-[200px]">
                Model
              </TableHead>
              <TableHead className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><Code2 className="w-3 h-3" /> Code Gen</span>
              </TableHead>
              <TableHead className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><Brain className="w-3 h-3" /> Reasoning</span>
              </TableHead>
              <TableHead className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><MessageSquare className="w-3 h-3" /> Context</span>
              </TableHead>
              <TableHead className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> Speed</span>
              </TableHead>
              <TableHead className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider min-w-[200px]">
                <span className="flex items-center gap-1.5"><Target className="w-3 h-3" /> Best Vibe Coding Use Case</span>
              </TableHead>
              <TableHead className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><DollarSign className="w-3 h-3" /> Pricing</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {models.map((m) => (
              <TableRow key={m.id} className="hover:bg-white/[0.02]">
                <TableCell className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center flex-shrink-0 shadow-md", m.iconColor)}>
                      <Scale className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-foreground whitespace-normal leading-snug">{m.name}</p>
                      <p className="text-[10px] text-muted-foreground">{m.provider}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-4"><RatingDots rating={m.codeGen} /></TableCell>
                <TableCell className="px-4 py-4"><RatingDots rating={m.reasoning} /></TableCell>
                <TableCell className="px-4 py-4">
                  <span className="text-xs font-medium text-foreground">{m.contextWindow}</span>
                </TableCell>
                <TableCell className="px-4 py-4"><RatingDots rating={m.speed} /></TableCell>
                <TableCell className="px-4 py-4">
                  <span className="text-xs text-muted-foreground leading-snug whitespace-normal">{m.bestUseCase}</span>
                </TableCell>
                <TableCell className="px-4 py-4">
                  <div className="space-y-1.5">
                    <PricingBadge tier={m.pricingTier} />
                    <p className="text-[10px] text-muted-foreground leading-snug whitespace-normal">{m.pricing}</p>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </div>

      {/* ── Individual Model Cards ────────────────────────────────────────── */}
      <div className="space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="w-1 h-5 rounded-full gradient-bg" />
          <h2 className="text-base font-semibold text-foreground">
            Deep Dive — Model Profiles
          </h2>
          <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-secondary border border-border">
            Click to expand
          </span>
        </div>

        <div className="space-y-3">
          {modelDetails.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      </div>

      {/* ── Bottom note ───────────────────────────────────────────────────── */}
      <div className="rounded-xl border border-electric-blue/20 bg-gradient-to-r from-electric-blue/5 to-vibe-purple/5 p-6 text-center">
        <div className="flex justify-center mb-3">
          <div className="p-2.5 rounded-xl gradient-bg shadow-lg shadow-electric-blue/20">
            <Zap className="w-5 h-5 text-white" />
          </div>
        </div>
        <h3 className="font-semibold text-foreground mb-1.5">No single model wins everything</h3>
        <p className="text-xs text-muted-foreground max-w-lg mx-auto leading-relaxed">
          The best vibe coders use multiple models strategically — fast models for quick edits,
          reasoning models for hard problems, and large-context models for full-codebase tasks.
          Cursor lets you switch between them in seconds.
        </p>
      </div>
    </div>
  );
}
