import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Check, ChevronDown, ChevronRight, Play, Loader2, AlertCircle } from 'lucide-react';
import {
  openApiSpec,
  type NormalizedOperation,
  type ApiSpecKey,
  type ParameterObject,
  type RequestBodyObject,
  type OpenApiSpec,
} from '@/data/openapi-spec';
import { environments, type Environment } from '../../data/environments';
import { useSpec, SpecContext, makeSpecContext } from '../../contexts/SpecContext';
import { generateExampleFromSchema, flattenSchema } from '../../utils/schemaHelpers';
import { resolveSchema } from '../../utils/normalizeSpec';
import { warmOpIndex } from '@/features/developer/devSearch';
import MethodBadge from './MethodBadge';
import ApiTypeBadge from './ApiTypeBadge';
import EndpointPicker from './EndpointPicker';
import OperationBreadcrumb from './OperationBreadcrumb';
import CodeExampleTabs from './CodeExampleTabs';
import ResponseCard, { type LiveResponse } from './ResponseCard';
import CopyButton from './CopyButton';

/* ─── Shared field styles ─────────────────────────────────────────────────── */

const inputBase = [
  'w-full border border-solid rounded-lg',
  'px-3 py-2',
  'font-[family-name:var(--dp-font-mono)] text-[12.5px] text-[var(--dp-fg)]',
  'outline-none transition-[border-color,box-shadow] duration-150',
  'placeholder:text-[var(--dp-input-placeholder)]',
].join(' ');

const inputRest = [
  'bg-[var(--dp-input-bg)] border-[var(--dp-input-border)]',
  'focus:border-[var(--dp-input-border-focus)] focus:shadow-[0_0_0_3px_var(--dp-accent-soft)]',
].join(' ');

/* Invalid state. Kept exclusive with `inputRest` rather than layered on top of
   it — same-specificity arbitrary utilities win by stylesheet order, not by
   class-attribute order, so overriding the border there is a coin flip. */
const inputInvalid = [
  'bg-[rgba(220,47,101,0.06)] border-[var(--dp-accent)]',
  'focus:border-[var(--dp-accent)] focus:shadow-[0_0_0_3px_rgba(220,47,101,0.2)]',
].join(' ');

const fieldCls = (invalid?: boolean) => `${inputBase} ${invalid ? inputInvalid : inputRest}`;

/* ─── Inline "this is missing" note ───────────────────────────────────────── */

function FieldError({ id, children }: { id?: string; children: React.ReactNode }): React.ReactElement {
  return (
    <p
      id={id}
      className="flex items-center gap-1.5 m-0 mt-1.5 text-[11.5px] leading-[1.5] text-[var(--dp-accent)] font-[family-name:var(--dp-font-body)]"
    >
      <AlertCircle size={12} className="shrink-0" />
      {children}
    </p>
  );
}

/* ─── Collapsible section ─────────────────────────────────────────────────── */

function Section({
  title, count, children, defaultOpen = true, invalidCount = 0,
}: {
  title: string; count?: number; children: React.ReactNode; defaultOpen?: boolean;
  /** Missing required fields inside. Pins the section open so they stay visible. */
  invalidCount?: number;
}): React.ReactElement {
  const [open, setOpen] = useState(defaultOpen);
  const hasErrors = invalidCount > 0;
  const isOpen = open || hasErrors;
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
          style={{ transform: isOpen ? 'rotate(90deg)' : 'none' }}
        />
        <span className="text-[14px] font-semibold text-[var(--dp-fg)] flex-1">{title}</span>
        {count !== undefined && count > 0 && (
          <span
            className={[
              'text-[11px] font-[family-name:var(--dp-font-mono)] rounded-[5px] px-1.5 py-px border border-solid',
              hasErrors
                ? 'text-[var(--dp-accent)] bg-[rgba(220,47,101,0.1)] border-[rgba(220,47,101,0.35)]'
                : 'text-[var(--dp-fg-faint)] bg-[var(--dp-surface-2)] border-[var(--dp-border)]',
            ].join(' ')}
          >
            {hasErrors ? `${invalidCount}/${count}` : count}
          </span>
        )}
      </button>
      {isOpen && <div className="px-4 pb-1 border-t border-[var(--dp-border)]">{children}</div>}
    </div>
  );
}

