import SectionLabel from '@/components/ui/SectionLabel';

export function ProblemSection() {
    return (
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
    );
}