// WhyWhitebooks.tsx — premium "Why WhiteBooks" capability section.
//
// Answers "Why choose WhiteBooks?" with four capability pillars in an
// asymmetric bento grid (Stripe / Linear / Ramp / Vercel language), each
// card pairing a bespoke product visual with outcome-led copy. Theme-aware
// glassmorphism on dark, clean elevated cards on light. Ends with the
// "Still using Excel?" conversion band.

import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/cn';

const SIGNUP_URL = 'https://accounts.whitebooks.in/signupall';

// ─── Tones ──────────────────────────────────────────────────────────────────
// Per-card accent used only for the visual's glow + icon wash. The hover
// border-glow stays brand-pink on every card so the grid reads as one system.

type Tone = 'pink' | 'violet' | 'blue' | 'cyan';

const TONE_RGB: Record<Tone, string> = {
  pink: '220,47,101',
  violet: '139,92,246',
  blue: '59,130,246',
  cyan: '6,182,212',
};

// ─── Pillar icons ─────────────────────────────────────────────────────────────

function IconFinancial() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 3v18h18" />
      <path d="M7 14l3.5-4 3 2.5L21 6" />
    </svg>
  );
}
function IconGst() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 11.5 11 13.5 15.5 9" />
      <path d="M5 21V5a2 2 0 0 1 2-2h7l5 5v13a0 0 0 0 1 0 0H7a2 2 0 0 1-2-2Z" />
      <path d="M14 3v5h5" />
    </svg>
  );
}
function IconInventory() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5Z" />
      <path d="M3 7.5 12 12l9-4.5M12 12v9" />
    </svg>
  );
}
function IconRecon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 7a8 8 0 0 0-14-3M4 5v4h4" />
      <path d="M4 17a8 8 0 0 0 14 3M20 19v-4h-4" />
    </svg>
  );
}

// ─── Shared visual panel helpers ──────────────────────────────────────────────

function vPanel(isDark: boolean): React.CSSProperties {
  return {
    background: isDark
      ? 'linear-gradient(180deg, rgba(22,22,30,0.72) 0%, rgba(14,14,20,0.86) 100%)'
      : 'linear-gradient(180deg, #ffffff 0%, #f7f7fc 100%)',
    border: '1px solid var(--hairline-strong)',
    borderRadius: 14,
    overflow: 'hidden',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    boxShadow: isDark
      ? '0 1px 0 rgba(255,255,255,0.04) inset, 0 22px 55px -28px rgba(0,0,0,0.7)'
      : '0 2px 16px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.9)',
    position: 'relative',
  };
}

function vHeader(isDark: boolean, dot: string, label: string, right: React.ReactNode) {
  return (
    <div
      className="flex items-center justify-between px-3.5 py-2.5"
      style={{
        borderBottom: '1px solid var(--hairline)',
        background: isDark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.022)',
      }}
    >
      <span className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: dot, boxShadow: `0 0 8px ${dot}` }} />
        <span className="font-mono text-[10.5px] tracking-[0.05em] text-[var(--fg-tertiary)]">{label}</span>
      </span>
      <span className="font-mono text-[10px] text-[var(--fg-quaternary)]">{right}</span>
    </div>
  );
}

// ─── Visual 1 · Financial Operations — receivables aging ───────────────────────

