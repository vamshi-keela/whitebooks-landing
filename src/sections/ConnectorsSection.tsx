import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, QrCode, Truck } from 'lucide-react';
import { Icon } from '@/components/icons/Icon';
import { ButtonLink } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import sapLogo from '@/assets/logos/sap.svg';
import tallyLogo from '@/assets/logos/tally.svg';

const SIGNUP_URL = 'https://accounts.whitebooks.in/signup?type=Developer&subscrid=&inviteId';

// ─── Data ───────────────────────────────────────────────────────────────────────

type ConnectorKind = 'einvoice' | 'eway' | 'gst';

interface Connector {
  /** Source platform — shown in the eyebrow tag. */
  source: 'sap' | 'tally';
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
// Both marks are colour logos with their own contrast (SAP carries its blue
// field, Tally's wordmark is near-black) — sat on a white chip so they read
// correctly against the card regardless of site theme.

function SourceLogo({ source }: { source: Connector['source'] }) {
  const src = source === 'sap' ? sapLogo : tallyLogo;
  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-[6px] bg-transparent">
      <img
        src={src}
        alt={source === 'sap' ? 'SAP' : 'Tally'}
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
        // Wider, fixed-width slide — row scrolls horizontally instead of squeezing into columns.
        'w-[280px] shrink-0 snap-start sm:w-[320px] lg:w-[348px]',
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

// ─── ConnectorsSection ────────────────────────────────────────────────────────

export function ConnectorsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // Number of dots tracks scroll *pages* (how many viewport-widths of content
  // there are), not card count — so it shrinks as more cards fit on screen.
  const [pageCount, setPageCount] = useState(1);

  const recomputePages = useCallback(() => {
    const el = scrollRef.current;
    if (!el || el.clientWidth === 0) return;
    setPageCount(Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth)));
  }, []);

  useEffect(() => {
    recomputePages();
    window.addEventListener('resize', recomputePages);
    return () => window.removeEventListener('resize', recomputePages);
  }, [recomputePages]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || el.clientWidth === 0) return;
    const page = Math.round(el.scrollLeft / el.clientWidth);
    setActive(Math.min(pageCount - 1, Math.max(0, page)));
  }, [pageCount]);

  const scrollToPage = useCallback((i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
  }, []);

  return (
    <section className="relative border-b border-[var(--hairline)] py-10 sm:py-14 md:py-16 lg:py-24">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16">

        {/* Heading */}
        <div className="grid grid-cols-1 gap-3 items-start mb-7 sm:mb-9 md:grid-cols-[1.3fr_0.7fr] md:gap-10 md:mb-10 lg:gap-16 lg:mb-14">
          <h2 className="font-serif font-semibold text-[clamp(24px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] m-0 text-balance">
            Enterprise-Ready <span className='text-[var(--brand)]'> Connectors for SAP & Tally</span>
          </h2>
          <p className="text-[14px] sm:text-[15px] md:text-[17px] text-[var(--fg-secondary)] leading-[1.6] m-0 md:max-w-[460px] md:justify-self-end">
            Pre-built, GSP-certified connectors turn SAP and Tally into a compliance engine — e-Invoicing, e-Way Bills, and GST filing, native to the system you already run.
          </p>
        </div>
        {/* <div className="mx-auto flex max-w-[680px] flex-col items-center gap-3 text-center sm:gap-4">
          <h2 className="m-0 font-display font-semibold text-[clamp(26px,4.2vw,46px)] leading-[1.12] tracking-[-0.02em] text-[var(--fg-primary)] text-balance">
            The ERP is just the start.
          </h2>
          <p className="m-0 text-[14px] sm:text-[15px] md:text-[17px] text-[var(--fg-secondary)] leading-[1.6] max-w-[560px]">
            Pre-built, GSP-certified connectors turn SAP and Tally into a compliance engine — e-Invoicing, e-Way Bills, and GST filing, native to the system you already run.
          </p>
        </div> */}

        {/* Cards: wider fixed-width slides, horizontal snap-scroll row */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className={cn(
            'mt-9 sm:mt-12 flex flex-nowrap gap-4 lg:gap-5',
            'overflow-x-auto snap-x snap-mandatory wb-hscroll',
            // inner padding (cancelled by negative margin) so the hover-lift
            // and last-card peek aren't clipped by the scroll container
            '-m-2 p-2',
          )}
        >
          {CONNECTORS.map((c) => (
            <ConnectorCard key={c.tag} connector={c} />
          ))}
        </div>

        {/* Footer: scroll progress + demo CTA */}
        <div className="mt-7 flex flex-col gap-4 sm:mt-9 sm:flex-row sm:items-center sm:justify-between">
          {pageCount > 1 && (
            <div className="flex items-center gap-3.5">
              <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--fg-tertiary)]">
                Scroll for more
              </span>
              <div className="flex items-center gap-1.5">
                {Array.from({ length: pageCount }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to page ${i + 1}`}
                    aria-current={i === active}
                    onClick={() => scrollToPage(i)}
                    className="h-1.5 rounded-full border-0 bg-[var(--hairline-bright)] p-0 transition-all duration-[220ms]"
                    style={
                      i === active
                        ? {
                          width: 22,
                          background: 'var(--brand)',
                          boxShadow: '0 0 10px var(--brand-glow)',
                        }
                        : { width: 6 }
                    }
                  />
                ))}
              </div>
            </div>
          )}

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
