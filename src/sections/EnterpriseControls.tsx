// EnterpriseControls.tsx — "Built for teams. Ready for scale." section.
//
// Replaces the old diamond-card layout. Sells control, auditability and
// trust through a workflow timeline (the hero) and an icon-led bento grid
// of access/audit/compliance pillars — Stripe Radar / Linear / Mercury /
// Rippling register, deliberately fixed-dark regardless of site theme (it
// reads as a product surface, not page chrome).

import { motion } from "framer-motion";
import {
  Activity,
  BadgeCheck,
  Check,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Clock3,
  FileCheck2,
  FileDown,
  FilePlus2,
  FileText,
  Fingerprint,
  History,
  Receipt,
  ShieldCheck,
  UserCheck,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useTheme } from "@/contexts/ThemeContext";
import {
  ACTIVITY_FEED_EVENTS,
  BENTO_CARDS,
  FLOATING_METRICS,
  SECTION_HEADER,
  TIMELINE_EVENTS,
  type BentoCardData,
  type FeedIconKind,
  type FloatingMetric,
  type MetricIconKind,
  type TimelineEvent,
  type TimelineStatus,
} from "./enterprise-controls.data";

const EASE = [0.22, 1, 0.36, 1] as const;
const ACCENT = "var(--brand)";

/* ── Icon lookups — every piece of content below gets a meaningful icon,
   never a decorative one. Keyed by exact copy/id so additions stay honest. */
const TIMELINE_ICON: Record<TimelineStatus, LucideIcon> = {
  created: FilePlus2,
  pending: Clock3,
  approved: CheckCircle2,
  logged: History,
  exported: FileDown,
};

const METRIC_ICON: Record<MetricIconKind, LucideIcon> = {
  audit: ShieldCheck,
  "maker-checker": UserCheck,
  team: Users,
};

const FEED_ICON: Record<FeedIconKind, LucideIcon> = {
  invoice: FileText,
  approval: CheckCircle2,
  export: FileDown,
};

const CAPABILITY_ICON: Record<string, LucideIcon> = {
  "Multiple users with access roles": Users,
  "Maker-Checker for invoices & payments": UserCheck,
  "Approval workflows": Workflow,
  "Audit trail & activity logs": History,
  "Tamper-evident change history": Fingerprint,
  "User-action audit & export reports": ClipboardList,
  "Filing & ITC compliance evidence": FileCheck2,
  "GST evidence trail": Receipt,
  "ITC reconciliation records": BadgeCheck,
};

const STAT_ICON: Record<string, LucideIcon> = {
  "evidence-export": FileDown,
  "audit-reports": ClipboardCheck,
};

/* ── Section header — centered, editorial, max 700px ─────────────────────── */
function SectionHeader() {
  return (
    <div className="mx-auto flex max-w-[700px] flex-col items-center gap-4 text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_5%,transparent)] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--fg-secondary)]">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: ACCENT, boxShadow: "0 0 8px var(--brand-glow)" }}
        />
        {SECTION_HEADER.eyebrow}
      </span>
      <h2 className="m-0 font-display text-[clamp(28px,4vw,44px)] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--fg-primary)] text-balance">
        {SECTION_HEADER.heading}
      </h2>
      <p className="m-0 max-w-[560px] text-[15px] leading-[1.55] text-[var(--fg-secondary)] sm:text-[16px]">
        {SECTION_HEADER.subtitle}
      </p>
    </div>
  );
}

/* ── Timeline row — icon-in-dot node, pulse ring, reveals on scroll ───────── */
function TimelineRow({ event, index, isLast }: { event: TimelineEvent; index: number; isLast: boolean }) {
  const Icon = TIMELINE_ICON[event.status];
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: EASE, delay: index * 0.12 }}
      className="relative flex gap-4 pb-7 last:pb-0"
    >
      <div className="flex flex-col items-center">
        <span
          className="relative z-[1] grid h-7 w-7 shrink-0 place-items-center rounded-full border"
          style={{ background: "rgba(220,47,101,0.14)", borderColor: "var(--brand-border)" }}
        >
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{ background: ACCENT }}
            animate={{ scale: [1, 1.9, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.25 }}
          />
          <Icon size={13} className="relative z-[1]" style={{ color: ACCENT }} />
        </span>
        {!isLast && <span className="mt-1 w-px flex-1 bg-white/10" />}
      </div>
      <div className="flex flex-col gap-0.5 pt-0.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/40">{event.time}</span>
        <span className="text-[14.5px] font-medium leading-[1.4] text-white/90">{event.title}</span>
      </div>
    </motion.div>
  );
}

