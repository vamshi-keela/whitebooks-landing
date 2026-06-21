/**
 * Shared building blocks for the connector landing templates.
 * Token-driven (theme-aware) and consistent with the home-page design language
 * in EnterpriseControls / InvoiceTemplates / ConnectorsSection.
 */
import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Cta, FaqItem } from "./connectors.data";

export const EASE = [0.22, 1, 0.36, 1] as const;
const ACCENT = "var(--brand)";

/* ── Section wrapper — consistent max-width, gutters and rhythm ────────────── */
export function Section({
  children,
  className,
  border = true,
  id,
}: {
  children: ReactNode;
  className?: string;
  border?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-14 sm:py-18 lg:py-24",
        border && "border-b border-[var(--hairline)]",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16">
        {children}
      </div>
    </section>
  );
}

/* ── Eyebrow pill — mono caps + glowing brand dot ─────────────────────────── */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_5%,transparent)] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--fg-secondary)]",
        className,
      )}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: ACCENT, boxShadow: "0 0 8px var(--brand-glow)" }}
      />
      {children}
    </span>
  );
}

/* ── Centered editorial header ────────────────────────────────────────────── */
export function SectionHeader({
  eyebrow,
  heading,
  sub,
  align = "center",
}: {
  eyebrow: string;
  heading: ReactNode;
  sub?: ReactNode;
  align?: "center" | "left";
}) {
  const left = align === "left";
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: EASE }}
      className={cn(
        "flex max-w-[720px] flex-col gap-4",
        left ? "items-start text-left" : "mx-auto items-center text-center",
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="m-0 font-display text-[clamp(26px,4vw,42px)] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--fg-primary)] text-balance">
        {heading}
      </h2>
      {sub && (
        <p className="m-0 max-w-[600px] text-[15px] leading-[1.6] text-[var(--fg-secondary)] sm:text-[16px]">
          {sub}
        </p>
      )}
    </motion.div>
  );
}

/* ── External CTA — opens accounts.whitebooks.in in a new tab ──────────────── */
export function CtaButton({
  cta,
  variant = "primary",
  className,
}: {
  cta: Cta;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  return (
    <motion.a
      href={cta.href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      transition={{ duration: 0.18, ease: EASE }}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-[13.5px] font-semibold no-underline",
        variant === "primary"
          ? "bg-[var(--brand)] text-white shadow-[0_10px_30px_-10px_var(--brand)] hover:shadow-[0_14px_36px_-10px_var(--brand)]"
          : "border border-[var(--hairline-bright)] bg-[color-mix(in_srgb,var(--fg-primary)_4%,transparent)] font-medium text-[var(--fg-primary)] hover:border-[var(--brand-border)]",
        className,
      )}
    >
      {cta.label}
      <span aria-hidden className="transition-transform duration-200">
        →
      </span>
    </motion.a>
  );
}

/* ── Reveal — single scroll-in wrapper for cards / rows ───────────────────── */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Stat strip — equal columns with hairline gaps (cost / results / trust) ──
   Renders as a 1px-gap grid so dividers appear between every cell regardless of
   whether there are 3 or 4 stats. */
export function StatStrip({
  stats,
  tone = "default",
}: {
  stats: { value: string; label: string }[];
  tone?: "default" | "brand";
}) {
  return (
    <div
      className="grid gap-px overflow-hidden rounded-[20px] border border-[var(--hairline-strong)] bg-[var(--hairline)]"
      style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex flex-col items-center gap-1.5 bg-[var(--bg)] px-3 py-7 text-center"
        >
          <span
            className={cn(
              "font-display text-[clamp(22px,3.5vw,34px)] font-semibold leading-none tracking-[-0.02em]",
              tone === "brand" ? "text-[var(--brand)]" : "text-[var(--fg-primary)]",
            )}
          >
            {s.value}
          </span>
          <span className="text-[12px] leading-[1.4] text-[var(--fg-tertiary)] sm:text-[12.5px]">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── FAQ accordion — shared by both templates ─────────────────────────────── */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto mt-10 flex max-w-[760px] flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className="overflow-hidden rounded-[16px] border border-[var(--hairline-strong)] bg-[color-mix(in_srgb,var(--fg-primary)_3%,transparent)]"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-[14.5px] font-semibold text-[var(--fg-primary)]">{item.q}</span>
              <ChevronDown
                size={18}
                className={cn(
                  "shrink-0 text-[var(--fg-tertiary)] transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <motion.div
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="overflow-hidden"
            >
              <p className="m-0 px-5 pb-5 text-[13.5px] leading-[1.6] text-[var(--fg-secondary)]">{item.a}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
