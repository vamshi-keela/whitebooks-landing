import React, { memo } from "react";
import heroImage from "../assets/hero-image.png";
import {
  FileText,
  FileSpreadsheet,
  FileCheck2,
  Truck,
  Globe,
  Users,
  Briefcase,
  MapPin,
  Cloud,
  Code2,
  Check,
  type LucideIcon,
} from "lucide-react";

const BRAND = "#dc2f65";

// Near-black glass card with a soft pink top-edge highlight and a faint
// radial glow at the top — matches the "glass catching light" look in the comp.
const cardSurface: React.CSSProperties = {
  background: [
    "radial-gradient(120% 78% at 50% 0%, rgba(220,47,101,0.16) 0%, rgba(220,47,101,0) 46%)",
    "linear-gradient(155deg, rgba(15,8,19,0.95) 0%, rgba(6,2,11,0.98) 100%)",
  ].join(", "),
  border: "1px solid rgba(220,47,101,0.26)",
  boxShadow: [
    "inset 0 1px 0 rgba(255,110,155,0.5)", // glass top edge
    "inset 1px 0 0 rgba(255,90,140,0.16)", // glass left edge
    "inset -1px 0 0 rgba(220,47,101,0.05)", // faint right edge
    "0 12px 44px rgba(0,0,0,0.62)", // deep drop shadow
    "0 0 28px rgba(220,47,101,0.08)", // pink ambient glow
  ].join(", "),
  // NOTE: backdrop-filter was intentionally removed. The card background above
  // is already 95–98% opaque, so the blur had almost no visible effect while
  // being one of the most expensive paint ops on the page — 7 of these on a
  // scaled canvas forced a full, slow re-raster every time the hero scrolled
  // back into view (the 1–2s stall).
};

// Subdued dark-glass tile used for the stats card + API strip icons.
const darkTile: React.CSSProperties = {
  background:
    "linear-gradient(155deg, rgba(64,14,32,0.92) 0%, rgba(28,8,16,0.96) 100%)",
  border: "1px solid rgba(220,47,101,0.42)",
  boxShadow:
    "inset 0 1px 0 rgba(255,120,160,0.28), 0 0 18px rgba(220,47,101,0.28)",
};

interface ProductCard {
  title: string;
  icon: LucideIcon;
  items: string[];
  tags: string[];
}

const PRODUCT_CARDS: ProductCard[] = [
  {
    title: "GST Software",
    icon: FileText,
    items: [
      "All GSTR Returns (1 / 3B / 9 / 2B)",
      "Auto Data Fetch & Reconciliation",
      "E-Invoicing & E-Way Bill Integration",
      "HSN / SAC & ITC Management",
      "Multi-GSTIN Management",
    ],
    tags: ["Accurate", "Fast", "Hassle-Free"],
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
  },
  {
    title: "KSA e-Invoicing",
    icon: Globe,
    items: [
      "ZATCA Phase 2 Compliant",
      "IRN Generation",
      "Real-time Reporting",
      "For KSA Businesses",
    ],
    tags: ["Global", "Compliant", "Ready"],
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
}

const APIS: ApiItem[] = [
  { icon: Cloud, title: "GST API", sub: "File returns, get data" },
  { icon: Cloud, title: "e-Invoice API", sub: "Generate IRNs, get e-invoices" },
  { icon: Truck, title: "e-Way Bill API", sub: "Create & manage e-Way Bills" },
  { icon: Globe, title: "KSA e-Invoice API", sub: "ZATCA e-Invoicing via API" },
  { icon: Code2, title: "Developer Friendly", sub: "Swagger Docs, SDKs, Sandbox" },
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
      className={`flex shrink-0 items-center justify-center bg-gradient-to-br from-[#ff5a8e] to-[#dc2f65] shadow-[0_6px_18px_rgba(220,47,101,0.45)] ring-1 ring-[rgba(255,255,255,0.15)] ${className}`}
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
      style={darkTile}
      className={`flex shrink-0 items-center justify-center ${className}`}
    >
      <Icon className={iconClassName} color="#ff6a96" strokeWidth={2.1} />
    </span>
  );
}

