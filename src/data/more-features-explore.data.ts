/**
 * More Features Explore — typed content for the deep-dive feature pages
 * reached from every showcase card's "More features" CTA (`/features/:slug`).
 *
 * IA mirrors the legacy whitebooks.in feature pages, reorganised into five
 * top-level categories rendered as an in-page sticky nav:
 *   Features · Pricing · Solution · Partner · Resources  (+ FAQ, closing CTA)
 *
 * Two content sources:
 *   1. `MORE_FEATURES_PAGES` — hand-authored pages. The flagship entry is
 *      `prepare-gstr1-gst-features`, crawled from
 *      https://whitebooks.in/features/prepare-gstr1-gst-features/ (12 features
 *      with sub-capabilities + 8 FAQs, verbatim where possible).
 *   2. `getMoreFeaturesPage(slug)` — for any other slug it finds the matching
 *      showcase tab across all four platform-showcase datasets and generates a
 *      full page from it (clicked tab spotlighted, sibling tabs as the grid),
 *      so every "More features" link resolves without hand-authoring.
 *
 * Icons are stored as string keys (`ExploreIcon`) and mapped to lucide-react
 * components inside MoreFeaturesExplore.tsx — data stays serialisable.
 */

import type { ShowcaseCategory, ShowcaseTab } from "./accouting-platform-showcase.data";
import { ACCOUNTING_SHOWCASE_CATEGORIES } from "./accouting-platform-showcase.data";
import { GST_SOFTWARE_SHOWCASE_CATEGORIES } from "./gst-software-platform-showcase.data";
import { E_INVOICING_SOFTWARE_SHOWCASE_CATEGORIES } from "./e-invoicing-software-platform-showcase.data";
import { E_WAY_BILL_SOFTWARE_SHOWCASE_CATEGORIES } from "./e-way-bill-platform-showcase.data";

/* ── Types ────────────────────────────────────────────────────────────────── */

export type ExploreIcon =
  | "shield-check"
  | "activity"
  | "calendar"
  | "pie-chart"
  | "history"
  | "layout-dashboard"
  | "search"
  | "upload"
  | "file-plus"
  | "zap"
  | "download"
  | "clipboard-check"
  | "users"
  | "briefcase"
  | "building"
  | "plug"
  | "store"
  | "book-open"
  | "code"
  | "file-json"
  | "life-buoy"
  | "play"
  | "gauge"
  | "layers"
  | "badge-check"
  | "wrench"
  | "sparkles";

export interface ExploreLink {
  label: string;
  href: string;
}

export interface ExploreHeroStat {
  value: string;
  label: string;
}

export interface ExploreFeature {
  id: string;
  icon: ExploreIcon;
  title: string;
  /** Short qualifier under the title (e.g. the legacy page's H3). */
  tagline: string;
  description: string;
  /** Sub-capabilities listed under the feature on the legacy page. */
  capabilities: string[];
  /** Spotlight features render as full alternating media rows; others as grid cards. */
  spotlight?: boolean;
  media?: {
    /** Placeholder label until a real screenshot is dropped in. */
    label: string;
    // TODO: replace with a real screenshot — e.g. poster: "@assets/product-images/gst-software/…"
    poster?: string;
  };
}

export interface ExplorePricingPlan {
  id: string;
  name: string;
  price: string;
  priceNote: string;
  tagline: string;
  bullets: string[];
  cta: ExploreLink;
  featured?: boolean;
}

export interface ExplorePersona {
  id: string;
  icon: ExploreIcon;
  title: string;
  description: string;
  points: string[];
}

export interface ExplorePartnerTrack {
  id: string;
  icon: ExploreIcon;
  title: string;
  description: string;
  points: string[];
}

export interface ExploreResourceLink {
  id: string;
  icon: ExploreIcon;
  title: string;
  description: string;
  href: string;
  external?: boolean;
}

export interface ExploreFaq {
  question: string;
  answer: string;
}

