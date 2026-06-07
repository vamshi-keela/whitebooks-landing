import React from 'react';
import { SubPageData } from '@/types/pages';
import { ProductMap } from '@/components/product-map/ProductMap';

const PAGES: Record<string, SubPageData> = {
  "accounting": {
    headerMode: "softwares",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Softwares", href: "/softwares" },
      { label: "Accounting Software" },
    ],
    seo: {
      title: "Cloud Accounting Software for Indian Businesses | Whitebooks",
      description: "Cloud books with automated journal entries, multi-entity consolidation, and GST-aware ledger structure. Integrates with Whitebooks GST, e-Invoice, and e-Way Bill softwares.",
      canonical: "https://whitebooks.in/softwares/accounting",
      keywords: "cloud accounting software India, accounting software for Indian businesses, replace Tally, multi-entity accounting, GST-aware accounting, automated journal posting",
      robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      aiSummary: "Whitebooks Accounting Software is a cloud-based accounting platform for Indian businesses that automatically posts journal entries from sales, purchase, and bank data. It supports multi-entity consolidation, GST-aware ledger structure, and audit-ready reports. Integrates natively with Whitebooks GST, e-Invoice, and e-Way Bill softwares.",
      og: { title: "Cloud Accounting Software for Indian Businesses | Whitebooks", description: "Automated journal posting, multi-entity consolidation, GST-aware ledger. Cloud-native replacement for Tally.", image: "https://whitebooks.in/og-image.png", type: "website" },
      twitter: { card: "summary_large_image", title: "Cloud Accounting Software for Indian Businesses | Whitebooks", description: "Books that post themselves. GST-aware, multi-entity, audit-ready." },
    },
    extra: <ProductMap active="accounting" />,
    hero: {
      eyebrow: "Accounting Software | Cloud-native, GST-aware",
      title: (
        <>
          Books that <span className="text-[var(--brand)]">post themselves.</span> From your invoices, your bank, your ERP.
        </>
      ),
      sub: (
        <>
          Whitebooks Accounting reads your sales, purchase, and bank data and posts journal entries automatically. Your accountant reviews and certifies — not enters. <strong>Multi-entity, GST-aware, audit-ready by design.</strong>
        </>
      ),
      primaryCta: { label: "Start Free Trail" },
      secondaryCta: { label: "Book a 20-min Demo" },
      // micro: "Moving from Tally? <a href='#'>We import your 3 most recent years of books in under 2 hours →</a>",
    },
    problem: {
      heading: (
        <>
          Three reasons your books still cost <span className="text-[var(--brand)]">more than they should.</span>
        </>
      ),
      items: [
        {
          title: "Manual journal entry is a 20th-century job",
          body:
            "Most Indian businesses still type sales and purchase entries into desktop accounting software, one invoice at a time. Whitebooks reads your raw transactions — from your billing system, your e-invoice records, your bank feed — and posts journals automatically. Your accountant becomes a reviewer, not a typist.",
        },
        {
          title: "Tally was built for one company. You probably run more.",
          body:
            "Group structures with multiple operating companies, multiple GSTINs, and multiple states are the norm in India — not the exception. Whitebooks handles multi-entity consolidation, inter-company elimination, and cross-GSTIN ISD distribution as core features, not paid add-ons.",
        },
        {
          title: "Year-end is where everything breaks",
          body:
            "Most accounting software treats the financial year close as an event. Whitebooks treats it as a continuous process — books are audit-ready every day, not after a six-week scramble in April.",
        },
      ],
    },
    features: {
      heading: (
        <>
          What Whitebooks Accounting <span className="text-[var(--brand)]">does.</span>
        </>
      ),
      layout: "guide",
      items: [
        { visualKey: "auto-journal", navLabel: "Auto journal posting", title: "Automated journal posting", body: "Sales invoices, purchase bills, bank transactions, and payment receipts auto-post to the correct ledgers with the correct GST classifications. Your accountant reviews exceptions, not norms." },
        { visualKey: "multi-entity", navLabel: "Multi-entity rollup", title: "Multi-entity, multi-GSTIN consolidation", body: "One workspace, every operating company. Consolidated P&L and balance sheet across entities with one click. Inter-company eliminations handled automatically. Inter-GSTIN ISD distribution under the post-2024 ISD mandate is built in." },
        { visualKey: "gst-chart", navLabel: "GST-aware ledger", title: "GST-aware chart of accounts", body: "The ledger structure understands GST. Output tax, input tax, RCM, ISD, IGST, CGST, SGST, and UTGST have their own positions and post automatically based on transaction type and place of supply." },
        { visualKey: "bank-recon", navLabel: "Bank reconciliation", title: "Bank reconciliation, automated", body: "Connect bank feeds from 100+ Indian banks. Auto-match receipts and payments to ledger entries. Surface unmatched items for review — not the matched ones." },
        { visualKey: "audit-reports", navLabel: "Audit-ready reports", title: "Audit-ready reports", body: "P&L, balance sheet, trial balance, ledger-wise summaries, GST reconciliation, depreciation schedules — every report exportable as PDF, Excel, or directly to your auditor's portal." },
        { visualKey: "roles", navLabel: "Role-based access", title: "Role-based access for finance teams", body: "Junior accountants enter. Senior accountants review. CFOs see the dashboard. Auditors get read-only with audit trail. Permissions are granular, not 'admin or not.'" },
        { visualKey: "continuous-close", navLabel: "Continuous close", title: "Continuous close", body: "Daily reconciliation, daily P&L, daily AP/AR aging. Month-end is a 30-minute review, not a 30-day project. Year-end is a 2-day certification, not a 2-month sprint." },
        { visualKey: "native-integration", navLabel: "Native integration", title: "Native integration with Whitebooks GST and e-Invoice", body: "An e-invoice generated in Whitebooks e-Invoice automatically becomes a sales journal here. A GSTR-2B reconciliation in Whitebooks GST automatically reflects in your purchase ledger. No CSV exports, no double entry." },
      ],
    },
    integrations: {
      heading: "Connect your bank, your ERP, your billing system.",
      body:
        "100+ Indian banks via direct feed and aggregator partners. SAP, Oracle NetSuite, Microsoft Dynamics 365, Tally migration, Zoho Books migration, Marg, Busy, Vyapar.",
      logos: ["SAP S/4HANA", "Oracle NetSuite", "Microsoft Dynamics 365", "Tally Prime", "Zoho Books", "ICICI", "HDFC", "Axis", "SBI", "Razorpay X", "Marg", "Busy", "30+ more"],
      cta: { label: "See all integrations" },
    },
    ai: {
      heading: (
        <>
          What the AI actually does <span className="text-[var(--brand)]">inside Whitebooks Accounting.</span>
        </>
      ),
      items: [
        { title: "Transaction auto-classification", body: "A model trained on 10 crore+ Indian invoices classifies your transactions into the correct ledger heads — even when vendor names are inconsistent, descriptions are vague, or the same vendor sells under multiple categories." },
        { title: "Anomaly detection", body: "Flags transactions that don't fit your historical pattern. A vendor that's never billed above ₹50,000 suddenly invoices ₹4,80,000? Flagged. A ledger that posts a credit when it should always debit? Flagged. Catches fraud, mistakes, and misclassification." },
        { title: "Audit Q&A", body: <>Ask <code>&quot;show me all transactions above ₹10 lakh in Q3 from new vendors&quot;</code> or <code>&quot;variance in marketing spend month-over-month?&quot;</code> — answers draw from live data, with source rows linked.</> },
        { title: "Bank reconciliation matching", body: "A fuzzy matching model reconciles bank narration to your books — handles UPI references, NEFT codes, payment gateway descriptors, and partial settlements. 90%+ auto-match on first pass." },
      ],
      note: (
        <>
          <strong>Built on the Anthropic API.</strong> Your data never used to train models.
        </>
      ),
    },
    pricing: {
      heading: "Pricing",
      body: "Each Whitebooks software is priced independently. Bundle discounts apply when you license two or more.",
      tiers: [
        { name: "Solo / SMB", price: "₹7,999", cycle: "/year", cta: "Start free", points: ["1 entity", "Unlimited transactions", "Bank feed for 2 accounts", "Email support"] },
        { name: "Growth", price: "₹29,999", cycle: "/year", featured: true, cta: "Start free trial", points: ["Up to 5 entities", "Multi-GSTIN", "Unlimited bank feeds", "Priority support", "Bundle discount with GST Software"] },
        { name: "Enterprise", price: "Custom", cta: "Talk to sales", points: ["Unlimited entities", "SAP/Oracle connectors", "SSO", "Audit log SIEM export", "Dedicated CSM"] },
      ],
      note: "[Pricing placeholders.]",
      cta: { label: "See full pricing" },
    },
    faq: {
      heading: "Frequently asked questions.",
      items: [
        { q: "How is Whitebooks Accounting different from Tally?", a: "Three differences. First, Whitebooks is cloud-native — multi-user, accessible anywhere, no desktop install or backup management. Second, Whitebooks auto-posts journals from raw transaction data rather than requiring manual entry per invoice. Third, Whitebooks handles multi-entity consolidation as a core feature, not via separate Tally licenses per company." },
        { q: "Can I migrate from Tally Prime?", a: "Yes. Whitebooks imports the last 3 years of your Tally data — masters, ledgers, transactions, opening balances — in under 2 hours for a typical SMB. Larger groups with multiple companies take longer, with white-glove migration support included." },
        { q: "Does Whitebooks Accounting handle Schedule III balance sheet format?", a: "Yes. Whitebooks generates Schedule III compliant balance sheets and statements of P&L by default. Notes to accounts can be drafted in-platform with auto-populated figures." },
        { q: "How does Whitebooks handle Ind AS / Indian GAAP differences?", a: "Whitebooks supports both Indian GAAP and Ind AS reporting frameworks. Customers reporting under Ind AS can configure separate ledger views and consolidated statements per framework." },
        { q: "Can I access Whitebooks Accounting offline?", a: "Whitebooks is cloud-native — internet access is required to use the product. Offline data entry can be captured via the mobile app and synced when connected. Your data is always backed up automatically." },
        { q: "Is my financial data secure?", a: "All data is hosted in ISO 27001-certified Indian data centers. AES-256 encryption at rest, TLS 1.3 in transit. Whitebooks operates under direct GSTN oversight as a licensed GSP, audited annually. No third-party data sharing." },
      ],
    },
    closing: {
      h2: (
        <>
          Stop typing. <span className="text-[var(--brand)]">Start reviewing.</span>
        </>
      ),
      body:
        "Most Whitebooks Accounting customers cut monthly bookkeeping time by 60% in their first quarter. Try it free for 14 days. Bring your last quarter's data — see what your books look like when they post themselves.",
      primaryCta: { label: "Book a 20-min Demo" },
      secondaryCta: { label: "Start Free Trail", href: "https://accounts.whitebooks.in/login" },
    },
  },

  "gst-software": {
    headerMode: "softwares",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Softwares", href: "/softwares" },
      { label: "GST Software" },
    ],
    seo: {
      title: "GST Filing Software for CA Firms and Finance Teams | Whitebooks",
      description: "File GSTR-1, 3B, 9, and 9C across unlimited GSTINs. Auto-reconcile GSTR-2A/2B in under 60 seconds. Built by a GSTN-licensed GSP. Trusted by 5,000+ CA firms and 12,000+ businesses.",
      canonical: "https://whitebooks.in/softwares/gst",
      keywords: "GST software India, GSTR filing, GSTR-1 software, GSTR-3B software, GST reconciliation, CA firm GST software, multi-GSTIN filing, ClearTax alternative",
      robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      aiSummary: "Whitebooks GST Software is a cloud-based GST filing and reconciliation platform for CA firms and finance teams in India. It supports GSTR-1, 1A, 3B, 4, 5, 6, 7, 8, 9, 9A, 9C, IFF, ITC-04, and CMP-08 filing across unlimited GSTINs from one workspace. Built by a directly licensed GST Suvidha Provider (GSP) and integrates natively with Tally, SAP, and 40+ ERPs.",
      og: { title: "GST Filing Software for CA Firms and Finance Teams | Whitebooks", description: "File all GSTRs across unlimited GSTINs. Auto-reconcile 2A/2B in 60 seconds. Direct GSP license.", image: "https://whitebooks.in/og-image.png", type: "website" },
      twitter: { card: "summary_large_image", title: "GST Filing Software for CA Firms | Whitebooks", description: "GSTR-1, 3B, 9, 9C across unlimited GSTINs. 47-point pre-submission validator. GSP-licensed." },
    },
    extra: <ProductMap active="gst" />,
    hero: {
      eyebrow: "GST Software | GSP-Licensed",
      title: (
        <>
          GST filing that <span className="text-[var(--brand)]">thinks before you click submit.</span>
        </>
      ),
      sub: (
        <>
          File GSTR-1, 3B, 9, and 9C across unlimited GSTINs from one workspace. Auto-reconcile GSTR-2B against your purchase register in under 60 seconds. Built on a direct GSP license — <strong>no resold pipes.</strong>
        </>
      ),
      primaryCta: { label: "Start Free Trail" },
      secondaryCta: { label: "Book a 20-min Demo" },
      // micro:
      //   "Migrating from ClearTax TaxCloud, Tally, or Zoho? <a href='#'>We import your prior 36 months of returns →</a>",
    },
    problem: {
      heading: (
        <>
          Three problems most GST software <span className="text-[var(--brand)]">still hasn&apos;t solved.</span>
        </>
      ),
      items: [
        { title: "Reconciliation is still a nightmare", body: "ClearTax and Tally hand you a mismatch report and walk away. Whitebooks' matching engine handles fuzzy vendor names, rounded values, partially settled invoices, and split GSTINs — the cases where exact-match logic fails. 95%+ of mismatches resolve without human review." },
        { title: "You only see errors after the portal rejects them", body: "Whitebooks validates against the 47 most common GSTN rejection codes before you click file. If GSTR-3B will fail, you know on screen — not at 11:47pm when the portal returns a cryptic error." },
        { title: "Your software doesn't know what year it is", body: "GST 2.0 rates went live September 2025. The 30-day IRN window arrived. IMS launched. Rule 37A reversal logic changed. Whitebooks shipped each of these inside 72 hours of notification. Most competitors are still catching up." },
      ],
    },
    features: {
      heading: (
        <>
          What Whitebooks GST <span className="text-[var(--brand)]">does.</span>
        </>
      ),
      layout: "guide",
      items: [
        { visualKey: "audit-reports", navLabel: "Every GSTR filing", title: "File every GSTR your business needs", body: "GSTR-1, 1A, 3B, 4, 5, 6, 7, 8, 9, 9A, 9C, IFF, ITC-04, and CMP-08 — all supported. Bulk filing across multiple GSTINs is included on CA Firm and Enterprise plans." },
        { visualKey: "bank-recon", navLabel: "2A · 2B · IMS recon", title: "Auto-reconcile 2A, 2B, and IMS", body: "Pull GSTR-2A, 2B, and IMS data from GSTN automatically. Match against your purchase register in under 60 seconds. Average review queue: 3% of total invoices." },
        { visualKey: "multi-entity", navLabel: "Multi-GSTIN workspace", title: "Multi-GSTIN, multi-client workspace", body: "Add a client once. File across all their GSTINs without re-authenticating. Switch between clients in two clicks, not two logins. Role-based access for partner, manager, article, reviewer." },
        { visualKey: "gst-chart", navLabel: "47-point validator", title: "Pre-submission validator", body: "The 47-point validator scans every return for common GSTN rejection causes — HSN errors, place-of-supply mismatches, RCM misclassification, ISD distribution gaps, ITC blocked under Section 17(5) — before submission." },
        { visualKey: "audit-reports", navLabel: "Working paper auto-gen", title: "Working paper auto-generation", body: "Every reconciliation, every adjustment, every notice response — logged automatically with user, timestamp, source row, and reason. Export as PDF for audit, or hand to the next reviewer mid-cycle." },
        { visualKey: "continuous-close", navLabel: "Notice tracker", title: "Notice tracker", body: "Section 61, 73, 74 notices imported automatically from your client GSTINs. Assigned to a partner. Tracked to resolution. Linked back to the return that caused them." },
        { visualKey: "auto-journal", navLabel: "Bulk operations", title: "Bulk operations", body: "Reconcile 500 clients in one job. Push GSTR-1 for 200 clients in one queue. Bulk is a first-class action, not a hack." },
        { visualKey: "native-integration", navLabel: "White-label portal", title: "White-label client portal", body: "Each of your clients gets a branded portal under your firm's name where they upload invoices, see their compliance status, and pay you. White-label included on Growth plan." },
      ],
    },
    integrations: {
      heading: "SAP, Tally, and 40+ ERPs. Zero CSV uploads.",
      body:
        "Push transactional data from your ERP to Whitebooks in real time. Native connectors built by Whitebooks engineers, maintained against every ERP version upgrade.",
      logos: ["SAP S/4HANA", "SAP ECC", "Tally Prime", "Oracle NetSuite", "Microsoft Dynamics 365", "Zoho Books", "Odoo", "Sage", "QuickBooks", "Marg", "Busy", "30+ more"],
      cta: { label: "See all integrations" },
    },
    ai: {
      heading: (
        <>
          What the AI actually does <span className="text-[var(--brand)]">inside Whitebooks GST.</span>
        </>
      ),
      items: [
        { title: "Fuzzy vendor matching", body: <>A model trained on 10 crore+ Indian invoices reconciles <code>&quot;M/s. RAJESH ENTERPRISES&quot;</code> with <code>&quot;Rajesh Enterprises Pvt Ltd&quot;</code> with <code>&quot;RAJESH ENT.&quot;</code> — without you maintaining alias tables.</> },
        { title: "Notice risk scoring", body: "Each GSTR-3B you're about to file gets a 0–100 notice risk score, based on ITC variance, turnover trend, HSN concentration, and prior notice history. Above 70, Whitebooks suggests what to recheck." },
        { title: "Natural-language queries", body: <>Type <code>&quot;show me all October vendors with ITC variance above 10%&quot;</code> or <code>&quot;which clients haven&apos;t filed 3B for September?&quot;</code> — answers draw from your live data with source rows linked.</> },
        { title: "Auto-categorization of unmatched invoices", body: "Mismatches get auto-classified: vendor unfiled, invoice missing in PR, rate mismatch, GSTIN typo, time-of-supply error. Each class routes to a different resolution workflow." },
      ],
      note: (
        <>
          <strong>Built on the Anthropic API.</strong> Your data never used to train models.
        </>
      ),
    },
    pricing: {
      heading: "Pricing",
      body: "Pricing scales with GSTIN count and partner seats. Bundle discounts apply on the CA Firm plan when combined with Accounting or e-Invoice.",
      tiers: [
        { name: "Solo CA / SMB", price: "₹4,999", cycle: "/year", cta: "Start free", points: ["1 GSTIN", "Unlimited GSTR filings", "2A/2B reconciliation", "Email support"] },
        { name: "CA Firm", price: "₹24,999", cycle: "/year, per partner", featured: true, cta: "Start free trial", points: ["Up to 50 client GSTINs", "Multi-user", "Working papers", "White-label client portal", "Priority support"] },
        { name: "Enterprise", price: "Custom", cta: "Talk to sales", points: ["Unlimited GSTINs", "SAP/Tally connectors", "IMS bulk ops", "99.95% SLA", "Dedicated CSM"] },
      ],
      note: "[Pricing placeholders.]",
      cta: { label: "See full pricing" },
    },
    faq: {
      heading: "Frequently asked questions.",
      items: [
        { q: "Does Whitebooks GST Software file GSTR-9 and 9C?", a: "Yes. Whitebooks supports GSTR-1, 1A, 3B, 4, 5, 6, 7, 8, 9, 9A, 9C, IFF, ITC-04, and CMP-08. Bulk filing across multiple GSTINs is included on CA Firm and Enterprise plans." },
        { q: "Can I file from Tally without exporting CSVs?", a: "Yes. The Whitebooks Tally Connector pushes data directly from Tally Prime to Whitebooks every 5 minutes. No CSV exports, no manual mapping, no broken reconciliations from version mismatches." },
        { q: "How does Whitebooks handle the IMS (Invoice Management System)?", a: "Whitebooks pulls your IMS dashboard automatically, lets you accept/reject/hold inward invoices in bulk, and tracks the impact of any rejection on your GSTR-3B liability. Rule 37A reversals are flagged before they hit your books." },
        { q: "What's the difference between Whitebooks and ClearTax for GST filing?", a: "Whitebooks holds a direct GSP license from GSTN. Whitebooks builds its own SAP and Tally connectors in-house. Whitebooks has not discontinued any product line in 2025 — CAs migrating from ClearTax TaxCloud cite continuity as a primary reason for switching." },
        { q: "How long does migration take?", a: "For a CA firm with up to 100 clients, typical migration takes 30–60 minutes. Whitebooks imports prior 36 months of GSTR filings, working papers, vendor masters, and client master data. White-glove migration is free on CA Firm and Enterprise plans." },
        { q: "Does Whitebooks support GST 2.0 rates (5%, 18%, 40%)?", a: "Yes. Whitebooks applied the GST 2.0 rate structure from September 22, 2025. HSN-level rate mapping, post-sale discount handling under revised Section 15, and the new refund mechanisms are all live." },
        { q: "Is my data secure?", a: "All data is hosted in ISO 27001-certified Indian data centers. AES-256 at rest, TLS 1.3 in transit, audited annually under GSTN oversight. No third-party data sharing, no use of customer data for AI model training." },
      ],
    },
    closing: {
      h2: (
        <>
          File faster. File cleaner. <span className="text-[var(--brand)]">File from one workspace.</span>
        </>
      ),
      body:
        "Median filing time per GSTIN per month, across 12,000+ Whitebooks customers: 14 minutes. Most CA firms switching from ClearTax or Tally hit that benchmark inside two filing cycles.",
      primaryCta: { label: "Book a 20-min Demo" },
      secondaryCta: { label: "Start Free Trail", href: "https://accounts.whitebooks.in/login" },
    },
  }
};

export { PAGES };
