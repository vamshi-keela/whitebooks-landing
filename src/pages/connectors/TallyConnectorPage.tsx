/**
 * TallyConnectorPage — template for the 2 Tally connector pages (e-Invoice,
 * e-Way Bill). A faithful, on-brand conversion of the legacy
 * whitebooks.in/connectors/tally-* pages. Content from `connectors.data.ts`.
 */
import { motion } from "framer-motion";
import { CheckCircle2, Download, FileCheck2, MousePointerClick, QrCode } from "lucide-react";
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
import type { FeatureBlock, TallyConnector } from "./connectors.data";
import { CtaButton, EASE, Eyebrow, FaqAccordion, Reveal, Section, SectionHeader } from "./_sections";

const ACCENT = "var(--brand)";
const STEP_ICONS = [Download, FileCheck2, MousePointerClick];

/* ── Hero ─────────────────────────────────────────────────────────────────── */
function Hero({ data }: { data: TallyConnector }) {
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
              <img src={logo} alt="Tally" className="h-[14px] w-auto object-contain" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-secondary)]">
              {hero.tag}
            </span>
          </span>

          <h1 className="m-0 font-display text-[clamp(32px,5vw,58px)] font-semibold leading-[1.06] tracking-[-0.025em] text-[var(--fg-primary)] text-balance">
            {hero.title}
          </h1>
          <p className="m-0 max-w-[620px] text-[16px] leading-[1.6] text-[var(--fg-secondary)] sm:text-[18px]">
            {hero.sub}
          </p>
          <p className="m-0 text-[14px] text-[var(--fg-tertiary)]">{hero.support}</p>

          <div className="mt-1">
            <CtaButton cta={hero.primary} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── 3-step setup ─────────────────────────────────────────────────────────── */
