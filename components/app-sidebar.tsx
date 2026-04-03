"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Scale,
  GraduationCap,
  Users,
  Zap,
  X,
  ExternalLink,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VIBE_ACCESS_STORAGE_KEY } from "@/lib/session-storage";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/llm-comparison", label: "LLM Comparison", icon: Scale },
  { href: "/education", label: "Education", icon: GraduationCap },
  { href: "/about", label: "About Us", icon: Users },
] as const;

const clubLinks = [
  {
    href: "https://www.qvibe.online/",
    label: "QVibe — Queen's",
    tooltip: "QVibe (Queen's University)",
    external: true,
  },
  {
    href: "#",
    label: "WVibe — Western",
    tooltip: "WVibe (Western University)",
    external: true,
  },
] as const;

interface SidebarContentProps {
  pathname: string;
  onClose?: () => void;
  /** Desktop only: narrow icon rail */
  collapsed?: boolean;
  onExit: () => void;
}

function SidebarContent({
  pathname,
  onClose,
  collapsed = false,
  onExit,
}: SidebarContentProps) {
  const isDrawer = Boolean(onClose);

  return (
    <div className="flex h-full w-full flex-col bg-sidebar">
      {/* Brand + mobile close */}
      <div
        className={cn(
          "flex shrink-0 items-center border-b border-sidebar-border transition-[padding] duration-300",
          collapsed && !isDrawer ? "flex-col gap-2 px-2 py-3" : "justify-between px-5 py-5"
        )}
      >
        <Link
          href="/dashboard"
          className={cn(
            "flex min-w-0 items-center rounded-lg outline-none transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-electric-blue",
            collapsed && !isDrawer
              ? "h-9 w-9 shrink-0 items-center justify-center"
              : "gap-2.5"
          )}
          onClick={onClose}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg gradient-bg shadow-lg shadow-electric-blue/20">
            {collapsed && !isDrawer ? (
              <span className="text-sm font-black text-white">V</span>
            ) : (
              <Zap className="h-4 w-4 text-white" strokeWidth={2.5} aria-hidden="true" />
            )}
          </div>
          {(!collapsed || isDrawer) && (
            <div className="flex min-w-0 flex-col leading-none">
              <span className="text-lg font-bold tracking-tight gradient-text">
                Vibe Inc.
              </span>
              <span className="mt-0.5 text-[10px] font-medium tracking-wide text-muted-foreground/60">
                WVibe × QVibe
              </span>
            </div>
          )}
        </Link>

        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-muted-foreground hover:text-foreground md:hidden"
            aria-label="Close navigation menu"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 space-y-1 overflow-y-auto px-3 py-4"
        aria-label="Main navigation"
      >
        {(!collapsed || isDrawer) && (
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
            Navigation
          </p>
        )}
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          const linkClass = cn(
            "group flex items-center rounded-lg text-sm font-medium transition-all duration-200",
            collapsed && !isDrawer
              ? "justify-center px-2 py-2.5"
              : "gap-3 px-3 py-2.5",
            isActive
              ? "border border-electric-blue/25 bg-gradient-to-r from-electric-blue/15 to-vibe-purple/15 text-white shadow-sm shadow-electric-blue/10"
              : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
          );

          const linkInner = (
            <>
              <item.icon
                className={cn(
                  "h-4 w-4 shrink-0 transition-colors",
                  isActive
                    ? "text-electric-blue"
                    : "group-hover:text-electric-blue/70"
                )}
                aria-hidden="true"
              />
              {(!collapsed || isDrawer) && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {isActive && (
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-electric-blue shadow-sm shadow-electric-blue/50"
                      aria-hidden="true"
                    />
                  )}
                </>
              )}
            </>
          );

          if (collapsed && !isDrawer) {
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger
                  delay={200}
                  render={
                    <Link
                      href={item.href}
                      className={linkClass}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {linkInner}
                    </Link>
                  }
                />
                <TooltipContent side="right" sideOffset={8}>
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              aria-current={isActive ? "page" : undefined}
              className={linkClass}
            >
              {linkInner}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="space-y-3 border-t border-sidebar-border px-4 py-4">
        {(!collapsed || isDrawer) && (
          <p className="mb-2 px-2 text-[9px] font-bold uppercase tracking-widest text-muted-foreground/40">
            Our Clubs
          </p>
        )}
        <div className="space-y-1">
          {clubLinks.map((club) => {
            const rowClass = cn(
              "flex items-center rounded-md text-xs font-medium text-muted-foreground transition-all hover:bg-white/5 hover:text-foreground",
              collapsed && !isDrawer
                ? "justify-center px-2 py-2"
                : "justify-between px-2 py-1.5"
            );

            const inner = (
              <>
                {collapsed && !isDrawer ? (
                  <ExternalLink className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
                ) : (
                  <>
                    <span>{club.label}</span>
                    <ExternalLink className="h-3 w-3 shrink-0 opacity-50 group-hover:opacity-100" aria-hidden="true" />
                  </>
                )}
              </>
            );

            if (collapsed && !isDrawer) {
              return (
                <Tooltip key={club.label}>
                  <TooltipTrigger
                    delay={200}
                    render={
                      <a
                        href={club.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          rowClass,
                          "group outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
                        )}
                      >
                        {inner}
                      </a>
                    }
                  />
                  <TooltipContent side="right" sideOffset={8}>
                    {club.tooltip}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return (
              <a
                key={club.label}
                href={club.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(rowClass, "group")}
              >
                {inner}
              </a>
            );
          })}
        </div>

        {collapsed && !isDrawer ? (
          <div
            className="flex justify-center px-2 py-1"
            title="All systems operational"
          >
            <div
              className="h-2 w-2 shrink-0 animate-pulse-slow rounded-full bg-green-400"
              aria-hidden="true"
            />
          </div>
        ) : (
          <div className="flex items-center gap-2 px-2">
            <div className="h-1.5 w-1.5 shrink-0 animate-pulse-slow rounded-full bg-green-400" />
            <p className="text-xs text-muted-foreground/60">
              All systems operational
            </p>
          </div>
        )}

        {collapsed && !isDrawer ? (
          <Tooltip>
            <TooltipTrigger
              delay={200}
              render={
                <button
                  type="button"
                  onClick={onExit}
                  className="flex w-full justify-center rounded-md px-2 py-2 text-muted-foreground transition-colors outline-none hover:bg-white/5 hover:text-foreground focus-visible:ring-2 focus-visible:ring-electric-blue"
                  aria-label="Exit members session"
                >
                  <LogOut className="h-4 w-4 opacity-70" aria-hidden="true" />
                </button>
              }
            />
            <TooltipContent side="right" sideOffset={8}>
              Exit session
            </TooltipContent>
          </Tooltip>
        ) : (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 px-2 text-xs font-medium text-muted-foreground/80 hover:text-foreground"
            onClick={onExit}
          >
            <LogOut className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
            Exit
          </Button>
        )}
      </div>
    </div>
  );
}

interface AppSidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const HOVER_DESKTOP_MQ = "(min-width: 768px) and (hover: hover)";

export function AppSidebar({ mobileOpen, onMobileClose }: AppSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);
  const [hoverDesktop, setHoverDesktop] = useState(false);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleExit = useCallback(async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
    } catch {
      /* still clear client state */
    }
    try {
      localStorage.removeItem(VIBE_ACCESS_STORAGE_KEY);
    } catch {
      /* ignore */
    }
    window.location.href = "/gate";
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(HOVER_DESKTOP_MQ);
    const sync = () => setHoverDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!hoverDesktop) setCollapsed(true);
  }, [hoverDesktop]);

  useEffect(() => {
    return () => {
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, []);

  const handleDesktopMouseEnter = useCallback(() => {
    if (!hoverDesktop) return;
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setCollapsed(false);
  }, [hoverDesktop]);

  const handleDesktopMouseLeave = useCallback(() => {
    if (!hoverDesktop) return;
    leaveTimerRef.current = setTimeout(() => {
      setCollapsed(true);
      leaveTimerRef.current = null;
    }, 300);
  }, [hoverDesktop]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onMobileClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [mobileOpen, onMobileClose]);

  return (
    <>
      {/* Mobile overlay drawer — always full labels */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 flex md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onMobileClose}
            aria-hidden="true"
          />
          <div className="relative h-full w-72 max-w-[85vw] shrink-0 shadow-2xl transition-transform duration-300 ease-out">
            <div className="h-full border-r border-sidebar-border">
              <SidebarContent
                pathname={pathname}
                onClose={onMobileClose}
                collapsed={false}
                onExit={handleExit}
              />
            </div>
          </div>
        </div>
      )}

      {/* Desktop: fixed layout slot (w-16) + overlay expand on hover */}
      <div className="relative z-30 hidden h-screen w-16 shrink-0 md:block">
        <aside
          className={cn(
            "absolute left-0 top-0 flex h-full flex-col overflow-hidden border-r border-sidebar-border bg-sidebar transition-[width,box-shadow] duration-200 ease-in-out",
            collapsed ? "w-16 shadow-none" : "w-64 shadow-xl shadow-black/20"
          )}
          aria-label="Site navigation"
          onMouseEnter={handleDesktopMouseEnter}
          onMouseLeave={handleDesktopMouseLeave}
        >
          <SidebarContent
            pathname={pathname}
            collapsed={collapsed}
            onExit={handleExit}
          />
        </aside>
      </div>
    </>
  );
}
