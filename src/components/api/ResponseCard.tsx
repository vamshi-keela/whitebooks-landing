import React, { useState, useEffect, useMemo } from 'react';
import type { NormalizedOperation } from '../../data/openapi-spec';
import { useSpec } from '../../contexts/SpecContext';
import { getResponseExample } from '../../utils/generateExamples';
import JsonTree from './JsonTree';
import CopyButton from './CopyButton';

export interface LiveResponse {
  status: number;
  statusText: string;
  body: string;
  durationMs: number;
}

function statusColor(code: number): { text: string; bg: string } {
  if (code >= 200 && code < 300) return { text: 'var(--dp-status-2xx)', bg: 'var(--dp-status-2xx-bg)' };
  if (code >= 400 && code < 500) return { text: 'var(--dp-status-4xx)', bg: 'var(--dp-status-4xx-bg)' };
  if (code >= 500) return { text: 'var(--dp-status-5xx)', bg: 'var(--dp-status-5xx-bg)' };
  return { text: 'var(--dp-fg-muted)', bg: 'var(--dp-surface-2)' };
}

interface Props {
  operation: NormalizedOperation;
  /* When a live request has been sent, show its result instead of the example. */
  live?: LiveResponse | null;
  maxHeight?: number;
}

/**
 * Response card used in both the detail-page right rail (example payloads) and
 * the Playground (live results). Mirrors the Sandbox reference: a header strip
 * with status pills + copy, then a syntax-highlighted JSON body. Theme-aware:
 * follows the ambient dp token scope (dark inside `.dp-code-panel`).
 */
export default function ResponseCard({ operation, live, maxHeight = 320 }: Props): React.ReactElement {
  const { spec } = useSpec();
  const codes = useMemo(() => Object.keys(operation.responses ?? {}), [operation]);
  const [activeCode, setActiveCode] = useState(codes[0] ?? '200');

  useEffect(() => { setActiveCode(codes[0] ?? '200'); }, [codes]);

  const json = useMemo(
    () => (live ? live.body : getResponseExample(operation, activeCode, spec)),
    [live, operation, activeCode, spec],
  );

  return (
    <div className="rounded-[10px] border border-[var(--dp-border)] overflow-hidden bg-[var(--dp-code-bg)]">
      {/* Header: status pills/tabs + copy */}
      <div className="flex items-center justify-between gap-2 px-2.5 py-2 border-b border-[var(--dp-border)] bg-[var(--dp-surface)]">
        <div className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {live ? (() => {
            const col = statusColor(live.status);
            return (
              <span
                className="flex items-center gap-1.5 px-2.5 py-[3px] rounded-md text-[12px] font-[family-name:var(--dp-font-mono)] font-semibold whitespace-nowrap"
                style={{ color: col.text, background: col.bg }}
              >
                {live.status} {live.statusText}
                <span className="text-[var(--dp-fg-dim)] font-normal">· {live.durationMs}ms</span>
              </span>
            );
          })() : (
            codes.map(code => {
              const active = code === activeCode;
              const col = statusColor(parseInt(code, 10));
              return (
                <button
                  key={code}
                  onClick={() => setActiveCode(code)}
                  className="px-2.5 py-[3px] rounded-md text-[12px] font-[family-name:var(--dp-font-mono)] cursor-pointer border-0 transition-colors duration-150 whitespace-nowrap"
                  style={{
                    color: active ? col.text : 'var(--dp-fg-dim)',
                    background: active ? col.bg : 'transparent',
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {code}
                </button>
              );
            })
          )}
        </div>
        {json && <CopyButton text={json} label={false} size={12} />}
      </div>

      {/* Body */}
      {json
        ? <JsonTree json={json} maxHeight={maxHeight} showCopy={false} bare />
        : <div className="px-4 py-6 text-[13px] text-[var(--dp-fg-faint)] font-[family-name:var(--dp-font-mono)]">No example available.</div>}
    </div>
  );
}
