import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import StatsViz from "./StatsViz";

interface StatItem {
  val: string;
  lbl: string;
}

const STATS: StatItem[] = [
  { val: "10 Cr+", lbl: "invoices filed through WhiteBooks" },
  { val: "12,000+", lbl: "businesses run compliance on us" },
  { val: "5,000+", lbl: "CAs & tax professionals onboard" },
  { val: "99.95%", lbl: "API uptime SLA, measured monthly" },
];

const CYCLE_MS = 4600;

/**
 * WhiteBooks "by the numbers" — a Stripe-style section: a horizontal stat bar
 * with a traveling underline indicator over a morphing particle field on an
 * animated sunset gradient. Auto-cycles, pauses on hover/focus.
 */
export default function WbStats() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [bar, setBar] = useState({ left: 0, width: 0 });

  // keep the underline aligned to the active stat
  useLayoutEffect(() => {
    const measure = () => {
      const el = itemRefs.current[active];
      if (el) setBar({ left: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  // auto-advance unless interacting
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(
      () => setActive((a) => (a + 1) % STATS.length),
      CYCLE_MS,
    );
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section className="wb-stats" aria-label="WhiteBooks by the numbers">

      <div className="wb-stats__inner">
        <h2 className="font-serif font-semibold text-[clamp(32px,3.8vw,44px)] text-center">
          Built for compliance, <span className="text-[var(--brand)]">backed by trust.</span>
        </h2>
        <div
          className="wb-stats__bar"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {STATS.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.val}
                ref={(el) => (itemRefs.current[i] = el)}
                type="button"
                className={`wb-stats__stat${isActive ? " is-active" : ""}`}
                aria-pressed={isActive}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <span className="wb-stats__val">{s.val}</span>
                <span className="wb-stats__lbl">{s.lbl}</span>
              </button>
            );
          })}

          <motion.span
            className="wb-stats__underline"
            aria-hidden="true"
            animate={{ left: bar.left, width: bar.width }}
            transition={{ type: "spring", stiffness: 380, damping: 36, mass: 0.8 }}
          />
        </div>
      </div>

      <div className="wb-stats__viz">
        <div className="wb-stats__gradient" aria-hidden="true" />
        <StatsViz active={active} />
      </div>
    </section>
  );
}
