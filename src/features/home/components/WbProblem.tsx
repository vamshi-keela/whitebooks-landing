const STATS = [
  { k: '5 → 3', v: 'GST 2.0 slabs' },
  { k: '₹5 Cr', v: 'AATO threshold' },
  { k: '30 days', v: 'IRN window' },
  { k: '72 hrs', v: 'WhiteBooks shipping lag' },
];

export function ProblemSection() {
  return (
    <section className="relative border-b border-[var(--hairline)] py-24 max-md:py-16 max-sm:py-12">
      <div className="w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4">

        <div className="grid grid-cols-[1.1fr_0.9fr] gap-16 items-stretch max-lg:gap-12 max-md:grid-cols-1 max-md:gap-8">

          {/* Left — headline */}
          <div className="flex flex-col">
            <span className="font-mono text-[11px] text-[var(--brand)] uppercase tracking-[0.16em] mb-5 max-md:mb-4">
              The problem
            </span>
            <h2 className="font-serif font-semibold text-[clamp(32px,3.8vw,44px)] leading-[1.08] tracking-[-0.025em] m-0 text-balance">
              GST compliance wasn't designed for AI.{' '}
              <span className="text-[var(--brand)]">We're rebuilding it so it is.</span>
            </h2>

            {/* Bottom-anchored thesis — fills the column on wide screens */}
            <p className="mt-auto mb-0 max-md:hidden border-0 border-l-2 border-solid border-[var(--brand)] pl-5 text-lg text-[var(--fg-secondary)] leading-[1.5]">
              The gap was never your data.
              <span className="text-[var(--fg-primary)]"> It's software that can't reason about it.</span>
            </p>
          </div>

          {/* Right — body */}
          <div className="pt-1 max-md:pt-0 flex flex-col gap-5">
            <p className="text-base md:text-lg text-[var(--fg-secondary)] leading-[1.65] m-0">
              Indian compliance changed more in 2025 than in the previous five years combined.
              GST 2.0 collapsed five slabs into three. E-invoicing thresholds dropped to{' '}
              <strong className="text-[var(--fg-primary)] font-semibold">₹5 crore AATO</strong>. IMS went live. Rule 37A tightened ITC. The
              30-day IRN window arrived. Your software hasn't kept up.
            </p>
            <p className="text-base md:text-lg text-[var(--fg-secondary)] leading-[1.65] m-0">
              Most GST tools still treat compliance as data entry. WhiteBooks treats it as an{' '}
              <strong className="text-[var(--fg-primary)] font-semibold">inference problem</strong> — match invoices, flag anomalies, predict
              notices, and file in one keystroke. Built on the only thing that should be doing
              this work: AI plus a GSP license direct from GSTN.
            </p>
          </div>

        </div>

        {/* Stats — full-width card row */}
        <div className="mt-16 max-md:mt-12 grid grid-cols-4 max-sm:grid-cols-2 border-t border-l border-[var(--hairline)] rounded-[14px] overflow-hidden">
          {STATS.map((s) => (
            <div
              key={s.k}
              className="group relative border-b border-r border-[var(--hairline)] p-6 max-sm:p-5 transition-colors duration-200 hover:bg-[var(--brand-softer)]"
            >
              <span className="absolute top-0 left-0 h-px w-0 bg-[var(--brand)] transition-all duration-300 group-hover:w-full" />
              <div className="font-serif font-semibold text-[clamp(22px,2.2vw,30px)] text-[var(--fg-primary)] tracking-[-0.02em] leading-none">
                {s.k}
              </div>
              <div className="font-mono text-[11px] text-[var(--fg-tertiary)] uppercase tracking-[0.1em] mt-3">
                {s.v}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
