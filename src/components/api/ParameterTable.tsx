import React, { memo } from 'react';
import type { ParameterObject } from '../../data/openapi-spec';

interface Props {
  parameters: ParameterObject[];
}

const inColors: Record<string, { color: string; bg: string }> = {
  path:   { color: '#f5c986', bg: 'rgba(245,201,134,0.08)' },
  query:  { color: '#7dd3fc', bg: 'rgba(125,211,252,0.08)' },
  header: { color: '#c084fc', bg: 'rgba(192,132,252,0.08)' },
  cookie: { color: '#a5e3a1', bg: 'rgba(165,227,161,0.08)' },
};

export default memo(function ParameterTable({ parameters }: Props): React.ReactElement {
  if (!parameters.length) return <></>;

  const byLocation: Record<string, ParameterObject[]> = {};
  for (const p of parameters) {
    if (!byLocation[p.in]) byLocation[p.in] = [];
    byLocation[p.in].push(p);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {Object.entries(byLocation).map(([loc, params]) => (
        <div key={loc}>
          <div
            style={{
              fontSize: 11,
              fontFamily: 'var(--dp-font-mono)',
              color: inColors[loc]?.color ?? 'var(--dp-fg-dim)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 6,
            }}
          >
            {loc} parameters
          </div>
          <div
            style={{
              background: 'var(--dp-surface)',
              border: '1px solid var(--dp-border)',
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            {params.map((param, i) => {
              const schema = param.schema && !('$ref' in param.schema) ? param.schema : null;
              const paramType = schema?.type ?? 'string';
              return (
                <div
                  key={param.name}
                  style={{
                    padding: '10px 14px',
                    borderBottom: i < params.length - 1 ? '1px solid var(--dp-border)' : 'none',
                    display: 'grid',
                    gridTemplateColumns: '180px 80px 70px 1fr',
                    gap: 12,
                    alignItems: 'start',
                  }}
                >
                  {/* Name */}
                  <div>
                    <code style={{ fontFamily: 'var(--dp-font-mono)', fontSize: 13, color: 'var(--dp-fg)', fontWeight: 600 }}>
                      {param.name}
                    </code>
                    <span
                      style={{
                        display: 'inline-block',
                        marginLeft: 6,
                        fontSize: 10,
                        fontFamily: 'var(--dp-font-mono)',
                        color: inColors[loc]?.color ?? 'var(--dp-fg-dim)',
                        background: inColors[loc]?.bg ?? 'transparent',
                        border: `1px solid ${inColors[loc]?.color ?? 'var(--dp-border)'}30`,
                        borderRadius: 4,
                        padding: '0 5px',
                      }}
                    >
                      {loc}
                    </span>
                  </div>

                  {/* Type */}
                  <code style={{ fontFamily: 'var(--dp-font-mono)', fontSize: 12, color: '#7dd3fc' }}>
                    {paramType}
                  </code>

                  {/* Required */}
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: 'var(--dp-font-mono)',
                      color: param.required ? '#f87171' : 'var(--dp-fg-faint)',
                      background: param.required ? 'rgba(239,68,68,0.08)' : 'transparent',
                      border: param.required ? '1px solid rgba(239,68,68,0.2)' : 'none',
                      borderRadius: 4,
                      padding: '1px 5px',
                      alignSelf: 'center',
                    }}
                  >
                    {param.required ? 'required' : 'optional'}
                  </span>

                  {/* Description + example */}
                  <div>
                    {param.description && (
                      <div style={{ fontSize: 12, color: 'var(--dp-fg-muted)', lineHeight: 1.5 }}>
                        {param.description}
                      </div>
                    )}
                    {param.example !== undefined && (
                      <div style={{ fontSize: 11, fontFamily: 'var(--dp-font-mono)', color: 'var(--dp-fg-faint)', marginTop: 2 }}>
                        Example: <span style={{ color: '#a5e3a1' }}>{JSON.stringify(param.example)}</span>
                      </div>
                    )}
                    {schema?.enum && (
                      <div style={{ fontSize: 11, fontFamily: 'var(--dp-font-mono)', color: '#c084fc', marginTop: 2 }}>
                        Enum: {schema.enum.map(String).join(' | ')}
                      </div>
                    )}
                    {schema?.deprecated || param.deprecated ? (
                      <span style={{ fontSize: 10, color: '#f59e0b', fontFamily: 'var(--dp-font-mono)' }}>⚠ deprecated</span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
});