/* ─── Parameter field row ─────────────────────────────────────────────────── */

function ParamField({
  name, type, required, description, placeholder, value, onChange, invalid,
}: {
  name: string; type: string; required?: boolean; description?: string;
  placeholder?: string; value: string; onChange: (v: string) => void;
  /** Required but still empty, and the user has already tried to send. */
  invalid?: boolean;
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
      {/* No per-field caption: the row already says "required" in the same accent
          and the banner names every offender — a third copy is just noise. */}
      <input
        type="text"
        placeholder={placeholder ?? `enter ${name}`}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={fieldCls(invalid)}
        aria-required={required || undefined}
        aria-invalid={invalid || undefined}
        data-dp-missing={invalid ? '1' : undefined}
      />
    </div>
  );
}

/* ─── Request-body validation ─────────────────────────────────────────────────
   The body is a free-form JSON editor, so there is nothing per-field to outline
   the way params get outlined. We flag the editor as a whole and name what is
   wrong: unparseable JSON, or top-level required properties left blank.
   ─────────────────────────────────────────────────────────────────────────── */

type BodyIssue = { kind: 'empty' | 'json' | 'keys'; message: string };

/** Methods whose body actually goes on the wire — the rest can't be blocked on it. */
const BODY_METHODS = ['POST', 'PUT', 'PATCH'];

/** Present in the JSON but with nothing in it still counts as unfilled. */
const isBlank = (v: unknown): boolean =>
  v === undefined || v === null || (typeof v === 'string' && v.trim() === '');

