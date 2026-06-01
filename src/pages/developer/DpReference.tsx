import React, { useState } from 'react';
import { CodeBlock, SurfaceCard, InlineCode, Pill, MethodBadge } from './DpComponents';
import DpIcon from './DpIcon';
import type { CodeTab, HttpMethod } from './DpComponents';

/* ─── Sidebar data ───────────────────────────────────────────────────────────── */
interface RefSidebarItem {
  method: HttpMethod;
  label: string;
  slug: string;
}

interface RefSidebarGroup {
  heading: string;
  items: RefSidebarItem[];
}

const REF_SIDEBAR_GROUPS: RefSidebarGroup[] = [
  {
    heading: 'GST Returns',
    items: [
      { method: 'GET', label: 'Get returns', slug: 'gst-get' },
      { method: 'POST', label: 'File GSTR-1', slug: 'gst-file' },
      { method: 'GET', label: 'Reconciliation', slug: 'gst-reconcile' },
    ],
  },
  {
    heading: 'E-Invoice',
    items: [
      { method: 'POST', label: 'Generate IRN', slug: 'einvoice-generate' },
      { method: 'GET', label: 'Get by IRN', slug: 'einvoice-get' },
      { method: 'DELETE', label: 'Cancel IRN', slug: 'einvoice-cancel' },
      { method: 'POST', label: 'Bulk generate', slug: 'einvoice-bulk' },
    ],
  },
  {
    heading: 'E-Way Bill',
    items: [
      { method: 'POST', label: 'Generate EWB', slug: 'eway-generate' },
      { method: 'PUT', label: 'Update Part-B', slug: 'eway-partb' },
      { method: 'DELETE', label: 'Cancel EWB', slug: 'eway-cancel' },
    ],
  },
  {
    heading: 'KSA E-Invoice',
    items: [
      { method: 'POST', label: 'Generate invoice', slug: 'ksa-generate' },
      { method: 'POST', label: 'Clearance', slug: 'ksa-clearance' },
    ],
  },
  {
    heading: 'Utilities',
    items: [
      { method: 'GET', label: 'GSTIN lookup', slug: 'gstin-lookup' },
      { method: 'GET', label: 'HSN validator', slug: 'hsn-validate' },
    ],
  },
];

/* ─── Reference Sidebar ──────────────────────────────────────────────────────── */
interface RefSidebarProps {
  activeSlug: string;
  onSelect: (slug: string) => void;
}

