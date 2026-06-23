"use client";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion } from "framer-motion";
import { PillButton } from "@/components/ui/PillButton";
import {
  FEATURE_BASE,
  SHOWCASE_HEADER,
  SHOWCASE_PRIMARY_CTA,
  type ShowcaseCategory,
  type ShowcaseCta,
  type ShowcaseMetric,
  type ShowcaseTab,
} from "../data/accouting-platform-showcase.data";

/* ──────────────────────────────────────────────────────────────────────────
 * PlatformShowcase
 * Three columns — left category rail · middle card content · right 3:4 media.
 * Scroll drives the active category (FeatureGuide mechanic); the sub-feature
 * pills inside a category swap content + preview without moving scroll.
 * ──────────────────────────────────────────────────────────────────────── */

const EASE = [0.22, 0.7, 0.2, 1] as const;
const STEP_VH = 70;
const FLATTEN_AT = 1100; // below this width: no scroll progression, click-driven

const href = (path: string) => (/^https?:/.test(path) ? path : `${FEATURE_BASE}${path}`);

/* Bundle every product image so `media.poster` strings resolve to hashed URLs.
   Posters are authored as "@assets/product-images/…"; map that onto the real
   "../assets/product-images/…" module keys Vite produces. */
const POSTER_URLS = import.meta.glob<string>("../assets/product-images/**/*.{png,jpg,jpeg,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

const resolvePoster = (poster?: string): string | undefined =>
  poster ? POSTER_URLS[poster.replace(/^@assets\//, "../assets/")] : undefined;

/* ── Small inline check ───────────────────────────────────────────────────── */
function CheckMark() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0">
      <path
        d="M3.5 8.5l3 3 6-7"
        fill="none"
        stroke="var(--brand)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Category rail — vertical, numbered, scroll-synced ────────────────────── */
function CategoryRail({
  categories,
  active,
  onSelect,
}: {
  categories: ShowcaseCategory[];
  active: number;
  onSelect: (i: number) => void;
}) {
  const progressStyle = {
    "--steps": categories.length,
    "--idx": active,
  } as CSSProperties;

  return (
    <nav className="relative flex flex-col gap-0.5" aria-label="Platform categories">
      {categories.map((c, i) => {
        const isActive = i === active;
        return (
          <button
            key={c.id}
            type="button"
            aria-current={isActive ? "true" : undefined}
            onClick={() => onSelect(i)}
            className={[
              "group relative grid items-center gap-3 rounded-md border-0 bg-transparent px-3 py-[11px] text-left",
              "[grid-template-columns:14px_28px_1fr] transition-colors duration-200",
              isActive ? "text-brand" : "text-muted hover:bg-white/[0.02] hover:text-secondary",
            ].join(" ")}
          >
            {isActive && (
              <motion.span
                layoutId="showcase-rail-active"
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-md bg-[linear-gradient(90deg,rgba(220,47,101,0.12),transparent_70%)]"
                transition={{ type: "spring", stiffness: 480, damping: 40 }}
              />
            )}
            <span
              aria-hidden="true"
              className={[
                "h-2 w-2 justify-self-center rounded-[2px] transition-all duration-200",
                isActive
                  ? "scale-105 bg-brand shadow-[0_0_0_3px_rgba(220,47,101,0.18),0_0_12px_rgba(220,47,101,0.8)]"
                  : "bg-white/12 group-hover:bg-brand/50",
              ].join(" ")}
            />
            <span
              className={[
                "font-mono text-[10.5px] tracking-[0.10em]",
                isActive ? "text-brand" : "text-white/25",
              ].join(" ")}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-mono text-[11px] uppercase leading-[1.4] tracking-[0.10em]">
              {c.label}
            </span>
          </button>
        );
      })}

      {/* progress spine */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[18px] left-[19px] top-[18px] w-px bg-[linear-gradient(180deg,rgba(220,47,101,0.10),rgba(220,47,101,0.04))]"
        style={progressStyle}
      >
        <div
          className="absolute left-0 top-0 w-px bg-[linear-gradient(180deg,var(--brand),rgba(220,47,101,0.4))] shadow-[0_0_6px_rgba(220,47,101,0.55)] transition-[height] duration-[420ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]"
          style={{ height: "calc((var(--idx) + 1) / var(--steps) * 100%)" }}
        />
      </div>
    </nav>
  );
}

/* ── Category pills — horizontal nav (tablet / mobile) ────────────────────── */
function CategoryPills({
  categories,
  active,
  onSelect,
}: {
  categories: ShowcaseCategory[];
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Platform categories"
      className="-mx-6 flex gap-1.5 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {categories.map((c, i) => {
        const isActive = i === active;
        return (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(i)}
            className={[
              "relative shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-medium transition-colors duration-200",
              isActive
                ? "border-transparent text-[#0d0d14]"
                : "border-white/10 text-secondary hover:border-white/20",
            ].join(" ")}
          >
            {isActive && (
              <motion.span
                layoutId="showcase-pill"
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-full bg-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)]"
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              />
            )}
            {c.label}
          </button>
        );
      })}
    </div>
  );
}

