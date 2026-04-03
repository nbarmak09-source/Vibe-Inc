import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Check,
  ChevronRight,
  Database,
  Globe,
  Layers,
  Lightbulb,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  LessonBlock,
  KnowledgeCheck,
  ProgressSidebar,
  InteractiveCallout,
  CodePlayground,
  ArchitectureDiagram,
  LayerBadge,
} from "@/components/education";
import type {
  KnowledgeCheckQuestion,
  ProgressSidebarItem,
  CodePlaygroundTab,
} from "@/components/education";

export const metadata: Metadata = {
  title: "Coding Fundamentals",
  description:
    "Understand how code actually works — the languages, layers, and logic behind every app.",
};

/* ─── Progress sidebar items ─────────────────────────────────────────────── */

const progressItems: ProgressSidebarItem[] = [
  { id: "lesson-1", title: "How Code Works",          type: "lesson",          completionId: "cf-lesson-1" },
  { id: "check-1",  title: "Knowledge Check 1",        type: "knowledge-check", completionId: "cf-check-1"  },
  { id: "lesson-2", title: "How AI Operates",          type: "lesson",          completionId: "cf-lesson-2" },
  { id: "check-2",  title: "Knowledge Check 2",        type: "knowledge-check", completionId: "cf-check-2"  },
  { id: "lesson-3", title: "Languages & Layers",       type: "lesson",          completionId: "cf-lesson-3" },
  { id: "check-3",  title: "Knowledge Check 3",        type: "knowledge-check", completionId: "cf-check-3"  },
  { id: "lesson-4", title: "How It All Connects",      type: "lesson",          completionId: "cf-lesson-4" },
];

/* ─── Knowledge check questions ──────────────────────────────────────────── */

const check1Questions: KnowledgeCheckQuestion[] = [
  {
    type: "multiple-choice",
    question: "Which layer is responsible for what the user sees and interacts with in the browser?",
    options: ["Backend", "Frontend", "Database", "Infrastructure"],
    correctAnswer: "Frontend",
    explanation:
      "The frontend handles all the visual UI — HTML renders structure, CSS styles it, and JavaScript makes it interactive. It runs in the user's browser.",
  },
  {
    type: "multiple-choice",
    question: "Where is user data like profiles, scores, and notes stored persistently?",
    options: ["Frontend (browser)", "Backend server memory", "Database", "The CDN"],
    correctAnswer: "Database",
    explanation:
      "Databases store persistent application data. Supabase's PostgreSQL database is a common choice for vibe coding projects — it remembers data even after a server restart.",
  },
  {
    type: "true-false",
    question: "The backend and frontend run the same code in the same place.",
    correctAnswer: "False",
    explanation:
      "The frontend runs in the user's browser while the backend runs on a server. They are separate environments that communicate via HTTP requests and API calls.",
  },
  {
    type: "multiple-choice",
    question: "What format is typically used to send data between the frontend and backend?",
    options: ["HTML", "XML", "JSON", "CSV"],
    correctAnswer: "JSON",
    explanation:
      "JSON (JavaScript Object Notation) is the standard format for API requests and responses. It's human-readable, lightweight, and easy for both JavaScript and Python to work with.",
  },
];

const check2Questions: KnowledgeCheckQuestion[] = [
  {
    type: "true-false",
    question:
      "AI models learned to code by being explicitly programmed with thousands of coding rules.",
    correctAnswer: "False",
    explanation:
      "LLMs learned by finding patterns in billions of lines of existing code. They predict what code is likely correct based on those patterns — not explicit rules programmed by engineers.",
  },
  {
    type: "multiple-choice",
    question: "What type of coding task is AI best suited for?",
    options: [
      "Inventing entirely new programming languages",
      "Security-critical systems with novel requirements",
      "Common patterns, boilerplate, and well-documented tasks",
      "Complex distributed systems at massive scale",
    ],
    correctAnswer: "Common patterns, boilerplate, and well-documented tasks",
    explanation:
      "AI excels at tasks with many examples in its training data — login flows, CRUD apps, dashboards, and standard API integrations. Novel or security-critical work still requires careful human review.",
  },
  {
    type: "multiple-choice",
    question: "What is the most important factor in getting high-quality code output from an AI?",
    options: [
      "Using the most expensive AI model available",
      "Quality and specificity of your prompt",
      "Restarting the AI session frequently",
      "Writing in Python instead of JavaScript",
    ],
    correctAnswer: "Quality and specificity of your prompt",
    explanation:
      "You direct; AI types. A clear prompt with context, constraints, and style details produces dramatically better results than a vague one — regardless of which model you use.",
  },
];

