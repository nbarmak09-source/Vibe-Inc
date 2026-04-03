"use client";

import { useMemo, useState } from "react";
import {
  Check,
  Clipboard,
  ChevronDown,
  ChevronUp,
  Code2,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type CodePlaygroundTab = {
  id: string;
  filename: string;
  language: string;
  code: string;
  explanation?: string;
};

type CodePlaygroundProps = {
  tabs: CodePlaygroundTab[];
  className?: string;
  defaultTabId?: string;
  /**
   * When true, shows a compact clickable row first; expands to full editor on click.
   * Use on dense layouts (e.g. language cards) so code is readable when opened.
   */
  collapsible?: boolean;
  /** Only used when `collapsible` is true. Default: false (start collapsed). */
  defaultExpanded?: boolean;
};

function getLanguageLabel(language: string) {
  return language.toLowerCase();
}

function getKeywordRegex(language: string) {
  const common = [
    "const",
    "let",
    "var",
    "function",
    "return",
    "if",
    "else",
    "for",
    "while",
    "switch",
    "case",
    "break",
    "import",
    "from",
    "export",
    "default",
    "class",
    "new",
    "try",
    "catch",
    "finally",
    "async",
    "await",
    "true",
    "false",
  ];
  if (language === "css") {
    return /\b(display|position|background|color|padding|margin|width|height|font|grid|flex)\b/;
  }
  if (language === "html") {
    return /^<\/?[a-zA-Z]/;
  }
  if (language === "sql") {
    return /\b(SELECT|FROM|WHERE|JOIN|INSERT|UPDATE|DELETE|ORDER|GROUP|BY)\b/i;
  }
  return new RegExp(`\\b(${common.join("|")})\\b`);
}

function highlightLine(line: string, language: string) {
  const tokenRegex =
    /(`[^`]*`|"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\/\/.*$|#.*$|\/\*.*\*\/|\b\d+(\.\d+)?\b|[{}()[\];,.<>:=+-/*]+)/g;
  const keywordRegex = getKeywordRegex(language.toLowerCase());
  const tokens = line.split(tokenRegex).filter(Boolean);

  return tokens.map((token, index) => {
    let tokenClass = "text-zinc-200";

    if (/^\/\/.*$|^#.*$|^\/\*.*\*\/$/.test(token)) {
      tokenClass = "text-zinc-500";
    } else if (/^"(?:\\.|[^"])*"$|^'(?:\\.|[^'])*'$|^`[^`]*`$/.test(token)) {
      tokenClass = "text-emerald-300";
    } else if (/^\b\d+(\.\d+)?\b$/.test(token)) {
      tokenClass = "text-amber-300";
    } else if (keywordRegex.test(token)) {
      tokenClass = "text-violet-300";
    } else if (/^[{}()[\];,.<>:=+\-/*]+$/.test(token)) {
      tokenClass = "text-sky-300";
    }

    return (
      <span key={`${token}-${index}`} className={tokenClass}>
        {token}
      </span>
    );
  });
}

function codePreviewSnippet(code: string, maxChars = 140) {
  const trimmed = code.replace(/\s+/g, " ").trim();
  if (trimmed.length <= maxChars) return trimmed;
  return `${trimmed.slice(0, maxChars)}…`;
}

export function CodePlayground({
  tabs,
  className,
  defaultTabId,
  collapsible = false,
  defaultExpanded = true,
}: CodePlaygroundProps) {
  const [copiedTabId, setCopiedTabId] = useState<string | null>(null);
  const [activeTabId, setActiveTabId] = useState(defaultTabId ?? tabs[0]?.id);
  const [showExplanation, setShowExplanation] = useState(false);
  const [expanded, setExpanded] = useState(
    collapsible ? defaultExpanded : true
  );

  const activeTab = useMemo(
    () => tabs.find((tab) => tab.id === activeTabId) ?? tabs[0],
    [activeTabId, tabs]
  );

  if (!activeTab) return null;

  const lineCount = activeTab.code.split("\n").length;

  const copyCode = async (code: string, tabId: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedTabId(tabId);
    window.setTimeout(
      () => setCopiedTabId((current) => (current === tabId ? null : current)),
      1200
    );
  };

  if (collapsible && !expanded) {
    return (
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className={cn(
          "group w-full rounded-xl border border-border bg-gradient-to-br from-[#0a0c18] to-[#05060f] px-4 py-5 text-left shadow-lg shadow-black/25 transition-all duration-200",
          "hover:border-electric-blue/45 hover:shadow-electric-blue/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue/50",
          "sm:px-6 sm:py-6",
          className
        )}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-electric-blue/15 text-electric-blue ring-1 ring-electric-blue/25">
            <Code2 className="h-7 w-7" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-base font-semibold text-foreground sm:text-lg">
                {activeTab.filename}
              </span>
              <span className="rounded-full border border-border bg-background/50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {getLanguageLabel(activeTab.language)}
              </span>
              {tabs.length > 1 ? (
                <span className="text-xs text-muted-foreground">
                  +{tabs.length - 1} more{" "}
                  {tabs.length - 1 === 1 ? "file" : "files"}
                </span>
              ) : null}
            </div>
            <p className="line-clamp-3 font-mono text-sm leading-relaxed text-zinc-400 sm:text-base">
              {codePreviewSnippet(activeTab.code)}
            </p>
            <p className="text-xs text-muted-foreground">
              {lineCount} line{lineCount === 1 ? "" : "s"} · Click to expand
            </p>
          </div>
          <div className="flex shrink-0 items-center justify-end gap-2 sm:flex-col sm:items-end">
            <span className="text-sm font-medium text-electric-blue transition group-hover:text-electric-blue/90">
              Expand
            </span>
            <ChevronDown
              className="h-6 w-6 text-electric-blue/80 transition-transform duration-200 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </div>
        </div>
      </button>
    );
  }

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-xl border border-border bg-[#05060f] shadow-lg shadow-black/30",
        className
      )}
    >
      <Tabs
        value={activeTab.id}
        onValueChange={(next) => {
          setActiveTabId(next);
          setShowExplanation(false);
        }}
        className="w-full"
      >
        <div className="flex flex-col gap-3 border-b border-border bg-card/60 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
          <TabsList
            className="h-auto w-full min-w-0 flex-wrap bg-transparent p-0 sm:flex-1"
            variant="line"
          >
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="rounded-md border border-transparent px-3 py-1.5 text-xs font-medium text-muted-foreground data-active:border-electric-blue/40 data-active:bg-electric-blue/[0.08] data-active:text-electric-blue sm:px-3.5 sm:text-sm"
              >
                {tab.filename}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
            {collapsible ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 shrink-0 gap-1 text-xs text-muted-foreground hover:text-foreground"
                onClick={() => setExpanded(false)}
              >
                <ChevronUp className="h-3.5 w-3.5" />
                Collapse
              </Button>
            ) : null}
            <span className="inline-flex items-center rounded-full border border-border bg-background/60 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {getLanguageLabel(activeTab.language)}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-border bg-background/40 px-3 text-xs hover:bg-background"
              onClick={() => copyCode(activeTab.code, activeTab.id)}
            >
              {copiedTabId === activeTab.id ? (
                <>
                  <Check className="mr-1 h-3.5 w-3.5 text-green-300" />
                  Copied
                </>
              ) : (
                <>
                  <Clipboard className="mr-1 h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>

        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="min-w-0 w-full">
            <div className="w-full min-w-0 max-w-full">
              <pre className="m-0 w-full min-w-0 max-w-full p-0 text-base leading-relaxed">
                <code className="block w-full min-w-0 max-w-full">
                  {tab.code.split("\n").map((line, index) => (
                    <div
                      key={`${tab.id}-${index}`}
                      className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-x-px border-b border-white/[0.04] px-3 py-2 last:border-b-0 sm:grid-cols-[3.25rem_minmax(0,1fr)] sm:px-6 sm:py-2.5"
                    >
                      <span className="select-none py-0.5 pr-2 text-right text-xs tabular-nums text-zinc-500 sm:pr-3 sm:text-sm">
                        {index + 1}
                      </span>
                      <span
                        className="min-w-0 max-w-full whitespace-pre-wrap break-words py-0.5 font-mono text-sm leading-7 text-zinc-100 [overflow-wrap:anywhere] sm:text-base sm:leading-8"
                      >
                        {highlightLine(line, tab.language)}
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {activeTab.explanation ? (
        <div className="border-t border-border bg-card/50 px-4 py-4 sm:px-6 sm:py-5">
          <button
            type="button"
            onClick={() => setShowExplanation((prev) => !prev)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-electric-blue transition-colors hover:text-electric-blue/80"
          >
            <Code2 className="h-4 w-4" />
            What does this do?
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                showExplanation && "rotate-180"
              )}
            />
          </button>
          <div
            className={cn(
              "grid transition-all duration-300",
              showExplanation ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              <p className="pt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {activeTab.explanation}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
