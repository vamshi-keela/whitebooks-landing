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
    <section className="section hairline">
      <div className="container">
        <div className="wb-section-header">
          <h2 className="h2">One platform. Four compliance engines.<br /><em>Every Indian filing requirement.</em></h2>
          <p className="body">
            Built on a direct GSP license from GSTN. Each engine is a product on its own — together they cover every filing requirement in India, and a few outside.
          </p>
        </div>

        <div className="wb-hub-cards">
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

        <div className="wb-hub-footer">
          <span className="wb-hub-footer-note">⤷ Every product runs on the same GSP-licensed pipe to GSTN.</span>
          <a href="#" className="link-arrow" onClick={(e) => e.preventDefault()}>See all products</a>
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
    <a href="#" className="wb-product-card">
      <span className="wb-product-icon" aria-hidden="true">{icon}</span>
      <h3 className="wb-product-name">{name}</h3>
      <p className="wb-product-desc">{desc}</p>
      <span className="wb-product-pill">{pill}</span>
      <span className="wb-product-foot">Explore <Icon.ArrowRight width={13} height={13} /></span>
    </a>
  );
}
