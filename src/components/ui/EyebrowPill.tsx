import React from "react";
import TickMark from "./TickMark";

interface EyebrowPillProps {
  label: string;
  subtitle?: string;
}

export function EyebrowPill({ label, subtitle }: EyebrowPillProps) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(220,47,101,0.10)] text-[#dc2f65] [font-family:var(--font-mono)] text-[11px] font-semibold uppercase tracking-[0.14em]">
      <TickMark width={12} height={12} />
      {label}
      {subtitle && <span className="opacity-60"> · {subtitle}</span>}
    </div>
  );
}

export default EyebrowPill;
