import type { ApiSpecKey } from '@/data/openapi-spec';

/* Canonical display names for each API reference. Every surface that names the
   API — env bar, playground switcher, breadcrumb, search index — reads from here. */
export const API_TYPE_LABELS: Record<ApiSpecKey, string> = {
  'gst-api': 'GST API',
  'e-invoice-api': 'e-Invoice API',
  'e-way-bill-api': 'e-Way Bill API',
  'ksa-e-invoice-api': 'KSA e-Invoice API',
};

/* Compact forms for tight rows — scope chips and per-result tags in the
   endpoint picker, where the trailing "API" is noise repeated on every line. */
export const API_TYPE_SHORT_LABELS: Record<ApiSpecKey, string> = {
  'gst-api': 'GST',
  'e-invoice-api': 'e-Invoice',
  'e-way-bill-api': 'e-Way Bill',
  'ksa-e-invoice-api': 'KSA',
};

/* Stable presentation order. Keep it fixed everywhere so the scope chips don't
   reshuffle under the user between openings. */
export const API_TYPE_ORDER: ApiSpecKey[] = [
  'gst-api',
  'e-invoice-api',
  'e-way-bill-api',
  'ksa-e-invoice-api',
];