// Cards size to their content — no h-full so the grid rows stay tight.
function ProductGlassCard({ card }: { card: ProductCard }) {
  const { icon, title, items, tags } = card;
  return (
    <div
      style={cardSurface}
      className="group relative flex flex-col rounded-[20px] p-4 transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="flex items-center gap-2.5">
        <IconTile
          icon={icon}
          className="h-9 w-9 rounded-[10px]"
          iconClassName="h-[18px] w-[18px]"
        />
        <h3 className="font-display text-[13.5px] font-semibold uppercase tracking-[0.05em] text-white/95 xl:whitespace-nowrap">
          {title}
        </h3>
      </div>

      <ul className="mt-[10px] space-y-[7px]">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-[12.5px] leading-snug text-white/70"
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
            className="rounded-full border border-[rgba(220,47,101,0.32)] bg-[rgba(220,47,101,0.10)] px-2.5 py-[4px] text-[11px] font-medium text-[#ff7197]"
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
      style={cardSurface}
      className="relative flex flex-col justify-center rounded-[20px] p-4 transition-transform duration-300 hover:-translate-y-1 max-md:p-3"
    >
      <ul className="flex flex-col">
        {STATS.map((stat, i) => (
          <li
            key={stat.label}
            className={`flex items-center gap-3 py-3.5 first:pt-0 last:pb-0 max-md:gap-2 max-md:py-2.5 ${i < STATS.length - 1
              ? "border-b border-[rgba(255,255,255,0.07)]"
              : ""
              }`}
          >
            <DarkIconTile
              icon={stat.icon}
              className="h-11 w-11 rounded-full max-md:h-8 max-md:w-8"
              iconClassName="h-[19px] w-[19px] max-md:h-3.5 max-md:w-3.5"
            />
            <div className="min-w-0">
              <div className="font-display text-[22px] font-bold leading-none tracking-tight text-[#ff4f86] whitespace-nowrap max-md:text-[15px]">
                {stat.value}
              </div>
              <div className="mt-1 text-[12px] leading-tight text-white/70 max-md:mt-0.5 max-md:text-[10px]">
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
  const responsive = variant === "responsive";
  return (
    <div
      style={cardSurface}
      className={`relative overflow-hidden rounded-[20px] pb-5 ${responsive ? "px-5" : "px-8"
        }`}
    >
      <div className="mb-4 text-center">
        <span className="font-display text-[12px] font-semibold uppercase tracking-[0.22em] text-white/90">
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
            className={`flex min-w-0 items-center gap-2.5 ${responsive
              ? ""
              : `px-4 ${i > 0 ? "border-l border-[rgba(255,255,255,0.07)]" : ""}`
              }`}
          >
            <DarkIconTile
              icon={api.icon}
              className="h-10 w-10 shrink-0 rounded-xl"
              iconClassName="h-[18px] w-[18px]"
            />
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-white/95">
                {api.title}
              </div>
              <div className="text-[11.5px] leading-tight text-white/70">
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
        <line x1="150" y1="240" x2="20" y2="240" />
        <line x1="450" y1="240" x2="580" y2="240" />
      </g>

      {/* dots where the branches touch the ring */}
      <g fill="#ff5a8e">
        <circle cx="177" cy="154" r="3.5" />
        <circle cx="423" cy="154" r="3.5" />
        <circle cx="150" cy="240" r="3.5" />
        <circle cx="450" cy="240" r="3.5" />
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

function PersonStage({ align = "end" }: { align?: "center" | "end" }) {
  return (
    <div
      className={`relative flex h-full min-h-0 justify-center ${align === "center" ? "items-center" : "items-end"
        }`}
    >
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

// Memoized: HeroShowcase takes no props and its data is module-level constant,
// so it only ever needs to render once. This stops the parent <Hero>'s
// scroll/state-driven re-renders from re-running this entire (heavy) subtree.
const HeroShowcase = memo(function HeroShowcase() {
  const [gst, accounting, eway, einvoice, ksa] = PRODUCT_CARDS;

  return (
    <div className="relative z-10 mx-auto mt-10 w-full max-w-[1500px] px-4 pb-20 md:mt-14 md:px-6 [overflow-x:clip]">

      {/* ══════════════════════════════════════════════════════════════════════
          Both layouts live on a fixed-width canvas that is scaled down with a
          single transform, so cards, text and the person all shrink together
          to fit the viewport width.

          --showcase-scale: scaled canvas width = (viewport − side padding),
            capped at 1 once the canvas fits.
          --showcase-h:    natural (unscaled) height of the canvas, used to
            pull the following content up so the transform leaves no gap.

          Desktop (md+): the full 5-card constellation + ApiStrip on a 1468px
            canvas. Mobile (<md): only the person + 4 product cards on a smaller
            760px canvas; Stats, KSA and the ApiStrip render full-size below it.
      ══════════════════════════════════════════════════════════════════════ */}
      <style>{`
        .hero-canvas-desk {
          --showcase-scale: clamp(0.2, calc((min(100vw, 1500px) - 48px) / 1468px), 1);
          --showcase-h: 645px;
        }
        .hero-canvas-mob {
          --showcase-scale: clamp(0.2, calc((100vw - 32px) / 760px), 1);
          --showcase-h: 734px;
        }
      `}</style>

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
          <div className="col-start-1 row-start-1 row-end-3 self-end">
            <StatsGlassCard />
          </div>

          <div className="col-start-2 row-start-1">
            <ProductGlassCard card={gst} />
          </div>

          {/* Person stage — spans both rows */}
          <div className="col-start-3 row-start-1 row-end-3 self-stretch">
            <PersonStage />
          </div>

          <div className="col-start-4 row-start-1">
            <ProductGlassCard card={accounting} />
          </div>

          <div className="col-start-2 row-start-2">
            <ProductGlassCard card={eway} />
          </div>

          <div className="col-start-4 row-start-2">
            <ProductGlassCard card={einvoice} />
          </div>

          <div className="col-start-5 row-start-2">
            <ProductGlassCard card={ksa} />
          </div>
        </div>

        <div style={{ width: "1468px", marginTop: "12px" }}>
          <ApiStrip variant="fixed" />
        </div>
      </div>

      {/* ── Mobile (<md) ───────────────────────────────────────────────────── */}
      <div className="md:hidden">
        {/* Scaled core: person flanked by the four product cards. */}
        <div
          className="hero-canvas-mob origin-top-left"
          style={{
            width: "760px",
            transform: "scale(var(--showcase-scale, 1))",
            marginBottom: "calc((var(--showcase-scale, 1) - 1) * var(--showcase-h, 0px))",
          } as React.CSSProperties}
        >
          <div
            className="grid items-start"
            style={{
              gridTemplateColumns: "1fr 1.2fr 1fr",
              gap: "10px 12px",
              width: "760px",
            }}
          >
            <div className="col-start-1 row-start-1">
              <ProductGlassCard card={gst} />
            </div>
            <div className="col-start-1 row-start-2">
              <ProductGlassCard card={eway} />
            </div>

            <div className="col-start-2 row-start-1 row-end-3 self-stretch">
              <PersonStage align="center" />
            </div>

            <div className="col-start-3 row-start-1">
              <ProductGlassCard card={accounting} />
            </div>
            <div className="col-start-3 row-start-2">
              <ProductGlassCard card={einvoice} />
            </div>
          </div>
        </div>

        {/* Stats + KSA — full-size, readable, side by side. */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          <StatsGlassCard />
          <ProductGlassCard card={ksa} />
        </div>

        {/* ApiStrip — full-size, responsive. */}
        <div className="mt-3">
          <ApiStrip variant="responsive" />
        </div>
      </div>
    </div>
  );
});

export default HeroShowcase;
