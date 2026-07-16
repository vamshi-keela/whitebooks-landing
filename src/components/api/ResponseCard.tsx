import React, { useState, useEffect, useMemo } from 'react';
import type { NormalizedOperation, ApiSpecKey } from '@/data/openapi-spec';
import { useSpec } from '../../contexts/SpecContext';
import { getResponseExample } from '../../utils/generateExamples';
import { resolveApiError } from '../../utils/resolveApiError';
import JsonTree from './JsonTree';
import CopyButton from './CopyButton';
import ErrorExplainer from './ErrorExplainer';

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
  /* Body height cap (scrolls past it). Numbers are px; strings pass through
     (e.g. '60vh'). Pass 'none' to grow to full height (outer container scrolls). */
  maxHeight?: number | string;
  /* Fill the parent flex column and scroll the body internally (used in the
     Playground so the card shares the panel height instead of overflowing it). */
  fill?: boolean;
  /* Scopes error-code lookups for the ErrorExplainer on live failures. */
  apiType?: ApiSpecKey;
}

/**
 * Response card used in both the detail-page right rail (example payloads) and
 * the Playground (live results). Mirrors the Sandbox reference: a header strip
 * with status pills + copy, then a syntax-highlighted JSON body. Theme-aware:
 * follows the ambient dp token scope (dark inside `.dp-code-panel`).
 */
export default function ResponseCard({ operation, live, maxHeight = 320, fill = false, apiType }: Props): React.ReactElement {
  const { spec } = useSpec();
  const codes = useMemo(() => Object.keys(operation.responses ?? {}), [operation]);
  const [activeCode, setActiveCode] = useState(codes[0] ?? '200');

  useEffect(() => { setActiveCode(codes[0] ?? '200'); }, [codes]);

  const json = useMemo(
    () => (live ? live.body : getResponseExample(operation, activeCode, spec)),
    [live, operation, activeCode, spec],
  );

  const resolvedError = useMemo(
    () => (live ? resolveApiError(live, apiType) : null),
    [live, apiType],
  );

  return (
    <div className={`rounded-[12px] border border-solid border-[var(--dp-border-strong)] overflow-hidden bg-[var(--dp-code-bg)] shadow-[0_1px_2px_rgba(0,0,0,0.06)]${fill ? ' flex flex-col lg:flex-1 lg:min-h-0' : ''}`}>
      {/* Header: status pills/tabs + copy */}
      <div className="rounded-[12px] shrink-0 flex items-center justify-between gap-2 px-2.5 py-2 border-b  border-[var(--dp-border)] bg-[var(--dp-surface)]">
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

      {/* Plain-language explainer for live failures */}
      {resolvedError?.failed && <ErrorExplainer resolved={resolvedError} />}

      {/* Body */}
      {json
        ? <JsonTree json={json} maxHeight={maxHeight} fill={fill} showCopy={false} bare />
        : <div className="px-4 py-6 text-[13px] text-[var(--dp-fg-faint)] font-[family-name:var(--dp-font-mono)]">No example available.</div>}
    </div>
  );
}
