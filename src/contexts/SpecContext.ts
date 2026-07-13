import { createContext, useContext } from 'react';
import type { OpenApiSpec, SchemaObject } from '@/data/openapi-spec';
import { resolveRef } from '../utils/normalizeSpec';

export interface SpecContextValue {
  spec: OpenApiSpec;
  baseUrl: string;
  resolveRef: (ref: string) => SchemaObject | null;
}

export const SpecContext = createContext<SpecContextValue>({
  spec: { openapi: '3.0.0', info: { title: '', version: '' }, paths: {} },
  baseUrl: '',
  resolveRef: () => null,
});

export function makeSpecContext(spec: OpenApiSpec, baseUrl: string): SpecContextValue {
  return {
    spec,
    baseUrl,
    resolveRef: (ref: string) => resolveRef(spec, ref),
  };
}

export function useSpec(): SpecContextValue {
  return useContext(SpecContext);
}
