
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
        actions: [{ label: 'Download', href: '/static/pdfs/e-invoice-api-reference-documentation.pdf', variant: 'download' }],
    },
    {
        icon: AlertCircle,
        title: 'E-Invoice Error Codes',
        subtitle: '.PDF',
        actions: [{ label: 'Download', href: '/static/pdfs/e-invoicing-error-codes.pdf', variant: 'download' }],
    },
    {
        icon: Braces,
        title: 'Generate IRN Attribute Details',
        subtitle: '.XLSX',
        actions: [{ label: 'Download', href: '/static/pdfs/e-invoice-generate-irn-attribute-details.xlsx', variant: 'download' }],
    },
    {
        icon: Building,
        title: 'E-Invoice API Production Credentials Creation Process',
        desc: 'Production credential creation and onboarding process guide',
        actions: [
            { label: 'Download', href: '/static/pdfs/production-credentials-creation-process.pdf', variant: 'download' },
        ],
    },
    {
        icon: MapPin,
        title: 'State Codes',
        desc: 'E-Invoice System Master Codes',
        actions: [
            { label: 'Visit', href: '/docs/einvoice', variant: 'online' },
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
        q: 'What is an e-Invoice, and why is it essential for businesses?',
        a: 'An e-Invoice is a digital invoice generated electronically, offering several advantages. The ecosystem includes options like e-Invoice API providers, low-cost e-Invoice API providers, and specialized GST e-Invoice API software. These tools help developers integrate e-Invoicing into their applications seamlessly, using resources like the e-Invoice API developer portal for guidance and support.',
    },
    {
        q: 'Is my invoicing data secure when using your e-Invoice API?',
        a: 'Yes, your invoicing data is highly secure when using our e-Invoice API. We employ advanced encryption and robust access controls to protect your sensitive information. Our API adheres to the highest security standards, ensuring the confidentiality and integrity of your data.',
    },
    {
        q: 'Can your e-Invoice API handle a high volume of invoices, even during peak business periods?',
        a: 'Yes. The WhiteBooks e-Invoice API is designed to efficiently handle a large number of invoices, even during peak business times in India. Our API is built on a scalable infrastructure that can accommodate fluctuating workloads, ensuring uninterrupted service and optimal performance, even during periods of high invoice volume or GST compliance deadlines.',
    },
    {
        q: 'Can your e-Invoice API help in automating the entire invoicing process, from generation to delivery?',
        a: 'Yes. The WhiteBooks e-Invoice API can automate the complete invoicing cycle, from invoice generation to delivery and payment tracking. Our API streamlines the invoicing process, saving businesses time, reducing manual errors, and improving overall efficiency.',
    },
    {
        q: 'How does your e-Invoice API ensure that invoices are accurate and comply with tax regulations?',
        a: 'The WhiteBooks e-Invoice API uses built-in validation checks to ensure the accuracy and compliance of your invoices before they are sent. Our API verifies that all required fields are accurately filled, calculations are correct, and the invoice adheres to the latest GST rules and regulations. This helps businesses avoid penalties and maintain compliance with Indian tax laws.',
    },
    {
        q: 'Does your e-Invoice API offer multi-language support for businesses operating in diverse regions?',
        a: 'Yes. The WhiteBooks e-Invoice API provides multi-language support, allowing you to create invoices in multiple languages for international operations, including businesses based in India. This feature enables you to effectively communicate with customers and suppliers worldwide, expanding your market reach and improving global business efficiency.',
    },
    {
        q: 'Can I use your e-Invoice API on mobile devices for invoicing on the go?',
        a: 'Yes. The WhiteBooks e-Invoice API is fully mobile-friendly, allowing you to create and manage invoices directly from your smartphone in India. Our API is designed to work seamlessly on various mobile platforms, providing you with the flexibility to invoice anytime and anywhere.',
    },
    {
        q: 'How often do you release updates and enhancements to improve the functionality of your e-Invoice API?',
        a: 'We regularly update our e-Invoice API to enhance its features and offer a more efficient experience to our users in India. Our commitment to continuous improvement ensures that our API stays updated with the latest industry trends and regulatory requirements, providing businesses with a reliable and cutting-edge invoicing solution.',
    },
    {
        q: 'How does your e-Invoice API assist businesses in reducing the time it takes to get paid and improving cash flow?',
        a: 'Our e-Invoice API streamlines the invoicing process, automating tasks and speeding up the delivery of invoices to customers. By offering convenient payment options, we facilitate faster payments, ultimately improving cash flow for businesses in India.',
    },
];