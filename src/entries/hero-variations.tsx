import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DesignCanvas, DCSection, DCArtboard, DCPostIt } from '@/components/canvas/DesignCanvas';
import { HeroReconciliation, HeroCopilot, HeroTerminal } from '@/sections/heros/Heros';
import type { HeroProps } from '@/sections/heros/Heros';
import '@/styles/design-system-wb.css';
import '@/styles/globals.css';

const HERO_PROPS_HOME: HeroProps = {
  motion: true,
  intensity: 0.55,
  eyebrow: 'GSP · Licensed by GSTN',
  h1: {
    before: 'Compliance ',
    italic: 'infrastructure',
    // after: " for India's largest finance teams.",
  },
  sub: 'GST filing, e-invoicing, and e-way bills — automated, AI-reconciled, and trusted by P&G, IBM, Razorpay, and 12,000+ businesses across India.',
  primary: 'Book a 20-min demo',
  secondary: 'Talk to sales · +91 90321 11788',
  // microcopy: 'Migrating from ClearTax TaxCloud? We import your data in under 45 minutes.',
};

function HeroFrame({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div
      className="canvas-art"
      style={{ width: '100%', minHeight: '100%', background: 'var(--bg-base)', color: 'var(--fg-primary)', position: 'relative', overflow: 'hidden' }}
    >
      <nav className="site-nav">
        <div className="nav-inner">
          <div className="nav-left">
            <span className="logo">
              <span className="mark"></span>
              whitebooks
            </span>
            <div style={{ display: 'flex', gap: 28 }}>
              <span className="nav-link active">Home</span>
              <span className="nav-link">GST Software</span>
              <span className="nav-link">GST API</span>
              <span className="nav-link">Pricing</span>
              <span className="nav-link">Customers</span>
              <span className="nav-link">Docs</span>
            </div>
          </div>
          <div className="nav-right">
            <span className="nav-link">Sign in</span>
            <span className="btn btn-accent">Book a demo</span>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}

function App(): React.ReactElement {
  return (
    <DesignCanvas>
      <DCSection
        id="heros"
        title="Whitebooks · Hero variations"
        subtitle="Three directions for the homepage hero. Same headline + sub; different visual idea + supporting language. All dark, all Linear/Vercel-style."
      >
        <DCArtboard id="recon" label="01 · Reconciliation" width={1480} height={840}>
          <HeroFrame>
            <HeroReconciliation {...HERO_PROPS_HOME} />
          </HeroFrame>
        </DCArtboard>

        <DCArtboard id="copilot" label="02 · Copilot" width={1480} height={840}>
          <HeroFrame>
            <HeroCopilot
              {...HERO_PROPS_HOME}
              eyebrow="AI-native · On the Anthropic API"
              h1={{
                before: 'Compliance ',
                italic: 'that explains itself',
                // after: ', not just a chatbot in the corner.',
              }}
              sub="Ask Whitebooks why your ITC dropped, which vendors are unfiled, what your notice risk looks like — answered from your live data with source rows linked."
            />
          </HeroFrame>
        </DCArtboard>

        <DCArtboard id="terminal" label="03 · Terminal" width={1480} height={920}>
          <HeroFrame>
            <HeroTerminal
              {...HERO_PROPS_HOME}
              eyebrow="Direct GSP pipe · REST API"
              h1={{
                before: 'India compliance, ', italic: 'in five lines',
                // after: ' of code.'
              }}
              sub="REST, idempotent, retryable. Sandbox keys in 5 minutes. Production-grade SLAs. SDKs in Node, Python, PHP, Java, Go."
              primary="Get sandbox keys"
              secondary="Read the docs"
            // microcopy="Used in production by Razorpay, Pharmeasy, Cars24, WheelsEye, and 200+ teams."
            />
          </HeroFrame>
        </DCArtboard>
      </DCSection>

      <DCSection
        id="notes"
        title="Notes for the team"
        subtitle="A few things to consider as you pick a direction."
      >
        <DCPostIt width={280}>
          <strong>01 · Reconciliation</strong> is the strongest match to the brief — "the product is the hero." Best for CA + CFO buyers. Default in the live site.
        </DCPostIt>
        <DCPostIt width={280}>
          <strong>02 · Copilot</strong> leans into the AI-native positioning. Better hook for the "GST wasn't designed for AI" narrative; risk of feeling more abstract than the product itself.
        </DCPostIt>
        <DCPostIt width={280}>
          <strong>03 · Terminal</strong> is the developer-tuned hero — best on the API page, secondary option for the homepage if the developer audience is the priority.
        </DCPostIt>
      </DCSection>
    </DesignCanvas>
  );
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
