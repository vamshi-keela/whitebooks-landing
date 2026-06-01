import { useQuery } from '@tanstack/react-query';
import { fetchKsaEInvoiceSpec } from '../services/openApiSpecService';
import type { OpenApiSpec } from '../data/openapi-spec';

export function useKsaEInvoiceSpec() {
  return useQuery<OpenApiSpec>({
    queryKey: ['openapi-spec', 'ksa-e-invoice-api'],
    queryFn: fetchKsaEInvoiceSpec,
    staleTime: Infinity,
    retry: 2,
  });
}
