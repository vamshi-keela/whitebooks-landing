import React from 'react';
import { SubPageData } from '@/shared/types/pages';
import {
  GST_API_HERO_TABS,
  E_INVOICE_API_HERO_TABS,
  E_WAY_BILL_API_HERO_TABS,
  KSA_E_INVOICE_API_HERO_TABS,
} from '@/features/developer/apiHeroCode';

const PAGES_3: Record<string, SubPageData> = {

  /* -------------------- GST API -------------------- */
  "gst-api": {
    headerMode: "apis",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "APIs", href: "/apis" },
      { label: "GST API" },
    ],
    seo: {
      title: "GST API for Developers — Direct GSP Pipe | WhiteBooks",
      description: "REST API for GST filing, GSTIN validation, GSTR-2A/2B retrieval, and HSN search. Built by a directly licensed GSP. Sandbox in 5 minutes. 99.95% uptime SLA.",
      canonical: "https://whitebooks.in/apis/gst",
      keywords: "GST API, GSTIN validation API, GSTR-2B API, GST filing API, IMS API, GST developer API, GSP API, GST REST API",
      robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      aiSummary: "WhiteBooks GST API is a REST API for GST filing, invoice retrieval, GSTIN validation, and HSN/SAC code search in India. Built by a directly licensed GST Suvidha Provider (GSP) and used by fintechs, ERPs, and enterprise IT teams. Production endpoints have a 99.95% uptime SLA and sub-200ms median response latency.",
      og: { title: "GST API for Developers — Direct GSP Pipe | WhiteBooks", description: "File returns, validate GSTINs, pull 2A/2B over REST. Direct GSP-licensed. Sandbox in 5 minutes.", image: "https://whitebooks.in/og-image.png", type: "website" },
      twitter: { card: "summary_large_image", title: "GST API — Direct GSP Pipe | WhiteBooks", description: "REST API for GST filing, GSTIN validation, 2A/2B retrieval. Used by Razorpay, Pharmeasy, Cars24." },
    },
    hero: {
      eyebrow: "GST API | Direct GSP pipe to GSTN",
      title: (
        <>
          File returns, pull 2A/2B, validate GSTINs — <span className="text-[var(--brand)]">over a real REST API.</span>
        </>
      ),
      sub: (
        <>
          The GST API for developers who actually have to ship. Direct GSP-licensed connection to GSTN. SDKs in 5 languages. <strong>99.95% uptime SLA.</strong>
        </>
      ),
      primaryCta: { label: "Get sandbox keys" },
      secondaryCta: { label: "Read API docs", href: '/developer/gst-api', target: '_blank' },
      codeTabs: GST_API_HERO_TABS,
      // micro: "Used in production by <a href='#'>Razorpay, Pharmeasy, Cars24, WheelsEye, and 200+ teams</a>.",
    },
    problem: {
      heading: (
        <>
          Three reasons most &quot;GST APIs&quot; <span className="text-[var(--brand)]">disappoint developers.</span>
        </>
      ),
      items: [
        { title: "Resold APIs add latency", body: "Most 'GST APIs' on the market are resold from a real GSP — your request goes through their server before it reaches GSTN. That's 200–600ms of extra latency on every call. WhiteBooks holds its own GSP license. Your request goes one hop, not two." },
        { title: "XML, SOAP, and undocumented quirks", body: "Some providers wrap the GSTN's underlying APIs without modernization — leaving you to handle XML payloads, SOAP envelopes, and undocumented error codes. WhiteBooks normalizes everything to clean JSON with well-typed errors." },
        { title: "Sandbox that doesn't match production", body: "Sandbox environments at most providers respond differently from production — different rate limits, different error shapes, different success conditions. WhiteBooks sandbox is bit-for-bit identical to production behavior." },
      ],
    },
    features: {
      label: "Endpoints",
      heading: (
        <>
          The endpoints. <span className="text-[var(--brand)]">Documented like an API should be.</span>
        </>
      ),
      items: [
        { endpoint: "POST /gstr3b/retfile", href: "/developer/gst-api/post-gstr3b-retfile", body: "File GSTR-3B straight to GSTN. JSON in, ARN out. Both EVC and DSC signing supported, with idempotent retries on timeout.", title: "" },
        { endpoint: "PUT /gstr1/retsave", href: "/developer/gst-api/put-gstr1-retsave", body: "Push GSTR-1 outward-supply data — B2B, B2CL, CDNR, exports, HSN summary — as clean JSON before you file the return.", title: "" },
        { endpoint: "GET /gstr2b/all", href: "/developer/gst-api/get-gstr2b-all", body: "Pull the full GSTR-2B for any return period: ITC eligibility, vendor-wise breakup, and every section in one call.", title: "" },
        { endpoint: "GET /public/search", href: "/developer/gst-api/get-public-search", body: "Validate any GSTIN against the GSTN registry. Returns legal name, trade name, registration status, state code, and constitution.", title: "" },
        { endpoint: "GET /ledgers/bal", href: "/developer/gst-api/get-ledgers-bal", body: "Read live cash and ITC ledger balances across IGST, CGST, SGST, and cess for any monitored GSTIN.", title: "" },
        { endpoint: "POST /payment/generateChallan", href: "/developer/gst-api/post-payment-generatechallan", body: "Generate a GST payment challan (PMT-06) via API and get the CPIN back for online or over-the-counter payment.", title: "" },
        { endpoint: "GET /gstr/rettrack", href: "/developer/gst-api/get-gstr-rettrack", body: "View and track the filing status of every GSTR across return periods — filed, pending, or overdue — for any GSTIN.", title: "" },
        { endpoint: "POST /itc04/retfile", href: "/developer/gst-api/post-itc04-retfile", body: "File ITC-04 job-work returns for goods sent to and received back from job workers, straight over REST.", title: "" },
      ],
    },
    integrations: {
      heading: "SDKs, frameworks, and the tools you already use.",
      body:
        "Official SDKs in Node.js, Python, PHP, Java, and Go. Community SDKs in Ruby, .NET, Elixir. All on github.com/whitebooks. First-class support for Express, FastAPI, Django, Laravel, Spring Boot, and Gin.",
      logos: ["Node.js", "Python", "PHP", "Java", "Go", "Ruby", ".NET", "Postman", "OpenAPI 3.1", "Express", "FastAPI", "Django", "Laravel"],
      cta: { label: "See SDK docs" },
    },
    ai: {
      heading: (
        <>
          AI-friendly responses, <span className="text-[var(--brand)]">AI-friendly tooling.</span>
        </>
      ),
      items: [
        { title: "Structured response shapes designed for LLM extraction", body: "Every endpoint returns responses with consistent field naming and explicit type information. Easy to feed into agentic workflows or AI-driven reconciliation systems." },
        { title: "Inline error explanations", body: "When GSTN rejects a return, the error code is returned alongside a plain-language explanation and a suggested fix. The kind of thing that saves you from grep-ing GSTN's PDF documentation at 2am." },
        { title: "Natural-language queries", body: <>Type <code>&quot;show me all October vendors with ITC variance above 10%&quot;</code> or <code>&quot;which clients haven&apos;t filed 3B for September?&quot;</code> — answers draw from your live data with source rows linked.</> },
        { title: "Use with the WhiteBooks AI engine", body: "Combine the GST API with the WhiteBooks reconciliation models to build your own fraud detection, ITC optimization, or anomaly flagging — directly on your customers' data, in your product." },],
    },
    pricing: {
      heading: "Pricing",
      body: "Pay for calls, not for seats. Free sandbox for unlimited testing.",
      tiers: [
        { name: "Developer", price: "Free", cta: "Get sandbox keys", points: ["10,000 sandbox calls/month", "Community Slack", "No production access"] },
        { name: "Startup", price: "₹14,999", cycle: "/month", featured: true, cta: "Get started", points: ["50,000 production calls/month", "Email support, <8hr response", "Standard SLA"] },
        { name: "Scale", price: "Custom", cta: "Talk to sales", points: ["Unlimited production calls", "Dedicated infrastructure", "<2hr support", "99.95% SLA", "Account manager"] },
      ],
      note: "[Pricing placeholders.]",
      cta: { label: "See call-volume pricing" },
    },
    faq: {
      heading: "Frequently asked questions.",
      items: [
        { q: "Is WhiteBooks a GSP or a reseller?", a: "WhiteBooks holds a direct GSP license from GSTN, under BVM IT Consulting Services India Pvt. Ltd. We do not resell another GSP's pipe. This is the reason for the latency and uptime difference versus most other API providers." },
        { q: "How fast can I get production access?", a: "Sandbox is immediate. Production requires KYC verification and a signed agreement — median 5 business days from sandbox signup to production keys." },
        { q: "Can I file returns for my clients (as a CA firm or tax-tech product)?", a: "Yes. The API supports multi-GSTIN operation with delegated authentication. Each client GSTIN's credentials are stored encrypted with explicit consent." },
        { q: "What's the SLA?", a: "99.95% monthly uptime on production endpoints. SLA credits issued automatically. Public status page at status.whitebooks.in." },
        { q: "How do GST 2.0 rate changes affect my integration?", a: "The HSN endpoint returns current applicable rates as of the request date. Your code doesn't hard-code rates — you query for them. When the government changes rates, your integration doesn't break." },
        { q: "Do you support webhooks?", a: "Yes. HMAC-signed, replay-protected, with exponential backoff on delivery. Subscribe to GSTR filing events, notice events, 2B availability, and refund status changes." },
      ],
    },
    closing: {
      h2: (
        <>
          Five minutes to <span className="text-[var(--brand)]">your first sandbox call.</span>
        </>
      ),
      body:
        "Sign up, get sandbox keys, run the quickstart. Production access in 5 business days after KYC. No procurement-cycle minimum — Startup tier starts at ₹14,999/month.",
      primaryCta: { label: "Get sandbox keys", href: "https://accounts.whitebooks.in/signup?type=Developer&subscrid=&inviteId" },
      secondaryCta: { label: "Read API Docs", href: '/developer/e-invoice-api', target: '_blank' },
    },
  },

  /* -------------------- e-INVOICE API -------------------- */
  "e-invoice-api": {
    headerMode: "apis",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "APIs", href: "/apis" },
      { label: "e-Invoice API" },
    ],
    seo: {
      title: "e-Invoice API — Generate IRNs at Scale | WhiteBooks",
      description: "REST API for generating IRNs on India's IRP. Sub-200ms latency. Direct GSP pipe. Bulk operations, webhook alerts. Used by Razorpay and 200+ developer teams.",
      canonical: "https://whitebooks.in/apis/e-invoice",
      keywords: "e-invoice API, IRN API, IRP integration API, bulk IRN generation, e-invoice REST API, GSP IRN API India",
      robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      aiSummary: "WhiteBooks e-Invoice API is a REST API for generating Invoice Reference Numbers (IRNs) on India's Invoice Registration Portal (IRP). It supports IRN creation, cancellation, amendment, credit note generation, and bulk operations — with sub-200ms p50 latency. Used by billing systems, ERPs, and B2B marketplaces serving the ₹5 crore+ AATO mandate.",
      og: { title: "e-Invoice API — Generate IRNs at Scale | WhiteBooks", description: "REST API for IRN generation. Sub-200ms latency. Bulk operations, 30-day window alerts.", image: "https://whitebooks.in/og-image.png", type: "website" },
      twitter: { card: "summary_large_image", title: "e-Invoice API — IRN Generation | WhiteBooks", description: "Sub-200ms IRN generation via REST. Bulk, cancel, credit note. Direct GSP pipe." },
    },
    hero: {
      eyebrow: "e-Invoice API | Direct IRP integration",
      title: (
        <>
          Generate IRNs at scale. <span className="text-[var(--brand)]">In under 200 milliseconds.</span>
        </>
      ),
      sub: (
        <>
          The e-Invoice API for billing systems, ERPs, and B2B marketplaces. Sub-200ms p50 latency. Direct GSP-licensed pipe to the IRP. <strong>Used by Razorpay to generate IRNs for 100,000+ merchants.</strong>
        </>
      ),
      primaryCta: { label: "Get sandbox keys" },
      secondaryCta: { label: "Read API docs", href: "/developer/e-invoice-api", target: "_blank" },
      codeTabs: E_INVOICE_API_HERO_TABS,
    },
    problem: {
      heading: (
        <>
          Three reasons e-invoicing integrations <span className="text-[var(--brand)]">fail in production.</span>
        </>
      ),
      items: [
        { title: "The 30-day window is unforgiving", body: "For AATO above ₹10 crore, invoices not reported to the IRP within 30 days are invalid for ITC. If your integration ages out invoices silently, your customers lose money. WhiteBooks surfaces window-at-risk invoices via webhook before they expire." },
        { title: "The IRP has unplanned outages", body: "Around month-end, IRP latency spikes and intermittent failures are common. Naive integrations fail; resilient ones queue and retry. WhiteBooks queues and retries on your behalf, surfacing only the ones requiring human decision." },
        { title: "Schema changes break integrations", body: "The IRP schema has changed multiple times since 2020. Each change breaks integrations that hardcoded the old schema. WhiteBooks abstracts the schema — you call our API, we adapt to IRP changes." },
      ],
    },
    features: {
      label: "Endpoints",
      heading: <>The endpoints.</>,
      items: [
        { endpoint: "POST /einvoice/type/GENERATE", href: "/developer/e-invoice-api/post-einvoice-type-generate-version-v1-03", body: "Generate the IRN, signed QR code, and acknowledgment number for a document. Full B2B invoice JSON in, signed e-invoice out.", title: "" },
        { endpoint: "POST /einvoice/type/CANCEL", href: "/developer/e-invoice-api/post-einvoice-type-cancel-version-v1-03", body: "Cancel an IRN within 24 hours of generation, with a reason code and remark. Returns the updated IRP state.", title: "" },
        { endpoint: "GET /einvoice/type/GETIRN", href: "/developer/e-invoice-api/get-einvoice-type-getirn-version-v1-03", body: "Fetch full e-invoice details for any IRN generated in the last 72 hours — signed payload, status, and QR code.", title: "" },
        { endpoint: "GET /einvoice/type/GETIRNBYDOCDETAILS", href: "/developer/e-invoice-api/get-einvoice-type-getirnbydocdetails-version-v1-03", body: "Look up an IRN by document type, number, and date when you don't have the IRN on hand. Same 72-hour window.", title: "" },
        { endpoint: "POST /einvoice/type/GENERATE_EWAYBILL", href: "/developer/e-invoice-api/post-einvoice-type-generate-ewaybill-version-v1-03", body: "Generate an e-way bill directly from an existing IRN — transporter, vehicle, and distance details in one call.", title: "" },
        { endpoint: "GET /einvoice/qrcode", href: "/developer/e-invoice-api/get-einvoice-qrcode", body: "Generate the B2C dynamic QR code — UPI ID, bank details, and tax breakup — for consumer invoices.", title: "" },
      ],
    },
    integrations: {
      heading: "SDKs, code examples, and integration guides.",
      body:
        "Official SDKs in Node.js, Python, PHP, Java, Go. Working integrations for Stripe-style billing platforms, Razorpay merchant flows, custom ERPs, and bulk dispatch workflows. HMAC-signed webhooks for every state transition.",
      logos: ["Node.js", "Python", "PHP", "Java", "Go", "WheelsEye", "Pharmeasy", "Postman", "OpenAPI 3.1"],
      cta: { label: "Read API Docs", href: '/developer/e-invoice-api', target: '_blank' },
    },
    ai: {
      heading: (
        <>
          Smart features that <span className="text-[var(--brand)]">fit into your code.</span>
        </>
      ),
      items: [
        { title: "HSN auto-suggestion endpoint", body: <><code>GET /v1/hsn/suggest?description=...</code> returns the most likely HSN code and current rate for a product description. Useful for marketplaces accepting seller-uploaded products.</> },
        { title: "Anomaly flagging in webhook payloads", body: <>Webhook events include a <code>risk_flags</code> array — high-value invoice to a new buyer, GSTIN with falling compliance score, unusual HSN pattern. Surface these in your UI for human review.</> },
        { title: "Compliance copilot for end users", body: "Embed WhiteBooks' compliance copilot in your product via the AI Q&A endpoint. Your users ask questions in natural language; the copilot answers from their live data." },
        { title: "Place-of-supply auto-resolution", body: "WhiteBooks reads the buyer GSTIN and shipping address, resolves the place of supply, and applies IGST vs CGST/SGST automatically. Handles bill-to/ship-to splits, third-party movements, and SEZ transactions." },
      ],
    },
    pricing: {
      heading: "Pricing",
      body: "Pay for calls, not seats. Free sandbox for unlimited testing.",
      tiers: [
        { name: "Developer", price: "Free", cta: "Get sandbox keys", points: ["10,000 sandbox calls/month", "Community Slack"] },
        { name: "Startup", price: "₹14,999", cycle: "/month", featured: true, cta: "Get started", points: ["50,000 production IRNs/month", "Email support", "Standard SLA"] },
        { name: "Scale", price: "Custom", cta: "Talk to sales", points: ["Unlimited IRNs", "Dedicated infrastructure", "99.95% SLA", "Account manager"] },
      ],
      note: "[Pricing placeholders.]",
      cta: { label: "See call-volume pricing" },
    },
    faq: {
      heading: "Frequently asked questions.",
      items: [
        { q: "How fast is IRN generation?", a: "Median p50 latency is under 200ms, measured in production over the last 30 days. p99 is under 1 second. The status page at status.whitebooks.in shows real-time and historical latency." },
        { q: "What happens if the IRP is down?", a: "WhiteBooks queues your IRN requests and retries with exponential backoff. You receive a 'pending' status immediately; the IRN comes back via webhook once the IRP responds. Your code doesn't need to handle IRP outages." },
        { q: "Can I cancel an IRN after 24 hours?", a: "No — GSTN rules don't permit IRN cancellation after 24 hours. After 24 hours, you must issue a credit note linked to the original IRN. The /credit-note endpoint handles this." },
        { q: "Does the API enforce the 30-day reporting window?", a: "Yes. For businesses with AATO above ₹10 crore, the API will reject IRN requests for invoices more than 30 days old, per GSTN rules. Webhooks alert you to invoices approaching the deadline." },
        { q: "How does pricing work for bulk operations?", a: "Each IRN in a bulk batch counts as one call against your monthly quota. Bulk doesn't have separate pricing — it's the same per-call rate." },
        { q: "Do you provide a Postman collection?", a: "Yes. One-click import from the API docs. Pre-configured for sandbox; swap the API key to point at production." },
      ],
    },
    closing: {
      h2: (
        <>
          April 2026 is closer than <span className="text-[var(--brand)]">your customers think.</span>
        </>
      ),
      body:
        "The ₹5 crore AATO mandate goes live April 1, 2026. Billing systems and ERPs serving Indian SMBs need e-invoicing capability — and most can't build it from scratch in time. WhiteBooks ships the capability in a sprint.",
      primaryCta: { label: "Get sandbox keys" },
      secondaryCta: { label: "Read API Docs", href: '/developer/e-invoice-api', target: '_blank' },
    },
  },

  /* -------------------- e-WAY BILL API -------------------- */
  "e-way-bill-api": {
    headerMode: "apis",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "APIs", href: "/apis" },
      { label: "e-Way Bill API" },
    ],
    seo: {
      title: "e-Way Bill API for Logistics and Fleet Platforms | WhiteBooks",
      description: "REST API for generating, extending, and cancelling e-way bills. Auto-populate from IRN. Bulk operations. 99.95% uptime SLA. Used by Pharmeasy and WheelsEye.",
      canonical: "https://whitebooks.in/apis/e-way-bill",
      keywords: "e-way bill API, e-way bill REST API, logistics compliance API, WMS API e-way bill, bulk e-way bill API, IRN to e-way bill",
      robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      aiSummary: "WhiteBooks e-Way Bill API is a REST API for generating, extending, and cancelling e-way bills for goods movement in India. It supports auto-population from existing IRNs, bulk operations, consolidated bills, and validity tracking. Used by logistics platforms, WMS providers, TMS systems, and freight brokers including Pharmeasy and WheelsEye.",
      og: { title: "e-Way Bill API for Logistics Platforms | WhiteBooks", description: "Generate, extend, cancel e-way bills via REST. Auto-populate from IRN. Used by Pharmeasy, WheelsEye.", image: "https://whitebooks.in/og-image.png", type: "website" },
      twitter: { card: "summary_large_image", title: "e-Way Bill API | WhiteBooks", description: "REST API for e-way bill generation, extension, cancellation. Bulk and consolidated bills." },
    },
    hero: {
      eyebrow: "e-Way Bill API | GSP-Licensed",
      title: (
        <>
          Every dispatch event triggers an e-way bill. <span className="text-[var(--brand)]">We make it one API call.</span>
        </>
      ),
      sub: (
        <>
          Generate, extend, and cancel e-way bills programmatically. Auto-populate from existing IRNs. Handle bulk dispatch from warehouses. <strong>Used in production by Pharmeasy (14 warehouses) and WheelsEye.</strong>
        </>
      ),
      primaryCta: { label: "Get sandbox keys" },
      secondaryCta: { label: "Read API docs", href: '/developer/e-way-api', target: '_blank' },
      codeTabs: E_WAY_BILL_API_HERO_TABS,
    },
    problem: {
      heading: (
        <>
          Three reasons e-way bill integrations <span className="text-[var(--brand)]">break at scale.</span>
        </>
      ),
      items: [
        { title: "Re-keying data from the invoice system", body: "Most integrations require pushing all invoice and buyer data again to generate the e-way bill. WhiteBooks reads existing IRNs and pre-populates 90% of the e-way bill fields automatically." },
        { title: "Validity expiry mid-transit", body: "Trucks break down. Routes divert. Bills expire. WhiteBooks emits a webhook 4 hours before any e-way bill expires, giving your dispatch team time to extend." },
        { title: "Consolidated bills for multi-invoice trips", body: "When one vehicle carries 30 consignments, you generate one consolidated e-way bill — not 30. Most APIs don't expose consolidated bills cleanly; WhiteBooks does." },
      ],
    },
    features: {
      label: "Endpoints",
      heading: <>The endpoints.</>,
      items: [
        { endpoint: "POST /ewayapi/genewaybill", href: "/developer/e-way-bill-api/post-ewaybillapi-v1.03-ewayapi-genewaybill", body: "Generate an e-way bill for a single consignment. Full consignor, consignee, item, tax, and transport details in, EWB number out.", title: "" },
        { endpoint: "POST /ewayapi/gencewb", href: "/developer/e-way-bill-api/post-ewaybillapi-v1.03-ewayapi-gencewb", body: "Generate a consolidated e-way bill for a multi-consignment vehicle trip. Pass an array of EWB numbers on one trip sheet.", title: "" },
        { endpoint: "POST /ewayapi/extendvalidity", href: "/developer/e-way-bill-api/post-ewaybillapi-v1.03-ewayapi-extendvalidity", body: "Extend validity near expiry with a reason code (vehicle breakdown, transshipment, natural calamity) and remaining distance.", title: "" },
        { endpoint: "POST /ewayapi/canewb", href: "/developer/e-way-bill-api/post-ewaybillapi-v1.03-ewayapi-canewb", body: "Cancel an e-way bill within 24 hours of generation, with a cancellation reason code and remark.", title: "" },
        { endpoint: "POST /ewayapi/vehewb", href: "/developer/e-way-bill-api/post-ewaybillapi-v1.03-ewayapi-vehewb", body: "Update Part-B / vehicle number mid-transit for transshipment. Requires transport mode, place, state, and reason.", title: "" },
        { endpoint: "GET /ewayapi/getewaybill", href: "/developer/e-way-bill-api/get-ewaybillapi-v1.03-ewayapi-getewaybill", body: "Retrieve full e-way bill details, validity, and Part-A / Part-B status for any EWB number.", title: "" },
      ],
    },
    integrations: {
      heading: "Built for logistics, WMS, and TMS platforms.",
      body:
        "SDKs in Node.js, Python, PHP, Java, Go. Integration patterns for warehouse management dispatch flows, transporter onboarding, and freight brokerage platforms. Webhooks: bill generated, bill approaching expiry (4hr alert), bill expired, vehicle updated, bill cancelled.",
      logos: ["Node.js", "Python", "PHP", "Java", "Go", "WheelsEye", "Pharmeasy", ".NET", "Oracle NetSuite"],
      cta: { label: "Read integration guide" },
    },
    ai: {
      heading: (
        <>
          What the AI <span className="text-[var(--brand)]">does inside the API.</span>
        </>
      ),
      items: [
        { title: "Realistic transit prediction", body: "Beyond GSTN's pin-to-pin calculation, WhiteBooks predicts realistic transit time based on route history, transporter performance, and seasonal factors. Returned in every bill creation response." },
        { title: "Anomaly flagging", body: "Webhook events include flags for invalid vehicle number formats, unknown transporter IDs, distances outside historical norms, and bills generated outside typical dispatch hours." },
        { title: "Compliance copilot", body: <>Ask <code>&quot;show me all e-way bills that expired last week&quot;</code> or <code>&quot;which warehouses generated the most bills in March?&quot;</code> — answers from live data, source rows linked.</> },
        { title: "Bulk dispatch optimizer", body: <>Given a list of consignments and available vehicles, the <code>/v1/ewaybill/optimize</code> endpoint suggests vehicle assignments to minimize bills generated (via consolidated bills) and maximize utilization.</> },
      ],
    },
    pricing: {
      heading: "Pricing",
      body: "Pay for calls. Sandbox is free for unlimited testing.",
      tiers: [
        { name: "Developer", price: "Free", cta: "Get sandbox keys", points: ["10,000 sandbox calls/month"] },
        { name: "Startup", price: "₹9,999", cycle: "/month", featured: true, cta: "Get started", points: ["50,000 production bills/month", "Email support", "Standard SLA"] },
        { name: "Scale", price: "Custom", cta: "Talk to sales", points: ["Unlimited bills", "Dedicated infrastructure", "99.95% SLA", "Account manager"] },
      ],
      note: "[Pricing placeholders.]",
      cta: { label: "See call-volume pricing" },
    },
    faq: {
      heading: "Frequently asked questions.",
      items: [
        { q: "Can I auto-generate an e-way bill from an IRN?", a: "Yes. Pass the irn field in the create request; WhiteBooks pulls all matching fields from the source invoice and pre-populates the e-way bill. You only need to add vehicle number, distance, and transport mode." },
        { q: "How does extension work via API?", a: "Call /v1/ewaybill/extend with the bill number, new vehicle number (if applicable), new validity period, and a reason code. Extensions are permitted within 8 hours before or 8 hours after expiry per GSTN rules." },
        { q: "Do you support consolidated e-way bills?", a: "Yes. The /v1/ewaybill/create-consolidated endpoint accepts an array of IRNs or invoice IDs and generates a single consolidated bill — the standard for multi-invoice vehicle trips." },
        { q: "What happens if I cancel a bill after 24 hours?", a: "GSTN rules don't permit cancellation after 24 hours. The bill will auto-expire at end of its validity. The API returns a clear error if you attempt cancellation outside the 24-hour window." },
        { q: "Can I update the vehicle number mid-transit?", a: "Yes. Call /v1/ewaybill/update-vehicle with the new vehicle number and reason code. Every update is logged with timestamp and user — required for audit and dispute resolution." },
        { q: "Do you provide webhooks for expiring bills?", a: "Yes. A ewaybill.expiring_soon event is emitted 4 hours before any active bill expires. Subscribe to alert your dispatch team in time to extend." },
      ],
    },
    closing: {
      h2: (
        <>
          Logistics doesn&apos;t wait. <span className="text-[var(--brand)]">Your e-way bill integration shouldn&apos;t either.</span>
        </>
      ),
      body:
        "Pharmeasy generates e-way bills for 14 warehouses via the WhiteBooks API. WheelsEye uses the API for fleet onboarding and transporter invoice reconciliation. Same SLA, same direct GSP pipe.",
      primaryCta: { label: "Get sandbox keys" },
      secondaryCta: { label: "Read API Docs", href: '/developer/e-way-bill-api', target: '_blank' },
    },
  },

  /* -------------------- KSA e-INVOICE API -------------------- */
  "ksa-e-invoice-api": {
    headerMode: "apis",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "APIs", href: "/apis" },
      { label: "KSA e-Invoice API" },
    ],
    seo: {
      title: "KSA e-Invoice API — ZATCA Phase 2 Integration | WhiteBooks",
      description: "REST API for ZATCA Phase 2 e-invoice generation. FATOORAH submission, CSID management, bilingual invoicing, QR code generation. Used by SaaS products operating in Saudi Arabia.",
      canonical: "https://whitebooks.in/apis/ksa",
      keywords: "KSA e-invoice API, ZATCA API, FATOORAH API, Saudi Arabia e-invoice API, CSID API, bilingual invoice API",
      robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      aiSummary: "WhiteBooks KSA e-Invoice API is a REST API for generating ZATCA Phase 2 compliant e-invoices in Saudi Arabia. It submits invoices to ZATCA's FATOORAH portal, manages cryptographic signing using ZATCA-issued certificates (CSID), and returns cleared invoices with embedded QR codes.",
      og: { title: "KSA e-Invoice API — ZATCA Phase 2 | WhiteBooks", description: "FATOORAH submission, CSID lifecycle management, QR generation. REST API for ZATCA Phase 2 compliance.", image: "https://whitebooks.in/og-image.png", type: "website" },
      twitter: { card: "summary_large_image", title: "KSA e-Invoice API — ZATCA Phase 2 | WhiteBooks", description: "ZATCA Phase 2 via REST. CSID managed, bilingual invoices, QR codes." },
    },
    hero: {
      eyebrow: "KSA e-Invoice API | ZATCA Phase 2 Compliant",
      title: (
        <>
          ZATCA Phase 2 integration. <span className="text-[var(--brand)]">Without becoming an integration specialist.</span>
        </>
      ),
      sub: (
        <>
          Generate, sign, and clear ZATCA-compliant e-invoices via REST. CSID lifecycle managed for you. <strong>Bilingual invoice rendering, QR generation, FATOORAH clearance — all in one API call.</strong>
        </>
      ),
      primaryCta: { label: "Get sandbox keys" },
      secondaryCta: { label: "Talk to KSA solutions team", href: '/developer/ksa-e-invoice-api', target: '_blank' },
      codeTabs: KSA_E_INVOICE_API_HERO_TABS,
    },
    problem: {
      heading: (
        <>
          Three reasons ZATCA Phase 2 integrations are <span className="text-[var(--brand)]">painful to build alone.</span>
        </>
      ),
      items: [
        { title: "Cryptographic signing is not a weekend project", body: "ZATCA Phase 2 requires generating a CSR, retrieving a CSID from ZATCA, signing every invoice with the certificate, and managing renewal — all under specific cryptographic standards. WhiteBooks handles certificate lifecycle entirely." },
        { title: "FATOORAH integration is real-time and unforgiving", body: "Standard tax invoices must be cleared by ZATCA before they reach the buyer. Latency, retries, and error handling matter. WhiteBooks runs production-grade infrastructure with documented SLAs." },
        { title: "Bilingual invoice generation is its own engineering problem", body: "Right-to-left rendering, Arabic-English field pairing, currency formatting per ZATCA spec — most engineering teams underestimate this work. WhiteBooks ships it as a default." },
      ],
    },
    features: {
      label: "Endpoints",
      heading: <>The endpoints.</>,
      items: [
        { endpoint: "POST /v1/ksa/einvoice/create", body: "Generate, sign, and submit a standard tax invoice to FATOORAH. Returns cleared invoice with QR code and signed XML.", title: "" },
        { endpoint: "POST /v1/ksa/einvoice/simplified", body: "Generate simplified tax invoice (B2C, under SAR 1,000). Real-time signing, no clearance required (reported within 24 hours).", title: "" },
        { endpoint: "POST /v1/ksa/einvoice/credit-note", body: "Issue credit note linked to a previously cleared invoice. Auto-populates buyer fields, applies reverse logic.", title: "" },
        { endpoint: "GET /v1/ksa/csid/status", body: "Check CSID validity, expiry, and renewal schedule for your account.", title: "" },
        { endpoint: "POST /v1/ksa/csid/renew", body: "Trigger CSID renewal before expiry. WhiteBooks handles the ZATCA portal interaction.", title: "" },
        { endpoint: "GET /v1/ksa/einvoice/{invoice_id}", body: "Retrieve full invoice details, signed XML, QR code, and FATOORAH clearance receipt.", title: "" },
      ],
    },
    integrations: {
      heading: "SDKs and integration patterns for KSA.",
      body:
        "SDKs in Node.js, Python, PHP, Java, Go. Integration guides for SAP S/4HANA KSA edition, Oracle NetSuite KSA, Microsoft Dynamics 365 Business Central, and Zoho Books KSA. Webhooks: invoice cleared, invoice rejected, CSID nearing expiry, credit note issued.",
      logos: ["Node.js", "Python", "PHP", "Java", "Go", "SAP S/4HANA KSA", "Oracle NetSuite KSA", "Microsoft Dynamics 365", "Zoho Books KSA"],
      cta: { label: "Read integration guide" },
    },
    pricing: {
      heading: "Pricing",
      body: "KSA pricing in SAR. Sandbox free.",
      tiers: [
        { name: "Developer", price: "Free", cta: "Get sandbox keys", points: ["Sandbox access", "No production"] },
        { name: "Startup", price: "Custom", cycle: "(SAR)", featured: true, cta: "Talk to sales", points: ["Production access", "Up to 25,000 invoices/year", "Email support"] },
        { name: "Scale", price: "Custom", cta: "Talk to sales", points: ["Unlimited invoices", "Dedicated infrastructure", "99.95% SLA", "KSA-specific support team"] },
      ],
      note: "[KSA pricing in SAR; placeholders only.]",
      cta: { label: "Talk to KSA solutions team" },
    },
    faq: {
      heading: "Frequently asked questions.",
      items: [
        { q: "How does WhiteBooks handle the CSID lifecycle?", a: "WhiteBooks generates the CSR, submits it to ZATCA, retrieves the issued CSID, stores it encrypted, and manages renewal before expiry. Your team never directly handles the certificate or the cryptography." },
        { q: "What's the difference between standard and simplified tax invoices?", a: "Standard tax invoices (B2B and high-value B2C over SAR 1,000) must be cleared by ZATCA in real time before reaching the buyer. Simplified invoices (B2C under SAR 1,000) are signed locally and reported to ZATCA within 24 hours." },
        { q: "Does WhiteBooks generate the QR code automatically?", a: "Yes. Every cleared invoice includes the ZATCA-compliant QR code with the required fields (supplier VAT, timestamp, total, VAT amount, hash) embedded in both XML and rendered output." },
        { q: "Can I use this API alongside the Indian e-Invoice API?", a: "Yes. The same WhiteBooks account supports both APIs with separate keys per jurisdiction. Indian-headquartered businesses with KSA operations commonly use both." },
        { q: "How does sandbox differ from production?", a: "Sandbox is bit-for-bit identical to production behavior, including ZATCA simulator responses for clearance, rejection, and certificate states. What works in dev works in prod." },
        { q: "What KSA-specific compliance does WhiteBooks track?", a: "WhiteBooks tracks ZATCA wave notifications, schema version updates, CSID renewal windows, and VAT rate changes. Customers are alerted to compliance changes before they take effect." },
      ],
    },
    closing: {
      h2: (
        <>
          ZATCA Phase 2, behind <span className="text-[var(--brand)]">six clean endpoints.</span>
        </>
      ),
      body:
        "If your product sells into Saudi Arabia or your business operates there, ZATCA Phase 2 is non-optional. WhiteBooks is one of the few API providers operating ZATCA-approved infrastructure alongside a GSTN GSP license.",
      primaryCta: { label: "Get sandbox keys" },
      secondaryCta: { label: "Talk to KSA solutions team" },
    },
  },
};

export { PAGES_3 };
