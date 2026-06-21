/**
 * SapConnectorPage — template for the 3 SAP connector pages (e-Invoicing,
 * e-Way Bill, GST). A faithful, on-brand conversion of the legacy
 * whitebooks.in/connectors/sap-* pages. Content comes from `connectors.data.ts`.
 */
import { motion } from "framer-motion";
import {
  AlarmClock,
  ArrowRight,
  Boxes,
  Building2,
  CheckCircle2,
  Code2,
  Combine,
  Database,
  FileSearch,
  FileWarning,
  Filter,
  GitBranch,
  Layers,
  Mail,
  MinusCircle,
  Phone,
  Plug,
  Quote,
  RefreshCw,
  ServerCog,
  ShieldCheck,
  Terminal,
  Webhook,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Header, Footer } from "@/layouts/SiteShell";
import { SeoHead } from "@/seo/components/SeoHead";
import { StructuredData } from "@/seo/components/StructuredData";
import { SeoBreadcrumb } from "@/seo/components/SeoBreadcrumb";
import {
  buildJsonLd,
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildSoftwareApplicationSchema,
  buildFAQSchema,
} from "@/seo/schema/generators";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/cn";
import type { SapConnector } from "./connectors.data";
import { CtaButton, EASE, Eyebrow, FaqAccordion, Reveal, Section, SectionHeader, StatStrip } from "./_sections";
import { BeforeAfterStory } from "./BeforeAfterStory";

const ACCENT = "var(--brand)";

/* Icons keyed positionally to the (fixed) enterprise / developer content. */
const ENTERPRISE_ICONS: LucideIcon[] = [
  Boxes,
  Building2,
  Layers,
  RefreshCw,
  AlarmClock,
  Database,
  Combine,
  Filter,
  Webhook,
];
const DEV_ICONS: LucideIcon[] = [Code2, ServerCog, Plug, FileWarning, Terminal, Webhook];
const SOLUTION_ICONS: LucideIcon[] = [Zap, GitBranch, MinusCircle, ShieldCheck];
const PAIN_ICONS: LucideIcon[] = [AlarmClock, FileWarning, FileSearch];

