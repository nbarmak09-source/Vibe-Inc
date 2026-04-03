import Link from "next/link";
import {
  ChevronRight,
  Zap,
  Code2,
  MessageSquare,
  Sparkles,
  Check,
  Terminal,
  Lightbulb,
  Layers,
  GitBranch,
  Globe,
  Database,
  Package,
  RotateCcw,
  Rocket,
  Key,
  ArrowUpRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ChatDemo, type ChatMessage } from "@/components/vibe101/chat-demo";
import {
  LessonBlock,
  KnowledgeCheck,
  ProgressSidebar,
  InteractiveCallout,
  CodePlayground,
} from "@/components/education";
import type { KnowledgeCheckQuestion, ProgressSidebarItem, CodePlaygroundTab } from "@/components/education";

/* ─── Progress sidebar items ─────────────────────────────────────────────── */

const progressItems: ProgressSidebarItem[] = [
  { id: "lesson-1", title: "What is Vibe Coding?",   type: "lesson",          completionId: "lesson-1" },
  { id: "check-1",  title: "Knowledge Check 1",       type: "knowledge-check", completionId: "check-1"  },
  { id: "lesson-2", title: "Choosing Your Tools",     type: "lesson",          completionId: "lesson-2" },
  { id: "check-2",  title: "Knowledge Check 2",       type: "knowledge-check", completionId: "check-2"  },
  { id: "lesson-3", title: "The Brainstorm Phase",    type: "lesson",          completionId: "lesson-3" },
  { id: "check-3",  title: "Knowledge Check 3",       type: "knowledge-check", completionId: "check-3"  },
  { id: "lesson-4", title: "Building & Iterating",    type: "lesson",          completionId: "lesson-4" },
  { id: "check-4",  title: "Knowledge Check 4",       type: "knowledge-check", completionId: "check-4"  },
  { id: "lesson-5", title: "Debugging & Errors",      type: "lesson",          completionId: "lesson-5" },
  { id: "check-5",  title: "Knowledge Check 5",       type: "knowledge-check", completionId: "check-5"  },
  { id: "lesson-6", title: "The Ecosystem",           type: "lesson",          completionId: "lesson-6" },
  { id: "check-6",  title: "Knowledge Check 6",       type: "knowledge-check", completionId: "check-6"  },
  { id: "lesson-7", title: "Publishing Your App",     type: "lesson",          completionId: "lesson-7" },
];

/* ─── Knowledge check questions ──────────────────────────────────────────── */

const check1Questions: KnowledgeCheckQuestion[] = [
  {
    type: "multiple-choice",
    question: "What is vibe coding?",
    options: [
      "Writing code by hand using traditional programming syntax",
      "Describing what you want in natural language and letting AI generate code",
      "Copying code from Stack Overflow into your project",
      "Using spreadsheets to build web applications",
    ],
    correctAnswer: "Describing what you want in natural language and letting AI generate code",
    explanation:
      "Vibe coding means describing your desired outcome in plain language so an AI model can write the code for you — no syntax memorization required.",
  },
  {
    type: "true-false",
    question: "You need a CS degree to vibe code.",
    correctAnswer: "False",
    explanation:
      "Vibe coding is specifically designed for non-developers. You need to know what you want to build, not how to write code.",
  },
  {
    type: "multiple-choice",
    question: "Which of the following can you realistically build with vibe coding today?",
    options: [
      "A real-time trading engine processing millions of transactions per second",
      "A personal portfolio website",
      "An operating system kernel",
      "A distributed database replacing PostgreSQL",
    ],
    correctAnswer: "A personal portfolio website",
    explanation:
      "Portfolio websites, landing pages, web apps, and internal dashboards are all within reach. Complex systems like operating systems or trading engines require deep engineering expertise.",
  },
];

const check2Questions: KnowledgeCheckQuestion[] = [
  {
    type: "multiple-choice",
    question: "Which Cursor mode builds features across multiple files automatically?",
    options: ["Chat mode", "Agent mode", "Inline Edit (Cmd+K)", "Preview mode"],
    correctAnswer: "Agent mode",
    explanation:
      "Agent mode (⌘I) gives Cursor a goal and lets it plan, create files, write code, and self-correct across your entire project.",
  },
  {
    type: "multiple-choice",
    question: "You see an error and want to understand what it means. Which Cursor mode is best?",
    options: ["Agent mode", "Chat mode", "Inline Edit", "Terminal mode"],
    correctAnswer: "Chat mode",
    explanation:
      "Chat mode (⌘L) is ideal for asking questions, understanding errors, and getting explanations without making direct code changes.",
  },
  {
    type: "fill-blank",
    question: "The Cursor keyboard shortcut for inline edits on a selected block of code is ___",
    correctAnswer: "Cmd+K",
    explanation:
      "Cmd+K (or Ctrl+K on Windows) opens Inline Edit mode, which lets you describe a change to a selected block and apply it precisely in place.",
  },
];

const check3Questions: KnowledgeCheckQuestion[] = [
  {
    type: "true-false",
    question: "You should start building in Cursor immediately once you have an app idea.",
    correctAnswer: "False",
    explanation:
      "Jumping straight into Cursor without planning is the #1 mistake new vibe coders make. Thirty minutes of brainstorming saves hours of rework.",
  },
  {
    type: "multiple-choice",
    question: "What does PRD stand for?",
    options: [
      "Product Review Document",
      "Product Requirements Document",
      "Project Roadmap Draft",
      "Program Resource Definition",
    ],
    correctAnswer: "Product Requirements Document",
    explanation:
      "A PRD (Product Requirements Document) defines what you're building, who it's for, what it does, and what it doesn't do — your north star for the entire build.",
  },
  {
    type: "multiple-choice",
    question: "What is the best first brainstorm message to send an AI?",
    options: [
      "\"Build me a study app\"",
      "\"Here's my idea and target audience, help me define the core features\"",
      "\"Write code for a Next.js app\"",
      "\"What tech stack should I use?\"",
    ],
    correctAnswer: "\"Here's my idea and target audience, help me define the core features\"",
    explanation:
      "Starting with context about your idea and target audience lets the AI ask the right clarifying questions and help you scope your project correctly.",
  },
];

const check4Questions: KnowledgeCheckQuestion[] = [
  {
    type: "fill-blank",
    question: "The four parts of a good Cursor prompt are: Context, What to build, ___, and Style details.",
    correctAnswer: "Constraints",
    explanation:
      "Every effective Cursor prompt needs Context (what exists), What to build (the feature), Constraints (frameworks, file locations, what to avoid), and Style & behavior details.",
  },
  {
    type: "multiple-choice",
    question: "You want to make a quick change to a single line of code. Which Cursor mode should you use?",
    options: ["Agent mode (⌘I)", "Chat mode (⌘L)", "Inline Edit (⌘K)", "Terminal"],
    correctAnswer: "Inline Edit (⌘K)",
    explanation:
      "Cmd+K is designed for surgical, targeted edits to a specific block — perfect for quick single-line or single-function changes.",
  },
  {
    type: "true-false",
    question: "You should always accept every change Cursor suggests without reviewing the diff.",
    correctAnswer: "False",
    explanation:
      "Always review Cursor's diff before accepting. You don't need to understand every line, but confirming it's editing the right files and in the right direction is essential.",
  },
];

const check5Questions: KnowledgeCheckQuestion[] = [
  {
    type: "multiple-choice",
    question: "What is the first thing you should do when you encounter an error?",
    options: [
      "Immediately paste it into Cursor without reading it",
      "Restart your computer",
      "Read the error message carefully",
      "Delete the file that caused it",
    ],
    correctAnswer: "Read the error message carefully",
    explanation:
      "Error messages contain the file name, line number, error type, and a plain-English description. Reading it carefully tells you exactly where to look before asking AI for help.",
  },
  {
    type: "true-false",
    question: "If Cursor fails to fix an error after 2 attempts, you should keep trying the same approach.",
    correctAnswer: "False",
    explanation:
      "If the AI loops on an error, switch strategies: undo to a working state, start a fresh Chat with full context, switch models, or break the problem into smaller pieces.",
  },
  {
    type: "multiple-choice",
    question: "What terminal command installs missing npm packages?",
    options: ["npm start", "npm install [package-name]", "npm build", "npm fix"],
    correctAnswer: "npm install [package-name]",
    explanation:
      "When you see 'Cannot find module', run npm install [package-name] in your terminal, then restart the dev server.",
  },
];

const check6Questions: KnowledgeCheckQuestion[] = [
  {
    type: "multiple-choice",
    question: "What is Supabase primarily used for in a vibe coding project?",
    options: [
      "Deploying your Next.js app to the internet",
      "Database and authentication",
      "Generating UI components from text",
      "Managing npm packages",
    ],
    correctAnswer: "Database and authentication",
    explanation:
      "Supabase provides a PostgreSQL database, user authentication, and file storage — all the backend infrastructure most apps need, with a visual dashboard and generous free tier.",
  },
  {
    type: "fill-blank",
    question: "To deploy a Next.js app, push your code to GitHub and connect your repository to ___",
    correctAnswer: "Vercel",
    explanation:
      "Vercel (the creators of Next.js) auto-detects your Next.js project, builds it, and deploys it globally in under 2 minutes. Every git push auto-redeploys.",
  },
  {
    type: "true-false",
    question: "It's safe to put API keys directly in your code and push them to GitHub.",
    correctAnswer: "False",
    explanation:
      "API keys in code are a serious security risk. Store them in .env.local (automatically git-ignored) and in Vercel's environment variable dashboard for your deployed app.",
  },
];

/* ─── Code playground tabs ───────────────────────────────────────────────── */

const firstPromptTabs: CodePlaygroundTab[] = [
  {
    id: "first-prompt",
    filename: "first-cursor-prompt.txt",
    language: "text",
    code: `Here is the PRD for my project:

[PASTE YOUR PRD HERE]

Do NOT write any feature code yet. Start by:
1. Scaffolding a new Next.js 14 project with TypeScript and Tailwind CSS
2. Installing shadcn/ui and initializing it with the default dark theme
3. Creating the folder structure from the PRD
4. Confirming the dev server runs with no errors

Tell me when the scaffold is ready and I'll give you the next instruction.`,
    explanation:
      "Pasting the PRD first gives the AI context for every decision. 'Do NOT write feature code yet' prevents it from running ahead. Numbered steps give a verifiable checklist. 'Tell me when ready' creates a checkpoint you control.",
  },
];

const gitCommandsTabs: CodePlaygroundTab[] = [
  {
    id: "git-cmds",
    filename: "terminal",
    language: "bash",
    code: `# Save a checkpoint
git add . && git commit -m "feat: add login page"

# Create a branch for risky changes
git checkout -b feature/supabase-auth

# Return to a safe state
git checkout main`,
    explanation:
      "Commit whenever something works. Branch before risky changes so you can always return to main. These three commands are 90% of what you need as a new vibe coder.",
  },
];

const githubWorkflowTabs: CodePlaygroundTab[] = [
  {
    id: "gh-workflow",
    filename: "terminal",
    language: "bash",
    code: `# 1. Build a feature, test it works

# 2. Save a checkpoint
git add . && git commit -m "feat: add study analysis feature"

# 3. Push to GitHub
git push

# 4. Vercel auto-deploys within 60 seconds`,
  },
];

const envVarsTabs: CodePlaygroundTab[] = [
  {
    id: "env-local",
    filename: ".env.local",
    language: "bash",
    code: `# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...

# Anthropic (server-side only — no NEXT_PUBLIC_ prefix)
ANTHROPIC_API_KEY=sk-ant-...`,
    explanation:
      "Variables starting with NEXT_PUBLIC_ are accessible in browser code. Variables without the prefix are server-side only. Never commit this file — it's automatically git-ignored.",
  },
];

/* ─── Brainstorm chat data ───────────────────────────────────────────────── */

