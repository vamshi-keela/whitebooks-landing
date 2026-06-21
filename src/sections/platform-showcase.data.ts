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
 * Cards marked `// VERIFY` use an inferred slug (legacy HTML was truncated).
 */

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
  metrics: ShowcaseMetric[];
  /** Sub-feature cards — only content + preview morph between these. */
  tabs: ShowcaseTab[];
}

export const SHOWCASE_HEADER = {
  eyebrow: "Platform capabilities",
  heading: "Everything your business needs in one place",
  subtitle:
    "From invoices and GST to purchases, banking and reports — WhiteBooks keeps every part of your books connected.",
};

/** Primary conversion CTA, shown alongside each card's "More features" link. */
export const SHOWCASE_PRIMARY_CTA: ShowcaseCta = {
  label: "Start free",
  href: "https://accounts.whitebooks.in/signup",
};

const more = (href: string): ShowcaseCta => ({ label: "More features", href });

export const SHOWCASE_CATEGORIES: ShowcaseCategory[] = [
  {
    id: "sales",
    label: "Sales",
    heading: "From estimates to recurring invoices",
    proof: [
      { value: "25,000+", label: "businesses" },
      { value: "500+", label: "CA firms" },
      { value: "99.95%", label: "uptime" },
    ],
    metrics: [
      { value: "₹42.8L", label: "Monthly sales", note: "↑ 18%", slot: "top-right" },
      { value: "GSTR-1 ready", label: "Auto synced", slot: "bottom-left" },
      { value: "185 invoices", label: "Today", slot: "bottom-right" },
    ],
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
        media: { label: "Estimates" },
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
        media: { label: "Proforma" },
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
        media: { label: "Sales invoices" },
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
        media: { label: "Delivery challans" },
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
        media: { label: "Recurring billing" },
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
    metrics: [
      { value: "₹28.4L", label: "Monthly purchases", note: "↑ 9%", slot: "top-right" },
      { value: "₹4.2L ITC", label: "Claimed", slot: "bottom-left" },
      { value: "GSTR-2B", label: "Reconciled", slot: "bottom-right" },
    ],
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
        media: { label: "Purchase invoices" },
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
        media: { label: "Purchase orders" },
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
    metrics: [
      { value: "₹6.9L", label: "Monthly expenses", note: "↓ 4%", slot: "top-right" },
      { value: "240 vouchers", label: "This month", slot: "bottom-left" },
      { value: "Books", label: "Audit ready", slot: "bottom-right" },
    ],
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
        media: { label: "Expenses" },
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
        media: { label: "Vouchers" },
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
        media: { label: "Contra" },
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
    metrics: [
      { value: "₹1.2Cr", label: "Cash position", note: "↑ 12%", slot: "top-right" },
      { value: "92% matched", label: "First pass", slot: "bottom-left" },
      { value: "4 accounts", label: "Connected", slot: "bottom-right" },
    ],
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
        media: { label: "Receipts" },
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
        media: { label: "Payments" },
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
        media: { label: "Bank statements" },
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
        media: { label: "Reconciliation" },
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
    metrics: [
      { value: "₹18.6L", label: "Receivables", note: "↑ 6%", slot: "top-right" },
      { value: "32 parties", label: "Overdue", slot: "bottom-left" },
      { value: "Aging", label: "Up to date", slot: "bottom-right" },
    ],
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
        ],
        cta: more("/features/parties-management-accounting-features"), // VERIFY: legacy HTML truncated
        media: { label: "Parties" },
      },
      {
        id: "balances",
        label: "Balances",
        badge: "Outstanding",
        title: "Outstanding balances",
        subtitle: "Live receivables & payables, party-wise",
        description:
          "See exactly who owes what in real time, with running balances and aging across every party.",
        bullets: [
          "Live receivable & payable balances",
          "Party-wise aging buckets",
          "Drill into open invoices per party",
          "Export statements in one click",
        ],
        cta: more("/features/balances-parties-accounting-features"), // VERIFY: inferred slug
        media: { label: "Balances" },
      },
      {
        id: "credit",
        label: "Credit",
        badge: "Credit limits",
        title: "Credit limits & terms",
        subtitle: "Stay ahead of overdue exposure",
        description:
          "Set credit limits and payment terms per party and get warned before you over-extend.",
        bullets: [
          "Set credit limit & period per party",
          "Warnings before limits are breached",
          "Track exposure across customers",
          "Share statement of accounts instantly",
        ],
        cta: more("/features/credit-parties-accounting-features"), // VERIFY: inferred slug
        media: { label: "Credit limits" },
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
    metrics: [
      { value: "1,840 SKUs", label: "In catalog", slot: "top-right" },
      { value: "12 low", label: "Reorder soon", note: "alert", slot: "bottom-left" },
      { value: "₹34.2L", label: "Stock value", slot: "bottom-right" },
    ],
    tabs: [
      {
        id: "catalog",
        label: "Catalog",
        badge: "Products",
        title: "Product & service catalog",
        subtitle: "GST-aware items with HSN / SAC",
        description:
          "Maintain goods and services with HSN/SAC codes and tax rates baked in for instant, compliant billing.",
        bullets: [
          "Add products & services with HSN / SAC",
          "Set tax rates & units per item",
          "Bulk import the full catalog",
          "Search & filter items instantly",
        ],
        cta: more("/features/products-inventory-accounting-features"), // VERIFY: inferred slug
        media: { label: "Catalog" },
      },
      {
        id: "stock",
        label: "Stock",
        badge: "Stock",
        title: "Stock tracking",
        subtitle: "Live movement linked to your books",
        description:
          "Track stock movement automatically as sales and purchases post, with low-stock alerts built in.",
        bullets: [
          "Live stock in / out per item",
          "Low-stock & reorder alerts",
          "Movement linked to invoices & bills",
          "Warehouse-wise visibility",
        ],
        cta: more("/features/stock-inventory-accounting-features"), // VERIFY: inferred slug
        media: { label: "Stock" },
      },
      {
        id: "batch",
        label: "Batch & serial",
        badge: "Batch & serial",
        title: "Batch & serial tracking",
        subtitle: "Trace lots across the lifecycle",
        description:
          "Track batches and serial numbers from purchase to sale for full traceability and expiry control.",
        bullets: [
          "Assign batch & serial numbers",
          "Track expiry & manufacturing dates",
          "Trace movement end to end",
          "Report on batch-wise stock",
        ],
        cta: more("/features/batch-inventory-accounting-features"), // VERIFY: inferred slug
        media: { label: "Batch & serial" },
      },
      {
        id: "valuation",
        label: "Valuation",
        badge: "Valuation",
        title: "Stock valuation",
        subtitle: "Value on hand for your balance sheet",
        description:
          "Always-current stock valuation that flows straight into your balance sheet and reports.",
        bullets: [
          "Real-time valuation on hand",
          "FIFO / weighted average methods",
          "Feeds the balance sheet automatically",
          "Export valuation reports",
        ],
        cta: more("/features/valuation-inventory-accounting-features"), // VERIFY: inferred slug
        media: { label: "Valuation" },
      },
    ],
  },
  {
    id: "access",
    label: "Access Control",
    heading: "Role-based access & audit trail",
    proof: [
      { value: "Granular", label: "roles" },
      { value: "Full", label: "audit trail" },
      { value: "Real-time", label: "sync" },
    ],
    metrics: [
      { value: "14 users", label: "Active", slot: "top-right" },
      { value: "6 roles", label: "Configured", slot: "bottom-left" },
      { value: "Audit log", label: "Live", slot: "bottom-right" },
    ],
    tabs: [
      {
        id: "roles",
        label: "Roles",
        badge: "Roles",
        title: "Role-based access",
        subtitle: "Map teammates to what they should see",
        description:
          "Assign roles so junior accountants enter, seniors review and auditors get read-only access.",
        bullets: [
          "Pre-built finance roles",
          "Assign roles per teammate",
          "Read-only auditor access",
          "Real-time across the team",
        ],
        cta: more("/features/roles-access-accounting-features"), // VERIFY: inferred slug
        media: { label: "Roles" },
      },
      {
        id: "permissions",
        label: "Permissions",
        badge: "Permissions",
        title: "Granular permissions",
        subtitle: "Per-module, not 'admin or not'",
        description:
          "Control access at the module level so each role sees exactly what it needs — nothing more.",
        bullets: [
          "Module-level permissions",
          "Restrict create / edit / delete",
          "Limit financial visibility",
          "Change permissions anytime",
        ],
        cta: more("/features/permissions-access-accounting-features"), // VERIFY: inferred slug
        media: { label: "Permissions" },
      },
      {
        id: "audit",
        label: "Audit trail",
        badge: "Audit trail",
        title: "Real-time audit trail",
        subtitle: "Every change, who and when",
        description:
          "A live audit log records every change with user and timestamp for complete accountability.",
        bullets: [
          "Log every create / edit / delete",
          "Capture user & timestamp",
          "Filter the trail by user or date",
          "Export for audits & compliance",
        ],
        cta: more("/features/audit-access-accounting-features"), // VERIFY: inferred slug
        media: { label: "Audit trail" },
      },
    ],
  },
  {
    id: "datahub",
    label: "DataHub",
    heading: "Move data in & out, cleanly",
    proof: [
      { value: "< 2 hrs", label: "migration" },
      { value: "Validated", label: "imports" },
      { value: "Templates", label: "managed" },
    ],
    metrics: [
      { value: "3 years", label: "Imported", note: "< 2 hrs", slot: "top-right" },
      { value: "0 errors", label: "On validation", slot: "bottom-left" },
      { value: "Tally", label: "Migrated", slot: "bottom-right" },
    ],
    tabs: [
      {
        id: "import",
        label: "Bulk import",
        badge: "Bulk import",
        title: "Bulk data import",
        subtitle: "Thousands of rows with live validation",
        description:
          "Upload large datasets with inline validation that catches errors before anything posts.",
        bullets: [
          "Import via Excel / CSV templates",
          "Live validation with row-level errors",
          "Preview before committing",
          "Re-run failed rows in one click",
        ],
        cta: more("/features/import-datahub-accounting-features"), // VERIFY: inferred slug
        media: { label: "Bulk import" },
      },
      {
        id: "migration",
        label: "Migration",
        badge: "Migration",
        title: "Tally & Zoho migration",
        subtitle: "Three years of books in under two hours",
        description:
          "Bring your full history across from Tally, Zoho and others with a guided migration flow.",
        bullets: [
          "Guided Tally / Zoho migration",
          "Map ledgers & masters automatically",
          "Validate before going live",
          "Keep historical balances intact",
        ],
        cta: more("/features/migration-datahub-accounting-features"), // VERIFY: inferred slug
        media: { label: "Migration" },
      },
      {
        id: "templates",
        label: "Templates",
        badge: "Templates",
        title: "Template management",
        subtitle: "Reusable mappings for every import",
        description:
          "Save column mappings as reusable templates so recurring imports take seconds.",
        bullets: [
          "Save reusable import templates",
          "Standardize column mappings",
          "Share templates across the team",
          "Version & update mappings",
        ],
        cta: more("/features/templates-datahub-accounting-features"), // VERIFY: inferred slug
        media: { label: "Templates" },
      },
    ],
  },
  {
    id: "reports",
    label: "Reports",
    heading: "Financial & inventory reporting",
    proof: [
      { value: "Daily", label: "P&L" },
      { value: "PDF / Excel", label: "export" },
      { value: "Audit", label: "ready" },
    ],
    metrics: [
      { value: "₹12.4L", label: "Net profit", note: "↑ 14%", slot: "top-right" },
      { value: "Trial balance", label: "Tallied", slot: "bottom-left" },
      { value: "30+ reports", label: "Ready", slot: "bottom-right" },
    ],
    tabs: [
      {
        id: "pnl",
        label: "P&L",
        badge: "Profit & loss",
        title: "Profit & loss",
        subtitle: "Live P&L, drillable to source",
        description:
          "An always-current profit and loss statement you can drill into down to the source transaction.",
        bullets: [
          "Live P&L across periods",
          "Drill down to source rows",
          "Compare period-over-period",
          "Export to PDF / Excel",
        ],
        cta: more("/features/pnl-reports-accounting-features"), // VERIFY: inferred slug
        media: { label: "Profit & loss" },
      },
      {
        id: "balance",
        label: "Balance sheet",
        badge: "Balance sheet",
        title: "Balance sheet",
        subtitle: "Always-current position, every entity",
        description:
          "A real-time balance sheet across every entity, ready for review and audit any day.",
        bullets: [
          "Real-time balance sheet",
          "Consolidate across entities",
          "Drill into any line item",
          "Export for auditors",
        ],
        cta: more("/features/balance-sheet-reports-accounting-features"), // VERIFY: inferred slug
        media: { label: "Balance sheet" },
      },
      {
        id: "gst",
        label: "GST reports",
        badge: "GST reports",
        title: "GST reports",
        subtitle: "GSTR-ready, reconciled to filings",
        description:
          "GSTR-ready summaries reconciled to your filings so returns are never a surprise.",
        bullets: [
          "GSTR-1, 3B & 2B summaries",
          "Reconciled to your filings",
          "Spot mismatches early",
          "Export for filing",
        ],
        cta: more("/features/gst-reports-accounting-features"), // VERIFY: inferred slug
        media: { label: "GST reports" },
      },
      {
        id: "inventory-reports",
        label: "Inventory",
        badge: "Inventory reports",
        title: "Inventory reports",
        subtitle: "Movement, valuation & aging",
        description:
          "Stock movement, valuation and aging in one view to keep working capital under control.",
        bullets: [
          "Stock movement & valuation",
          "Item-wise aging",
          "Low-stock & dead-stock views",
          "Export to PDF / Excel",
        ],
        cta: more("/features/inventory-reports-accounting-features"), // VERIFY: inferred slug
        media: { label: "Inventory reports" },
      },
    ],
  },
  {
    id: "accounting",
    label: "Accounting",
    heading: "Core accounting & ledgers",
    proof: [
      { value: "Auto", label: "journals" },
      { value: "Multi-entity", label: "rollup" },
      { value: "Continuous", label: "close" },
    ],
    metrics: [
      { value: "247 posted", label: "Auto today", slot: "top-right" },
      { value: "3 entities", label: "Consolidated", slot: "bottom-left" },
      { value: "Close", label: "30-min review", slot: "bottom-right" },
    ],
    tabs: [
      {
        id: "journals",
        label: "Journals",
        badge: "Journals",
        title: "Automated journal posting",
        subtitle: "Sales, purchase & bank data post themselves",
        description:
          "Transactions auto-post to the correct ledgers with the right GST classification — you review exceptions.",
        bullets: [
          "Auto-post from sales, purchase & bank",
          "Correct GST classification per entry",
          "Review exceptions, not norms",
          "Full drill-down to source",
        ],
        cta: more("/features/journals-accounting-features"), // VERIFY: inferred slug
        media: { label: "Journals" },
      },
      {
        id: "ledgers",
        label: "Ledgers",
        badge: "Ledgers",
        title: "Ledger management",
        subtitle: "A GST-aware chart of accounts",
        description:
          "A chart of accounts that understands GST and classifies output, input, RCM and ISD automatically.",
        bullets: [
          "GST-aware chart of accounts",
          "Auto-classify output / input / RCM",
          "Ledger-wise summaries",
          "Customizable account heads",
        ],
        cta: more("/features/ledgers-accounting-features"), // VERIFY: inferred slug
        media: { label: "Ledgers" },
      },
      {
        id: "consolidation",
        label: "Consolidation",
        badge: "Multi-entity",
        title: "Multi-entity rollup",
        subtitle: "Consolidated P&L & balance sheet, one click",
        description:
          "Consolidate every operating company with automatic inter-company eliminations and ISD distribution.",
        bullets: [
          "One workspace, every entity",
          "Consolidated P&L & balance sheet",
          "Automatic inter-company elimination",
          "Inter-GSTIN ISD distribution",
        ],
        cta: more("/features/consolidation-accounting-features"), // VERIFY: inferred slug
        media: { label: "Consolidation" },
      },
      {
        id: "close",
        label: "Close",
        badge: "Continuous close",
        title: "Continuous close",
        subtitle: "Audit-ready every day",
        description:
          "Daily reconciliation and P&L turn month-end into a 30-minute review and year-end into a 2-day certification.",
        bullets: [
          "Daily reconciliation & P&L",
          "Month-end in 30 minutes",
          "Year-end in two days",
          "Audit-ready books every day",
        ],
        cta: more("/features/close-accounting-features"), // VERIFY: inferred slug
        media: { label: "Close" },
      },
    ],
  },
];
