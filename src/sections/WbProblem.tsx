export function ProblemSection() {
    return (
        <section className="relative border-b border-[var(--hairline)] max-[700px]:py-[72px] py-24">
            <div className="w-full px-24 max-[700px]:px-8  ">
                <div className="grid grid-cols-[1.1fr_0.9fr] gap-0.5 items-start max-[1100px]:gap-12 max-[900px]:grid-cols-1 max-[900px]:gap-8">
                    <h2 className="font-serif font-semibold text-[clamp(34px,5vw,64px)] leading-[1.04] tracking-[-0.025em] m-0 text-balance">
                        GST compliance wasn't designed for AI. <em>We're rebuilding it</em> so it is.
                    </h2>
                    <div className="pt-3 max-[900px]:pt-0">
                        <p className="text-[18px] text-[var(--fg-secondary)] leading-[1.6] m-0">
                            Indian compliance changed more in 2025 than in the previous five years combined. GST 2.0 collapsed five slabs into three. E-invoicing thresholds dropped to <strong>₹5 crore AATO</strong>. IMS went live. Rule 37A tightened ITC. The 30-day IRN window arrived. Your software hasn't kept up.
                        </p>
                        <p className="text-[18px] text-[var(--fg-secondary)] leading-[1.6] m-0 mt-5">
                            Most GST tools still treat compliance as data entry. Whitebooks treats it as an <strong>inference problem</strong> — match invoices, flag anomalies, predict notices, and file in one keystroke. Built on the only thing that should be doing this work: AI plus a GSP license direct from GSTN.
                        </p>
                        <div className="mt-8 flex gap-7 flex-wrap max-[768px]:gap-5">
                            {[
                                { k: '5 → 3', v: 'GST 2.0 slabs' },
                                { k: '₹5 Cr', v: 'AATO threshold' },
                                { k: '30 days', v: 'IRN window' },
                                { k: '72 hours', v: 'Whitebooks shipping lag' },
                            ].map((s, i) => (
                                <div key={i} className="border-l border-[var(--hairline)] pl-4">
                                    <div className="font-serif text-[clamp(20px,2vw,26px)] text-[var(--fg-primary)] tracking-[-0.015em]">{s.k}</div>
                                    <div className="font-mono text-[11px] text-[var(--fg-tertiary)] uppercase tracking-[0.08em] mt-1">{s.v}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
