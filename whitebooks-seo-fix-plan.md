# Whitebooks — SEO & AEO Fix Plan
**Based on:** SEO & AEO Audit Report, May 2026 (Score: 4.1 / 10)
**Aligned to:** Site Content v2 (11-page architecture)
**Principle:** Fix every audit issue. Break zero SEO equity. Ship in order of priority.

---

## How this document works

Three sections:

1. **Immediate fixes** — Ship on the existing PHP stack before the Astro migration begins. No content changes. Server config, meta tags, schema markup only. Each fix is a day's work or less.

2. **Migration-phase fixes** — Baked into the new site architecture (v2 content doc). URL structure changes, content rewrites, new pages. These go live when the new site goes live — not before.

3. **301 redirect map** — Every old URL that changes. This is the most critical SEO-continuity document. Nothing ships without this being implemented first.

---

## Section 1 — Immediate fixes (ship NOW, on PHP stack)

These do not require the new site. Do not wait for Astro. Every week these remain unfixed is measurable lost traffic.

---

### FIX-01 · Blog 403 — CRITICAL · Effort: Hours · Impact: Very High

**The problem (from audit §4.1):**
`/blog/` returns a 403 to Googlebot and all users. Every blog post is invisible to Google, Perplexity, and ChatGPT web search. The blog is linked from nav and sitemap — Google knows it exists and is being actively denied access.

**The fix:**
Identify whether the block is at CloudFlare (bot-blocking rule) or `.htaccess`.

```bash
# Check .htaccess
grep -n "blog\|403\|deny" /path/to/webroot/.htaccess

# Check Apache vhost config
grep -n "blog\|403\|deny" /etc/apache2/sites-enabled/*.conf
```

- If CloudFlare: add Googlebot, Bingbot, Perplexitybot, ClaudeBot to the allow list in the Firewall Rules panel.
- If `.htaccess` or server config: remove the deny rule for `/blog/`.
- Verify: `curl -A "Googlebot" https://whitebooks.in/blog/` should return 200.
- Submit `/blog/` to Google Search Console for re-indexing immediately after.

**SEO continuity:** No URLs change. This is a pure unblock.

---

### FIX-02 · Homepage title tag — CRITICAL · Effort: Minutes · Impact: High

**The problem (from audit §3.1):**
Current `<title>`: `Intelligent Business Management Suite | WhiteBooks`
This contradicts the H1, the meta description, and every buyer intent signal. Nobody in India searches "Intelligent Business Management Suite."

**The fix — change the `<title>` tag on `/` to:**
```html
<title>GST Software, e-Invoice & Accounting for Indian Businesses | Whitebooks</title>
```

**Also fix the H1** if it currently doesn't lead with GST/compliance. New H1 from v2 content doc:
```
Compliance infrastructure for India's largest finance teams.
```

**Do not change** the URL, the canonical, or any other on-page element. Title and H1 only.

**SEO continuity:** Title change can temporarily shuffle rankings (2–4 weeks) but will improve click-through rate from day one. Expected net positive within 30 days.

---

### FIX-03 · Remove meta-keywords sitewide — P1 · Effort: Hours · Impact: Medium

**The problem (from audit §3.2):**
The GST Software page has 40+ keywords in `<meta name="keywords">`. Bing actively treats keyword-stuffed meta-keywords as a spam signal. Google ignores them entirely.

**The fix:**
Strip `<meta name="keywords">` from every page template. In PHP, this is typically one line in a shared header partial.

```php
// Remove this line from header.php or equivalent:
<meta name="keywords" content="...">
```

Do not replace it. Do not add fewer keywords instead. Remove entirely.

**SEO continuity:** Removing meta-keywords has zero negative SEO impact. It is a pure win.

---

### FIX-04 · Fix `/resoures/` nav typo sitewide — P1 · Effort: Hours · Impact: Medium

**The problem (from audit §4.3):**
Every link in the Resources nav section uses `/resoures/` — missing the letter 'c'. This appears on every page in the site nav. A sitewide recurring 404.

**The fix:**
Find and replace in the shared nav template:
```
/resoures/ → /resources/
```

