import React from 'react';
import { Layers, ArrowRight } from 'lucide-react';
import { integrations } from '../../data/integrations';

export default function IntegrationsSection(): React.ReactElement {
  return (
    <section style={{ padding: '0 0 64px' }}>
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'var(--dp-accent-soft)',
            border: '1px solid var(--dp-accent-line)',
            borderRadius: 999,
            padding: '4px 14px 4px 10px',
            marginBottom: 14,
          }}
        >
          <Layers size={13} color="var(--dp-accent-2)" />
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--dp-accent-2)', fontFamily: 'var(--dp-font-mono)' }}>
            Integrations
          </span>
        </div>
        <h2
          style={{
            fontFamily: 'var(--dp-font-display)',
            fontSize: 24,
            fontWeight: 700,
            color: 'var(--dp-fg)',
            margin: '0 0 6px',
          }}
        >
          Enterprise ERP Integrations
        </h2>
        <p style={{ fontSize: 14, color: 'var(--dp-fg-muted)', margin: 0 }}>
          Certified connectors for major ERP and accounting platforms.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 16,
        }}
      >
        {integrations.map(integration => (
          <div
            key={integration.name}
            style={{
              background: 'var(--dp-surface)',
              border: '1px solid var(--dp-border)',
              borderRadius: 14,
              padding: '22px',
              cursor: 'pointer',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--dp-accent-line)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 0 1px var(--dp-accent-line), 0 8px 24px rgba(220,47,101,0.07)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--dp-border)';
              (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--dp-fg)', marginBottom: 3 }}>
                  {integration.name}
                </div>
                <span
                  style={{
                    background: 'var(--dp-surface-2)',
                    border: '1px solid var(--dp-border)',
                    color: 'var(--dp-fg-dim)',
                    borderRadius: 999,
                    padding: '1px 8px',
                    fontSize: 11,
                    fontFamily: 'var(--dp-font-mono)',
                  }}
                >
                  {integration.category}
                </span>
              </div>
              <ArrowRight size={15} color="var(--dp-fg-faint)" />
            </div>
            <p style={{ fontSize: 13, color: 'var(--dp-fg-muted)', margin: 0, lineHeight: 1.6 }}>
              {integration.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
