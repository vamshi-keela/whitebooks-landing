import React, { useState, useMemo, memo } from 'react';
import type { NormalizedOperation } from '../../data/openapi-spec';
import { useSpec } from '../../contexts/SpecContext';
import { getAllExamples } from '../../utils/generateExamples';
import CopyButton from './CopyButton';

interface Props {
  operation: NormalizedOperation;
}

type Lang = 'cURL' | 'JavaScript' | 'Axios' | 'Python';
const LANGS: Lang[] = ['cURL', 'JavaScript', 'Axios', 'Python'];

const langColors: Record<string, string> = {
  'cURL': '#f5c986',
  'JavaScript': '#fbbf24',
  'Axios': '#60a5fa',
  'Python': '#a5e3a1',
};

function highlight(code: string, lang: Lang): React.ReactNode {
  // Minimal syntax coloring
  const lines = code.split('\n');
  return lines.map((line, i) => {
    const parts: React.ReactNode[] = [];
    let rest = line;

    if (lang === 'cURL') {
      // Color curl keywords
      const segments = rest.split(/(curl|--header|-H|-d|-X|POST|GET|PUT|DELETE|PATCH|Bearer)/g);
      segments.forEach((seg, j) => {
        const isKw = /^(curl|--header|-H|-d|-X|POST|GET|PUT|DELETE|PATCH|Bearer)$/.test(seg);
        parts.push(
          <span key={j} style={{ color: isKw ? '#c084fc' : 'var(--dp-fg)' }}>{seg}</span>
        );
      });
    } else {
      // Generic: color strings in green, keywords in purple
      const segments = rest.split(/(["'](?:[^"'\\]|\\.)*["'])/g);
      segments.forEach((seg, j) => {
        const isStr = /^["']/.test(seg);
        parts.push(<span key={j} style={{ color: isStr ? '#a5e3a1' : 'var(--dp-fg)' }}>{seg}</span>);
      });
    }

    return (
      <div key={i} style={{ lineHeight: 1.7, display: 'flex' }}>
        <span style={{ color: 'var(--dp-fg-faint)', fontSize: 11, minWidth: 32, userSelect: 'none', paddingRight: 8 }}>
          {i + 1}
        </span>
        <span>{parts}</span>
      </div>
    );
  });
}

export default memo(function CodeExampleTabs({ operation }: Props): React.ReactElement {
  const { spec, baseUrl } = useSpec();
  const [activeLang, setActiveLang] = useState<Lang>('cURL');

  const examples = useMemo(
    () => getAllExamples(operation, baseUrl, spec),
    [operation, baseUrl, spec]
  );

  const activeCode = examples[activeLang];

  return (
    <div
      style={{
        background: '#0a0a0f',
        border: '1px solid var(--dp-border)',
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      {/* Tab bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--dp-border)',
          padding: '0 12px',
          background: 'rgba(255,255,255,0.02)',
        }}
      >
        <div style={{ display: 'flex' }}>
          {LANGS.map(lang => (
            <button
              key={lang}
              onClick={() => setActiveLang(lang)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${activeLang === lang ? langColors[lang] ?? 'var(--dp-accent)' : 'transparent'}`,
                color: activeLang === lang ? langColors[lang] ?? 'var(--dp-fg)' : 'var(--dp-fg-dim)',
                padding: '10px 14px',
                fontSize: 12,
                fontFamily: 'var(--dp-font-mono)',
                cursor: 'pointer',
                transition: 'color 0.15s',
                marginBottom: -1,
              }}
            >
              {lang}
            </button>
          ))}
        </div>
        <CopyButton text={activeCode} label={false} />
      </div>

      {/* Code */}
      <div
        style={{
          padding: '16px 16px 16px 12px',
          fontFamily: 'var(--dp-font-mono)',
          fontSize: 12,
          overflowX: 'auto',
          maxHeight: 400,
          overflowY: 'auto',
        }}
      >
        {highlight(activeCode, activeLang)}
      </div>
    </div>
  );
});
