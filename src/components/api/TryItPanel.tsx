import React, { useState, useMemo } from 'react';
import { Play, Loader2, AlertCircle, AlertTriangle } from 'lucide-react';
import type { NormalizedOperation } from '../../data/openapi-spec';
import { useSpec } from '../../contexts/SpecContext';
import { generateExampleFromSchema } from '../../utils/schemaHelpers';
import { resolveSchema } from '../../utils/normalizeSpec';
import JsonTree from './JsonTree';
import MethodBadge from './MethodBadge';
import CopyButton from './CopyButton';

interface Props {
  operation: NormalizedOperation;
  fullUrl: string;
}

interface ResponseState {
  status: number;
  statusText: string;
  body: string;
  durationMs: number;
}

function statusColors(code: number): { text: string; bg: string; border: string } {
  if (code >= 200 && code < 300) return { text: '#4ade80', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.25)' };
  if (code >= 400 && code < 500) return { text: '#fbbf24', bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.25)' };
  if (code >= 500) return { text: '#f87171', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.25)' };
  return { text: 'var(--dp-fg-muted)', bg: 'var(--dp-surface)', border: 'var(--dp-border)' };
}

/* Shared class strings */
const inputCls = [
  'w-full bg-[var(--dp-surface-2)] border border-[var(--dp-border-strong)] rounded-[7px]',
  'px-3 py-2',
  'font-[family-name:var(--dp-font-mono)] text-[13px] text-[var(--dp-fg)]',
  'outline-none focus:border-[var(--dp-accent-line)] transition-colors duration-150',
  'placeholder:text-[var(--dp-fg-faint)]',
].join(' ');

const sectionHead = 'text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--dp-fg-dim)] mt-[18px] mb-2';
const fieldLabel = 'block text-[12px] font-[family-name:var(--dp-font-mono)] text-[var(--dp-fg-muted)] mb-1.5';