Verify: all three affected nav links (Partners, Support, Videos) now resolve to 200.

**SEO continuity:** Pure fix. No URL is being deleted or changed — only correcting a typo that was 404ing.

---

### FIX-05 · Fix Twitter card on GST Software page — P2 · Effort: Minutes · Impact: Low

**The problem (from audit §3.3):**
The GST Software page `twitter:description` tag contains accounting software copy. Every social share of this URL shows the wrong preview.

**The fix:**
On `/softwares/gst-software`, update:
```html
<meta name="twitter:description" content="File GSTR-1, 3B, 9, and 9C across unlimited GSTINs. Auto-reconcile GSTR-2B against your purchase register. Built by a GSTN-licensed GSP. Used by 5,000+ CA firms.">
```

**SEO continuity:** No impact on organic rankings. Social sharing fix only.

---

### FIX-06 · Organization JSON-LD schema — homepage · P1 · Effort: Half day · Impact: High

**The problem (from audit §4.2, §6.2):**
No structured data anywhere on the site. Homepage has no entity definition. Google's Knowledge Graph has no machine-readable record of what Whitebooks is, who operates it, or what credential it holds.

**The fix — add this JSON-LD block to the `<head>` of the homepage:**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Whitebooks",
  "url": "https://whitebooks.in",
  "logo": "https://whitebooks.in/assets/images/whitebooks-logo.png",
  "description": "GST Suvidha Provider (GSP) licensed by GSTN. Cloud-native compliance platform offering GST filing, e-invoicing, e-way bill, and accounting software for Indian businesses and CA firms.",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "4999",
    "priceCurrency": "INR",
    "priceValidUntil": "2026-12-31"
  },
  "creator": {
    "@type": "Organization",
    "name": "BVM IT Consulting Services India Private Limited",
    "url": "https://whitebooks.in",
    "logo": "https://whitebooks.in/assets/images/whitebooks-logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-90321-11788",
      "contactType": "sales",
      "availableLanguage": ["English", "Hindi"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/whitebooks-in",
      "https://twitter.com/whitebooks_in"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    }
  }
}
</script>
```

> **Fill in before shipping:** Confirm logo URL path, exact registered address, and social profile URLs. Replace placeholder `sameAs` URLs with the real ones.

**SEO continuity:** Additive markup. No URLs change. No content changes.

---

### FIX-07 · FAQPage JSON-LD on existing product pages · P1 · Effort: 1 day · Impact: High (AEO)

**The problem (from audit §4.2, §6.3):**
Every product page has well-written FAQ sections. None have FAQPage schema. These are the exact Q&A pairs AI Overviews and Perplexity cite — but without markup, they can't be attributed with confidence to Whitebooks.

**The fix:**
Add FAQPage JSON-LD to 6 pages. The FAQ content already exists in the v2 content doc — this is a markup task, not a writing task.

**Pages to receive FAQPage schema (in priority order):**
1. `/softwares/gst-software` (or new URL `/softwares/gst`)
2. `/softwares/e-invoicing-software` (or `/softwares/e-invoice`)
3. `/api/gst-api-for-developers` (or `/apis/gst`)
4. `/softwares/accounting-software` (or `/softwares/accounting`)
5. `/softwares/e-way-bill-software` (or `/softwares/e-way-bill`)
6. `/api/e-invoice-api-for-developers` (or `/apis/e-invoice`)

**Template (copy this structure for each page, populate with that page's FAQ Q&A pairs from the v2 doc):**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Does Whitebooks GST Software file GSTR-9 and 9C?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Whitebooks supports GSTR-1, 1A, 3B, 4, 5, 6, 7, 8, 9, 9A, 9C, IFF, ITC-04, and CMP-08. Bulk filing across multiple GSTINs is included on CA Firm and Enterprise plans."
      }
    },
    {
      "@type": "Question",
      "name": "Can I file from Tally without exporting CSVs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The Whitebooks Tally Connector pushes data directly from Tally Prime to Whitebooks every 5 minutes. No CSV exports, no manual mapping, no broken reconciliations from version mismatches."
      }
    }
    // ... add remaining Q&A pairs from the v2 content doc FAQ section for that page
  ]
}
</script>
```

