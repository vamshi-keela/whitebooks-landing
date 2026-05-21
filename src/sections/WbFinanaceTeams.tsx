export function FinanceTeamsSection() {
    return (
        <section className="section hairline">
            <div className="container">
                <div className="wb-section-header">
                    <h2 className="h2">Built for finance teams running<br /><em>₹50Cr to ₹5,000Cr</em> in turnover.</h2>
                    <p className="body">
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
    );
}
