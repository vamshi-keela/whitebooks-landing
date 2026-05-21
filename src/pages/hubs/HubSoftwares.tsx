import React from 'react';
import Icon from '@/components/icons/Icon';
import { Header, Footer, FluidBackground, Eyebrow, Breadcrumb } from '@/layouts/SiteShell';
import { PlainSection, ColumnGrid, IntegrationStrip, SubClose } from '@/layouts/SubpageShell';
import { useReveal } from '@/hooks/useReveal';

interface SoftwareProduct {
  icon: React.ReactNode;
  name: string;
  oneliner: string;
  features: string[];
  bestFor: string;
  href: string;
}

const SOFTWARE_PRODUCTS: SoftwareProduct[] = [
  {
    icon: <Icon.Accounting />,
    name: "Accounting Software",
    oneliner: "Cloud books that post journals automatically from your sales and purchase data.",
    features: ["Automated journal entries", "Multi-entity consolidation", "Audit-ready reports"],
    bestFor: "Finance teams replacing Tally or moving from desktop accounting to cloud.",
    href: "Software - Accounting.html",
  },
  {
    icon: <Icon.GST />,
    name: "GST Software",
    oneliner: "File GSTR-1, 3B, 9, 9C across unlimited GSTINs from one workspace.",
    features: ["Auto-reconcile GSTR-2A/2B", "Multi-GSTIN multi-client", "47-point pre-submission validator"],
    bestFor: "CA firms and finance teams filing across multiple states or entities.",
    href: "Software - GST.html",
  },
  {
    icon: <Icon.EInvoice />,
    name: "e-Invoice Software",
    oneliner: "Generate IRNs at scale with sub-second latency and automatic 30-day window enforcement.",
    features: ["Bulk IRN generation", "Auto-retry on IRP failure", "Cancellation & amendment workflow"],
    bestFor: "Businesses with AATO above ₹5 crore mandated to e-invoice from April 2026.",
    href: "Software - e-Invoice.html",
  },
  {
    icon: <Icon.EWayBill />,
    name: "e-Way Bill Software",
    oneliner: "Generate, extend, and cancel e-way bills from one screen or auto-trigger from your invoices.",
    features: ["Auto-populate from IRN", "Bulk generation", "Vehicle & validity tracking"],
    bestFor: "Companies dispatching goods across state lines from one or many warehouses.",
    href: "Software - e-Way Bill.html",
  },
  {
    icon: <Icon.KSA />,
    name: "KSA e-Invoicing Software",
    oneliner: "ZATCA Phase 2 compliant e-invoicing for businesses operating in Saudi Arabia.",
    features: ["FATOORAH integration", "Arabic + English invoicing", "India + KSA single platform"],
    bestFor: "Indian-headquartered businesses with operating entities in Saudi Arabia.",
    href: "Software - KSA e-Invoicing.html",
  },
];

interface ProductRowProps {
  p: SoftwareProduct;
  index: number;
}

function ProductRow({ p, index }: ProductRowProps) {
  return (
    <article className="wb-prod-row" data-reveal>
      <div className="wb-prod-row-num">{String(index + 1).padStart(2, "0")}</div>
      <div className="wb-prod-row-icon">{p.icon}</div>
      <div className="wb-prod-row-body">
        <h3 className="wb-prod-row-name">{p.name}</h3>
        <p className="wb-prod-row-oneliner">{p.oneliner}</p>
        <div className="wb-prod-row-features">
          {p.features.map((f, i) => <span key={i} className="wb-prod-row-feat">{f}</span>)}
        </div>
        <p className="wb-prod-row-best"><span>Best for —</span> {p.bestFor}</p>
      </div>
      <div className="wb-prod-row-cta">
        <a href={p.href} className="wb-btn wb-btn-outline">Explore <Icon.ArrowRight width="13" height="13" /></a>
      </div>
    </article>
  );
}

