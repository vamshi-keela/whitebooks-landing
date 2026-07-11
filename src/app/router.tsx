import { useState, useEffect } from 'react';
import { Routes, Route, useParams, useNavigate, Navigate } from 'react-router-dom';
import { BookDemoModal } from '@/components/modals/BookDemoModal';
import { Header, Footer } from '@/layouts/SiteShell';
import { Hero, LogoWall } from '@/sections/WbHero';
import { HubAPIsSection, HubSection } from '@/sections/WbHubs';
import { ConnectorsSection } from '@/sections/ConnectorsSection';
import { WhyWhiteBooks } from '@/sections/WhyWhitebooks.tsx';
import { ExploreShowcase } from '@/sections/ExploreShowcase';
import { ProblemSection } from '@/sections/WbProblem';
import { FinanceTeamsSection } from '@/sections/WbFinanaceTeams';
import { SubClose } from '@/components/subpage/SubClose';
import { ForDevelopersSection } from '@/sections/WbDevelopers';
import { AILayerSection } from '@/sections/WbAILayer';
import { ProofSection } from '@/sections/WbProof';
import { KSASection } from '@/sections/WbKSA';
import { FAQSection } from '@/sections/WbFAQ';
import { HubSoftwares } from '@/pages/hubs/HubSoftwares';
import { HubServices } from '@/pages/services/HubServices';
import { APISubPage, SubPage } from '@/components/subpage/SubPage';
import { ScrollToTop } from '@/components/ScrollToTop';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { pagesRegistry } from '@/pages/registry/index';
import type { SubPageData } from '@/types/pages';
import { useReveal } from '@/hooks/useReveal';
import DevPortal from '@/pages/developer/DevPortal';
import ApiDocPage from '@/pages/developer/ApiDocPage';
import DpHome from '@/pages/developer/DpHome';
import GuidesLayout from '@/pages/developer/guides/GuidesLayout';
import GuideOverview from '@/pages/developer/guides/Overview';
import GuideQuickstart from '@/pages/developer/guides/Quickstart';
import GuideAuthentication from '@/pages/developer/guides/Authentication';
import GuideErrors from '@/pages/developer/guides/Errors';
import ApiReferenceLanding from '@/pages/developer/ApiReferenceLanding';
import Changelog from '@/pages/developer/Changelog';
import { PartnerWithUs } from '@/pages/resources/PartnerWithUs';
import { SupportPage } from '@/pages/resources/Support';
import { VideosPage } from '@/pages/resources/Videos';
import { AboutUs } from '@/pages/about/AboutUs';
import { ContactUs } from '@/pages/about/ContactUs';
import { Pricing } from '@/pages/about/Pricing';
import { Terms } from '@/pages/about/Terms';
import { PrivacyPolicy } from '@/pages/about/PrivacyPolicy';
import { RefundCancellation } from '@/pages/about/RefundCancellation';
import { GstNumberSearch } from '@/pages/tools/GstNumberSearch';
import { GstTaxCalculator } from '@/pages/tools/GstTaxCalculator';
import { MultiGstSearch } from '@/pages/tools/MultiGstSearch';
import { GstHsnSacSearch } from '@/pages/tools/GstHsnSacSearch';
import { StatusPage } from '@/pages/status/StatusPage';
import NoticeManagement from '@/pages/notices/NoticeManagement';
import GstLedgerReports from '@/pages/softwares/GstLedgerReports';
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
import ApiSuitePage from '@/pages/apis/ApiSuitePage';
import WbTrust from '@/sections/WbTrust';
import InvoiceTemplates from '@/sections/InvoiceTemplates';
import { EnterpriseControls } from '@/sections/EnterpriseControls';
import { ApiArchitecture } from '@/sections/ApiArchitecture';
import { DeveloperExperience } from '@/sections/DeveloperExperience';
import { IntegrationPartners } from '@/sections/IntegrationPartners';
import { ComplianceSupport } from '@/sections/ComplianceSupport';
import { CONNECTOR_REGISTRY } from '@/pages/connectors/connectors.data';
import { SapConnectorPage } from '@/pages/connectors/SapConnectorPage';
import { TallyConnectorPage } from '@/pages/connectors/TallyConnectorPage';
import WbStats from '@/sections/WbStats';
import SecurityHero from '@/components/security/SecurityHero';
import UseCasesAndPartners from '@/components/usecases-and-partners/UseCasesAndPartners';
import LogoWallCarousel from '@/components/ui/LogoWall';
import ShippingPage from '@/pages/about/ShippingPage';
import MoreFeaturesExplore from '@/pages/features/MoreFeaturesExplore';
import { getMoreFeaturesPage } from '@/data/more-features-explore.data';

