/**
 * Platform Showcase — typed content for the category-driven capabilities section.
 *
 * Layout: left category rail (scroll-driven, FeatureGuide mechanic) · middle card
 * content · right 3:4 media placeholder. One category at a time; the sub-feature
 * pills inside a category swap the card content + preview without changing scroll.
 *
 * Media is intentionally absent — every card renders an <AnimatedPreviewPlaceholder>.
 * To go live, drop an mp4/poster path into `media.src` / `media.poster`.
 *
 * CTAs: hrefs come from the legacy whitebooks.in feature pages. This SPA has no
 * /features/* routes, so they resolve relative to FEATURE_BASE — set it to
 * "https://whitebooks.in" (or add real routes) when wiring real destinations.
 */

import { ReactNode } from "react";

/** Prefix for legacy "More features" links. "" keeps the relative paths as-is. */
export const FEATURE_BASE = "";

export interface ShowcaseProof {
  value: string;
  label: string;
}

export type MetricSlot = "top-right" | "bottom-left" | "bottom-right";

export interface ShowcaseMetric {
  value: string;
  label: string;
  note?: string;
  slot: MetricSlot;
}

export interface ShowcaseCta {
  label: string;
  /** Path relative to FEATURE_BASE. */
  href: string;
}

export interface ShowcaseTab {
  id: string;
  /** Pill label inside the category. */
  label: string;
  /** Small chip above the card title. */
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  cta: ShowcaseCta;
  media: {
    /** Label rendered on the placeholder while no video exists. */
    label: string;
    // TODO: Replace with actual video — e.g. src: "/videos/sales-estimates.mp4"
    src?: string;
    // TODO: Replace with actual image poster — e.g. poster: "/images/sales-estimates.png"
    poster?: string;
  };
}

export interface ShowcaseCategory {
  id: string;
  /** Rail label. */
  label: string;
  /** Context line above the card. */
  heading: string;
  /** Social-proof badges shown under the rail. */
  proof: ShowcaseProof[];
  /** Floating glass metric cards over the preview. */
  // metrics: ShowcaseMetric[];
  /** Sub-feature cards — only content + preview morph between these. */
  tabs: ShowcaseTab[];
}

export const SHOWCASE_HEADER: { eyebrow: string; heading: ReactNode; subtitle: string } = {
  eyebrow: "Platform capabilities",
  heading: (
    <>
      <span className="text-[var(--brand)]">Everything your business needs</span> in one place
    </>
  ),
  subtitle:
    "From invoices and GST to purchases, banking and reports — WhiteBooks keeps every part of your books connected.",
};

/** Primary conversion CTA, shown alongside each card's "More features" link. */
export const SHOWCASE_PRIMARY_CTA: ShowcaseCta = {
  label: "Start free",
  href: "https://accounts.whitebooks.in/signup",
};

const more = (href: string): ShowcaseCta => ({ label: "More features", href });

