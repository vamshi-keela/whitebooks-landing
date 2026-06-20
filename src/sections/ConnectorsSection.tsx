import { useCallback, useRef, useState } from 'react';
import { Icon } from '@/components/icons/Icon';
import { ButtonLink } from '@/components/ui/Button';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/cn';
import wbLogo from '@/assets/logo-white-books.svg';

const SIGNUP_URL = 'https://accounts.whitebooks.in/signup?type=Developer&subscrid=&inviteId';

// ─── Data ───────────────────────────────────────────────────────────────────────

type ConnectorKind = 'einvoice' | 'eway' | 'gst';

interface Connector {
  /** Source platform — drives nothing visual yet; the logo slot is a placeholder. */
  source: 'sap' | 'tally';
  /** Picks the artifact glyph shown mid-flow (IRN / e-Way Bill / GST return). */
  kind: ConnectorKind;
  tag: string;
  title: string;
  body: string;
  href: string;
}

const CONNECTORS: Connector[] = [
  {
    source: 'sap',
    kind: 'einvoice',
    tag: 'SAP · e-Invoicing',
    title: 'IRNs from SAP, sub-second.',
    body: 'GSP-certified connector for SAP B1, S/4HANA, ECC & ByDesign. Auto IDOC-to-JSON conversion, instant IRN and QR code via the NIC API.',
    href: 'https://whitebooks.in/connectors/sap-integration-connector-for-e-invoicing/',
  },
  {
    source: 'sap',
    kind: 'eway',
    tag: 'SAP · e-Way Bill',
    title: 'Generate, update, cancel — without leaving SAP.',
    body: 'Real-time e-Way Bill generation, updates and cancellations from SAP ECC or S/4HANA. Zero ABAP coding, complete compliance trail.',
    href: 'https://whitebooks.in/connectors/sap-integration-connector-for-e-way-bill/',
  },
  {
    source: 'sap',
    kind: 'gst',
    tag: 'SAP · GST Filing',
    title: 'GSTR-1, 3B & IMS, filed from SAP.',
    body: 'Native SAP add-on for real-time upload, reconciliation and filing of GSTR-1, GSTR-3B and IMS — with multi-GSTIN management.',
    href: 'https://whitebooks.in/connectors/sap-integration-connector-for-gst/',
  },
  {
    source: 'tally',
    kind: 'einvoice',
    tag: 'Tally · e-Invoicing',
    title: 'e-Invoices straight from Tally vouchers.',
    body: 'Generate IRNs and QR codes from your Tally sales vouchers in three clicks — no portal visits. Bulk submission up to 1,000 vouchers.',
    href: 'https://whitebooks.in/connectors/tally-integration-connector-for-e-invoice/',
  },
  {
    source: 'tally',
    kind: 'eway',
    tag: 'Tally · e-Way Bill',
    title: 'Bulk e-Way Bills, one click from Tally.',
    body: 'Generate, extend, cancel and print e-Way Bills directly from the Tally dashboard. Update vehicle and transporter details — no schema changes.',
    href: 'https://whitebooks.in/connectors/tally-integration-connector-for-e-way-bill/',
  },
];

// ─── Connector visual ────────────────────────────────────────────────────────
// A subtle [ ERP ] ···· [ artifact ] ···· [ whitebooks ] mini-flow that sits at
// the top of every card — just enough to convey what the connector does. Logos
// are replaceable placeholders: pass `src` to <LogoSlot> when the real asset is
// ready. Deliberately muted for a homepage showcase.

/** Replaceable square logo tile. Omit `src` for the dashed placeholder. */
function LogoSlot({ src, alt, isDark }: { src?: string; alt?: string; isDark: boolean }) {
  return (
    <div
      className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] shrink-0"
      style={{
        background: src
          ? '#ffffff'
          : isDark
            ? 'rgba(255,255,255,0.04)'
            : 'rgba(0,0,0,0.025)',
        border: src ? '1px solid rgba(0,0,0,0.06)' : '1px solid var(--hairline-strong)',
      }}
    >
      {src ? (
        <img src={src} alt={alt ?? ''} className="w-[68%] h-auto object-contain" style={{ filter: 'invert(1)' }} />
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--fg-quaternary)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      )}
    </div>
  );
}

