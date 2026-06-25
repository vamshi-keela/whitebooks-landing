import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@/components/icons/Icon';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { cn } from '@/lib/cn';
import {
  PillarCard,
  ProductPillarCard,
  MiniEinvoiceMock,
  MiniKSAMock,
  MiniGstApiMock,
  MiniEwayApiMock,
} from '@/sections/PillarCards';
import type { RouteKey } from '@/hooks/useHashRoute';
import gstDashboard from '@/assets/product-images/gst-software/gst-dashboard-1.png';
import einvoiceDashboard from '@/assets/product-images/e-invoice-software/e-invoice-dashboard.png';
import ewayDashboard from '@/assets/product-images/e-way-bill-software/e-way-bill-dashboard.png';
import accountingDashboard from '@/assets/product-images/softwares/whitebooks_softwares_1.png';

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Product {
  icon: React.ReactNode;
  name: string;
  desc: string;
  pill: string;
}

export const SOFTWARES: Product[] = [
  { icon: <Icon.Accounting />, name: 'Accounting Software', desc: 'Auto-journalled books from sales, purchases, and bank feeds.', pill: 'Real-time bank reconciliation' },
  { icon: <Icon.GST />, name: 'GST Software', desc: 'File GSTR-1, 3B, 9, 9C across unlimited GSTINs. Auto-reconcile 2B in 60 seconds.', pill: 'GSP-licensed direct filing' },
  { icon: <Icon.EInvoice />, name: 'e-Invoice Software', desc: 'Generate IRNs at scale. 30-day window enforcement. Direct IRP integration.', pill: 'Sub-200ms IRN generation' },
  { icon: <Icon.EWayBill />, name: 'e-Way Bill Software', desc: 'Generate, extend, cancel from one screen. Auto-populate from IRN.', pill: 'Bulk + scheduled generation' },
  { icon: <Icon.KSA />, name: 'KSA e-Invoicing', desc: 'ZATCA Phase 2 compliant. Cryptographic stamping, QR codes, Fatoorah integration.', pill: 'ZATCA-approved infrastructure' },
];

export const APIS: Product[] = [
  { icon: <Icon.GstApi />, name: 'GST API', desc: 'File returns, pull GSTR-2A/2B, validate GSTINs. JSON in, JSON out.', pill: 'Direct GSP pipe to GSTN' },
  { icon: <Icon.EInvoice />, name: 'e-Invoice API', desc: 'Generate IRNs in 5 lines of code. Bulk endpoints. Webhook on success.', pill: '180ms p50 latency' },
  { icon: <Icon.EWayBill />, name: 'e-Way Bill API', desc: 'Generate, extend, update, cancel. Auto-populate from IRN.', pill: 'Direct NIC integration' },
  { icon: <Icon.KSA />, name: 'KSA e-Invoice API', desc: 'Fatoorah clearance. Cryptographic stamping. Bilingual Arabic-English.', pill: 'ZATCA Phase 2' },
];

// ─── HubSection ───────────────────────────────────────────────────────────────

interface HubSectionProps {
  tab: string;
  setTab: (v: string) => void;
  navigate: (r: RouteKey) => void;
}

