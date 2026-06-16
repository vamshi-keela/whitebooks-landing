import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Copy, Check, Info, AlertTriangle, Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react';
import DpIcon, { type IconName } from '../DpIcon';

/* ─── Page scaffold ───────────────────────────────────────────────────────── */

export function DocArticle({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <article className="flex-1 min-w-0 px-5 sm:px-8 lg:px-12 pt-8 lg:pt-10 pb-20 max-w-[820px]">
      {children}
    </article>
  );
}

export function DocEyebrow({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-[var(--dp-accent)] mb-2.5">
      {children}
    </div>
  );
}

export function DocTitle({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <h1 className="font-[family-name:var(--dp-font-display)] text-[30px] sm:text-[34px] font-semibold text-[var(--dp-fg)] m-0 leading-[1.15] tracking-[-0.02em]">
      {children}
    </h1>
  );
}

export function DocLead({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <p className="text-[16px] leading-[1.7] text-[var(--dp-fg-muted)] mt-4 mb-0">
      {children}
    </p>
  );
}

export function DocH2({ id, children }: { id?: string; children: React.ReactNode }): React.ReactElement {
  return (
    <h2
      id={id}
      className="font-[family-name:var(--dp-font-display)] text-[21px] font-semibold text-[var(--dp-fg)] mt-12 mb-3 pb-2.5 border-b border-[var(--dp-border)] leading-[1.3] tracking-[-0.01em] scroll-mt-[120px]"
    >
      {children}
    </h2>
  );
}

export function DocH3({ id, children }: { id?: string; children: React.ReactNode }): React.ReactElement {
  return (
    <h3 id={id} className="font-[family-name:var(--dp-font-display)] text-[16.5px] font-semibold text-[var(--dp-fg)] mt-8 mb-2 scroll-mt-[120px]">
      {children}
    </h3>
  );
}

export function DocP({ children }: { children: React.ReactNode }): React.ReactElement {
  return <p className="text-[15px] leading-[1.75] text-[var(--dp-fg-muted)] my-4">{children}</p>;
}

export function DocUL({ children }: { children: React.ReactNode }): React.ReactElement {
  return <ul className="my-4 pl-5 flex flex-col gap-2 list-disc marker:text-[var(--dp-fg-faint)]">{children}</ul>;
}

export function DocLI({ children }: { children: React.ReactNode }): React.ReactElement {
  return <li className="text-[15px] leading-[1.7] text-[var(--dp-fg-muted)] pl-1">{children}</li>;
}

export function InlineCode({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <code className="font-[family-name:var(--dp-font-mono)] text-[0.86em] text-[var(--dp-accent-2)] bg-[var(--dp-surface-2)] border border-[var(--dp-border)] rounded-[5px] px-1.5 py-0.5">
      {children}
    </code>
  );
}

export function DocLink({ to, children }: { to: string; children: React.ReactNode }): React.ReactElement {
  const external = to.startsWith('http');
  const cls = 'text-[var(--dp-accent-2)] font-medium underline decoration-[var(--dp-accent-line)] underline-offset-2 hover:decoration-[var(--dp-accent)] transition-colors';
  return external
    ? <a href={to} target="_blank" rel="noreferrer" className={cls}>{children}</a>
    : <Link to={to} className={cls}>{children}</Link>;
}

/* ─── Callout ─────────────────────────────────────────────────────────────── */

type CalloutType = 'info' | 'warning' | 'success' | 'tip';

const calloutConfig: Record<CalloutType, { icon: React.ReactNode; color: string; bg: string; border: string }> = {
  info:    { icon: <Info size={16} />,         color: 'var(--dp-info)',    bg: 'rgba(96,165,250,0.07)',  border: 'rgba(96,165,250,0.25)' },
  warning: { icon: <AlertTriangle size={16} />, color: 'var(--dp-warning)', bg: 'rgba(245,158,11,0.07)',  border: 'rgba(245,158,11,0.28)' },
  success: { icon: <CheckCircle2 size={16} />,  color: 'var(--dp-success)', bg: 'rgba(34,197,94,0.07)',   border: 'rgba(34,197,94,0.25)' },
  tip:     { icon: <Lightbulb size={16} />,     color: 'var(--dp-accent-2)', bg: 'var(--dp-accent-soft)', border: 'var(--dp-accent-line)' },
};

