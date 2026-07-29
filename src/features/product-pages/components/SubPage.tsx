"use client";
import { Header } from "@/layouts/SiteShell";
import { Footer } from "@/layouts/SiteShell";
import { useReveal } from "@/shared/hooks/useReveal";
import SubHero, { APISubHero } from "@/components/subpage/SubHero";
import { ProblemSection } from "@/components/subpage/ProblemSection";
import { FeaturesSection } from "@/components/subpage/FeaturesSection";
import { IntegrationSection } from "@/components/subpage/IntegrationSection";
import { AILayerSection } from "@/components/subpage/AILayerSection";
import { FAQSection } from "@/components/subpage/FAQSection";
import { APISubClose, SubClose } from "@/components/subpage/SubClose";
import type { SubPageData } from "@/shared/types/pages";
import { SeoHead } from "@/seo/components/SeoHead";
import { StructuredData } from "@/seo/components/StructuredData";
import {
  buildJsonLd,
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
  buildSoftwareApplicationSchema,
  buildTechArticleSchema,
} from "@/seo/schema/generators";
import type { SchemaFaqItem } from "@/seo/types";
import ExploreShowcase from "@/sections/ExploreShowcase";
import InvoiceTemplates from "@/sections/InvoiceTemplates";
import EnterpriseControls from "@/sections/EnterpriseControls";
import WbTrust from "@/sections/WbTrust";
import PlatformShowcase from "@/sections/PlatformShowcase";
import TrustStats from "@/sections/TrustStats";

interface SubPageProps {
  data: SubPageData;
  /** Route product slug (e.g. "e-invoice") — used to gate page-specific affordances. */
  productSlug?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

function buildSoftwareSchema(data: SubPageData) {
  const seo = data.seo;
  if (!seo) return null;
  const canonical = seo.canonical;
  const faqs: SchemaFaqItem[] =
    data.faq?.items.map((f) => ({ question: f.q, answer: f.a })) ?? [];
  const nodes: unknown[] = [
    buildWebPageSchema({ canonicalUrl: canonical, title: seo.title, description: seo.description }),
    buildBreadcrumbSchema(data.breadcrumb ?? [{ label: "Home", href: "/" }]),
    buildSoftwareApplicationSchema({
      canonicalUrl: canonical,
      name: seo.title.split(" | ")[0],
      description: seo.description,
      applicationCategory: "BusinessApplication",
    }),
  ];
  if (faqs.length > 0) nodes.push(buildFAQSchema(canonical, faqs));
  return buildJsonLd(...nodes);
}

function buildApiPageSchema(data: SubPageData) {
  const seo = data.seo;
  if (!seo) return null;
  const canonical = seo.canonical;
  const faqs: SchemaFaqItem[] =
    data.faq?.items.map((f) => ({ question: f.q, answer: f.a })) ?? [];
  const nodes: unknown[] = [
    buildWebPageSchema({ canonicalUrl: canonical, title: seo.title, description: seo.description }),
    buildBreadcrumbSchema(data.breadcrumb ?? [{ label: "Home", href: "/" }]),
    buildTechArticleSchema({
      canonicalUrl: canonical,
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
    }),
  ];
  if (faqs.length > 0) nodes.push(buildFAQSchema(canonical, faqs));
  return buildJsonLd(...nodes);
}

export function SubPage({ data, productSlug, onPrimaryClick, onSecondaryClick }: SubPageProps) {
  useReveal();
  const schema = buildSoftwareSchema(data);
  const handleSecondaryClick = onSecondaryClick ?? (() => {
    const href = data.hero.secondaryCta?.href;
    if (href) window.open(href, '_blank', 'noopener,noreferrer');
  });

  return (
    <div className="min-h-screen">
      {data.seo && <SeoHead {...data.seo} />}
      {schema && <StructuredData schema={schema} />}
      <Header mode={data.headerMode} />
      <main itemScope itemType="https://schema.org/SoftwareApplication">
        <SubHero
          {...data.hero}
          breadcrumb={data.breadcrumb}
          onPrimaryClick={onPrimaryClick}
          onSecondaryClick={handleSecondaryClick}
        />

        <TrustStats />

        {data.problem && <ProblemSection data={data.problem} />}
        {/* {data.features && <FeaturesSection data={data.features} />} */}
        {data.featureShowCase && <PlatformShowcase categories={data.featureShowCase} />}
        {data.extra}
        <EnterpriseControls />
        {data.exploreShowCase && <ExploreShowcase features={data.exploreShowCase} />}
        <InvoiceTemplates showQr={productSlug === "e-invoice"} />
        <WbTrust />
        {data.integrations && <IntegrationSection data={data.integrations} />}
        {data.ai && <AILayerSection data={data.ai} />}
        {data.faq && <FAQSection data={data.faq} />}
        {data.closing && <SubClose data={data.closing} />}
      </main>
      <Footer />
    </div>
  );
}

export function APISubPage({ data, onPrimaryClick, onSecondaryClick }: SubPageProps) {
  useReveal();
  const schema = buildApiPageSchema(data);
  const handleSecondaryClick = onSecondaryClick ?? (() => {
    const href = data.hero.secondaryCta?.href;
    console.log("handleSecondaryClick", href)
    if (href) window.open(href, '_blank', 'noopener,noreferrer');
  });

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {data.seo && <SeoHead {...data.seo} />}
      {schema && <StructuredData schema={schema} />}
      <Header mode={data.headerMode} />
      <main itemScope itemType="https://schema.org/TechArticle">
        <APISubHero
          {...data.hero}
          breadcrumb={data.breadcrumb}
          onPrimaryClick={onPrimaryClick}
          onSecondaryClick={handleSecondaryClick}
        />
        {data.problem && <ProblemSection data={data.problem} />}
        {data.features && <FeaturesSection data={data.features} />}
        {data.extra}
        {data.integrations && <IntegrationSection data={data.integrations} />}
        {data.ai && <AILayerSection data={data.ai} />}
        {data.faq && <FAQSection data={data.faq} />}
        {data.closing && <APISubClose data={data.closing} />}
      </main>
      <Footer />
    </div>
  );
}
