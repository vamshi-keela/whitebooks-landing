import React from 'react';
import SectionLabel from '@/components/ui/SectionLabel';

export function KSASection() {
  return (
    <section className="section hairline relative" style={{ overflow: 'hidden' }}>
      <div className="mesh" style={{ ['--mesh-opacity' as string]: 0.55 } as React.CSSProperties}></div>
      <div className="container relative" style={{ position: 'relative' }}>
        <SectionLabel num="08">Geographic moat</SectionLabel>
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
                { region: 'India', regulator: 'GSTN', items: ['GSTR-1, 3B, 9, 9C', 'IRP / e-invoicing', 'e-Way Bills', 'IMS, Rule 37A'] },
                { region: 'Saudi Arabia', regulator: 'ZATCA', items: ['Phase 2 integration', 'Cryptographic stamp', 'Real-time clearance', 'Arabic + English'] },
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
  );
}
