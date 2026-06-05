import React from 'react';
import {
  Shield,
  FileText,
  Search,
  Receipt,
  Truck,
  Network,
} from 'lucide-react';

const badges = [
  'GSP Licensed',
  'OpenAPI 3.0',
  'Sandbox + Production',
  'Java / Node / Python SDKs',
];

const features = [
  { icon: FileText, label: 'GST Return Filing', desc: 'GSTR-1, 3B, 9, 9C, and more' },
  { icon: Shield, label: 'ITC Reconciliation', desc: 'GSTR-2B match and ITC claims' },
  { icon: Search, label: 'GSTIN Verification', desc: 'Real-time taxpayer lookup' },
  { icon: Receipt, label: 'e-Invoicing', desc: 'IRN generation via IRP' },
  { icon: Truck, label: 'e-Way Bill APIs', desc: 'Generate, update, cancel EWBs' },
  { icon: Network, label: 'ERP Integrations', desc: 'SAP, Oracle, Dynamics, Tally' },
];

export default function ApiHero(): React.ReactElement {
  return (
    <section
      style={{
        padding: '80px 24px 64px',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      {/* Badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
        {badges.map(b => (
          <span
            key={b}
            style={{
              background: 'var(--dp-accent-soft)',
              border: '1px solid var(--dp-accent-line)',
              color: 'var(--dp-accent-2)',
              borderRadius: 999,
              padding: '3px 12px',
              fontSize: 12,
              fontWeight: 600,
              fontFamily: 'var(--dp-font-mono)',
              letterSpacing: '0.02em',
            }}
          >
            {b}
          </span>
        ))}
      </div>

      {/* Title */}
      <h1
        style={{
          fontFamily: 'var(--dp-font-display)',
          fontSize: 'clamp(36px, 5vw, 60px)',
          fontWeight: 700,
          lineHeight: 1.1,
          color: 'var(--dp-fg)',
          margin: '0 0 20px',
          letterSpacing: '-0.02em',
        }}
      >
        GST API for{' '}
        <span
          style={{
            background: 'linear-gradient(135deg, #dc2f65, #ff4d80)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Developers
        </span>
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 18,
          lineHeight: 1.7,
          color: 'var(--dp-fg-muted)',
          maxWidth: 700,
          margin: '0 0 48px',
        }}
      >
        GSTR-1/3B/9 filing, ITC reconciliation, GSTR-2B match, GSTIN verification, HSN lookup, and
        e-Invoicing APIs powered by WhiteBooks GSP infrastructure.
      </p>

      {/* Feature grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 16,
        }}
      >
        {features.map(({ icon: Icon, label, desc }) => (
          <div
            key={label}
            style={{
              background: 'var(--dp-surface)',
              border: '1px solid var(--dp-border)',
              borderRadius: 14,
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--dp-accent-line)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 0 1px var(--dp-accent-line), 0 8px 24px rgba(220,47,101,0.08)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--dp-border)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'var(--dp-accent-soft)',
                border: '1px solid var(--dp-accent-line)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--dp-accent-2)',
              }}
            >
              <Icon size={18} />
            </div>
            <div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: 'var(--dp-fg)',
                  marginBottom: 4,
                }}
              >
                {label}
              </div>
              <div style={{ fontSize: 13, color: 'var(--dp-fg-muted)' }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
