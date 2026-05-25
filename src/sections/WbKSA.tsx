export function KSASection() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--hairline)] max-[700px]:py-[72px] py-24">
      <div className="absolute inset-[-10%] pointer-events-none z-0 blur-[38px] saturate-[160%] opacity-[0.55] [animation:wb-mesh-drift_22s_ease-in-out_infinite_alternate] bg-[radial-gradient(ellipse_38%_50%_at_var(--m1x)_var(--m1y),rgba(220,47,101,0.5),transparent_65%),radial-gradient(ellipse_36%_42%_at_var(--m2x)_var(--m2y),rgba(255,110,156,0.42),transparent_70%),radial-gradient(ellipse_30%_36%_at_var(--m3x)_var(--m3y),rgba(255,168,120,0.22),transparent_72%),radial-gradient(ellipse_32%_38%_at_var(--m4x)_var(--m4y),rgba(155,22,68,0.55),transparent_65%)]" />
      <div className="w-full px-24 relative z-[1] max-[700px]:px-8">
        <div className="grid grid-cols-2 gap-16 items-center max-[900px]:grid-cols-1 max-[900px]:gap-10">
          <div>
            <h2 className="font-serif font-semibold text-[clamp(34px,5vw,64px)] leading-[1.04] tracking-[-0.025em] m-0 text-balance">
              Indian <br />compliance is hard. <em>Saudi compliance is harder.</em><br />We do both.
            </h2>
            <p className="text-[18px] text-[var(--fg-secondary)] leading-[1.55] max-w-[600px] m-0 mt-[26px]">
              Whitebooks is one of the few GSPs operating ZATCA-approved e-invoicing infrastructure in Saudi Arabia. If your company files in India and the GCC, this is one platform, one contract, one team.
            </p>
            <div className="mt-8">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 py-[11px] px-[18px] rounded-lg font-body font-medium text-[14px] tracking-[0.005em] border border-[var(--hairline-strong)] bg-transparent text-[var(--fg-secondary)] transition-all duration-[160ms] ease-[ease] whitespace-nowrap no-underline cursor-pointer hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.16)] hover:text-[var(--fg-primary)] after:content-['→']"
                onClick={(e) => e.preventDefault()}
              >
                Explore KSA e-Invoicing
              </a>
            </div>
          </div>
          <div className="p-10 border border-[var(--hairline-strong)] rounded-[16px] bg-[var(--bg-card)] max-[600px]:p-6">
            <div className="flex justify-between items-start mb-10 max-[600px]:mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-[6px] rounded-full bg-[var(--brand-soft)] text-[var(--brand)] font-mono text-[11px] font-semibold uppercase tracking-[0.14em]">
                <span className="w-[5px] h-[5px] rounded-full bg-[var(--accent)] shrink-0 inline-block" />
                One platform | two regulators
              </div>
              <span className="font-mono text-[11px] text-[var(--fg-quaternary)]">↳ 2026</span>
            </div>
            <div className="grid grid-cols-2 gap-7 max-[600px]:grid-cols-1 max-[600px]:gap-6">
              {[
                { region: 'India', regulator: 'GSTN', items: ['GSTR-1, 3B, 9, 9C', 'IRP / e-invoicing', 'e-Way Bills', 'IMS, Rule 37A'] },
                { region: 'Saudi Arabia', regulator: 'ZATCA', items: ['Phase 2 integration', 'Cryptographic stamp', 'Real-time clearance', 'Arabic + English'] },
              ].map((b, i) => (
                <div key={i}>
                  <div className="font-mono text-[11px] text-[var(--fg-tertiary)] uppercase tracking-[0.08em]">↳ {b.regulator}</div>
                  <div className="font-serif font-semibold text-[22px] leading-[1.2] tracking-[-0.015em] m-0 mt-2">{b.region}</div>
                  <ul className="mt-[18px] p-0 list-none flex flex-col gap-2">
                    {b.items.map((it, j) => (
                      <li key={j} className="text-[13px] text-[var(--fg-secondary)] flex items-center gap-2">
                        <span className="text-[var(--accent)]">·</span>{it}
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