export interface MoreFeaturesPageData {
  slug: string;
  /** Product the feature belongs to — e.g. "GST Software". */
  productLabel: string;
  /** Hub page for the breadcrumb / back link. */
  productHref: string;
  /** Small chip above the hero title. */
  badge: string;
  title: string;
  subtitle: string;
  /** Hero product screenshot — falls back to a placeholder frame when absent. */
  heroPoster?: string;
  heroStats: ExploreHeroStat[];
  features: {
    heading: string;
    subheading: string;
    items: ExploreFeature[];
  };
  pricing: {
    heading: string;
    subheading: string;
    /** What the custom quote is sized on. */
    dimensions: { label: string; note: string }[];
    plans: ExplorePricingPlan[];
  };
  solution: {
    heading: string;
    subheading: string;
    personas: ExplorePersona[];
  };
  partner: {
    heading: string;
    subheading: string;
    tracks: ExplorePartnerTrack[];
  };
  resources: {
    heading: string;
    subheading: string;
    links: ExploreResourceLink[];
  };
  faqs: ExploreFaq[];
  closing: {
    title: string;
    body: string;
  };
}

/* ── Shared blocks (product-level, reused by generated pages) ─────────────── */

export const EXPLORE_SIGNUP_URL = "https://accounts.whitebooks.in/signup";

const HERO_STATS: ExploreHeroStat[] = [
  { value: "25,000+", label: "businesses served" },
  { value: "8,000+", label: "chartered accountants" },
  { value: "30 Cr+", label: "GST filings annually" },
  { value: "99.99%", label: "uptime SLA" },
];

const PRICING_BLOCK = (product: string): MoreFeaturesPageData["pricing"] => ({
  heading: "Pricing — built around what you actually use",
  subheading:
    `No fixed SKUs. ${product} plans are sized to your filing volume, GSTIN count, integration scope, and support tier — so you never pay for shelf-ware.`,
  dimensions: [
    { label: "Filing volume", note: "invoices & returns per month" },
    { label: "GSTIN count", note: "entities and branches on one workspace" },
    { label: "Integration scope", note: "Tally, SAP, ERP & API connections" },
    { label: "Support tier", note: "from self-serve to dedicated manager" },
  ],
  plans: [
    {
      id: "free",
      name: "Start Free",
      price: "₹0",
      priceNote: "no credit card required",
      tagline: "Full product on sandbox data — evaluate at your own pace.",
      bullets: [
        "Complete feature access in sandbox",
        "Test GSTN environment included",
        "Bulk import with sample templates",
        "Community & email support",
      ],
      cta: { label: "Start free", href: EXPLORE_SIGNUP_URL },
    },
    {
      id: "growth",
      name: "Growth",
      price: "Custom",
      priceNote: "quote within one business day",
      tagline: "Production filing sized to your actual volumes.",
      bullets: [
        "Live GSTN filing with EVC",
        "Unlimited invoice imports",
        "Tally / ERP connectors included",
        "Priority support with SLAs",
      ],
      cta: { label: "Talk to sales", href: "/about/contact-us" },
      featured: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      priceNote: "annual contracts",
      tagline: "Multi-entity compliance with enterprise controls.",
      bullets: [
        "Multi-GSTIN consolidation",
        "SSO & role-based access",
        "On-premise deployment option",
        "Dedicated account manager",
      ],
      cta: { label: "Contact enterprise team", href: "/about/contact-us" },
    },
  ],
});