export function Callout({ type = 'info', title, children }: { type?: CalloutType; title?: string; children: React.ReactNode }): React.ReactElement {
  const c = calloutConfig[type];
  return (
    <div className="flex gap-3 my-5 rounded-xl px-4 py-3.5" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
      <span className="shrink-0 mt-0.5" style={{ color: c.color }}>{c.icon}</span>
      <div className="min-w-0 text-[14px] leading-[1.65] text-[var(--dp-fg-muted)] [&>p]:m-0 [&_a]:text-[var(--dp-fg)]">
        {title && <div className="font-semibold text-[var(--dp-fg)] mb-0.5">{title}</div>}
        {children}
      </div>
    </div>
  );
}

/* ─── Steps ───────────────────────────────────────────────────────────────── */

export function Steps({ children }: { children: React.ReactNode }): React.ReactElement {
  const items = React.Children.toArray(children);
  return (
    <div className="my-6 flex flex-col">
      {items.map((child, i) => (
        <div key={i} className="flex gap-4">
          {/* Rail */}
          <div className="flex flex-col items-center shrink-0">
            <span className="w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-semibold text-white bg-[var(--dp-accent)] shrink-0">
              {i + 1}
            </span>
            {i < items.length - 1 && <span className="w-px flex-1 bg-[var(--dp-border)] my-1" />}
          </div>
          {/* Body */}
          <div className="min-w-0 flex-1 pb-7">{child}</div>
        </div>
      ))}
    </div>
  );
}

export function Step({ title, children }: { title: string; children?: React.ReactNode }): React.ReactElement {
  return (
    <div className="pt-0.5">
      <div className="text-[15.5px] font-semibold text-[var(--dp-fg)] mb-1.5 leading-[1.4]">{title}</div>
      <div className="text-[14.5px] leading-[1.7] text-[var(--dp-fg-muted)] [&>p:first-child]:mt-0 [&>p]:my-3">{children}</div>
    </div>
  );
}

/* ─── Card grid ───────────────────────────────────────────────────────────── */

export function CardGrid({ cols = 2, children }: { cols?: 2 | 3; children: React.ReactNode }): React.ReactElement {
  return (
    <div className={`grid grid-cols-1 ${cols === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'} gap-3.5 my-6`}>
      {children}
    </div>
  );
}

export function DocCard({
  icon, title, description, to, meta,
}: {
  icon?: IconName; title: string; description?: string; to: string; meta?: string;
}): React.ReactElement {
  const external = to.startsWith('http');
  const inner = (
    <div className="group h-full flex flex-col gap-2 p-4 rounded-xl border border-[var(--dp-border)] bg-[var(--dp-surface)] transition-[border-color,box-shadow,transform] duration-150 hover:border-[var(--dp-accent-line)] hover:shadow-[0_6px_24px_-12px_rgba(220,47,101,0.25)]">
      <div className="flex items-center gap-2.5">
        {icon && (
          <span className="w-9 h-9 rounded-lg flex items-center justify-center bg-[var(--dp-accent-soft)] text-[var(--dp-accent-2)] shrink-0">
            <DpIcon name={icon} size={17} />
          </span>
        )}
        <span className="text-[15px] font-semibold text-[var(--dp-fg)] flex-1">{title}</span>
        <ArrowRight size={15} className="shrink-0 text-[var(--dp-fg-faint)] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-[var(--dp-accent)]" />
      </div>
      {description && <p className="text-[13.5px] leading-[1.6] text-[var(--dp-fg-muted)] m-0">{description}</p>}
      {meta && <div className="mt-auto pt-1 text-[12px] font-[family-name:var(--dp-font-mono)] text-[var(--dp-fg-faint)]">{meta}</div>}
    </div>
  );
  return external
    ? <a href={to} target="_blank" rel="noreferrer" className="block h-full">{inner}</a>
    : <Link to={to} className="block h-full">{inner}</Link>;
}

/* ─── Table ───────────────────────────────────────────────────────────────── */

