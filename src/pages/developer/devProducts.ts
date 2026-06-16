import type { ApiSpecKey } from '../../data/openapi-spec';
import type { IconName } from './DpIcon';

/**
 * Shared metadata for the four APIs that live under the "API Reference" tab.
 * Used by the docs Overview, the API Reference landing, and anywhere we need
 * to present the product suite consistently.
 */
export interface DevProduct {
  key: ApiSpecKey;
  slug: string;          // route under /developer
  label: string;
  tagline: string;       // one-liner for cards
  description: string;   // longer blurb
  icon: IconName;
  basePath: string;      // illustrative API base path
  highlights: string[];
}

export const DEV_PRODUCTS: DevProduct[] = [
  {
    key: 'gst-api',
    slug: 'gst-api',
    label: 'GST API',
    tagline: 'File returns, validate GSTINs, reconcile ITC.',
    description:
      'REST API for GST return filing (GSTR-1, 3B, 9), GSTIN validation, GSTR-2A/2B retrieval, and HSN/SAC search — over a directly GSTN-licensed GSP channel.',
    icon: 'receipt',
    basePath: '/gst',
    highlights: ['All 12 return types', 'ITC reconciliation', 'Bulk & single GSTIN'],
  },
  {
    key: 'e-invoice-api',
    slug: 'e-invoice-api',
    label: 'e-Invoice API',
    tagline: 'Generate IRNs and signed QR codes in real time.',
    description:
      'Generate, cancel, and fetch IRNs on India’s Invoice Registration Portal with sub-200ms p50 latency. Single and bulk operations over a direct GSP pipe.',
    icon: 'scroll',
    basePath: '/einvoice',
    highlights: ['<200ms p50 IRN', 'Bulk up to 1,000', 'B2C QR codes'],
  },
  {
    key: 'e-way-bill-api',
    slug: 'e-way-bill-api',
    label: 'e-Way Bill API',
    tagline: 'Generate, extend, and cancel e-way bills.',
    description:
      'Create and manage e-way bills against the NIC system, auto-populate from an IRN, and run bulk operations — with retry-safe transient error handling.',
    icon: 'truck',
    basePath: '/ewaybill',
    highlights: ['Auto-populate from IRN', 'Bulk up to 1,000', 'Extend & cancel'],
  },
  {
    key: 'ksa-e-invoice-api',
    slug: 'ksa-e-invoice-api',
    label: 'KSA e-Invoice API',
    tagline: 'ZATCA Phase 2 e-invoicing for Saudi Arabia.',
    description:
      'FATOORAH submission, CSID management, bilingual invoicing, and QR generation for ZATCA Phase 2 (clearance & reporting) compliance in Saudi Arabia.',
    icon: 'globe',
    basePath: '/ksa/einvoice',
    highlights: ['ZATCA Phase 2', 'CSID management', 'Bilingual + QR'],
  },
];
