// PillarCards.tsx — Stripe-style asymmetric product overview cards with
// embedded mini product UI mocks + per-card gradient washes.

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/cn';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CardWashProps {
  tone: 'pink' | 'violet' | 'blue' | 'cyan' | 'amber';
  intensity?: number;
}

export interface PillarCardProps {
  tag: string;
  title: string;
  body: string;
  cta: string;
  tone: CardWashProps['tone'];
  mock?: React.ReactNode;
  onClick?: () => void;
  featured?: boolean;
  mockSide?: 'right' | 'left';
  /** API cards: free-sandbox highlight shown beside the mock. */
  sandboxLabel?: string;
  /** API cards: secondary CTA label (e.g. "Explore GST API"). */
  exploreLabel?: string;
  /** API cards: handler for the secondary CTA — routes to the docs. */
  onExplore?: () => void;
}

export interface ProductPillarCardProps {
  tag: string;
  title: string;
  body: string;
  cta: string;
  tone: CardWashProps['tone'];
  /** Headline stat shown as a chip over the visual, e.g. "< 60s" */
  metricValue: string;
  /** Supporting label under the stat, e.g. "2A/2B reconciliation" */
  metricLabel: string;
  onClick?: () => void;
  /** Span both columns on lg with a side-by-side text/visual layout. */
  wide?: boolean;
  /** Imported product screenshot. Falls back to a placeholder when omitted. */
  image?: string;
  imageAlt?: string;
}

// ─── Theme hook ───────────────────────────────────────────────────────────────

function useTheme(): 'dark' | 'light' {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof document === 'undefined') return 'dark';
    return (document.documentElement.dataset.theme as 'dark' | 'light') || 'dark';
  });
  useEffect(() => {
    const el = document.documentElement;
    const obs = new MutationObserver(() =>
      setTheme((el.dataset.theme as 'dark' | 'light') || 'dark')
    );
    obs.observe(el, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);
  return theme;
}

// ─── Shared mini-panel style helpers ─────────────────────────────────────────

function miniPanel(theme: 'dark' | 'light'): React.CSSProperties {
  const isDark = theme === 'dark';
  return {
    background: isDark
      ? 'linear-gradient(180deg, rgba(20,20,28,0.7) 0%, rgba(15,15,22,0.85) 100%)'
      : 'linear-gradient(180deg, #ffffff 0%, #f8f8fc 100%)',
    border: '1px solid var(--hairline-strong)',
    borderRadius: 10,
    overflow: 'hidden',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    boxShadow: isDark
      ? '0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 50px -20px rgba(0,0,0,0.5)'
      : '0 2px 16px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)',
    position: 'relative',
    zIndex: 1,
  };
}

function miniHeader(theme: 'dark' | 'light'): React.CSSProperties {
  const isDark = theme === 'dark';
  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 14px',
    borderBottom: '1px solid var(--hairline)',
    background: isDark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.025)',
  };
}

// ─── CardWash ─────────────────────────────────────────────────────────────────

export function CardWash({ tone, intensity = 1 }: CardWashProps) {
  const theme = useTheme();
  const isDark = theme === 'dark';

  const darkTones: Record<CardWashProps['tone'], { c1: string; c2: string }> = {
    pink: { c1: 'rgba(220,47,101,0.22)', c2: 'rgba(139,92,246,0.16)' },
    violet: { c1: 'rgba(139,92,246,0.22)', c2: 'rgba(59,130,246,0.16)' },
    blue: { c1: 'rgba(59,130,246,0.22)', c2: 'rgba(6,182,212,0.16)' },
    cyan: { c1: 'rgba(6,182,212,0.22)', c2: 'rgba(34,197,94,0.14)' },
    amber: { c1: 'rgba(245,158,11,0.22)', c2: 'rgba(220,47,101,0.18)' },
  };

  // Lighter, softer washes for white-card backgrounds
  const lightTones: Record<CardWashProps['tone'], { c1: string; c2: string }> = {
    pink: { c1: 'rgba(220,47,101,0.18)', c2: 'rgba(139,92,246,0.12)' },
    violet: { c1: 'rgba(139,92,246,0.16)', c2: 'rgba(59,130,246,0.12)' },
    blue: { c1: 'rgba(59,130,246,0.16)', c2: 'rgba(6,182,212,0.12)' },
    cyan: { c1: 'rgba(6,182,212,0.16)', c2: 'rgba(34,197,94,0.10)' },
    amber: { c1: 'rgba(245,158,11,0.18)', c2: 'rgba(220,47,101,0.14)' },
  };

  const t = isDark ? darkTones[tone] : lightTones[tone];
  // Slightly reduce intensity in light mode so washes read as elegant tints
  const effectiveIntensity = isDark ? intensity : intensity * 0.7;

  // Diagonal sheen flowing bottom-right → top-left, doubled for layered depth
  const sheen = `linear-gradient(135deg, ${t.c1} 0%, transparent 38%), linear-gradient(315deg, ${t.c2} 0%, transparent 32%)`;

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        borderRadius: 'inherit',
        overflow: 'hidden',
        opacity: effectiveIntensity,
        zIndex: 0,
      }}
    >
      {/* 1 · directional sheen */}
      <div style={{ position: 'absolute', inset: 0, background: sheen }} />

      {/* 2 · layered fluid orbs — slow, offset drift for a living surface */}
      <div
        className="wb-cardfx-orb wb-cardfx-orb-a"
        style={{
          width: 380, height: 380, left: '-16%', top: '-24%',
          background: `radial-gradient(circle, ${t.c1}, transparent 62%)`,
          filter: 'blur(46px)',
        }}
      />
      <div
        className="wb-cardfx-orb wb-cardfx-orb-b"
        style={{
          width: 320, height: 320, right: '-12%', top: '-14%',
          background: `radial-gradient(circle, ${t.c2}, transparent 60%)`,
          filter: 'blur(54px)',
        }}
      />
      <div
        className="wb-cardfx-orb wb-cardfx-orb-a"
        style={{
          width: 340, height: 340, right: '-18%', bottom: '-26%',
          background: `radial-gradient(circle, ${t.c1}, transparent 64%)`,
          filter: 'blur(50px)',
          animationDelay: '-7s',
          animationDuration: '24s',
        }}
      />

      {/* 3 · fine grain for tactile thickness */}
      <div className="wb-cardfx-grain" />
    </div>
  );
}

