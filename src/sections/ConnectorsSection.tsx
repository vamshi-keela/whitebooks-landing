import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, QrCode, Truck } from 'lucide-react';
import { Icon } from '@/components/icons/Icon';
import { ButtonLink } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import sapLogo from '@/assets/logos/sap.svg';
import tallyLogo from '@/assets/logos/tally.svg';
import oracleLogo from '@/assets/logos/oracle.svg';
import dynamicsLogo from '@/assets/logos/Dynamics365_scalable.svg';

const SIGNUP_URL = 'https://accounts.whitebooks.in/signup?type=Developer&subscrid=&inviteId';

// ─── Data ───────────────────────────────────────────────────────────────────────

type ConnectorKind = 'einvoice' | 'eway' | 'gst';

interface Connector {
  /** Source platform — shown in the eyebrow tag. */
  source: 'sap' | 'oracle' | 'dynamics' | 'tally';
  /** Picks the mini preview mockup shown at the foot of the card. */
  kind: ConnectorKind;
  tag: string;
  title: string;
  body: string;
  /** Internal SPA route for the connector's redesigned landing page. */
  href: string;
  /** Real product screenshot, when ready. Falls back to the abstract preview below. */
  image?: string;
}

const CONNECTORS: Connector[] = [
  {
    source: 'sap',
    kind: 'einvoice',
    tag: 'SAP · e-Invoicing',
    title: 'IRNs from SAP, sub-second.',
    body: 'GSP-certified connector for SAP B1, S/4HANA, ECC & ByDesign. Auto IDOC-to-JSON conversion, instant IRN and QR code via the NIC API.',
    href: '/connectors/sap-e-invoicing',
  },
  {
    source: 'sap',
    kind: 'eway',
    tag: 'SAP · e-Way Bill',
    title: 'Generate, update, cancel — without leaving SAP.',
    body: 'Real-time e-Way Bill generation, updates and cancellations from SAP ECC or S/4HANA. Zero ABAP coding, complete compliance trail.',
    href: '/connectors/sap-e-way-bill',
  },
  {
    source: 'sap',
    kind: 'gst',
    tag: 'SAP · GST Filing',
    title: 'GSTR-1, 3B & IMS, filed from SAP.',
    body: 'Native SAP add-on for real-time upload, reconciliation and filing of GSTR-1, GSTR-3B and IMS — with multi-GSTIN management.',
    href: '/connectors/sap-gst',
  },
  {
    source: 'oracle',
    kind: 'einvoice',
    tag: 'Oracle · e-Invoicing',
    title: 'IRNs from Oracle, sub-second.',
    body: 'GSP-certified connector for Oracle Fusion Cloud, EBS, NetSuite & JD Edwards. Native IRP integration, instant IRN and QR via the NIC API.',
    href: '/connectors/oracle-e-invoicing',
  },
  {
    source: 'oracle',
    kind: 'eway',
    tag: 'Oracle · e-Way Bill',
    title: 'e-Way Bills, generated inside Oracle.',
    body: 'Real-time e-Way Bill generation, updates and cancellations from Oracle Fusion Cloud or EBS. Zero PL/SQL, complete compliance trail.',
    href: '/connectors/oracle-e-way-bill',
  },
  {
    source: 'oracle',
    kind: 'gst',
    tag: 'Oracle · GST Filing',
    title: 'GSTR-1, 3B & IMS, filed from Oracle.',
    body: 'Native Oracle add-on for real-time upload, reconciliation and filing of GSTR-1, GSTR-3B and IMS — multi-GSTIN, multi-legal-entity.',
    href: '/connectors/oracle-gst',
  },
  {
    source: 'dynamics',
    kind: 'einvoice',
    tag: 'Dynamics · e-Invoicing',
    title: 'IRNs from Dynamics 365, sub-second.',
    body: 'GSP-certified connector for Dynamics 365 F&O, Business Central, AX & NAV. Electronic Reporting mapping, instant IRN and QR via the NIC API.',
    href: '/connectors/dynamics-e-invoicing',
  },
  {
    source: 'dynamics',
    kind: 'eway',
    tag: 'Dynamics · e-Way Bill',
    title: 'e-Way Bills, native to Dynamics.',
    body: 'Generate, update and cancel e-Way Bills from Dynamics 365 F&O or Business Central. Zero X++ customization, complete compliance trail.',
    href: '/connectors/dynamics-e-way-bill',
  },
  {
    source: 'dynamics',
    kind: 'gst',
    tag: 'Dynamics · GST Filing',
    title: 'GSTR-1, 3B & IMS, filed from Dynamics.',
    body: 'Native Dynamics add-on for real-time upload, reconciliation and filing of GSTR-1, GSTR-3B and IMS via the Electronic Reporting framework.',
    href: '/connectors/dynamics-gst',
  },
  {
    source: 'tally',
    kind: 'einvoice',
    tag: 'Tally · e-Invoicing',
    title: 'e-Invoices straight from Tally vouchers.',
    body: 'Generate IRNs and QR codes from your Tally sales vouchers in three clicks — no portal visits. Bulk submission up to 1,000 vouchers.',
    href: '/connectors/tally-e-invoice',
  },
  {
    source: 'tally',
    kind: 'eway',
    tag: 'Tally · e-Way Bill',
    title: 'Bulk e-Way Bills, one click from Tally.',
    body: 'Generate, extend, cancel and print e-Way Bills directly from the Tally dashboard. Update vehicle and transporter details — no schema changes.',
    href: '/connectors/tally-e-way-bill',
  },
];

