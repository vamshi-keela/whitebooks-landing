import React, { useState, useEffect, useRef } from 'react';
import { CodeBlock, SurfaceCard, InlineCode, Pill } from './DpComponents';
import DpIcon from './DpIcon';
import type { CodeTab } from './DpComponents';

/* ─── Sidebar data ───────────────────────────────────────────────────────────── */
interface SidebarItem {
  label: string;
  slug: string;
}

interface SidebarGroup {
  heading: string;
  items: SidebarItem[];
}

const SIDEBAR_GROUPS: SidebarGroup[] = [
  {
    heading: 'Getting Started',
    items: [
      { label: 'Introduction', slug: 'introduction' },
      { label: 'Authentication', slug: 'authentication' },
      { label: 'Environments', slug: 'environments' },
      { label: 'Your first request', slug: 'first-request' },
    ],
  },
  {
    heading: 'E-Invoice API',
    items: [
      { label: 'Overview', slug: 'einvoice-overview' },
      { label: 'Generate IRN', slug: 'einvoice-generate' },
      { label: 'Cancel IRN', slug: 'einvoice-cancel' },
      { label: 'Bulk operations', slug: 'einvoice-bulk' },
    ],
  },
  {
    heading: 'GST Returns',
    items: [
      { label: 'GSTR-1 Filing', slug: 'gstr1' },
      { label: 'GSTR-3B Filing', slug: 'gstr3b' },
      { label: 'Reconciliation', slug: 'reconciliation' },
    ],
  },
  {
    heading: 'E-Way Bill API',
    items: [
      { label: 'Generate EWB', slug: 'eway-generate' },
      { label: 'Part-B Update', slug: 'eway-partb' },
      { label: 'Cancel EWB', slug: 'eway-cancel' },
    ],
  },
  {
    heading: 'Webhooks',
    items: [
      { label: 'Overview', slug: 'webhooks' },
      { label: 'Event types', slug: 'webhook-events' },
      { label: 'Security', slug: 'webhook-security' },
    ],
  },
  {
    heading: 'Resources',
    items: [
      { label: 'Error codes', slug: 'errors' },
      { label: 'Rate limits', slug: 'rate-limits' },
      { label: 'Changelog', slug: 'changelog' },
    ],
  },
];

/* ─── TOC data ────────────────────────────────────────────────────────────────── */
const TOC_ITEMS = [
  { label: 'Architecture', slug: 'architecture' },
  { label: 'Base URLs', slug: 'base-urls' },
  { label: 'Authentication', slug: 'auth' },
  { label: 'Lifecycle', slug: 'lifecycle' },
  { label: 'First Request', slug: 'first-request' },
  { label: 'Error Handling', slug: 'errors' },
  { label: 'Webhooks', slug: 'webhooks' },
  { label: 'Go-Live Checklist', slug: 'checklist' },
];

/* ─── Callout ─────────────────────────────────────────────────────────────────── */
type CalloutVariant = 'info' | 'warn' | 'success' | 'note';

interface CalloutProps {
  variant: CalloutVariant;
  children: React.ReactNode;
}

const calloutConfig: Record<CalloutVariant, { bg: string; border: string; icon: React.ReactElement; iconColor: string }> = {
  info: {
    bg: 'rgba(96,165,250,0.06)',
    border: 'rgba(96,165,250,0.2)',
    icon: <DpIcon name="info" size={14} />,
    iconColor: '#60a5fa',
  },
  warn: {
    bg: 'rgba(245,158,11,0.06)',
    border: 'rgba(245,158,11,0.2)',
    icon: <DpIcon name="warning" size={14} />,
    iconColor: '#f59e0b',
  },
  success: {
    bg: 'rgba(34,197,94,0.06)',
    border: 'rgba(34,197,94,0.2)',
    icon: <DpIcon name="check" size={14} />,
    iconColor: '#22c55e',
  },
  note: {
    bg: 'rgba(220,47,101,0.06)',
    border: 'rgba(220,47,101,0.2)',
    icon: <DpIcon name="info" size={14} />,
    iconColor: 'var(--dp-accent-2)',
  },
};