const SOLUTION_BLOCK = (product: string): MoreFeaturesPageData["solution"] => ({
  heading: `Who this ${product.toLowerCase()} is built for`,
  subheading:
    "Three teams live in this product every filing cycle — each gets a workflow shaped around how they actually work.",
  personas: [
    {
      id: "practitioners",
      icon: "briefcase",
      title: "GST Practitioners & CAs",
      description:
        "File for hundreds of clients from a single dashboard — without juggling portals, spreadsheets, or logins.",
      points: [
        "Switch client workspaces in one click",
        "Bulk validation across client books",
        "Filing calendar with due-date tracking",
        "Client-ready summary reports",
      ],
    },
    {
      id: "finance-teams",
      icon: "users",
      title: "Tax & Finance Teams",
      description:
        "Match GSTR-2A/2B against purchase books, close ITC gaps, and keep every return reconciled before it's filed.",
      points: [
        "Auto reconciliation with GSTR-2A/2B",
        "Safe-to-claim ITC classification",
        "Mismatch alerts before filing",
        "Excel exports for review workflows",
      ],
    },
    {
      id: "compliance-heads",
      icon: "building",
      title: "Enterprise Compliance Heads",
      description:
        "Consolidate multi-GSTIN filings with audit trails, role controls, and a single source of truth for every entity.",
      points: [
        "Multi-GSTIN consolidation",
        "Role-based access & auditor logins",
        "Timestamped audit trails",
        "Uptime SLA with GSP-direct rails",
      ],
    },
  ],
});

const PARTNER_BLOCK: MoreFeaturesPageData["partner"] = {
  heading: "Partner with WhiteBooks",
  subheading:
    "Three partnership tracks — pick the one that matches how you reach businesses, and grow with a GSP-licensed platform behind you.",
  tracks: [
    {
      id: "ca-partners",
      icon: "badge-check",
      title: "CA & Practitioner Partners",
      description:
        "A co-branded portal for filings and ITC reconciliation — your firm's name in front, WhiteBooks rails underneath.",
      points: [
        "Co-branded client portal",
        "Multi-client filing workspace",
        "Practitioner pricing tiers",
      ],
    },
    {
      id: "integration-partners",
      icon: "plug",
      title: "Integration Partners",
      description:
        "Ship native WhiteBooks integrations for ERPs and billing platforms with sandbox keys and engineering support.",
      points: [
        "REST APIs & OpenAPI 3.1 spec",
        "Dedicated sandbox environment",
        "Co-marketing on launch",
      ],
    },
    {
      id: "resellers",
      icon: "store",
      title: "Channel & Resellers",
      description:
        "Regional commissions with a sandbox tenant per prospect — demo on real workflows, not slide decks.",
      points: [
        "Recurring commission structure",
        "Sandbox tenant per prospect",
        "Sales enablement & training",
      ],
    },
  ],
};

const RESOURCES_BLOCK = (productHref: string): MoreFeaturesPageData["resources"] => ({
  heading: "Resources & documentation",
  subheading:
    "Everything you need to evaluate, integrate, and stay current — product docs, developer APIs, and live status in one place.",
  links: [
    {
      id: "product",
      icon: "book-open",
      title: "Product overview",
      description: "Full capability tour with screenshots and workflows.",
      href: productHref,
    },
    {
      id: "api-docs",
      icon: "code",
      title: "Developer docs & APIs",
      description: "REST endpoints, sandbox keys, and quickstart guides.",
      href: "/developer",
    },
    {
      id: "openapi",
      icon: "file-json",
      title: "OpenAPI 3.1 specification",
      description: "Machine-readable spec for codegen and testing.",
      href: "/developer/api-reference",
    },
    {
      id: "videos",
      icon: "play",
      title: "Videos & walkthroughs",
      description: "Step-by-step product videos for every module.",
      href: "/resources/videos",
    },
    {
      id: "support",
      icon: "life-buoy",
      title: "Support centre",
      description: "24×7 Indian support across email, phone, and chat.",
      href: "/resources/support",
    },
    {
      id: "status",
      icon: "activity",
      title: "System status & changelog",
      description: "Live uptime, GSTN sync health, and release notes.",
      href: "/status",
    },
  ],
});

const CLOSING_BLOCK: MoreFeaturesPageData["closing"] = {
  title: "Get started with WhiteBooks",
  body: "Twenty minutes to see it run on your own data. No credit card required.",
};

/* ── Flagship page — Prepare GSTR-1 (crawled from whitebooks.in) ──────────── */