const check3Questions: KnowledgeCheckQuestion[] = [
  {
    type: "true-false",
    question: "JSON is a programming language used to add interactivity to web apps.",
    correctAnswer: "False",
    explanation:
      "JSON is a data format — it stores and transfers structured information but contains no logic or instructions. A helpful analogy: it's like an Excel row exported into a text format computers can pass around.",
  },
  {
    type: "multiple-choice",
    question:
      "Which language makes a webpage interactive — responding to clicks and updating the screen?",
    options: ["HTML", "CSS", "JavaScript", "SQL"],
    correctAnswer: "JavaScript",
    explanation:
      "JavaScript runs in the browser and handles all interactivity: button clicks, form validation, dynamic data loading, and UI updates without a full page reload.",
  },
  {
    type: "fill-blank",
    question: "TypeScript is JavaScript with ___",
    correctAnswer: "types",
    explanation:
      "TypeScript adds a type system to JavaScript — you define the shape of data with types like `type Student = { name: string; year: number }`. This catches errors before the app runs.",
  },
  {
    type: "multiple-choice",
    question:
      "You want to find all students from Western University in your database. Which language do you use?",
    options: ["JavaScript", "HTML", "SQL", "Markdown"],
    correctAnswer: "SQL",
    explanation:
      "SQL (Structured Query Language) is used to query relational databases. `SELECT name FROM students WHERE school = 'Western'` is a valid SQL query.",
  },
  {
    type: "multiple-choice",
    question: "Which language is most commonly used for AI, machine learning, and data science?",
    options: ["HTML", "SQL", "R", "Python"],
    correctAnswer: "Python",
    explanation:
      "Python dominates AI/ML work because of its strong ecosystem (PyTorch, TensorFlow, scikit-learn, pandas) and readable syntax. R is used in academic statistics, but Python is the default for ML.",
  },
];

/* ─── Code playground tabs for lesson 4 ─────────────────────────────────── */

const architectureCodeTabs: CodePlaygroundTab[] = [
  {
    id: "frontend-arch",
    filename: "page.tsx (Frontend)",
    language: "typescript",
    code: `// app/page.tsx — React frontend
"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("/api/students")          // → calls Backend
      .then((r) => r.json())
      .then(setStudents);
  }, []);

  return (
    <ul>
      {students.map((s) => (
        <li key={s.name}>{s.name} — {s.score}</li>
      ))}
    </ul>
  );
}`,
  },
  {
    id: "backend-arch",
    filename: "route.ts (Backend)",
    language: "typescript",
    code: `// app/api/students/route.ts — Backend API
import { createClient } from "@/lib/supabase";

export async function GET() {
  const supabase = createClient();
  const { data } = await supabase   // → queries Database
    .from("students")
    .select("name, score")
    .order("score", { ascending: false });

  return Response.json(data);       // → returns JSON to Frontend
}`,
  },
  {
    id: "db-arch",
    filename: "schema.sql (Database)",
    language: "sql",
    code: `-- Supabase / PostgreSQL table definition
CREATE TABLE students (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  school      text NOT NULL,
  score       integer DEFAULT 0,
  enrolled_at timestamptz DEFAULT now()
);

-- Row-level security: users can only read their own row
ALTER TABLE students ENABLE ROW LEVEL SECURITY;`,
  },
];

/* ─── Shared sub-components ──────────────────────────────────────────────── */

function SubHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h3
      id={id}
      className="mt-10 mb-4 flex scroll-mt-24 items-center gap-2 text-lg font-semibold text-foreground"
    >
      <span className="h-5 w-1 flex-shrink-0 rounded-full gradient-bg" />
      {children}
    </h3>
  );
}

type LanguageCardProps = {
  id: string;
  title: string;
  subtitle: string;
  whatItIs: string;
  usedFor: string;
  encounter: string;
  codeTab: CodePlaygroundTab;
  layer?: { label: string; layerId: string };
};

