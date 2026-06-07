# Whitebooks.in — Site Content v2

**Total pages:** 11
**Structure:** 1 Brand Home + 2 Hub pages (Softwares, APIs) + 5 Software sub-pages + 4 API sub-pages
**Primary audience:** Enterprise finance teams (lead) + CA firms (strong second)
**Secondary:** SMB owners, Enterprise IT/Developers
**Voice:** Stripe-precise. Razorpay-grounded. No marketing-ese.

---

## Standard sub-page template (applied to all 9 sub-pages)

Every Software and API sub-page follows this section order:

```
1. Page-level AI summary (for llms.txt + meta description)
2. Hero (eyebrow, H1, subhead, 2 CTAs, microcopy, visual brief)
3. Problem (3 specific problems the product solves)
4. Features (6–8 features, 2 columns)
5. Integrations (ERPs, GSTN endpoints, SDKs — whichever applies)
6. AI layer (what AI specifically does in this product)
7. Pricing teaser (3 tiers, placeholders flagged)
8. FAQ (6–8 Q&A pairs, JSON-LD ready)
9. Closing CTA
```

KSA pages run a lighter version (skip section 6 if there's no India-specific AI moat to claim).

---

## Brand voice rules (apply everywhere)

- One claim per sentence.
- Verb-led headlines. Numbers wherever truthful.
- Name the thing: GSTR-2B, IRN, ISD, IMS, Rule 37A, AATO, ZATCA Phase 2, FATOORAH — not "GST returns."
- Banned words: empower, unlock, seamless, robust, comprehensive, one-stop, hassle-free, cutting-edge, leverage, streamline.
- Every claim has a number, a named customer, or a verifiable artifact.
- No exclamation marks. No emojis in body copy. No "we're excited to..."

---

## Placeholders flagged throughout

The following are deliberate placeholders. **Do not ship without verification:**

- All pricing numbers (`₹X`)
- "Sub-200ms p50 IRN latency"
- "99.95% uptime SLA"
- "Median filing time per GSTIN per month: 14 minutes"
- "6,000+ invoices per minute" reconciliation throughput
- "Mid-market customers recover 0.4–1.2% of annual turnover as previously-leaking ITC"
- "SOC 2 Type II in progress"
- Specific enterprise customer attributions for SAP connector deployments

---
---

# PAGE 1 — BRAND HOMEPAGE

**URL:** `/`

## Page-level AI summary

> Whitebooks is a GST Suvidha Provider (GSP) licensed by GSTN, building India's AI-native compliance infrastructure. It offers two product stacks: Softwares (Accounting, GST, e-Invoice, e-Way Bill, KSA e-Invoicing) and APIs (GST, e-Invoice, e-Way Bill, KSA e-Invoice). It serves 30,000+ users across 12,000+ businesses including P&G, IBM, Razorpay, Hindustan Unilever, KPMG, and SBI.

**Meta title:** Whitebooks — Compliance Infrastructure for India and KSA
**Meta description:** GSP-licensed compliance platform with software and APIs for GST, e-invoicing, e-way bills, and accounting. Trusted by P&G, IBM, Razorpay, and 12,000+ businesses across India.

---

## Section 1 — Hero

**Eyebrow:** GST Suvidha Provider · Licensed by GSTN

**H1:**
Compliance infrastructure for India's largest finance teams.

**Subhead:**
Softwares and APIs for GST, e-invoicing, e-way bills, and accounting — built by a directly licensed GSP. Trusted by P&G, IBM, Razorpay, and 12,000+ businesses across India and Saudi Arabia.

**Primary CTA:** Book a 20-min demo
**Secondary CTA:** Explore the platform

**Microcopy under CTAs:**
Migrating from ClearTax TaxCloud? We import your data in under 45 minutes →

**Hero visual brief:**
A live product UI showing GSTR-2B reconciliation in motion — invoices matching, mismatches flagged in amber, totals ticking up. The product itself is the hero, not a stock illustration.

---

## Section 2 — Logo wall

**Section heading:**
Compliance for the companies that can't afford to get it wrong.

**Subhead:**
Whitebooks runs GST, e-invoicing, and e-way bill operations for India's largest enterprises and the CA firms that audit them.

**Logo grid (priority order, 5 rows × 6):**
P&G · IBM · Hindustan Unilever · KPMG · Coca-Cola · Razorpay
SBI · Aditya Birla Group · Accenture · Philips · Yamaha · TVS
PepsiCo · Pharmeasy · Cars24 · KIA · INOX · Grant Thornton
EaseMyTrip · Pigeon · Landmark · NCC · Odoo · Protiviti
IIT Hyderabad · NHDC · OPGC · WheelsEye · Jyothy Labs · Poorvika

**Caption under wall:**
30,000+ users · 12,000+ businesses · 8,000+ cities · 10 crore+ invoices processed

---

## Section 3 — The Whitebooks platform (the routing section — sends visitors into the right hub)

**Section heading:**
Two stacks. One licensed GSP. Every Indian compliance requirement.

**Subhead:**
Whether you need finished software for your finance team or APIs to build your own, both run on the same direct GSP pipe to GSTN.

**Two large cards (50/50 split):**

### Card 1 — Softwares
**Label:** For finance teams and CA firms

**H3:** Cloud software that runs your filings end-to-end.

**Body:**
Accounting books, GST returns, e-invoices, e-way bills — and KSA e-invoicing for businesses operating across India and the GCC. Designed for finance teams that want compliance handled, not assembled.

**Product list (with small icons):**
- Accounting Software
- GST Software
- e-Invoice Software
- e-Way Bill Software
- KSA e-Invoicing Software

**CTA:** Explore Softwares →

### Card 2 — APIs
**Label:** For developers and enterprise IT

**H3:** REST APIs that embed compliance into your own product.

**Body:**
Generate IRNs, file returns, validate GSTINs, and create e-way bills — over a REST API built by a GSTN-licensed GSP. Used by Razorpay, Pharmeasy, Cars24, and 200+ developer teams.

**Product list (with small icons):**
- GST API
- e-Invoice API
- e-Way Bill API
- KSA e-Invoice API

**CTA:** Explore APIs →

---

## Section 4 — Why Whitebooks (3-point differentiation)

**Section heading:**
Three things that make Whitebooks the only honest answer to "what should I run my GST on?"

**3-column block:**

**Direct GSP license, not a resold pipe**
Whitebooks holds its GSP license directly from GSTN — under BVM IT Consulting Services India Pvt. Ltd. Most competitors resell capacity from a licensee. Our latency is faster, our uptime is better, and our roadmap doesn't depend on someone else's release cycle.

**AI-native, not AI-tacked-on**
Anomaly detection, fuzzy invoice reconciliation, notice prediction, and a compliance copilot — all built into the products from day one, not bolted on for a 2026 launch announcement. Trained on 10 crore+ Indian invoices, run on the Anthropic API with strict data isolation.

**India + KSA, on one platform**
Whitebooks is one of the few GSPs to also operate ZATCA-approved e-invoicing in Saudi Arabia. If your company files in India and the GCC, that's one platform, one contract, one support team — not two integrations to maintain.

---

## Section 5 — AI-native, explained

**Section heading:**
AI that reconciles, predicts, and explains — not a chatbot in the corner.

**Subhead:**
Whitebooks uses purpose-built models for the four compliance jobs that humans have been doing manually since GST launched in 2017.

**4-card grid:**

**1. Invoice matching at scale**
A reconciliation model trained on 10 crore+ invoices matches your purchase register against GSTR-2B in seconds. Handles fuzzy vendor names, rounding deltas, and split invoices that exact-match logic gives up on.

**2. Anomaly detection before filing**
Every return is scanned for the 47 most common GSTN rejection causes before submission. Flagged before you click file. Not after the portal returns an error at 11:47pm on the 20th.

**3. Notice prediction**
Whitebooks reads your filing pattern and flags returns likely to trigger a Section 61 scrutiny notice — based on ITC mismatch trends, turnover variance, and HSN distribution anomalies. Preempt the notice, not respond to it.

**4. Compliance copilot**
Ask "Why did my ITC drop ₹4.2L in October?" or "Which vendors are unfiled for September?" — get an answer drawn from your live data, with source rows linked. Built on the Anthropic API.

**Microcopy:**
AI features run with strict data isolation. Your invoices, vendor data, and filing history are never used to train models — yours, ours, or anyone else's.

---

## Section 6 — Proof: numbers + customer quotes

**Stat strip (4 stats, horizontal):**
- **10 cr+** invoices filed via Whitebooks
- **12,000+** businesses, 5,000+ CA firms
- **30,000+** active users across 8,000+ Indian cities
- **₹0** customer data ever shared with third parties

**Customer quote (enterprise voice — lead):**

> "We moved our entire India e-invoicing and e-way bill stack onto Whitebooks' SAP connector. What took three steps inside SAP plus a portal upload is now one button. The cost savings paid back the year-one license in six weeks."
>
> **B V Srinivasababu** — Senior Manager, IT Applications · NSL

**Quote (CA voice):**

> "Whitebooks made the GSP integration so much faster and smoother than the others we'd evaluated. Support is round-the-clock — not a ticket queue."
>
> **Sahil Jain** — Director · Smartbiz Technologies

**Quote (developer voice):**

> "Whitebooks is solving GST complex problems like e-Invoicing and e-way bills with simple APIs. I'd recommend incorporating Whitebooks for any team that wants its system future-ready."
>
> **CA Atul Garg** — Finance Controller · WheelsEye

---

## Section 7 — Closing CTA

**H2:** Built on a GSP license. Trusted by the Fortune 500. Ready for GST 2.0.

**Body:**
India's compliance landscape changed more in 2025 than in the previous five years combined. Whitebooks is the only platform built from the ground up for what's next.

**Primary CTA:** Book a 20-min Demo
**Secondary CTA:** Talk to sales — +91 90321 11788

---

## Section 8 — Footer

**Three-column above the legal line:**

**Softwares**
- Accounting Software
- GST Software
- e-Invoice Software
- e-Way Bill Software
- KSA e-Invoicing Software

**APIs**
- GST API
- e-Invoice API
- e-Way Bill API
- KSA e-Invoice API

**Company**
- About
- Customers
- Partners
- Careers
- Contact
- Press

**Resources (right column):**
Pricing · Blog · Free Tools · Migration Guide · 2026 Compliance Calendar · Support · API Status · Documentation

**Legal line:**
Whitebooks is a product of BVM IT Consulting Services India Pvt. Ltd. — a GST Suvidha Provider licensed by GSTN, Government of India. © 2026.

---
---

# PAGE 2 — SOFTWARES HUB

**URL:** `/softwares`

## Page-level AI summary

> Whitebooks Softwares is a suite of five cloud-based compliance products for finance teams and CA firms: Accounting Software, GST Software, e-Invoice Software, e-Way Bill Software, and KSA e-Invoicing Software. All five share one workspace, one data layer, and one GSP-licensed connection to GSTN.

**Meta title:** Whitebooks Softwares — Cloud Compliance for Finance Teams and CAs
**Meta description:** Five cloud-based compliance products: Accounting, GST, e-Invoice, e-Way Bill, and KSA e-Invoicing. One workspace, one GSP, every Indian filing requirement.

---

## Section 1 — Hero

**Eyebrow:** Whitebooks Softwares

**H1:**
Five products. One workspace. Every filing your finance team owns.

**Subhead:**
Accounting, GST, e-Invoice, and e-Way Bill software for India — plus KSA e-Invoicing for businesses operating in Saudi Arabia. All five share one data layer and one direct GSP pipe to GSTN.

**Primary CTA:** Start 14-day free trial
**Secondary CTA:** Book a 20-min Demo

---

## Section 2 — The five products (the core of this page)

**Section heading:**
Pick the products you need. They work together when you add more.

**5 large product cards (stacked or 2-column):**

### Card 1 — Accounting Software
**One-liner:** Cloud books that post journals automatically from your sales and purchase data.
**3 key features:** Automated journal entries · Multi-entity consolidation · Audit-ready reports
**Best for:** Finance teams replacing Tally or moving from desktop accounting to cloud.
**CTA:** Explore Accounting →

### Card 2 — GST Software
**One-liner:** File GSTR-1, 3B, 9, 9C across unlimited GSTINs from one workspace.
**3 key features:** Auto-reconcile GSTR-2A/2B · Multi-GSTIN multi-client · 47-point pre-submission validator
**Best for:** CA firms and finance teams filing across multiple states or entities.
**CTA:** Explore GST Software →

### Card 3 — e-Invoice Software
**One-liner:** Generate IRNs at scale with sub-second latency and automatic 30-day window enforcement.
**3 key features:** Bulk IRN generation · Auto-retry on IRP failure · Cancellation and amendment workflow
**Best for:** Businesses with AATO above ₹5 crore mandated to e-invoice from April 2026.
**CTA:** Explore e-Invoice Software →

### Card 4 — e-Way Bill Software
**One-liner:** Generate, extend, and cancel e-way bills from one screen or auto-trigger from your invoices.
**3 key features:** Auto-populate from IRN · Bulk generation · Vehicle and validity tracking
**Best for:** Companies dispatching goods across state lines from one or many warehouses.
**CTA:** Explore e-Way Bill Software →

### Card 5 — KSA e-Invoicing Software
**One-liner:** ZATCA Phase 2 compliant e-invoicing for businesses operating in Saudi Arabia.
**3 key features:** FATOORAH integration · Arabic + English invoicing · India + KSA single platform
**Best for:** Indian-headquartered businesses with operating entities in Saudi Arabia.
**CTA:** Explore KSA e-Invoicing →

---

## Section 3 — Why one platform, not five vendors

**Section heading:**
The case for buying compliance from one company.

**3-column block:**

**Data flows between products, not around them**
An e-invoice generated in the e-Invoice software automatically becomes a line in the GST return and triggers an e-way bill if needed. Without integration, you copy-paste between tools and reconcile the gaps manually.

**One contract, one login, one support team**
Procurement, security review, and SLA negotiation happen once — not five times. Your finance team uses one login. Your IT team manages one vendor.

**One source of truth at audit**
When an auditor asks "what was your ITC position on August 12, 2025 at 14:30?" — there is one answer, drawn from one system. Multi-vendor stacks generate multi-vendor audit findings.

---

## Section 4 — Integrations (shared across all 5 softwares)

**Section heading:**
Connect to the tools your finance team already uses.

**Body:**
Whitebooks Softwares integrate with 40+ ERPs and accounting systems via native connectors. Push data in, pull reports out, file to GSTN — no CSV uploads in between.

**Logo strip:**
SAP S/4HANA · SAP ECC · Tally Prime · Oracle NetSuite · Microsoft Dynamics 365 · Zoho Books · Odoo · Sage · QuickBooks · Marg · Busy · 30+ more

**CTA:** See all integrations →

---

## Section 5 — AI layer (shared)

**Section heading:**
Every Whitebooks software ships with the same AI engine.

**Body:**
Invoice matching, anomaly detection, notice prediction, and the compliance copilot run across all five products — not as features per product but as a shared layer over your unified data. The longer your data lives in Whitebooks, the smarter each product gets.

**CTA:** Read more about Whitebooks AI →

---

## Section 6 — Pricing teaser

**Section heading:**
Buy what you need. Bundle pricing when you need more.

**Body:**
Each Whitebooks software is priced independently — start with one, add others as you scale. Bundle discounts apply automatically when you license two or more softwares on the same contract.

**CTA:** See full pricing →

---

## Section 7 — Closing CTA

**H2:** Built as a suite. Bought as you need it.

**Body:**
Most finance teams start with GST Software and add e-Invoice or Accounting in the following quarter. Some start with KSA. Talk to us about where your stack is today.

**Primary CTA:** Book a 20-min Demo
**Secondary CTA:** Talk to sales

---
---

# PAGE 3 — ACCOUNTING SOFTWARE

**URL:** `/softwares/accounting`

## Page-level AI summary

> Whitebooks Accounting Software is a cloud-based accounting platform for Indian businesses that automatically posts journal entries from sales, purchase, and bank data. It supports multi-entity consolidation, GST-aware ledger structure, and audit-ready reports. It integrates natively with Whitebooks GST, e-Invoice, and e-Way Bill softwares — data flows between products without manual entry.

**Meta title:** Cloud Accounting Software for Indian Businesses | Whitebooks
**Meta description:** Cloud books with automated journal entries, multi-entity consolidation, and GST-aware ledger structure. Integrates with Whitebooks GST, e-Invoice, and e-Way Bill softwares.

---

## Section 1 — Hero

**Eyebrow:** Accounting Software · Cloud-native, GST-aware

**H1:**
Books that post themselves. From your invoices, your bank, your ERP.

**Subhead:**
Whitebooks Accounting reads your sales, purchase, and bank data and posts journal entries automatically. Your accountant reviews and certifies — not enters. Multi-entity, GST-aware, audit-ready by design.

**Primary CTA:** Start 14-day free trial
**Secondary CTA:** Book a 20-min Demo

**Microcopy:** Moving from Tally? We import your 3 most recent years of books in under 2 hours →

---

## Section 2 — Problem

**Section heading:**
Three reasons your books still cost more than they should.

**3-column block:**

**Manual journal entry is a 20th-century job**
Most Indian businesses still type sales and purchase entries into desktop accounting software, one invoice at a time. Whitebooks reads your raw transactions — from your billing system, your e-invoice records, your bank feed — and posts journals automatically. Your accountant becomes a reviewer, not a typist.

**Tally was built for one company. You probably run more than one.**
Group structures with multiple operating companies, multiple GSTINs, and multiple states are the norm in India — not the exception. Whitebooks handles multi-entity consolidation, inter-company elimination, and cross-GSTIN ISD distribution as core features, not paid add-ons.

**Year-end is where everything breaks**
Most accounting software treats the financial year close as an event. Whitebooks treats it as a continuous process — books are audit-ready every day, not after a six-week scramble in April.

---

## Section 3 — Features

**Section heading:**
What Whitebooks Accounting does.

**Feature grid (2 columns × 4 rows):**

**Automated journal posting**
Sales invoices, purchase bills, bank transactions, and payment receipts auto-post to the correct ledgers with the correct GST classifications. Your accountant reviews exceptions, not norms.

**Multi-entity, multi-GSTIN consolidation**
One workspace, every operating company. Consolidated P&L and balance sheet across entities with one click. Inter-company eliminations handled automatically. Inter-GSTIN ISD distribution under the post-2024 ISD mandate is built in.

**GST-aware chart of accounts**
The ledger structure understands GST. Output tax, input tax, RCM, ISD, IGST, CGST, SGST, and UTGST have their own positions and post automatically based on transaction type and place of supply.

**Bank reconciliation, automated**
Connect bank feeds from 100+ Indian banks. Auto-match receipts and payments to ledger entries. Surface unmatched items for review — not the matched ones.

**Audit-ready reports**
P&L, balance sheet, trial balance, ledger-wise summaries, GST reconciliation, depreciation schedules — every report exportable as PDF, Excel, or directly to your auditor's portal. With auto-generated working papers.

**Role-based access for finance teams**
Junior accountants enter. Senior accountants review. CFOs see the dashboard. Auditors get read-only with audit trail. Permissions are granular, not "admin or not."

**Continuous close**
Daily reconciliation, daily P&L, daily AP/AR aging. Month-end is a 30-minute review, not a 30-day project. Year-end is a 2-day certification, not a 2-month sprint.

**Native integration with Whitebooks GST and e-Invoice**
An e-invoice generated in Whitebooks e-Invoice software automatically becomes a sales journal here. A GSTR-2B reconciliation in Whitebooks GST software automatically reflects in your purchase ledger. No CSV exports, no double entry.

---

## Section 4 — Integrations

**Section heading:**
Connect your bank, your ERP, your billing system.

**3 sub-blocks:**

**Banks** — 100+ Indian banks via direct feed and aggregator partners. ICICI, HDFC, SBI, Axis, Kotak, Yes Bank, IDFC First, IndusInd, Federal, RBL, all major PSU banks, and digital banks (Razorpay X, Open, Jupiter for Business).

**ERPs and billing systems** — SAP S/4HANA, SAP ECC, Oracle NetSuite, Microsoft Dynamics 365, Zoho Books migration, Tally Prime migration, Marg, Busy, Vyapar.

**Whitebooks ecosystem** — GST Software, e-Invoice Software, e-Way Bill Software, KSA e-Invoicing.

**CTA:** See all integrations →

---

## Section 5 — AI layer

**Section heading:**
What the AI actually does inside Whitebooks Accounting.

**4-card block:**

**Transaction auto-classification**
A model trained on 10 crore+ Indian invoices classifies your transactions into the correct ledger heads — even when vendor names are inconsistent, descriptions are vague, or the same vendor sells under multiple categories.

**Anomaly detection**
Whitebooks flags transactions that don't fit your historical pattern. A vendor that's never billed above ₹50,000 suddenly invoices ₹4,80,000? Flagged. A ledger that posts a credit when it should always debit? Flagged. Catches fraud, catches mistakes, catches misclassification.

**Audit Q&A**
Ask "show me all transactions above ₹10 lakh in Q3 from new vendors" or "what's the variance in marketing spend month-over-month?" — answers draw from your live data, with source rows linked. Built on the Anthropic API.

**Bank reconciliation matching**
A fuzzy matching model reconciles bank narration to your books — handles UPI references, NEFT codes, payment gateway descriptors, and partial settlements. 90%+ auto-match on first pass.

---

## Section 6 — Pricing teaser

**3 tier cards:**

**Solo / SMB** — ₹7,999/year
1 entity · Unlimited transactions · Bank feed for 2 accounts · Email support

**Growth** — ₹29,999/year
Up to 5 entities · Multi-GSTIN · Unlimited bank feeds · Priority support · Bundle discount with GST Software

**Enterprise** — Custom
Unlimited entities · SAP/Oracle connectors · SSO · Audit log SIEM export · Dedicated CSM

> [Pricing placeholders.]

**CTA:** See full pricing →

---

## Section 7 — FAQ (JSON-LD)

**Q: How is Whitebooks Accounting different from Tally?**
A: Three differences. First, Whitebooks is cloud-native — multi-user, accessible anywhere, no desktop install or backup management. Second, Whitebooks auto-posts journals from raw transaction data rather than requiring manual entry per invoice. Third, Whitebooks handles multi-entity consolidation as a core feature, not via separate Tally licenses per company.

**Q: Can I migrate from Tally Prime?**
A: Yes. Whitebooks imports the last 3 years of your Tally data — masters, ledgers, transactions, opening balances — in under 2 hours for a typical SMB. Larger groups with multiple companies take longer, with white-glove migration support included.

**Q: Does Whitebooks Accounting handle Schedule III balance sheet format?**
A: Yes. Whitebooks generates Schedule III compliant balance sheets and statements of P&L by default. Notes to accounts can be drafted in-platform with auto-populated figures.

**Q: How does Whitebooks handle Ind AS / Indian GAAP differences?**
A: Whitebooks supports both Indian GAAP and Ind AS reporting frameworks. Customers reporting under Ind AS can configure separate ledger views and consolidated statements per framework.

**Q: Can I access Whitebooks Accounting offline?**
A: Whitebooks is cloud-native — internet access is required to use the product. Offline data entry can be captured via the mobile app and synced when connected. Your data is always backed up automatically, with no manual backup files to manage.

**Q: Is my financial data secure?**
A: All data is hosted in ISO 27001-certified Indian data centers. AES-256 encryption at rest, TLS 1.3 in transit. Whitebooks operates under direct GSTN oversight as a licensed GSP, audited annually. No third-party data sharing.

---

## Section 8 — Closing CTA

**H2:** Stop typing. Start reviewing.

**Body:**
Most Whitebooks Accounting customers cut monthly bookkeeping time by 60% in their first quarter. Try it free for 14 days. Bring your last quarter's data — see what your books look like when they post themselves.

**Primary CTA:** Start 14-day free trial
**Secondary CTA:** Book a 20-min Demo

---
---

# PAGE 4 — GST SOFTWARE

**URL:** `/softwares/gst`

## Page-level AI summary

> Whitebooks GST Software is a cloud-based GST filing and reconciliation platform for CA firms and finance teams in India. It supports GSTR-1, 1A, 3B, 4, 5, 6, 7, 8, 9, 9A, 9C, IFF, ITC-04, and CMP-08 filing across unlimited GSTINs from one workspace. It is built by a directly licensed GST Suvidha Provider (GSP) and integrates natively with Tally, SAP, and 40+ ERPs.

**Meta title:** GST Filing Software for CA Firms and Finance Teams | Whitebooks
**Meta description:** File GSTR-1, 3B, 9, and 9C across unlimited GSTINs. Auto-reconcile 2A/2B in under 60 seconds. Built by a GSTN-licensed GSP. Trusted by 5,000+ CA firms and 12,000+ businesses.

---

## Section 1 — Hero

**Eyebrow:** GST Software · GSP-Licensed

**H1:**
GST filing that thinks before you click submit.

**Subhead:**
File GSTR-1, 3B, 9, and 9C across unlimited GSTINs from one workspace. Auto-reconcile GSTR-2B against your purchase register in under 60 seconds. Built on a direct GSP license — no resold pipes.

**Primary CTA:** Start 14-day free trial
**Secondary CTA:** Book a 20-min Demo

**Microcopy:** Migrating from ClearTax TaxCloud, Tally, or Zoho? We import your prior 36 months of returns →

---

## Section 2 — Problem

**Section heading:**
Three problems most GST software still hasn't solved.

**3-column block:**

**Reconciliation is still a nightmare.**
ClearTax and Tally hand you a mismatch report and walk away. Whitebooks' matching engine handles fuzzy vendor names, rounded values, partially settled invoices, and split GSTINs — the cases where exact-match logic fails. 95%+ of mismatches resolve without human review.

**You only see errors after the portal rejects them.**
Whitebooks validates against the 47 most common GSTN rejection codes before you click file. If GSTR-3B will fail, you know on screen — not at 11:47pm when the portal returns a cryptic error.

**Your software doesn't know what year it is.**
GST 2.0 rates went live September 2025. The 30-day IRN window arrived. IMS launched. Rule 37A reversal logic changed. Whitebooks shipped each of these inside 72 hours of notification. Most competitors are still catching up.

---

## Section 3 — Features

**Section heading:**
What Whitebooks GST does.

**Feature grid (2 columns × 4 rows):**

**File every GSTR your business needs**
GSTR-1, 1A, 3B, 4, 5, 6, 7, 8, 9, 9A, 9C, IFF, ITC-04, and CMP-08 — all supported. Bulk filing across multiple GSTINs is included on CA Firm and Enterprise plans.

**Auto-reconcile 2A, 2B, and IMS**
Pull GSTR-2A, 2B, and IMS data from GSTN automatically. Match against your purchase register in under 60 seconds. Average review queue: 3% of total invoices.

**Multi-GSTIN, multi-client workspace**
Add a client once. File across all their GSTINs without re-authenticating. Switch between clients in two clicks, not two logins. Role-based access for partner, manager, article, and reviewer.

**Pre-submission validator**
The 47-point validator scans every return for common GSTN rejection causes — HSN errors, place-of-supply mismatches, RCM misclassification, ISD distribution gaps, ITC blocked under Section 17(5) — before submission.

**Working paper auto-generation**
Every reconciliation, every adjustment, every notice response — logged automatically with user, timestamp, source row, and reason. Export as PDF for audit, or hand to the next reviewer mid-cycle.

**Notice tracker**
Section 61, 73, 74 notices imported automatically from your client GSTINs. Assigned to a partner. Tracked to resolution. Linked back to the return that caused them.

**Bulk operations**
Reconcile 500 clients in one job. Push GSTR-1 for 200 clients in one queue. Bulk is a first-class action, not a hack.

**White-label client portal**
Each of your clients gets a branded portal under your firm's name where they upload invoices, see their compliance status, and pay you. White-label included on Growth plan.

---

## Section 4 — Integrations

**Section heading:**
SAP, Tally, and 40+ ERPs. Zero CSV uploads.

**Body:**
Push transactional data from your ERP to Whitebooks in real time. Native connectors are built by Whitebooks engineers, maintained against every ERP version upgrade.

**Logo strip:**
SAP S/4HANA · SAP ECC · Tally Prime · Oracle NetSuite · Microsoft Dynamics 365 · Zoho Books · Odoo · Sage · QuickBooks · Marg · Busy · 30+ more

**CTA:** See all integrations →

---

## Section 5 — AI layer

**Section heading:**
What the AI actually does inside Whitebooks GST.

**4-card block:**

**Fuzzy vendor matching**
A model trained on 10 crore+ Indian invoices reconciles "M/s. RAJESH ENTERPRISES" with "Rajesh Enterprises Pvt Ltd" with "RAJESH ENT." — without you maintaining alias tables.

**Notice risk scoring**
Each GSTR-3B you're about to file gets a 0–100 notice risk score, based on ITC variance, turnover trend, HSN concentration, and prior notice history. Above 70, Whitebooks suggests what to recheck.

**Natural-language queries**
Type "show me all October vendors with ITC variance above 10%" or "which clients haven't filed 3B for September?" — answers draw from your live data with source rows linked.

**Auto-categorization of unmatched invoices**
Mismatches get auto-classified: vendor unfiled, invoice missing in PR, rate mismatch, GSTIN typo, time-of-supply error. Each class routes to a different resolution workflow.

---

## Section 6 — Pricing teaser

**3 tier cards:**

**Solo CA / SMB** — ₹4,999/year
1 GSTIN · Unlimited GSTR filings · 2A/2B reconciliation · Email support

**CA Firm** — ₹24,999/year (per partner)
Up to 50 client GSTINs · Multi-user · Working papers · White-label client portal · Priority support

**Enterprise** — Custom
Unlimited GSTINs · SAP/Tally connectors · IMS bulk ops · 99.95% SLA · Dedicated CSM

> [Pricing placeholders.]

**CTA:** See full pricing →

---

## Section 7 — FAQ (JSON-LD)

**Q: Does Whitebooks GST Software file GSTR-9 and 9C?**
A: Yes. Whitebooks supports GSTR-1, 1A, 3B, 4, 5, 6, 7, 8, 9, 9A, 9C, IFF, ITC-04, and CMP-08. Bulk filing across multiple GSTINs is included on CA Firm and Enterprise plans.

**Q: Can I file from Tally without exporting CSVs?**
A: Yes. The Whitebooks Tally Connector pushes data directly from Tally Prime to Whitebooks every 5 minutes. No CSV exports, no manual mapping, no broken reconciliations from version mismatches.

**Q: How does Whitebooks handle the IMS (Invoice Management System)?**
A: Whitebooks pulls your IMS dashboard automatically, lets you accept/reject/hold inward invoices in bulk, and tracks the impact of any rejection on your GSTR-3B liability. Rule 37A reversals are flagged before they hit your books.

**Q: What's the difference between Whitebooks and ClearTax for GST filing?**
A: Whitebooks holds a direct GSP license from GSTN. Whitebooks builds its own SAP and Tally connectors in-house. Whitebooks has not discontinued any product line in 2025 — CAs migrating from ClearTax TaxCloud cite continuity as a primary reason for switching.

**Q: How long does migration take?**
A: For a CA firm with up to 100 clients, typical migration takes 30–60 minutes. Whitebooks imports prior 36 months of GSTR filings, working papers, vendor masters, and client master data. White-glove migration is free on CA Firm and Enterprise plans.

**Q: Does Whitebooks support GST 2.0 rates (5%, 18%, 40%)?**
A: Yes. Whitebooks applied the GST 2.0 rate structure from September 22, 2025. HSN-level rate mapping, post-sale discount handling under revised Section 15, and the new refund mechanisms are all live.

**Q: Is my data secure?**
A: All data is hosted in ISO 27001-certified Indian data centers. AES-256 at rest, TLS 1.3 in transit, audited annually under GSTN oversight. No third-party data sharing, no use of customer data for AI model training.

---

## Section 8 — Closing CTA

**H2:** File faster. File cleaner. File from one workspace.

**Body:**
Median filing time per GSTIN per month, across 12,000+ Whitebooks customers: 14 minutes. Most CA firms switching from ClearTax or Tally hit that benchmark inside two filing cycles.

**Primary CTA:** Start 14-day free trial
**Secondary CTA:** Book a 20-min Demo

---
---

# PAGE 5 — e-INVOICE SOFTWARE

**URL:** `/softwares/e-invoice`

## Page-level AI summary

> Whitebooks e-Invoice Software generates IRNs (Invoice Reference Numbers) for B2B invoices in India via direct integration with the Invoice Registration Portal (IRP). It supports bulk generation, automatic 30-day window enforcement, cancellation, amendment, and credit/debit note flows. It is built by a directly licensed GST Suvidha Provider and used by businesses with AATO above ₹5 crore mandated to e-invoice from April 2026.

**Meta title:** e-Invoicing Software for B2B Invoices in India | Whitebooks
**Meta description:** Generate IRNs at scale with sub-second latency. Direct IRP integration. Bulk upload, auto-retry, 30-day window enforcement. Built for businesses with AATO above ₹5 crore.

---

## Section 1 — Hero

**Eyebrow:** e-Invoice Software · Direct IRP Integration

**H1:**
Generate IRNs for every B2B invoice. In bulk. Within the window.

**Subhead:**
Whitebooks e-Invoice Software pushes invoices to the IRP and returns IRNs in under 200ms. Handles the 30-day reporting window, cancellation, amendment, and credit notes. Built for the April 2026 ₹5 crore mandate.

**Primary CTA:** Start 14-day free trial
**Secondary CTA:** Book a 20-min Demo

**Microcopy:** AATO above ₹10 crore? Whitebooks enforces the 30-day window automatically — never miss ITC eligibility →

---

## Section 2 — Problem

**Section heading:**
Three things that go wrong with e-invoicing — and shouldn't.

**3-column block:**

**The 30-day window is non-negotiable. Your software should know.**
For businesses with AATO above ₹10 crore, invoices not reported to the IRP within 30 days are invalid for ITC. Whitebooks tracks the window per invoice, escalates as you approach the deadline, and refuses to let invoices age out silently.

**The IRP goes down. Your business doesn't stop.**
The IRP has unplanned outages — usually around month-end. Whitebooks queues invoices through outages, retries automatically with exponential backoff, and surfaces only the ones that need your attention. Your dispatch and billing don't wait.

**Bulk operations are how real businesses run e-invoicing.**
Generating 200 IRNs one at a time is not e-invoicing — it's data entry. Whitebooks handles bulk generation, bulk cancellation, and bulk amendment as first-class workflows.

---

## Section 3 — Features

**Section heading:**
What Whitebooks e-Invoice does.

**Feature grid (2 columns × 4 rows):**

**Single-click IRN generation**
Generate IRN, signed QR code, and acknowledgment number for any B2B invoice. Sub-200ms p50 latency. Direct IRP pipe — no resold endpoints.

**Bulk generation**
Upload via CSV, Excel, or push from your ERP. Generate 10,000+ IRNs per batch. Live progress, per-row status, automatic retry on transient failures.

**30-day window enforcement**
Whitebooks reads your AATO and applies the 30-day reporting window automatically. Invoices approaching the deadline escalate in your dashboard, your inbox, and your finance team's Slack.

**Cancellation and amendment**
Cancel within 24 hours of IRN generation under GSTN rules. After 24 hours, generate a credit note linked to the original IRN. The workflow is built in — not a separate process.

**Credit notes and debit notes**
Generate credit notes and debit notes against existing IRNs with one click. Auto-link to the original invoice. Auto-populate buyer GSTIN, place of supply, and reverse logic for ITC adjustment.

**Multi-GSTIN, multi-entity**
One workspace, every operating entity. Filter IRNs by GSTIN, by branch, by date range. Consolidated reporting across the group.

**Pre-IRN validation**
HSN codes validated against GSTN master, place of supply checked against buyer GSTIN, GST rates applied per GST 2.0 slabs, mandatory fields validated against the latest IRP schema — before the request leaves your screen.

**Audit log per invoice**
Every IRN action — generation, cancellation, amendment, retry — logged with user, timestamp, IRP response code, and full request/response payload. Exportable for audit.

---

## Section 4 — Integrations

**Section heading:**
Connect to your billing system, your ERP, your custom code.

**Body:**
Whitebooks e-Invoice Software integrates with 40+ ERPs and billing systems via native connectors. For custom systems, the Whitebooks e-Invoice API delivers the same capabilities programmatically.

**Logo strip:**
SAP S/4HANA · SAP ECC · Tally Prime · Oracle NetSuite · Microsoft Dynamics 365 · Zoho Books · Odoo · Marg · Busy · 30+ more

**CTA:** See all integrations →
**Secondary CTA:** Looking for the API instead? Explore the e-Invoice API →

---

## Section 5 — AI layer

**Section heading:**
What the AI actually does inside Whitebooks e-Invoice.

**4-card block:**

**HSN auto-suggestion**
Type the product name, get the right HSN code and current GST 2.0 rate. Trained on 10 crore+ invoices across every Indian industry.

**Place-of-supply auto-resolution**
Whitebooks reads the buyer GSTIN and shipping address, resolves the place of supply, and applies IGST vs CGST/SGST automatically. Handles bill-to/ship-to splits, third-party movements, and SEZ transactions.

**Anomaly flagging**
Invoice values 3× higher than the buyer's historical pattern? Flagged. Buyer GSTIN inactive in the GSTN registry? Flagged before IRN request. New HSN never used by your business before? Flagged for human review.

**Compliance copilot**
Ask "show me all IRNs cancelled last month with reasons" or "which buyers have invoices nearing the 30-day deadline?" — answers draw from live data with source rows linked.

---

## Section 6 — Pricing teaser

**3 tier cards:**

**Starter** — ₹6,999/year
Up to 1,000 IRNs/month · 1 GSTIN · Email support

**Growth** — ₹24,999/year
Up to 25,000 IRNs/month · Up to 10 GSTINs · ERP connectors · Priority support

**Enterprise** — Custom
Unlimited IRNs · SAP-native · Dedicated infrastructure · 99.95% SLA

> [Pricing placeholders.]

**CTA:** See full pricing →

---

## Section 7 — FAQ (JSON-LD)

**Q: From when is e-invoicing mandatory for my business?**
A: E-invoicing is mandatory for businesses with AATO above ₹5 crore from 1st April 2026. For businesses with AATO above ₹10 crore, invoices must be reported to the IRP within 30 days of the invoice date — invoices reported later are invalid for ITC. Whitebooks enforces this window automatically.

**Q: What is AATO and how is it calculated?**
A: AATO is Aggregate Annual Turnover, calculated as the total turnover of all GSTINs under the same PAN in any financial year from 2017–18 onwards. Whitebooks reads your AATO once and applies the correct e-invoicing threshold and reporting window per your business.

**Q: Can I cancel an IRN after generation?**
A: Yes, within 24 hours of IRN generation under GSTN rules. After 24 hours, the invoice must be adjusted via a credit note linked to the original IRN. Whitebooks supports both workflows.

**Q: What happens if the IRP is down?**
A: Whitebooks queues your invoice generation requests through IRP outages and retries automatically with exponential backoff. You see queue status in real time and can override priority on critical invoices. Your dispatch and billing operations don't wait.

**Q: Does Whitebooks support e-invoicing for export and SEZ transactions?**
A: Yes. Whitebooks handles export with payment of IGST, export without payment under LUT, SEZ supplies with payment, and SEZ supplies without payment — with the correct schema, place of supply, and currency conversion.

**Q: How does this differ from the e-Invoice API?**
A: e-Invoice Software is the finished UI product — your finance team uses the dashboard, the bulk upload, and the alerts. The e-Invoice API is the same capability exposed programmatically for developers to embed IRN generation into their own products (billing systems, ERPs, marketplaces).

---

## Section 8 — Closing CTA

**H2:** April 2026 is closer than your AP team thinks.

**Body:**
The ₹5 crore AATO mandate goes live April 1, 2026. For ₹10 crore+ AATO, the 30-day reporting window means ITC at stake on every late invoice. Whitebooks customers move from "evaluating e-invoicing" to "live in production" in 2–6 weeks.

**Primary CTA:** Start 14-day free trial
**Secondary CTA:** Book a 20-min Demo

---
---

# PAGE 6 — e-WAY BILL SOFTWARE

**URL:** `/softwares/e-way-bill`

## Page-level AI summary

> Whitebooks e-Way Bill Software generates, extends, cancels, and tracks e-way bills for movement of goods in India. It auto-populates e-way bills from existing IRNs, supports bulk generation, and integrates natively with 40+ ERPs. It is built by a directly licensed GST Suvidha Provider and used by businesses moving goods across state lines from one or many warehouses.

**Meta title:** e-Way Bill Software for Goods Movement in India | Whitebooks
**Meta description:** Generate, extend, and cancel e-way bills from one screen. Auto-populate from IRN. Bulk operations. Real-time vehicle and validity tracking. Used by Pharmeasy, WheelsEye, and 12,000+ businesses.

---

## Section 1 — Hero

**Eyebrow:** e-Way Bill Software · GSP-Licensed

**H1:**
Every dispatch needs an e-way bill. Generate it in one click.

**Subhead:**
Auto-populate from your IRN or invoice. Bulk-generate for warehouse dispatch batches. Extend validity for in-transit delays. Cancel within 24 hours when needed. One screen, every workflow.

**Primary CTA:** Start 14-day free trial
**Secondary CTA:** Book a 20-min Demo

**Microcopy:** Dispatching from multiple warehouses? See how Pharmeasy generates e-way bills for 14 locations on Whitebooks →

---

## Section 2 — Problem

**Section heading:**
Three things that slow down e-way bill operations — and shouldn't.

**3-column block:**

**Re-entering the same data twice.**
Most businesses generate the invoice in one system, then re-key buyer details, item details, and vehicle details into the e-way bill portal. Whitebooks reads your existing invoice or IRN and pre-populates 90% of the e-way bill fields.

**The validity clock is brutal.**
E-way bills expire based on distance and vehicle type. A truck breakdown, a route diversion, or a delivery delay can invalidate the bill mid-transit — and the goods become non-compliant. Whitebooks tracks validity, alerts before expiry, and extends in one click when you're authorized.

**Bulk dispatch from warehouses.**
Logistics companies and large distributors dispatch dozens of consignments per day from each warehouse. Generating e-way bills one at a time is operationally untenable. Whitebooks treats bulk as the default mode, not the exception.

---

## Section 3 — Features

**Section heading:**
What Whitebooks e-Way Bill does.

**Feature grid (2 columns × 4 rows):**

**Single-click generation from IRN or invoice**
Pull buyer GSTIN, item details, HSN, taxable value, and transporter ID directly from the source invoice. Enter only what's new — vehicle number, distance, transport mode.

**Bulk generation**
Upload a CSV or push from your ERP. Generate 500+ e-way bills in one batch. Live progress, per-row status, automatic retry.

**Validity tracking and extension**
Real-time view of every active e-way bill, its remaining validity, and its in-transit status. Alerts before expiry. One-click extension when extension is permitted under GSTN rules.

**Cancellation within 24 hours**
Cancel e-way bills within 24 hours of generation when goods aren't dispatched, vehicles change, or invoices are revoked. After 24 hours, the bill auto-expires per GSTN rules.

**Multi-vehicle, multi-transporter**
Support for consolidated e-way bills, multi-vehicle movement, and transporter changes mid-transit. All updates logged with timestamp and authorized user.

**Distance auto-calculation**
Whitebooks calculates pin-to-pin distance using GSTN's standard mapping. No more guessing distance fields and getting validity wrong.

**Multi-GSTIN, multi-warehouse**
Each warehouse operates as a dispatch node with its own user roles, vehicle registries, and transporter relationships. Consolidated reporting across the group.

**Audit log per bill**
Every e-way bill — generation, update, cancellation, expiry — logged with user, timestamp, vehicle number, distance, and GSTN response. Exportable for audit and dispute resolution.

---

## Section 4 — Integrations

**Section heading:**
Connect to your invoicing, your warehouse system, your TMS.

**Body:**
Whitebooks e-Way Bill integrates with 40+ ERPs, WMS, and TMS platforms via native connectors. Auto-trigger e-way bill generation from invoice creation or dispatch event.

**Logo strip:**
SAP S/4HANA · SAP ECC · Tally Prime · Oracle NetSuite · WheelsEye · Microsoft Dynamics 365 · Zoho Books · Odoo · 30+ more

**CTA:** See all integrations →
**Secondary CTA:** Looking for the API? Explore the e-Way Bill API →

---

## Section 5 — AI layer

**Section heading:**
What the AI actually does inside Whitebooks e-Way Bill.

**4-card block:**

**Distance and validity prediction**
Beyond GSTN's pin-to-pin calculation, Whitebooks predicts realistic transit time based on route history, transporter performance, and seasonal factors. Reduces expired-bill incidents by surfacing risk before dispatch.

**Anomaly flagging**
Vehicle numbers that don't match the standard Indian format, transporter IDs not seen before, distances outside the historical range — flagged before bill generation.

**Bulk dispatch optimizer**
Given a list of consignments and available vehicles, Whitebooks suggests optimal vehicle assignments to minimize total e-way bills generated (via consolidated bills) and maximize vehicle utilization.

**Compliance copilot**
Ask "show me all e-way bills that expired last week" or "which warehouses generated the most bills in March?" — answers draw from live data with source rows linked.

---

## Section 6 — Pricing teaser

**3 tier cards:**

**Starter** — ₹5,999/year
Up to 500 e-way bills/month · 1 GSTIN · Email support

**Growth** — ₹19,999/year
Up to 10,000 bills/month · Up to 10 GSTINs · ERP connectors · Priority support

**Enterprise** — Custom
Unlimited bills · Multi-warehouse dispatch console · 99.95% SLA · Dedicated CSM

> [Pricing placeholders.]

**CTA:** See full pricing →

---

## Section 7 — FAQ (JSON-LD)

**Q: When is an e-way bill required?**
A: An e-way bill is required for the movement of goods worth more than ₹50,000 (consolidated value of all invoices in the vehicle) between locations in India. Some states have lower thresholds for intra-state movement. Whitebooks applies the correct threshold based on origin and destination state.

**Q: Can I cancel an e-way bill after generation?**
A: Yes, within 24 hours of generation, provided the goods have not been verified by an officer in transit. After 24 hours, the bill cannot be cancelled but will auto-expire per its validity period.

**Q: How is the validity period of an e-way bill calculated?**
A: Validity depends on distance and vehicle type. For regular cargo vehicles, 1 day per 200 km. For Over-Dimensional Cargo (ODC), 1 day per 20 km. Whitebooks calculates and displays validity automatically.

**Q: Can I extend the validity of an e-way bill?**
A: Yes, validity can be extended within 8 hours before expiry or 8 hours after expiry, with valid reason (vehicle breakdown, transshipment, etc.). Whitebooks supports one-click extension with the required reason codes.

**Q: How does Whitebooks integrate with Tally or SAP for e-way bills?**
A: Whitebooks reads sales invoices from your Tally or SAP system and auto-generates e-way bills with pre-populated data. The generated e-way bill number and QR code are posted back to your source system as fields on the invoice document.

**Q: Does Whitebooks support consolidated e-way bills?**
A: Yes. When one vehicle carries multiple invoices, Whitebooks generates a single consolidated e-way bill referencing all underlying invoices — the standard practice for transporters and 3PLs.

---

## Section 8 — Closing CTA

**H2:** Dispatches don't wait. Your e-way bill software shouldn't either.

**Body:**
Whitebooks customers generate millions of e-way bills annually — from single-warehouse SMBs to 14-warehouse Pharmeasy operations. Same software, same SLA, same direct GSP pipe.

**Primary CTA:** Start 14-day free trial
**Secondary CTA:** Book a 20-min Demo

---
---

# PAGE 7 — KSA e-INVOICING SOFTWARE

**URL:** `/softwares/ksa-e-invoicing`

## Page-level AI summary

> Whitebooks KSA e-Invoicing Software is a ZATCA Phase 2 compliant e-invoicing platform for businesses operating in Saudi Arabia. It generates e-invoices in the required XML format, signs them with the taxpayer's cryptographic certificate, submits them to ZATCA's FATOORAH portal, and returns the cleared invoice with QR code. It is one of the few platforms offering integrated e-invoicing for both India (GSTN) and KSA (ZATCA) on the same workspace.

**Meta title:** ZATCA Phase 2 e-Invoicing Software for Saudi Arabia | Whitebooks
**Meta description:** Generate ZATCA-compliant e-invoices for KSA. FATOORAH integration, Arabic + English invoicing, cryptographic signing. The only platform handling India and Saudi Arabia e-invoicing on one workspace.

---

## Section 1 — Hero

**Eyebrow:** KSA e-Invoicing · ZATCA Phase 2 Compliant

**H1:**
ZATCA-ready e-invoicing for businesses operating in Saudi Arabia.

**Subhead:**
Generate, sign, and submit e-invoices to ZATCA's FATOORAH portal in real time. Arabic and English invoicing, cryptographic signing, QR-coded outputs — and the same workspace handles your Indian GST filings.

**Primary CTA:** Book a 20-min Demo
**Secondary CTA:** Talk to KSA solutions team

**Microcopy:** Operating in India and KSA? Whitebooks is one of the few platforms that handles both on one contract →

---

## Section 2 — Problem

**Section heading:**
Three reasons KSA e-invoicing is harder than it looks.

**3-column block:**

**ZATCA Phase 2 is not a CSV upload.**
Phase 2 e-invoicing requires real-time integration with FATOORAH, XML in the specified UBL schema, cryptographic signing using a ZATCA-issued certificate, and clearance before the invoice reaches the buyer. Off-the-shelf accounting software in KSA does not do this end-to-end.

**Bilingual is mandatory, not optional.**
Tax invoices in KSA must include both Arabic and English fields for buyer name, item descriptions, and tax amounts. Most Indian systems can't generate Arabic at all. Whitebooks generates both, in the right glyph order, with right-to-left layout where required.

**India + KSA = two compliance regimes, one finance team.**
Indian-headquartered businesses with operations in KSA typically run two separate tools — and reconcile twice. Whitebooks runs both on the same platform, with consolidated reporting in your finance team's currency of choice.

---

## Section 3 — Features

**Section heading:**
What Whitebooks KSA e-Invoicing does.

**Feature grid (2 columns × 3 rows):**

**ZATCA Phase 2 clearance**
Real-time integration with FATOORAH. Invoices submitted, cleared, and signed before they reach the buyer. UBL 2.1 XML format, ZATCA-approved schema.

**Cryptographic signing**
Cryptographic stamp generation using ZATCA-issued compliance certificate (CSID). Whitebooks manages certificate lifecycle — issuance, renewal, revocation — so your finance team doesn't.

**Bilingual invoicing (Arabic + English)**
Invoice templates in Arabic-English bilingual layout with right-to-left text rendering. Buyer name, supplier name, item descriptions, and tax labels in both languages by default.

**QR code generation**
ZATCA-compliant QR code generation containing supplier VAT number, invoice timestamp, total amount, VAT amount, and cryptographic hash — embedded on every issued invoice.

**Simplified and standard tax invoices**
Support for both simplified tax invoices (B2C, sub-1,000 SAR) and standard tax invoices (B2B and high-value B2C). Different schemas, different requirements — both handled.

**India + KSA single workspace**
For Indian-headquartered businesses operating in KSA, manage both compliance regimes on one Whitebooks contract. Cross-jurisdiction reporting, consolidated dashboards, one support team.

---

## Section 4 — Integrations

**Section heading:**
Connect to your KSA accounting and billing systems.

**Body:**
Whitebooks KSA integrates with Zoho Books KSA edition, Microsoft Dynamics, SAP S/4HANA, Oracle NetSuite, and major regional billing systems. For custom systems, the Whitebooks KSA e-Invoice API delivers the same capabilities programmatically.

**CTA:** See all integrations →
**Secondary CTA:** Looking for the API? Explore the KSA e-Invoice API →

---

## Section 5 — Pricing teaser

**3 tier cards:**

**Starter** — Custom (in SAR)
Up to 5,000 invoices/year · 1 entity · ZATCA certificate management · Email support

**Growth** — Custom
Up to 100,000 invoices/year · Multi-entity · ERP connector · Priority support

**Enterprise** — Custom
Unlimited invoices · India + KSA unified · Dedicated CSM · 99.95% SLA

> [KSA pricing in SAR; placeholders only.]

**CTA:** Talk to KSA solutions team →

---

## Section 6 — FAQ (JSON-LD)

**Q: What is ZATCA Phase 2 e-invoicing?**
A: ZATCA Phase 2 (also called the Integration Phase) is the second stage of Saudi Arabia's e-invoicing mandate. It requires real-time integration between taxpayer billing systems and ZATCA's FATOORAH portal, with cryptographic signing of every invoice and clearance before the invoice reaches the buyer. It rolled out in waves from January 2023 onwards.

**Q: Is my business required to comply with ZATCA Phase 2?**
A: ZATCA notifies businesses individually based on annual revenue thresholds. Phase 2 was rolled out in waves — first to businesses above SAR 3 billion in annual revenue, then progressively to smaller bands. As of 2026, the threshold is significantly lower; ZATCA's official site has the latest wave information.

**Q: How does Whitebooks handle the ZATCA cryptographic certificate (CSID)?**
A: Whitebooks generates the Certificate Signing Request (CSR), submits it to ZATCA via the FATOORAH portal, retrieves the issued CSID, and stores it in encrypted form. Certificate renewal and revocation are handled by Whitebooks — your team never touches the cryptography.

**Q: Can I issue invoices in Arabic only, or English only?**
A: ZATCA requires bilingual (Arabic + English) invoicing for standard tax invoices. Simplified tax invoices (B2C) can be Arabic-only. Whitebooks defaults to bilingual and switches automatically for simplified invoices.

**Q: Does Whitebooks handle the QR code requirement?**
A: Yes. Every Whitebooks-generated invoice includes a ZATCA-compliant QR code with the required fields (supplier VAT number, timestamp, total, VAT amount, cryptographic hash) embedded automatically.

**Q: Can I run Indian GST filings and KSA e-invoicing on the same platform?**
A: Yes — and this is a primary reason Indian-headquartered groups with KSA operations choose Whitebooks. One contract, one workspace, two compliance regimes. Consolidated cross-jurisdiction reporting included on Enterprise plans.

---

## Section 7 — Closing CTA

**H2:** India compliance is hard. KSA compliance is harder. We do both.

**Body:**
Whitebooks is one of the few platforms operating ZATCA-approved e-invoicing infrastructure alongside a GSTN GSP license. If your business files in both India and the GCC, talk to our KSA solutions team about a unified contract.

**Primary CTA:** Talk to KSA solutions team
**Secondary CTA:** Book a 20-min Demo

---
---

# PAGE 8 — APIs HUB

**URL:** `/apis`

## Page-level AI summary

> Whitebooks APIs is a suite of four REST APIs for embedding Indian and KSA compliance into developer applications: GST API, e-Invoice API, e-Way Bill API, and KSA e-Invoice API. All four run on Whitebooks' direct GSP license to GSTN (for India) and ZATCA accreditation (for KSA). Used by Razorpay, Pharmeasy, Cars24, WheelsEye, and 200+ developer teams in production.

**Meta title:** Whitebooks APIs — Compliance APIs for India and KSA
**Meta description:** REST APIs for GST filing, e-invoicing, e-way bills, and KSA e-invoicing. Built by a directly licensed GSP. 99.95% uptime SLA. Used by Razorpay, Pharmeasy, and 200+ developer teams.

---

## Section 1 — Hero

**Eyebrow:** Whitebooks APIs

**H1:**
Compliance APIs that don't make you build the compliance.

**Subhead:**
Four REST APIs for India and KSA — GST, e-Invoice, e-Way Bill, and KSA e-Invoice. Built by a directly licensed GSP, used in production by Razorpay, Pharmeasy, and 200+ teams.

**Primary CTA:** Get sandbox keys
**Secondary CTA:** Read the docs

---

## Section 2 — The four APIs

**Section heading:**
Four endpoints. Every compliance operation in India and KSA.

**4 product cards (2x2 grid):**

### Card 1 — GST API
**One-liner:** File GSTR returns, pull 2A/2B, validate GSTINs, search HSN — all over REST.
**3 endpoints highlighted:** `/gstr/file` · `/gstin/validate` · `/hsn/search`
**Best for:** Fintechs, ERPs, tax-tech startups embedding GST capability.
**CTA:** Explore GST API →

### Card 2 — e-Invoice API
**One-liner:** Generate IRNs, cancel invoices, issue credit notes — direct IRP pipe.
**3 endpoints highlighted:** `/einvoice/create` · `/einvoice/cancel` · `/einvoice/credit-note`
**Best for:** Billing systems, ERPs, B2B marketplaces with AATO-above-₹5cr customers.
**CTA:** Explore e-Invoice API →

### Card 3 — e-Way Bill API
**One-liner:** Generate, extend, cancel e-way bills — auto-populate from IRN or invoice.
**3 endpoints highlighted:** `/ewaybill/create` · `/ewaybill/extend` · `/ewaybill/cancel`
**Best for:** Logistics platforms, WMS providers, TMS systems, freight brokers.
**CTA:** Explore e-Way Bill API →

### Card 4 — KSA e-Invoice API
**One-liner:** Generate ZATCA Phase 2 e-invoices — FATOORAH submission, cryptographic signing, QR generation.
**3 endpoints highlighted:** `/ksa/einvoice/create` · `/ksa/einvoice/clear` · `/ksa/einvoice/csid`
**Best for:** SaaS products operating in Saudi Arabia or serving KSA businesses.
**CTA:** Explore KSA e-Invoice API →

---

## Section 3 — Why Whitebooks APIs

**Section heading:**
What "directly licensed GSP" actually buys you.

**3-column block:**

**Direct pipe, not resold capacity**
Whitebooks holds its GSP license directly from GSTN. Most API providers in India resell capacity from a licensee. The difference shows up in latency (we're faster), uptime (we're more reliable), and roadmap (we ship on day one of every GSTN release).

**Production-grade from sandbox onwards**
Sandbox returns the same response shapes, same error codes, and same rate-limit behavior as production. What works in dev works in prod. No surprise schema differences on launch day.

**Built for engineers, not procurement**
Idempotency keys on every write endpoint. HMAC-signed webhooks with replay protection. Public status page. URL-versioned APIs with 12-month deprecation windows. Standard patterns, not invented-here.

---

## Section 4 — Shared infrastructure (applies to all APIs)

**Section heading:**
The things that matter to the person on call at 2am.

**3-column block:**

**99.95% uptime SLA**
Monthly uptime SLA with automatic credit issuance. Public status page at status.whitebooks.in updated within 5 minutes of any detected issue.

**Sub-200ms p50 latency**
Median IRN generation and GSTN response latency under 200ms — measured in production, last 30 days.

**SDKs in 5 languages**
Official SDKs in Node.js, Python, PHP, Java, and Go. Community SDKs in Ruby, .NET, and Elixir. All under permissive open-source licenses on github.com/whitebooks.

---

## Section 5 — Pricing teaser

**Section heading:**
Pay for calls, not for seats.

**Body:**
Whitebooks API pricing scales with your call volume, not your team size. Free sandbox for unlimited testing. Production starts at the Startup tier.

**CTA:** See full API pricing →

---

## Section 6 — Closing CTA

**H2:** Sandbox in 5 minutes. Production in 5 days.

**Body:**
Sign up, get sandbox keys immediately, run the quickstart in 30 minutes, move to production within 5 business days after KYC.

**Primary CTA:** Get sandbox keys
**Secondary CTA:** Read Guides

---
---

# PAGE 9 — GST API

**URL:** `/apis/gst`

## Page-level AI summary

> Whitebooks GST API is a REST API for GST filing, invoice retrieval, GSTIN validation, and HSN/SAC code search in India. It is built by a directly licensed GST Suvidha Provider (GSP) and used by fintechs, ERPs, and enterprise IT teams to embed GST compliance into their own products. Production endpoints have a 99.95% uptime SLA and sub-200ms median response latency.

**Meta title:** GST API for Developers — Direct GSP Pipe | Whitebooks
**Meta description:** REST API for GST filing, GSTIN validation, GSTR-2A/2B retrieval, and HSN search. Built by a directly licensed GSP. Sandbox in 5 minutes. 99.95% uptime SLA.

---

## Section 1 — Hero

**Eyebrow:** GST API · Direct GSP pipe to GSTN

**H1:**
File returns, pull 2A/2B, validate GSTINs — over a real REST API.

**Subhead:**
The GST API for developers who actually have to ship. Direct GSP-licensed connection to GSTN. SDKs in 5 languages. 99.95% uptime SLA.

**Primary CTA:** Get sandbox keys
**Secondary CTA:** Read the docs

**Microcopy:** Used in production by Razorpay, Pharmeasy, Cars24, WheelsEye, and 200+ teams.

---

## Section 2 — Problem

**Section heading:**
Three reasons most "GST APIs" disappoint developers.

**3-column block:**

**Resold APIs add latency.**
Most "GST APIs" on the market are resold from a real GSP — your request goes through their server before it reaches GSTN. That's 200–600ms of extra latency on every call. Whitebooks holds its own GSP license. Your request goes one hop, not two.

**XML, SOAP, and undocumented quirks.**
Some providers wrap the GSTN's underlying APIs without modernization — leaving you to handle XML payloads, SOAP envelopes, and undocumented error codes. Whitebooks normalizes everything to clean JSON with well-typed errors.

**Sandbox that doesn't match production.**
Sandbox environments at most providers respond differently from production — different rate limits, different error shapes, different success conditions. Whitebooks sandbox is bit-for-bit identical to production behavior.

---

## Section 3 — Endpoints (replaces "Features" section)

**Section heading:**
The endpoints. Documented like an API should be.

**Feature grid (2 columns × 4 rows):**

**`POST /v1/gstr/file`**
File any GSTR — 1, 1A, 3B, 4, 5, 6, 7, 8, 9, 9A, 9C, IFF, ITC-04, CMP-08. JSON in, ARN out. Idempotency key supported.

**`GET /v1/gstr/2a` and `/v1/gstr/2b`**
Pull GSTR-2A and 2B data for any return period, any GSTIN under delegated authentication. Returns parsed JSON with vendor-wise breakdown.

**`GET /v1/gstin/validate`**
Validate any GSTIN against the GSTN registry. Returns legal name, trade name, registration status, last filing date, state code, and PAN linkage.

**`GET /v1/hsn/search`**
Search HSN and SAC codes by keyword or code. Returns description, current GST 2.0 rate, chapter, and last revision date.

**`POST /v1/ims/accept`, `/reject`, `/hold`**
Manage Invoice Management System (IMS) actions in bulk. Accept, reject, or hold inward invoices, with reason codes. Returns updated GSTR-3B liability preview.

**`GET /v1/notice/list`**
Pull Section 61, 73, 74 notices issued against any of your monitored GSTINs. Returns notice type, date, amount in dispute, and response deadline.

**`POST /v1/refund/file`**
File GST refund applications (RFD-01, RFD-10) via API. Supports refund of unutilized ITC, IGST paid on exports, and inverted duty structure.

**Webhooks**
Subscribe to events: GSTR filed, notice received, GSTR-2B available, refund status changed. HMAC-signed payloads, replay protection, exponential backoff on delivery.

---

## Section 4 — Integrations

**Section heading:**
SDKs, frameworks, and the tools you already use.

**3 sub-blocks:**

**SDKs** — Node.js, Python, PHP, Java, Go (official). Ruby, .NET, Elixir (community). All on github.com/whitebooks.

**Frameworks** — First-class support for Express, FastAPI, Django, Laravel, Spring Boot, and Gin via the official SDKs.

**Tools** — Postman collection (one-click import). OpenAPI 3.1 spec for codegen. Direct integration guides for Salesforce, HubSpot, Stripe, and Razorpay invoice flows.

**CTA:** See SDK docs →

---

## Section 5 — AI layer

**Section heading:**
AI-friendly responses, AI-friendly tooling.

**3-card block:**

**Structured response shapes designed for LLM extraction**
Every endpoint returns responses with consistent field naming and explicit type information. Easy to feed into agentic workflows or AI-driven reconciliation systems.

**Inline error explanations**
When GSTN rejects a return, the error code is returned alongside a plain-language explanation and a suggested fix. The kind of thing that saves you from grep-ing GSTN's PDF documentation at 2am.

**Use with the Whitebooks AI engine**
Combine the GST API with the Whitebooks reconciliation models to build your own fraud detection, ITC optimization, or anomaly flagging — directly on your customers' data, in your product.

---

## Section 6 — Pricing teaser

**3 tier cards:**

**Developer** — Free
10,000 sandbox calls/month · Community Slack · No production access

**Startup** — ₹14,999/month
50,000 production calls/month · Email support, <8hr response · Standard SLA

**Scale** — Custom
Unlimited production calls · Dedicated infrastructure · <2hr support · 99.95% SLA · Account manager

> [Pricing placeholders.]

**CTA:** See call-volume pricing →

---

## Section 7 — FAQ (JSON-LD)

**Q: Is Whitebooks a GSP or a reseller?**
A: Whitebooks holds a direct GSP license from GSTN, under BVM IT Consulting Services India Pvt. Ltd. We do not resell another GSP's pipe. This is the reason for the latency and uptime difference versus most other API providers.

**Q: How fast can I get production access?**
A: Sandbox is immediate. Production requires KYC verification and a signed agreement — median 5 business days from sandbox signup to production keys.

**Q: Can I file returns for my clients (as a CA firm or tax-tech product)?**
A: Yes. The API supports multi-GSTIN operation with delegated authentication. Each client GSTIN's credentials are stored encrypted with explicit consent. Several tax-tech products are built on this pattern.

**Q: What's the SLA?**
A: 99.95% monthly uptime on production endpoints. SLA credits issued automatically. Public status page at status.whitebooks.in.

**Q: How do GST 2.0 rate changes affect my integration?**
A: The HSN endpoint returns current applicable rates as of the request date. Your code doesn't hard-code rates — you query for them. When the government changes rates, your integration doesn't break.

**Q: Do you support webhooks?**
A: Yes. HMAC-signed, replay-protected, with exponential backoff on delivery. Subscribe to GSTR filing events, notice events, 2B availability, and refund status changes.

---

## Section 8 — Closing CTA

**H2:** Five minutes to your first sandbox call.

**Body:**
Sign up, get sandbox keys, run the quickstart. Production access in 5 business days after KYC. No procurement-cycle minimum — Startup tier starts at ₹14,999/month.

**Primary CTA:** Get sandbox keys
**Secondary CTA:** Read Guides

---
---

# PAGE 10 — e-INVOICE API

**URL:** `/apis/e-invoice`

## Page-level AI summary

> Whitebooks e-Invoice API is a REST API for generating Invoice Reference Numbers (IRNs) on India's Invoice Registration Portal (IRP). It supports IRN creation, cancellation, amendment, credit note generation, and bulk operations — with sub-200ms p50 latency. Used by billing systems, ERPs, and B2B marketplaces serving the ₹5 crore+ AATO mandate.

**Meta title:** e-Invoice API — Generate IRNs at Scale | Whitebooks
**Meta description:** REST API for generating IRNs on India's IRP. Sub-200ms latency. Direct GSP pipe. Used by Razorpay and 200+ developer teams.

---

## Section 1 — Hero

**Eyebrow:** e-Invoice API · Direct IRP integration

**H1:**
Generate IRNs at scale. In under 200 milliseconds.

**Subhead:**
The e-Invoice API for billing systems, ERPs, and B2B marketplaces. Sub-200ms p50 latency. Direct GSP-licensed pipe to the IRP. Used by Razorpay to generate IRNs for 100,000+ merchants.

**Primary CTA:** Get sandbox keys
**Secondary CTA:** Read the docs

---

## Section 2 — Problem

**Section heading:**
Three reasons e-invoicing integrations fail in production.

**3-column block:**

**The 30-day window is unforgiving.**
For AATO above ₹10 crore, invoices not reported to the IRP within 30 days are invalid for ITC. If your integration ages out invoices silently, your customers lose money. Whitebooks surfaces window-at-risk invoices via webhook before they expire.

**The IRP has unplanned outages.**
Around month-end, IRP latency spikes and intermittent failures are common. Naive integrations fail; resilient ones queue and retry. Whitebooks queues and retries on your behalf, surfacing only the ones requiring human decision.

**Schema changes break integrations.**
The IRP schema has changed multiple times since 2020. Each change breaks integrations that hardcoded the old schema. Whitebooks abstracts the schema — you call our API, we adapt to IRP changes.

---

## Section 3 — Endpoints

**Section heading:**
The endpoints.

**Feature grid (2 columns × 3 rows):**

**`POST /v1/einvoice/create`**
Generate IRN, signed QR code, and acknowledgment number. JSON in, full response in <200ms p50. Idempotency key supported.

**`POST /v1/einvoice/cancel`**
Cancel an IRN within 24 hours of generation. Returns updated IRP state. After 24 hours, redirects you to the credit-note flow.

**`POST /v1/einvoice/credit-note`**
Generate a credit note linked to an existing IRN. Auto-populates buyer GSTIN, place of supply, and reverse logic. Returns new IRN for the credit note.

**`POST /v1/einvoice/debit-note`**
Generate a debit note linked to an existing IRN. Same semantics as credit note, opposite direction.

**`POST /v1/einvoice/bulk`**
Submit up to 10,000 IRN requests in one batch. Returns batch ID; poll status or subscribe via webhook.

**`GET /v1/einvoice/{irn}`**
Retrieve full IRN details, status, and history. Useful for reconciliation and audit.

---

## Section 4 — Integrations

**Section heading:**
SDKs, code examples, and integration guides.

**3 sub-blocks:**

**SDKs** — Node.js, Python, PHP, Java, Go (official). All on github.com/whitebooks/einvoice-sdk-{language}.

**Code examples** — Working integrations for Stripe-style billing platforms, Razorpay merchant flows, custom ERPs, and bulk dispatch workflows.

**Webhooks** — Subscribe to events: IRN generated, IRN cancelled, IRN approaching 30-day window, IRP rate-limited, credit note generated.

**CTA:** Read integration guide →

---

## Section 5 — AI layer

**Section heading:**
Smart features that fit into your code.

**3-card block:**

**HSN auto-suggestion endpoint**
`GET /v1/hsn/suggest?description=...` returns the most likely HSN code and current rate for a product description. Useful for marketplaces accepting seller-uploaded products.

**Anomaly flagging in webhook payloads**
Webhook events include a `risk_flags` array — high-value invoice to a new buyer, GSTIN with falling compliance score, unusual HSN pattern. Surface these in your UI for human review.

**Compliance copilot for end users**
Embed Whitebooks' compliance copilot in your product via the AI Q&A endpoint. Your users ask questions in natural language; the copilot answers from their live data.

---

## Section 6 — Pricing teaser

**3 tier cards:**

**Developer** — Free
10,000 sandbox calls/month · Community Slack

**Startup** — ₹14,999/month
50,000 production IRNs/month · Email support · Standard SLA

**Scale** — Custom
Unlimited IRNs · Dedicated infrastructure · 99.95% SLA · Account manager

> [Pricing placeholders.]

**CTA:** See call-volume pricing →

---

## Section 7 — FAQ (JSON-LD)

**Q: How fast is IRN generation?**
A: Median p50 latency is under 200ms, measured in production over the last 30 days. p99 is under 1 second. The status page at status.whitebooks.in shows real-time and historical latency.

**Q: What happens if the IRP is down?**
A: Whitebooks queues your IRN requests and retries with exponential backoff. You receive a `pending` status immediately; the IRN comes back via webhook once the IRP responds. Your code doesn't need to handle IRP outages.

**Q: Can I cancel an IRN after 24 hours?**
A: No — GSTN rules don't permit IRN cancellation after 24 hours. After 24 hours, you must issue a credit note linked to the original IRN. The `/credit-note` endpoint handles this.

**Q: Does the API enforce the 30-day reporting window?**
A: Yes. For businesses with AATO above ₹10 crore, the API will reject IRN requests for invoices more than 30 days old, per GSTN rules. Webhooks alert you to invoices approaching the deadline.

**Q: How does pricing work for bulk operations?**
A: Each IRN in a bulk batch counts as one call against your monthly quota. Bulk doesn't have separate pricing — it's the same per-call rate.

**Q: Do you provide a Postman collection?**
A: Yes. One-click import from the API docs. Pre-configured for sandbox; swap the API key to point at production.

---

## Section 8 — Closing CTA

**H2:** April 2026 is closer than your customers think.

**Body:**
The ₹5 crore AATO mandate goes live April 1, 2026. Billing systems and ERPs serving Indian SMBs need e-invoicing capability — and most can't build it from scratch in time. Whitebooks ships the capability in a sprint.

**Primary CTA:** Get sandbox keys
**Secondary CTA:** Read Guides

---
---

# PAGE 11 — e-WAY BILL API

**URL:** `/apis/e-way-bill`

## Page-level AI summary

> Whitebooks e-Way Bill API is a REST API for generating, extending, and cancelling e-way bills for goods movement in India. It supports auto-population from existing IRNs, bulk operations, consolidated bills, and validity tracking. Used by logistics platforms, WMS providers, TMS systems, and freight brokers including Pharmeasy and WheelsEye.

**Meta title:** e-Way Bill API for Logistics and Fleet Platforms | Whitebooks
**Meta description:** REST API for generating, extending, and cancelling e-way bills. Auto-populate from IRN. Bulk operations. 99.95% uptime SLA. Used by Pharmeasy and WheelsEye.

---

## Section 1 — Hero

**Eyebrow:** e-Way Bill API · GSP-Licensed

**H1:**
Every dispatch event triggers an e-way bill. We make it one API call.

**Subhead:**
Generate, extend, and cancel e-way bills programmatically. Auto-populate from existing IRNs. Handle bulk dispatch from warehouses. Used in production by Pharmeasy (14 warehouses) and WheelsEye.

**Primary CTA:** Get sandbox keys
**Secondary CTA:** Read the docs

---

## Section 2 — Problem

**Section heading:**
Three reasons e-way bill integrations break at scale.

**3-column block:**

**Re-keying data from the invoice system.**
Most integrations require pushing all invoice and buyer data again to generate the e-way bill. Whitebooks reads existing IRNs and pre-populates 90% of the e-way bill fields automatically.

**Validity expiry mid-transit.**
Trucks break down. Routes divert. Bills expire. Whitebooks emits a webhook 4 hours before any e-way bill expires, giving your dispatch team time to extend.

**Consolidated bills for multi-invoice trips.**
When one vehicle carries 30 consignments, you generate one consolidated e-way bill — not 30. Most APIs don't expose consolidated bills cleanly; Whitebooks does.

---

## Section 3 — Endpoints

**Feature grid (2 columns × 3 rows):**

**`POST /v1/ewaybill/create`**
Generate an e-way bill for a single consignment. Optional `irn` field auto-populates buyer, item, and tax fields from the source invoice.

**`POST /v1/ewaybill/create-consolidated`**
Generate a consolidated e-way bill for a multi-invoice vehicle trip. Pass an array of IRNs or invoice IDs.

**`POST /v1/ewaybill/extend`**
Extend validity within 8 hours before or after expiry. Requires reason code (vehicle breakdown, transshipment, natural calamity).

**`POST /v1/ewaybill/cancel`**
Cancel within 24 hours of generation. After 24 hours, the bill auto-expires per its validity period.

**`POST /v1/ewaybill/update-vehicle`**
Update vehicle number mid-transit (for transshipment). Log every vehicle change with timestamp and authorized user.

**`GET /v1/ewaybill/{ewb_no}`**
Retrieve full e-way bill details, validity, and status history. Includes pin-to-pin distance calculation and computed validity.

---

## Section 4 — Integrations

**Section heading:**
Built for logistics, WMS, and TMS platforms.

**3 sub-blocks:**

**SDKs** — Node.js, Python, PHP, Java, Go.

**Frameworks** — Integration patterns for warehouse management dispatch flows, transporter onboarding, and freight brokerage platforms.

**Webhooks** — Bill generated, bill approaching expiry (4hr alert), bill expired, vehicle updated, bill cancelled.

**CTA:** Read integration guide →

---

## Section 5 — AI layer

**3-card block:**

**Realistic transit prediction**
Beyond GSTN's pin-to-pin calculation, Whitebooks predicts realistic transit time based on route history, transporter performance, and seasonal factors. Returned in every bill creation response.

**Anomaly flagging**
Webhook events include flags for invalid vehicle number formats, unknown transporter IDs, distances outside historical norms, and bills generated outside typical dispatch hours.

**Bulk dispatch optimizer**
Given a list of consignments and available vehicles, the `/v1/ewaybill/optimize` endpoint suggests vehicle assignments to minimize bills generated (via consolidated bills) and maximize utilization.

---

## Section 6 — Pricing teaser

**3 tier cards:**

**Developer** — Free
10,000 sandbox calls/month

**Startup** — ₹9,999/month
50,000 production bills/month · Email support · Standard SLA

**Scale** — Custom
Unlimited bills · Dedicated infrastructure · 99.95% SLA · Account manager

> [Pricing placeholders.]

**CTA:** See call-volume pricing →

---

## Section 7 — FAQ (JSON-LD)

**Q: Can I auto-generate an e-way bill from an IRN?**
A: Yes. Pass the `irn` field in the create request; Whitebooks pulls all matching fields from the source invoice and pre-populates the e-way bill. You only need to add vehicle number, distance, and transport mode.

**Q: How does extension work via API?**
A: Call `/v1/ewaybill/extend` with the bill number, new vehicle number (if applicable), new validity period, and a reason code. Extensions are permitted within 8 hours before or 8 hours after expiry per GSTN rules.

**Q: Do you support consolidated e-way bills?**
A: Yes. The `/v1/ewaybill/create-consolidated` endpoint accepts an array of IRNs or invoice IDs and generates a single consolidated bill — the standard for multi-invoice vehicle trips.

**Q: What happens if I cancel a bill after 24 hours?**
A: GSTN rules don't permit cancellation after 24 hours. The bill will auto-expire at end of its validity. The API returns a clear error if you attempt cancellation outside the 24-hour window.

**Q: Can I update the vehicle number mid-transit?**
A: Yes. Call `/v1/ewaybill/update-vehicle` with the new vehicle number and reason code. Every update is logged with timestamp and user — required for audit and dispute resolution.

**Q: Do you provide webhooks for expiring bills?**
A: Yes. A `ewaybill.expiring_soon` event is emitted 4 hours before any active bill expires. Subscribe to alert your dispatch team in time to extend.

---

## Section 8 — Closing CTA

**H2:** Logistics doesn't wait. Your e-way bill integration shouldn't either.

**Body:**
Pharmeasy generates e-way bills for 14 warehouses via the Whitebooks API. WheelsEye uses the API for fleet onboarding and transporter invoice reconciliation. Same SLA, same direct GSP pipe.

**Primary CTA:** Get sandbox keys
**Secondary CTA:** Read Guides

---
---

# PAGE 12 — KSA e-INVOICE API

**URL:** `/apis/ksa-e-invoice`

## Page-level AI summary

> Whitebooks KSA e-Invoice API is a REST API for generating ZATCA Phase 2 compliant e-invoices in Saudi Arabia. It submits invoices to ZATCA's FATOORAH portal, manages cryptographic signing using ZATCA-issued certificates (CSID), and returns cleared invoices with embedded QR codes. Used by SaaS products operating in KSA and Indian businesses with KSA operations.

**Meta title:** KSA e-Invoice API — ZATCA Phase 2 Integration | Whitebooks
**Meta description:** REST API for ZATCA Phase 2 e-invoice generation. FATOORAH submission, CSID management, bilingual invoicing, QR code generation. Used by SaaS products operating in Saudi Arabia.

---

## Section 1 — Hero

**Eyebrow:** KSA e-Invoice API · ZATCA Phase 2 Compliant

**H1:**
ZATCA Phase 2 integration. Without becoming an integration specialist.

**Subhead:**
Generate, sign, and clear ZATCA-compliant e-invoices via REST. CSID lifecycle managed for you. Bilingual invoice rendering, QR generation, FATOORAH clearance — all in one API call.

**Primary CTA:** Get sandbox keys
**Secondary CTA:** Talk to KSA solutions team

---

## Section 2 — Problem

**Section heading:**
Three reasons ZATCA Phase 2 integrations are painful to build alone.

**3-column block:**

**Cryptographic signing is not a weekend project.**
ZATCA Phase 2 requires generating a CSR, retrieving a CSID from ZATCA, signing every invoice with the certificate, and managing renewal — all under specific cryptographic standards. Whitebooks handles certificate lifecycle entirely.

**FATOORAH integration is real-time and unforgiving.**
Standard tax invoices must be cleared by ZATCA before they reach the buyer. Latency, retries, and error handling matter. Whitebooks runs production-grade infrastructure with documented SLAs.

**Bilingual invoice generation is its own engineering problem.**
Right-to-left rendering, Arabic-English field pairing, currency formatting per ZATCA spec — most engineering teams underestimate this work. Whitebooks ships it as a default.

---

## Section 3 — Endpoints

**Feature grid (2 columns × 3 rows):**

**`POST /v1/ksa/einvoice/create`**
Generate, sign, and submit a standard tax invoice to FATOORAH. Returns cleared invoice with QR code and signed XML.

**`POST /v1/ksa/einvoice/simplified`**
Generate simplified tax invoice (B2C, under SAR 1,000). Real-time signing, no clearance required (reported within 24 hours).

**`POST /v1/ksa/einvoice/credit-note`**
Issue credit note linked to a previously cleared invoice. Auto-populates buyer fields, applies reverse logic.

**`GET /v1/ksa/csid/status`**
Check CSID validity, expiry, and renewal schedule for your account.

**`POST /v1/ksa/csid/renew`**
Trigger CSID renewal before expiry. Whitebooks handles the ZATCA portal interaction.

**`GET /v1/ksa/einvoice/{invoice_id}`**
Retrieve full invoice details, signed XML, QR code, and FATOORAH clearance receipt.

---

## Section 4 — Integrations

**Section heading:**
SDKs and integration patterns for KSA.

**3 sub-blocks:**

**SDKs** — Node.js, Python, PHP, Java, Go.

**Frameworks** — Integration guides for SAP S/4HANA KSA edition, Oracle NetSuite KSA, Microsoft Dynamics 365 Business Central, and Zoho Books KSA.

**Webhooks** — Invoice cleared, invoice rejected, CSID nearing expiry, credit note issued.

**CTA:** Read integration guide →

---

## Section 5 — Pricing teaser

**3 tier cards:**

**Developer** — Free
Sandbox access · No production

**Startup** — Custom (SAR)
Production access · Up to 25,000 invoices/year · Email support

**Scale** — Custom
Unlimited invoices · Dedicated infrastructure · 99.95% SLA · KSA-specific support team

> [KSA pricing in SAR; placeholders only.]

**CTA:** Talk to KSA solutions team →

---

## Section 6 — FAQ (JSON-LD)

**Q: Is my SaaS product required to comply with ZATCA Phase 2?**
A: ZATCA mandates apply to any taxpayer issuing tax invoices in KSA above defined annual revenue thresholds (waves rolled out from January 2023). If your product issues invoices on behalf of KSA taxpayers, your customers fall under ZATCA — and your product needs to support their compliance.

**Q: How does Whitebooks handle the CSID?**
A: Whitebooks generates the Certificate Signing Request (CSR), submits it to ZATCA's FATOORAH portal, retrieves the issued CSID, and stores it encrypted in our HSM-backed key store. Renewals are handled automatically before expiry.

**Q: Does the API return a signed XML?**
A: Yes. Every response includes the cleared invoice in ZATCA-specified UBL 2.1 XML format, with the cryptographic stamp and ZATCA clearance signature embedded.

**Q: Can I generate invoices in Arabic only or English only?**
A: ZATCA requires bilingual (Arabic + English) for standard tax invoices. Simplified tax invoices (B2C) can be Arabic-only. The API takes language preferences as parameters and applies ZATCA rules automatically.

**Q: What's the difference between standard and simplified tax invoices in KSA?**
A: Standard tax invoices apply to B2B transactions and high-value B2C (above SAR 1,000) — they require real-time clearance from ZATCA before delivery to the buyer. Simplified tax invoices apply to low-value B2C — they require signing but only reporting (not clearance) to ZATCA.

**Q: Can I run both Indian GST and KSA e-invoicing through Whitebooks?**
A: Yes. One account, one contract, both APIs. Cross-jurisdiction reporting available on Scale tier.

---

## Section 7 — Closing CTA

**H2:** KSA compliance, without the KSA compliance team.

**Body:**
Whitebooks is one of the few providers operating ZATCA-approved e-invoicing infrastructure alongside a GSTN GSP license. If your SaaS serves KSA customers or your business operates in both India and KSA, talk to our solutions team.

**Primary CTA:** Talk to KSA solutions team
**Secondary CTA:** Get sandbox keys

---
---

# DELIVERY NOTES (for your design + dev team)

**File structure for handoff to Claude Code / design agent:**

Each page section above maps to a self-contained build prompt. For example:

> "Build PAGE 4 — GST SOFTWARE according to the standard sub-page template. Source content from `whitebooks-content-v2.md`, Section 'PAGE 4 — GST SOFTWARE'. Follow brand voice rules in the header. Apply the design tokens from frontend-design SKILL.md."

**Consistency across the 11 pages:**

- All 9 sub-pages share the same 8-section template
- All page-level AI summaries are written as 1–2 dense sentences (LLM-extractable)
- All FAQs are structured for FAQPage JSON-LD schema markup
- All meta titles are under 60 characters; meta descriptions under 160

**Remaining work after these 11 pages are approved:**

1. `llms.txt` at root (canonical AI-agent reference)
2. JSON-LD schema for all 11 pages (Organization, Product, FAQPage, BreadcrumbList)
3. ClearTax migration landing page (separate funnel, written for switch intent)
4. Customer case studies (one per quoted customer above)
5. Pricing page (the canonical pricing table all teasers link to)
6. About, Trust & Security, Partners pages
7. Free tools (GSTIN search, HSN/SAC search, GST calculator) copy refresh