// ─── MiniReconMock ────────────────────────────────────────────────────────────

export function MiniReconMock() {
  const theme = useTheme();
  const isDark = theme === 'dark';
  const [matched, setMatched] = useState(0);

  useEffect(() => {
    let raf: number;
    const t0 = performance.now();
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 1400);
      const e = 1 - Math.pow(1 - k, 3);
      setMatched(Math.round(4128 * e));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={miniPanel(theme)}>
      <div style={miniHeader(theme)}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--ok)', boxShadow: '0 0 8px rgba(34,197,94,0.5)',
          } as React.CSSProperties}></span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.05em', color: 'var(--fg-tertiary)' } as React.CSSProperties}>
            GSTR-2B · October FY26
          </span>
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-quaternary)' } as React.CSSProperties}>live</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1px solid var(--hairline)' } as React.CSSProperties}>
        {[
          { lbl: 'Matched', val: matched.toLocaleString('en-IN'), tone: 'var(--ok)' },
          { lbl: 'Mismatch', val: '17', tone: 'var(--warn)' },
          { lbl: 'At risk', val: '₹2.4L', tone: 'var(--fg-primary)' },
        ].map((s, i) => (
          <div key={i} style={{
            padding: '14px 16px',
            borderRight: i < 2 ? '1px solid var(--hairline)' : 'none',
          } as React.CSSProperties}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' } as React.CSSProperties}>
              {s.lbl}
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 26, color: s.tone, marginTop: 4, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.015em', lineHeight: 1 } as React.CSSProperties}>
              {s.val}
            </div>
          </div>
        ))}
      </div>

      {/* Match-rate bar */}
      <div style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-tertiary)' } as React.CSSProperties}>
          <span>match rate</span>
          <span style={{ color: 'var(--ok)' } as React.CSSProperties}>99.6%</span>
        </div>
        <div style={{
          marginTop: 8, height: 5, borderRadius: 3,
          background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)',
          overflow: 'hidden',
        }}>
          <div style={{
            width: '99.6%',
            height: '100%',
            background: 'linear-gradient(90deg, var(--ok), #4ade80)',
            boxShadow: '0 0 10px rgba(34,197,94,0.4)',
          } as React.CSSProperties} />
        </div>
        <div style={{ marginTop: 10, fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-quaternary)' } as React.CSSProperties}>
          6,420 inv/min · matching engine v3.2
        </div>
      </div>

      {/* Tiny preview rows */}
      <div style={{ borderTop: '1px solid var(--hairline)' } as React.CSSProperties}>
        {[
          { v: 'IBM India Pvt Ltd', a: '₹12,40,000', s: 'match' },
          { v: 'Suresh Trading Co', a: '₹22,400', s: 'amber' },
          { v: 'Hindustan Unilever', a: '₹32,84,500', s: 'match' },
        ].map((r, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 16px',
            borderBottom: i < 2 ? '1px solid var(--hairline)' : 'none',
            fontSize: 11.5,
          } as React.CSSProperties}>
            <span style={{ color: 'var(--fg-primary)' } as React.CSSProperties}>{r.v}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-secondary)', fontSize: 10.5 } as React.CSSProperties}>{r.a}</span>
              <span style={{
                width: 14,
                height: 14,
                borderRadius: 4,
                background: r.s === 'match' ? 'rgba(34,197,94,0.12)' : 'rgba(245,158,11,0.14)',
                color: r.s === 'match' ? 'var(--ok)' : 'var(--warn)',
                fontSize: 9,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              } as React.CSSProperties}>
                {r.s === 'match' ? '✓' : '!'}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MiniEinvoiceMock ─────────────────────────────────────────────────────────

export function MiniEinvoiceMock() {
  const theme = useTheme();
  const isDark = theme === 'dark';

  // Syntax highlight colors — pastel for dark bg, deep saturated for light bg
  const syn = isDark
    ? { key: '#f0a8c3', str: '#a8e6a3', num: '#e9d28a' }
    : { key: '#b91c7a', str: '#15803d', num: '#b45309' };

  return (
    <div style={miniPanel(theme)}>
      <div style={miniHeader(theme)}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--accent)', boxShadow: '0 0 8px var(--accent-glow)',
          } as React.CSSProperties}></span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.05em', color: 'var(--fg-tertiary)' } as React.CSSProperties}>
            POST /v1/einvoice
          </span>
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ok)' } as React.CSSProperties}>
          200 · 182ms
        </span>
      </div>
      <div style={{ padding: '18px 16px', fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.55, color: 'var(--fg-secondary)' } as React.CSSProperties}>
        <div style={{ color: 'var(--fg-quaternary)' } as React.CSSProperties}>{'{'}</div>
        <div style={{ paddingLeft: 14 }}>
          <div><span style={{ color: syn.key }}>"irn"</span>: <span style={{ color: syn.str }}>"a4f2c91e8b7d3..."</span>,</div>
          <div><span style={{ color: syn.key }}>"ack_no"</span>: <span style={{ color: syn.num }}>112510144782611</span>,</div>
          <div><span style={{ color: syn.key }}>"qr_code"</span>: <span style={{ color: syn.str }}>"eyJ0eXAi..."</span>,</div>
          <div><span style={{ color: syn.key }}>"signed_at"</span>: <span style={{ color: syn.str }}>"2026-05-16T11:08:42Z"</span></div>
        </div>
        <div style={{ color: 'var(--fg-quaternary)' } as React.CSSProperties}>{'}'}</div>
      </div>
      <div style={{
        borderTop: '1px solid var(--hairline)',
        padding: '12px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        color: 'var(--fg-tertiary)',
      } as React.CSSProperties}>
        <span>p50 latency</span>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--fg-primary)', letterSpacing: '-0.01em' } as React.CSSProperties}>
          &lt;200<span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-tertiary)', marginLeft: 2 } as React.CSSProperties}>ms</span>
        </span>
      </div>
    </div>
  );
}

