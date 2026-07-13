import React, { useMemo } from 'react';
import CopyButton from './CopyButton';

interface Props {
  json: string;
  /* Cap the body height, scrolling vertically past it. Numbers are px; strings
     pass through (e.g. '60vh'). Pass 'none' to grow to full content height so
     an outer container handles the scrolling. */
  maxHeight?: number | string;
  showCopy?: boolean;
  /* Drop the box's own border/radius so it can be embedded inside a card. */
  bare?: boolean;
  /* Fill the parent flex column and scroll internally instead of using a fixed
     `maxHeight`. Responsive: capped at 60vh on mobile, flex-fills on lg+. */
  fill?: boolean;
}

type Token = { type: 'key' | 'string' | 'number' | 'boolean' | 'null' | 'punct' | 'ws'; value: string };

function tokenize(json: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < json.length) {
    const ch = json[i];
    if (ch === '"') {
      let j = i + 1;
      while (j < json.length && json[j] !== '"') {
        if (json[j] === '\\') j++;
        j++;
      }
      const raw = json.slice(i, j + 1);
      // If next non-whitespace char is ':', it's a key
      let k = j + 1;
      while (k < json.length && (json[k] === ' ' || json[k] === '\t')) k++;
      if (json[k] === ':') {
        tokens.push({ type: 'key', value: raw });
      } else {
        tokens.push({ type: 'string', value: raw });
      }
      i = j + 1;
    } else if (/\d|-/.test(ch)) {
      let j = i + 1;
      while (j < json.length && /[\d.eE+-]/.test(json[j])) j++;
      tokens.push({ type: 'number', value: json.slice(i, j) });
      i = j;
    } else if (json.slice(i, i + 4) === 'true') {
      tokens.push({ type: 'boolean', value: 'true' });
      i += 4;
    } else if (json.slice(i, i + 5) === 'false') {
      tokens.push({ type: 'boolean', value: 'false' });
      i += 5;
    } else if (json.slice(i, i + 4) === 'null') {
      tokens.push({ type: 'null', value: 'null' });
      i += 4;
    } else if (/[{}[\]:,]/.test(ch)) {
      tokens.push({ type: 'punct', value: ch });
      i++;
    } else if (/\s/.test(ch)) {
      // Collect whitespace including newlines
      let j = i + 1;
      while (j < json.length && /\s/.test(json[j])) j++;
      tokens.push({ type: 'ws', value: json.slice(i, j) });
      i = j;
    } else {
      i++;
    }
  }
  return tokens;
}

/* Theme-aware token colors — resolve per theme (and stay dark inside a
   `.dp-code-panel` scope, which re-declares these variables). */
const tokenColors: Record<Token['type'], string> = {
  key: 'var(--dp-accent-2)',
  string: 'var(--dp-str-fg)',
  number: 'var(--dp-type-fg)',
  boolean: 'var(--dp-kw-fg)',
  null: 'var(--dp-fg-dim)',
  punct: 'var(--dp-fg-muted)',
  ws: 'transparent',
};

export default function JsonTree({ json, maxHeight = 400, showCopy = true, bare = false, fill = false }: Props): React.ReactElement {
  const tokens = useMemo(() => {
    try {
      const formatted = JSON.stringify(JSON.parse(json), null, 2);
      return tokenize(formatted);
    } catch {
      return tokenize(json);
    }
  }, [json]);

  return (
    <div
      className={fill ? 'lg:flex-1 lg:min-h-0 lg:flex lg:flex-col' : undefined}
      style={{ position: 'relative', background: 'transparent' }}
    >
      {showCopy && (
        <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
          <CopyButton text={json} label={false} />
        </div>
      )}
      <div
        className={fill ? 'max-h-[60vh] lg:max-h-none lg:flex-1 lg:min-h-0' : undefined}
        style={{
          background: 'var(--dp-code-bg)',
          border: bare ? 'none' : '1px solid var(--dp-border)',
          borderRadius: bare ? 0 : 10,
          padding: '14px 48px 14px 14px',
          fontFamily: 'var(--dp-font-mono)',
          fontSize: 12.5,
          lineHeight: 1.7,
          scrollbarWidth: 'thin',
          overflowX: 'auto',
          overflowY: maxHeight === 'none' ? 'visible' : 'auto',
          // In fill mode, sizing is handled by the responsive classes above.
          maxHeight: fill ? undefined : (maxHeight === 'none' ? undefined : maxHeight),
          whiteSpace: 'pre',
        }}
      >
        {tokens.map((tok, i) => (
          <span key={i} style={{ color: tokenColors[tok.type] }}>
            {tok.value}
          </span>
        ))}
      </div>
    </div>
  );
}
