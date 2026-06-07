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

function HomeRoute() {
  const [tab, setTab] = useState<string>('softwares');
  const routerNav = useNavigate();
  useReveal();

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

export function AppRouter() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/softwares" element={<HubSoftwares />} />
        <Route path="/softwares/:product" element={<SoftwareSubPageRoute />} />
        <Route path="/apis" element={<DpHome />} />
        <Route path="/apis/:product" element={<ApiSubPageRoute />} />
        <Route path="/developer/*" element={<DevPortal />} />
        {/* <Route path="/whitebooks" element={<AppShell />} /> */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