// ─── Preview mockup ─────────────────────────────────────────────────────────────
// A small "screenshot" card pinned to the foot of each connector card — always a
// light surface (it reads as a product screenshot, not page chrome, so it stays
// legible in both themes). Swap in `connector.image` once real captures exist.

function PreviewMockup({ kind }: { kind: ConnectorKind }) {
  return (
    <div className="rounded-[14px] border border-black/[0.07] bg-white p-3.5 shadow-[0_16px_32px_-18px_rgba(15,15,25,0.35)]">
      {kind === 'einvoice' && (
        <>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11.5px] font-medium text-[#0d0d14]">IRN generated</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
              <CheckCircle2 size={11} /> 0.8s
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2.5">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#f4f4f8]">
              <QrCode size={16} className="text-[#6b6b80]" />
            </div>
            <div className="flex-1">
              <div className="h-1.5 w-[78%] rounded-full bg-[#eceef3]" />
              <div className="mt-1.5 h-1.5 w-[48%] rounded-full bg-[#eceef3]" />
            </div>
          </div>
        </>
      )}

      {kind === 'eway' && (
        <>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11.5px] font-medium text-[#0d0d14]">e-Way Bill</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
              <CheckCircle2 size={11} /> Generated
            </span>
          </div>
          <div className="mt-3.5 flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#6b6b80]">Mumbai</span>
            <span className="h-px flex-1 bg-[#e5e7ef]" />
            <Truck size={13} className="shrink-0 text-[#0d0d14]" />
            <span className="h-px flex-1 bg-[#e5e7ef]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#6b6b80]">Pune</span>
          </div>
        </>
      )}

      {kind === 'gst' && (
        <>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11.5px] font-medium text-[#0d0d14]">GSTR-1</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
              <CheckCircle2 size={11} /> Filed
            </span>
          </div>
          <div className="mt-3 flex flex-col gap-1.5">
            <div className="h-1.5 w-full rounded-full bg-[#eceef3]" />
            <div className="h-1.5 w-[84%] rounded-full bg-[#eceef3]" />
            <div className="h-1.5 w-[60%] rounded-full bg-[#eceef3]" />
          </div>
        </>
      )}
    </div>
  );
}

// ─── Source logo ────────────────────────────────────────────────────────────────
// All four marks are colour logos with their own contrast — sat on a
// transparent chip so they read correctly against the card in both themes.

const SOURCE_LOGO: Record<Connector['source'], { src: string; alt: string }> = {
  sap: { src: sapLogo, alt: 'SAP' },
  oracle: { src: oracleLogo, alt: 'Oracle' },
  dynamics: { src: dynamicsLogo, alt: 'Microsoft Dynamics' },
  tally: { src: tallyLogo, alt: 'Tally' },
};

function SourceLogo({ source }: { source: Connector['source'] }) {
  const { src, alt } = SOURCE_LOGO[source];
  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-[6px] bg-transparent">
      <img
        src={src}
        alt={alt}
        className='w-auto object-contain h-[1rem]'
      />
    </span>
  );
}

// ─── ConnectorCard ──────────────────────────────────────────────────────────────

function ConnectorCard({ connector }: { connector: Connector }) {
  const { source, kind, tag, title, body, href, image } = connector;
  return (
    <article
      className={cn(
        'group relative flex flex-col gap-4 overflow-hidden',
        'rounded-[20px] border border-[var(--hairline)] p-5 sm:p-6',
        'bg-[color-mix(in_srgb,var(--fg-primary)_4%,transparent)]',
        'transition-[transform,border-color] duration-[200ms] ease-[ease]',
        'hover:-translate-y-0.5 hover:border-[var(--hairline-bright)]',
        // Fills its grid cell — the active-tab grid controls the column width.
        'h-full w-full',
      )}
    >
      <div className="flex items-center gap-2">
        <SourceLogo source={source} />
        <span className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-[var(--fg-tertiary)]">
          {tag}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="m-0 font-display font-semibold leading-[1.22] tracking-[-0.01em] text-[19px] sm:text-[21px] text-[var(--fg-primary)]">
          {title}
        </h3>
        <p className="m-0 text-[13.5px] leading-[1.6] text-[var(--fg-secondary)]">
          {body}
        </p>
      </div>

      <Link
        to={href}
        className="inline-flex items-center gap-[6px] text-[13px] font-medium text-[var(--fg-primary)] no-underline transition-colors duration-[160ms] hover:text-[var(--brand)]"
      >
        Learn more
        <Icon.ArrowRight width={13} height={13} className="transition-transform duration-[160ms] group-hover:translate-x-0.5" />
      </Link>

      <div className="mt-auto pt-1">
        {image ? (
          <img
            src={image}
            alt={`${tag} preview`}
            className="w-full rounded-[14px] border border-black/[0.07] object-cover shadow-[0_16px_32px_-18px_rgba(15,15,25,0.35)]"
          />
        ) : (
          <PreviewMockup kind={kind} />
        )}
      </div>
    </article>
  );
}

