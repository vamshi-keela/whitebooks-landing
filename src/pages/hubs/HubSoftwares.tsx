import React, { useEffect, useState } from 'react';
import Icon from '@/components/icons/Icon';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Header, Footer, FluidBackground, Breadcrumb } from '@/layouts/SiteShell';
import { PlainSection, IntegrationStrip } from '@/layouts/SubpageShell';
import { useReveal } from '@/hooks/useReveal';
import PhotoRoom from "@/assets/Photoroom.png";
import EyebrowPill from '@/components/ui/EyebrowPill';
import WhyCards from './WhyCards';
import SharedAILayer from './SharedAILayer';
import { BookDemoModal } from '@/components/modals/BookDemoModal';
import DpIcon from '../developer/DpIcon';
import { SubClose } from '@/components/subpage/SubClose';
import TrustStats from '@/sections/TrustStats';

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
    href: "/softwares/accounting",
  },
  {
    icon: <Icon.GST />,
    name: "GST Software",
    oneliner: "File GSTR-1, 3B, 9, 9C across unlimited GSTINs from one workspace.",
    features: ["Auto-reconcile GSTR-2A/2B", "Multi-GSTIN multi-client", "47-point pre-submission validator"],
    bestFor: "CA firms and finance teams filing across multiple states or entities.",
    href: "/softwares/gst",
  },
  {
    icon: <Icon.EInvoice />,
    name: "e-Invoice Software",
    oneliner: "Generate IRNs at scale with sub-second latency and automatic 30-day window enforcement.",
    features: ["Bulk IRN generation", "Auto-retry on IRP failure", "Cancellation & amendment workflow"],
    bestFor: "Businesses with AATO above ₹5 crore mandated to e-invoice from April 2026.",
    href: "/softwares/e-invoice",
  },
  {
    icon: <Icon.EWayBill />,
    name: "e-Way Bill Software",
    oneliner: "Generate, extend, and cancel e-way bills from one screen or auto-trigger from your invoices.",
    features: ["Auto-populate from IRN", "Bulk generation", "Vehicle & validity tracking"],
    bestFor: "Companies dispatching goods across state lines from one or many warehouses.",
    href: "/softwares/e-way-bill",
  },
  {
    icon: <Icon.KSA />,
    name: "KSA e-Invoicing Software",
    oneliner: "ZATCA Phase 2 compliant e-invoicing for businesses operating in Saudi Arabia.",
    features: ["FATOORAH integration", "Arabic + English invoicing", "India + KSA single platform"],
    bestFor: "Indian-headquartered businesses with operating entities in Saudi Arabia.",
    href: "/softwares/ksa",
  },
];

interface ProductRowProps {
  p: SoftwareProduct;
  index: number;
}

function ProductRow({ p, index }: ProductRowProps) {
  return (
    <article
      className="grid grid-cols-[60px_70px_1fr_180px] items-center gap-7 py-8 max-md:flex max-md:flex-col max-md:items-stretch max-md:gap-4 max-md:py-6 border-b border-[var(--line)] transition-[background] duration-200 relative before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(90deg,rgba(220,47,101,0),rgba(220,47,101,0.04),rgba(220,47,101,0))] before:opacity-0 before:transition-opacity before:duration-200 before:pointer-events-none hover:before:opacity-100"
      data-reveal
    >
      <div className="font-[var(--font-mono)] text-[13px] tracking-[0.14em] text-[var(--muted)] relative z-[1] max-md:hidden">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="w-14 h-14 inline-flex items-center justify-center rounded-xl bg-[var(--brand-soft)] text-[var(--brand)] border border-[var(--brand-border)] relative z-[1] [&_svg]:w-7 [&_svg]:h-7">
        {p.icon}
      </div>
      <div className="relative z-[1]">
        <h3 className="font-[var(--font-display)] font-semibold text-[22px] tracking-[-0.01em] mt-0 mb-[6px] max-md:text-[19px]">{p.name}</h3>
        <p className="m-0 mb-3 text-[15px] text-[var(--muted-2)] leading-[1.5] max-w-[620px]">{p.oneliner}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {p.features.map((f, i) => (
            <span
              key={i}
              className="font-[var(--font-mono)] text-[11px] text-[var(--brand)] bg-[var(--brand-soft)] border border-[var(--brand-border)] py-[3px] px-[9px] rounded-[5px] tracking-[0.02em]"
            >
              {f}
            </span>
          ))}
        </div>
        <p className="m-0 text-[13px] text-[var(--muted)] italic">
          <span className="font-[var(--font-mono)] text-[11px] tracking-[0.12em] uppercase text-[var(--muted-2)] not-italic mr-2">Best for —</span>
          {p.bestFor}
        </p>
      </div>
      <div className="relative z-[1] text-right max-md:text-left">
        <ButtonLink href={p.href} variant="outline">
          Explore <Icon.ArrowRight width="13" height="13" />
        </ButtonLink>
      </div>
    </article>
  );
}

const wrap = "w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4";

