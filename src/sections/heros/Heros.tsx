// Heros.tsx — CopilotUI, TerminalUI, and three hero section variants.

import React, { useState, useEffect } from 'react';
import { ReconciliationUI } from './ReconciliationUI';
import { HeroBackdrop } from '@/components/ui/HeroBackdrop';
import { ButtonLink } from '@/components/ui/Button';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface HeroProps {
  motion: boolean;
  intensity: number;
  eyebrow: string;
  h1: { before: string; italic: string };
  sub: string;
  primary: string;
  secondary: string;
}

// ─── dotAvatar style helper ───────────────────────────────────────────────────

function dotAvatar(kind: 'user' | 'ai'): React.CSSProperties {
  return {
    width: 28,
    height: 28,
    borderRadius: 7,
    background:
      kind === 'user'
        ? 'rgba(255,255,255,0.06)'
        : 'linear-gradient(135deg, var(--gradient-1), var(--gradient-2))',
    color: kind === 'user' ? 'var(--fg-secondary)' : '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    fontWeight: 600,
    flexShrink: 0,
    boxShadow: kind === 'ai' ? '0 0 16px var(--accent-glow)' : 'none',
  };
}

// ─── CopilotUI ───────────────────────────────────────────────────────────────

interface QueryPair {
  q: string;
  a: string;
}

interface CopilotUIProps {
  motion?: boolean;
}