export default function TryItPanel({ operation, fullUrl }: Props): React.ReactElement {
  const { spec } = useSpec();

  const pathParams = useMemo(() => operation.parameters?.filter(p => p.in === 'path') ?? [], [operation]);
  const queryParams = useMemo(() => operation.parameters?.filter(p => p.in === 'query') ?? [], [operation]);
  const headerParams = useMemo(() => operation.parameters?.filter(p => p.in === 'header') ?? [], [operation]);

  const defaultBody = useMemo(() => {
    const schema = operation.requestBody?.content?.['application/json']?.schema;
    if (!schema) return '';
    const resolved = resolveSchema(spec, schema);
    return JSON.stringify(generateExampleFromSchema(resolved, spec), null, 2);
  }, [operation, spec]);

  const [authToken, setAuthToken] = useState('');
  const [pathVals, setPathVals] = useState<Record<string, string>>({});
  const [queryVals, setQueryVals] = useState<Record<string, string>>({});
  const [headerVals, setHeaderVals] = useState<Record<string, string>>({});
  const [body, setBody] = useState(defaultBody);
  const [loading, setLoading] = useState(false);

  const canSend = useMemo(() => {
    if (pathParams.some(p => p.required && !pathVals[p.name]?.trim())) return false;
    if (queryParams.some(p => p.required && !queryVals[p.name]?.trim())) return false;
    if (headerParams.some(p => p.required && !headerVals[p.name]?.trim())) return false;
    return true;
  }, [pathParams, queryParams, headerParams, pathVals, queryVals, headerVals]);
  const [response, setResponse] = useState<ResponseState | null>(null);
  const [error, setError] = useState<string | null>(null);

  const buildUrl = () => {
    let url = fullUrl;
    for (const p of pathParams) {
      url = url.replace(`{${p.name}}`, encodeURIComponent(pathVals[p.name] ?? `{${p.name}}`));
    }
    const qs = queryParams
      .filter(p => queryVals[p.name])
      .map(p => `${encodeURIComponent(p.name)}=${encodeURIComponent(queryVals[p.name])}`);
    if (qs.length) url += '?' + qs.join('&');
    return url;
  };

  const execute = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);
    const t0 = performance.now();
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
      if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
      for (const p of headerParams) {
        if (headerVals[p.name]) headers[p.name] = headerVals[p.name];
      }
      const opts: RequestInit = { method: operation.method.toUpperCase(), headers };
      if (['POST', 'PUT', 'PATCH'].includes(operation.method.toUpperCase()) && body) {
        opts.body = body;
      }
      const res = await fetch(buildUrl(), opts);
      const durationMs = Math.round(performance.now() - t0);
      const text = await res.text();
      setResponse({ status: res.status, statusText: res.statusText, body: text, durationMs });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Method + path hint — only on sm+ */}
      {/* <div className="hidden sm:flex items-left justify-left gap-1.5 px-3 overflow-hidden min-w-0">
        <MethodBadge method={operation.method} size="sm" />
        <span className="text-[11px] font-[family-name:var(--dp-font-mono)] text-[var(--dp-fg-faint)] overflow-hidden text-ellipsis whitespace-nowrap overflow-x-auto">
          {operation.path}
        </span>
      </div> */}
      {/* Method + path */}
      <div className="flex flex-wrap items-center gap-2.5 mb-[18px]">
        <MethodBadge method={operation.method} />

        <code className="font-[family-name:var(--dp-font-mono)] text-[13px] text-[var(--dp-fg)] bg-[var(--dp-surface-2)] border border-[var(--dp-border-strong)] rounded-[7px] px-3 py-1.5 tracking-[0.01em] break-all">
          {operation.path}
        </code>

        {operation.deprecated && (
          <span className="inline-flex items-center gap-1 text-[11px] text-[#f59e0b] bg-[rgba(245,158,11,0.08)] border border-[rgba(245,158,11,0.2)] rounded-[6px] px-2 py-0.5 font-[family-name:var(--dp-font-mono)] shrink-0">
            <AlertTriangle size={10} /> Deprecated
          </span>
        )}

        {/* <div className="ml-auto shrink-0">
          <CopyButton text={fullUrl} size={14} />
        </div> */}
      </div>
      {/* Authorization */}
      {/* <div className={sectionHead}>Authorization</div>
      <div className="relative">
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] font-[family-name:var(--dp-font-mono)] text-[var(--dp-fg-faint)] pointer-events-none select-none">
          Bearer
        </span>
        <input
          type="text"
          placeholder="your-api-key"
          value={authToken}
          onChange={e => setAuthToken(e.target.value)}
          className={`${inputCls} pl-14`}
        />
      </div> */}

      {/* Path params */}
      {pathParams.length > 0 && (
        <>
          <div className={sectionHead}>Path Parameters</div>
          {pathParams.map(p => (
            <div key={p.name} className="mb-2">
              <label className={fieldLabel}>
                {p.name}
                {p.required && <span className="text-[#f87171] ml-0.5">*</span>}
              </label>
              <input
                type="text"
                placeholder={p.example !== undefined ? String(p.example) : `{${p.name}}`}
                value={pathVals[p.name] ?? ''}
                onChange={e => setPathVals(v => ({ ...v, [p.name]: e.target.value }))}
                className={inputCls}
              />
            </div>
          ))}
        </>
      )}

      {/* Query params */}
      {queryParams.length > 0 && (
        <>
          <div className={sectionHead}>Query Parameters</div>
          {queryParams.map(p => (
            <div key={p.name} className="mb-2">
              <label className={fieldLabel}>
                {p.name}
                {p.required && <span className="text-[#f87171] ml-0.5">*</span>}
              </label>
              <input
                type="text"
                placeholder={p.example !== undefined ? String(p.example) : (p.description ?? '')}
                value={queryVals[p.name] ?? ''}
                onChange={e => setQueryVals(v => ({ ...v, [p.name]: e.target.value }))}
                className={inputCls}
              />
            </div>
          ))}
        </>
      )}

      {/* Header params */}
      {headerParams.length > 0 && (
        <>
          <div className={sectionHead}>Headers</div>
          {headerParams.map(p => (
            <div key={p.name} className="mb-2">
              <label className={fieldLabel}>
                {p.name}
                {p.required && <span className="text-[#f87171] ml-0.5">*</span>}
              </label>
              <input
                type="text"
                placeholder={p.example !== undefined ? String(p.example) : ''}
                value={headerVals[p.name] ?? ''}
                onChange={e => setHeaderVals(v => ({ ...v, [p.name]: e.target.value }))}
                className={inputCls}
              />
            </div>
          ))}
        </>
      )}

      {/* Request body */}
      {operation.requestBody && (
        <>
          <div className={sectionHead}>Request Body</div>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            rows={7}
            className={`${inputCls} resize-y leading-[1.6]`}
          />
        </>
      )}

      {/* Execute button */}
      <button
        onClick={execute}
        disabled={loading || !canSend}
        className={[
          'flex items-center justify-center gap-2 mt-[18px] w-full',
          'px-4 py-[10px] rounded-[8px]',
          'text-white font-[family-name:var(--dp-font-body)] text-[13px] font-semibold tracking-[0.02em]',
          'transition-[background] duration-200',
          loading || !canSend
            ? 'bg-[rgba(220,47,101,0.5)] cursor-not-allowed'
            : 'bg-[var(--dp-accent)] cursor-pointer',
        ].join(' ')}
        style={{ border: 'none' }}
      >
        {loading
          ? <><Loader2 size={14} className="animate-spin" /> Sending...</>
          : <><Play size={14} /> Send Request</>
        }
      </button>

      {/* Network / fetch error */}
      {error && (
        <div className="mt-3 flex items-start gap-2 px-3 py-[10px] bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)] rounded-[8px] text-[12px] text-[#f87171] font-[family-name:var(--dp-font-mono)]">
          <AlertCircle size={14} className="shrink-0 mt-px" />
          {error}
        </div>
      )}

      {/* Response */}
      {response && (() => {
        const col = statusColors(response.status);
        return (
          <div className="mt-5">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-[11px] uppercase tracking-[0.1em] text-[var(--dp-fg-dim)] font-bold">
                Response
              </span>
              <span
                className="text-[12px] font-[family-name:var(--dp-font-mono)] font-bold rounded-[6px] px-2.5 py-0.5"
                style={{ color: col.text, background: col.bg, border: `1px solid ${col.border}` }}
              >
                {response.status} {response.statusText}
              </span>
              <span className="ml-auto text-[12px] text-[var(--dp-fg-dim)] font-[family-name:var(--dp-font-mono)]">
                {response.durationMs}ms
              </span>
            </div>

            <div className="bg-[var(--dp-surface)] border border-[var(--dp-border-strong)] rounded-[8px] overflow-hidden">
              <div className="px-3 py-1.5 border-b border-[var(--dp-border-strong)] bg-[var(--dp-surface-2)]">
                <span className="text-[11px] text-[var(--dp-fg-dim)] font-[family-name:var(--dp-font-mono)] uppercase tracking-[0.06em] font-semibold">
                  Body
                </span>
              </div>
              <JsonTree json={response.body} maxHeight={300} />
            </div>
          </div>
        );
      })()}
    </div>
  );
}
