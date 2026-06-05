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
import { SubClose } from "./SubClose";
import type { SubPageData } from "../../types/pages";

interface SubPageProps {
  data: SubPageData;
}

export function SubPage({ data }: SubPageProps) {
  useReveal();
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header mode={data.headerMode} />
      <main>
        {data.breadcrumb && (
          <section style={{ paddingTop: 100, paddingBottom: 0 }}>
            <div className="wb-wrap">
              <Breadcrumb items={data.breadcrumb} />
            </div>
          </section>
        )}

        <SubHero {...data.hero} />

        {data.problem && <ProblemSection data={data.problem} />}
        {data.features && <FeaturesSection data={data.features} />}
        {data.extra}
        {data.integrations && <IntegrationSection data={data.integrations} />}
        {data.ai && <AILayerSection data={data.ai} />}
        {data.pricing && <PricingSection data={data.pricing} />}
        {data.faq && <FAQSection data={data.faq} />}
        {data.closing && <SubClose data={data.closing} />}
      </main>
      <Footer />
    </div>
  );
}