**Important:** Use the exact FAQ copy from the v2 content doc for each page. Do not paraphrase — schema content and visible content should match.

**SEO continuity:** Additive markup on existing pages. No URL or content changes. Rich results (FAQ dropdowns in SERPs) typically appear within 2–6 weeks of indexing.

---

### FIX-08 · llms.txt at root · P2 · Effort: Half day · Impact: High (AEO)

**The problem (from audit §6.1):**
No llms.txt. AI crawlers (Perplexity, Claude web indexer) have no structured declaration of what Whitebooks is, what it does, and what content is authoritative.

**The fix — create `/llms.txt` at the domain root:**

```
# Whitebooks — llms.txt
# Last updated: May 2026

## About
Whitebooks is a cloud-based compliance platform built by BVM IT Consulting Services India Private Limited, a directly licensed GST Suvidha Provider (GSP) under GSTN, Government of India.

## What we do
- GST filing software for CA firms and enterprise finance teams
- e-Invoicing software with direct IRP integration and IRN generation
- e-Way Bill software for logistics and dispatch operations
- Cloud accounting software for Indian businesses
- KSA (Saudi Arabia) ZATCA Phase 2 compliant e-invoicing
- REST APIs for all of the above, used by fintechs and enterprise IT teams

## Who we serve
- CA firms managing 50–5,000 clients
- Enterprise finance teams running ₹50Cr–₹5,000Cr in annual turnover
- Developers and fintechs embedding Indian compliance into their own products
- Businesses operating in both India and Saudi Arabia

## Key credentials
- GSP license held by BVM IT Consulting Services India Private Limited under GSTN
- 12,000+ businesses including P&G, IBM, Razorpay, and Hindustan Unilever
- 5,000+ CA firms
- 10 crore+ invoices processed
- 30,000+ active users across 8,000+ Indian cities
- ZATCA Phase 2 approved for KSA e-invoicing

## Products
- Accounting Software: https://whitebooks.in/softwares/accounting
- GST Software: https://whitebooks.in/softwares/gst
- e-Invoice Software: https://whitebooks.in/softwares/e-invoice
- e-Way Bill Software: https://whitebooks.in/softwares/e-way-bill
- KSA e-Invoicing Software: https://whitebooks.in/softwares/ksa-e-invoicing
- GST API: https://whitebooks.in/apis/gst
- e-Invoice API: https://whitebooks.in/apis/e-invoice
- e-Way Bill API: https://whitebooks.in/apis/e-way-bill
- KSA e-Invoice API: https://whitebooks.in/apis/ksa-e-invoice

## Key regulatory facts (as of May 2026)
- e-Invoicing mandatory for AATO ₹5Cr+ from April 1, 2026
- 30-day IRN reporting window for AATO ₹10Cr+
- GST 2.0 rate structure (5%, 18%, 40%) effective September 22, 2025
- IMS (Invoice Management System) live October 2025
- ZATCA Phase 2 live in Saudi Arabia

## Competitor differentiation
- Whitebooks holds a direct GSP license; most competitors resell GSP capacity
- Native SAP S/4HANA and Tally Prime connectors built in-house
- Operates KSA e-invoicing on the same platform as Indian GST

## Contact
- Sales: +91 90321 11788
- Website: https://whitebooks.in
- API docs: https://docs.whitebooks.in
- Status: https://status.whitebooks.in
```

Place this file at the webroot: `https://whitebooks.in/llms.txt` must return 200 with `Content-Type: text/plain`.

**SEO continuity:** New file. No existing URLs affected.

---

### FIX-09 · Sitemap verification · P2 · Effort: Hours · Impact: Medium

**The problem (from audit §4.4):**
Sitemap.xml accessibility was unverifiable during the audit.

**The fix:**
1. Verify `https://whitebooks.in/sitemap.xml` returns HTTP 200.
2. Check Google Search Console → Sitemaps — confirm it's submitted and shows no errors.
3. Ensure the sitemap includes: all software pages, all API pages, all tool pages, all connector pages, the blog index, and the services page.
4. Exclude pages returning non-200 (like the broken blog — fix FIX-01 first, then the blog can be included).