function validateBody(raw: string, requestBody: RequestBodyObject | undefined, spec: OpenApiSpec): BodyIssue | null {
  if (!requestBody) return null;

  if (!raw.trim()) {
    return requestBody.required ? { kind: 'empty', message: 'Request body is required' } : null;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { kind: 'json', message: 'Request body is not valid JSON' };
  }

  const schema = requestBody.content?.['application/json']?.schema;
  if (!schema || typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return null;

  // Top level only — nested required properties are left to the API to reject.
  const flat = flattenSchema(resolveSchema(spec, schema), spec);
  const record = parsed as Record<string, unknown>;
  const missing = (flat.required ?? []).filter(key => isBlank(record[key]));
  if (missing.length === 0) return null;

  return {
    kind: 'keys',
    message: `Fill the required body ${missing.length === 1 ? 'field' : 'fields'}: ${missing.join(', ')}`,
  };
}

/* ─── URL composer ────────────────────────────────────────────────────────── */

const envAccent = (env: Environment) => (env.color === 'blue' ? 'var(--dp-info)' : 'var(--dp-success)');

/* OTP-style auth params (otp, evcotp, …) get prefilled with the env's test OTP. */
const isOtpParam = (name: string) => name.toLowerCase().includes('otp');

function UrlComposer({
  method, path, selectedEnv, onEnvChange,
}: {
  method: NormalizedOperation['method'];
  path: string;
  selectedEnv: Environment;
  onEnvChange: (env: Environment) => void;
}): React.ReactElement {
  const segments = path.split('/').filter(Boolean);
  const [envOpen, setEnvOpen] = useState(false);
  const [menuPos, setMenuPos] = useState<{ left: number; top: number } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    const r = triggerRef.current?.getBoundingClientRect();
    if (r) setMenuPos({ left: r.left, top: r.bottom + 6 });
    setEnvOpen(o => !o);
  };

  useEffect(() => {
    if (!envOpen) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t) || menuRef.current?.contains(t)) return;
      setEnvOpen(false);
    };
    const onScroll = () => setEnvOpen(false);
    document.addEventListener('mousedown', onDoc);
    window.addEventListener('resize', onScroll);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      window.removeEventListener('resize', onScroll);
    };
  }, [envOpen]);

  return (
    <div className="flex-1 min-w-0 flex items-center gap-2 px-2.5 py-2 rounded-lg border border-[var(--dp-border-strong)] bg-[var(--dp-surface)]">
      <MethodBadge method={method} size="sm" />
      <div className="flex-1 min-w-0 flex items-center flex-nowrap overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden font-[family-name:var(--dp-font-mono)] text-[13px]">
        {/* Environment selector — click the base URL to switch environment */}
        <button
          ref={triggerRef}
          type="button"
          onClick={openMenu}
          aria-haspopup="listbox"
          aria-expanded={envOpen}
          title="Change environment"
          className="shrink-0 flex items-center gap-1 -ml-1 px-1 py-px rounded-[5px] border-0 bg-transparent cursor-pointer hover:bg-[var(--dp-surface-2)] transition-colors duration-150"
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ background: envAccent(selectedEnv), boxShadow: `0 0 6px ${envAccent(selectedEnv)}` }}
          />
          <span className="text-[var(--dp-fg-dim)] whitespace-nowrap font-[family-name:var(--dp-font-mono)]">{selectedEnv.baseUrl}</span>
          <ChevronDown
            size={12}
            color="var(--dp-fg-faint)"
            className="shrink-0 transition-transform duration-150"
            style={{ transform: envOpen ? 'rotate(180deg)' : 'none' }}
          />
        </button>

        {envOpen && menuPos && createPortal(
          <div
            ref={menuRef}
            role="listbox"
            style={{ position: 'fixed', left: menuPos.left, top: menuPos.top }}
            className="z-[1100] min-w-[260px] p-1 rounded-lg bg-[var(--dp-surface)] border border-[var(--dp-border-strong)] shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
          >
            {environments.map(env => {
              const isSel = env.key === selectedEnv.key;
              return (
                <button
                  key={env.key}
                  type="button"
                  role="option"
                  aria-selected={isSel}
                  onClick={() => { onEnvChange(env); setEnvOpen(false); }}
                  className="w-full flex items-center gap-2 px-2.5 py-2 rounded-md border-0 text-left cursor-pointer transition-colors duration-150 hover:bg-[var(--dp-surface-2)]"
                  style={{ background: isSel ? 'var(--dp-surface-2)' : 'transparent' }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: envAccent(env), boxShadow: `0 0 6px ${envAccent(env)}` }}
                  />
                  <span className="flex-1 min-w-0">
                    <span className="block text-[12.5px] font-[family-name:var(--dp-font-body)] font-medium text-[var(--dp-fg)]">{env.name}</span>
                    <span className="block truncate text-[11px] font-[family-name:var(--dp-font-mono)] text-[var(--dp-fg-faint)]">{env.baseUrl}</span>
                  </span>
                  {isSel && <Check size={14} color={envAccent(env)} className="shrink-0" />}
                </button>
              );
            })}
          </div>,
          document.body,
        )}

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
      <CopyButton text={`${selectedEnv.baseUrl}${path}`} size={12} label={false} />
    </div>
  );
}

/* ─── Playground inner (state resets per operation via key) ───────────────── */

