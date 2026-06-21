// DeveloperExperience.tsx — Section 3 · "Built for developers."
//
// Stripe-Docs / Vercel register. Three columns: copy + language SDKs + CTA
// (left) · an animated code window standing in for a future MP4 (center) ·
// a staggered stack of floating feature cards (right). Composed from the
// shared SectionKit primitives.

import {
  Activity,
  Braces,
  Bug,
  FileJson,
  GitBranch,
  Package,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  CTAButton,
  CodeWindow,
  FeatureCard,
  LanguageIconPlaceholder,
  SectionHeader,
  SectionShell,
  fadeUp,
  staggerParent,
} from "@/components/ui/SectionKit";
import { DEVELOPER_EXPERIENCE, type DeveloperExperienceData } from "./developer-experience.data";

const DEV_ICON: Record<string, LucideIcon> = {
  openapi: Braces,
  sdk: Package,
  sandbox: FlaskConical,
  versioned: GitBranch,
  errors: Bug,
  monitoring: Activity,
};

/* ── CodeAnimationPlaceholder — request → JSON response → success ──────────── */
function CodeAnimationPlaceholder() {
  // TODO: Replace with MP4 animation
  //   request typing → JSON response → success state
  return (
    <CodeWindow title="POST /v1/invoices">
      <pre className="m-0 overflow-x-auto font-mono text-[12.5px] leading-[1.7]">
        <code className="block">
          <span className="text-[var(--brand)]">curl</span>{" "}
          <span className="text-white/80">https://api.whitebooks.in/v1/invoices</span> {"\\"}
          {"\n"}
          <span className="text-white/40"> -H</span>{" "}
          <span className="text-emerald-300">"Authorization: Bearer ••••"</span> {"\\"}
          {"\n"}
          <span className="text-white/40"> -d</span>{" "}
          <span className="text-emerald-300">{'{ "gstin": "29ABCDE1234F1Z5" }'}</span>
        </code>
      </pre>

      <div className="my-4 h-px w-full bg-white/[0.06]" />

      <pre className="m-0 overflow-x-auto font-mono text-[12.5px] leading-[1.7]">
        <code className="block text-white/70">
          <span className="text-sky-300">{"{"}</span>
          {"\n"}
          {"  "}
          <span className="text-white/50">"status"</span>:{" "}
          <span className="text-emerald-300">"success"</span>,{"\n"}
          {"  "}
          <span className="text-white/50">"irn"</span>:{" "}
          <span className="text-emerald-300">"a1b2c3…"</span>
          <motion.span
            aria-hidden
            className="ml-0.5 inline-block h-[14px] w-[7px] translate-y-[2px] bg-[var(--brand)]"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          />
          {"\n"}
          <span className="text-sky-300">{"}"}</span>
        </code>
      </pre>

      <div className="mt-4 flex items-center gap-2">
        <motion.span
          className="h-2 w-2 rounded-full bg-emerald-400"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="font-mono text-[11px] text-white/45">200 OK · 142ms · IRN generated</span>
      </div>
    </CodeWindow>
  );
}

export function DeveloperExperience({ data = DEVELOPER_EXPERIENCE }: { data?: DeveloperExperienceData }) {
  return (
    <SectionShell>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)_minmax(0,0.9fr)] lg:items-center lg:gap-10">
        {/* Left — copy + languages + CTA */}
        <div className="flex flex-col gap-7">
          <SectionHeader eyebrow={data.eyebrow} title={data.title} subtitle={data.subtitle} />
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--fg-tertiary)]">
              SDKs & languages
            </span>
            <motion.div
              variants={staggerParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-wrap gap-2"
            >
              {data.languages.map((l) => (
                <LanguageIconPlaceholder key={l.name} name={l.name} src={l.src} />
              ))}
            </motion.div>
          </div>
          <CTAButton href={data.cta.href}>{data.cta.label}</CTAButton>
        </div>

        {/* Center — animated code window */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
          <CodeAnimationPlaceholder />
        </motion.div>

        {/* Right — floating feature cards */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col gap-3"
        >
          {data.features.map((f, i) => {
            const Icon = DEV_ICON[f.icon] ?? FileJson;
            return (
              <FeatureCard
                key={f.title}
                index={i}
                icon={<Icon size={19} />}
                title={f.title}
                description={f.detail}
              />
            );
          })}
        </motion.div>
      </div>
    </SectionShell>
  );
}

export default DeveloperExperience;
