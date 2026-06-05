import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@/components/icons/Icon';
import { ButtonLink } from '@/components/ui/Button';

// ─── useCountUp (wb-content local variant) ────────────────────────────────────
// Signature: useCountUp(target, duration?, start?)

function useCountUp(target: number, duration = 1200, start = false): number {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(target * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return val;
}

// ─── WhySection ───────────────────────────────────────────────────────────────

interface WhyItem {
  n: string;
  icon: React.ReactNode;
  title: string;
  body: string;
}

export function WhySection() {
  const items: WhyItem[] = [
    { n: '01', icon: <Icon.Seal />, title: 'Direct GSP license', body: "Whitebooks holds its GSP license directly from GSTN — not a resold pipe. Faster latency, better uptime, and a roadmap that doesn't depend on someone else's release cycle." },
    { n: '02', icon: <Icon.Brain />, title: 'AI that does the work', body: 'Anomaly detection, fuzzy invoice reconciliation, notice prediction, and a compliance copilot — built into the products from day one. Trained on 10 crore+ Indian invoices.' },
    { n: '03', icon: <Icon.Globe />, title: 'India + KSA on one platform', body: 'One of the few GSPs to also operate ZATCA-approved e-invoicing in Saudi Arabia. One platform, one contract, one support team across two regulators.' },
  ];

  return (
    <section className="wb-section wb-reveal" data-reveal>
      <div className="wb-wrap">
        <p className="wb-section-label">Why Whitebooks</p>
        <h2 className="wb-h2">Three reasons finance teams move to Whitebooks.</h2>
        <div className="wb-why-grid">
          {items.map((it, i) => (
            <article key={i} className="wb-why-card">
              <span className="wb-why-num" aria-hidden="true">{it.n}</span>
              <div className="wb-why-icon" aria-hidden="true">{it.icon}</div>
              <h3 className="wb-why-title">{it.title}</h3>
              <p className="wb-why-body">{it.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── AISection ────────────────────────────────────────────────────────────────

export function AISection() {
  return (
    <section className="wb-ai-section wb-section wb-reveal" data-reveal>
      <div className="wb-dot-bg" aria-hidden="true"></div>
      <div className="wb-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <p className="wb-section-label">The AI layer</p>
        <h2 className="wb-h2">
          AI that reconciles, predicts, and explains — <span className="accent">not just a chatbot.</span>
        </h2>
        <p className="wb-section-sub">
          Purpose-built models for the four compliance jobs humans have been doing manually since GST launched in 2017.
        </p>

        <div className="wb-ai-grid">
          <CopilotCard />
          <article className="wb-ai-card">
            <div className="wb-ai-card-num">01 · Reconciliation</div>
            <h3 className="wb-ai-title">Invoice matching at scale</h3>
            <p className="wb-ai-body">Reconciles fuzzy vendor names, rounding deltas, and split invoices against GSTR-2B in seconds. 95%+ resolve without human review.</p>
          </article>
          <article className="wb-ai-card">
            <div className="wb-ai-card-num">02 · Validation</div>
            <h3 className="wb-ai-title">Anomaly detection before filing</h3>
            <p className="wb-ai-body">Scans every return for the 47 most common GSTN rejection causes before you click submit — not after the portal errors at 11:47pm.</p>
          </article>
          <article className="wb-ai-card">
            <div className="wb-ai-card-num">03 · Risk</div>
            <h3 className="wb-ai-title">Notice prediction</h3>
            <p className="wb-ai-body">Flags returns likely to trigger Section 61 scrutiny — based on ITC mismatch, turnover variance, and HSN anomalies. Preempt the notice.</p>
          </article>
        </div>

        <div className="wb-ai-footnote">
          Built on the Anthropic API. Your data is never used to train models — yours, ours, or anyone else's.
        </div>
      </div>
    </section>
  );
}

// ─── CopilotCard ──────────────────────────────────────────────────────────────

export function CopilotCard() {
  return (
    <article className="wb-ai-card featured">
      <div className="wb-ai-card-num">04 · Copilot</div>
      <h3 className="wb-ai-title">Compliance copilot</h3>
      <p className="wb-ai-body">
        Ask <span className="wb-mono" style={{ color: 'var(--text)' }}>"Why did my ITC drop ₹4.2L in October?"</span> Get an answer from your live data, with source rows linked.
      </p>

      <div className="wb-copilot">
        <div className="wb-msg-row user">
          <div className="wb-msg user">Why did my ITC drop ₹4.2L in October?</div>
        </div>
        <div className="wb-msg-row">
          <div className="wb-msg ai">
            <span className="wb-msg-label">Whitebooks AI</span>
            October ITC fell ₹4,20,840 vs. September because <strong>3 vendors</strong> didn't file GSTR-1 by the 13th. Their invoices flowed to your purchase register but not to 2B.
            <div style={{ marginTop: 8 }}>
              <a className="wb-msg-link">Pinnacle Foods · ₹2,94,180</a>
              <a className="wb-msg-link">Crescent Logistics · ₹78,420</a>
              <a className="wb-msg-link">+ 1 more</a>
            </div>
          </div>
        </div>

        <div className="wb-copilot-input">
          <input type="text" placeholder="Ask anything about your GST data…" aria-label="Ask the copilot" />
          <button className="wb-copilot-send" aria-label="Send"><Icon.Send width={14} height={14} /></button>
        </div>
      </div>
    </article>
  );
}

// ─── CountStat ────────────────────────────────────────────────────────────────

interface CountStatProps {
  target: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  started: boolean;
}

function CountStat({ target, suffix = '', prefix = '', decimals = 0, label, started }: CountStatProps) {
  const v = useCountUp(target, 1200, started);
  const display = v.toLocaleString('en-IN', { maximumFractionDigits: decimals, minimumFractionDigits: decimals });
  return (
    <div className="wb-stat-row">
      <div className="wb-stat-val">{prefix}{display}{suffix}</div>
      <div className="wb-stat-lbl">{label}</div>
    </div>
  );
}

// ─── ProofSection ─────────────────────────────────────────────────────────────

export function ProofSection() {
  const ref = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="wb-section wb-reveal" data-reveal ref={ref}>
      <div className="wb-wrap">
        <p className="wb-section-label">Proof</p>
        <h2 className="wb-h2">The numbers, and the people behind them.</h2>

        <div className="wb-proof-grid">
          <div className="wb-quote-card">
            <span className="wb-quote-mark" aria-hidden="true">"</span>
            <p className="wb-quote-text">
              We moved our entire India e-invoicing and e-way bill stack onto Whitebooks' SAP connector. What took three steps inside SAP plus a portal upload is now one button.
            </p>
            <p className="wb-quote-attr">
              <strong>B V Srinivasababu</strong> — Senior Manager, IT Applications · NSL
            </p>
          </div>

          <div className="wb-stat-stack">
            <CountStat target={10} suffix=" Cr+" label="Invoices filed via Whitebooks" started={started} />
            <CountStat target={12000} suffix="+" label="Businesses on the platform" started={started} />
            <CountStat target={5000} suffix="+" label="CA firms using Whitebooks" started={started} />
            <CountStat target={99.95} suffix="%" decimals={2} label="API uptime SLA" started={started} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ClosingCTA ───────────────────────────────────────────────────────────────

export function ClosingCTA() {
  return (
    <section className="wb-closing wb-reveal" data-reveal id="book-demo">
      <div className="wb-closing-pattern" aria-hidden="true"></div>
      <div className="wb-wrap wb-closing-inner">
        <h2>One license. One platform. Every Indian filing.</h2>
        <p className="wb-closing-body">
          Whitebooks gives finance teams and developers a directly licensed GSP, an AI-native product, and a developer API that doesn't make you build the compliance yourself.
        </p>
        <div className="wb-closing-cta-row">
          <ButtonLink href="#" variant="white" size="lg" arrow>Book a demo</ButtonLink>
          <ButtonLink href="#hub" variant="whiteOutline" size="lg">Browse the product suite</ButtonLink>
        </div>
      </div>
    </section>
  );
}
