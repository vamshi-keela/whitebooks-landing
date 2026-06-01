import React, { useState, memo } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import type { SchemaOrRef, SchemaObject } from '../../data/openapi-spec';
import { useSpec } from '../../contexts/SpecContext';
import { resolveSchema } from '../../utils/normalizeSpec';
import { getTypeLabel, isRequired, flattenSchema } from '../../utils/schemaHelpers';

/* ─── Type badge ──────────────────────────────────────────────────────────── */
function TypeBadge({ schema }: { schema: SchemaObject }): React.ReactElement {
  const label = getTypeLabel(schema);
  const isArr = label.startsWith('array');
  const isObj = label === 'object';
  return (
    <span
      style={{
        fontFamily: 'var(--dp-font-mono)',
        fontSize: 11,
        color: isArr ? '#f5c986' : isObj ? '#7dd3fc' : 'var(--dp-accent-2)',
        background: isArr ? 'rgba(245,201,134,0.08)' : isObj ? 'rgba(125,211,252,0.08)' : 'var(--dp-accent-soft)',
        border: `1px solid ${isArr ? 'rgba(245,201,134,0.2)' : isObj ? 'rgba(125,211,252,0.2)' : 'var(--dp-accent-line)'}`,
        borderRadius: 4,
        padding: '1px 6px',
        flexShrink: 0,
      }}
    >
      {label}
    </span>
  );
}

/* ─── Required / optional badge ──────────────────────────────────────────── */
function RequiredBadge({ required }: { required: boolean }): React.ReactElement {
  return (
    <span
      style={{
        fontSize: 10,
        fontFamily: 'var(--dp-font-mono)',
        color: required ? '#f87171' : 'var(--dp-fg-faint)',
        background: required ? 'rgba(239,68,68,0.08)' : 'transparent',
        border: required ? '1px solid rgba(239,68,68,0.2)' : '1px solid transparent',
        borderRadius: 4,
        padding: '1px 5px',
        flexShrink: 0,
      }}
    >
      {required ? 'required' : 'optional'}
    </span>
  );
}

/* ─── Single property row ────────────────────────────────────────────────── */
interface PropRowProps {
  name: string;
  schema: SchemaOrRef;
  required?: boolean;
  depth: number;
}

const PropRow = memo(function PropRow({ name, schema: schemaOrRef, required = false, depth }: PropRowProps): React.ReactElement {
  const { spec } = useSpec();
  const [open, setOpen] = useState(depth < 2);

  const schema = resolveSchema(spec, schemaOrRef);
  const flat = flattenSchema(schema, spec);

  const hasChildren =
    flat.type === 'object' && flat.properties
    || flat.type === 'array' && flat.items != null
    || flat.allOf != null
    || flat.oneOf != null;

  return (
    <div
      style={{
        borderLeft: depth > 0 ? '1px solid var(--dp-border)' : 'none',
        marginLeft: depth > 0 ? 8 : 0,
        paddingLeft: depth > 0 ? 12 : 0,
      }}
    >
      {/* Property header row */}
      <div
        onClick={hasChildren ? () => setOpen(o => !o) : undefined}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 8,
          padding: '6px 0',
          cursor: hasChildren ? 'pointer' : 'default',
          userSelect: 'none',
        }}
      >
        {/* Collapse toggle */}
        <div style={{ width: 16, flexShrink: 0, paddingTop: 2 }}>
          {hasChildren ? (
            open
              ? <ChevronDown size={13} color="var(--dp-fg-dim)" />
              : <ChevronRight size={13} color="var(--dp-fg-dim)" />
          ) : null}
        </div>

        {/* Name */}
        <code
          style={{
            fontFamily: 'var(--dp-font-mono)',
            fontSize: 13,
            color: 'var(--dp-fg)',
            fontWeight: 600,
            flexShrink: 0,
            minWidth: 120,
          }}
        >
          {name}
        </code>

        {/* Type */}
        <TypeBadge schema={flat} />

        {/* Required */}
        <RequiredBadge required={required} />

        {/* Enum badge */}
        {flat.enum && (
          <span style={{ fontSize: 11, color: '#c084fc', fontFamily: 'var(--dp-font-mono)' }}>
            enum: {flat.enum.slice(0, 3).map(String).join(' | ')}{flat.enum.length > 3 ? '...' : ''}
          </span>
        )}

        {/* Nullable */}
        {flat.nullable && (
          <span style={{ fontSize: 10, color: 'var(--dp-fg-faint)', fontFamily: 'var(--dp-font-mono)' }}>nullable</span>
        )}
      </div>

      {/* Description + example */}
      {(flat.description || flat.example !== undefined) && (
        <div style={{ paddingLeft: 24, paddingBottom: 4 }}>
          {flat.description && (
            <div style={{ fontSize: 12, color: 'var(--dp-fg-muted)', lineHeight: 1.5 }}>{flat.description}</div>
          )}
          {flat.example !== undefined && (
            <div style={{ fontSize: 11, color: 'var(--dp-fg-faint)', fontFamily: 'var(--dp-font-mono)', marginTop: 2 }}>
              Example: <span style={{ color: '#a5e3a1' }}>{JSON.stringify(flat.example)}</span>
            </div>
          )}
        </div>
      )}

      {/* Children */}
      {hasChildren && open && (
        <div style={{ paddingLeft: 8 }}>
          <SchemaChildren schema={flat} depth={depth + 1} />
        </div>
      )}
    </div>
  );
});