/* Feature screenshots mirrored from whitebooks.in/assets/images/features-images/ */
const GSTR1_IMG = "@assets/product-images/gst-software/prepare-gstr1";

const PREPARE_GSTR1_PAGE: MoreFeaturesPageData = {
  slug: "prepare-gstr1-gst-features",
  productLabel: "GST Software",
  productHref: "/softwares/gst",
  badge: "GSTR-1 Preparation",
  title: "File GSTR-1 accurately, on time — for every return and period",
  subtitle:
    "WhiteBooks simplifies GSTR-1 filing with invoice validation, real-time status tracking, IMS reconciliation, bulk imports, amendments, and portal-ready exports.",
  heroPoster: `${GSTR1_IMG}/prepareGSTR1-dashboard.svg`,
  heroStats: HERO_STATS,
  features: {
    heading: "Twelve capabilities. One clean GSTR-1.",
    subheading:
      "Every step from raw sales data to a filed return — validated, reconciled, and portal-ready without leaving WhiteBooks.",
    items: [
      {
        id: "validation",
        icon: "shield-check",
        title: "Automated Invoice Validation",
        tagline: "Validate invoices automatically before filing",
        description:
          "WhiteBooks automatically validates B2B, B2C, Export, and Credit/Debit Note transactions according to GSTN rules, helping prevent submission rejections.",
        capabilities: [
          "Error detection before upload",
          "GST rule compliance",
          "Smart correction suggestions",
        ],
        spotlight: true,
        media: {
          label: "Invoice validation — error panel with smart corrections",
          poster: `${GSTR1_IMG}/prepare-gstr1-dashboard.svg`,
        },
      },
      {
        id: "filing-status",
        icon: "activity",
        title: "Real-Time Filing Status",
        tagline: "Track GSTR-1 filing status in real time",
        description:
          "Monitor your GSTR-1 return progress instantly. Stay updated on draft, saved, validated, submitted, and filed statuses — all without leaving your dashboard.",
        capabilities: [
          "Instant status updates",
          "Error alerts & notifications",
          "Filing confirmation tracking",
        ],
        media: {
          label: "Filing status — draft to filed progress tracking",
          poster: `${GSTR1_IMG}/prepare-gstr1-dashboard.svg`,
        },
      },
      {
        id: "return-period",
        icon: "calendar",
        title: "Return Period Selection",
        tagline: "Select the correct filing period easily",
        description:
          "Easily switch between monthly and quarterly return periods and manage your return data seamlessly for each selected timeframe.",
        capabilities: [
          "Month / quarter selection",
          "Previous period access",
          "Period lock indicator",
        ],
        media: {
          label: "Return period — month and quarter selection",
          poster: `${GSTR1_IMG}/prepare-gstr1-datewise.svg`,
        },
      },
      {
        id: "sales-summary",
        icon: "pie-chart",
        title: "Sales Summary",
        tagline: "Comprehensive sales summary before filing",
        description:
          "A consolidated summary of all outward supplies, enabling accurate review, validation, and confirmation before final submission.",
        capabilities: [
          "Section-wise totals",
          "Tax breakdown",
          "Download summary report",
        ],
        media: {
          label: "Sales summary — section-wise totals with tax breakdown",
          poster: `${GSTR1_IMG}/prepare-gstr1-summary.svg`,
        },
      },
      {
        id: "amendments",
        icon: "history",
        title: "Pending & Amendments",
        tagline: "Track pending & amended invoices efficiently",
        description:
          "Stay updated on invoices that require corrections or are pending submission, and take the necessary actions promptly without missing any deadlines.",
        capabilities: [
          "Pending invoice list",
          "Amendment history tracking",
          "Correction status monitoring",
        ],
        media: {
          label: "Pending & amendments — past pending invoice tracker",
          poster: `${GSTR1_IMG}/pastPendingInvoice-prepareGSTR1.svg`,
        },
      },
      {
        id: "dashboard",
        icon: "layout-dashboard",
        title: "Invoice Management Dashboard",
        tagline: "Centralized invoice control panel",
        description:
          "Take full control of your sales data — manage, refine, filter, and validate all invoices in one place before completing your GSTR-1 filing.",
        capabilities: [
          "Invoice categorization",
          "Quick edit option",
          "Status-based filtering",
        ],
        spotlight: true,
        media: {
          label: "Invoice dashboard — categorised B2B / B2C / Export view",
          poster: `${GSTR1_IMG}/prepare-gstr1-summary.svg`,
        },
      },
      {
        id: "search",
        icon: "search",
        title: "Advanced Search & Filtering",
        tagline: "Find invoices quickly with smart filters",
        description:
          "Narrow down invoices based on specific criteria, ensuring smooth and error-free return preparation.",
        capabilities: [
          "GSTIN-based search",
          "Date range filter",
          "Invoice number lookup",
        ],
        media: {
          label: "Search & filtering — GSTIN, date range, invoice lookup",
          poster: `${GSTR1_IMG}/prepare-gstr1-searchAndFilter.svg`,
        },
      },
      {
        id: "bulk-import",
        icon: "upload",
        title: "Bulk Import Functionality",
        tagline: "Import sales data in bulk",
        description:
          "Upload multiple invoices simultaneously using Excel or JSON formats to save time and streamline your return preparation process.",
        capabilities: [
          "Excel upload support",
          "JSON file import",
          "Bulk error report",
        ],
        media: {
          label: "Bulk import — Excel / JSON upload with error report",
          poster: `${GSTR1_IMG}/prepare-gstr1-import.svg`,
        },
      },
      {
        id: "manual-entry",
        icon: "file-plus",
        title: "Add Sales Entry Option",
        tagline: "Manually add sales entries",
        description:
          "Create and manage sales invoices manually in one place to streamline your GSTR-1 preparation.",
        capabilities: [
          "Manual invoice creation",
          "Auto tax calculation",
          "Save as draft option",
        ],
        media: {
          label: "Add sales entry — manual invoice creation form",
          poster: `${GSTR1_IMG}/prepare-gstr1-addSales.svg`,
        },
      },
      {
        id: "bulk-actions",
        icon: "zap",
        title: "Bulk Actions",
        tagline: "Smart bulk actions for invoice compliance",
        description:
          "Powerful bulk invoice actions for IRN processing, validation, IMS management, register cleanup, and GST portal synchronization — helping compliance teams manage large invoice volumes faster and with greater accuracy.",
        capabilities: [
          "One-click IRN bulk actions",
          "Bulk GSTR-1 & IMS management",
          "Clear, delete & reset operations",
        ],
        spotlight: true,
        media: {
          label: "Bulk actions — IRN processing & IMS management toolbar",
          poster: `${GSTR1_IMG}/prepare-gstr1-imsStatus.svg`,
        },
      },
      {
        id: "export",
        icon: "download",
        title: "Data Export & Download",
        tagline: "Export and download return data easily",
        description:
          "Export your finalized GSTR-1 data in compliant formats to maintain records, create backups, or proceed with submission.",
        capabilities: [
          "JSON export for GST portal",
          "Excel report download",
          "Summary PDF report",
        ],
        media: {
          label: "Data export — JSON, Excel, and PDF downloads",
          poster: `${GSTR1_IMG}/prepare-gstr1-download.svg`,
        },
      },
      {
        id: "prepare-summary",
        icon: "clipboard-check",
        title: "Prepare Summary Before Filing",
        tagline: "Review summary before final submission",
        description:
          "Review your sales data and tax calculations to ensure everything is accurate before filing GSTR-1 on the GST portal.",
        capabilities: [
          "Consolidated tax summary",
          "Error-free confirmation check",
          "Ready-to-file indicator",
        ],
        media: {
          label: "Prepare summary — ready-to-file confirmation view",
          poster: `${GSTR1_IMG}/prepare-gstr1-dashboard.svg`,
        },
      },
    ],
  },
  pricing: PRICING_BLOCK("GST Software"),
  solution: SOLUTION_BLOCK("GST Software"),
  partner: PARTNER_BLOCK,
  resources: RESOURCES_BLOCK("/softwares/gst"),
  faqs: [
    {
      question: "How does WhiteBooks Automated Invoice Validation prevent GSTR-1 rejection?",
      answer:
        "WhiteBooks checks all B2B, B2C, Export, and Credit/Debit Note entries against the latest GSTN rules before upload. It detects errors, missing values, and format issues in advance and provides Smart Correction Suggestions for mismatched or inconsistent fields — helping you resolve problems quickly and file a clean, rejection-free return every time.",
    },
    {
      question: "What does the Sales Summary show before submission?",
      answer:
        "The Sales Summary provides a consolidated view of all outward supplies with section-wise totals for tables like 4A, 4B, and 5A, along with a clear tax breakdown showing IGST, CGST, and SGST amounts separately. You can also download a structured summary report for audit or internal review — giving you full confidence in your data before you proceed with filing.",
    },
    {
      question: "Can I export my GSTR-1 data before filing it?",
      answer:
        "Yes. Export finalized return data as a GST-compliant JSON for direct portal upload, an Excel report for reconciliation and analysis, or a Summary PDF for management and audit use. Before filing, the Prepare Summary module performs a final error-free confirmation check and displays a Ready-to-File indicator — so you submit with complete confidence.",
    },
    {
      question: "Can WhiteBooks search invoices by GSTIN, date, or invoice number?",
      answer:
        "Yes. Advanced Search & Filtering supports GSTIN-based search to locate invoices by customer tax ID, a date range filter to narrow results to a specific period, and an invoice number lookup for instant retrieval of any specific record — no manual scanning through large datasets.",
    },
    {
      question: "What filing statuses does the Real-Time Status Indicator track?",
      answer:
        "The status indicator automatically updates return progress — covering draft, saved, validated, submitted, and filed stages — whenever invoices are added, edited, or deleted. It raises error alerts for incomplete sections before submission, and displays the ARN and filing confirmation details once the return is successfully filed.",
    },
    {
      question: "How can I keep track of invoice changes or amendments over time?",
      answer:
        "Pending & Amendment tracking shows a complete pending invoice list of all entries not yet validated or filed, maintains a full amendment history with a clear record of every change made, and tracks correction status to confirm all updates are accurately reflected before final submission.",
    },
    {
      question: "How does WhiteBooks help manage invoices efficiently?",
      answer:
        "The Invoice Management Dashboard automatically categorizes invoices by type — B2B, B2C, and Export — and lets you filter them by status such as draft, validated, or error. Quick-edit any invoice directly from the dashboard without navigating through multiple screens.",
    },
    {
      question: "Which file formats are supported for bulk invoice import?",
      answer:
        "Bulk Import supports both Excel uploads using a predefined template and direct JSON file imports for GST-compliant data from your accounting or ERP system. If any issues are found during upload, WhiteBooks generates a detailed bulk error report highlighting every problematic entry — correct and re-upload without data loss.",
    },
  ],
  closing: CLOSING_BLOCK,
};

