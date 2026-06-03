import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import type { NormalizedOperation } from '../../data/openapi-spec';
import { useSpec } from '../../contexts/SpecContext';
import MethodBadge from './MethodBadge';
import CopyButton from './CopyButton';
import ParameterTable from './ParameterTable';
import RequestBodyViewer from './RequestBodyViewer';
import ResponseViewer from './ResponseViewer';
import CodeExampleTabs from './CodeExampleTabs';
import TryItPanel from './TryItPanel';

interface Props {
  operation: NormalizedOperation;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  prevLabel?: string;
  nextLabel?: string;
}

/* ─── Utilities ─────────────────────────────────────────────────────────── */

function SectionLabel({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.09em] text-[var(--dp-fg-muted)] mb-[14px]">
      <span className="inline-block w-[3px] h-[13px] bg-[var(--dp-accent)] rounded-[2px] shrink-0" />
      {children}
    </div>
  );
}

function RightTabBtn({
  label, active, accent, onClick,
}: {
  label: string; active: boolean; accent?: boolean; onClick: () => void;
}): React.ReactElement {
  return (
    <button
      onClick={onClick}
      className="text-[13px] font-[family-name:var(--dp-font-body)] cursor-pointer whitespace-nowrap px-[18px] py-[11px] -mb-px transition-colors duration-150 bg-transparent"
      style={{
        border: 'none',
        borderBottom: `2px solid ${active ? (accent ? '#dc2f65' : 'var(--dp-accent)') : 'transparent'}`,
        color: active ? (accent ? '#dc2f65' : 'var(--dp-fg)') : 'var(--dp-fg-dim)',
        fontWeight: active ? 600 : 400,
      }}
    >
      {label}
    </button>
  );
}

function NavButton({
  label, sublabel, direction, disabled, onClick,
}: {
  label: string; sublabel?: string; direction: 'prev' | 'next'; disabled: boolean; onClick?: () => void;
}): React.ReactElement {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={[
        'flex items-center gap-2 sm:gap-[10px] px-3 sm:px-[19px] py-2 sm:py-3',
        'border border-[var(--dp-border)] rounded-[9px] sm:rounded-[11px] bg-transparent',
        'transition-[border-color] duration-150',
        'max-w-[48%] sm:max-w-[288px]',
        direction === 'next' ? 'text-right' : 'text-left',
        disabled ? 'opacity-[0.35] cursor-not-allowed' : 'cursor-pointer hover:border-[var(--dp-accent)]',
      ].join(' ')}
    >
      {direction === 'prev' && <ChevronLeft size={15} color="var(--dp-fg-dim)" className="shrink-0 sm:w-[18px] sm:h-[18px]" />}
      <span className="overflow-hidden min-w-0">
        <div className="text-[9px] sm:text-[12px] text-[var(--dp-fg-faint)] uppercase tracking-[0.07em] mb-0.5 sm:mb-[2.5px]">
          {label}
        </div>
        {sublabel && (
          <div className="text-[11px] sm:text-[14px] text-[var(--dp-fg-muted)] overflow-hidden text-ellipsis whitespace-nowrap">
            {sublabel}
          </div>
        )}
      </span>
      {direction === 'next' && <ChevronRight size={15} color="var(--dp-fg-dim)" className="shrink-0 sm:w-[18px] sm:h-[18px]" />}
    </button>
  );
}

/* ─── Main ──────────────────────────────────────────────────────────────── */