/* ─── Schema children renderer ───────────────────────────────────────────── */
function SchemaChildren({ schema, depth }: { schema: SchemaObject; depth: number }): React.ReactElement {
  const { spec } = useSpec();

  if (schema.type === 'array' && schema.items) {
    const items = resolveSchema(spec, schema.items);
    const flat = flattenSchema(items, spec);

    if (flat.properties) {
      return (
        <div>
          <div style={{ fontSize: 11, color: 'var(--dp-fg-faint)', fontFamily: 'var(--dp-font-mono)', padding: '4px 0 2px 24px' }}>
            Array items:
          </div>
          {Object.entries(flat.properties).map(([key, val]) => (
            <PropRow
              key={key}
              name={key}
              schema={val}
              required={isRequired(key, flat.required)}
              depth={depth}
            />
          ))}
        </div>
      );
    }

    // Primitive array
    return (
      <div style={{ fontSize: 11, color: 'var(--dp-fg-faint)', fontFamily: 'var(--dp-font-mono)', padding: '4px 0 2px 24px' }}>
        items: <span style={{ color: '#f5c986' }}>{getTypeLabel(flat)}</span>
        {flat.description && <span style={{ color: 'var(--dp-fg-dim)', marginLeft: 8 }}>{flat.description}</span>}
      </div>
    );
  }

  if (schema.type === 'object' && schema.properties) {
    return (
      <>
        {Object.entries(schema.properties).map(([key, val]) => (
          <PropRow
            key={key}
            name={key}
            schema={val}
            required={isRequired(key, schema.required)}
            depth={depth}
          />
        ))}
      </>
    );
  }

  return <></>;
}

/* ─── Top-level RecursiveSchemaRenderer ─────────────────────────────────── */
interface RecursiveSchemaRendererProps {
  schema: SchemaOrRef;
  title?: string;
}

export default memo(function RecursiveSchemaRenderer({ schema: schemaOrRef, title }: RecursiveSchemaRendererProps): React.ReactElement {
  const { spec } = useSpec();
  const schema = resolveSchema(spec, schemaOrRef);
  const flat = flattenSchema(schema, spec);

  if (!flat.properties && flat.type !== 'array' && !flat.allOf && !flat.oneOf) {
    // Scalar or unknown schema — render inline info
    return (
      <div
        style={{
          background: 'var(--dp-surface)',
          border: '1px solid var(--dp-border)',
          borderRadius: 10,
          padding: '12px 16px',
          fontFamily: 'var(--dp-font-mono)',
          fontSize: 13,
          color: 'var(--dp-fg-muted)',
        }}
      >
        <TypeBadge schema={flat} />
        {flat.description && <span style={{ marginLeft: 8 }}>{flat.description}</span>}
        {flat.example !== undefined && (
          <div style={{ marginTop: 4, fontSize: 12, color: 'var(--dp-fg-faint)' }}>
            Example: <span style={{ color: '#a5e3a1' }}>{JSON.stringify(flat.example)}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        background: 'var(--dp-surface)',
        border: '1px solid var(--dp-border)',
        borderRadius: 10,
        overflow: 'hidden',
      }}
    >
      {title && (
        <div
          style={{
            padding: '8px 14px',
            borderBottom: '1px solid var(--dp-border)',
            fontSize: 11,
            fontFamily: 'var(--dp-font-mono)',
            color: 'var(--dp-fg-dim)',
            background: 'var(--dp-surface-2)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          {title}
        </div>
      )}
      <div style={{ padding: '8px 12px' }}>
        <SchemaChildren schema={flat} depth={0} />
      </div>
    </div>
  );
});