/* ── Hero ─────────────────────────────────────────────────────────────────── */
function Hero({ data }: { data: SapConnector }) {
  const { hero, logo } = data;
  return (
    <section className="relative overflow-hidden border-b border-[var(--hairline)] bg-[var(--bg)] pb-16 pt-[120px] sm:pb-20 sm:pt-[140px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, var(--brand-glow), transparent 70%)" }}
      />
      <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16">
        <div className="mb-7">
          <SeoBreadcrumb items={data.breadcrumb} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex max-w-[820px] flex-col gap-6"
        >
          <span className="inline-flex w-fit items-center gap-2.5 rounded-full border border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_5%,transparent)] px-3 py-1.5">
            <span className="inline-flex h-4 items-center">
              <img src={logo} alt="SAP" className="h-[14px] w-auto object-contain" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-secondary)]">
              {hero.tag}
            </span>
          </span>

          <h1 className="m-0 font-display text-[clamp(34px,5vw,60px)] font-semibold leading-[1.05] tracking-[-0.025em] text-[var(--fg-primary)] text-balance">
            {hero.title}
          </h1>
          <p className="m-0 max-w-[620px] text-[16px] leading-[1.6] text-[var(--fg-secondary)] sm:text-[18px]">
            {hero.sub}
          </p>
          <p className="m-0 font-display text-[15px] font-medium text-[var(--fg-primary)] sm:text-[16px]">
            {hero.support}
          </p>

          <div className="mt-1 flex flex-wrap gap-3">
            <CtaButton cta={hero.primary} />
            <CtaButton cta={hero.secondary} variant="ghost" />
          </div>

          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2.5">
            {hero.badges.map((b) => (
              <span key={b} className="inline-flex items-center gap-2 text-[13px] text-[var(--fg-secondary)]">
                <CheckCircle2 size={15} style={{ color: ACCENT }} />
                {b}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Problem ──────────────────────────────────────────────────────────────── */
function Problem({ data }: { data: SapConnector["problem"] }) {
  return (
    <Section>
      <SectionHeader eyebrow="The problem" heading={data.heading} sub={data.sub} />
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {data.pains.map((p, i) => {
          const Icon = PAIN_ICONS[i] ?? FileWarning;
          return (
            <Reveal key={p.title} delay={i * 0.08}>
              <article className="flex h-full flex-col gap-3 rounded-[20px] border border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_3%,transparent)] p-6">
                <span
                  className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--hairline-strong)]"
                  style={{ background: "color-mix(in srgb, var(--brand) 12%, transparent)" }}
                >
                  <Icon size={18} style={{ color: ACCENT }} />
                </span>
                <span className="font-display text-[26px] font-semibold leading-none tracking-[-0.02em] text-[var(--brand)]">
                  {p.stat}
                </span>
                <h3 className="m-0 text-[15px] font-semibold text-[var(--fg-primary)]">{p.title}</h3>
                <p className="m-0 text-[13.5px] leading-[1.55] text-[var(--fg-secondary)]">{p.body}</p>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.1} className="mt-10">
        <p className="mb-4 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-tertiary)]">
          {data.costHeading}
        </p>
        <StatStrip stats={data.costs} tone="brand" />
      </Reveal>
    </Section>
  );
}

/* ── Solution — 4 steps ───────────────────────────────────────────────────── */
function Solution({ data }: { data: SapConnector["solution"] }) {
  return (
    <Section>
      <SectionHeader eyebrow="The solution" heading={data.heading} sub={data.sub} />
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.steps.map((s, i) => {
          const Icon = SOLUTION_ICONS[i] ?? Zap;
          return (
            <Reveal key={s.title} delay={i * 0.07}>
              <article className="group flex h-full flex-col gap-4 rounded-[20px] border border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_3%,transparent)] p-6 transition-colors duration-300 hover:border-[var(--brand-border)]">
                <div className="flex items-center justify-between">
                  <span
                    className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--hairline-strong)]"
                    style={{ background: "color-mix(in srgb, var(--brand) 12%, transparent)" }}
                  >
                    <Icon size={18} style={{ color: ACCENT }} />
                  </span>
                  <span className="font-mono text-[12px] tracking-[0.1em] text-[var(--fg-tertiary)]">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="m-0 text-[16px] font-semibold text-[var(--fg-primary)]">{s.title}</h3>
                <p className="m-0 text-[13.5px] leading-[1.55] text-[var(--fg-secondary)]">{s.line}</p>
                <div className="mt-auto border-t border-[var(--hairline)] pt-3">
                  <span className="font-display text-[20px] font-semibold tracking-[-0.02em] text-[var(--fg-primary)]">
                    {s.metricValue}
                  </span>
                  <span className="ml-1.5 text-[12px] text-[var(--fg-tertiary)]">{s.metricLabel}</span>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* ── Platform compatibility ───────────────────────────────────────────────── */
function Platforms({ data }: { data: SapConnector["platforms"] }) {
  return (
    <Section>
      <SectionHeader eyebrow="Compatibility" heading={data.heading} sub={data.sub} />
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.cards.map((c, i) => (
          <Reveal key={c.name} delay={i * 0.07}>
            <article className="flex h-full flex-col gap-4 rounded-[20px] border border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_3%,transparent)] p-6">
              <div className="flex items-start justify-between gap-2">
                <h3 className="m-0 font-display text-[17px] font-semibold leading-[1.2] tracking-[-0.01em] text-[var(--fg-primary)]">
                  {c.name}
                </h3>
                <span
                  className="shrink-0 rounded-full px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.1em]"
                  style={{
                    color: ACCENT,
                    background: "color-mix(in srgb, var(--brand) 12%, transparent)",
                  }}
                >
                  {c.tag}
                </span>
              </div>
              <ul className="m-0 flex flex-col gap-2.5 p-0">
                {c.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-[13px] leading-[1.45] text-[var(--fg-secondary)]">
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: ACCENT }} />
                    {pt}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1} className="mt-8 flex flex-col items-center gap-5 text-center">
        <p className="m-0 text-[14px] text-[var(--fg-tertiary)]">{data.extra}</p>
        <CtaButton cta={data.cta} variant="ghost" />
      </Reveal>
    </Section>
  );
}

/* ── How it works — connected layers ──────────────────────────────────────── */
function HowItWorks({ data }: { data: SapConnector["howItWorks"] }) {
  return (
    <Section>
      <SectionHeader eyebrow="Architecture" heading={data.heading} sub={data.sub} />
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {data.layers.map((l, i) => (
          <Reveal key={l.title} delay={i * 0.07}>
            <article className="relative flex h-full flex-col gap-4 rounded-[20px] border border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_3%,transparent)] p-6">
              <div className="flex items-center gap-2.5">
                <span
                  className="grid h-8 w-8 place-items-center rounded-lg font-display text-[14px] font-semibold text-white"
                  style={{ background: ACCENT }}
                >
                  {i + 1}
                </span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-[var(--fg-tertiary)]">
                  {l.label}
                </span>
              </div>
              <h3 className="m-0 font-display text-[17px] font-semibold tracking-[-0.01em] text-[var(--fg-primary)]">
                {l.title}
              </h3>
              <ul className="m-0 flex flex-col gap-2 p-0">
                {l.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-[12.5px] leading-[1.45] text-[var(--fg-secondary)]">
                    <ArrowRight size={13} className="mt-0.5 shrink-0" style={{ color: ACCENT }} />
                    {pt}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ── Enterprise features — icon grid ──────────────────────────────────────── */
function Enterprise({ data }: { data: SapConnector["enterprise"] }) {
  return (
    <Section>
      <SectionHeader eyebrow="Enterprise" heading={data.heading} sub={data.sub} />
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.features.map((f, i) => {
          const Icon = ENTERPRISE_ICONS[i] ?? CheckCircle2;
          return (
            <Reveal key={f.title} delay={(i % 3) * 0.07}>
              <article className="group flex h-full items-start gap-4 rounded-[18px] border border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_3%,transparent)] p-5 transition-colors duration-300 hover:border-[var(--brand-border)]">
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--hairline-strong)]"
                  style={{ background: "color-mix(in srgb, var(--brand) 12%, transparent)" }}
                >
                  <Icon size={18} style={{ color: ACCENT }} />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="m-0 text-[14.5px] font-semibold text-[var(--fg-primary)]">{f.title}</h3>
                  <p className="m-0 text-[12.5px] leading-[1.45] text-[var(--fg-tertiary)]">{f.note}</p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* ── Before / After — cinematic transformation story (fixed-dark stage) ────── */
function BeforeAfter({ data }: { data: SapConnector["beforeAfter"] }) {
  return <BeforeAfterStory data={data} />;
}

/* ── Developer integration ────────────────────────────────────────────────── */
function Developer({ data }: { data: SapConnector["developer"] }) {
  return (
    <Section>
      <SectionHeader eyebrow="For developers" heading={data.heading} sub={data.sub} align="left" />
      <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {data.features.map((f, i) => {
            const Icon = DEV_ICONS[i] ?? Code2;
            return (
              <Reveal key={f.title} delay={(i % 2) * 0.06}>
                <article className="flex h-full flex-col gap-2.5 rounded-[18px] border border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_3%,transparent)] p-5">
                  <span
                    className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--hairline-strong)]"
                    style={{ background: "color-mix(in srgb, var(--brand) 12%, transparent)" }}
                  >
                    <Icon size={16} style={{ color: ACCENT }} />
                  </span>
                  <h3 className="m-0 text-[14px] font-semibold text-[var(--fg-primary)]">{f.title}</h3>
                  <p className="m-0 text-[12.5px] leading-[1.5] text-[var(--fg-tertiary)]">{f.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.08}>
          <div className="overflow-hidden rounded-[20px] border border-white/10 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.8)]">
            <div className="flex items-center gap-2 border-b border-white/10 bg-[#0c0f16] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#f04949]/80" />
              <span className="h-3 w-3 rounded-full bg-[#f5b943]/80" />
              <span className="h-3 w-3 rounded-full bg-[#4ad07a]/80" />
              <span className="ml-2 font-mono text-[11px] text-white/40">generate-einvoice.js</span>
            </div>
            <pre className="m-0 overflow-x-auto bg-[#070a10] p-5 font-mono text-[12.5px] leading-[1.7] text-[#c9c9d8]">
              <code>{data.code}</code>
            </pre>
          </div>
          <div className="mt-6">
            <CtaButton cta={data.cta} variant="ghost" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ── Proven results — case studies ────────────────────────────────────────── */
function Proof({ data }: { data: SapConnector["proof"] }) {
  return (
    <Section>
      <SectionHeader eyebrow="Proof" heading={data.heading} sub={data.sub} />
      <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {data.cases.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08}>
            <article className="flex h-full flex-col gap-4 rounded-[20px] border border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_3%,transparent)] p-6">
              <span
                className="w-fit rounded-full px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.12em]"
                style={{ color: ACCENT, background: "color-mix(in srgb, var(--brand) 12%, transparent)" }}
              >
                {c.sector}
              </span>
              <h3 className="m-0 font-display text-[17px] font-semibold leading-[1.25] tracking-[-0.01em] text-[var(--fg-primary)]">
                {c.title}
              </h3>
              <p className="m-0 text-[14px] font-medium text-[var(--brand)]">{c.headline}</p>
              <div className="grid grid-cols-3 gap-2 border-y border-[var(--hairline)] py-4">
                {c.stats.map((s) => (
                  <div key={s.label} className="flex flex-col gap-1">
                    <span className="font-display text-[15px] font-semibold leading-tight tracking-[-0.01em] text-[var(--fg-primary)]">
                      {s.value}
                    </span>
                    <span className="text-[10.5px] leading-[1.3] text-[var(--fg-tertiary)]">{s.label}</span>
                  </div>
                ))}
              </div>
              <p className="m-0 flex gap-2 text-[13px] italic leading-[1.55] text-[var(--fg-secondary)]">
                <Quote size={15} className="shrink-0 -scale-x-100 opacity-50" style={{ color: ACCENT }} />
                {c.quote}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ── Why it works — numbered logic chain ──────────────────────────────────── */
function Why({ data }: { data: SapConnector["why"] }) {
  return (
    <Section>
      <SectionHeader eyebrow="The logic" heading={data.heading} sub={data.sub} />
      <div className="mx-auto mt-12 flex max-w-[760px] flex-col gap-3">
        {data.steps.map((step, i) => {
          const last = i === data.steps.length - 1;
          return (
            <Reveal key={step} delay={i * 0.06}>
              <div
                className={cn(
                  "flex items-center gap-4 rounded-[16px] border p-4 sm:p-5",
                  last
                    ? "border-[var(--brand-border)] bg-[color-mix(in_srgb,var(--brand)_8%,transparent)]"
                    : "border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_3%,transparent)]",
                )}
              >
                <span
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full font-mono text-[13px] font-semibold"
                  style={
                    last
                      ? { background: ACCENT, color: "#fff" }
                      : { background: "color-mix(in srgb, var(--brand) 12%, transparent)", color: ACCENT }
                  }
                >
                  {i + 1}
                </span>
                <p
                  className={cn(
                    "m-0 text-[14px] leading-[1.5] sm:text-[15px]",
                    last ? "font-semibold text-[var(--fg-primary)]" : "text-[var(--fg-secondary)]",
                  )}
                >
                  {step}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* ── FAQ ──────────────────────────────────────────────────────────────────── */
function Faq({ data }: { data: SapConnector["faq"] }) {
  return (
    <Section>
      <SectionHeader eyebrow="FAQ" heading={data.heading} />
      <FaqAccordion items={data.items} />
    </Section>
  );
}

/* ── Closing CTA ──────────────────────────────────────────────────────────── */
function Closing({ data }: { data: SapConnector["closing"] }) {
  return (
    <Section border={false} className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 60% at 50% 100%, var(--brand-glow), transparent 70%)" }}
      />
      <div className="relative mx-auto flex max-w-[760px] flex-col items-center gap-6 text-center">
        <Eyebrow>Get started</Eyebrow>
        <h2 className="m-0 font-display text-[clamp(28px,4.4vw,46px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--fg-primary)] text-balance">
          {data.heading}
        </h2>
        <p className="m-0 max-w-[560px] text-[15px] leading-[1.6] text-[var(--fg-secondary)] sm:text-[16px]">
          {data.sub}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <CtaButton cta={data.primary} />
          <CtaButton cta={data.secondary} variant="ghost" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13.5px] text-[var(--fg-secondary)]">
          <a href={`tel:${data.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 hover:text-[var(--brand)]">
            <Phone size={14} style={{ color: ACCENT }} />
            {data.phone}
          </a>
          <a href={`mailto:${data.email}`} className="inline-flex items-center gap-2 hover:text-[var(--brand)]">
            <Mail size={14} style={{ color: ACCENT }} />
            {data.email}
          </a>
        </div>
      </div>
      <div className="relative mt-12">
        <StatStrip stats={data.metrics} tone="brand" />
      </div>
    </Section>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export function SapConnectorPage({ data }: { data: SapConnector }) {
  useReveal();
  const { seo } = data;
  const schema = buildJsonLd(
    buildWebPageSchema({ canonicalUrl: seo.canonical, title: seo.title, description: seo.description }),
    buildBreadcrumbSchema(data.breadcrumb),
    buildSoftwareApplicationSchema({
      canonicalUrl: seo.canonical,
      name: seo.title.split(" | ")[0],
      description: seo.description,
      applicationCategory: "BusinessApplication",
      featureList: data.enterprise.features.map((f) => f.title),
    }),
    buildFAQSchema(seo.canonical, data.faq.items.map((f) => ({ question: f.q, answer: f.a }))),
  );

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <SeoHead {...seo} />
      <StructuredData schema={schema} />
      <Header mode="home" />
      <main itemScope itemType="https://schema.org/SoftwareApplication">
        <Hero data={data} />
        <Problem data={data.problem} />
        <Solution data={data.solution} />
        <Platforms data={data.platforms} />
        <HowItWorks data={data.howItWorks} />
        <Enterprise data={data.enterprise} />
        <BeforeAfter data={data.beforeAfter} />
        <Developer data={data.developer} />
        <Proof data={data.proof} />
        <Why data={data.why} />
        <Faq data={data.faq} />
        <Closing data={data.closing} />
      </main>
      <Footer />
    </div>
  );
}

export default SapConnectorPage;
