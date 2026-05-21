import React from 'react';
export function KSASection() {
  return (
    <section className="section hairline relative" style={{ overflow: 'hidden' }}>
      <div className="mesh" style={{ ['--mesh-opacity' as string]: 0.55 } as React.CSSProperties}></div>
      <div className="container relative">
        <div className="wb-ksa-grid">
          <div>
            <h2 className="h1">Indian compliance is hard.<br /><em>Saudi compliance is harder.</em><br />We do both.</h2>
            <p className="lede" style={{ marginTop: 26 }}>
              Whitebooks is one of the few GSPs operating ZATCA-approved e-invoicing infrastructure in Saudi Arabia. If your company files in India and the GCC, this is one platform, one contract, one team.
            </p>
            <div style={{ marginTop: 32 }}>
              <a href="#" className="btn btn-ghost btn-arrow" onClick={(e) => e.preventDefault()}>Explore KSA e-Invoicing</a>
            </div>
          </div>
          <div className="wb-ksa-card">
            <div className="wb-ksa-card-head">
              <div className="eyebrow"><span className="dot"></span>One platform · two regulators</div>
              <span className="wb-ksa-card-year">↳ 2026</span>
            </div>
            <div className="wb-ksa-regions">
              {[
                { region: 'India', regulator: 'GSTN', items: ['GSTR-1, 3B, 9, 9C', 'IRP / e-invoicing', 'e-Way Bills', 'IMS, Rule 37A'] },
                { region: 'Saudi Arabia', regulator: 'ZATCA', items: ['Phase 2 integration', 'Cryptographic stamp', 'Real-time clearance', 'Arabic + English'] },
              ].map((b, i) => (
                <div key={i}>
                  <div className="wb-ksa-region-label">↳ {b.regulator}</div>
                  <div className="h3 wb-ksa-region-title">{b.region}</div>
                  <ul className="wb-ksa-list">
                    {b.items.map((it, j) => (
                      <li key={j}><span className="wb-ksa-list-dot">·</span>{it}</li>
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
