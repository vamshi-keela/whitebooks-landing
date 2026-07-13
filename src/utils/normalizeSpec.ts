import type {
  OpenApiSpec,
  SchemaOrRef,
  SchemaObject,
  NormalizedOperation,
  NormalizedMethod,
  OperationObject,
  ParameterObject,
} from '@/data/openapi-spec';

export function resolveRef(spec: OpenApiSpec, ref: string): SchemaObject | null {
  if (!ref.startsWith('#/')) return null;
  const parts = ref.slice(2).split('/');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = spec;
  for (const part of parts) {
    current = current?.[part];
    if (current == null) return null;
  }
  return current as SchemaObject;
}

export function resolveSchema(spec: OpenApiSpec, schema: SchemaOrRef): SchemaObject {
  if ('$ref' in schema && schema.$ref) {
    return resolveRef(spec, schema.$ref) ?? {};
  }
  return schema as SchemaObject;
}

const HTTP_METHODS: NormalizedMethod[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

export function normalizeSpec(spec: OpenApiSpec): NormalizedOperation[] {
  const operations: NormalizedOperation[] = [];

  for (const [path, pathItem] of Object.entries(spec.paths ?? {})) {
    const pathParams: ParameterObject[] = pathItem.parameters ?? [];

    for (const method of HTTP_METHODS) {
      const op: OperationObject | undefined = (pathItem as Record<string, OperationObject>)[method.toLowerCase()];
      if (!op) continue;

      const tag = op.tags?.[0] ?? 'Other';
      const mergedParams = [...pathParams, ...(op.parameters ?? [])];

      operations.push({
        id: `${method}:${path}`,
        method,
        path,
        tag,
        summary: op.summary ?? path,
        description: op.description,
        parameters: mergedParams.length > 0 ? mergedParams : undefined,
        requestBody: op.requestBody,
        responses: op.responses,
        deprecated: op.deprecated,
      });
    }
  }

  return operations;
}
