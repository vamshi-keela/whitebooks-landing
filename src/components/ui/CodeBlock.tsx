import React, { useState } from 'react';

interface CodeBlockProps {
  samples: Record<string, string>;
  defaultLang?: string;
}

export function CodeBlock({ samples, defaultLang }: CodeBlockProps) {
  const langs = Object.keys(samples);
  const [lang, setLang] = useState(defaultLang ?? langs[0]);

  return (
    <div className="codeblock">
      <div className="codeblock-hd">
        <div className="dots" style={{ display: 'flex', gap: 5, marginRight: 10 }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }}></span>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }}></span>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }}></span>
        </div>
        {langs.map((l) => (
          <span key={l} className={`lang-tab ${l === lang ? 'active' : ''}`} onClick={() => setLang(l)}>
            {l}
          </span>
        ))}
        <span style={{ marginLeft: 'auto', color: 'var(--fg-quaternary)', fontSize: 11 }}>
          api.whitebooks.in
        </span>
      </div>
      <pre className="codeblock-body" dangerouslySetInnerHTML={{ __html: samples[lang] }} />
    </div>
  );
}

export default CodeBlock;
