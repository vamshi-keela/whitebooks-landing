import { memo, useEffect, useState } from "react";
import accountingDashboard from '@/assets/product-images/softwares/whitebooks_softwares_1.png';
import gspProvider from "../assets/gsp-provider.svg";
import isoCertified from "../assets/iso-certified-2022.svg";
import sslSecure from "../assets/ssl-secure.png";
import { useInView } from "@/hooks/useInView";
import { HeroFluidBackground } from "@/layouts/SiteShell";
import { Button } from "@/components/ui/Button";
import EyebrowPill from "@/components/ui/EyebrowPill";
import TickMark from "@/components/ui/TickMark";
import { BookDemoModal } from "@/components/modals/BookDemoModal";
import DpIcon from "@/pages/developer/DpIcon";
import HeroShowcase from "./HeroShowcase";

// ─── Hero ─────────────────────────────────────────────────────────────────────

export const Hero = memo(function Hero(): JSX.Element {
  const [demoOpen, setDemoOpen] = useState(false);
  // Pause the backdrop's aurora drift once the hero scrolls away so the
  // compositor does zero work for it while off-screen.
  const [heroRef, heroInView] = useInView<HTMLElement>();
  // Floating cert cluster hides the moment the user starts scrolling.
  // const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    if (demoOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [demoOpen]);

  useEffect(() => {
    // const onScroll = () => { setAtTop(window.scrollY < 40); };
    // onScroll();
    // window.addEventListener('scroll', onScroll, { passive: true });
    // return () => { window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <>
      <section ref={heroRef} className="relative bg-[var(--bg-2)] pt-[9rem] overflow-hidden hero-horizon">
        <HeroFluidBackground variant="left" gradientOpacity={1} paused={!heroInView} />

        <div className="relative z-10 max-w-[1240px] mx-auto px-8 max-sm:px-5 justiy-center">
          <div className="max-w-[960px] mx-auto text-center">
            <EyebrowPill label="Licensed GSP by GSTIN" subtitle="GST Suvidha Provider" />
            <h1 className="font-display font-semibold text-[clamp(36px,4vw,101px)] leading-[1.05] tracking-[-0.03em] mt-[22px] text-center text-[var(--text)]">
              Compliance infrastructure for{' '}
              <span className="text-[#d33568]">India's largest finance teams.</span>
            </h1>
            <div className="mt-9 flex flex-wrap gap-3 justify-center">
              <Button onClick={() => { setDemoOpen(true); }} size="lg">
                Book a 20-min Demo
                <DpIcon name="arrow-right" size={14} />
              </Button>
            </div>
            {/* 
          <p className="mt-4 text-[13.5px] italic text-[#6b6b80]">
            Migrating from ClearTax TaxCloud?{' '}
            <a href="#migration" className="text-[#d33568] not-italic hover:underline">
              We import your data in under 45 minutes →
            </a>
          </p> */}
          </div>

        </div>

        <HeroShowcase />

        {/* Certification strip — quiet proof, floated bottom-left and hidden
            the moment the user scrolls. Artwork tone per theme is handled by
            .hero-cert in src/styles/design-system-wb.css. */}
        <div
          // aria-hidden={!atTop} ${atTop ? 'opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}
          className={`hero-cert-strip fixed bottom-6 left-6 z-40 flex items-center gap-6 max-sm:gap-4 rounded-full px-5 py-2.5 backdrop-blur-md max-sm:bottom-4 max-sm:left-4 max-sm:px-4 max-sm:py-2 transition-all duration-300 `}
        >
          <img src={gspProvider} alt="Licensed GST Suvidha Provider" className="hero-cert h-9 w-auto max-sm:h-7" />
          <img src={isoCertified} alt="ISO 27001:2022 certified" className="hero-cert h-9 w-auto max-sm:h-7" />
          <img src={sslSecure} alt="SSL secured" className="hero-cert h-7 w-auto max-sm:h-6" />
        </div>
        {/* <img
          src={isMobile ? heroImageMobile : heroImage}
          alt="WhiteBooks Hero"
          className="w-full flex-row pt-5"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        /> */}
      </section>
      {demoOpen && <BookDemoModal onClose={() => setDemoOpen(false)} />}
    </>
  );
});

// ─── DashboardCard ────────────────────────────────────────────────────────────

interface DashRow {
  v: string;
  g: string;
  a: string;
  s: "ok" | "warn" | "bad";
}

export function DashboardCard() {
  const rows: DashRow[] = [
    {
      v: "Rajesh Enterprises Pvt Ltd",
      g: "29AABCR1234L1ZB",
      a: "₹4,28,540",
      s: "ok",
    },
    {
      v: "Crescent Logistics LLP",
      g: "07AABCK9988R1ZK",
      a: "₹1,12,300",
      s: "ok",
    },
    {
      v: "Bharat Pharmacare Pvt Ltd",
      g: "27AABCB4421J1ZQ",
      a: "₹8,64,720",
      s: "warn",
    },
    { v: "Sunline Industries", g: "33AABCS7710G1ZE", a: "₹62,450", s: "ok" },
    {
      v: "Pinnacle Foods & Bev.",
      g: "06AABCP2233M1ZN",
      a: "₹2,94,180",
      s: "bad",
    },
    {
      v: "Greenfield Textile Mills",
      g: "24AABCG5566N1ZA",
      a: "₹3,18,900",
      s: "ok",
    },
    { v: "Mahalakshmi Traders", g: "32AABCM7748F1ZG", a: "₹98,210", s: "warn" },
  ];

  const icon = (s: DashRow["s"]): string => {
    if (s === "ok") return "✓";
    if (s === "warn") return "!";
    return "✕";
  };

  return (
    <div className="wb-card" aria-label="GSTR-2B reconciliation snapshot">
      <div className="wb-dash-head">
        <div className="wb-dash-head-l">
          <div>
            <div className="wb-dash-title">GSTR-2B reconciliation</div>
            <div className="wb-dash-sub">Aug 2026 · 29AABCT1332L1ZA</div>
          </div>
        </div>
        <span className="wb-dash-live">Live</span>
      </div>
      <div className="wb-dash-stats">
        <div className="wb-dash-stat">
          <div className="wb-dash-stat-val ok">4,238</div>
          <div className="wb-dash-stat-lbl">Matched</div>
        </div>
        <div className="wb-dash-stat">
          <div className="wb-dash-stat-val warn">17</div>
          <div className="wb-dash-stat-lbl">Mismatch</div>
        </div>
        <div className="wb-dash-stat">
          <div className="wb-dash-stat-val bad">3</div>
          <div className="wb-dash-stat-lbl">Vendors flagged</div>
        </div>
      </div>
      <div className="wb-dash-rows">
        {rows.map((r, i) => (
          <div key={i} className="wb-dash-row">
            <div>
              <div className="wb-dash-vendor">{r.v}</div>
              <div className="wb-dash-gstin">{r.g}</div>
            </div>
            <div className="wb-dash-amt">{r.a}</div>
            <div className="wb-dash-amt" style={{ color: "var(--muted)" }}>
              2B · matched
            </div>
            <span className={`wb-dash-status ${r.s}`}>{icon(r.s)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Same container as HubSection/HubAPIsSection (WbHubs.tsx) so the LogoWall
   content column lines up with the sections below it at every breakpoint. */
const wrap = "w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-16";

// ─── LogoWall ─────────────────────────────────────────────────────────────────

/* Proof points and stats mirror claims made elsewhere on the page (hero cert
   strip, WbStats) so the section never contradicts the rest of the site. */
const TRUST_POINTS = [
  'Licensed GST Suvidha Provider — direct GSTN connection',
  'ISO 27001:2022 certified infrastructure',
  'Enterprise-grade encryption on every filing',
];

const TRUST_STATS = [
  { val: '12,000+', lbl: 'businesses run compliance on us' },
  { val: '10 Cr+', lbl: 'invoices filed through WhiteBooks' },
  { val: '99.95%', lbl: 'API uptime SLA' },
];

export function LogoWall() {
  return (
    <section className="relative overflow-hidden" data-reveal>
      {/* Ambient brand glow anchored behind the visual column */}
      <div
        aria-hidden
        className="absolute top-1/2 right-[-12%] w-[640px] h-[640px] -translate-y-1/2 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--brand-glow) 0%, transparent 65%)', filter: 'blur(48px)' }}
      />

      <div className={`${wrap} relative flex flex-col items-center gap-14 max-md:gap-12 py-10 sm:py-14 md:py-16 lg:py-24`}>
        {/* Narrative + proof, stacked and centered */}
        <div className="flex flex-col items-center text-center gap-6 max-w-[820px]">
          <EyebrowPill label={"Trusted Compliance Partner"} />

          <h2 className="font-serif font-semibold text-[clamp(32px,3.8vw,44px)] leading-[1.04] tracking-[-0.025em] m-0 [text-wrap:balance] text-[var(--text)]">
            Compliance for companies that{' '}
            <span className="text-[var(--brand)]">can't afford to get it wrong.</span>
          </h2>
          <p className="text-base md:text-lg leading-[1.6] m-0 max-w-[60ch] text-[var(--fg-secondary)]">
            WhiteBooks runs GST, e-invoicing, and e-way bill operations for
            India's largest enterprises — and the CA firms that audit them.
          </p>

          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 m-0 p-0 list-none">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-3 text-[15px] leading-snug text-[var(--muted-2)]">
                <TickMark width={16} height={16} className="shrink-0" />
                {point}
              </li>
            ))}
          </ul>

          <div className="w-full grid grid-cols-3 max-sm:grid-cols-1 gap-8 max-sm:gap-4 border-0 border-t border-solid border-[var(--hairline-bright)] pt-7 mt-2">
            {TRUST_STATS.map((s) => (
              <div key={s.lbl}>
                <div className="font-display font-semibold text-[clamp(22px,2.4vw,32px)] leading-none tracking-[-0.02em] text-[var(--text)]">
                  {s.val}
                </div>
                <div className="mt-2 text-[13px] leading-snug text-[var(--muted)]">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Layered visual with floating proof cards */}
        <div className="relative w-full max-w-[1280px] mx-auto">
          {/* Offset gradient frame peeking out behind the photo */}
          <div
            aria-hidden
            className="absolute -inset-3 rounded-[24px] rotate-[1.5deg] pointer-events-none"
            style={{ background: 'linear-gradient(135deg, var(--brand-soft) 0%, transparent 55%)' }}
          />
          <div className="relative rounded-2xl overflow-hidden border border-solid border-[var(--hairline-bright)] shadow-[0_32px_80px_-32px_rgba(0,0,0,0.45)] ">
            <img
              src={accountingDashboard}
              alt="WhiteBooks compliance dashboard in a finance team's workspace"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Floating proof: GSP badge */}
          {/* <div className="absolute -top-4 -right-3 max-sm:right-2 flex items-center gap-2 px-3.5 py-2 rounded-xl border border-solid border-[var(--hairline-bright)] bg-[var(--bg-elev)] shadow-[0_16px_40px_-16px_rgba(0,0,0,0.4)]">
            <TickMark width={14} height={14} className="shrink-0" />
            <span className="text-[12.5px] font-medium tracking-[0.02em] text-[var(--text)] whitespace-nowrap">
              Licensed GSP · GSTN
            </span>
          </div> */}

          {/* Floating proof: live reconciliation chip (echoes the product) */}
          {/* <div className="absolute -bottom-5 -left-3 max-sm:left-2 flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-solid border-[var(--hairline-bright)] bg-[var(--bg-elev)] shadow-[0_16px_40px_-16px_rgba(0,0,0,0.4)]">
            <span className="relative flex w-2 h-2 shrink-0" aria-hidden>
              <span className="absolute inline-flex w-full h-full rounded-full bg-[var(--success)] opacity-60 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-[var(--success)]" />
            </span>
            <span className="text-[12.5px] leading-tight text-[var(--text)] whitespace-nowrap">
              GSTR-2B reconciled
              <span className="text-[var(--muted)]"> · 4,238 invoices matched</span>
            </span>
          </div> */}
        </div>
      </div>
    </section>
  );
}

// ─── Stat ─────────────────────────────────────────────────────────────────────

interface StatProps {
  val: string;
  lbl: string;
}

export function Stat({ val, lbl }: StatProps) {
  return (
    <div className="wb-stat">
      <div className="wb-stat-val">{val}</div>
      <div className="wb-stat-lbl">{lbl}</div>
    </div>
  );
}