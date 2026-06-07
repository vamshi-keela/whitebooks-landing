import { useState, useEffect } from 'react';
import { Routes, Route, useParams, useNavigate, Navigate } from 'react-router-dom';
import { BookDemoModal } from '@/components/modals/BookDemoModal';
import { Header, Footer } from '@/layouts/SiteShell';
import { Hero, LogoWall } from '@/sections/WbHero';
import { HubSection } from '@/sections/WbHubs';
import { ProblemSection } from '@/sections/WbProblem';
import { FinanceTeamsSection } from '@/sections/WbFinanaceTeams';
import ClosingCTA from '@/components/ui/ClosingCTA';
import { ForDevelopersSection } from '@/sections/WbDevelopers';
import { AILayerSection } from '@/sections/WbAILayer';
import { ProofSection } from '@/sections/WbProof';
import { KSASection } from '@/sections/WbKSA';
import { FAQSection } from '@/sections/WbFAQ';
import { HubSoftwares } from '@/pages/hubs/HubSoftwares';
import { APISubPage, SubPage } from '@/components/subpage/SubPage';
import { ScrollToTop } from '@/components/ScrollToTop';
import { pagesRegistry } from '@/pages/registry/index';
import type { SubPageData } from '@/types/pages';
import { useReveal } from '@/hooks/useReveal';
import DevPortal from '@/pages/developer/DevPortal';
import DpHome from '@/pages/developer/DpHome';
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
import type { SchemaFaqItem } from '@/seo/types';

const SOFT_SLUG_MAP: Record<string, string> = {
  accounting: 'accounting',
  gst: 'gst-software',
  'e-invoice': 'e-invoice-software',
  'e-way-bill': 'e-way-bill-software',
  ksa: 'ksa-e-invoicing-software',
};

const API_SLUG_MAP: Record<string, string> = {
  gst: 'gst-api',
  'e-invoice': 'e-invoice-api',
  'e-way-bill': 'e-way-bill-api',
  ksa: 'ksa-e-invoice-api',
};

const HOME_FAQ_ITEMS: SchemaFaqItem[] = [
  {
    question: "What is Whitebooks?",
    answer: "Whitebooks is a GST Suvidha Provider (GSP) licensed by GSTN, offering cloud software and REST APIs for GST filing, e-invoicing, e-way bills, and KSA e-invoicing. It serves 30,000+ users across 12,000+ businesses including P&G, IBM, and Razorpay.",
  },
  {
    question: "Is Whitebooks a direct GSP or does it resell another GSP's capacity?",
    answer: "Whitebooks holds its GSP license directly from GSTN under BVM IT Consulting Services India Pvt. Ltd. It does not resell capacity from another licensee, which means faster latency, better uptime, and an independent roadmap.",
  },
  {
    question: "Which products does Whitebooks offer?",
    answer: "Whitebooks offers two product stacks: Softwares (Accounting, GST, e-Invoice, e-Way Bill, KSA e-Invoicing) for finance teams and CA firms; and APIs (GST API, e-Invoice API, e-Way Bill API, KSA e-Invoice API) for developers.",
  },
  {
    question: "Does Whitebooks support e-invoicing for Saudi Arabia?",
    answer: "Yes. Whitebooks is ZATCA-approved for Phase 2 e-invoicing in Saudi Arabia (FATOORAH integration, cryptographic signing, bilingual Arabic+English invoices). It is one of the few platforms handling both India GST and KSA e-invoicing on one workspace.",
  },
];

function HomeRoute() {
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
    const map: Record<string, string> = {
      'gst-soft': '/softwares/gst',
      'gst-api': '/apis/gst',
      'einvoice-soft': '/softwares/e-invoice',
      'einvoice-api': '/apis/e-invoice',
      'eway-soft': '/softwares/e-way-bill',
      'eway-api': '/apis/e-way-bill',
      'ksa-soft': '/softwares/ksa',
      'ksa-api': '/apis/ksa',
      accounting: '/softwares/accounting',
    };
    if (map[route]) routerNav(map[route]);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <SeoHead {...meta} />
      <StructuredData schema={homeSchema} />
      <Header mode="home" />
      <main>
        <Hero />
        <LogoWall />
        <HubSection tab={tab} setTab={setTab} navigate={navigate} />
        <ProblemSection />
        <FinanceTeamsSection />
        <ForDevelopersSection />
        <AILayerSection />
        <ProofSection />
        <KSASection />
        <FAQSection />
        <ClosingCTA
          eyebrow="One platform"
          eyebrowSubTitle="India + GCC"
          title="Build your India compliance once."
          body="GSP-licensed, AI-native, used by P&G, IBM, Razorpay, and 12,000+ more. Twenty minutes to see it run on your own data."
          primary="Book a 20-min Demo"
          secondary="Talk to sales: +91 90321 11788"
        />
      </main>
      <Footer />
    </div>
  );
}

function SoftwareSubPageRoute() {
  const { product } = useParams<{ product: string }>();
  const registryKey = SOFT_SLUG_MAP[product ?? ''];
  const pageDef = pagesRegistry[registryKey];
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    if (demoOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [demoOpen]);

  if (!pageDef) return <Navigate to="/softwares" replace />;

  return (
    <>
      <SubPage
        data={pageDef as SubPageData}
        onPrimaryClick={() => { window.location.href = 'https://accounts.whitebooks.in/login'; }}
        onSecondaryClick={() => setDemoOpen(true)}
      />
      {demoOpen && <BookDemoModal onClose={() => setDemoOpen(false)} />}
    </>
  );
}

function ApiSubPageRoute() {
  const { product } = useParams<{ product: string }>();
  const registryKey = API_SLUG_MAP[product ?? ''];
  const pageDef = pagesRegistry[registryKey];
  const navigate = useNavigate();

  if (!pageDef) return <Navigate to="/apis" replace />;

  return (
    <APISubPage
      data={pageDef as SubPageData}
      onPrimaryClick={() => { window.location.href = 'https://accounts.whitebooks.in/signup?type=Developer&subscrid=&inviteId'; }}
      onSecondaryClick={() => navigate('/developer')}
    />
  );
}

function SoftwaresHubRoute() {
  const meta = getPageMeta('/softwares');
  const schema = buildJsonLd(
    buildWebPageSchema({ canonicalUrl: meta.canonical, title: meta.title, description: meta.description }),
    buildBreadcrumbSchema([
      { label: 'Home', href: '/' },
      { label: 'Softwares' },
    ]),
  );
  return (
    <>
      <SeoHead {...meta} />
      <StructuredData schema={schema} />
      <HubSoftwares />
    </>
  );
}

function ApisHubRoute() {
  const meta = getPageMeta('/apis');
  const schema = buildJsonLd(
    buildWebPageSchema({ canonicalUrl: meta.canonical, title: meta.title, description: meta.description }),
    buildBreadcrumbSchema([
      { label: 'Home', href: '/' },
      { label: 'APIs' },
    ]),
  );
  return (
    <>
      <SeoHead {...meta} />
      <StructuredData schema={schema} />
      <DpHome />
    </>
  );
}

function DeveloperRoute() {
  const meta = getPageMeta('/developer');
  return (
    <>
      <SeoHead {...meta} />
      <DevPortal />
    </>
  );
}

export function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/softwares" element={<SoftwaresHubRoute />} />
        <Route path="/softwares/:product" element={<SoftwareSubPageRoute />} />
        <Route path="/apis" element={<ApisHubRoute />} />
        <Route path="/apis/:product" element={<ApiSubPageRoute />} />
        <Route path="/developer/*" element={<DeveloperRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
