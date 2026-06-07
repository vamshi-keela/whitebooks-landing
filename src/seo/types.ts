export interface SeoMeta {
  title: string;
  description: string;
  canonical: string;
  keywords?: string;
  robots?: string;
  /** Plain-text summary for AI crawlers */
  aiSummary?: string;
  og?: {
    title?: string;
    description?: string;
    image?: string;
    type?: 'website' | 'article';
  };
  twitter?: {
    card?: 'summary' | 'summary_large_image';
    title?: string;
    description?: string;
    image?: string;
  };
}

export interface BreadcrumbEntry {
  label: string;
  href?: string;
}

export interface SchemaFaqItem {
  question: string;
  answer: string;
}

export type SchemaType =
  | 'Organization'
  | 'WebSite'
  | 'WebPage'
  | 'SoftwareApplication'
  | 'TechArticle'
  | 'FAQPage'
  | 'BreadcrumbList'
  | 'Product'
  | 'ContactPoint';

export interface JsonLdGraph {
  '@context': 'https://schema.org';
  '@graph': unknown[];
}
