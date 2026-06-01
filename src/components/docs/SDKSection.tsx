import React from 'react';
import { Package, ExternalLink } from 'lucide-react';
import { CodeBlock } from '../../pages/developer/DpComponents';
import { sdks } from '../../data/sdk';
import type { CodeTab } from '../../pages/developer/DpComponents';

function sdkToCodeTab(installPrefix: string, installCmd: string, language: string): CodeTab {
  if (language === 'Java') {
    return {
      label: 'Maven',
      lines: [
        [['pun', '<dependency>']],
        [['', '  '], ['key', '<groupId>'], ['str', 'com.whitebooks'], ['key', '</groupId>']],
        [['', '  '], ['key', '<artifactId>'], ['str', 'whitebooks-sdk'], ['key', '</artifactId>']],
        [['', '  '], ['key', '<version>'], ['str', '2.0.3'], ['key', '</version>']],
        [['pun', '</dependency>']],
      ],
    };
  }
  return {
    label: installPrefix.startsWith('npm') ? 'npm' : 'pip',
    lines: [
      [['fn', installPrefix.split(' ')[0]], ['', ` ${installPrefix.split(' ').slice(1).join(' ')} `], ['str', installCmd]],
    ],
  };
}

export default function SDKSection(): React.ReactElement {
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
          <Package size={13} color="var(--dp-accent-2)" />
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--dp-accent-2)', fontFamily: 'var(--dp-font-mono)' }}>
            SDKs
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
          Official SDKs
        </h2>
        <p style={{ fontSize: 14, color: 'var(--dp-fg-muted)', margin: 0 }}>
          Drop-in libraries for the most popular backend ecosystems.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 16,
        }}
      >
        {sdks.map(sdk => (
          <div
            key={sdk.language}
            style={{
              background: 'var(--dp-surface)',
              border: '1px solid var(--dp-border)',
              borderRadius: 14,
              overflow: 'hidden',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--dp-accent-line)')}
            onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--dp-border)')}
          >
            {/* Header */}
            <div
              style={{
                padding: '16px 20px 12px',
                borderBottom: '1px solid var(--dp-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--dp-fg)', marginBottom: 2 }}>
                  {sdk.language}
                </div>
                <div style={{ fontSize: 12, fontFamily: 'var(--dp-font-mono)', color: 'var(--dp-fg-dim)' }}>
                  v{sdk.version}
                </div>
              </div>
              <a
                href={sdk.repoUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 12,
                  color: 'var(--dp-fg-dim)',
                  textDecoration: 'none',
                  background: 'var(--dp-surface-2)',
                  border: '1px solid var(--dp-border)',
                  borderRadius: 7,
                  padding: '4px 10px',
                }}
              >
                GitHub <ExternalLink size={11} />
              </a>
            </div>

            {/* Install */}
            <div style={{ padding: '12px' }}>
              <CodeBlock tabs={[sdkToCodeTab(sdk.installPrefix, sdk.installCmd, sdk.language)]} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
