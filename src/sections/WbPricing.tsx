import React from 'react';
import { ButtonLink } from '@/components/ui/Button';
import SectionLabel from '@/components/ui/SectionLabel';

export function PricingSection() {
  return (
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
              <ButtonLink
                href="#"
                variant={t.featured ? 'primary' : 'ghost'}
                arrow
                className="mt-7 w-full"
                onClick={(e) => e.preventDefault()}
              >
                {t.price === 'Custom' ? 'Talk to sales' : 'Start free trial'}
              </ButtonLink>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, fontSize: 12, color: 'var(--fg-quaternary)', fontFamily: 'var(--font-mono)' }}>
          ⤷ Pricing placeholders for design. Replace with actuals before publishing.
        </div>
      </div>
    </section>
  );
}
