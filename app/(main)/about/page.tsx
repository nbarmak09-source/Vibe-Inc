import type { Metadata } from "next";
import {
  Users,
  Zap,
  Target,
  Globe,
  Heart,
  BookOpen,
  Rocket,
  Shield,
  MessageCircle,
  Mail,
  MapPin,
  ExternalLink,
  Sparkles,
  Building2,
  Camera,
  Briefcase,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Two clubs. Two universities. One mission: make software development accessible to every student.",
  openGraph: {
    title: "About Us | Vibe Inc.",
    description:
      "WVibe (Western University) and QVibe (Queen's University) — the joint educational platform making software development accessible to every student.",
  },
};

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const values = [
  {
    icon: Globe,
    title: "Accessibility",
    description:
      "AI education should be available to every student, regardless of technical background or prior experience. The barrier to building has never been lower — we're here to remove what remains.",
    color: "text-electric-blue",
    bg: "border-electric-blue/25 bg-electric-blue/[0.06]",
    iconBg: "bg-electric-blue/10",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We learn better together. Workshops, hackathons, peer support, and shared projects are at the core of how both clubs operate. Building alongside others accelerates everything.",
    color: "text-green-400",
    bg: "border-green-400/25 bg-green-400/[0.06]",
    iconBg: "bg-green-400/10",
  },
  {
    icon: Shield,
    title: "Honesty",
    description:
      "We tell you what works, what doesn't, and what's just hype. In a space full of AI buzzwords, we're committed to straight talk and genuine education.",
    color: "text-amber-400",
    bg: "border-amber-400/25 bg-amber-400/[0.06]",
    iconBg: "bg-amber-400/10",
  },
  {
    icon: Rocket,
    title: "Builder Mindset",
    description:
      "Ship things. Learn by doing. Your portfolio matters more than your GPA when it comes to showing what you can create. The best way to understand AI is to build with it.",
    color: "text-vibe-purple",
    bg: "border-vibe-purple/25 bg-vibe-purple/[0.06]",
    iconBg: "bg-vibe-purple/10",
  },
];

const team = [
  {
    initials: "WV",
    name: "Founder, WVibe",
    club: "WVibe · Western University",
    bio: "Leading the charge to bring vibe coding to Western's student body. Passionate about entrepreneurship and making software development accessible to business students.",
    gradient: "from-electric-blue to-vibe-purple",
    accentColor: "text-electric-blue",
  },
  {
    initials: "QV",
    name: "Co-President, QVibe",
    club: "QVibe · Queen's University",
    bio: "Pioneering hands-on AI education at Queen's. Organizes workshops, hackathons, and the Factory vibe coding sessions that have introduced hundreds of students to building with AI.",
    gradient: "from-vibe-purple to-pink-500",
    accentColor: "text-vibe-purple",
  },
  {
    initials: "WV",
    name: "VP Events, WVibe",
    club: "WVibe · Western University",
    bio: "Building the Western vibe coding workshop series from the ground up. Focused on creating hands-on experiences that take students from zero to deployed app in a single session.",
    gradient: "from-green-400 to-electric-blue",
    accentColor: "text-green-400",
  },
  {
    initials: "QV",
    name: "Head of Education, QVibe",
    club: "QVibe · Queen's University",
    bio: "Designing the curriculum behind QVibe's technical workshops. Works to ensure every session is accessible to students with no prior coding experience.",
    gradient: "from-amber-400 to-orange-500",
    accentColor: "text-amber-400",
  },
];

