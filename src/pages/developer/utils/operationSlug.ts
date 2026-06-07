import type { NormalizedOperation } from '../../../data/openapi-spec';

/**
 * Converts a normalized API operation (method + path) to a URL-safe slug.
 *
 * Examples:
 *   GET  /gstin/verify       → get-gstin-verify
 *   POST /gstr1/retsave      → post-gstr1-retsave
 *   GET  /ewb/{ewbNo}/status → get-ewb-ewbno-status
 */
export function operationToSlug(method: string, path: string): string {
  const cleanPath = path
    .replace(/^\//, '')     // strip leading slash
    .replace(/[{}]/g, '')   // strip path-param braces
    .replace(/\//g, '-')    // slashes → dashes
    .replace(/_/g, '-')     // underscores → dashes
    .replace(/-+/g, '-')    // collapse consecutive dashes
    .replace(/-$/, '')      // strip trailing dash
    .toLowerCase();
  return `${method.toLowerCase()}-${cleanPath}`;
}

/**
 * Finds the operation in the list whose slug matches the given URL segment.
 */
export function slugToOperation(
  slug: string,
  operations: NormalizedOperation[],
): NormalizedOperation | undefined {
  return operations.find(op => operationToSlug(op.method, op.path) === slug);
}
