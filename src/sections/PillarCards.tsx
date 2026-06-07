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
}

// ─── Shared mini-panel style helpers ─────────────────────────────────────────

function miniPanel(): React.CSSProperties {
  return {
    background: 'linear-gradient(180deg, rgba(20,20,28,0.7) 0%, rgba(15,15,22,0.85) 100%)',
    border: '1px solid var(--hairline-strong)',
    borderRadius: 10,
    overflow: 'hidden',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    boxShadow: '0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 50px -20px rgba(0,0,0,0.5)',
    position: 'relative',
    zIndex: 1,
  };
}

function miniHeader(): React.CSSProperties {
  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 14px',
    borderBottom: '1px solid var(--hairline)',
    background: 'rgba(255,255,255,0.015)',
  };
}

// ─── CardWash ─────────────────────────────────────────────────────────────────

export function CardWash({ tone, intensity = 1 }: CardWashProps) {
  const tones: Record<CardWashProps['tone'], { c1: string; c2: string }> = {
    pink: { c1: 'rgba(220,47,101,0.22)', c2: 'rgba(139,92,246,0.16)' },
    violet: { c1: 'rgba(139,92,246,0.22)', c2: 'rgba(59,130,246,0.16)' },
    blue: { c1: 'rgba(59,130,246,0.22)', c2: 'rgba(6,182,212,0.16)' },
    cyan: { c1: 'rgba(6,182,212,0.22)', c2: 'rgba(34,197,94,0.14)' },
    amber: { c1: 'rgba(245,158,11,0.22)', c2: 'rgba(220,47,101,0.18)' },
  };
  const t = tones[tone];

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      borderRadius: 'inherit',
      overflow: 'hidden',
      opacity: intensity,
      zIndex: 0,
    }}>
      <div style={{
        position: 'absolute',
        width: 520,
        height: 520,
        right: -200,
        bottom: -200,
        background: `radial-gradient(circle, ${t.c1}, transparent 60%)`,
        filter: 'blur(40px)',
      }} />
      <div style={{
        position: 'absolute',
        width: 380,
        height: 380,
        right: 20,
        top: -160,
        background: `radial-gradient(circle, ${t.c2}, transparent 60%)`,
        filter: 'blur(50px)',
      }} />
    </div>
  );
}

// ─── MiniReconMock ────────────────────────────────────────────────────────────

export function MiniReconMock() {
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
    <div style={miniPanel()}>
      <div style={miniHeader()}>
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
        <div style={{ marginTop: 8, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
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
  return (
    <div style={miniPanel()}>
      <div style={miniHeader()}>
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
          <div><span style={{ color: '#f0a8c3' }}>"irn"</span>: <span style={{ color: '#a8e6a3' }}>"a4f2c91e8b7d3..."</span>,</div>
          <div><span style={{ color: '#f0a8c3' }}>"ack_no"</span>: <span style={{ color: '#e9d28a' }}>112510144782611</span>,</div>
          <div><span style={{ color: '#f0a8c3' }}>"qr_code"</span>: <span style={{ color: '#a8e6a3' }}>"eyJ0eXAi..."</span>,</div>
          <div><span style={{ color: '#f0a8c3' }}>"signed_at"</span>: <span style={{ color: '#a8e6a3' }}>"2026-05-16T11:08:42Z"</span></div>
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
  return (
    <div style={miniPanel()}>
      <div style={miniHeader()}>
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
            <circle cx="232" cy="18" r="4" fill="rgba(255,255,255,0.15)" stroke="var(--fg-tertiary)" strokeWidth="1" />
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
  const bars = [22, 38, 28, 52, 34, 60, 48, 72, 55, 80, 68, 92, 78, 95];

  return (
    <div style={miniPanel()}>
      <div style={miniHeader()}>
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
                : `rgba(139,92,246,${0.25 + (i / bars.length) * 0.45})`,
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
  return (
    <div style={miniPanel()}>
      <div style={miniHeader()}>
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
}: PillarCardProps) {
  const [hovered, setHovered] = useState(false);

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
        transition: 'border-color 180ms ease, transform 220ms ease',
        transform: hovered ? 'translateY(-2px)' : 'none',
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
          <span className="mono-tag accent">
            <span className="dot" />
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
          • Featured: hidden on phones (<sm), shown as bottom panel sm–lg,
            side panel from lg onward
          • Non-featured: hidden below lg to keep cards compact on mobile/tablet */}
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
          {mock}
        </div>
      )}
    </div>
  );
}
