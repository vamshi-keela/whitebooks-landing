/**
 * BeforeAfterStory — the "transformation" section, told as a cinematic journey
 * rather than a comparison table:
 *
 *     Manual Chaos   →   WhiteBooks Engine   →   Automated Scale
 *
 * Theme-aware product stage (follows the site's dark/light theme via design
 * tokens + useTheme), in the spirit of Stripe Radar / Mercury / Linear / Brex.
 * All visuals are placeholder canvases with TODO markers so a real MP4 / image
 * can drop in later.
 *
 * Composition:
 *   • TransformationHeader        — eyebrow + heading + subtitle
 *   • Journey row                 — ManualChaosColumn · WhiteBooksEngine · AutomationColumn
 *   • WorkflowCanvas              — Create → Approval → GST Sync → Audit → Export
 *   • Outcome metric cards        — glass, Brex-style
 *   • ActivityTimeline            — "Life after WhiteBooks", Linear activity feed
 */
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock,
  FileDown,
  FilePlus2,
  History,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useTheme } from "@/contexts/ThemeContext";
import type { SapConnector } from "./connectors.data";

const EASE = [0.22, 1, 0.36, 1] as const;
const ACCENT = "var(--brand)";

/* Theme-aware text + status colours (tokens flip with the site theme). */
const TXT = "var(--fg-primary)";
const TXT_2 = "var(--fg-secondary)";
const TXT_3 = "var(--fg-tertiary)";
const WARN = "#f06d6d"; // soft red — legible on both themes
const OK = "#22c55e"; // success green — legible on both themes

/* Token-driven surface helpers (theme-aware). */
const GLASS = "border-[var(--hairline-bright)] bg-[color-mix(in_srgb,var(--fg-primary)_6%,transparent)]";
const CARD = "border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_3%,transparent)]";

/* ── Static storytelling content (design scaffolding; swap copy as needed) ── */
const ENGINE_CHIPS = ["GST Ready", "Audit Trail", "Maker-Checker", "Connected Workflows"];

const FLOATING_METRICS: { value: string; label: string; slot: string }[] = [
  { value: "8 hrs/day", label: "saved", slot: "-left-6 top-6 sm:-left-10" },
  { value: "0%", label: "errors", slot: "-right-6 top-14 sm:-right-12" },
  { value: "100%", label: "audit logs", slot: "-left-4 bottom-16 sm:-left-12" },
  { value: "24×", label: "faster", slot: "-right-5 bottom-8 sm:-right-12" },
];

const WORKFLOW_STEPS: { label: string; icon: LucideIcon }[] = [
  { label: "Create Invoice", icon: FilePlus2 },
  { label: "Approval", icon: UserCheck },
  { label: "GST Sync", icon: RefreshCw },
  { label: "Audit Log", icon: History },
  { label: "Export", icon: FileDown },
];

const OUTCOMES: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "24×", label: "Faster processing", icon: Zap },
  { value: "8 hrs", label: "Saved daily", icon: Clock },
  { value: "0%", label: "Errors", icon: ShieldCheck },
  { value: "100%", label: "Audit trail", icon: BadgeCheck },
];

const TIMELINE: { time: string; event: string; icon: LucideIcon }[] = [
  { time: "09:00", event: "Invoice created", icon: FilePlus2 },
  { time: "09:01", event: "Approval completed", icon: UserCheck },
  { time: "09:01", event: "GST synced", icon: RefreshCw },
  { time: "09:02", event: "Audit log generated", icon: History },
  { time: "09:02", event: "Evidence exported", icon: FileDown },
];

/* ── Header ───────────────────────────────────────────────────────────────── */
function TransformationHeader({ heading, sub }: { heading: ReactNode; sub: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: EASE }}
      className="mx-auto flex max-w-[700px] flex-col items-center gap-4 text-center"
    >
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em]",
          GLASS,
        )}
        style={{ color: TXT_2 }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT, boxShadow: "0 0 8px var(--brand-glow)" }} />
        The transformation
      </span>
      <h2 className="m-0 font-display text-[clamp(28px,4.2vw,46px)] font-semibold leading-[1.1] tracking-[-0.02em] text-balance" style={{ color: TXT }}>
        {heading}
      </h2>
      <p className="m-0 max-w-[560px] text-[15px] leading-[1.6] sm:text-[16px]" style={{ color: TXT_2 }}>
        {sub}
      </p>
    </motion.div>
  );
}

/* ── Stage label ──────────────────────────────────────────────────────────── */
function StageLabel({ n, title, tone }: { n: string; title: string; tone: "muted" | "brand" | "ok" }) {
  const color = tone === "brand" ? ACCENT : tone === "ok" ? OK : TXT_3;
  return (
    <div className="mb-5 flex items-center gap-2.5">
      <span className="font-mono text-[10.5px] tracking-[0.14em]" style={{ color }}>
        {n}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: tone === "muted" ? TXT_2 : color }}>
        {title}
      </span>
    </div>
  );
}

