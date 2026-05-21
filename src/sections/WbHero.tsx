import React from 'react';
import { Icon } from '@/components/icons/Icon';
import HeroBackdrop from '@/components/ui/HeroBackdrop';
import ReconciliationUI from './heros/ReconciliationUI';
import SectionLabel from '@/components/ui/SectionLabel';

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  return (
    <section className="wb-hero">
      {/* <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <filter id="wb-liquid" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.012" numOctaves={2} seed={3} result="noise">
              <animate attributeName="baseFrequency" dur="22s" values="0.008 0.012; 0.014 0.020; 0.008 0.012" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={120} xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur stdDeviation={14} />
          </filter>
          <linearGradient id="wb-stream-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff8aa8" stopOpacity={0} />
            <stop offset="50%" stopColor="#ff5a8d" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#dc2f65" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="wb-stream-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffb786" stopOpacity={0} />
            <stop offset="50%" stopColor="#ff7a9d" stopOpacity={0.7} />
            <stop offset="100%" stopColor="#dc2f65" stopOpacity={0} />
          </linearGradient>
        </defs>
      </svg>

      <div className="wb-fluid" aria-hidden="true">
        <div className="wb-fluid-mesh echo"></div>
        <div className="wb-fluid-mesh"></div>
        <div className="wb-fluid-distort"></div>
        <div className="wb-neural"></div>
        <svg className="wb-stream-svg" viewBox="0 0 800 800" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path className="wb-stream-path" stroke="url(#wb-stream-grad)" d="M 100,40 C 260,180 360,300 380,460 C 400,620 520,720 700,780" />
          <path className="wb-stream-path" stroke="url(#wb-stream-grad-2)" style={{ animationDelay: '-4s', animationDuration: '18s' }} d="M 60,180 C 220,280 340,400 400,560 C 460,720 580,760 760,780" />
          <path className="wb-stream-path" stroke="url(#wb-stream-grad)" style={{ animationDelay: '-7s', animationDuration: '16s', strokeDasharray: '4 22' }} d="M 200,20 C 320,160 420,320 440,500 C 460,680 580,740 780,800" />
        </svg>
      </div>
      <div className="wb-grid-bg" aria-hidden="true"></div> */}
      <HeroBackdrop intensity={0.55} />

      <img
        src="/assets/Photoroom.png"
        alt=""
        aria-hidden="true"
        className="wb-hero-bg-image"
      />

      <div className="wb-wrap wb-hero-inner">
        <div className="wb-stagger in">
          <div>
            <span className="wb-eyebrow">
              <span className="wb-eyebrow-dot" aria-hidden="true"></span>
              GST Suvidha Provider · Licensed by GSTN
            </span>
          </div>

          <h1 className="wb-display">
            Compliance infrastructure for{' '}
            <span className="accent">India's largest finance teams.</span>
          </h1>

          <p className="wb-hero-sub">
            GST filing, e-invoicing, and e-way bills — automated, AI-reconciled, and trusted by P&G, IBM, Razorpay, and 12,000+ businesses across India.
          </p>

          <div className="wb-hero-cta-row">
            <a className="wb-btn wb-btn-primary wb-btn-lg" href="#book-demo">
              Book a 20-min demo <Icon.ArrowRight width={14} height={14} />
            </a>
            <a href="#" className="wb-btn wb-btn-ghost" onClick={(e) => e.preventDefault()}>
              Talk to sales · +91 90321 11788
            </a>
          </div>

        </div>

        {/* 
        <div className="wb-hero-visual wb-stagger in" style={{ animationDelay: '400ms' }}>
          <TerminalCard />
          <ReconciliationUI motion={true} />
          <DashboardCard />
        </div> */}
      </div>
    </section>
  );
}

// ─── TerminalCard ─────────────────────────────────────────────────────────────

export function TerminalCard() {
  return (
    <div className="wb-card wb-terminal" aria-label="API example">
      <div className="wb-terminal-bar">
        <span className="wb-term-dot r"></span>
        <span className="wb-term-dot y"></span>
        <span className="wb-term-dot g"></span>
        <span className="wb-term-title">~ /developer/whitebooks-api</span>
      </div>
      <div className="wb-term-body">
        <div><span className="wb-term-comment"># Generate an IRN against the Invoice Registration Portal</span></div>
        <div><span className="wb-term-prompt">$</span> <span className="wb-term-cmd">curl</span> -X POST https://api.whitebooks.in/v1/irn \</div>
        <div>{'  '}-H <span className="wb-term-str">"Authorization: Bearer wb_live_••••"</span> \</div>
        <div>{'  '}-H <span className="wb-term-str">"Content-Type: application/json"</span> \</div>
        <div>{'  '}-d <span className="wb-term-str">{'\'{"seller_gstin":"29AABCT1332L1ZA",...}\''}</span></div>
        <div style={{ height: 10 }}></div>
        <div><span className="wb-term-comment"># 200 OK · 178ms</span></div>
        <div>{'{'}</div>
        <div>{'  '}<span className="wb-term-key">"irn"</span>: <span className="wb-term-str">"a4f8c91e2b67d0e3..."</span>,</div>
        <div>{'  '}<span className="wb-term-key">"ack_no"</span>: <span className="wb-term-num">112410034281915</span>,</div>
        <div>{'  '}<span className="wb-term-key">"ack_dt"</span>: <span className="wb-term-str">"2026-05-16T10:42:17Z"</span>,</div>
        <div>{'  '}<span className="wb-term-key">"status"</span>: <span className="wb-term-str">"ACT"</span>,</div>
        <div>{'  '}<span className="wb-term-key">"signed_qr"</span>: <span className="wb-term-str">"eyJhbGciOi..."</span></div>
        <div>{'}'}<span className="wb-term-cursor"></span></div>
        <div style={{ marginTop: 8 }}>
          <span className="wb-term-success">✓ IRN generated · GSP direct pipe</span>
        </div>
      </div>
    </div>
  );
}