export default function OperationDetail({
  operation, hasPrev, hasNext, onPrev, onNext, prevLabel, nextLabel,
}: Props): React.ReactElement {
  const { baseUrl } = useSpec();
  const [rightTab, setRightTab] = useState<'code' | 'try'>('try');

  const fullUrl = `${baseUrl}${operation.path}`;
  const hasParams = !!operation.parameters?.length;
  const hasBody = !!operation.requestBody;
  const hasResponses = !!Object.keys(operation.responses ?? {}).length;

  return (
    /* On mobile: single column. On desktop (lg+): docs | sticky code panel */
    <div className="flex flex-col lg:flex-row lg:items-start">

      {/* ── Left: Documentation ────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 px-4 sm:px-8 lg:px-11 pt-7 sm:pt-9 lg:pt-10 pb-16">

        {/* Method + path */}
        {/* <div className="flex flex-wrap items-center gap-2.5 mb-[18px]">
          <MethodBadge method={operation.method} />

          <code className="font-[family-name:var(--dp-font-mono)] text-[13px] sm:text-[14px] text-[var(--dp-fg)] bg-white/[0.04] border border-[var(--dp-border)] rounded-[7px] px-3 py-1 tracking-[0.01em] break-all">
            {operation.path}
          </code>

          {operation.deprecated && (
            <span className="inline-flex items-center gap-1 text-[11px] text-[#f59e0b] bg-[rgba(245,158,11,0.08)] border border-[rgba(245,158,11,0.2)] rounded-[6px] px-2 py-0.5 font-[family-name:var(--dp-font-mono)] shrink-0">
              <AlertTriangle size={10} /> Deprecated
            </span>
          )}

          <div className="ml-auto shrink-0">
            <CopyButton text={fullUrl} size={14} />
          </div>
        </div> */}

        {/* Title */}
        <h1 className="font-[family-name:var(--dp-font-display)] text-[20px] sm:text-[24px] lg:text-[26px] font-bold text-[var(--dp-fg)] mt-0 mb-2.5 leading-[1.2] tracking-[-0.02em]">
          {operation.summary}
        </h1>

        {/* Description */}
        {operation.description && (
          <p className="text-[14px] leading-[1.75] text-[var(--dp-fg-muted)] mt-0 mb-[22px]">
            {operation.description}
          </p>
        )}

        {/* Base URL pill */}
        <div className="flex items-center gap-2.5 mb-8 bg-white/[0.025] border border-[var(--dp-border)] rounded-[8px] px-3.5 py-2">
          <MethodBadge method={operation.method} />
          <code className="font-[family-name:var(--dp-font-mono)] text-[0.75rem] sm:text-[0.875rem] text-[var(--dp-fg-muted)] flex-1 min-w-0 overflow-x-auto leading-none self-center flex items-center flex-nowrap gap-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span className="text-[var(--dp-fg-faint)] whitespace-nowrap shrink-0">{baseUrl}</span>
            <span className="whitespace-nowrap shrink-0">{operation.path}</span>
          </code>
          <div className="shrink-0">
            <CopyButton text={fullUrl} size={12} />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[var(--dp-border)] mb-8" />

        {/* Parameters */}
        {hasParams && (
          <section className="mb-10">
            <SectionLabel>Parameters</SectionLabel>
            <ParameterTable parameters={operation.parameters!} />
          </section>
        )}

        {/* Request Body */}
        {hasBody && (
          <section className="mb-10">
            <SectionLabel>Request Body</SectionLabel>
            <RequestBodyViewer requestBody={operation.requestBody!} />
          </section>
        )}

        {/* Response */}
        {hasResponses && (
          <section className="mb-10">
            <SectionLabel>Response</SectionLabel>
            <ResponseViewer operation={operation} />
          </section>
        )}

        {/* Prev / Next */}
        <div className="flex justify-between mt-14 pt-7 border-t border-[var(--dp-border)]">
          <NavButton direction="prev" label="Previous" sublabel={prevLabel} disabled={!hasPrev} onClick={onPrev} />
          <NavButton direction="next" label="Next" sublabel={nextLabel} disabled={!hasNext} onClick={onNext} />
        </div>
      </div>

      {/* ── Right: Code + Try It ───────────────────────────────────────── */}
      {/*
        Mobile:  full-width block below docs, border-top
        Desktop: 420px sticky sidebar, border-left, fixed viewport height with internal scroll
      */}
      <div className="flex flex-col w-full border-t border-[var(--dp-border)] bg-gradient-to-b from-[#09090f] to-[#080810] lg:pt-10 lg:w-[420px] lg:shrink-0 lg:border-t-0 lg:border-l lg:border-[var(--dp-border)] lg:sticky lg:top-[60px] lg:h-[calc(100vh-60px)] lg:overflow-hidden mr-4">

        {/* Tab bar */}
        <div className="flex items-center border-b border-[var(--dp-border)] px-1 bg-white/[0.015] shrink-0">
          <RightTabBtn label="▶  Try It" active={rightTab === 'try'} accent onClick={() => setRightTab('try')} />
          <RightTabBtn label="◎  Code" active={rightTab === 'code'} accent onClick={() => setRightTab('code')} />
        </div>

        {/* Scrollable panel content */}
        <div className="p-4 lg:flex-1 lg:overflow-y-auto">
          {rightTab === 'try'
            ? <TryItPanel key={operation.path} operation={operation} fullUrl={fullUrl} />
            : <CodeExampleTabs operation={operation} />
          }
        </div>
      </div>
    </div>
  );
}