function PlaygroundInner({
  apiType, operation, onSelect, onClose, selectedEnv, onEnvChange,
}: {
  apiType: ApiSpecKey;
  operation: NormalizedOperation;
  onSelect: (apiType: ApiSpecKey, op: NormalizedOperation) => void;
  onClose: () => void;
  selectedEnv: Environment;
  onEnvChange: (env: Environment) => void;
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

  // Prefill OTP/EVC params with the selected environment's test OTP (sandbox only).
  const otpPrefill = useMemo(
    () => (params: typeof queryParams): Record<string, string> =>
      Object.fromEntries(
        params.filter(p => isOtpParam(p.name)).map(p => [p.name, selectedEnv.defaultOtp ?? '']),
      ),
    [selectedEnv.defaultOtp],
  );

  const [pathVals, setPathVals] = useState<Record<string, string>>({});
  const [queryVals, setQueryVals] = useState<Record<string, string>>(() => otpPrefill(queryParams));
  const [headerVals, setHeaderVals] = useState<Record<string, string>>(() => otpPrefill(headerParams));

  // Re-sync OTP fields when the environment changes (clears them in production).
  useEffect(() => {
    setQueryVals(s => ({ ...s, ...otpPrefill(queryParams) }));
    setHeaderVals(s => ({ ...s, ...otpPrefill(headerParams) }));
  }, [selectedEnv.key]); // eslint-disable-line react-hooks/exhaustive-deps
  const [body, setBody] = useState(defaultBody);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<LiveResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  /** Set by a Send that failed validation — what turns the highlights on. */
  const [attempted, setAttempted] = useState(false);
  const [focusTick, setFocusTick] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);

  /* Recomputed from the live values on every keystroke, so a field drops out of
     `ids` the moment it is filled in — that is what makes the outline clear
     per field instead of only on the next Send. */
  const missing = useMemo(() => {
    const ids = new Set<string>();
    const names: string[] = [];
    const scan = (loc: string, params: ParameterObject[], vals: Record<string, string>) => {
      for (const p of params) {
        if (p.required && !vals[p.name]?.trim()) {
          ids.add(`${loc}:${p.name}`);
          names.push(p.name);
        }
      }
    };
    // Same order as the form, so the banner reads top-to-bottom.
    scan('header', headerParams, headerVals);
    scan('path', pathParams, pathVals);
    scan('query', queryParams, queryVals);
    return { ids, names };
  }, [pathParams, queryParams, headerParams, pathVals, queryVals, headerVals]);

  const sendsBody = BODY_METHODS.includes(operation.method.toUpperCase());
  const bodyIssue = useMemo(
    () => (sendsBody ? validateBody(body, operation.requestBody, spec) : null),
    [sendsBody, body, operation.requestBody, spec],
  );

  const canSend = missing.names.length === 0 && !bodyIssue;

  /* Once everything is valid the attempt is spent: emptying a field again is
     the user editing, not an error, until they press Send once more. */
  useEffect(() => {
    if (canSend) setAttempted(false);
  }, [canSend]);

  const showErrors = attempted && !canSend;
  const isMissing = (loc: string, name: string) => showErrors && missing.ids.has(`${loc}:${name}`);
  const missingIn = (loc: string, params: ParameterObject[]) =>
    showErrors ? params.filter(p => missing.ids.has(`${loc}:${p.name}`)).length : 0;

  // Sections holding a missing field render open, so this runs against final DOM.
  useEffect(() => {
    if (!focusTick) return;
    const el = formRef.current?.querySelector<HTMLElement>('[data-dp-missing]');
    if (!el) return;
    el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    el.focus({ preventScroll: true });
  }, [focusTick]);

  const warnText = useMemo(() => {
    const parts: string[] = [];
    if (missing.names.length) {
      const shown = missing.names.slice(0, 4).join(', ');
      const extra = missing.names.length - 4;
      parts.push(
        `Fill the required ${missing.names.length === 1 ? 'field' : 'fields'}: ${shown}${extra > 0 ? ` +${extra} more` : ''}`,
      );
    }
    if (bodyIssue) parts.push(bodyIssue.message);
    return parts.join(' · ');
  }, [missing.names, bodyIssue]);

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

  const handleSend = () => {
    if (loading) return;
    if (!canSend) {
      setAttempted(true);
      setFocusTick(t => t + 1); // jump to the first thing that needs filling in
      return;
    }
    setAttempted(false);
    void execute();
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
      if (sendsBody && body) opts.body = body;
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
      {/* ── Dialog header — names the API scope the moment the modal opens.
             Hidden on mobile, where the tag rides the switcher row instead so
             the sheet doesn't spend two strips of height on chrome. ───────── */}
      <div className="hidden sm:flex items-center gap-2.5 px-3 sm:px-4 py-2.5 border-b border-[var(--dp-border)] bg-[var(--dp-surface)] shrink-0">
        <h2 id="dp-playground-title" className="flex items-center gap-2 m-0 min-w-0">
          <ApiTypeBadge apiType={apiType} />
          <span className="truncate font-[family-name:var(--dp-font-display)] text-[14px] font-semibold text-[var(--dp-fg)]">
            Playground
          </span>
        </h2>
        <span className="hidden sm:block flex-1 truncate text-right text-[12px] text-[var(--dp-fg-dim)]">
          Send a live request against the {selectedEnv.name.toLowerCase()} environment
        </span>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer border border-solid border-[var(--dp-border)] bg-[var(--dp-bg)] text-[var(--dp-fg-muted)] shrink-0 transition-colors duration-150 hover:text-[var(--dp-fg)] hover:border-[var(--dp-border-strong)]"
          aria-label="Close playground"
        >
          <X size={16} />
        </button>
      </div>

      {/* ── Top bar ──────────────────────────────────────────────────────────
             `relative` gives the endpoint picker's popover something viewport-
             wide to anchor to on mobile, where the trigger itself is too narrow
             to hang a menu off. ─────────────────────────────────────────────── */}
      <div className="relative flex flex-col sm:flex-row sm:items-center gap-2.5 px-3 sm:px-4 py-3 border-b border-[var(--dp-border)] shrink-0">
        {/* `sm:contents` dissolves this wrapper on desktop so the switcher sits
            directly in the toolbar row again. */}
        <div className="flex items-center gap-2 sm:contents">
          <ApiTypeBadge apiType={apiType} className="sm:hidden" />
          <EndpointPicker
            activeApiType={apiType}
            activeOp={operation}
            onSelect={onSelect}
            className="flex-1 sm:flex-none sm:shrink-0"
          />
          <button
            onClick={onClose}
            className="sm:hidden w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer border border-solid border-[var(--dp-border)] bg-[var(--dp-surface)] text-[var(--dp-fg-muted)] shrink-0"
            aria-label="Close playground"
          >
            <X size={17} />
          </button>
        </div>
        <UrlComposer method={operation.method} path={operation.path} selectedEnv={selectedEnv} onEnvChange={onEnvChange} />
        <div className="flex items-center shrink-0">
          <button
            onClick={handleSend}
            disabled={loading}
            aria-disabled={!canSend}
            className={[
              'flex flex-1 sm:flex-initial items-center justify-center gap-1.5 px-5 py-2 rounded-lg shrink-0',
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
        </div>
      </div>

      {/* ── Required-fields warning ──────────────────────────────────────── */}
      {showErrors && (
        <div
          role="alert"
          className="flex items-start gap-2 px-3 sm:px-4 py-2 border-b border-[rgba(220,47,101,0.25)] bg-[rgba(220,47,101,0.08)] text-[var(--dp-accent)] text-[12.5px] leading-[1.5] font-[family-name:var(--dp-font-body)] shrink-0"
        >
          <AlertCircle size={14} className="shrink-0 mt-px" />
          {warnText}
        </div>
      )}

      {/* ── Body: form | code+response ───────────────────────────────────── */}
      <div ref={formRef} className="flex-1 min-h-0 overflow-y-auto flex flex-col lg:flex-row">
        {/* Left: request form */}
        <div className="lg:flex-1 lg:min-w-0 p-4 sm:p-6">
          {/* The top-bar switcher already names the API — don't repeat it here. */}
          <OperationBreadcrumb operation={operation} apiType={apiType} showApiType={false} className="mb-2.5" />
          <h2 className="font-[family-name:var(--dp-font-display)] text-[20px] font-semibold text-[var(--dp-fg)] m-0 mb-1 tracking-[-0.01em]">
            {operation.summary}
          </h2>
          {operation.description && (
            <p className="text-[14px] text-[var(--dp-fg-muted)] leading-[1.6] mt-0 mb-5">{operation.description}</p>
          )}
          {!operation.description && <div className="mb-4" />}

          {headerParams.length > 0 && (
            <Section title="Header" count={headerParams.length} invalidCount={missingIn('header', headerParams)}>
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
                  invalid={isMissing('header', p.name)}
                />
              ))}
            </Section>
          )}

          {pathParams.length > 0 && (
            <Section title="Path" count={pathParams.length} invalidCount={missingIn('path', pathParams)}>
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
                  invalid={isMissing('path', p.name)}
                />
              ))}
            </Section>
          )}

          {queryParams.length > 0 && (
            <Section title="Query" count={queryParams.length} invalidCount={missingIn('query', queryParams)}>
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
                  invalid={isMissing('query', p.name)}
                />
              ))}
            </Section>
          )}

          {operation.requestBody && (
            <Section title="Body" invalidCount={showErrors && bodyIssue ? 1 : 0}>
              <div className="py-4">
                <textarea
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  rows={10}
                  className={`${fieldCls(showErrors && !!bodyIssue)} resize-y leading-[1.6]`}
                  aria-invalid={(showErrors && !!bodyIssue) || undefined}
                  aria-describedby={showErrors && bodyIssue ? 'dp-body-err' : undefined}
                  data-dp-missing={showErrors && bodyIssue ? '1' : undefined}
                />
                {showErrors && bodyIssue && <FieldError id="dp-body-err">{bodyIssue.message}</FieldError>}
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
        <div className="dp-code-bg lg:w-[50%] xl:w-[50%] lg:shrink-0 border-t lg:border-t-0 lg:border-l border-[var(--dp-border)] p-4 flex flex-col gap-4 ">
          <div className="shrink-0">
            <CodeExampleTabs operation={operation} headerValues={headerVals} queryValues={queryVals} />
          </div>
          <div className="shrink-0 pb-2">
            <ResponseCard operation={operation} live={response} maxHeight={420} apiType={apiType} />
          </div>
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
  const [selectedEnv, setSelectedEnv] = useState<Environment>(
    () => environments.find(e => e.baseUrl === baseUrl) ?? environments[0],
  );

  useEffect(() => { if (open) setActive({ apiType, op: operation }); }, [open, apiType, operation]);

  // Build the cross-API endpoint index during idle time. The GST spec alone is
  // ~3 MB of JSON, so normalising it lazily on the frame the picker opens is
  // visible jank; doing it here means the menu is instant when it's clicked.
  useEffect(() => { warmOpIndex(); }, []);

  // Re-sync to the page's environment whenever the playground (re)opens.
  useEffect(() => {
    if (open) setSelectedEnv(environments.find(e => e.baseUrl === baseUrl) ?? environments[0]);
  }, [open, baseUrl]);

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
    () => makeSpecContext(openApiSpec(active.apiType), selectedEnv.baseUrl),
    [active.apiType, selectedEnv.baseUrl],
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-0 sm:p-4 lg:p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dp-playground-title"
        className="dp-playground-panel flex flex-col w-full h-full sm:h-[85vh] sm:max-w-[1320px] sm:rounded-2xl bg-[var(--dp-bg)] shadow-[0_32px_100px_rgba(0,0,0,0.55)] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <SpecContext.Provider value={specCtx}>
          <PlaygroundInner
            key={`${active.apiType}:${active.op.id}`}
            apiType={active.apiType}
            operation={active.op}
            onSelect={(t, op) => setActive({ apiType: t, op })}
            onClose={onClose}
            selectedEnv={selectedEnv}
            onEnvChange={setSelectedEnv}
          />
        </SpecContext.Provider>
      </div>
    </div>
  );
}
