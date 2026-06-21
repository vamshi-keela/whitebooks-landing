/**
 * Connector landing pages — typed content for the 5 internal connector routes.
 *
 * Two structural families share two templates:
 *   • SAP   (sap-e-invoicing, sap-e-way-bill, sap-gst)   → SapConnectorPage
 *   • Tally (tally-e-invoice, tally-e-way-bill)          → TallyConnectorPage
 *
 * Content is a faithful conversion of the legacy whitebooks.in/connectors/* pages.
 * All CTAs are external links to accounts.whitebooks.in, exactly as the source.
 */

import sapLogo from "@/assets/logos/sap.svg";
import tallyLogo from "@/assets/logos/tally.svg";
import type { SeoMeta } from "@/seo/types";

/* ── Shared CTA destinations (verbatim from the source pages) ─────────────── */
export const SIGNUP_DEV = "https://accounts.whitebooks.in/signup?type=Developer&subscrid=&inviteId";
export const SIGNUP_ALL = "https://accounts.whitebooks.in/signupall";

export interface Cta {
  label: string;
  href: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Breadcrumb {
  label: string;
  href?: string;
}

/* ── SAP family ───────────────────────────────────────────────────────────── */

export interface PainCard {
  stat: string;
  title: string;
  body: string;
}
export interface LabelledStat {
  value: string;
  label: string;
}
export interface SolutionStep {
  title: string;
  line: string;
  metricValue: string;
  metricLabel: string;
}
export interface PlatformCard {
  name: string;
  tag: string;
  points: string[];
}
export interface HowLayer {
  label: string;
  title: string;
  points: string[];
}
export interface EnterpriseFeature {
  title: string;
  note: string;
}
export interface BeforeAfterRow {
  metric: string;
  before: string;
  after: string;
}
export interface DevFeature {
  title: string;
  body: string;
}
export interface CaseStudy {
  sector: string;
  title: string;
  headline: string;
  stats: LabelledStat[];
  quote: string;
}

export interface SapConnector {
  platform: "sap";
  slug: string;
  logo: string;
  seo: SeoMeta;
  breadcrumb: Breadcrumb[];
  hero: {
    tag: string;
    title: string;
    sub: string;
    support: string;
    badges: string[];
    primary: Cta;
    secondary: Cta;
  };
  problem: {
    heading: string;
    sub: string;
    pains: PainCard[];
    costHeading: string;
    costs: LabelledStat[];
  };
  solution: { heading: string; sub: string; steps: SolutionStep[] };
  platforms: { heading: string; sub: string; cards: PlatformCard[]; extra: string; cta: Cta };
  howItWorks: { heading: string; sub: string; layers: HowLayer[] };
  enterprise: { heading: string; sub: string; features: EnterpriseFeature[] };
  beforeAfter: { heading: string; sub: string; rows: BeforeAfterRow[]; results: LabelledStat[] };
  developer: { heading: string; sub: string; features: DevFeature[]; code: string; cta: Cta };
  proof: { heading: string; sub: string; cases: CaseStudy[] };
  why: { heading: string; sub: string; steps: string[] };
  faq: { heading: string; items: FaqItem[] };
  closing: {
    heading: string;
    sub: string;
    primary: Cta;
    secondary: Cta;
    phone: string;
    email: string;
    metrics: LabelledStat[];
  };
}

/* ── Tally family ─────────────────────────────────────────────────────────── */

export interface SetupStep {
  n: string;
  text: string;
}
export interface FeatureBlock {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  cta: Cta;
}

export interface TallyConnector {
  platform: "tally";
  slug: string;
  logo: string;
  seo: SeoMeta;
  breadcrumb: Breadcrumb[];
  hero: { tag: string; title: string; sub: string; support: string; primary: Cta };
  setup: { heading: string; steps: SetupStep[]; cta: Cta };
  features: FeatureBlock[];
  params?: { heading: string; body: string; items: string[]; cta: Cta };
  faq: { heading: string; items: FaqItem[] };
  closing: { stat: LabelledStat; heading: string; sub: string; primary: Cta };
}

export type ConnectorData = SapConnector | TallyConnector;

/* ── Reusable SAP blocks (identical across the 3 SAP pages) ───────────────── */

const SAP_HERO_SHARED = {
  title: "Integrate SAP with India GST in real-time",
  support: "No manual uploads. No IRN errors. No compliance risk.",
  badges: ["5-Minute Setup", "Zero ABAP Coding", "100% Automation"],
  primary: { label: "Book SAP Integration Demo", href: SIGNUP_DEV },
  secondary: { label: "Watch 2-Min Overview", href: SIGNUP_DEV },
};

const SAP_PROBLEM: SapConnector["problem"] = {
  heading: "Is your SAP team still manually uploading JSON to the GST portal?",
  sub: "Stop wasting hours on manual data entry and IRN rejections.",
  pains: [
    { stat: "8+ hrs/day", title: "Manual JSON upload", body: "A separate JSON upload for every single invoice." },
    { stat: "30–40%", title: "IRN rejections", body: "One wrong field breaks the entire batch." },
    { stat: "Compliance risk", title: "No audit trail", body: "Reconciliation becomes a nightmare against the GST portal." },
  ],
  costHeading: "The real cost — at just 1,000 invoices / month",
  costs: [
    { value: "₹12L+", label: "Annual labor cost" },
    { value: "300+", label: "Hours wasted / month" },
    { value: "High", label: "GST penalty risk" },
  ],
};

const SAP_SOLUTION: SapConnector["solution"] = {
  heading: "One connector. Complete automation.",
  sub: "Real-time, end-to-end — from SAP document posting to a signed IRN.",
  steps: [
    { title: "Real-Time Engine", line: "Instant IRN & QR via the NIC API", metricValue: "<1 s", metricLabel: "Response time" },
    { title: "Smart Mapping", line: "IDOC to JSON, automatically", metricValue: "24/7", metricLabel: "Monitoring" },
    { title: "Zero Manual Work", line: "Fully automated workflow", metricValue: "0", metricLabel: "Human intervention" },
    { title: "Audit Ready", line: "Complete compliance trail", metricValue: "7 yrs", metricLabel: "Data retention" },
  ],
};

const SAP_PLATFORMS: SapConnector["platforms"] = {
  heading: "Works with your SAP",
  sub: "From SAP B1 to S/4HANA — we support every major SAP platform.",
  cards: [
    { name: "SAP Business One", tag: "Most Popular", points: ["REST API / Add-on", "SQL & HANA DB", "All versions supported"] },
    { name: "SAP S/4HANA", tag: "Enterprise", points: ["API + Middleware", "OData Integration", "Cloud & On-Premise"] },
    { name: "SAP ECC", tag: "Legacy Support", points: ["RFC / BAPI", "IDOC Processing", "All ECC versions"] },
    { name: "SAP ByDesign", tag: "Cloud Native", points: ["REST API", "OData v2", "SOAP Gateway"] },
  ],
  extra: "Plus SAP Ariba, Concur, Cloud ERP, SuccessFactors & more",
  cta: { label: "View Full Compatibility", href: SIGNUP_ALL },
};

const SAP_HOW: SapConnector["howItWorks"] = {
  heading: "How it works",
  sub: "Three layers. Infinite reliability. Zero manual work.",
  layers: [
    {
      label: "Layer 1",
      title: "SAP",
      points: [
        "WhiteBooks SAP add-on with JSON extractor",
        "Invoice cockpit for IRN & e-Way Bill processing",
        "Receives ACK number, ACK date & IRN number",
        "Receives e-Way Bill number with generation & expiry date",
      ],
    },
    {
      label: "Layer 2",
      title: "WhiteBooks Server",
      points: [
        "Uploads SAP data securely to the govt. server",
        "Smart error handling with pre-validations",
        "Generates e-Way Bill & e-Invoice in seconds",
        "Stores e-Way Bill & e-Invoice data for 7 years",
        "Smart, insightful compliance reporting",
      ],
    },
    {
      label: "Layer 3",
      title: "Govt. Server",
      points: [
        "Validates invoice data as per GSTN rules",
        "Generates IRN and digitally signed JSON",
        "Returns QR code & acknowledgement details",
        "Real-time e-Way Bill validation & response",
      ],
    },
    {
      label: "Layer 4",
      title: "e-Invoice Generation",
      points: [
        "IRN generation & invoice registration",
        "Acknowledgement number & date confirmation",
        "Signed QR code generation",
        "e-Way Bill number with validity details",
        "Smart, insightful compliance reporting",
      ],
    },
  ],
};

const SAP_ENTERPRISE: SapConnector["enterprise"] = {
  heading: "Enterprise features",
  sub: "Built for big SAP clients with demanding requirements.",
  features: [
    { title: "High-volume processing", note: "100,000+ invoices / day" },
    { title: "Branch & entity-wise mapping", note: "Multi-location support" },
    { title: "Multiple company codes", note: "Centralized management" },
    { title: "Failover retry engine", note: "Automatic error recovery" },
    { title: "Batch & scheduled runs", note: "Off-peak processing" },
    { title: "Multi-GSTIN management", note: "Consolidated dashboard" },
    { title: "Bulk reconciliation", note: "Automated matching" },
    { title: "Advanced search & filters", note: "Quick data retrieval" },
    { title: "Analytics & API webhooks", note: "Real-time data alerts" },
  ],
};

const SAP_BEFORE_AFTER: SapConnector["beforeAfter"] = {
  heading: "From spreadsheets and manual work to automated workflows",
  sub: "Save hours, eliminate errors and build audit-ready operations with WhiteBooks.",
  rows: [
    { metric: "Process time", before: "8+ hours/day", after: "<1 second" },
    { metric: "Error rate", before: "30–40%", after: "0%" },
    { metric: "Manual work", before: "Every invoice", after: "Zero" },
    { metric: "Compliance risk", before: "High", after: "None" },
    { metric: "Audit trail", before: "None", after: "100% complete" },
    { metric: "Team satisfaction", before: "Low", after: "High" },
  ],
  results: [
    { value: "95%", label: "Time saved" },
    { value: "₹10L+", label: "Annual savings" },
    { value: "100%", label: "Compliance" },
  ],
};

const SAP_DEV_CODE = `import WhiteBooksConnector from 'wb-sap';

const connector = new WhiteBooksConnector({
  apiKey: 'your_api_key',
  environment: 'production'
});

const result = await connector.generateEInvoice({
  sapDocNumber: 'INV-2024-001',
  gstin: '29AABCT1234D1Z5',
  autoSubmit: true
});

console.log(result.irn);
console.log(result.qrCode);`;

const SAP_DEVELOPER: SapConnector["developer"] = {
  heading: "Developer-friendly integration",
  sub: "Built by developers, for developers.",
  features: [
    { title: "API documentation", body: "Complete REST API documentation with examples." },
    { title: "Sandbox environment", body: "Test the integration before going live." },
    { title: "Multiple language SDKs", body: "Java, Python, Node.js & .NET libraries." },
    { title: "Error codes", body: "Detailed error messages with solutions." },
    { title: "Postman collections", body: "Ready-to-use API collections." },
    { title: "Webhook events", body: "Real-time notifications for events." },
  ],
  code: SAP_DEV_CODE,
  cta: { label: "View API Documentation", href: SIGNUP_DEV },
};

const SAP_PROOF: SapConnector["proof"] = {
  heading: "Proven results",
  sub: "Real companies. Real ROI. Real fast.",
  cases: [
    {
      sector: "Manufacturing",
      title: "Leading auto-parts manufacturer",
      headline: "100k invoices automated in 5 days",
      stats: [
        { value: "300+ hrs", label: "Saved / month" },
        { value: "40% → 0%", label: "Error reduction" },
        { value: "₹15L", label: "ROI annually" },
      ],
      quote: "WhiteBooks transformed our entire GST compliance process overnight.",
    },
    {
      sector: "Retail & FMCG",
      title: "Fortune 500 FMCG enterprise",
      headline: "Zero IRN rejections achieved",
      stats: [
        { value: "150+", label: "Branches" },
        { value: "100%", label: "Automation" },
        { value: "Perfect", label: "Compliance score" },
      ],
      quote: "Finally, real-time GST compliance that actually works with SAP S/4HANA.",
    },
    {
      sector: "Pharma Distribution",
      title: "Multi-state pharmaceutical distributor",
      headline: "50+ GSTINs managed centrally",
      stats: [
        { value: "10K+", label: "Daily invoices" },
        { value: "<1 s", label: "Processing time" },
        { value: "Zero", label: "Audit issues" },
      ],
      quote: "The reconciliation alone saves us two full-time employees worth of work.",
    },
  ],
};

const SAP_WHY: SapConnector["why"] = {
  heading: "Why this works",
  sub: "A proven methodology with predictable results.",
  steps: [
    "Because SAP uses IDoc",
    "Which always has to be converted to JSON",
    "And JSON needs to be mapped to the NIC portal",
    "Using standard, standardized IDOC fields",
    "All business logic is handled at the middleware level",
    "You're literally installing a compliance confidence booster",
  ],
};

const SAP_CLOSING: SapConnector["closing"] = {
  heading: "Stop manual GST uploads. Start automating today.",
  sub: "Join 100+ SAP enterprises achieving 100% GST compliance with zero manual work.",
  primary: { label: "Get Integration Guide", href: SIGNUP_DEV },
  secondary: { label: "Book Your Demo Call", href: SIGNUP_DEV },
  phone: "+91 90321 11788",
  email: "sales@whitebooks.in",
  metrics: [
    { value: "100+", label: "Enterprise clients" },
    { value: "1M+", label: "e-Invoices processed" },
    { value: "100%", label: "Uptime guaranteed" },
    { value: "<5 min", label: "Setup time" },
  ],
};

/* ── SAP · e-Invoicing ────────────────────────────────────────────────────── */

const sapEInvoicing: SapConnector = {
  platform: "sap",
  slug: "sap-e-invoicing",
  logo: sapLogo,
  seo: {
    title: "SAP e-Invoicing Connector | Real-time IRN from SAP | WhiteBooks",
    description:
      "GSP-certified SAP e-Invoice connector. Push e-invoices from SAP B1, S/4HANA, ECC & ByDesign to the IRP and get IRN, QR and signed XML back — real-time, zero ABAP.",
    canonical: "https://whitebooks.in/connectors/sap-e-invoicing",
    keywords: "SAP e-invoice connector, SAP IRN, SAP GST integration, e-invoicing SAP",
  },
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Connectors" }, { label: "SAP e-Invoicing" }],
  hero: {
    ...SAP_HERO_SHARED,
    tag: "SAP · e-Invoicing",
    sub: "Push e-invoices from SAP to the IRP and get IRN, QR and signed XML back. The WhiteBooks SAP e-Invoice connector — certified GSP, real-time.",
  },
  problem: SAP_PROBLEM,
  solution: SAP_SOLUTION,
  platforms: SAP_PLATFORMS,
  howItWorks: SAP_HOW,
  enterprise: SAP_ENTERPRISE,
  beforeAfter: SAP_BEFORE_AFTER,
  developer: SAP_DEVELOPER,
  proof: SAP_PROOF,
  why: SAP_WHY,
  faq: {
    heading: "Frequently asked questions",
    items: [
      {
        q: "What does the SAP e-Invoice Connector do?",
        a: "It triggers IRN generation from SAP at the point of invoice posting, through WhiteBooks' GSP channel to the IRP. The IRN and QR code post back to the SAP billing document for print / despatch.",
      },
      {
        q: "Does it support real-time and bulk modes?",
        a: "Both. Real-time mode posts each invoice immediately; bulk mode collects invoices on a schedule (e.g. hourly) and submits in batches of up to 1,000.",
      },
      {
        q: "How are IRP errors handled?",
        a: "Each rejected invoice surfaces in a SAP dashboard with the IRP error code and a one-click correction workflow. Auto-retry is supported for transient errors.",
      },
      {
        q: "Can I cancel an IRN from SAP?",
        a: "Yes. Cancellation within the 24-hour IRP window is supported from the SAP invoice transaction. Beyond 24 hours, credit notes are issued per GST law.",
      },
      {
        q: "What SAP releases are supported?",
        a: "SAP ECC 6.0+, SAP S/4HANA on-premise and Cloud. The connector is delivered as a transport for on-premise and as an OData / SCP add-on for Cloud.",
      },
    ],
  },
  closing: SAP_CLOSING,
};

/* ── SAP · e-Way Bill ─────────────────────────────────────────────────────── */

const sapEWayBill: SapConnector = {
  platform: "sap",
  slug: "sap-e-way-bill",
  logo: sapLogo,
  seo: {
    title: "SAP e-Way Bill Connector | Generate EWB from SAP | WhiteBooks",
    description:
      "Generate, update and cancel e-Way Bills directly from SAP ECC or S/4HANA. WhiteBooks' GSP-certified SAP connector handles auth, retries and ledger sync — zero ABAP.",
    canonical: "https://whitebooks.in/connectors/sap-e-way-bill",
    keywords: "SAP e-way bill connector, EWB SAP, SAP NIC integration, e-way bill SAP",
  },
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Connectors" }, { label: "SAP e-Way Bill" }],
  hero: {
    ...SAP_HERO_SHARED,
    tag: "SAP · e-Way Bill",
    sub: "Generate, update and cancel e-Way Bills directly from SAP ECC or S/4HANA. The WhiteBooks SAP connector handles auth, retries and ledger sync.",
  },
  problem: SAP_PROBLEM,
  solution: SAP_SOLUTION,
  platforms: SAP_PLATFORMS,
  howItWorks: SAP_HOW,
  enterprise: SAP_ENTERPRISE,
  beforeAfter: SAP_BEFORE_AFTER,
  developer: SAP_DEVELOPER,
  proof: SAP_PROOF,
  why: SAP_WHY,
  faq: {
    heading: "Frequently asked questions",
    items: [
      {
        q: "What does the SAP e-Way Bill Connector do?",
        a: "It auto-generates e-Way Bills from SAP documents via the NIC channel, pulling vehicle and transporter details straight from SAP master data.",
      },
      {
        q: "Which SAP modules does it integrate with?",
        a: "SD (sales / billing), MM (purchases) and LE (logistics execution); custom transactions are supported via BAdIs.",
      },
      {
        q: "Can it handle multi-vehicle / trans-shipment?",
        a: "Yes. It supports Part-B updates for vehicle reassignment and multi-vehicle journeys.",
      },
      {
        q: "How is EWB validity tracked?",
        a: "The connector pulls expiry into a SAP dashboard and triggers extension workflows for expiring EWBs still in transit.",
      },
      {
        q: "How long is deployment?",
        a: "Typical go-live is 3–5 weeks: discovery, sandbox, mapping, UAT and production.",
      },
    ],
  },
  closing: SAP_CLOSING,
};

/* ── SAP · GST Filing ─────────────────────────────────────────────────────── */

const sapGst: SapConnector = {
  platform: "sap",
  slug: "sap-gst",
  logo: sapLogo,
  seo: {
    title: "SAP GST Connector | File GSTR-1, 3B & IMS from SAP | WhiteBooks",
    description:
      "Native SAP GST add-on to upload, reconcile and file GSTR-1, GSTR-3B and IMS from SAP ECC and S/4HANA in real time — multi-GSTIN, GSP-certified.",
    canonical: "https://whitebooks.in/connectors/sap-gst",
    keywords: "SAP GST connector, GSTR-1 SAP, GSTR-3B SAP, SAP GST filing, IMS SAP",
  },
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Connectors" }, { label: "SAP GST" }],
  hero: {
    ...SAP_HERO_SHARED,
    tag: "SAP · GST Filing",
    sub: "Native SAP GST add-on to upload, reconcile and file GSTR-1, GSTR-3B and IMS from SAP ECC and S/4HANA — in real time.",
  },
  problem: SAP_PROBLEM,
  solution: SAP_SOLUTION,
  platforms: SAP_PLATFORMS,
  howItWorks: SAP_HOW,
  enterprise: SAP_ENTERPRISE,
  beforeAfter: SAP_BEFORE_AFTER,
  developer: SAP_DEVELOPER,
  proof: SAP_PROOF,
  why: SAP_WHY,
  faq: {
    heading: "Frequently asked questions",
    items: [
      {
        q: "What does the SAP GST Connector do?",
        a: "It uploads, reconciles and files GSTR-1, GSTR-3B and IMS directly from SAP through WhiteBooks' GSP channel — no manual portal work and no JSON juggling.",
      },
      {
        q: "Does it support multiple GSTINs?",
        a: "Yes. Multi-GSTIN and multiple company codes are managed from one consolidated dashboard, with branch and entity-wise mapping.",
      },
      {
        q: "How does reconciliation work?",
        a: "Purchase data is auto-matched against GSTR-2B for ITC, with bulk reconciliation and mismatch reporting surfaced inside SAP.",
      },
      {
        q: "Can returns be filed in bulk?",
        a: "Yes. Batch and scheduled runs let you upload and file across periods and GSTINs during off-peak windows, with a complete audit trail.",
      },
      {
        q: "What SAP releases are supported?",
        a: "SAP ECC 6.0+ and SAP S/4HANA (on-premise and Cloud), delivered as a transport for on-premise and an OData / SCP add-on for Cloud.",
      },
    ],
  },
  closing: SAP_CLOSING,
};

/* ── Tally · e-Invoice ────────────────────────────────────────────────────── */

const TALLY_SUPPORT = "Runs on India's GSP-certified, cloud-first platform used by 25,000+ businesses.";

const tallyEInvoice: TallyConnector = {
  platform: "tally",
  slug: "tally-e-invoice",
  logo: tallyLogo,
  seo: {
    title: "Tally e-Invoice Connector | IRN from Tally in 3 clicks | WhiteBooks",
    description:
      "Generate and manage e-invoices directly from Tally. The WhiteBooks Tally Integration Connector creates IRN and QR codes from your sales vouchers — no portal visits.",
    canonical: "https://whitebooks.in/connectors/tally-e-invoice",
    keywords: "Tally e-invoice connector, Tally IRN, Tally GST integration, e-invoicing Tally",
  },
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Connectors" }, { label: "Tally e-Invoice" }],
  hero: {
    tag: "Tally · e-Invoicing",
    title: "WhiteBooks Tally Connector for e-Invoice",
    sub: "Generate and manage e-invoices directly from your Tally software — IRN and QR in a single click.",
    support: TALLY_SUPPORT,
    primary: { label: "Get Started with Tally Connector", href: SIGNUP_ALL },
  },
  setup: {
    heading: "Generate e-Invoices from your existing Tally in 3 clicks",
    steps: [
      { n: "01", text: "Download & install the DLL files." },
      { n: "02", text: "Create your username and password from the guide." },
      { n: "03", text: "Generate your e-invoice with one click." },
    ],
    cta: { label: "Get Started with Tally Connector", href: SIGNUP_ALL },
  },
  features: [
    {
      eyebrow: "One-click export",
      title: "Generate e-Invoice within your Tally",
      body: "Export sales data from Tally into WhiteBooks for filing GST returns in a single click.",
      bullets: [
        "No need to use Excel or CSV to import invoices",
        "No visit required to the govt. e-Invoice portal",
        "Avoid the manual hassle of downloading and uploading to the GSTIN",
        "Improves the accuracy of GST filing for Tally users",
        "Reduces your data-preparation time significantly",
      ],
      cta: { label: "Get Access", href: SIGNUP_ALL },
    },
    {
      eyebrow: "One place",
      title: "Manage all your data in one place",
      body: "View, download, edit, update, cancel and delete data using WhiteBooks software.",
      bullets: ["View & download invoices", "Edit & update details", "Cancel & delete records"],
      cta: { label: "Signup Now", href: SIGNUP_ALL },
    },
  ],
  params: {
    heading: "Print e-Invoice",
    body: "The IRP generates a QR code containing the unique IRN (hash) along with key invoice parameters and a digital signature — so it can be verified on the central portal as well as by an offline app.",
    items: [
      "GSTIN of supplier",
      "GSTIN of recipient",
      "Invoice number as given by supplier",
      "Date of generation of invoice",
      "Invoice value (taxable value and gross tax)",
      "Number of line items",
      "HSN code of the main item (highest taxable value)",
      "Unique Invoice Reference Number (hash)",
    ],
    cta: { label: "Sign Up Now", href: SIGNUP_ALL },
  },
  faq: {
    heading: "Frequently asked questions",
    items: [
      {
        q: "What does the Tally e-Invoice Connector do?",
        a: "It generates IRN (Invoice Reference Number) and QR code directly from Tally sales vouchers through WhiteBooks' GSP channel to the official Invoice Registration Portal — no manual portal upload.",
      },
      {
        q: "Which Tally versions are supported?",
        a: "Tally Prime (all releases) and Tally ERP 9 Release 6.6 and above. Delivered as a TDL add-on; no data migration needed.",
      },
      {
        q: "Can the IRN print on the Tally invoice?",
        a: "Yes. Once generated, the IRN and QR code post back to the Tally voucher and print on the customer-facing invoice automatically.",
      },
      {
        q: "How are IRP rejections shown?",
        a: "Rejected vouchers display the IRP error code and message inside Tally; you can fix and re-submit in one click.",
      },
      {
        q: "Does it support bulk generation?",
        a: "Yes. Day Book multi-select pushes a batch of vouchers (up to 1,000 per call) to the IRP with per-voucher status reporting.",
      },
    ],
  },
  closing: {
    stat: { value: "9 Crore+", label: "e-Invoices generated · 99.99% uptime SLA" },
    heading: "Ready to generate e-Invoices from Tally?",
    sub: "Join 25,000+ businesses automating compliance with WhiteBooks.",
    primary: { label: "Get Started with Tally Connector", href: SIGNUP_ALL },
  },
};

/* ── Tally · e-Way Bill ───────────────────────────────────────────────────── */

const tallyEWayBill: TallyConnector = {
  platform: "tally",
  slug: "tally-e-way-bill",
  logo: tallyLogo,
  seo: {
    title: "Tally e-Way Bill Connector | Bulk EWB from Tally | WhiteBooks",
    description:
      "Generate, extend, cancel and print e-Way Bills directly from Tally. The WhiteBooks Tally Integration Connector bridges Tally Prime & ERP 9 to the NIC e-Way Bill system.",
    canonical: "https://whitebooks.in/connectors/tally-e-way-bill",
    keywords: "Tally e-way bill connector, Tally EWB, Tally NIC integration, e-way bill Tally",
  },
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Connectors" }, { label: "Tally e-Way Bill" }],
  hero: {
    tag: "Tally · e-Way Bill",
    title: "WhiteBooks Tally Connector for e-Way Bill",
    sub: "Generate, extend, cancel and print e-Way Bills directly from your Tally software.",
    support: TALLY_SUPPORT,
    primary: { label: "Get Started with Tally Connector", href: SIGNUP_ALL },
  },
  setup: {
    heading: "Generate e-Way Bills from your existing Tally in 3 clicks",
    steps: [
      { n: "01", text: "Download & install the DLL files." },
      { n: "02", text: "Create your username and password from the guide." },
      { n: "03", text: "Generate your e-Way Bills with one click." },
    ],
    cta: { label: "Get Started with Tally Connector", href: SIGNUP_ALL },
  },
  features: [
    {
      eyebrow: "Bulk",
      title: "Generate e-Way Bills in bulk",
      body: "Export sales data from Tally into WhiteBooks — bulk generation, one-click cancellation and support for Delivery Challan, Receipt Note and Debit / Credit Notes.",
      bullets: [
        "Bulk e-Way Bill generation",
        "One-click cancellation",
        "Delivery Challan & Receipt Note support",
        "Debit & Credit Note support",
      ],
      cta: { label: "Get Access", href: SIGNUP_ALL },
    },
    {
      eyebrow: "Updates",
      title: "Update Vehicle No. and Transporter ID in Tally",
      body: "View, download, edit, update, cancel and delete data — plus batch vehicle updates and Transporter ID modifications.",
      bullets: [
        "Batch vehicle-number updates",
        "Transporter ID modifications",
        "View, edit & update data",
        "Cancel & delete records",
      ],
      cta: { label: "Signup Now", href: SIGNUP_ALL },
    },
    {
      eyebrow: "Lifecycle",
      title: "Extend and consolidate e-Way Bills",
      body: "One-click extend and consolidate, with simplified data summarization for faster processing and reconciliation.",
      bullets: [
        "One-click extend",
        "One-click consolidate",
        "Simplified data summarization",
        "Faster processing & reconciliation",
      ],
      cta: { label: "Sign Up Now", href: SIGNUP_ALL },
    },
    {
      eyebrow: "Print",
      title: "Print e-Way Bills from your Tally dashboard",
      body: "Centralized client data management with filing-status visibility and direct dashboard printing.",
      bullets: ["Centralized data management", "Filing-status visibility", "Print directly from the dashboard"],
      cta: { label: "Signup Now", href: SIGNUP_ALL },
    },
  ],
  faq: {
    heading: "Frequently asked questions",
    items: [
      {
        q: "What does the Tally e-Way Bill Connector do?",
        a: "It bridges Tally Prime (and Tally ERP 9) to the official NIC e-Way Bill system, generating and managing EWBs directly from your vouchers.",
      },
      {
        q: "Does it work with Tally Prime?",
        a: "Yes. Both Tally Prime and Tally ERP 9 (Release 6.6+) are supported.",
      },
      {
        q: "Can I generate EWBs in bulk from Tally?",
        a: "Yes. Multi-voucher selection in the Day Book pushes all selected vouchers to the NIC API in one batch.",
      },
      {
        q: "How are EWB cancellations handled?",
        a: "Cancellations within the NIC-allowed window are supported, and Part-B updates for mid-transit vehicle changes are tracked.",
      },
      {
        q: "How is the connector priced?",
        a: "A small one-time licence per Tally installation, plus per-EWB API charges.",
      },
    ],
  },
  closing: {
    stat: { value: "25,000+", label: "businesses on the WhiteBooks platform" },
    heading: "Ready to generate e-Way Bills from Tally?",
    sub: "Comply with GST regulations without ever leaving Tally.",
    primary: { label: "Get Started with Tally Connector", href: SIGNUP_ALL },
  },
};

/* ── Registry — keyed by route slug ───────────────────────────────────────── */

export const CONNECTOR_REGISTRY: Record<string, ConnectorData> = {
  [sapEInvoicing.slug]: sapEInvoicing,
  [sapEWayBill.slug]: sapEWayBill,
  [sapGst.slug]: sapGst,
  [tallyEInvoice.slug]: tallyEInvoice,
  [tallyEWayBill.slug]: tallyEWayBill,
};
