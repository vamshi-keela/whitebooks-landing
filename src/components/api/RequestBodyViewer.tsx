import React, { useState, memo, useMemo } from 'react';
import type { RequestBodyObject } from '../../data/openapi-spec';
import { useSpec } from '../../contexts/SpecContext';
import { generateExampleFromSchema } from '../../utils/schemaHelpers';
import { resolveSchema } from '../../utils/normalizeSpec';
import RecursiveSchemaRenderer from './RecursiveSchemaRenderer';
import JsonTree from './JsonTree';

interface Props {
  requestBody: RequestBodyObject;
}

export default memo(function RequestBodyViewer({ requestBody }: Props): React.ReactElement {
  const { spec } = useSpec();
  const [activeTab, setActiveTab] = useState<'schema' | 'example'>('schema');

  const mediaType = Object.keys(requestBody.content)[0] ?? 'application/json';
  const content = requestBody.content[mediaType];
  const schemaOrRef = content?.schema;

  const exampleJson = useMemo(() => {
    if (!schemaOrRef) return '{}';
    if (content?.example !== undefined) return JSON.stringify(content.example, null, 2);
    const resolved = resolveSchema(spec, schemaOrRef);
    return JSON.stringify(generateExampleFromSchema(resolved, spec), null, 2);
  }, [schemaOrRef, content?.example, spec]);

  const tabs: { id: 'schema' | 'example'; label: string }[] = [
    { id: 'schema', label: 'Schema' },
    { id: 'example', label: 'Example JSON' },
  ];

  return (
    <div>
      {/* Media type badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <span
          style={{
            fontFamily: 'var(--dp-font-mono)',
            fontSize: 11,
            color: '#7dd3fc',
            background: 'rgba(125,211,252,0.08)',
            border: '1px solid rgba(125,211,252,0.2)',
            borderRadius: 5,
            padding: '2px 8px',
          }}
        >
          {mediaType}
        </span>
        {requestBody.required && (
          <span style={{ fontSize: 11, color: '#f87171', fontFamily: 'var(--dp-font-mono)' }}>required</span>
        )}
      </div>

      {/* Tab bar */}
      <div
        style={{
          display: 'flex',
          gap: 0,
          borderBottom: '1px solid var(--dp-border)',
          marginBottom: 12,
        }}
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: `2px solid ${activeTab === tab.id ? 'var(--dp-accent)' : 'transparent'}`,
              color: activeTab === tab.id ? 'var(--dp-fg)' : 'var(--dp-fg-dim)',
              padding: '6px 14px',
              fontSize: 13,
              fontFamily: 'var(--dp-font-body)',
              cursor: 'pointer',
              transition: 'color 0.15s',
              marginBottom: -1,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'schema' && schemaOrRef ? (
        <RecursiveSchemaRenderer schema={schemaOrRef} />
      ) : activeTab === 'schema' ? (
        <div style={{ color: 'var(--dp-fg-muted)', fontSize: 13 }}>No schema defined.</div>
      ) : (
        <JsonTree json={exampleJson} maxHeight={480} />
      )}
    </div>
  );
});
