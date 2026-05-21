import React from 'react';
export function AILayerSection() {
  return (
    <section className="section hairline relative" style={{ overflow: 'hidden' }}>
      <div className="mesh" style={{ ['--mesh-opacity' as string]: 0.55 } as React.CSSProperties}></div>
      <div className="container relative">
        <div className="wb-section-header">
          <h2 className="h1">AI that <em className="grad-text" style={{ fontStyle: 'italic' }}>reconciles, predicts, and explains</em> — not just a chatbot in the corner.</h2>
          <p className="lede">
            Whitebooks uses purpose-built models for four jobs that humans have been doing manually since GST launched in 2017.
          </p>
        </div>
        <div className="grid-4">
          {[
            { num: '01', tag: 'reconcile', title: 'Invoice matching at scale', body: 'A model trained on 10 crore+ invoices matches your purchase register against GSTR-2B in seconds. Handles fuzzy vendor names, rounding deltas, and split invoices that exact-match logic gives up on.' },
            { num: '02', tag: 'detect', title: 'Anomaly detection before filing', body: 'Every return is scanned for the 47 most common GSTN rejection causes before submission. Flagged before you click file. Not after the portal returns an error at 11:47pm on the 20th.' },
            { num: '03', tag: 'predict', title: 'Notice prediction', body: 'Whitebooks reads your filing pattern and flags returns likely to trigger a Section 61 scrutiny notice — based on ITC mismatch trends, turnover variance, and HSN distribution anomalies.' },
            { num: '04', tag: 'explain', title: 'Copilot for compliance', body: 'Ask "Why did my ITC drop ₹4.2L in October?" or "Which vendors are unfiled for September?" — get an answer drawn from your live data, with source rows linked. Built on the Anthropic API.' },
          ].map((c, i) => (
            <div key={i} className="card" style={{ position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className="mono-tag accent"><span className="dot"></span>{c.tag}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-quaternary)' }}>{c.num}</span>
              </div>
              <h3 className="h3" style={{ marginTop: 24, fontSize: 18 }}>{c.title}</h3>
              <p className="body" style={{ marginTop: 12, fontSize: 14 }}>{c.body}</p>
            </div>
          ))}
        </div>
        <div className="wb-ai-footer">
          <a href="#" className="link-arrow link-arrow-accent" onClick={(e) => e.preventDefault()}>See the AI in action (2-min demo)</a>
          <span className="wb-ai-footer-note">⤷ models on the Anthropic API · data never used for training</span>
        </div>
      </div>
    </section>
  );
}
