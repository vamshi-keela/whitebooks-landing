import React from 'react';
import { Globe } from 'lucide-react';
import type { Environment as Env } from '../../data/environments';

interface Props {
  environments: Env[];
  selected: Env;
  onChange: (env: Env) => void;
}

export default function EnvironmentBar({ environments, selected, onChange }: Props): React.ReactElement {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 bg-[var(--dp-surface)] border-b border-[var(--dp-border)] sticky top-[60px] z-40 backdrop-blur-[12px]">
      <Globe size={13} color="var(--dp-fg-faint)" className="shrink-0" />

      <span className="text-xs text-[var(--dp-fg-dim)] font-body shrink-0">
        Environment:
      </span>

      <div className="flex gap-1 flex-wrap">
        {environments.map(env => {
          const isSelected = env.key === selected.key;
          const isSandbox = env.color === 'emerald';
          const accent = isSandbox ? '#22c55e' : '#dc2f65';
          return (
            <button
              key={env.key}
              onClick={() => onChange(env)}
              className="flex items-center gap-1.5 rounded-[7px] px-3 py-0.5 text-xs font-body cursor-pointer transition-all duration-150 border"
              style={{
                background: isSelected
                  ? isSandbox ? 'rgba(34,197,94,0.1)' : 'rgba(220,47,101,0.1)'
                  : 'transparent',
                borderColor: isSelected
                  ? isSandbox ? 'rgba(34,197,94,0.3)' : 'rgba(220,47,101,0.3)'
                  : 'var(--dp-border)',
                color: isSelected ? accent : 'var(--dp-fg-muted)',
                fontWeight: isSelected ? 600 : 400,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{
                  background: isSelected ? accent : 'var(--dp-fg-faint)',
                  boxShadow: isSelected ? `0 0 6px ${accent}` : 'none',
                }}
              />
              {env.name}
            </button>
          );
        })}
      </div>

      <code
        className="font-mono text-[12px] bg-[var(--dp-surface-2)] border border-[var(--dp-border)] rounded-md px-2 py-0.5 ml-0 sm:ml-1 max-w-[180px] sm:max-w-none"
        style={{ color: selected.color === 'emerald' ? '#4ade80' : 'var(--dp-accent-2)' }}
      >
        {selected.baseUrl}
      </code>
    </div>
  );
}
