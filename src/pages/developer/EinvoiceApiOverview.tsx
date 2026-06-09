import React from "react";
import { ArrowRight, BookOpen, CheckCircle, Key, Terminal, Users, Zap } from "lucide-react";
import { BestPracticesSection, CtaSection, Divider, GettingStartedSection, GuideArchitecture, HeroSection, SandboxSection, SdkLibrariesSection, SdkType, StatsSection } from "./GstOverview";
import GstResources from "./GstResources";
import sdkPostman from '../../assets/logos/postman.svg';
import sdkCsharp from '../../assets/logos/csharp-logo.svg';
import sdkNodejs from '../../assets/logos/nodejs-logo.svg';
import sdkPhp from '../../assets/logos/php-logo.svg';
import vbNet from '../../assets/logos/vbnet-logo.svg';
import vb6 from '../../assets/logos/vb6.png';
import dotNet from '@/assets/logos/dot-net-logo.png';
import visualFox from '../../assets/logos/vs-fox-logo.png';

import { LOGIN_URL, SIGNUP_URL } from "@/utils/contants";
import { INV_FAQS, INV_RESOURCE_ITEMS } from "@/data/e-invoice-api-page-data";
import EyebrowPill from "@/components/ui/EyebrowPill";

const STEPS_INV = [
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
        desc: 'Login -> Under e - Invoice API -> Click on Buy now to purchase Sandbox',
        link: null,
    },
    {
        n: '03',
        icon: Zap,
        title: 'Start Using APIs',
        desc: 'Start using WhiteBooks e-Invoice Client ID & Client Secret ID Credentials for your Sandbox Testing',
        link: null,
    },
];
const INV_SANDBOX_SETUP_STEPS = [
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
        desc: 'Click credentials on e-Invoice API card, click on create credentials button.',
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

const INV_SDK_ITEMS: SdkType[] = [
    { name: 'Postman', version: 'v2.1.0', logoUrl: sdkPostman, href: SIGNUP_URL },
    { name: 'C-Sharp', version: 'v4.8.2', logoUrl: sdkCsharp, href: SIGNUP_URL },
    { name: 'Node JS', version: 'v20.12.0', logoUrl: sdkNodejs, href: SIGNUP_URL },
    { name: 'VB.NET', version: 'v4.8.2', logoUrl: vbNet, href: SIGNUP_URL },
    { name: 'PHP', version: 'v8.3.4', logoUrl: sdkPhp, href: SIGNUP_URL },
    { name: 'VB6', version: 'v6.0', logoUrl: vb6, href: SIGNUP_URL },
    { name: '.Net', version: 'v10.0', logoUrl: dotNet, href: SIGNUP_URL },
    { name: 'Visual FoxPro', version: 'v9.0', logoUrl: visualFox, href: SIGNUP_URL },
];
interface FinalCTAButton {
    label: string;
    icon?: React.ReactNode;
    href?: string;
    onClick?: () => void;
}

interface FinalCTAProps {
    eyebrowLabel?: string;
    headingStart?: string;
    headingAccent?: string;
    headingEnd?: string;
    description?: string;
    primaryButton?: FinalCTAButton;
    secondaryButton?: FinalCTAButton;
    trustItems?: string[];
}

export function FinalCTA({
    eyebrowLabel = 'GST SUVIDHA PROVIDER | ISO 27001:2013',
    headingStart = 'Ready to Launch',
    headingAccent = 'GST-Compliant e-Invoicing',
    headingEnd = 'in Your Platform?',
    description = 'Integrate WhiteBooks e-Invoice APIs with your ERP, accounting software, or SaaS platform to automate IRN generation, invoice validation, and GST compliance — with secure APIs, sandbox access, and expert integration support.',
    primaryButton = { label: 'Get API Access', icon: <ArrowRight size={15} /> },
    secondaryButton = { label: 'Read API Docs', icon: <BookOpen size={15} /> },
    trustItems = [
        'Sandbox Environment',
        'Fast API Integration',
        'Dedicated Technical Support',
        'Secure & Scalable Infrastructure',
    ],
}: FinalCTAProps) {
    return (
        <section
            className="relative overflow-hidden px-6 py-16 sm:px-10 lg:px-16"
            style={{
                background: 'var(--dp-surface)',
            }}
        >
            {/* Background Glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at top right, var(--dp-accent-line), transparent 30%), radial-gradient(circle at bottom left, var(--dp-accent-soft), transparent 35%)',
                }}
            />

            <div className="relative z-10 mx-auto max-w-4xl text-center">
                <EyebrowPill label={eyebrowLabel} />

                <h2
                    className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl"
                    style={{ fontFamily: 'var(--dp-font-display)', color: 'var(--dp-fg)' }}
                >
                    {headingStart}{" "}
                    <span className="bg-gradient-to-r from-[#ff7aa5] to-[#dc2f65] bg-clip-text text-transparent">
                        {headingAccent}
                    </span>{" "}
                    {headingEnd}
                </h2>

                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8" style={{ color: 'var(--dp-fg-muted)' }}>
                    {description}
                </p>

                <div className="flex justify-center gap-3 flex-wrap mb-8 mt-8">
                    <a
                        href={primaryButton.href}
                        onClick={primaryButton.onClick}
                        className="inline-flex items-center gap-2 px-7 py-[13px] rounded-[10px] text-[14px] font-semibold border-0 cursor-pointer no-underline"
                        style={{
                            background: 'var(--dp-accent)',
                            color: '#fff',
                            boxShadow: '0 0 24px var(--dp-accent-glow), 0 4px 16px rgba(0,0,0,0.2)',
                        }}
                    >
                        {primaryButton.label} {primaryButton.icon}
                    </a>
                    <a
                        href={secondaryButton.href}
                        onClick={secondaryButton.onClick}
                        className="inline-flex items-center gap-2 px-7 py-[13px] rounded-[10px] text-[14px] font-semibold cursor-pointer no-underline"
                        style={{
                            background: 'var(--dp-surface-2)',
                            border: '1px solid var(--dp-border-strong)',
                            color: 'var(--dp-fg)',
                        }}
                    >
                        {secondaryButton.icon} {secondaryButton.label}
                    </a>
                </div>

                <div className="mt-2 flex flex-wrap items-center justify-center gap-6 text-sm" style={{ color: 'var(--dp-fg-dim)' }}>
                    {trustItems.map((item) => (
                        <span key={item}>✓ {item}</span>
                    ))}
                </div>
            </div>
        </section>
    );
}
export default function InvoiceApiOverview() {
    return (
        <div className="min-h-screen" style={{ background: 'var(--dp-bg' }}>
            <HeroSection
                title="E-Invoice APIs for"
                description="The WhiteBooks e-Invoice API generates IRN and signed QR codes against the official Invoice Registration Portal in <100ms — with bulk IRN, real-time and batch modes, and webhook callbacks for downstream systems."
            />
            <Divider />
            <StatsSection />
            <Divider />
            <GuideArchitecture />
            <Divider />
            <GettingStartedSection steps={STEPS_INV} />
            <Divider />
            <SandboxSection
                title='WhiteBooks E-Invoice API Sandbox Information'
                subTitle='To use E-Invoice API Sandbox Credentials, follow the steps below to generate your API keys from the developer dashboard.'
                setupSteps={INV_SANDBOX_SETUP_STEPS}
                showOTPBlock={false}
            />
            <Divider />
            <BestPracticesSection />

            <Divider />
            <SdkLibrariesSection sdkItems={INV_SDK_ITEMS} />
            <Divider />
            {/* gst resources */}
            <GstResources resources={INV_RESOURCE_ITEMS} faqs={INV_FAQS} />
            <Divider />
            <FinalCTA primaryButton={{ label: 'Get API Access', href: SIGNUP_URL }}
                secondaryButton={{ label: 'Read API Docs', href: '#' }} />
        </div>
    );
}