// ─── MiniEwayMock ─────────────────────────────────────────────────────────────

export function MiniEwayMock() {
  const theme = useTheme();
  const isDark = theme === 'dark';

  return (
    <div style={miniPanel(theme)}>
      <div style={miniHeader(theme)}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--ok)', boxShadow: '0 0 8px rgba(34,197,94,0.5)',
          } as React.CSSProperties}></span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.05em', color: 'var(--fg-tertiary)' } as React.CSSProperties}>
            EWB · in transit
          </span>
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-quaternary)' } as React.CSSProperties}>
          2026-05-16
        </span>
      </div>

      <div style={{ padding: '16px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-secondary)', letterSpacing: '0.02em' } as React.CSSProperties}>
          <span style={{ color: 'var(--accent-bright)' } as React.CSSProperties}>EWB</span> 871-2026-04471
        </div>
        <div style={{ marginTop: 14, position: 'relative', height: 50 }}>
          {/* Route SVG */}
          <svg viewBox="0 0 240 50" width="100%" height="50" preserveAspectRatio="none">
            <defs>
              <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="var(--gradient-2)" />
              </linearGradient>
            </defs>
            <path
              d="M 8 38 Q 60 8 120 25 T 232 18"
              stroke="url(#routeGrad)"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              fill="none"
              opacity="0.7"
            />
            <path d="M 8 38 Q 60 8 120 25" stroke="url(#routeGrad)" strokeWidth="2" fill="none" />
            <circle cx="8" cy="38" r="4" fill="var(--accent)" />
            <circle
              cx="232" cy="18" r="4"
              fill={isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.10)'}
              stroke="var(--fg-tertiary)"
              strokeWidth="1"
            />
            <circle cx="120" cy="25" r="3" fill="var(--fg-primary)" />
          </svg>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-tertiary)' } as React.CSSProperties}>
          <span><span style={{ color: 'var(--fg-secondary)' } as React.CSSProperties}>Pune</span> · origin</span>
          <span style={{ textAlign: 'right' }}><span style={{ color: 'var(--fg-secondary)' } as React.CSSProperties}>Bengaluru</span> · dest</span>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid var(--hairline)',
        padding: '12px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
      } as React.CSSProperties}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' } as React.CSSProperties}>
            Validity left
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--fg-primary)', letterSpacing: '-0.01em', marginTop: 2 } as React.CSSProperties}>
            8h <span style={{ color: 'var(--fg-tertiary)', fontSize: 14 } as React.CSSProperties}>14m</span>
          </div>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ok)' } as React.CSSProperties}>
          ● live tracking
        </div>
      </div>
    </div>
  );
}

