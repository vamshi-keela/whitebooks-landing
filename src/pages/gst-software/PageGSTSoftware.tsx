// src/pages/gst-software/PageGSTSoftware.tsx — WhiteBooks GST Software product page

import React from 'react';
import type { RouteKey } from '@/hooks/useHashRoute';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { FAQ } from '@/components/ui/FAQ';
import { ClosingCTA } from '@/components/ui/ClosingCTA';
import { HeroBackdrop } from '@/components/ui/HeroBackdrop';
import { ButtonLink } from '@/components/ui/Button';
import { ReconciliationUI } from '@/sections/heros/ReconciliationUI';

interface PageGSTSoftwareProps {
  motion: boolean;
  intensity: number;
  navigate: (r: RouteKey) => void;
}

export function PageGSTSoftware({ motion, intensity, navigate }: PageGSTSoftwareProps) {
  return (
    <>
      {/* ── Hero (Reconciliation variant, always — this page IS the reconciliation story) ── */}
      <section className="section relative" style={{ overflow: 'hidden', paddingTop: 100, paddingBottom: 120 }}>
        <HeroBackdrop intensity={intensity} />
        <div className="container relative" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: 56, alignItems: 'center' }}>
            <div>
              <div className="eyebrow"><span className="dot"></span>GST Software | GSP licensed</div>
              <h1 className="h-display" style={{ marginTop: 22 }}>
                GST filing that <em>thinks</em> before you click submit.
              </h1>
              <p className="lede" style={{ marginTop: 26 }}>
                File GSTR-1, 3B, 9, and 9C across unlimited GSTINs from one workspace. Auto-reconcile GSTR-2B against your purchase register in under 60 seconds. Built on a direct GSP license — no resold pipes.
              </p>
              <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <ButtonLink href="#" arrow onClick={(e) => e.preventDefault()}>Start 14-day free trial</ButtonLink>
                <ButtonLink href="#" variant="ghost" onClick={(e) => e.preventDefault()}>Book a 20-min Demo</ButtonLink>
              </div>
              <div style={{ marginTop: 22, fontSize: 13, color: 'var(--fg-tertiary)' }}>
                Migrating from ClearTax TaxCloud, Tally, or Zoho? We import your prior 36 months of returns.
              </div>
              <div style={{ marginTop: 36, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <span className="mono-tag"><span className="dot"></span>GSTR-1 · 3B · 9 · 9C</span>
                <span className="mono-tag accent"><span className="dot"></span>Median 14 min / GSTIN</span>
                <span className="mono-tag"><span className="dot"></span>5,000+ CA firms</span>
              </div>
            </div>
            <ReconciliationUI motion={motion} />
          </div>
        </div>
      </section>

      {/* ── Three problems most GST tools ignore ── */}
      <section className="section hairline">
        <div className="container">
          <SectionLabel num="01">The three problems most GST tools ignore</SectionLabel>
          <h2 className="h1" style={{ maxWidth: 920, marginBottom: 56 }}>
            Most GST software is a glorified upload button. <em>Yours shouldn't be.</em>
          </h2>
          <div className="grid-3">
            {[
              { mono: 'reconciliation', title: 'Reconciliation is still a nightmare.', body: 'ClearTax and Tally hand you a mismatch report and walk away. WhiteBooks\' matching engine handles fuzzy vendor names, rounded values, partially settled invoices, and split GSTINs — the cases where exact-match logic fails. 95%+ of mismatches resolve without human review.' },
              { mono: 'validation', title: 'You only see errors after the portal rejects them.', body: 'WhiteBooks validates against the 47 most common GSTN rejection codes before you click file. If GSTR-3B will fail, you know on screen — not at 11:47pm when the portal returns a cryptic error.' },
              { mono: 'shipping_lag', title: "Your software doesn't know what year it is.", body: 'GST 2.0 rates went live September 2025. The 30-day IRN window arrived. IMS launched. Rule 37A reversal logic changed. WhiteBooks shipped each of these inside 72 hours of notification. Most competitors are still catching up.' },
            ].map((p, i) => (
              <div key={i}>
                <div className="mono-tag"><span className="dot" style={{ background: 'var(--warn)' }}></span>{p.mono}</div>
                <h3 className="h3" style={{ marginTop: 18, fontSize: 22, lineHeight: 1.25 }}>{p.title}</h3>
                <p className="body" style={{ marginTop: 14 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How filing works ── */}
      <section className="section section-light hairline">
        <div className="container">
          <SectionLabel num="02">How filing works</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end', marginBottom: 56 }}>
            <h2 className="h2">File GSTR-1 and 3B in three steps.<br /><em>We mean it.</em></h2>
            <p className="body" style={{ maxWidth: 440, justifySelf: 'end', color: 'var(--light-fg-sec)' }}>
              Median filing time per GSTIN per month: <strong>14 minutes</strong>. Average across 12,000+ businesses, FY 2024–25.
            </p>
          </div>
          <div className="grid-3">
            {[
              { n: '01', title: 'Bring your data', body: 'Push from Tally, SAP, Zoho, or 40+ other ERPs via native connector. Or upload Excel. Or use the API. Or hand-enter — WhiteBooks auto-completes from your master data after the first letter.' },
              { n: '02', title: 'Auto-reconcile', body: 'WhiteBooks pulls your GSTR-2A and 2B from GSTN automatically, matches against your purchase register, and surfaces only the rows that need a human decision. Average review queue: 3% of total invoices.' },
              { n: '03', title: 'Validate and file', body: 'Pre-submission validator catches every common rejection. Push to GSTN with one click. ARN comes back to your inbox and the working paper logs itself.' },
            ].map((s, i) => (
              <div key={i} className="card">
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 56,
                  letterSpacing: '-0.02em',
                  color: 'var(--light-fg)',
                  lineHeight: 1,
                  marginBottom: 18,
                }}>
                  {s.n}
                </div>
                <h3 className="h3" style={{ fontSize: 22, color: 'var(--light-fg)' }}>{s.title}</h3>
                <p className="body" style={{ marginTop: 12, color: 'var(--light-fg-sec)' }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Built for the way CA firms actually work ── */}
      <section className="section hairline">
        <div className="container">
          <SectionLabel num="03">For CA firms</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end', marginBottom: 56 }}>
            <h2 className="h1">One workspace. Every client.<br /><em>Every GSTIN. Every return.</em></h2>
          </div>
          <div className="grid-2" style={{ gap: 0, border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            {[
              { mono: 'dashboard', title: 'Multi-client dashboard', body: 'Add a client once. See every GSTIN, every pending return, every notice, every payment due — across your entire book of business. Filter by due date, status, or partner.' },
              { mono: 'access_control', title: 'Role-based access', body: 'Senior partners see everything. Articles see their assigned clients. Reviewers approve, don\'t edit. Clients get read-only access to their own data — with their consent and on your terms.' },
              { mono: 'session_auth', title: 'OTP-free workflow', body: 'Authenticate once per session, file across clients without re-entering OTP for every GSTIN. Compliant, audited, and a 4× speedup over portal-based workflows.' },
              { mono: 'working_papers', title: 'Auto-generated working papers', body: 'Every reconciliation, every adjustment, every override is logged with user, timestamp, source row, and reason. Export as PDF for audit, or hand to the next reviewer mid-cycle.' },
              { mono: 'notice_tracker', title: 'Notice tracker', body: 'Section 61, 73, 74 notices imported automatically from your client GSTINs. Assigned to a partner. Tracked to resolution. Linked back to the return that caused them.' },
              { mono: 'bulk_ops', title: 'Bulk operations', body: 'Reconcile 500 clients in one job. Push GSTR-1 for 200 clients in one queue. Cancel and regenerate IRNs across a vendor batch. Bulk is a first-class action, not a hack.' },
              { mono: 'client_portal', title: 'White-label client portal', body: 'Each of your clients gets a branded portal under your firm\'s name where they upload invoices, see their compliance status, and pay you. White-label included on Growth plan.' },
              { mono: 'capacity_planner', title: 'Capacity planner', body: 'See which articles are over-loaded, which returns are blocked on client data, and which deadlines are at risk — for the next 60 days, today.' },
            ].map((f, i) => (
              <div key={i} style={{
                padding: 32,
                borderRight: (i % 2 === 0) ? '1px solid var(--hairline)' : 'none',
                borderBottom: i < 6 ? '1px solid var(--hairline)' : 'none',
              }}>
                <div className="mono-tag"><span className="dot" style={{ background: 'var(--accent)' }}></span>{f.mono}</div>
                <h3 className="h3" style={{ marginTop: 16, fontSize: 19 }}>{f.title}</h3>
                <p className="body" style={{ marginTop: 10, fontSize: 14 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── For finance teams ── */}
      <section className="section hairline">
        <div className="container">
          <SectionLabel num="04">For finance teams</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
            <div>
              <h2 className="h2">SAP, Tally, and 40+ ERPs.<br /><em>Zero CSV uploads.</em><br />Production-grade reliability.</h2>
              <p className="body" style={{ marginTop: 24, maxWidth: 460 }}>
                Push transactional data from your ERP to GSTN in real time, without middleware, without scheduled jobs, without anyone exporting a CSV. Native connectors are built by WhiteBooks engineers — not third-party plugins that break with every ERP upgrade.
              </p>
              <p className="body" style={{ marginTop: 18, maxWidth: 460 }}>
                For SAP shops specifically: e-invoicing and e-way bill generation happen inside the SAP transaction. The IRN comes back as a field on the invoice, posted to the same document. Your accounts team never opens a second tool.
              </p>
              <div style={{ marginTop: 32 }}>
                <a href="#" className="link-arrow" onClick={(e) => e.preventDefault()}>See the SAP integration</a>
              </div>
            </div>
            <div>
              <div className="mono-tag accent" style={{ marginBottom: 18 }}><span className="dot"></span>Native connectors · in-house</div>
              <div style={{
                border: '1px solid var(--hairline)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
              }}>
                {[
                  'SAP S/4HANA', 'SAP ECC', 'Tally Prime',
                  'Oracle NetSuite', 'MS Dynamics 365', 'Zoho Books',
                  'Odoo', 'Sage', 'QuickBooks',
                  'Marg', 'Busy', '+30 more',
                ].map((c, i) => (
                  <div key={i} style={{
                    padding: '20px 14px',
                    borderRight: ((i + 1) % 3 !== 0) ? '1px solid var(--hairline)' : 'none',
                    borderBottom: i < 9 ? '1px solid var(--hairline)' : 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    color: i === 11 ? 'var(--accent-bright)' : 'var(--fg-secondary)',
                    textAlign: 'center',
                  }}>
                    {c}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-quaternary)', letterSpacing: '0.04em' }}>
                ⤷ Push frequency: every 5 minutes (Tally) · real-time (SAP) · webhook (REST)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reconciliation, properly explained ── */}
      <section className="section hairline">
        <div className="container">
          <SectionLabel num="05">Reconciliation, explained</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end', marginBottom: 56 }}>
            <h2 className="h1">GSTR-2A, 2B, IMS, and bank statement reconciliation —<br /><em>in one engine.</em></h2>
            <p className="lede" style={{ maxWidth: 460, justifySelf: 'end' }}>
              Reconciliation in GST isn't one job — it's four overlapping ones. WhiteBooks handles each.
            </p>
          </div>
          <div style={{ border: '1px solid var(--hairline)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            {[
              { num: '01', name: 'GSTR-2B vs. Purchase Register', mono: '2b · pr · match', body: 'Match every booked purchase invoice against what your vendor filed in GSTR-1. Surface vendors who haven\'t filed, invoices missing entirely, and ITC at risk under Rule 37A.' },
              { num: '02', name: 'GSTR-2A trend tracking', mono: '2a · trend · 12mo', body: '2A is dynamic. WhiteBooks tracks every vendor\'s filing pattern over 12 months and flags falling compliance scores — so you know which vendors to chase before their next missed filing costs you ITC.' },
              { num: '03', name: 'Invoice Management System (IMS)', mono: 'ims · oct 2025', body: 'Live from October 2025. WhiteBooks pulls your IMS dashboard, lets you accept/reject/hold invoices in bulk, and tracks rejected credit notes that increase your 3B liability.' },
              { num: '04', name: 'Bank reconciliation', mono: 'bank · ledger', body: 'Match your bank statement to receivables and payables. Auto-clear matched transactions. Surface unbooked income before audit, not during.' },
            ].map((r, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr 2fr',
                gap: 32,
                padding: '32px 36px',
                borderBottom: i < 3 ? '1px solid var(--hairline)' : 'none',
                alignItems: 'baseline',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--accent)', letterSpacing: '0.05em' }}>{r.num}</div>
                <div>
                  <h3 className="h3" style={{ fontSize: 20 }}>{r.name}</h3>
                  <div className="mono-tag" style={{ marginTop: 10 }}><span className="dot"></span>{r.mono}</div>
                </div>
                <p className="body" style={{ marginTop: 0 }}>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The AI layer ── */}
      <section className="section hairline relative" style={{ overflow: 'hidden' }}>
        <div className="mesh" style={{ ['--mesh-opacity' as string]: intensity } as React.CSSProperties}></div>
        <div className="container relative">
          <SectionLabel num="06">The AI layer</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end', marginBottom: 56 }}>
            <h2 className="h1">What the AI <em className="grad-text" style={{ fontStyle: 'italic' }}>actually does</em> inside WhiteBooks GST.</h2>
          </div>
          <div className="grid-2">
            {[
              { tag: 'fuzzy_match', title: 'Fuzzy vendor matching', body: 'A model trained on 10 crore+ Indian invoices reconciles "M/s. RAJESH ENTERPRISES" with "Rajesh Enterprises Pvt Ltd" with "RAJESH ENT." — without you maintaining alias tables.' },
              { tag: 'risk_score', title: 'Notice risk scoring', body: 'Each GSTR-3B you\'re about to file gets a 0–100 notice risk score, based on ITC variance, turnover trend, HSN concentration, and prior notice history. Above 70, WhiteBooks suggests what to recheck.' },
              { tag: 'nl_query', title: 'Natural-language queries', body: 'Type "show me all October vendors with ITC variance above 10%" or "which clients haven\'t filed 3B for September?" — answers draw from your live data with source rows linked.' },
              { tag: 'classify', title: 'Auto-categorization of unmatched invoices', body: 'Mismatches get auto-classified: vendor unfiled, invoice missing in PR, rate mismatch, GSTIN typo, time-of-supply error. Each class routes to a different resolution workflow. You stop sorting; you start resolving.' },
            ].map((c, i) => (
              <div key={i} className="card" style={{ padding: 36 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="mono-tag accent"><span className="dot"></span>{c.tag}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-quaternary)' }}>0{i + 1}</span>
                </div>
                <h3 className="h3" style={{ marginTop: 22, fontSize: 22 }}>{c.title}</h3>
                <p className="body" style={{ marginTop: 14 }}>{c.body}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-quaternary)' }}>
            ⤷ AI features run on the Anthropic API with strict data isolation. Your invoices, vendor data, and filing history are never used to train models — yours, ours, or anyone else's.
          </div>
        </div>
      </section>

      {/* ── Pricing strip ── */}
      <section className="section hairline">
        <div className="container">
          <SectionLabel num="07">Pricing</SectionLabel>
          <h2 className="h2" style={{ marginBottom: 48 }}>GST Software pricing — annual, all-in.</h2>
          <div className="grid-3">
            {[
              { name: 'Solo CA / SMB', price: '4,999', perks: ['1 GSTIN', 'Unlimited GSTR filings', '2A/2B reconciliation', 'Email support'] },
              { name: 'CA Firm', price: '24,999', perks: ['Up to 50 client GSTINs', 'Multi-user', 'Working papers', 'White-label client portal', 'Priority support'], featured: true, unit: '/ year · per partner' },
              { name: 'Enterprise', price: 'Custom', perks: ['Unlimited GSTINs', 'SAP / Tally connectors', 'IMS bulk ops', '99.95% SLA', 'Dedicated CSM'] },
            ].map((t, i) => (
              <div key={i} className="card" style={{
                padding: 32,
                borderColor: t.featured ? 'rgba(220,47,101,0.4)' : 'var(--hairline)',
                background: t.featured ? 'linear-gradient(180deg, rgba(220,47,101,0.04), var(--bg-card) 60%)' : 'var(--bg-card)',
                position: 'relative',
              }}>
                {t.featured && <div style={{ position: 'absolute', top: -10, right: 20 }}><span className="mono-tag accent"><span className="dot"></span>Most popular</span></div>}
                <div className="h3" style={{ fontSize: 20 }}>{t.name}</div>
                <div style={{ marginTop: 24, display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  {t.price !== 'Custom' && <span style={{ fontSize: 18, color: 'var(--fg-tertiary)' }}>₹</span>}
                  <span className="num" style={{ fontSize: 44, letterSpacing: '-0.02em', color: 'var(--fg-primary)', fontFamily: 'var(--font-serif)' }}>{t.price}</span>
                </div>
                <div style={{ fontSize: 11, color: 'var(--fg-quaternary)', fontFamily: 'var(--font-mono)', marginTop: 4, letterSpacing: '0.04em' }}>
                  {t.unit || (t.price !== 'Custom' ? '/ year' : '')}
                </div>
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
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section hairline">
        <div className="container container-narrow" style={{ maxWidth: 980 }}>
          <SectionLabel num="08">FAQ</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '0.7fr 1.3fr', gap: 64, alignItems: 'start' }}>
            <h2 className="h2">Common<br />questions.</h2>
            <FAQ items={[
              { q: 'Does WhiteBooks GST Software file GSTR-9 and 9C?', a: 'Yes. WhiteBooks supports GSTR-1, 1A, 3B, 4, 5, 6, 7, 8, 9, 9A, 9C, IFF, ITC-04, and CMP-08. Bulk filing across multiple GSTINs is included on CA Firm and Enterprise plans.' },
              { q: 'Can I file from Tally without exporting CSVs?', a: 'Yes. The WhiteBooks Tally Connector pushes data directly from Tally Prime to WhiteBooks every 5 minutes. No CSV exports, no manual mapping, no broken reconciliations from version mismatches.' },
              { q: 'How does WhiteBooks handle the IMS (Invoice Management System) that went live in October 2025?', a: 'WhiteBooks pulls your IMS dashboard automatically, lets you accept/reject/hold inward invoices in bulk, and tracks the impact of any rejection on your GSTR-3B liability. Rule 37A reversals are flagged before they hit your books.' },
              { q: 'What\'s the difference between WhiteBooks and ClearTax for GST filing?', a: 'Three differences. WhiteBooks holds a direct GSP license from GSTN; ClearTax operates through a different GSP arrangement. WhiteBooks builds its own SAP and Tally connectors in-house; most ClearTax integrations are partner-built. WhiteBooks has not discontinued any product line in 2025 — CAs migrating from ClearTax TaxCloud cite continuity as a primary reason for switching.' },
              { q: 'How long does migration from another GST tool take?', a: 'For a CA firm with up to 100 clients, typical migration takes 30–60 minutes. WhiteBooks imports prior 36 months of GSTR filings, working papers, vendor masters, and client master data. White-glove migration is free on CA Firm and Enterprise plans.' },
              { q: 'Is my data secure?', a: 'All data is hosted in ISO 27001-certified Indian data centers. WhiteBooks operates under direct GSTN oversight as a licensed GSP, audited annually. AES-256 at rest, TLS 1.3 in transit, no third-party data sharing, no use of customer data for AI model training.' },
            ]} />
          </div>
        </div>
      </section>

      <ClosingCTA
        eyebrow="GST Software"
        eyebrowSubTitle="WhiteBooks"
        title="File faster than your portal can keep up."
        body="14-day free trial. White-glove migration. Median 14 minutes per GSTIN per month."
        primary="Start free trial"
        secondary="Book a 20-min Demo"
      />
    </>
  );
}
