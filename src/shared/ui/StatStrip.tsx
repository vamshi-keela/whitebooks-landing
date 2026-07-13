import React from 'react';
import type { StatItem } from '@/shared/types/components';

interface StatStripProps {
  stats: StatItem[];
  motion?: boolean;
}

export function StatStrip({ stats, motion }: StatStripProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
        borderTop: '1px solid var(--hairline)',
        borderBottom: '1px solid var(--hairline)',
      }}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          style={{
            padding: '36px 28px',
            borderRight: i < stats.length - 1 ? '1px solid var(--hairline)' : 'none',
          }}
        >
          <div className="stat-num">
            {s.prefix ?? ''}{s.value}{s.unit && <span className="unit">{s.unit}</span>}
          </div>
          <div
            style={{
              marginTop: 12,
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--fg-tertiary)',
            }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatStrip;
