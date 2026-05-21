// src/pages/home/PageHome.tsx — Whitebooks homepage

import React from 'react';
import type { RouteKey } from '@/hooks/useHashRoute';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { LogoWall } from '@/components/ui/LogoWall';
import { Counter } from '@/components/ui/Counter';
import { FAQ } from '@/components/ui/FAQ';
import { StatStrip } from '@/components/ui/StatStrip';
import { QuoteCard } from '@/components/ui/QuoteCard';
import { ClosingCTA } from '@/components/ui/ClosingCTA';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { HeroReconciliation, HeroCopilot, HeroTerminal } from '@/sections/heros/Heros';
import { PillarCard, MiniReconMock, MiniEinvoiceMock, MiniEwayMock, MiniAccountingMock, MiniKSAMock } from '@/sections/PillarCards';
import type { HeroVariant } from '@/types/tweaks';

interface PageHomeProps {
  motion: boolean;
  intensity: number;
  heroVariant: HeroVariant;
  navigate: (r: RouteKey) => void;
}

export function PageHome({ motion, intensity, heroVariant, navigate }: PageHomeProps) {
  const heroProps = {
    motion, intensity,
    eyebrow: 'GST Suvidha Provider · Licensed by GSTN',
    h1: { before: 'Compliance infrastructure for ', italic: `India's largest finance teams` },
    sub: 'GST filing, e-invoicing, and e-way bills — automated, AI-reconciled, and trusted by P&G, IBM, Razorpay, and 12,000+ businesses across India.',
    primary: 'Book a 20-min demo',
    secondary: 'Talk to sales · +91 90321 11788',
  };

  let Hero: React.ReactNode;
  if (heroVariant === 'copilot') Hero = <HeroCopilot {...heroProps} />;
  else if (heroVariant === 'terminal') Hero = <HeroTerminal {...heroProps} />;
  else Hero = <HeroReconciliation {...heroProps} />;

  return (
    <>
      {Hero}
      {/* ── Logo wall ── */}
      <section className="section-tight hairline relative" style={{ paddingTop: 64, paddingBottom: 80 }}>
        <div className="container">
          <SectionLabel num="01">Customers</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, marginBottom: 56, alignItems: 'end' }}>
            <h2 className="h2">Compliance for the companies that <em>can't afford</em> to get it wrong.</h2>
            <p className="body" style={{ maxWidth: 460, justifySelf: 'end' }}>
              Whitebooks runs GST, e-invoicing, and e-way bill operations for India's largest enterprises and the CA firms that audit them.
            </p>
          </div>
          <LogoWall />
          <div style={{
            marginTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: 11.5,
            color: 'var(--fg-tertiary)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>
            <span>30,000+ businesses · 8,000+ cities · 10 Cr+ invoices processed</span>
            <span><span style={{ color: 'var(--accent-bright)' }}>fy 2024–25</span></span>
          </div>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className="section hairline">
        <div className="container">
          <SectionLabel num="02">The rebuild</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 80, alignItems: 'start' }}>
            <h2 className="h1">
              GST compliance wasn't designed for AI. <em>We're rebuilding it</em> so it is.
            </h2>
            <div style={{ paddingTop: 12 }}>
              <p className="body" style={{ fontSize: 16, lineHeight: 1.7 }}>
                Indian compliance changed more in 2025 than in the previous five years combined. GST 2.0 collapsed five slabs into three. E-invoicing thresholds dropped to <strong>₹5 crore AATO</strong>. IMS went live. Rule 37A tightened ITC. The 30-day IRN window arrived. Your software hasn't kept up.
              </p>
              <p className="body" style={{ fontSize: 16, lineHeight: 1.7, marginTop: 20 }}>
                Most GST tools still treat compliance as data entry. Whitebooks treats it as an <strong>inference problem</strong> — match invoices, flag anomalies, predict notices, and file in one keystroke. Built on the only thing that should be doing this work: AI plus a GSP license direct from GSTN.
              </p>
              <div style={{ marginTop: 32, display: 'flex', gap: 28, flexWrap: 'wrap' }}>
                {[
                  { k: '5 → 3', v: 'GST 2.0 slabs' },
                  { k: '₹5 Cr', v: 'AATO threshold' },
                  { k: '30 days', v: 'IRN window' },
                  { k: '72 hours', v: 'Whitebooks shipping lag' },
                ].map((s, i) => (
                  <div key={i} style={{ borderLeft: '1px solid var(--hairline)', paddingLeft: 16 }}>
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: 26, color: 'var(--fg-primary)', letterSpacing: '-0.015em' }}>{s.k}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Four pillars (Stripe-style asymmetric grid with embedded product mocks) ── */}
      <section className="section hairline">
        <div className="container">
          <SectionLabel num="03">Platform</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end', marginBottom: 56 }}>
            <h2 className="h2">One platform. Four compliance engines.<br /><em>Every Indian filing requirement.</em></h2>
            <p className="body" style={{ maxWidth: 460, justifySelf: 'end' }}>
              Built on a direct GSP license from GSTN. Each engine is a product on its own — together they cover every filing requirement in India, and a few outside.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: 16,
            gridAutoFlow: 'row dense',
          }}>
            {/* Featured: GST Software (spans 2 cols) */}
            <PillarCard
              tag="GST Software"
              title="GST filing that thinks before you click submit."
              body="File GSTR-1, 3B, 9, and 9C across unlimited GSTINs from one workspace. Auto-reconcile 2A/2B against your purchase register in under 60 seconds."
              cta="Explore GST Software"
              tone="pink"
              featured
              mock={<MiniReconMock />}
              onClick={() => navigate('gst-soft')}
            />

            {/* e-Invoicing (1 col, tall) */}
            <PillarCard
              tag="e-Invoicing"
              title="IRNs, sub-second."
              body="Direct IRP integration. Bulk upload, auto-retry, audit trail. p50 latency under 200ms."
              cta="Explore e-Invoicing"
              tone="violet"
              mock={<MiniEinvoiceMock />}
            />

            {/* e-Way Bills */}
            <PillarCard
              tag="e-Way Bills"
              title="Generate, extend, cancel."
              body="One screen or one API call. Auto-populated from invoice. Real-time validity check."
              cta="Explore e-Way Bills"
              tone="blue"
              mock={<MiniEwayMock />}
            />

            {/* Accounting */}
            <PillarCard
              tag="Accounting"
              title="Books that journal themselves."
              body="Cloud-native books with automated entries from your sales and purchase data. No accountant to enter, one to certify."
              cta="Explore Accounting"
              tone="cyan"
              mock={<MiniAccountingMock />}
            />

            {/* KSA bonus */}
            <PillarCard
              tag="KSA e-Invoicing"
              title="ZATCA-approved, same platform."
              body="One of the few GSPs operating KSA e-invoicing. Real-time clearance, cryptographic stamp."
              cta="Explore KSA"
              tone="amber"
              mock={<MiniKSAMock />}
            />
          </div>

          <div style={{ marginTop: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-tertiary)', letterSpacing: '0.03em' }}>
              ⤷ Every product runs on the same GSP-licensed pipe to GSTN.
            </div>
            <a href="#" className="link-arrow" onClick={(e) => e.preventDefault()}>See all products</a>
          </div>
        </div>
      </section>

      {/* ── For CAs (segment block) — light section ── */}
      <section className="section section-light hairline">
        <div className="container">
          <SectionLabel num="04">For CA firms</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end', marginBottom: 56 }}>
            <h2 className="h2">Built for CA firms managing<br /><em>50 to 5,000 clients.</em></h2>
            <p className="body" style={{ maxWidth: 440, justifySelf: 'end', color: 'var(--light-fg-sec)' }}>
              Switch from ClearTax TaxCloud in 45 minutes. Keep every prior filing, every reconciliation, every working paper.
            </p>
          </div>
          <div className="grid-3">
            {[
              { title: 'One workspace, every client', body: 'Add a client once. File across all their GSTINs without re-authenticating. Switch between clients in two clicks, not two logins.' },
              { title: 'Real-time team visibility', body: 'See which articles are working on which return, which filings are blocked on client OTP, which 2B reconciliations have unresolved mismatches. Role-based from the start.' },
              { title: 'Automated working papers', body: 'Every reconciliation, every adjustment, every notice response — logged automatically with user, timestamp, source. Audit defense without a paper trail to assemble.' },
            ].map((f, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--light-fg-sec)',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>↳ Feature {String(i + 1).padStart(2, '0')}</div>
                <h3 className="h3" style={{ marginTop: 14, fontSize: 22, color: 'var(--light-fg)' }}>{f.title}</h3>
                <p className="body" style={{ marginTop: 12, color: 'var(--light-fg-sec)' }}>{f.body}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 56, display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="#" className="link-arrow" style={{ color: 'var(--light-fg)' }} onClick={(e) => e.preventDefault()}>See the CA workflow</a>
            <a href="#" className="link-arrow text-accent" style={{ color: 'var(--accent)' }} onClick={(e) => e.preventDefault()}>Free ClearTax migration assessment</a>
          </div>
        </div>
      </section>

      {/* ── For Finance Teams ── */}
      <section className="section hairline">
        <div className="container">
          <SectionLabel num="05">For finance teams</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end', marginBottom: 56 }}>
            <h2 className="h2">Built for finance teams running<br /><em>₹50Cr to ₹5,000Cr</em> in turnover.</h2>
            <p className="body" style={{ maxWidth: 460, justifySelf: 'end' }}>
              Direct SAP and Tally connectors. Zero CSV uploads. Your ERP stays the source of truth — Whitebooks handles the rest.
            </p>
          </div>
          <div className="grid-3">
            {[
              { title: 'SAP-native integration', body: 'Push invoices from SAP S/4HANA or ECC to GSTN in real time. Generate IRNs and e-way bills inside the SAP transaction. No middleware, no separate ETL, no CSV fallbacks.', mono: 'sap_s4hana · sap_ecc' },
              { title: 'ITC optimization, not just matching', body: 'Match 6,000+ invoices per minute against GSTR-2B. Surface every blocked credit, every Rule 37A risk, every vendor with a falling compliance score — before you file 3B.', mono: '6,000 inv/min · Rule 37A' },
              { title: 'AATO-aware automation', body: 'Whitebooks reads your AATO and applies the right e-invoicing threshold, the right 30-day IRN window, the right ISD rule. The software adapts to the law, not the other way around.', mono: 'aato_threshold · 30d_window' },
            ].map((f, i) => (
              <div key={i} className="card">
                <div className="mono-tag accent"><span className="dot"></span>{f.mono}</div>
                <h3 className="h3" style={{ marginTop: 18, fontSize: 20 }}>{f.title}</h3>
                <p className="body" style={{ marginTop: 12 }}>{f.body}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48 }}>
            <a href="#" className="link-arrow" onClick={(e) => e.preventDefault()}>Explore the enterprise stack</a>
          </div>
        </div>
      </section>

      {/* ── For Developers ── */}
      <section className="section hairline relative" style={{ overflow: 'hidden' }}>
        <div className="mesh" style={{ ['--mesh-opacity' as string]: intensity * 0.6 } as React.CSSProperties}></div>
        <div className="container relative">
          <SectionLabel num="06">For developers</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)', gap: 64, alignItems: 'center' }}>
            <div>
              <h2 className="h2">The only India compliance API <em>written like a modern API</em> should be.</h2>
              <p className="lede" style={{ marginTop: 22 }}>
                REST, idempotent, retryable. Sandbox keys in 5 minutes. Production-grade SLAs. Direct GSTN-licensed pipe — no resold APIs.
              </p>
              <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { k: 'Sub-200ms', v: 'IRN generation (p50)' },
                  { k: '99.95%', v: 'uptime SLA' },
                  { k: 'SOC 2', v: 'Type II in progress' },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--hairline)' }}>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: 22, letterSpacing: '-0.015em' }}>{s.k}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-tertiary)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.v}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 32, display: 'flex', gap: 14 }}>
                <a href="#/gst-api" className="btn btn-accent btn-arrow" onClick={(e) => { e.preventDefault(); navigate('gst-api'); }}>
                  Read the API docs
                </a>
                <a href="#" className="btn btn-ghost" onClick={(e) => e.preventDefault()}>Get sandbox keys</a>
              </div>
            </div>
            <CodeBlock samples={{
              curl: `<span class="com"># Generate an IRN with the Whitebooks REST API</span>
<span class="kw">curl</span> https://api.whitebooks.in/v1/einvoice \\
  -H <span class="str">"Authorization: Bearer $WHITEBOOKS_KEY"</span> \\
  -H <span class="str">"Content-Type: application/json"</span> \\
  -d '{
    <span class="str">"supplier_gstin"</span>: <span class="str">"29AAACR5055K1Z5"</span>,
    <span class="str">"buyer_gstin"</span>:    <span class="str">"27AAFCD5862R000"</span>,
    <span class="str">"invoice_no"</span>:     <span class="str">"INV-2026-00421"</span>,
    <span class="str">"invoice_value"</span>:  <span class="num">150000</span>,
    <span class="str">"items"</span>:          [...]
  }'

<span class="com">→ 200 OK · 182ms · IRN a4f2c91e8b7d3...</span>`,
              node: `<span class="kw">import</span> { Whitebooks } <span class="kw">from</span> <span class="str">'@whitebooks/sdk'</span>;
<span class="kw">const</span> wb = <span class="kw">new</span> <span class="fn">Whitebooks</span>(process.env.WHITEBOOKS_KEY);

<span class="kw">const</span> { irn, qr_code, ack_no } = <span class="kw">await</span> wb.einvoice.<span class="fn">create</span>({
  supplier_gstin: <span class="str">'29AAACR5055K1Z5'</span>,
  buyer_gstin:    <span class="str">'27AAFCD5862R000'</span>,
  invoice_no:     <span class="str">'INV-2026-00421'</span>,
  invoice_date:   <span class="str">'2026-05-16'</span>,
  items:          [<span class="com">/* line items */</span>]
});`,
              python: `<span class="kw">from</span> whitebooks <span class="kw">import</span> Whitebooks
wb = <span class="fn">Whitebooks</span>(api_key=os.environ[<span class="str">'WHITEBOOKS_KEY'</span>])

response = wb.einvoice.<span class="fn">create</span>(
    supplier_gstin=<span class="str">'29AAACR5055K1Z5'</span>,
    buyer_gstin=<span class="str">'27AAFCD5862R000'</span>,
    invoice_no=<span class="str">'INV-2026-00421'</span>,
    invoice_date=<span class="str">'2026-05-16'</span>,
    items=[...]
)`,
            }} />
          </div>
        </div>
      </section>

      {/* ── AI-native, explained ── */}
      <section className="section hairline relative" style={{ overflow: 'hidden' }}>
        <div className="mesh" style={{ ['--mesh-opacity' as string]: intensity } as React.CSSProperties}></div>
        <div className="container relative">
          <SectionLabel num="07">The AI layer</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end', marginBottom: 56 }}>
            <h2 className="h1">AI that <em className="grad-text" style={{ fontStyle: 'italic' }}>reconciles, predicts, and explains</em> — not just a chatbot in the corner.</h2>
            <p className="lede" style={{ maxWidth: 460, justifySelf: 'end' }}>
              Whitebooks uses purpose-built models for four jobs that humans have been doing manually since GST launched in 2017.
            </p>
          </div>
          <div className="grid-4">
            {[
              { num: '01', tag: 'reconcile', title: 'Invoice matching at scale', body: 'A model trained on 10 crore+ invoices matches your purchase register against GSTR-2B in seconds. Handles fuzzy vendor names, rounding deltas, and split invoices that exact-match logic gives up on.' },
              { num: '02', tag: 'detect', title: 'Anomaly detection before filing', body: 'Every return is scanned for the 47 most common GSTN rejection causes before submission. Flagged before you click file. Not after the portal returns an error at 11:47pm on the 20th.' },
              { num: '03', tag: 'predict', title: 'Notice prediction', body: 'Whitebooks reads your filing pattern and flags returns likely to trigger a Section 61 scrutiny notice — based on ITC mismatch trends, turnover variance, and HSN distribution anomalies.' },
              { num: '04', tag: 'explain', title: 'Copilot for compliance', body: 'Ask "Why did my ITC drop ₹4.2L in October?" or "Which vendors are unfiled for September?" — get an answer drawn from your live data, with source rows linked. Built on the Anthropic API.' },
            ].map((c, i) => (
              <div key={i} className="card" style={{ position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span className="mono-tag accent"><span className="dot"></span>{c.tag}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-quaternary)' }}>{c.num}</span>
                </div>
                <h3 className="h3" style={{ marginTop: 24, fontSize: 18 }}>{c.title}</h3>
                <p className="body" style={{ marginTop: 12, fontSize: 14 }}>{c.body}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 16 }}>
            <a href="#" className="link-arrow link-arrow-accent" onClick={(e) => e.preventDefault()}>See the AI in action (2-min demo)</a>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-quaternary)' }}>
              ⤷ models on the Anthropic API · data never used for training
            </span>
          </div>
        </div>
      </section>

      {/* ── Stats + quotes ── */}
      <section className="section">
        <div className="container">
          <SectionLabel num="08">Proof</SectionLabel>
          <StatStrip motion={motion} stats={[
            { value: <Counter value={10} format={(n) => n.toFixed(0)} motion={motion} />, unit: 'cr+', label: 'Invoices filed via Whitebooks' },
            { value: <Counter value={12000} motion={motion} />, unit: '+', label: '12,000+ businesses · 5,000+ CA firms' },
            { value: <Counter value={30000} motion={motion} />, unit: '+', label: 'Users across 8,000+ Indian cities' },
            { prefix: '₹', value: '0', label: 'Customer data shared with third parties' },
          ]} />
          <div className="grid-3" style={{ marginTop: 48 }}>
            <QuoteCard
              big
              quote="We moved our entire India e-invoicing and e-way bill stack onto Whitebooks' SAP connector. What took three steps inside SAP plus a portal upload is now one button. The cost savings paid back the year-one license in six weeks."
              name="B V Srinivasababu"
              role="Senior Manager, IT Applications · NSL" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <QuoteCard
                quote="Whitebooks made the GSP integration so much faster and smoother than the others we'd evaluated. Support is round-the-clock — not a ticket queue."
                name="Sahil Jain"
                role="Director · Smartbiz Technologies" />
              <QuoteCard
                quote="Whitebooks is solving the hard parts of GST — e-invoicing, e-way bills, IMS — with simple APIs. I'd recommend any finance team make their stack future-ready with it."
                name="CA Atul Garg"
                role="Finance Controller · WheelsEye" />
            </div>
          </div>
        </div>
      </section>

      {/* ── KSA ── */}
      <section className="section hairline relative" style={{ overflow: 'hidden' }}>
        <div className="mesh" style={{ ['--mesh-opacity' as string]: intensity * 0.5 } as React.CSSProperties}></div>
        <div className="container relative" style={{ position: 'relative' }}>
          <SectionLabel num="09">Geographic moat</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <h2 className="h1">Indian compliance is hard.<br /><em>Saudi compliance is harder.</em><br />We do both.</h2>
              <p className="lede" style={{ marginTop: 26 }}>
                Whitebooks is one of the few GSPs operating ZATCA-approved e-invoicing infrastructure in Saudi Arabia. If your company files in India and the GCC, this is one platform, one contract, one team.
              </p>
              <div style={{ marginTop: 32 }}>
                <a href="#" className="btn btn-ghost btn-arrow" onClick={(e) => e.preventDefault()}>Explore KSA e-Invoicing</a>
              </div>
            </div>
            <div style={{
              padding: '40px',
              border: '1px solid var(--hairline-strong)',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--bg-card)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
                <div>
                  <div className="eyebrow"><span className="dot"></span>One platform · two regulators</div>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-quaternary)' }}>↳ 2026</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
                {[
                  { region: 'India', regulator: 'GSTN', flag: '🇮🇳', items: ['GSTR-1, 3B, 9, 9C', 'IRP / e-invoicing', 'e-Way Bills', 'IMS, Rule 37A'] },
                  { region: 'Saudi Arabia', regulator: 'ZATCA', flag: '🇸🇦', items: ['Phase 2 integration', 'Cryptographic stamp', 'Real-time clearance', 'Arabic + English'] },
                ].map((b, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      ↳ {b.regulator}
                    </div>
                    <div className="h3" style={{ marginTop: 8, fontSize: 22 }}>{b.region}</div>
                    <ul style={{ marginTop: 18, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {b.items.map((it, j) => (
                        <li key={j} style={{ fontSize: 13, color: 'var(--fg-secondary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ color: 'var(--accent)' }}>·</span>{it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing teaser ── */}
      <section className="section hairline">
        <div className="container">
          <SectionLabel num="10">Pricing</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end', marginBottom: 56 }}>
            <h2 className="h2">Transparent pricing.<br /><em>Annual subscriptions.</em> Volume that matters.</h2>
          </div>
          <div className="grid-3">
            {[
              { name: 'Starter', forWho: 'SMBs and solo CAs', price: '4,999', unit: '/year', perks: ['1 GSTIN', 'Unlimited filings', '2A/2B reconciliation', 'Email support'] },
              { name: 'Growth', forWho: 'CA firms and mid-market', price: '24,999', unit: '/year', perks: ['Up to 50 GSTINs', 'SAP / Tally connectors', 'Working papers', 'Priority support'], featured: true },
              { name: 'Enterprise', forWho: 'Finance teams ₹100Cr+', price: 'Custom', unit: '', perks: ['Unlimited GSTINs', '99.95% SLA', 'Dedicated CSM', 'SAP S/4HANA native'] },
            ].map((t, i) => (
              <div key={i} className="card" style={{
                padding: 32,
                borderColor: t.featured ? 'rgba(220,47,101,0.4)' : 'var(--hairline)',
                background: t.featured
                  ? 'linear-gradient(180deg, rgba(220,47,101,0.04), var(--bg-card) 60%)'
                  : 'var(--bg-card)',
                position: 'relative',
              }}>
                {t.featured && (
                  <div style={{ position: 'absolute', top: -10, right: 20 }}>
                    <span className="mono-tag accent"><span className="dot"></span>Most popular</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div className="h3" style={{ fontSize: 20 }}>{t.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--fg-tertiary)', marginTop: 4 }}>For {t.forWho}</div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-quaternary)' }}>0{i + 1}</div>
                </div>
                <div style={{ marginTop: 28, display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  {t.price !== 'Custom' && <span style={{ fontSize: 18, color: 'var(--fg-tertiary)' }}>₹</span>}
                  <span className="num" style={{ fontSize: 44, letterSpacing: '-0.02em', color: 'var(--fg-primary)', fontFamily: 'var(--font-serif)' }}>
                    {t.price}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--fg-tertiary)', marginLeft: 4 }}>{t.unit}</span>
                </div>
                {t.price !== 'Custom' && (
                  <div style={{ fontSize: 11, color: 'var(--fg-quaternary)', fontFamily: 'var(--font-mono)', marginTop: 4, letterSpacing: '0.04em' }}>FROM</div>
                )}
                <ul style={{ marginTop: 24, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {t.perks.map((p, j) => (
                    <li key={j} style={{ fontSize: 13.5, color: 'var(--fg-secondary)', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <span style={{ color: 'var(--accent)', marginTop: 2 }}>✓</span>{p}
                    </li>
                  ))}
                </ul>
                <a href="#" className={`btn ${t.featured ? 'btn-accent' : 'btn-ghost'} btn-arrow`}
                  style={{ marginTop: 28, width: '100%', justifyContent: 'center' }}
                  onClick={(e) => e.preventDefault()}>
                  {t.price === 'Custom' ? 'Talk to sales' : 'Start free trial'}
                </a>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, fontSize: 12, color: 'var(--fg-quaternary)', fontFamily: 'var(--font-mono)' }}>
            ⤷ Pricing placeholders for design. Replace with actuals before publishing.
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section hairline">
        <div className="container container-narrow" style={{ maxWidth: 980 }}>
          <SectionLabel num="11">FAQ</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '0.7fr 1.3fr', gap: 64, alignItems: 'start' }}>
            <div>
              <h2 className="h2">Frequently<br />asked.</h2>
              <p className="body" style={{ marginTop: 18 }}>
                JSON-LD schema embedded — these answers are what ChatGPT, Perplexity, and Google AI Overviews pull when someone asks about Whitebooks.
              </p>
            </div>
            <FAQ items={[
              { q: 'Is Whitebooks a licensed GSP or a reseller?', a: 'Whitebooks is a directly licensed GST Suvidha Provider (GSP) under GSTN. The license is held by BVM IT Consulting Services India Private Limited, the parent entity. No intermediary, no resold infrastructure.' },
              { q: 'How is Whitebooks different from ClearTax, Tally, or Zoho Books?', a: 'Three differences. First, Whitebooks holds its own GSP license — most competitors resell GSP capacity. Second, Whitebooks has native SAP S/4HANA and Tally connectors built in-house, not third-party. Third, Whitebooks operates KSA e-invoicing on the same platform, which no Indian-headquartered competitor currently does.' },
              { q: 'Can I migrate from ClearTax TaxCloud to Whitebooks?', a: 'Yes. ClearTax discontinued TaxCloud access for many CA firms in late 2025. Whitebooks runs a guided migration that imports all prior-year GSTR records, working papers, and client masters. Most firms migrate in under 45 minutes.' },
              { q: 'Does Whitebooks support the new GST 2.0 rates (5%, 18%, 40%)?', a: 'Yes. Whitebooks applied the GST 2.0 rate structure from September 22, 2025, in line with the 56th GST Council notifications. HSN-level rate mapping, post-sale discount handling (revised Section 15), and the new refund mechanisms are all live.' },
              { q: 'Is e-invoicing mandatory for my business?', a: 'From 1st April 2026, e-invoicing is mandatory for any business with AATO above ₹5 crore in FY 2025–26. For businesses above ₹10 crore AATO, invoices must be reported to the IRP within 30 days of the invoice date — invoices reported later are invalid for ITC. Whitebooks enforces this window automatically.' },
              { q: 'Where is my data stored?', a: 'All data is stored in ISO 27001-certified Indian data centers. Whitebooks is a GSP under direct GSTN oversight, audited annually. Data is encrypted at rest (AES-256) and in transit (TLS 1.3). No data is shared with third parties. No data is used to train AI models without explicit opt-in.' },
              { q: 'Do you have a free trial?', a: 'Yes — 14 days, full features, no card required. CA firms get an extended 30-day trial including white-glove migration support.' },
              { q: 'What\'s the typical onboarding time?', a: 'Self-serve SMB: same day. CA firm with up to 100 clients: 1–2 days. Enterprise with SAP integration: 2–4 weeks including UAT.' },
            ]} />
          </div>
        </div>
      </section>

      <ClosingCTA
        eyebrow="One platform · India + GCC"
        title="Build your India compliance once."
        body="GSP-licensed, AI-native, used by P&G, IBM, Razorpay, and 12,000+ more. Twenty minutes to see it run on your own data."
        primary="Book a 20-min demo"
        secondary="Talk to sales · +91 90321 11788"
      />
    </>
  );
}