/** Dashed flow line with a softly pulsing data dot. */
function FlowLine({ isDark }: { isDark: boolean }) {
  const stroke = isDark ? 'rgba(255,138,184,0.32)' : 'rgba(196,30,87,0.30)';
  return (
    <div className="relative flex-1 min-w-[12px] sm:min-w-[18px] h-2">
      <svg width="100%" height="8" preserveAspectRatio="none" className="absolute inset-0" aria-hidden>
        <line x1="0" y1="4" x2="100%" y2="4" stroke={stroke} strokeWidth="1.5" strokeDasharray="0.5 5" strokeLinecap="round" />
      </svg>
      <span
        className="wb-conn-dot absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full"
        style={{
          background: isDark ? 'var(--accent-bright)' : 'var(--accent)',
          animation: 'wb-conn-dot 3.2s ease-in-out infinite',
        }}
      />
    </div>
  );
}

/** Document shell with a small folded corner — the connector's output artifact. */
function Artifact({ kind, isDark }: { kind: ConnectorKind; isDark: boolean }) {
  const accent = isDark ? 'rgba(255,138,184,0.85)' : 'rgba(196,30,87,0.8)';
  const ink = 'var(--fg-tertiary)';
  const fold = 9;

  return (
    <div
      className="relative w-[44px] h-[54px] sm:w-[48px] sm:h-[58px] shrink-0 flex flex-col gap-[3px] p-[7px]"
      style={{
        background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.018)',
        border: '1px solid var(--hairline-strong)',
        borderRadius: 7,
        clipPath: `polygon(0 0, calc(100% - ${fold}px) 0, 100% ${fold}px, 100% 100%, 0 100%)`,
      }}
    >
      <span
        className="absolute top-0 right-0"
        style={{
          width: fold,
          height: fold,
          background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
          clipPath: 'polygon(0 0, 100% 100%, 0 100%)',
        }}
      />

      {kind === 'einvoice' && (
        <>
          <span className="block h-[2px] w-[70%] rounded-full" style={{ background: accent }} />
          <span className="block h-[2px] w-[55%] rounded-full" style={{ background: ink, opacity: 0.5 }} />
          <div className="mt-auto grid grid-cols-3 gap-[2px] w-[18px]" aria-hidden>
            {[1, 0, 1, 0, 1, 1, 1, 0, 1].map((on, i) => (
              <span key={i} className="block w-full aspect-square rounded-[1px]" style={{ background: on ? ink : 'transparent', opacity: 0.65 }} />
            ))}
          </div>
        </>
      )}

      {kind === 'eway' && (
        <>
          <span className="block h-[2px] w-[60%] rounded-full" style={{ background: ink, opacity: 0.5 }} />
          <div className="mt-auto" aria-hidden>
            <svg width="26" height="16" viewBox="0 0 26 16" fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="14" height="9" rx="1" />
              <path d="M15 6h4l2 3v3h-6z" />
              <circle cx="7" cy="13" r="1.6" />
              <circle cx="18.5" cy="13" r="1.6" />
            </svg>
          </div>
        </>
      )}

      {kind === 'gst' && (
        <>
          <span className="block h-[2px] w-[65%] rounded-full" style={{ background: accent }} />
          <div className="mt-auto flex flex-col gap-[3px]" aria-hidden>
            <span className="block h-[2px] w-full rounded-full" style={{ background: ink, opacity: 0.45 }} />
            <span className="block h-[2px] w-[80%] rounded-full" style={{ background: ink, opacity: 0.45 }} />
            <span className="block h-[2px] w-[90%] rounded-full" style={{ background: ink, opacity: 0.45 }} />
          </div>
        </>
      )}
    </div>
  );
}

