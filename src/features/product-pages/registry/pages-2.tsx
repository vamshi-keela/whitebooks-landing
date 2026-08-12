import React from 'react';
import { SubPageData } from '@/shared/types/pages';
import { ProductMap } from "@/components/product-map/ProductMap";
import eInvoiceDashboardImage from '@/assets/product-images/e-invoice-software/e-invoice-dashboard.png';
import eInvoiceGenerateIrnImage from '@/assets/product-images/feature-images/e-invoice-generate-irn.svg';
import ewayBillDashboardImage from '@/assets/product-images/e-way-bill-software/e-way-bill-dashboard.png';
import ewayBillGenerateImage from '@/assets/product-images/softwares/whitebooks_softwares_1.png';
import { E_INVOICING_SOFTWARE_SHOWCASE_CATEGORIES } from '@/data/e-invoicing-software-platform-showcase.data';
import { E_WAY_BILL_SOFTWARE_SHOWCASE_CATEGORIES } from '@/data/e-way-bill-platform-showcase.data';

const PAGES_2: Record<string, SubPageData> = {

  /* -------------------- e-INVOICE SOFTWARE -------------------- */
  "e-invoice-software": {
    headerMode: "softwares",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Softwares", href: "/softwares" },
      { label: "e-Invoice Software" },
    ],
    seo: {
      title: "e-Invoicing Software for B2B Invoices in India | WhiteBooks",
      description: "Generate IRNs at scale with sub-second latency. Direct IRP integration. Bulk upload, auto-retry, 30-day window enforcement. Built for businesses with AATO above ₹5 crore.",
      canonical: "https://whitebooks.in/softwares/e-invoice",
      keywords: "e-invoice software India, IRN generation, e-invoicing mandate, IRP integration, AATO 5 crore, bulk IRN, 30-day window, e-invoice for GST",
      robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      aiSummary: "WhiteBooks e-Invoice Software generates IRNs for B2B invoices in India via direct integration with the Invoice Registration Portal (IRP). It supports bulk generation, automatic 30-day window enforcement, cancellation, amendment, and credit/debit note flows. Used by businesses with AATO above ₹5 crore mandated to e-invoice from April 2026.",
      og: { title: "e-Invoicing Software for B2B Invoices in India | WhiteBooks", description: "Generate IRNs at scale. Sub-second latency, bulk operations, 30-day window enforcement.", image: "https://whitebooks.in/og-image.png", type: "website" },
      twitter: { card: "summary_large_image", title: "e-Invoicing Software for B2B Invoices | WhiteBooks", description: "Bulk IRN generation, 30-day window enforcement, auto-retry. Built for the April 2026 mandate." },
    },
    extra: <ProductMap active="e-invoice" />,
    hero: {
      eyebrow: "e-Invoice Software | Direct IRP Integration",
      title: (
        <>
          Generate IRNs for every B2B invoice. <span className="text-[var(--brand)]">In bulk. Within the window.</span>
        </>
      ),
      sub: (
        <>
          WhiteBooks e-Invoice Software pushes invoices to the IRP and returns IRNs in under 200ms. Handles the 30-day reporting window, cancellation, amendment, and credit notes. <strong>Built for the April 2026 ₹5 crore mandate.</strong>
        </>
      ),
      primaryCta: { label: "Start Free Trail" },
      secondaryCta: { label: "Book a 20-min Demo" },
      visualKey: "e-invoice-irn",
      // micro:
      //   "AATO above ₹10 crore? <a href='#'>WhiteBooks enforces the 30-day window automatically — never miss ITC eligibility →</a>",
    },
    problem: {
      heading: (
        <>
          Three things that go wrong with e-invoicing — <span className="text-[var(--brand)]">and shouldn&apos;t.</span>
        </>
      ),
      items: [
        { title: "The 30-day window is non-negotiable. Your software should know.", body: "For businesses with AATO above ₹10 crore, invoices not reported to the IRP within 30 days are invalid for ITC. WhiteBooks tracks the window per invoice, escalates as you approach the deadline, and refuses to let invoices age out silently." },
        { title: "The IRP goes down. Your business doesn't stop.", body: "The IRP has unplanned outages — usually around month-end. WhiteBooks queues invoices through outages, retries automatically with exponential backoff, and surfaces only the ones that need your attention. Your dispatch and billing don't wait." },
        { title: "Bulk operations are how real businesses run e-invoicing.", body: "Generating 200 IRNs one at a time is not e-invoicing — it's data entry. WhiteBooks handles bulk generation, bulk cancellation, and bulk amendment as first-class workflows." },
      ],
    },
    features: {
      heading: (
        <>
          What WhiteBooks e-Invoice <span className="text-[var(--brand)]">does.</span>
        </>
      ),
      layout: "guide",
      items: [
        { visualKey: "auto-journal", navLabel: "1-click IRN", title: "Single-click IRN generation", body: "Generate IRN, signed QR code, and acknowledgment number for any B2B invoice. Sub-200ms p50 latency. Direct IRP pipe — no resold endpoints." },
        { visualKey: "auto-journal", navLabel: "Bulk generation", title: "Bulk generation", body: "Upload via CSV, Excel, or push from your ERP. Generate 10,000+ IRNs per batch. Live progress, per-row status, automatic retry on transient failures." },
        { visualKey: "continuous-close", navLabel: "30-day window", title: "30-day window enforcement", body: "WhiteBooks reads your AATO and applies the 30-day reporting window automatically. Invoices approaching the deadline escalate in your dashboard, your inbox, and your finance team's Slack." },
        { visualKey: "native-integration", navLabel: "Cancel & amend", title: "Cancellation and amendment", body: "Cancel within 24 hours of IRN generation under GSTN rules. After 24 hours, generate a credit note linked to the original IRN. The workflow is built in — not a separate process." },
        { visualKey: "native-integration", navLabel: "Credit · debit notes", title: "Credit notes and debit notes", body: "Generate credit notes and debit notes against existing IRNs with one click. Auto-link to the original invoice. Auto-populate buyer GSTIN, place of supply, and reverse logic for ITC adjustment." },
        { visualKey: "multi-entity", navLabel: "Multi-GSTIN entities", title: "Multi-GSTIN, multi-entity", body: "One workspace, every operating entity. Filter IRNs by GSTIN, by branch, by date range. Consolidated reporting across the group." },
        { visualKey: "gst-chart", navLabel: "Pre-IRN validation", title: "Pre-IRN validation", body: "HSN codes validated against GSTN master, place of supply checked against buyer GSTIN, GST rates applied per GST 2.0 slabs, mandatory fields validated against the latest IRP schema — before the request leaves your screen." },
        { visualKey: "audit-reports", navLabel: "Per-invoice audit log", title: "Audit log per invoice", body: "Every IRN action — generation, cancellation, amendment, retry — logged with user, timestamp, IRP response code, and full request/response payload. Exportable for audit." },
      ],
    },
    featureShowCase: E_INVOICING_SOFTWARE_SHOWCASE_CATEGORIES,
    exploreShowCase: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        heading: 'Track every IRN, signed QR and acknowledgement from one',
        accent: 'dashboard',
        desc: 'Live NIC IRP status, IRN cancellation window, success / failure trends, signed JSON archive and exception alerts — across every GSTIN you operate.',
        benefits: ['Live NIC IRP status', 'IRN cancellation window', 'Success / failure trends', 'Signed JSON archive', 'Exception alerts', 'Across every GSTIN'],
        metrics: [
          { pos: 'tr', value: 'All GSTINs', label: 'Live IRP status' },
          { pos: 'bl', value: 'Signed QR', label: 'JSON archived' },
          { pos: 'br', value: 'Exceptions', label: 'Auto-alerted' },
        ],
        image: eInvoiceDashboardImage,
      },
      {
        id: 'einvoice',
        label: 'e-Invoice',
        heading: 'Generate, sign and verify e-Invoices against the',
        accent: 'NIC IRP',
        desc: 'Single IRN, bulk IRN, B2C QR, signed JSON archive, PDF print and bulk zip download — sub-100ms p50 latency, 9 Crore+ IRNs processed per year.',
        benefits: ['Single IRN', 'Bulk IRN', 'B2C QR', 'Signed JSON archive', 'PDF print', 'Bulk zip download'],
        metrics: [
          { pos: 'tr', value: 'sub-100ms', label: 'p50 latency' },
          { pos: 'bl', value: '9 Cr+', label: 'IRNs / year' },
          { pos: 'br', value: 'Bulk IRN', label: 'CSV / ERP push' },
        ],
        image: eInvoiceGenerateIrnImage,
      },
    ],
    integrations: {
      heading: "Connect to your billing system, your ERP, your custom code.",
      body:
        "WhiteBooks e-Invoice Software integrates with 40+ ERPs and billing systems via native connectors. For custom systems, the WhiteBooks e-Invoice API delivers the same capabilities programmatically.",
      logos: ["SAP S/4HANA", "SAP ECC", "Tally Prime", "Oracle NetSuite", "Microsoft Dynamics 365", "Zoho Books", "Odoo", "Marg", "Busy", "30+ more"],
      cta: { label: "See all integrations" },
      secondaryCta: { label: "Looking for the API? Explore the e-Invoice API", href: "/apis/e-invoice" },
    },
    ai: {
      heading: (
        <>
          What the AI actually does <span className="text-[var(--brand)]">inside WhiteBooks e-Invoice.</span>
        </>
      ),
      items: [
        { title: "HSN auto-suggestion", body: "Type the product name, get the right HSN code and current GST 2.0 rate. Trained on 10 crore+ invoices across every Indian industry." },
        { title: "Compliance copilot", body: <>Ask <code>&quot;show me all IRNs cancelled last month with reasons&quot;</code> or <code>&quot;which buyers have invoices nearing the 30-day deadline?&quot;</code> — answers from live data, source rows linked.</> },
        { title: "Place-of-supply auto-resolution", body: "WhiteBooks reads the buyer GSTIN and shipping address, resolves the place of supply, and applies IGST vs CGST/SGST automatically. Handles bill-to/ship-to splits, third-party movements, and SEZ transactions." },
        { title: "Anomaly flagging", body: "Invoice values 3× higher than the buyer's historical pattern? Flagged. Buyer GSTIN inactive in the GSTN registry? Flagged before IRN request. New HSN never used by your business before? Flagged for human review." },
      ],
      note: (
        <>
          <strong>Built on the Anthropic API.</strong> Your data never used to train models.
        </>
      ),
    },
    pricing: {
      heading: "Pricing",
      body: "Pricing scales with IRN volume per month. Bundle discounts available with GST Software and Accounting.",
      tiers: [
        { name: "Starter", price: "₹6,999", cycle: "/year", cta: "Start free", points: ["Up to 1,000 IRNs/month", "1 GSTIN", "Email support"] },
        { name: "Growth", price: "₹24,999", cycle: "/year", featured: true, cta: "Start free trial", points: ["Up to 25,000 IRNs/month", "Up to 10 GSTINs", "ERP connectors", "Priority support"] },
        { name: "Enterprise", price: "Custom", cta: "Talk to sales", points: ["Unlimited IRNs", "SAP-native", "Dedicated infrastructure", "99.95% SLA"] },
      ],
      note: "[Pricing placeholders.]",
      cta: { label: "See full pricing" },
    },
    faq: {
      heading: "Frequently asked questions.",
      items: [
        { q: "From when is e-invoicing mandatory for my business?", a: "E-invoicing is mandatory for businesses with AATO above ₹5 crore from 1st April 2026. For businesses with AATO above ₹10 crore, invoices must be reported to the IRP within 30 days of the invoice date — invoices reported later are invalid for ITC. WhiteBooks enforces this window automatically." },
        { q: "What is AATO and how is it calculated?", a: "AATO is Aggregate Annual Turnover, calculated as the total turnover of all GSTINs under the same PAN in any financial year from 2017–18 onwards. WhiteBooks reads your AATO once and applies the correct e-invoicing threshold and reporting window per your business." },
        { q: "Can I cancel an IRN after generation?", a: "Yes, within 24 hours of IRN generation under GSTN rules. After 24 hours, the invoice must be adjusted via a credit note linked to the original IRN. WhiteBooks supports both workflows." },
        { q: "What happens if the IRP is down?", a: "WhiteBooks queues your invoice generation requests through IRP outages and retries automatically with exponential backoff. You see queue status in real time and can override priority on critical invoices." },
        { q: "Does WhiteBooks support e-invoicing for export and SEZ transactions?", a: "Yes. WhiteBooks handles export with payment of IGST, export without payment under LUT, SEZ supplies with payment, and SEZ supplies without payment — with the correct schema, place of supply, and currency conversion." },
        { q: "How does this differ from the e-Invoice API?", a: "e-Invoice Software is the finished UI product — your finance team uses the dashboard, the bulk upload, and the alerts. The e-Invoice API is the same capability exposed programmatically for developers to embed IRN generation into their own products." },
      ],
    },
    closing: {
      h2: (
        <>
          April 2026 is closer than <span className="text-[var(--brand)]">your AP team thinks.</span>
        </>
      ),
      body:
        "The ₹5 crore AATO mandate goes live April 1, 2026. For ₹10 crore+ AATO, the 30-day reporting window means ITC at stake on every late invoice. WhiteBooks customers move from 'evaluating e-invoicing' to 'live in production' in 2–6 weeks.",
      primaryCta: { label: "Book a 20-min Demo" },
      secondaryCta: { label: "Start Free Trail", href: "https://accounts.whitebooks.in/login" },
    },
  },

  /* -------------------- e-WAY BILL SOFTWARE -------------------- */
  "e-way-bill-software": {
    headerMode: "softwares",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Softwares", href: "/softwares" },
      { label: "e-Way Bill Software" },
    ],
    seo: {
      title: "e-Way Bill Software for Goods Movement in India | WhiteBooks",
      description: "Generate, extend, and cancel e-way bills from one screen. Auto-populate from IRN. Bulk operations. Real-time vehicle and validity tracking. Used by Pharmeasy, WheelsEye, and 12,000+ businesses.",
      canonical: "https://whitebooks.in/softwares/e-way-bill",
      keywords: "e-way bill software, e-way bill generation, e-way bill validity, bulk e-way bill, auto-populate from IRN, multi-warehouse dispatch, transporter e-way bill",
      robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      aiSummary: "WhiteBooks e-Way Bill Software generates, extends, cancels, and tracks e-way bills for movement of goods in India. It auto-populates e-way bills from existing IRNs, supports bulk generation, and integrates natively with 40+ ERPs. Used by businesses moving goods across state lines from one or many warehouses.",
      og: { title: "e-Way Bill Software for Goods Movement | WhiteBooks", description: "Generate, extend, cancel e-way bills. Auto-populate from IRN. Bulk dispatch. Used by Pharmeasy, WheelsEye.", image: "https://whitebooks.in/og-image.png", type: "website" },
      twitter: { card: "summary_large_image", title: "e-Way Bill Software | WhiteBooks", description: "One-click generation from IRN, bulk operations, validity tracking. Multi-warehouse dispatch." },
    },
    extra: <ProductMap active="e-way-bill" />,
    hero: {
      eyebrow: "e-Way Bill Software | GSP-Licensed",
      title: (
        <>
          Every dispatch needs an e-way bill. <span className="text-[var(--brand)]">Generate it in one click.</span>
        </>
      ),
      sub:
        "Auto-populate from your IRN or invoice. Bulk-generate for warehouse dispatch batches. Extend validity for in-transit delays. Cancel within 24 hours when needed. One screen, every workflow.",
      primaryCta: { label: "Start Free Trail" },
      secondaryCta: { label: "Book a 20-min Demo" },
      visualKey: "e-way-bill",
      // micro:
      //   "Dispatching from multiple warehouses? <a href='#'>See how Pharmeasy generates e-way bills for 14 locations on WhiteBooks →</a>",
    },
    problem: {
      heading: (
        <>
          Three things that slow down e-way bill operations — <span className="text-[var(--brand)]">and shouldn&apos;t.</span>
        </>
      ),
      items: [
        { title: "Re-entering the same data twice", body: "Most businesses generate the invoice in one system, then re-key buyer details, item details, and vehicle details into the e-way bill portal. WhiteBooks reads your existing invoice or IRN and pre-populates 90% of the e-way bill fields." },
        { title: "The validity clock is brutal", body: "E-way bills expire based on distance and vehicle type. A truck breakdown, a route diversion, or a delivery delay can invalidate the bill mid-transit — and the goods become non-compliant. WhiteBooks tracks validity, alerts before expiry, and extends in one click when you're authorized." },
        { title: "Bulk dispatch from warehouses", body: "Logistics companies and large distributors dispatch dozens of consignments per day from each warehouse. Generating e-way bills one at a time is operationally untenable. WhiteBooks treats bulk as the default mode, not the exception." },
      ],
    },
    features: {
      heading: (
        <>
          What WhiteBooks e-Way Bill <span className="text-[var(--brand)]">does.</span>
        </>
      ),
      layout: "guide",
      items: [
        { visualKey: "auto-journal", navLabel: "1-click from IRN", title: "Single-click generation from IRN or invoice", body: "Pull buyer GSTIN, item details, HSN, taxable value, and transporter ID directly from the source invoice. Enter only what's new — vehicle number, distance, transport mode." },
        { visualKey: "auto-journal", navLabel: "Bulk generation", title: "Bulk generation", body: "Upload a CSV or push from your ERP. Generate 500+ e-way bills in one batch. Live progress, per-row status, automatic retry." },
        { visualKey: "continuous-close", navLabel: "Validity tracking", title: "Validity tracking and extension", body: "Real-time view of every active e-way bill, its remaining validity, and its in-transit status. Alerts before expiry. One-click extension when permitted under GSTN rules." },
        { visualKey: "native-integration", navLabel: "24-hour cancel", title: "Cancellation within 24 hours", body: "Cancel e-way bills within 24 hours of generation when goods aren't dispatched, vehicles change, or invoices are revoked. After 24 hours, the bill auto-expires per GSTN rules." },
        { visualKey: "multi-entity", navLabel: "Multi-vehicle", title: "Multi-vehicle, multi-transporter", body: "Support for consolidated e-way bills, multi-vehicle movement, and transporter changes mid-transit. All updates logged with timestamp and authorized user." },
        { visualKey: "gst-chart", navLabel: "Distance auto-calc", title: "Distance auto-calculation", body: "WhiteBooks calculates pin-to-pin distance using GSTN's standard mapping. No more guessing distance fields and getting validity wrong." },
        { visualKey: "multi-entity", navLabel: "Multi-warehouse", title: "Multi-GSTIN, multi-warehouse", body: "Each warehouse operates as a dispatch node with its own user roles, vehicle registries, and transporter relationships. Consolidated reporting across the group." },
        { visualKey: "audit-reports", navLabel: "Per-bill audit log", title: "Audit log per bill", body: "Every e-way bill — generation, update, cancellation, expiry — logged with user, timestamp, vehicle number, distance, and GSTN response. Exportable for audit and dispute resolution." },
      ],
    },
    featureShowCase: E_WAY_BILL_SOFTWARE_SHOWCASE_CATEGORIES,
    exploreShowCase: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        heading: 'Track every e-Way Bill, Part-B update and consignment from your',
        accent: 'EWB dashboard',
        desc: 'Live status, expiry alerts, validity countdowns and mismatch reports across every GSTIN — from one workspace, drillable to invoice.',
        benefits: ['Live status', 'Expiry alerts', 'Validity countdowns', 'Mismatch reports', 'Every GSTIN', 'Drillable to invoice'],
        metrics: [
          { pos: 'tr', value: 'All GSTINs', label: 'Live status' },
          { pos: 'bl', value: 'Expiry', label: 'Auto-alerted' },
          { pos: 'br', value: 'Drillable', label: 'To invoice' },
        ],
        image: ewayBillDashboardImage,
      },
      {
        id: 'ewaybill',
        label: 'e-WayBill',
        heading: 'Generate, extend and consolidate e-Way Bills against the',
        accent: 'NIC EWB system',
        desc: 'Single or bulk EWB, Part-A auto-creation, Part-B vehicle updates, validity extension, multi-vehicle transhipment and consolidated EWB — 7 Crore+ processed per year.',
        benefits: ['Single & bulk EWB', 'Part-A auto-create', 'Part-B updates', 'Validity extension', 'Multi-vehicle transhipment', 'Consolidated EWB'],
        metrics: [
          { pos: 'tr', value: '7 Cr+', label: 'EWB / year' },
          { pos: 'bl', value: 'Bulk EWB', label: 'CSV / ERP push' },
          { pos: 'br', value: 'Part-B', label: 'Vehicle updates' },
        ],
        image: ewayBillGenerateImage,
      },
    ],
    integrations: {
      heading: "Connect to your invoicing, your warehouse system, your TMS.",
      body:
        "40+ ERPs, WMS, and TMS platforms via native connectors. Auto-trigger e-way bill generation from invoice creation or dispatch event.",
      logos: ["SAP S/4HANA", "SAP ECC", "Tally Prime", "Oracle NetSuite", "WheelsEye", "Microsoft Dynamics 365", "Zoho Books", "Odoo", "30+ more"],
      cta: { label: "See all integrations" },
      secondaryCta: { label: "Looking for the API? Explore the e-Way Bill API", href: "/apis/e-way-bill" },
    },
    ai: {
      heading: (
        <>
          What the AI actually does <span className="text-[var(--brand)]">inside WhiteBooks e-Way Bill.</span>
        </>
      ),
      items: [
        { title: "Distance and validity prediction", body: "Beyond GSTN's pin-to-pin calculation, WhiteBooks predicts realistic transit time based on route history, transporter performance, and seasonal factors. Reduces expired-bill incidents by surfacing risk before dispatch." },
        { title: "Anomaly flagging", body: "Vehicle numbers that don't match the standard Indian format, transporter IDs not seen before, distances outside the historical range — flagged before bill generation." },
        { title: "Bulk dispatch optimizer", body: "Given a list of consignments and available vehicles, WhiteBooks suggests optimal vehicle assignments to minimize total e-way bills generated (via consolidated bills) and maximize vehicle utilization." },
        { title: "Compliance copilot", body: <>Ask <code>&quot;show me all e-way bills that expired last week&quot;</code> or <code>&quot;which warehouses generated the most bills in March?&quot;</code> — answers from live data, source rows linked.</> },
      ],
      note: (
        <>
          <strong>Built on the Anthropic API.</strong> Your data never used to train models.
        </>
      ),
    },
    pricing: {
      heading: "Pricing",
      body: "Pricing scales with monthly bill volume. Bundle discounts apply with e-Invoice and GST Software.",
      tiers: [
        { name: "Starter", price: "₹5,999", cycle: "/year", cta: "Start free", points: ["Up to 500 e-way bills/month", "1 GSTIN", "Email support"] },
        { name: "Growth", price: "₹19,999", cycle: "/year", featured: true, cta: "Start free trial", points: ["Up to 10,000 bills/month", "Up to 10 GSTINs", "ERP connectors", "Priority support"] },
        { name: "Enterprise", price: "Custom", cta: "Talk to sales", points: ["Unlimited bills", "Multi-warehouse dispatch console", "99.95% SLA", "Dedicated CSM"] },
      ],
      note: "[Pricing placeholders.]",
      cta: { label: "See full pricing" },
    },
    faq: {
      heading: "Frequently asked questions.",
      items: [
        { q: "When is an e-way bill required?", a: "An e-way bill is required for the movement of goods worth more than ₹50,000 (consolidated value of all invoices in the vehicle) between locations in India. Some states have lower thresholds for intra-state movement. WhiteBooks applies the correct threshold based on origin and destination state." },
        { q: "Can I cancel an e-way bill after generation?", a: "Yes, within 24 hours of generation, provided the goods have not been verified by an officer in transit. After 24 hours, the bill cannot be cancelled but will auto-expire per its validity period." },
        { q: "How is the validity period of an e-way bill calculated?", a: "Validity depends on distance and vehicle type. For regular cargo vehicles, 1 day per 200 km. For Over-Dimensional Cargo (ODC), 1 day per 20 km. WhiteBooks calculates and displays validity automatically." },
        { q: "Can I extend the validity of an e-way bill?", a: "Yes, validity can be extended within 8 hours before expiry or 8 hours after expiry, with valid reason (vehicle breakdown, transshipment, etc.). WhiteBooks supports one-click extension with the required reason codes." },
        { q: "How does WhiteBooks integrate with Tally or SAP for e-way bills?", a: "WhiteBooks reads sales invoices from your Tally or SAP system and auto-generates e-way bills with pre-populated data. The generated e-way bill number and QR code are posted back to your source system as fields on the invoice document." },
        { q: "Does WhiteBooks support consolidated e-way bills?", a: "Yes. When one vehicle carries multiple invoices, WhiteBooks generates a single consolidated e-way bill referencing all underlying invoices — the standard practice for transporters and 3PLs." },
      ],
    },
    closing: {
      h2: (
        <>
          Dispatches don&apos;t wait. <span className="text-[var(--brand)]">Your e-way bill software shouldn&apos;t either.</span>
        </>
      ),
      body:
        "WhiteBooks customers generate millions of e-way bills annually — from single-warehouse SMBs to 14-warehouse Pharmeasy operations. Same software, same SLA, same direct GSP pipe.",
      primaryCta: { label: "Book a 20-min Demo" },
      secondaryCta: { label: "Start Free Trail", href: "https://accounts.whitebooks.in/login" },
    },
  },

  /* -------------------- KSA e-INVOICING SOFTWARE -------------------- */
  "ksa-e-invoicing-software": {
    headerMode: "softwares",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Softwares", href: "/softwares" },
      { label: "KSA e-Invoicing Software" },
    ],
    seo: {
      title: "ZATCA Phase 2 e-Invoicing Software for Saudi Arabia | WhiteBooks",
      description: "Generate ZATCA-compliant e-invoices for KSA. FATOORAH integration, Arabic + English invoicing, cryptographic signing. The only platform handling India and Saudi Arabia e-invoicing on one workspace.",
      canonical: "https://whitebooks.in/softwares/ksa",
      keywords: "ZATCA e-invoicing, KSA e-invoice software, FATOORAH integration, Saudi Arabia e-invoice, Phase 2 compliance, bilingual invoicing Arabic English, CSID certificate",
      robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      aiSummary: "WhiteBooks KSA e-Invoicing Software is a ZATCA Phase 2 compliant e-invoicing platform for businesses operating in Saudi Arabia. It generates e-invoices in required XML format, signs them cryptographically (CSID), submits to ZATCA's FATOORAH portal, and returns cleared invoices with QR codes. One of the few platforms offering integrated e-invoicing for both India (GSTN) and KSA (ZATCA) on the same workspace.",
      og: { title: "ZATCA Phase 2 e-Invoicing Software for Saudi Arabia | WhiteBooks", description: "FATOORAH integration, cryptographic signing, bilingual Arabic+English invoicing. India and KSA on one platform.", image: "https://whitebooks.in/og-image.png", type: "website" },
      twitter: { card: "summary_large_image", title: "ZATCA e-Invoicing Software for Saudi Arabia | WhiteBooks", description: "ZATCA Phase 2 compliant. FATOORAH clearance, CSID lifecycle, QR codes. One platform for India and KSA." },
    },
    extra: <ProductMap active="notice-management" />,
    hero: {
      eyebrow: "KSA e-Invoicing | ZATCA Phase 2 Compliant",
      title: (
        <>
          ZATCA-ready e-invoicing for <span className="text-[var(--brand)]">businesses operating in Saudi Arabia.</span>
        </>
      ),
      sub: (
        <>
          Generate, sign, and submit e-invoices to ZATCA&apos;s FATOORAH portal in real time. Arabic and English invoicing, cryptographic signing, QR-coded outputs — <strong>and the same workspace handles your Indian GST filings.</strong>
        </>
      ),
      primaryCta: { label: "Book a 20-min Demo" },
      secondaryCta: { label: "Talk to KSA solutions team", href: "https://accounts.whitebooks.in/login" },
      // micro:
      //   "Operating in India and KSA? <a href='#'>WhiteBooks is one of the few platforms that handles both on one contract →</a>",
    },
    problem: {
      heading: (
        <>
          Three reasons KSA e-invoicing is <span className="text-[var(--brand)]">harder than it looks.</span>
        </>
      ),
      items: [
        { title: "ZATCA Phase 2 is not a CSV upload", body: "Phase 2 e-invoicing requires real-time integration with FATOORAH, XML in the specified UBL schema, cryptographic signing using a ZATCA-issued certificate, and clearance before the invoice reaches the buyer. Off-the-shelf accounting software in KSA does not do this end-to-end." },
        { title: "Bilingual is mandatory, not optional", body: "Tax invoices in KSA must include both Arabic and English fields for buyer name, item descriptions, and tax amounts. Most Indian systems can't generate Arabic at all. WhiteBooks generates both, in the right glyph order, with right-to-left layout where required." },
        { title: "India + KSA = two compliance regimes, one finance team", body: "Indian-headquartered businesses with operations in KSA typically run two separate tools — and reconcile twice. WhiteBooks runs both on the same platform, with consolidated reporting in your finance team's currency of choice." },
      ],
    },
    features: {
      heading: (
        <>
          What WhiteBooks KSA e-Invoicing <span className="text-[var(--brand)]">does.</span>
        </>
      ),
      layout: "guide",
      items: [
        { visualKey: "native-integration", navLabel: "Phase 2 clearance", title: "ZATCA Phase 2 clearance", body: "Real-time integration with FATOORAH. Invoices submitted, cleared, and signed before they reach the buyer. UBL 2.1 XML format, ZATCA-approved schema." },
        { visualKey: "gst-chart", navLabel: "Cryptographic signing", title: "Cryptographic signing", body: "Cryptographic stamp generation using ZATCA-issued compliance certificate (CSID). WhiteBooks manages certificate lifecycle — issuance, renewal, revocation — so your finance team doesn't." },
        { visualKey: "audit-reports", navLabel: "Arabic + English", title: "Bilingual invoicing (Arabic + English)", body: "Invoice templates in Arabic-English bilingual layout with right-to-left text rendering. Buyer name, supplier name, item descriptions, and tax labels in both languages by default." },
        { visualKey: "auto-journal", navLabel: "QR code generation", title: "QR code generation", body: "ZATCA-compliant QR code containing supplier VAT number, invoice timestamp, total amount, VAT amount, and cryptographic hash — embedded on every issued invoice." },
        { visualKey: "roles", navLabel: "Simplified · Standard", title: "Simplified and standard tax invoices", body: "Support for both simplified tax invoices (B2C, sub-1,000 SAR) and standard tax invoices (B2B and high-value B2C). Different schemas, different requirements — both handled." },
        { visualKey: "multi-entity", navLabel: "India + KSA unified", title: "India + KSA single workspace", body: "For Indian-headquartered businesses operating in KSA, manage both compliance regimes on one WhiteBooks contract. Cross-jurisdiction reporting, consolidated dashboards, one support team." },
      ],
    },
    integrations: {
      heading: "Connect to your KSA accounting and billing systems.",
      body:
        "WhiteBooks KSA integrates with Zoho Books KSA edition, Microsoft Dynamics, SAP S/4HANA, Oracle NetSuite, and major regional billing systems.",
      logos: ["SAP S/4HANA KSA", "Oracle NetSuite KSA", "Microsoft Dynamics 365", "Zoho Books KSA", "Sage", "Tally Prime", "Custom ERPs", "Regional billing systems"],
      cta: { label: "See all integrations" },
      secondaryCta: { label: "Looking for the API? Explore the KSA e-Invoice API", href: "/apis/ksa" },
    },
    pricing: {
      heading: "Pricing",
      body: "KSA pricing in SAR. Bundle savings when combined with Indian compliance products.",
      tiers: [
        { name: "Starter", price: "Custom", cycle: "(in SAR)", cta: "Talk to KSA team", points: ["Up to 5,000 invoices/year", "1 entity", "ZATCA certificate management", "Email support"] },
        { name: "Growth", price: "Custom", featured: true, cta: "Talk to KSA team", points: ["Up to 100,000 invoices/year", "Multi-entity", "ERP connector", "Priority support"] },
        { name: "Enterprise", price: "Custom", cta: "Talk to sales", points: ["Unlimited invoices", "India + KSA unified", "Dedicated CSM", "99.95% SLA"] },
      ],
      note: "[KSA pricing in SAR; placeholders only.]",
      cta: { label: "Talk to KSA solutions team" },
    },
    faq: {
      heading: "Frequently asked questions.",
      items: [
        { q: "What is ZATCA Phase 2 e-invoicing?", a: "ZATCA Phase 2 (also called the Integration Phase) is the second stage of Saudi Arabia's e-invoicing mandate. It requires real-time integration between taxpayer billing systems and ZATCA's FATOORAH portal, with cryptographic signing of every invoice and clearance before the invoice reaches the buyer. It rolled out in waves from January 2023 onwards." },
        { q: "Is my business required to comply with ZATCA Phase 2?", a: "ZATCA notifies businesses individually based on annual revenue thresholds. Phase 2 was rolled out in waves — first to businesses above SAR 3 billion in annual revenue, then progressively to smaller bands. As of 2026, the threshold is significantly lower; ZATCA's official site has the latest wave information." },
        { q: "How does WhiteBooks handle the ZATCA cryptographic certificate (CSID)?", a: "WhiteBooks generates the Certificate Signing Request (CSR), submits it to ZATCA via the FATOORAH portal, retrieves the issued CSID, and stores it in encrypted form. Certificate renewal and revocation are handled by WhiteBooks — your team never touches the cryptography." },
        { q: "Can I issue invoices in Arabic only, or English only?", a: "ZATCA requires bilingual (Arabic + English) invoicing for standard tax invoices. Simplified tax invoices (B2C) can be Arabic-only. WhiteBooks defaults to bilingual and switches automatically for simplified invoices." },
        { q: "Does WhiteBooks handle the QR code requirement?", a: "Yes. Every WhiteBooks-generated invoice includes a ZATCA-compliant QR code with the required fields (supplier VAT number, timestamp, total, VAT amount, cryptographic hash) embedded automatically." },
        { q: "Can I run Indian GST filings and KSA e-invoicing on the same platform?", a: "Yes — and this is a primary reason Indian-headquartered groups with KSA operations choose WhiteBooks. One contract, one workspace, two compliance regimes. Consolidated cross-jurisdiction reporting included on Enterprise plans." },
      ],
    },
    closing: {
      h2: (
        <>
          India compliance is hard. KSA compliance is harder. <span className="text-[var(--brand)]">We do both.</span>
        </>
      ),
      body:
        "WhiteBooks is one of the few platforms operating ZATCA-approved e-invoicing infrastructure alongside a GSTN GSP license. If your business files in both India and the GCC, talk to our KSA solutions team about a unified contract.",
      primaryCta: { label: "Talk to KSA solutions team" },
      secondaryCta: { label: "Book a 20-min Demo" },
    },
  },
};

export { PAGES_2 };
