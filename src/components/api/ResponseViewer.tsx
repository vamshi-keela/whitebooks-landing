import React, { useState, memo } from 'react';
import type { NormalizedOperation } from '@/data/openapi-spec';
import { useSpec } from '../../contexts/SpecContext';
import { getResponseExample } from '../../utils/generateExamples';
import RecursiveSchemaRenderer from './RecursiveSchemaRenderer';
import JsonTree from './JsonTree';

interface Props {
  operation: NormalizedOperation;
}

function statusColor(code: string): { text: string; bg: string } {
  const n = parseInt(code);
  if (n >= 200 && n < 300) return { text: 'var(--dp-status-2xx)', bg: 'var(--dp-status-2xx-bg)' };
  if (n >= 400 && n < 500) return { text: 'var(--dp-status-4xx)', bg: 'var(--dp-status-4xx-bg)' };
  if (n >= 500) return { text: 'var(--dp-status-5xx)', bg: 'var(--dp-status-5xx-bg)' };
  return { text: 'var(--dp-fg-muted)', bg: 'var(--dp-surface)' };
}

export default memo(function ResponseViewer({ operation }: Props): React.ReactElement {
  const { spec } = useSpec();
  const responses = operation.responses ?? {};
  const codes = Object.keys(responses);
  const [activeCode, setActiveCode] = useState(codes[0] ?? '200');
  const [activeTab, setActiveTab] = useState<'schema' | 'example'>('example');

  if (!codes.length) return <></>;

  const resp = responses[activeCode];
  const contentSchema = resp?.content?.['application/json']?.schema;
  const exampleJson = getResponseExample(operation, activeCode, spec);

  return (
    <div>
      {/* Status code pills */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        {codes.map(code => {
          const col = statusColor(code);
          const isActive = code === activeCode;
          return (
            <button
              key={code}
              onClick={() => setActiveCode(code)}
              style={{
                background: isActive ? col.bg : 'var(--dp-surface)',
                border: `1px solid ${isActive ? col.text + '40' : 'var(--dp-border)'}`,
                borderRadius: 7,
                padding: '4px 10px',
                fontSize: 12,
                fontFamily: 'var(--dp-font-mono)',
                color: isActive ? col.text : 'var(--dp-fg-muted)',
                cursor: 'pointer',
                fontWeight: isActive ? 700 : 400,
                transition: 'all 0.15s',
              }}
            >
              {code}
            </button>
          );
        })}
      </div>

      {/* Response description */}
      {resp?.description && (
        <div style={{ fontSize: 13.5, color: 'var(--dp-fg-muted)', marginBottom: 10, lineHeight: 1.6 }}>
          {resp.description}
        </div>
      )}

      {/* Schema / Example tabs */}
      {(contentSchema || exampleJson) && (
        <>
          <div style={{ display: 'flex', gap: 18, borderBottom: '1px solid var(--dp-border)', marginBottom: 14 }}>
            {(['example', 'schema'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: `2px solid ${activeTab === tab ? 'var(--dp-accent)' : 'transparent'}`,
                  color: activeTab === tab ? 'var(--dp-fg)' : 'var(--dp-fg-dim)',
                  padding: '6px 2px 8px',
                  fontSize: 13,
                  fontWeight: activeTab === tab ? 600 : 400,
                  fontFamily: 'var(--dp-font-body)',
                  cursor: 'pointer',
                  marginBottom: -1,
                  textTransform: 'capitalize',
                }}
              >
                {tab === 'example' ? 'Example JSON' : 'Schema'}
              </button>
            ))}
          </div>

          {activeTab === 'example' && exampleJson ? (
            <JsonTree json={exampleJson} maxHeight={360} />
          ) : activeTab === 'schema' && contentSchema ? (
            <RecursiveSchemaRenderer schema={contentSchema} />
          ) : (
            <div style={{ fontSize: 13, color: 'var(--dp-fg-faint)' }}>
              {activeTab === 'example' ? 'No example available.' : 'No schema defined.'}
            </div>
          )}
        </>
      )}
    </div>
  );
});
