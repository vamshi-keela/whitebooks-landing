import React from 'react';

interface ClosingCTAProps {
  eyebrow?: string;
  title: string;
  body?: string;
  primary: string;
  secondary?: string;
}

export function ClosingCTA({ eyebrow, title, body, primary, secondary }: ClosingCTAProps) {
  return (
    <section className="section relative" style={{ overflow: 'hidden' }}>
      <div className="mesh" style={{ ['--mesh-opacity' as string]: 0.4 } as React.CSSProperties}></div>
      <div className="container relative" style={{ textAlign: 'center', maxWidth: 820 }}>
        {eyebrow && (
          <div className="eyebrow">
            <span className="dot"></span>
            {eyebrow}
          </div>
        )}
        <h2 className="h1" style={{ marginTop: 18 }}>{title}</h2>
        {body && (
          <p className="lede" style={{ marginTop: 22, marginLeft: 'auto', marginRight: 'auto' }}>
            {body}
          </p>
        )}
        <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#" className="btn btn-accent btn-arrow" onClick={(e) => e.preventDefault()}>
            {primary}
          </a>
          {secondary && (
            <a href="#" className="btn btn-ghost" onClick={(e) => e.preventDefault()}>
              {secondary}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default ClosingCTA;
