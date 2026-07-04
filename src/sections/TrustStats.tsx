// TrustStats.tsx — "Compliance Trust Layer".
//
// A calm, premium trust transition that sits directly below the hero. Rather
// than a loud stats grid, it renders one elegant glass "command-center" panel
// split into three areas: verified regulatory credentials, a live compliance
// activity timeline, and lean proof metrics. Intentionally dark on both themes
// with restrained magenta (#f43f7d / #dc2f65) reserved for status dots, verified
// checks, and key numbers — colours are local, not theme tokens.

import { motion } from "framer-motion";
import { Landmark, ShieldCheck, KeyRound, Check, type LucideIcon } from "lucide-react";

const PINK = "#f43f7d";
const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Data ────────────────────────────────────────────────────────────────

interface Credential {
  label: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}

const CREDENTIALS: Credential[] = [
  {
    label: "Licensed",
    title: "Govt. of India GSP",
    desc: "Licensed GST Suvidha Provider",
    icon: Landmark,
  },
  {
    label: "Certified",
    title: "ISO 27001:2022",
    desc: "Information security certified",
    icon: ShieldCheck,
  },
  {
    label: "Encrypted",
    title: "Secure API layer",
    desc: "OAuth2, encrypted access, audit-ready logs",
    icon: KeyRound,
  },
];

type FlowStatus = "Completed" | "Active" | "Ready";

interface FlowStep {
  title: string;
  desc: string;
  status: FlowStatus;
}

const FLOW: FlowStep[] = [
  { title: "GSTN Sync", desc: "Data synced securely with GSTN", status: "Completed" },
  { title: "ITC Reconciliation", desc: "GSTR-2B, purchase data and mismatches tracked", status: "Completed" },
  { title: "E-Invoice Ready", desc: "IRN generation and validation supported", status: "Active" },
  { title: "Bank Reconciliation", desc: "Statements matched against your books", status: "Completed" },
  { title: "Audit Export", desc: "Filing evidence ready to download", status: "Ready" },
];

interface Metric {
  value: string;
  label: string;
}

const METRICS: Metric[] = [
  { value: "25,000+", label: "Businesses onboarded" },
  { value: "10,000+", label: "CA & accounting partners" },
  { value: "30 Crore+", label: "Compliance documents processed" },
  { value: "95%+", label: "Annual retention" },
  { value: "4.9/5", label: "Verified customer rating" },
];

// ─── Column heading ──────────────────────────────────────────────────────

function ColLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/[0.48]">
      {children}
    </div>
  );
}

// ─── Column 1 · Verified credentials ─────────────────────────────────────

function CredentialItem({ item }: { item: Credential }) {
  const Icon = item.icon;
  return (
    <div className="flex items-start gap-3.5">
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] border border-white/[0.08]"
        style={{ background: "rgba(244,63,125,0.08)" }}
      >
        <Icon size={17} strokeWidth={1.6} style={{ color: PINK }} />
      </span>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[15px] font-semibold leading-tight text-white">{item.title}</span>
          <Check size={13} strokeWidth={3} style={{ color: PINK }} />
        </div>
        <div className="mt-1 text-[12.5px] leading-[1.5] text-white/[0.5]">{item.desc}</div>
      </div>
    </div>
  );
}

// ─── Column 2 · Compliance activity timeline ─────────────────────────────

const STATUS_STYLE: Record<FlowStatus, { dot: string; ring: string; text: string; pulse: boolean }> = {
  Completed: { dot: PINK, ring: "rgba(244,63,125,0.9)", text: "text-white/[0.55]", pulse: false },
  Active: { dot: PINK, ring: "rgba(244,63,125,0.9)", text: "", pulse: true },
  Ready: { dot: "rgba(255,255,255,0.25)", ring: "rgba(255,255,255,0.3)", text: "text-white/[0.45]", pulse: false },
};

