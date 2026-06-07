import React, { memo } from 'react';
import type { ParameterObject } from '../../data/openapi-spec';

interface Props {
  parameters: ParameterObject[];
}

const inColors: Record<string, { color: string; bg: string }> = {
  path: { color: '#f5c986', bg: 'rgba(245,201,134,0.08)' },
  query: { color: '#7dd3fc', bg: 'rgba(125,211,252,0.08)' },
  header: { color: '#c084fc', bg: 'rgba(192,132,252,0.08)' },
  cookie: { color: '#a5e3a1', bg: 'rgba(165,227,161,0.08)' },
};

const ParameterTable: React.FC<Props> = ({ parameters }) => {
  if (!parameters.length) return null;

  const byLocation: Record<string, ParameterObject[]> = {};
  for (const p of parameters) {
    if (!byLocation[p.in]) byLocation[p.in] = [];
    byLocation[p.in].push(p);
  }

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(byLocation).map(([loc, params]) => (
        <div key={loc}>
          <div
            className="text-xs font-[family-name:var(--dp-font-mono)] uppercase tracking-[0.08em] mb-1.5"
            style={{ color: inColors[loc]?.color ?? 'var(--dp-fg-dim)' }}
          >
            {loc} parameters
          </div>
          <div className="bg-[var(--dp-surface)] border border-white/10 rounded-[10px] overflow-hidden">
            {params.map((param, i) => {
              const schema = param.schema && !('$ref' in param.schema) ? param.schema : null;
              const paramType = schema?.type ?? 'string';
              const locColor = inColors[loc];
              return (
                <div
                  key={param.name}
                  className={[
                    'px-[14px] py-[10px] grid gap-3 items-start',
                    'grid-cols-[minmax(0,180px)_80px_70px_1fr]',
                    i < params.length - 1 ? 'border-b border-[var(--dp-border)]' : '',
                  ].join(' ')}
                >
                  {/* Name */}
                  <div>
                    <code className="font-[family-name:var(--dp-font-mono)] text-[13px] text-[var(--dp-fg)] font-semibold">
                      {param.name}
                    </code>
                    <span
                      className="inline-block ml-1.5 text-[10px] font-[family-name:var(--dp-font-mono)] rounded-[4px] px-[5px]"
                      style={{
                        color: locColor?.color ?? 'var(--dp-fg-dim)',
                        background: locColor?.bg ?? 'transparent',
                        border: `1px solid ${locColor?.color ?? 'var(--dp-border)'}30`,
                      }}
                    >
                      {loc}
                    </span>
                  </div>

                  {/* Type */}
                  <code className="font-[family-name:var(--dp-font-mono)] text-[12px] text-[#7dd3fc]">
                    {paramType}
                  </code>

                  {/* Required */}
                  <span
                    className={[
                      'text-[12px] font-medium  rounded-[4px] px-[5px] py-px w-fit',
                      param.required
                        ? 'text-[#f87171] bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)]'
                        : 'text-[var(--dp-fg-faint)]',
                    ].join(' ')}
                  >
                    {param.required ? 'required' : 'optional'}
                  </span>

                  {/* Description + example */}
                  <div>
                    {param.description && (
                      <div className="text-[12px] text-[var(--dp-fg-muted)] leading-[1.5]">
                        {param.description}
                      </div>
                    )}
                    {param.example !== undefined && (
                      <div className="text-[11px] font-[family-name:var(--dp-font-mono)] text-[var(--dp-fg-faint)] mt-0.5">
                        Example: <span className="text-[#a5e3a1]">{JSON.stringify(param.example)}</span>
                      </div>
                    )}
                    {schema?.enum && (
                      <div className="text-[11px] font-[family-name:var(--dp-font-mono)] text-[#c084fc] mt-0.5">
                        Enum: {schema.enum.map(String).join(' | ')}
                      </div>
                    )}
                    {(schema?.deprecated || param.deprecated) && (
                      <span className="text-[10px] text-[#f59e0b] font-[family-name:var(--dp-font-mono)]">
                        ⚠ deprecated
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(ParameterTable);
