"use client";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Code2, BookOpen } from "lucide-react";

const tabConfig = [
  { value: "overview", href: "/education", label: "Overview", icon: Sparkles },
  {
    value: "vibe-coding-101",
    href: "/education/vibe-coding-101",
    label: "Vibe Coding 101",
    icon: BookOpen,
  },
  {
    value: "coding-fundamentals",
    href: "/education/coding-fundamentals",
    label: "Coding Fundamentals",
    icon: Code2,
  },
] as const;

function pathToValue(pathname: string): string {
  if (pathname.includes("/vibe-coding-101")) return "vibe-coding-101";
  if (pathname.includes("/coding-fundamentals")) return "coding-fundamentals";
  return "overview";
}

export function EducationNav() {
  const pathname = usePathname();
  const router = useRouter();
  const value = pathToValue(pathname);

  return (
    <div className="w-full overflow-x-auto pb-1">
      <Tabs
        value={value}
        onValueChange={(next) => {
          const item = tabConfig.find((t) => t.value === next);
          if (item) router.push(item.href);
        }}
        className="w-full"
      >
        <TabsList
          variant="line"
          className="w-full min-w-max justify-start gap-0 rounded-none border-b border-border bg-transparent p-0 h-auto"
        >
          {tabConfig.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-none border-b-2 border-transparent data-[active]:border-electric-blue data-[active]:text-electric-blue px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <tab.icon className="mr-2 h-4 w-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