/* ── Social-proof badges ──────────────────────────────────────────────────── */
function SocialProofBadges({ proof }: { proof: ShowcaseCategory["proof"] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {proof.map((p) => (
        <div key={p.value + p.label} className="flex items-baseline gap-1.5">
          <span className="font-display text-[15px] font-semibold tracking-[-0.01em] text-[var(--text)]">
            {p.value}
          </span>
          <span className="text-[12px] text-muted">{p.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Sub-feature pills (swap content + preview) ───────────────────────────── */
function FeatureTabs({
  tabs,
  active,
  onSelect,
  layoutId,
}: {
  tabs: ShowcaseTab[];
  active: number;
  onSelect: (i: number) => void;
  layoutId: string;
}) {
  return (
    <div
      role="tablist"
      aria-label="Sub-features"
      className="-mx-6 flex gap-2 overflow-x-auto px-6 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden"
    >
      {tabs.map((t, i) => (
        <PillButton key={t.id} isActive={i === active} onClick={() => onSelect(i)} layoutId={layoutId}>
          {t.label}
        </PillButton>
      ))}
    </div>
  );
}

/* ── CTA row — primary + per-card "More features" ─────────────────────────── */
function CardCtas({ cta }: { cta: ShowcaseCta }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <motion.a
        href={SHOWCASE_PRIMARY_CTA.href}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        transition={{ duration: 0.18, ease: EASE }}
        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_10px_30px_-10px_var(--brand)] hover:shadow-[0_14px_36px_-10px_var(--brand)]"
      >
        {SHOWCASE_PRIMARY_CTA.label}
        <span aria-hidden="true">→</span>
      </motion.a>
      {/* <motion.a
        href={href(cta.href)}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        transition={{ duration: 0.18, ease: EASE }}
        className="group inline-flex items-center justify-center gap-2 rounded-full border border-brand/40 bg-brand/[0.06] px-5 py-2.5 text-[13.5px] font-medium text-[var(--text)] hover:border-brand/70"
      >
        {cta.label}
        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
          →
        </span>
      </motion.a> */}
    </div>
  );
}

/* ── Card content (middle column) — keyed mount animation, no exit gap ────── */
function CardContent({ category, tab }: { category: ShowcaseCategory; tab: ShowcaseTab }) {
  return (
    <motion.div
      key={`${category.id}-${tab.id}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="flex flex-col gap-0"
    >
      <span className="w-fit rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-secondary mb-2">
        {tab.badge}
      </span>
      <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-brand">
        {category.heading}
      </span>
      <div className="flex-col gap-0">
        <h3 className="font-display text-[clamp(20px,2.1vw,26px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--text)] [text-wrap:balance]">
          {tab.title}
        </h3>
        <p className="text-[14px] font-medium text-secondary">{tab.subtitle}</p>
      </div>
      <p className="max-w-[440px] text-[14px] leading-[1.55] text-muted">{tab.description}</p>
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {tab.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-[13px] leading-[1.45] text-secondary">
            <CheckMark />
            {b}
          </li>
        ))}
      </ul>
      <div className="pt-1">
        <CardCtas cta={tab.cta} />
      </div>
    </motion.div>
  );
}

/* ── Floating glass metric card ───────────────────────────────────────────── */
const METRIC_SLOT: Record<ShowcaseMetric["slot"], string> = {
  "top-right": "-right-5 top-6",
  "bottom-left": "-left-8 bottom-24",
  "bottom-right": "-right-5 bottom-8",
};

function MetricCard({ metric, index }: { metric: ShowcaseMetric; index: number }) {
  return (
    <motion.div
      className={`absolute z-20 ${METRIC_SLOT[metric.slot]} rounded-2xl border border-white/12 bg-white/[0.07] px-3 py-2 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
      transition={{
        opacity: { duration: 0.4, delay: 0.15 + index * 0.08 },
        scale: { duration: 0.4, delay: 0.15 + index * 0.08 },
        y: { duration: 4 + index, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 },
      }}
    >
      <div className="flex items-baseline gap-1.5">
        <span className="font-display text-[14px] font-semibold leading-none tracking-[-0.01em] text-[var(--text)]">
          {metric.value}
        </span>
        {metric.note && (
          <span className="rounded-full bg-brand/15 px-1.5 py-0.5 text-[9.5px] font-medium text-brand">
            {metric.note}
          </span>
        )}
      </div>
      <div className="mt-0.5 text-[10.5px] text-muted">{metric.label}</div>
    </motion.div>
  );
}

/* ── Animated 3:4 preview placeholder (no browser chrome) ─────────────────── */
function AnimatedPreviewPlaceholder({ tab, counter }: { tab: ShowcaseTab; counter: string }) {
  const poster = resolvePoster(tab.media.poster);

  // With a real image, let it render at its natural width/height — no fixed 3:4
  // box, no cropping. The frame sizes itself to the image.
  if (poster) {
    return (
      <div className="relative mx-auto w-fit max-w-full">
        <motion.img
          key={tab.id}
          src={poster}
          alt={tab.media.label}
          loading="lazy"
          decoding="async"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="block h-auto w-auto max-w-full"
        />
        {/* <span className="absolute left-5 top-5 z-10 font-mono text-[10.5px] uppercase tracking-[0.14em] text-brand">
          {counter}
        </span> */}
      </div>
    );
  }

  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-[280px]">
      <div className="absolute inset-0 overflow-hidden rounded-[32px] p-px">
        {/* spinning conic ring = animated border */}
        <motion.div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[170%] w-[170%] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, rgba(220,47,101,0.55) 12%, transparent 30%, transparent 60%, rgba(220,47,101,0.25) 72%, transparent 88%)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />
        {/* inner glass surface */}
        <div className="relative h-full w-full overflow-hidden rounded-[31px] bg-[linear-gradient(160deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))] backdrop-blur-xl">
          <div className="noise" aria-hidden="true" />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(220,47,101,0.18), transparent 62%)",
            }}
          />

          <span className="absolute left-5 top-5 z-10 font-mono text-[10.5px] uppercase tracking-[0.14em] text-brand">
            {counter}
          </span>

          {/* placeholder content per tab — keyed mount animation */}
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center"
          >
            <motion.span
              whileHover={{ scale: 1.06 }}
              className="grid h-16 w-16 place-items-center rounded-full border border-white/15 bg-white/10 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.6)] backdrop-blur"
            >
              <span
                aria-hidden="true"
                className="ml-0.5 h-0 w-0 border-y-[9px] border-l-[15px] border-y-transparent border-l-white"
              />
            </motion.span>
            <div>
              <div className="font-display text-[16px] font-semibold tracking-[-0.01em] text-[var(--text)]">
                {tab.media.label}
              </div>
              <div className="mt-1 px-2 text-[12px] leading-[1.45] text-muted">
                {tab.subtitle}
              </div>
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10.5px] font-medium uppercase tracking-[0.12em] text-muted">
              Preview coming soon
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ── Visual column: 3:4 preview + floating metrics ────────────────────────── */
function PreviewColumn({
  category,
  tab,
  counter,
}: {
  category: ShowcaseCategory;
  tab: ShowcaseTab;
  counter: string;
}) {
  return (
    <div className="relative w-[280px] max-w-full">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 -z-10 blur-3xl"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(220,47,101,0.16), transparent 65%)",
        }}
      />
      <AnimatedPreviewPlaceholder tab={tab} counter={counter} />
      {/* {category.metrics.map((m, i) => (
        <MetricCard key={`${category.id}-${m.slot}`} metric={m} index={i} />
      ))} */}
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────────────────── */
export function PlatformShowcase({ heading, categories }: { heading?: ReactNode, categories: ShowcaseCategory[] }) {
  const [activeCat, setActiveCat] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const outerRef = useRef<HTMLElement>(null);
  const STEPS = categories.length;

  const category = categories[activeCat];
  const tab = category.tabs[activeTab] ?? category.tabs[0];
  const counter = `${String(activeTab + 1).padStart(2, "0")} / ${String(category.tabs.length).padStart(2, "0")}`;

  // Reset sub-feature when the category changes (scroll or click).
  useEffect(() => {
    setActiveTab(0);
  }, [activeCat]);

  // Scroll-driven category progression (FeatureGuide mechanic).
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    let raf: number | null = null;

    const compute = () => {
      raf = null;
      if (window.innerWidth <= FLATTEN_AT) return; // click-driven below this width
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const scrolled = Math.max(0, Math.min(total, -rect.top));
      const progress = scrolled / total;
      const idx = Math.min(STEPS - 1, Math.max(0, Math.floor(progress * STEPS + 0.0001)));
      setActiveCat((prev) => (prev === idx ? prev : idx));
    };

    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [STEPS]);

  const onRailClick = (i: number) => {
    setActiveCat(i);
    if (window.innerWidth <= FLATTEN_AT) return;
    const el = outerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    if (total <= 0) return;
    const targetTop = window.scrollY + rect.top + (total * (i + 0.5)) / STEPS;
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  };

  const headerBlock = (
    <div className="max-w-[760px]">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
        {SHOWCASE_HEADER.eyebrow}
      </p>
      <h2 className="mt-3 font-display text-[clamp(24px,3vw,38px)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text)] [text-wrap:balance]">
        {heading ?? SHOWCASE_HEADER.heading}
      </h2>
      <p className="mt-3 max-w-[560px] text-[14.5px] leading-[1.55] text-secondary">
        {SHOWCASE_HEADER.subtitle}
      </p>
    </div>
  );

  return (
    <section
      ref={outerRef}
      data-reveal
      className="relative bg-[linear-gradient(180deg,transparent,rgba(220,47,101,0.03)_50%,transparent)] max-[1100px]:!min-h-0"
      style={{ minHeight: `calc(${STEPS} * ${STEP_VH}vh + 50vh)` }}
    >
      {/* Header — normal flow, scrolls away before the canvas pins. Common to both layouts. */}
      <div className="mx-auto w-full max-w-[1280px] px-6 pt-16 sm:px-10">
        {headerBlock}
        <div className="mt-8 min-[1101px]:hidden">
          <CategoryPills categories={categories} active={activeCat} onSelect={onRailClick} />
        </div>
      </div>

      {/* ── Desktop: pinned two-column canvas (rail | pills + content/image row) ── */}
      <div className="sticky top-[80px] hidden h-[calc(100vh-80px)] items-center min-[1101px]:flex">
        <div className="mx-auto w-full max-w-[1280px] px-10">
          <div className="grid grid-cols-[220px_minmax(0,1fr)] items-start gap-16">
            {/* Left column — category rail + proof */}
            <div className="pt-1">
              <CategoryRail categories={categories} active={activeCat} onSelect={onRailClick} />
              <motion.div
                key={`${category.id}-proof`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="mt-6 border-t border-white/[0.07] pt-5"
              >
                <SocialProofBadges proof={category.proof} />
              </motion.div>
            </div>

            {/* Right column — 1st child: pills · 2nd child: row[content+ctas, image] */}
            <div className="flex min-w-0 flex-col gap-7">
              <FeatureTabs
                key={`${category.id}-tabs`}
                tabs={category.tabs}
                active={activeTab}
                onSelect={setActiveTab}
                layoutId="showcase-subtab-desktop"
              />
              <div className="flex flex-row items-center gap-12 border-t border-white/[0.07] pt-7">
                <div className="min-w-0 flex-1">
                  <CardContent category={category} tab={tab} />
                </div>
                <div className="shrink-0">
                  <PreviewColumn category={category} tab={tab} counter={counter} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile / tablet: stacked, click-driven — preview first ───────────── */}
      <div className="px-6 pb-16 min-[1101px]:hidden">
        <div className="mx-auto w-full max-w-[480px]">
          <FeatureTabs key={`${category.id}-tabs-m`} tabs={category.tabs} active={activeTab} onSelect={setActiveTab} layoutId="showcase-subtab-mobile" />
          <div className="mt-7">
            <PreviewColumn category={category} tab={tab} counter={counter} />
          </div>
          <div className="mt-9 border-t border-white/[0.07] pt-8">
            <CardContent category={category} tab={tab} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlatformShowcase;