/* ── Left: Manual Chaos ───────────────────────────────────────────────────── */
function ManualChaosColumn({ rows }: { rows: SapConnector["beforeAfter"]["rows"] }) {
  return (
    <div className="w-full">
      <StageLabel n="01" title="Before WhiteBooks" tone="muted" />
      <div className="flex flex-col gap-2.5">
        {rows.map((r, i) => (
          <motion.div
            key={r.metric}
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 0.92, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, ease: EASE, delay: i * 0.06 }}
            className={cn("flex items-center gap-3 rounded-2xl px-4 py-3", CARD)}
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg" style={{ background: "rgba(240,109,109,0.12)" }}>
              <AlertTriangle size={15} style={{ color: WARN }} />
            </span>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-[13.5px] font-medium" style={{ color: TXT_2 }}>
                {r.before}
              </span>
              <span className="text-[11px]" style={{ color: TXT_3 }}>
                {r.metric}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Right: Automated Scale ───────────────────────────────────────────────── */
function AutomationColumn({ rows }: { rows: SapConnector["beforeAfter"]["rows"] }) {
  return (
    <div className="w-full">
      <StageLabel n="03" title="After WhiteBooks" tone="ok" />
      <div className="flex flex-col gap-2.5">
        {rows.map((r, i) => (
          <motion.div
            key={r.metric}
            initial={{ opacity: 0, x: 14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, ease: EASE, delay: i * 0.06 }}
            whileHover={{ y: -2 }}
            className="flex items-center gap-3 rounded-2xl border border-[var(--brand-border)] px-4 py-3 shadow-[0_18px_40px_-28px_var(--brand-glow)]"
            style={{ background: "linear-gradient(160deg, color-mix(in srgb, var(--brand) 10%, transparent), color-mix(in srgb, var(--brand) 2%, transparent))" }}
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg" style={{ background: "rgba(34,197,94,0.14)" }}>
              <CheckCircle2 size={15} style={{ color: OK }} />
            </span>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-[13.5px] font-semibold" style={{ color: TXT }}>
                {r.after}
              </span>
              <span className="text-[11px]" style={{ color: TXT_3 }}>
                {r.metric}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Floating glass metric card (orbits the engine) ───────────────────────── */
function FloatingMetricCard({ value, label, slot, index }: { value: string; label: string; slot: string; index: number }) {
  return (
    <motion.div
      className={cn("absolute z-20 rounded-2xl px-3 py-2 backdrop-blur-xl", GLASS, slot)}
      style={{ boxShadow: "0 18px 50px -22px rgba(0,0,0,0.45)" }}
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1, y: [0, -7, 0] }}
      viewport={{ once: true }}
      transition={{
        opacity: { duration: 0.45, delay: 0.2 + index * 0.12 },
        scale: { duration: 0.45, delay: 0.2 + index * 0.12 },
        y: { duration: 4.5 + index, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 },
      }}
    >
      <div className="font-display text-[15px] font-semibold leading-none tracking-[-0.01em]" style={{ color: TXT }}>
        {value}
      </div>
      <div className="mt-1 text-[10.5px]" style={{ color: TXT_3 }}>
        {label}
      </div>
    </motion.div>
  );
}

/* ── Center: the WhiteBooks Engine ─────────────────────────────────────────── */
// TODO: Replace <WhiteBooksEnginePlaceholder /> with an MP4 / Lottie of the
//       automation engine (data pipelines flowing into a glowing core).
function WhiteBooksEnginePlaceholder() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[320px]">
      {/* radial brand spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 blur-3xl"
        style={{ background: "radial-gradient(circle at 50% 50%, var(--brand-glow), transparent 62%)" }}
      />

      {/* concentric pulse rings */}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute inset-0 rounded-full border border-[var(--brand-border)]"
          animate={{ scale: [0.7, 1.05], opacity: [0.5, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeOut", delay: i * 1.05 }}
        />
      ))}
      <span aria-hidden className="absolute inset-[8%] rounded-full border border-[var(--hairline)]" />

      {/* rotating brand arc */}
      <motion.span
        aria-hidden
        className="absolute inset-[2%] rounded-full"
        style={{ background: "conic-gradient(from 0deg, transparent 0%, rgba(220,47,101,0.55) 14%, transparent 32%, transparent 70%, rgba(220,47,101,0.25) 84%, transparent 96%)", mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))", WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 1px))" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      />

      {/* outward "data pipeline" lines */}
      <svg aria-hidden viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <motion.line
              key={i}
              x1={100 + Math.cos(a) * 42}
              y1={100 + Math.sin(a) * 42}
              x2={100 + Math.cos(a) * 92}
              y2={100 + Math.sin(a) * 92}
              stroke="rgba(220,47,101,0.45)"
              strokeWidth="1"
              strokeDasharray="3 5"
              animate={{ opacity: [0.15, 0.7, 0.15] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.18 }}
            />
          );
        })}
      </svg>

      {/* glowing core */}
      <motion.div
        className="absolute inset-[20%] flex flex-col items-center justify-center gap-2 rounded-full border border-[var(--hairline-bright)] px-4 text-center backdrop-blur-xl"
        style={{ background: "radial-gradient(circle at 50% 35%, color-mix(in srgb, var(--brand) 22%, transparent), var(--bg-card) 80%)" }}
        animate={{ boxShadow: ["0 0 0 0 rgba(220,47,101,0.0)", "0 0 40px 4px rgba(220,47,101,0.28)", "0 0 0 0 rgba(220,47,101,0.0)"] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
          <span className="h-1 w-1 rounded-full" style={{ background: OK, boxShadow: `0 0 6px ${OK}` }} />
          Automation Engine
        </span>
        <span className="font-display text-[19px] font-semibold leading-none tracking-[-0.02em]" style={{ color: TXT }}>
          WhiteBooks
        </span>
        <div className="mt-1 flex max-w-[150px] flex-wrap justify-center gap-1">
          {ENGINE_CHIPS.map((c) => (
            <span key={c} className={cn("rounded-full px-1.5 py-0.5 text-[8.5px] font-medium", GLASS)} style={{ color: TXT_2 }}>
              {c}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function WhiteBooksEngine() {
  return (
    <div className="relative w-full">
      <StageLabel n="02" title="WhiteBooks Engine" tone="brand" />
      <div className="relative px-2 pt-6 pb-2 sm:px-6">
        <WhiteBooksEnginePlaceholder />
        {FLOATING_METRICS.map((m, i) => (
          <FloatingMetricCard key={m.label} value={m.value} label={m.label} slot={m.slot} index={i} />
        ))}
      </div>
    </div>
  );
}

/* ── Stage connector (→ desktop, ↓ mobile) ─────────────────────────────────── */
function StageConnector({ vertical = false }: { vertical?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: EASE, delay: 0.15 }}
      aria-hidden
      className={cn("flex shrink-0 items-center justify-center", vertical ? "py-1" : "px-1")}
    >
      <span
        className="grid h-10 w-10 place-items-center rounded-full border border-[var(--brand-border)] text-white"
        style={{ background: ACCENT, boxShadow: "0 10px 30px -8px var(--brand-glow)" }}
      >
        <ArrowRight size={17} className={vertical ? "rotate-90" : ""} />
      </span>
    </motion.div>
  );
}

/* ── Workflow canvas — animated node pipeline ─────────────────────────────── */
// TODO: Replace <WorkflowCanvas /> internals with an MP4 of the live workflow.
function WorkflowCanvas() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: EASE }}
      className="relative overflow-hidden rounded-[24px] border border-[var(--hairline-strong)] p-6 sm:p-9"
      style={{ background: "linear-gradient(180deg, color-mix(in srgb, var(--fg-primary) 3%, transparent), transparent)" }}
    >
      <div className="mb-7 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em]" style={{ color: TXT_3 }}>
        <Workflow size={13} style={{ color: ACCENT }} />
        Connected workflow
      </div>
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        {WORKFLOW_STEPS.map((step, i) => {
          const Icon = step.icon;
          const last = i === WORKFLOW_STEPS.length - 1;
          return (
            <div key={step.label} className="flex flex-1 items-center gap-3 sm:flex-col sm:gap-3 sm:text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: EASE, delay: i * 0.12 }}
                className={cn("relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl", GLASS)}
              >
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-2xl"
                  style={{ boxShadow: "0 0 0 0 rgba(220,47,101,0.5)" }}
                  animate={{ boxShadow: ["0 0 0 0 rgba(220,47,101,0.45)", "0 0 0 7px rgba(220,47,101,0)"] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: i * 0.3 }}
                />
                <Icon size={19} style={{ color: ACCENT }} />
              </motion.div>
              <span className="text-[12.5px] font-medium sm:mt-0" style={{ color: TXT_2 }}>
                {step.label}
              </span>

              {/* connector — horizontal between nodes (desktop), vertical (mobile) */}
              {!last && (
                <span aria-hidden className="relative ml-auto hidden h-px flex-1 overflow-hidden bg-[var(--hairline-bright)] sm:mt-6 sm:block sm:self-start">
                  <motion.span
                    className="absolute inset-y-0 left-0 w-1/3"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(220,47,101,0.9), transparent)" }}
                    animate={{ x: ["-100%", "300%"] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  />
                </span>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ── Outcome metric cards (Brex-style glass) ──────────────────────────────── */
function OutcomeCard({ value, label, icon: Icon, index }: { value: string; label: string; icon: LucideIcon; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.45, ease: EASE, delay: index * 0.08 }}
      className={cn("relative flex flex-col gap-4 overflow-hidden rounded-[22px] p-6 backdrop-blur-xl", GLASS)}
    >
      <div aria-hidden className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl" style={{ background: "var(--brand-glow)" }} />
      <span className="grid h-11 w-11 place-items-center rounded-xl border border-[var(--brand-border)]" style={{ background: "color-mix(in srgb, var(--brand) 14%, transparent)" }}>
        <Icon size={20} style={{ color: ACCENT }} />
      </span>
      <div className="flex flex-col gap-1">
        <span className="font-display text-[clamp(30px,4vw,40px)] font-semibold leading-none tracking-[-0.03em]" style={{ color: ACCENT }}>
          {value}
        </span>
        <span className="text-[13.5px] font-medium" style={{ color: TXT_2 }}>
          {label}
        </span>
      </div>
    </motion.div>
  );
}

/* ── Activity timeline — "Life after WhiteBooks" (Linear feed) ────────────── */
function ActivityTimeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: EASE }}
      className="mx-auto max-w-[560px] rounded-[24px] border border-[var(--hairline-strong)] p-6 sm:p-8"
      style={{ background: "linear-gradient(180deg, color-mix(in srgb, var(--fg-primary) 3%, transparent), transparent)" }}
    >
      <div className="mb-6 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.16em]" style={{ color: TXT_3 }}>
        <Sparkles size={13} style={{ color: ACCENT }} />
        Life after WhiteBooks
      </div>
      <div className="relative">
        {TIMELINE.map((row, i) => {
          const Icon = row.icon;
          const last = i === TIMELINE.length - 1;
          return (
            <motion.div
              key={row.event}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, ease: EASE, delay: i * 0.1 }}
              className="relative flex gap-4 pb-6 last:pb-0"
            >
              <div className="flex flex-col items-center">
                <span className="relative z-[1] grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--brand-border)]" style={{ background: "color-mix(in srgb, var(--brand) 14%, transparent)" }}>
                  <Icon size={14} style={{ color: ACCENT }} />
                </span>
                {!last && <span className="mt-1 w-px flex-1 bg-[var(--hairline-bright)]" />}
              </div>
              <div className="flex flex-col gap-0.5 pt-0.5">
                <span className="font-mono text-[11px] tracking-[0.08em]" style={{ color: TXT_3 }}>
                  {row.time}
                </span>
                <span className="text-[14px] font-medium" style={{ color: TXT }}>
                  {row.event}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ── Section ──────────────────────────────────────────────────────────────── */
export function BeforeAfterStory({ data }: { data: SapConnector["beforeAfter"] }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section
      className="relative overflow-hidden border-y border-[var(--hairline)] py-16 sm:py-20 lg:py-28"
      style={{
        background: isDark
          ? "linear-gradient(180deg, #050509 0%, #0d1018 100%)"
          : "linear-gradient(180deg, #fdfdff 0%, #eef0f6 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 38%, var(--brand-glow), transparent 55%)" }}
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16">
        <TransformationHeader heading={data.heading} sub={data.sub} />

        {/* Journey — desktop: 3-column row; mobile/tablet: vertical flow */}
        <div className="mt-16 hidden items-center gap-3 lg:flex">
          <div className="flex-1">
            <ManualChaosColumn rows={data.rows} />
          </div>
          <StageConnector />
          <div className="w-[34%] shrink-0">
            <WhiteBooksEngine />
          </div>
          <StageConnector />
          <div className="flex-1">
            <AutomationColumn rows={data.rows} />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-stretch gap-4 lg:hidden">
          <ManualChaosColumn rows={data.rows} />
          <div className="flex justify-center">
            <StageConnector vertical />
          </div>
          <WhiteBooksEngine />
          <div className="flex justify-center">
            <StageConnector vertical />
          </div>
          <AutomationColumn rows={data.rows} />
        </div>

        {/* Workflow canvas */}
        <div className="mt-16 sm:mt-20">
          <WorkflowCanvas />
        </div>

        {/* Outcomes */}
        <div className="mt-12 sm:mt-16">
          <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: TXT_3 }}>
            The outcome
          </p>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {OUTCOMES.map((o, i) => (
              <OutcomeCard key={o.label} value={o.value} label={o.label} icon={o.icon} index={i} />
            ))}
          </div>
        </div>

        {/* Activity timeline */}
        <div className="mt-16 sm:mt-20">
          <ActivityTimeline />
        </div>
      </div>
    </section>
  );
}

export default BeforeAfterStory;
