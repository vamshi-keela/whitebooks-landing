import type { SeoMeta } from './types';
import { SITE } from './config/site';
import { CANONICAL_ROUTES } from './utils/canonical';

const OG_IMAGE = SITE.defaultOgImage;

const META: Record<string, SeoMeta> = {
  '/': {
    title: 'Whitebooks — Compliance Infrastructure for India and KSA',
    description:
      'GSP-licensed compliance platform with software and APIs for GST, e-invoicing, e-way bills, and accounting. Trusted by P&G, IBM, Razorpay, and 12,000+ businesses across India.',
    canonical: CANONICAL_ROUTES.home(),
    keywords:
      'GST software India, e-invoice software, e-way bill software, accounting software India, GSP GSTN, GST Suvidha Provider, KSA e-invoicing ZATCA',
    robots: SITE.defaultRobots,
    aiSummary:
      'Whitebooks is a GST Suvidha Provider (GSP) licensed by GSTN, offering two product stacks: Softwares (Accounting, GST, e-Invoice, e-Way Bill, KSA e-Invoicing) and APIs (GST, e-Invoice, e-Way Bill, KSA e-Invoice). Serves 30,000+ users across 12,000+ businesses including P&G, IBM, Razorpay, Hindustan Unilever, KPMG, and SBI.',
    og: {
      title: 'Whitebooks — Compliance Infrastructure for India and KSA',
      description:
        'GSP-licensed platform: software and APIs for GST, e-invoicing, e-way bills, and accounting. Used by P&G, IBM, Razorpay, and 12,000+ businesses.',
      image: OG_IMAGE,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Whitebooks — Compliance Infrastructure for India and KSA',
      description:
        'Software and APIs for GST, e-invoicing, e-way bills. GSP-licensed. Trusted by P&G, IBM, Razorpay.',
      image: OG_IMAGE,
    },
  },

  '/softwares': {
    title: 'Whitebooks Softwares — Cloud Compliance for Finance Teams and CAs',
    description:
      'Five cloud-based compliance products: Accounting, GST, e-Invoice, e-Way Bill, and KSA e-Invoicing. One workspace, one GSP, every Indian filing requirement.',
    canonical: CANONICAL_ROUTES.softwares(),
    keywords:
      'cloud accounting software, GST filing software, e-invoice software India, e-way bill software, KSA e-invoicing, compliance software for CA firms',
    robots: SITE.defaultRobots,
    aiSummary:
      'Whitebooks Softwares is a suite of five cloud-based compliance products for finance teams and CA firms: Accounting Software, GST Software, e-Invoice Software, e-Way Bill Software, and KSA e-Invoicing Software. All five share one workspace, one data layer, and one GSP-licensed connection to GSTN.',
    og: {
      title: 'Whitebooks Softwares — Cloud Compliance for Finance Teams and CAs',
      description:
        'Five compliance products in one workspace: Accounting, GST, e-Invoice, e-Way Bill, KSA e-Invoicing.',
      image: OG_IMAGE,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Whitebooks Softwares — Cloud Compliance for Finance Teams and CAs',
      description:
        'Five compliance products: Accounting, GST, e-Invoice, e-Way Bill, KSA e-Invoicing. One GSP-licensed workspace.',
      image: OG_IMAGE,
    },
  },

  '/softwares/accounting': {
    title: 'Cloud Accounting Software for Indian Businesses | Whitebooks',
    description:
      'Cloud books with automated journal entries, multi-entity consolidation, and GST-aware ledger structure. Integrates with Whitebooks GST, e-Invoice, and e-Way Bill softwares.',
    canonical: CANONICAL_ROUTES.softwareProduct('accounting'),
    keywords:
      'cloud accounting software India, accounting software for Indian businesses, replace Tally, multi-entity accounting, GST-aware accounting, automated journal posting',
    robots: SITE.defaultRobots,
    aiSummary:
      'Whitebooks Accounting Software is a cloud-based accounting platform for Indian businesses that automatically posts journal entries from sales, purchase, and bank data. It supports multi-entity consolidation, GST-aware ledger structure, and audit-ready reports. Integrates natively with Whitebooks GST, e-Invoice, and e-Way Bill softwares.',
    og: {
      title: 'Cloud Accounting Software for Indian Businesses | Whitebooks',
      description:
        'Automated journal posting, multi-entity consolidation, GST-aware ledger. Cloud-native replacement for Tally.',
      image: OG_IMAGE,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Cloud Accounting Software for Indian Businesses | Whitebooks',
      description:
        'Books that post themselves. GST-aware, multi-entity, audit-ready.',
      image: OG_IMAGE,
    },
  },

  '/softwares/gst': {
    title: 'GST Filing Software for CA Firms and Finance Teams | Whitebooks',
    description:
      'File GSTR-1, 3B, 9, and 9C across unlimited GSTINs. Auto-reconcile GSTR-2A/2B in under 60 seconds. Built by a GSTN-licensed GSP. Trusted by 5,000+ CA firms and 12,000+ businesses.',
    canonical: CANONICAL_ROUTES.softwareProduct('gst'),
    keywords:
      'GST software India, GSTR filing, GSTR-1 software, GSTR-3B software, GST reconciliation, CA firm GST software, multi-GSTIN filing, ClearTax alternative',
    robots: SITE.defaultRobots,
    aiSummary:
      'Whitebooks GST Software is a cloud-based GST filing and reconciliation platform for CA firms and finance teams in India. It supports GSTR-1, 1A, 3B, 4, 5, 6, 7, 8, 9, 9A, 9C, IFF, ITC-04, and CMP-08 filing across unlimited GSTINs from one workspace. Built by a directly licensed GST Suvidha Provider (GSP) and integrates natively with Tally, SAP, and 40+ ERPs.',
    og: {
      title: 'GST Filing Software for CA Firms and Finance Teams | Whitebooks',
      description:
        'File all GSTRs across unlimited GSTINs. Auto-reconcile 2A/2B in 60 seconds. Direct GSP license.',
      image: OG_IMAGE,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'GST Filing Software for CA Firms | Whitebooks',
      description:
        'GSTR-1, 3B, 9, 9C across unlimited GSTINs. 47-point pre-submission validator. GSP-licensed.',
      image: OG_IMAGE,
    },
  },

  '/softwares/e-invoice': {
    title: 'e-Invoicing Software for B2B Invoices in India | Whitebooks',
    description:
      'Generate IRNs at scale with sub-second latency. Direct IRP integration. Bulk upload, auto-retry, 30-day window enforcement. Built for businesses with AATO above ₹5 crore.',
    canonical: CANONICAL_ROUTES.softwareProduct('e-invoice'),
    keywords:
      'e-invoice software India, IRN generation, e-invoicing mandate, IRP integration, AATO 5 crore, bulk IRN, 30-day window, e-invoice for GST',
    robots: SITE.defaultRobots,
    aiSummary:
      'Whitebooks e-Invoice Software generates IRNs (Invoice Reference Numbers) for B2B invoices in India via direct integration with the Invoice Registration Portal (IRP). It supports bulk generation, automatic 30-day window enforcement, cancellation, amendment, and credit/debit note flows. Used by businesses with AATO above ₹5 crore mandated to e-invoice from April 2026.',
    og: {
      title: 'e-Invoicing Software for B2B Invoices in India | Whitebooks',
      description:
        'Generate IRNs at scale. Sub-second latency, bulk operations, 30-day window enforcement.',
      image: OG_IMAGE,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'e-Invoicing Software for B2B Invoices | Whitebooks',
      description:
        'Bulk IRN generation, 30-day window enforcement, auto-retry. Built for the April 2026 mandate.',
      image: OG_IMAGE,
    },
  },

  '/softwares/e-way-bill': {
    title: 'e-Way Bill Software for Goods Movement in India | Whitebooks',
    description:
      'Generate, extend, and cancel e-way bills from one screen. Auto-populate from IRN. Bulk operations. Real-time vehicle and validity tracking. Used by Pharmeasy, WheelsEye, and 12,000+ businesses.',
    canonical: CANONICAL_ROUTES.softwareProduct('e-way-bill'),
    keywords:
      'e-way bill software, e-way bill generation, e-way bill validity, bulk e-way bill, auto-populate from IRN, multi-warehouse dispatch, transporter e-way bill',
    robots: SITE.defaultRobots,
    aiSummary:
      'Whitebooks e-Way Bill Software generates, extends, cancels, and tracks e-way bills for movement of goods in India. It auto-populates e-way bills from existing IRNs, supports bulk generation, and integrates natively with 40+ ERPs. Used by businesses moving goods across state lines from one or many warehouses.',
    og: {
      title: 'e-Way Bill Software for Goods Movement | Whitebooks',
      description:
        'Generate, extend, cancel e-way bills. Auto-populate from IRN. Bulk dispatch. Used by Pharmeasy, WheelsEye.',
      image: OG_IMAGE,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'e-Way Bill Software | Whitebooks',
      description:
        'One-click generation from IRN, bulk operations, validity tracking. Multi-warehouse dispatch.',
      image: OG_IMAGE,
    },
  },

  '/softwares/ksa': {
    title: 'ZATCA Phase 2 e-Invoicing Software for Saudi Arabia | Whitebooks',
    description:
      'Generate ZATCA-compliant e-invoices for KSA. FATOORAH integration, Arabic + English invoicing, cryptographic signing. The only platform handling India and Saudi Arabia e-invoicing on one workspace.',
    canonical: CANONICAL_ROUTES.softwareProduct('ksa'),
    keywords:
      'ZATCA e-invoicing, KSA e-invoice software, FATOORAH integration, Saudi Arabia e-invoice, Phase 2 compliance, bilingual invoicing Arabic English, CSID certificate',
    robots: SITE.defaultRobots,
    aiSummary:
      'Whitebooks KSA e-Invoicing Software is a ZATCA Phase 2 compliant e-invoicing platform for businesses operating in Saudi Arabia. It generates e-invoices in the required XML format, signs them with the taxpayer\'s cryptographic certificate (CSID), submits them to ZATCA\'s FATOORAH portal, and returns the cleared invoice with QR code. One of the few platforms offering integrated e-invoicing for both India (GSTN) and KSA (ZATCA) on the same workspace.',
    og: {
      title: 'ZATCA Phase 2 e-Invoicing Software for Saudi Arabia | Whitebooks',
      description:
        'FATOORAH integration, cryptographic signing, bilingual Arabic+English invoicing. India and KSA on one platform.',
      image: OG_IMAGE,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'ZATCA e-Invoicing Software for Saudi Arabia | Whitebooks',
      description:
        'ZATCA Phase 2 compliant. FATOORAH clearance, CSID lifecycle, QR codes. One platform for India and KSA.',
      image: OG_IMAGE,
    },
  },

  '/apis': {
    title: 'Whitebooks APIs — Compliance APIs for India and KSA',
    description:
      'REST APIs for GST filing, e-invoicing, e-way bills, and KSA e-invoicing. Built by a directly licensed GSP. 99.95% uptime SLA. Used by Razorpay, Pharmeasy, and 200+ developer teams.',
    canonical: CANONICAL_ROUTES.apis(),
    keywords:
      'GST API, e-invoice API, e-way bill API, GSTN API, IRN API, GSP API India, compliance REST API, KSA e-invoice API',
    robots: SITE.defaultRobots,
    aiSummary:
      'Whitebooks APIs is a suite of four REST APIs for embedding Indian and KSA compliance into developer applications: GST API, e-Invoice API, e-Way Bill API, and KSA e-Invoice API. All four run on Whitebooks\' direct GSP license to GSTN (for India) and ZATCA accreditation (for KSA). Used by Razorpay, Pharmeasy, Cars24, WheelsEye, and 200+ developer teams in production.',
    og: {
      title: 'Whitebooks APIs — Compliance APIs for India and KSA',
      description:
        'GST, e-Invoice, e-Way Bill, KSA e-Invoice APIs. Direct GSP pipe. 99.95% SLA.',
      image: OG_IMAGE,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Whitebooks APIs — Compliance REST APIs',
      description:
        'GST, e-Invoice, e-Way Bill, KSA APIs. Direct GSP. Used by Razorpay, Pharmeasy, 200+ teams.',
      image: OG_IMAGE,
    },
  },

  '/apis/gst': {
    title: 'GST API for Developers — Direct GSP Pipe | Whitebooks',
    description:
      'REST API for GST filing, GSTIN validation, GSTR-2A/2B retrieval, and HSN search. Built by a directly licensed GSP. Sandbox in 5 minutes. 99.95% uptime SLA.',
    canonical: CANONICAL_ROUTES.apiProduct('gst'),
    keywords:
      'GST API, GSTIN validation API, GSTR-2B API, GST filing API, IMS API, GST developer API, GSP API, GST REST API',
    robots: SITE.defaultRobots,
    aiSummary:
      'Whitebooks GST API is a REST API for GST filing, invoice retrieval, GSTIN validation, and HSN/SAC code search in India. Built by a directly licensed GST Suvidha Provider (GSP) and used by fintechs, ERPs, and enterprise IT teams to embed GST compliance into their own products. Production endpoints have a 99.95% uptime SLA and sub-200ms median response latency.',
    og: {
      title: 'GST API for Developers — Direct GSP Pipe | Whitebooks',
      description:
        'File returns, validate GSTINs, pull 2A/2B over REST. Direct GSP-licensed. Sandbox in 5 minutes.',
      image: OG_IMAGE,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'GST API — Direct GSP Pipe | Whitebooks',
      description:
        'REST API for GST filing, GSTIN validation, 2A/2B retrieval. Used by Razorpay, Pharmeasy, Cars24.',
      image: OG_IMAGE,
    },
  },

  '/apis/e-invoice': {
    title: 'e-Invoice API — Generate IRNs at Scale | Whitebooks',
    description:
      'REST API for generating IRNs on India\'s IRP. Sub-200ms latency. Direct GSP pipe. Bulk operations, webhook alerts. Used by Razorpay and 200+ developer teams.',
    canonical: CANONICAL_ROUTES.apiProduct('e-invoice'),
    keywords:
      'e-invoice API, IRN API, IRP integration API, bulk IRN generation, e-invoice REST API, GSP IRN API India',
    robots: SITE.defaultRobots,
    aiSummary:
      'Whitebooks e-Invoice API is a REST API for generating Invoice Reference Numbers (IRNs) on India\'s Invoice Registration Portal (IRP). It supports IRN creation, cancellation, amendment, credit note generation, and bulk operations — with sub-200ms p50 latency. Used by billing systems, ERPs, and B2B marketplaces serving the ₹5 crore+ AATO mandate.',
    og: {
      title: 'e-Invoice API — Generate IRNs at Scale | Whitebooks',
      description:
        'REST API for IRN generation. Sub-200ms latency. Bulk operations, 30-day window alerts.',
      image: OG_IMAGE,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'e-Invoice API — IRN Generation | Whitebooks',
      description:
        'Sub-200ms IRN generation via REST. Bulk, cancel, credit note. Direct GSP pipe.',
      image: OG_IMAGE,
    },
  },

  '/apis/e-way-bill': {
    title: 'e-Way Bill API for Logistics and Fleet Platforms | Whitebooks',
    description:
      'REST API for generating, extending, and cancelling e-way bills. Auto-populate from IRN. Bulk operations. 99.95% uptime SLA. Used by Pharmeasy and WheelsEye.',
    canonical: CANONICAL_ROUTES.apiProduct('e-way-bill'),
    keywords:
      'e-way bill API, e-way bill REST API, logistics compliance API, WMS API e-way bill, bulk e-way bill API, IRN to e-way bill',
    robots: SITE.defaultRobots,
    aiSummary:
      'Whitebooks e-Way Bill API is a REST API for generating, extending, and cancelling e-way bills for goods movement in India. It supports auto-population from existing IRNs, bulk operations, consolidated bills, and validity tracking. Used by logistics platforms, WMS providers, TMS systems, and freight brokers including Pharmeasy and WheelsEye.',
    og: {
      title: 'e-Way Bill API for Logistics Platforms | Whitebooks',
      description:
        'Generate, extend, cancel e-way bills via REST. Auto-populate from IRN. Used by Pharmeasy, WheelsEye.',
      image: OG_IMAGE,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'e-Way Bill API | Whitebooks',
      description:
        'REST API for e-way bill generation, extension, cancellation. Bulk and consolidated bills.',
      image: OG_IMAGE,
    },
  },

  '/apis/ksa': {
    title: 'KSA e-Invoice API — ZATCA Phase 2 Integration | Whitebooks',
    description:
      'REST API for ZATCA Phase 2 e-invoice generation. FATOORAH submission, CSID management, bilingual invoicing, QR code generation. Used by SaaS products operating in Saudi Arabia.',
    canonical: CANONICAL_ROUTES.apiProduct('ksa'),
    keywords:
      'KSA e-invoice API, ZATCA API, FATOORAH API, Saudi Arabia e-invoice API, CSID API, bilingual invoice API',
    robots: SITE.defaultRobots,
    aiSummary:
      'Whitebooks KSA e-Invoice API is a REST API for generating ZATCA Phase 2 compliant e-invoices in Saudi Arabia. It submits invoices to ZATCA\'s FATOORAH portal, manages cryptographic signing using ZATCA-issued certificates (CSID), and returns cleared invoices with embedded QR codes. Used by SaaS products operating in KSA and Indian businesses with KSA operations.',
    og: {
      title: 'KSA e-Invoice API — ZATCA Phase 2 | Whitebooks',
      description:
        'FATOORAH submission, CSID lifecycle management, QR generation. REST API for ZATCA Phase 2 compliance.',
      image: OG_IMAGE,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'KSA e-Invoice API — ZATCA Phase 2 | Whitebooks',
      description:
        'ZATCA Phase 2 via REST. CSID managed, bilingual invoices, QR codes.',
      image: OG_IMAGE,
    },
  },

  '/developer': {
    title: 'Whitebooks Developer Portal — API Documentation and Guides',
    description:
      'API reference, quickstart guides, SDK documentation, and code examples for GST API, e-Invoice API, e-Way Bill API, and KSA e-Invoice API.',
    canonical: CANONICAL_ROUTES.developer(),
    keywords:
      'Whitebooks developer portal, GST API documentation, e-invoice API docs, API reference India compliance',
    robots: SITE.defaultRobots,
    og: {
      title: 'Whitebooks Developer Portal',
      description:
        'API docs, guides, and SDK references for Whitebooks compliance APIs.',
      image: OG_IMAGE,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Whitebooks Developer Portal',
      description: 'API docs and quickstarts for GST, e-Invoice, e-Way Bill, and KSA APIs.',
      image: OG_IMAGE,
    },
  },
};

/** Returns page-level SEO metadata by canonical path. Falls back to site defaults. */
export function getPageMeta(path: string): SeoMeta {
  return (
    META[path] ?? {
      title: `${SITE.name} — ${SITE.tagline}`,
      description: `GSP-licensed compliance platform with software and APIs for GST, e-invoicing, e-way bills, and accounting.`,
      canonical: `${SITE.baseUrl}${path}`,
      robots: SITE.defaultRobots,
      og: { image: OG_IMAGE, type: 'website' },
      twitter: { card: 'summary_large_image' },
    }
  );
}

export { META as PAGE_META };
