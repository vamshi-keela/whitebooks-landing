// SectionKit.tsx — shared premium design system for the four product sections
// (Enterprise Architecture · Integrations Ecosystem · Developer Experience ·
// Compliance & Support).
//
// One visual language across all four: editorial surfaces, glassmorphism, soft
// hairline borders, 28px radii, restrained brand accent (no bright blobs), and
// Framer Motion (fadeUp + stagger, slow float, animated connection lines).
// Inspired by Stripe / Mercury / Brex / Vercel / Linear / Ramp.
//
// Fully theme-aware: every surface/text uses the design tokens that flip with
// [data-theme] (--fg-primary, --hairline-*, etc.), so the sections read
// correctly in both dark and light. Glass tints are derived from --fg-primary
// via color-mix, so a white tint in dark becomes a black tint in light.
// The only deliberately fixed-dark element is CodeWindow (a terminal).

import type { CSSProperties, ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { cn } from "@/lib/cn";
import { useTheme } from "@/contexts/ThemeContext";

/* ════════════════════════════════════════════════════════════════════════
 * Tokens & motion
 * ════════════════════════════════════════════════════════════════════════ */

export const EASE = [0.22, 1, 0.36, 1] as const;
export const BRAND = "var(--brand)"; // #d33568 — used sparingly, never as a blob

/** Theme-aware section background — elegant, no glowing blobs. */
export function sectionSurface(isDark: boolean): string {
  return isDark
    ? "linear-gradient(180deg, #050509 0%, #0d1018 100%)"
    : "linear-gradient(180deg, #fdfdff 0%, #eef0f6 100%)";
}

/* Reusable token-based class fragments (kept terse, composed via cn()). */
const GLASS = "border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_4%,transparent)]";
const GLASS_HOVER =
  "hover:border-[var(--hairline-bright)] hover:bg-[color-mix(in_srgb,var(--fg-primary)_7%,transparent)]";
const SOFT_SHADOW = "shadow-[0_24px_60px_-32px_rgba(0,0,0,0.5)]";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

/* ════════════════════════════════════════════════════════════════════════
 * Section shell — consistent padding, theme background & ambient radial
 * ════════════════════════════════════════════════════════════════════════ */

export function SectionShell({
  children,
  className,
  /** Override the theme-derived background entirely. */
  background,
}: {
  children: ReactNode;
  className?: string;
  background?: string;
}) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  return (
    <section
      data-reveal
      className={cn("relative overflow-hidden py-20 sm:py-24 lg:py-28", className)}
      style={{ background: background ?? sectionSurface(isDark) }}
    >
      {/* subtle, elegant radial — never a bright pink blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(60% 50% at 50% -10%, var(--brand-glow), transparent 70%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-[1280px] px-5 sm:px-6 md:px-8 lg:px-10 xl:px-16">
        {children}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * SectionHeader — eyebrow · title · subtitle
 * ════════════════════════════════════════════════════════════════════════ */

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <motion.div
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={cn(
        "flex flex-col gap-4",
        centered ? "items-center text-center" : "items-start",
        className,
      )}
    >
      <motion.span
        variants={fadeUp}
        className={cn(
          "inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--fg-secondary)] backdrop-blur",
          GLASS,
        )}
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: BRAND, boxShadow: "0 0 8px var(--brand-glow)" }}
        />
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        className={cn(
          "m-0 font-display font-semibold leading-[1.1] tracking-[-0.025em] text-[var(--fg-primary)] text-balance",
          centered ? "max-w-[760px] text-[clamp(28px,4vw,46px)]" : "max-w-[640px] text-[clamp(26px,3.6vw,42px)]",
        )}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={cn(
            "m-0 text-[15px] leading-[1.6] text-[var(--fg-secondary)] sm:text-[16px]",
            centered ? "max-w-[560px]" : "max-w-[480px]",
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * GlassPanel — the base surface every card is built on
 * ════════════════════════════════════════════════════════════════════════ */

export function GlassPanel({
  children,
  className,
  hover = false,
  style,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn("rounded-[28px] border backdrop-blur-xl", GLASS, SOFT_SHADOW, hover && cn("transition-colors duration-300", GLASS_HOVER), className)}
      style={style}
    >
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * CTAButton — arrow-in-disc pill, primary (brand) / ghost (glass)
 * ════════════════════════════════════════════════════════════════════════ */

export function CTAButton({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  const primary = variant === "primary";
  return (
    <motion.a
      href={href}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      transition={{ duration: 0.18, ease: EASE }}
      className={cn(
        "group inline-flex w-fit items-center gap-2.5 rounded-full py-2 pl-5 pr-2 text-[14px] font-semibold no-underline transition-colors duration-300",
        primary
          ? "bg-[var(--brand)] text-white shadow-[0_14px_38px_-14px_var(--brand)] hover:shadow-[0_18px_46px_-14px_var(--brand)]"
          : cn("text-[var(--fg-primary)]", GLASS, GLASS_HOVER),
        className,
      )}
    >
      {children}
      <span
        className={cn(
          "grid h-8 w-8 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5",
          primary ? "bg-white/20 text-white" : "bg-[var(--brand)] text-white",
        )}
      >
        <ArrowRight size={15} />
      </span>
    </motion.a>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * FeatureCard — icon badge · title · description (glass, hover scale)
 * ════════════════════════════════════════════════════════════════════════ */

export function FeatureCard({
  icon,
  title,
  description,
  className,
  index = 0,
  trailing,
}: {
  icon: ReactNode;
  title: string;
  description?: string;
  className?: string;
  index?: number;
  /** Optional element pinned to the card's right edge (e.g. a step index). */
  trailing?: ReactNode;
}) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3, ease: EASE }}
      style={{ transformOrigin: "center" }}
      className={cn(
        "group relative flex items-start gap-4 rounded-[22px] border p-5 backdrop-blur-xl transition-colors duration-300",
        GLASS,
        GLASS_HOVER,
        className,
      )}
    >
      <span
        className={cn(
          "grid h-11 w-11 shrink-0 place-items-center rounded-2xl border transition-colors duration-300 group-hover:border-[var(--brand)]/40",
          GLASS,
        )}
      >
        <span className="text-[var(--brand)]">{icon}</span>
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="m-0 text-[15px] font-semibold leading-[1.35] text-[var(--fg-primary)]">{title}</h3>
        {description && (
          <p className="m-0 mt-1 text-[13px] leading-[1.5] text-[var(--fg-tertiary)]">{description}</p>
        )}
      </div>
      {trailing && <span className="ml-3 self-center shrink-0">{trailing}</span>}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * FloatingCard — glass card with a slow, continuous y-float
 * ════════════════════════════════════════════════════════════════════════ */

export function FloatingCard({
  children,
  className,
  delay = 0,
  amplitude = 8,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  amplitude?: number;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      animate={{ y: [0, -amplitude, 0] }}
      transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
      className={cn("rounded-2xl border px-3.5 py-3 backdrop-blur-xl", GLASS, SOFT_SHADOW, className)}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * MetricCard — value · label · optional note
 * ════════════════════════════════════════════════════════════════════════ */

export function MetricCard({
  value,
  label,
  note,
  icon,
}: {
  value: string;
  label: string;
  note?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        {icon && (
          <span className={cn("grid h-7 w-7 place-items-center rounded-lg border text-[var(--brand)]", GLASS)}>
            {icon}
          </span>
        )}
        <span className="font-display text-[18px] font-semibold leading-none tracking-[-0.01em] text-[var(--fg-primary)]">
          {value}
        </span>
        {note && (
          <span className="rounded-full bg-[var(--brand)]/15 px-1.5 py-0.5 text-[9.5px] font-medium text-[var(--brand)]">
            {note}
          </span>
        )}
      </div>
      <span className="text-[12px] text-[var(--fg-tertiary)]">{label}</span>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * NodeCard — a node in an architecture/flow canvas (icon · label, pulse)
 * ════════════════════════════════════════════════════════════════════════ */

export function NodeCard({
  icon,
  label,
  sublabel,
  active = false,
  pulse = false,
  className,
}: {
  icon?: ReactNode;
  label: string;
  sublabel?: string;
  active?: boolean;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center gap-3 rounded-2xl border px-4 py-3 backdrop-blur-xl transition-colors duration-300",
        active ? "border-[var(--brand)]/40 bg-[var(--brand)]/[0.08]" : GLASS,
        className,
      )}
    >
      {icon && (
        <span
          className={cn(
            "relative grid h-9 w-9 shrink-0 place-items-center rounded-xl border",
            active
              ? "border-[var(--brand)]/40 bg-[var(--brand)]/15 text-[var(--brand)]"
              : "border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_5%,transparent)] text-[var(--fg-secondary)]",
          )}
        >
          {pulse && (
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-xl"
              style={{ background: BRAND }}
              animate={{ scale: [1, 1.7, 1], opacity: [0.35, 0, 0.35] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <span className="relative z-[1]">{icon}</span>
        </span>
      )}
      <div className="min-w-0">
        <div className="truncate text-[13.5px] font-semibold text-[var(--fg-primary)]">{label}</div>
        {sublabel && <div className="truncate text-[11.5px] text-[var(--fg-tertiary)]">{sublabel}</div>}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * ConnectionLine — animated path with a travelling pulse (brand, both themes)
 * ════════════════════════════════════════════════════════════════════════ */

export function ConnectionLine({
  orientation = "vertical",
  className,
  length = 40,
  delay = 0,
}: {
  orientation?: "vertical" | "horizontal";
  className?: string;
  /** px length of the line */
  length?: number;
  delay?: number;
}) {
  const vertical = orientation === "vertical";
  return (
    <div
      aria-hidden
      className={cn("relative shrink-0", className)}
      style={vertical ? { width: 2, height: length } : { height: 2, width: length }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: vertical
            ? "linear-gradient(180deg, transparent, var(--brand-border), transparent)"
            : "linear-gradient(90deg, transparent, var(--brand-border), transparent)",
        }}
      />
      <motion.span
        className="absolute rounded-full"
        style={{
          background: BRAND,
          boxShadow: "0 0 10px 2px var(--brand-glow)",
          width: vertical ? 4 : 8,
          height: vertical ? 8 : 4,
          left: vertical ? -1 : 0,
          top: vertical ? 0 : -1,
        }}
        animate={vertical ? { y: [0, length - 8, 0] } : { x: [0, length - 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay }}
      />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * CodeWindow — mac-style chrome (intentionally dark in both themes)
 * ════════════════════════════════════════════════════════════════════════ */

export function CodeWindow({
  title = "terminal",
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  // A terminal reads as a dark product surface in light themes too
  // (Stripe / Vercel docs convention), so this one stays fixed-dark.
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[28px] border border-white/[0.08] shadow-[0_28px_70px_-30px_rgba(0,0,0,0.7)]",
        className,
      )}
      style={{ background: "linear-gradient(180deg, #0c0f16 0%, #070709 100%)" }}
    >
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-white/35">{title}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
 * Placeholders — VideoPlaceholder · AnimationPlaceholder · Language icon
 * ════════════════════════════════════════════════════════════════════════ */

/**
 * VideoPlaceholder — a glass frame standing in for a future MP4.
 * Renders `children` (e.g. an animated flow) when provided, otherwise a
 * centered play affordance.
 */
export function VideoPlaceholder({
  aspect = "4/3",
  badge = "Animation preview",
  children,
  className,
}: {
  aspect?: string;
  badge?: string;
  children?: ReactNode;
  className?: string;
}) {
  // TODO: Replace with MP4 animation
  //   <video src="..." poster="..." autoPlay muted loop playsInline
  //          className="absolute inset-0 h-full w-full object-cover" />
  return (
    <GlassPanel className={cn("relative overflow-hidden", className)}>
      <div className="relative w-full" style={{ aspectRatio: aspect }}>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "radial-gradient(80% 70% at 50% 40%, var(--brand-glow), transparent 70%)" }}
        />
        {children ?? (
          <div className="absolute inset-0 grid place-items-center">
            <motion.span
              whileHover={{ scale: 1.06 }}
              className={cn("grid h-16 w-16 place-items-center rounded-full border text-[var(--fg-primary)]", GLASS)}
            >
              <Play size={20} />
            </motion.span>
          </div>
        )}
        <span
          className={cn(
            "absolute left-4 top-4 z-10 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--fg-secondary)] backdrop-blur",
            GLASS,
          )}
        >
          {badge}
        </span>
      </div>
    </GlassPanel>
  );
}

export interface FlowStep {
  icon?: ReactNode;
  label: string;
  sublabel?: string;
}

/**
 * AnimationPlaceholder — a vertical animated flow inside a VideoPlaceholder.
 * Used as the stand-in for each section's future cinematic MP4.
 */
export function AnimationPlaceholder({
  steps,
  badge = "Animation preview",
  aspect = "4/3",
  className,
}: {
  steps: FlowStep[];
  badge?: string;
  aspect?: string;
  className?: string;
}) {
  // TODO: Replace with MP4 animation
  return (
    <VideoPlaceholder aspect={aspect} badge={badge} className={className}>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-0 px-6 py-8">
        {steps.map((step, i) => (
          <div key={step.label} className="flex w-full max-w-[260px] flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: EASE, delay: i * 0.12 }}
              className="w-full"
            >
              <NodeCard
                icon={step.icon}
                label={step.label}
                sublabel={step.sublabel}
                active={i === steps.length - 1}
                pulse={i === steps.length - 1}
                className="w-full"
              />
            </motion.div>
            {i < steps.length - 1 && <ConnectionLine length={26} delay={i * 0.2} className="my-1.5" />}
          </div>
        ))}
      </div>
    </VideoPlaceholder>
  );
}

/**
 * LanguageIconPlaceholder — a glass chip for a language/SDK logo.
 * Renders the logo when `src` resolves, else a text fallback.
 */
export function LanguageIconPlaceholder({
  name,
  src,
  className,
}: {
  name: string;
  /** PLACEHOLDER — drop the real language icon here. */
  src?: string;
  className?: string;
}) {
  // TODO: Replace with language icon
  return (
    <motion.span
      variants={fadeUp}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.25, ease: EASE }}
      className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur", GLASS, className)}
      title={name}
    >
      {src ? (
        <img src={src} alt={name} width={16} height={16} loading="lazy" decoding="async" className="h-4 w-4 object-contain" />
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
      )}
      <span className="text-[12.5px] font-medium text-[var(--fg-secondary)]">{name}</span>
    </motion.span>
  );
}

/**
 * LogoPlaceholder — a glass tile for a partner logo with text fallback.
 */
export function LogoPlaceholder({
  name,
  src,
  className,
}: {
  name: string;
  /** PLACEHOLDER — drop the real partner logo here. */
  src?: string;
  className?: string;
}) {
  // TODO: Replace with partner logo
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.04, y: -2 }}
      transition={{ duration: 0.25, ease: EASE }}
      className={cn("grid h-[64px] place-items-center rounded-2xl border px-4 backdrop-blur-xl transition-colors duration-300", GLASS, GLASS_HOVER, className)}
      title={name}
    >
      {src ? (
        <img
          src={src}
          alt={`${name} logo`}
          loading="lazy"
          decoding="async"
          className="max-h-7 max-w-[88px] object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
        />
      ) : (
        <span className="font-display text-[14px] font-semibold tracking-[-0.01em] text-[var(--fg-secondary)]">{name}</span>
      )}
    </motion.div>
  );
}

export function LogoGrid({
  logos,
  className,
}: {
  logos: { name: string; src?: string }[];
  className?: string;
}) {
  return (
    <motion.div
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6", className)}
    >
      {logos.map((l) => (
        <LogoPlaceholder key={l.name} name={l.name} src={l.src} />
      ))}
    </motion.div>
  );
}
