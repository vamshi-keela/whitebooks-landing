import type { SchemaFaqItem } from '@/seo/types';

export const HOME_FAQ_ITEMS: SchemaFaqItem[] = [
  {
    question: 'What is WhiteBooks?',
    answer:
      'WhiteBooks is a GST Suvidha Provider (GSP) licensed by GSTN, offering cloud software and REST APIs for GST filing, e-invoicing, e-way bills, and KSA e-invoicing. It serves 25,000+ active clients, 8K CAs, 9Cr IRNs, and 12,000+ businesses including P&G, IBM, and Razorpay.',
  },
  {
    question: "Is WhiteBooks a direct GSP or does it resell another GSP's capacity?",
    answer:
      'WhiteBooks holds its GSP license directly from GSTN under BVM IT Consulting Services India Pvt. Ltd. It does not resell capacity from another licensee, which means faster latency, better uptime, and an independent roadmap.',
  },
  {
    question: 'Which products does WhiteBooks offer?',
    answer:
      'WhiteBooks offers two product stacks: Softwares (Accounting, GST, e-Invoice, e-Way Bill, KSA e-Invoicing) for finance teams and CA firms; and APIs (GST API, e-Invoice API, e-Way Bill API, KSA e-Invoice API) for developers.',
  },
  {
    question: 'Does WhiteBooks support e-invoicing for Saudi Arabia?',
    answer:
      'Yes. WhiteBooks is ZATCA-approved for Phase 2 e-invoicing in Saudi Arabia (FATOORAH integration, cryptographic signing, bilingual Arabic+English invoices). It is one of the few platforms handling both India GST and KSA e-invoicing on one workspace.',
  },
];

export const HOME_PRODUCT_ROUTES: Record<string, string> = {
  'gst-soft': '/softwares/gst',
  'gst-api': '/apis/gst',
  'einvoice-soft': '/softwares/e-invoice',
  'einvoice-api': '/apis/e-invoice',
  'eway-soft': '/softwares/e-way-bill',
  'eway-api': '/apis/e-way-bill',
  'ksa-soft': '/softwares/ksa',
  'ksa-api': '/apis/ksa',
  accounting: '/softwares/accounting',
  'notice-mgmt': '/softwares/notice-management',
};