// ─── DashboardCard ────────────────────────────────────────────────────────────

interface DashRow {
  v: string;
  g: string;
  a: string;
  s: 'ok' | 'warn' | 'bad';
}

export function DashboardCard() {
  const rows: DashRow[] = [
    { v: 'Rajesh Enterprises Pvt Ltd', g: '29AABCR1234L1ZB', a: '₹4,28,540', s: 'ok' },
    { v: 'Crescent Logistics LLP', g: '07AABCK9988R1ZK', a: '₹1,12,300', s: 'ok' },
    { v: 'Bharat Pharmacare Pvt Ltd', g: '27AABCB4421J1ZQ', a: '₹8,64,720', s: 'warn' },
    { v: 'Sunline Industries', g: '33AABCS7710G1ZE', a: '₹62,450', s: 'ok' },
    { v: 'Pinnacle Foods & Bev.', g: '06AABCP2233M1ZN', a: '₹2,94,180', s: 'bad' },
    { v: 'Greenfield Textile Mills', g: '24AABCG5566N1ZA', a: '₹3,18,900', s: 'ok' },
    { v: 'Mahalakshmi Traders', g: '32AABCM7748F1ZG', a: '₹98,210', s: 'warn' },
  ];

  const icon = (s: DashRow['s']): string => {
    if (s === 'ok') return '✓';
    if (s === 'warn') return '!';
    return '✕';
  };

  return (
    <div className="wb-card" aria-label="GSTR-2B reconciliation snapshot">
      <div className="wb-dash-head">
        <div className="wb-dash-head-l">
          <div>
            <div className="wb-dash-title">GSTR-2B reconciliation</div>
            <div className="wb-dash-sub">Aug 2026 · 29AABCT1332L1ZA</div>
          </div>
        </div>
        <span className="wb-dash-live">Live</span>
      </div>
      <div className="wb-dash-stats">
        <div className="wb-dash-stat">
          <div className="wb-dash-stat-val ok">4,238</div>
          <div className="wb-dash-stat-lbl">Matched</div>
        </div>
        <div className="wb-dash-stat">
          <div className="wb-dash-stat-val warn">17</div>
          <div className="wb-dash-stat-lbl">Mismatch</div>
        </div>
        <div className="wb-dash-stat">
          <div className="wb-dash-stat-val bad">3</div>
          <div className="wb-dash-stat-lbl">Vendors flagged</div>
        </div>
      </div>
      <div className="wb-dash-rows">
        {rows.map((r, i) => (
          <div key={i} className="wb-dash-row">
            <div>
              <div className="wb-dash-vendor">{r.v}</div>
              <div className="wb-dash-gstin">{r.g}</div>
            </div>
            <div className="wb-dash-amt">{r.a}</div>
            <div className="wb-dash-amt" style={{ color: 'var(--muted)' }}>2B · matched</div>
            <span className={`wb-dash-status ${r.s}`}>{icon(r.s)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LogoWall ─────────────────────────────────────────────────────────────────

export function LogoWall() {
  const row1 = ['P&G', 'IBM', 'Razorpay', 'Pharmeasy', 'KPMG', 'Cars24', 'Hindustan Unilever', 'Aditya Birla', 'SBI'];
  const row2 = ['Accenture', 'Philips', 'TVS', 'Yamaha', 'WheelsEye', 'PepsiCo', 'Coca-Cola', 'EaseMyTrip', 'Grant Thornton'];

  return (
    <section className="wb-section-tight wb-reveal wb-logo-wall" data-reveal>
      <div className="wb-logo-wall-header">
        <h2 className="h1">Compliance for the companies that <em>can't afford</em> to get it wrong.</h2>
        <p className="body">
          Whitebooks runs GST, e-invoicing, and e-way bill operations for India's largest enterprises and the CA firms that audit them.
          We already helped 3,000+ Customers across India.
        </p>
      </div>
      <div className="wb-logos-wrap">
        <div className="wb-ticker" aria-hidden="false">
          {[...row1, ...row1].map((l, i) => (
            <span key={i} className="wb-logo">
              {l}<span className="wb-logo-sep">·</span>
            </span>
          ))}
        </div>
        <div className="wb-ticker reverse" aria-hidden="true">
          {[...row2, ...row2].map((l, i) => (
            <span key={i} className="wb-logo">
              {l}<span className="wb-logo-sep">·</span>
            </span>
          ))}
        </div>
      </div>

      <div className="wb-wrap">
        <div className="wb-stat-strip">
          <Stat val="10 Cr+" lbl="Invoices filed" />
          <Stat val="12,000+" lbl="Businesses" />
          <Stat val="5,000+" lbl="CAs & Tax Professionals" />
          <Stat val="99.95%" lbl="API uptime SLA" />
        </div>
      </div>
    </section>
  );
}

// ─── Stat ─────────────────────────────────────────────────────────────────────

interface StatProps {
  val: string;
  lbl: string;
}

export function Stat({ val, lbl }: StatProps) {
  return (
    <div className="wb-stat">
      <div className="wb-stat-val">{val}</div>
      <div className="wb-stat-lbl">{lbl}</div>
    </div>
  );
}
