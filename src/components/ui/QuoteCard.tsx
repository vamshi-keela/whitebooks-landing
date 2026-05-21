import React from 'react';

interface QuoteCardProps {
  quote: string;
  name: string;
  role: string;
  big?: boolean;
}

export function QuoteCard({ quote, name, role, big = false }: QuoteCardProps) {
  return (
    <div className="card" style={{ padding: big ? '44px 40px' : 28 }}>
      <div
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: big ? 28 : 19,
          lineHeight: big ? 1.3 : 1.5,
          letterSpacing: '-0.012em',
          color: 'var(--fg-primary)',
        }}
      >
        "{quote}"
      </div>
      <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--gradient-1), var(--gradient-2))',
            opacity: 0.7,
            flexShrink: 0,
          }}
        ></div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--fg-primary)' }}>{name}</div>
          <div style={{ fontSize: 12.5, color: 'var(--fg-tertiary)', fontFamily: 'var(--font-mono)' }}>{role}</div>
        </div>
      </div>
    </div>
  );
}

export default QuoteCard;
