import type { SchemaObject, SchemaOrRef, OpenApiSpec } from '../data/openapi-spec';
import { resolveSchema } from './normalizeSpec';

export function getTypeLabel(schema: SchemaObject): string {
  if (schema.type === 'array') {
    const items = schema.items;
    if (items) {
      const inner = '$ref' in items ? (items as { $ref: string }).$ref.split('/').pop() ?? 'object' : ((items as SchemaObject).type ?? 'object');
      return `array<${inner}>`;
    }
    return 'array';
  }
  if (schema.type === 'integer') return 'integer';
  if (schema.type) return schema.type;
  if (schema.properties) return 'object';
  if (schema.allOf || schema.oneOf || schema.anyOf) return 'composite';
  return 'any';
}

export function isRequired(propName: string, required?: string[]): boolean {
  return required?.includes(propName) ?? false;
}

export function generateExampleFromSchema(schema: SchemaOrRef, spec: OpenApiSpec, depth = 0): unknown {
  if (depth > 5) return '...';

  const resolved = resolveSchema(spec, schema);

  if (resolved.example !== undefined) return resolved.example;

  if (resolved.enum) return resolved.enum[0];

  switch (resolved.type) {
    case 'string':
      if (resolved.format === 'date') return '2026-01-15';
      if (resolved.format === 'date-time') return '2026-01-15T10:30:00+05:30';
      if (resolved.format === 'email') return 'user@example.com';
      if (resolved.format === 'password') return '••••••••';
      return 'string';
    case 'number':
    case 'integer':
      return resolved.minimum ?? 0;
    case 'boolean':
      return true;
    case 'null':
      return null;
    case 'array': {
      if (!resolved.items) return [];
      const item = generateExampleFromSchema(resolved.items, spec, depth + 1);
      return [item];
    }
    case 'object':
    default: {
      if (resolved.properties) {
        const obj: Record<string, unknown> = {};
        for (const [key, propSchema] of Object.entries(resolved.properties)) {
          obj[key] = generateExampleFromSchema(propSchema, spec, depth + 1);
        }
        return obj;
      }
      if (resolved.allOf) {
        const merged: Record<string, unknown> = {};
        for (const s of resolved.allOf) {
          const sub = generateExampleFromSchema(s, spec, depth + 1);
          if (typeof sub === 'object' && sub !== null) Object.assign(merged, sub);
        }
        return merged;
      }
      return {};
    }
  }
}

export function mergeAllOf(schema: SchemaObject, spec: OpenApiSpec): SchemaObject {
  if (!schema.allOf) return schema;
  const merged: SchemaObject = { type: 'object', properties: {}, required: [] };
  for (const s of schema.allOf) {
    const resolved = resolveSchema(spec, s);
    if (resolved.properties) Object.assign(merged.properties!, resolved.properties);
    if (resolved.required) merged.required = [...(merged.required ?? []), ...resolved.required];
    if (resolved.description && !merged.description) merged.description = resolved.description;
  }
  return merged;
}

export function flattenSchema(schema: SchemaObject, spec: OpenApiSpec): SchemaObject {
  if (schema.allOf) return mergeAllOf(schema, spec);
  if (schema.oneOf?.[0]) return resolveSchema(spec, schema.oneOf[0]);
  if (schema.anyOf?.[0]) return resolveSchema(spec, schema.anyOf[0]);
  return schema;
}
