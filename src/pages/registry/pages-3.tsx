import React from 'react';
import { SubPageData } from '@/types/pages';

const PAGES_3: Record<string, SubPageData> = {

  /* -------------------- GST API -------------------- */
  "gst-api": {
    headerMode: "apis",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "APIs", href: "/apis" },
      { label: "GST API" },
    ],
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
      secondaryCta: { label: "Read the docs" },
      // micro: "Used in production by <a href='#'>Razorpay, Pharmeasy, Cars24, WheelsEye, and 200+ teams</a>.",
    },
    problem: {
      heading: (
        <>
          Three reasons most &quot;GST APIs&quot; <span className="text-[var(--brand)]">disappoint developers.</span>
        </>
      ),
      items: [
        { title: "Resold APIs add latency", body: "Most 'GST APIs' on the market are resold from a real GSP — your request goes through their server before it reaches GSTN. That's 200–600ms of extra latency on every call. Whitebooks holds its own GSP license. Your request goes one hop, not two." },
        { title: "XML, SOAP, and undocumented quirks", body: "Some providers wrap the GSTN's underlying APIs without modernization — leaving you to handle XML payloads, SOAP envelopes, and undocumented error codes. Whitebooks normalizes everything to clean JSON with well-typed errors." },
        { title: "Sandbox that doesn't match production", body: "Sandbox environments at most providers respond differently from production — different rate limits, different error shapes, different success conditions. Whitebooks sandbox is bit-for-bit identical to production behavior." },
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
        { endpoint: "POST /v1/gstr/file", body: "File any GSTR — 1, 1A, 3B, 4, 5, 6, 7, 8, 9, 9A, 9C, IFF, ITC-04, CMP-08. JSON in, ARN out. Idempotency key supported.", title: "" },
        { endpoint: "GET /v1/gstr/2a", body: "Pull GSTR-2A and 2B data for any return period, any GSTIN under delegated authentication. Returns parsed JSON with vendor-wise breakdown.", title: "" },
        { endpoint: "GET /v1/gstin/validate", body: "Validate any GSTIN against the GSTN registry. Returns legal name, trade name, registration status, last filing date, state code, and PAN linkage.", title: "" },
        { endpoint: "GET /v1/hsn/search", body: "Search HSN and SAC codes by keyword or code. Returns description, current GST 2.0 rate, chapter, and last revision date.", title: "" },
        { endpoint: "POST /v1/ims/accept", body: "Manage Invoice Management System (IMS) actions in bulk. Accept, reject, or hold inward invoices, with reason codes. Returns updated GSTR-3B liability preview.", title: "" },
        { endpoint: "GET /v1/notice/list", body: "Pull Section 61, 73, 74 notices issued against any of your monitored GSTINs. Returns notice type, date, amount in dispute, and response deadline.", title: "" },
        { endpoint: "POST /v1/refund/file", body: "File GST refund applications (RFD-01, RFD-10) via API. Supports refund of unutilized ITC, IGST paid on exports, and inverted duty structure.", title: "" },
        { endpoint: "Webhooks", body: "Subscribe to events: GSTR filed, notice received, GSTR-2B available, refund status changed. HMAC-signed payloads, replay protection, exponential backoff on delivery.", title: "" },
      ],
    },
    integrations: {
      heading: "SDKs, frameworks, and the tools you already use.",
      body:
        "Official SDKs in Node.js, Python, PHP, Java, and Go. Community SDKs in Ruby, .NET, Elixir. All on github.com/whitebooks. First-class support for Express, FastAPI, Django, Laravel, Spring Boot, and Gin.",
      logos: ["Node.js", "Python", "PHP", "Java", "Go", "Ruby", ".NET", "Elixir", "Postman", "OpenAPI 3.1", "Express", "FastAPI", "Django", "Laravel"],
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
        { title: "Use with the Whitebooks AI engine", body: "Combine the GST API with the Whitebooks reconciliation models to build your own fraud detection, ITC optimization, or anomaly flagging — directly on your customers' data, in your product." },
      ],
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
        { q: "Is Whitebooks a GSP or a reseller?", a: "Whitebooks holds a direct GSP license from GSTN, under BVM IT Consulting Services India Pvt. Ltd. We do not resell another GSP's pipe. This is the reason for the latency and uptime difference versus most other API providers." },
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
      secondaryCta: { label: "Read Guides", href: "" },
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
      secondaryCta: { label: "Read the docs" },
    },
    problem: {
      heading: (
        <>
          Three reasons e-invoicing integrations <span className="text-[var(--brand)]">fail in production.</span>
        </>
      ),
      items: [
        { title: "The 30-day window is unforgiving", body: "For AATO above ₹10 crore, invoices not reported to the IRP within 30 days are invalid for ITC. If your integration ages out invoices silently, your customers lose money. Whitebooks surfaces window-at-risk invoices via webhook before they expire." },
        { title: "The IRP has unplanned outages", body: "Around month-end, IRP latency spikes and intermittent failures are common. Naive integrations fail; resilient ones queue and retry. Whitebooks queues and retries on your behalf, surfacing only the ones requiring human decision." },
        { title: "Schema changes break integrations", body: "The IRP schema has changed multiple times since 2020. Each change breaks integrations that hardcoded the old schema. Whitebooks abstracts the schema — you call our API, we adapt to IRP changes." },
      ],
    },
    features: {
      label: "Endpoints",
      heading: <>The endpoints.</>,
      items: [
        { endpoint: "POST /v1/einvoice/create", body: "Generate IRN, signed QR code, and acknowledgment number. JSON in, full response in <200ms p50. Idempotency key supported.", title: "" },
        { endpoint: "POST /v1/einvoice/cancel", body: "Cancel an IRN within 24 hours of generation. Returns updated IRP state. After 24 hours, redirects you to the credit-note flow.", title: "" },
        { endpoint: "POST /v1/einvoice/credit-note", body: "Generate a credit note linked to an existing IRN. Auto-populates buyer GSTIN, place of supply, and reverse logic. Returns new IRN for the credit note.", title: "" },
        { endpoint: "POST /v1/einvoice/debit-note", body: "Generate a debit note linked to an existing IRN. Same semantics as credit note, opposite direction.", title: "" },
        { endpoint: "POST /v1/einvoice/bulk", body: "Submit up to 10,000 IRN requests in one batch. Returns batch ID; poll status or subscribe via webhook.", title: "" },
        { endpoint: "GET /v1/einvoice/{irn}", body: "Retrieve full IRN details, status, and history. Useful for reconciliation and audit.", title: "" },
      ],
    },
    integrations: {
      heading: "SDKs, code examples, and integration guides.",
      body:
        "Official SDKs in Node.js, Python, PHP, Java, Go. Working integrations for Stripe-style billing platforms, Razorpay merchant flows, custom ERPs, and bulk dispatch workflows. HMAC-signed webhooks for every state transition.",
      logos: ["Node.js", "Python", "PHP", "Java", "Go", "Webhooks", "Postman", "OpenAPI 3.1"],
      cta: { label: "Read integration guide" },
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
        { title: "Compliance copilot for end users", body: "Embed Whitebooks' compliance copilot in your product via the AI Q&A endpoint. Your users ask questions in natural language; the copilot answers from their live data." },
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
        { q: "What happens if the IRP is down?", a: "Whitebooks queues your IRN requests and retries with exponential backoff. You receive a 'pending' status immediately; the IRN comes back via webhook once the IRP responds. Your code doesn't need to handle IRP outages." },
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
        "The ₹5 crore AATO mandate goes live April 1, 2026. Billing systems and ERPs serving Indian SMBs need e-invoicing capability — and most can't build it from scratch in time. Whitebooks ships the capability in a sprint.",
      primaryCta: { label: "Get sandbox keys" },
      secondaryCta: { label: "Read Guides" },
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
      secondaryCta: { label: "Read the docs" },
    },
    problem: {
      heading: (
        <>
          Three reasons e-way bill integrations <span className="text-[var(--brand)]">break at scale.</span>
        </>
      ),
      items: [
        { title: "Re-keying data from the invoice system", body: "Most integrations require pushing all invoice and buyer data again to generate the e-way bill. Whitebooks reads existing IRNs and pre-populates 90% of the e-way bill fields automatically." },
        { title: "Validity expiry mid-transit", body: "Trucks break down. Routes divert. Bills expire. Whitebooks emits a webhook 4 hours before any e-way bill expires, giving your dispatch team time to extend." },
        { title: "Consolidated bills for multi-invoice trips", body: "When one vehicle carries 30 consignments, you generate one consolidated e-way bill — not 30. Most APIs don't expose consolidated bills cleanly; Whitebooks does." },
      ],
    },
    features: {
      label: "Endpoints",
      heading: <>The endpoints.</>,
      items: [
        { endpoint: "POST /v1/ewaybill/create", body: "Generate an e-way bill for a single consignment. Optional irn field auto-populates buyer, item, and tax fields from the source invoice.", title: "" },
        { endpoint: "POST /v1/ewaybill/create-consolidated", body: "Generate a consolidated e-way bill for a multi-invoice vehicle trip. Pass an array of IRNs or invoice IDs.", title: "" },
        { endpoint: "POST /v1/ewaybill/extend", body: "Extend validity within 8 hours before or after expiry. Requires reason code (vehicle breakdown, transshipment, natural calamity).", title: "" },
        { endpoint: "POST /v1/ewaybill/cancel", body: "Cancel within 24 hours of generation. After 24 hours, the bill auto-expires per its validity period.", title: "" },
        { endpoint: "POST /v1/ewaybill/update-vehicle", body: "Update vehicle number mid-transit (for transshipment). Log every vehicle change with timestamp and authorized user.", title: "" },
        { endpoint: "GET /v1/ewaybill/{ewb_no}", body: "Retrieve full e-way bill details, validity, and status history. Includes pin-to-pin distance calculation and computed validity.", title: "" },
      ],
    },
    integrations: {
      heading: "Built for logistics, WMS, and TMS platforms.",
      body:
        "SDKs in Node.js, Python, PHP, Java, Go. Integration patterns for warehouse management dispatch flows, transporter onboarding, and freight brokerage platforms. Webhooks: bill generated, bill approaching expiry (4hr alert), bill expired, vehicle updated, bill cancelled.",
      logos: ["Node.js", "Python", "PHP", "Java", "Go", "WheelsEye", "Pharmeasy", "WMS connectors", "TMS connectors"],
      cta: { label: "Read integration guide" },
    },
    ai: {
      heading: (
        <>
          What the AI <span className="text-[var(--brand)]">does inside the API.</span>
        </>
      ),
      items: [
        { title: "Realistic transit prediction", body: "Beyond GSTN's pin-to-pin calculation, Whitebooks predicts realistic transit time based on route history, transporter performance, and seasonal factors. Returned in every bill creation response." },
        { title: "Anomaly flagging", body: "Webhook events include flags for invalid vehicle number formats, unknown transporter IDs, distances outside historical norms, and bills generated outside typical dispatch hours." },
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
        { q: "Can I auto-generate an e-way bill from an IRN?", a: "Yes. Pass the irn field in the create request; Whitebooks pulls all matching fields from the source invoice and pre-populates the e-way bill. You only need to add vehicle number, distance, and transport mode." },
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
        "Pharmeasy generates e-way bills for 14 warehouses via the Whitebooks API. WheelsEye uses the API for fleet onboarding and transporter invoice reconciliation. Same SLA, same direct GSP pipe.",
      primaryCta: { label: "Get sandbox keys" },
      secondaryCta: { label: "Read Guides" },
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
      secondaryCta: { label: "Talk to KSA solutions team" },
    },
    problem: {
      heading: (
        <>
          Three reasons ZATCA Phase 2 integrations are <span className="text-[var(--brand)]">painful to build alone.</span>
        </>
      ),
      items: [
        { title: "Cryptographic signing is not a weekend project", body: "ZATCA Phase 2 requires generating a CSR, retrieving a CSID from ZATCA, signing every invoice with the certificate, and managing renewal — all under specific cryptographic standards. Whitebooks handles certificate lifecycle entirely." },
        { title: "FATOORAH integration is real-time and unforgiving", body: "Standard tax invoices must be cleared by ZATCA before they reach the buyer. Latency, retries, and error handling matter. Whitebooks runs production-grade infrastructure with documented SLAs." },
        { title: "Bilingual invoice generation is its own engineering problem", body: "Right-to-left rendering, Arabic-English field pairing, currency formatting per ZATCA spec — most engineering teams underestimate this work. Whitebooks ships it as a default." },
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
        { endpoint: "POST /v1/ksa/csid/renew", body: "Trigger CSID renewal before expiry. Whitebooks handles the ZATCA portal interaction.", title: "" },
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
        { q: "How does Whitebooks handle the CSID lifecycle?", a: "Whitebooks generates the CSR, submits it to ZATCA, retrieves the issued CSID, stores it encrypted, and manages renewal before expiry. Your team never directly handles the certificate or the cryptography." },
        { q: "What's the difference between standard and simplified tax invoices?", a: "Standard tax invoices (B2B and high-value B2C over SAR 1,000) must be cleared by ZATCA in real time before reaching the buyer. Simplified invoices (B2C under SAR 1,000) are signed locally and reported to ZATCA within 24 hours." },
        { q: "Does Whitebooks generate the QR code automatically?", a: "Yes. Every cleared invoice includes the ZATCA-compliant QR code with the required fields (supplier VAT, timestamp, total, VAT amount, hash) embedded in both XML and rendered output." },
        { q: "Can I use this API alongside the Indian e-Invoice API?", a: "Yes. The same Whitebooks account supports both APIs with separate keys per jurisdiction. Indian-headquartered businesses with KSA operations commonly use both." },
        { q: "How does sandbox differ from production?", a: "Sandbox is bit-for-bit identical to production behavior, including ZATCA simulator responses for clearance, rejection, and certificate states. What works in dev works in prod." },
        { q: "What KSA-specific compliance does Whitebooks track?", a: "Whitebooks tracks ZATCA wave notifications, schema version updates, CSID renewal windows, and VAT rate changes. Customers are alerted to compliance changes before they take effect." },
      ],
    },
    closing: {
      h2: (
        <>
          ZATCA Phase 2, behind <span className="text-[var(--brand)]">six clean endpoints.</span>
        </>
      ),
      body:
        "If your product sells into Saudi Arabia or your business operates there, ZATCA Phase 2 is non-optional. Whitebooks is one of the few API providers operating ZATCA-approved infrastructure alongside a GSTN GSP license.",
      primaryCta: { label: "Get sandbox keys" },
      secondaryCta: { label: "Talk to KSA solutions team" },
    },
  },
};

export { PAGES_3 };
