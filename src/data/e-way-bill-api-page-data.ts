
import {
    Download, Shield, FileText, AlertCircle, ChevronDown,
    Phone, ExternalLink, Braces, Building2, Users, Eye,
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
        title: 'e-Way Bill API Documentation',
        actions: [{ label: 'Visit', href: 'https://docs.ewaybillgst.gov.in/apidocs/index.html', variant: 'online' }],
    },
    {
        icon: Building,
        title: 'e-Way Bill API Production Credentials Creation Process',
        subtitle: '.PDF',
        actions: [{ label: 'Download', href: '/static/pdfs/e-way-bill-production-access.pdf', variant: 'download' }],
    },
    {
        icon: FileText,
        title: 'e-Way Bill API Help Document',
        subtitle: '.XLSX',
        actions: [{ label: 'Download', href: '/static/pdfs/e-way-bill-help-document.xlsx', variant: 'download' }],
    },
    {
        icon: AlertCircle,
        title: 'e-Way Bill Error Codes List',
        subtitle: '.PDF',
        actions: [{ label: 'Download', href: '/static/pdfs/e-way-bill-error-codes-list.pdf', variant: 'download' }],
    },
    {
        icon: Braces,
        title: 'e-Way Bill API Reference Document',
        subtitle: '.PDF',
        actions: [{ label: 'Download', href: '/static/pdfs/e-way-bill-api-reference-document.pdf', variant: 'download' }],
    },
];
export const EWAYBILL_FAQS: FaqType[] = [
    {
        q: 'What is an e-Way Bill, and why is it important for businesses?',
        a: 'An e-Way Bill is an electronic document essential for the movement of goods in India, ensuring tax compliance and reducing paperwork. Using an e-Way Bill API automates generation and simplifies logistics. With options like the Tally e-Way Bill API, businesses can enhance efficiency in their supply chain management.',
    },
    {
        q: 'Is your e-Way Bill API integrated with major transportation management systems (TMS) and ERP software?',
        a: 'Yes. The WhiteBooks e-Way Bill API is designed to seamlessly integrate with leading TMS and ERP systems in India, providing a smooth and efficient eWaybill generation process. Our API offers pre-built integrations with popular software solutions, simplifying the process of generating and managing e-Way Bills for businesses.',
    },
    {
        q: 'Can your e-Way Bill API automatically calculate tax liabilities and generate eWaybills in compliance with the latest regulations?',
        a: 'Absolutely. The WhiteBooks e-Way Bill API automates tax calculations and ensures that eWaybills are generated in compliance with the most current GST regulations in India. Our API simplifies the e-Waybill generation process, saving businesses time and reducing the risk of non-compliance penalties.',
    },
    {
        q: 'Can your e-Way Bill API handle high volumes of eWaybill generation for businesses with substantial daily shipments?',
        a: 'Yes. The WhiteBooks e-Way Bill API is designed to efficiently handle high volumes of eWaybill generation, even for businesses with large-scale operations in India. Our API is built on a scalable infrastructure that can accommodate fluctuating workloads, ensuring uninterrupted service and optimal performance.',
    },
    {
        q: 'Is my information safe when using your e-Way Bill API?',
        a: 'Absolutely. WhiteBooks prioritizes the security of your data. We employ advanced encryption and robust access controls to safeguard your sensitive information. Our e-Way Bill API adheres to the highest security standards, ensuring the confidentiality and integrity of your data.',
    },
    {
        q: 'What happens if I need to change the destination of my goods after creating an e-Way Bill?',
        a: 'You can update the e-Way Bill with the new destination. Our e-Way Bill API provides the flexibility to accommodate changes in your transportation plans. Simply follow the guidelines outlined in the API documentation to modify the destination information.',
    },
    {
        q: 'Can your e-Way Bill API help in tracking the location of my goods during transit?',
        a: 'While our primary focus is on e-Way Bill generation, you can integrate our API with third-party tracking systems to monitor the location of your goods during transit in India. This integration allows you to gain real-time visibility into the movement of your shipments, enhancing supply chain efficiency and ensuring timely delivery.',
    },
    {
        q: 'Can your e-Way Bill API assist with customs documentation for international shipments?',
        a: 'While our e-Way Bill API primarily focuses on domestic shipments within India, you can integrate it with third-party customs documentation systems to streamline the process for international shipments. By automating certain aspects of customs clearance, such as generating required documents or tracking shipment status, you can save time and reduce administrative burdens.',
    },
    {
        q: 'Are there any plans for future enhancements or features in your e-Way Bill API that we should be aware of?',
        a: 'Yes, we have a roadmap of planned enhancements and features to further improve the functionality and convenience of our e-Way Bill API for businesses in India. We are committed to staying ahead of industry trends and regulatory changes, and we will keep you informed about our upcoming updates.',
    },
];