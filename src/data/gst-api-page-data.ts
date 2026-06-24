
import {
    Download, Shield, FileText, AlertCircle, ChevronDown,
    Phone, ExternalLink, Braces, Building2, MapPin, Users, Eye,
    type LucideIcon,
    Building,
} from 'lucide-react';


/* ─── Types ─────────────────────────────────────────────────────────────────── */

export type ResourceVariant = 'download' | 'guide' | 'online' | 'join';

export interface ResourceAction {
    label: string;
    href: string;
    variant: ResourceVariant;
}

export interface ResourceItem {
    icon: LucideIcon;
    title: string;
    subtitle?: string;
    desc?: string;
    actions: ResourceAction[];
    wide?: boolean;
    accent?: boolean;
}


/* ─── Resources ─────────────────────────────────────────────────────────────────── */

export const GST_RESOURCE_ITEMS: ResourceItem[] = [
    {
        icon: Shield,
        title: 'SSL Certificate',
        subtitle: '.CRT',
        actions: [{ label: 'Download', href: '/static/pdfs/whitebooks-Certificate.crt', variant: 'download' }],
    },
    {
        icon: FileText,
        title: 'GST API Reference Docs',
        subtitle: '.DOCX',
        actions: [{ label: 'Download', href: '/static/pdfs/whitebooks-gst-api-documentation.docx', variant: 'download' }],
    },
    {
        icon: AlertCircle,
        title: 'Error Codes Schema',
        subtitle: '.PDF',
        actions: [{ label: 'Download', href: '/static/pdfs/gst-api-error-codes.pdf', variant: 'download' }],
    },
    {
        icon: Braces,
        title: 'New GSTR1 Returns Filing Approach.',
        subtitle: '.PDF',
        actions: [{ label: 'Download', href: '/static/pdfs/new-reurn-file-doc.pdf', variant: 'download' }],
    },
    {
        icon: Building,
        title: 'Return Filing Through API',
        subtitle: '.PDF',
        actions: [
            { label: 'Download', href: '/static/pdfs/return-filing-through-api-v1.1.pdf', variant: 'download' },
        ],
    },
    {
        icon: Building2,
        title: 'GSTIN API Documentation',
        desc: 'Visit GST Gov Portal for GSTIN API Documentation',
        actions: [
            { label: 'Visit', href: 'https://developer.gst.gov.in/apiportal/taxpayer/returns', variant: 'online' },
        ],
    },
    {
        icon: Users,
        title: 'Join GSP/ASP Community',
        subtitle: 'GOOGLE GROUP',
        actions: [{ label: 'Join', href: 'https://groups.google.com/forum/#!forum/gst-suvidha-provider-gsp-discussion-group', variant: 'join' }],
        accent: true,
    },
];
export interface FaqType {
    q: string;
    a: string;
}
export const GST_FAQS: FaqType[] = [
    {
        q: 'What is the WhiteBooks GST API, and how does it help developers?',
        a: 'The WhiteBooks GST API is a REST API that gives developers programmatic access to all major GST operations — GSTR-1 / GSTR-3B / GSTR-9 filing, GSTR-2B fetch for ITC reconciliation, GSTIN verification, and HSN/SAC lookup — through the certified GSP channel to the GSTN. SDKs for Java, Node.js, and Python are available, along with an OpenAPI 3.0 spec and a free sandbox environment.',
    },
    {
        q: 'Is the WhiteBooks GST API integrated with major ERP systems like SAP and Tally?',
        a: 'Yes. WhiteBooks provides pre-built connectors for SAP (ECC 6.0+, S/4HANA), Oracle EBS / Fusion, Microsoft Dynamics 365, and Tally Prime / ERP 9. Any custom ERP can integrate via plain REST + JSON using the published OpenAPI 3.0 specification available at /openapi/gst.json.',
    },
    {
        q: 'Can the GST API handle bulk GSTR-1 and GSTR-3B filing for large taxpayers?',
        a: 'Yes. The API is designed for high-volume filing, supporting multi-GSTIN consolidation and batch return filing. It is built on a scalable infrastructure to handle large taxpayer workloads — even during peak GST filing deadlines — with 99.99% uptime SLA on enterprise plans.',
    },
    {
        q: 'How does the GSTR-2B reconciliation API work for ITC matching?',
        a: 'The /gstr2b/all endpoint fetches the auto-populated GSTR-2B statement for a given GSTIN and tax period. You can then programmatically compare this against your purchase register to identify matched, mismatched, and missing invoices for ITC (Input Tax Credit) reconciliation. The API returns JSON — import directly into your accounting system for automated matching.',
    },
    {
        q: 'Is the GST API data secure and compliant with Indian regulations?',
        a: 'Absolutely. All API calls use TLS 1.2+ encryption. Authentication is via OAuth 2.0 bearer tokens. WhiteBooks is ISO 27001 certified, DPDP Act 2023 compliant, and GSP-licensed by the GSTN. Role-based access control and 7-year audit log retention are included. Enterprise plans support IP allow-listing and SHA256-RSA request signing.',
    },
    {
        q: 'How do I get a free sandbox API key to test GST returns?',
        a: 'Sign up at accounts.whitebooks.in/signup (select "Developer"). After verifying your email, navigate to GST API → Sandbox in your dashboard and click "Create Credentials". You receive a client_id and client_secret within minutes. The sandbox base URL is https://apisandbox.whitebooks.in — it mirrors the production API schema completely, so you can test all endpoints including GSTR-1, GSTR-3B, GSTR-2B, and GSTIN verification at no cost.',
    },
    {
        q: 'What rate limits apply to the WhiteBooks GST API?',
        a: 'Sandbox is rate-limited to 60 requests/minute. Production limits depend on your plan: Starter (60/min), Growth (300/min), Business (1,000/min), Enterprise (custom SLA with burst capacity). Throttled responses use HTTP 429 with a Retry-After header. Enterprise plans include dedicated capacity with no shared throttling.',
    },
    {
        q: 'Can the GST API automatically validate HSN/SAC codes and GSTIN numbers?',
        a: 'Yes. Dedicated endpoints support GSTIN verification (single and bulk), HSN code search, and SAC code lookup. These are commonly used before generating invoices or filing returns to ensure the data is correct and GSTN-compliant, reducing rejected returns and penalty risks.',
    },
    {
        q: 'What support and documentation are available for GST API integration?',
        a: 'WhiteBooks provides an OpenAPI 3.0 specification (importable into Postman or Insomnia), an interactive Swagger UI at /swagger/, a browsable Redoc reference at /docs/gst, SDK code samples for Java, Node.js, and Python, and the GSP/ASP Google Groups forum for community support. Enterprise customers get a dedicated account manager and 24×7 support.',
    },
];