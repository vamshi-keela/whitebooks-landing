import React, { useEffect, useState } from "react";
import heroImage from "../assets/hero-image.png";
import heroImageMobile from "../assets/hero-image-mobile.png";
import { useIsMobile } from "@/hooks/useIsMobile";
import { HeroFluidBackground } from "@/layouts/SiteShell";
import { Button } from "@/components/ui/Button";
import EyebrowPill from "@/components/ui/EyebrowPill";
import LogoWallCarousel from "@/components/ui/LogoWall";
import { BookDemoModal } from "@/components/modals/BookDemoModal";
import DpIcon from "@/pages/developer/DpIcon";

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  const isMobile = useIsMobile();
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    if (demoOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [demoOpen]);

  return (
    <>
      <section className="relative bg-[#0a0a0f] pt-[9rem] overflow-hidden hero-horizon">
        <HeroFluidBackground variant="left" gradientOpacity={0.6} />

        <div className="relative z-10 max-w-[1240px] mx-auto px-8 max-sm:px-5 justiy-center">
          <div className="max-w-[960px] mx-auto text-center">
            <EyebrowPill label="GST Suvidha Provider" subtitle="Licensed by GSTN" />
            <h1 className="font-display font-semibold text-[clamp(36px,4vw,101px)] leading-[1.05] tracking-[-0.03em] mt-[22px] text-center text-[#e8e8f0]">
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

        <img
          src={isMobile ? heroImageMobile : heroImage}
          alt="WhiteBooks Hero"
          className="w-full flex-row pt-5"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </section>
      {demoOpen && <BookDemoModal onClose={() => setDemoOpen(false)} />}
    </>
  );
}

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
  const row1 = [
    "P&G",
    "IBM",
    "Razorpay",
    "Pharmeasy",
    "KPMG",
    "Cars24",
    "Hindustan Unilever",
    "Aditya Birla",
    "SBI",
  ];
  const row2 = [
    "Accenture",
    "Philips",
    "TVS",
    "Yamaha",
    "WheelsEye",
    "PepsiCo",
    "Coca-Cola",
    "EaseMyTrip",
    "Grant Thornton",
  ];

  return (
    <section className="relative border-b border-[var(--hairline)] py-24 max-md:py-16 max-sm:py-12" data-reveal>
      {/* <div className="wb-logo-wall-header mb-10"> */}
      <div className={`${wrap} grid md:grid-cols-2 grid-cols-1 gap-10 items-end pb-24 max-md:pb-16`}>
        <h2 className="h1">
          Compliance for the companies that can't afford to get it
          wrong.
        </h2>
        <p className="body">
          Whitebooks runs GST, e-invoicing, and e-way bill operations for
          India's largest enterprises and the CA firms that audit them. We
          already helped 3,000+ Customers across India.
        </p>
      </div>
      <LogoWallCarousel />

      <div className={`${wrap} pt-12 max-md:pt-8`}>
        <div className="wb-stat-strip">
          <Stat val="10 Cr+" lbl="Invoices filed" />
          <Stat val="12,000+" lbl="Businesses" />
          <Stat val="5,000+" lbl="CAs & Tax Professionals" />
          <Stat val="99.95%" lbl="API uptime SLA" />
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