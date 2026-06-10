import React from 'react';
import { Icon } from '@/components/icons/Icon';
import { ButtonLink } from '@/components/ui/Button';
import { CardWash, type CardWashProps } from '@/sections/PillarCards';
import { cn } from '@/lib/cn';

const SIGNUP_URL = 'https://accounts.whitebooks.in/signup?type=Developer&subscrid=&inviteId';

// ─── Platform badges ───────────────────────────────────────────────────────────

function SapBadge() {
  return (
    <span
      className="inline-flex items-center justify-center h-7 px-2.5 rounded-[6px] font-mono text-[12px] font-bold tracking-[0.04em] text-white shrink-0"
      style={{ background: 'linear-gradient(135deg, #0863c4 0%, #00308f 100%)' }}
    >
      SAP
    </span>
  );
}

function TallyBadge() {
  return (
    <span
      className="inline-flex items-center justify-center h-7 px-2.5 rounded-[6px] font-mono text-[12px] font-bold tracking-[0.04em] text-white shrink-0"
      style={{ background: 'linear-gradient(135deg, #ff7a1a 0%, #c4202f 100%)' }}
    >
      Tally
    </span>
  );
}

// ─── Data ───────────────────────────────────────────────────────────────────────

interface Connector {
  badge: React.ReactNode;
  tag: string;
  title: string;
  body: string;
  stats: string[];
  tone: CardWashProps['tone'];
  href: string;
}

const CONNECTORS: Connector[] = [
  {
    badge: <SapBadge />,
    tag: 'SAP · e-Invoicing',
    title: 'IRNs from SAP, sub-second.',
    body: 'GSP-certified connector for SAP B1, S/4HANA, ECC & ByDesign. Auto IDOC-to-JSON conversion, instant IRN and QR code via the NIC API — real-time or in batches of 1,000.',
    stats: ['<1s IRN response', '100k+ invoices/day', '0% error rate'],
    tone: 'pink',
    href: 'https://whitebooks.in/connectors/sap-integration-connector-for-e-invoicing/',
  },
  {
    badge: <SapBadge />,
    tag: 'SAP · e-Way Bill',
    title: 'Generate, update, cancel — without leaving SAP.',
    body: 'Real-time e-Way Bill generation, updates and cancellations from SAP ECC or S/4HANA. Zero ABAP coding, complete compliance trail, 5-minute setup.',
    stats: ['5-min setup', 'Zero ABAP', '95% time saved'],
    tone: 'blue',
    href: 'https://whitebooks.in/connectors/sap-integration-connector-for-e-way-bill/',
  },
  {
    badge: <SapBadge />,
    tag: 'SAP · GST Filing',
    title: 'GSTR-1, 3B & IMS, filed from SAP.',
    body: 'Native SAP add-on for real-time upload, reconciliation and filing of GSTR-1, GSTR-3B and IMS — with multi-GSTIN management across ECC and S/4HANA.',
    stats: ['Multi-GSTIN', '24/7 monitoring', '7-yr audit trail'],
    tone: 'violet',
    href: 'https://whitebooks.in/connectors/sap-integration-connector-for-gst/',
  },
  {
    badge: <TallyBadge />,
    tag: 'Tally · e-Invoicing',
    title: 'e-Invoices straight from Tally vouchers.',
    body: 'Generate IRNs and QR codes from your Tally sales vouchers in three clicks — no government portal visits. Bulk submission up to 1,000 vouchers, with IRP rejections shown inline.',
    stats: ['3-click IRN', '1,000/batch', 'Tally Prime + ERP 9'],
    tone: 'cyan',
    href: 'https://whitebooks.in/connectors/tally-integration-connector-for-e-invoice/',
  },
  {
    badge: <TallyBadge />,
    tag: 'Tally · e-Way Bill',
    title: 'Bulk e-Way Bills, one click from Tally.',
    body: 'Generate, extend, cancel and print e-Way Bills directly from the Tally dashboard. Update vehicle numbers and transporter IDs across entries — no schema changes.',
    stats: ['Bulk generation', 'One-click extend', 'No schema change'],
    tone: 'amber',
    href: 'https://whitebooks.in/connectors/tally-integration-connector-for-e-way-bill/',
  },
];

// ─── ConnectorCard ──────────────────────────────────────────────────────────────

function ConnectorCard({ badge, tag, title, body, stats, tone, href }: Connector) {
  return (
    <div
      className={cn(
        'relative overflow-hidden flex flex-col',
        'p-5 gap-4 sm:p-6 lg:p-7',
        'bg-[var(--bg-card)] border border-[var(--hairline)] rounded-[16px]',
        'transition-[transform,border-color,box-shadow] duration-[200ms] ease-[ease]',
        'hover:-translate-y-0.5 hover:border-[var(--hairline-bright)]',
      )}
    >
      <CardWash tone={tone} />

      <div className="relative z-[1] flex flex-col gap-4 flex-1">
        {/* Header: platform badge + tag */}
        <div className="flex items-center gap-2.5">
          {badge}
          <span className="mono-tag accent">
            <span className="dot" />
            {tag}
          </span>
        </div>

        {/* Title */}
        <h3 className="m-0 font-normal leading-[1.18] tracking-[-0.018em] text-[clamp(18px,2.4vw,24px)] text-[var(--fg-primary)]">
          {title}
        </h3>

        {/* Body */}
        <p className="m-0 text-[13px] sm:text-[14px] leading-[1.6] text-[var(--fg-secondary)] flex-1">
          {body}
        </p>

        {/* Stat pills */}
        <div className="flex flex-wrap gap-1.5">
          {stats.map((s) => (
            <span
              key={s}
              className="inline-flex px-[10px] py-1 rounded-[6px] bg-[var(--brand-soft)] text-[var(--brand)] font-mono text-[10px] sm:text-[11px] tracking-[0.02em]"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-1">
          <ButtonLink
            href={SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="sm"
          >
            Book a demo
          </ButtonLink>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[6px] text-[12px] sm:text-[13px] font-medium text-[var(--fg-tertiary)] no-underline transition-colors duration-[160ms] hover:text-[var(--brand)]"
          >
            Learn more <Icon.ArrowRight width={12} height={12} />
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── ConnectorsSection ────────────────────────────────────────────────────────

export function ConnectorsSection() {
  return (
    <section className="relative border-b border-[var(--hairline)] py-10 sm:py-14 md:py-16 lg:py-24">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16">

        {/* Heading row */}
        <div className="grid grid-cols-1 gap-3 items-end mb-7 sm:mb-9 md:grid-cols-[1.3fr_0.7fr] md:gap-10 md:mb-10 lg:gap-16 lg:mb-14">
          <h2 className="font-serif font-semibold text-[clamp(24px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] m-0 text-balance">
            Already on SAP or Tally? Plug straight in.
          </h2>
          <p className="text-[14px] sm:text-[15px] md:text-[17px] text-[var(--fg-secondary)] leading-[1.6] m-0 md:max-w-[460px] md:justify-self-end">
            Pre-built, GSP-certified connectors for the systems you already run. No rip-and-replace — e-invoicing, e-Way Bills, and GST filing, native to your ERP.
          </p>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {CONNECTORS.map((c) => (
            <ConnectorCard key={c.tag} {...c} />
          ))}
        </div>

      </div>
    </section>
  );
}

export default ConnectorsSection;
