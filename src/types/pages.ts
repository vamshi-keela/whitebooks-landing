import type { ReactNode } from 'react'
import type { SeoMeta } from '@/seo/types'

export type HeaderMode = 'home' | 'softwares' | 'apis'

export interface BreadcrumbItem {
    label: string
    href?: string
}

export interface CtaConfig {
    label: string
    href?: string
}

export interface HeroConfig {
    eyebrow: string
    title: ReactNode
    sub: ReactNode
    primaryCta?: CtaConfig
    secondaryCta?: CtaConfig
    micro?: string
    visual?: ReactNode
    breadcrumb?: BreadcrumbItem[]
}

export interface ProblemItem {
    title: string
    body: string
}

export interface ProblemConfig {
    heading: ReactNode
    items: ProblemItem[]
}

export interface FeatureItem {
    visualKey?: string
    navLabel?: string
    title?: string
    body: ReactNode
    endpoint?: string
}

export interface FeaturesConfig {
    label?: string
    heading: ReactNode
    layout?: 'guide'
    items: FeatureItem[]
}

export interface IntegrationsConfig {
    heading: string
    body?: string
    logos: string[]
    cta?: CtaConfig
    secondaryCta?: CtaConfig
}

export interface AIItem {
    title: string
    body: ReactNode
}

export interface AIConfig {
    heading: ReactNode
    label?: string
    items: AIItem[]
    note?: ReactNode
}

export interface PricingTier {
    name: string
    price: string
    cycle?: string
    featured?: boolean
    cta?: string
    points: string[]
}

export interface ProblemSection {
    heading: ReactNode;
    items: ProblemItem[];
}

export interface PricingSection {
    heading?: string;
    body?: string;
    tiers: PricingTier[];
    note?: string;
    cta?: CtaLink;
}
export interface PricingConfig {
    heading?: string
    body?: string
    tiers: PricingTier[]
    note?: string
    cta?: CtaConfig
}

export interface FaqItem {
    q: string
    a: string
}

export interface FaqConfig {
    heading?: string
    items: FaqItem[]
}

export interface ClosingConfig {
    h2: ReactNode
    body: string
    primaryCta?: CtaConfig
    secondaryCta?: CtaConfig
}

export interface ClosingSection {
    h2: ReactNode;
    body: string;
    primaryCta?: CtaLink;
    secondaryCta?: CtaLink;
}

export interface PageConfig {
    headerMode: HeaderMode
    breadcrumb?: BreadcrumbItem[]
    hero: HeroConfig
    problem?: ProblemConfig
    features?: FeaturesConfig
    integrations?: IntegrationsConfig
    ai?: AIConfig
    pricing?: PricingConfig
    faq?: FaqConfig
    closing?: ClosingConfig
}

export interface AIItem {
    title: string;
    body: ReactNode;
}

export interface AISection {
    label?: string;
    heading: ReactNode;
    items: AIItem[];
    note?: ReactNode;
}

export interface FAQItem {
    q: string;
    a: string;
}

export interface FAQSection {
    heading?: string;
    items: FAQItem[];
}

export interface FeaturesSection {
    label?: string;
    heading: ReactNode;
    layout?: "guide" | "grid";
    items: FeatureItem[];
}


export interface CtaLink {
    label: string;
    href?: string;
    target?: '_blank' | '_self' | '_parent' | '_top';
}
export interface IntegrationSection {
    heading: string;
    body?: string;
    logos: string[];
    cta?: CtaLink;
    secondaryCta?: CtaLink;
}


export interface SubPageData {
    headerMode: HeaderMode;
    breadcrumb?: BreadcrumbItem[];
    /** Page-level SEO metadata — title, description, canonical, schema hints. */
    seo?: SeoMeta;
    hero: HeroProps;
    problem?: ProblemSection;
    features?: FeaturesSection;
    integrations?: IntegrationSection;
    ai?: AISection;
    pricing?: PricingSection;
    faq?: FAQSection;
    closing?: ClosingSection;
    /** Optional extra section (e.g. ProductMap for e-Way Bill). */
    extra?: ReactNode;
}


export interface HeroProps {
    eyebrow: string;
    title: ReactNode;
    sub: ReactNode;
    primaryCta?: CtaLink;
    secondaryCta?: CtaLink;
    /** HTML-like micro line; preserved from source which used dangerouslySetInnerHTML. */
    micro?: string;
    visual?: ReactNode;
}