**SEO continuity:** Additive. No URLs change.

---

## Section 2 — Migration-phase fixes (baked into the new site)

These changes go live when the new Astro/v2 site launches. They are already incorporated into the v2 content doc. This section explains the SEO rationale for each structural decision and what must be in place to protect equity.

---

### MIG-01 · URL restructure — the highest-risk SEO step

**Old URL structure → New URL structure:**

| Old URL | New URL | Status code |
|---|---|---|
| `/` | `/` | No change |
| `/softwares/gst-accounting-software` | `/softwares/gst` | 301 |
| `/softwares/accounting-software` | `/softwares/accounting` | 301 |
| `/softwares/e-invoicing-software` | `/softwares/e-invoice` | 301 |
| `/softwares/e-way-bill-software` | `/softwares/e-way-bill` | 301 |
| `/softwares/ksa-e-invoicing-software` | `/softwares/ksa-e-invoicing` | 301 |
| `/api/gst-api-for-developers` | `/apis/gst` | 301 |
| `/api/e-invoice-api-for-developers` | `/apis/e-invoice` | 301 |
| `/api/e-way-bill-api-for-developers` | `/apis/e-way-bill` | 301 |
| `/api/ksa-e-invoice-api` | `/apis/ksa-e-invoice` | 301 |
| `/softwares` | `/softwares` | No change |
| `/services/our-services` | Split — see MIG-04 | 301 per service |

**Critical rules for 301s:**
- Every 301 must be in place **on launch day**, before the old site is taken down.
- Test every redirect with `curl -I <old-url>` and confirm the `Location:` header points to the new URL.
- Do not chain redirects (old → intermediate → new). Each old URL must jump directly to its new URL in one hop.
- Submit the updated sitemap to Google Search Console within 24 hours of launch.
- Monitor Google Search Console's Coverage report for 3–4 weeks post-launch for any unexpected 404s.

**Expected SEO impact:**
A correctly executed 301 redirect passes ~90–99% of link equity. Rankings for redirected pages may dip 1–3 positions for 2–4 weeks while Google re-crawls, then recover. This is normal and expected.

**What not to do:**
- Do not let old URLs return 404. Any page that was indexed must 301 to its new equivalent.
- Do not use 302 (temporary) redirects. Use 301 (permanent) exclusively.
- Do not redirect all old URLs to the homepage. Each old URL redirects to its functional equivalent.

---

### MIG-02 · New URL structure requires new meta titles + descriptions

The v2 content doc already contains the meta title and meta description for each page. These must be implemented exactly as written. Do not let the CMS auto-generate titles from page headings.

**Meta title format across all pages:**
`[Page-specific keyword phrase] | Whitebooks`

**Confirm these are set before launch (from v2 content doc):**

| Page | Meta title |
|---|---|
| `/` | `GST Software, e-Invoice & Accounting for Indian Businesses | Whitebooks` |
| `/softwares` | `Whitebooks Softwares — Accounting, GST, e-Invoice, e-Way Bill & KSA` |
| `/softwares/accounting` | `Accounting Software for Indian Businesses | Whitebooks` |
| `/softwares/gst` | `GST Filing Software for CA Firms and Finance Teams | Whitebooks` |
| `/softwares/e-invoice` | `e-Invoice Software for India — IRN Generation at Scale | Whitebooks` |
| `/softwares/e-way-bill` | `e-Way Bill Software for India — Bulk & Scheduled Generation | Whitebooks` |
| `/softwares/ksa-e-invoicing` | `KSA e-Invoicing Software — ZATCA Phase 2 Compliant | Whitebooks` |
| `/apis` | `Whitebooks APIs — GST, e-Invoice, e-Way Bill & KSA Developer APIs` |
| `/apis/gst` | `GST API for Developers — Direct GSP Pipe | Whitebooks` |
| `/apis/e-invoice` | `e-Invoice API for India — Generate IRNs at Sub-200ms | Whitebooks` |
| `/apis/e-way-bill` | `e-Way Bill API for India — Direct NIC Integration | Whitebooks` |
| `/apis/ksa-e-invoice` | `KSA e-Invoice API — ZATCA Phase 2 Developer API | Whitebooks` |

