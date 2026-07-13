import React from 'react';
import { Key, Users, Zap, CheckCircle, Terminal, Shield, FileText, ExternalLink } from 'lucide-react';
import type { FaqType, ResourceItem } from '@/data/gst-api-page-data';
import {
  HeroSection,
  StatsSection,
  GettingStartedSection,
  SandboxSection,
  BestPracticesSection,
  SdkLibrariesSection,
  Divider,
  type SdkType,
} from './GstOverview';
import { FinalCTA } from './EinvoiceApiOverview';
import GstResources from './GstResources';
import sdkPostman from '../../assets/logos/postman.svg';
import { SIGNUP_URL } from '@/utils/contants';

/* ─── Data ─────────────────────────────────────────────────────────────── */

const KSA_STEPS = [
  {
    n: '01',
    icon: Users,
    title: 'Sign up with WhiteBooks',
    desc: 'Create your WhiteBooks developer account to get API credentials and sandbox access.',
    link: { label: 'Sign up', href: SIGNUP_URL },
  },
  {
    n: '02',
    icon: Key,
    title: 'Purchase Sandbox Access',
    desc: 'Login → Under KSA e-Invoice API → click Buy Now to activate your sandbox environment.',
    link: null,
  },
  {
    n: '03',
    icon: Shield,
    title: 'Obtain ZATCA Certificate (CSID)',
    desc: 'Generate your onboarding CSR and submit it to ZATCA via the Fatoorah portal to receive your Cryptographic Stamp Identifier.',
    link: { label: 'ZATCA Fatoorah', href: 'https://fatoorah.zatca.gov.sa' },
  },
  {
    n: '04',
    icon: Zap,
    title: 'Generate Your First e-Invoice',
    desc: 'Call POST /ksa/einvoice/clearance with your CSID and invoice payload. WhiteBooks signs and submits to ZATCA, returning the cleared invoice and QR code.',
    link: null,
  },
  {
    n: '05',
    icon: CheckCircle,
    title: 'Go Live in Production',
    desc: 'Switch your base URL to the production endpoint and upgrade your CSID to a production certificate. No schema changes required.',
    link: null,
  },
];

const KSA_SANDBOX_STEPS = [
  {
    n: 1,
    title: 'Create your WhiteBooks account',
    desc: 'Register at accounts.whitebooks.in and select Developer plan.',
    link: { label: 'Sign up →', href: SIGNUP_URL },
    icon: Users,
  },
  {
    n: 2,
    title: 'Purchase KSA Sandbox',
    desc: 'In the dashboard, find KSA e-Invoice API and click Buy Now for sandbox access.',
    link: null,
    icon: Key,
  },
  {
    n: 3,
    title: 'Generate sandbox CSID',
    desc: 'Use the /ksa/onboarding/csr endpoint to generate a CSR, then submit to ZATCA Simulation Environment.',
    link: null,
    icon: Terminal,
  },
  {
    n: 4,
    title: 'Call clearance endpoint',
    desc: 'POST to /ksa/einvoice/clearance with your sandbox credentials and sample invoice payload.',
    link: null,
    icon: CheckCircle,
  },
];

const KSA_SDK_ITEMS: SdkType[] = [
  { name: 'Postman', version: 'v1.0.0', logoUrl: sdkPostman, href: '#' },
];