/* ─── Slug maps ─────────────────────────────────────────────────────────── */

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

/* ─── Home FAQ schema items ──────────────────────────────────────────────── */

const HOME_FAQ_ITEMS: SchemaFaqItem[] = [
  {
    question: 'What is WhiteBooks?',
    answer:
      'WhiteBooks is a GST Suvidha Provider (GSP) licensed by GSTN, offering cloud software and REST APIs for GST filing, e-invoicing, e-way bills, and KSA e-invoicing. It serves 25,000+ active clients, 8K CAs, 9Cr IRNs, and 12,000+ businesses including P&G, IBM, and Razorpay.',
  },
  {
    question: 'Is WhiteBooks a direct GSP or does it resell another GSP\'s capacity?',
    answer:
      'WhiteBooks holds its GSP license directly from GSTN under BVM IT Consulting Services India Pvt. Ltd. It does not resell capacity from another licensee, which means faster latency, better uptime, and an independent roadmap.',
  },
  {
    question: 'Which products does WhiteBooks offer?',
    answer:
      'WhiteBooks offers two product stacks: Softwares (Accounting, GST, e-Invoice, e-Way Bill, KSA e-Invoicing) for finance teams and CA firms; and APIs (GST API, e-Invoice API, e-Way Bill API, KSA e-Invoice API) for developers.',
  },
  {
    question: 'Does WhiteBooks support e-invoicing for Saudi Arabia?',
    answer:
      'Yes. WhiteBooks is ZATCA-approved for Phase 2 e-invoicing in Saudi Arabia (FATOORAH integration, cryptographic signing, bilingual Arabic+English invoices). It is one of the few platforms handling both India GST and KSA e-invoicing on one workspace.',
  },
];

/* ─── Route components ───────────────────────────────────────────────────── */

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
      'notice-mgmt': '/softwares/notice-management',
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
        {/* <KSASection /> */}
        <FAQSection />
        <SubClose
          data={{
            h2: <>Everything India compliance. <span className="text-[var(--brand)]">One platform.</span></>,
            body: "GSP-licensed, AI-native, used by P&G, IBM, Razorpay, and 12,000+ more. Twenty minutes to see it run on your own data.",
            primaryCta: { label: "Book a 20-min Demo", href: "#" },
            secondaryCta: { label: "Talk to sales", href: "tel:+919032111788" },
          }}
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
        productSlug={product}
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

/* ─── Developer portal index (redirects to GST API docs) ────────────────── */

function ServicesHubRoute() {
  return <HubServices />;
}

function DevPortalIndex() {
  return <Navigate to="/developer/overview" replace />;
}

/* ─── Feature deep-dive pages (More features → /features/:slug) ──────────── */

function MoreFeaturesRoute() {
  const { slug } = useParams<{ slug: string }>();
  const page = getMoreFeaturesPage(slug ?? '');
  if (!page) return <Navigate to="/softwares" replace />;
  // Key by slug so in-page state (nav, FAQ) resets when hopping between features.
  return <MoreFeaturesExplore key={page.slug} data={page} />;
}

/* ─── Connector landing pages (SAP / Oracle / Dynamics / Tally) ───────────── */

function ConnectorPageRoute() {
  const { slug } = useParams<{ slug: string }>();
  const data = CONNECTOR_REGISTRY[slug ?? ''];
  if (!data) return <Navigate to="/" replace />;
  // Tally has its own template; every enterprise-ERP family (SAP, Oracle,
  // Microsoft Dynamics) shares the data-driven SapConnectorPage template.
  return data.platform === 'tally'
    ? <TallyConnectorPage data={data} />
    : <SapConnectorPage data={data} />;
}

