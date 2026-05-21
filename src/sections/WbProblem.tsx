import SectionLabel from '@/components/ui/SectionLabel';

export function ProblemSection() {
    return (
        <section className="section hairline">
            <div className="container">
                <div className="wb-problem-grid">
                    <h2 className="h1">
                        GST compliance wasn't designed for AI. <em>We're rebuilding it</em> so it is.
                    </h2>
                    <div className="wb-problem-body">
                        <p className="body">
                            Indian compliance changed more in 2025 than in the previous five years combined. GST 2.0 collapsed five slabs into three. E-invoicing thresholds dropped to <strong>₹5 crore AATO</strong>. IMS went live. Rule 37A tightened ITC. The 30-day IRN window arrived. Your software hasn't kept up.
                        </p>
                        <p className="body">
                            Most GST tools still treat compliance as data entry. Whitebooks treats it as an <strong>inference problem</strong> — match invoices, flag anomalies, predict notices, and file in one keystroke. Built on the only thing that should be doing this work: AI plus a GSP license direct from GSTN.
                        </p>
                        <div className="wb-problem-stats">
                            {[
                                { k: '5 → 3', v: 'GST 2.0 slabs' },
                                { k: '₹5 Cr', v: 'AATO threshold' },
                                { k: '30 days', v: 'IRN window' },
                                { k: '72 hours', v: 'Whitebooks shipping lag' },
                            ].map((s, i) => (
                                <div key={i} className="wb-problem-stat">
                                    <div className="wb-problem-stat-key">{s.k}</div>
                                    <div className="wb-problem-stat-lbl">{s.v}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
