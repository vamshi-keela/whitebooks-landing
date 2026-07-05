"use client";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react";
import { Link } from "react-router-dom";
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
 * The rail selects the active category (click-driven); the sub-feature pills
 * inside a category swap content + preview.
 * ──────────────────────────────────────────────────────────────────────── */

const EASE = [0.22, 0.7, 0.2, 1] as const;

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

/* ── Small inline check — bordered tile, compliance-checklist vibe ────────── */
function CheckMark() {
  return (
    <span
      aria-hidden="true"
      className="mt-[1px] grid h-4 w-4 shrink-0 place-items-center rounded-[5px] border border-[var(--brand-border)] bg-[var(--brand-softer)]"
    >
      <svg viewBox="0 0 10 10" className="h-[9px] w-[9px]">
        <path
          d="M2 5.2l2 2 4-4.5"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
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
                isActive ? "text-brand" : "text-[var(--muted)] opacity-60",
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
// Contained tabbar (mirrors ConnectorsSection's SourceTabs) — sliding brand
// pill inside a bordered track. Scrolls horizontally and keeps the active tab
// centered, since a showcase can carry many categories.
function CategoryPills({
  categories,
  active,
  onSelect,
}: {
  categories: ShowcaseCategory[];
  active: number;
  onSelect: (i: number) => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const btn = list?.children[active] as HTMLElement | undefined;
    if (!list || !btn) return;
    list.scrollTo({
      left: btn.offsetLeft - (list.clientWidth - btn.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [active]);

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label="Platform categories"
      className={[
        "flex w-full gap-1 overflow-x-auto rounded-[14px] border border-[var(--hairline)] p-1.5",
        "bg-[color-mix(in_srgb,var(--fg-primary)_4%,transparent)]",
        "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
      ].join(" ")}
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
              "relative flex shrink-0 items-center justify-center whitespace-nowrap border-0",
              "cursor-pointer rounded-[9px] bg-transparent px-3.5 py-2 sm:px-5 sm:py-2.5",
              "text-[14px] sm:text-[15px] transition-colors duration-[180ms]",
              isActive
                ? "font-semibold text-white"
                : "font-medium text-[var(--fg-tertiary)] hover:text-[var(--fg-secondary)]",
            ].join(" ")}
          >
            {isActive && (
              <motion.span
                layoutId="showcase-pill"
                aria-hidden="true"
                className="absolute inset-0 -z-0 rounded-[9px] bg-[var(--brand)]"
                style={{ boxShadow: "0 8px 20px -8px var(--brand-glow)" }}
                transition={{ type: "spring", stiffness: 480, damping: 40 }}
              />
            )}
            <span className="relative z-10">{c.label}</span>
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
const MotionLink = motion.create(Link);

function CardCtas({ cta }: { cta: ShowcaseCta }) {
  const target = href(cta.href);
  const secondaryMotion = {
    whileHover: { y: -2 },
    whileTap: { y: 0 },
    transition: { duration: 0.18, ease: EASE },
    className:
      "group inline-flex items-center justify-center gap-2 rounded-full border border-[var(--line-2)] bg-transparent px-5 py-2.5 text-[13.5px] font-medium text-[var(--text)] transition-colors duration-200 hover:border-[var(--brand-border)] hover:bg-[var(--brand-softer)]",
  } as const;
  const secondaryContent = (
    <>
      {cta.label}
      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
        →
      </span>
    </>
  );

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
      {/^https?:/.test(target) ? (
        <motion.a href={target} {...secondaryMotion}>
          {secondaryContent}
        </motion.a>
      ) : (
        /* Internal feature deep-dive — SPA-navigate to /features/:slug */
        <MotionLink to={target} {...secondaryMotion}>
          {secondaryContent}
        </MotionLink>
      )}
    </div>
  );
}

/* ── Card content (middle column) — keyed mount animation, strict rhythm ──── */
function CardContent({ category, tab }: { category: ShowcaseCategory; tab: ShowcaseTab }) {
  console.log("cardcontent reprinted")
  return (
    <motion.div
      key={`${category.id}-${tab.id}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      {/* metadata line — record-type chip + category context */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--brand-border)] bg-[var(--brand-softer)] px-2 py-[3px] text-[10.5px] font-medium text-brand">
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand" />
          {tab.badge}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
          {category.heading}
        </span>
      </div>

      <h3 className="mt-4 font-display text-[clamp(20px,2.1vw,26px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--text)] [text-wrap:balance]">
        {tab.title}
      </h3>
      <p className="mt-1.5 text-[14px] font-medium text-[var(--muted-2)]">{tab.subtitle}</p>
      <p className="mt-3 max-w-[460px] text-[13.5px] leading-[1.6] text-[var(--muted)]">
        {tab.description}
      </p>

      <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
        {tab.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-[12.5px] leading-[1.5] text-[var(--muted-2)]">
            <CheckMark />
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-7">
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

/* ── Preview media — screenshot fills the frame, or a glass placeholder ───── */
function PreviewMedia({ tab }: { tab: ShowcaseTab }) {
  const poster = resolvePoster(tab.media.poster);

  if (poster) {
    return (
      <motion.img
        key={tab.id}
        src={poster}
        alt={tab.media.label}
        loading="lazy"
        decoding="async"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="block h-auto w-full"
      />
    );
  }

  return (
    <motion.div
      key={tab.id}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="relative flex aspect-[3/4] flex-col items-center justify-center gap-3 px-6 text-center"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 40%, var(--brand-glow), transparent 60%)",
        }}
      />
      <div className="relative font-display text-[15px] font-semibold tracking-[-0.01em] text-[var(--text)]">
        {tab.media.label}
      </div>
      <div className="relative px-2 text-[12px] leading-[1.45] text-[var(--muted)]">
        {tab.subtitle}
      </div>
      <span className="relative rounded-full border border-[var(--line)] px-3 py-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-[var(--muted)]">
        Preview coming soon
      </span>
    </motion.div>
  );
}

/* ── Visual column — product window: chrome bar · media · status footer ───── */
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
    <div className="relative mx-auto w-[360px] max-w-full">
      {/* blueprint grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(closest-side, black, transparent)",
          WebkitMaskImage: "radial-gradient(closest-side, black, transparent)",
        }}
      />
      {/* ambient brand glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 -z-10 blur-3xl"
        style={{
          background: "radial-gradient(circle at 50% 50%, var(--brand-glow), transparent 65%)",
        }}
      />

      <div className="overflow-hidden rounded-xl border border-[var(--line-2)] bg-[var(--bg-elev)] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.5)]">
        {/* window chrome */}
        {/* <div className="flex items-center gap-2 border-b border-[var(--line)] px-3.5 py-2.5">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="h-[7px] w-[7px] rounded-full bg-[var(--line-2)]" />
            <span className="h-[7px] w-[7px] rounded-full bg-[var(--line-2)]" />
            <span className="h-[7px] w-[7px] rounded-full bg-[var(--line-2)]" />
          </span>
          <span className="mx-auto truncate font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--muted)]">
            {tab.media.label}
          </span>
          <span className="flex shrink-0 items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--success)]">
            <motion.span
              aria-hidden="true"
              className="h-[5px] w-[5px] rounded-full bg-[var(--success)]"
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            Live
          </span>
        </div> */}

        <PreviewMedia tab={tab} />

        {/* status footer */}
        {/* <div className="flex items-center justify-between border-t border-[var(--line)] px-3.5 py-2">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--muted)]">
            {category.label}
          </span>
          <span className="font-mono text-[9.5px] tabular-nums tracking-[0.12em] text-[var(--muted)]">
            {counter}
          </span>
        </div> */}
      </div>
    </div>
  );
}

/* ── Wheel-to-cycle — scrolling inside `ref` steps through a list ──────────────
   One wheel gesture = one step (throttled). At the first/last item we release
   the wheel so the page keeps scrolling instead of trapping the user. */
function useWheelCycle(
  ref: RefObject<HTMLElement | null>,
  index: number,
  count: number,
  setIndex: (updater: (i: number) => number) => void,
) {
  const lock = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Ignore horizontal-dominant / negligible scrolls.
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || Math.abs(e.deltaY) < 6) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      const last = count - 1;
      const atBoundary = (dir > 0 && index >= last) || (dir < 0 && index <= 0);
      if (atBoundary) return; // let the page scroll past the section

      e.preventDefault();
      if (lock.current) return;
      lock.current = true;
      setIndex((i) => Math.min(Math.max(i + dir, 0), last));
      window.setTimeout(() => {
        lock.current = false;
      }, 550);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [ref, index, count, setIndex]);
}

/* ── Section ──────────────────────────────────────────────────────────────── */
export function PlatformShowcase({ heading, categories }: { heading?: ReactNode, categories: ShowcaseCategory[] }) {
  const [activeCat, setActiveCat] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  const category = categories[activeCat];
  const tab = category.tabs[activeTab] ?? category.tabs[0];
  const counter = `${String(activeTab + 1).padStart(2, "0")} / ${String(category.tabs.length).padStart(2, "0")}`;

  // Reset sub-feature when the category changes.
  useEffect(() => {
    setActiveTab(0);
  }, [activeCat]);

  // Desktop: scrolling inside the showcase cycles through the category rail.
  const desktopRef = useRef<HTMLDivElement>(null);
  useWheelCycle(desktopRef, activeCat, categories.length, setActiveCat);

  const onRailClick = (i: number) => {
    setActiveCat(i);
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
      data-reveal
      className="relative bg-[linear-gradient(180deg,transparent,rgba(220,47,101,0.03)_50%,transparent)]"
    >
      {/* Header — common to both layouts. */}
      <div className="mx-auto w-full max-w-[1280px] px-6 pt-16 sm:px-10">
        {headerBlock}
        <div className="mt-8 min-[1101px]:hidden">
          <CategoryPills categories={categories} active={activeCat} onSelect={onRailClick} />
        </div>
      </div>

      {/* ── Desktop: two-column canvas (rail | pills + content/image row) ── */}
      <div ref={desktopRef} className="hidden min-[1101px]:block">
        <div className="mx-auto w-full max-w-[1280px] px-10 pb-20 pt-12">
          <div className="grid grid-cols-[220px_minmax(0,1fr)] items-start">
            {/* Left column — category rail + proof */}
            <div className="pr-8 pt-1">
              <CategoryRail categories={categories} active={activeCat} onSelect={onRailClick} />
              <motion.div
                key={`${category.id}-proof`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="mt-6 border-t border-[var(--line)] pt-5"
              >
                <SocialProofBadges proof={category.proof} />
              </motion.div>
            </div>

            {/* Right column — 1st child: pills · 2nd child: row[content+ctas, image] */}
            <div className="flex min-w-0 flex-col gap-7 border-l border-[var(--line)] pl-10">
              <FeatureTabs
                key={`${category.id}-tabs`}
                tabs={category.tabs}
                active={activeTab}
                onSelect={setActiveTab}
                layoutId="showcase-subtab-desktop"
              />
              <div className="flex flex-row items-center gap-12 border-t border-[var(--line)] pt-7">
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
          <div className="mt-9 border-t border-[var(--line)] pt-8">
            <CardContent category={category} tab={tab} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlatformShowcase;
