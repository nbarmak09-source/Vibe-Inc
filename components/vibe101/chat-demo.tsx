import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

export interface ChatMessage {
  role: "user" | "assistant";
  content: ReactNode;
}

export function ChatDemo({
  messages,
  title = "Brainstorm conversation",
}: {
  messages: ChatMessage[];
  title?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-[#07070f] overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border bg-card/50">
        <div className="flex gap-1.5">
          <span className="block w-3 h-3 rounded-full bg-red-500/50" />
          <span className="block w-3 h-3 rounded-full bg-amber-500/50" />
          <span className="block w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <span className="text-[11px] text-muted-foreground/70 font-medium">
          {title}
        </span>
      </div>

      {/* Messages */}
      <div className="p-5 space-y-5">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "flex gap-3 items-start",
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            )}
          >
            {/* Avatar */}
            {msg.role === "assistant" ? (
              <div className="flex-shrink-0 w-7 h-7 rounded-full gradient-bg flex items-center justify-center shadow-md shadow-electric-blue/20">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
            ) : (
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-secondary border border-border flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                You
              </div>
            )}

            {/* Bubble */}
            <div
              className={cn(
                "max-w-[82%] rounded-xl px-4 py-3 text-sm leading-relaxed",
                msg.role === "user"
                  ? "bg-gradient-to-br from-electric-blue to-vibe-purple text-white rounded-tr-sm"
                  : "bg-card border border-border text-foreground rounded-tl-sm"
              )}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
