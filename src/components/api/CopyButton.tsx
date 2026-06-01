import React, { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';

interface Props {
  text: string;
  size?: number;
  label?: boolean;
}

export default function CopyButton({ text, size = 14, label = true }: Props): React.ReactElement {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    void navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      title="Copy to clipboard"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        background: 'none',
        border: '1px solid var(--dp-border)',
        borderRadius: 6,
        padding: '3px 8px',
        color: copied ? 'var(--dp-success)' : 'var(--dp-fg-dim)',
        fontSize: 12,
        fontFamily: 'var(--dp-font-body)',
        cursor: 'pointer',
        transition: 'color 0.15s, border-color 0.15s',
        whiteSpace: 'nowrap',
      }}
    >
      {copied ? <Check size={size} /> : <Copy size={size} />}
      {label && (copied ? 'Copied' : 'Copy')}
    </button>
  );
}
