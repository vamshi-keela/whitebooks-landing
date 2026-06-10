import React, { memo } from 'react';
import type { ParameterObject } from '../../data/openapi-spec';

interface Props {
  parameters: ParameterObject[];
}

const inColors: Record<string, { color: string; bg: string }> = {
  path: { color: 'var(--dp-param-path-fg)', bg: 'var(--dp-param-path-bg)' },
  query: { color: 'var(--dp-param-query-fg)', bg: 'var(--dp-param-query-bg)' },
  header: { color: 'var(--dp-param-header-fg)', bg: 'var(--dp-param-header-bg)' },
  cookie: { color: 'var(--dp-param-cookie-fg)', bg: 'var(--dp-param-cookie-bg)' },
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
          <div className="bg-[var(--dp-surface)] border border-[var(--dp-border-strong)] rounded-[10px] overflow-hidden">
            {params.map((param, i) => {
              const schema = param.schema && !('$ref' in param.schema) ? param.schema : null;
              const paramType = schema?.type ?? 'string';
              const locColor = inColors[loc];
              return (
                <div
                  key={param.name}
                  className={[
                    'px-[14px] py-[11px] grid gap-3 items-start',
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
                      className="inline-block ml-1.5 text-[10px] font-[family-name:var(--dp-font-mono)] rounded-[4px] px-[5px] py-px"
                      style={{
                        color: locColor?.color ?? 'var(--dp-fg-dim)',
                        background: locColor?.bg ?? 'transparent',
                        border: `1px solid ${locColor?.color ?? 'var(--dp-border)'}`,
                        opacity: 0.9,
                      }}
                    >
                      {loc}
                    </span>
                  </div>

                  {/* Type */}
                  <code className="font-[family-name:var(--dp-font-mono)] text-[12px] text-[var(--dp-type-fg)]">
                    {paramType}
                  </code>

                  {/* Required */}
                  <span
                    className={[
                      'text-[11.5px] font-medium rounded-[4px] px-[6px] py-px w-fit',
                      param.required
                        ? 'text-[var(--dp-status-5xx)] bg-[var(--dp-status-5xx-bg)] border border-[var(--dp-status-5xx)]'
                        : 'text-[var(--dp-fg-faint)] border border-[var(--dp-border)]',
                    ].join(' ')}
                  >
                    {param.required ? 'required' : 'optional'}
                  </span>

                  {/* Description + example */}
                  <div>
                    {param.description && (
                      <div className="text-[13px] text-[var(--dp-fg-muted)] leading-[1.6]">
                        {param.description}
                      </div>
                    )}
                    {param.example !== undefined && (
                      <div className="text-[11.5px] font-[family-name:var(--dp-font-mono)] text-[var(--dp-fg-faint)] mt-1">
                        Example: <span className="text-[var(--dp-str-fg)]">{JSON.stringify(param.example)}</span>
                      </div>
                    )}
                    {schema?.enum && (
                      <div className="text-[11.5px] font-[family-name:var(--dp-font-mono)] text-[var(--dp-kw-fg)] mt-1">
                        Enum: {schema.enum.map(String).join(' | ')}
                      </div>
                    )}
                    {(schema?.deprecated || param.deprecated) && (
                      <span className="text-[11px] text-[var(--dp-warning)] font-[family-name:var(--dp-font-mono)]">
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
