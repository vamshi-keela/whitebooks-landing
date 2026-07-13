import React, { useState, memo } from 'react';
import { ChevronRight } from 'lucide-react';
import type { SchemaOrRef, SchemaObject } from '@/data/openapi-spec';
import { useSpec } from '../../contexts/SpecContext';
import { resolveSchema } from '../../utils/normalizeSpec';
import { getTypeLabel, isRequired, flattenSchema } from '../../utils/schemaHelpers';

/* ─── Type label — Fern-style muted inline mono text ─────────────────────── */
function TypeBadge({ schema }: { schema: SchemaObject }): React.ReactElement {
  const label = getTypeLabel(schema);
  return (
    <span
      style={{
        fontFamily: 'var(--dp-font-mono)',
        fontSize: 12,
        color: 'var(--dp-fg-dim)',
        flexShrink: 0,
      }}
    >
      {label}
    </span>
  );
}

/* ─── Required / optional — Fern-style plain text ────────────────────────── */
function RequiredBadge({ required }: { required: boolean }): React.ReactElement {
  return (
    <span
      style={{
        fontSize: 12,
        fontWeight: 500,
        fontFamily: 'var(--dp-font-body)',
        color: required ? 'var(--dp-accent)' : 'var(--dp-fg-faint)',
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
        marginLeft: depth > 0 ? 6 : 0,
        paddingLeft: depth > 0 ? 14 : 0,
      }}
    >
      {/* Property header row */}
      <div
        onClick={hasChildren ? () => setOpen(o => !o) : undefined}
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 10,
          padding: '8px 0 2px',
          cursor: hasChildren ? 'pointer' : 'default',
          userSelect: 'none',
        }}
      >
        {/* Name */}
        <code
          style={{
            fontFamily: 'var(--dp-font-mono)',
            fontSize: 13.5,
            color: 'var(--dp-fg)',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            flexShrink: 0,
          }}
        >
          {name}
        </code>

        {/* Type */}
        <TypeBadge schema={flat} />

        {/* Required */}
        <RequiredBadge required={required} />

        {/* Nullable */}
        {flat.nullable && (
          <span style={{ fontSize: 11, color: 'var(--dp-fg-faint)', fontFamily: 'var(--dp-font-mono)' }}>nullable</span>
        )}

        {/* Collapse toggle — right after meta, Fern-style */}
        {hasChildren && (
          <span style={{ flexShrink: 0, alignSelf: 'center', display: 'flex' }}>
            <ChevronRight
              size={13}
              color="var(--dp-fg-dim)"
              style={{ transform: open ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s' }}
            />
          </span>
        )}
      </div>

      {/* Description + example + enum */}
      {(flat.description || flat.example !== undefined || flat.enum) && (
        <div style={{ paddingBottom: 6 }}>
          {flat.description && (
            <div style={{ fontSize: 13, color: 'var(--dp-fg-muted)', lineHeight: 1.6, marginTop: 2 }}>{flat.description}</div>
          )}
          {flat.enum && (
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6, marginTop: 6 }}>
              <span style={{ fontSize: 11.5, color: 'var(--dp-fg-faint)' }}>Enum:</span>
              {flat.enum.slice(0, 6).map(v => (
                <code
                  key={String(v)}
                  style={{
                    fontSize: 11.5,
                    fontFamily: 'var(--dp-font-mono)',
                    color: 'var(--dp-kw-fg)',
                    background: 'var(--dp-surface-2)',
                    border: '1px solid var(--dp-border)',
                    borderRadius: 5,
                    padding: '0 6px',
                  }}
                >
                  {String(v)}
                </code>
              ))}
              {flat.enum.length > 6 && (
                <span style={{ fontSize: 11.5, color: 'var(--dp-fg-faint)' }}>…</span>
              )}
            </div>
          )}
          {flat.example !== undefined && (
            <div style={{ fontSize: 12, color: 'var(--dp-fg-faint)', fontFamily: 'var(--dp-font-mono)', marginTop: 6 }}>
              Example:{' '}
              <span
                style={{
                  color: 'var(--dp-str-fg)',
                  background: 'var(--dp-surface-2)',
                  border: '1px solid var(--dp-border)',
                  borderRadius: 5,
                  padding: '0 6px',
                }}
              >
                {JSON.stringify(flat.example)}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Children */}
      {hasChildren && open && (
        <div style={{ paddingBottom: 4 }}>
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
        items: <span style={{ color: 'var(--dp-type-fg)' }}>{getTypeLabel(flat)}</span>
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
          fontFamily: 'var(--dp-font-body)',
          fontSize: 13.5,
          color: 'var(--dp-fg-muted)',
          padding: '4px 0',
        }}
      >
        <TypeBadge schema={flat} />
        {flat.description && <span style={{ marginLeft: 8 }}>{flat.description}</span>}
        {flat.example !== undefined && (
          <div style={{ marginTop: 4, fontSize: 12, fontFamily: 'var(--dp-font-mono)', color: 'var(--dp-fg-faint)' }}>
            Example: <span style={{ color: 'var(--dp-str-fg)' }}>{JSON.stringify(flat.example)}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      {title && (
        <div
          style={{
            padding: '0 0 8px',
            fontSize: 12,
            fontFamily: 'var(--dp-font-body)',
            fontWeight: 600,
            color: 'var(--dp-fg-dim)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          {title}
        </div>
      )}
      <SchemaChildren schema={flat} depth={0} />
    </div>
  );
});