const KSA_FAQS: FaqType[] = [
  {
    q: 'What is ZATCA Phase 2 e-invoicing?',
    a: 'ZATCA Phase 2 (Integration Phase) requires Saudi businesses to submit e-invoices to ZATCA\'s Fatoorah portal in real-time for clearance. Every B2B invoice must be cryptographically signed with a ZATCA-issued certificate (CSID) and cleared before delivery to the buyer.',
  },
  {
    q: 'What is a CSID and how do I get one?',
    a: 'A Cryptographic Stamp Identifier (CSID) is a ZATCA-issued certificate tied to your taxpayer unit. You generate a Certificate Signing Request (CSR) via the /ksa/onboarding/csr endpoint, submit it to the ZATCA Fatoorah portal, and ZATCA returns your production CSID.',
  },
  {
    q: 'Does WhiteBooks support B2C (simplified) invoices?',
    a: 'Yes. The KSA e-Invoice API supports both Standard (B2B, clearance flow) and Simplified (B2C, reporting flow) invoice types as defined by ZATCA.',
  },
  {
    q: 'What languages does the invoice XML support?',
    a: 'ZATCA requires invoice data in Arabic. WhiteBooks also supports bilingual Arabic + English output, attaching the translated fields automatically when you provide both language payloads.',
  },
  {
    q: 'Is there a sandbox environment for testing?',
    a: 'Yes. WhiteBooks provides a full sandbox connected to ZATCA\'s Simulation Environment. Sandbox CSIDs, clearances, and QR codes mirror production schema exactly.',
  },
];

const KSA_RESOURCE_ITEMS: ResourceItem[] = [
  {
    icon: ExternalLink,
    title: 'ZATCA Developer Portal',
    desc: 'Official ZATCA documentation for Phase 2 e-invoicing, CSID lifecycle, and Fatoorah APIs.',
    actions: [{ label: 'Open', href: 'https://zatca.gov.sa/en/E-Invoicing/Pages/default.aspx', variant: 'online' }],
  },
  {
    icon: FileText,
    title: 'KSA API Reference',
    desc: 'Full endpoint documentation with request/response schemas, error codes, and code examples.',
    actions: [{ label: 'View Docs', href: '/developer/ksa-e-invoice-api', variant: 'online' }],
  },
  {
    icon: FileText,
    title: 'Postman Collection',
    desc: 'Pre-configured Postman collection for KSA e-Invoice API with sandbox credentials.',
    actions: [{ label: 'Download', href: '#', variant: 'download' }],
  },
];

/* ─── KsaApiOverview ──────────────────────────────────────────────────── */

export default function KsaApiOverview(): React.ReactElement {
  return (
    <div className="min-h-screen" style={{ background: 'var(--dp-bg)' }}>
      <HeroSection
        title="KSA e-Invoice API for"
        description="The WhiteBooks KSA e-Invoice API gives developers programmatic access to ZATCA Phase 2 e-invoice generation, CSID lifecycle management, cryptographic signing, and Fatoorah clearance — from a single REST endpoint."
      />
      <Divider />
      <StatsSection />
      <Divider />
      <GettingStartedSection steps={KSA_STEPS} />
      <Divider />
      <SandboxSection
        title="KSA e-Invoice API Sandbox"
        subTitle="Test against ZATCA's Simulation Environment. Your sandbox CSID is fully isolated from production. No real invoices are submitted."
        setupSteps={KSA_SANDBOX_STEPS}
        showOTPBlock={false}
      />
      <Divider />
      <BestPracticesSection />
      <Divider />
      <SdkLibrariesSection sdkItems={KSA_SDK_ITEMS} />
      <Divider />
      {/* <GstResources resources={KSA_RESOURCE_ITEMS} faqs={KSA_FAQS} /> */}
      <Divider />
      <FinalCTA
        eyebrowLabel="ZATCA PHASE 2 | CRYPTOGRAPHIC SIGNING"
        headingStart="Integrate "
        headingAccent="KSA e-Invoicing"
        headingEnd="into Your Platform"
        description="WhiteBooks KSA e-Invoice API handles ZATCA Phase 2 clearance, CSID lifecycle, bilingual invoice generation, and QR code embedding — so you can focus on building, not compliance."
        trustItems={['ZATCA Phase 2 Certified', 'Fatoorah Clearance', 'Sandbox Included']}
        primaryButton={{ label: 'Get API Access', href: SIGNUP_URL }}
        secondaryButton={{ label: 'Read API Docs', href: '/developer/ksa-e-invoice-api' }}
      />
    </div>
  );
}
