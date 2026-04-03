import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LLM Comparison",
  description:
    "Compare Claude Sonnet 4.6, GPT-5.4 Codex, Gemini 3.0 Ultra, Llama 4, and DeepSeek R2 side by side. Find the best model for vibe coding.",
  openGraph: {
    title: "LLM Comparison 2026 | Vibe Inc.",
    description:
      "Compare the top AI coding models side by side: Claude, GPT-5.4 Codex, Gemini 3.0 Ultra, Llama 4, and DeepSeek R2.",
  },
};

export default function LLMComparisonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