const brainstormMessages: ChatMessage[] = [
  {
    role: "user",
    content:
      "I'm an Ivey HBA student — zero coding background. I have an idea for a study tool that helps university students figure out what to focus on before exams. Where do I even start?",
  },
  {
    role: "assistant",
    content: (
      <div className="space-y-2.5">
        <p>
          Great instinct — and this is exactly the kind of project vibe coding
          is built for. Before we open Cursor, let&apos;s figure out what
          &quot;study tool&quot; actually means. A dozen different products are
          hiding inside that phrase.
        </p>
        <p>What&apos;s the core pain you personally feel as a student? Is it:</p>
        <ul className="space-y-1 ml-2">
          <li className="flex gap-2">
            <span className="text-electric-blue/70 font-mono text-xs mt-0.5">(a)</span>
            <span>Not knowing which topics actually matter before the exam</span>
          </li>
          <li className="flex gap-2">
            <span className="text-electric-blue/70 font-mono text-xs mt-0.5">(b)</span>
            <span>Having disorganized notes you can&apos;t make sense of</span>
          </li>
          <li className="flex gap-2">
            <span className="text-electric-blue/70 font-mono text-xs mt-0.5">(c)</span>
            <span>Not having enough practice questions to test yourself</span>
          </li>
          <li className="flex gap-2">
            <span className="text-electric-blue/70 font-mono text-xs mt-0.5">(d)</span>
            <span>Something else entirely</span>
          </li>
        </ul>
        <p className="text-muted-foreground/80 text-xs">
          Pick the one that stings the most — the more specific, the better the
          product.
        </p>
      </div>
    ),
  },
  {
    role: "user",
    content:
      "Definitely (a) and (c) together. Before exams I always re-read everything and realize I should have focused on 3 topics instead of 20. And I never have enough practice questions to drill myself.",
  },
  {
    role: "assistant",
    content: (
      <div className="space-y-2.5">
        <p>
          Perfect — you just defined your product. Let&apos;s call it a{" "}
          <strong>Smart Study Prioritizer</strong>. Here&apos;s what I&apos;m
          picturing for version 1:
        </p>
        <ul className="space-y-1.5 ml-1">
          {[
            "You paste your course notes (or upload a PDF)",
            "The AI extracts key topics and ranks them by exam importance",
            "It generates 5–10 practice questions per topic with answers",
            "You get a clean 'what to study and in what order' view",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 text-sm">
              <Check className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground/80 text-xs pt-1">
          Does this match your vision? Or is there an angle you want to add?
        </p>
      </div>
    ),
  },
  {
    role: "user",
    content:
      "Yes, exactly that. Can I realistically build this without knowing how to code? How long would it take?",
  },
  {
    role: "assistant",
    content: (
      <div className="space-y-2.5">
        <p>
          Honestly? <strong>Yes</strong> — and a weekend is realistic for a
          working prototype. Here&apos;s why this is a great first vibe build:
        </p>
        <ul className="space-y-1.5 ml-1">
          {[
            "Clear, focused scope — no feature creep",
            "One main AI call: send notes → get back analysis + questions",
            "No database or user login required for v1",
            "Straightforward UI: text input, output cards",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 text-sm">
              <Check className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="pt-1">
          Your stack: <strong>Next.js + Tailwind CSS + Claude API</strong>.
          Cursor will write 90% of the code. Your job is to describe what you
          want clearly and iterate.
        </p>
        <div className="mt-3 rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 font-mono text-xs text-foreground/80 leading-relaxed">
          <span className="text-electric-blue/70 mr-2">First Cursor prompt →</span>
          Build a Next.js app where a user pastes study notes, clicks
          &quot;Analyze&quot;, and the app calls the Claude API to return: (1)
          the top 5 topics ranked by exam priority, (2) 3 practice questions per
          topic. Display results in a clean card layout using Tailwind CSS.
        </div>
      </div>
    ),
  },
];

/* ─── Shared sub-components ──────────────────────────────────────────────── */

function SubHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3
      id={id}
      className="scroll-mt-24 text-lg font-semibold text-foreground mt-10 mb-4 flex items-center gap-2"
    >
      <span className="w-1 h-5 rounded-full gradient-bg flex-shrink-0" />
      {children}
    </h3>
  );
}

function NumberedStep({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-bold shadow-md shadow-electric-blue/20 flex-shrink-0">
          {n}
        </div>
        <div className="w-px flex-1 bg-border mt-2 mb-0" />
      </div>
      <div className="pb-8 min-w-0 flex-1">
        <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
        {children && (
          <div className="text-sm text-muted-foreground leading-relaxed">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function VibeCoding101Content() {
  return (
    <div>
      <div className="grid grid-cols-1 items-start gap-10 xl:grid-cols-[3fr_1fr] xl:gap-12 2xl:gap-16">
        {/* ── Main content ─────────────────────────────────────────────── */}
        <article className="min-w-0 space-y-10 md:space-y-12">

          {/* ══════════════════════════════════════════════════════════════
              LESSON 1: WHAT IS VIBE CODING?
          ══════════════════════════════════════════════════════════════ */}
          <LessonBlock
            lessonId="lesson-1"
            lessonNumber={1}
            title="What is Vibe Coding?"
            estimatedReadingTime="5 min read"
            sectionId="lesson-1"
          >
            <p className="text-base text-muted-foreground leading-relaxed italic">
              A new way of building software — and why it changes everything for non-developers.
            </p>

            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Vibe coding is a new approach to building software where you
                describe what you want in plain language and let an AI model
                write the code for you. You don&apos;t need to know{" "}
                <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-foreground">
                  for
                </code>{" "}
                loops, data structures, or the difference between{" "}
                <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-foreground">
                  const
                </code>{" "}
                and{" "}
                <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-foreground">
                  let
                </code>
                . You need to know what you want to build, why it matters, and
                how to describe it clearly.
              </p>
              <p>
                The term was coined by AI researcher and former Tesla/OpenAI
                engineer Andrej Karpathy in early 2025. His original framing was
                characteristically blunt:
              </p>
              <blockquote className="border-l-2 border-electric-blue/40 pl-4 py-1 my-4 italic text-foreground/80">
                &ldquo;There&apos;s a new kind of coding I call &lsquo;vibe
                coding&rsquo;, where you fully give in to the vibes, embrace
                exponentials, and forget that the code even exists. It&apos;s
                possible because the LLMs (e.g. Cursor Sonnet) are getting good
                enough that you can mostly just vibe.&rdquo;
              </blockquote>
              <p>
                That phrase — <strong className="text-foreground">forget that the code even exists</strong> — is the key shift. Traditional
                coding asks you to think like a computer. Vibe coding asks you
                to think like a product manager, a designer, or a founder: focus
                on outcomes, not implementation.
              </p>
            </div>

            <InteractiveCallout variant="concept" title="WVibe × QVibe Workshops" className="mt-6">
              This is exactly what WVibe and QVibe teach in our workshops.
              Whether you&apos;re at an Ivey case competition, a QVibe hackathon, or
              working through this curriculum solo — the approach is the same:
              describe what you want, iterate fast, and ship.
            </InteractiveCallout>

            {/* Brief history */}
            <SubHeading id="brief-history">A Brief History</SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Vibe coding didn&apos;t appear out of nowhere. It&apos;s the result of five
              years of rapidly compounding AI progress in code assistance.
            </p>
            <div className="space-y-0">
              {[
                {
                  year: "2021",
                  event: "GitHub Copilot launches",
                  detail:
                    "The first mainstream AI coding tool. It autocompletes lines and functions as you type — like predictive text for code. Impressive, but you still needed to know what you were doing.",
                },
                {
                  year: "2022",
                  event: "ChatGPT changes everything",
                  detail:
                    "For the first time, anyone could paste an error message into a chatbox and get a plain-English explanation. Non-developers start building small projects for the first time.",
                },
                {
                  year: "2023",
                  event: "Cursor emerges, Claude 2 ships",
                  detail:
                    "AI editors start working across multiple files. You can ask AI to edit your code, not just generate snippets. The context window grows — the AI can finally see your whole project.",
                },
                {
                  year: "2024",
                  event: "Claude 3.5 Sonnet + Cursor Composer",
                  detail:
                    'The "agentic" era begins. AI can now plan and execute multi-step tasks autonomously — creating files, running commands, reading errors, and self-correcting. Karpathy coins "vibe coding."',
                },
                {
                  year: "2025–26",
                  event: "Claude 4.6, GPT-5.4 Codex, Gemini 3.0",
                  detail:
                    "Full-scale autonomous coding agents. Context windows large enough to hold entire codebases. Models that reason, plan, and build end-to-end features from a single paragraph prompt.",
                },
              ].map((item, i, arr) => (
                <div key={item.year} className="flex gap-4">
                  <div className="flex flex-col items-center flex-shrink-0 w-14">
                    <div className="w-2.5 h-2.5 rounded-full bg-electric-blue flex-shrink-0 mt-1" />
                    {i < arr.length - 1 && (
                      <div className="w-px flex-1 bg-border mt-1.5" />
                    )}
                  </div>
                  <div className="pb-6 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-electric-blue">
                        {item.year}
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        {item.event}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Who is it for */}
            <SubHeading id="who-is-it-for">Who is Vibe Coding For?</SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              The short answer: anyone who has an idea and wants to build it.
              Here&apos;s who we specifically built this curriculum for:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  title: "Business students",
                  subtitle: "Ivey HBA, Smith Commerce, Rotman",
                  detail:
                    "Build the product side of your startup idea. Stop saying \"I&apos;d need to hire a dev for that\" — you can validate your MVP in a weekend.",
                },
                {
                  title: "Non-CS students",
                  subtitle: "Social science, arts, science, engineering",
                  detail:
                    "The gatekeeping is gone. If you have domain knowledge in your field, you can build tools for it. A sociology student building a survey analyzer is a legitimate product.",
                },
                {
                  title: "Aspiring founders",
                  subtitle: "Pre-accelerator, early-stage",
                  detail:
                    "Build before you fundraise. Investors respond to working demos, not decks. A weekend vibe build is worth ten slide decks.",
                },
                {
                  title: "Designers",
                  subtitle: "UI/UX, product, brand",
                  detail:
                    "Stop handing Figma files off to developers. Bring your designs to life yourself — and iterate on the real thing, not static mocks.",
                },
                {
                  title: "Experienced developers",
                  subtitle: "Looking to multiply output",
                  detail:
                    "You already understand the mental model — you&apos;re just adding a 10× multiplier to your output. Claude handles the boilerplate; you handle the decisions.",
                },
                {
                  title: "Curious learners",
                  subtitle: "Anyone who wants to build something",
                  detail:
                    "You don&apos;t need a reason. Having a project you care about is the best reason to learn. Build something for yourself first.",
                },
              ].map((item) => (
                <Card
                  key={item.title}
                  className="border-border bg-card/60 hover:border-electric-blue/25 transition-colors"
                >
                  <CardContent className="py-4">
                    <p className="font-semibold text-sm text-foreground mb-0.5">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-electric-blue mb-2">
                      {item.subtitle}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.detail}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* What can you build */}
            <SubHeading id="what-can-you-build">What Can You Realistically Build?</SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              The scope of what&apos;s achievable with vibe coding has expanded
              dramatically. As of 2026, here&apos;s what&apos;s genuinely within reach for
              someone with no prior coding experience who puts in a weekend:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: Layers, label: "Web apps", example: "React / Next.js apps with real functionality" },
                { icon: Zap, label: "Landing pages", example: "Marketing sites, waitlists, product pages" },
                { icon: MessageSquare, label: "Internal dashboards", example: "Analytics views, admin panels, reporting tools" },
                { icon: Code2, label: "APIs & automation", example: "Webhook handlers, scrapers, simple backends" },
                { icon: Sparkles, label: "Chrome extensions", example: "Browser tools that run on sites you use daily" },
                { icon: Terminal, label: "CLI tools", example: "Scripts that automate repetitive tasks on your computer" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card/40 hover:bg-card/60 transition-colors"
                >
                  <div className="p-1.5 rounded-md bg-electric-blue/10 flex-shrink-0 mt-0.5">
                    <item.icon className="w-3.5 h-3.5 text-electric-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {item.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.example}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Limitations */}
            <SubHeading id="limitations">What Are the Limitations?</SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Vibe coding is genuinely powerful — but being honest about its
              limits will save you a lot of frustration. Here&apos;s where it
              currently falls short:
            </p>
            <div className="space-y-3">
              {[
                {
                  label: "Complex distributed systems",
                  detail:
                    "Microservices architectures, event-driven systems, and anything involving CAP theorem require deep systems design knowledge. AI can write the code, but it won't save you from making architectural decisions you don't understand.",
                },
                {
                  label: "Security-critical applications",
                  detail:
                    "Authentication systems, payment processing, HIPAA/GDPR-regulated data, and anything with significant attack surface need expert security review. AI-generated auth code has known vulnerability patterns.",
                },
                {
                  label: "High-performance systems",
                  detail:
                    "Applications where latency, throughput, or memory efficiency are core constraints — real-time trading, game engines, embedded systems — require optimization knowledge the AI alone can't provide.",
                },
                {
                  label: "Production at scale",
                  detail:
                    "Serving 10M+ users, managing complex data pipelines, running real-time infrastructure — these require engineering expertise for reliability, cost optimization, and incident response.",
                },
                {
                  label: "You still need to understand what you're building",
                  detail:
                    "The biggest trap: the AI can write code you don't understand, and you won't catch the bugs. Vibe coding works best when you understand the logic at a high level — even if you couldn't write it yourself.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 p-4 rounded-xl border border-border bg-card/40"
                >
                  <div className="w-5 h-5 rounded-full bg-amber-400/15 border border-amber-400/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold text-amber-400">!</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">
                      {item.label}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <InteractiveCallout variant="tip" className="mt-6">
              None of this means you shouldn&apos;t start. It means you should start
              with the right project — something with a clear scope, limited
              security concerns, and a user base small enough that bugs
              won&apos;t be catastrophic. That description fits most student
              projects and early-stage MVPs perfectly.
            </InteractiveCallout>

            <InteractiveCallout variant="challenge" title="Your First Challenge" className="mt-4">
              Open ChatGPT or Claude and ask: &ldquo;What could I build with vibe
              coding for my [major/interest]?&rdquo; Spend 10 minutes exploring ideas
              before moving on.
            </InteractiveCallout>
          </LessonBlock>

          <KnowledgeCheck
            checkId="check-1"
            sectionId="check-1"
            questions={check1Questions}
          />

          {/* ══════════════════════════════════════════════════════════════
              LESSON 2: CHOOSING YOUR TOOLS
          ══════════════════════════════════════════════════════════════ */}
          <LessonBlock
            lessonId="lesson-2"
            lessonNumber={2}
            title="Choosing Your Tools"
            estimatedReadingTime="8 min read"
            sectionId="lesson-2"
          >
            <p className="text-base text-muted-foreground leading-relaxed italic">
              The ecosystem has exploded. Here&apos;s how to cut through the noise and pick the right setup.
            </p>

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              There are now dozens of AI-powered coding tools — editors, browser
              apps, CLI tools, and agent platforms. The good news: you
              don&apos;t need to try them all. One tool, set up correctly, will
              take you from idea to shipped app.
            </p>

            {/* Cursor */}
            <SubHeading id="cursor-overview">Cursor — The Primary Tool</SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              <strong className="text-foreground">Cursor</strong> is an
              AI-native code editor built on top of VS Code. Everything VS Code
              does — syntax highlighting, Git integration, extensions, debugging
              — plus AI baked into every layer. It&apos;s the closest thing we
              have to pair programming with a brilliant senior developer
              who&apos;s available 24/7, never gets frustrated, and never makes
              you feel dumb for asking questions.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              What makes Cursor uniquely powerful for vibe coding is that the AI
              can see your entire project — not just the file you have open, but
              your folder structure, your configuration files, your git history,
              and your error logs. This context lets it make intelligent
              decisions across your whole codebase, not just autocomplete lines.
            </p>

            {/* Cursor Modes */}
            <SubHeading id="cursor-modes">Cursor&apos;s Three Modes</SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Cursor has three distinct ways to interact with the AI. Each is
              optimized for a different type of task. Understanding which one to
              reach for is the single most important skill for efficient vibe
              coding.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: MessageSquare,
                  name: "Chat",
                  shortcut: "⌘L / Ctrl+L",
                  what: "A conversation panel alongside your code. Ask questions, explore options, get explanations.",
                  when: [
                    "\"What does this function do?\"",
                    "\"How should I structure this feature?\"",
                    "\"Why am I getting this error?\"",
                    "Understanding code you didn't write",
                  ],
                  color: "text-electric-blue",
                  bg: "bg-electric-blue/10 border-electric-blue/20",
                },
                {
                  icon: Sparkles,
                  name: "Agent",
                  shortcut: "⌘I / Ctrl+I",
                  what: "Give it a goal. It plans, creates files, writes code, runs commands, and self-corrects.",
                  when: [
                    "Building entire features from scratch",
                    "\"Build a user auth system\"",
                    "Complex multi-file tasks",
                    "When you want the AI to drive",
                  ],
                  color: "text-vibe-purple",
                  bg: "bg-vibe-purple/10 border-vibe-purple/20",
                },
                {
                  icon: Code2,
                  name: "Inline Edit",
                  shortcut: "⌘K / Ctrl+K",
                  what: "Select a block of code, describe the change, and it edits precisely in place.",
                  when: [
                    "\"Refactor this function\"",
                    "\"Add error handling here\"",
                    "Surgical, specific changes",
                    "When you know exactly where to change",
                  ],
                  color: "text-green-400",
                  bg: "bg-green-400/10 border-green-400/20",
                },
              ].map((mode) => (
                <Card
                  key={mode.name}
                  className={`border h-full ${mode.bg}`}
                >
                  <CardContent className="py-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="p-2 rounded-lg bg-card/80 border border-border">
                        <mode.icon className={`w-4 h-4 ${mode.color}`} />
                      </div>
                      <code className="text-[10px] font-mono text-muted-foreground bg-white/5 border border-border rounded px-1.5 py-0.5">
                        {mode.shortcut}
                      </code>
                    </div>
                    <div>
                      <p className={`font-bold text-sm ${mode.color}`}>
                        {mode.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {mode.what}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-1.5">
                        Use when
                      </p>
                      <ul className="space-y-1">
                        {mode.when.map((w) => (
                          <li key={w} className="text-xs text-muted-foreground flex gap-1.5">
                            <ChevronRight className="w-3 h-3 flex-shrink-0 mt-0.5 text-muted-foreground/40" />
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <InteractiveCallout variant="tip" className="mt-6">
              <strong>The 80/20 rule for Cursor modes:</strong> Use{" "}
              <strong>Agent</strong> to build features from scratch, use{" "}
              <strong>Chat</strong> when you&apos;re confused about something,
              and use <strong>Inline Edit</strong> for targeted fixes. When in
              doubt, Agent handles most things well.
            </InteractiveCallout>

            {/* Other tools */}
            <SubHeading id="other-tools">Other Tools Worth Knowing</SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Cursor is our recommendation, but the ecosystem is rich. Here&apos;s
              a quick map of the alternatives and when they make sense:
            </p>
            <div className="space-y-3">
              {[
                {
                  name: "Claude Code",
                  tag: "CLI",
                  tagColor: "text-vibe-purple bg-vibe-purple/10 border-vibe-purple/25",
                  detail:
                    "Anthropic's official terminal-based AI coding tool. Run it directly in your terminal — no GUI required. Great for developers who live in the command line, scripting complex multi-step workflows, or automating tasks across many files. Less visual than Cursor, equally powerful for terminal-comfortable users.",
                },
                {
                  name: "Windsurf",
                  tag: "Editor",
                  tagColor: "text-electric-blue bg-electric-blue/10 border-electric-blue/25",
                  detail:
                    "Codeium's AI editor, direct Cursor competitor. Has its own Cascade agent that's excellent for multi-step tasks. Worth trying if you want a second opinion on your setup or prefer Codeium's model choices.",
                },
                {
                  name: "Bolt",
                  tag: "Browser",
                  tagColor: "text-green-400 bg-green-400/10 border-green-400/25",
                  detail:
                    "Runs entirely in the browser — no setup, no install. Paste a prompt, get a working React app. Perfect for quick throwaway prototypes or sharing a live demo URL instantly. Limited for complex or multi-session projects.",
                },
                {
                  name: "Lovable",
                  tag: "No-code+AI",
                  tagColor: "text-amber-400 bg-amber-400/10 border-amber-400/25",
                  detail:
                    "Designed for users with zero technical background. Opinionated tech stack, but you go from idea to deployed app with minimal friction. Great for landing pages and simple apps, less flexible for custom backends.",
                },
                {
                  name: "Replit Agent",
                  tag: "Cloud IDE",
                  tagColor: "text-pink-400 bg-pink-400/10 border-pink-400/25",
                  detail:
                    "Fully hosted cloud environment — your code lives in the browser, and deployment is one click. Great for sharing work-in-progress with others or coding without a local setup. Less powerful than Cursor for serious projects.",
                },
              ].map((tool) => (
                <div
                  key={tool.name}
                  className="flex flex-col sm:flex-row sm:items-start gap-3 p-4 rounded-xl border border-border bg-card/40"
                >
                  <div className="flex items-center gap-3 sm:w-44 flex-shrink-0">
                    <p className="font-semibold text-sm text-foreground">
                      {tool.name}
                    </p>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tool.tagColor}`}
                    >
                      {tool.tag}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                    {tool.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-electric-blue/25 bg-gradient-to-r from-electric-blue/10 to-transparent p-5">
              <p className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-electric-blue" />
                Our recommendation: Start with Cursor. Here&apos;s why.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Cursor gives you the most control, the best model selection,
                and the deepest codebase understanding of any tool available.
                It runs locally (your code stays on your machine), supports
                every major framework, and has the most active community of
                vibe coders. Once you&apos;re comfortable with Cursor, switching to
                other tools is easy — but the reverse is harder.
              </p>
            </div>

            {/* Install Cursor */}
            <SubHeading id="install-cursor">Installing and Setting Up Cursor</SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Cursor is available for macOS and Windows. The setup takes under
              five minutes.
            </p>
            <div className="space-y-0">
              <NumberedStep n={1} title="Download Cursor">
                Go to{" "}
                <a
                  href="https://cursor.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-electric-blue underline underline-offset-2"
                >
                  cursor.com
                </a>{" "}
                and click the Download button. It auto-detects your OS (macOS
                or Windows).
              </NumberedStep>
              <NumberedStep n={2} title="Install on macOS">
                Open the downloaded{" "}
                <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-foreground">
                  .dmg
                </code>{" "}
                file. Drag Cursor into your Applications folder. Open it from
                Applications or Spotlight.
              </NumberedStep>
              <NumberedStep n={3} title="Install on Windows">
                Run the downloaded{" "}
                <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-foreground">
                  .exe
                </code>{" "}
                installer. Follow the setup wizard. Cursor will open
                automatically when complete.
              </NumberedStep>
              <NumberedStep n={4} title="Complete onboarding">
                On first launch, Cursor walks you through a short onboarding.
                Create a free account (or log in with Google). The free tier
                includes a generous monthly allowance of AI requests.
              </NumberedStep>
              <NumberedStep n={5} title="Import your VS Code settings (optional)">
                If you&apos;re switching from VS Code, Cursor can automatically
                import your extensions, themes, and keybindings. Look for the
                import prompt in onboarding, or go to{" "}
                <strong className="text-foreground">
                  Settings → Import from VS Code
                </strong>
                .
              </NumberedStep>
              <NumberedStep n={6} title="Open a project folder">
                Click <strong className="text-foreground">File → Open Folder</strong> and
                select a folder on your computer. If you&apos;re starting fresh,
                create a new empty folder — we&apos;ll scaffold a project in the
                next section.
              </NumberedStep>
            </div>

            <InteractiveCallout variant="tip" title="New to the terminal?">
              Cursor uses an integrated terminal (
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-foreground">
                View → Terminal
              </code>{" "}
              or{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-foreground">
                Ctrl+`
              </code>
              ). This is a text-based command interface — you&apos;ll use it to
              install packages and run your app. Don&apos;t worry: in Agent mode,
              Cursor can run terminal commands for you and explain what each one
              does.
            </InteractiveCallout>

            {/* Configure LLM */}
            <SubHeading id="configure-llm">Choosing Your LLM in Cursor</SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Cursor lets you choose which AI model powers your coding
              assistant. The right choice depends on what you&apos;re building and
              how much you want to spend.
            </p>
            <div className="space-y-3 mb-5">
              {[
                {
                  model: "Claude Sonnet 4.6",
                  rec: "Default recommendation",
                  detail:
                    "Best overall balance of intelligence, speed, and cost. Excellent instruction-following, clean code generation, and strong agentic behavior.",
                  color: "text-vibe-purple",
                  badge: "Best all-rounder",
                },
                {
                  model: "Claude Opus 4.6",
                  rec: "For complex tasks",
                  detail:
                    "Switch to this for large multi-file refactors, complex architecture decisions, and anything requiring deep sustained reasoning.",
                  color: "text-electric-blue",
                  badge: "Deepest reasoning",
                },
                {
                  model: "GPT-5.4 Codex",
                  rec: "For speed",
                  detail:
                    "Fastest time-to-first-token. Great for rapid iteration and Tab completions when you want snappy responses.",
                  color: "text-green-400",
                  badge: "Fastest",
                },
                {
                  model: "DeepSeek R2 (via OpenRouter)",
                  rec: "Budget option",
                  detail:
                    "Dramatically cheaper than the options above, with strong reasoning. Add via OpenRouter in Cursor settings with your own API key.",
                  color: "text-pink-400",
                  badge: "Lowest cost",
                },
              ].map((item) => (
                <div
                  key={item.model}
                  className="flex items-start gap-3 p-3.5 rounded-xl border border-border bg-card/40"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`font-semibold text-sm ${item.color}`}>
                        {item.model}
                      </p>
                      <span className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider">
                        — {item.rec}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              For a full breakdown of model capabilities, benchmarks, and
              pricing, see our{" "}
              <Link
                href="/llm-comparison"
                className="text-electric-blue underline underline-offset-2 hover:text-electric-blue/80"
              >
                LLM Comparison page →
              </Link>
            </p>

            <InteractiveCallout variant="concept" className="mt-5">
              At QVibe and WVibe workshops, we use{" "}
              <strong>Cursor with Claude Sonnet 4.6</strong> as our default
              setup. It covers 95% of what you&apos;ll need as a beginner, with
              enough headroom for complex projects. When you&apos;re getting
              started, don&apos;t overthink the model choice — Claude Sonnet 4.6
              and just start building.
            </InteractiveCallout>

            <InteractiveCallout variant="challenge" title="Your Challenge" className="mt-4">
              Download Cursor right now and explore the interface. Press ⌘I to
              open Agent mode, ⌘L for Chat, and select any text then press ⌘K for
              Inline Edit. Just get a feel for the three modes before you need them.
            </InteractiveCallout>
          </LessonBlock>

          <KnowledgeCheck
            checkId="check-2"
            sectionId="check-2"
            questions={check2Questions}
          />

          {/* ══════════════════════════════════════════════════════════════
              LESSON 3: THE BRAINSTORM PHASE
          ══════════════════════════════════════════════════════════════ */}
          <LessonBlock
            lessonId="lesson-3"
            lessonNumber={3}
            title="The Brainstorm Phase"
            estimatedReadingTime="7 min read"
            sectionId="lesson-3"
          >
            <p className="text-base text-muted-foreground leading-relaxed italic">
              What you do before opening Cursor determines the quality of everything that comes after.
            </p>

            <InteractiveCallout variant="warning" className="mt-4">
              <strong>Don&apos;t skip this step.</strong> The #1 mistake new vibe
              coders make is jumping directly into Cursor without a plan. You
              end up generating code you don&apos;t want, spending hours going in
              circles, and building something that doesn&apos;t solve the right
              problem. Thirty minutes of brainstorming saves you five hours of
              confusion.
            </InteractiveCallout>

            {/* Why brainstorm */}
            <SubHeading id="why-brainstorm">Why Brainstorm With an LLM First?</SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Think about hiring a contractor to renovate your kitchen. You
              wouldn&apos;t say &ldquo;start building&rdquo; and come back in two weeks. You&apos;d
              show them a design, agree on the scope, set a budget, and sign
              off on a plan before a single nail goes in.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Building with AI is the same. If your first message to Cursor is
              &ldquo;build me a study app,&rdquo; you&apos;ll get{" "}
              <em>something</em> — but probably not what you actually wanted.
              The model has no way to make the right tradeoffs because you
              haven&apos;t defined what right looks like.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              The brainstorm phase uses a conversational AI (Claude, ChatGPT,
              or even Cursor&apos;s own Chat mode) to help you sharpen your idea
              into a clear, buildable brief. You&apos;re not writing code yet —
              you&apos;re writing the specification that will guide everything else.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  label: "Without a brainstorm",
                  items: [
                    "Vague first prompt → generic output",
                    "Feature scope grows mid-build",
                    "Hard to review if it's \"right\"",
                    "Hours lost to rework",
                  ],
                  color: "border-red-400/20 bg-red-400/5",
                  textColor: "text-red-400",
                  prefix: "✗",
                },
                {
                  label: "With a brainstorm",
                  items: [
                    "Clear first prompt → targeted build",
                    "Scope locked before coding starts",
                    "Easy to verify against the brief",
                    "Fast, focused iteration",
                  ],
                  color: "border-green-400/20 bg-green-400/5",
                  textColor: "text-green-400",
                  prefix: "✓",
                },
              ].map((col) => (
                <div key={col.label} className={`rounded-xl border p-4 ${col.color}`}>
                  <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${col.textColor}`}>
                    {col.label}
                  </p>
                  <ul className="space-y-2">
                    {col.items.map((item) => (
                      <li key={item} className="flex gap-2 text-xs text-muted-foreground">
                        <span className={`${col.textColor} font-bold flex-shrink-0`}>
                          {col.prefix}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* How to brainstorm */}
            <SubHeading id="how-to-brainstorm">How to Structure a Brainstorm</SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              A good brainstorm has a shape. Follow this sequence and you&apos;ll
              end up with a project brief you can drop directly into Cursor.
            </p>
            <div className="space-y-0">
              <NumberedStep n={1} title="Start broad — describe your idea in plain English">
                Don&apos;t worry about technical details. &ldquo;I want to build a tool
                that helps university students study more efficiently.&rdquo; That&apos;s
                enough to start. The AI will ask clarifying questions.
              </NumberedStep>
              <NumberedStep n={2} title="Narrow to the core use case">
                A &ldquo;study tool&rdquo; could mean ten different things. You need to
                pick one. The AI will help you pressure-test which use case is
                most valuable and most buildable for your timeline.
              </NumberedStep>
              <NumberedStep n={3} title="Define the user and their specific problem">
                &ldquo;University students&rdquo; is too broad. &ldquo;Second-year Ivey students
                cramming for a finance final the night before&rdquo; is a user. The
                more specific, the better your product decisions will be.
              </NumberedStep>
              <NumberedStep n={4} title="List 10+ features, then ruthlessly cut">
                Generate every feature you could imagine, then ask the AI to
                help you cut to the essential five for v1. Everything else goes
                to a &ldquo;v2 later&rdquo; list.
              </NumberedStep>
              <NumberedStep n={5} title="Define what's out of scope">
                Explicitly state what you&apos;re NOT building in v1. This is as
                important as defining what you are building — it prevents scope
                creep mid-build.
              </NumberedStep>
              <NumberedStep n={6} title="Generate the project brief">
                Ask the AI to write a one-page project brief summarizing
                everything. This becomes your north star for the entire build.
              </NumberedStep>
            </div>

            {/* Chat example */}
            <SubHeading id="brainstorm-example">
              Example Brainstorm Conversation
            </SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Here&apos;s a real example of what a good brainstorm looks like —
              from vague idea to clear build plan in six messages:
            </p>
            <ChatDemo messages={brainstormMessages} title="Brainstorm with Claude" />

            <InteractiveCallout variant="tip" className="mt-4">
              Notice how the AI responds with clarifying questions before
              generating anything. That&apos;s the right behavior. If your AI
              assistant jumps straight to wireframes or tech stacks before
              understanding the problem — slow it down with: &ldquo;Before we get
              into solutions, help me understand the core problem better.&rdquo;
            </InteractiveCallout>

            {/* Creating a PRD */}
            <SubHeading id="creating-prd">Creating a PRD with AI Assistance</SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              A <strong className="text-foreground">PRD (Product Requirements Document)</strong> sounds
              intimidating. It isn&apos;t. It&apos;s a one-page document — or even just a
              text file — that answers five questions about what you&apos;re building.
              Every successful software project has some version of this,
              whether it&apos;s formal or scribbled on a napkin.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              The reason it matters for vibe coding: your PRD becomes the first
              thing you paste into Cursor. It gives the AI the context it needs
              to make good decisions throughout your entire build.
            </p>
            <div className="rounded-xl border border-border bg-card/50 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-card/60">
                <div className="w-2 h-2 rounded-full bg-electric-blue" />
                <span className="text-xs font-semibold text-foreground">
                  PRD Template
                </span>
              </div>
              <div className="p-5 space-y-4">
                {[
                  {
                    q: "What are we building?",
                    a: "One sentence. The name + the core function.",
                    example: "StudyFocus — an AI-powered study prioritizer that analyzes your notes and tells you what to focus on.",
                  },
                  {
                    q: "Who is it for?",
                    a: "Be specific. Name the user, their context, and their pain.",
                    example: "University students (18–24) who are overwhelmed before exams and don't know where to focus their limited time.",
                  },
                  {
                    q: "What does it do? (v1 only)",
                    a: "List 3–5 core features in priority order.",
                    example: "(1) Paste notes → (2) AI extracts key topics → (3) Topics ranked by importance → (4) Practice questions per topic",
                  },
                  {
                    q: "What does it NOT do?",
                    a: "Explicitly state what's out of scope for v1.",
                    example: "No login/accounts, no mobile app, no saved sessions, no class history.",
                  },
                  {
                    q: "What's the tech stack?",
                    a: "Your framework, styling library, and any APIs.",
                    example: "Next.js + Tailwind CSS + Claude API",
                  },
                ].map((row, i) => (
                  <div key={i} className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">
                      {i + 1}. {row.q}
                    </p>
                    <p className="text-xs text-muted-foreground">{row.a}</p>
                    <div className="rounded-lg bg-white/[0.03] border border-white/8 px-3 py-2 text-xs text-foreground/70 italic">
                      e.g. &ldquo;{row.example}&rdquo;
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-4">
              After your brainstorm conversation, just ask: &ldquo;Based on
              everything we&apos;ve discussed, write a one-page PRD for this project
              using the template above.&rdquo; The AI will generate it in seconds.
              Review, edit, save it as a text file.
            </p>

            {/* Vague to structured */}
            <SubHeading id="vague-to-structured">
              From Vague Idea to Structured Feature List
            </SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Here&apos;s the transformation brainstorming produces. The same idea,
              before and after a thirty-minute conversation with Claude:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-red-400/20 bg-red-400/[0.04] p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-red-400 mb-3">
                  Before — vague idea
                </p>
                <div className="rounded-lg bg-card/60 border border-border px-4 py-3">
                  <p className="text-sm text-muted-foreground italic leading-relaxed">
                    &ldquo;I want to build a study app for university students.&rdquo;
                  </p>
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    "Unclear what problem it solves",
                    "No defined user or context",
                    "Infinite scope — could be anything",
                    "No way to know when you're done",
                  ].map((item) => (
                    <p key={item} className="text-xs text-muted-foreground/70 flex gap-2">
                      <span className="text-red-400 flex-shrink-0">✗</span>
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-green-400/20 bg-green-400/[0.04] p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-green-400 mb-3">
                  After — structured brief
                </p>
                <div className="rounded-lg bg-card/60 border border-border px-4 py-3 space-y-2.5 text-xs">
                  <p>
                    <span className="text-green-400 font-bold">Project:</span>{" "}
                    <span className="text-foreground font-medium">StudyFocus</span>
                    <span className="text-muted-foreground"> — Smart Exam Prioritizer</span>
                  </p>
                  <div>
                    <p className="text-green-400 font-bold mb-1">MVP Features (v1):</p>
                    <div className="space-y-1">
                      {[
                        { p: "P0", label: "Text/PDF input for course notes" },
                        { p: "P0", label: "AI topic extraction + importance ranking" },
                        { p: "P0", label: "Practice question generation (5 per topic)" },
                        { p: "P1", label: "Clean card-based review interface" },
                      ].map((f) => (
                        <div key={f.label} className="flex gap-2">
                          <span className={`font-mono font-bold flex-shrink-0 ${f.p === "P0" ? "text-electric-blue" : "text-muted-foreground/60"}`}>
                            [{f.p}]
                          </span>
                          <span className="text-muted-foreground">{f.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground/60 font-bold mb-1">Out of scope (v2+):</p>
                    <p className="text-muted-foreground/50">
                      Login, mobile app, spaced repetition, progress tracking
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    "Specific problem, specific user",
                    "Bounded scope — 4 features max",
                    "Explicit out-of-scope list",
                    "Ready to drop into Cursor",
                  ].map((item) => (
                    <p key={item} className="text-xs text-muted-foreground/70 flex gap-2">
                      <span className="text-green-400 flex-shrink-0">✓</span>
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <InteractiveCallout variant="tip" title="Your first Cursor message" className="mt-6">
              Once you have your PRD, your very first message in Cursor Agent
              should be something like: <br />
              <br />
              <code className="block bg-white/10 rounded-lg px-3 py-2 text-xs font-mono text-foreground mt-2 leading-relaxed">
                Here is the PRD for my project. Start by scaffolding the
                Next.js project with Tailwind CSS. Do not write any feature
                code yet — just create the folder structure, install
                dependencies, and confirm the dev server runs.
                <br />
                <br />
                [paste your PRD here]
              </code>
              <br />
              This gives the AI the full context and gives you a stable
              foundation before any features are built.
            </InteractiveCallout>

            <InteractiveCallout variant="challenge" title="Your Challenge" className="mt-4">
              Pick an app idea — anything that would be useful to you or someone
              you know. Spend 10 minutes brainstorming it with an LLM (Claude or
              ChatGPT). Ask it to help you narrow the scope to 3–5 core features
              for v1. Save the result as a text file.
            </InteractiveCallout>
          </LessonBlock>

          <KnowledgeCheck
            checkId="check-3"
            sectionId="check-3"
            questions={check3Questions}
          />

          {/* ══════════════════════════════════════════════════════════════
              LESSON 4: BUILDING & ITERATING
          ══════════════════════════════════════════════════════════════ */}
          <LessonBlock
            lessonId="lesson-4"
            lessonNumber={4}
            title="Building & Iterating"
            estimatedReadingTime="10 min read"
            sectionId="lesson-4"
          >
            <p className="text-base text-muted-foreground leading-relaxed italic">
              You have your PRD, your tools are configured. Now it&apos;s time to build. This section is where the real work — and the real fun — begins.
            </p>

            {/* First prompt */}
            <SubHeading id="first-prompt">Your First Prompt in Agent Mode</SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Open Cursor, press{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-foreground">
                ⌘I
              </code>{" "}
              to open Agent mode, and paste the following — replacing the PRD
              section with your actual document:
            </p>

            <CodePlayground tabs={firstPromptTabs} />

            <p className="text-sm text-muted-foreground leading-relaxed mt-4 mb-2">
              Why this structure works:
            </p>
            <div className="space-y-2 mb-6">
              {[
                "Pasting the PRD first gives the AI context for every decision it makes during the entire build.",
                "\"Do NOT write feature code yet\" prevents the AI from running ahead and building the wrong thing.",
                "Breaking the scaffold into numbered steps gives the AI a clear, verifiable checklist.",
                "\"Tell me when ready\" establishes a checkpoint — you confirm before moving to the next phase.",
              ].map((item, i) => (
                <div key={i} className="flex gap-2.5 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Prompt formula */}
            <SubHeading id="prompt-formula">The Prompt Formula</SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Every effective Cursor prompt has the same four ingredients. Once
              you internalize this structure, your build quality will jump
              immediately:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                {
                  tag: "Context",
                  color: "text-electric-blue",
                  bg: "bg-electric-blue/10 border-electric-blue/25",
                  desc: "What app is this? What files already exist? What stack are we using?",
                  example: "\"We're building StudyFocus, a Next.js 14 app with Tailwind CSS and shadcn/ui. The existing layout is at app/layout.tsx.\"",
                },
                {
                  tag: "What to build",
                  color: "text-vibe-purple",
                  bg: "bg-vibe-purple/10 border-vibe-purple/25",
                  desc: "The specific feature or change. Be explicit, not vague.",
                  example: "\"Build the home page at app/page.tsx with a textarea for pasting notes and an Analyze button.\"",
                },
                {
                  tag: "Technical constraints",
                  color: "text-green-400",
                  bg: "bg-green-400/10 border-green-400/25",
                  desc: "Frameworks, components, file locations, or things to avoid.",
                  example: "\"Use shadcn/ui Card components. Keep everything in a single page.tsx file. Do not create any API routes yet.\"",
                },
                {
                  tag: "Style & behavior",
                  color: "text-amber-400",
                  bg: "bg-amber-400/10 border-amber-400/25",
                  desc: "Visual details, animation, responsive behavior, tone.",
                  example: "\"Dark background (#0a0a0f), centered layout, max-w-2xl. The headline should use our gradient-text CSS class.\"",
                },
              ].map((item) => (
                <div key={item.tag} className={`rounded-xl border p-4 ${item.bg}`}>
                  <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${item.color}`}>
                    {item.tag}
                  </p>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="rounded-lg bg-card/50 border border-white/8 px-3 py-2 text-[11px] text-muted-foreground/70 italic leading-relaxed">
                    {item.example}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-border bg-card/50 p-5 mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60 mb-3">
                Weak vs Strong — the same request, two ways
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-2">Weak prompt</p>
                  <div className="rounded-lg bg-red-400/5 border border-red-400/20 px-3 py-2.5 font-mono text-xs text-muted-foreground leading-relaxed">
                    &ldquo;Build a login page.&rdquo;
                  </div>
                  <p className="text-[11px] text-muted-foreground/60 mt-2">
                    No context, no constraints, no style. The AI will guess everything.
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-green-400 uppercase tracking-wider mb-2">Strong prompt</p>
                  <div className="rounded-lg bg-green-400/5 border border-green-400/20 px-3 py-2.5 font-mono text-xs text-muted-foreground leading-relaxed">
                    &ldquo;[Context: Next.js 14 app with Tailwind + shadcn/ui] Build a login page at app/login/page.tsx. Use shadcn/ui Input and Button. Two fields: email + password. A &lsquo;Sign In&rsquo; button. Dark background, centered card layout, max-w-sm. No backend logic yet.&rdquo;
                  </div>
                  <p className="text-[11px] text-muted-foreground/60 mt-2">
                    Specific, bounded, styled, and tells the AI what NOT to do.
                  </p>
                </div>
              </div>
            </div>

            {/* Iterating */}
            <SubHeading id="iterating">Iterating: Accept, Reject, and Refine</SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Cursor shows you a diff of every proposed change before applying
              it. This is your most important moment — review before you accept.
              Here are the habits that separate fast, clean vibe coders from
              ones who get stuck:
            </p>
            <div className="space-y-3">
              {[
                {
                  title: "Review the diff before accepting",
                  detail: "Cursor's diff view shows exactly what's being added, changed, and removed. Scan it — you don't need to understand every line, but you should recognize that it's editing the right files and in roughly the right direction.",
                  icon: Check,
                  color: "text-green-400",
                },
                {
                  title: "Cmd+Z is your best friend",
                  detail: "If an accepted change makes things worse, undo immediately. Cursor's undo works file-by-file through the full history. Don't be afraid to undo 10 steps — getting back to a working state is always the right move.",
                  icon: RotateCcw,
                  color: "text-electric-blue",
                },
                {
                  title: "Reject and rephrase, don't just accept",
                  detail: "If the output isn't what you wanted, reject it (click Reject or Cmd+Z) and refine your prompt. Add more detail about what you didn't like: \"The button is too large and the card background should be dark, not white.\" Iteration is the job.",
                  icon: MessageSquare,
                  color: "text-vibe-purple",
                },
                {
                  title: "Work in small steps, not giant leaps",
                  detail: "Don't ask Cursor to build an entire feature in one prompt. Build one piece, verify it works, then move to the next. \"Add the textarea\" → confirm → \"Now add the Analyze button\" → confirm → \"Now wire the button to call the API.\" Smaller steps = easier to debug.",
                  icon: Layers,
                  color: "text-amber-400",
                },
                {
                  title: "Save and run after every major change",
                  detail: "After accepting changes, save (Cmd+S) and check your browser. Don't batch 10 changes before looking at the result — you won't know which change broke something.",
                  icon: Zap,
                  color: "text-green-400",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 p-4 rounded-xl border border-border bg-card/40">
                  <div className="p-1.5 rounded-md bg-card border border-border flex-shrink-0 mt-0.5">
                    <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">{item.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mode selection */}
            <SubHeading id="mode-selection">Chat vs Agent vs Cmd+K — Quick Reference</SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              You covered the three Cursor modes in Lesson 2. Here&apos;s the fast
              reference for when you&apos;re mid-build and need to decide quickly:
            </p>
            <div className="rounded-xl border border-border bg-card/50 overflow-hidden">
              <div className="grid grid-cols-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 border-b border-border">
                <div className="px-4 py-2.5 border-r border-border">Mode</div>
                <div className="px-4 py-2.5 border-r border-border">Use when</div>
                <div className="px-4 py-2.5">Shortcut</div>
              </div>
              {[
                {
                  mode: "Agent",
                  color: "text-vibe-purple",
                  uses: ["Building new features from scratch", "Multi-file changes", "\"Create a new page that does X\""],
                  shortcut: "⌘I / Ctrl+I",
                },
                {
                  mode: "Chat",
                  color: "text-electric-blue",
                  uses: ["Asking questions about code", "Debugging and explaining errors", "\"Why is this function returning undefined?\""],
                  shortcut: "⌘L / Ctrl+L",
                },
                {
                  mode: "Inline Edit",
                  color: "text-green-400",
                  uses: ["Quick edits to a specific block", "Renaming, refactoring a single function", "\"Change this button to be full-width\""],
                  shortcut: "⌘K / Ctrl+K",
                },
              ].map((row, i, arr) => (
                <div
                  key={row.mode}
                  className={`grid grid-cols-3 text-xs ${i < arr.length - 1 ? "border-b border-border" : ""}`}
                >
                  <div className={`px-4 py-3 border-r border-border font-semibold ${row.color}`}>
                    {row.mode}
                  </div>
                  <div className="px-4 py-3 border-r border-border text-muted-foreground">
                    <ul className="space-y-1">
                      {row.uses.map((u) => (
                        <li key={u} className="flex gap-1.5">
                          <ChevronRight className="w-3 h-3 flex-shrink-0 mt-0.5 text-muted-foreground/40" />
                          <span>{u}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="px-4 py-3 text-muted-foreground/60 font-mono text-[11px]">
                    {row.shortcut}
                  </div>
                </div>
              ))}
            </div>

            {/* Example prompts */}
            <SubHeading id="example-prompts">3 Real Example Prompts</SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              These are real prompts — the kind you&apos;d actually type into Cursor
              Agent. Each one demonstrates the formula in practice at a
              different complexity level.
            </p>
            <div className="space-y-5">
              {[
                {
                  level: "Beginner",
                  levelColor: "text-green-400 bg-green-400/10 border-green-400/25",
                  project: "StudyFocus — static UI",
                  prompt: `Create the home page for StudyFocus at app/page.tsx.

The page should have:
1. A centered hero section with the headline "Study Smarter, Not Harder" (use gradient-text CSS class)
2. A subheading: "Paste your notes. Get a ranked study plan in seconds."
3. A large textarea (placeholder: "Paste your course notes here...") below the hero
4. A blue "Analyze" button below the textarea (use our gradient-bg CSS class)
5. Three feature cards below the button: "AI-Powered", "Exam-Focused", "Instant Results" — each with a short one-line description

Styling: dark background, centered layout, max-w-2xl, Tailwind CSS, shadcn/ui Card for the feature cards.

Do NOT add any API calls or backend logic yet — just the static UI.`,
                  whyItWorks: [
                    "Specifies the exact file path (app/page.tsx)",
                    "Numbered requirements make the checklist clear and verifiable",
                    "References project-specific CSS classes (gradient-text, gradient-bg)",
                    "Explicitly defers backend logic — prevents scope creep",
                  ],
                },
                {
                  level: "Intermediate",
                  levelColor: "text-electric-blue bg-electric-blue/10 border-electric-blue/25",
                  project: "StudyFocus — adding Supabase auth",
                  prompt: `Add Supabase authentication to StudyFocus. I've already installed @supabase/supabase-js and set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.

Add:
1. A Supabase browser client utility at lib/supabase.ts
2. A login page at app/login/page.tsx with email + password fields and a "Sign In" button. On success, redirect to /dashboard
3. Middleware at middleware.ts that protects /dashboard — if no session, redirect to /login
4. A "Sign Out" button in the existing header (app/layout.tsx) that calls supabase.auth.signOut() and redirects to /login

Use our existing dark theme and shadcn/ui Input and Button components. Don't create any new pages beyond login — everything else already exists.`,
                  whyItWorks: [
                    "Provides setup context upfront (packages installed, env vars set)",
                    "Four numbered tasks map cleanly to four files Cursor needs to create/edit",
                    "References existing files (app/layout.tsx) so Cursor knows not to create duplicates",
                    "Scoped clearly: \"Don't create any new pages beyond login\"",
                  ],
                },
                {
                  level: "Advanced",
                  levelColor: "text-vibe-purple bg-vibe-purple/10 border-vibe-purple/25",
                  project: "StudyFocus — server components refactor",
                  prompt: `Refactor the data fetching in app/dashboard/page.tsx. Currently it fetches data client-side using useEffect and useState. Convert it to the Next.js 14 App Router pattern:

1. Convert the page to a React Server Component (remove "use client", useEffect, and useState)
2. Create a Supabase server client at lib/supabase-server.ts using createServerClient from @supabase/ssr
3. Move all data-fetching logic to a new file lib/data.ts with typed TypeScript return values
4. Wrap the page content in a <Suspense> boundary with a loading skeleton that matches the existing card layout
5. Add an error.tsx file in app/dashboard/ that catches fetch errors and shows a user-friendly error card

Keep all existing UI components (cards, charts, table) completely unchanged — only refactor the data layer. Do not change any CSS classes or component structure.`,
                  whyItWorks: [
                    "Explains the current state (client-side useEffect) so Cursor understands what to change",
                    "Five numbered tasks with specific file targets for each",
                    "Specifies the exact library and function (@supabase/ssr, createServerClient)",
                    "\"Do not change any CSS classes\" protects the working UI during a risky refactor",
                  ],
                },
              ].map((example) => (
                <div key={example.level} className="rounded-xl border border-border bg-card/40 overflow-hidden">
                  <div className="flex items-center gap-3 px-5 py-3 border-b border-border bg-card/60">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${example.levelColor}`}>
                      {example.level}
                    </span>
                    <span className="text-xs text-muted-foreground">{example.project}</span>
                  </div>
                  <div className="p-5 font-mono text-xs text-foreground/75 leading-relaxed whitespace-pre-wrap bg-[#06060e]">
                    {example.prompt}
                  </div>
                  <div className="px-5 py-4 border-t border-border bg-card/30">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-2.5">
                      Why this works
                    </p>
                    <div className="space-y-1.5">
                      {example.whyItWorks.map((w) => (
                        <div key={w} className="flex gap-2 text-xs text-muted-foreground">
                          <Check className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>{w}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <InteractiveCallout variant="tip" title="Build one feature at a time" className="mt-6">
              Resist the urge to prompt &ldquo;build my whole app.&rdquo; Experienced vibe
              coders work feature by feature, confirming each piece works before
              starting the next. Think of it like constructing a building: you
              pour the foundation before you raise the walls.
            </InteractiveCallout>

            <InteractiveCallout variant="challenge" title="Your Challenge" className="mt-4">
              Open Cursor and use Agent mode (⌘I) to create a simple landing page.
              Use the prompt formula: give it context (your app idea from the PRD),
              what to build (a static home page), constraints (use Tailwind, no backend),
              and style details (dark theme, centered). Review the diff before accepting.
            </InteractiveCallout>
          </LessonBlock>

          <KnowledgeCheck
            checkId="check-4"
            sectionId="check-4"
            questions={check4Questions}
          />

          {/* ══════════════════════════════════════════════════════════════
              LESSON 5: DEBUGGING & ERROR HANDLING
          ══════════════════════════════════════════════════════════════ */}
          <LessonBlock
            lessonId="lesson-5"
            lessonNumber={5}
            title="Debugging & Error Handling"
            estimatedReadingTime="10 min read"
            sectionId="lesson-5"
          >
            <p className="text-base text-muted-foreground leading-relaxed italic">
              The #1 skill that separates successful vibe coders from frustrated ones isn&apos;t writing code — it&apos;s handling it when things break.
            </p>

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Here&apos;s the good news: things breaking is completely normal.
              Every developer, at every level, deals with errors constantly.
              What experienced developers have is a systematic approach to
              diagnosing and resolving them. This section gives you that
              approach — designed specifically for vibe coders who may not
              recognize the code itself.
            </p>

            {/* Reading errors */}
            <SubHeading id="reading-errors">How to Read an Error Message</SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Error messages look scary, but they always contain the same four
              pieces of information. You don&apos;t need to understand the code
              around it — you just need to find these four things:
            </p>
            <div className="rounded-xl border border-border bg-[#07070f] overflow-hidden mb-5">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-card/50">
                <Terminal className="w-3.5 h-3.5 text-red-400" />
                <span className="text-xs font-semibold text-foreground">Example error (Next.js)</span>
              </div>
              <div className="p-5 font-mono text-xs leading-relaxed">
                <p className="text-red-400">
                  ./app/dashboard/page.tsx
                </p>
                <p className="text-amber-400">
                  Error: Type error on line 42
                </p>
                <p className="text-muted-foreground">
                  Property &apos;userId&apos; does not exist on type &apos;Session&apos;
                </p>
                <p className="text-muted-foreground/50 text-[11px] mt-2">
                  at Object.&lt;anonymous&gt; (app/dashboard/page.tsx:42:18)
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  n: "①",
                  label: "File name",
                  value: "app/dashboard/page.tsx",
                  what: "WHERE the error is. Click the filename in Cursor to jump directly to the file.",
                  color: "text-red-400",
                },
                {
                  n: "②",
                  label: "Line number",
                  value: "line 42",
                  what: "The exact line in the file. Cursor highlights it for you.",
                  color: "text-amber-400",
                },
                {
                  n: "③",
                  label: "Error type",
                  value: "Type error",
                  what: "The category of error — Type, Syntax, Module, Runtime, etc. Tells you what kind of problem it is.",
                  color: "text-vibe-purple",
                },
                {
                  n: "④",
                  label: "Plain-English description",
                  value: "Property 'userId' does not exist",
                  what: "This is the most useful part. Copy this sentence and paste it into Cursor Chat.",
                  color: "text-green-400",
                },
              ].map((item) => (
                <div key={item.n} className="flex gap-3 p-3.5 rounded-xl border border-border bg-card/40">
                  <span className={`text-lg font-bold flex-shrink-0 ${item.color}`}>{item.n}</span>
                  <div>
                    <p className={`text-xs font-bold ${item.color} mb-0.5`}>{item.label}</p>
                    <code className="text-[11px] font-mono text-foreground bg-white/8 px-1.5 py-0.5 rounded block mb-1.5">
                      {item.value}
                    </code>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.what}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Copy-paste method */}
            <SubHeading id="copy-paste-method">The Copy-Paste Method</SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              This is the most important debugging skill you need right now. It
              works for 80% of errors you&apos;ll encounter as a new vibe coder:
            </p>
            <div className="space-y-0 mb-5">
              <NumberedStep n={1} title="Select the full error message">
                In your terminal or browser console, click and drag to select
                the entire error — from the first red line to the end of the
                stack trace. Don&apos;t worry about selecting too much.
              </NumberedStep>
              <NumberedStep n={2} title="Copy it (Cmd+C)">
                Copy the selection. You want the raw text, including file names
                and line numbers.
              </NumberedStep>
              <NumberedStep n={3} title="Open Cursor Chat (Cmd+L)">
                Open the Chat panel in Cursor. This gives the AI full context
                of your codebase while you ask the question.
              </NumberedStep>
              <NumberedStep n={4} title="Paste and add a short instruction">
                <div>
                  Type or paste this structure:
                  <div className="mt-2 rounded-lg bg-[#07070f] border border-border px-4 py-3 font-mono text-xs text-foreground/80 leading-loose">
                    Fix this error:<br />
                    <span className="text-muted-foreground">[paste error here]</span><br />
                    <br />
                    The relevant file is app/dashboard/page.tsx. I have not changed any other files recently.
                  </div>
                </div>
              </NumberedStep>
              <NumberedStep n={5} title="Review the proposed fix, then accept">
                Cursor will diagnose the error and propose a code change. Read
                the explanation first — understanding why it broke helps you
                avoid the same issue next time.
              </NumberedStep>
            </div>

            <InteractiveCallout variant="tip">
              In Cursor Chat, you can also{" "}
              <strong>select the error text in the terminal</strong>, right-click
              it, and choose{" "}
              <strong>Add to Chat</strong>. This pastes the error directly into
              your open Chat conversation with proper formatting.
            </InteractiveCallout>

            {/* Common errors */}
            <SubHeading id="common-errors">Common Error Patterns & Quick Fixes</SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              You will encounter all five of these at some point. Bookmark this
              section — it saves a lot of panicking.
            </p>
            <div className="rounded-xl border border-border bg-card/40 overflow-hidden">
              <div className="px-5 py-3 border-b border-border bg-card/60 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-electric-blue" />
                <span className="text-sm font-semibold text-foreground">Common Errors Quick Reference</span>
              </div>
              <div className="divide-y divide-border">
                {[
                  {
                    name: "Module not found",
                    example: "Cannot find module '@supabase/supabase-js'",
                    cause: "A package is imported in code but hasn't been installed.",
                    fix: "Run npm install [package-name] in your terminal. Then restart the dev server.",
                    fixColor: "text-green-400",
                  },
                  {
                    name: "TypeScript type error",
                    example: "Type 'string | undefined' is not assignable to type 'string'",
                    cause: "A variable might be undefined when your code expects a definite value.",
                    fix: "Paste into Cursor Chat. TypeScript errors are the easiest for AI to fix — just ask.",
                    fixColor: "text-electric-blue",
                  },
                  {
                    name: "Build failure",
                    example: "Failed to compile. Found N errors.",
                    cause: "Syntax error, broken import, or invalid JSX in one of your files.",
                    fix: "Read the first error in the list — it often causes the rest. Fix it first, then rebuild.",
                    fixColor: "text-amber-400",
                  },
                  {
                    name: "Hydration error",
                    example: "Error: Hydration failed because the initial UI does not match",
                    cause: "A Next.js-specific error. The server-rendered HTML doesn't match what React tries to render in the browser — often caused by timestamps, random values, or browser-only APIs in server components.",
                    fix: "Add \"use client\" to the component causing the issue, or wrap the dynamic content in a useEffect.",
                    fixColor: "text-vibe-purple",
                  },
                  {
                    name: "API key undefined",
                    example: "Error: process.env.OPENAI_API_KEY is undefined",
                    cause: "Environment variable not set, wrong name, or missing NEXT_PUBLIC_ prefix for client-side access.",
                    fix: "Check your .env.local file. For browser-side variables, the name must start with NEXT_PUBLIC_. Restart the dev server after any .env change.",
                    fixColor: "text-red-400",
                  },
                ].map((error, i) => (
                  <div key={i} className="px-5 py-4">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-red-400 bg-red-400/10 border border-red-400/25 px-2 py-0.5 rounded-full">
                        {error.name}
                      </span>
                      <code className="text-[10px] font-mono text-muted-foreground/60">
                        {error.example}
                      </code>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                      <span className="text-foreground/60 font-semibold">Cause: </span>
                      {error.cause}
                    </p>
                    <p className="text-xs leading-relaxed">
                      <span className={`font-semibold ${error.fixColor}`}>Fix: </span>
                      <span className="text-muted-foreground">{error.fix}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* When AI loops */}
            <SubHeading id="when-ai-loops">When the AI Gets Stuck in a Loop</SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              It happens to everyone: you ask the AI to fix an error, it
              introduces a new one. You ask it to fix that, it brings back the
              original. You&apos;re going in circles and losing progress. Here&apos;s your
              four-strategy playbook for getting unstuck:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  n: "01",
                  title: "Undo to last working state",
                  detail: "Use Cmd+Z repeatedly (or git checkout if you committed recently) to get back to the last version that actually ran. Then approach the feature with a simpler, more constrained prompt. Sometimes the AI went down a complex path when a simpler one exists.",
                  color: "text-electric-blue",
                  border: "border-electric-blue/20",
                },
                {
                  n: "02",
                  title: "Start a fresh Chat with full context",
                  detail: "Long Chat threads accumulate confusion. Open a new Cursor Chat, explain the problem from scratch: \"I'm building X. I'm trying to do Y. Here's the error I'm getting: [paste]. Here's the relevant code: [paste code block]. What's the correct approach?\"",
                  color: "text-vibe-purple",
                  border: "border-vibe-purple/20",
                },
                {
                  n: "03",
                  title: "Switch models",
                  detail: "Different LLMs have different strengths. If Claude Sonnet 4.6 is going in circles on a problem, try Claude Opus 4.6 (stronger reasoning) or GPT-5.4 Codex (different training, different approach). Switch in Cursor's model selector at the top of the Chat panel.",
                  color: "text-green-400",
                  border: "border-green-400/20",
                },
                {
                  n: "04",
                  title: "Break it into smaller pieces",
                  detail: "If a feature is complex enough to confuse the AI repeatedly, break it into the smallest possible unit of work. Instead of \"build user authentication,\" try \"create a login form UI with no backend logic.\" Get that working, then add the backend in a separate step.",
                  color: "text-amber-400",
                  border: "border-amber-400/20",
                },
              ].map((s) => (
                <div key={s.n} className={`rounded-xl border ${s.border} bg-card/40 p-5`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-2xl font-black ${s.color} opacity-40`}>{s.n}</span>
                    <p className={`text-sm font-semibold ${s.color}`}>{s.title}</p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.detail}</p>
                </div>
              ))}
            </div>

            {/* Git safety */}
            <SubHeading id="git-safety">Git as Your Safety Net</SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Git is a version control system — it tracks every change to your
              code and lets you roll back to any previous state. For vibe
              coders, think of it as a save-game system: you can always
              reload the last checkpoint. You don&apos;t need to understand Git
              deeply to use it safely. You just need three commands:
            </p>

            <CodePlayground tabs={gitCommandsTabs} />

            <InteractiveCallout variant="warning" title="Commit before big changes" className="mt-5">
              Before you give Cursor a large Agent task (like &ldquo;add
              authentication&rdquo; or &ldquo;refactor the data layer&rdquo;), always commit your
              current working state first. If the AI makes a mess, you can
              restore to the pre-task checkpoint instantly. This habit will
              save you hours of frustration.
            </InteractiveCallout>

            <InteractiveCallout variant="challenge" title="Your Challenge" className="mt-4">
              Intentionally break something small in your project — delete a closing
              tag, misspell a variable name. Then practice reading the error message:
              find the file name, line number, error type, and plain-English
              description. Then use the copy-paste method to fix it with Cursor Chat.
            </InteractiveCallout>
          </LessonBlock>

          <KnowledgeCheck
            checkId="check-5"
            sectionId="check-5"
            questions={check5Questions}
          />

          {/* ══════════════════════════════════════════════════════════════
              LESSON 6: THE ECOSYSTEM
          ══════════════════════════════════════════════════════════════ */}
          <LessonBlock
            lessonId="lesson-6"
            lessonNumber={6}
            title="The Ecosystem"
            estimatedReadingTime="8 min read"
            sectionId="lesson-6"
          >
            <p className="text-base text-muted-foreground leading-relaxed italic">
              The tools that supercharge vibe coding — databases, deployment, version control, and more.
            </p>

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Cursor handles the code. But a real app needs more than code —
              it needs a database, a deployment platform, version control, and
              a way to manage secrets. These tools are the standard stack every
              vibe coder should know. Each one has been designed to minimize
              complexity so you can integrate them with a few prompts to Cursor.
            </p>

            {/* Supabase */}
            <SubHeading id="supabase">
              <Database className="w-4 h-4 text-green-400" />
              Supabase — Database, Auth & Storage
            </SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Supabase</strong> is an
              open-source Firebase alternative that gives you a
              PostgreSQL database, user authentication, file storage, and a
              REST API — all in a single platform, with a generous free tier.
              For vibe coders, it&apos;s transformative: tasks that used to require
              weeks of backend engineering can now be set up in under an hour.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              {[
                {
                  label: "Database",
                  detail: "A full PostgreSQL database with a visual table editor. No SQL required — manage it through a GUI or let Cursor write the queries.",
                },
                {
                  label: "Auth",
                  detail: "Email/password, magic link, OAuth (Google, GitHub, etc.) — all pre-built. Add login to your app with one npm install.",
                },
                {
                  label: "Storage",
                  detail: "File uploads (images, PDFs, documents) with automatic CDN delivery. Drag-and-drop bucket management from the dashboard.",
                },
              ].map((item) => (
                <div key={item.label} className="p-3.5 rounded-xl border border-green-400/20 bg-green-400/[0.04]">
                  <p className="text-xs font-bold text-green-400 mb-1.5">{item.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              <strong className="text-foreground">How to connect it:</strong>{" "}
              Create a project at{" "}
              <a
                href="https://supabase.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-electric-blue underline underline-offset-2"
              >
                supabase.com
              </a>
              , grab your project URL and anon key from Project Settings → API,
              and add them to your{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-foreground">
                .env.local
              </code>{" "}
              file. Then tell Cursor:
            </p>
            <div className="rounded-lg bg-[#07070f] border border-border px-4 py-3 font-mono text-xs text-foreground/75 mb-5 leading-relaxed">
              &ldquo;Install @supabase/supabase-js and @supabase/ssr. Create a Supabase browser client at lib/supabase.ts using the NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.&rdquo;
            </div>

            {/* Vercel */}
            <SubHeading id="vercel-tool">
              <Globe className="w-4 h-4 text-foreground" />
              Vercel — Deploy to the Internet in Minutes
            </SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Vercel</strong> is the
              deployment platform built by the creators of Next.js. It takes
              your code from GitHub and puts it live on the internet in under
              two minutes. Every time you push new code, Vercel automatically
              redeploys. No servers to configure, no DevOps knowledge required.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Key features for vibe coders:
            </p>
            <div className="space-y-2 mb-5">
              {[
                "Automatic deploys on every git push — your app updates live whenever you push to GitHub",
                "Preview deployments — every pull request gets its own temporary URL so you can test before going live",
                "Built-in environment variables — set your API keys securely in the Vercel dashboard",
                "Free tier covers most student projects and early-stage MVPs comfortably",
                "One-click custom domain connection — buy a domain on Namecheap or Google Domains, connect in minutes",
              ].map((item) => (
                <div key={item} className="flex gap-2.5 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* GitHub */}
            <SubHeading id="github">
              <GitBranch className="w-4 h-4 text-foreground" />
              GitHub — Version Control Explained Simply
            </SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">GitHub</strong> is where your
              code lives in the cloud. It&apos;s a combination of backup, history,
              and collaboration platform. Every version of your code is saved
              forever. You can see exactly what changed between any two points
              in time. And Vercel reads directly from GitHub to deploy your app.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Cursor has GitHub integration built in — you can commit and push
              directly from the editor. Here&apos;s the basic workflow you&apos;ll use
              every session:
            </p>

            <CodePlayground tabs={githubWorkflowTabs} />

            <InteractiveCallout variant="tip" title="New to GitHub?" className="mt-4">
              Create a free account at{" "}
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-electric-blue underline underline-offset-2">
                github.com
              </a>
              . Then tell Cursor: &ldquo;I need to initialize a git repository and push it to a new GitHub repo called [repo-name]. Walk me through it step by step.&rdquo; Cursor will run all the commands for you.
            </InteractiveCallout>

            {/* V0 */}
            <SubHeading id="v0-tool">
              <Sparkles className="w-4 h-4 text-foreground" />
              V0 by Vercel — Generate UI from Text
            </SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">V0</strong> (
              <a href="https://v0.dev" target="_blank" rel="noopener noreferrer" className="text-electric-blue underline underline-offset-2">
                v0.dev
              </a>
              ) is a tool from Vercel that generates fully-styled React
              components from a text description. Describe a UI component, get
              production-ready shadcn/ui code you can paste directly into your
              project.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Best for: data tables, dashboards, form layouts, navigation
              components — anything where getting the structure right visually
              is the hard part. Generate it with V0, paste the code into
              Cursor, and let Cursor wire up the logic.
            </p>
            <div className="rounded-lg bg-[#07070f] border border-border px-4 py-3 font-mono text-xs text-foreground/75 mb-5 leading-relaxed">
              Example V0 prompt: &ldquo;A dark-themed data table showing student study sessions with columns: Date, Subject, Topics Covered, Score. Include sorting, pagination, and a search bar. Use shadcn/ui components.&rdquo;
            </div>

            {/* npm */}
            <SubHeading id="npm">
              <Package className="w-4 h-4 text-red-400" />
              npm — The App Store for Code Libraries
            </SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">npm</strong> (Node Package
              Manager) is the registry that stores over 2 million JavaScript
              packages — pre-written code libraries for almost every use case
              imaginable. Think of it as an app store for code. When Cursor
              tells you to install a library, npm is where it comes from.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              {[
                {
                  cmd: "npm install [package-name]",
                  desc: "Install a new library. Run this in your terminal when Cursor tells you to.",
                },
                {
                  cmd: "npm run dev",
                  desc: "Start your local development server. Your app is at localhost:3000.",
                },
                {
                  cmd: "npm run build",
                  desc: "Build your app for production. Catches TypeScript and compilation errors before you deploy.",
                },
                {
                  cmd: "npm install",
                  desc: "Reinstall all dependencies (from package.json). Run this after cloning a project.",
                },
              ].map((item) => (
                <div key={item.cmd} className="p-3.5 rounded-xl border border-border bg-card/40">
                  <code className="text-[11px] font-mono text-electric-blue block mb-1.5">
                    {item.cmd}
                  </code>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Env vars */}
            <SubHeading id="env-vars">
              <Key className="w-4 h-4 text-amber-400" />
              Environment Variables & API Keys
            </SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              An <strong className="text-foreground">environment variable</strong>{" "}
              is a secret value — like an API key or a database password —
              that your app needs but should never appear in your code. If you
              put an API key directly in a file and push to GitHub, anyone who
              finds that file can use your account (and your credits).
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              In Next.js, environment variables live in a file called{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-foreground">
                .env.local
              </code>{" "}
              in the root of your project. This file is automatically excluded
              from git — your secrets stay on your machine.
            </p>

            <CodePlayground tabs={envVarsTabs} />

            <div className="space-y-2.5 mt-4">
              {[
                {
                  rule: "NEXT_PUBLIC_ prefix = exposed to the browser",
                  detail: "Any variable starting with NEXT_PUBLIC_ is accessible in client-side code. Use this for Supabase URL/anon key (safe to expose). Never use it for private API keys.",
                },
                {
                  rule: "No prefix = server-side only",
                  detail: "Variables without NEXT_PUBLIC_ are only accessible in server-side code (API routes, server components). Use this for OpenAI/Anthropic keys, database passwords, anything truly secret.",
                },
                {
                  rule: "Restart the dev server after changing .env.local",
                  detail: "Next.js only reads .env.local on startup. Ctrl+C to stop, then npm run dev again. This catches many mysterious \"undefined\" API key issues.",
                },
              ].map((item) => (
                <div key={item.rule} className="flex gap-3 p-3.5 rounded-xl border border-amber-400/20 bg-amber-400/[0.04]">
                  <span className="text-amber-400 flex-shrink-0 font-bold text-sm">→</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-0.5">{item.rule}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Ecosystem summary grid */}
            <div className="mt-10">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/50 mb-4">
                Full ecosystem at a glance
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  {
                    logo: "SB",
                    logoBg: "bg-green-500/20 text-green-400 border-green-500/30",
                    name: "Supabase",
                    category: "Database & Auth",
                    desc: "PostgreSQL database, auth, and file storage with a visual dashboard.",
                    href: "https://supabase.com",
                  },
                  {
                    logo: "▲",
                    logoBg: "bg-white/10 text-white border-white/20",
                    name: "Vercel",
                    category: "Deployment",
                    desc: "Deploy your Next.js app globally in 60 seconds. Auto-deploy on push.",
                    href: "https://vercel.com",
                  },
                  {
                    logo: "GH",
                    logoBg: "bg-white/10 text-white border-white/20",
                    name: "GitHub",
                    category: "Version Control",
                    desc: "Cloud backup for your code. Every change tracked forever.",
                    href: "https://github.com",
                  },
                  {
                    logo: "V0",
                    logoBg: "bg-electric-blue/20 text-electric-blue border-electric-blue/30",
                    name: "V0",
                    category: "UI Generation",
                    desc: "Generate production-ready React components from a text prompt.",
                    href: "https://v0.dev",
                  },
                  {
                    logo: "npm",
                    logoBg: "bg-red-500/20 text-red-400 border-red-500/30",
                    name: "npm",
                    category: "Package Manager",
                    desc: "Install any of 2M+ open-source JavaScript libraries instantly.",
                    href: "https://npmjs.com",
                  },
                  {
                    logo: ".env",
                    logoBg: "bg-amber-400/20 text-amber-400 border-amber-400/30",
                    name: "Environment Variables",
                    category: "Secret Management",
                    desc: "Keep API keys out of your code and out of GitHub.",
                    href: "https://nextjs.org/docs/basic-features/environment-variables",
                  },
                ].map((tool) => (
                  <a
                    key={tool.name}
                    href={tool.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-3 p-4 rounded-xl border border-border bg-card/40 hover:border-electric-blue/30 hover:bg-card/70 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className={`w-9 h-9 rounded-lg border flex items-center justify-center text-[11px] font-black ${tool.logoBg}`}>
                        {tool.logo}
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-electric-blue transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{tool.name}</p>
                      <p className="text-[10px] text-electric-blue mb-1.5">{tool.category}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{tool.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <InteractiveCallout variant="challenge" title="Your Challenge" className="mt-8">
              Create a GitHub account if you don&apos;t have one already, then push
              a project to a new repository. Even a blank folder with a README
              counts. Tell Cursor: &ldquo;Walk me through initializing git and pushing
              to a new GitHub repo called [name].&rdquo;
            </InteractiveCallout>
          </LessonBlock>

          <KnowledgeCheck
            checkId="check-6"
            sectionId="check-6"
            questions={check6Questions}
          />

          {/* ══════════════════════════════════════════════════════════════
              LESSON 7: PUBLISHING YOUR APP
          ══════════════════════════════════════════════════════════════ */}
          <LessonBlock
            lessonId="lesson-7"
            lessonNumber={7}
            title="Publishing Your App"
            estimatedReadingTime="5 min read"
            sectionId="lesson-7"
          >
            <p className="text-base text-muted-foreground leading-relaxed italic">
              Getting from localhost:3000 to a real URL the world can visit.
            </p>

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              The moment your app goes live is genuinely exciting — you built
              something and it&apos;s real. The good news: with Next.js and Vercel,
              the deployment process takes about ten minutes the first time and
              sixty seconds every time after. Here&apos;s the complete process.
            </p>

            {/* Deploy to Vercel */}
            <SubHeading id="deploy-to-vercel">Deploy to Vercel — Step by Step</SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              This assumes you have a working Next.js app locally and a GitHub
              account. If you don&apos;t have a GitHub account yet, create one free
              at{" "}
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-electric-blue underline underline-offset-2">
                github.com
              </a>{" "}
              first.
            </p>
            <div className="space-y-0">
              <NumberedStep n={1} title="Push your code to GitHub">
                <div className="space-y-2">
                  <p>If you haven&apos;t set up git yet, run these commands in your terminal:</p>
                  <div className="rounded-lg bg-[#07070f] border border-border px-4 py-3 font-mono text-xs text-foreground/80 leading-loose">
                    git init<br />
                    git add .<br />
                    git commit -m &quot;initial commit&quot;<br />
                    git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git<br />
                    git push -u origin main
                  </div>
                  <p>
                    Or ask Cursor: &ldquo;Push this project to a new GitHub repo called [name]. Walk me through each step.&rdquo;
                  </p>
                </div>
              </NumberedStep>
              <NumberedStep n={2} title="Create a Vercel account and connect GitHub">
                Go to{" "}
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-electric-blue underline underline-offset-2">
                  vercel.com
                </a>{" "}
                and sign up with your GitHub account. This automatically grants
                Vercel access to your repositories.
              </NumberedStep>
              <NumberedStep n={3} title="Import your repository">
                Click{" "}
                <strong className="text-foreground">Add New → Project</strong>{" "}
                in the Vercel dashboard. Find your repository in the list and
                click Import. Vercel detects that it&apos;s a Next.js project
                automatically.
              </NumberedStep>
              <NumberedStep n={4} title="Add your environment variables">
                Before deploying, click{" "}
                <strong className="text-foreground">Environment Variables</strong>{" "}
                and add every key-value pair from your{" "}
                <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-foreground">
                  .env.local
                </code>{" "}
                file. This is critical — your deployed app needs these to function.
              </NumberedStep>
              <NumberedStep n={5} title="Click Deploy">
                Vercel builds your app and deploys it. Watch the build logs in
                real time. The whole process takes 60–120 seconds.
              </NumberedStep>
              <NumberedStep n={6} title="Visit your live URL">
                Vercel gives you a URL like{" "}
                <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-foreground">
                  your-app.vercel.app
                </code>
                . Share it immediately. From now on, every{" "}
                <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-foreground">
                  git push
                </code>{" "}
                automatically redeploys your app.
              </NumberedStep>
            </div>

            <InteractiveCallout variant="warning" title="Build fails on Vercel?">
              If your app builds locally but fails on Vercel, the most common
              causes are: (1) missing environment variables — double-check
              every key in the Vercel dashboard; (2) a TypeScript error you
              haven&apos;t caught yet — run{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-foreground">
                npm run build
              </code>{" "}
              locally first and fix all errors before pushing.
            </InteractiveCallout>

            {/* Custom domain */}
            <SubHeading id="custom-domain">Connecting a Custom Domain</SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Your{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-foreground">
                .vercel.app
              </code>{" "}
              URL works fine for sharing, but a custom domain (like{" "}
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-foreground">
                studyfocus.app
              </code>
              ) makes the project feel professional and is worth it for anything
              you want to put on a resume or pitch to investors.
            </p>
            <div className="space-y-0">
              <NumberedStep n={1} title="Buy a domain">
                <a href="https://namecheap.com" target="_blank" rel="noopener noreferrer" className="text-electric-blue underline underline-offset-2">Namecheap</a>,{" "}
                <a href="https://porkbun.com" target="_blank" rel="noopener noreferrer" className="text-electric-blue underline underline-offset-2">Porkbun</a>, or{" "}
                <a href="https://domains.google" target="_blank" rel="noopener noreferrer" className="text-electric-blue underline underline-offset-2">Google Domains</a>{" "}
                are all reliable. Most{" "}
                <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-foreground">.app</code>{" "}
                and{" "}
                <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono text-foreground">.io</code>{" "}
                domains are $10–20/year.
              </NumberedStep>
              <NumberedStep n={2} title="Add the domain in Vercel">
                In your project dashboard, go to{" "}
                <strong className="text-foreground">Settings → Domains</strong>{" "}
                and enter your domain. Vercel will give you DNS records to add.
              </NumberedStep>
              <NumberedStep n={3} title="Update DNS at your registrar">
                Log in to Namecheap/Porkbun, go to DNS settings, and add the
                records Vercel provided (usually an A record and a CNAME). DNS
                changes propagate in 5 minutes to 48 hours, but usually under
                30 minutes.
              </NumberedStep>
            </div>

            {/* Sharing */}
            <SubHeading id="sharing">Sharing Your Project</SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Getting your app in front of real users is as important as
              building it. Here&apos;s how to make the most of your launch:
            </p>
            <div className="space-y-3">
              {[
                {
                  title: "Portfolio / personal site",
                  detail: "Add a project card with a live demo link and a 2-sentence description of what problem it solves. Screenshots matter — take a clean one with a browser mockup.",
                },
                {
                  title: "LinkedIn",
                  detail: "Post about what you built. Describe the problem, the tool you used (Cursor + Claude Sonnet 4.6), and what you learned. These posts get surprisingly strong engagement, especially in business/tech communities.",
                },
                {
                  title: "GitHub repo",
                  detail: "Make your repository public and write a good README. Explain what the project does, how to run it locally, and the tech stack. Future employers look at GitHub.",
                },
                {
                  title: "Resume",
                  detail: "\"Built and deployed a full-stack AI-powered study tool using Next.js, Supabase, and Claude API. Live at studyfocus.app.\" This is legitimate work experience. List it as a project.",
                },
                {
                  title: "Share with your target users first",
                  detail: "Send the link to 5 friends who fit your user profile. Real feedback from real users — even informal — is more valuable than any polished launch.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 p-4 rounded-xl border border-border bg-card/40">
                  <ChevronRight className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-0.5">{item.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* After launch */}
            <SubHeading id="after-launch">What Comes After Launch</SubHeading>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Shipping is the beginning, not the end. Here&apos;s what comes next:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                {
                  title: "Monitor for errors",
                  detail: "Vercel's Functions tab shows real-time logs and errors from your deployed app. Check it after your first few users try it — real usage breaks things local testing misses.",
                  icon: Terminal,
                  color: "text-red-400",
                },
                {
                  title: "Get feedback early",
                  detail: "Add a simple feedback button (even just a mailto link to your email). Unfiltered feedback from 5 users is worth more than 100 analytics pageviews.",
                  icon: MessageSquare,
                  color: "text-electric-blue",
                },
                {
                  title: "Iterate in public",
                  detail: "Share updates as you build them. \"Added dark mode to StudyFocus — link in comments\" gets engagement and builds an audience before you need one.",
                  icon: Zap,
                  color: "text-vibe-purple",
                },
                {
                  title: "Plan v2 with what you learned",
                  detail: "Go back to your PRD. What did users ask for? What were the biggest pain points? Run another brainstorm session with Claude — now with real user data to guide it.",
                  icon: Lightbulb,
                  color: "text-amber-400",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 p-4 rounded-xl border border-border bg-card/40">
                  <div className="p-1.5 rounded-md bg-card border border-border flex-shrink-0 mt-0.5">
                    <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">{item.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <InteractiveCallout variant="challenge" title="Your Final Challenge" className="mb-8">
              Deploy something to Vercel today — even a blank Next.js app is a win.
              The goal is to go through the full deploy flow at least once so it&apos;s
              not intimidating when your real project is ready to ship.
            </InteractiveCallout>

            {/* Celebration callout */}
            <div className="relative overflow-hidden rounded-2xl border border-vibe-purple/30 bg-gradient-to-br from-[#1a0a35] via-[#0f0820] to-[#030a1a] p-8">
              <div className="absolute -left-16 -top-16 w-72 h-72 rounded-full bg-vibe-purple/20 blur-3xl pointer-events-none" />
              <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full bg-electric-blue/10 blur-3xl pointer-events-none" />
              <div className="relative z-10 text-center">
                <div className="text-4xl mb-4">🎉</div>
                <p className="text-xl font-bold text-white mb-3">
                  You just built and shipped an app with AI.
                </p>
                <p className="text-sm text-white/70 leading-relaxed max-w-lg mx-auto mb-6">
                  This is exactly what we do at WVibe and QVibe — in hackathons,
                  workshops, and weekend sprints. You went from a vague idea to a
                  live product. That&apos;s not a small thing. Most people never ship
                  anything.
                </p>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-bg text-white text-sm font-semibold shadow-lg shadow-electric-blue/25">
                  <Rocket className="w-4 h-4" />
                  Welcome to the builder community.
                </div>
                <p className="text-xs text-white/40 mt-5">
                  Join us at our next WVibe or QVibe workshop to build your next project with a team.
                </p>
              </div>
            </div>
          </LessonBlock>
        </article>

        {/* ── Progress Sidebar ──────────────────────────────────────────── */}
        <ProgressSidebar items={progressItems} />
      </div>
    </div>
  );
}
