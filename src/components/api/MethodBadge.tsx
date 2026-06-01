import React from 'react';
import type { NormalizedMethod } from '../../data/openapi-spec';

interface Props {
  method: NormalizedMethod;
  size?: 'sm' | 'md';
}

const config: Record<NormalizedMethod, { bg: string; text: string; border: string }> = {
  GET:    { bg: 'rgba(34,197,94,0.12)',   text: '#4ade80', border: 'rgba(34,197,94,0.25)' },
  POST:   { bg: 'rgba(96,165,250,0.12)',  text: '#60a5fa', border: 'rgba(96,165,250,0.25)' },
  PUT:    { bg: 'rgba(251,191,36,0.12)',  text: '#fbbf24', border: 'rgba(251,191,36,0.25)' },
  DELETE: { bg: 'rgba(239,68,68,0.12)',   text: '#f87171', border: 'rgba(239,68,68,0.25)' },
  PATCH:  { bg: 'rgba(167,139,250,0.12)', text: '#a78bfa', border: 'rgba(167,139,250,0.25)' },
};

export default function MethodBadge({ method, size = 'md' }: Props): React.ReactElement {
  const c = config[method];
  return (
    <span
      style={{
        background: c.bg,
        color: c.text,
        border: `1px solid ${c.border}`,
        borderRadius: 6,
        padding: size === 'sm' ? '1px 6px' : '2px 8px',
        fontSize: size === 'sm' ? 10 : 11,
        fontWeight: 700,
        fontFamily: 'var(--dp-font-mono)',
        letterSpacing: '0.04em',
        flexShrink: 0,
        display: 'inline-block',
      }}
    >
      {method}
    </span>
  );
}
