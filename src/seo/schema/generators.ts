import { SITE } from '../config/site';
import { schemaId } from '../utils/slugs';
import type { BreadcrumbEntry, SchemaFaqItem } from '@/seo/types';

// ── Organization ─────────────────────────────────────────────────────────────

export function buildOrganizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${SITE.baseUrl}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: SITE.logo,
      width: 200,
      height: 48,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phone,
      contactType: 'sales',
      areaServed: ['IN', 'SA'],
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [
      'https://linkedin.com/company/whitebooks',
      'https://twitter.com/whitebooks_in',
    ],
    description:
      'WhiteBooks is a GST Suvidha Provider (GSP) licensed by GSTN, building AI-native compliance infrastructure for GST, e-invoicing, e-way bills, and KSA e-invoicing.',
    foundingLocation: {
      '@type': 'Place',
      name: 'India',
    },
    areaServed: ['India', 'Saudi Arabia'],
  };
}

// ── WebSite ───────────────────────────────────────────────────────────────────

export function buildWebSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE.baseUrl}/#website`,
    url: SITE.baseUrl,
    name: SITE.name,
    description: `${SITE.name} — ${SITE.tagline}`,
    publisher: { '@id': `${SITE.baseUrl}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// ── WebPage ───────────────────────────────────────────────────────────────────

export function buildWebPageSchema(opts: {
  canonicalUrl: string;
  title: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    '@type': 'WebPage',
    '@id': schemaId(opts.canonicalUrl, 'webpage'),
    url: opts.canonicalUrl,
    name: opts.title,
    description: opts.description,
    isPartOf: { '@id': `${SITE.baseUrl}/#website` },
    publisher: { '@id': `${SITE.baseUrl}/#organization` },
    inLanguage: 'en-IN',
    datePublished: opts.datePublished ?? '2024-01-01',
    dateModified: opts.dateModified ?? '2026-01-01',
  };
}

// ── BreadcrumbList ────────────────────────────────────────────────────────────

export function buildBreadcrumbSchema(items: BreadcrumbEntry[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${items[items.length - 1].href ?? '#'}#breadcrumb`,
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.label,
      ...(item.href ? { item: item.href.startsWith('http') ? item.href : `${SITE.baseUrl}${item.href}` } : {}),
    })),
  };
}

// ── FAQPage ───────────────────────────────────────────────────────────────────

export function buildFAQSchema(canonicalUrl: string, items: SchemaFaqItem[]) {
  return {
    '@type': 'FAQPage',
    '@id': schemaId(canonicalUrl, 'faq'),
    url: canonicalUrl,
    mainEntity: items.map((item, idx) => ({
      '@type': 'Question',
      '@id': `${schemaId(canonicalUrl, 'faq')}-q${idx + 1}`,
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

// ── SoftwareApplication ───────────────────────────────────────────────────────

export function buildSoftwareApplicationSchema(opts: {
  canonicalUrl: string;
  name: string;
  description: string;
  applicationCategory: string;
  operatingSystem?: string;
  offers?: { price?: string; priceCurrency?: string };
  featureList?: string[];
}) {
  return {
    '@type': 'SoftwareApplication',
    '@id': schemaId(opts.canonicalUrl, 'software'),
    name: opts.name,
    description: opts.description,
    url: opts.canonicalUrl,
    applicationCategory: opts.applicationCategory,
    operatingSystem: opts.operatingSystem ?? 'Web',
    offers: {
      '@type': 'Offer',
      price: opts.offers?.price ?? '0',
      priceCurrency: opts.offers?.priceCurrency ?? 'INR',
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${SITE.baseUrl}/#organization` },
    },
    featureList: opts.featureList ?? [],
    publisher: { '@id': `${SITE.baseUrl}/#organization` },
    inLanguage: 'en-IN',
  };
}

// ── Product ───────────────────────────────────────────────────────────────────

export function buildProductSchema(opts: {
  canonicalUrl: string;
  name: string;
  description: string;
  category: string;
  keywords?: string;
}) {
  return {
    '@type': 'Product',
    '@id': schemaId(opts.canonicalUrl, 'product'),
    name: opts.name,
    description: opts.description,
    url: opts.canonicalUrl,
    category: opts.category,
    brand: {
      '@type': 'Brand',
      name: SITE.name,
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      seller: { '@id': `${SITE.baseUrl}/#organization` },
      url: canonicalUrl(opts.canonicalUrl),
    },
  };
}

function canonicalUrl(url: string) { return url; }

// ── TechArticle ───────────────────────────────────────────────────────────────

export function buildTechArticleSchema(opts: {
  canonicalUrl: string;
  title: string;
  description: string;
  keywords?: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    '@type': 'TechArticle',
    '@id': schemaId(opts.canonicalUrl, 'tech-article'),
    headline: opts.title,
    description: opts.description,
    url: opts.canonicalUrl,
    keywords: opts.keywords,
    inLanguage: 'en-IN',
    author: { '@id': `${SITE.baseUrl}/#organization` },
    publisher: { '@id': `${SITE.baseUrl}/#organization` },
    datePublished: opts.datePublished ?? '2024-01-01',
    dateModified: opts.dateModified ?? '2026-01-01',
    isPartOf: { '@id': `${SITE.baseUrl}/#website` },
  };
}

// ── Compose graph ─────────────────────────────────────────────────────────────

export function buildJsonLd(...nodes: unknown[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}