export function CopilotUI({ motion = true }: CopilotUIProps) {
  const queries: QueryPair[] = [
    {
      q: 'Why did my ITC drop ₹4.2L in October?',
      a: 'Three Section 17(5) blocked credits and one Rule 37A reversal for vendor "Suresh Trading Co" (unfiled for Aug + Sep).',
    },
    {
      q: 'Which vendors are unfiled for September?',
      a: 'Eight vendors. Top three by amount: Mahalakshmi Logistics (₹2.4L), TVS Auto Components (₹1.8L), Nilkamal Industries (₹78K).',
    },
    {
      q: "What's my Section 61 scrutiny risk this quarter?",
      a: 'Notice risk score 34/100. Driven by 11% ITC variance vs. last quarter. Below the 70 threshold.',
    },
  ];

  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (!motion) {
      setTyped(queries[0].q);
      return;
    }
    const cur = queries[step % queries.length].q;
    if (typed.length < cur.length) {
      const t = setTimeout(() => setTyped(cur.slice(0, typed.length + 1)), 38);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setStep((s) => s + 1);
      setTyped('');
    }, 4200);
    return () => clearTimeout(t);
  }, [typed, step, motion]);

  const cur = queries[step % queries.length];

  return (
    <div className="product-ui" style={{ minHeight: 460 }}>
      <div className="product-ui-hd">
        <div className="dots">
          <span></span><span></span><span></span>
        </div>
        <span className="breadcrumb">whitebooks ▸ copilot</span>
        <span style={{ marginLeft: 'auto', color: 'var(--fg-tertiary)', fontSize: 11 } as React.CSSProperties}>
          ● claude-haiku
        </span>
      </div>
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* User message */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div style={dotAvatar('user')}>U</div>
          <div style={{
            flex: 1,
            padding: '10px 14px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: 10,
            border: '1px solid var(--hairline)',
          } as React.CSSProperties}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg-primary)' } as React.CSSProperties}>
              {typed}<span className="caret-mono"></span>
            </div>
          </div>
        </div>

        {/* AI response */}
        {typed.length === cur.q.length && (
          <div className="row-in" style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={dotAvatar('ai')}>W</div>
            <div style={{ flex: 1 }}>
              <div style={{
                padding: '14px 16px',
                background: 'linear-gradient(180deg, rgba(220,47,101,0.06), rgba(139,92,246,0.04))',
                borderRadius: 10,
                border: '1px solid rgba(220,47,101,0.18)',
                fontSize: 13.5,
                lineHeight: 1.6,
                color: 'var(--fg-primary)',
              } as React.CSSProperties}>
                {cur.a}
                <div style={{
                  marginTop: 12,
                  padding: '10px 12px',
                  background: 'rgba(0,0,0,0.25)',
                  border: '1px solid var(--hairline)',
                  borderRadius: 6,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--fg-tertiary)',
                } as React.CSSProperties}>
                  ⤷ source: gstr_3b_oct_fy26 · 11 rows ·{' '}
                  <span style={{ color: 'var(--accent-bright)' } as React.CSSProperties}>view working paper</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Suggested queries */}
        <div style={{
          marginTop: 'auto',
          paddingTop: 16,
          borderTop: '1px solid var(--hairline)',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--fg-quaternary)',
          display: 'flex',
          gap: 12,
          flexWrap: 'wrap',
        } as React.CSSProperties}>
          <span style={{ color: 'var(--fg-tertiary)' } as React.CSSProperties}>try:</span>
          {queries.map((q, i) => (
            <span
              key={i}
              style={{
                padding: '4px 8px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--hairline)',
                borderRadius: 4,
                cursor: 'pointer',
                color: i === step % queries.length ? 'var(--accent-bright)' : 'var(--fg-tertiary)',
              } as React.CSSProperties}
            >
              {q.q}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── TerminalUI ───────────────────────────────────────────────────────────────

interface TerminalUIProps {
  motion?: boolean;
}

export function TerminalUI({ motion = true }: TerminalUIProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!motion) {
      setStep(99);
      return;
    }
    if (step < 4) {
      const t = setTimeout(() => setStep(step + 1), 900);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep(0), 4000);
    return () => clearTimeout(t);
  }, [step, motion]);

  return (
    <div className="product-ui" style={{ fontFamily: 'var(--font-mono)' } as React.CSSProperties}>
      <div className="product-ui-hd">
        <div className="dots">
          <span></span><span></span><span></span>
        </div>
        <span className="breadcrumb">~ / whitebooks-sdk</span>
        <span style={{ marginLeft: 'auto', color: 'var(--fg-tertiary)' } as React.CSSProperties}>node v20.11</span>
      </div>
      <div style={{ padding: 20, fontSize: 12.5, lineHeight: 1.7, color: 'var(--fg-secondary)' } as React.CSSProperties}>
        <div>
          <span style={{ color: 'var(--accent-bright)' } as React.CSSProperties}>$</span>{' '}
          wb einvoice create --from invoice.json
        </div>
        {step >= 1 && (
          <div className="row-in" style={{ color: 'var(--fg-tertiary)' } as React.CSSProperties}>
            <span style={{ color: 'var(--ok)' } as React.CSSProperties}>✓</span>{' '}
            validating against IRP schema...
          </div>
        )}
        {step >= 2 && (
          <div className="row-in" style={{ color: 'var(--fg-tertiary)' } as React.CSSProperties}>
            <span style={{ color: 'var(--ok)' } as React.CSSProperties}>✓</span>{' '}
            GSTIN <span style={{ color: '#f0a8c3' }}>29AAACR5055K1Z5</span> verified
          </div>
        )}
        {step >= 3 && (
          <div className="row-in" style={{ color: 'var(--fg-tertiary)' } as React.CSSProperties}>
            <span style={{ color: 'var(--ok)' } as React.CSSProperties}>✓</span>{' '}
            IRN generated in <span style={{ color: 'var(--accent-bright)' } as React.CSSProperties}>182ms</span>
          </div>
        )}
        {step >= 4 && (
          <div
            className="row-in"
            style={{
              marginTop: 10,
              padding: 12,
              background: 'rgba(0,0,0,0.35)',
              borderRadius: 6,
              border: '1px solid var(--hairline)',
            } as React.CSSProperties}
          >
            <div style={{ color: 'var(--fg-quaternary)' } as React.CSSProperties}>{'{'}</div>
            <div style={{ paddingLeft: 16 }}>
              <span style={{ color: '#f0a8c3' }}>"irn"</span>:{' '}
              <span style={{ color: '#a8e6a3' }}>"a4f2c91e8b7d3..."</span>,<br />
              <span style={{ color: '#f0a8c3' }}>"ack_no"</span>:{' '}
              <span style={{ color: '#e9d28a' }}>112510144782611</span>,<br />
              <span style={{ color: '#f0a8c3' }}>"qr_code"</span>:{' '}
              <span style={{ color: '#a8e6a3' }}>"eyJ0eXAiOiJK..."</span>,<br />
              <span style={{ color: '#f0a8c3' }}>"signed_at"</span>:{' '}
              <span style={{ color: '#a8e6a3' }}>"2026-05-16T11:08:42Z"</span>
            </div>
            <div style={{ color: 'var(--fg-quaternary)' } as React.CSSProperties}>{'}'}</div>
          </div>
        )}
        <div style={{ marginTop: 12 }}>
          <span style={{ color: 'var(--accent-bright)' } as React.CSSProperties}>$</span>{' '}
          <span className="caret-mono"></span>
        </div>
      </div>
    </div>
  );
}

// ─── Hero variants ────────────────────────────────────────────────────────────

