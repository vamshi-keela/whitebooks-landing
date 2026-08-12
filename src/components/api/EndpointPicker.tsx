import React, { useState, useEffect, useMemo, useRef, useCallback, useDeferredValue, memo } from 'react';
import { Search, ChevronDown, CornerDownLeft } from 'lucide-react';
import type { NormalizedOperation, ApiSpecKey } from '@/data/openapi-spec';
import { searchOpsScoped, getOpsByApi, type OpEntry, type ApiCounts } from '@/features/developer/devSearch';
import MethodBadge from './MethodBadge';
import ApiTypeBadge from './ApiTypeBadge';
import { API_TYPE_LABELS, API_TYPE_SHORT_LABELS, API_TYPE_ORDER } from './apiTypeLabels';

/*
 * Endpoint picker — the playground's "which endpoint am I calling?" control.
 *
 * UX model
 * ────────
 * The index spans every API, but that reach used to be invisible: results were
 * scoped to the open API until you typed, and nothing told you the rest existed.
 * Two additions make it legible without adding a second menu layer:
 *
 *   1. A scope row (All · GST · e-Invoice · …). One click to browse any API —
 *      no need to guess a search term first. Opens on the API you're already in.
 *   2. Live per-scope hit counts while typing. Searching inside GST still shows
 *      "e-Invoice 4", so cross-API matches surface without leaving your scope.
 *
 * Browsing (empty query) is grouped — by tag inside one API, by API in All —
 * with a sticky header, because GST alone is 281 endpoints. Searching drops the
 * grouping for pure relevance order, and only tags rows with their API when the
 * list is actually mixed; repeating one identical badge down a scoped list is
 * noise, not information.
 *
 * Performance
 * ───────────
 * Rows are virtualized on fixed heights (binary search over a prefix-offset
 * array — no measurement pass, no dependency), so a 281-row list mounts ~14
 * nodes. The search index is warmed on idle by the host, matching runs off a
 * deferred value so keystrokes never wait on it, and per-API browsing is an
 * O(1) cached slice.
 */

type Scope = 'all' | ApiSpecKey;

const SCOPES: { key: Scope; label: string }[] = [
  { key: 'all', label: 'All APIs' },
  ...API_TYPE_ORDER.map(k => ({ key: k as Scope, label: API_TYPE_SHORT_LABELS[k] })),
];

/* Fixed row metrics — the virtualizer's whole cost model rests on these, and
   the rendered rows are sized from the same constants so they can't drift. */
const OP_H = 46;
const HEADER_H = 28;
const OVERSCAN = 6;
const DEFAULT_VIEW_H = 340;

type Row =
  | { kind: 'header'; key: string; label: string; count: number }
  | { kind: 'op'; key: string; entry: OpEntry; showApi: boolean };

/* ─── One result row ──────────────────────────────────────────────────────── */

const OpRow = memo(function OpRow({
  entry, showApi, isCurrent, isActive, top, onPick, onHover, index,
}: {
  entry: OpEntry;
  showApi: boolean;
  isCurrent: boolean;
  isActive: boolean;
  top: number;
  index: number;
  onPick: (entry: OpEntry) => void;
  onHover: (index: number) => void;
}): React.ReactElement {
  return (
    <button
      type="button"
      role="option"
      aria-selected={isCurrent}
      onClick={() => onPick(entry)}
      onMouseMove={() => onHover(index)}
      style={{
        position: 'absolute',
        top,
        left: 0,
        right: 0,
        height: OP_H,
        background: isCurrent
          ? 'var(--dp-accent-soft)'
          : isActive ? 'var(--dp-sidebar-hover)' : 'transparent',
      }}
      className="flex items-center gap-2.5 px-3 cursor-pointer border-0 text-left"
    >
      <MethodBadge method={entry.method} size="sm" />
      <span className="flex-1 min-w-0">
        <span className={[
          'block truncate text-[13px] leading-[1.35]',
          isCurrent ? 'text-[var(--dp-accent-2)] font-medium' : 'text-[var(--dp-fg)]',
        ].join(' ')}>
          {entry.summary}
        </span>
        <span className="block truncate text-[11px] leading-[1.35] font-[family-name:var(--dp-font-mono)] text-[var(--dp-fg-faint)]">
          {entry.path}
        </span>
      </span>
      {showApi && (
        <ApiTypeBadge apiType={entry.apiType} variant="quiet" short className="shrink-0 max-w-[88px]" />
      )}
    </button>
  );
});

/* ─── Group header ────────────────────────────────────────────────────────── */

