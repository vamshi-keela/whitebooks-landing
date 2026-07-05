export function AILayerSection() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--hairline)] max-[700px]:py-[72px] py-24">
      <div
        className="absolute inset-[-10%] pointer-events-none z-0 blur-[38px] saturate-[160%] opacity-[0.55] [animation:wb-mesh-drift_22s_ease-in-out_infinite_alternate] bg-[radial-gradient(ellipse_38%_50%_at_var(--m1x)_var(--m1y),rgba(220,47,101,0.5),transparent_65%),radial-gradient(ellipse_36%_42%_at_var(--m2x)_var(--m2y),rgba(255,110,156,0.42),transparent_70%),radial-gradient(ellipse_30%_36%_at_var(--m3x)_var(--m3y),rgba(255,168,120,0.22),transparent_72%),radial-gradient(ellipse_32%_38%_at_var(--m4x)_var(--m4y),rgba(155,22,68,0.55),transparent_65%)]"
      />
      <div className="w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4 relative z-[1]">
        <div className="grid grid-cols-[1.3fr_0.7fr] gap-16 items-end mb-14 max-[900px]:grid-cols-1 max-[900px]:gap-6 max-[900px]:mb-10">
          <h2 className="font-serif font-semibold text-[clamp(34px,5vw,64px)] leading-[1.04] tracking-[-0.025em] m-0 text-balance">
            AI that{' '}
            <em className="text-[var(--brand)]">
              reconciles, predicts, and explains
            </em>
            {' '}— not just a chatbot in the corner.
          </h2>
          <p className="text-[18px] text-[var(--fg-secondary)] leading-[1.55] max-w-[460px] m-0 justify-self-end max-[900px]:justify-self-start max-[900px]:max-w-full">
            WhiteBooks uses purpose-built models for four jobs that humans have been doing manually since GST launched in 2017.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-[18px] mt-12 max-[1100px]:grid-cols-2 max-[768px]:grid-cols-1">
          {[
            { num: '01', tag: 'reconcile', title: 'Invoice matching at scale', body: 'A model trained on 10 crore+ invoices matches your purchase register against GSTR-2B in seconds. Handles fuzzy vendor names, rounding deltas, and split invoices that exact-match logic gives up on.' },
            { num: '02', tag: 'detect', title: 'Anomaly detection before filing', body: 'Every return is scanned for the 47 most common GSTN rejection causes before submission. Flagged before you click file. Not after the portal returns an error at 11:47pm on the 20th.' },
            { num: '03', tag: 'predict', title: 'Notice prediction', body: 'WhiteBooks reads your filing pattern and flags returns likely to trigger a Section 61 scrutiny notice — based on ITC mismatch trends, turnover variance, and HSN distribution anomalies.' },
            { num: '04', tag: 'explain', title: 'Copilot for compliance', body: 'Ask "Why did my ITC drop ₹4.2L in October?" or "Which vendors are unfiled for September?" — get an answer drawn from your live data, with source rows linked. Built on the Anthropic API.' },
          ].map((c, i) => (
            <div key={i} className="relative bg-[var(--bg-card)] border border-[var(--hairline)] rounded-[14px] p-7 transition-[border-color,background] duration-200 ease-[ease] hover:border-[var(--hairline-bright)] hover:bg-[var(--bg-elev)]">
              <div className="flex justify-between items-start">
                <span className="inline-flex items-center gap-[6px] px-[10px] py-1 rounded-full font-mono text-[11px] font-medium tracking-[0.05em] uppercase text-[var(--accent)] bg-[rgba(220,47,101,0.08)] border border-[rgba(220,47,101,0.2)]">
                  <span className="w-[5px] h-[5px] rounded-full bg-[var(--accent)] shrink-0 inline-block" />
                  {c.tag}
                </span>
                <span className="font-mono text-[12px] text-[var(--fg-quaternary)]">{c.num}</span>
              </div>
              <h3 className="font-serif font-semibold text-[18px] leading-[1.2] tracking-[-0.015em] m-0 mt-6">{c.title}</h3>
              <p className="text-[14px] text-[var(--fg-secondary)] leading-[1.6] m-0 mt-3">{c.body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
