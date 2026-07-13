import React, { memo } from 'react';
import type { ParameterObject } from '@/data/openapi-spec';

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
    <div className="flex flex-col">
      {Object.entries(byLocation).map(([loc, params], groupIdx) => {
        const locColor = inColors[loc];
        return (
          <div
            key={loc}
            className={groupIdx > 0 ? 'mt-7 pt-7 border-t border-[var(--dp-border)]' : ''}
          >
            <div
              className="text-[12px] font-semibold font-[family-name:var(--dp-font-body)] uppercase tracking-[0.06em] mb-1 flex items-center gap-1.5"
              style={{ color: locColor?.color ?? 'var(--dp-fg-dim)' }}
            >
              {loc} parameters
            </div>
            <div>
              {params.map(param => {
                const schema = param.schema && !('$ref' in param.schema) ? param.schema : null;
                const paramType = schema?.type ?? 'string';
                return (
                  <div
                    key={param.name}
                    className="py-3.5 border-b border-[var(--dp-border)] dp-param-row"
                  >
                    {/* Name · type · required — single Fern-style line */}
                    <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                      <code className="font-[family-name:var(--dp-font-mono)] text-[13.5px] text-[var(--dp-fg)] font-semibold tracking-[-0.01em]">
                        {param.name}
                      </code>
                      <span className="font-[family-name:var(--dp-font-mono)] text-[12px] text-[var(--dp-fg-dim)]">
                        {paramType}
                      </span>
                      <span
                        className={[
                          'text-[12px] font-medium',
                          param.required
                            ? 'text-[var(--dp-accent)]'
                            : 'text-[var(--dp-fg-faint)]',
                        ].join(' ')}
                      >
                        {param.required ? 'required' : 'optional'}
                      </span>
                      {(schema?.deprecated || param.deprecated) && (
                        <span className="text-[11px] text-[var(--dp-warning)] font-[family-name:var(--dp-font-mono)]">
                          ⚠ deprecated
                        </span>
                      )}
                    </div>

                    {/* Description + example + enum */}
                    {param.description && (
                      <div className="text-[13.5px] text-[var(--dp-fg-muted)] leading-[1.65] mt-1.5">
                        {param.description}
                      </div>
                    )}
                    {param.example !== undefined && (
                      <div className="text-[12px] font-[family-name:var(--dp-font-mono)] text-[var(--dp-fg-faint)] mt-1.5">
                        Example:{' '}
                        <span className="text-[var(--dp-str-fg)] bg-[var(--dp-surface-2)] border border-[var(--dp-border)] rounded-[5px] px-1.5 py-px">
                          {JSON.stringify(param.example)}
                        </span>
                      </div>
                    )}
                    {schema?.enum && (
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        <span className="text-[11.5px] text-[var(--dp-fg-faint)] font-[family-name:var(--dp-font-body)]">Enum:</span>
                        {schema.enum.map(v => (
                          <code
                            key={String(v)}
                            className="text-[11.5px] font-[family-name:var(--dp-font-mono)] text-[var(--dp-kw-fg)] bg-[var(--dp-surface-2)] border border-[var(--dp-border)] rounded-[5px] px-1.5 py-px"
                          >
                            {String(v)}
                          </code>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default memo(ParameterTable);