function ActivityTimelinePlaceholder() {
  return (
    <div className="flex h-full flex-col gap-1 p-7 sm:p-9">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/35">Live workflow</span>
      <div className="mt-5">
        {TIMELINE_EVENTS.map((event, i) => (
          <TimelineRow key={event.time + event.title} event={event} index={i} isLast={i === TIMELINE_EVENTS.length - 1} />
        ))}
      </div>
    </div>
  );
}

/* ── Floating glass metric card — icon badge + stat, overlaps the canvas ── */
const METRIC_SLOT_CLASS: Record<FloatingMetric["slot"], string> = {
  "top-right": "-right-3 -top-5 sm:-right-6 sm:-top-6",
  "bottom-left": "-left-3 bottom-10 sm:-left-7 sm:bottom-14",
  "bottom-right": "-right-3 -bottom-5 sm:-right-6 sm:-bottom-7",
};

function FloatingMetricCard({ metric, index }: { metric: FloatingMetric; index: number }) {
  const Icon = METRIC_ICON[metric.icon];
  return (
    <motion.div
      className={cn(
        "absolute z-20 w-[160px] rounded-2xl border border-white/12 bg-white/[0.06] px-3.5 py-3 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:w-[178px]",
        METRIC_SLOT_CLASS[metric.slot],
      )}
      initial={{ opacity: 0, scale: 0.92, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
      transition={{
        opacity: { duration: 0.4, delay: 0.2 + index * 0.1 },
        scale: { duration: 0.4, delay: 0.2 + index * 0.1 },
        y: { duration: 4.5 + index * 0.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 },
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-white/10"
          style={{ background: "rgba(220,47,101,0.14)" }}
        >
          <Icon size={13} style={{ color: ACCENT }} />
        </span>
        <span className="text-[12.5px] font-semibold leading-tight text-white">{metric.title}</span>
      </div>
      <div className="mt-1.5 text-[11.5px] text-white/55">{metric.value}</div>
      {metric.note && (
        <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
          <span aria-hidden className="h-1 w-1 rounded-full bg-emerald-400" />
          {metric.note}
        </span>
      )}
    </motion.div>
  );
}

/* ── Hero canvas — rounded dark surface, spotlight glow, floating cards ──── */
function ActivityTimelineCanvas() {
  return (
    <div className="relative mx-auto mt-14 max-w-[640px] sm:mt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -inset-y-16 -z-10 blur-3xl"
        style={{ background: "radial-gradient(circle at 50% 40%, var(--brand-glow), transparent 60%)" }}
      />
      <div
        className="relative overflow-hidden rounded-[24px] border border-white/10 shadow-[0_60px_140px_-40px_rgba(0,0,0,0.8)]"
        style={{ background: "linear-gradient(180deg, #0c0f16 0%, #050509 100%)" }}
      >
        <ActivityTimelinePlaceholder />
      </div>
      {FLOATING_METRICS.map((m, i) => (
        <FloatingMetricCard key={m.slot} metric={m} index={i} />
      ))}
    </div>
  );
}

/* ── Capability grid — icon tile above label, Rippling-style ─────────────── */
function CapabilityList({ items }: { items: string[] }) {
  return (
    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map((item) => {
        const Icon = CAPABILITY_ICON[item] ?? Check;
        return (
          <div key={item} className="flex flex-row items-start gap-3 sm:flex-col sm:items-start sm:gap-2.5">
            <span
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_5%,transparent)] transition-colors duration-300 group-hover:border-[color-mix(in_srgb,var(--fg-primary)_20%,transparent)]"
            >
              <Icon size={16} style={{ color: ACCENT }} />
            </span>
            <span className="text-[12.5px] font-medium leading-[1.4] text-[var(--fg-secondary)]">{item}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Activity feed — icon-led event list, Linear-style ────────────────────── */
function ActivityFeedPlaceholder() {
  return (
    <div className="flex h-full flex-col gap-3 rounded-2xl border border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_4%,transparent)] p-4">
      {ACTIVITY_FEED_EVENTS.map((e) => {
        const Icon = FEED_ICON[e.icon];
        return (
          <div
            key={e.title}
            className="flex items-start justify-between gap-3 border-b border-[var(--hairline)] pb-3 last:border-0 last:pb-0"
          >
            <div className="flex items-start gap-2.5">
              <span
                className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-[var(--hairline-strong)]"
                style={{ background: "rgba(220,47,101,0.12)" }}
              >
                <Icon size={13} style={{ color: ACCENT }} />
              </span>
              <div>
                <div className="text-[13.5px] font-medium text-[var(--fg-primary)]">{e.title}</div>
                <div className="text-[12px] text-[var(--fg-tertiary)]">{e.subtitle}</div>
              </div>
            </div>
            <span className="shrink-0 font-mono text-[10.5px] text-[var(--fg-tertiary)]">{e.time}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Bento card — asymmetric sizing, icon-led content, hover lift ────────── */
const SIZE_CLASS: Record<BentoCardData["size"], string> = {
  large: "col-span-1 row-span-1 lg:col-span-2 lg:row-span-2",
  wide: "col-span-1 row-span-1 lg:col-span-2 lg:row-span-1",
  small: "col-span-1 row-span-1",
};

function BentoCard({ data, index }: { data: BentoCardData; index: number }) {
  const StatIcon = data.variant === "stat" ? STAT_ICON[data.id] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.4, ease: EASE, delay: (index % 3) * 0.08 }}
      className={cn(
        SIZE_CLASS[data.size],
        "group flex flex-col gap-4 overflow-hidden rounded-[20px] border border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_3%,transparent)] p-6 transition-colors duration-300 hover:border-[color-mix(in_srgb,var(--fg-primary)_20%,transparent)] sm:p-7",
        data.variant === "stat" ? "justify-center" : "justify-start",
      )}
    >
      {data.eyebrow && (
        <span className="font-mono text-[10.5px] uppercase tracking-[0.14em]" style={{ color: ACCENT }}>
          {data.variant === "feed" && <Activity size={11} className="mr-1.5 inline -translate-y-px" />}
          {data.eyebrow}
        </span>
      )}
      <h3 className="font-display text-[18px] font-semibold leading-[1.25] tracking-[-0.01em] text-[var(--fg-primary)] sm:text-[20px]">
        {data.heading}
      </h3>
      {data.description && (
        <p className="m-0 text-[13.5px] leading-[1.55] text-[var(--fg-secondary)]">{data.description}</p>
      )}

      {data.variant === "capabilities" && data.capabilities && <CapabilityList items={data.capabilities} />}

      {data.variant === "stat" && data.stat && StatIcon && (
        <div className="flex items-center gap-3">
          <span
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--hairline-strong)]"
            style={{ background: "rgba(220,47,101,0.14)" }}
          >
            <StatIcon size={17} style={{ color: ACCENT }} />
          </span>
          <div>
            <div className="font-display text-[20px] font-semibold leading-none text-[var(--fg-primary)]">
              {data.stat.value}
            </div>
            <div className="mt-1 text-[12px] text-[var(--fg-tertiary)]">{data.stat.label}</div>
          </div>
        </div>
      )}

      {data.variant === "feed" && (
        <div className="min-h-[140px] flex-1">
          <ActivityFeedPlaceholder />
        </div>
      )}
    </motion.div>
  );
}

/* ── Section ───────────────────────────────────────────────────────────── */
export function EnterpriseControls() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section
      data-reveal
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
      style={{
        background: isDark
          ? "linear-gradient(180deg, #050509 0%, #0C1017 100%)"
          : "linear-gradient(180deg, #fdfdff 0%, #eef0f6 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 70% 30%, var(--brand-glow), transparent 50%)" }}
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16">
        <SectionHeader />

        {/* <ActivityTimelineCanvas /> */}

        <div className="mt-20 grid grid-cols-1 gap-4 sm:mt-24 lg:grid-cols-4 lg:auto-rows-[minmax(210px,auto)] lg:[grid-auto-flow:dense]">
          {BENTO_CARDS.map((card, i) => (
            <BentoCard key={card.id} data={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default EnterpriseControls;