export function HubSection({ tab, setTab, navigate }: HubSectionProps) {
  const [internalTab, setInternalTab] = useState(tab);
  const [out, setOut] = useState(false);

  useEffect(() => {
    if (tab === internalTab) return;
    setOut(true);
    const t = setTimeout(() => {
      setInternalTab(tab);
      setOut(false);
    }, 200);
    return () => clearTimeout(t);
  }, [tab]);


  return (
    <section className="relative border-b border-[var(--hairline)] py-10 sm:py-14 md:py-16 lg:py-24">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16">

        {/* Heading row — stacks on mobile, side-by-side from md */}
        <div className="grid grid-cols-1 gap-3 items-end mb-7 sm:mb-9 md:grid-cols-[1.3fr_0.7fr] md:gap-10 md:mb-10 lg:gap-16 lg:mb-14">
          <h2 className="font-serif font-semibold text-[clamp(24px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] m-0 text-balance">
            One platform.<span className='text-[var(--brand)]'> Five compliance engines.</span><br />Every Indian filing requirement.
          </h2>
          <p className="text-[14px] sm:text-[15px] md:text-[17px] text-[var(--fg-secondary)] leading-[1.6] m-0 md:max-w-[460px] md:justify-self-end">
            Built on a direct GSP license from GSTN. Each engine is a product on its own — together they cover every filing requirement in India, and a few outside.
          </p>
        </div>

        {/* Card grid — uniform, equal-weight cards
            mobile  (< 1024): 1 column — cards stack cleanly
            desktop (1024+):  2 columns
            The 5th card spans the full row (wide) so the trailing row reads
            as intentional rather than a half-empty orphan. */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
          <ProductPillarCard
            tag="GST Software"
            title="GST filing that thinks before you click submit."
            body="File GSTR-1, 3B, 9, and 9C across unlimited GSTINs from one workspace. Auto-reconcile 2A/2B against your purchase register."
            cta="Explore GST Software"
            tone="pink"
            metricValue="< 60s"
            metricLabel="2A/2B reconciliation"
            image={gstDashboard}
            imageAlt="WhiteBooks GST software dashboard"
            onClick={() => navigate('gst-soft')}
          />
          <ProductPillarCard
            tag="e-Invoicing"
            title="IRNs, sub-second."
            body="Direct IRP integration with bulk upload, auto-retry, and a full audit trail on every invoice."
            cta="Explore e-Invoicing"
            tone="violet"
            metricValue="< 200ms"
            metricLabel="p50 IRN latency"
            image={einvoiceDashboard}
            imageAlt="WhiteBooks e-Invoicing software dashboard"
            onClick={() => navigate('einvoice-soft')}
          />
          <ProductPillarCard
            tag="e-Way Bills"
            title="Generate, extend, cancel."
            body="One screen or one API call. Auto-populated from your invoice, with real-time validity checks."
            cta="Explore e-Way Bills"
            tone="blue"
            metricValue="90%"
            metricLabel="fields auto-filled"
            image={ewayDashboard}
            imageAlt="WhiteBooks e-Way Bill software dashboard"
            onClick={() => navigate('eway-soft')}
          />
          <ProductPillarCard
            tag="Accounting"
            title="Books that journal themselves."
            body="Cloud-native books with automated entries from your sales and purchase data. No accountant to enter, one to certify."
            cta="Explore Accounting"
            tone="cyan"
            metricValue="₹4.2Cr"
            metricLabel="auto-journalled · 0 manual"
            image={accountingDashboard}
            imageAlt="WhiteBooks accounting software dashboard"
            onClick={() => navigate('accounting')}
          />
          <ProductPillarCard
            tag="Notice Management"
            title="Never miss a tax notice again."
            body="Auto-fetch GST, Income Tax, and TDS notices from GSTN, ITD, and TRACES. Track every deadline, get alerts, and keep your whole team aligned — all from the same WhiteBooks account."
            cta="Explore Notice Management"
            tone="amber"
            metricValue="100%"
            metricLabel="notices auto-fetched"
            image={gstDashboard}
            imageAlt="WhiteBooks Notice Management dashboard"
            onClick={() => navigate('notice-mgmt')}
            wide
          />
        </div>

      </div>
    </section>
  );
}

// ─── HubAPIsSection ───────────────────────────────────────────────────────────

export function HubAPIsSection() {
  const navigate = useNavigate();

  return (
    <section className="relative border-b border-[var(--hairline)] py-10 sm:py-14 md:py-16 lg:py-24">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16">

        {/* Heading row */}
        <div className="grid grid-cols-1 gap-3 items-end mb-7 sm:mb-9 md:grid-cols-[1.3fr_0.7fr] md:gap-10 md:mb-10 lg:gap-16 lg:mb-14">
          <h2 className="font-serif font-semibold text-[clamp(24px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] m-0 text-balance">
            {/* Four REST APIs. Every compliance operation in India and KSA. */}
            <span className='text-[var(--brand)]'>Compliance APIs</span> That Scale With Your Business.
          </h2>
          <p className="text-[14px] sm:text-[15px] md:text-[17px] text-[var(--fg-secondary)] leading-[1.6] m-0 md:max-w-[460px] md:justify-self-end">
            {/* Trusted by enterprises to automate GST, e-Invoicing, e-Way Bills, and vendor verification workflows.
            Secure, scalable APIs designed for ERP, fintech, logistics, and enterprise platforms. */}
            Built on a direct GSP license from GSTN. Sandbox in 5 minutes. Production in 5 days. No resold pipes.
          </p>
        </div>

        {/* Card grid — uniform, equal-weight cards: 1 column on mobile,
            2 columns from lg (4 cards → clean 2×2). */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
          <PillarCard
            tag="GST API"
            title="File returns. Pull 2A/2B. Validate GSTINs."
            body="JSON in, ARN out. GSTR-1, 3B, 9, 9C — all supported. GSTIN validation, HSN search, IMS bulk ops, and notice tracking over clean REST endpoints."
            cta="Explore GST API"
            tone="pink"
            mock={<MiniGstApiMock />}
            sandboxLabel="Access Free Sandbox"
            exploreLabel="Read API Docs"
            onExplore={() => navigate('/developer/gst-api')}
            onClick={() => navigate('/apis/gst')}
          />
          <PillarCard
            tag="e-Invoice API"
            title="IRNs in under 200ms. Direct IRP pipe."
            body="Generate IRNs at scale with sub-200ms p50 latency. Bulk endpoints, auto-retry on IRP outages, webhook on success. Built for billing systems serving the ₹5cr AATO mandate."
            cta="Explore e-Invoice API"
            tone="violet"
            mock={<MiniEinvoiceMock />}
            sandboxLabel="Access Free Sandbox"
            exploreLabel="Read API Docs"
            onExplore={() => navigate('/developer/e-invoice-api')}
            onClick={() => navigate('/apis/e-invoice')}
          />
          <PillarCard
            tag="e-Way Bill API"
            title="One call per dispatch."
            body="Generate, extend, and cancel e-way bills programmatically. Auto-populate 90% of fields from an existing IRN. Webhooks 4h before expiry."
            cta="Explore e-Way Bill API"
            tone="blue"
            mock={<MiniEwayApiMock />}
            sandboxLabel="Access Free Sandbox"
            exploreLabel="Read API Docs"
            onExplore={() => navigate('/developer/e-way-bill-api')}
            onClick={() => navigate('/apis/e-way-bill')}
          />
          <PillarCard
            tag="KSA e-Invoice API"
            title="ZATCA Phase 2, without the integration pain."
            body="FATOORAH submission, cryptographic signing, CSID lifecycle managed for you. Bilingual Arabic-English invoice rendering. One account covers India and KSA."
            cta="Explore KSA e-Invoice API"
            tone="amber"
            mock={<MiniKSAMock />}
            sandboxLabel="Access Free Sandbox"
            exploreLabel="Read API Docs"
            onExplore={() => navigate('/developer/ksa-e-invoice-api')}
            onClick={() => navigate('/apis/ksa')}
          />
        </div>

      </div>
    </section>
  );
}

// ─── ProductCard ──────────────────────────────────────────────────────────────

interface ProductCardProps {
  icon: React.ReactNode;
  name: string;
  desc: string;
  pill: string;
}

export function ProductCard({ icon, name, desc, pill }: ProductCardProps) {
  return (
    <a
      href="#"
      className={cn(
        // Layout
        'group relative flex flex-col no-underline text-inherit overflow-hidden',
        // Padding: tight on mobile, full on desktop
        'p-4 sm:p-5 lg:p-[28px_26px_24px]',
        // Visual
        'bg-[var(--bg-2)] border border-[var(--brand-border)] rounded-[12px] sm:rounded-[14px]',
        // Transitions
        'transition-[transform,border-color,background,box-shadow] duration-[160ms] ease-[ease]',
        // Desktop hover (degrades on touch — no :hover on tap-only devices)
        'hover:-translate-y-0.5 hover:border-[rgba(220,47,101,0.45)] hover:bg-[var(--bg-elev)]',
        'hover:shadow-[0_12px_40px_-16px_rgba(220,47,101,0.25)]',
        // Gradient overlay on hover
        "before:content-[''] before:absolute before:inset-0 before:pointer-events-none",
        'before:bg-[radial-gradient(ellipse_60%_80%_at_100%_0%,rgba(220,47,101,0.06),transparent_60%)]',
        'before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100',
      )}
    >
      {/* Icon + title: horizontal row on mobile saves significant vertical space */}
      <div className="flex items-center gap-3 sm:block">
        <span
          className={cn(
            'shrink-0 inline-flex items-center justify-center',
            'w-9 h-9 sm:w-11 sm:h-11',
            'rounded-[8px] sm:rounded-[10px]',
            'bg-[var(--brand-soft)] text-[var(--brand)]',
            'sm:mb-[18px]',
            '[&_svg]:w-[18px] [&_svg]:h-[18px] sm:[&_svg]:w-[22px] sm:[&_svg]:h-[22px]',
          )}
          aria-hidden
        >
          {icon}
        </span>
        <h3 className="font-display font-semibold text-[15px] sm:text-[19px] leading-tight tracking-[-0.01em] text-[var(--text)] m-0">
          {name}
        </h3>
      </div>

      {/* Description */}
      <p className="mt-2 text-[13px] sm:text-[14px] text-[var(--muted-2)] leading-[1.5] sm:leading-[1.55] flex-grow">
        {desc}
      </p>

      {/* Pill badge */}
      <span className="inline-flex mt-3 sm:mt-4 px-[10px] py-[3px] sm:py-1 rounded-[6px] bg-[var(--brand-soft)] text-[var(--brand)] font-mono text-[10px] sm:text-[11px] tracking-[0.02em] w-fit">
        {pill}
      </span>

      {/* CTA row */}
      <span className="mt-3 sm:mt-[18px] pt-3 sm:pt-4 border-t border-[var(--line)] text-[12px] sm:text-[13px] font-medium text-[var(--muted-2)] flex items-center gap-[6px] transition-[color,gap] duration-[160ms] group-hover:text-[var(--brand)] group-hover:gap-[10px]">
        Explore <Icon.ArrowRight width={12} height={12} />
      </span>
    </a>
  );
}