function GroupHeader({
  label, count, style,
}: { label: string; count: number; style: React.CSSProperties }): React.ReactElement {
  return (
    <div
      style={{ ...style, height: HEADER_H }}
      className="flex items-center gap-2 px-3 bg-[var(--dp-surface-2)] text-[10.5px] font-semibold uppercase tracking-[0.07em] text-[var(--dp-fg-dim)]"
    >
      <span className="truncate">{label}</span>
      <span className="font-[family-name:var(--dp-font-mono)] tracking-normal text-[var(--dp-fg-faint)]">{count}</span>
    </div>
  );
}

/* ─── Picker ──────────────────────────────────────────────────────────────── */

export default function EndpointPicker({
  activeApiType, activeOp, onSelect, className = '',
}: {
  activeApiType: ApiSpecKey;
  activeOp: NormalizedOperation;
  onSelect: (apiType: ApiSpecKey, op: NormalizedOperation) => void;
  /** Sizing for the host row (mobile shares the row with the API tag). */
  className?: string;
}): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [scope, setScope] = useState<Scope>(activeApiType);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewH, setViewH] = useState(DEFAULT_VIEW_H);

  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  /* Matching runs off the deferred value: the input paints on the keystroke,
     the (heavier) result list catches up on the next render pass. */
  const deferredQuery = useDeferredValue(query);
  const hasQuery = deferredQuery.trim().length > 0;

  /* Reset to a clean, in-context state every time the menu opens. */
  useEffect(() => {
    if (!open) return;
    setQuery('');
    setScope(activeApiType);
    setScrollTop(0);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => clearTimeout(t);
  }, [open, activeApiType]);

  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [open]);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  /* One global pass per query — gives both the ranking and the per-API counts
     that make cross-API matches visible from inside a scoped search. */
  const { ranked, counts, total } = useMemo(
    () => (open && hasQuery
      ? searchOpsScoped(deferredQuery)
      : { ranked: [], counts: null as ApiCounts | null, total: 0 }),
    [open, hasQuery, deferredQuery],
  );

  /* Flatten to a positioned row list. Rebuilt only when scope/query change. */
  const { rows, offsets, headerOf, opCount } = useMemo(() => {
    const out: Row[] = [];

    if (!open) {
      // Nothing mounted — skip the work entirely.
    } else if (hasQuery) {
      const list = scope === 'all' ? ranked : ranked.filter(r => r.apiType === scope);
      for (const e of list) {
        out.push({ kind: 'op', key: `${e.apiType}:${e.op.id}`, entry: e, showApi: scope === 'all' });
      }
    } else if (scope === 'all') {
      for (const key of API_TYPE_ORDER) {
        const list = getOpsByApi(key);
        if (!list.length) continue;
        out.push({ kind: 'header', key: `api:${key}`, label: API_TYPE_LABELS[key], count: list.length });
        for (const e of list) out.push({ kind: 'op', key: `${e.apiType}:${e.op.id}`, entry: e, showApi: false });
      }
    } else {
      // Single API → group by tag, in first-seen (spec) order.
      const buckets = new Map<string, OpEntry[]>();
      for (const e of getOpsByApi(scope)) {
        const tag = e.op.tag || 'Other';
        const bucket = buckets.get(tag);
        if (bucket) bucket.push(e);
        else buckets.set(tag, [e]);
      }
      for (const [tag, list] of buckets) {
        out.push({ kind: 'header', key: `tag:${tag}`, label: tag, count: list.length });
        for (const e of list) out.push({ kind: 'op', key: `${e.apiType}:${e.op.id}`, entry: e, showApi: false });
      }
    }

    // Prefix offsets + a row→its-header map, both single O(n) passes. These are
    // what let scrolling be a binary search instead of a layout read.
    const offs = new Array<number>(out.length + 1);
    const hdr = new Int32Array(out.length);
    let y = 0;
    let lastHeader = -1;
    let ops = 0;
    for (let i = 0; i < out.length; i++) {
      offs[i] = y;
      if (out[i].kind === 'header') { lastHeader = i; y += HEADER_H; }
      else { y += OP_H; ops++; }
      hdr[i] = lastHeader;
    }
    offs[out.length] = y;
    return { rows: out, offsets: offs, headerOf: hdr, opCount: ops };
  }, [open, hasQuery, ranked, scope]);

  const hasRows = rows.length > 0;

  /* Track the real viewport height so the window math stays correct when the
     popover is capped by a short screen. Skipped while the list is empty — that
     state collapses the container, and measuring it would shrink the window. */
  useEffect(() => {
    const el = scrollRef.current;
    if (!open || !hasRows || !el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(entries => {
      const h = entries[0]?.contentRect.height;
      if (h) setViewH(h);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [open, hasRows]);

  /* Point the keyboard cursor at the first selectable row on every reshuffle. */
  useEffect(() => {
    const first = rows.findIndex(r => r.kind === 'op');
    setActiveIdx(first);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    setScrollTop(0);
  }, [rows]);

  const onScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      setScrollTop(scrollRef.current?.scrollTop ?? 0);
    });
  }, []);

  const pick = useCallback((entry: OpEntry) => {
    onSelect(entry.apiType, entry.op);
    setOpen(false);
  }, [onSelect]);

  /* Keep the keyboard cursor inside the window, accounting for the sticky
     header that overlays the top of the list. */
  const revealRow = useCallback((i: number) => {
    const el = scrollRef.current;
    if (!el || i < 0) return;
    const top = offsets[i];
    const pad = rows[i] && headerOf[i] >= 0 ? HEADER_H : 0;
    if (top - pad < el.scrollTop) el.scrollTop = Math.max(0, top - pad);
    else if (top + OP_H > el.scrollTop + viewH) el.scrollTop = top + OP_H - viewH;
  }, [offsets, rows, headerOf, viewH]);

  const step = useCallback((dir: 1 | -1) => {
    let i = activeIdx;
    for (let n = 0; n < rows.length; n++) {
      i += dir;
      if (i < 0 || i >= rows.length) return;
      if (rows[i].kind === 'op') { setActiveIdx(i); revealRow(i); return; }
    }
  }, [activeIdx, rows, revealRow]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); step(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); step(-1); }
    else if (e.key === 'Enter') {
      e.preventDefault();
      const row = rows[activeIdx];
      if (row?.kind === 'op') pick(row.entry);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation(); // don't let the playground modal close too
      setOpen(false);
    }
  };

  /* Visible window: binary search for the first row crossing the scroll top,
     then walk forward until we clear the viewport. Both are O(log n) / O(window)
     — the list length never enters the per-frame cost. */
  const totalH = offsets[rows.length] ?? 0;
  const { start, end, firstVisible } = useMemo(() => {
    if (!rows.length) return { start: 0, end: 0, firstVisible: 0 };
    let lo = 0;
    let hi = rows.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (offsets[mid] <= scrollTop) lo = mid; else hi = mid - 1;
    }
    const limit = scrollTop + viewH;
    let i = lo;
    while (i < rows.length && offsets[i] < limit) i++;
    return {
      firstVisible: lo,
      start: Math.max(0, lo - OVERSCAN),
      end: Math.min(rows.length, i + OVERSCAN),
    };
  }, [rows.length, offsets, scrollTop, viewH]);

  /* The header governing whatever sits at the top of the viewport. */
  const headerIdx = rows.length ? headerOf[firstVisible] : -1;
  const stickyHeader = !hasQuery && headerIdx >= 0 ? rows[headerIdx] : null;

  const visible: React.ReactNode[] = [];
  for (let i = start; i < end; i++) {
    const row = rows[i];
    if (row.kind === 'header') {
      visible.push(
        <GroupHeader
          key={row.key}
          label={row.label}
          count={row.count}
          style={{ position: 'absolute', top: offsets[i], left: 0, right: 0 }}
        />,
      );
    } else {
      visible.push(
        <OpRow
          key={row.key}
          entry={row.entry}
          showApi={row.showApi}
          index={i}
          top={offsets[i]}
          isCurrent={row.entry.apiType === activeApiType && row.entry.op.id === activeOp.id}
          isActive={i === activeIdx}
          onPick={pick}
          onHover={setActiveIdx}
        />,
      );
    }
  }

  const elsewhere = counts && scope !== 'all' ? total - (counts[scope] ?? 0) : 0;

  return (
    /* Static on mobile so the popover below anchors to the toolbar's padding
       box (which the host marks `relative`) instead of this narrow trigger —
       a 420px menu hung off a ~240px trigger runs off the right edge. */
    <div ref={ref} className={`min-w-0 sm:relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 w-full sm:w-[260px] px-2.5 py-2 rounded-lg border border-solid border-[var(--dp-border-strong)] bg-[var(--dp-surface)] cursor-pointer transition-colors duration-150 hover:border-[var(--dp-fg-faint)]"
      >
        <MethodBadge method={activeOp.method} size="sm" />
        <span className="flex-1 min-w-0 text-left text-[13px] font-medium text-[var(--dp-fg)] truncate">
          {activeOp.summary}
        </span>
        <ChevronDown
          size={15}
          color="var(--dp-fg-dim)"
          className="shrink-0 transition-transform duration-150"
          style={{ transform: open ? 'rotate(180deg)' : 'none' }}
        />
      </button>

      {open && (
        <div
          onKeyDown={onKeyDown}
          className={[
            'absolute z-10 mt-1.5 rounded-xl overflow-hidden',
            // Mobile: span the toolbar's width. Desktop: hang off the trigger.
            'left-0 right-0 sm:left-0 sm:right-auto sm:w-[420px] sm:max-w-[calc(100vw-2rem)]',
            'border border-solid border-[var(--dp-border-strong)] bg-[var(--dp-surface-2)]',
            'shadow-[0_16px_48px_rgba(0,0,0,0.4)]',
          ].join(' ')}
        >
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2.5 border-0 border-b border-solid border-[var(--dp-border)]">
            <Search size={14} color="var(--dp-fg-dim)" className="shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search endpoints…"
              aria-label="Search endpoints"
              className="flex-1 min-w-0 bg-transparent border-0 outline-none text-[13px] font-body text-[var(--dp-fg)] placeholder:text-[var(--dp-fg-dim)]"
            />
          </div>

          {/* Scope — one click to any API, with live hit counts while typing */}
          <div className="flex items-center gap-1 px-2 py-1.5 border-0 border-b border-solid border-[var(--dp-border)] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SCOPES.map(s => {
              const hits = counts ? (s.key === 'all' ? total : counts[s.key]) : null;
              const isOn = scope === s.key;
              // A scope you're standing in stays lit even at zero hits — it's
              // the label for the empty state below, not a dead option.
              const isEmpty = hits === 0 && !isOn;
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => !isEmpty && setScope(s.key)}
                  aria-pressed={isOn}
                  disabled={isEmpty}
                  className={[
                    'shrink-0 flex items-center gap-1.5 px-2 py-1 rounded-md border-0 bg-transparent',
                    'text-[12px] font-medium whitespace-nowrap transition-colors duration-100',
                    isOn ? 'text-[var(--dp-accent-2)]' : 'text-[var(--dp-fg-dim)]',
                    isEmpty
                      ? 'opacity-35 cursor-default'
                      : 'cursor-pointer hover:text-[var(--dp-fg)]',
                  ].join(' ')}
                  style={{ background: isOn ? 'var(--dp-accent-soft)' : undefined }}
                >
                  {s.label}
                  {hits !== null && (
                    <span className="font-[family-name:var(--dp-font-mono)] text-[10.5px] text-[var(--dp-fg-faint)] tabular-nums">
                      {hits}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Results */}
          <div className="relative">
            <div
              ref={scrollRef}
              role="listbox"
              aria-label="Endpoints"
              onScroll={onScroll}
              /* A cap, not a fixed height: a three-hit search hugs its rows
                 instead of trailing 300px of dead space. The ResizeObserver
                 feeds the real height back into the window math. */
              style={{ maxHeight: `min(${DEFAULT_VIEW_H}px, 48vh)` }}
              className="overflow-y-auto overscroll-contain"
            >
              {hasRows ? (
                <div style={{ height: totalH, position: 'relative' }}>{visible}</div>
              ) : (
                <div className="px-4 py-8 text-center">
                  <p className="m-0 text-[13px] text-[var(--dp-fg-muted)]">
                    No endpoints in {scope === 'all' ? 'any API' : API_TYPE_LABELS[scope]}
                  </p>
                  {elsewhere > 0 && (
                    <button
                      type="button"
                      onClick={() => setScope('all')}
                      className="mt-2 border-0 bg-transparent cursor-pointer text-[12.5px] font-medium text-[var(--dp-accent-2)] underline underline-offset-2"
                    >
                      {elsewhere} {elsewhere === 1 ? 'match' : 'matches'} in other APIs
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Sticky group header — keeps your place in a 281-row list */}
            {stickyHeader?.kind === 'header' && (
              <GroupHeader
                label={stickyHeader.label}
                count={stickyHeader.count}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, pointerEvents: 'none' }}
              />
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-3 px-3 py-2 border-0 border-t border-solid border-[var(--dp-border)] bg-[var(--dp-surface)]">
            <span className="text-[11px] text-[var(--dp-fg-dim)] truncate">
              {opCount} {opCount === 1 ? 'endpoint' : 'endpoints'}
              {hasQuery && scope !== 'all' && elsewhere > 0 && ` · ${elsewhere} elsewhere`}
            </span>
            <span className="hidden sm:flex items-center gap-2.5 shrink-0 text-[11px] text-[var(--dp-fg-faint)]">
              <span className="flex items-center gap-1">↑↓ navigate</span>
              <span className="flex items-center gap-1"><CornerDownLeft size={11} /> select</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
