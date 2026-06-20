import React from "react";
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
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
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
      className="relative flex flex-col justify-center rounded-[20px] p-4 transition-transform duration-300 hover:-translate-y-1"
    >
      <ul className="flex flex-col">
        {STATS.map((stat, i) => (
          <li
            key={stat.label}
            className={`flex items-center gap-3 py-3.5 first:pt-0 last:pb-0 ${
              i < STATS.length - 1
                ? "border-b border-[rgba(255,255,255,0.07)]"
                : ""
            }`}
          >
            <DarkIconTile
              icon={stat.icon}
              className="h-11 w-11 rounded-full"
              iconClassName="h-[19px] w-[19px]"
            />
            <div className="min-w-0">
              <div className="font-display text-[22px] font-bold leading-none tracking-tight text-[#ff4f86] whitespace-nowrap">
                {stat.value}
              </div>
              <div className="mt-1 text-[12px] leading-tight text-white/68">
                {stat.label}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ApiStrip() {
  return (
    <div
      style={cardSurface}
      className="relative mt-4 overflow-hidden rounded-[20px] px-5 py-5 sm:px-8"
    >
      <div className="mb-4 text-center">
        <span className="font-display text-[12px] font-semibold uppercase tracking-[0.22em] text-white/90">
          Powerful APIs for Developers
        </span>
      </div>
      {/* Horizontal scroll on very small screens, grid on larger */}
      <div className="flex gap-3 overflow-x-auto pb-1 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:pb-0 lg:grid-cols-5 lg:gap-0">
        {APIS.map((api, i) => (
          <div
            key={api.title}
            className={`flex min-w-[160px] shrink-0 items-center gap-2.5 sm:min-w-0 lg:px-4 ${
              i > 0 ? "lg:border-l lg:border-[rgba(255,255,255,0.07)]" : ""
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
              <div className="text-[11.5px] leading-tight text-white/58">
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
      className="absolute left-1/2 top-1/2 hidden h-[118%] w-[172%] -translate-x-1/2 -translate-y-1/2 overflow-visible xl:block"
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

function PersonStage() {
  return (
    <div className="relative flex min-h-[300px] items-end justify-center sm:min-h-[360px] xl:h-full xl:min-h-0">
      {/* Soft brand glow */}
      <div
        aria-hidden
        className="absolute bottom-[4%] left-1/2 h-[80%] w-[78%] -translate-x-1/2 rounded-[46%] bg-[#dc2f65] opacity-30 blur-[84px]"
      />
      <div
        aria-hidden
        className="absolute bottom-[12%] left-1/2 h-[50%] w-[54%] -translate-x-1/2 rounded-full bg-[#ff3d77] opacity-40 blur-[64px]"
      />

      {/* Dashed connector constellation (desktop only) */}
      <ConnectorWeb />

      {/* Human image slot */}
      <div className="relative z-10 flex aspect-[3/4] w-[78%] max-w-[280px] items-center justify-center rounded-2xl border border-dashed border-white/35 bg-white/[0.04] backdrop-blur-sm">
        <span className="px-4 text-center text-[11px] font-medium uppercase tracking-[0.15em] text-white/75">
          Human image
          <br />
          placeholder
        </span>
      </div>
    </div>
  );
}

export default function HeroShowcase() {
  const [gst, accounting, eway, einvoice, ksa] = PRODUCT_CARDS;

  return (
    <div className="relative z-10 mx-auto mt-10 w-full max-w-[1500px] px-4 pb-20 md:mt-14 md:px-6">
      {/* ── Desktop constellation ──────────────────────────────────────────── */}
      {/* Columns: stats · GST/E-Way · person · Accounting/E-Invoice · KSA.
          items-start so each card shrinks to its own content height; the stats
          card spans both rows but sits at the bottom of that span (self-end),
          matching the comp. */}
      <div className="hidden xl:grid xl:grid-cols-[1fr_1.45fr_1.45fr_1.45fr_1.15fr] xl:items-start xl:gap-x-4 xl:gap-y-3">
        {/* Stats — spans both rows, bottom-aligned within the span */}
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

      {/* ── Tablet / mobile ────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 xl:hidden">
        {/* Stats + person side-by-side on tablet */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StatsGlassCard />
          <PersonStage />
        </div>

        {/* Product cards: 1 col mobile, 2 col tablet */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {PRODUCT_CARDS.map((card) => (
            <ProductGlassCard key={card.title} card={card} />
          ))}
        </div>
      </div>

      <ApiStrip />
    </div>
  );
}