/* ─── Page ─────────────────────────────────────────────────────────────────── */

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-20 p-6">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl border border-vibe-purple/25 bg-gradient-to-br from-[#1a0a35] via-[#0f0820] to-[#030a1a] px-8 py-14 text-center">
        <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-vibe-purple/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-electric-blue/15 blur-3xl" />

        <div className="relative z-10">
          <div className="mb-5 flex justify-center">
            <div className="rounded-2xl gradient-bg p-3.5 shadow-xl shadow-electric-blue/25">
              <Users className="h-7 w-7 text-white" />
            </div>
          </div>

          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="rounded-full border border-electric-blue/30 bg-electric-blue/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-electric-blue">
              WVibe × QVibe
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            About{" "}
            <span className="gradient-text">Vibe Inc.</span>
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/70">
            Two clubs. Two universities. One mission: make software development
            accessible to every student.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              Western University — London, ON
            </span>
            <span className="h-4 w-px bg-white/20" />
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              Queen&apos;s University — Kingston, ON
            </span>
          </div>
        </div>
      </div>

      {/* ── Our Mission ───────────────────────────────────────────────────── */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Target className="h-4 w-4 text-electric-blue" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-electric-blue">
            Our Mission
          </p>
        </div>
        <h2 className="mb-8 text-2xl font-bold text-foreground">
          Democratizing software development, one student at a time.
        </h2>
        <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
          <p>
            We&apos;re entering a new era. For the first time in the history of
            computing, you do not need a computer science degree to build real
            software. AI tools like Cursor and Claude have fundamentally changed
            who gets to be a builder — and Vibe Inc. exists to make sure
            university students are among the first to take advantage of that
            shift.
          </p>
          <p>
            Vibe Inc. is the joint educational platform of{" "}
            <strong className="text-foreground">WVibe</strong> (Western
            University) and{" "}
            <strong className="text-foreground">QVibe</strong> (Queen&apos;s
            University), built to educate, empower, and grow a community of
            student builders. Whether you&apos;re in Ivey Business School, Smith
            School of Business, engineering, arts, or sciences — if you have
            an idea, you should be able to build it. Full stop.
          </p>
          <p>
            We&apos;re not just teaching tools. We&apos;re teaching a new way of
            thinking about creation and entrepreneurship. The student who
            understands how to direct AI is the student who ships products,
            validates ideas, and enters the job market with a real portfolio of
            built things — not just coursework.
          </p>
        </div>
      </div>

      {/* ── The Clubs ─────────────────────────────────────────────────────── */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Building2 className="h-4 w-4 text-vibe-purple" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-vibe-purple">
            The Clubs
          </p>
        </div>
        <h2 className="mb-8 text-2xl font-bold text-foreground">
          Meet the organizations behind Vibe Inc.
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          {/* WVibe */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-electric-blue/25 bg-gradient-to-br from-electric-blue/[0.08] to-transparent">
            <div className="border-b border-electric-blue/15 px-6 py-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-electric-blue">
                    Western University
                  </span>
                  <h3 className="mt-0.5 text-xl font-bold text-foreground">
                    WVibe
                  </h3>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-electric-blue to-vibe-purple text-sm font-black text-white shadow-lg shadow-electric-blue/20">
                  W
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-4 p-6">
              <div className="space-y-3">
                {[
                  "Based at Western University, London, ON",
                  "Founded to bring vibe coding education to Western's diverse student body",
                  "Focused on empowering Ivey HBA and Western students to build with AI",
                ].map((item, i) => (
                  <div key={i} className="flex gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-electric-blue" aria-hidden="true" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto rounded-xl border border-electric-blue/20 bg-electric-blue/[0.06] px-4 py-3 text-sm text-muted-foreground">
                Currently building our community — join us for workshops,
                hackathons, and build sessions.
              </div>

              <a
                href="https://www.instagram.com/wvibe.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-electric-blue hover:text-electric-blue/80 transition-colors"
              >
                @wvibe.ai on Instagram <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* QVibe */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-vibe-purple/25 bg-gradient-to-br from-vibe-purple/[0.08] to-transparent">
            <div className="border-b border-vibe-purple/15 px-6 py-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-vibe-purple">
                    Queen&apos;s University
                  </span>
                  <h3 className="mt-0.5 text-xl font-bold text-foreground">
                    QVibe
                  </h3>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-vibe-purple to-pink-500 text-sm font-black text-white shadow-lg shadow-vibe-purple/20">
                  Q
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-4 p-6">
              <div className="space-y-3">
                {[
                  "Queen's Applied AI Club — Kingston, ON",
                  "Already running workshops and events, including sessions at the Factory",
                  "Focused on hands-on AI education and applied vibe coding",
                ].map((item, i) => (
                  <div key={i} className="flex gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-vibe-purple" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto rounded-xl border border-vibe-purple/20 bg-vibe-purple/[0.06] px-4 py-3 text-sm text-muted-foreground">
                Pioneering vibe coding education at Queen&apos;s since 2025.
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <a
                  href="https://www.qvibe.online/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-vibe-purple hover:text-vibe-purple/80 transition-colors"
                >
                  Visit QVibe <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://www.instagram.com/qvibe.ai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-vibe-purple hover:text-vibe-purple/80 transition-colors"
                >
                  @qvibe.ai on Instagram <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Partnership ────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/50 p-8 md:p-10">
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-vibe-purple/10 blur-3xl" />
        <div className="relative z-10">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-vibe-purple" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-vibe-purple">
              Our Partnership
            </p>
          </div>
          <h2 className="mb-6 text-2xl font-bold text-foreground">
            Bigger than any one school.
          </h2>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              WVibe and QVibe started independently — two student clubs at
              different universities, both noticing the same gap: their peers had
              brilliant ideas but no path to building them. When the two groups
              connected, the overlap was immediate. Same problem. Same energy.
              Same belief that vibe coding would change what students could
              create.
            </p>
            <p>
              Vibe Inc. is the shared platform we built to combine our
              curriculum, resources, and communities. Rather than each club
              reinventing the same educational content, we pooled our knowledge
              into a single platform that any student, at any university, can
              access and learn from.
            </p>
            <p>
              The vision extends further: expand to more universities across
              Canada, building a network of student vibe coding clubs where
              builders from different schools can share projects, co-host
              events, and grow together.
            </p>
          </div>
          <blockquote className="mt-8 border-l-2 border-vibe-purple/40 pl-5 text-lg font-semibold italic text-white/80">
            &ldquo;Vibe Inc. is bigger than any one school. It&apos;s a movement.&rdquo;
          </blockquote>
        </div>
      </div>

      {/* ── Values ────────────────────────────────────────────────────────── */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Heart className="h-4 w-4 text-pink-400" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-pink-400">
            Our Values
          </p>
        </div>
        <h2 className="mb-8 text-2xl font-bold text-foreground">
          What we stand for.
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {values.map((value) => (
            <div
              key={value.title}
              className={`rounded-2xl border p-6 transition-all duration-200 hover:scale-[1.01] ${value.bg}`}
            >
              <div className={`mb-4 inline-flex rounded-xl p-2.5 ${value.iconBg}`}>
                <value.icon className={`h-5 w-5 ${value.color}`} />
              </div>
              <h3 className={`mb-2 font-bold text-foreground`}>
                {value.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Team ──────────────────────────────────────────────────────────── */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Users className="h-4 w-4 text-electric-blue" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-electric-blue">
            The Team
          </p>
        </div>
        <h2 className="mb-2 text-2xl font-bold text-foreground">
          The people behind the platform.
        </h2>
        <p className="mb-8 text-sm text-muted-foreground">
          Built by student leaders across both clubs. More team members coming soon.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {team.map((member, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card/50 p-5 transition-all hover:border-electric-blue/25 hover:bg-electric-blue/[0.03]"
            >
              <div
                className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${member.gradient} text-sm font-black text-white shadow-lg`}
              >
                {member.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-foreground">{member.name}</p>
                <p className={`mb-2 text-xs ${member.accentColor}`}>
                  {member.club}
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 text-center text-xs text-muted-foreground/50">
          Team bios and photos are placeholders — update with your real names and details.
        </p>
      </div>

      {/* ── Join the Community ────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl border border-vibe-purple/25 bg-gradient-to-br from-[#140c2b] via-[#0d1020] to-[#08111f] p-8 md:p-12">
        <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-vibe-purple/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-electric-blue/15 blur-3xl" />

        <div className="relative z-10">
          <div className="mb-2 flex items-center gap-2">
            <Zap className="h-4 w-4 text-electric-blue" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-electric-blue">
              Join the Community
            </p>
          </div>
          <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
            Ready to start building?
          </h2>
          <p className="mb-8 max-w-xl text-base leading-relaxed text-white/60">
            Stay updated on workshops, hackathons, and new curriculum drops
            from WVibe and QVibe.
          </p>

          {/* Email signup */}
          <div className="mb-8 flex max-w-md flex-col gap-2 sm:flex-row">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded-xl border border-white/15 bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-electric-blue/50 focus:bg-white/[0.08] transition-all"
            />
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-electric-blue/20 gradient-bg hover:opacity-90 transition-opacity"
            >
              <Mail className="h-4 w-4" />
              Subscribe
            </button>
          </div>

          {/* Join buttons */}
          <div className="mb-8 flex flex-wrap gap-3">
            <a
              href="https://www.instagram.com/wvibe.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-electric-blue/30 bg-electric-blue/10 px-5 py-2.5 text-sm font-semibold text-electric-blue transition-all hover:bg-electric-blue/20"
            >
              <Camera className="h-4 w-4" />
              WVibe on Instagram
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://www.qvibe.online/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-vibe-purple/30 bg-vibe-purple/10 px-5 py-2.5 text-sm font-semibold text-vibe-purple transition-all hover:bg-vibe-purple/20"
            >
              <BookOpen className="h-4 w-4" />
              Join QVibe
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://www.instagram.com/qvibe.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-vibe-purple/30 bg-vibe-purple/10 px-5 py-2.5 text-sm font-semibold text-vibe-purple transition-all hover:bg-vibe-purple/20"
            >
              <Camera className="h-4 w-4" />
              QVibe on Instagram
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            <p className="text-xs text-white/40">Follow us</p>
            <div className="h-px flex-1 max-w-[60px] bg-white/10" />
            {[
              {
                icon: Camera,
                label: "WVibe on Instagram",
                href: "https://www.instagram.com/wvibe.ai/",
              },
              {
                icon: Camera,
                label: "QVibe on Instagram",
                href: "https://www.instagram.com/qvibe.ai/",
              },
              { icon: Briefcase, label: "LinkedIn", href: "#" },
              { icon: MessageCircle, label: "Discord", href: "#" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/50 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer note ───────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-3 pb-4 text-center">
        <div className="flex items-center gap-2">
          <div className="h-px w-12 bg-border" />
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/50">
            WVibe × QVibe
          </span>
          <div className="h-px w-12 bg-border" />
        </div>
        <p className="max-w-sm text-xs leading-relaxed text-muted-foreground/40">
          Vibe Inc. is the shared platform of WVibe (Western University) and
          QVibe (Queen&apos;s University). Built with Cursor + Claude Sonnet 4.6 by
          the students who teach it.
        </p>
      </div>
    </div>
  );
}
