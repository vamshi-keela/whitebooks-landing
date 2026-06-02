
import {
    Download, Shield, FileText, AlertCircle, ChevronDown,
    Phone, ExternalLink, Braces, Building2, MapPin, Users, Eye,
    type LucideIcon,
    Building,
    Key,
    Zap,
    Terminal,
    CheckCircle,
} from 'lucide-react';
import { FaqType, ResourceItem } from './gst-api-page-data';
import { SdkType } from '@/pages/developer/GstOverview';
import { LOGIN_URL, SIGNUP_URL } from '@/utils/contants';
import sdkPhp from '@/assets/logos/php-logo.svg';
import sdkPostman from '@/assets/logos/postman.svg';



export const EWAYBILL_STEPS = [
    {
        n: '01',
        icon: Users,
        title: 'Sign-up with WhiteBooks',
        desc: 'Create your WhiteBooks developer account to access API credentials and the sandbox environment.',
        link: { label: 'Sign up', href: SIGNUP_URL },
    },
    {
        n: '02',
        icon: Key,
        title: 'Purchase Sandbox Access',
        desc: 'Login -> Under e-Way Bill API -> Click on Buy now to purchase Sandbox',
        link: null,
    },
    {
        n: '03',
        icon: Zap,
        title: 'Start Using APIs',
        desc: 'Start using WhiteBooks e-Way Bill Client ID & Client Secret ID Credentials for your Sandbox Testing',
        link: null,
    },
];
export const EWAYBILL_SANDBOX_SETUP_STEPS = [
    {
        n: 1,
        title: 'Sign up with WhiteBooks',
        desc: 'Create your developer account to get started.',
        link: { label: 'Sign up →', href: SIGNUP_URL },
        icon: Users,
    },
    {
        n: 2,
        title: 'Login to WhiteBooks',
        desc: 'Access your developer dashboard with your credentials.',
        link: { label: 'Login →', href: LOGIN_URL },
        icon: Key,
    },
    {
        n: 3,
        title: 'Create Credentials',
        desc: 'Click credentials on e-Way Bill API card, click on create credentials button.',
        link: null,
        icon: Terminal,
    },
    {
        n: 4,
        title: 'Submit Details',
        desc: 'Fill in the required details in the popup and submit to receive your API keys.',
        link: null,
        icon: CheckCircle,
    },

];

export const EWAYBILL_SDK_ITEMS: SdkType[] = [
    { name: 'Postman', version: 'v2.1.0', logoUrl: sdkPostman, href: SIGNUP_URL },
    { name: 'PHP', version: 'v8.3.4', logoUrl: sdkPhp, href: SIGNUP_URL },
];

/* ─── Resources ─────────────────────────────────────────────────────────────────── */

export const EWAYBILL_RESOURCE_ITEMS: ResourceItem[] = [
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
export const EWAYBILL_FAQS: FaqType[] = [
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