export function HubSoftwares() {
  const [demoOpen, setDemoOpen] = useState(false);

  useReveal();

  useEffect(() => {
    if (demoOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [demoOpen]);

  return (
    <>
      <div className="min-h-screen bg-[var(--bg)]">
        <Header mode="softwares" />
        <main>
          {/* Hero */}
          <section className="pt-[70px] pb-[72px] relative overflow-hidden bg-[var(--bg-2)]">
            <FluidBackground />

            <section style={{ paddingTop: 30, paddingBottom: 20 }}>
              <div className={wrap}>
                <Breadcrumb items={[
                  { label: "Home", href: "/" },
                  { label: "Softwares" },
                ]} />
              </div>
            </section>
            <div className={`${wrap} relative z-[2]`}>
              <div className="w-[50%] max-lg:w-[70%] max-md:w-[85%] gap-10 max-sm:w-full">
                <EyebrowPill label={'WhiteBooks Softwares'} />
                <h1
                  className="font-display font-semibold tracking-[-0.02em] leading-[1.04]"
                  style={{ fontSize: "clamp(32px, 4.5vw, 68px)" }}
                >
                  Five compliance products. <span className="text-[var(--brand)]">Shared data. One source of truth.</span>
                </h1>
                <p className="mt-[22px] max-w-[720px] text-[17px] text-[var(--muted-2)] leading-[1.55]">
                  Accounting, GST, e-Invoice, and e-Way Bill software for India — plus KSA e-Invoicing for businesses operating in Saudi Arabia. All five share one data layer and one direct GSP pipe to GSTN.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button onClick={() => { setDemoOpen(true); }} size="lg">
                    Book a 20-min Demo
                    <DpIcon name="arrow-right" size={14} />
                  </Button>
                </div>
              </div>
            </div>
            <img
              src={PhotoRoom}
              alt=""
              aria-hidden="true"
              className="absolute bottom-0 right-0 h-full w-auto max-w-[55%] object-contain object-[bottom_right] pointer-events-none z-0 max-[1024px]:max-w-[40%] max-[1024px]:opacity-70 max-[700px]:hidden"
            />
          </section>


          <TrustStats />

          {/* Five products (stacked rows) */}
          <section className="relative py-[120px] max-[700px]:py-[72px]" data-reveal>
            <div className={wrap}>
              <h2 className="font-display font-semibold text-[clamp(28px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] m-0 max-w-[780px]">
                Pick what you need. <span className="text-[var(--brand)]">They work together when you add more.</span>
              </h2>
              <p className="mt-4 text-[16.5px] text-[var(--muted-2)] max-w-[640px] leading-[1.55]">
                Each product is licensed independently. Bundle discounts apply automatically when you take two or more.
              </p>
              <div className="mt-12 flex flex-col border-t border-[var(--line)]">
                {SOFTWARE_PRODUCTS.map((p, i) => <ProductRow key={i} p={p} index={i} />)}
              </div>
            </div>
          </section>

          <WhyCards />

          {/* Integrations */}
          <PlainSection
            label="Integrations"
            heading="Connect to the tools your finance team already uses."
            sub="WhiteBooks Softwares integrate with 40+ ERPs and accounting systems via native connectors. Push data in, pull reports out, file to GSTN — no CSV uploads in between."
          >
            <IntegrationStrip logos={[
              "SAP S/4HANA", "SAP ECC", "Tally Prime", "Oracle NetSuite", "Microsoft Dynamics 365",
              "Zoho Books", "Odoo", "Sage", "QuickBooks", "Marg", "Busy", "30+ more",
            ]} />
          </PlainSection>

          <SharedAILayer
            h2={<>Every WhiteBooks software ships with the same AI engine.</>}
            body="Invoice matching, anomaly detection, notice prediction, and the compliance copilot run across all five products — not as features per product but as a shared layer over your unified data. The longer your data lives in WhiteBooks, the smarter each product gets."
            primaryCta={{ label: 'Read more about WhiteBooks AI' }}
          // secondaryCta={{ label: 'Talk to sales' }}
          />

          {/* Pricing teaser */}
          <PlainSection
            label="Pricing"
            heading="Buy what you need. Bundle pricing when you need more."
            sub="Each WhiteBooks software is priced independently — start with one, add others as you scale. Bundle discounts apply automatically when you license two or more softwares on the same contract."
          >
            <div className="mt-6">
              <ButtonLink href="#" variant="ghost" arrow>See full pricing</ButtonLink>
            </div>
          </PlainSection>

          {/* Closing */}
          <SubClose
            data={{
              h2: "Built as a suite. Bought as you need it.",
              body: "Most finance teams start with GST Software and add e-Invoice or Accounting in the following quarter. Some start with KSA. Talk to us about where your stack is today.",
              primaryCta: { label: "Book a 20-min Demo", href: "#" },
              secondaryCta: { label: "Talk to sales", href: "tel:+919032111788" }
            }}
          />
        </main>
        <Footer />
      </div>
      {demoOpen && <BookDemoModal onClose={() => setDemoOpen(false)} />}

    </>
  );
}