/* ── Registry of hand-authored pages ──────────────────────────────────────── */

export const MORE_FEATURES_PAGES: Record<string, MoreFeaturesPageData> = {
  [PREPARE_GSTR1_PAGE.slug]: PREPARE_GSTR1_PAGE,
};

/* ── Fallback generator — derive a page from any showcase tab ─────────────── */

interface ShowcaseDataset {
  productLabel: string;
  productHref: string;
  categories: ShowcaseCategory[];
}

const SHOWCASE_DATASETS: ShowcaseDataset[] = [
  { productLabel: "GST Software", productHref: "/softwares/gst", categories: GST_SOFTWARE_SHOWCASE_CATEGORIES },
  { productLabel: "Accounting Software", productHref: "/softwares/accounting", categories: ACCOUNTING_SHOWCASE_CATEGORIES },
  { productLabel: "e-Invoicing Software", productHref: "/softwares/e-invoice", categories: E_INVOICING_SOFTWARE_SHOWCASE_CATEGORIES },
  { productLabel: "e-Way Bill Software", productHref: "/softwares/e-way-bill", categories: E_WAY_BILL_SOFTWARE_SHOWCASE_CATEGORIES },
];

/** Icon rotation for generated grid cards so the layout doesn't look stamped. */
const GENERATED_ICONS: ExploreIcon[] = [
  "zap", "layers", "clipboard-check", "search", "download", "gauge", "shield-check", "history",
];

