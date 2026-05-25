import React from "react";
import { EyebrowPill } from "./EyebrowPill";

interface ClosingCTAProps {
  eyebrow?: string;
  eyebrowSubTitle?: string;
  title: string;
  body?: string;
  primary: string;
  secondary?: string;
}

export function ClosingCTA({
  eyebrow,
  eyebrowSubTitle,
  title,
  body,
  primary,
  secondary,
}: ClosingCTAProps) {
  return (
    <section className="relative overflow-hidden max-[700px]:py-[72px] py-24">
      <div
        className="absolute inset-[-10%] pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse 38% 50% at var(--m1x) var(--m1y), rgba(220,47,101,0.5), transparent 65%),
            radial-gradient(ellipse 36% 42% at var(--m2x) var(--m2y), rgba(255,110,156,0.42), transparent 70%),
            radial-gradient(ellipse 30% 36% at var(--m3x) var(--m3y), rgba(255,168,120,0.22), transparent 72%),
            radial-gradient(ellipse 32% 38% at var(--m4x) var(--m4y), rgba(155,22,68,0.55), transparent 65%)`,
          filter: "blur(38px) saturate(160%)",
          animation: "wb-mesh-drift 22s ease-in-out infinite alternate",
          opacity: 0.4,
        } as React.CSSProperties}
      />
      <div className="relative w-full px-24 max-[700px]:px-8 text-center">
        {eyebrow && (
          <EyebrowPill label={eyebrow} subtitle={eyebrowSubTitle} />
        )}
        <h2 className="[font-family:var(--font-serif)] font-semibold text-[clamp(34px,5vw,64px)] leading-[1.04] tracking-[-0.025em] m-0 [text-wrap:balance] mt-[18px]">
          {title}
        </h2>
        {body && (
          <p className="text-[18px] text-[var(--fg-secondary)] leading-[1.55] max-w-[600px] m-0 mt-[22px] mx-auto">
            {body}
          </p>
        )}
        <div className="mt-8 flex gap-3 justify-center flex-wrap">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 py-[11px] px-[18px] rounded-lg font-medium text-sm tracking-[0.005em] border border-[var(--accent)] transition-all duration-[160ms] ease-in-out whitespace-nowrap no-underline cursor-pointer bg-[var(--accent)] text-white hover:bg-[#e8447a] hover:shadow-[0_8px_24px_-8px_rgba(220,47,101,0.55)] hover:-translate-y-px after:content-['→']"
            onClick={(e) => e.preventDefault()}
          >
            {primary}
          </a>
          {secondary && (
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 py-[11px] px-[18px] rounded-lg font-medium text-sm tracking-[0.005em] border border-[var(--hairline-strong)] transition-all duration-[160ms] ease-in-out whitespace-nowrap no-underline cursor-pointer bg-transparent text-[var(--fg-secondary)] hover:bg-white/[0.04] hover:border-white/[0.16] hover:text-[var(--fg-primary)]"
              onClick={(e) => e.preventDefault()}
            >
              {secondary}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default ClosingCTA;
