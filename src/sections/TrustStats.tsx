import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";

import gspProvider from "@/assets/gsp-provider.svg";
import isoCertified from "@/assets/iso-certified-2022.svg";

const PINK = "#f43f7d";
const ROSE = "#dc2f65";
const CYAN = "#6ee7f9";

const PINK_TEXT = "var(--ts-num-pink)";
const CYAN_TEXT = "var(--ts-num-cyan)";

const badges = [
  { src: gspProvider, alt: "Govt. of India GST Suvidha Provider" },
  { src: isoCertified, alt: "ISO 27001:2022 certified" },
];

const chips = ["GST Compliant", "Tally Migration", "E-Invoice Ready", "Bank Reconciliation"];

type Metric = {
  end: number;
  decimals?: number;
  suffix: string;
  label: string;
  cyan?: boolean;
};

const metrics: Metric[] = [
  { end: 25000, suffix: "+", label: "Active Clients" },
  { end: 10000, suffix: "+", label: "CA & Accounting Firms" },
  { end: 30, suffix: " Crore+", label: "E-Invoices Generated", cyan: true },
  { end: 95, suffix: "%+", label: "Customer Retention" },
  { end: 4.9, decimals: 1, suffix: "/5", label: "Average Rating" },
];

function formatValue(value: number, decimals: number) {
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function CountUp({ end, decimals = 0, suffix }: { end: number; decimals?: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  // Start at the final value so SSR-prerendered HTML carries real numbers.
  const [display, setDisplay] = useState(() => formatValue(end, decimals));

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, end, {
      duration: 1.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(formatValue(latest, decimals)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, end, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

function CertificateMark({ src, alt, index }: { src: string; alt: string; index: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className="relative grid shrink-0 place-items-center">
      <span
        aria-hidden
        className="absolute h-[80px] w-[110px] rounded-full blur-2xl"
        style={{ background: "radial-gradient(circle, var(--ts-badge-glow), transparent 70%)" }}
      />
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
        transition={{ duration: 5.6, delay: index * 0.9, repeat: Infinity, ease: "easeInOut" }}
        className="relative h-[64px] w-auto max-w-[130px] opacity-95"
        style={{ filter: "var(--ts-badge-filter)" }}
      />
    </div>
  );
}

function ComplianceChip({ label, index }: { label: string; index: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -2 }}
      className="relative h-11 overflow-hidden rounded-full p-px"
    >
      {/* comet border */}
      {!reduceMotion && (
        <motion.span
          aria-hidden
          className="absolute inset-[-250%]"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg 300deg, rgba(244,63,125,0.85) 336deg, rgba(110,231,249,0.9) 350deg, transparent 360deg)`,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6.5, delay: index * 1.1, repeat: Infinity, ease: "linear" }}
        />
      )}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full border"
        style={{ borderColor: "var(--ts-chip-border)" }}
      />

      <div
        className="relative flex h-full items-center gap-2.5 rounded-full pl-2 pr-4 text-[13.5px] font-medium"
        style={{
          background: "var(--ts-chip-bg)",
          color: "var(--ts-chip-text)",
          boxShadow: "var(--ts-chip-shadow)",
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-[55%] rounded-l-full"
          style={{ background: "linear-gradient(90deg, var(--ts-chip-tint), transparent)" }}
        />
        <span
          className="relative grid h-6 w-6 shrink-0 place-items-center rounded-full text-white shadow-[0_4px_14px_rgba(220,47,101,0.45)]"
          style={{ background: `linear-gradient(135deg, ${PINK}, ${ROSE})` }}
        >
          <Check size={13} strokeWidth={3.2} />
        </span>
        <span className="relative whitespace-nowrap">{label}</span>
      </div>
    </motion.div>
  );
}

function MetricCell({ metric, index }: { metric: Metric; index: number }) {
  const reduceMotion = useReducedMotion();
  const glow = metric.cyan ? "var(--ts-glow-cyan)" : "var(--ts-glow-pink)";
  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -3 }}
      className="group relative px-4 py-3 text-center sm:px-5"
    >
      {index > 0 && (
        <span
          aria-hidden
          className="absolute left-0 top-1/2 hidden h-[56px] w-px -translate-y-1/2 md:block"
          style={{ background: "linear-gradient(180deg, transparent, var(--ts-sep), transparent)" }}
        />
      )}

      {/* glow bloom */}
      <motion.span
        aria-hidden
        className="absolute left-1/2 top-1 h-10 w-24 -translate-x-1/2 rounded-full blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glow, opacity: 0.5 }}
        animate={reduceMotion ? undefined : { scale: [0.9, 1.12, 0.9] }}
        transition={{ duration: 4.2, delay: index * 0.4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className="relative whitespace-nowrap bg-clip-text text-transparent text-[clamp(22px,2.3vw,30px)] font-bold leading-none tracking-[-0.03em]"
        style={{ backgroundImage: metric.cyan ? CYAN_TEXT : PINK_TEXT }}
      >
        <CountUp end={metric.end} decimals={metric.decimals} suffix={metric.suffix} />
      </div>

      {/* tick underline */}
      <span
        aria-hidden
        className="relative mx-auto mt-2 block h-[2px] w-7 rounded-full opacity-80"
        style={{
          background: metric.cyan
            ? `linear-gradient(90deg, transparent, ${CYAN}, transparent)`
            : `linear-gradient(90deg, transparent, ${PINK}, transparent)`,
        }}
      />

      <div className="wb-ts-label relative mt-2 text-[13px] font-medium leading-[1.35]">{metric.label}</div>
    </motion.div>
  );
}

export default function TrustStats() {
  const reduceMotion = useReducedMotion();
  return (
    <section
      data-reveal
      aria-label="Trusted compliance metrics"
      className="wb-truststats relative isolate overflow-hidden py-8 sm:py-10"
      style={{ background: "var(--ts-bg)" }}
    >
      {/* drifting aurora */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -top-32 left-[8%] h-[320px] w-[480px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--ts-aurora-pink), transparent)" }}
        animate={reduceMotion ? undefined : { x: [0, 90, 0], y: [0, 24, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -bottom-36 right-[4%] h-[300px] w-[440px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--ts-aurora-cyan), transparent)" }}
        animate={reduceMotion ? undefined : { x: [0, -80, 0], y: [0, -20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            "linear-gradient(var(--ts-grid) 1px, transparent 1px), linear-gradient(90deg, var(--ts-grid) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        }}
      />

      <div className="relative z-[1] mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16">
        {/* badges + chips row */}
        <div className="flex flex-col items-center justify-between gap-5 lg:flex-row">
          <div className="flex shrink-0 items-center gap-7 sm:gap-9">
            {badges.map((badge, index) => (
              <CertificateMark key={badge.alt} {...badge} index={index} />
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 lg:justify-end">
            {chips.map((chip, index) => (
              <ComplianceChip key={chip} label={chip} index={index} />
            ))}
          </div>
        </div>

        {/* divider with traveling beam */}
        <div className="relative mb-4 mt-6 h-px w-full overflow-hidden">
          <span
            aria-hidden
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, transparent, var(--ts-hairline), transparent)",
            }}
          />
          {!reduceMotion && (
            <motion.span
              aria-hidden
              className="absolute top-0 h-px w-[30%]"
              style={{
                background: `linear-gradient(90deg, transparent, ${PINK}, ${CYAN}, transparent)`,
                boxShadow: `0 0 18px rgba(244,63,125,0.55)`,
              }}
              animate={{ left: ["-30%", "100%"] }}
              transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.2 }}
            />
          )}
        </div>

        <div className="grid grid-cols-1 gap-y-1 sm:grid-cols-2 md:grid-cols-5">
          {metrics.map((metric, index) => (
            <MetricCell key={metric.label} metric={metric} index={index} />
          ))}
        </div>

        <div
          aria-hidden
          className="mt-4 h-px w-full"
          style={{ background: "linear-gradient(90deg, transparent, var(--ts-hairline-soft), transparent)" }}
        />
      </div>
    </section>
  );
}
