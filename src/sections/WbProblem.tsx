const STATS = [
  { k: '5 → 3', v: 'GST 2.0 slabs' },
  { k: '₹5 Cr', v: 'AATO threshold' },
  { k: '30 days', v: 'IRN window' },
  { k: '72 hours', v: 'Whitebooks shipping lag' },
];

export function ProblemSection() {
  return (
    <section className="relative border-b border-[var(--hairline)] py-24 max-md:py-16 max-sm:py-12">
      <div className="w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4">
        <div className="grid grid-cols-[1.1fr_0.9fr] gap-16 items-start max-lg:gap-12 max-md:grid-cols-1 max-md:gap-8">

          {/* Left — headline */}
          <h2 className="font-serif font-semibold text-[clamp(30px,4vw,60px)] leading-[1.06] tracking-[-0.025em] m-0 text-balance">
            GST compliance wasn't designed for AI.{' '}
            <em>We're rebuilding it</em> so it is.
          </h2>

          {/* Right — body + stats */}
          <div className="pt-2 max-md:pt-0 flex flex-col gap-5">
            <p className="text-[17px] max-sm:text-[15px] text-[var(--fg-secondary)] leading-[1.65] m-0">
              Indian compliance changed more in 2025 than in the previous five years combined.
              GST 2.0 collapsed five slabs into three. E-invoicing thresholds dropped to{' '}
              <strong>₹5 crore AATO</strong>. IMS went live. Rule 37A tightened ITC. The
              30-day IRN window arrived. Your software hasn't kept up.
            </p>
            <p className="text-[17px] max-sm:text-[15px] text-[var(--fg-secondary)] leading-[1.65] m-0">
              Most GST tools still treat compliance as data entry. Whitebooks treats it as an{' '}
              <strong>inference problem</strong> — match invoices, flag anomalies, predict
              notices, and file in one keystroke. Built on the only thing that should be doing
              this work: AI plus a GSP license direct from GSTN.
            </p>

            {/* Stats row */}
            <div className="mt-3 grid grid-cols-4 max-sm:grid-cols-2 gap-x-6 gap-y-5">
              {STATS.map((s) => (
                <div key={s.k} className="border-l border-[var(--hairline)] pl-4">
                  <div className="font-serif text-[clamp(18px,1.8vw,24px)] text-[var(--fg-primary)] tracking-[-0.015em]">
                    {s.k}
                  </div>
                  <div className="font-mono text-[11px] text-[var(--fg-tertiary)] uppercase tracking-[0.08em] mt-1">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
