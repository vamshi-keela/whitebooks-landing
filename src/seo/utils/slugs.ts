/** Converts route param (e.g. "e-invoice") to registry key (e.g. "e-invoice-software"). */
export const SOFT_SLUG_TO_CANONICAL: Record<string, string> = {
  accounting: 'accounting',
  gst: 'gst',
  'e-invoice': 'e-invoice',
  'e-way-bill': 'e-way-bill',
  ksa: 'ksa',
};

export const API_SLUG_TO_CANONICAL: Record<string, string> = {
  gst: 'gst',
  'e-invoice': 'e-invoice',
  'e-way-bill': 'e-way-bill',
  ksa: 'ksa',
};

/** Generate a unique, deterministic schema @id for a given page + type */
export function schemaId(canonicalUrl: string, type: string): string {
  return `${canonicalUrl}#${type.toLowerCase()}`;
}
