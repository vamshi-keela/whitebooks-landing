import React from 'react';
import { CheckCircle, Globe } from 'lucide-react';
import type { Environment } from '../../data/environments';

interface Props {
  environments: Environment[];
  selected: Environment;
  onChange: (env: Environment) => void;
}

export default function EnvironmentSwitcher({ environments, selected, onChange }: Props): React.ReactElement {
  return (
    <section style={{ padding: '0 0 48px' }}>
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'var(--dp-accent-soft)',
            border: '1px solid var(--dp-accent-line)',
            borderRadius: 999,
            padding: '4px 14px 4px 10px',
            marginBottom: 14,
          }}
        >
          <Globe size={13} color="var(--dp-accent-2)" />
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--dp-accent-2)', fontFamily: 'var(--dp-font-mono)' }}>
            Environments
          </span>
        </div>
        <h2
          style={{
            fontFamily: 'var(--dp-font-display)',
            fontSize: 24,
            fontWeight: 700,
            color: 'var(--dp-fg)',
            margin: '0 0 6px',
          }}
        >
          Switch API Environment
        </h2>
        <p style={{ fontSize: 14, color: 'var(--dp-fg-muted)', margin: 0 }}>
          Selecting an environment updates the Swagger explorer below with the correct spec and base URL.
        </p>
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {environments.map(env => {
          const isSelected = env.key === selected.key;
          const isSandbox = env.color === 'blue';
          const accentColor = isSandbox ? '#3b82f6' : '#22c55e';
          const accentSoft = isSandbox ? 'rgba(59,130,246,0.08)' : 'rgba(34,197,94,0.08)';
          const accentLine = isSandbox ? 'rgba(59,130,246,0.22)' : 'rgba(34,197,94,0.22)';
          const accentGlow = isSandbox ? 'rgba(59,130,246,0.15)' : 'rgba(34,197,94,0.15)';

          return (
            <button
              key={env.key}
              onClick={() => onChange(env)}
              style={{
                background: isSelected ? accentSoft : 'var(--dp-surface)',
                border: `1px solid ${isSelected ? accentLine : 'var(--dp-border)'}`,
                borderRadius: 14,
                padding: '20px 24px',
                cursor: 'pointer',
                textAlign: 'left',
                minWidth: 260,
                flex: '1 1 260px',
                maxWidth: 360,
                boxShadow: isSelected ? `0 0 0 1px ${accentLine}, 0 8px 32px ${accentGlow}` : 'none',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: isSelected ? accentColor : 'var(--dp-fg-faint)',
                      boxShadow: isSelected ? `0 0 8px ${accentColor}` : 'none',
                      display: 'inline-block',
                      transition: 'all 0.2s',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--dp-font-display)',
                      fontWeight: 700,
                      fontSize: 16,
                      color: isSelected ? accentColor : 'var(--dp-fg)',
                    }}
                  >
                    {env.name}
                  </span>
                </div>
                {isSelected && <CheckCircle size={16} color={accentColor} />}
              </div>

              <code
                style={{
                  fontFamily: 'var(--dp-font-mono)',
                  fontSize: 12,
                  color: isSelected ? accentColor : 'var(--dp-fg-muted)',
                  display: 'block',
                  marginBottom: 8,
                }}
              >
                {env.baseUrl}
              </code>

              <div
                style={{
                  fontSize: 12,
                  color: 'var(--dp-fg-dim)',
                  fontFamily: 'var(--dp-font-body)',
                }}
              >
                {env.key === 'sandbox'
                  ? 'Test GSTIN: 29AAAAA0000A1Z5 · OTP: 575757'
                  : 'Live GSP endpoint · production credentials required'}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