// ─── MiniAccountingMock ───────────────────────────────────────────────────────

export function MiniAccountingMock() {
  const theme = useTheme();
  const isDark = theme === 'dark';
  const bars = [22, 38, 28, 52, 34, 60, 48, 72, 55, 80, 68, 92, 78, 95];

  return (
    <div style={miniPanel(theme)}>
      <div style={miniHeader(theme)}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ok)' } as React.CSSProperties}></span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.05em', color: 'var(--fg-tertiary)' } as React.CSSProperties}>
            Journal entries
          </span>
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-quaternary)' } as React.CSSProperties}>
          last 30 days
        </span>
      </div>

      <div style={{ padding: '18px 16px' }}>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: 30, color: 'var(--fg-primary)', letterSpacing: '-0.015em', lineHeight: 1 } as React.CSSProperties}>
          ₹4.2<span style={{ color: 'var(--fg-tertiary)', fontSize: 18, marginLeft: 4 } as React.CSSProperties}>Cr</span>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--fg-tertiary)', marginTop: 4, letterSpacing: '0.04em' } as React.CSSProperties}>
          posted automatically
        </div>

        <div style={{ marginTop: 18, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 64, gap: 3 }}>
          {bars.map((h, i) => (
            <div key={i} style={{
              flex: 1,
              height: `${h}%`,
              background: i === bars.length - 1
                ? 'linear-gradient(180deg, var(--accent), var(--gradient-2))'
                : isDark
                  ? `rgba(139,92,246,${0.25 + (i / bars.length) * 0.45})`
                  : `rgba(139,92,246,${0.18 + (i / bars.length) * 0.55})`,
              borderRadius: '2px 2px 0 0',
              transition: 'height 600ms ease',
            } as React.CSSProperties} />
          ))}
        </div>
      </div>

      <div style={{
        borderTop: '1px solid var(--hairline)',
        padding: '10px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        color: 'var(--fg-tertiary)',
      } as React.CSSProperties}>
        <span>2,418 entries</span>
        <span style={{ color: 'var(--accent-bright)' } as React.CSSProperties}>0 manual</span>
      </div>
    </div>
  );
}

// ─── MiniKSAMock ──────────────────────────────────────────────────────────────

export function MiniKSAMock() {
  const theme = useTheme();

  return (
    <div style={miniPanel(theme)}>
      <div style={miniHeader(theme)}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--warn)', boxShadow: '0 0 8px rgba(245,158,11,0.5)',
          } as React.CSSProperties}></span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.05em', color: 'var(--fg-tertiary)' } as React.CSSProperties}>
            ZATCA · Phase 2
          </span>
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-quaternary)' } as React.CSSProperties}>
          KSA
        </span>
      </div>

      <div style={{ padding: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } as React.CSSProperties}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' } as React.CSSProperties}>
            Cleared today
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 24, color: 'var(--fg-primary)', letterSpacing: '-0.01em', marginTop: 4 } as React.CSSProperties}>
            14,820
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' } as React.CSSProperties}>
            Real-time
          </div>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: 24, color: 'var(--ok)', letterSpacing: '-0.01em', marginTop: 4 } as React.CSSProperties}>
            100%
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--hairline)', padding: '12px 16px' } as React.CSSProperties}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 }}>
          <span style={{ width: 12, height: 8, background: 'linear-gradient(180deg, #006c35 50%, #fff 50%)', borderRadius: 1 } as React.CSSProperties}></span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-secondary)' } as React.CSSProperties}>
            المملكة العربية السعودية
          </span>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-quaternary)' } as React.CSSProperties}>
          Cryptographic stamp · Arabic + EN
        </div>
      </div>
    </div>
  );
}

// ─── MiniNoticeMock ───────────────────────────────────────────────────────────

export function MiniNoticeMock() {
  const theme = useTheme();
  const isDark = theme === 'dark';

  const rows = [
    { id: 'GST-0142', portal: 'GSTN', due: '8d', tone: 'var(--warn)' },
    { id: 'IT-0087', portal: 'ITD', due: '21d', tone: 'var(--fg-secondary)' },
    { id: 'TDS-0033', portal: 'TRACES', due: 'sent', tone: 'var(--ok)' },
  ];

  return (
    <div style={miniPanel(theme)}>
      <div style={miniHeader(theme)}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--warn)', boxShadow: '0 0 8px rgba(245,158,11,0.5)',
          } as React.CSSProperties}></span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.05em', color: 'var(--fg-tertiary)' } as React.CSSProperties}>
            Notices · auto-sync
          </span>
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-quaternary)' } as React.CSSProperties}>
          GSTN · ITD · TRACES
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderBottom: '1px solid var(--hairline)' } as React.CSSProperties}>
        {[
          { lbl: 'Total', val: '24', tone: 'var(--fg-primary)' },
          { lbl: 'Pending', val: '8', tone: 'var(--warn)' },
          { lbl: 'Due wk', val: '3', tone: 'var(--danger)' },
        ].map((s, i) => (
          <div key={i} style={{
            padding: '14px 16px',
            borderRight: i < 2 ? '1px solid var(--hairline)' : 'none',
          } as React.CSSProperties}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-tertiary)' } as React.CSSProperties}>
              {s.lbl}
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 26, color: s.tone, marginTop: 4, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.015em', lineHeight: 1 } as React.CSSProperties}>
              {s.val}
            </div>
          </div>
        ))}
      </div>

      {/* Notice preview rows */}
      <div>
        {rows.map((r, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '9px 16px',
            borderBottom: i < rows.length - 1 ? '1px solid var(--hairline)' : 'none',
            fontSize: 11.5,
          } as React.CSSProperties}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-primary)', fontSize: 11 } as React.CSSProperties}>{r.id}</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-quaternary)', fontSize: 10 } as React.CSSProperties}>{r.portal}</span>
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: r.tone,
              background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
              borderRadius: 4,
              padding: '2px 7px',
            } as React.CSSProperties}>
              {r.due}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MiniGstApiMock ──────────────────────────────────────────────────────────

