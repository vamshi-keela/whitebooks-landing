import React, { useState, memo } from 'react';
import { ChevronDown, ChevronRight, AlertTriangle, Link } from 'lucide-react';
import type { NormalizedOperation } from '@/data/openapi-spec';
import MethodBadge from './MethodBadge';
import ParameterTable from './ParameterTable';
import RequestBodyViewer from './RequestBodyViewer';
import ResponseViewer from './ResponseViewer';
import CodeExampleTabs from './CodeExampleTabs';
import CopyButton from './CopyButton';
import { useSpec } from '../../contexts/SpecContext';

interface Props {
  operation: NormalizedOperation;
  defaultOpen?: boolean;
}

type SectionKey = 'params' | 'body' | 'response' | 'code';

function SectionHeader({
  label,
  open,
  onToggle,
  badge,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  badge?: React.ReactNode;
}): React.ReactElement {
  return (
    <button
      onClick={onToggle}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        width: '100%',
        background: 'none',
        border: 'none',
        borderTop: '1px solid var(--dp-border)',
        padding: '10px 20px',
        cursor: 'pointer',
        textAlign: 'left',
        color: 'var(--dp-fg-muted)',
        fontFamily: 'var(--dp-font-body)',
        fontSize: 12,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}
    >
      {open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
      {label}
      {badge}
    </button>
  );
}

export default memo(function OperationCard({ operation, defaultOpen = false }: Props): React.ReactElement {
  const { baseUrl } = useSpec();
  const [cardOpen, setCardOpen] = useState(defaultOpen);
  const [sections, setSections] = useState<Record<SectionKey, boolean>>({
    params: true,
    body: true,
    response: true,
    code: true,
  });

  const toggleSection = (key: SectionKey) =>
    setSections(s => ({ ...s, [key]: !s[key] }));

  const hasParams = !!operation.parameters?.length;
  const hasBody = !!operation.requestBody;
  const hasResponses = !!Object.keys(operation.responses ?? {}).length;

  const fullUrl = `${baseUrl}${operation.path}`;

  return (
    <div
      id={operation.id}
      style={{
        background: 'var(--dp-surface)',
        border: `1px solid ${cardOpen ? 'var(--dp-accent-line)' : 'var(--dp-border)'}`,
        borderRadius: 14,
        overflow: 'hidden',
        transition: 'border-color 0.2s',
        marginBottom: 8,
      }}
    >
      {/* ── Card header ── */}
      <div
        onClick={() => setCardOpen(o => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '14px 20px',
          cursor: 'pointer',
          userSelect: 'none',
          background: cardOpen ? 'rgba(220,47,101,0.03)' : 'transparent',
        }}
      >
        <MethodBadge method={operation.method} />

        <code
          style={{
            fontFamily: 'var(--dp-font-mono)',
            fontSize: 13,
            color: 'var(--dp-fg)',
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {operation.path}
        </code>

        <span
          style={{
            fontSize: 13,
            color: 'var(--dp-fg-muted)',
            flex: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {operation.summary}
        </span>

        {operation.deprecated && (
          <span
            style={{
              fontSize: 10,
              color: '#f59e0b',
              background: 'rgba(245,158,11,0.1)',
              border: '1px solid rgba(245,158,11,0.2)',
              borderRadius: 4,
              padding: '1px 6px',
              fontFamily: 'var(--dp-font-mono)',
              display: 'flex',
              alignItems: 'center',
              gap: 3,
              flexShrink: 0,
            }}
          >
            <AlertTriangle size={10} /> deprecated
          </span>
        )}

        <div
          onClick={e => e.stopPropagation()}
          style={{ flexShrink: 0 }}
        >
          <CopyButton text={fullUrl} label={false} size={12} />
        </div>

        {cardOpen
          ? <ChevronDown size={15} color="var(--dp-fg-dim)" style={{ flexShrink: 0 }} />
          : <ChevronRight size={15} color="var(--dp-fg-dim)" style={{ flexShrink: 0 }} />
        }
      </div>

      {/* ── Expanded content ── */}
      {cardOpen && (
        <div>
          {/* Description */}
          {operation.description && (
            <div
              style={{
                padding: '12px 20px 16px',
                fontSize: 14,
                lineHeight: 1.7,
                color: 'var(--dp-fg-muted)',
                borderTop: '1px solid var(--dp-border)',
              }}
            >
              {operation.description}
            </div>
          )}

          {/* Endpoint URL */}
          <div
            style={{
              padding: '8px 20px',
              borderTop: '1px solid var(--dp-border)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255,255,255,0.01)',
            }}
          >
            <Link size={12} color="var(--dp-fg-faint)" />
            <code style={{ fontFamily: 'var(--dp-font-mono)', fontSize: 12, color: 'var(--dp-fg-muted)' }}>
              <span style={{ color: 'var(--dp-fg-faint)' }}>{baseUrl}</span>
              {operation.path}
            </code>
          </div>

          {/* Parameters */}
          {hasParams && (
            <>
              <SectionHeader
                label="Parameters"
                open={sections.params}
                onToggle={() => toggleSection('params')}
                badge={
                  <span style={{
                    marginLeft: 4, fontSize: 10, color: 'var(--dp-fg-faint)',
                    background: 'var(--dp-surface-2)', border: '1px solid var(--dp-border)',
                    borderRadius: 4, padding: '0 5px',
                  }}>
                    {operation.parameters!.length}
                  </span>
                }
              />
              {sections.params && (
                <div style={{ padding: '0 20px 16px' }}>
                  <ParameterTable parameters={operation.parameters!} />
                </div>
              )}
            </>
          )}

          {/* Request body */}
          {hasBody && (
            <>
              <SectionHeader label="Request Body" open={sections.body} onToggle={() => toggleSection('body')} />
              {sections.body && (
                <div style={{ padding: '0 20px 16px' }}>
                  <RequestBodyViewer requestBody={operation.requestBody!} />
                </div>
              )}
            </>
          )}

          {/* Response */}
          {hasResponses && (
            <>
              <SectionHeader label="Response" open={sections.response} onToggle={() => toggleSection('response')} />
              {sections.response && (
                <div style={{ padding: '0 20px 16px' }}>
                  <ResponseViewer operation={operation} />
                </div>
              )}
            </>
          )}

          {/* Code examples */}
          <SectionHeader label="Code Examples" open={sections.code} onToggle={() => toggleSection('code')} />
          {sections.code && (
            <div style={{ padding: '0 20px 20px' }}>
              <CodeExampleTabs operation={operation} />
            </div>
          )}
        </div>
      )}
    </div>
  );
});
