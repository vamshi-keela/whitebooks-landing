/**
 * LedgerPost — the Accounting hero visual.
 *
 * A journal posting itself: a source document arrives, its lines drop into the
 * ledger one at a time, the balance ticks up, and the entry is stamped. That is
 * the page's whole claim ("books that post themselves") shown rather than told,
 * which a static dashboard screenshot cannot do.
 *
 * DOM + Framer Motion rather than SVG — this is a UI surface, not a diagram, so
 * it inherits the site's card tokens and stays legible at any width without a
 * viewBox to fight.
 */
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { LedgerSpec } from "./types";
import { sleep, useHeroMotion } from "./useHeroMotion";

const ROW_MS = 620;
const STAMP_HOLD_MS = 2200;

export function LedgerPost({ spec, className }: { spec: LedgerSpec; className?: string }) {
  const { ref, active } = useHeroMotion<HTMLDivElement>();
  const total = spec.rows.length;
  // Static (pre-scroll / reduced-motion) state is the finished entry.
  const [posted, setPosted] = useState(total);

  useEffect(() => {
    if (!active) {
      setPosted(total);
      return;
    }
    let alive = true;
    (async () => {
      while (alive) {
        setPosted(0);
        await sleep(500);
        for (let i = 1; i <= total; i++) {
          if (!alive) return;
          setPosted(i);
          await sleep(ROW_MS);
        }
        await sleep(STAMP_HOLD_MS);
      }
    })();
    return () => {
      alive = false;
    };
  }, [active, total]);

  const done = posted === total;

  return (
    <div
      ref={ref}
      className={`rounded-2xl border border-solid border-[var(--hairline-strong)] bg-[var(--bg-card)] p-4 sm:p-5 ${className ?? ""}`}
      role="img"
      aria-label={`${spec.title}: ${spec.rows.map((r) => `${r.account} ${r.side} ${r.amount}`).join(", ")}. ${spec.stamp}`}
    >
      {/* Header — what triggered the entry */}
      <div className="flex items-start justify-between gap-3 border-0 border-b border-solid border-[var(--hairline)] pb-3">
        <div className="min-w-0">
          <div className="font-display text-[14px] font-semibold tracking-[-0.01em] text-[var(--fg-primary)]">
            {spec.title}
          </div>
          <div className="mt-0.5 truncate font-mono text-[11px] text-[var(--fg-tertiary)]">
            {spec.source}
          </div>
        </div>
        <motion.span
          className="shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em]"
          style={{ background: "var(--brand-soft)", color: "var(--brand)" }}
          animate={active && !done ? { opacity: [1, 0.45, 1] } : { opacity: 1 }}
          transition={{ duration: 1.2, repeat: active && !done ? Infinity : 0 }}
        >
          {done ? "posted" : "posting"}
        </motion.span>
      </div>

      {/* Journal lines — dropping in one at a time */}
      <div className="pt-1">
        {spec.rows.map((row, i) => {
          const shown = i < posted;
          return (
            <motion.div
              key={row.account}
              className="flex items-center justify-between gap-3 border-0 border-b border-solid border-[var(--hairline)] py-2.5 last:border-b-0"
              initial={false}
              animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : -6 }}
              transition={{ duration: 0.32, ease: "easeOut" }}
            >
              <span className="truncate text-[13px] text-[var(--fg-secondary)]">{row.account}</span>
              <span className="flex shrink-0 items-baseline gap-2">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.08em]"
                  style={{ color: row.side === "Dr" ? "var(--brand)" : "var(--fg-tertiary)" }}
                >
                  {row.side}
                </span>
                <span className="font-mono text-[13px] tabular-nums text-[var(--fg-primary)]">
                  {row.amount}
                </span>
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Footer — the number the entry rolls up to */}
      <div className="mt-1 flex items-center justify-between gap-3 border-0 border-t border-solid border-[var(--hairline-strong)] pt-3">
        <span className="text-[12px] text-[var(--fg-tertiary)]">{spec.footer.label}</span>
        <span className="font-display text-[15px] font-semibold tabular-nums text-[var(--fg-primary)]">
          {spec.footer.value}
        </span>
      </div>

      {/* Stamp — lands once every line is in */}
      <div className="mt-3 h-7">
        <AnimatePresence>
          {done && (
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-solid px-3 py-1.5"
              style={{
                borderColor: "color-mix(in srgb, var(--success, var(--ok)) 35%, transparent)",
                background: "color-mix(in srgb, var(--success, var(--ok)) 12%, transparent)",
              }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--success, var(--ok))" }}
              />
              <span className="text-[12px] font-medium text-[var(--fg-primary)]">{spec.stamp}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