const slugOf = (ctaHref: string) => ctaHref.replace(/^\/features\//, "").replace(/\/$/, "");

const featureFromTab = (tab: ShowcaseTab, index: number, spotlight: boolean): ExploreFeature => ({
  id: tab.id,
  icon: spotlight ? "sparkles" : GENERATED_ICONS[index % GENERATED_ICONS.length],
  title: tab.title,
  tagline: tab.subtitle,
  description: tab.description,
  capabilities: tab.bullets,
  spotlight,
  media: { label: tab.media.label, poster: tab.media.poster },
});

function buildPageFromTab(
  dataset: ShowcaseDataset,
  category: ShowcaseCategory,
  tab: ShowcaseTab,
  slug: string,
): MoreFeaturesPageData {
  // Clicked tab first (spotlighted), siblings follow as the capability grid.
  const ordered = [tab, ...category.tabs.filter((t) => t.id !== tab.id)];
  return {
    slug,
    productLabel: dataset.productLabel,
    productHref: dataset.productHref,
    badge: tab.badge,
    title: tab.title,
    subtitle: tab.description,
    heroPoster: tab.media.poster,
    heroStats: HERO_STATS,
    features: {
      heading: category.heading,
      subheading: `Everything inside ${category.label} — ${tab.subtitle.toLowerCase()}, and the workflows around it.`,
      items: ordered.map((t, i) => featureFromTab(t, i, t.id === tab.id)),
    },
    pricing: PRICING_BLOCK(dataset.productLabel),
    solution: SOLUTION_BLOCK(dataset.productLabel),
    partner: PARTNER_BLOCK,
    resources: RESOURCES_BLOCK(dataset.productHref),
    faqs: [
      {
        question: `What does ${tab.title} in WhiteBooks cover?`,
        answer: `${tab.description} Key capabilities include: ${tab.bullets.slice(0, 3).join("; ")}.`,
      },
      {
        question: "Can I try it before buying?",
        answer:
          "Yes — Start Free gives you the complete product on sandbox data with no credit card required. Move to a production plan only when you're ready to file live.",
      },
      {
        question: "Does WhiteBooks integrate with my existing tools?",
        answer:
          "WhiteBooks imports from Tally, SAP, and other ERPs via connectors, Excel templates, and REST APIs — plus an OpenAPI 3.1 spec for custom integrations.",
      },
      {
        question: "What support is included?",
        answer:
          "All plans include 24×7 Indian support. Growth and Enterprise plans add priority SLAs and a dedicated account manager, backed by a 99.99% uptime SLA on GSP-direct rails.",
      },
    ],
    closing: CLOSING_BLOCK,
  };
}

/**
 * Resolve a `/features/:slug` page — hand-authored first, then generated from
 * the matching showcase tab. Returns undefined for unknown slugs.
 */
export function getMoreFeaturesPage(slug: string): MoreFeaturesPageData | undefined {
  const authored = MORE_FEATURES_PAGES[slug];
  if (authored) return authored;

  for (const dataset of SHOWCASE_DATASETS) {
    for (const category of dataset.categories) {
      for (const tab of category.tabs) {
        if (slugOf(tab.cta.href) === slug) {
          return buildPageFromTab(dataset, category, tab, slug);
        }
      }
    }
  }
  return undefined;
}