// ─── Source tabs ────────────────────────────────────────────────────────────
// Underline tabbar — one tab per ERP/accounting platform. Order mirrors the
// brief: SAP · Tally · Microsoft Dynamics · Oracle.

const SOURCE_TABS: { id: Connector['source']; label: string }[] = [
  { id: 'sap', label: 'SAP' },
  { id: 'tally', label: 'Tally' },
  { id: 'dynamics', label: 'Microsoft Dynamics' },
  { id: 'oracle', label: 'Oracle' },
];

// Sub-copy under each tab's card grid — sets the scene for that platform.
const SOURCE_BLURB: Record<Connector['source'], string> = {
  sap: 'GSP-certified, real-time connectors for SAP B1, S/4HANA, ECC & ByDesign — zero ABAP.',
  tally: 'Generate compliance documents straight from your Tally vouchers — no portal visits.',
  dynamics: 'Native to Dynamics 365 F&O, Business Central, AX & NAV via Electronic Reporting.',
  oracle: 'Works across Oracle Fusion Cloud, EBS, NetSuite & JD Edwards — zero PL/SQL.',
};

function SourceTabs({
  active,
  onSelect,
}: {
  active: Connector['source'];
  onSelect: (id: Connector['source']) => void;
}) {
  return (
    <div role="tablist" aria-label="Connector platforms" className="wb-tab-strip">
      {SOURCE_TABS.map(({ id, label }) => {
        const isActive = id === active;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(id)}
            className={`wb-toggle-btn${isActive ? ' is-active' : ''}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

// ─── ConnectorsSection ────────────────────────────────────────────────────────

export function ConnectorsSection() {
  const [active, setActive] = useState<Connector['source']>('sap');
  const cards = CONNECTORS.filter((c) => c.source === active);

  return (
    <section className="relative border-b border-[var(--hairline)] py-10 sm:py-14 md:py-16 lg:py-24">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16">

        {/* Heading */}
        <div className="grid grid-cols-1 gap-3 items-start mb-7 sm:mb-9 md:grid-cols-[1.3fr_0.7fr] md:gap-10 md:mb-10 lg:gap-16 lg:mb-14">
          <h2 className="font-serif font-semibold text-[clamp(24px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] m-0 text-balance">
            Enterprise-Ready <span className='text-[var(--brand)]'> Connectors for SAP, Oracle, Dynamics & Tally</span>
          </h2>
          <p className="text-[14px] sm:text-[15px] md:text-[17px] text-[var(--fg-secondary)] leading-[1.6] m-0 md:max-w-[460px] md:justify-self-end">
            Pre-built, GSP-certified connectors turn SAP, Oracle, Microsoft Dynamics and Tally into a compliance engine — e-Invoicing, e-Way Bills, and GST filing, native to the system you already run.
          </p>
        </div>

        {/* Platform tabbar */}
        <SourceTabs active={active} onSelect={setActive} />

        {/* Active-tab blurb */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`${active}-blurb`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="mt-5 max-w-[620px] text-[13.5px] sm:text-[14.5px] leading-[1.6] text-[var(--fg-secondary)]"
          >
            {SOURCE_BLURB[active]}
          </motion.p>
        </AnimatePresence>

        {/* Cards for the active platform — responsive grid, no horizontal scroll */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.22, 0.7, 0.2, 1] }}
            className="mt-7 grid grid-cols-1 gap-4 sm:mt-9 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
          >
            {cards.map((c) => (
              <ConnectorCard key={c.tag} connector={c} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Footer: context + demo CTA */}
        <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--fg-tertiary)]">
            {cards.length} {cards.length === 1 ? 'connector' : 'connectors'} · GSP-certified
          </span>

          <ButtonLink
            href={SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="sm"
            className="self-start sm:self-auto"
          >
            Book a demo
          </ButtonLink>
        </div>

      </div>
    </section>
  );
}

export default ConnectorsSection;
