// EnterpriseControls.tsx — "Built for teams. Ready for scale." section.
//
// Two full-width control cards matching the legacy whitebooks.in layout:
// a left accent bar, an icon tile + title block with an accent underline,
// and a row of circular icon features separated by hairlines. Pink accent
// for Role-Based Access, indigo for Audit Trail. All surfaces run on the
// app's dark/light theme tokens.

import { motion } from "framer-motion";
import { ShieldCheck, UserCheck, type LucideIcon } from "lucide-react";
import iconUsers from "@/assets/icons/daignoal-img-1.svg";
import iconInvoiceCheck from "@/assets/icons/daignoal-img-2.svg";
import iconAuditLogs from "@/assets/icons/daignoal-img-3.svg";
import iconShieldUser from "@/assets/icons/daignoal-img-4.svg";
import iconMakerChecker from "@/assets/icons/daignoal-img-5.svg";
import iconChangeHistory from "@/assets/icons/daignoal-img-6.svg";
import iconFilingEvidence from "@/assets/icons/daignoal-img-7.svg";
import iconExportReports from "@/assets/icons/daignoal-img-8.svg";
import {
  CONTROL_CARDS,
  SECTION_SUBTITLE,
  type ControlAccent,
  type ControlCardData,
  type ControlFeature,
  type ControlFeatureIcon,
  type ControlTileIcon,
} from "./enterprise-controls.data";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Per-card accent: solid colour for bars/icons, soft tint for badges, and a
   whisper tint mixed into the card surface — all legible on both themes. */
const ACCENTS: Record<ControlAccent, { color: string; soft: string; softer: string }> = {
  brand: {
    color: "var(--brand)",
    soft: "rgba(220, 47, 101, 0.10)",
    softer: "rgba(220, 47, 101, 0.035)",
  },
  indigo: {
    color: "#6d76f7",
    soft: "rgba(109, 118, 247, 0.12)",
    softer: "rgba(109, 118, 247, 0.045)",
  },
};

const TILE_ICON: Record<ControlTileIcon, LucideIcon> = {
  "user-check": UserCheck,
  "shield-check": ShieldCheck,
};

/* Custom single-colour SVGs (white fills) rendered through a CSS mask so
   they pick up each card's accent colour and stay legible on both themes. */
const FEATURE_ICON: Record<ControlFeatureIcon, string> = {
  users: iconUsers,
  "invoice-check": iconInvoiceCheck,
  "audit-logs": iconAuditLogs,
  "shield-user": iconShieldUser,
  "maker-checker-flow": iconMakerChecker,
  "change-history": iconChangeHistory,
  "filing-evidence": iconFilingEvidence,
  "export-reports": iconExportReports,
};

/* ── Circular icon feature — badge above a two-line centered label ────────── */
function FeatureItem({
  feature,
  accent,
  delay,
}: {
  feature: ControlFeature;
  accent: (typeof ACCENTS)[ControlAccent];
  delay: number;
}) {
  const iconUrl = FEATURE_ICON[feature.icon];
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: EASE, delay }}
      className="flex flex-col items-center gap-4 text-center lg:flex-1 lg:px-2.5"
    >
      <span
        className="grid h-16 w-16 shrink-0 place-items-center rounded-full"
        style={{ background: accent.soft }}
      >
        <span
          aria-hidden
          className="h-7 w-8"
          style={{
            background: accent.color,
            maskImage: `url("${iconUrl}")`,
            maskRepeat: "no-repeat",
            maskPosition: "center",
            maskSize: "contain",
            WebkitMaskImage: `url("${iconUrl}")`,
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            WebkitMaskSize: "contain",
          }}
        />
      </span>
      <div>
        <div className="whitespace-nowrap text-[14.5px] font-semibold leading-[1.35] text-[var(--fg-primary)]">
          {feature.title}
        </div>
        <div className="mt-0.5 text-[13px] leading-[1.45] text-[var(--fg-secondary)] lg:min-h-[38px]">
          {feature.sub}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Control card — accent bar, title block, hairline-divided feature row ── */
function ControlCard({ data, index }: { data: ControlCardData; index: number }) {
  const accent = ACCENTS[data.accent];
  const TileIcon = TILE_ICON[data.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.12 }}
      className="relative overflow-hidden rounded-[20px] border border-[var(--hairline-strong)]"
      style={{
        background: `linear-gradient(0deg, ${accent.softer}, ${accent.softer}), var(--bg-elev)`,
      }}
    >
      {/* left accent bar */}
      <span aria-hidden className="absolute inset-y-0 left-0 w-[5px]" style={{ background: accent.color }} />

      {/* dot-grid decoration, top right */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-8 top-8 hidden h-[46px] w-[98px] sm:block"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in srgb, var(--fg-primary) 20%, transparent) 1.5px, transparent 1.5px)",
          backgroundSize: "13px 13px",
        }}
      />

      <div className="flex flex-col gap-8 p-7 sm:p-9 lg:flex-row lg:items-center lg:gap-0 lg:py-7">
        {/* title block */}
        <div className="shrink-0 lg:w-[300px] lg:pr-10">
          <span
            className="grid h-14 w-14 place-items-center rounded-2xl"
            style={{ background: accent.soft }}
          >
            <TileIcon size={26} style={{ color: accent.color }} strokeWidth={1.9} />
          </span>
          <h3 className="mt-5 max-w-[250px] font-display text-[23px] font-semibold leading-[1.24] tracking-[-0.015em] text-[var(--fg-primary)] sm:text-[26px]">
            {data.heading}
          </h3>
          <span aria-hidden className="mt-3.5 block h-1 w-11 rounded-full" style={{ background: accent.color }} />
          <p className="m-0 mt-4 max-w-[260px] text-[15px] leading-[1.6] text-[var(--fg-secondary)]">
            {data.description}
          </p>
        </div>

        {/* feature row — hairline dividers on desktop, plain grid when stacked */}
        <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-9 border-t border-[var(--hairline)] pt-8 sm:grid-cols-3 lg:flex lg:items-center lg:border-l lg:border-t-0 lg:pt-0 lg:divide-x lg:divide-[var(--hairline)]">
          {data.features.map((feature, i) => (
            <FeatureItem
              key={feature.title + feature.sub}
              feature={feature}
              accent={accent}
              delay={index * 0.12 + 0.15 + i * 0.08}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Section ───────────────────────────────────────────────────────────── */
export function EnterpriseControls() {
  return (
    <section data-reveal className="relative overflow-hidden bg-[var(--bg)] py-16 sm:py-20 lg:py-24">
      <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16">
        <div className="max-w-[760px]">
          <h2 className="m-0 font-display text-[clamp(30px,4.4vw,48px)] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--fg-primary)]">
            Built for <span style={{ color: ACCENTS.brand.color }}>teams.</span> Ready for{" "}
            <span style={{ color: ACCENTS.indigo.color }}>scale.</span>
          </h2>
          <p className="m-0 mt-5 max-w-[600px] text-[16px] leading-[1.65] text-[var(--fg-secondary)] sm:text-[17px]">
            {SECTION_SUBTITLE}
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-6 sm:mt-12">
          {CONTROL_CARDS.map((card, i) => (
            <ControlCard key={card.id} data={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default EnterpriseControls;