function FlowRow({ step, last }: { step: FlowStep; last: boolean }) {
  const s = STATUS_STYLE[step.status];
  return (
    <div className="relative pl-7">
      {/* glowing connector */}
      {!last && (
        <span
          aria-hidden
          className="absolute left-[5px] top-[15px] h-full w-px"
          style={{ background: "linear-gradient(180deg, rgba(244,63,125,0.35), rgba(255,255,255,0.06))" }}
        />
      )}
      {/* dot */}
      <span aria-hidden className="absolute left-0 top-[4px] grid h-[11px] w-[11px] place-items-center">
        {s.pulse && (
          <span
            className="absolute h-[11px] w-[11px] animate-ping rounded-full opacity-70"
            style={{ background: s.dot }}
          />
        )}
        <span
          className="relative h-[9px] w-[9px] rounded-full"
          style={{ background: s.dot, boxShadow: `0 0 0 3px ${s.ring.replace("0.9", "0.14").replace("0.3", "0.08")}` }}
        />
      </span>

      <div className={`flex items-center justify-between gap-3 ${last ? "" : "pb-5"}`}>
        <div className="min-w-0">
          <div className="text-[14px] font-medium leading-tight text-white/90">{step.title}</div>
          <div className="mt-1 text-[12.5px] leading-[1.5] text-white/[0.45]">{step.desc}</div>
        </div>
        <span
          className={`shrink-0 text-[11px] font-medium tracking-[0.02em] ${s.text}`}
          style={step.status === "Active" ? { color: PINK } : undefined}
        >
          {step.status}
        </span>
      </div>
    </div>
  );
}

// ─── Column 3 · Proof metrics ────────────────────────────────────────────

function MetricRow({ metric, last }: { metric: Metric; last: boolean }) {
  return (
    <div className={`flex items-baseline gap-3.5 py-3.5 ${last ? "" : "border-b border-white/[0.06]"}`}>
      <span className="w-[104px] shrink-0 whitespace-nowrap text-[22px] font-bold leading-none tracking-[-0.02em]" style={{ color: PINK }}>
        {metric.value}
      </span>
      <span className="text-[13px] leading-[1.4] text-white/[0.6]">{metric.label}</span>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────

export default function TrustStats() {
  return (
    <section
      data-reveal
      aria-label="Trusted compliance infrastructure"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
      style={{
        background:
          "radial-gradient(circle at top center, rgba(220,47,101,0.16), transparent 38%), linear-gradient(180deg, #07070a 0%, #0c0710 45%, #07070a 100%)",
      }}
    >
      {/* near-invisible grid texture */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at top, black, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse at top, black, transparent 78%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16">
        {/* Top content */}
        <div className="mx-auto max-w-[640px] text-center">
          <ColLabel>Trusted compliance infrastructure for Indian businesses</ColLabel>
          <h2 className="mx-auto mt-5 max-w-[620px] font-display font-semibold text-white [font-size:clamp(32px,5vw,52px)] [letter-spacing:-0.04em] [line-height:1.05]">
            Trusted compliance infrastructure for GST at scale
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] text-[15px] leading-[1.7] text-white/[0.55] sm:text-[16px]">
            WhiteBooks brings GST filing, GSTR-2B reconciliation, ITC tracking, e-Invoicing, e-Way
            Bills, Tally migration, and bank reconciliation together on one secure, audit-ready
            platform.
          </p>
        </div>

        {/* Command-center proof panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto mt-14 max-w-[1120px] rounded-[32px] p-7 sm:p-9"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.075), rgba(255,255,255,0.035))",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 40px 120px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div className="grid gap-10 lg:grid-cols-[32%_40%_28%] lg:gap-0">
            {/* Column 1 — Verified platform */}
            <div className="lg:pr-9">
              <ColLabel>Verified platform</ColLabel>
              <div className="mt-6 flex flex-col gap-6">
                {CREDENTIALS.map((c) => (
                  <CredentialItem key={c.title} item={c} />
                ))}
              </div>
            </div>

            {/* Column 2 — Compliance activity */}
            <div className="lg:border-l lg:border-white/[0.07] lg:px-9">
              <ColLabel>Compliance activity</ColLabel>
              <div className="mt-6">
                {FLOW.map((step, i) => (
                  <FlowRow key={step.title} step={step} last={i === FLOW.length - 1} />
                ))}
              </div>
            </div>

            {/* Column 3 — Scale / proof metrics */}
            <div className="lg:border-l lg:border-white/[0.07] lg:pl-9">
              <ColLabel>At scale</ColLabel>
              <div className="mt-3">
                {METRICS.map((m, i) => (
                  <MetricRow key={m.label} metric={m} last={i === METRICS.length - 1} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
