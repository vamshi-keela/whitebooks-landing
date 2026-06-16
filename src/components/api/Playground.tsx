import React, { useState, useEffect, useMemo, useRef } from 'react';
import { X, ChevronDown, ChevronRight, Search, Play, Loader2, AlertCircle } from 'lucide-react';
import { openApiSpec, type NormalizedOperation, type NormalizedMethod, type ApiSpecKey } from '../../data/openapi-spec';
import { useSpec, SpecContext, makeSpecContext } from '../../contexts/SpecContext';
import { generateExampleFromSchema } from '../../utils/schemaHelpers';
import { resolveSchema } from '../../utils/normalizeSpec';
import { searchOps, getOpIndex } from '../../pages/developer/devSearch';
import MethodBadge from './MethodBadge';
import CodeExampleTabs from './CodeExampleTabs';
import ResponseCard, { type LiveResponse } from './ResponseCard';

/* ─── Shared field styles ─────────────────────────────────────────────────── */

const inputCls = [
  'w-full bg-[var(--dp-input-bg)] border border-[var(--dp-input-border)] rounded-lg',
  'px-3 py-2',
  'font-[family-name:var(--dp-font-mono)] text-[12.5px] text-[var(--dp-fg)]',
  'outline-none focus:border-[var(--dp-input-border-focus)] focus:shadow-[0_0_0_3px_var(--dp-accent-soft)]',
  'transition-[border-color,box-shadow] duration-150',
  'placeholder:text-[var(--dp-input-placeholder)]',
].join(' ');

/* ─── Collapsible section ─────────────────────────────────────────────────── */

function Section({
  title, count, children, defaultOpen = true,
}: {
  title: string; count?: number; children: React.ReactNode; defaultOpen?: boolean;
}): React.ReactElement {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-[var(--dp-border)] rounded-xl mb-4 overflow-hidden bg-[var(--dp-surface)]">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-2 px-4 py-3 cursor-pointer bg-transparent border-0 text-left"
      >
        <ChevronRight
          size={15}
          color="var(--dp-fg-dim)"
          className="shrink-0 transition-transform duration-150"
          style={{ transform: open ? 'rotate(90deg)' : 'none' }}
        />
        <span className="text-[14px] font-semibold text-[var(--dp-fg)] flex-1">{title}</span>
        {count !== undefined && count > 0 && (
          <span className="text-[11px] font-[family-name:var(--dp-font-mono)] text-[var(--dp-fg-faint)] bg-[var(--dp-surface-2)] border border-[var(--dp-border)] rounded-[5px] px-1.5 py-px">
            {count}
          </span>
        )}
      </button>
      {open && <div className="px-4 pb-1 border-t border-[var(--dp-border)]">{children}</div>}
    </div>
  );
}

/* ─── Parameter field row ─────────────────────────────────────────────────── */

function ParamField({
  name, type, required, description, placeholder, value, onChange,
}: {
  name: string; type: string; required?: boolean; description?: string;
  placeholder?: string; value: string; onChange: (v: string) => void;
}): React.ReactElement {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(0,280px)] gap-3 md:gap-6 py-4 border-b border-[var(--dp-border)] last:border-0 items-start">
      <div className="min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <code className="font-[family-name:var(--dp-font-mono)] text-[13.5px] font-semibold text-[var(--dp-fg)] tracking-[-0.01em]">
            {name}
          </code>
          <span className="font-[family-name:var(--dp-font-mono)] text-[12px] text-[var(--dp-fg-dim)]">{type}</span>
          {required && <span className="text-[12px] font-medium text-[var(--dp-accent)]">required</span>}
        </div>
        {description && (
          <p className="text-[13px] text-[var(--dp-fg-muted)] leading-[1.6] mt-1.5 m-0">{description}</p>
        )}
      </div>
      <input
        type="text"
        placeholder={placeholder ?? `enter ${name}`}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={inputCls}
      />
    </div>
  );
}

/* ─── Endpoint switcher dropdown (global across all APIs) ─────────────────── */

interface OpResult {
  apiType: ApiSpecKey;
  apiLabel: string;
  op: NormalizedOperation;
  method: NormalizedMethod;
  summary: string;
  path: string;
}