export const ACCOUNTING_SHOWCASE_CATEGORIES: ShowcaseCategory[] = [
  {
    id: "sales",
    label: "Sales",
    heading: "From estimates to recurring invoices",
    proof: [
      { value: "25,000+", label: "businesses" },
      { value: "500+", label: "CA firms" },
      { value: "99.95%", label: "uptime" },
    ],
    // metrics: [
    //   { value: "₹42.8L", label: "Monthly sales", note: "↑ 18%", slot: "top-right" },
    //   { value: "GSTR-1 ready", label: "Auto synced", slot: "bottom-left" },
    //   { value: "185 invoices", label: "Today", slot: "bottom-right" },
    // ],
    tabs: [
      {
        id: "estimates",
        label: "Estimates",
        badge: "Estimates",
        title: "Create & send estimates",
        subtitle: "Convert estimates to invoice or proforma",
        description:
          "Manage quotations and convert them into sales or proforma invoices the moment they're approved.",
        bullets: [
          "Add estimates with type & party details",
          "Track estimate & invoice numbers",
          "Convert to invoice in one click",
          "Convert to proforma directly",
        ],
        cta: more("/features/estimates-sales-accounting-features"),
        media: {
          label: "Estimates",
          poster: "@assets/product-images/softwares/mini-image-sales-extimate-books.png",
        },
      },
      {
        id: "proforma",
        label: "Proforma",
        badge: "Proforma invoices",
        title: "Create proforma invoices",
        subtitle: "Convert proforma to final invoice instantly",
        description:
          "Raise proforma invoices for advance billing and convert them into final sales invoices on order confirmation.",
        bullets: [
          "Add proforma with type & party details",
          "Track proforma & associated invoice numbers",
          "Convert proforma to invoice in one click",
          "Filter & manage month-wise proformas",
        ],
        cta: more("/features/proformaInvoices-sales-accounting-features"),
        media: {
          label: "Proforma",
          poster: "@assets/product-images/softwares/mini-image-sales-performa-books.png",
        },
      },
      {
        id: "invoices",
        label: "Invoices",
        badge: "Sales invoices",
        title: "GST-compliant sales invoices",
        subtitle: "E-invoice & IRN, payment status in one place",
        description:
          "Create and manage sales invoices with e-invoice generation, IRN tracking and live payment status.",
        bullets: [
          "Generate IRN for e-invoice compliance",
          "Track number, date, amount & payment status",
          "Record receipts directly against invoices",
          "Filter month-wise & download in bulk",
        ],
        cta: more("/features/salesInvoices-sales-accounting-features"),
        media: {
          label: "Sales invoices",
          poster: "@assets/product-images/softwares/mini-image-sales-invoice-books.png",
        },
      },
      {
        id: "other-income",
        label: "Other income",
        badge: "Other incomes",
        title: "Record other income",
        subtitle: "Track non-invoice business income",
        description:
          "Record and manage all income beyond sales invoices, categorized by type with payment status tracking.",
        bullets: [
          "Add other income entries with category",
          "Track income number, date & total value",
          "Record receipts against income entries",
          "Filter & download month-wise income data",
        ],
        cta: more("/features/otherIncomes-sales-accounting-features"),
        media: {
          label: "Other income",
          poster: "@assets/product-images/softwares/mini-image-sales-otherincome-books.png",
        },
      },
      {
        id: "challans",
        label: "Delivery challans",
        badge: "Delivery challans",
        title: "Manage delivery challans",
        subtitle: "Track goods dispatched before invoicing",
        description:
          "Generate and track delivery challans for goods dispatched prior to invoicing, party-wise.",
        bullets: [
          "Add challans with party details",
          "Track challan number, date & amount",
          "Filter by month or period",
          "Download challans in bulk",
        ],
        cta: more("/features/deliveryChallans-sales-accounting-features"),
        media: {
          label: "Delivery challans",
          poster: "@assets/product-images/softwares/mini-image-sales-deliverychellan-books.png",
        },
      },
      {
        id: "recurring",
        label: "Recurring billing",
        badge: "Recurring invoices",
        title: "Automate recurring invoices",
        subtitle: "Set start & end dates for auto-billing",
        description:
          "Automate invoices for repeat customers with smart date and amount tracking.",
        bullets: [
          "Add recurring invoices with party details",
          "Set billing start & end dates",
          "Track recurring invoice amounts",
          "Auto-generate invoices on schedule",
        ],
        cta: more("/features/recurringInvoices-sales-accounting-features"),
        media: {
          label: "Recurring billing",
          poster: "@assets/product-images/softwares/mini-image-sales-recurring-books.png",
        },
      },
    ],
  },
  {
    id: "purchases",
    label: "Purchases",
    heading: "Purchase orders to ITC, reconciled",
    proof: [
      { value: "₹4.2L", label: "ITC tracked" },
      { value: "1-click", label: "PO to invoice" },
      { value: "GSTR-2B", label: "auto match" },
    ],
    // metrics: [
    //   { value: "₹28.4L", label: "Monthly purchases", note: "↑ 9%", slot: "top-right" },
    //   { value: "₹4.2L ITC", label: "Claimed", slot: "bottom-left" },
    //   { value: "GSTR-2B", label: "Reconciled", slot: "bottom-right" },
    // ],
    tabs: [
      {
        id: "purchase-invoices",
        label: "Purchase invoices",
        badge: "Purchase invoices",
        title: "Manage purchase invoices",
        subtitle: "Track inward supply bills & ITC claims",
        description:
          "Add and manage purchase invoices with ITC tracking, payment status and GSTR-2B reconciliation in one place.",
        bullets: [
          "Add purchases with type & party details",
          "Monitor ITC claimed, invoice & payment status",
          "Record payments directly against invoices",
          "Reconcile with GSTR-2B instantly",
        ],
        cta: more("/features/purchases-invoices-accounting-features"),
        media: {
          label: "Purchase invoices",
          poster: "@assets/product-images/softwares/mini-image-purchase-invoice-books.png",
        },
      },
      {
        id: "purchase-orders",
        label: "Purchase orders",
        badge: "Purchase order",
        title: "Manage purchase orders",
        subtitle: "Convert purchase orders to invoices instantly",
        description:
          "Create purchase orders for vendors and convert them directly into purchase invoices once goods are received.",
        bullets: [
          "Add purchase orders with type & party details",
          "Track order & associated invoice numbers",
          "Convert orders to invoices in one click",
          "Filter, manage & download month-wise orders",
        ],
        cta: more("/features/purchases-orders-accounting-features"),
        media: {
          label: "Purchase orders",
          poster: "@assets/product-images/softwares/mini-image-purchare-order-books.png",
        },
      },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    heading: "Expenses, vouchers and contra",
    proof: [
      { value: "Audit", label: "ready books" },
      { value: "Category", label: "wise spend" },
      { value: "1-click", label: "exports" },
    ],
    // metrics: [
    //   { value: "₹6.9L", label: "Monthly expenses", note: "↓ 4%", slot: "top-right" },
    //   { value: "240 vouchers", label: "This month", slot: "bottom-left" },
    //   { value: "Books", label: "Audit ready", slot: "bottom-right" },
    // ],
    tabs: [
      {
        id: "expenses",
        label: "Expenses",
        badge: "Expenses",
        title: "Manage business expenses",
        subtitle: "Category-wise recording & payment tracking",
        description:
          "Record and track expenses by category with payment status and bulk export for audit-ready accounting.",
        bullets: [
          "Add expenses with category & date",
          "Track number, category & total value",
          "Record payments directly against expenses",
          "Filter month-wise and export in bulk",
        ],
        cta: more("/features/expenses-management-accounting-features"),
        media: {
          label: "Expenses",
          poster: "@assets/product-images/softwares/mini-image-expences-books.png",
        },
      },
      {
        id: "vouchers",
        label: "Vouchers",
        badge: "Vouchers",
        title: "Manage accounting vouchers",
        subtitle: "Type-based entries with amount tracking",
        description:
          "Keep a complete voucher record with type, description and date-wise tracking for accurate documentation.",
        bullets: [
          "Add vouchers with type & description",
          "Track voucher number, type & amount",
          "Search by number or description",
          "Download all vouchers in bulk",
        ],
        cta: more("/features/vouchers-management-accounting-features"),
        media: {
          label: "Vouchers",
          poster: "@assets/product-images/softwares/mini-image-vochers-books.png",
        },
      },
      {
        id: "contra",
        label: "Contra",
        badge: "Contra",
        title: "Manage contra entries",
        subtitle: "Track cash & bank transfers",
        description:
          "Record contra transactions between cash and bank accounts for clear internal fund management.",
        bullets: [
          "Add contra entries with date & amount",
          "Track contra number with date sorting",
          "Search & filter contra records instantly",
          "Bulk download entries for reporting",
        ],
        cta: more("/features/contra-management-accounting-features"),
        media: {
          label: "Contra",
          poster: "@assets/product-images/softwares/mini-image-contra-books.png",
        },
      },
    ],
  },
  {
    id: "banking",
    label: "Banking",
    heading: "Receipts, payments & reconciliation",
    proof: [
      { value: "100+", label: "banks" },
      { value: "90%+", label: "auto match" },
      { value: "Real-time", label: "balances" },
    ],
    // metrics: [
    //   { value: "₹1.2Cr", label: "Cash position", note: "↑ 12%", slot: "top-right" },
    //   { value: "92% matched", label: "First pass", slot: "bottom-left" },
    //   { value: "4 accounts", label: "Connected", slot: "bottom-right" },
    // ],
    tabs: [
      {
        id: "receipts",
        label: "Receipts",
        badge: "Receipts",
        title: "Track incoming payments",
        subtitle: "Party-wise receipts linked to invoices",
        description:
          "Capture invoice payments with party details and references for an accurate, always-updated register.",
        bullets: [
          "Add receipts with party & invoice linkage",
          "Map receipts to specific invoices",
          "Filter by month & financial year",
          "Bulk delete or export receipt records",
        ],
        cta: more("/features/receipts-banking-accounting-features"),
        media: {
          label: "Receipts",
          poster: "@assets/product-images/softwares/mini-image-banking-receipts-books.png",
        },
      },
      {
        id: "payments",
        label: "Payments",
        badge: "Payments",
        title: "Track outgoing payments",
        subtitle: "Invoice-linked payments with references",
        description:
          "Track vendor and party payments against invoices with complete references for a clean payables register.",
        bullets: [
          "Add payments with party & invoice linkage",
          "Store transaction reference numbers",
          "Filter by month & financial year",
          "Bulk delete or export payment records",
        ],
        cta: more("/features/payments-banking-accounting-features"),
        media: {
          label: "Payments",
          poster: "@assets/product-images/softwares/mini-image-bsnking-payments-books.png",
        },
      },
      {
        id: "statements",
        label: "Bank statements",
        badge: "Bank statements",
        title: "Manage bank transactions",
        subtitle: "Narration-wise tracking, reconcile-ready",
        description:
          "Upload bank statements and track narration, references and dates for fast, accurate reconciliation.",
        bullets: [
          "Track bank name, narration & transaction date",
          "View cheque / reference no. & value date",
          "Monitor matched vs unmatched amounts",
          "One-click reconcile with bulk export",
        ],
        cta: more("/features/bankStatements-banking-accounting-features"),
        media: {
          label: "Bank statements",
          poster: "@assets/product-images/softwares/mini-image-banking-bankstatement-books.png",
        },
      },
      {
        id: "reconcile",
        label: "Reconciliation",
        badge: "Bank reconcile",
        title: "Bank reconciliation",
        subtitle: "Auto-match credits, debits & status",
        description:
          "Instantly reconcile statements with your records, track matched and unmatched amounts and close books accurately.",
        bullets: [
          "Auto-match transactions with Reconcile Now",
          "Track type, reference no., credit & debit",
          "Accept matches or clear mismatches instantly",
          "Filter period-wise via reconcile summary",
        ],
        cta: more("/features/bankReconcile-banking-accounting-features"),
        media: {
          label: "Reconciliation",
          poster: "@assets/product-images/softwares/mini-image-banking-recouncile-books.png",
        },
      },
    ],
  },
  {
    id: "parties",
    label: "Parties",
    heading: "Track parties, balances & credit",
    proof: [
      { value: "Live", label: "balances" },
      { value: "Party-wise", label: "aging" },
      { value: "Credit", label: "controls" },
    ],
    // metrics: [
    //   { value: "₹18.6L", label: "Receivables", note: "↑ 6%", slot: "top-right" },
    //   { value: "32 parties", label: "Overdue", slot: "bottom-left" },
    //   { value: "Aging", label: "Up to date", slot: "bottom-right" },
    // ],
    tabs: [
      {
        id: "parties",
        label: "Parties",
        badge: "Parties",
        title: "Manage business parties",
        subtitle: "Centralized contacts with credit & balance tracking",
        description:
          "Add and manage customers and vendors with categorization, credit period setup and real-time receivables and payables.",
        bullets: [
          "Add parties with name, state & category",
          "Track credit period & amount per party",
          "Monitor receivables, payables & balance",
          "Import parties in bulk via template",
          "Edit details or view ledger instantly",
        ],
        cta: more("/features/track-parties-accounting-features"),
        media: {
          label: "Parties",
          poster: "@assets/product-images/softwares/mini-image-parties-books.png",
        },
      },
    ],
  },
  {
    id: "inventory",
    label: "Inventory",
    heading: "Products & stock, always in sync",
    proof: [
      { value: "Real-time", label: "stock" },
      { value: "HSN-ready", label: "catalog" },
      { value: "Batch", label: "tracking" },
    ],
    // metrics: [
    //   { value: "1,840 SKUs", label: "In catalog", slot: "top-right" },
    //   { value: "12 low", label: "Reorder soon", note: "alert", slot: "bottom-left" },
    //   { value: "₹34.2L", label: "Stock value", slot: "bottom-right" },
    // ],
    tabs: [
      {
        id: "items",
        label: "Items",
        badge: "Items",
        title: "Manage products & services",
        subtitle: "HSN / SAC mapping with live stock & pricing",
        description:
          "Add and manage products and services with GST-ready HSN/SAC codes, real-time stock tracking, stock value and dual pricing for fast, accurate invoicing.",
        bullets: [
          "Add items with code, name & HSN / SAC",
          "Track stock quantity & total value",
          "Manage selling & purchase price per item",
          "Adjust stock using Stock Adjust option",
          "Import items in bulk via template",
        ],
        cta: more("/features/inventory-management-accounting-features"),
        media: {
          label: "Items",
          poster: "@assets/product-images/softwares/mini-image-items-books.png",
        },
      },
    ],
  },
  {
    id: "access",
    label: "Access",
    heading: "Role-based & real-time data access",
    proof: [
      { value: "Granular", label: "roles" },
      { value: "Controlled", label: "auditor access" },
      { value: "Real-time", label: "sync" },
    ],
    // metrics: [
    //   { value: "14 users", label: "Active", slot: "top-right" },
    //   { value: "6 roles", label: "Configured", slot: "bottom-left" },
    //   { value: "2 auditors", label: "Linked", slot: "bottom-right" },
    // ],
    tabs: [
      {
        id: "employees",
        label: "Employees",
        badge: "Employees",
        title: "Manage employees",
        subtitle: "Maintain your staff records",
        description:
          "Manage employees with ID, contact details, joining date and active or inactive status monitoring.",
        bullets: [
          "Add employees with unique ID",
          "Store name, email & mobile details",
          "Track employee joining date",
          "Switch between active & inactive status",
          "Export employee data via template or Excel",
        ],
        cta: more("/features/employees-people-accounting-features"),
        media: {
          label: "Employees",
          poster: "@assets/product-images/softwares/mini-image-pepole-emplyee-books.png",
        },
      },
      {
        id: "users",
        label: "Users",
        badge: "Users",
        title: "Manage system users",
        subtitle: "Add users who access this system",
        description:
          "Control user access through roles and track login activity for all system users.",
        bullets: [
          "Add users with username, email & mobile",
          "Assign roles to each user",
          "Manage user status (active / inactive)",
          "Track last login time",
          "Delink users & export list via template",
        ],
        cta: more("/features/users-people-accounting-features"),
        media: {
          label: "Users",
          poster: "@assets/product-images/softwares/mini-image-pepole-users-books.png",
        },
      },
      {
        id: "auditors",
        label: "Auditors",
        badge: "Auditors",
        title: "Add & manage auditors",
        subtitle: "Give controlled access to your CA / auditor",
        description:
          "Link your auditor or CA and grant controlled access to review books with role-based permissions and status tracking.",
        bullets: [
          "Add auditor with username, email & mobile",
          "Assign role & manage status",
          "Track last login activity",
          "Delink auditor in one click",
          "Export auditor records in Excel",
        ],
        cta: more("/features/auditors-people-accounting-features"),
        media: {
          label: "Auditors",
          poster: "@assets/product-images/softwares/mini-image-pepole-auditors-books.png",
        },
      },
      {
        id: "roles",
        label: "Roles",
        badge: "Roles",
        title: "Create & manage roles",
        subtitle: "Define what each user can access",
        description:
          "Create custom roles with a name and description to control and restrict user, employee or auditor access.",
        bullets: [
          "Create roles with name & description",
          "Assign roles to users & auditors",
          "Edit or update role details anytime",
          "Delete unused roles",
          "Search & manage all roles centrally",
        ],
        cta: more("/features/roles-people-accounting-features"),
        media: {
          label: "Roles",
          poster: "@assets/product-images/softwares/mini-image-pepole-roles-books.png",
        },
      },
    ],
  },
  {
    id: "datahub",
    label: "DataHub",
    heading: "Bulk import, migration tools & template management",
    proof: [
      { value: "1000+", label: "per import" },
      { value: "Tally", label: "migration" },
      { value: "Excel", label: "templates" },
    ],
    // metrics: [
    //   { value: "1000+", label: "Per import", slot: "top-right" },
    //   { value: "0 errors", label: "On validation", slot: "bottom-left" },
    //   { value: "Tally", label: "Migrated", slot: "bottom-right" },
    // ],
    tabs: [
      {
        id: "import",
        label: "Bulk import",
        badge: "Bulk import",
        title: "Bulk import invoices",
        subtitle: "Import 1000+ invoices at once",
        description:
          "Upload bulk invoices and get notified on completion, with error files available for 24 hours.",
        bullets: [
          "Import more than 1000 invoices at a time",
          "Supports Browser & Standard import methods",
          "Track bulk import history (file name, size, date)",
          "View total, successful & failed invoice counts",
          "Monitor import time & completion status",
        ],
        cta: more("/features/imports-datahub-accounting-features"),
        media: {
          label: "Bulk import",
          poster: "@assets/product-images/softwares/mini-image-datahub-import-books.png",
        },
      },
      {
        id: "mapping",
        label: "Import mapping",
        badge: "Import mapping",
        title: "Custom import mapping",
        subtitle: "Build your own import templates",
        description:
          "Create custom import templates for sales and purchase invoices using the mapping tool to match your data format.",
        bullets: [
          "Create custom import mapping templates",
          "Map sales & purchase invoice fields as needed",
          "Access built-in tutorial videos",
          'View "How to Import Data Mapping" guide',
          'Watch step-by-step "How to Bulk Import" guide',
        ],
        cta: more("/features/mapping-datahub-accounting-features"),
        media: {
          label: "Import mapping",
          poster: "@assets/product-images/softwares/mini-image-datahub-mapping-books.png",
        },
      },
      {
        id: "migration",
        label: "Migration",
        badge: "Migration",
        title: "Migrate data from Tally",
        subtitle: "Seamlessly switch from Tally to WhiteBooks",
        description:
          "Migrate your existing Tally data step by step using the Tally Connector and JSON file upload process.",
        bullets: [
          "Download Tally Connector TCP to begin setup",
          "Follow the Tally migration steps guide",
          "Upload Ledger, Items & Vouchers JSON files",
          "Migrate data in proper sequence",
          "Track migration history (date, type & status)",
        ],
        cta: more("/features/migration-datahub-accounting-features"),
        media: {
          label: "Migration",
          poster: "@assets/product-images/softwares/mini-image-datahub-migration-books.png",
        },
      },
      {
        id: "downloads",
        label: "Downloads",
        badge: "Downloads",
        title: "Download reconciliation reports",
        subtitle: "Access & re-download exported files anytime",
        description:
          "Access past reconciliation and invoice reports from one place with user-wise download tracking.",
        bullets: [
          "View all downloaded files with type & name",
          "Track download activity (user & time)",
          "Re-download Reconcile2B Excel exports anytime",
          "Filter & paginate download history",
          "Access date-wise exports with direct links",
        ],
        cta: more("/features/downloads-datahub-accounting-features"),
        media: {
          label: "Downloads",
          poster: "@assets/product-images/softwares/mini-image-datahub-downloads-books.png",
        },
      },
      {
        id: "templates",
        label: "Templates",
        badge: "Templates",
        title: "Instant import templates",
        subtitle: "WhiteBooks, Tally & Sage templates available",
        description:
          "Download ready-to-use Excel import templates for sales, purchase and e-invoice data compatible with WhiteBooks, Tally and Sage formats.",
        bullets: [
          "WhiteBooks Sales & Purchase templates available",
          "Supports Tally Sales, Purchase & Prime templates",
          "Includes Sage Sales, Purchase & e-Invoice templates",
          "Single Sheet, Global & Additional Fields variants",
          "Entertainment & e-Invoice specific templates supported",
        ],
        cta: more("/features/templates-datahub-accounting-features"),
        media: {
          label: "Templates",
          poster: "@assets/product-images/softwares/mini-image-datahub-templates-books.png",
        },
      },
    ],
  },
  {
    id: "reports",
    label: "Reports",
    heading: "Financial & inventory reporting",
    proof: [
      { value: "Schedule III", label: "ready" },
      { value: "TDS / TCS", label: "tracked" },
      { value: "PDF / Excel", label: "export" },
    ],
    // metrics: [
    //   { value: "Trial balance", label: "Tallied", slot: "top-right" },
    //   { value: "Aging", label: "Up to date", slot: "bottom-left" },
    //   { value: "30+ reports", label: "Ready", slot: "bottom-right" },
    // ],
    tabs: [
      {
        id: "accounting-reports",
        label: "Accounting",
        badge: "Accounting reports",
        title: "Financial reports",
        subtitle: "P&L, balance sheet, ledger, TDS/TCS & aging — all in one",
        description:
          "Instant access to accounting reports including trial balance, cash flow, party ledgers, TDS and TCS, and aging analysis for informed decisions.",
        bullets: [
          "View Trial Balance, P&L & Balance Sheet",
          "Access Schedule III & columnar formats",
          "Generate party ledger reports (simple & detailed)",
          "Track TDS, TCS & Day Book instantly",
          "Monitor aging & yearly bank reconciliation",
        ],
        cta: more("/features/accounting-reports-accounting-features"),
        media: {
          label: "Accounting reports",
          poster: "@assets/product-images/softwares/mini-image-reports-accounting-books.png",
        },
      },
      {
        id: "inventory-reports",
        label: "Inventory",
        badge: "Inventory reports",
        title: "Complete inventory visibility",
        subtitle: "Stock summary, aging, ledger & alerts",
        description:
          "Track item-wise stock along with ledger movements, rate lists, sales analysis and aging reports for complete inventory control.",
        bullets: [
          "Item-wise stock summary & details",
          "Stock ledger for movement tracking",
          "Rate list & sales summary reports",
          "Stock aging for slow-moving items",
          "Low stock level alerts",
        ],
        cta: more("/features/inventory-reports-accounting-features"),
        media: {
          label: "Inventory reports",
          poster: "@assets/product-images/softwares/mini-image-reports-inventory-books.png",
        },
      },
    ],
  },
  {
    id: "accounting",
    label: "Accounting",
    heading: "Core accounting & ledger management",
    proof: [
      { value: "GST-aware", label: "ledgers" },
      { value: "Bulk", label: "import" },
      { value: "Auto", label: "validation" },
    ],
    // metrics: [
    //   { value: "Chart of a/cs", label: "Mapped", slot: "top-right" },
    //   { value: "Bulk import", label: "Templates", slot: "bottom-left" },
    //   { value: "Journals", label: "Balanced", slot: "bottom-right" },
    // ],
    tabs: [
      {
        id: "ledger",
        label: "Ledger",
        badge: "Ledger",
        title: "Manage chart of accounts",
        subtitle: "Path-mapped ledgers with GST & journal tracking",
        description:
          "Create and manage ledger accounts including GST heads and creditors with mapped accounting paths and journal counts for audit visibility.",
        bullets: [
          "Add ledgers with name & hierarchy mapping",
          "Track SGST, CGST, IGST, CESS & RCM heads",
          "View journal count per ledger",
          "Import ledgers in bulk via template",
          "Search, edit & manage accounts centrally",
        ],
        cta: more("/features/ledger-management-accounting-features"),
        media: {
          label: "Ledger",
          poster: "@assets/product-images/softwares/mini-image-accounts-ledger-books.png",
        },
      },
      {
        id: "groups",
        label: "Groups",
        badge: "Groups",
        title: "Structured account groups",
        subtitle: "Capital, liability & asset classification",
        description:
          "Define and manage account groups across capital, liabilities and assets for structured and reliable financial reporting.",
        bullets: [
          "Add groups with name & full accounting path",
          "Classify capital, loan, creditor & tax groups",
          "Support long / short-term & current liability heads",
          "Import groups in bulk via template",
          "Search & manage account groups instantly",
        ],
        cta: more("/features/groups-management-accounting-features"),
        media: {
          label: "Groups",
          poster: "@assets/product-images/softwares/mini-image-accounts-groups-books.png",
        },
      },
      {
        id: "subgroups",
        label: "Sub groups",
        badge: "Sub groups",
        title: "Granular account sub-groups",
        subtitle: "Inventory, sales, purchase & loan path mapping",
        description:
          "Manage sub-groups under main accounts for structured classification — from raw materials and finished goods to secured loans and OD accounts.",
        bullets: [
          "Add sub-groups mapped to parent paths",
          "Classify raw materials, WIP & finished goods",
          "Define sales, purchase & bank OD sub-accounts",
          "Support secured & unsecured loan types",
          "Import sub-groups in bulk via template",
        ],
        cta: more("/features/subgroups-management-accounting-features"),
        media: {
          label: "Sub groups",
          poster: "@assets/product-images/softwares/mini-image-accounts-subgroup-books.png",
        },
      },
      {
        id: "journals",
        label: "Journals",
        badge: "Journals",
        title: "Manage journal entries",
        subtitle: "Month-wise posting with auto debit-credit validation",
        description:
          "Record journal entries with particulars, debit and credit amounts and invoice links while ensuring automatic balance checks.",
        bullets: [
          "Add journals with particulars & invoice link",
          "Live debit–credit balance check",
          "Auto-validate entry accuracy",
          "Filter month-wise entries",
          "Manage all journals in one view",
        ],
        cta: more("/features/journals-management-accounting-features"),
        media: {
          label: "Journals",
          poster: "@assets/product-images/softwares/mini-image-accounts-journals-books.png",
        },
      },
    ],
  },
];
