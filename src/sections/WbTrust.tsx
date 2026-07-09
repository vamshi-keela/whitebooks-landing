import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ─── Data ──────────────────────────────────────────────────────────────────
// "Compliance & Security KPIs" — one headline metric (Active clients, varies
// per product) shown on the aurora feature tile, plus four shared proof points.

interface Metric {
  val: string;
  lbl: string;
}

interface Category {
  key: string;
  label: string;
  hero: Metric; // featured on the aurora tile
  metrics: Metric[]; // bento cards
}

const SHARED: Metric[] = [
  { val: "40%+", lbl: "Annual growth rate" },
  { val: "4.9/5", lbl: "Average customer rating" },
  { val: "95%+", lbl: "Customer retention rate" },
  { val: "100+", lbl: "CA & accounting firms trust us" },
];

const CATEGORIES: Category[] = [
  { key: "accounting", label: "Accounting", hero: { val: "1,000+", lbl: "Active clients" }, metrics: SHARED },
  { key: "gst", label: "GST", hero: { val: "25,000+", lbl: "Active clients" }, metrics: SHARED },
  { key: "e-invoicing", label: "e-Invoicing", hero: { val: "1,000+", lbl: "Active clients" }, metrics: SHARED },
  { key: "e-way-bill", label: "e-Way Bill", hero: { val: "1,000+", lbl: "Active clients" }, metrics: SHARED },
];

const wrap = "w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4";

/**
 * WhiteBooks "Compliance & Security KPIs" — a tabbed trust band. Each product
 * tab swaps the metrics; the headline (Active clients) rides an animated aurora
 * feature tile while the four shared proof points sit in a bento card grid.
 * Theme-aware, keeps the gradient-clipped numbers across both themes.
 */
export default function WbTrust() {
  const [activeKey, setActiveKey] = useState(CATEGORIES[0].key);
  const active = CATEGORIES.find((c) => c.key === activeKey) ?? CATEGORIES[0];

  return (
    <section className="wb-trust" aria-label="Compliance and security KPIs">
      <div className={wrap}>
        {/* Header: eyebrow + heading on the left, tab strip on the right */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between mb-8 md:mb-12">
          <div className="flex flex-col gap-3">
            <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--muted-2)]">
              Trusted across the industry
            </span>
            <h2 className="font-serif font-semibold text-[clamp(32px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] m-0 text-[var(--text)] text-balance">
              Compliance &amp; Security <span className='text-[var(--brand)]'> KPIs</span>
            </h2>
          </div>

          <div className="wb-tab-strip self-start md:self-auto" role="tablist" aria-label="Product">
            {CATEGORIES.map((c) => {
              const isActive = c.key === activeKey;
              return (
                <button
                  key={c.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`wb-toggle-btn${isActive ? " is-active" : ""}`}
                  onClick={() => setActiveKey(c.key)}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento grid — crossfades on tab change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.65, 0, 0.35, 1] }}
            className="grid gap-4 lg:gap-5 lg:grid-cols-[1.55fr_1fr]"
          >
            {/* Four shared proof points */}
            <div className="grid grid-cols-2 gap-4 lg:gap-5">
              {active.metrics.map((m) => (
                <div key={m.lbl} className="wb-trust-card">
                  <span className="wb-trust-num">{m.val}</span>
                  <span className="wb-trust-lbl">{m.lbl}</span>
                </div>
              ))}
            </div>

            {/* Aurora feature tile — the headline metric (varies per tab) */}
            <div className="wb-trust-feature order-first lg:order-none">
              <div className="wb-trust-feature__bg" aria-hidden="true" />
              <span className="wb-trust-feature__eyebrow">{active.label}</span>
              <div className="mt-auto">
                <span className="wb-trust-feature__num">{active.hero.val}</span>
                <span className="wb-trust-feature__lbl">{active.hero.lbl}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