function LanguageCard({
  id,
  title,
  subtitle,
  whatItIs,
  usedFor,
  encounter,
  codeTab,
  layer,
}: LanguageCardProps) {
  return (
    <div id={id} className="scroll-mt-24 rounded-2xl border border-border bg-card/40 p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="mt-0.5 text-xs text-electric-blue">{subtitle}</p>
        </div>
        {layer && (
          <LayerBadge label={layer.label} layerId={layer.layerId} />
        )}
      </div>
      <div className="flex flex-col gap-6">
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
          <p>
            <strong className="text-foreground">What it is:</strong> {whatItIs}
          </p>
          <p>
            <strong className="text-foreground">What it&apos;s used for:</strong>{" "}
            {usedFor}
          </p>
          <p>
            <strong className="text-foreground">
              When a vibe coder might see it:
            </strong>{" "}
            {encounter}
          </p>
        </div>
        <CodePlayground
          tabs={[codeTab]}
          collapsible
          defaultExpanded={false}
          className="w-full min-w-0"
        />
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function CodingFundamentalsPage() {
  return (
    <div>
      <div className="relative pb-24 md:pb-28">
        <article className="min-w-0 space-y-10 md:space-y-12">

          {/* ── Architecture Diagram (before lessons) ───────────────── */}
          <div className="w-full rounded-2xl border border-border bg-card/30 p-6 sm:p-8 lg:p-10">
            <div className="mb-6 sm:mb-8">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 mb-1">
                Start here
              </p>
              <h2 className="text-lg font-bold text-foreground">
                How a Web App is Structured
              </h2>
              <p className="mt-1 text-base text-muted-foreground leading-relaxed">
                Every app you build with vibe coding has the same five layers. Before
                diving into the lessons, explore this diagram to build a mental map —
                then watch it click into place as you read.
              </p>
            </div>
            <ArchitectureDiagram />
          </div>

          {/* ══════════════════════════════════════════════════════════════
              LESSON 1: HOW CODE WORKS
          ══════════════════════════════════════════════════════════════ */}
          <LessonBlock
            lessonId="cf-lesson-1"
            lessonNumber={1}
            title="How Code Works"
            estimatedReadingTime="6 min read"
            sectionId="lesson-1"
          >
            <p className="text-base text-muted-foreground leading-relaxed italic">
              A simple mental model for what software is actually doing behind the scenes.
            </p>

            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                In plain language,{" "}
                <strong className="text-foreground">
                  code is a set of instructions
                </strong>{" "}
                that tells a computer what to do, written in a language the computer can
                understand. If you have ever followed a recipe, assembled IKEA furniture,
                or completed a finance case competition framework, you already understand
                the basic idea: a sequence of steps produces an outcome.
              </p>
              <p>
                The difference is that computers are incredibly literal. A person can
                infer what you meant. A computer cannot. If you tell it to show a login
                button, it shows a login button. If you tell it to check whether a user
                has permission, it does that check. If you forget a step entirely, the
                computer does not fill in the blank for you.
              </p>
              <p>
                This is why coding can feel intimidating at first: not because the
                concepts are magical, but because computers are very strict. The
                encouraging part for vibe coders is that AI now helps bridge that gap.
                You can describe the business outcome in normal language, and the AI can
                translate that into precise instructions. Still, having a mental model of
                what the instructions are doing makes you much better at guiding the AI.
              </p>
            </div>

            <SubHeading id="computer-instructions">
              How computers read and execute instructions
            </SubHeading>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              There are two simplified ways to think about how code gets turned into
              action:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-border bg-card/50">
                <CardContent className="py-4">
                  <p className="mb-2 text-sm font-semibold text-foreground">
                    Compilation
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    The code is translated ahead of time into a form the computer can
                    run efficiently. Think of this like preparing a full presentation
                    deck before class starts. TypeScript is compiled into JavaScript
                    before the browser uses it.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/50">
                <CardContent className="py-4">
                  <p className="mb-2 text-sm font-semibold text-foreground">
                    Interpretation
                  </p>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    The code is read and executed more directly as it runs. Think of
                    this like a TA reading your instructions step by step while carrying
                    them out in real time. JavaScript in the browser is often explained
                    this way.
                  </p>
                </CardContent>
              </Card>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              You do <strong className="text-foreground">not</strong> need to memorize
              compiler theory. The useful takeaway is simpler: some code gets transformed
              before it runs, and some code runs more directly. That is why you sometimes
              see build steps, compile errors, or messages like &quot;transpiling
              TypeScript.&quot;
            </p>

            <SubHeading id="web-stack">The idea of a stack</SubHeading>
            <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
              When people say &quot;tech stack,&quot; they mean the layers that make an app work
              together. The cleanest beginner model is:
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  title: "Frontend",
                  icon: Globe,
                  color: "text-electric-blue",
                  detail:
                    "What users see and click. Pages, buttons, forms, charts, nav bars, and anything visual in the browser.",
                },
                {
                  title: "Backend",
                  icon: Layers,
                  color: "text-vibe-purple",
                  detail:
                    "The logic layer. It checks permissions, runs calculations, talks to APIs, and decides what data the frontend should receive.",
                },
                {
                  title: "Database",
                  icon: Database,
                  color: "text-green-400",
                  detail:
                    "Where data lives. User profiles, orders, notes, class schedules, and any other information your app needs to remember.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-card/40 p-4"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <div className="rounded-lg bg-card p-2 ring-1 ring-foreground/10">
                      <item.icon className={`h-4 w-4 ${item.color}`} />
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      {item.title}
                    </p>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            <SubHeading id="request-response">
              What happens when you visit a website?
            </SubHeading>
            <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
              Let&apos;s say you open a study app on your laptop. Under the hood, the flow
              looks something like this:
            </p>
            <div className="rounded-2xl border border-border bg-card/40 p-5">
              <div className="grid gap-3 md:grid-cols-5">
                {[
                  { title: "User", detail: "Clicks a link or presses a button." },
                  {
                    title: "Browser",
                    detail: "Sends a request asking for a page or some data.",
                  },
                  {
                    title: "Frontend",
                    detail: "Shows the UI and collects user input.",
                  },
                  {
                    title: "Backend",
                    detail: "Runs logic, checks rules, fetches data.",
                  },
                  {
                    title: "Database",
                    detail: "Stores and returns the requested information.",
                  },
                ].map((item, index, array) => (
                  <div
                    key={item.title}
                    className="flex items-center gap-3 md:block"
                  >
                    <div className="min-w-0 flex-1 rounded-xl border border-border bg-[#07070f] px-4 py-3">
                      <p className="text-sm font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {item.detail}
                      </p>
                    </div>
                    {index < array.length - 1 ? (
                      <div className="flex justify-center md:mt-3">
                        <ChevronRight className="h-4 w-4 flex-shrink-0 text-electric-blue" />
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-electric-blue/20 bg-electric-blue/[0.05] px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                Then the response travels back in reverse: the database returns data to
                the backend, the backend formats it for the frontend, and the browser
                renders the result so the user sees the page.
              </div>
            </div>

            <InteractiveCallout variant="concept" className="mt-6">
              <strong>You do not need to master every layer.</strong> But understanding
              that there <em>are</em> layers helps you write better prompts and debug
              faster. If the page looks wrong, that is often a frontend issue. If a form
              submits but no data appears, that might be backend or database logic. This
              mental model makes AI output much less mysterious.
            </InteractiveCallout>
          </LessonBlock>

          <KnowledgeCheck
            checkId="cf-check-1"
            sectionId="check-1"
            questions={check1Questions}
          />

          {/* ══════════════════════════════════════════════════════════════
              LESSON 2: HOW AI OPERATES
          ══════════════════════════════════════════════════════════════ */}
          <LessonBlock
            lessonId="cf-lesson-2"
            lessonNumber={2}
            title="How AI Operates in the Coding Space"
            estimatedReadingTime="7 min read"
            sectionId="lesson-2"
          >
            <p className="text-base text-muted-foreground leading-relaxed italic">
              What modern coding models are actually doing, why they feel so powerful, and where they still need strong human direction.
            </p>

            <SubHeading id="how-llms-code">
              How LLMs understand and generate code
            </SubHeading>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Large language models (LLMs) are trained on enormous amounts of text,
              including books, websites, documentation, and millions of open-source code
              repositories. During training, the model learns patterns: which words tend
              to follow other words, which functions tend to appear together, what a login
              form usually looks like, how a SQL query is usually structured, and so on.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              When you ask an LLM to build a feature, it is not &quot;thinking like a human
              engineer&quot; in the full sense. It is predicting the next most useful token
              based on patterns it has seen before. The reason this works so well in
              software is that code is structured, repetitive, and pattern-rich. Many
              apps use similar building blocks: forms, auth, routing, buttons, dashboards,
              APIs, and databases.
            </p>

            <SubHeading id="ai-strengths">Why AI is good at code</SubHeading>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Patterns: most apps are combinations of familiar patterns the model has seen many times.",
                "Syntax: the model is excellent at reproducing language rules like JSX, SQL, Python, or CSS syntax.",
                "Boilerplate: repetitive setup work is exactly where AI shines.",
                "Common architectures: login flows, CRUD apps, dashboards, and API integrations are now well-understood patterns.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex gap-2.5 rounded-xl border border-border bg-card/40 p-4 text-sm text-muted-foreground"
                >
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <SubHeading id="ai-limitations">Where AI still struggles</SubHeading>
            <div className="space-y-3">
              {[
                {
                  title: "Novel architecture",
                  detail:
                    "If your app has a highly unusual design, a unique business model, or weird constraints, the model has fewer patterns to lean on.",
                },
                {
                  title: "Complex business logic",
                  detail:
                    "AI can write the code, but it often needs a human to define the rules clearly. If your pricing, permissions, or workflow logic is fuzzy, the output will be fuzzy too.",
                },
                {
                  title: "Security",
                  detail:
                    "Authentication, permissions, payments, and sensitive data are areas where AI can make subtle mistakes. These need careful review.",
                },
                {
                  title: "Your exact codebase",
                  detail:
                    "Even the best model only sees the context you provide. If it does not understand your existing files, constraints, or naming conventions, it may generate something that technically works but does not fit your project.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-amber-400/20 bg-amber-400/[0.05] p-4"
                >
                  <p className="text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            <SubHeading id="human-ai-model">
              The human-AI collaboration model
            </SubHeading>
            <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
              The best mental model is:
            </p>
            <div className="rounded-2xl border border-vibe-purple/20 bg-gradient-to-r from-vibe-purple/[0.08] to-electric-blue/[0.05] p-6">
              <p className="text-center text-xl font-bold text-white">
                You think and direct. AI types and executes.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-electric-blue">
                    Your job
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Decide what problem matters, what the user needs, what good looks
                    like, what tradeoffs to accept, and whether the result is correct.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-vibe-purple">
                    AI&apos;s job
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Turn your intent into code, edit multiple files quickly, suggest
                    fixes, explain errors, and handle repetitive implementation work.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              This is why good vibe coding looks less like &quot;press a magic button&quot; and
              more like product leadership. You are setting direction, reviewing output,
              and iterating toward a result.
            </p>

            <SubHeading id="ai-future">
              Where this is heading in the next 2-3 years
            </SubHeading>
            <p className="text-sm leading-relaxed text-muted-foreground">
              We are already moving from autocomplete tools to fully agentic systems.
              Instead of only writing one function at a time, modern coding agents can
              read multiple files, reason across a codebase, run commands, detect errors,
              and revise their own work. Over the next few years, you should expect:
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "More reliable multi-step planning before code is written",
                "Stronger debugging loops where the model fixes and verifies its own output",
                "Better memory of your app's structure and style conventions",
                "Tighter integration with deployment, databases, and testing tools",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-border bg-card/40 p-4 text-sm text-muted-foreground"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-electric-blue" />
                    <span className="font-medium text-foreground">{item}</span>
                  </div>
                </div>
              ))}
            </div>

            <InteractiveCallout variant="concept" className="mt-6">
              This is why vibe coding is a <strong>skill</strong>, not just &quot;asking
              ChatGPT to code for you.&quot; The quality of your direction determines the
              quality of the output.
            </InteractiveCallout>
          </LessonBlock>

          <KnowledgeCheck
            checkId="cf-check-2"
            sectionId="check-2"
            questions={check2Questions}
          />

          {/* ══════════════════════════════════════════════════════════════
              LESSON 3: LANGUAGES & LAYERS
          ══════════════════════════════════════════════════════════════ */}
          <LessonBlock
            lessonId="cf-lesson-3"
            lessonNumber={3}
            title="Languages & Layers Explained"
            estimatedReadingTime="12 min read"
            sectionId="lesson-3"
          >
            <p className="text-base text-muted-foreground leading-relaxed italic">
              You do not need to master every language. You do need to recognize what each one is for when it shows up in Cursor.
            </p>

            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Think of these languages less like separate majors and more like
              specialized roles on a startup team. One handles presentation. One handles
              interaction. One handles data. One handles structure. Once you know each
              role, the codebase becomes much easier to read.
            </p>

            <InteractiveCallout variant="tip" className="mt-4">
              The layer badges next to each language title are clickable — tap one to
              jump up to the interactive diagram and expand that layer.
            </InteractiveCallout>

            <div className="mt-6 space-y-6" id="languages-and-layers">
              <LanguageCard
                id="html"
                title="HTML"
                subtitle="The skeleton of every webpage"
                layer={{ label: "Frontend Layer", layerId: "frontend" }}
                whatItIs="A markup language that defines the structure of a page: headings, paragraphs, buttons, forms, and sections."
                usedFor="Creating the bones of a webpage so the browser knows what elements exist."
                encounter="When Cursor generates page layouts, forms, cards, nav bars, or semantic tags like section, header, main, and footer."
                codeTab={{
                  id: "html-ex",
                  filename: "index.html",
                  language: "html",
                  code: `<section>
  <h1>Course Planner</h1>
  <p>Build your semester schedule in minutes.</p>
  <button type="button">Add course</button>
</section>`,
                }}
              />

              <LanguageCard
                id="css"
                title="CSS"
                subtitle="Styling and visual design"
                layer={{ label: "Frontend Layer", layerId: "frontend" }}
                whatItIs="A stylesheet language that controls how HTML looks: colors, spacing, fonts, layout, and responsiveness."
                usedFor="Making the app visually appealing and usable across laptops, tablets, and phones."
                encounter="When you ask Cursor to change spacing, center a card, make something responsive, or apply a dark theme."
                codeTab={{
                  id: "css-ex",
                  filename: "styles.css",
                  language: "css",
                  code: `.course-card {
  background: #0b1020;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
}`,
                }}
              />

              <LanguageCard
                id="javascript"
                title="JavaScript"
                subtitle="Making things interactive"
                layer={{ label: "Frontend Layer", layerId: "frontend" }}
                whatItIs="The core programming language of the web. It lets a page respond to clicks, form submissions, timers, and dynamic data."
                usedFor="Interactivity: opening menus, validating forms, updating dashboards, calling APIs, and changing what appears on screen."
                encounter="When a button needs to do something, when data loads after a click, or when the page reacts to user input."
                codeTab={{
                  id: "js-ex",
                  filename: "app.js",
                  language: "javascript",
                  code: `const courses = ["Finance 2257", "Business 1220"];
const message = \`You are enrolled in \${courses.length} courses.\`;
console.log(message);`,
                }}
              />

              <LanguageCard
                id="typescript"
                title="TypeScript"
                subtitle="JavaScript with guardrails"
                layer={{ label: "Frontend Layer", layerId: "frontend" }}
                whatItIs="A superset of JavaScript that adds types. Types help catch mistakes before the app runs."
                usedFor="Making larger codebases safer and easier to reason about, especially in React and Next.js projects."
                encounter="When Cursor creates interfaces, types, or shows errors like 'Type string is not assignable to type number.'"
                codeTab={{
                  id: "ts-ex",
                  filename: "types.ts",
                  language: "typescript",
                  code: `type Student = {
  name: string;
  year: number;
};

const student: Student = {
  name: "Maya",
  year: 2,
};`,
                }}
              />

              <LanguageCard
                id="python"
                title="Python"
                subtitle="The Swiss Army knife"
                layer={{ label: "Backend Layer", layerId: "backend" }}
                whatItIs="A general-purpose programming language known for readable syntax and strong ecosystems for AI, automation, and data work."
                usedFor="Machine learning, scripts, APIs, analytics pipelines, and backends."
                encounter="When you use notebooks, AI/ML libraries, automation scripts, or backend code outside the JavaScript ecosystem."
                codeTab={{
                  id: "py-ex",
                  filename: "app.py",
                  language: "python",
                  code: `courses = ["Econ 1021", "Psych 2030"]
summary = f"You are tracking {len(courses)} courses."
print(summary)`,
                }}
              />

              <LanguageCard
                id="r"
                title="R"
                subtitle="Statistics and data science"
                layer={{ label: "Backend Layer", layerId: "backend" }}
                whatItIs="A language built for data analysis, statistics, and visualization."
                usedFor="Survey analysis, econometrics, experiments, forecasting, and academic research."
                encounter="In quantitative research, data science courses, club analytics projects, or work with professors and research teams."
                codeTab={{
                  id: "r-ex",
                  filename: "analysis.R",
                  language: "r",
                  code: `scores <- c(78, 84, 91, 88)
average_score <- mean(scores)
print(average_score)`,
                }}
              />

              <LanguageCard
                id="sql"
                title="SQL"
                subtitle="Talking to databases"
                layer={{ label: "Database Layer", layerId: "database" }}
                whatItIs="A query language for reading, filtering, updating, and organizing data inside relational databases."
                usedFor="Finding records, creating tables, joining data, and asking questions like 'which users signed up this week?'"
                encounter="When working with Supabase, Postgres, analytics dashboards, or backend code that reads and writes application data."
                codeTab={{
                  id: "sql-ex",
                  filename: "query.sql",
                  language: "sql",
                  code: `SELECT name, school
FROM students
WHERE school = 'Western'
ORDER BY name ASC;`,
                }}
              />

              <LanguageCard
                id="json"
                title="JSON"
                subtitle="Structured data, not a programming language"
                whatItIs="A data format used to store and move structured information between systems."
                usedFor="Representing objects like user profiles, course lists, API responses, and app configuration."
                encounter="When APIs return data, when config files are generated, or when Cursor shows structured objects in a request or response."
                codeTab={{
                  id: "json-ex",
                  filename: "response.json",
                  language: "javascript",
                  code: `{
  "studentName": "Aisha",
  "program": "Ivey HBA",
  "courses": ["Finance 2257", "MOS 2310"]
}`,
                }}
              />

              <InteractiveCallout variant="warning">
                <strong>Important:</strong> JSON is <strong>not</strong> a programming
                language. It does not contain logic or instructions. It is just a way
                of structuring data. A helpful analogy is an Excel row exported into a
                text-based format that computers can pass around easily.
              </InteractiveCallout>

              <LanguageCard
                id="markdown"
                title="Markdown"
                subtitle="Formatted text for docs and READMEs"
                whatItIs="A lightweight markup format for writing documentation with headings, lists, links, and emphasis."
                usedFor="Project READMEs, product docs, prompts, educational content, and notes."
                encounter="When Cursor writes documentation, project setup guides, README files, or note-based content like course materials."
                codeTab={{
                  id: "md-ex",
                  filename: "README.md",
                  language: "text",
                  code: `# Study Club Dashboard

Track meetings, attendance, and discussion notes
for the WVibe product team.

## Features
- Weekly event schedule
- Member attendance log
- Shared notes for each session`,
                }}
              />
            </div>
          </LessonBlock>

          <KnowledgeCheck
            checkId="cf-check-3"
            sectionId="check-3"
            questions={check3Questions}
          />

          {/* ══════════════════════════════════════════════════════════════
              LESSON 4: HOW IT ALL CONNECTS
          ══════════════════════════════════════════════════════════════ */}
          <LessonBlock
            lessonId="cf-lesson-4"
            lessonNumber={4}
            title="How It All Connects"
            estimatedReadingTime="5 min read"
            sectionId="lesson-4"
          >
            <p className="text-base text-muted-foreground leading-relaxed italic">
              One mental model that ties the languages, layers, and AI workflow together.
            </p>

            <SubHeading id="architecture-map">
              A typical web app architecture
            </SubHeading>
            <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
              Here is how the three layers — frontend, backend, and database — work
              together in code. Click the tabs to see each layer in action:
            </p>
            <CodePlayground
              tabs={architectureCodeTabs}
              collapsible
              defaultExpanded={false}
              className="w-full"
            />
            <div className="mt-4 rounded-2xl border border-border bg-card/40 p-5">
              <div className="grid gap-3 lg:grid-cols-4">
                <div className="rounded-xl border border-border bg-[#07070f] p-4">
                  <p className="text-sm font-semibold text-foreground">
                    1. Browser / Frontend
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    HTML, CSS, and JavaScript/TypeScript render the interface and
                    collect user actions.
                  </p>
                </div>
                <div className="flex items-center justify-center text-electric-blue">
                  <ChevronRight className="h-5 w-5" />
                </div>
                <div className="rounded-xl border border-border bg-[#07070f] p-4">
                  <p className="text-sm font-semibold text-foreground">
                    2. Backend / Server
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Business logic runs here: validation, auth, calculations, and
                    external API calls.
                  </p>
                </div>
                <div className="flex items-center justify-center text-electric-blue lg:hidden">
                  <ChevronRight className="h-5 w-5" />
                </div>
                <div className="rounded-xl border border-border bg-[#07070f] p-4 lg:col-start-3">
                  <p className="text-sm font-semibold text-foreground">
                    3. Database
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Stores users, notes, assignments, scores, and whatever your app
                    needs to remember.
                  </p>
                </div>
                <div className="flex items-center justify-center text-electric-blue">
                  <ChevronRight className="h-5 w-5 rotate-180 lg:rotate-0" />
                </div>
                <div className="rounded-xl border border-electric-blue/20 bg-electric-blue/[0.05] p-4 lg:col-span-4">
                  <p className="text-sm font-semibold text-foreground">
                    4. Response returns to the user
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Data comes back as JSON, the frontend renders it, and the user sees
                    an updated dashboard, feed, or form result.
                  </p>
                </div>
              </div>
            </div>

            <SubHeading id="language-map">
              Which languages live at which layer?
            </SubHeading>
            <div className="overflow-hidden rounded-2xl border border-border bg-card/40">
              <div className="grid grid-cols-[120px_1fr] border-b border-border bg-card/60 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">
                <div className="border-r border-border px-4 py-3">Layer</div>
                <div className="px-4 py-3">Languages / formats</div>
              </div>
              {[
                {
                  layer: "Frontend",
                  value:
                    "HTML + CSS + JavaScript/TypeScript. This is the visual experience the user sees in the browser.",
                },
                {
                  layer: "Backend",
                  value:
                    "JavaScript/TypeScript (Node.js) or Python. This is where the logic runs and APIs are called.",
                },
                {
                  layer: "Database",
                  value:
                    "SQL. Databases are queried and updated with structured commands.",
                },
                {
                  layer: "Data exchange",
                  value:
                    "JSON. Information is passed between frontend, backend, and external APIs in a structured format.",
                },
                {
                  layer: "Docs / config",
                  value:
                    "Markdown and JSON are common here. READMEs, notes, package metadata, and configuration files live in this zone.",
                },
              ].map((row, index, rows) => (
                <div
                  key={row.layer}
                  className={`grid grid-cols-[120px_1fr] text-xs ${
                    index < rows.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="border-r border-border px-4 py-3 font-semibold text-foreground">
                    {row.layer}
                  </div>
                  <div className="px-4 py-3 leading-relaxed text-muted-foreground">
                    {row.value}
                  </div>
                </div>
              ))}
            </div>

            <InteractiveCallout variant="tip" className="mt-6">
              The key insight for vibe coders:{" "}
              <strong>you do not need to master these languages.</strong> You need to
              recognize them. If Cursor generates TypeScript and you see a type error,
              knowing that it is a TypeScript problem helps you ask for the right fix.
              If you see JSON, you know it is data, not executable logic. Recognition is
              enough to make you dangerous in the best way.
            </InteractiveCallout>

            <SubHeading id="cheat-sheet">Quick cheat sheet</SubHeading>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ["HTML", "Page structure and content"],
                ["CSS", "Visual styling and layout"],
                ["JavaScript", "Interactivity and browser behavior"],
                ["TypeScript", "JavaScript with types and safety checks"],
                ["Python", "Automation, AI, backends, and data work"],
                ["R", "Statistics and research analysis"],
                ["SQL", "Queries for reading and writing database data"],
                ["JSON", "Structured data format used by apps and APIs"],
                ["Markdown", "Formatted text for docs and READMEs"],
              ].map(([name, description]) => (
                <div
                  key={name}
                  className="rounded-xl border border-border bg-card/40 p-4"
                >
                  <p className="text-sm font-semibold text-foreground">{name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-vibe-purple/25 bg-gradient-to-br from-[#140c2b] via-[#0d1020] to-[#08111f] p-8">
              <div className="mx-auto max-w-2xl text-center">
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full gradient-bg shadow-lg shadow-electric-blue/20">
                  <Lightbulb className="h-5 w-5 text-white" />
                </div>
                <p className="text-xl font-bold text-white">
                  You do not need a CS degree to understand what code is doing.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  For WVibe and QVibe members, this is the goal: enough understanding to
                  ask better questions, guide AI more clearly, and move faster when
                  something breaks. That foundation is what turns non-developers into
                  real builders.
                </p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/70">
                  <MessageSquare className="h-4 w-4 text-electric-blue" />
                  Coding confidence starts with mental models, not memorization.
                </div>
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