function Setup({ data }: { data: TallyConnector["setup"] }) {
  return (
    <Section>
      <SectionHeader eyebrow="3-click setup" heading={data.heading} />
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {data.steps.map((s, i) => {
          const Icon = STEP_ICONS[i] ?? CheckCircle2;
          return (
            <Reveal key={s.n} delay={i * 0.08}>
              <article className="relative flex h-full flex-col gap-4 rounded-[20px] border border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_3%,transparent)] p-6">
                <div className="flex items-center justify-between">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl border border-[var(--hairline-strong)]"
                    style={{ background: "color-mix(in srgb, var(--brand) 12%, transparent)" }}
                  >
                    <Icon size={20} style={{ color: ACCENT }} />
                  </span>
                  <span className="font-display text-[30px] font-semibold leading-none tracking-[-0.03em] text-[var(--hairline-bright)]">
                    {s.n}
                  </span>
                </div>
                <p className="m-0 text-[14.5px] leading-[1.5] text-[var(--fg-secondary)]">{s.text}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={0.12} className="mt-8 flex justify-center">
        <CtaButton cta={data.cta} />
      </Reveal>
    </Section>
  );
}

/* ── Abstract preview for a feature block (no real screenshot yet) ─────────── */
function FeaturePreview({ block }: { block: FeatureBlock }) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 blur-3xl"
        style={{ background: "radial-gradient(circle at 50% 50%, var(--brand-glow), transparent 65%)" }}
      />
      <div className="overflow-hidden rounded-[22px] border border-[var(--hairline-strong)] bg-[var(--bg-card)] shadow-[0_40px_100px_-50px_rgba(0,0,0,0.7)]">
        <div className="flex items-center justify-between border-b border-[var(--hairline)] px-5 py-3.5">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em]" style={{ color: ACCENT }}>
            {block.eyebrow}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/12 px-2 py-0.5 text-[10px] font-medium text-emerald-500">
            <span className="h-1 w-1 rounded-full bg-emerald-500" /> Synced
          </span>
        </div>
        <div className="flex flex-col gap-3 p-5">
          {block.bullets.map((b) => (
            <div key={b} className="flex items-center gap-3 rounded-xl border border-[var(--hairline)] bg-[color-mix(in_srgb,var(--fg-primary)_3%,transparent)] px-3.5 py-3">
              <CheckCircle2 size={15} className="shrink-0" style={{ color: ACCENT }} />
              <span className="text-[12.5px] text-[var(--fg-secondary)]">{b}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Alternating feature blocks ───────────────────────────────────────────── */
function FeatureBlocks({ features }: { features: FeatureBlock[] }) {
  return (
    <Section>
      <div className="flex flex-col gap-16 lg:gap-24">
        {features.map((f, i) => {
          const flip = i % 2 === 1;
          return (
            <Reveal key={f.title} delay={0.04}>
              <div
                className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${flip ? "lg:[direction:rtl]" : ""}`}
              >
                <div className="flex flex-col gap-5 lg:[direction:ltr]">
                  <Eyebrow>{f.eyebrow}</Eyebrow>
                  <h3 className="m-0 font-display text-[clamp(22px,3vw,32px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--fg-primary)] text-balance">
                    {f.title}
                  </h3>
                  <p className="m-0 max-w-[480px] text-[15px] leading-[1.6] text-[var(--fg-secondary)]">{f.body}</p>
                  <ul className="m-0 flex flex-col gap-2.5 p-0">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-[13.5px] leading-[1.5] text-[var(--fg-secondary)]">
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: ACCENT }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-1">
                    <CtaButton cta={f.cta} variant="ghost" />
                  </div>
                </div>
                <div className="lg:[direction:ltr]">
                  <FeaturePreview block={f} />
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* ── QR / print parameters (e-Invoice only) ───────────────────────────────── */
function Params({ data }: { data: NonNullable<TallyConnector["params"]> }) {
  return (
    <Section>
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
        <div className="flex flex-col gap-5">
          <Eyebrow>QR & print</Eyebrow>
          <h2 className="m-0 font-display text-[clamp(24px,3.4vw,36px)] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--fg-primary)] text-balance">
            {data.heading}
          </h2>
          <p className="m-0 max-w-[480px] text-[15px] leading-[1.6] text-[var(--fg-secondary)]">{data.body}</p>
          {/* <div
            aria-hidden
            className="grid h-28 w-28 place-items-center rounded-[20px] border border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_3%,transparent)]"
          >
            <QrCode size={56} style={{ color: ACCENT }} />
          </div> */}
          <div>
            <CtaButton cta={data.cta} variant="ghost" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {data.items.map((item, i) => (
            <Reveal key={item} delay={(i % 2) * 0.05}>
              <div className="flex items-start gap-3 rounded-[16px] border border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_3%,transparent)] p-4">
                <span className="font-mono text-[11px] tracking-[0.08em]" style={{ color: ACCENT }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[13px] leading-[1.45] text-[var(--fg-secondary)]">{item}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ── FAQ ──────────────────────────────────────────────────────────────────── */
function Faq({ data }: { data: TallyConnector["faq"] }) {
  return (
    <Section>
      <SectionHeader eyebrow="FAQ" heading={data.heading} />
      <FaqAccordion items={data.items} />
    </Section>
  );
}

/* ── Closing ──────────────────────────────────────────────────────────────── */
function Closing({ data }: { data: TallyConnector["closing"] }) {
  return (
    <Section border={false} className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 60% at 50% 100%, var(--brand-glow), transparent 70%)" }}
      />
      <div className="relative mx-auto flex max-w-[680px] flex-col items-center gap-6 text-center">
        <div className="flex flex-col items-center gap-1">
          <span className="font-display text-[clamp(36px,6vw,56px)] font-semibold leading-none tracking-[-0.03em] text-[var(--brand)]">
            {data.stat.value}
          </span>
          <span className="text-[13px] text-[var(--fg-tertiary)]">{data.stat.label}</span>
        </div>
        <h2 className="m-0 font-display text-[clamp(26px,4.4vw,42px)] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--fg-primary)] text-balance">
          {data.heading}
        </h2>
        <p className="m-0 max-w-[520px] text-[15px] leading-[1.6] text-[var(--fg-secondary)] sm:text-[16px]">
          {data.sub}
        </p>
        <CtaButton cta={data.primary} />
      </div>
    </Section>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
export function TallyConnectorPage({ data }: { data: TallyConnector }) {
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
      featureList: data.features.map((f) => f.title),
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
        <Setup data={data.setup} />
        <FeatureBlocks features={data.features} />
        {data.params && <Params data={data.params} />}
        <Faq data={data.faq} />
        <Closing data={data.closing} />
      </main>
      <Footer />
    </div>
  );
}

export default TallyConnectorPage;