function Callout({ variant, children }: CalloutProps): React.ReactElement {
  const cfg = calloutConfig[variant];
  return (
    <div
      style={{
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        borderRadius: 10,
        padding: '14px 16px',
        display: 'flex',
        gap: 12,
        margin: '20px 0',
      }}
    >
      <span style={{ color: cfg.iconColor, flexShrink: 0, marginTop: 2 }}>{cfg.icon}</span>
      <div style={{ fontSize: 14, color: 'var(--dp-fg-muted)', lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

/* ─── DocSidebar ──────────────────────────────────────────────────────────────── */
interface DocSidebarProps {
  activeSlug: string;
  onSelect: (slug: string) => void;
}

function DocSidebar({ activeSlug, onSelect }: DocSidebarProps): React.ReactElement {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState('');

  const toggleGroup = (heading: string) => {
    setCollapsed(c => ({ ...c, [heading]: !c[heading] }));
  };

  const filtered = search
    ? SIDEBAR_GROUPS.map(g => ({
      ...g,
      items: g.items.filter(i => i.label.toLowerCase().includes(search.toLowerCase())),
    })).filter(g => g.items.length > 0)
    : SIDEBAR_GROUPS;

  return (
    <aside
      style={{
        width: 260,
        flexShrink: 0,
        borderRight: '1px solid var(--dp-border)',
        padding: '24px 0',
        position: 'sticky',
        top: 60,
        maxHeight: 'calc(100vh - 60px)',
        overflowY: 'auto',
      }}
    >
      {/* Search */}
      <div style={{ padding: '0 16px 16px', borderBottom: '1px solid var(--dp-border)', marginBottom: 8 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--dp-border)',
            borderRadius: 8,
            padding: '7px 10px',
          }}
        >
          <DpIcon name="search" size={13} style={{ color: 'var(--dp-fg-dim)', flexShrink: 0 }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search docs..."
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              fontSize: 13,
              color: 'var(--dp-fg)',
              fontFamily: 'var(--dp-font-body)',
              width: '100%',
            }}
          />
        </div>
      </div>

      {/* Groups */}
      {filtered.map(group => (
        <div key={group.heading} style={{ marginBottom: 4 }}>
          <button
            onClick={() => toggleGroup(group.heading)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '7px 16px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--dp-fg-dim)',
              fontSize: 11,
              fontFamily: 'var(--dp-font-mono)',
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              textAlign: 'left',
            }}
          >
            {group.heading}
            <DpIcon name={collapsed[group.heading] ? 'chevron-right' : 'chevron-down'} size={12} />
          </button>

          {!collapsed[group.heading] && (
            <div>
              {group.items.map(item => {
                const isActive = item.slug === activeSlug;
                return (
                  <button
                    key={item.slug}
                    onClick={() => onSelect(item.slug)}
                    style={{
                      width: '100%',
                      display: 'block',
                      padding: '7px 16px 7px 28px',
                      background: isActive ? 'var(--dp-accent-soft)' : 'none',
                      border: 'none',
                      borderLeft: isActive ? '2px solid var(--dp-accent)' : '2px solid transparent',
                      cursor: 'pointer',
                      color: isActive ? 'var(--dp-accent-2)' : 'var(--dp-fg-muted)',
                      fontSize: 13,
                      fontFamily: 'var(--dp-font-body)',
                      textAlign: 'left',
                      transition: 'background 0.1s, color 0.1s',
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
}

/* ─── TOC ─────────────────────────────────────────────────────────────────────── */
function TOC(): React.ReactElement {
  const [active, setActive] = useState('architecture');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-60px 0px -70% 0px' }
    );

    TOC_ITEMS.forEach(item => {
      const el = document.getElementById(item.slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside
      style={{
        width: 220,
        flexShrink: 0,
        padding: '24px 0',
        position: 'sticky',
        top: 60,
        maxHeight: 'calc(100vh - 60px)',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontFamily: 'var(--dp-font-mono)',
          color: 'var(--dp-fg-faint)',
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
          padding: '0 16px 12px',
          borderBottom: '1px solid var(--dp-border)',
          marginBottom: 8,
        }}
      >
        On this page
      </div>
      {TOC_ITEMS.map(item => {
        const isActive = item.slug === active;
        return (
          <a
            key={item.slug}
            href={`#${item.slug}`}
            style={{
              display: 'block',
              padding: '6px 16px',
              fontSize: 13,
              color: isActive ? 'var(--dp-accent-2)' : 'var(--dp-fg-dim)',
              borderLeft: isActive ? '2px solid var(--dp-accent)' : '2px solid transparent',
              transition: 'color 0.15s',
              lineHeight: 1.4,
            }}
          >
            {item.label}
          </a>
        );
      })}
    </aside>
  );
}

/* ─── Code blocks for guide ───────────────────────────────────────────────────── */
const authCodeTabs: CodeTab[] = [
  {
    label: 'Node.js',
    lines: [
      [['kw', 'const'], ['', ' client = '], ['kw', 'new'], ['', ' '], ['fn', 'WhiteBooks'], ['pun', '({']],
      [['', '  apiKey: '], ['key', 'process'], ['pun', '.'], ['fn', 'env'], ['pun', '.'], ['key', 'WB_API_KEY'], ['pun', ',']],
      [['pun', '});']],
      [],
      [['com', '// All requests automatically include Bearer token']],
      [['kw', 'const'], ['', ' res = '], ['kw', 'await'], ['', ' client'], ['pun', '.'], ['fn', 'gst'], ['pun', '.'], ['fn', 'returns'], ['pun', '({']],
      [['', '  gstin: '], ['str', '"29AAGCW7302R1ZF"']],
      [['pun', '});']],
    ],
  },
  {
    label: 'cURL',
    lines: [
      [['fn', 'curl'], ['', ' \\']],
      [['', '  -H '], ['str', '"Authorization: Bearer $WB_API_KEY"'], ['', ' \\']],
      [['', '  -H '], ['str', '"Content-Type: application/json"'], ['', ' \\']],
      [['str', '  "https://api.whitebooks.dev/v3/gst/returns?gstin=29AAGCW7302R1ZF"']],
    ],
  },
];

const firstRequestTabs: CodeTab[] = [
  {
    label: 'Node.js',
    lines: [
      [['kw', 'import'], ['', ' '], ['fn', 'WhiteBooks'], ['', ' '], ['kw', 'from'], ['', ' '], ['str', "'@whitebooks/node'"]],
      [],
      [['kw', 'const'], ['', ' wb = '], ['kw', 'new'], ['', ' '], ['fn', 'WhiteBooks'], ['pun', '({']],
      [['', '  apiKey: '], ['key', 'process'], ['pun', '.'], ['fn', 'env'], ['pun', '.'], ['key', 'WB_API_KEY']],
      [['pun', '});']],
      [],
      [['kw', 'const'], ['', ' irn = '], ['kw', 'await'], ['', ' wb'], ['pun', '.'], ['fn', 'einvoice'], ['pun', '.'], ['fn', 'generate'], ['pun', '({']],
      [['', '  gstin: '], ['str', '"29AAGCW7302R1ZF"'], ['pun', ',']],
      [['', '  invoiceType: '], ['str', '"B2B"'], ['pun', ',']],
      [['', '  invoiceNumber: '], ['str', '"INV-2024-001"'], ['pun', ',']],
      [['', '  invoiceDate: '], ['str', '"2024-01-15"'], ['pun', ',']],
      [['', '  buyer: '], ['pun', '{'], ['', ' gstin: '], ['str', '"27BBBFF5679L1ZR"'], ['', ', name: '], ['str', '"Acme Corp"'], ['', ', ... '], ['pun', '},']],
      [['', '  items: '], ['pun', '['], ['', ' '], ['com', '/* line items */'], ['', ' '], ['pun', '],']],
      [['pun', '});']],
      [],
      [['fn', 'console'], ['pun', '.'], ['fn', 'log'], ['pun', '('], ['str', '"IRN:"'], ['', ', irn'], ['pun', '.'], ['key', 'irn'], ['pun', ')']],
    ],
  },
];

/* ─── Guide sections ──────────────────────────────────────────────────────────── */

function GuideHero(): React.ReactElement {
  return (
    <div id="introduction" style={{ marginBottom: 48, paddingBottom: 40, borderBottom: '1px solid var(--dp-border)' }}>
      {/* Breadcrumbs */}
      {/* <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--dp-fg-dim)', marginBottom: 20 }}>
        <span>Docs</span>
        <DpIcon name="chevron-right" size={12} />
        <span>E-Invoice</span>
        <DpIcon name="chevron-right" size={12} />
        <span style={{ color: 'var(--dp-fg-muted)' }}>Getting Started</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <Pill>v3 API</Pill>
        <span
          style={{
            fontSize: 11,
            fontFamily: 'var(--dp-font-mono)',
            background: 'rgba(34,197,94,0.1)',
            color: 'var(--dp-success)',
            border: '1px solid rgba(34,197,94,0.2)',
            borderRadius: 999,
            padding: '2px 9px',
          }}
        >
          Stable
        </span>
        <span
          style={{
            fontSize: 11,
            fontFamily: 'var(--dp-font-mono)',
            color: 'var(--dp-fg-dim)',
          }}
        >
          Updated Jan 2024
        </span>
      </div> */}

      <h1
        style={{
          fontFamily: 'var(--dp-font-display)',
          fontSize: 38,
          fontWeight: 800,
          color: 'var(--dp-fg)',
          margin: '0 0 16px',
          lineHeight: 1.15,
        }}
      >
        E-Invoice API — Getting Started
      </h1>

      <p style={{ color: 'var(--dp-fg-muted)', fontSize: 16, margin: '0 0 28px', lineHeight: 1.7, maxWidth: 640 }}>
        Learn how to integrate WhiteBooks E-Invoice API to generate IRNs, QR codes, and manage the full
        invoice lifecycle on India's GSP infrastructure.
      </p>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button
          style={{
            background: 'var(--dp-accent)',
            border: 'none',
            borderRadius: 9,
            padding: '9px 20px',
            fontSize: 13,
            fontWeight: 600,
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <DpIcon name="play" size={13} />
          Run in sandbox
        </button>
        <button
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid var(--dp-border)',
            borderRadius: 9,
            padding: '9px 20px',
            fontSize: 13,
            color: 'var(--dp-fg)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <DpIcon name="code" size={13} />
          API reference
        </button>
        <button
          style={{
            background: 'none',
            border: 'none',
            padding: '9px 14px',
            fontSize: 13,
            color: 'var(--dp-fg-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <DpIcon name="github" size={13} />
          View on GitHub
        </button>
      </div>
    </div>
  );
}

export function GuideArchitecture(): React.ReactElement {
  return (
    <div id="architecture" style={{ marginBottom: 48 }}>
      <h2
        style={{
          fontFamily: 'var(--dp-font-display)',
          fontSize: 24,
          fontWeight: 700,
          color: 'var(--dp-fg)',
          margin: '0 0 8px',
        }}
      >
        Architecture
      </h2>
      <p style={{ color: 'var(--dp-fg-muted)', fontSize: 16, margin: '0 0 24px', lineHeight: 1.65 }}>
        WhiteBooks sits between your application and GSTN, providing a reliable, GSP-licensed relay layer.
      </p>

      {/* SVG Architecture Diagram */}
      <SurfaceCard style={{ padding: 36, overflow: 'auto' }}>
        <svg viewBox="0 0 640 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 640 }}>
          {/* Boxes */}
          {/* Your App */}
          <rect x="20" y="90" width="110" height="48" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" />
          <text x="75" y="110" textAnchor="middle" fill="#9a9aae" fontSize="11" fontFamily="DM Sans, sans-serif">Your App</text>
          <text x="75" y="126" textAnchor="middle" fill="#6b6b80" fontSize="10" fontFamily="JetBrains Mono, monospace">SDK / REST</text>

          {/* WhiteBooks API */}
          <rect x="200" y="82" width="130" height="56" rx="8" fill="rgba(220,47,101,0.1)" stroke="rgba(220,47,101,0.3)" />
          <text x="265" y="106" textAnchor="middle" fill="#ff4d80" fontSize="11" fontFamily="DM Sans, sans-serif" fontWeight="600">WhiteBooks API</text>
          <text x="265" y="122" textAnchor="middle" fill="#9a9aae" fontSize="10" fontFamily="JetBrains Mono, monospace">api.whitebooks.dev</text>

          {/* GSP Layer */}
          <rect x="400" y="82" width="110" height="56" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" />
          <text x="455" y="106" textAnchor="middle" fill="#9a9aae" fontSize="11" fontFamily="DM Sans, sans-serif">GSP Layer</text>
          <text x="455" y="122" textAnchor="middle" fill="#6b6b80" fontSize="10" fontFamily="JetBrains Mono, monospace">Licensed GSP</text>

          {/* GSTN */}
          <rect x="560" y="90" width="68" height="48" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" />
          <text x="594" y="110" textAnchor="middle" fill="#9a9aae" fontSize="11" fontFamily="DM Sans, sans-serif">GSTN</text>
          <text x="594" y="126" textAnchor="middle" fill="#6b6b80" fontSize="10" fontFamily="JetBrains Mono, monospace">Gov. API</text>

          {/* Arrows between main nodes */}
          <line x1="130" y1="114" x2="198" y2="114" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" markerEnd="url(#ar)" />
          <line x1="330" y1="114" x2="398" y2="114" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" markerEnd="url(#ar)" />
          <line x1="510" y1="114" x2="558" y2="114" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" markerEnd="url(#ar)" />

          {/* Webhooks branch */}
          <line x1="265" y1="138" x2="265" y2="165" stroke="rgba(220,47,101,0.3)" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#ar2)" />
          <rect x="210" y="168" width="110" height="38" rx="6" fill="rgba(220,47,101,0.06)" stroke="rgba(220,47,101,0.2)" />
          <text x="265" y="185" textAnchor="middle" fill="#ff4d80" fontSize="10" fontFamily="DM Sans, sans-serif">Webhooks</text>
          <text x="265" y="198" textAnchor="middle" fill="#9a9aae" fontSize="9" fontFamily="JetBrains Mono, monospace">Events &amp; alerts</text>

          {/* Audit branch */}
          <line x1="265" y1="82" x2="265" y2="55" stroke="rgba(96,165,250,0.3)" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#ar3)" />
          <rect x="210" y="20" width="110" height="38" rx="6" fill="rgba(96,165,250,0.06)" stroke="rgba(96,165,250,0.2)" />
          <text x="265" y="37" textAnchor="middle" fill="#60a5fa" fontSize="10" fontFamily="DM Sans, sans-serif">Audit Logs</text>
          <text x="265" y="50" textAnchor="middle" fill="#9a9aae" fontSize="9" fontFamily="JetBrains Mono, monospace">Immutable trail</text>

          {/* Arrow markers */}
          <defs>
            <marker id="ar" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="rgba(255,255,255,0.2)" />
            </marker>
            <marker id="ar2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="rgba(220,47,101,0.4)" />
            </marker>
            <marker id="ar3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0 0 L6 3 L0 6 Z" fill="rgba(96,165,250,0.4)" />
            </marker>
          </defs>
        </svg>
      </SurfaceCard>
    </div>
  );
}

function GuideAuthAndUrl(): React.ReactElement {
  return (
    <div id="auth" style={{ marginBottom: 48 }}>
      <h2
        style={{
          fontFamily: 'var(--dp-font-display)',
          fontSize: 24,
          fontWeight: 700,
          color: 'var(--dp-fg)',
          margin: '0 0 8px',
        }}
      >
        Authentication &amp; Base URLs
      </h2>
      <p style={{ color: 'var(--dp-fg-muted)', fontSize: 16, margin: '0 0 20px', lineHeight: 1.65 }}>
        All requests use Bearer token authentication. Keep your API key secret and never commit it to source control.
      </p>

      {/* URL Cards */}
      <div id="base-urls" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        {[
          {
            label: 'Production',
            url: 'https://api.whitebooks.dev/v3',
            color: 'rgba(220,47,101,0.1)',
            border: 'rgba(220,47,101,0.2)',
            textColor: 'var(--dp-accent-2)',
          },
          {
            label: 'Sandbox',
            url: 'https://sandbox.whitebooks.dev/v3',
            color: 'rgba(96,165,250,0.07)',
            border: 'rgba(96,165,250,0.2)',
            textColor: '#60a5fa',
          },
        ].map(env => (
          <div
            key={env.label}
            style={{
              background: env.color,
              border: `1px solid ${env.border}`,
              borderRadius: 10,
              padding: '18px 20px',
            }}
          >
            <div style={{ fontSize: 12, fontFamily: 'var(--dp-font-mono)', color: env.textColor, marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {env.label}
            </div>
            <div style={{ fontFamily: 'var(--dp-font-mono)', fontSize: 13, color: 'var(--dp-fg-muted)' }}>
              {env.url}
            </div>
          </div>
        ))}
      </div>

      <CodeBlock tabs={authCodeTabs} />

      <Callout variant="warn">
        <strong>Never expose your production API key</strong> in client-side code. Use environment variables and server-side requests only.
      </Callout>
    </div>
  );
}

function GuideLifecycle(): React.ReactElement {
  const STAGES = [
    { num: '01', label: 'Draft', color: '#6b6b80', desc: 'Invoice created locally' },
    { num: '02', label: 'Submitted', color: '#60a5fa', desc: 'Sent to WhiteBooks API' },
    { num: '03', label: 'Validated', color: '#fbbf24', desc: 'GSP / GSTN check passed' },
    { num: '04', label: 'IRN Issued', color: '#22c55e', desc: 'IRN + QR code generated' },
    { num: '05', label: 'Cancelled', color: '#f87171', desc: 'Optional, within 24h' },
  ];

  return (
    <div id="lifecycle" style={{ marginBottom: 48 }}>
      <h2
        style={{
          fontFamily: 'var(--dp-font-display)',
          fontSize: 24,
          fontWeight: 700,
          color: 'var(--dp-fg)',
          margin: '0 0 8px',
        }}
      >
        Filing Lifecycle
      </h2>
      <p style={{ color: 'var(--dp-fg-muted)', fontSize: 16, margin: '0 0 24px', lineHeight: 1.65 }}>
        Every e-invoice goes through these 5 stages. Webhooks fire at each transition.
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto', paddingBottom: 8 }}>
        {STAGES.map((stage, i) => (
          <React.Fragment key={stage.num}>
            <SurfaceCard style={{ padding: '18px 20px', minWidth: 130, textAlign: 'center' }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: `${stage.color}20`,
                  border: `2px solid ${stage.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 10px',
                  fontSize: 11,
                  fontFamily: 'var(--dp-font-mono)',
                  fontWeight: 700,
                  color: stage.color,
                }}
              >
                {stage.num}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: stage.color, marginBottom: 4 }}>{stage.label}</div>
              <div style={{ fontSize: 11, color: 'var(--dp-fg-dim)', lineHeight: 1.4 }}>{stage.desc}</div>
            </SurfaceCard>
            {i < STAGES.length - 1 && (
              <div style={{ color: 'var(--dp-fg-faint)', padding: '0 6px', flexShrink: 0 }}>
                <DpIcon name="arrow-right" size={16} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function GuideFirstRequest(): React.ReactElement {
  return (
    <div id="first-request" style={{ marginBottom: 48 }}>
      <h2
        style={{
          fontFamily: 'var(--dp-font-display)',
          fontSize: 24,
          fontWeight: 700,
          color: 'var(--dp-fg)',
          margin: '0 0 8px',
        }}
      >
        Your First Request
      </h2>
      <p style={{ color: 'var(--dp-fg-muted)', fontSize: 16, margin: '0 0 20px', lineHeight: 1.65 }}>
        Generate your first IRN in 5 minutes. Use the sandbox environment to test without affecting production.
      </p>

      <Callout variant="info">
        Use <InlineCode>sandbox.whitebooks.dev</InlineCode> and a <InlineCode>sk_sandbox_...</InlineCode> key for testing.
        Test GSTINs are pre-loaded — check the sandbox dashboard for available GSTINs.
      </Callout>

      <CodeBlock tabs={firstRequestTabs} />
    </div>
  );
}

function GuideErrors(): React.ReactElement {
  const ERRORS = [
    { code: 'INVALID_GSTIN', status: 400, message: 'The GSTIN provided is not valid or not registered.' },
    { code: 'IRN_DUPLICATE', status: 409, message: 'An IRN already exists for this invoice number and GSTIN.' },
    { code: 'GSTN_TIMEOUT', status: 504, message: 'GSTN did not respond in time. Retry with exponential backoff.' },
    { code: 'UNAUTHORIZED', status: 401, message: 'API key is missing, invalid, or revoked.' },
    { code: 'RATE_LIMITED', status: 429, message: 'Too many requests. Wait and retry after the Retry-After header.' },
    { code: 'CANCEL_WINDOW_EXPIRED', status: 422, message: 'IRN cancellation is only allowed within 24 hours of generation.' },
  ];

  return (
    <div id="errors" style={{ marginBottom: 48 }}>
      <h2
        style={{
          fontFamily: 'var(--dp-font-display)',
          fontSize: 24,
          fontWeight: 700,
          color: 'var(--dp-fg)',
          margin: '0 0 8px',
        }}
      >
        Error Handling
      </h2>
      <p style={{ color: 'var(--dp-fg-muted)', fontSize: 16, margin: '0 0 20px', lineHeight: 1.65 }}>
        All errors follow a consistent <InlineCode>{`{ error: { code, message, details } }`}</InlineCode> format.
      </p>

      <SurfaceCard style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--dp-border)', background: 'rgba(255,255,255,0.02)' }}>
              {['Error code', 'HTTP status', 'Description'].map(h => (
                <th
                  key={h}
                  style={{
                    padding: '10px 16px',
                    textAlign: 'left',
                    fontFamily: 'var(--dp-font-mono)',
                    fontSize: 11,
                    color: 'var(--dp-fg-dim)',
                    letterSpacing: '0.06em',
                    fontWeight: 500,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ERRORS.map((err, i) => (
              <tr key={err.code} style={{ borderBottom: i < ERRORS.length - 1 ? '1px solid var(--dp-border)' : 'none' }}>
                <td style={{ padding: '10px 16px' }}>
                  <InlineCode>{err.code}</InlineCode>
                </td>
                <td style={{ padding: '10px 16px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--dp-font-mono)',
                      fontSize: 12,
                      color: err.status < 500 ? 'var(--dp-warning)' : 'var(--dp-danger)',
                    }}
                  >
                    {err.status}
                  </span>
                </td>
                <td style={{ padding: '10px 16px', color: 'var(--dp-fg-muted)', lineHeight: 1.5 }}>
                  {err.message}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SurfaceCard>
    </div>
  );
}

function GuideWebhooks(): React.ReactElement {
  const EVENTS = [
    { event: 'einvoice.irn.generated', description: 'IRN successfully generated and QR code attached.' },
    { event: 'einvoice.irn.cancelled', description: 'IRN cancelled within the 24-hour window.' },
    { event: 'eway.generated', description: 'New E-Way Bill created.' },
    { event: 'eway.extended', description: 'E-Way Bill validity extended.' },
    { event: 'eway.cancelled', description: 'E-Way Bill cancelled.' },
    { event: 'gst.return.filed', description: 'GSTR filing acknowledgement received from GSTN.' },
    { event: 'api.key.expiring', description: 'API key expires in 7 days or fewer.' },
  ];

  return (
    <div id="webhooks" style={{ marginBottom: 48 }}>
      <h2
        style={{
          fontFamily: 'var(--dp-font-display)',
          fontSize: 24,
          fontWeight: 700,
          color: 'var(--dp-fg)',
          margin: '0 0 8px',
        }}
      >
        Webhook Events
      </h2>
      <p style={{ color: 'var(--dp-fg-muted)', fontSize: 16, margin: '0 0 20px', lineHeight: 1.65 }}>
        Subscribe to events to get real-time notifications for compliance state changes.
        Payloads are signed with HMAC-SHA256.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {EVENTS.map(ev => (
          <SurfaceCard key={ev.event} style={{ padding: '14px 18px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <DpIcon name="webhook" size={14} style={{ color: 'var(--dp-accent-2)', flexShrink: 0, marginTop: 2 }} />
            <div>
              <InlineCode>{ev.event}</InlineCode>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--dp-fg-muted)' }}>{ev.description}</p>
            </div>
          </SurfaceCard>
        ))}
      </div>
    </div>
  );
}

function GuideChecklist(): React.ReactElement {
  const ITEMS = [
    'Complete KYB / GSTIN verification in dashboard',
    'Generate production API key and store in secrets manager',
    'Implement idempotency keys on all POST requests',
    'Set up webhook endpoint with HMAC signature verification',
    'Configure retry logic with exponential backoff',
    'Test all invoice types (B2B, B2C, B2CL, EXPORT)',
    'Load-test against production rate limits',
    'Enable real-time alert channel (Slack / PagerDuty)',
  ];

  const [checked, setChecked] = useState<Record<number, boolean>>({});

  return (
    <div id="checklist" style={{ marginBottom: 48 }}>
      <h2
        style={{
          fontFamily: 'var(--dp-font-display)',
          fontSize: 24,
          fontWeight: 700,
          color: 'var(--dp-fg)',
          margin: '0 0 8px',
        }}
      >
        Go-Live Checklist
      </h2>
      <p style={{ color: 'var(--dp-fg-muted)', fontSize: 16, margin: '0 0 20px', lineHeight: 1.65 }}>
        Complete all items before switching to your production API key.
      </p>

      <SurfaceCard style={{ padding: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {ITEMS.map((item, i) => (
            <label
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                padding: '10px 0',
                borderBottom: i < ITEMS.length - 1 ? '1px solid var(--dp-border)' : 'none',
                cursor: 'pointer',
              }}
            >
              <span
                onClick={() => setChecked(c => ({ ...c, [i]: !c[i] }))}
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 5,
                  border: `2px solid ${checked[i] ? 'var(--dp-success)' : 'var(--dp-border-strong)'}`,
                  background: checked[i] ? 'rgba(34,197,94,0.15)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: 1,
                  transition: 'border-color 0.15s, background 0.15s',
                  cursor: 'pointer',
                }}
              >
                {checked[i] && <DpIcon name="check" size={11} style={{ color: 'var(--dp-success)' }} />}
              </span>
              <span
                style={{
                  fontSize: 14,
                  color: checked[i] ? 'var(--dp-fg-dim)' : 'var(--dp-fg-muted)',
                  textDecoration: checked[i] ? 'line-through' : 'none',
                  transition: 'color 0.15s',
                }}
              >
                {item}
              </span>
            </label>
          ))}
        </div>
        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              flex: 1,
              height: 4,
              background: 'var(--dp-surface-3)',
              borderRadius: 999,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${(Object.values(checked).filter(Boolean).length / ITEMS.length) * 100}%`,
                background: 'var(--dp-success)',
                borderRadius: 999,
                transition: 'width 0.3s',
              }}
            />
          </div>
          <span style={{ fontSize: 12, color: 'var(--dp-fg-dim)', fontFamily: 'var(--dp-font-mono)', whiteSpace: 'nowrap' }}>
            {Object.values(checked).filter(Boolean).length} / {ITEMS.length}
          </span>
        </div>
      </SurfaceCard>
    </div>
  );
}

/* ─── DpGuide (default export) ───────────────────────────────────────────────── */
export default function DpGuide(): React.ReactElement {
  const [activeSlug, setActiveSlug] = useState('introduction');

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
      <DocSidebar activeSlug={activeSlug} onSelect={setActiveSlug} />

      {/* Main content */}
      <main
        style={{
          flex: 1,
          padding: '40px 48px',
          minWidth: 0,
          borderRight: '1px solid var(--dp-border)',
        }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <GuideHero />
          <GuideArchitecture />
          <GuideAuthAndUrl />
          <GuideLifecycle />
          <GuideFirstRequest />
          <GuideErrors />
          <GuideWebhooks />
          <GuideChecklist />
        </div>
      </main>

      {/* TOC */}
      <TOC />
    </div>
  );
}