function FinancialVisual({ isDark }: { isDark: boolean }) {
  const aging = [
    { lbl: '0–30 days', pct: 64, tone: 'var(--ok)' },
    { lbl: '31–60 days', pct: 26, tone: 'var(--warn)' },
    { lbl: '60+ days', pct: 10, tone: 'var(--brand)' },
  ];
  return (
    <div style={vPanel(isDark)}>
      {vHeader(isDark, 'rgba(34,197,94,1)', 'Accounts receivable', 'this quarter')}
      <div className="px-4 pt-4 pb-1">
        <div className="flex items-end justify-between">
          <div>
            <div className="font-serif text-[28px] leading-none tracking-[-0.015em] text-[var(--fg-primary)] tabular-nums">
              ₹3.8<span className="text-[var(--fg-tertiary)] text-[17px] ml-0.5">Cr</span>
            </div>
            <div className="font-mono text-[10px] text-[var(--fg-tertiary)] mt-1 tracking-[0.04em]">outstanding · 412 invoices</div>
          </div>
          <span className="font-mono text-[10.5px] text-[var(--ok)]">▲ 18% collected</span>
        </div>
      </div>
      <div className="px-4 pb-4 pt-3 flex flex-col gap-2.5">
        {aging.map((a) => (
          <div key={a.lbl}>
            <div className="flex justify-between font-mono text-[10px] text-[var(--fg-tertiary)] mb-1">
              <span>{a.lbl}</span>
              <span style={{ color: a.tone }}>{a.pct}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)' }}>
              <div className="h-full rounded-full" style={{ width: `${a.pct}%`, background: a.tone }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Visual 2 · GST Compliance — filing status ─────────────────────────────────

function GstVisual({ isDark }: { isDark: boolean }) {
  const rows = [
    { f: 'GSTR-1', s: 'Filed', ok: true },
    { f: 'GSTR-3B', s: 'Filed', ok: true },
    { f: 'e-Invoice · IRN', s: '4,128 today', ok: true },
    { f: 'e-Way Bills', s: 'Auto-synced', ok: true },
  ];
  return (
    <div style={vPanel(isDark)}>
      {vHeader(isDark, 'var(--accent)', 'Compliance · Oct FY26', 'GSP direct')}
      <div className="py-1">
        {rows.map((r, i) => (
          <div
            key={r.f}
            className="flex items-center justify-between px-4 py-2.5"
            style={{ borderTop: i ? '1px solid var(--hairline)' : 'none' }}
          >
            <span className="text-[12.5px] text-[var(--fg-primary)]">{r.f}</span>
            <span className="flex items-center gap-2">
              <span className="font-mono text-[10.5px] text-[var(--fg-secondary)]">{r.s}</span>
              <span
                className="w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
                style={{ background: 'rgba(34,197,94,0.14)', color: 'var(--ok)' }}
              >
                ✓
              </span>
            </span>
          </div>
        ))}
      </div>
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ borderTop: '1px solid var(--hairline)', background: isDark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.02)' }}
      >
        <span className="font-mono text-[10px] text-[var(--fg-tertiary)]">next due · GSTR-3B</span>
        <span className="font-mono text-[10px] text-[var(--accent-bright)]">in 6 days</span>
      </div>
    </div>
  );
}

// ─── Visual 3 · Inventory & Logistics — multi-branch stock ─────────────────────

function InventoryVisual({ isDark }: { isDark: boolean }) {
  const branches = [
    { b: 'Mumbai HQ', pct: 82, low: false },
    { b: 'Bengaluru', pct: 61, low: false },
    { b: 'Delhi', pct: 28, low: true },
    { b: 'Chennai', pct: 47, low: false },
  ];
  return (
    <div style={vPanel(isDark)}>
      {vHeader(isDark, 'rgba(59,130,246,1)', 'Stock · 4 branches', 'live')}
      <div className="px-4 py-4 flex flex-col gap-3">
        {branches.map((br) => (
          <div key={br.b} className="flex items-center gap-3">
            <span className="text-[11.5px] text-[var(--fg-primary)] w-[78px] shrink-0">{br.b}</span>
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)' }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${br.pct}%`, background: br.low ? 'var(--warn)' : 'rgba(59,130,246,0.85)' }}
              />
            </div>
            <span className="font-mono text-[10px] w-9 text-right" style={{ color: br.low ? 'var(--warn)' : 'var(--fg-tertiary)' }}>
              {br.low ? 'low' : `${br.pct}%`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Visual 4 · Reconciliation & Insights — match rate ─────────────────────────

function ReconVisual({ isDark }: { isDark: boolean }) {
  return (
    <div style={vPanel(isDark)}>
      {vHeader(isDark, 'rgba(6,182,212,1)', 'GSTR-2B reconciliation', 'live')}
      <div className="grid grid-cols-3" style={{ borderBottom: '1px solid var(--hairline)' }}>
        {[
          { lbl: 'Matched', val: '4,128', tone: 'var(--ok)' },
          { lbl: 'Mismatch', val: '17', tone: 'var(--warn)' },
          { lbl: 'At risk', val: '₹2.4L', tone: 'var(--fg-primary)' },
        ].map((s, i) => (
          <div key={s.lbl} className="px-3.5 py-3" style={{ borderRight: i < 2 ? '1px solid var(--hairline)' : 'none' }}>
            <div className="font-mono text-[9px] uppercase tracking-[0.06em] text-[var(--fg-tertiary)]">{s.lbl}</div>
            <div className="font-serif text-[22px] leading-none mt-1 tabular-nums tracking-[-0.015em]" style={{ color: s.tone }}>{s.val}</div>
          </div>
        ))}
      </div>
      <div className="px-4 py-4">
        <div className="flex justify-between font-mono text-[10px] text-[var(--fg-tertiary)]">
          <span>match rate</span>
          <span className="text-[var(--ok)]">99.6%</span>
        </div>
        <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)' }}>
          <div className="h-full rounded-full" style={{ width: '99.6%', background: 'linear-gradient(90deg, var(--ok), #4ade80)' }} />
        </div>
        <div className="mt-2.5 font-mono text-[9.5px] text-[var(--fg-quaternary)]">6,420 inv/min · bank + 2A/2B engine</div>
      </div>
    </div>
  );
}

// ─── CapabilityCard ─────────────────────────────────────────────────────────────

interface CapabilityCardProps {
  eyebrow: string;
  title: string;
  desc: string;
  features: string[];
  tone: Tone;
  icon: React.ReactNode;
  visual: React.ReactNode;
  className?: string;
}

function CapabilityCard({ eyebrow, title, desc, features, tone, icon, visual, className }: CapabilityCardProps) {
  const [hovered, setHovered] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const rgb = TONE_RGB[tone];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn('group relative overflow-hidden flex flex-col', className)}
      style={{
        background: isDark ? 'rgba(255,255,255,0.03)' : 'var(--bg-card)',
        border: `1px solid ${hovered ? 'rgba(220,47,101,0.30)' : 'var(--hairline)'}`,
        borderRadius: 28,
        backdropFilter: isDark ? 'blur(30px)' : undefined,
        WebkitBackdropFilter: isDark ? 'blur(30px)' : undefined,
        transition: 'transform 500ms cubic-bezier(.22,1,.36,1), border-color 500ms cubic-bezier(.22,1,.36,1), box-shadow 500ms cubic-bezier(.22,1,.36,1)',
        transform: hovered ? 'translateY(-8px)' : 'none',
        boxShadow: hovered
          ? '0 20px 80px rgba(220,47,101,0.15)'
          : isDark
            ? '0 1px 0 rgba(255,255,255,0.03) inset'
            : '0 1px 4px rgba(0,0,0,0.05), 0 2px 12px rgba(0,0,0,0.03)',
      }}
    >
      {/* per-tone glow wash behind the visual */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(70% 55% at 80% 0%, rgba(${rgb},${isDark ? 0.16 : 0.08}) 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0.7,
          transition: 'opacity 500ms cubic-bezier(.22,1,.36,1)',
        }}
      />

      {/* Content — icon, title, one-line desc, feature checks */}
      <div className="relative z-[1] flex flex-col gap-4 p-7 sm:p-9 pb-5 sm:pb-6">
        <div className="flex items-center gap-3">
          <span
            className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-[11px]"
            style={{
              background: `rgba(${rgb},${isDark ? 0.14 : 0.10})`,
              border: `1px solid rgba(${rgb},0.28)`,
              color: isDark ? '#fff' : `rgb(${rgb})`,
              transform: hovered ? 'rotate(5deg)' : 'none',
              transition: 'transform 500ms cubic-bezier(.22,1,.36,1)',
            }}
          >
            {icon}
          </span>
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--fg-tertiary)]">{eyebrow}</span>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="m-0 font-serif font-semibold text-[clamp(20px,2.1vw,26px)] leading-[1.32] tracking-[-0.01em] text-[var(--fg-primary)] text-balance">
            {title}
          </h3>
          <p className="m-0 text-[15px] leading-[1.55] text-[var(--fg-secondary)] max-w-[44ch]">{desc}</p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5 m-0 p-0 list-none">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-[13.5px] text-[var(--fg-secondary)]">
              <span
                className="shrink-0 inline-flex items-center justify-center w-[18px] h-[18px] rounded-full"
                style={{ background: 'rgba(220,47,101,0.12)', color: 'var(--accent-bright)' }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Visual — bleeds to the bottom edge */}
      <div className="relative z-[1] mt-auto px-7 sm:px-9 pb-7 sm:pb-9 pt-1">{visual}</div>
    </div>
  );
}

// ─── ExcelCTA ───────────────────────────────────────────────────────────────────

function ExcelCTA() {
  return (
    <div
      className="relative overflow-hidden mt-6 sm:mt-7 text-center px-6 py-12 sm:py-16"
      style={{
        borderRadius: 28,
        background: 'linear-gradient(135deg, #5e2238 0%, #81314b 52%, #99385a 100%)',
        boxShadow: '0 30px 90px -40px rgba(129,49,75,0.7)',
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(60% 80% at 50% 0%, rgba(255,255,255,0.10), transparent 65%)' }}
      />
      <div className="relative z-[1]">
        <h3 className="m-0 font-serif font-semibold text-[clamp(22px,3vw,34px)] leading-[1.15] tracking-[-0.02em] text-white text-balance">
          Still using Excel and Google Sheets for your invoicing?
        </h3>
        <p className="mt-4 mb-0 text-[18px] font-light text-white/90">Try WhiteBooks for free</p>
        <p className="m-0 mt-1">
          <a
            href={SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[20px] font-medium underline underline-offset-4 transition-colors duration-200"
            style={{ color: '#ffd84d' }}
          >
            Create your first invoice
          </a>
        </p>
      </div>
    </div>
  );
}

// ─── WhyWhitebooks ──────────────────────────────────────────────────────────────

export function WhyWhitebooks() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <section className="relative overflow-hidden border-b border-[var(--hairline)] py-16 sm:py-20 md:py-24 lg:py-28">
      {/* Plain, unique backdrop — one soft brand glow behind the heading, no grid/mesh */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: isDark
            ? 'radial-gradient(60% 38% at 50% -2%, rgba(220,47,101,0.10), transparent 62%)'
            : 'radial-gradient(60% 38% at 50% -2%, rgba(220,47,101,0.05), transparent 62%)',
        }}
      />

      <div className="relative w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16">

        {/* Header — centered, max 700px */}
        <div className="mx-auto max-w-[700px] text-center flex flex-col items-center gap-5 mb-12 sm:mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-[11px] tracking-[0.14em] uppercase text-[var(--accent-bright)]"
            style={{ background: 'rgba(220,47,101,0.10)', border: '1px solid rgba(220,47,101,0.22)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" style={{ boxShadow: '0 0 8px rgba(220,47,101,0.7)' }} />
            Why WhiteBooks
          </span>
          <h2 className="m-0 font-serif font-semibold text-[clamp(32px,5vw,52px)] leading-[1.08] tracking-[-0.025em] text-[var(--fg-primary)] text-balance">
            Everything your business needs.<br className="hidden sm:block" /> Built into one platform.
          </h2>
          <p className="m-0 text-[16px] sm:text-[17px] leading-[1.6] text-[var(--fg-secondary)] max-w-[640px]">
            Automate accounting, GST compliance, inventory and reconciliation workflows with a single integrated platform.
          </p>
        </div>

        {/* Bento grid — asymmetric pinwheel: 7/5 then 5/7 on lg */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          <CapabilityCard
            className="lg:col-span-7"
            eyebrow="Financial Operations"
            title="Run the whole money cycle in one place."
            desc="From quote to collection — receivables, billing and books that stay current on their own."
            features={['Accounts Receivable', 'Quotations', 'Automated Accounting', 'Business Reports']}
            tone="pink"
            icon={<IconFinancial />}
            visual={<FinancialVisual isDark={isDark} />}
          />
          <CapabilityCard
            className="lg:col-span-5"
            eyebrow="GST Compliance"
            title="Every filing, GSP-direct."
            desc="Invoicing to filing on a license held straight from GSTN — no resold pipes."
            features={['GST Invoicing', 'E-Invoice', 'E-Way Bills', 'Return Filing']}
            tone="violet"
            icon={<IconGst />}
            visual={<GstVisual isDark={isDark} />}
          />
          <CapabilityCard
            className="lg:col-span-5"
            eyebrow="Inventory & Logistics"
            title="Stock that stays in sync."
            desc="Track movement across every branch, with purchase and dispatch in one flow."
            features={['Inventory Management', 'Purchase Orders', 'Delivery Challans', 'Multi-branch Stock']}
            tone="blue"
            icon={<IconInventory />}
            visual={<InventoryVisual isDark={isDark} />}
          />
          <CapabilityCard
            className="lg:col-span-7"
            eyebrow="Reconciliation & Insights"
            title="Reconcile in seconds, decide with confidence."
            desc="Match 2A/2B and bank statements automatically, then read the result on live dashboards."
            features={['GSTR-2A/2B Reconciliation', 'Bank Reconciliation', 'Live Dashboards', 'Business Reports']}
            tone="cyan"
            icon={<IconRecon />}
            visual={<ReconVisual isDark={isDark} />}
          />
        </div>

        {/* Conversion band */}
        <ExcelCTA />
      </div>
    </section>
  );
}

export default WhyWhitebooks;
