Build the Whitebooks.in homepage as a production-grade React component — an AI-first B2B compliance SaaS website for Indian enterprise finance teams and CA firms. The product is a GST/e-invoicing/e-way bill platform built by a licensed government GSP (think: Stripe for Indian tax infrastructure).

---

## Brand + Colour

Primary brand colour: **#d33568** (a confident magenta-rose — not a soft pink, not a bright red. Treat it like Stripe treats their violet: one sharp accent on a mostly dark or mostly white canvas.)

Palette to derive:
- Use #d33568 for: active toggle state, primary CTA buttons, key stat highlights, animated underlines, hover accents
- Background: deep near-black (#0a0a0f) — dark mode, editorial feel
- Surface/card: #111118 with subtle #d33568/5% tint or a fine 1px border at #d33568/15%
- Body text: #e8e8f0 (slightly warm white, not pure white — reduces harshness)
- Muted text: #6b6b80
- Code/monospace highlight: #d33568/20% background, #d33568 text
- Success/matched: #22c55e
- Warning/mismatch: #f59e0b
- Never use purple gradients. Never use teal.

Typography:
- Display/H1: **Syne** (geometric, architectural — feels like infrastructure, not consumer SaaS)
- Body: **DM Sans** (clean, legible, modern without being generic)
- Monospace (for code blocks and API snippets): **JetBrains Mono**
- Load from Google Fonts

---

## The toggle — implement first, it governs everything

A sticky header component with:
- Whitebooks wordmark (left)
- Center: a two-pill toggle **[ Softwares ] [ APIs ]**
  - Active pill: #d33568 background, white text, no border
  - Inactive pill: transparent, muted text, 1px border at #d33568/30%, hover lifts to #d33568/10% bg
  - Clicking a pill scrolls to or reveals the corresponding hub section (or treat as tab state — Softwares content vs APIs content)
- Right: "Book a 20-min Demo" CTA button (outlined, #d33568 border and text, fills on hover)
- Header background: #0a0a0f at 90% opacity, backdrop-filter blur(12px), 1px bottom border at white/5%
- On brand homepage: neither pill is active by default. Both equal weight.

---

## Page sections to build (in order)

### 1. Hero
- Eyebrow label: small pill — "GST Suvidha Provider · Licensed by GSTN" — #d33568/15% bg, #d33568 text, 11px uppercase tracking-widest
- H1 (large, Syne, 64–80px desktop): "Compliance infrastructure for India's largest finance teams."
  - "Compliance infrastructure" — white
  - "India's largest finance teams." — #d33568
  - No gradient text. Solid colour split.
- Subhead (DM Sans, 18px, muted): "A 5-product software suite and a 4-product API suite for GST, e-invoicing, e-way bills, and accounting — used by P&G, IBM, Razorpay, and 12,000+ businesses."
- Two CTAs side by side:
  - Primary: solid #d33568 button, white text — "Book a 20-min demo"
  - Secondary: ghost button — "Browse the product suite ↓"
- Microcopy below CTAs (small, muted, italic): "Migrating from ClearTax TaxCloud? We import your data in under 45 minutes →"
- Background: dark. Add a very subtle radial gradient from #d33568/8% centred behind the H1. Add a fine grid pattern (CSS, 1px lines, white/3%) across the entire hero section for depth.
- Hero visual: a fake but realistic "terminal + dashboard" split. Left half: dark terminal card showing a curl command to api.whitebooks.in returning an IRN JSON response (use JetBrains Mono, syntax-highlighted). Right half: a mock GSTR-2B reconciliation UI card showing "4,238 invoices matched ✓", "17 mismatches ⚠", "3 vendors flagged 🔴" — use real-looking data rows, not lorem ipsum. Both cards float slightly with a subtle drop shadow and a 1px #d33568/20% border. Animate them in on load (slide up + fade, staggered 200ms apart).

### 2. Logo wall
- Section label: "The companies that can't afford to get compliance wrong."
- Two-line logo ticker (infinite scroll animation, CSS): P&G · IBM · Razorpay · Pharmeasy · KPMG · Cars24 · Hindustan Unilever · Aditya Birla · SBI · Accenture · Philips · TVS · Yamaha · WheelsEye · PepsiCo · Coca-Cola · EaseMyTrip
- Top row scrolls left. Bottom row scrolls right. Logos: white, 60% opacity, hover to 100%.
- Fade masks on left and right edges (gradient from #0a0a0f to transparent).
- Stat strip below: three stats in a row — "10 Cr+ invoices" · "12,000+ businesses" · "5,000+ CA firms" — each in Syne, large (36px), #d33568 number + white label below.

### 3. Softwares / APIs hub cards (the routing section — ties to the toggle)

Tab state: "Softwares" shown by default.

**Softwares tab — 5 product cards in a 3-2 grid:**

Each card:
- Dark surface (#111118), 1px border (#d33568/15%), border-radius 12px
- Icon (choose relevant SVG icon per product — not stock icons, geometric/line-style)
- Product name (Syne, 18px, white)
- One-liner description (DM Sans, 14px, muted)
- Key feature pill (small, #d33568/10% bg, #d33568 text)
- "Explore →" link (muted, hover: #d33568)
- Hover state: border lifts to #d33568/40%, very subtle #d33568/5% background wash, card translates Y by -2px

Cards (use this exact content):
1. **Accounting Software** — "Auto-journalled books from sales, purchases, and bank feeds." · Pill: "Real-time bank reconciliation"
2. **GST Software** — "File GSTR-1, 3B, 9, 9C across unlimited GSTINs. Auto-reconcile 2B in 60 seconds." · Pill: "GSP-licensed direct filing"
3. **e-Invoice Software** — "Generate IRNs at scale. 30-day window enforcement. Direct IRP integration." · Pill: "Sub-200ms IRN generation"
4. **e-Way Bill Software** — "Generate, extend, cancel from one screen. Auto-populate from IRN." · Pill: "Bulk + scheduled generation"
5. **KSA e-Invoicing** — "ZATCA Phase 2 compliant. Cryptographic stamping, QR codes, Fatoorah integration." · Pill: "ZATCA-approved infrastructure"

**APIs tab — 4 product cards in a 2-2 grid:**

Same card style. Cards:
1. **GST API** — "File returns, pull GSTR-2A/2B, validate GSTINs. JSON in, JSON out." · Pill: "Direct GSP pipe to GSTN"
2. **e-Invoice API** — "Generate IRNs in 5 lines of code. Bulk endpoints. Webhook on success." · Pill: "180ms p50 latency"
3. **e-Way Bill API** — "Generate, extend, update, cancel. Auto-populate from IRN." · Pill: "Direct NIC integration"
4. **KSA e-Invoice API** — "Fatoorah clearance. Cryptographic stamping. Bilingual Arabic-English." · Pill: "ZATCA Phase 2"

Tab switching: animate card grid out (opacity 0, translateY 8px) and new grid in (opacity 1, translateY 0) over 200ms.

### 4. Why Whitebooks — 3-column feature cards

Section heading: "Three reasons finance teams move to Whitebooks." (Syne, 36px)

Three cards, full-width row:
- Card 1: "Direct GSP license" — icon: a government seal or verified badge line icon — body text from the doc
- Card 2: "AI that does the work" — icon: a circuit/neural node line icon
- Card 3: "India + KSA on one platform" — icon: a globe with two pins line icon

Each card: number in top-left corner ("01", "02", "03") in huge Syne text, 80px, #d33568/10% — decorative, not interactive. Card border glows very subtly on hover (box-shadow: 0 0 20px #d33568/15%).

### 5. AI layer section

Section heading: "AI that reconciles, predicts, and explains — not just a chatbot."

Background for this section: slightly lighter surface (#13131a), full-bleed. Subtle dot-grid pattern.

4-card 2×2 grid:
- Card 1: "Invoice matching at scale" — body: "Reconciles fuzzy vendor names, rounding deltas, and split invoices against GSTR-2B in seconds."
- Card 2: "Anomaly detection before filing" — body: "Scans every return for the 47 most common GSTN rejection causes before you click submit."
- Card 3: "Notice prediction" — body: "Flags returns likely to trigger Section 61 scrutiny — based on ITC mismatch, turnover variance, and HSN anomalies."
- Card 4: "Compliance copilot" — body: "Ask 'Why did my ITC drop ₹4.2L in October?' Get an answer from your live data with source rows linked."

Card 4 ("Compliance copilot") should visually look like a minimal chat UI — a dark input field at the bottom with a placeholder "Ask anything about your GST data...", and 1-2 mock Q&A messages above it. Use #d33568 for the "send" icon and the AI response label. This is the most important card — give it double column width on desktop or a slightly distinct elevated style.

Add small label under the section: "Built on the Anthropic API. Your data never used to train models." — small, muted, #d33568 dot prefix.

### 6. Proof — stats + quote

Split layout: left = quote card, right = 4 stats stacked.

Quote card:
- Large opening quotation mark in #d33568, 80px, Syne
- Quote text: "We moved our entire India e-invoicing and e-way bill stack onto Whitebooks' SAP connector. What took three steps inside SAP plus a portal upload is now one button."
- Attribution: B V Srinivasababu — Senior Manager, IT Applications · NSL
- Card has a left border of 3px solid #d33568

Stats (right column):
- 10 Cr+ invoices filed
- 12,000+ businesses
- 5,000+ CA firms
- 99.95% API uptime SLA
Each stat: Syne 48px #d33568 number, DM Sans 14px white label below. Animate count-up on scroll into view.

### 7. Closing CTA section

Full-bleed section. Background: #d33568. Dark text on brand colour.
H2 (Syne, white): "One license. One platform. Every Indian filing."
Body (DM Sans, white/80%): "Whitebooks gives finance teams and developers a directly licensed GSP, an AI-native product, and a developer API that doesn't make you build the compliance yourself."
Two CTAs: "Book a 20-min Demo" (white bg, #d33568 text) + "Browse the product suite" (white outline, white text)

---

## UX + motion requirements

- Page load: staggered fade-in-up on hero elements (eyebrow → H1 → subhead → CTAs → hero cards), each 80ms apart
- Scroll-triggered reveals: every section fades up as it enters the viewport (IntersectionObserver, threshold 0.15)
- Logo ticker: infinite smooth CSS scroll animation, pauses on hover
- Stat counter: count-up from 0 to target value over 1.2s on first scroll into view
- Toggle switching: 200ms cross-fade on content swap
- Card hover: translateY(-2px) + border glow, transition 150ms ease-out
- No jarring snaps. No scroll-jacking. No parallax.

---

## Technical requirements

- Single React component (JSX + Tailwind utility classes where helpful, but CSS-in-JS or inline styles for anything custom)
- Google Fonts loaded via @import in a style tag: Syne (400, 700), DM Sans (400, 500), JetBrains Mono (400)
- All content from the sections above — real copy, not lorem ipsum
- Mobile responsive: H1 scales to 36px on mobile, grid collapses to 1-column, toggle pills shrink but remain visible
- The toggle tabs must be functional (React useState for Softwares/APIs switch)
- No external icon libraries — draw icons as inline SVG paths
- No placeholder images — build the hero cards as real code (terminal + dashboard UI), not image tags
- Accessible: proper heading hierarchy, aria-labels on toggle, sufficient colour contrast on all text

---

## What makes this unforgettable

The one thing a visitor should remember: **a dark, precise, infrastructure-grade tool with one sharp pink accent that signals "this is a serious product used by serious companies."** Think Bloomberg Terminal meets Stripe Dashboard. Not a consumer app. Not a startup landing page template. The kind of site where IBM's IT procurement team sees it and immediately thinks "this vendor knows what they're doing."
