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

function highlight(code: string, lang: Lang): React.ReactNode {
  const lines = code.split('\n');
  return lines.map((line, i) => {
    const parts: React.ReactNode[] = [];
    const rest = line;

    if (lang === 'cURL') {
      const segments = rest.split(/(curl|--header|-H|-d|-X|POST|GET|PUT|DELETE|PATCH|Bearer)/g);
      segments.forEach((seg, j) => {
        const isKw = /^(curl|--header|-H|-d|-X|POST|GET|PUT|DELETE|PATCH|Bearer)$/.test(seg);
        parts.push(
          <span key={j} style={{ color: isKw ? 'var(--dp-kw-fg)' : 'var(--dp-fg)' }}>{seg}</span>
        );
      });
    } else {
      const segments = rest.split(/(["'](?:[^"'\\]|\\.)*["'])/g);
      segments.forEach((seg, j) => {
        const isStr = /^["']/.test(seg);
        parts.push(<span key={j} style={{ color: isStr ? 'var(--dp-str-fg)' : 'var(--dp-fg)' }}>{seg}</span>);
      });
    }

    return (
      <div key={i} style={{ lineHeight: 1.75, display: 'flex' }}>
        <span style={{ color: 'var(--dp-fg-faint)', fontSize: 11, minWidth: 32, userSelect: 'none', paddingRight: 8 }}>
          {i + 1}
        </span>
        <span style={{ flex: 1 }}>{parts}</span>
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
        background: 'var(--dp-code-bg)',
        border: '1px solid var(--dp-border)',
        borderRadius: 10,
        overflow: 'hidden',
      }}
    >
      {/* Tab bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          borderBottom: '1px solid var(--dp-border)',
          padding: '6px 8px',
          background: 'var(--dp-surface)',
        }}
      >
        <div style={{ display: 'flex', gap: 2, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {LANGS.map(lang => {
            const active = activeLang === lang;
            return (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                style={{
                  background: active ? 'var(--dp-surface-3)' : 'transparent',
                  border: `1px solid ${active ? 'var(--dp-border-strong)' : 'transparent'}`,
                  borderRadius: 6,
                  color: active ? 'var(--dp-fg)' : 'var(--dp-fg-dim)',
                  padding: '4px 10px',
                  fontSize: 12,
                  fontWeight: active ? 500 : 400,
                  fontFamily: 'var(--dp-font-body)',
                  cursor: 'pointer',
                  transition: 'color 0.15s, background 0.15s',
                  whiteSpace: 'nowrap',
                }}
              >
                {lang}
              </button>
            );
          })}
        </div>
        <CopyButton text={activeCode} label={false} size={12} />
      </div>

      {/* Code */}
      <div
        style={{
          padding: '14px 14px 18px 12px',
          fontFamily: 'var(--dp-font-mono)',
          fontSize: 12.5,
          overflowX: 'auto',
          maxHeight: 420,
          overflowY: 'auto',
        }}
      >
        {highlight(activeCode, activeLang)}
      </div>
    </div>
  );
});
