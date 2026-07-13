import type React from 'react';
import type { BreadcrumbItem, FaqItem, HeaderMode } from './components';
import { SubPageData } from './pages';

export interface CtaLink {
  label: string;
  href?: string;
}

export interface HeroDef {
  eyebrow: string;
  title: React.ReactNode;
  sub: React.ReactNode;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  micro?: string;
  visual?: React.ReactNode;
}

export interface ProblemItem {
  title: string;
  body: React.ReactNode;
}

export interface ProblemDef {
  heading: React.ReactNode;
  items: ProblemItem[];
}

export interface FeatureItem {
  title?: string;
  body: React.ReactNode;
  endpoint?: string;
}

export interface FeaturesDef {
  label?: string;
  heading: React.ReactNode;
  items: FeatureItem[];
}

export interface IntegrationsDef {
  heading: string;
  body: string;
  logos: string[];
  cta: CtaLink;
  secondaryCta?: CtaLink;
}

export interface AiItem {
  title: string;
  body: React.ReactNode;
}

export interface AiDef {
  heading: React.ReactNode;
  items: AiItem[];
  note?: React.ReactNode;
}

export interface PricingTier {
  name: string;
  price: string;
  cycle?: string;
  featured?: boolean;
  cta: string;
  points: string[];
}

export interface PricingDef {
  heading?: string;
  body: string;
  tiers: PricingTier[];
  note?: string;
  cta?: CtaLink;
}

export interface FaqDef {
  heading?: string;
  items: FaqItem[];
}

export interface ClosingDef {
  h2: React.ReactNode;
  body: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
}

export interface PageDef {
  headerMode: HeaderMode;
  breadcrumb: BreadcrumbItem[];
  hero: HeroDef;
  problem?: ProblemDef;
  features?: FeaturesDef;
  integrations?: IntegrationsDef;
  ai?: AiDef;
  pricing?: PricingDef;
  faq?: FaqDef;
  closing?: ClosingDef;
  extra?: React.ReactNode;
}

export type PagesRegistry = Record<string, SubPageData>;