---

### MIG-03 · Full JSON-LD schema suite — implement on new site at launch

The new site must ship with complete schema on every page from day one. The v2 content doc has the FAQ content for each page already — this section specifies which schema type each page gets.

**Schema implementation map:**

| Page | Schema types to implement |
|---|---|
| `/` | Organization + SoftwareApplication |
| `/softwares` | CollectionPage + BreadcrumbList |
| `/softwares/accounting` | SoftwareApplication + FAQPage + BreadcrumbList |
| `/softwares/gst` | SoftwareApplication + FAQPage + BreadcrumbList |
| `/softwares/e-invoice` | SoftwareApplication + FAQPage + BreadcrumbList |
| `/softwares/e-way-bill` | SoftwareApplication + FAQPage + BreadcrumbList |
| `/softwares/ksa-e-invoicing` | SoftwareApplication + FAQPage + BreadcrumbList |
| `/apis` | CollectionPage + BreadcrumbList |
| `/apis/gst` | SoftwareApplication + FAQPage + BreadcrumbList |
| `/apis/e-invoice` | SoftwareApplication + FAQPage + BreadcrumbList |
| `/apis/e-way-bill` | SoftwareApplication + FAQPage + BreadcrumbList |
| `/apis/ksa-e-invoice` | SoftwareApplication + FAQPage + BreadcrumbList |
| `/tools/gstin-search` | WebApplication + FAQPage |
| `/tools/gst-calculator` | WebApplication + FAQPage |
| `/tools/hsn-search` | WebApplication + FAQPage |
| `/tools/multi-gstin-search` | WebApplication + FAQPage |

**SoftwareApplication template (apply to each product page, customise fields):**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Whitebooks GST Software",
  "url": "https://whitebooks.in/softwares/gst",
  "description": "GST filing and reconciliation software for CA firms and enterprise finance teams. File GSTR-1, 3B, 9, 9C across unlimited GSTINs. Auto-reconcile GSTR-2B in under 60 seconds. Built by a GSTN-licensed GSP.",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "4999",
    "priceCurrency": "INR",
    "priceValidUntil": "2026-12-31"
  },
  "creator": {
    "@type": "Organization",
    "name": "BVM IT Consulting Services India Private Limited",
    "url": "https://whitebooks.in"
  }
}
</script>
```

**BreadcrumbList template (apply to all sub-pages):**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://whitebooks.in"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Softwares",
      "item": "https://whitebooks.in/softwares"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "GST Software",
      "item": "https://whitebooks.in/softwares/gst"
    }
  ]
}
</script>
```

> Adjust `itemListElement` array per page. APIs pages: position 2 = "APIs" / `https://whitebooks.in/apis`.

---

### MIG-04 · Services — split into 4 pages

**The problem (from audit §3.4):**
Four nav items in Services all point to `/services/our-services`. One page doing four jobs = zero topical depth = ranks for nothing.

**The fix — create four distinct pages with four distinct URLs:**

| Page | URL | Primary keyword target |
|---|---|---|
| GST Registration Service | `/services/gst-registration` | "GST registration service India" |
| Compliance Management | `/services/compliance` | "GST compliance management service" |
| GST Audit Services | `/services/audit` | "GST audit services India" |
| Managed Filing Services | `/services/managed-filing` | "managed GST filing service India" |

**301 redirect:**
`/services/our-services` → `/services` (a new Services hub page, similar in structure to the Softwares hub at `/softwares`)

**What each page needs (minimum viable for SEO):**
- A unique H1 targeting the primary keyword
- 300–500 words of unique body copy describing that specific service
- 5–6 FAQ pairs in FAQPage schema
- An internal CTA linking to the relevant software product (e.g., GST Registration → links to GST Software)

