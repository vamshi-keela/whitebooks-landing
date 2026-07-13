import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, AlertTriangle, Play } from 'lucide-react';
import type { NormalizedOperation, ApiSpecKey } from '@/data/openapi-spec';
import { useSpec } from '../../contexts/SpecContext';
import MethodBadge from './MethodBadge';
import CopyButton from './CopyButton';
import ParameterTable from './ParameterTable';
import RequestBodyViewer from './RequestBodyViewer';
import ResponseViewer from './ResponseViewer';
import CodeExampleTabs from './CodeExampleTabs';
import ResponseCard from './ResponseCard';
import Playground from './Playground';
import PageActions from './PageActions';

interface Props {
  operation: NormalizedOperation;
  apiType: ApiSpecKey;
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
    <h2 className="text-[17px] font-semibold tracking-[-0.01em] text-[var(--dp-fg)] m-0 mb-2  border-b border-[var(--dp-border)] font-[family-name:var(--dp-font-display)]">
      {children}
    </h2>
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

/* ─── Divider ─────────────────────────────────────────────────────────────── */
export const HorizontalDiver = ({ className = '' }: { className?: string }): React.ReactElement => (
  <div className={`mb-2 h-px bg-[var(--dp-horizontal-border)] ${className}`} />
)

/* ─── Main ──────────────────────────────────────────────────────────────── */

export default function OperationDetail({
  operation, apiType, hasPrev, hasNext, onPrev, onNext, prevLabel, nextLabel,
}: Props): React.ReactElement {
  const { baseUrl } = useSpec();
  const [playgroundOpen, setPlaygroundOpen] = useState(false);

  const fullUrl = `${baseUrl}${operation.path}`;
  const hasParams = !!operation.parameters?.length;
  const hasBody = !!operation.requestBody;
  const hasResponses = !!Object.keys(operation.responses ?? {}).length;

  return (
    /* On mobile: single column. On desktop (lg+): docs | sticky code panel */
    <div className="flex flex-col lg:flex-row lg:items-start">

      {/* ── Left: Documentation ────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 px-4 sm:px-8 lg:px-12 pt-7 sm:pt-9 lg:pt-10 pb-16 max-w-[820px]">

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 mb-3 text-[12.5px] font-medium">
          <span className="text-[var(--dp-fg-dim)]">{operation.tag}</span>
          <ChevronRight size={12} color="var(--dp-fg-faint)" className="shrink-0" />
          <span className="text-[var(--dp-accent)]">{operation.summary}</span>
        </div>

        {/* Title */}
        <h1 className="font-[family-name:var(--dp-font-display)] text-[26px] sm:text-[28px] lg:text-[30px] font-semibold text-[var(--dp-fg)] mt-0 mb-3 leading-[1.2] tracking-[-0.02em]">
          {operation.summary}
          {operation.deprecated && (
            <span className="inline-flex items-center gap-1 align-middle ml-3 text-[11px] font-medium text-[var(--dp-warning)] bg-[rgba(245,158,11,0.08)] border border-[rgba(245,158,11,0.25)] rounded-md px-2 py-0.5 font-[family-name:var(--dp-font-mono)]">
              <AlertTriangle size={10} /> Deprecated
            </span>
          )}
        </h1>

        {/* Page actions toolbar */}
        <PageActions operation={operation} />
        <HorizontalDiver />
        {/* Endpoint URL bar + Try it */}
        <div className="flex items-stretch gap-2 mt-4 mb-5">
          <div className="flex items-center gap-2.5 flex-1 min-w-0 bg-[var(--dp-surface-2)] border border-[var(--dp-border-strong)] rounded-[10px] pl-2.5 pr-2 py-2">
            <MethodBadge method={operation.method} />
            <code className="py-0.5 font-[family-name:var(--dp-font-mono)] text-[12.5px] sm:text-[13px] flex-1 min-w-0 overflow-x-auto leading-none self-center flex items-center flex-nowrap gap-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <span className="text-[var(--dp-fg-dim)] whitespace-nowrap shrink-0">{baseUrl}</span>
              <span className="text-[var(--dp-fg)] font-semibold whitespace-nowrap shrink-0">{operation.path}</span>
            </code>
            <div className="shrink-0">
              <CopyButton text={fullUrl} size={12} label={false} />
            </div>
          </div>
          <button
            onClick={() => setPlaygroundOpen(true)}
            className="shrink-0 flex items-center gap-1.5 px-4 rounded-[10px] text-[13px] font-semibold text-white bg-[var(--dp-accent)] cursor-pointer transition-[background,box-shadow] duration-200 hover:bg-[#e84a78] shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
            style={{ border: 'none' }}
          >
            Try it <Play size={13} />
          </button>
        </div>

        {/* Description */}
        {operation.description && (
          <p className="text-[15px] leading-[1.75] text-[var(--dp-fg-muted)] mt-0 mb-8">
            {operation.description}
          </p>
        )}

        {!operation.description && <div className="mb-3" />}

        {/* Parameters */}
        {hasParams && (
          <section className="mb-10">
            <SectionLabel>Parameters</SectionLabel>
            <HorizontalDiver className='mb-6' />
            <ParameterTable parameters={operation.parameters!} />
          </section>
        )}

        {/* Request Body */}
        {hasBody && (
          <section className="mb-10 pt-9 border-t border-[var(--dp-border)]">
            <SectionLabel>Request Body</SectionLabel>
            <HorizontalDiver className='mb-6' />
            <RequestBodyViewer requestBody={operation.requestBody!} />
          </section>
        )}

        {/* Response */}
        {hasResponses && (
          <section className="mb-10 pt-9 border-t border-[var(--dp-border)]">
            <SectionLabel>Response</SectionLabel>
            <HorizontalDiver className='mb-6' />
            <ResponseViewer operation={operation} />
          </section>
        )}

        {/* Prev / Next */}
        <div className="flex justify-between mt-14 pt-7 border-t border-[var(--dp-border)]">
          <NavButton direction="prev" label="Previous" sublabel={prevLabel} disabled={!hasPrev} onClick={onPrev} />
          <NavButton direction="next" label="Next" sublabel={nextLabel} disabled={!hasNext} onClick={onNext} />
        </div>
      </div>

      {/* ── Right: Code + Response reference cards ─────────────────────── */}
      {/*
        Mobile:  full-width block below docs, border-top
        Desktop: sticky sidebar, border-left, fixed viewport height with internal scroll.
        Interactive requests happen in the Playground modal (the "Try it" button).
      */}
      <div className="dp-code-bg flex flex-col w-full border-t border-[var(--dp-border)] lg:w-[420px] xl:w-[440px] lg:shrink-0 lg:border-t-0 lg:border-l lg:sticky lg:top-[var(--dp-nav-h)] lg:h-[calc(100vh_-_var(--dp-nav-h))] lg:overflow-hidden">
        <div className="p-4 lg:flex-1 lg:overflow-y-auto flex flex-col gap-4">
          <CodeExampleTabs operation={operation} />
          {hasResponses && <ResponseCard operation={operation} maxHeight={360} />}
        </div>
      </div>

      {/* ── Playground modal (sandbox bed) ─────────────────────────────── */}
      <Playground
        open={playgroundOpen}
        onClose={() => setPlaygroundOpen(false)}
        operation={operation}
        apiType={apiType}
      />
    </div>
  );
}
