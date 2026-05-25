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

export function FeatureGuide({ heading, items, navLabel = "What it does" }: FeatureGuideProps) {
  const [active, setActive] = useState(0);
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

  return (
    <section
      ref={outerRef}
      className="wb-fg-section wb-fg-scroll wb-reveal"
      data-reveal
      style={{ minHeight: `calc(${STEPS} * ${STEP_VH}vh + 60vh)` }}
    >
      <div className="wb-fg-sticky">
        <div className="wb-wrap">
          <h2 className="wb-h2">{heading}</h2>

          <div className="wb-fg-grid">
            <nav className="wb-fg-nav" aria-label="Features">
              {items.map((it, i) => (
                <button
                  key={i}
                  type="button"
                  className={`wb-fg-nav-btn ${i === active ? "is-active" : ""}`}
                  aria-current={i === active ? "true" : undefined}
                  onClick={() => onNavClick(i)}
                >
                  <span className="wb-fg-nav-marker" aria-hidden="true" />
                  <span className="wb-fg-nav-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="wb-fg-nav-label">{it.navLabel || it.title}</span>
                </button>
              ))}
              <div className="wb-fg-nav-progress" aria-hidden="true" style={navProgressStyle} />
            </nav>

            <div className="wb-fg-panel" key={active}>
              <div className="wb-fg-panel-text">
                <p className="wb-fg-panel-eyebrow">
                  {String(active + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(STEPS).padStart(2, "0")}
                </p>
                <h3 className="wb-fg-panel-title">{item.title}</h3>
                <p className="wb-fg-panel-body">{item.body}</p>
              </div>
              <div className="wb-fg-panel-visual">
                {VisualComp ? <VisualComp /> : <DefaultVisual title={item.title ?? ''} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
