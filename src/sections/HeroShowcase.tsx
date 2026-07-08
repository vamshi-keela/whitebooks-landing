import React, { memo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/hero-image.png";
import {
  FileText,
  FileSpreadsheet,
  FileCheck2,
  Truck,
  Globe,
  BellRing,
  Users,
  Briefcase,
  MapPin,
  Cloud,
  Code2,
  Check,
  type LucideIcon,
} from "lucide-react";

const BRAND = "#d33568";

// The glass card + tile surfaces, their text colours, dividers, tags, stat
// accents and the scaled-canvas vars all live as `.hero-*` classes in
// src/styles/design-system-wb.css (imported globally in main.tsx), where a
// single [data-theme="light"] override re-skins the whole hero for light mode
// without touching the (carefully tuned) dark defaults.

interface ProductCard {
  title: string;
  icon: LucideIcon;
  items: string[];
  tags: string[];
  route: string;
}

const PRODUCT_CARDS: ProductCard[] = [
  {
    title: "GST Software",
    icon: FileText,
    items: [
      "All GSTR Returns (1 / 3B / 9 / 2B)",
      "Auto Data Fetch & Reconciliation",
      "E-Invoicing, E-Way Bill Integration",
      "HSN / SAC & ITC Management",
      "Multi-GSTIN Management",
    ],
    tags: ["Accurate", "Fast", "Hassle-Free"],
    route: "/softwares/gst",
  },
  {
    title: "Accounting Software",
    icon: FileSpreadsheet,
    items: [
      "Smart Invoicing & Billing",
      "Bank Reconciliation",
      "Inventory, AR/AP, PO, QR",
      "Profit & Loss, Balance Sheet",
      "Financial Reports & MIS",
    ],
    tags: ["Simple", "Automated", "Powerful"],
    route: "/softwares/accounting",
  },
  {
    title: "E-Way Bill Software",
    icon: Truck,
    items: [
      "Generate, Update, Cancel, Extend",
      "Bulk e-Way Bills",
      "Real-time Tracking & Alerts",
      "Direct NIC API Integration",
      "Consolidated EWB Reports",
    ],
    tags: ["Fast", "Reliable", "Compliant"],
    route: "/softwares/e-way-bill",
  },
  {
    title: "E-Invoice Software",
    icon: FileCheck2,
    items: [
      "IRN Generation (NIC-IRP)",
      "Bulk e-Invoice Support",
      "Signed JSON & QR Code",
      "Auto-Sync with ERP / Tally",
      "Credit / Debit Note Support",
    ],
    tags: ["Instant", "Secure", "Compliant"],
    route: "/softwares/e-invoice",
  },
  {
    title: "Notice Management",
    icon: BellRing,
    items: [
      "Auto-Fetch from GSTN, ITD & TRACES",
      "Smart Deadline Tracking & Alerts",
      // "Centralised Notice Repository",
      "CA & Team Collaboration",
      "Document Management & Audit Trail",
    ],
    tags: ["Automated", "Timely", "Organised"],
    route: "/softwares/notice-management",
  },
];

interface StatItem {
  icon: LucideIcon;
  value: string;
  label: string;
}

const STATS: StatItem[] = [
  { icon: Users, value: "5,000+", label: "CAs & Tax Professionals" },
  { icon: Briefcase, value: "3,000+", label: "Businesses" },
  { icon: MapPin, value: "8,000+", label: "Cities & Towns" },
  { icon: FileText, value: "10 Crore+", label: "Invoices Created" },
];

interface ApiItem {
  icon: LucideIcon;
  title: string;
  sub: string;
  route?: string;
}

const APIS: ApiItem[] = [
  {
    icon: Cloud, title: "GST API", sub: "File returns, get data",
    route: '/developer/gst-api/get-public-search',
  },
  {
    icon: Truck, title: "e-Way Bill API", sub: "Create & manage e-Way Bills",
    route: '/developer/e-way-bill-api/get-ewaybillapi-v1.03-authenticate'
  },
  {
    icon: Cloud, title: "e-Invoice API", sub: "Generate IRNs, get e-invoices",
    route: '/developer/e-invoice-api/get-einvoice-authenticate',
  },
  {
    icon: BellRing, title: "Notice Management API", sub: "Never miss a tax notice",
    route: '/developer/gst-api/get-public-search'
  },
  {
    icon: Code2, title: "Developer Friendly Docs", sub: "Docs, SDKs, Sandbox",
    route: '/developer/overview'
  },
];

// Bright solid-pink tile — used for product card headers.
function IconTile({
  icon: Icon,
  className = "",
  iconClassName = "",
}: {
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center bg-gradient-to-br from-[#ff5a8e] to-[#d33568] shadow-[0_6px_18px_rgba(220,47,101,0.45)] ring-1 ring-[rgba(255,255,255,0.15)] ${className}`}
    >
      <Icon className={`text-white ${iconClassName}`} strokeWidth={2.1} />
    </span>
  );
}

// Subdued dark-glass tile with a pink icon — stats + API strip.
function DarkIconTile({
  icon: Icon,
  className = "",
  iconClassName = "",
}: {
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <span
      className={`hero-tile flex shrink-0 items-center justify-center ${className}`}
    >
      {/* color comes from the tile's `color` (currentColor) so it flips per theme */}
      <Icon className={iconClassName} color="currentColor" strokeWidth={2.1} />
    </span>
  );
}

// Cards size to their content — no h-full so the desktop grid rows stay
// tight. The mobile rail passes h-full so swiped cards match heights.
function ProductGlassCard({
  card,
  className = "",
}: {
  card: ProductCard;
  className?: string;
}) {
  const { icon, title, items, tags, route } = card;
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(route)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate(route);
        }
      }}
      className={`hero-card group relative flex cursor-pointer flex-col rounded-[20px] p-4 transition-transform duration-300 hover:-translate-y-1 ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <IconTile
          icon={icon}
          className="h-9 w-9 rounded-[10px]"
          iconClassName="h-[18px] w-[18px]"
        />
        <h3 className="hero-txt-strong font-display text-[13.5px] font-semibold uppercase tracking-[0.05em] xl:whitespace-nowrap">
          {title}
        </h3>
      </div>

      <ul className="mt-[10px] space-y-[7px]">
        {items.map((item) => (
          <li
            key={item}
            className="hero-txt-muted flex items-start gap-2 text-[12.5px] leading-snug"
          >
            <Check
              size={13}
              strokeWidth={3}
              className="mt-[2px] shrink-0"
              color={BRAND}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="hero-tag rounded-full px-2.5 py-[4px] text-[11px] font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function StatsGlassCard() {
  return (
    <div
      className="hero-card relative flex flex-col justify-center rounded-[20px] p-4 transition-transform duration-300 hover:-translate-y-1 max-md:p-3"
    >
      <ul className="flex flex-col">
        {STATS.map((stat, i) => (
          <li
            key={stat.label}
            className={`flex items-center gap-3 py-3.5 first:pt-0 last:pb-0 max-md:gap-2 max-md:py-2.5 ${i < STATS.length - 1
              ? "hero-divider border-b"
              : ""
              }`}
          >
            <DarkIconTile
              icon={stat.icon}
              className="h-11 w-11 rounded-full max-md:h-8 max-md:w-8"
              iconClassName="h-[19px] w-[19px] max-md:h-3.5 max-md:w-3.5"
            />
            <div className="min-w-0">
              <div className="hero-stat-value font-display text-[22px] font-bold leading-none tracking-tight whitespace-nowrap max-md:text-[15px]">
                {stat.value}
              </div>
              <div className="hero-txt-muted mt-1 text-[12px] leading-tight max-md:mt-0.5 max-md:text-[10px]">
                {stat.label}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// "fixed"      — 5-up row, used inside the scaled desktop canvas (never reflows).
// "responsive" — stacks 1-up / 2-up by viewport, used in the mobile block.
function ApiStrip({ variant = "fixed" }: { variant?: "fixed" | "responsive" }) {
  const navigate = useNavigate();
  const responsive = variant === "responsive";
  return (
    <div
      className={`hero-card relative overflow-hidden rounded-[20px] pb-5 ${responsive ? "px-5" : "px-8"
        }`}
    >
      <div className="mb-4 mt-2 text-center">
        <span className="hero-txt-strong font-display text-[13.5px] font-semibold mt-1 uppercase tracking-[0.05em] xl:whitespace-nowrap">
          Powerful APIs for Developers
        </span>
      </div>
      <div
        className={
          responsive
            ? "grid grid-cols-1 gap-x-4 gap-y-3 min-[400px]:grid-cols-2"
            : "grid grid-cols-5"
        }
      >
        {APIS.map((api, i) => (
          <div
            key={api.title}
            onClick={() => navigate(api.route || "/")}
            className={`flex min-w-0 items-center gap-2.5 cursor-pointer ${responsive
              ? ""
              : `px-4 ${i > 0 ? "hero-divider border-l" : ""}`
              }`}
          >
            <DarkIconTile
              icon={api.icon}
              className="h-10 w-10 shrink-0 rounded-xl"
              iconClassName="h-[18px] w-[18px]"
            />
            <div className="min-w-0">
              <div className="hero-txt-strong text-[13px] font-semibold">
                {api.title}
              </div>
              <div className="hero-txt-muted text-[11.5px] leading-tight">
                {api.sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Dashed constellation ring + branch lines that link the cards to the centre.
function ConnectorWeb() {
  return (
    <svg
      viewBox="0 0 600 480"
      fill="none"
      aria-hidden
      className="absolute left-1/2 top-1/2 block h-[118%] w-[172%] -translate-x-1/2 -translate-y-1/2 overflow-visible"
    >
      {/* dashed ring around the person */}
      <circle
        cx="300"
        cy="240"
        r="150"
        stroke="rgba(220,47,101,0.32)"
        strokeWidth="1.5"
        strokeDasharray="5 8"
      />

      {/* branch lines toward the four inner cards */}
      <g stroke="rgba(220,47,101,0.4)" strokeWidth="1.5" strokeDasharray="4 7">
        <line x1="177" y1="154" x2="48" y2="64" />
        <line x1="423" y1="154" x2="552" y2="64" />
        <line x1="150" y1="284" x2="20" y2="395" />
        <line x1="450" y1="280" x2="580" y2="395" />
      </g>

      {/* dots where the branches touch the ring */}
      <g fill="#ff5a8e">
        <circle cx="177" cy="154" r="3.5" />
        <circle cx="423" cy="154" r="3.5" />
        <circle cx="156" cy="280" r="3.5" />
        <circle cx="445" cy="280" r="3.5" />
      </g>

      {/* glowing dots at the card-facing ends */}
      <g
        fill="#ff5a8e"
        style={{ filter: "drop-shadow(0 0 6px rgba(220,47,101,0.9))" }}
      >
        <circle cx="48" cy="64" r="5" />
        <circle cx="552" cy="64" r="5" />
        <circle cx="20" cy="240" r="5" />
        <circle cx="580" cy="240" r="5" />
      </g>
    </svg>
  );
}

function PersonStage() {
  return (
    <div className="relative flex h-full min-h-0 items-end justify-center">
      {/* Soft brand glow — rendered as radial-gradients instead of blurred solid
          fills. A large filter: blur() is an expensive per-raster pass; a
          gradient reproduces the same falloff for ~free on the GPU. */}
      <div
        aria-hidden
        className="absolute bottom-[4%] left-1/2 h-[80%] w-[78%] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(220,47,101,0.30) 0%, rgba(220,47,101,0.12) 45%, transparent 72%)",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-[12%] left-1/2 h-[50%] w-[54%] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,61,119,0.40) 0%, rgba(255,61,119,0.16) 45%, transparent 72%)",
        }}
      />

      {/* Dashed connector constellation (desktop only) */}
      <ConnectorWeb />

      {/* Human image */}
      <div className="relative z-10 flex aspect-[4/8] w-[78%] max-w-[280px] items-center justify-center">
        <img
          src={heroImage}
          alt=""
          className="h-full w-full object-contain object-bottom"
        />
      </div>
    </div>
  );
}

/* ── Mobile-only pieces ─────────────────────────────────────────────────────
   The mobile hero is composed natively instead of scaling the desktop canvas:
   the person is a full-width centerpiece with the four stats floating around
   them as glass pills, and the five product cards live in a snap carousel
   that overlaps the person's lower body so the layers blend. */

// Compact glass pill anchored around the person.
function FloatingStat({
  stat,
  className = "",
}: {
  stat: StatItem;
  className?: string;
}) {
  return (
    <div
      className={`hero-card absolute z-10 flex items-center gap-2 rounded-2xl py-1.5 pl-1.5 pr-3 ${className}`}
    >
      <DarkIconTile
        icon={stat.icon}
        className="h-7 w-7 rounded-lg"
        iconClassName="h-3.5 w-3.5"
      />
      <div className="min-w-0">
        <div className="hero-stat-value font-display whitespace-nowrap text-[14px] font-bold leading-none tracking-tight">
          {stat.value}
        </div>
        <div className="hero-txt-muted mt-0.5 whitespace-nowrap text-[9.5px] leading-none">
          {stat.label}
        </div>
      </div>
    </div>
  );
}

function MobilePersonStage() {
  const [cas, businesses, cities, invoices] = STATS;
  return (
    <div className="relative mx-auto flex h-[400px] w-full max-w-[420px] items-end justify-center">
      {/* Soft brand glow — radial gradients, same zero-blur idiom as PersonStage */}
      <div
        aria-hidden
        className="absolute bottom-0 left-1/2 h-[85%] w-[95%] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(220,47,101,0.28) 0%, rgba(220,47,101,0.11) 45%, transparent 72%)",
        }}
      />
      <div
        aria-hidden
        className="absolute bottom-[8%] left-1/2 h-[52%] w-[62%] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(255,61,119,0.38) 0%, rgba(255,61,119,0.15) 45%, transparent 72%)",
        }}
      />

      {/* Dashed orbit ring behind the person, echoing the desktop ConnectorWeb */}
      <svg
        viewBox="0 0 400 400"
        aria-hidden
        className="absolute left-1/2 top-[52%] h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2"
      >
        <circle
          cx="200"
          cy="200"
          r="186"
          stroke="rgba(220,47,101,0.30)"
          strokeWidth="1.5"
          strokeDasharray="5 8"
          fill="none"
        />
        <g fill="#ff5a8e">
          <circle cx="55" cy="98" r="3.5" />
          <circle cx="345" cy="98" r="3.5" />
          <circle cx="22" cy="250" r="3.5" />
          <circle cx="378" cy="250" r="3.5" />
        </g>
      </svg>

      {/* Human image */}
      <img
        src={heroImage}
        alt=""
        className="relative z-[1] h-[96%] w-auto object-contain object-bottom"
      />

      {/* Stats blended around the person — staggered left/right */}
      <FloatingStat stat={cas} className="left-0 top-[14%]" />
      <FloatingStat stat={invoices} className="right-0 top-[26%]" />
      <FloatingStat stat={businesses} className="left-0 top-[44%]" />
      <FloatingStat stat={cities} className="right-0 top-[56%]" />
    </div>
  );
}

// Swipeable snap rail of all five product cards with progress dots.
function ProductCardRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // setState bails out when the index is unchanged, so scroll re-renders only
  // fire when the active dot actually moves.
  const onScroll = () => {
    const el = railRef.current;
    if (!el) return;
    const step = el.scrollWidth / PRODUCT_CARDS.length;
    setActive(
      Math.min(PRODUCT_CARDS.length - 1, Math.round(el.scrollLeft / step))
    );
  };

  return (
    <div>
      <div
        ref={railRef}
        onScroll={onScroll}
        className="wb-hscroll -mx-4 flex snap-x snap-mandatory items-stretch gap-3 overflow-x-auto px-4 pt-2 pb-1"
      >
        {PRODUCT_CARDS.map((card) => (
          <div
            key={card.title}
            className="w-[76vw] max-w-[320px] shrink-0 snap-center"
          >
            <ProductGlassCard card={card} className="h-full" />
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        {PRODUCT_CARDS.map((card, i) => (
          <span
            key={card.title}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === active
              ? "w-5 bg-[#d33568]"
              : "w-1.5 bg-[rgba(220,47,101,0.30)]"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

// Memoized: HeroShowcase takes no props and its data is module-level constant,
// so it only ever needs to render once. This stops the parent <Hero>'s
// scroll/state-driven re-renders from re-running this entire (heavy) subtree.
const HeroShowcase = memo(function HeroShowcase() {
  const [gst, accounting, eway, einvoice, ksa] = PRODUCT_CARDS;

  return (
    <div className="relative z-10 mx-auto mt-10 w-full max-w-[1500px] px-4 pb-20 md:mt-14 md:px-6 [overflow-x:clip]">

      {/* Desktop (md+): the full 5-card constellation + ApiStrip on a fixed
          1468px canvas scaled down with a single transform (see
          `.hero-canvas-desk` + all `.hero-*` card styling in
          src/styles/design-system-wb.css), so cards, text and the person all
          shrink together to fit the viewport width.

          Mobile (<md): composed natively at full size — person centerpiece
          with floating stat pills, a snap carousel of the product cards
          overlapping it, then the responsive ApiStrip. */}

      {/* ── Desktop / laptop (md+) ─────────────────────────────────────────── */}
      <div
        className="hero-canvas-desk hidden origin-top-left md:block"
        style={{
          width: "1468px",
          transform: "scale(var(--showcase-scale, 1))",
          marginBottom: "calc((var(--showcase-scale, 1) - 1) * var(--showcase-h, 0px))",
        } as React.CSSProperties}
      >
        <div
          className="grid items-start"
          style={{
            gridTemplateColumns: "1fr 1.45fr 1.45fr 1.45fr 1.15fr",
            gap: "12px 16px",
            width: "1468px",
          }}
        >
          {/* Stats — spans both rows, bottom-aligned */}
          <div className="col-start-1 row-start-1 self-end row-end-3 ">
            <StatsGlassCard />
          </div>

          <div className="col-start-2 row-start-1 relative z-10">
            <ProductGlassCard card={accounting} />
          </div>

          {/* Person stage — spans both rows. z-0 keeps the overflowing
              ConnectorWeb behind every product card (which sit at z-10). */}
          <div className="col-start-3 row-start-1 row-end-3 relative z-0">
            <PersonStage />
          </div>

          <div className="col-start-4 row-start-1 relative z-10">
            <ProductGlassCard card={gst} />
          </div>

          <div className="col-start-2 row-start-2 relative z-10">
            <ProductGlassCard card={eway} />
          </div>

          <div className="col-start-4 row-start-2 relative z-10">
            <ProductGlassCard card={einvoice} />
          </div>

          <div className="col-start-5 row-start-1 self-end row-end-3">
            <ProductGlassCard card={ksa} />
          </div>
        </div>

        <div style={{ width: "1468px", marginTop: "12px" }}>
          <ApiStrip variant="fixed" />
        </div>
      </div>

      {/* ── Mobile (<md) ───────────────────────────────────────────────────── */}
      <div className="md:hidden">
        {/* Person centerpiece with the stats floating around them. */}
        <MobilePersonStage />

        {/* Card rail overlaps the person's lower body so the layers blend. */}
        <div className="relative z-10 -mt-24">
          <ProductCardRail />
        </div>

        {/* ApiStrip — full-size, responsive. */}
        <div className="mt-4">
          <ApiStrip variant="responsive" />
        </div>
      </div>
    </div>
  );
});

export default HeroShowcase;
