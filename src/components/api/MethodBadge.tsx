import React from 'react';
import type { NormalizedMethod } from '../../data/openapi-spec';

interface Props {
  method: NormalizedMethod;
  size?: 'sm' | 'md';
}

const config: Record<NormalizedMethod, { bg: string; text: string; border: string }> = {
  GET:    { bg: 'var(--dp-method-get-bg)',    text: 'var(--dp-method-get-fg)',    border: 'var(--dp-method-get-border)' },
  POST:   { bg: 'var(--dp-method-post-bg)',   text: 'var(--dp-method-post-fg)',   border: 'var(--dp-method-post-border)' },
  PUT:    { bg: 'var(--dp-method-put-bg)',    text: 'var(--dp-method-put-fg)',    border: 'var(--dp-method-put-border)' },
  DELETE: { bg: 'var(--dp-method-delete-bg)', text: 'var(--dp-method-delete-fg)', border: 'var(--dp-method-delete-border)' },
  PATCH:  { bg: 'var(--dp-method-patch-bg)',  text: 'var(--dp-method-patch-fg)',  border: 'var(--dp-method-patch-border)' },
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