export function HeroReconciliation({
  motion,
  intensity,
  eyebrow,
  h1,
  sub,
  primary,
  secondary,
}: HeroProps) {
  return (
    <section className="section relative" style={{ overflow: 'hidden', paddingTop: 100, paddingBottom: 120 }}>
      <HeroBackdrop intensity={intensity} />
      <div className="container relative" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: 56, alignItems: 'center' }}>
          <div className="wb-wrap wb-hero-inner">
            <div className="wb-stagger in">
              <div>
                <span className="wb-eyebrow">
                  <span className="wb-eyebrow-dot" aria-hidden="true"></span>
                  {eyebrow}
                </span>
              </div>
              <h1 className="wb-display" style={{ marginTop: 22 }}>
                {h1.before}
                <span className="accent">{h1.italic}</span>
              </h1>
              <p className="lede" style={{ marginTop: 26 }}>{sub}</p>
              <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <ButtonLink href="#" arrow onClick={(e) => e.preventDefault()}>
                  {primary}
                </ButtonLink>
                <ButtonLink href="#" variant="ghost" onClick={(e) => e.preventDefault()}>
                  {secondary}
                </ButtonLink>
              </div>
              <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <span className="mono-tag accent"><span className="dot"></span>GSP licensed</span>
                <span className="mono-tag"><span className="dot"></span>12,000+ businesses</span>
                <span className="mono-tag"><span className="dot"></span>10 Cr+ invoices</span>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <ReconciliationUI motion={motion} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function HeroCopilot({
  motion,
  intensity,
  eyebrow,
  h1,
  sub,
  primary,
  secondary,
}: HeroProps) {
  return (
    <section className="section relative" style={{ overflow: 'hidden', paddingTop: 100, paddingBottom: 120 }}>
      <HeroBackdrop intensity={intensity} />
      <div className="container relative" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: 56, alignItems: 'center' }}>
          <div>
            <div className="eyebrow eyebrow-accent">
              <span className="dot"></span>{eyebrow}
            </div>
            <h1 className="h-display" style={{ marginTop: 22 }}>
              {h1.before}
              <em className="grad-text" style={{ fontStyle: 'italic' }}>{h1.italic}</em>
            </h1>
            <p className="lede" style={{ marginTop: 26 }}>{sub}</p>
            <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <ButtonLink href="#" arrow onClick={(e) => e.preventDefault()}>
                {primary}
              </ButtonLink>
              <ButtonLink href="#" variant="ghost" onClick={(e) => e.preventDefault()}>
                {secondary}
              </ButtonLink>
            </div>
            <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <span className="mono-tag accent"><span className="dot"></span>AI on the Anthropic API</span>
              <span className="mono-tag"><span className="dot"></span>Data isolated</span>
              <span className="mono-tag"><span className="dot"></span>5,000+ CA firms</span>
            </div>
          </div>
          <CopilotUI motion={motion} />
        </div>
      </div>
    </section>
  );
}

export function HeroTerminal({
  motion,
  intensity,
  eyebrow,
  h1,
  sub,
  primary,
  secondary,
}: HeroProps) {
  return (
    <section className="section relative" style={{ overflow: 'hidden', paddingTop: 100, paddingBottom: 120 }}>
      <HeroBackdrop intensity={intensity} />
      <div className="container relative" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div className="eyebrow" style={{ justifyContent: 'center' }}>
          <span className="dot"></span>{eyebrow}
        </div>
        <h1 className="h-display" style={{ marginTop: 22, maxWidth: 920, margin: '22px auto 0' }}>
          {h1.before}<em>{h1.italic}</em>
        </h1>
        <p className="lede" style={{ marginTop: 26, marginLeft: 'auto', marginRight: 'auto' }}>{sub}</p>
        <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <ButtonLink href="#" arrow onClick={(e) => e.preventDefault()}>
            {primary}
          </ButtonLink>
          <ButtonLink href="#" variant="ghost" onClick={(e) => e.preventDefault()}>
            {secondary}
          </ButtonLink>
        </div>
        <div style={{ marginTop: 56, maxWidth: 820, marginLeft: 'auto', marginRight: 'auto' }}>
          <TerminalUI motion={motion} />
        </div>
        <div style={{ marginTop: 28, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <span className="mono-tag"><span className="dot"></span>p50 latency &lt;200ms</span>
          <span className="mono-tag"><span className="dot"></span>99.95% uptime SLA</span>
          <span className="mono-tag accent"><span className="dot"></span>Direct GSP pipe</span>
        </div>
      </div>
    </section>
  );
}
