import type { Metadata } from "next";
import VibeCoding101Content from "./vibe-coding-101-content";

export const metadata: Metadata = {
  title: "Vibe Coding 101",
  description:
    "The step-by-step guide to building apps with AI. No coding experience required.",
};

export default function VibeCoding101Page() {
  return <VibeCoding101Content />;
}
