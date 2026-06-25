import { memo, useEffect, useState } from "react";
import complianceTrust from "../assets/elements/complaince-trust.jpeg";
import { useIsMobile } from "@/hooks/useIsMobile";
import { HeroFluidBackground } from "@/layouts/SiteShell";
import { Button } from "@/components/ui/Button";
import EyebrowPill from "@/components/ui/EyebrowPill";
import LogoWallCarousel from "@/components/ui/LogoWall";
import { BookDemoModal } from "@/components/modals/BookDemoModal";
import DpIcon from "@/pages/developer/DpIcon";
import HeroShowcase from "./HeroShowcase";

// ─── Hero ─────────────────────────────────────────────────────────────────────

export const Hero = memo(function Hero(): JSX.Element {
  const isMobile = useIsMobile();
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    if (demoOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [demoOpen]);

  return (
    <>
      <section className="relative bg-[var(--bg-2)] pt-[9rem] overflow-hidden hero-horizon">
        <HeroFluidBackground variant="left" gradientOpacity={0.6} />

        <div className="relative z-10 max-w-[1240px] mx-auto px-8 max-sm:px-5 justiy-center">
          <div className="max-w-[960px] mx-auto text-center">
            <EyebrowPill label="Licensed GSP by GSTIN" subtitle="GST Suvidha Provider" />
            <h1 className="font-display font-semibold text-[clamp(36px,4vw,101px)] leading-[1.05] tracking-[-0.03em] mt-[22px] text-center text-[var(--text)]">
              Compliance infrastructure for{' '}
              <span className="text-[#dc2f65]">India's largest finance teams.</span>
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
            <a href="#migration" className="text-[#dc2f65] not-italic hover:underline">
              We import your data in under 45 minutes →
            </a>
          </p> */}
          </div>

        </div>

        <HeroShowcase />
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

const wrap = "w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4";

// ─── LogoWall ─────────────────────────────────────────────────────────────────

export function LogoWall() {

  return (
    <section className="relative border-b border-[var(--hairline)] pb-24 max-md:pb-16 max-sm:pb-12" data-reveal>

      {/* <div className="wb-logo-wall-header mb-10"> */}
      <div className={`${wrap} grid md:grid-cols-2 grid-cols-1 gap-12 items-center pt-24 max-md:pt-16 max-sm:pt-12`}>
        {/* Left: eyebrow + heading + body */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2.5">
            {/* <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[var(--brand)] opacity-70">
              <path d="M12 2C9 6 4 8 4 13a8 8 0 0016 0c0-5-5-7-8-11z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg> */}
            {/* <TickMark width={12} height={12} className="shrink-0" />
            <span className="text-sm font-medium tracking-wide text-[var(--muted)] uppercase">Trusted Compliance Partner</span> */}
            <EyebrowPill label={"Trusted Compliance Partner"} />
            {/* <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[var(--brand)] opacity-70">
              <path d="M12 2C9 6 4 8 4 13a8 8 0 0016 0c0-5-5-7-8-11z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg> */}
          </div>
          <h2 className="h1">
            Compliance for companies that{' '}
            <span className="text-[var(--brand)]">can't afford to get it wrong.</span>
          </h2>
          <p className="body">
            Whitebooks runs GST, e-invoicing, and e-way bill operations for
            India's largest enterprises and the CA firms that audit them. We
            already helped 3,000+ Customers across India.
          </p>
        </div>
        {/* Right: image */}
        <div className="rounded-2xl overflow-hidden w-full aspect-[4/3]">
          <img
            src={complianceTrust}
            alt="Compliance trust — enterprise teams at work"
            className="w-full h-full object-cover"
          />
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