import { Helmet } from 'react-helmet-async';
import { SITE } from '../config/site';
import type { SeoMeta } from '../types';

interface SeoHeadProps extends SeoMeta {}

/**
 * Renders all per-page SEO tags into <head>:
 * title, description, canonical, OG, Twitter, robots,
 * AI-search meta, and content-type hints.
 */
export function SeoHead({
  title,
  description,
  canonical,
  keywords,
  robots,
  aiSummary,
  og,
  twitter,
}: SeoHeadProps) {
  const resolvedRobots = robots ?? SITE.defaultRobots;
  const ogTitle = og?.title ?? title;
  const ogDesc = og?.description ?? description;
  const ogImage = og?.image ?? SITE.defaultOgImage;
  const ogType = og?.type ?? 'website';
  const twitterCard = twitter?.card ?? 'summary_large_image';
  const twitterTitle = twitter?.title ?? title;
  const twitterDesc = twitter?.description ?? description;
  const twitterImage = twitter?.image ?? SITE.defaultOgImage;

  return (
    <Helmet>
      {/* ── Core ─────────────────────────────────── */}
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={resolvedRobots} />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="author" content={SITE.author} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="theme-color" content={SITE.themeColor} />

      {/* ── AI search optimization ────────────────── */}
      {aiSummary && <meta name="ai-summary" content={aiSummary} />}
      {aiSummary && <meta name="llm-summary" content={aiSummary} />}
      <meta name="content-type" content="compliance-software" />

      {/* ── OpenGraph ─────────────────────────────── */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDesc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:locale" content={SITE.locale} />

      {/* ── Twitter / X ───────────────────────────── */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={SITE.twitterHandle} />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDesc} />
      <meta name="twitter:image" content={twitterImage} />
    </Helmet>
  );
}
