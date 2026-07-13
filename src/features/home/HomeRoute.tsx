import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Footer } from '@/layouts/SiteShell';
import { Hero, LogoWall } from '@/features/home/components/WbHero';
import { HubAPIsSection, HubSection } from '@/features/home/components/WbHubs';
import { ConnectorsSection } from '@/features/home/components/ConnectorsSection';
import { WhyWhiteBooks } from '@/features/home/components/WhyWhitebooks';
import { ProblemSection } from '@/features/home/components/WbProblem';
import { FinanceTeamsSection } from '@/features/home/components/WbFinanaceTeams';
import { SubClose } from '@/components/subpage/SubClose';
import { ForDevelopersSection } from '@/features/home/components/WbDevelopers';
import { AILayerSection } from '@/features/home/components/WbAILayer';
import { ProofSection } from '@/sections/WbProof';
import { FAQSection } from '@/features/home/components/WbFAQ';
import { SeoHead } from '@/seo/components/SeoHead';
import { StructuredData } from '@/seo/components/StructuredData';
import { getPageMeta } from '@/seo/metadata';
import {
  buildJsonLd,
  buildOrganizationSchema,
  buildWebSiteSchema,
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildFAQSchema,
} from '@/seo/schema/generators';
import WbTrust from '@/sections/WbTrust';
import WbStats from '@/features/home/components/WbStats';
import SecurityHero from '@/components/security/SecurityHero';
import LogoWallCarousel from '@/shared/ui/LogoWall';
import { useReveal } from '@/shared/hooks/useReveal';
import { HOME_FAQ_ITEMS, HOME_PRODUCT_ROUTES } from '@/features/home/data';

export function HomeRoute() {
  const [tab, setTab] = useState<string>('softwares');
  const routerNav = useNavigate();
  useReveal();

  const meta = getPageMeta('/');
  const homeSchema = buildJsonLd(
    buildOrganizationSchema(),
    buildWebSiteSchema(),
    buildWebPageSchema({ canonicalUrl: meta.canonical, title: meta.title, description: meta.description }),
    buildBreadcrumbSchema([{ label: 'Home', href: '/' }]),
    buildFAQSchema(meta.canonical, HOME_FAQ_ITEMS),
  );

  const navigate = (route: string) => {
    if (HOME_PRODUCT_ROUTES[route]) routerNav(HOME_PRODUCT_ROUTES[route]);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <SeoHead {...meta} />
      <StructuredData schema={homeSchema} />
      <Header mode="home" />
      <main>
        <Hero />
        <LogoWallCarousel />
        <LogoWall />
        <HubSection tab={tab} setTab={setTab} navigate={navigate} />
        <HubAPIsSection />
        <ConnectorsSection />
        <WhyWhiteBooks />
        <WbStats />
        <WbTrust />
        <SecurityHero />
        <ProblemSection />
        <FinanceTeamsSection />
        <ForDevelopersSection />
        <AILayerSection />
        <ProofSection />
        <FAQSection />
        <SubClose
          data={{
            h2: <>Everything India compliance. <span className="text-[var(--brand)]">One platform.</span></>,
            body: 'GSP-licensed, AI-native, used by P&G, IBM, Razorpay, and 12,000+ more. Twenty minutes to see it run on your own data.',
            primaryCta: { label: 'Book a 20-min Demo', href: '#' },
            secondaryCta: { label: 'Talk to sales', href: 'tel:+919032111788' },
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
