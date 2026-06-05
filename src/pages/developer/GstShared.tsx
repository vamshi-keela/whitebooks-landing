import React from 'react';

// ─── Animation variants ───────────────────────────────────────────────────────

export const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

// ─── Shared UI primitives ─────────────────────────────────────────────────────

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] font-bold tracking-[0.1em] uppercase mb-3"
      style={{ color: 'var(--dp-accent-2)', fontFamily: 'var(--dp-font-mono)' }}
    >
      {children}
    </p>
  );
}

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-3xl font-bold tracking-[-0.025em] leading-[1.1] m-0"
      style={{ fontFamily: 'var(--dp-font-display)', color: 'var(--dp-fg)' }}
    >
      {children}
    </h2>
  );
}

export function GlassCard({
  children,
  className = '',
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded-[14px] border ${className}`}
      style={{ background: 'var(--dp-surface-2)', borderColor: 'var(--dp-border)', ...style }}
    >
      {children}
    </div>
  );
}

export function Divider() {
  return <div className="h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />;
}
