import React, { useState, useCallback, useMemo } from 'react';
import DpIcon from './DpIcon';

/* ─── Logo ─────────────────────────────────────────────────────────────────── */
export function Logo(): React.ReactElement {
  return (
    <a href="/developer" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#d33568" />
            <stop offset="100%" stopColor="#ff4d80" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="30" height="30" rx="8" stroke="url(#logo-grad)" strokeWidth="1.5" fill="rgba(220,47,101,0.08)" />
        <path
          d="M9 11l2.4 10L14 13l2.6 8L19 11"
          stroke="url(#logo-grad)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="23" cy="22" r="2" fill="url(#logo-grad)" />
      </svg>
      <span style={{ fontFamily: 'var(--dp-font-display)', fontSize: 15, fontWeight: 600, color: 'var(--dp-fg)' }}>
        whitebooks<span style={{ color: 'var(--dp-accent-2)' }}>.</span>dev
      </span>
    </a>
  );
}

/* ─── Token types for CodeBlock ─────────────────────────────────────────────── */
export type TokenClass =
  | 'key' | 'tok-key'
  | 'str' | 'tok-str'
  | 'num' | 'tok-num'
  | 'com' | 'tok-com'
  | 'kw' | 'tok-kw'
  | 'fn' | 'tok-fn'
  | 'pun' | 'tok-pun'
  | '';

export type Token = [TokenClass, string];
export type CodeLine = Token[];

const tokenColor: Record<string, string> = {
  key: '#ff7aa8',
  'tok-key': '#ff7aa8',
  str: '#a5e3a1',
  'tok-str': '#a5e3a1',
  num: '#f5c986',
  'tok-num': '#f5c986',
  com: '#5b5b70',
  'tok-com': '#5b5b70',
  kw: '#c084fc',
  'tok-kw': '#c084fc',
  fn: '#7dd3fc',
  'tok-fn': '#7dd3fc',
  pun: '#8a8aa0',
  'tok-pun': '#8a8aa0',
  '': '#d4d4dc',
};

export interface CodeTab {
  label: string;
  lines: CodeLine[];
}

interface CodeBlockProps {
  tabs: CodeTab[];
  defaultTab?: number;
}

export function CodeBlock({ tabs, defaultTab = 0 }: CodeBlockProps): React.ReactElement {
  const [active, setActive] = useState(defaultTab);
  const [copied, setCopied] = useState(false);

  // Reserve a fixed height for the tallest tab so the block doesn't resize
  // when switching between tabs with different line counts.
  const codeMinHeight = useMemo(() => {
    const maxLines = Math.max(0, ...tabs.map(t => t.lines.length));
    const lineHeightPx = 13 * 1.7; // fontSize * lineHeight
    return maxLines * lineHeightPx;
  }, [tabs]);

  const handleCopy = useCallback(() => {
    const text = tabs[active].lines
      .map(line => line.map(([, t]) => t).join(''))
      .join('\n');
    void navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [active, tabs]);

  return (
    <div
      style={{
        background: '#0f0f17',
        borderRadius: 12,
        border: '1px solid var(--dp-border)',
        overflow: 'hidden',
        fontFamily: 'var(--dp-font-mono)',
        fontSize: 13,
      }}
    >
      {/* Tab bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--dp-border)',
          background: 'rgba(255,255,255,0.02)',
          padding: '0 12px',
          overflowX: 'auto',
          gap: 8,
        }}
      >
        <div style={{ display: 'flex', gap: 0, flexShrink: 0 }}>
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActive(i)}
              style={{
                background: 'none',
                border: 'none',
                padding: '10px 14px',
                fontSize: 12,
                fontFamily: 'var(--dp-font-mono)',
                color: active === i ? 'var(--dp-accent-2)' : 'var(--dp-fg-dim)',
                borderBottom: active === i ? '2px solid var(--dp-accent)' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'color 0.15s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          style={{
            background: 'none',
            border: 'none',
            color: copied ? 'var(--dp-success)' : 'var(--dp-fg-dim)',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 12,
            padding: '6px 8px',
            borderRadius: 6,
            cursor: 'pointer',
            transition: 'color 0.15s',
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
        >
          <DpIcon name={copied ? 'check' : 'copy'} size={13} />
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Code area */}
      <div style={{ overflowX: 'auto', padding: '16px 0', minHeight: codeMinHeight }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 'max-content' }}>
          <tbody>
            {tabs[active].lines.map((line, li) => (
              <tr key={li} style={{ lineHeight: 1.7 }}>
                <td
                  style={{
                    color: 'var(--dp-fg-faint)',
                    textAlign: 'right',
                    padding: '0 16px 0 20px',
                    userSelect: 'none',
                    fontSize: 11,
                    minWidth: 40,
                  }}
                >
                  {li + 1}
                </td>
                <td style={{ padding: '0 20px 0 0', whiteSpace: 'pre' }}>
                  {line.map(([cls, text], ti) => (
                    <span
                      key={ti}
                      style={{
                        color: tokenColor[cls] ?? '#d4d4dc',
                        fontStyle: cls === 'com' || cls === 'tok-com' ? 'italic' : undefined,
                      }}
                    >
                      {text}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── SurfaceCard ───────────────────────────────────────────────────────────── */
interface SurfaceCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function SurfaceCard({ children, className, style, onClick }: SurfaceCardProps): React.ReactElement {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={className}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--dp-surface)',
        border: `1px solid ${hovered ? 'var(--dp-accent-line)' : 'var(--dp-border)'}`,
        borderRadius: 14,
        boxShadow: hovered ? '0 0 0 1px var(--dp-accent-line), 0 8px 32px rgba(220,47,101,0.1)' : 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        cursor: onClick ? 'pointer' : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Status ────────────────────────────────────────────────────────────────── */
type StatusKind = 'ok' | 'warn' | 'err' | 'info';

interface StatusProps {
  kind: StatusKind;
  label: string;
}

const statusColor: Record<StatusKind, string> = {
  ok: 'var(--dp-success)',
  warn: 'var(--dp-warning)',
  err: 'var(--dp-danger)',
  info: 'var(--dp-info)',
};

export function Status({ kind, label }: StatusProps): React.ReactElement {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: statusColor[kind],
          boxShadow: `0 0 6px ${statusColor[kind]}`,
          flexShrink: 0,
        }}
      />
      <span style={{ color: 'var(--dp-fg-muted)' }}>{label}</span>
    </span>
  );
}

/* ─── InlineCode ────────────────────────────────────────────────────────────── */
interface InlineCodeProps {
  children: React.ReactNode;
}

export function InlineCode({ children }: InlineCodeProps): React.ReactElement {
  return (
    <code
      style={{
        fontFamily: 'var(--dp-font-mono)',
        fontSize: '0.875em',
        color: 'var(--dp-accent-2)',
        background: 'var(--dp-surface)',
        border: '1px solid var(--dp-border)',
        borderRadius: 5,
        padding: '1px 6px',
      }}
    >
      {children}
    </code>
  );
}

/* ─── Pill ──────────────────────────────────────────────────────────────────── */
interface PillProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function Pill({ children, style }: PillProps): React.ReactElement {
  return (
    <span
      style={{
        background: 'var(--dp-accent-soft)',
        border: '1px solid var(--dp-accent-line)',
        color: 'var(--dp-accent-2)',
        borderRadius: 999,
        padding: '2px 10px',
        fontSize: 12,
        fontWeight: 600,
        fontFamily: 'var(--dp-font-mono)',
        ...style,
      }}
    >
      {children}
    </span>
  );
}

/* ─── Badge ─────────────────────────────────────────────────────────────────── */
export type BadgeTone = 'accent' | 'success';

interface BadgeProps {
  children: React.ReactNode;
  /** Leading icon, e.g. <Zap size={10} />. */
  icon?: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
  style?: React.CSSProperties;
}

const badgeTones: Record<BadgeTone, { bg: string; border: string; color: string }> = {
  accent: { bg: 'rgba(220,47,101,0.07)', border: 'rgba(220,47,101,0.2)', color: 'var(--dp-accent-2)' },
  success: { bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.3)', color: '#22c55e' },
};

export function Badge({ children, icon, tone = 'accent', className, style }: BadgeProps): React.ReactElement {
  const t = badgeTones[tone];
  return (
    <span
      className={`inline-flex items-center gap-[5px] px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-[0.04em]${className ? ` ${className}` : ''}`}
      style={{
        background: t.bg,
        border: `1px solid ${t.border}`,
        color: t.color,
        fontFamily: 'var(--dp-font-mono)',
        ...style,
      }}
    >
      {icon}{children}
    </span>
  );
}

/* ─── MethodBadge ───────────────────────────────────────────────────────────── */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface MethodBadgeProps {
  method: HttpMethod;
}

const methodColors: Record<HttpMethod, { bg: string; text: string }> = {
  GET: { bg: 'rgba(34,197,94,0.12)', text: '#4ade80' },
  POST: { bg: 'rgba(96,165,250,0.12)', text: '#60a5fa' },
  PUT: { bg: 'rgba(251,191,36,0.12)', text: '#fbbf24' },
  DELETE: { bg: 'rgba(239,68,68,0.12)', text: '#f87171' },
  PATCH: { bg: 'rgba(167,139,250,0.12)', text: '#a78bfa' },
};

export function MethodBadge({ method }: MethodBadgeProps): React.ReactElement {
  const colors = methodColors[method];
  return (
    <span
      style={{
        background: colors.bg,
        color: colors.text,
        fontFamily: 'var(--dp-font-mono)',
        fontSize: 11,
        fontWeight: 600,
        padding: '2px 7px',
        borderRadius: 5,
        letterSpacing: '0.04em',
        border: `1px solid ${colors.text}30`,
      }}
    >
      {method}
    </span>
  );
}
