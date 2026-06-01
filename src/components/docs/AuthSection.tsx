import React from 'react';
import { Shield, Key, Lock, Clock, Globe } from 'lucide-react';
import { CodeBlock } from '../../pages/developer/DpComponents';
import type { CodeTab } from '../../pages/developer/DpComponents';

const authFeatures = [
  { icon: Shield, label: 'OAuth 2.0',          desc: 'Client credentials flow' },
  { icon: Key,    label: 'Bearer tokens',       desc: 'Authorization header' },
  { icon: Lock,   label: 'TLS 1.2+',            desc: 'All traffic encrypted' },
  { icon: Clock,  label: '1-hour expiry',       desc: 'Tokens auto-expire' },
  { icon: Globe,  label: 'IP allow-listing',    desc: 'Optional per-account' },
];

const curlAuthTabs: CodeTab[] = [
  {
    label: 'cURL',
    lines: [
      [['com', '# Step 1: Exchange credentials for a bearer token']],
      [['fn', 'curl'], ['', ' -X POST \\']],
      [['str', "  'https://api.whitebooks.in/oauth/token'"], ['', ' \\']],
      [['', '  -H '], ['str', "'Content-Type: application/x-www-form-urlencoded'"], ['', ' \\']],
      [['', '  -d '], ['str', "'grant_type=client_credentials'"], ['', ' \\']],
      [['', '  -d '], ['str', "'client_id=YOUR_CLIENT_ID'"], ['', ' \\']],
      [['', '  -d '], ['str', "'client_secret=YOUR_CLIENT_SECRET'"]],
    ],
  },
];

const bearerTabs: CodeTab[] = [
  {
    label: 'Response',
    lines: [
      [['pun', '{']],
      [['key', '  "access_token"'], ['pun', ': '], ['str', '"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."'], ['pun', ',']],
      [['key', '  "token_type"'],   ['pun', ': '], ['str', '"Bearer"'], ['pun', ',']],
      [['key', '  "expires_in"'],   ['pun', ': '], ['num', '3600']],
      [['pun', '}']],
    ],
  },
  {
    label: 'Usage',
    lines: [
      [['com', '# Step 2: Use the token in subsequent API calls']],
      [['fn', 'curl'], ['', ' -X POST \\']],
      [['str', "  'https://api.whitebooks.in/api/v1/gstr1/file'"], ['', ' \\']],
      [['', '  -H '], ['str', "'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...'"], ['', ' \\']],
      [['', '  -H '], ['str', "'Content-Type: application/json'"], ['', ' \\']],
      [['', "  -d "], ['str', "'{ \"gstin\": \"29AAAAA0000A1Z5\", \"period\": \"2026-04\" }'"]],
    ],
  },
];

export default function AuthSection(): React.ReactElement {
  return (
    <section style={{ padding: '0 0 64px' }}>
      {/* Heading */}
      <div style={{ marginBottom: 32 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'var(--dp-accent-soft)',
            border: '1px solid var(--dp-accent-line)',
            borderRadius: 999,
            padding: '4px 14px 4px 10px',
            marginBottom: 16,
          }}
        >
          <Key size={13} color="var(--dp-accent-2)" />
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--dp-accent-2)', fontFamily: 'var(--dp-font-mono)' }}>
            Authentication
          </span>
        </div>
        <h2
          style={{
            fontFamily: 'var(--dp-font-display)',
            fontSize: 28,
            fontWeight: 700,
            color: 'var(--dp-fg)',
            margin: '0 0 10px',
            letterSpacing: '-0.01em',
          }}
        >
          Secure OAuth 2.0 Authentication
        </h2>
        <p style={{ fontSize: 15, color: 'var(--dp-fg-muted)', margin: 0, maxWidth: 600 }}>
          All API calls require a Bearer token obtained via the client credentials flow. Tokens expire
          after 1 hour — implement token refresh logic in your integration.
        </p>
      </div>

      {/* Features row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 32 }}>
        {authFeatures.map(({ icon: Icon, label, desc }) => (
          <div
            key={label}
            style={{
              background: 'var(--dp-surface)',
              border: '1px solid var(--dp-border)',
              borderRadius: 10,
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Icon size={15} color="var(--dp-accent-2)" />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--dp-fg)' }}>{label}</div>
              <div style={{ fontSize: 12, color: 'var(--dp-fg-dim)' }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Code blocks */}
      <div style={{ display: 'grid', gap: 16 }}>
        <CodeBlock tabs={curlAuthTabs} />
        <CodeBlock tabs={bearerTabs} />
      </div>

      {/* Environment URLs */}
      <div
        style={{
          marginTop: 24,
          background: 'var(--dp-surface)',
          border: '1px solid var(--dp-border)',
          borderRadius: 12,
          padding: '20px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 32,
        }}
      >
        <div>
          <div style={{ fontSize: 11, fontFamily: 'var(--dp-font-mono)', color: 'var(--dp-fg-dim)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Sandbox OAuth</div>
          <code style={{ fontFamily: 'var(--dp-font-mono)', fontSize: 13, color: 'var(--dp-success)' }}>
            https://apisandbox.whitebooks.in/oauth/token
          </code>
        </div>
        <div>
          <div style={{ fontSize: 11, fontFamily: 'var(--dp-font-mono)', color: 'var(--dp-fg-dim)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Production OAuth</div>
          <code style={{ fontFamily: 'var(--dp-font-mono)', fontSize: 13, color: 'var(--dp-accent-2)' }}>
            https://api.whitebooks.in/oauth/token
          </code>
        </div>
      </div>
    </section>
  );
}