function EndpointSelect({
  activeApiType, activeOp, onSelect,
}: {
  activeApiType: ApiSpecKey;
  activeOp: NormalizedOperation;
  onSelect: (apiType: ApiSpecKey, op: NormalizedOperation) => void;
}): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
    else setQuery('');
  }, [open]);

  /* Debounce so typing stays smooth even with thousands of endpoints. */
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 60);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [open]);

  const isGlobal = debounced.trim().length > 0;

  /* Empty query → browse the active API. Typing → global search across all APIs. */
  const results = useMemo<OpResult[]>(() => {
    if (!isGlobal) {
      return getOpIndex()
        .filter(e => e.apiType === activeApiType)
        .map(e => ({ apiType: e.apiType, apiLabel: e.apiLabel, op: e.op, method: e.method, summary: e.summary, path: e.path }));
    }
    return searchOps(debounced, 50).map(s => ({
      apiType: s.apiType, apiLabel: s.apiLabel, op: s.op, method: s.method, summary: s.summary, path: s.path,
    }));
  }, [isGlobal, debounced, activeApiType]);

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 w-full sm:w-[260px] px-2.5 py-2 rounded-lg border border-[var(--dp-border-strong)] bg-[var(--dp-surface)] cursor-pointer transition-colors duration-150 hover:border-[var(--dp-fg-faint)]"
      >
        <MethodBadge method={activeOp.method} size="sm" />
        <span className="flex-1 min-w-0 text-left text-[13px] font-medium text-[var(--dp-fg)] truncate">
          {activeOp.summary}
        </span>
        <ChevronDown size={15} color="var(--dp-fg-dim)" className="shrink-0" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
      </button>

      {open && (
        <div className="absolute z-10 mt-1.5 w-[360px] max-w-[88vw] rounded-xl border border-[var(--dp-border-strong)] bg-[var(--dp-surface-2)] shadow-[0_16px_48px_rgba(0,0,0,0.4)] overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[var(--dp-border)]">
            <Search size={14} color="var(--dp-fg-dim)" className="shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search endpoints across all APIs..."
              className="flex-1 min-w-0 bg-transparent border-0 outline-none text-[13px] font-body text-[var(--dp-fg)] placeholder:text-[var(--dp-fg-dim)]"
            />
          </div>
          <div className="max-h-[360px] overflow-y-auto py-1">
            {results.map(r => {
              const isActive = r.apiType === activeApiType && r.op.id === activeOp.id;
              return (
                <button
                  key={`${r.apiType}:${r.op.id}`}
                  onClick={() => { onSelect(r.apiType, r.op); setOpen(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 cursor-pointer border-0 bg-transparent text-left transition-colors duration-100 hover:bg-[var(--dp-sidebar-hover)]"
                  style={{ background: isActive ? 'var(--dp-accent-soft)' : undefined }}
                >
                  <MethodBadge method={r.method} size="sm" />
                  <span className="flex-1 min-w-0">
                    <span className={[
                      'block truncate text-[13px]',
                      isActive ? 'text-[var(--dp-accent-2)] font-medium' : 'text-[var(--dp-fg)]',
                    ].join(' ')}>
                      {r.summary}
                    </span>
                    <span className="block truncate text-[11px] font-[family-name:var(--dp-font-mono)] text-[var(--dp-fg-faint)]">{r.path}</span>
                  </span>
                  {isGlobal && (
                    <span className="shrink-0 text-[10.5px] text-[var(--dp-fg-dim)] bg-[var(--dp-surface-3)] border border-[var(--dp-border)] rounded-full px-2 py-0.5">
                      {r.apiLabel}
                    </span>
                  )}
                </button>
              );
            })}
            {results.length === 0 && (
              <div className="px-3 py-5 text-center text-[13px] text-[var(--dp-fg-dim)]">No endpoints found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── URL composer ────────────────────────────────────────────────────────── */

function UrlComposer({ method, baseUrl, path }: { method: NormalizedOperation['method']; baseUrl: string; path: string }): React.ReactElement {
  const segments = path.split('/').filter(Boolean);
  return (
    <div className="flex-1 min-w-0 flex items-center gap-2 px-2.5 py-2 rounded-lg border border-[var(--dp-border-strong)] bg-[var(--dp-surface)]">
      <MethodBadge method={method} size="sm" />
      <div className="flex-1 min-w-0 flex items-center flex-nowrap overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden font-[family-name:var(--dp-font-mono)] text-[13px]">
        <span className="text-[var(--dp-fg-dim)] whitespace-nowrap shrink-0">{baseUrl}</span>
        {segments.map((seg, i) => {
          const isParam = seg.startsWith('{') && seg.endsWith('}');
          return (
            <span key={i} className="whitespace-nowrap shrink-0 flex items-center">
              <span className="text-[var(--dp-fg-faint)]">/</span>
              {isParam ? (
                <span className="text-[var(--dp-success)] bg-[var(--dp-status-2xx-bg)] rounded-[5px] px-1.5 py-px mx-0.5">{seg}</span>
              ) : (
                <span className="text-[var(--dp-fg)]">{seg}</span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Playground inner (state resets per operation via key) ───────────────── */

function PlaygroundInner({
  apiType, operation, onSelect, onClose,
}: {
  apiType: ApiSpecKey;
  operation: NormalizedOperation;
  onSelect: (apiType: ApiSpecKey, op: NormalizedOperation) => void;
  onClose: () => void;
}): React.ReactElement {
  const { spec, baseUrl } = useSpec();

  const pathParams = useMemo(() => operation.parameters?.filter(p => p.in === 'path') ?? [], [operation]);
  const queryParams = useMemo(() => operation.parameters?.filter(p => p.in === 'query') ?? [], [operation]);
  const headerParams = useMemo(() => operation.parameters?.filter(p => p.in === 'header') ?? [], [operation]);

  const defaultBody = useMemo(() => {
    const schema = operation.requestBody?.content?.['application/json']?.schema;
    if (!schema) return '';
    const resolved = resolveSchema(spec, schema);
    return JSON.stringify(generateExampleFromSchema(resolved, spec), null, 2);
  }, [operation, spec]);

  const [pathVals, setPathVals] = useState<Record<string, string>>({});
  const [queryVals, setQueryVals] = useState<Record<string, string>>({});
  const [headerVals, setHeaderVals] = useState<Record<string, string>>({});
  const [body, setBody] = useState(defaultBody);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<LiveResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canSend = useMemo(() => {
    if (pathParams.some(p => p.required && !pathVals[p.name]?.trim())) return false;
    if (queryParams.some(p => p.required && !queryVals[p.name]?.trim())) return false;
    if (headerParams.some(p => p.required && !headerVals[p.name]?.trim())) return false;
    return true;
  }, [pathParams, queryParams, headerParams, pathVals, queryVals, headerVals]);

  const fullUrl = `${baseUrl}${operation.path}`;

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
      const headers: Record<string, string> = { 'Content-Type': 'application/json', Accept: 'application/json' };
      for (const p of headerParams) {
        if (headerVals[p.name]) headers[p.name] = headerVals[p.name];
      }
      const opts: RequestInit = { method: operation.method.toUpperCase(), headers };
      if (['POST', 'PUT', 'PATCH'].includes(operation.method.toUpperCase()) && body) opts.body = body;
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

  const totalParams = pathParams.length + queryParams.length + headerParams.length;

  return (
    <>
      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2.5 px-3 sm:px-4 py-3 border-b border-[var(--dp-border)] shrink-0">
        <EndpointSelect activeApiType={apiType} activeOp={operation} onSelect={onSelect} />
        <UrlComposer method={operation.method} baseUrl={baseUrl} path={operation.path} />
        <button
          onClick={execute}
          disabled={loading || !canSend}
          className={[
            'flex items-center justify-center gap-1.5 px-5 py-2 rounded-lg shrink-0',
            'text-white font-[family-name:var(--dp-font-body)] text-[13px] font-semibold',
            'transition-[background,box-shadow] duration-200',
            loading || !canSend
              ? 'bg-[rgba(220,47,101,0.45)] cursor-not-allowed'
              : 'bg-[var(--dp-accent)] cursor-pointer hover:bg-[#e84a78] shadow-[0_1px_2px_rgba(0,0,0,0.3)]',
          ].join(' ')}
          style={{ border: 'none' }}
        >
          {loading ? <><Loader2 size={14} className="animate-spin" /> Sending</> : <>Send <Play size={13} /></>}
        </button>
        <button
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer border border-[var(--dp-border)] bg-[var(--dp-surface)] text-[var(--dp-fg-muted)] shrink-0 transition-colors duration-150 hover:text-[var(--dp-fg)]"
          aria-label="Close playground"
        >
          <X size={17} />
        </button>
      </div>

      {/* ── Body: form | code+response ───────────────────────────────────── */}
      <div className="flex-1 min-h-0 overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row">
        {/* Left: request form */}
        <div className="lg:flex-1 lg:min-w-0 lg:overflow-y-auto p-4 sm:p-6">
          <h2 className="font-[family-name:var(--dp-font-display)] text-[20px] font-semibold text-[var(--dp-fg)] m-0 mb-1 tracking-[-0.01em]">
            {operation.summary}
          </h2>
          {operation.description && (
            <p className="text-[14px] text-[var(--dp-fg-muted)] leading-[1.6] mt-0 mb-5">{operation.description}</p>
          )}
          {!operation.description && <div className="mb-4" />}

          {headerParams.length > 0 && (
            <Section title="Header" count={headerParams.length}>
              {headerParams.map(p => (
                <ParamField
                  key={p.name}
                  name={p.name}
                  type={(p.schema && !('$ref' in p.schema) ? p.schema.type : undefined) ?? 'string'}
                  required={p.required}
                  description={p.description}
                  placeholder={`enter ${p.name}`}
                  value={headerVals[p.name] ?? ''}
                  onChange={v => setHeaderVals(s => ({ ...s, [p.name]: v }))}
                />
              ))}
            </Section>
          )}

          {pathParams.length > 0 && (
            <Section title="Path" count={pathParams.length}>
              {pathParams.map(p => (
                <ParamField
                  key={p.name}
                  name={p.name}
                  type={(p.schema && !('$ref' in p.schema) ? p.schema.type : undefined) ?? 'string'}
                  required={p.required}
                  description={p.description}
                  placeholder={`enter ${p.name}`}
                  value={pathVals[p.name] ?? ''}
                  onChange={v => setPathVals(s => ({ ...s, [p.name]: v }))}
                />
              ))}
            </Section>
          )}

          {queryParams.length > 0 && (
            <Section title="Query" count={queryParams.length}>
              {queryParams.map(p => (
                <ParamField
                  key={p.name}
                  name={p.name}
                  type={(p.schema && !('$ref' in p.schema) ? p.schema.type : undefined) ?? 'string'}
                  required={p.required}
                  description={p.description}
                  placeholder={`enter ${p.name}`}
                  value={queryVals[p.name] ?? ''}
                  onChange={v => setQueryVals(s => ({ ...s, [p.name]: v }))}
                />
              ))}
            </Section>
          )}

          {operation.requestBody && (
            <Section title="Body">
              <div className="py-4">
                <textarea
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  rows={10}
                  className={`${inputCls} resize-y leading-[1.6]`}
                />
              </div>
            </Section>
          )}

          {totalParams === 0 && !operation.requestBody && (
            <div className="text-[13px] text-[var(--dp-fg-dim)] py-2">This endpoint takes no parameters.</div>
          )}

          {error && (
            <div className="mt-2 flex items-start gap-2 px-3 py-[10px] bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)] rounded-lg text-[12px] text-[#f87171] font-[family-name:var(--dp-font-mono)]">
              <AlertCircle size={14} className="shrink-0 mt-px" />
              {error}
            </div>
          )}
        </div>

        {/* Right: code + response — always dark (Fern style) */}
        <div className="dp-code-panel lg:w-[42%] xl:w-[44%] lg:shrink-0 lg:overflow-y-auto border-t lg:border-t-0 lg:border-l border-[var(--dp-border)] p-4 flex flex-col gap-4">
          <CodeExampleTabs operation={operation} />
          <ResponseCard operation={operation} live={response} maxHeight={360} />
        </div>
      </div>
    </>
  );
}

/* ─── Playground modal ────────────────────────────────────────────────────── */

interface PlaygroundProps {
  open: boolean;
  onClose: () => void;
  operation: NormalizedOperation;
  apiType: ApiSpecKey;
}

export default function Playground({ open, onClose, operation, apiType }: PlaygroundProps): React.ReactElement | null {
  // Preserve the page's environment (baseUrl) while we swap specs per selected API.
  const { baseUrl } = useSpec();
  const [active, setActive] = useState<{ apiType: ApiSpecKey; op: NormalizedOperation }>({ apiType, op: operation });

  useEffect(() => { if (open) setActive({ apiType, op: operation }); }, [open, apiType, operation]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [open]);

  // Spec scoped to the *selected* endpoint's API so cross-API switching resolves
  // the right schemas, examples, and code samples.
  const specCtx = useMemo(
    () => makeSpecContext(openApiSpec(active.apiType), baseUrl),
    [active.apiType, baseUrl],
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-0 sm:p-4 lg:p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex flex-col w-full h-full sm:h-[90vh] sm:max-w-[1320px] sm:rounded-2xl bg-[var(--dp-bg)] border border-[var(--dp-border-strong)] shadow-[0_32px_100px_rgba(0,0,0,0.55)] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <SpecContext.Provider value={specCtx}>
          <PlaygroundInner
            key={`${active.apiType}:${active.op.id}`}
            apiType={active.apiType}
            operation={active.op}
            onSelect={(t, op) => setActive({ apiType: t, op })}
            onClose={onClose}
          />
        </SpecContext.Provider>
      </div>
    </div>
  );
}