function RefSidebar({ activeSlug, onSelect }: RefSidebarProps): React.ReactElement {
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
      <div
        style={{
          padding: '0 16px 14px',
          borderBottom: '1px solid var(--dp-border)',
          marginBottom: 8,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontFamily: 'var(--dp-font-mono)',
            color: 'var(--dp-fg-faint)',
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            marginBottom: 4,
          }}
        >
          API Reference
        </div>
        <div style={{ fontSize: 12, color: 'var(--dp-fg-dim)' }}>v3.4.0 — Jan 2024</div>
      </div>

      {REF_SIDEBAR_GROUPS.map(group => (
        <div key={group.heading} style={{ marginBottom: 4 }}>
          <div
            style={{
              padding: '7px 16px',
              fontSize: 11,
              fontFamily: 'var(--dp-font-mono)',
              color: 'var(--dp-fg-dim)',
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
            }}
          >
            {group.heading}
          </div>
          {group.items.map(item => {
            const isActive = item.slug === activeSlug;
            return (
              <button
                key={item.slug}
                onClick={() => onSelect(item.slug)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '7px 16px 7px 20px',
                  background: isActive ? 'var(--dp-accent-soft)' : 'none',
                  border: 'none',
                  borderLeft: isActive ? '2px solid var(--dp-accent)' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'background 0.1s',
                  textAlign: 'left',
                }}
              >
                <MethodBadge method={item.method} />
                <span style={{ fontSize: 13, color: isActive ? 'var(--dp-fg)' : 'var(--dp-fg-muted)' }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      ))}
    </aside>
  );
}

/* ─── Code tabs ───────────────────────────────────────────────────────────────── */
const refCodeTabs: CodeTab[] = [
  {
    label: 'Node.js',
    lines: [
      [['kw', 'const'], ['', ' result = '], ['kw', 'await'], ['', ' client'], ['pun', '.'], ['fn', 'gst'], ['pun', '.'], ['fn', 'returns'], ['pun', '({']],
      [['', '  gstin: '], ['str', '"29AAGCW7302R1ZF"'], ['pun', ',']],
      [['', '  period: '], ['str', '"2024-01"'], ['pun', ',']],
      [['', '  include: '], ['pun', '['], ['str', '"b2b"'], ['pun', ','], ['', ' '], ['str', '"b2cs"'], ['pun', '],']],
      [['', '  forceRefresh: '], ['kw', 'false'], ['pun', ',']],
      [['pun', '});']],
    ],
  },
  {
    label: 'Python',
    lines: [
      [['fn', 'result'], ['', ' = client'], ['pun', '.'], ['fn', 'gst'], ['pun', '.'], ['fn', 'returns'], ['pun', '(']],
      [['', '  gstin='], ['str', '"29AAGCW7302R1ZF"'], ['pun', ',']],
      [['', '  period='], ['str', '"2024-01"'], ['pun', ',']],
      [['', '  include=['], ['str', '"b2b"'], ['pun', ','], ['', ' '], ['str', '"b2cs"'], ['pun', '],']],
      [['', '  force_refresh='], ['kw', 'False']],
      [['pun', ')']],
    ],
  },
  {
    label: 'Go',
    lines: [
      [['fn', 'result'], ['pun', ','], ['', ' err '], ['pun', ':='], ['', ' client'], ['pun', '.'], ['fn', 'GST'], ['pun', '.'], ['fn', 'Returns'], ['pun', '('], ['fn', 'ctx'], ['pun', ','], ['', ' &whitebooks'], ['pun', '.'], ['fn', 'GSTReturnsParams'], ['pun', '{']],
      [['', '  GSTIN:       '], ['str', '"29AAGCW7302R1ZF"'], ['pun', ',']],
      [['', '  Period:      '], ['str', '"2024-01"'], ['pun', ',']],
      [['', '  Include:     '], ['pun', '[]'], ['fn', 'string'], ['pun', '{'], ['str', '"b2b"'], ['pun', ','], ['str', '"b2cs"'], ['pun', '},']],
      [['pun', '})']],
    ],
  },
  {
    label: 'cURL',
    lines: [
      [['fn', 'curl'], ['', ' \\']],
      [['', '  -H '], ['str', '"Authorization: Bearer $WB_KEY"'], ['', ' \\']],
      [['', '  '], ['str', '"https://api.whitebooks.dev/v3/gst/returns?gstin=29AAGCW7302R1ZF&period=2024-01"']],
    ],
  },
];

/* ─── Ref Header ──────────────────────────────────────────────────────────────── */
function RefHeader(): React.ReactElement {
  return (
    <div style={{ marginBottom: 36, paddingBottom: 32, borderBottom: '1px solid var(--dp-border)' }}>
      {/* Method + endpoint */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <MethodBadge method="GET" />
        <span
          style={{
            fontFamily: 'var(--dp-font-mono)',
            fontSize: 15,
            color: 'var(--dp-fg)',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--dp-border)',
            borderRadius: 7,
            padding: '4px 14px',
          }}
        >
          /v3/gst/returns
        </span>
      </div>

      <h1
        style={{
          fontFamily: 'var(--dp-font-display)',
          fontSize: 30,
          fontWeight: 800,
          color: 'var(--dp-fg)',
          margin: '0 0 12px',
        }}
      >
        Get GST Returns
      </h1>

      <p style={{ color: 'var(--dp-fg-muted)', fontSize: 15, margin: '0 0 20px', lineHeight: 1.65, maxWidth: 600 }}>
        Retrieve GST returns data for a specific GSTIN and filing period.
        Includes B2B invoices, B2C summary, CDNR, and export invoices.
      </p>

      {/* Metadata row */}
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        {[
          { label: 'Version', value: 'v3.4' },
          { label: 'Auth', value: 'Bearer token' },
          { label: 'Rate limit', value: '600 / min' },
          { label: 'Cache', value: '5 min (conditional)' },
        ].map(m => (
          <div key={m.label} style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13 }}>
            <span style={{ color: 'var(--dp-fg-dim)' }}>{m.label}:</span>
            <span style={{ color: 'var(--dp-fg-muted)', fontFamily: 'var(--dp-font-mono)', fontSize: 12 }}>{m.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Params block ────────────────────────────────────────────────────────────── */
interface Param {
  name: string;
  in: string;
  type: string;
  required: boolean;
  description: string;
  example?: string;
}

const PARAMS: Param[] = [
  {
    name: 'gstin',
    in: 'query',
    type: 'string',
    required: true,
    description: 'The 15-character GSTIN of the taxpayer. Must be a valid, active GSTIN registered on the GSTN.',
    example: '29AAGCW7302R1ZF',
  },
  {
    name: 'period',
    in: 'query',
    type: 'string',
    required: true,
    description: 'Filing period in YYYY-MM format. Must be a valid return filing period.',
    example: '2024-01',
  },
  {
    name: 'include',
    in: 'query',
    type: 'string[]',
    required: false,
    description: 'Array of section codes to include. Valid values: b2b, b2cs, b2cl, exp, cdnr, nil.',
    example: 'b2b,b2cs',
  },
  {
    name: 'forceRefresh',
    in: 'query',
    type: 'boolean',
    required: false,
    description: 'Skip cache and force a fresh fetch from GSTN. Counts against rate limits.',
    example: 'false',
  },
];

function ParamsBlock(): React.ReactElement {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ gstin: true });

  return (
    <div style={{ marginBottom: 36 }}>
      <h3
        style={{
          fontFamily: 'var(--dp-font-display)',
          fontSize: 18,
          fontWeight: 700,
          color: 'var(--dp-fg)',
          margin: '0 0 16px',
        }}
      >
        Parameters
      </h3>
      <SurfaceCard style={{ overflow: 'hidden' }}>
        {PARAMS.map((p, i) => (
          <div
            key={p.name}
            style={{ borderBottom: i < PARAMS.length - 1 ? '1px solid var(--dp-border)' : 'none' }}
          >
            <button
              onClick={() => setExpanded(e => ({ ...e, [p.name]: !e[p.name] }))}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 18px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <DpIcon
                name={expanded[p.name] ? 'chevron-down' : 'chevron-right'}
                size={13}
                style={{ color: 'var(--dp-fg-dim)', flexShrink: 0 }}
              />
              <InlineCode>{p.name}</InlineCode>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: 'var(--dp-font-mono)',
                  color: 'var(--dp-fg-dim)',
                  background: 'rgba(255,255,255,0.04)',
                  padding: '1px 6px',
                  borderRadius: 4,
                  border: '1px solid var(--dp-border)',
                }}
              >
                {p.type}
              </span>
              <span style={{ fontSize: 11, fontFamily: 'var(--dp-font-mono)', color: 'var(--dp-fg-dim)' }}>
                {p.in}
              </span>
              {p.required && (
                <Pill style={{ fontSize: 10, padding: '1px 8px' }}>required</Pill>
              )}
            </button>
            {expanded[p.name] && (
              <div
                style={{
                  padding: '0 18px 14px 44px',
                  fontSize: 13,
                  color: 'var(--dp-fg-muted)',
                  lineHeight: 1.6,
                }}
              >
                <p style={{ margin: '0 0 8px' }}>{p.description}</p>
                {p.example && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                    <span style={{ color: 'var(--dp-fg-dim)' }}>Example:</span>
                    <InlineCode>{p.example}</InlineCode>
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </SurfaceCard>
    </div>
  );
}

/* ─── Responses block ─────────────────────────────────────────────────────────── */
const RESPONSE_FIELDS = [
  { field: 'gstin', type: 'string', description: 'GSTIN of the taxpayer.' },
  { field: 'period', type: 'string', description: 'Return period (YYYY-MM).' },
  { field: 'status', type: 'string', description: '"filed" | "pending" | "not_applicable"' },
  { field: 'filedAt', type: 'string (ISO 8601)', description: 'Timestamp when the return was filed.' },
  { field: 'b2b', type: 'B2BSection[]', description: 'Array of B2B invoice sections.' },
  { field: 'b2cs', type: 'B2CSSection[]', description: 'B2C small invoice summary.' },
  { field: 'meta.cachedAt', type: 'string', description: 'When this response was cached by WhiteBooks.' },
  { field: 'meta.source', type: '"gstn" | "cache"', description: 'Whether response is fresh or from cache.' },
];

function ResponsesBlock(): React.ReactElement {
  return (
    <div style={{ marginBottom: 36 }}>
      <h3
        style={{
          fontFamily: 'var(--dp-font-display)',
          fontSize: 18,
          fontWeight: 700,
          color: 'var(--dp-fg)',
          margin: '0 0 8px',
        }}
      >
        Response fields
      </h3>
      <div
        style={{
          fontSize: 12,
          fontFamily: 'var(--dp-font-mono)',
          color: 'var(--dp-success)',
          background: 'rgba(34,197,94,0.06)',
          border: '1px solid rgba(34,197,94,0.2)',
          borderRadius: 6,
          padding: '4px 12px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          marginBottom: 14,
        }}
      >
        <span style={{ fontWeight: 700 }}>200</span> OK
      </div>

      <SurfaceCard style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--dp-border)', background: 'rgba(255,255,255,0.02)' }}>
              {['Field', 'Type', 'Description'].map(h => (
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
            {RESPONSE_FIELDS.map((f, i) => (
              <tr key={f.field} style={{ borderBottom: i < RESPONSE_FIELDS.length - 1 ? '1px solid var(--dp-border)' : 'none' }}>
                <td style={{ padding: '10px 16px' }}>
                  <InlineCode>{f.field}</InlineCode>
                </td>
                <td style={{ padding: '10px 16px', fontFamily: 'var(--dp-font-mono)', fontSize: 12, color: 'var(--dp-fg-dim)' }}>
                  {f.type}
                </td>
                <td style={{ padding: '10px 16px', color: 'var(--dp-fg-muted)', lineHeight: 1.5 }}>{f.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SurfaceCard>
    </div>
  );
}

/* ─── Errors block ────────────────────────────────────────────────────────────── */
const REF_ERRORS = [
  { status: 400, code: 'INVALID_GSTIN', description: 'Provided GSTIN is malformed or inactive.' },
  { status: 401, code: 'UNAUTHORIZED', description: 'Invalid or missing API key.' },
  { status: 404, code: 'RETURN_NOT_FOUND', description: 'No return filed for the requested period.' },
  { status: 429, code: 'RATE_LIMITED', description: 'Exceeded 600 requests / minute. Retry after header set.' },
  { status: 503, code: 'GSTN_UNAVAILABLE', description: 'GSTN is temporarily unavailable. Retry with backoff.' },
];

function ErrorsBlock(): React.ReactElement {
  return (
    <div style={{ marginBottom: 36 }}>
      <h3
        style={{
          fontFamily: 'var(--dp-font-display)',
          fontSize: 18,
          fontWeight: 700,
          color: 'var(--dp-fg)',
          margin: '0 0 16px',
        }}
      >
        Error responses
      </h3>
      <SurfaceCard style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--dp-border)', background: 'rgba(255,255,255,0.02)' }}>
              {['Status', 'Error code', 'Description'].map(h => (
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
            {REF_ERRORS.map((err, i) => (
              <tr key={err.code} style={{ borderBottom: i < REF_ERRORS.length - 1 ? '1px solid var(--dp-border)' : 'none' }}>
                <td style={{ padding: '10px 16px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--dp-font-mono)',
                      fontSize: 12,
                      color: err.status >= 500 ? 'var(--dp-danger)' : err.status >= 400 ? 'var(--dp-warning)' : 'var(--dp-success)',
                      fontWeight: 600,
                    }}
                  >
                    {err.status}
                  </span>
                </td>
                <td style={{ padding: '10px 16px' }}>
                  <InlineCode>{err.code}</InlineCode>
                </td>
                <td style={{ padding: '10px 16px', color: 'var(--dp-fg-muted)' }}>{err.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SurfaceCard>
    </div>
  );
}

/* ─── Try It Panel ────────────────────────────────────────────────────────────── */
type EnvMode = 'sandbox' | 'production';

function TryItPanel(): React.ReactElement {
  const [env, setEnv] = useState<EnvMode>('sandbox');
  const [gstin, setGstin] = useState('29AAGCW7302R1ZF');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  const mockResponse = `{
  "gstin": "${gstin}",
  "period": "2024-01",
  "status": "filed",
  "filedAt": "2024-02-11T08:22:00Z",
  "b2b": [ /* 42 records */ ],
  "meta": {
    "cachedAt": "2024-01-29T10:31:02Z",
    "source": "cache"
  }
}`;

  return (
    <SurfaceCard style={{ padding: 24, marginBottom: 36 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h3
          style={{
            fontFamily: 'var(--dp-font-display)',
            fontSize: 16,
            fontWeight: 700,
            color: 'var(--dp-fg)',
            margin: 0,
          }}
        >
          Try it
        </h3>

        {/* Env toggle */}
        <div
          style={{
            display: 'flex',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--dp-border)',
            borderRadius: 8,
            padding: 2,
          }}
        >
          {(['sandbox', 'production'] as EnvMode[]).map(e => (
            <button
              key={e}
              onClick={() => setEnv(e)}
              style={{
                background: env === e ? (e === 'production' ? 'var(--dp-accent)' : 'rgba(255,255,255,0.08)') : 'none',
                border: 'none',
                borderRadius: 6,
                padding: '4px 12px',
                fontSize: 12,
                fontFamily: 'var(--dp-font-mono)',
                color: env === e ? (e === 'production' ? '#fff' : 'var(--dp-fg)') : 'var(--dp-fg-dim)',
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      {/* GSTIN input */}
      <div style={{ marginBottom: 14 }}>
        <label style={{ fontSize: 12, color: 'var(--dp-fg-dim)', display: 'block', marginBottom: 6, fontFamily: 'var(--dp-font-mono)' }}>
          gstin <span style={{ color: 'var(--dp-accent-2)' }}>*</span>
        </label>
        <input
          value={gstin}
          onChange={e => setGstin(e.target.value)}
          style={{
            width: '100%',
            background: '#0f0f17',
            border: '1px solid var(--dp-border)',
            borderRadius: 7,
            padding: '8px 12px',
            fontSize: 13,
            fontFamily: 'var(--dp-font-mono)',
            color: 'var(--dp-fg)',
            outline: 'none',
          }}
        />
      </div>

      <button
        onClick={handleSend}
        disabled={loading}
        style={{
          width: '100%',
          background: loading ? 'rgba(220,47,101,0.5)' : 'var(--dp-accent)',
          border: 'none',
          borderRadius: 8,
          padding: '10px',
          fontSize: 13,
          fontWeight: 600,
          color: '#fff',
          cursor: loading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          marginBottom: sent ? 14 : 0,
          transition: 'background 0.15s',
        }}
      >
        <DpIcon name={loading ? 'activity' : 'play'} size={13} />
        {loading ? 'Sending...' : 'Send request'}
      </button>

      {/* Response preview */}
      {sent && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span
              style={{
                fontFamily: 'var(--dp-font-mono)',
                fontSize: 12,
                color: 'var(--dp-success)',
                fontWeight: 700,
              }}
            >
              200 OK
            </span>
            <span style={{ fontSize: 12, color: 'var(--dp-fg-dim)', fontFamily: 'var(--dp-font-mono)' }}>89ms</span>
          </div>
          <pre
            style={{
              background: '#0f0f17',
              border: '1px solid var(--dp-border)',
              borderRadius: 8,
              padding: '12px 14px',
              fontFamily: 'var(--dp-font-mono)',
              fontSize: 12,
              color: '#a5e3a1',
              overflowX: 'auto',
              margin: 0,
            }}
          >
            {mockResponse}
          </pre>
        </div>
      )}
    </SurfaceCard>
  );
}

/* ─── Related Endpoints ────────────────────────────────────────────────────────── */
const RELATED = [
  { method: 'POST' as HttpMethod, label: 'File GSTR-1', path: '/v3/gst/file', description: 'Submit a GSTR-1 return.' },
  { method: 'GET' as HttpMethod, label: 'Reconciliation', path: '/v3/gst/reconcile', description: 'Reconcile GSTR-2A vs purchase register.' },
  { method: 'POST' as HttpMethod, label: 'Generate IRN', path: '/v3/einvoice/generate', description: 'Generate an IRN for a B2B invoice.' },
];

function RelatedEndpoints(): React.ReactElement {
  return (
    <div style={{ marginBottom: 36 }}>
      <h3
        style={{
          fontFamily: 'var(--dp-font-display)',
          fontSize: 18,
          fontWeight: 700,
          color: 'var(--dp-fg)',
          margin: '0 0 16px',
        }}
      >
        Related endpoints
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {RELATED.map(r => (
          <SurfaceCard key={r.path} style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
            <MethodBadge method={r.method} />
            <InlineCode>{r.path}</InlineCode>
            <span style={{ fontSize: 13, color: 'var(--dp-fg-muted)', flex: 1 }}>{r.description}</span>
            <DpIcon name="arrow-right" size={13} style={{ color: 'var(--dp-fg-faint)' }} />
          </SurfaceCard>
        ))}
      </div>
    </div>
  );
}

/* ─── DpReference (default export) ──────────────────────────────────────────── */
export default function DpReference(): React.ReactElement {
  const [activeSlug, setActiveSlug] = useState('gst-get');

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
      <RefSidebar activeSlug={activeSlug} onSelect={setActiveSlug} />

      {/* Main */}
      <main style={{ flex: 1, padding: '40px 48px', minWidth: 0, overflowX: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 40, maxWidth: 1100 }}>
          {/* Left col */}
          <div>
            <RefHeader />
            <ParamsBlock />
            <ResponsesBlock />
            <ErrorsBlock />
            <TryItPanel />
            <RelatedEndpoints />
          </div>

          {/* Right col — code */}
          <div>
            <div
              style={{
                position: 'sticky',
                top: 80,
              }}
            >
              <CodeBlock tabs={refCodeTabs} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