export function DocTable({ head, rows }: { head: string[]; rows: React.ReactNode[][] }): React.ReactElement {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-[var(--dp-border)]">
      <table className="w-full border-collapse text-[14px]">
        <thead>
          <tr className="bg-[var(--dp-surface-2)]">
            {head.map((h, i) => (
              <th key={i} className="text-left font-semibold text-[var(--dp-fg-dim)] text-[12.5px] uppercase tracking-[0.04em] px-4 py-2.5 border-b border-[var(--dp-border)] whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-b border-[var(--dp-border)] last:border-0">
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 text-[var(--dp-fg-muted)] leading-[1.6] align-top">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Code sample (dark, tabbed, copyable) ────────────────────────────────── */

interface CodeTab { label: string; code: string; }

function highlightLine(line: string): React.ReactNode {
  // Lightweight highlighting: comments, then quoted strings, then a few keywords.
  if (/^\s*(#|\/\/)/.test(line)) {
    return <span style={{ color: '#5b5b70', fontStyle: 'italic' }}>{line}</span>;
  }
  const parts = line.split(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g);
  return parts.map((seg, i) => {
    if (/^["']/.test(seg)) return <span key={i} style={{ color: '#a5e3a1' }}>{seg}</span>;
    const sub = seg.split(/\b(curl|GET|POST|PUT|DELETE|PATCH|Authorization|Bearer|const|await|import|from|def|print|fetch|requests)\b/g);
    return sub.map((s, j) =>
      /^(curl|GET|POST|PUT|DELETE|PATCH|Authorization|Bearer|const|await|import|from|def|print|fetch|requests)$/.test(s)
        ? <span key={`${i}-${j}`} style={{ color: '#c084fc' }}>{s}</span>
        : <span key={`${i}-${j}`} style={{ color: '#d4d4dc' }}>{s}</span>,
    );
  });
}

export function CodeSample({ tabs, title }: { tabs: CodeTab[]; title?: string }): React.ReactElement {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    void navigator.clipboard.writeText(tabs[active].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }, [active, tabs]);

  const lines = tabs[active].code.split('\n');

  return (
    <div className="dp-code-panel my-5 rounded-xl border border-[var(--dp-border)] overflow-hidden" style={{ background: '#0d0d10' }}>
      <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 border-b border-[var(--dp-border)] bg-[var(--dp-surface)]">
        <div className="flex items-center gap-1 min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {title && tabs.length === 1
            ? <span className="px-2 text-[12.5px] font-[family-name:var(--dp-font-mono)] text-[var(--dp-fg-dim)]">{title}</span>
            : tabs.map((t, i) => (
              <button
                key={t.label}
                onClick={() => setActive(i)}
                className="px-2.5 py-1 rounded-md text-[12px] font-body cursor-pointer border-0 transition-colors duration-150 whitespace-nowrap"
                style={{
                  background: active === i ? 'var(--dp-surface-3)' : 'transparent',
                  color: active === i ? 'var(--dp-fg)' : 'var(--dp-fg-dim)',
                  fontWeight: active === i ? 500 : 400,
                }}
              >
                {t.label}
              </button>
            ))}
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 shrink-0 px-2 py-1 rounded-md text-[12px] cursor-pointer border-0 bg-transparent transition-colors duration-150"
          style={{ color: copied ? 'var(--dp-success)' : 'var(--dp-fg-dim)' }}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
        </button>
      </div>
      <div className="overflow-x-auto py-3 text-[12.5px] font-[family-name:var(--dp-font-mono)] leading-[1.75]">
        {lines.map((ln, i) => (
          <div key={i} className="flex px-0">
            <span className="select-none text-right pr-4 pl-4 shrink-0 w-[44px]" style={{ color: 'var(--dp-fg-faint)' }}>{i + 1}</span>
            <span className="pr-5 whitespace-pre">{highlightLine(ln) }</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Prev / Next footer ──────────────────────────────────────────────────── */

export function DocPager({
  prev, next,
}: {
  prev?: { label: string; to: string }; next?: { label: string; to: string };
}): React.ReactElement {
  return (
    <div className="flex justify-between gap-4 mt-16 pt-7 border-t border-[var(--dp-border)]">
      {prev ? (
        <Link to={prev.to} className="group flex-1 max-w-[48%] flex items-center gap-2 px-4 py-3 rounded-xl border border-[var(--dp-border)] hover:border-[var(--dp-accent-line)] transition-colors">
          <ArrowRight size={16} className="rotate-180 shrink-0 text-[var(--dp-fg-dim)]" />
          <span className="min-w-0">
            <span className="block text-[11px] uppercase tracking-[0.06em] text-[var(--dp-fg-faint)]">Previous</span>
            <span className="block text-[14px] text-[var(--dp-fg)] truncate">{prev.label}</span>
          </span>
        </Link>
      ) : <span className="flex-1 max-w-[48%]" />}
      {next ? (
        <Link to={next.to} className="group flex-1 max-w-[48%] flex items-center justify-end gap-2 px-4 py-3 rounded-xl border border-[var(--dp-border)] hover:border-[var(--dp-accent-line)] transition-colors text-right">
          <span className="min-w-0">
            <span className="block text-[11px] uppercase tracking-[0.06em] text-[var(--dp-fg-faint)]">Next</span>
            <span className="block text-[14px] text-[var(--dp-fg)] truncate">{next.label}</span>
          </span>
          <ArrowRight size={16} className="shrink-0 text-[var(--dp-fg-dim)] group-hover:text-[var(--dp-accent)] transition-colors" />
        </Link>
      ) : <span className="flex-1 max-w-[48%]" />}
    </div>
  );
}
