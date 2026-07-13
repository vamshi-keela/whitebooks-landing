// ApiArchitecture.tsx — Section 4 · "Enterprise Architecture".
//
// Stripe-Radar / AWS-architecture register. Split screen: an animated
// architecture canvas (left) — a vertical pipeline of nodes joined by flowing
// connection lines — paired with copy, CTA and a 2×2 grid of capability cards
// (right). Composed from the shared SectionKit primitives.

import {
  Activity,
  Cpu,
  FileCheck2,
  Gauge,
  Globe,
  Lock,
  Network,
  ScrollText,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  CTAButton,
  ConnectionLine,
  GlassPanel,
  NodeCard,
  SectionHeader,
  SectionShell,
  fadeUp,
  staggerParent,
  BRAND,
} from "@/shared/ui/SectionKit";
import {
  API_ARCHITECTURE,
  type ApiArchitectureData,
  type CapabilityCardData,
  type PipelineNode,
} from "./api-architecture.data";

const PIPELINE_ICON: Record<string, LucideIcon> = {
  requests: Globe,
  balancer: Network,
  core: Cpu,
  compliance: ShieldCheck,
  audit: ScrollText,
  monitoring: Activity,
};

const CAPABILITY_ICON: Record<string, LucideIcon> = {
  security: Lock,
  scaling: Gauge,
  compliance: FileCheck2,
  teams: Users,
};

/* ── ArchitectureCanvas — animated vertical pipeline (future MP4) ───────────── */
function ArchitectureCanvas({ pipeline }: { pipeline: PipelineNode[] }) {
  // TODO: Replace with MP4 animation
  //   Traffic → API Core → Compliance → Audit → Success
  return (
    <GlassPanel className="relative overflow-hidden p-6 sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(60% 50% at 50% 30%, rgba(220,47,101,0.08), transparent 70%)" }}
      />
      <span className="relative z-10 rounded-full border border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_8%,transparent)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--fg-secondary)] backdrop-blur">
        Architecture
      </span>
      <div className="relative z-10 mt-6 flex flex-col items-center">
        {pipeline.map((node, i) => {
          const Icon = PIPELINE_ICON[node.icon] ?? Cpu;
          const isCore = node.icon === "core";
          return (
            <div key={node.label} className="flex w-full max-w-[320px] flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                className="w-full"
              >
                <NodeCard
                  icon={<Icon size={17} />}
                  label={node.label}
                  sublabel={node.sublabel}
                  active={isCore}
                  pulse={isCore}
                  className="w-full"
                />
              </motion.div>
              {i < pipeline.length - 1 && <ConnectionLine length={24} delay={i * 0.18} className="my-1.5" />}
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
}

/* ── CapabilityCard — title + bullet items (glass, hover scale) ─────────────── */
function CapabilityCard({ data, index }: { data: CapabilityCardData; index: number }) {
  const Icon = CAPABILITY_ICON[data.icon] ?? ShieldCheck;
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col gap-3 rounded-[22px] border border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_4%,transparent)] p-5 backdrop-blur-xl transition-colors duration-300 hover:border-[var(--hairline-bright)] hover:bg-[color-mix(in_srgb,var(--fg-primary)_7%,transparent)]"
    >
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-xl border border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_5%,transparent)] text-[var(--brand)] transition-colors duration-300 group-hover:border-[var(--brand)]/40">
          <Icon size={17} />
        </span>
        <h3 className="m-0 text-[15px] font-semibold text-[var(--fg-primary)]">{data.title}</h3>
      </div>
      <ul className="m-0 flex flex-col gap-1.5 p-0">
        {data.items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-[13px] leading-[1.4] text-[var(--fg-secondary)]">
            <span className="h-1 w-1 shrink-0 rounded-full" style={{ background: BRAND }} />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function ApiArchitecture({ data = API_ARCHITECTURE }: { data?: ApiArchitectureData }) {
  return (
    <SectionShell>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Left — architecture canvas */}
        <div className="order-2 lg:order-1">
          <ArchitectureCanvas pipeline={data.pipeline} />
        </div>

        {/* Right — copy, CTA, capability cards */}
        <div className="order-1 flex flex-col gap-8 lg:order-2">
          <SectionHeader eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />
          <CTAButton href={data.cta.href}>{data.cta.label}</CTAButton>
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {data.capabilities.map((c, i) => (
              <CapabilityCard key={c.title} data={c} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </SectionShell>
  );
}

export default ApiArchitecture;