export function HubSoftwares() {
  useReveal();

  return (
    <div className="wb-page">
      <Header mode="softwares" />
      <main>
        <section style={{ paddingTop: 100, paddingBottom: 0 }}>
          <div className="wb-wrap">
            <Breadcrumb items={[
              { label: "Home", href: "Whitebooks Homepage.html" },
              { label: "Softwares" },
            ]} />
          </div>
        </section>

        {/* Hero */}
        <section className="wb-subhero">
          <FluidBackground />
          <div className="wb-wrap wb-hero-inner">
            <Eyebrow>Whitebooks Softwares</Eyebrow>
            <h1 className="wb-display" style={{ fontSize: "clamp(38px, 5.4vw, 68px)" }}>
              Five compliance products. <span className="accent">Shared data. One source of truth.</span>
            </h1>
            <p className="wb-subhero-sub" style={{ maxWidth: 720 }}>
              Accounting, GST, e-Invoice, and e-Way Bill software for India — plus KSA e-Invoicing for businesses operating in Saudi Arabia. All five share one data layer and one direct GSP pipe to GSTN.
            </p>
            <div className="wb-subhero-cta">
              <a className="wb-btn wb-btn-primary wb-btn-lg" href="#book-demo">Start 14-day free trial <Icon.ArrowRight width="14" height="14" /></a>
              <a className="wb-btn wb-btn-ghost wb-btn-lg" href="#book-demo">Book a demo</a>
            </div>
          </div>
        </section>

        {/* Five products (stacked rows) */}
        <section className="wb-section wb-reveal" data-reveal>
          <div className="wb-wrap">
            <p className="wb-section-label">The five products</p>
            <h2 className="wb-h2">Pick what you need. <span className="accent">They work together when you add more.</span></h2>
            <p className="wb-section-sub">Each product is licensed independently. Bundle discounts apply automatically when you take two or more.</p>

            <div className="wb-prod-rows">
              {SOFTWARE_PRODUCTS.map((p, i) => <ProductRow key={i} p={p} index={i} />)}
            </div>
          </div>
        </section>

        {/* Why one platform */}
        <PlainSection label="Why one platform" heading="The case for buying compliance from one company.">
          <ColumnGrid items={[
            {
              title: "Data flows between products, not around them",
              body: "An e-invoice generated in the e-Invoice software automatically becomes a line in the GST return and triggers an e-way bill if needed. Without integration, you copy-paste between tools and reconcile the gaps manually.",
            },
            {
              title: "One contract, one login, one support team",
              body: "Procurement, security review, and SLA negotiation happen once — not five times. Your finance team uses one login. Your IT team manages one vendor.",
            },
            {
              title: "One source of truth at audit",
              body: 'When an auditor asks "what was your ITC position on August 12 at 14:30?" — there is one answer, drawn from one system. Multi-vendor stacks generate multi-vendor audit findings.',
            },
          ]} />
        </PlainSection>

        {/* Integrations */}
        <PlainSection
          label="Integrations"
          heading="Connect to the tools your finance team already uses."
          sub="Whitebooks Softwares integrate with 40+ ERPs and accounting systems via native connectors. Push data in, pull reports out, file to GSTN — no CSV uploads in between."
        >
          <IntegrationStrip logos={[
            "SAP S/4HANA", "SAP ECC", "Tally Prime", "Oracle NetSuite", "Microsoft Dynamics 365",
            "Zoho Books", "Odoo", "Sage", "QuickBooks", "Marg", "Busy", "30+ more",
          ]} />
        </PlainSection>

        {/* Shared AI layer */}
        <section className="wb-ai-section wb-section wb-reveal" data-reveal>
          <div className="wb-dot-bg" aria-hidden="true"></div>
          <div className="wb-wrap" style={{ position: "relative", zIndex: 1 }}>
            <p className="wb-section-label">The AI layer · shared</p>
            <h2 className="wb-h2">
              Every Whitebooks software ships with the <span className="accent">same AI engine.</span>
            </h2>
            <p className="wb-section-sub">
              Invoice matching, anomaly detection, notice prediction, and the compliance copilot run across all five products — not as features per product but as a shared layer over your unified data. The longer your data lives in Whitebooks, the smarter each product gets.
            </p>
            <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="Whitebooks Homepage.html#hub" className="wb-btn wb-btn-ghost">Read more about Whitebooks AI <Icon.ArrowRight width="13" height="13" /></a>
            </div>
          </div>
        </section>

        {/* Pricing teaser */}
        <PlainSection
          label="Pricing"
          heading="Buy what you need. Bundle pricing when you need more."
          sub="Each Whitebooks software is priced independently — start with one, add others as you scale. Bundle discounts apply automatically when you license two or more softwares on the same contract."
        >
          <div style={{ marginTop: 24 }}>
            <a href="#" className="wb-btn wb-btn-ghost">See full pricing <Icon.ArrowRight width="13" height="13" /></a>
          </div>
        </PlainSection>

        {/* Closing */}
        <SubClose
          h2="Built as a suite. Bought as you need it."
          body="Most finance teams start with GST Software and add e-Invoice or Accounting in the following quarter. Some start with KSA. Talk to us about where your stack is today."
          primaryCta={{ label: "Book a demo", href: "#" }}
          secondaryCta={{ label: "Talk to sales", href: "#" }}
        />
      </main>
      <Footer />
    </div>
  );
}
