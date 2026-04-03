import Link from "next/link";
import { ExternalLink, Camera, Briefcase, MessageCircle, Zap } from "lucide-react";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/education", label: "Education" },
  { href: "/llm-comparison", label: "LLM Comparison" },
];

const socialLinks = [
  { icon: Camera, label: "Instagram", href: "#" },
  { icon: Briefcase, label: "LinkedIn", href: "#" },
  { icon: MessageCircle, label: "Discord", href: "#" },
];

export function AppFooter() {
  return (
    <footer className="border-t border-border bg-card/20 backdrop-blur-sm mt-auto">
      <div className="mx-auto max-w-5xl px-5 py-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-md gradient-bg shadow-sm shadow-electric-blue/25">
              <Zap className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
            </div>
            <p className="text-xs text-muted-foreground/60">
              © 2026{" "}
              <span className="font-semibold text-muted-foreground/80">
                Vibe Inc.
              </span>{" "}
              — A WVibe × QVibe Initiative
            </p>
          </div>

          {/* Links */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            {footerLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-xs text-muted-foreground/50 transition-colors hover:text-muted-foreground"
              >
                {label}
              </Link>
            ))}
            <a
              href="https://www.qvibe.online/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground/50 transition-colors hover:text-muted-foreground"
            >
              QVibe
              <ExternalLink className="h-2.5 w-2.5" />
            </a>

            <div
              role="list"
              aria-label="Social media links"
              className="flex items-center gap-2 pl-1"
            >
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  role="listitem"
                  aria-label={label}
                  className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground/40 transition-colors hover:text-muted-foreground/70"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}
