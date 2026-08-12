/**
 * DeadlineTrack — the Notice Management hero visual.
 *
 * Notices from three portals racing their response deadlines: each row's bar
 * fills toward its due date, and the most urgent one flips to replied. The page
 * sells "never miss a tax notice", and a clock closing on a deadline carries
 * that better than a screenshot of an inbox.
 *
 * DOM + Framer Motion for the same reason as LedgerPost — it is a UI surface,
 * so it inherits card tokens and stays legible at any width.
 */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { DeadlineSpec, DeadlineState } from "./types";
import { sleep, useHeroMotion } from "./useHeroMotion";

const FILL_MS = 1500;
const RESOLVE_HOLD_MS = 2400;

const TONE: Record<DeadlineState, string> = {
  due: "var(--danger)",
  progress: "var(--warn)",
  replied: "var(--success, var(--ok))",
};

const LABEL: Record<DeadlineState, string> = {
  due: "due",
  progress: "in progress",
  replied: "replied",
};

export function DeadlineTrack({ spec, className }: { spec: DeadlineSpec; className?: string }) {
  const { ref, active } = useHeroMotion<HTMLDivElement>();
  // Static (pre-scroll / reduced-motion) state is the resolved end state.
  const [filled, setFilled] = useState(true);
  const [resolved, setResolved] = useState(true);

  useEffect(() => {
    if (!active) {
      setFilled(true);
      setResolved(true);
      return;
    }
    let alive = true;
    (async () => {
      while (alive) {
        setFilled(false);
        setResolved(false);
        await sleep(400);
        if (!alive) return;
        setFilled(true);
        await sleep(FILL_MS + 600);
        if (!alive) return;
        setResolved(true);
        await sleep(RESOLVE_HOLD_MS);
      }
    })();
    return () => {
      alive = false;
    };
  }, [active]);

  /** The most urgent open row is the one that gets answered. */
  const urgentIdx = spec.rows.findIndex((r) => r.state !== "replied");

  return (
    <div
      ref={ref}
      className={`rounded-2xl border border-solid border-[var(--hairline-strong)] bg-[var(--bg-card)] p-4 sm:p-5 ${className ?? ""}`}
      role="img"
      aria-label={`${spec.title}: ${spec.rows
        .map((r) => `${r.portal} ${r.ref}, ${r.days} days left`)
        .join("; ")}. ${spec.footer}`}
    >
      <div className="flex items-center justify-between gap-3 border-0 border-b border-solid border-[var(--hairline)] pb-3">
        <span className="font-display text-[14px] font-semibold tracking-[-0.01em] text-[var(--fg-primary)]">
          {spec.title}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--fg-tertiary)]">
          auto-fetched
        </span>
      </div>

      <div>
        {spec.rows.map((row, i) => {
          const state: DeadlineState = resolved && i === urgentIdx ? "replied" : row.state;
          const tone = TONE[state];
          const elapsed = Math.min(1, Math.max(0, (row.total - row.days) / row.total));
          const pct = state === "replied" ? 1 : elapsed;

          return (
            <div
              key={row.ref}
              className="border-0 border-b border-solid border-[var(--hairline)] py-3 last:border-b-0"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="min-w-0 truncate text-[13px] text-[var(--fg-primary)]">
                  <span className="font-mono text-[11px] text-[var(--fg-tertiary)]">
                    {row.portal}
                  </span>
                  <span className="mx-1.5 text-[var(--fg-tertiary)]">·</span>
                  {row.ref}
                </span>
                <motion.span
                  key={state}
                  className="shrink-0 font-mono text-[11px] tabular-nums"
                  style={{ color: tone }}
                  initial={{ opacity: 0, y: -3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28 }}
                >
                  {state === "replied" ? LABEL.replied : `${row.days}d left`}
                </motion.span>
              </div>

              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[var(--hairline)]">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: tone }}
                  initial={false}
                  animate={{ width: filled ? `${pct * 100}%` : "0%" }}
                  transition={{
                    duration: filled ? FILL_MS / 1000 : 0.25,
                    ease: "easeOut",
                    delay: filled ? i * 0.12 : 0,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 border-0 border-t border-solid border-[var(--hairline-strong)] pt-3 text-[12px] text-[var(--fg-tertiary)]">
        {spec.footer}
      </div>
    </div>
  );
}
