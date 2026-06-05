import type { CodeTab } from './DpComponents';

/* ─── Sidebar data ─────────────────────────────────────────────────────────── */

export interface SidebarItem {
  label: string;
  slug: string;
}

export interface SidebarGroup {
  heading: string;
  items: SidebarItem[];
}

export const SIDEBAR_GROUPS: SidebarGroup[] = [
  {
    heading: 'Getting Started',
    items: [
      { label: 'Introduction', slug: 'introduction' },
      { label: 'Authentication', slug: 'authentication' },
      { label: 'Environments', slug: 'environments' },
      { label: 'Your first request', slug: 'first-request' },
    ],
  },
  {
    heading: 'E-Invoice API',
    items: [
      { label: 'Overview', slug: 'einvoice-overview' },
      { label: 'Generate IRN', slug: 'einvoice-generate' },
      { label: 'Cancel IRN', slug: 'einvoice-cancel' },
      { label: 'Bulk operations', slug: 'einvoice-bulk' },
    ],
  },
  {
    heading: 'GST Returns',
    items: [
      { label: 'GSTR-1 Filing', slug: 'gstr1' },
      { label: 'GSTR-3B Filing', slug: 'gstr3b' },
      { label: 'Reconciliation', slug: 'reconciliation' },
    ],
  },
  {
    heading: 'E-Way Bill API',
    items: [
      { label: 'Generate EWB', slug: 'eway-generate' },
      { label: 'Part-B Update', slug: 'eway-partb' },
      { label: 'Cancel EWB', slug: 'eway-cancel' },
    ],
  },
  {
    heading: 'Webhooks',
    items: [
      { label: 'Overview', slug: 'webhooks' },
      { label: 'Event types', slug: 'webhook-events' },
      { label: 'Security', slug: 'webhook-security' },
    ],
  },
  {
    heading: 'Resources',
    items: [
      { label: 'Error codes', slug: 'errors' },
      { label: 'Rate limits', slug: 'rate-limits' },
      { label: 'Changelog', slug: 'changelog' },
    ],
  },
];

/* ─── TOC data ─────────────────────────────────────────────────────────────── */

export const TOC_ITEMS = [
  { label: 'Architecture', slug: 'architecture' },
  { label: 'Base URLs', slug: 'base-urls' },
  { label: 'Authentication', slug: 'auth' },
  { label: 'Lifecycle', slug: 'lifecycle' },
  { label: 'First Request', slug: 'first-request' },
  { label: 'Error Handling', slug: 'errors' },
  { label: 'Webhooks', slug: 'webhooks' },
  { label: 'Go-Live Checklist', slug: 'checklist' },
];

/* ─── Code snippets ────────────────────────────────────────────────────────── */

export const authCodeTabs: CodeTab[] = [
  {
    label: 'Node.js',
    lines: [
      [['kw', 'const'], ['', ' client = '], ['kw', 'new'], ['', ' '], ['fn', 'WhiteBooks'], ['pun', '({']],
      [['', '  apiKey: '], ['key', 'process'], ['pun', '.'], ['fn', 'env'], ['pun', '.'], ['key', 'WB_API_KEY'], ['pun', ',']],
      [['pun', '});']],
      [],
      [['com', '// All requests automatically include Bearer token']],
      [['kw', 'const'], ['', ' res = '], ['kw', 'await'], ['', ' client'], ['pun', '.'], ['fn', 'gst'], ['pun', '.'], ['fn', 'returns'], ['pun', '({']],
      [['', '  gstin: '], ['str', '"29AAGCW7302R1ZF"']],
      [['pun', '});']],
    ],
  },
  {
    label: 'cURL',
    lines: [
      [['fn', 'curl'], ['', ' \\']],
      [['', '  -H '], ['str', '"Authorization: Bearer $WB_API_KEY"'], ['', ' \\']],
      [['', '  -H '], ['str', '"Content-Type: application/json"'], ['', ' \\']],
      [['str', '  "https://api.whitebooks.dev/v3/gst/returns?gstin=29AAGCW7302R1ZF"']],
    ],
  },
];

export const firstRequestTabs: CodeTab[] = [
  {
    label: 'Node.js',
    lines: [
      [['kw', 'import'], ['', ' '], ['fn', 'WhiteBooks'], ['', ' '], ['kw', 'from'], ['', ' '], ['str', "'@whitebooks/node'"]],
      [],
      [['kw', 'const'], ['', ' wb = '], ['kw', 'new'], ['', ' '], ['fn', 'WhiteBooks'], ['pun', '({']],
      [['', '  apiKey: '], ['key', 'process'], ['pun', '.'], ['fn', 'env'], ['pun', '.'], ['key', 'WB_API_KEY']],
      [['pun', '});']],
      [],
      [['kw', 'const'], ['', ' irn = '], ['kw', 'await'], ['', ' wb'], ['pun', '.'], ['fn', 'einvoice'], ['pun', '.'], ['fn', 'generate'], ['pun', '({']],
      [['', '  gstin: '], ['str', '"29AAGCW7302R1ZF"'], ['pun', ',']],
      [['', '  invoiceType: '], ['str', '"B2B"'], ['pun', ',']],
      [['', '  invoiceNumber: '], ['str', '"INV-2024-001"'], ['pun', ',']],
      [['', '  invoiceDate: '], ['str', '"2024-01-15"'], ['pun', ',']],
      [['', '  buyer: '], ['pun', '{'], ['', ' gstin: '], ['str', '"27BBBFF5679L1ZR"'], ['', ', name: '], ['str', '"Acme Corp"'], ['', ', ... '], ['pun', '},']],
      [['', '  items: '], ['pun', '['], ['', ' '], ['com', '/* line items */'], ['', ' '], ['pun', '],']],
      [['pun', '});']],
      [],
      [['fn', 'console'], ['pun', '.'], ['fn', 'log'], ['pun', '('], ['str', '"IRN:"'], ['', ', irn'], ['pun', '.'], ['key', 'irn'], ['pun', ')']],
    ],
  },
];
