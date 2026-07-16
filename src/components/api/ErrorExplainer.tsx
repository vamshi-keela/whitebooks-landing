import React, { useState, useEffect, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { SOURCE_LABELS, isGovernmentSource, type ErrorCatalogEntry } from '@/data/error-catalog';
import type { ResolvedApiError } from '@/utils/resolveApiError';
import CopyButton from './CopyButton';

/*
 * Plain-language explanation strip shown inside ResponseCard when a live
 * request fails. Translates catalogued GSTN/NIC/Whitebooks error codes into
 * what happened, whose side it happened on, and how to fix it — so users
 * self-serve instead of contacting support. Theme-aware via ambient dp tokens.
 */

function Entry({ entry }: { entry: ErrorCatalogEntry }): React.ReactElement {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className="text-[13px] font-semibold text-[var(--dp-fg)]">{entry.title}</span>
        <span className="text-[11px] font-[family-name:var(--dp-font-mono)] text-[var(--dp-fg-dim)]">
          {entry.code} · {SOURCE_LABELS[entry.source]}
        </span>
      </div>
      <p className="m-0 text-[12.5px] leading-[1.55] text-[var(--dp-fg-muted)]">
        {entry.meaning}
        {isGovernmentSource(entry.source) && (
          <span className="text-[var(--dp-fg-dim)]"> This response came from the government system, not Whitebooks.</span>
        )}
      </p>
      <ul className="m-0 pl-4 flex flex-col gap-[3px] list-disc marker:text-[var(--dp-fg-faint)]">
        {entry.fix.map((step, i) => (
          <li key={i} className="text-[12.5px] leading-[1.5] text-[var(--dp-fg-muted)]">{step}</li>
        ))}
      </ul>
      <span className="text-[11.5px] text-[var(--dp-fg-dim)]">
        {entry.retryable
          ? 'Safe to retry once the above is done.'
          : 'Retrying the same request will return this error again.'}
      </span>
    </div>
  );
}

/* Plain-text version of what the explainer shows, for pasting into a support
   ticket or team chat. */
function toCopyText(entries: ErrorCatalogEntry[], unknownCodes: string[], rawMessages: string[]): string {
  if (entries.length > 0) {
    return entries
      .map(e =>
        [
          `${e.title} (${e.code} · ${SOURCE_LABELS[e.source]})`,
          e.meaning + (isGovernmentSource(e.source) ? ' This response came from the government system, not Whitebooks.' : ''),
          'Fix:',
          ...e.fix.map((step, i) => `${i + 1}. ${step}`),
          e.retryable ? 'Safe to retry once the above is done.' : 'Retrying the same request will return this error again.',
        ].join('\n'),
      )
      .join('\n\n');
  }
  if (unknownCodes.length > 0) return `Undocumented error code${unknownCodes.length > 1 ? 's' : ''}: ${unknownCodes.join(', ')}`;
  return `The request was not successful: ${rawMessages[0] ?? ''}`;
}

export default function ErrorExplainer({ resolved }: { resolved: ResolvedApiError }): React.ReactElement | null {
  const [open, setOpen] = useState(true);
  /* A fresh response gets a fresh explainer — re-expand it. */
  useEffect(() => { setOpen(true); }, [resolved]);

  const { matches, unknownCodes, httpFallback, rawMessages } = resolved;
  const entries = useMemo(
    () => (matches.length > 0 ? matches : httpFallback ? [httpFallback] : []),
    [matches, httpFallback],
  );
  const copyText = useMemo(
    () => toCopyText(entries, unknownCodes, rawMessages),
    [entries, unknownCodes, rawMessages],
  );
  if (entries.length === 0 && unknownCodes.length === 0 && rawMessages.length === 0) return null;

  return (
    <div className="border-0 border-y border-solid border-[var(--dp-border)] bg-[var(--dp-surface)] font-[family-name:var(--dp-font-body)]">
      <div className="flex items-center gap-1.5 pr-2.5">
        <button
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          className="flex-1 min-w-0 flex items-center justify-between gap-2 px-3.5 py-3 border-0 bg-transparent cursor-pointer"
        >
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[var(--dp-status-4xx)]">
            What this means
          </span>
          <ChevronDown
            size={14}
            className={`shrink-0 text-[var(--dp-fg-dim)] transition-transform duration-200 ${open ? '' : '-rotate-90'}`}
          />
        </button>
        <CopyButton text={copyText} label={false} size={12} />
      </div>
      {open && (
        <div className="px-3.5 pb-3 flex flex-col gap-3">
          {entries.map(entry => <Entry key={entry.code} entry={entry} />)}
          {entries.length === 0 && unknownCodes.length > 0 && (
            <p className="m-0 text-[12.5px] leading-[1.55] text-[var(--dp-fg-muted)]">
              Error code{unknownCodes.length > 1 ? 's' : ''}{' '}
              <span className="font-[family-name:var(--dp-font-mono)] text-[var(--dp-fg)]">{unknownCodes.join(', ')}</span>{' '}
              {unknownCodes.length > 1 ? 'aren’t' : 'isn’t'} in our guide yet. Check the response body below for the
              upstream message — if it isn’t clear, share it with support and we’ll document it.
            </p>
          )}
          {/* Code-less failure with no catalog match: elevate the upstream message
              so a 200 OK pill can't disguise it as a success. */}
          {entries.length === 0 && unknownCodes.length === 0 && rawMessages.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <span className="text-[13px] font-semibold text-[var(--dp-fg)]">The request was not successful</span>
              <p className="m-0 text-[12.5px] leading-[1.55] text-[var(--dp-fg-muted)]">{rawMessages[0]}</p>
              <span className="text-[11.5px] text-[var(--dp-fg-dim)]">
                If this message isn’t clear, share it with support and we’ll document it.
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
