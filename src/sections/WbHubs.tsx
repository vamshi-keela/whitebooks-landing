import React, { useState, useEffect } from 'react';
import { Icon } from '@/components/icons/Icon';
import { SectionLabel } from '@/components/ui/SectionLabel';
import {
  PillarCard,
  MiniReconMock,
  MiniEinvoiceMock,
  MiniEwayMock,
  MiniAccountingMock,
  MiniKSAMock,
} from '@/sections/PillarCards';
import type { RouteKey } from '@/hooks/useHashRoute';

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

  const onTabClick = (v: string) => setTab(v);

  return (
    <section className="relative border-b border-[var(--hairline)] max-[700px]:py-[72px] py-24">
      <div className="w-full px-24 max-[700px]:px-8">
        <div className="grid grid-cols-[1.3fr_0.7fr] gap-16 items-end mb-14 max-[900px]:grid-cols-1 max-[900px]:gap-6 max-[900px]:mb-10">
          <h2 className="font-serif font-semibold text-[clamp(28px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] m-0 max-w-[780px] text-balance">
            One platform. Four compliance engines.<br /><em>Every Indian filing requirement.</em>
          </h2>
          <p className="text-[18px] text-[var(--fg-secondary)] leading-[1.6] m-0 max-w-[460px] justify-self-end max-[900px]:justify-self-start max-[900px]:max-w-full">
            Built on a direct GSP license from GSTN. Each engine is a product on its own — together they cover every filing requirement in India, and a few outside.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-4 mx-auto grid-flow-dense max-[1100px]:grid-cols-[repeat(2,minmax(0,1fr))] max-[600px]:grid-cols-1">
          <PillarCard
            tag="GST Software"
            title="GST filing that thinks before you click submit."
            body="File GSTR-1, 3B, 9, and 9C across unlimited GSTINs from one workspace. Auto-reconcile 2A/2B against your purchase register in under 60 seconds."
            cta="Explore GST Software"
            tone="pink"
            featured
            mock={<MiniReconMock />}
            onClick={() => navigate('gst-soft')}
          />
          <PillarCard
            tag="e-Invoicing"
            title="IRNs, sub-second."
            body="Direct IRP integration. Bulk upload, auto-retry, audit trail. p50 latency under 200ms."
            cta="Explore e-Invoicing"
            tone="violet"
            mock={<MiniEinvoiceMock />}
          />
          <PillarCard
            tag="e-Way Bills"
            title="Generate, extend, cancel."
            body="One screen or one API call. Auto-populated from invoice. Real-time validity check."
            cta="Explore e-Way Bills"
            tone="blue"
            mock={<MiniEwayMock />}
          />
          <PillarCard
            tag="Accounting"
            title="Books that journal themselves."
            body="Cloud-native books with automated entries from your sales and purchase data. No accountant to enter, one to certify."
            cta="Explore Accounting"
            tone="cyan"
            mock={<MiniAccountingMock />}
          />
          <PillarCard
            tag="KSA e-Invoicing"
            title="ZATCA-approved, same platform."
            body="One of the few GSPs operating KSA e-invoicing. Real-time clearance, cryptographic stamp."
            cta="Explore KSA"
            tone="amber"
            mock={<MiniKSAMock />}
          />
        </div>

        <div className="mt-10 flex justify-between items-center flex-wrap gap-4">
          <span className="font-mono text-[12px] text-[var(--fg-tertiary)] tracking-[0.03em]">⤷ Every product runs on the same GSP-licensed pipe to GSTN.</span>
          <a
            href="#"
            className="inline-flex items-center gap-[6px] text-[14px] font-medium text-[var(--fg-primary)] no-underline transition-[color,gap] duration-[160ms] cursor-pointer hover:text-[var(--accent-bright)] hover:gap-[10px] after:content-['→']"
            onClick={(e) => e.preventDefault()}
          >
            See all products
          </a>
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
      className="group relative flex flex-col p-[28px_26px_24px] bg-[var(--bg-2)] border border-[var(--brand-border)] rounded-[14px] min-h-[240px] transition-[transform,border-color,background,box-shadow] duration-[160ms] ease-[ease] no-underline text-inherit overflow-hidden hover:-translate-y-0.5 hover:border-[rgba(220,47,101,0.45)] hover:bg-[var(--bg-elev)] hover:shadow-[0_12px_40px_-16px_rgba(220,47,101,0.25)] before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_60%_80%_at_100%_0%,rgba(220,47,101,0.06),transparent_60%)] before:opacity-0 before:transition-opacity before:duration-200 before:pointer-events-none hover:before:opacity-100"
    >
      <span
        className="w-11 h-11 inline-flex items-center justify-center rounded-[10px] bg-[var(--brand-soft)] text-[var(--brand)] mb-[18px] [&_svg]:w-[22px] [&_svg]:h-[22px]"
        aria-hidden="true"
      >
        {icon}
      </span>
      <h3 className="font-display font-semibold text-[19px] tracking-[-0.01em] text-[var(--text)]">{name}</h3>
      <p className="mt-2 text-[14px] text-[var(--muted-2)] leading-[1.55] flex-grow">{desc}</p>
      <span className="inline-flex mt-4 px-[10px] py-1 rounded-[6px] bg-[var(--brand-soft)] text-[var(--brand)] font-mono text-[11px] tracking-[0.02em] w-fit">{pill}</span>
      <span className="mt-[18px] pt-4 border-t border-[var(--line)] text-[13px] font-medium text-[var(--muted-2)] flex items-center gap-[6px] transition-[color,gap] duration-[160ms] group-hover:text-[var(--brand)] group-hover:gap-[10px]">
        Explore <Icon.ArrowRight width={13} height={13} />
      </span>
    </a>
  );
}