/* ─── AppRouter ──────────────────────────────────────────────────────────── */

export function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <ScrollToTopButton />
      <Routes>
        {/* ── Marketing / product routes ────────────────────────────── */}
        <Route path="/" element={<HomeRoute />} />
        <Route path="/softwares" element={<SoftwaresHubRoute />} />
        <Route path="/softwares/gst-detailes" element={<GstLedgerReports />} />
        <Route path="/softwares/:product" element={<SoftwareSubPageRoute />} />
        {/* <Route path="/apis" element={<ApiSuitePage />} /> */}
        <Route path="/apis" element={<ApisHubRoute />} />
        <Route path="/apis/:product" element={<ApiSubPageRoute />} />
        <Route path="/services" element={<ServicesHubRoute />} />
        <Route path="/connectors/:slug" element={<ConnectorPageRoute />} />
        <Route path="/features/:slug" element={<MoreFeaturesRoute />} />
        <Route path="/resources/partners" element={<PartnerWithUs />} />
        <Route path="/resources/support" element={<SupportPage />} />
        <Route path="/resources/videos" element={<VideosPage />} />
        <Route path="/about/about-us" element={<AboutUs />} />
        <Route path="/about/contact-us" element={<ContactUs />} />
        <Route path="/about/pricing" element={<Pricing />} />
        <Route path="/about/shipping" element={<ShippingPage />} />
        <Route path="/about/terms" element={<Terms />} />
        <Route path="/about/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/about/refund-cancellation" element={<RefundCancellation />} />
        <Route path="/tools/gst-number-search" element={<GstNumberSearch />} />
        <Route path="/tools/gst-tax-calculator" element={<GstTaxCalculator />} />
        <Route path="/tools/multiple-gst-search" element={<MultiGstSearch />} />
        <Route path="/tools/gst-hsn-sac-search" element={<GstHsnSacSearch />} />

        {/* ── Notice Management ─────────────────────────────────────── */}
        <Route path="/softwares/notice-management" element={<NoticeManagement />} />

        {/* ── Status ────────────────────────────────────────────────── */}
        <Route path="/status" element={<StatusPage />} />

        {/* ── Developer portal (nested layout) ─────────────────────── */}
        <Route path="/developer" element={<DevPortal />}>
          {/* /developer → docs overview */}
          <Route index element={<DevPortalIndex />} />

          {/* Tab 1 — Guides */}
          <Route element={<GuidesLayout />}>
            <Route path="overview" element={<GuideOverview />} />
            <Route path="quickstart" element={<GuideQuickstart />} />
            <Route path="api-reference" element={<ApiReferenceLanding />} /><Route path="api-reference" element={<ApiReferenceLanding />} />
            <Route path="authentication" element={<GuideAuthentication />} />
            <Route path="errors" element={<GuideErrors />} />
          </Route>

          {/* Tab 2 — API Reference */}
          <Route path="api-reference" element={<ApiReferenceLanding />} />

          {/* GST API */}
          <Route path="gst-api" element={<ApiDocPage apiType="gst-api" />} />
          <Route path="gst-api/:opSlug" element={<ApiDocPage apiType="gst-api" />} />

          {/* e-Invoice API */}
          <Route path="e-invoice-api" element={<ApiDocPage apiType="e-invoice-api" />} />
          <Route path="e-invoice-api/:opSlug" element={<ApiDocPage apiType="e-invoice-api" />} />

          {/* e-Way Bill API */}
          <Route path="e-way-bill-api" element={<ApiDocPage apiType="e-way-bill-api" />} />
          <Route path="e-way-bill-api/:opSlug" element={<ApiDocPage apiType="e-way-bill-api" />} />

          {/* KSA e-Invoice API */}
          <Route path="ksa-e-invoice-api" element={<ApiDocPage apiType="ksa-e-invoice-api" />} />
          <Route path="ksa-e-invoice-api/:opSlug" element={<ApiDocPage apiType="ksa-e-invoice-api" />} />

          {/* Tab 3 — Changelog */}
          <Route path="changelog" element={<Changelog />} />
        </Route>

        {/* ── Fallback ──────────────────────────────────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