export function MiniGstApiMock() {
  const theme = useTheme();
  const isDark = theme === 'dark';

  // Syntax highlight colors — pastel for dark bg, deep saturated for light bg
  const syn = isDark
    ? { key: '#f0a8c3', str: '#a8e6a3', num: '#e9d28a' }
    : { key: '#b91c7a', str: '#15803d', num: '#b45309' };

  return (
    <div style={miniPanel(theme)}>
      <div style={miniHeader(theme)}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--ok)', boxShadow: '0 0 8px rgba(34,197,94,0.5)',
          } as React.CSSProperties}></span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.05em', color: 'var(--fg-tertiary)' } as React.CSSProperties}>
            GET /v1/gstin/validate
          </span>
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ok)' } as React.CSSProperties}>
          200 · 61ms
        </span>
      </div>
      <div style={{ padding: '16px', fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.6, color: 'var(--fg-secondary)' } as React.CSSProperties}>
        <div style={{ color: 'var(--fg-quaternary)' }}>{'{'}</div>
        <div style={{ paddingLeft: 14 }}>
          <div><span style={{ color: syn.key }}>"gstin"</span>: <span style={{ color: syn.str }}>"27AAABM0035D1ZK"</span>,</div>
          <div><span style={{ color: syn.key }}>"legal_name"</span>: <span style={{ color: syn.str }}>"IBM India Pvt Ltd"</span>,</div>
          <div><span style={{ color: syn.key }}>"status"</span>: <span style={{ color: syn.str }}>"Active"</span>,</div>
          <div><span style={{ color: syn.key }}>"last_filed"</span>: <span style={{ color: syn.num }}>"2026-04"</span></div>
        </div>
        <div style={{ color: 'var(--fg-quaternary)' }}>{'}'}</div>
      </div>
      <div style={{
        borderTop: '1px solid var(--hairline)',
        padding: '10px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        color: 'var(--fg-tertiary)',
      } as React.CSSProperties}>
        <span>GSTR-1, 3B, 9, 9C · all returns</span>
        <span style={{ color: 'var(--accent-bright)' } as React.CSSProperties}>Direct GSP</span>
      </div>
    </div>
  );
}

// ─── MiniEwayApiMock ──────────────────────────────────────────────────────────

export function MiniEwayApiMock() {
  const theme = useTheme();
  const isDark = theme === 'dark';

  // Syntax highlight colors — pastel for dark bg, deep saturated for light bg
  const syn = isDark
    ? { key: '#f0a8c3', str: '#a8e6a3', num: '#e9d28a' }
    : { key: '#b91c7a', str: '#15803d', num: '#b45309' };
  return (
    <div style={miniPanel(theme)}>
      <div style={miniHeader(theme)}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--ok)', boxShadow: '0 0 8px rgba(34,197,94,0.5)',
          } as React.CSSProperties}></span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.05em', color: 'var(--fg-tertiary)' } as React.CSSProperties}>
            POST /v1/ewaybill/create
          </span>
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ok)' } as React.CSSProperties}>
          200 · 194ms
        </span>
      </div>
      <div style={{ padding: '16px', fontFamily: 'var(--font-mono)', fontSize: 11, lineHeight: 1.6, color: 'var(--fg-secondary)' } as React.CSSProperties}>
        <div style={{ color: 'var(--fg-quaternary)' }}>{'{'}</div>
        <div style={{ paddingLeft: 14 }}>
          <div><span style={{ color: syn.key }}>"ewb_no"</span>: <span style={{ color: syn.str }}>"871-2026-044719"</span>,</div>
          <div><span style={{ color: syn.key }}>"valid_until"</span>: <span style={{ color: syn.num }}>"2026-06-11T18:00Z"</span>,</div>
          <div><span style={{ color: syn.key }}>"distance_km"</span>: <span style={{ color: syn.num }}>842</span>,</div>
          <div><span style={{ color: syn.key }}>"status"</span>: <span style={{ color: syn.str }}>"active"</span></div>
        </div>
        <div style={{ color: 'var(--fg-quaternary)' }}>{'}'}</div>
      </div>
      <div style={{
        borderTop: '1px solid var(--hairline)',
        padding: '10px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        color: 'var(--fg-tertiary)',
      } as React.CSSProperties}>
        <span>auto-populates from IRN</span>
        <span style={{ color: 'var(--ok)' } as React.CSSProperties}>● active</span>
      </div>
    </div>
  );
}

