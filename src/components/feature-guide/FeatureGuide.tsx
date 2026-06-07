"use client";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { FeatureItem } from "../../types/pages.ts";
import { VISUALS, DefaultVisual } from "./visuals";

interface FeatureGuideProps {
  heading: ReactNode;
  items: FeatureItem[];
  navLabel?: string;
}

const STEP_VH = 60;
// Tablet-height: laptop-width screen with short viewport (iPad landscape, small laptop, etc.)
const isTabletHeight = () => window.innerWidth > 1000 && window.innerHeight <= 850;

export function FeatureGuide({ heading, items, navLabel = "What it does" }: FeatureGuideProps) {
  const [active, setActive] = useState(0);
  const [compact, setCompact] = useState(false);
  const outerRef = useRef<HTMLElement>(null);
  const STEPS = items.length;

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    let raf: number | null = null;

    const compute = () => {
      raf = null;
      // CSS flattens the section under 1000px — skip scroll-driven progression there
      // so clicks set the active item without being immediately overwritten.
      if (window.innerWidth <= 1000) return;
      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;
      const total = rect.height - wh;
      if (total <= 0) return;
      const scrolled = Math.max(0, Math.min(total, -rect.top));
      const progress = scrolled / total;
      const idx = Math.min(STEPS - 1, Math.max(0, Math.floor(progress * STEPS + 0.001)));
      setActive((prev) => (prev === idx ? prev : idx));
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

  // Separate effect for compact/tablet-height detection — runs on mount + every resize
  useEffect(() => {
    const check = () => setCompact(isTabletHeight());
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const onNavClick = (i: number) => {
    setActive(i);
    if (window.innerWidth <= 1000) return;
    const el = outerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    if (total <= 0) return;
    const targetTop = window.scrollY + rect.top + (total * (i + 0.5)) / STEPS;
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  };

  const item = items[active] ?? items[0];
  const VisualComp = (item.visualKey && VISUALS[item.visualKey]) ?? null;

  const navProgressStyle = {
    "--steps": STEPS,
    "--idx": active,
  } as CSSProperties;

  // c = compact (tablet-height) variant values; only affects the sticky laptop layout
  const c = compact
    ? { sticky: "pt-5 pb-5 top-[0px]", grid: "mt-5", panel: "pt-4", h3: "text-[22px] mb-1", vis: "mt-3 min-h-[180px]" }
    : { sticky: "pt-12 pb-[60px]", grid: "mt-14", panel: "pt-9", h3: "text-[30px] mb-4", vis: "mt-10 min-h-[320px]" };

  return (
    <section
      ref={outerRef}
      data-reveal
      // wb-fg-section + wb-fg-scroll: scroll overrides padding to 0; before/after are real divs below
      // wb-fg-scroll background gradient + position:relative
      // wb-reveal: opacity/transform transition (always visible)
      className="relative p-0 bg-[linear-gradient(180deg,transparent,rgba(220,47,101,0.025)_50%,transparent)] opacity-100 translate-y-0 transition-[opacity,transform] duration-[600ms] ease-[ease] max-[1000px]:![min-height:auto]"
      style={{ minHeight: `calc(${STEPS} * ${STEP_VH}vh + 60vh)` }}
    >
      {/* wb-fg-scroll::before — 60px top spacer */}
      <div aria-hidden="true" className="h-[60px]" />

      {/* wb-fg-sticky */}
      <div className={`sticky top-[88px] ${c.sticky} px-0 min-h-[calc(100vh-88px)] flex flex-col justify-center max-[1000px]:static max-[1000px]:min-h-0 max-[1000px]:py-14 max-[1000px]:px-0`}>

        {/* wb-wrap */}
        <div className="w-full max-w-[1280px] mx-auto px-16 max-[1024px]:px-10 max-[768px]:px-6 max-[640px]:px-4">

          {/* wb-h2 */}
          <h2 className="font-display font-semibold text-[clamp(28px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] m-0 max-w-[780px] [text-wrap:balance]">
            {heading}
          </h2>

          {/* wb-fg-grid */}
          <div className={`grid grid-cols-[280px_1fr] gap-12 ${c.grid} items-start max-[1000px]:grid-cols-1 max-[1000px]:gap-6 max-[1000px]:mt-9 max-[700px]:mt-6 max-[700px]:gap-4`}>

            {/* wb-fg-nav: position:relative overrides the earlier sticky rule */}
            <nav
              className="relative flex flex-col gap-0.5 max-[1000px]:flex-row max-[1000px]:flex-wrap max-[1000px]:mb-20"
              aria-label="Features"
            >
              {items.map((it, i) => (
                <button
                  key={i}
                  type="button"
                  className={[
                    // base layout
                    "group relative grid items-center gap-3 px-3 border-0 bg-transparent text-left cursor-pointer rounded-[6px]",
                    "[grid-template-columns:14px_28px_1fr]",
                    "transition-[color,background] duration-[180ms] ease-[ease]",
                    // padding (responsive)
                    "py-[13px] max-[1000px]:py-[9px] max-[700px]:py-2 max-[700px]:px-2.5 max-[700px]:gap-2",
                    // default + hover colours
                    "text-muted hover:bg-[rgba(255,255,255,0.02)] hover:text-secondary",
                    // active state
                    i === active
                      ? "!text-primary bg-[linear-gradient(90deg,rgba(220,47,101,0.12),transparent_60%)]"
                      : "",
                  ].filter(Boolean).join(" ")}
                  aria-current={i === active ? "true" : undefined}
                  onClick={() => onNavClick(i)}
                >
                  {/* wb-fg-nav-marker */}
                  <span
                    aria-hidden="true"
                    className={[
                      "w-2 h-2 rounded-[2px] justify-self-center transition-[background,box-shadow,transform] duration-[180ms] ease-[ease]",
                      i === active
                        ? "bg-brand shadow-[0_0_0_3px_rgba(220,47,101,0.18),0_0_12px_rgba(220,47,101,0.8)] scale-[1.05]"
                        : "bg-[rgba(255,255,255,0.12)] group-hover:bg-[rgba(220,47,101,0.5)]",
                    ].join(" ")}
                  />

                  {/* wb-fg-nav-num */}
                  <span
                    className={[
                      "font-mono text-[10.5px] tracking-[0.10em] transition-[color] duration-[180ms] ease-[ease]",
                      i === active ? "text-brand" : "text-[rgba(255,255,255,0.25)]",
                    ].join(" ")}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* wb-fg-nav-label */}
                  <span className="font-mono text-[11.5px] tracking-[0.10em] uppercase leading-[1.4] max-[700px]:text-[10px]">
                    {it.navLabel || it.title}
                  </span>
                </button>
              ))}

              {/* wb-fg-nav-progress track + fill (replaces ::before pseudo-element) */}
              <div
                aria-hidden="true"
                className="absolute left-[19px] top-[22px] bottom-[22px] w-px pointer-events-none bg-[linear-gradient(180deg,rgba(220,47,101,0.10),rgba(220,47,101,0.04))] max-[1000px]:hidden"
                style={navProgressStyle}
              >
                <div
                  className="absolute left-0 top-0 w-px bg-[linear-gradient(180deg,var(--brand),rgba(220,47,101,0.4))] transition-[height] duration-[420ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] shadow-[0_0_6px_rgba(220,47,101,0.55)]"
                  style={{ height: "calc((var(--idx) + 1) / var(--steps) * 100%)" }}
                />
              </div>
            </nav>

            {/* wb-fg-panel */}
            <div
              key={active}
              className={`flex flex-col gap-0 border-t border-hairline ${c.panel} [animation:wb-fg-pop_480ms_cubic-bezier(0.2,0.7,0.2,1)_both] max-[700px]:pt-6 max-[700px]:gap-6`}
            >
              {/* wb-fg-panel-text */}
              <div className="flex-[1_1_0] pr-12 max-[900px]:pr-0">
                {/* wb-fg-panel-eyebrow */}
                <p className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-brand m-0 mb-3.5">
                  {String(active + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(STEPS).padStart(2, "0")}
                </p>

                {/* wb-fg-panel-title */}
                <h3 className={`font-display font-semibold tracking-[-0.02em] leading-[1.15] m-0 [text-wrap:balance] max-[700px]:!text-[22px] max-[700px]:!mb-4 ${c.h3}`}>
                  {item.title}
                </h3>

                {/* wb-fg-panel-body */}
                <p className="m-0 text-[16px] text-secondary leading-[1.6] max-[700px]:text-[15px]">
                  {item.body}
                </p>
              </div>

              {/* wb-fg-panel-visual */}
              <div className={`${c.vis} flex-[1_1_0] relative max-[700px]:!mt-10 max-[700px]:!min-h-[220px]`}>
                {/* wb-fg-panel-visual::before — radial glow (replaced with real div) */}
                <div
                  aria-hidden="true"
                  className="absolute pointer-events-none z-0 blur-[28px]"
                  style={{
                    inset: "-30px",
                    background:
                      "radial-gradient(ellipse 40% 60% at 30% 30%, rgba(220,47,101,0.30), transparent 60%), radial-gradient(ellipse 40% 60% at 80% 80%, rgba(220,47,101,0.20), transparent 65%)",
                  }}
                />
                {VisualComp ? <VisualComp /> : <DefaultVisual title={item.title ?? ""} />}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* wb-fg-scroll::after — 60px bottom spacer */}
      <div aria-hidden="true" className="h-[60px]" />
    </section>
  );
}
