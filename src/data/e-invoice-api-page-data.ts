
import {
    Download, Shield, FileText, AlertCircle, ChevronDown,
    Phone, ExternalLink, Braces, Building2, MapPin, Users, Eye,
    type LucideIcon,
    Building,
} from 'lucide-react';
import { FaqType, ResourceItem } from './gst-api-page-data';



/* ─── Resources ─────────────────────────────────────────────────────────────────── */

export const INV_RESOURCE_ITEMS: ResourceItem[] = [
    {
        icon: Shield,
        title: 'SSL Certificate',
        subtitle: '.CRT',
        actions: [{ label: 'Download', href: '/static/pdfs/whitebooks-Certificate.crt', variant: 'download' }],
    },
    {
        icon: FileText,
        title: 'E-Invoice API Reference Docs',
        subtitle: '.DOCX',
        actions: [{ label: 'Download', href: 'https://whitebooks.in/static/pdfs/e-invoice-api-reference-documentation.pdf', variant: 'download' }],
    },
    {
        icon: AlertCircle,
        title: 'E-Invoice Error Codes',
        subtitle: '.PDF',
        actions: [{ label: 'Download', href: '/static/pdfs/gst-api-error-codes.pdf', variant: 'download' }],
    },
    {
        icon: Braces,
        title: 'Generate IRN Arrtibute Details',
        subtitle: '.PDF',
        actions: [{ label: 'Download', href: '/static/pdfs/new-reurn-file-doc.pdf', variant: 'download' }],
    },
    {
        icon: Building,
        title: 'E-Invoice API Production Credential Setup',
        desc: 'Production credential creation and onboarding process guide',
        actions: [
            { label: 'Download', href: '/static/pdfs/return-filing-through-api-v1.1.pdf', variant: 'download' },
        ],
    },
    {
        icon: MapPin,
        title: 'State Codes',
        desc: 'E-Invoice Sytem Master Codes',
        actions: [
            { label: 'Visit', href: 'https://einvoice1.gst.gov.in/Others/MasterCodes', variant: 'online' },
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
export const INV_FAQS: FaqType[] = [
    {
        q: 'Is this API compliant with the latest GST laws?',
        a: 'Yes. WhiteBooks GST API is updated within 24 hours of any GSTN notification or legal amendment. Our compliance team monitors all GST council updates and the API schema is versioned to ensure backward compatibility during transitions.',
    },
    {
        q: 'How is API security and data privacy handled?',
        a: 'All API communication is encrypted via TLS 1.3. Client credentials are stored as salted hashes. We maintain SOC 2 Type II compliance and conduct quarterly penetration tests. Taxpayer data is never stored beyond the session window and is processed in ISO 27001-certified data centers.',
    },
    {
        q: 'Do you support global compliance formats?',
        a: 'In addition to the Indian GST API, WhiteBooks offers a dedicated KSA e-Invoice API compliant with ZATCA Phase 2 requirements, with ZatcaXML generation and cryptographic stamp verification built in.',
    },
    {
        q: 'What rate limits apply to the Sandbox environment?',
        a: 'The Sandbox tier has no rate limits on test requests. Production API limits depend on your subscription plan — Starter plans include 10,000 requests/month, while Enterprise plans offer custom quotas with SLA guarantees.',
    },
    {
        q: 'Can I use the API for bulk GSTR filing?',
        a: 'Yes. The GST API supports bulk operations for GSTR-1, GSTR-3B, and reconciliation workflows. You can submit up to 1,000 invoice records in a single batch request using the /bulk endpoints documented in the API reference.',
    },
];