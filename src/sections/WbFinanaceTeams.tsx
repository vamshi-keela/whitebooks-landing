export function FinanceTeamsSection() {
    return (
        <section className="relative border-b border-[var(--hairline)] py-24 max-md:py-16 max-sm:py-12">
            <div className="w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4">
                <div className="grid grid-cols-[1.3fr_0.7fr] gap-16 items-end mb-14 max-lg:gap-10 max-md:grid-cols-1 max-md:gap-6 max-md:mb-10">
                    <h2 className="font-serif font-semibold text-[clamp(28px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] m-0 max-w-[780px] text-balance">
                        <span className="text-[var(--brand)]">Built for finance teams running</span><br />₹50Cr to ₹5,000Cr in turnover.
                    </h2>
                    <p className="text-[17px] max-sm:text-[15px] text-[var(--fg-secondary)] leading-[1.6] m-0 max-w-[460px] justify-self-end max-md:justify-self-start max-md:max-w-full">
                        Direct SAP and Tally connectors. Zero CSV uploads. Your ERP stays the source of truth — WhiteBooks handles the rest.
                    </p>
                </div>
                <div className="grid grid-cols-3 gap-[18px] max-lg:grid-cols-2 max-sm:grid-cols-1">
                    {[
                        { title: 'SAP-native integration', body: 'Push invoices from SAP S/4HANA or ECC to GSTN in real time. Generate IRNs and e-way bills inside the SAP transaction. No middleware, no separate ETL, no CSV fallbacks.', mono: 'sap_s4hana · sap_ecc' },
                        { title: 'ITC optimization, not just matching', body: 'Match 6,000+ invoices per minute against GSTR-2B. Surface every blocked credit, every Rule 37A risk, every vendor with a falling compliance score — before you file 3B.', mono: '6,000 inv/min · Rule 37A' },
                        { title: 'AATO-aware automation', body: 'WhiteBooks reads your AATO and applies the right e-invoicing threshold, the right 30-day IRN window, the right ISD rule. The software adapts to the law, not the other way around.', mono: 'aato_threshold · 30d_window' },
                    ].map((f, i) => (
                        <div key={i} className="bg-[var(--bg-card)] border border-[var(--hairline)] rounded-[14px] p-7 transition-[border-color,background] duration-200 ease-[ease] hover:border-[var(--hairline-bright)] hover:bg-[var(--bg-elev)]">
                            <div className="inline-flex items-center gap-[6px] px-[10px] py-1 rounded-full font-mono text-[11px] font-medium tracking-[0.05em] uppercase text-[var(--accent)] bg-[rgba(220,47,101,0.08)] border border-[rgba(220,47,101,0.2)]">
                                <span className="w-[5px] h-[5px] rounded-full bg-[var(--accent)] shrink-0 inline-block"></span>
                                {f.mono}
                            </div>
                            <h3 className="font-serif font-semibold text-[20px] leading-[1.2] tracking-[-0.015em] m-0 mt-[18px]">{f.title}</h3>
                            <p className="text-[17px] max-sm:text-[15px] text-[var(--fg-secondary)] leading-[1.6] m-0 mt-3">{f.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
