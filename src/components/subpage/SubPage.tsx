"use client";
import { Header } from "@/layouts/SiteShell";
import { Footer } from "@/layouts/SiteShell";
import { Breadcrumb } from "@/layouts/SiteShell";
import { useReveal } from "@/hooks/useReveal";
import SubHero from "./SubHero";
import { ProblemSection } from "./ProblemSection";
import { FeaturesSection } from "./FeaturesSection";
import { IntegrationSection } from "./IntegrationSection";
import { AILayerSection } from "./AILayerSection";
import { PricingSection } from "./PricingSection";
import { FAQSection } from "./FAQSection";
import { APISubClose, SubClose } from "./SubClose";
import type { SubPageData } from "../../types/pages";

interface SubPageProps {
  data: SubPageData;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export function SubPage({ data, onPrimaryClick, onSecondaryClick }: SubPageProps) {
  useReveal();
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header mode={data.headerMode} />
      <main>
        <SubHero {...data.hero} breadcrumb={data.breadcrumb} onPrimaryClick={onPrimaryClick} onSecondaryClick={onSecondaryClick} />
        {data.problem && <ProblemSection data={data.problem} />}
        {data.features && <FeaturesSection data={data.features} />}
        {data.extra}
        {data.integrations && <IntegrationSection data={data.integrations} />}
        {data.ai && <AILayerSection data={data.ai} />}
        {/* {data.pricing && <PricingSection data={data.pricing} />} */}
        {data.faq && <FAQSection data={data.faq} />}
        {data.closing && <SubClose data={data.closing} />}
      </main>
      <Footer />
    </div>
  );
}

export function APISubPage({ data, onPrimaryClick, onSecondaryClick }: SubPageProps) {
  useReveal();
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header mode={data.headerMode} />
      <main>
        <SubHero {...data.hero} breadcrumb={data.breadcrumb} onPrimaryClick={onPrimaryClick} onSecondaryClick={onSecondaryClick} />
        {data.problem && <ProblemSection data={data.problem} />}
        {data.features && <FeaturesSection data={data.features} />}
        {data.extra}
        {data.integrations && <IntegrationSection data={data.integrations} />}
        {data.ai && <AILayerSection data={data.ai} />}
        {/* {data.pricing && <PricingSection data={data.pricing} />} */}
        {data.faq && <FAQSection data={data.faq} />}
        {data.closing && <APISubClose data={data.closing} />}
      </main>
      <Footer />
    </div>
  );
}
