// IntegrationPartners.tsx — Section 2 · "Integrations Ecosystem".
//
// Stripe-ecosystem register. Three stacked layers connected by animated lines:
//   1) partner logo grid  →  2) WhiteBooks Integration Layer (animated hub with
//   API nodes)  →  3) destination systems.
// The hub itself is the live animation, so no static video frame is needed —
// it is built from the shared primitives (LogoGrid, FloatingCard, NodeCard,
// ConnectionLine). Swap the hub block for an MP4 later if desired.

import {
  Boxes,
  Calculator,
  Code2,
  FileText,
  Landmark,
  ShoppingBag,
  Store,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  CTAButton,
  ConnectionLine,
  FloatingCard,
  GlassPanel,
  LogoGrid,
  NodeCard,
  SectionHeader,
  SectionShell,
  fadeUp,
  staggerParent,
} from "@/shared/ui/SectionKit";
import {
  INTEGRATION_PARTNERS,
  type ApiNode as ApiNodeData,
  type DestinationNode,
  type IntegrationPartnersData,
} from "./integration-partners.data";
import logoWhiteBooks from "@/assets/logo-white-books.svg";
import { useTheme } from "@/contexts/ThemeContext";

const API_ICON: Record<string, LucideIcon> = {
  gst: Landmark,
  einvoice: FileText,
  eway: Truck,
};

const DEST_ICON: Record<string, LucideIcon> = {
  erp: Boxes,
  pos: Store,
  accounting: Calculator,
  custom: Code2,
  marketplace: ShoppingBag,
};

/* ── Vertical connector between layers ─────────────────────────────────────── */
function LayerConnector() {
  return (
    <div className="flex justify-center py-1">
      <ConnectionLine length={48} />
    </div>
  );
}

/* ── ApiNode — a floating API capsule inside the hub ──────────────────────── */
function ApiNode({ node, delay }: { node: ApiNodeData; delay: number }) {
  const Icon = API_ICON[node.icon] ?? FileText;
  return (
    <FloatingCard delay={delay} amplitude={6} className="flex items-center gap-2.5 !px-4 !py-3">
      <span className="grid h-8 w-8 place-items-center rounded-xl border border-[var(--brand)]/30 bg-[var(--brand)]/10 text-[var(--brand)]">
        <Icon size={16} />
      </span>
      <span className="text-[13.5px] font-semibold text-[var(--fg-primary)]">{node.label}</span>
    </FloatingCard>
  );
}

/* ── IntegrationHub — the animated centre layer ───────────────────────────── */
function IntegrationHub({ data }: { data: IntegrationPartnersData }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <GlassPanel className="relative overflow-hidden px-6 py-10 sm:px-10">
      {/* elegant core glow — subtle, not a blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(50% 60% at 50% 50%, rgba(220,47,101,0.10), transparent 70%)" }}
      />
      <div className="relative flex flex-col items-center gap-7">
        <div className="flex items-center gap-3">
          <img
            src={logoWhiteBooks}
            alt="WhiteBooks"
            className="h-9 w-auto"
            style={{ filter: isDark ? 'none' : 'invert(1)' }}

          />
          <h3 className="m-0 font-display text-[18px] font-semibold tracking-[-0.01em] text-[var(--fg-primary)] sm:text-[20px]">
            {data.hubTitle}
          </h3>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {data.apiNodes.map((n, i) => (
            <ApiNode key={n.label} node={n} delay={i * 0.4} />
          ))}
        </div>
      </div>
    </GlassPanel>
  );
}

/* ── Destination layer ─────────────────────────────────────────────────────── */
function DestinationNodes({ destinations }: { destinations: DestinationNode[] }) {
  return (
    <motion.div
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
    >
      {destinations.map((d) => {
        const Icon = DEST_ICON[d.icon] ?? Boxes;
        return (
          <motion.div key={d.label} variants={fadeUp} whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
            <NodeCard icon={<Icon size={17} />} label={d.label} className="h-full" />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export function IntegrationPartners({ data = INTEGRATION_PARTNERS }: { data?: IntegrationPartnersData }) {
  return (
    <SectionShell>
      <SectionHeader
        align="center"
        eyebrow={data.eyebrow}
        title={data.title}
        subtitle={data.subtitle}
        className="mx-auto"
      />

      <div className="mt-14 flex flex-col">
        {/* Layer 1 — partner logos */}
        <p className="mb-5 text-center text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--fg-secondary)]">
          {data.partnersLabel}
        </p>
        <LogoGrid logos={data.partners} />
        <LayerConnector />
        {/* Layer 2 — integration hub */}
        <IntegrationHub data={data} />
        <LayerConnector />
        {/* Layer 3 — destinations */}
        <DestinationNodes destinations={data.destinations} />
      </div>

      <div className="mt-12 flex justify-center">
        <CTAButton href={data.cta.href}>
          {data.cta.label}
        </CTAButton>
      </div>
    </SectionShell>
  );
}

export default IntegrationPartners;