function ConnectorVisual({ kind, isDark }: { kind: ConnectorKind; isDark: boolean }) {
  return (
    <div
      className="relative flex items-center justify-center gap-1.5 sm:gap-2 h-[112px] sm:h-[124px] px-5"
      style={{
        borderBottom: '1px solid var(--hairline)',
        background: isDark
          ? 'radial-gradient(70% 90% at 50% 42%, rgba(220,47,101,0.05), transparent 72%), linear-gradient(180deg, rgba(255,255,255,0.022), rgba(255,255,255,0.005))'
          : 'radial-gradient(70% 90% at 50% 42%, rgba(220,47,101,0.04), transparent 70%), linear-gradient(180deg, rgba(0,0,0,0.016), rgba(0,0,0,0.004))',
      }}
    >
      <LogoSlot isDark={isDark} alt="SAP / Tally logo" />
      <FlowLine isDark={isDark} />
      <Artifact kind={kind} isDark={isDark} />
      <FlowLine isDark={isDark} />
      <LogoSlot isDark={isDark} src={wbLogo} alt="whitebooks logo" />
    </div>
  );
}

// ─── ConnectorCard ──────────────────────────────────────────────────────────────
// Clean, flat card (no CardWash) — visual header + compact copy.

function ConnectorCard({ connector, isDark }: { connector: Connector; isDark: boolean }) {
  const { kind, tag, title, body, href } = connector;
  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden',
        'bg-[var(--bg-card)] border border-[var(--hairline)] rounded-[16px]',
        'transition-[transform,border-color] duration-[200ms] ease-[ease]',
        'hover:-translate-y-0.5 hover:border-[var(--hairline-bright)]',
        // Carousel slide on laptop+
        'lg:w-[320px] lg:shrink-0 lg:snap-start',
      )}
    >
      <ConnectorVisual kind={kind} isDark={isDark} />

      <div className="flex flex-col gap-2.5 flex-1 p-5">
        <span className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-[var(--fg-tertiary)]">
          {tag}
        </span>

        <h3 className="m-0 font-serif font-normal leading-[1.18] tracking-[-0.015em] text-[18px] sm:text-[20px] text-[var(--fg-primary)]">
          {title}
        </h3>

        <p
          className="m-0 text-[13px] leading-[1.6] text-[var(--fg-secondary)]"
          style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          {body}
        </p>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto pt-2 inline-flex items-center gap-[6px] text-[13px] font-medium text-[var(--fg-primary)] no-underline transition-colors duration-[160ms] hover:text-[var(--brand)]"
        >
          Learn more
          <Icon.ArrowRight width={13} height={13} className="transition-transform duration-[160ms] group-hover:translate-x-0.5" />
        </a>
      </div>
    </article>
  );
}

// ─── ConnectorsSection ────────────────────────────────────────────────────────

export function ConnectorsSection() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const last = CONNECTORS.length - 1;

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const frac = max > 0 ? el.scrollLeft / max : 0;
    setActive(Math.round(frac * last));
  }, [last]);

  const scrollToIndex = useCallback(
    (i: number) => {
      const el = scrollRef.current;
      if (!el) return;
      const max = el.scrollWidth - el.clientWidth;
      el.scrollTo({ left: last > 0 ? (i / last) * max : 0, behavior: 'smooth' });
    },
    [last],
  );

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

        {/* Cards: column on mobile, horizontal snap-scroll row on laptop+ */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className={cn(
            'flex flex-col gap-4',
            'lg:flex-row lg:flex-nowrap lg:gap-5 lg:overflow-x-auto lg:snap-x lg:snap-mandatory wb-hscroll',
            // inner padding (cancelled by negative margin) so the hover-lift and
            // last-card peek aren't clipped by the scroll container's overflow-y
            'lg:-m-2 lg:p-2',
          )}
        >
          {CONNECTORS.map((c) => (
            <ConnectorCard key={c.tag} connector={c} isDark={isDark} />
          ))}
        </div>

        {/* Footer: scroll progress (laptop) + demo CTA */}
        <div className="mt-7 lg:mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="hidden lg:flex items-center gap-3.5">
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-[var(--fg-tertiary)]">
              Scroll for more
            </span>
            <div className="flex items-center gap-1.5">
              {CONNECTORS.map((c, i) => (
                <button
                  key={c.tag}
                  type="button"
                  aria-label={`Go to connector ${i + 1}`}
                  onClick={() => scrollToIndex(i)}
                  className="h-1.5 rounded-full transition-all duration-[220ms]"
                  style={{
                    width: i === active ? 22 : 6,
                    background: i === active ? 'var(--accent)' : 'var(--hairline-bright)',
                  }}
                />
              ))}
            </div>
          </div>

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
