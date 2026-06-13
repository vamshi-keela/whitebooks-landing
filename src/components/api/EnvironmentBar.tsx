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
    <div className="flex flex-wrap items-center gap-2 sm:gap-3 px-4 sm:px-6 py-[7px] bg-[var(--dp-nav-bg)] border-b border-[var(--dp-border)] sticky top-[var(--dp-nav-h)] z-40 backdrop-blur-xl">
      <Globe size={13} color="var(--dp-fg-faint)" className="shrink-0" />

      <span className="text-xs text-[var(--dp-fg-dim)] font-body shrink-0">
        Environment:
      </span>

      {/* Segmented control */}
      <div className="flex p-[3px] gap-0.5 rounded-lg bg-[var(--dp-surface-2)] border border-[var(--dp-border)]">
        {environments.map(env => {
          const isSelected = env.key === selected.key;
          const isSandbox = env.color === 'emerald';
          const accent = isSandbox ? 'var(--dp-success)' : 'var(--dp-accent)';
          return (
            <button
              key={env.key}
              onClick={() => onChange(env)}
              className="flex items-center gap-1.5 rounded-[6px] px-3 py-[3px] text-xs font-body cursor-pointer transition-all duration-150 border-0"
              style={{
                background: isSelected ? 'var(--dp-bg)' : 'transparent',
                boxShadow: isSelected ? '0 1px 3px rgba(0,0,0,0.18)' : 'none',
                color: isSelected ? 'var(--dp-fg)' : 'var(--dp-fg-dim)',
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

      <code className="hidden sm:inline-block font-[family-name:var(--dp-font-mono)] text-[12px] text-[var(--dp-fg-dim)] bg-[var(--dp-surface)] border border-[var(--dp-border)] rounded-md px-2 py-0.5">
        {selected.baseUrl}
      </code>
    </div>
  );
}