**Unique content angle for each (so they don't cannibalize each other):**

`/services/gst-registration` — "Who needs it, what documents are required, how long it takes, and what Whitebooks handles versus what you provide." Target: businesses searching for someone to *do* the registration, not software to *manage* it.

`/services/compliance` — "What ongoing GST compliance covers: GSTR-1, 3B, annual returns, reconciliation, notice responses. Priced per GSTIN per year." Target: CFOs who want to outsource the entire function.

`/services/audit` — "What a GST audit involves, how Whitebooks prepares working papers, what documents a business needs to produce." Target: businesses that received a notice or are preparing for an audit.

`/services/managed-filing` — "Whitebooks handles filing for you — your data in, returns out, ARNs emailed to you." Target: small businesses that don't want to touch the software at all.

---

### MIG-05 · Connector pages — differentiate content to fix cannibalization

**The problem (from audit §3.5):**
Five connector pages with near-identical copy. Google picks one to rank and suppresses the others.

**Current pages (all returning near-duplicate content):**
- SAP for e-Invoicing
- SAP for e-Way Bill
- SAP for GST
- Tally for e-Invoicing
- Tally for e-Way Bill

**The fix — each page must have a unique angle, unique customer profile, and unique FAQ set:**

| Page | Unique angle | Target persona |
|---|---|---|
| SAP for e-Invoice | IRN generation inside SAP transaction. No dual-login. Certified SAP add-on. | SAP B1/S4 admin at Indian manufacturer |
| SAP for e-Way Bill | Auto-generate EWB from SAP delivery order. Fleet manager use case. | SAP logistics / warehouse manager |
| SAP for GST | GSTR-1 and 3B push from SAP directly. No CSV. ITC reconciliation inside SAP. | SAP FI/CO consultant or CFO |
| Tally for e-Invoice | Tally Prime sync every 5 min. IRN back-posted to Tally voucher. | CA managing client's Tally |
| Tally for e-Way Bill | Auto-populate EWB from Tally invoice. Single screen for dispatch. | Business owner running Tally |

**Minimum content differentiation per page:**
- Unique H1 (do not share even one H1 across the five pages)
- Unique hero subhead — different use case, different persona
- One customer quote or named use case specific to that connector
- Unique FAQ set (minimum 5 questions, none repeated across the five pages)
- Unique "integration steps" section — show the actual workflow for that specific ERP + product combination

**301 redirects:** Only if old connector URLs are changing. If URLs stay the same, no redirects needed — just content updates.

---

### MIG-06 · Tools pages — content depth and schema

**The problem (from audit §7):**
Tools pages have the highest organic traffic potential on the entire site (estimated 20,000–50,000 monthly visits at full optimization) and are almost entirely unoptimized.

**The fix — for each tool page:**

#### Tool 1: GST Number Search (`/tools/gstin-search`)
- **H1:** `GST Number Search — Verify Any GSTIN Instantly`
- **Add below the tool widget:** 200-word explanation of what GSTIN verification tells you, when to use it, and what to do if a vendor's GSTIN shows as inactive.
- **Add FAQ section** (6 Q&As):
  - "What is a GSTIN?" · "How do I verify a vendor's GST registration?" · "What does 'Cancelled' GSTIN status mean?" · "Can I verify multiple GSTINs at once?" · "Is GSTIN verification free?" · "How current is the GSTIN data?"
- **Add WebApplication schema**
- **Add internal CTA** at bottom: "Doing this manually for 1,000 vendors? Whitebooks' bulk GSTIN validation API handles 50,000 verifications per month. →"

#### Tool 2: GST Tax Calculator (`/tools/gst-calculator`)
- **H1:** `GST Calculator — Calculate GST for Any Amount or HSN Code`
- **Add below tool:** 150 words explaining how GST is calculated (inclusive vs exclusive), what input tax credit means, and where this tool fits in a filing workflow.
- **Add FAQ section** (5 Q&As):
  - "How is GST calculated in India?" · "What's the difference between CGST, SGST, and IGST?" · "What are the GST 2.0 tax slabs?" · "How do I calculate ITC?" · "Is this calculator updated for the September 2025 GST rate changes?"
- **Add WebApplication schema**
- **Add internal CTA:** "Filing GST manually? Whitebooks automates the calculation, reconciliation, and filing. →"

#### Tool 3: HSN/SAC Code Search (`/tools/hsn-search`)
- **H1:** `HSN/SAC Code Search — Find the Right GST Code for Any Product or Service`
- **Add FAQ section** (5 Q&As):
  - "What is an HSN code?" · "What is a SAC code?" · "Which GST rate applies to my product?" · "Is HSN code mandatory on invoices?" · "What changed in HSN codes under GST 2.0?"
- **Add WebApplication schema**
- **Internal CTA:** "Need to auto-populate HSN codes on 10,000 invoices? The Whitebooks e-Invoice API returns HSN rates on every request. →"

#### Tool 4: Multiple GSTIN Search (`/tools/multi-gstin-search`)
- **H1:** `Bulk GSTIN Verification — Search Multiple GST Numbers at Once`
- **Position clearly as the premium version** of the single search tool. This is the tool a CA or enterprise compliance team uses — make the copy reflect that.
- **Add FAQ section** (5 Q&As):
  - "How many GSTINs can I verify at once?" · "Can I upload a CSV of GSTINs?" · "What does this return for each GSTIN?" · "How do CAs use bulk GSTIN verification?" · "Is there an API version of this?"
- **WebApplication schema**
- **Internal CTA:** "Need this for 50,000 GSTINs per month? Use the Whitebooks GSTIN Validation API. →"

---

## Section 3 — Post-launch monitoring checklist

Ship the new site. Then do this, in order, within the first 14 days.

**Day 1:**
- [ ] Verify all 301 redirects return the correct `Location:` header (`curl -I <old-url>`)
- [ ] Submit updated sitemap to Google Search Console
- [ ] Verify `llms.txt` returns 200 at `https://whitebooks.in/llms.txt`
- [ ] Verify blog returns 200 (if FIX-01 was shipped on PHP stack before migration)
- [ ] Run Google Rich Results Test on homepage, GST Software, and GST API pages — confirm schema is parsed correctly

**Day 3–7:**
- [ ] Check Google Search Console → Coverage for unexpected 404s (old URLs not redirecting)
- [ ] Check Search Console → Sitemaps for crawl errors
- [ ] Verify no pages return soft 404 (200 status with "page not found" content)

**Day 14:**
- [ ] Recheck SERP positions for core terms: "GST software India", "e-invoice software", "GST API India", "GSTIN verification"
- [ ] Check rich results eligibility in Search Console → Enhancements → FAQs

**Week 4–6:**
- [ ] First appearance of FAQ rich results in SERPs expected (if schema is correct)
- [ ] Blog publishing rhythm should be underway — minimum 2 posts live
- [ ] Review AI Overview appearances: search "best GST software India" in an incognito browser and see if Whitebooks is cited

---

## Appendix: Content changes that are also SEO changes

The v2 content doc already fixes several audit issues through better copy. These are noted for the developer doing the build — you are not just building a design, you are fixing SEO with the structure and content of each component.

| Audit issue | How v2 content fixes it |
|---|---|
| Homepage H1/title mismatch (§3.1) | v2 H1 leads with "Compliance infrastructure..." — GST-adjacent, not a brand positioning statement |
| Thin differentiation between e-Invoice and e-Way Bill pages (§5) | v2 gives each page a unique Problem section, unique hero copy, and unique FAQ set |
| API pages have no developer-facing content visible to crawlers (§5) | v2 API pages lead with inline code blocks — actual content, not hidden behind JS |
| Services nav — 4 items, 1 page (§3.4) | v2 footer and nav restructured; MIG-04 above creates 4 pages |
| No code samples in HTML on API pages (§5) | v2 API pages include real cURL/Node/Python snippets in markdown — these render as visible HTML, not JS-only |
| Near-duplicate connector pages (§3.5) | Addressed in MIG-05 above — each connector gets a unique angle |
| GSP credential buried (§9.3) | v2 surfaces GSP license in hero eyebrow, homepage differentiation block, every product page meta description |

---

**End of SEO & AEO Fix Plan.**
**Version:** May 2026 · Based on audit + v2 content doc.
**Owner:** Assign one developer responsible for FIX-01 through FIX-09 before migration begins.