// ─── PillarCard ───────────────────────────────────────────────────────────────

export function PillarCard({
  tag,
  title,
  body,
  cta,
  tone,
  mock,
  onClick,
  featured = false,
  sandboxLabel,
  exploreLabel,
  onExplore,
}: PillarCardProps) {
  const [hovered, setHovered] = useState(false);
  const theme = useTheme();
  const isDark = theme === 'dark';
  const hasSandbox = Boolean(sandboxLabel || (exploreLabel && onExplore));

  // ─ Sandbox highlight + explore-CTA palette (theme-aware, lifted off the card) ─
  // Stronger fills/borders + brighter text than the base tokens so both read
  // clearly against the washed card, while staying subtle (not neon).
  const sandboxFx = isDark
    ? {
      bg: 'rgba(34,197,94,0.14)', border: 'rgba(74,222,128,0.50)', text: '#d8ffe9', icon: '#4ade80',
      shadow: '0 4px 16px -8px rgba(34,197,94,0.45), inset 0 1px 0 rgba(255,255,255,0.06)'
    }
    : {
      bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.45)', text: '#15803d', icon: '#16a34a',
      shadow: '0 4px 14px -8px rgba(34,197,94,0.40)'
    };

  const exploreIdle = isDark
    ? {
      bg: 'rgba(220,47,101,0.20)', border: 'rgba(255,138,184,0.55)', color: '#ff97c0',
      shadow: '0 6px 20px -10px rgba(220,47,101,0.60), inset 0 1px 0 rgba(255,255,255,0.08)'
    }
    : {
      bg: 'rgba(220,47,101,0.10)', border: 'rgba(220,47,101,0.50)', color: '#c41e57',
      shadow: '0 6px 18px -10px rgba(220,47,101,0.40)'
    };

  const cardShadow = isDark
    ? 'none'
    : hovered
      ? '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)'
      : '0 1px 4px rgba(0,0,0,0.06), 0 2px 12px rgba(0,0,0,0.04)';

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative overflow-hidden flex flex-col',
        // Featured: switch to side-by-side only from lg (1024px+) where there's enough room
        featured && 'lg:flex-row',
        // Mobile: always 1 column to prevent implicit column creation; sm+: span 2
        featured ? 'col-span-1 sm:col-span-2' : 'col-span-1',
        onClick ? 'cursor-pointer' : 'cursor-default',
      )}
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${hovered ? 'var(--hairline-bright)' : 'var(--hairline)'}`,
        borderRadius: 16,
        transition: 'border-color 180ms ease, transform 220ms ease, box-shadow 220ms ease',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: cardShadow,
      }}
    >
      <CardWash tone={tone} />

      {/* Text content */}
      <div
        className={cn(
          'relative z-[2] flex flex-col',
          // Padding scales up at each breakpoint
          featured
            ? 'p-5 gap-3 sm:p-6 sm:gap-4 lg:p-9 lg:max-w-[400px]'
            : 'p-4 gap-3 sm:p-5 lg:p-7',
        )}
        style={{ flex: featured ? 1 : 'none' }}
      >
        {/* Tag + optional nav arrow */}
        <div className="flex justify-between items-start">
          <span
            className="mono-tag accent"
            style={{
              background: 'transparent',
              border: 'none',
              borderRadius: 0,
              padding: '1px 0',
              boxShadow: 'none',
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.10em',
              color: isDark ? '#ff7aac' : '#c41e57',
            }}
          >
            <span
              className="dot"
              style={{
                width: 7,
                height: 7,
                flexShrink: 0,
                boxShadow: isDark
                  ? '0 0 10px rgba(220,47,101,0.95), 0 0 4px rgba(220,47,101,0.60)'
                  : '0 0 6px rgba(220,47,101,0.60)',
              }}
            />
            {tag}
          </span>
          {onClick && (
            <span
              className="shrink-0 w-7 h-7 rounded-[6px] flex items-center justify-center font-mono text-[13px] transition-all duration-[180ms]"
              style={{
                border: '1px solid var(--hairline)',
                color: hovered ? 'var(--accent-bright)' : 'var(--fg-tertiary)',
                background: hovered ? 'rgba(220,47,101,0.06)' : 'transparent',
              }}
            >
              ↗
            </span>
          )}
        </div>

        {/* Title — clamp shrinks gracefully on narrow viewports */}
        <h3
          className={cn(
            'm-0 font-normal leading-[1.12] tracking-[-0.018em]',
            featured
              ? 'text-[clamp(20px,3.2vw,38px)]'
              : 'text-[clamp(16px,2.2vw,28px)]',
          )}
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--fg-primary)' }}
        >
          {title}
        </h3>

        {/* Body */}
        <p
          className="body m-0"
          style={{ fontSize: featured ? 15 : 14 }}
        >
          {body}
        </p>

        {/* CTA pushed to card bottom */}
        <div className="mt-auto pt-3 sm:pt-[14px]">
          <span
            className="link-arrow transition-colors duration-[180ms]"
            style={{ color: hovered ? 'var(--accent-bright)' : 'var(--fg-primary)' }}
          >
            {cta}
          </span>
        </div>
      </div>

      {/* Mock panel
          • Featured: bottom panel sm–lg, side panel from lg onward
          • Non-featured: mock on the left. For API cards, a free-sandbox
            highlight + secondary "explore docs" CTA fills the empty right. */}
      {mock && (
        <div
          className={cn(
            'relative z-[2] flex',
            featured
              ? cn(
                // Column mode (all sizes): padding below the text block
                'px-5 pb-5 sm:px-6 sm:pb-6',
                // Row mode (lg+): right panel with no left padding
                'lg:items-center lg:justify-end lg:py-9 lg:pr-9 lg:pl-0',
              )
              : 'px-4 pb-4 sm:px-5 sm:pb-5 lg:px-7 lg:pb-7',
          )}
          style={{ flex: featured ? '1.1' : 'none' }}
        >
          {hasSandbox && !featured ? (
            <div className="w-full flex flex-col gap-5 sm:flex-row sm:items-stretch sm:gap-6">
              <div className="shrink-0">{mock}</div>

              {/* Free-sandbox highlight + explore CTA — fills the bottom-right */}
              <div className="flex flex-1 flex-col justify-end items-start gap-4 sm:items-end sm:text-right">
                {sandboxLabel && (
                  <div>
                    <span
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
                      style={{
                        border: `1px solid ${sandboxFx.border}`,
                        background: sandboxFx.bg,
                        boxShadow: sandboxFx.shadow,
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={sandboxFx.icon} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
                      </svg>
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: sandboxFx.text, letterSpacing: '0.01em' }}>
                        {sandboxLabel}
                      </span>
                    </span>
                    <p className="m-0 mt-2" style={{ fontSize: 11.5, color: 'var(--fg-secondary)', letterSpacing: '0.01em' }}>
                      No credit card · Live in minutes
                    </p>
                  </div>
                )}

                {exploreLabel && onExplore && (
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onExplore(); }}
                    className="inline-flex items-center gap-1.5 rounded-[10px] px-4 py-2.5 text-[13px] font-semibold transition-colors duration-[160ms] cursor-pointer"
                    style={{
                      border: `1px solid ${exploreIdle.border}`,
                      background: exploreIdle.bg,
                      color: exploreIdle.color,
                      boxShadow: exploreIdle.shadow,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--brand)';
                      e.currentTarget.style.color = '#fff';
                      e.currentTarget.style.borderColor = 'var(--brand)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = exploreIdle.bg;
                      e.currentTarget.style.color = exploreIdle.color;
                      e.currentTarget.style.borderColor = exploreIdle.border;
                    }}
                  >
                    {exploreLabel}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m13 6 6 6-6 6" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ) : (
            mock
          )}
        </div>
      )}
    </div>
  );
}

// ─── ImagePlaceholder ──────────────────────────────────────────────────────────
// Drop-in slot for the product visual. Replace the inner markup with an <img>,
// <video>, or illustration component later — the metric chip sits on top of it.

function ImagePlaceholder({ tone }: { tone: CardWashProps['tone'] }) {
  const theme = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-2 select-none"
      style={{
        background: isDark
          ? 'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.01))'
          : 'linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.008))',
      }}
      aria-hidden
    >
      <span
        style={{
          width: 34,
          height: 34,
          borderRadius: 9,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
          color: 'var(--fg-tertiary)',
        }}
      >
        {/* simple image glyph */}
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="8.5" cy="8.5" r="1.6" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-quaternary)' } as React.CSSProperties}>
        Image · replace me
      </span>
      {/* hidden tone reference keeps placeholder visually tied to the card wash */}
      <span style={{ display: 'none' }}>{tone}</span>
    </div>
  );
}

// ─── ProductPillarCard ─────────────────────────────────────────────────────────
// Stripe-style uniform product card: title-led header, generous breathing room,
// a dominant visual slot (image placeholder), and a metric chip floating over it.

export function ProductPillarCard({
  tag,
  title,
  body,
  cta,
  tone,
  metricValue,
  metricLabel,
  onClick,
  wide = false,
  image,
  imageAlt,
}: ProductPillarCardProps) {
  const [hovered, setHovered] = useState(false);
  const theme = useTheme();
  const isDark = theme === 'dark';

  const cardShadow = isDark
    ? 'none'
    : hovered
      ? '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)'
      : '0 1px 4px rgba(0,0,0,0.06), 0 2px 12px rgba(0,0,0,0.04)';

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative overflow-hidden flex flex-col',
        wide && 'lg:col-span-2 lg:flex-row',
        onClick ? 'cursor-pointer' : 'cursor-default',
      )}
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${hovered ? 'var(--hairline-bright)' : 'var(--hairline)'}`,
        borderRadius: 20,
        transition: 'border-color 180ms ease, transform 220ms ease, box-shadow 220ms ease',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: cardShadow,
      }}
    >
      <CardWash tone={tone} />

      {/* Text column */}
      <div
        className={cn(
          'relative z-[2] flex flex-col',
          // Generous top/side padding; no bottom padding so the visual can
          // bleed all the way to the card's bottom edge beneath it.
          'px-6 pt-6 pb-0 gap-3.5 sm:px-7 sm:pt-7 sm:gap-4 lg:px-9 lg:pt-9 lg:gap-5',
          wide && 'lg:max-w-[460px] lg:justify-center lg:pr-2 lg:pb-9',
        )}
      >
        {/* Header: tag + expand affordance */}
        <div className="flex justify-between items-start gap-4">
          <span
            className="mono-tag accent"
            style={{
              background: 'transparent',
              border: 'none',
              borderRadius: 0,
              padding: '1px 0',
              boxShadow: 'none',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.10em',
              color: isDark ? '#ff7aac' : '#c41e57',
            }}
          >
            <span
              className="dot"
              style={{
                width: 7,
                height: 7,
                flexShrink: 0,
                boxShadow: isDark
                  ? '0 0 10px rgba(220,47,101,0.95), 0 0 4px rgba(220,47,101,0.60)'
                  : '0 0 6px rgba(220,47,101,0.60)',
              }}
            />
            {tag}
          </span>
          {onClick && (
            <span
              className="shrink-0 w-9 h-9 rounded-[9px] flex items-center justify-center transition-all duration-[180ms]"
              style={{
                border: '1px solid var(--hairline)',
                color: hovered ? 'var(--accent-bright)' : 'var(--fg-tertiary)',
                background: hovered ? 'rgba(220,47,101,0.07)' : 'transparent',
              }}
              aria-hidden
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 4h11v11" />
                <path d="M20 4 4 20" />
              </svg>
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className="m-0 font-normal leading-[1.12] tracking-[-0.018em] text-[clamp(20px,2.4vw,30px)]"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--fg-primary)' }}
        >
          {title}
        </h3>

        {/* Body */}
        <p className="body m-0" style={{ fontSize: 15 }}>
          {body}
        </p>

        {/* CTA */}
        <div className="mt-1">
          <span
            className="link-arrow transition-colors duration-[180ms]"
            style={{ color: hovered ? 'var(--accent-bright)' : 'var(--fg-primary)' }}
          >
            {cta}
          </span>
        </div>
      </div>

      {/* Visual column — dominant screenshot that bleeds to the card's right
          and bottom edges (Stripe-style), framed at the top-left like a window
          peeking in, with the metric chip floating over it. */}
      <div
        className={cn(
          'relative z-[2] flex',
          wide
            ? 'mt-5 pl-6 sm:pl-7 lg:mt-0 lg:flex-1 lg:pl-8 lg:pt-9'
            : 'mt-5 flex-1 pl-6 sm:pl-7 lg:pl-9 lg:mt-7',
        )}
      >
        <div
          className={cn(
            'relative w-full overflow-hidden',
            wide ? 'min-h-[220px] lg:min-h-[340px]' : 'min-h-[210px] sm:min-h-[240px]',
          )}
          style={{
            borderTopLeftRadius: 14,
            borderTop: '1px solid var(--hairline-strong)',
            borderLeft: '1px solid var(--hairline-strong)',
            boxShadow: isDark
              ? '0 -1px 0 rgba(255,255,255,0.03) inset, 0 24px 60px -28px rgba(0,0,0,0.7)'
              : '0 24px 60px -32px rgba(0,0,0,0.28)',
          }}
        >
          {image ? (
            <img
              src={image}
              alt={imageAlt ?? ''}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-left-top"
            />
          ) : (
            <ImagePlaceholder tone={tone} />
          )}

          {/* Metric chip — Stripe-style stat overlay, bottom-left */}
          <div
            className="absolute left-3.5 bottom-3.5 z-[1] flex flex-col gap-0.5 px-3.5 py-2.5 rounded-[12px]"
            style={{
              background: isDark ? 'rgba(12,12,18,0.78)' : 'rgba(255,255,255,0.86)',
              border: '1px solid var(--hairline-strong)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: isDark
                ? '0 10px 30px -12px rgba(0,0,0,0.7)'
                : '0 8px 24px -10px rgba(0,0,0,0.2)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 24,
                lineHeight: 1,
                letterSpacing: '-0.015em',
                color: 'var(--fg-primary)',
                fontVariantNumeric: 'tabular-nums',
              } as React.CSSProperties}
            >
              {metricValue}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 9.5,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: 'var(--fg-tertiary)',
              } as React.CSSProperties}
            >
              {metricLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
