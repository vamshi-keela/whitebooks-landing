import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Header } from '@/layouts/SiteShell';
import { Hero, LogoWall } from '@/sections/WbHero';
import { HubSection } from '@/sections/WbHubs';
import { Footer } from '@/layouts/SiteShell';
import { useReveal } from '@/hooks/useReveal';
import '@/styles/design-system-wb.css';
import '@/styles/globals.css';
import { ProblemSection } from '@/sections/WbProblem';
import { FinanceTeamsSection } from '@/sections/WbFinanaceTeams';
import ClosingCTA from '@/components/ui/ClosingCTA';
import { ForDevelopersSection } from '@/sections/WbDevelopers';
import { AILayerSection } from '@/sections/WbAILayer';
import { ProofSection } from '@/sections/WbProof';
import { KSASection } from '@/sections/WbKSA';
import { PricingSection } from '@/sections/WbPricing';
import { FAQSection } from '@/sections/WbFAQ';

function App(): React.ReactElement {
  const [tab, setTab] = useState<string>('softwares');
  useReveal();

  const navigate = (route: string) => {
    const map: Record<string, string> = {
      'gst-soft': 'Software - GST.html',
      'gst-api': 'API - GST.html',
      'einvoice-soft': 'Software - e-Invoice.html',
      'einvoice-api': 'API - e-Invoice.html',
      'eway-soft': 'Software - e-Way Bill.html',
      'eway-api': 'API - e-Way Bill.html',
      'ksa-soft': 'Software - KSA e-Invoicing.html',
      'ksa-api': 'API - KSA e-Invoice.html',
      'accounting': 'Software - Accounting.html',
    };
    if (map[route]) window.location.href = map[route];
  };

  return (
    <div className="wb-page">
      <Header mode="home" />
      <main>
        <Hero />
        <LogoWall />
        <ProblemSection />
        <HubSection tab={tab} setTab={setTab} navigate={navigate} />
        <FinanceTeamsSection />
        <ForDevelopersSection />
        <AILayerSection />
        <ProofSection />
        <KSASection />
        <FAQSection />
        <ClosingCTA
          eyebrow="One platform · India + GCC"
          title="Build your India compliance once."
          body="GSP-licensed, AI-native, used by P&G, IBM, Razorpay, and 12,000+ more. Twenty minutes to see it run on your own data."
          primary="Book a 20-min demo"
          secondary="Talk to sales · +91 90321 11788"
        />
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
