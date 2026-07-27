Is this safe? Will Google flag 325–600 pages as spam?
Short answer: the "4 keywords per page" fear is aimed at the wrong thing, and the strategy itself is legitimate for API docs specifically — but only if you index selectively, not all 325 blindly.

First, kill the keyword worry. The keywords meta tag has been ignored by Google since 2009 — it is neither a ranking signal nor a spam signal. Nobody gets penalized for it. Keep it (harmless, and some AI crawlers read it), but it's irrelevant to your spam question. The thing Google actually polices is "scaled content abuse" (introduced March 2024, hard-enforced in the 2025–2026 core updates): mass-produced near-identical template pages with no unique value — the classic "best [service] in [city]" doorway pattern, where only a variable changes. Sites doing that saw 60–90% ranking losses.

Why API reference pages are the textbook legitimate exception. Google's own line is: templated pages survive if there's real data differentiation per page. An endpoint page isn't "city name swapped in" — each has a genuinely distinct HTTP method, path, parameter table, request/response schema, error codes, and code samples. Your OperationDetail already renders that substance. This is exactly why Stripe, Twilio, GitHub, and Postman index thousands of per-endpoint pages and rank — and why the API-docs SEO consensus (Redocly, SEO Blab) actively recommends item-based pagination: more indexable pages = more long-tail capture ("generate IRN API", "GSTR-2B API" are real dev searches you'd own).

Where you'd actually get hurt — three concrete risks for your spec:

GST has 281 endpoints and many have thin/duplicated description fields. Dumping all 281 into the index as near-empty pages is precisely what trips scaled-content detection. Fix: index selectively. Index the substantive endpoints + the ~30 tag-level overview hubs; noindex, follow the thin/variant ones. My template already emits noindex for deprecated ops — extend that to a thin-content check (!op.description or a manual skip list).
AI-padding to hit a word count is the single most-cited way to get reclassified as spam. Don't. Ship the real reference content or noindex the page.
No penalty for having 600 pages — the penalty is for 600 low-value pages. Volume alone is fine (Stripe has far more).
Verdict: do it, but not naively. It's optimal for developer discovery and it's proven precedent — provided you (a) keep real reference content on each indexed page (you have it), (b) index selectively rather than all 325, (c) never pad with filler, (d) ship a sitemap + internal links. That turns it from "programmatic spam" into "structured reference SEO."

The template
I built src/seo/apiSeo.ts — deliberately one generator, not 325 files. Hand-authoring 325 SeoMeta objects would drift the instant a spec changes; this derives a strong baseline from the spec (always in sync) and merges field-level OVERRIDES for the handful of endpoints worth tuning:


final = { ...generated, ...OVERRIDES[`${apiType}:${opSlug}`] }
It produces title, description (cleaned from the spec, sentence-boundary-aware), keywords, aiSummary, robots (auto-noindex for deprecated), OG, and Twitter per endpoint.

Steps to roll it out (in order)
1. Wire it into ApiDocPage — replace the meta derivation at ApiDocPage.tsx:145-153:


import { buildApiEndpointSeo } from '../../seo/apiSeo';

const meta = selectedOp ? buildApiEndpointSeo(apiType, selectedOp) : null;
const pageTitle = meta?.title ?? `${apiLabel} Documentation — WhiteBooks Developer Portal`;
const pageDesc  = meta?.description ?? apiDesc;
Then spread it into SeoHead so keywords/aiSummary/robots flow through:


{meta
  ? <SeoHead {...meta} />
  : <SeoHead title={pageTitle} description={pageDesc} canonical={canonicalUrl} robots={SITE.defaultRobots} og={{...}} twitter={{...}} />}
Keep your existing buildTechArticleSchema / buildBreadcrumbSchema block — just feed it meta.title / meta.description / meta.keywords for consistency.

2. Add a thin-content guard in apiSeo.ts (turn the deprecated check into: op.deprecated || !op.description ? 'noindex, follow' : SITE.defaultRobots). This is your anti-spam lever.

3. Make prerendering spec-driven — this is the step that makes any of it crawlable (right now scripts/prerender.ts:28 hardcodes 14 routes, so zero endpoint pages ship in static HTML). Loop the specs, and skip the ones you noindex so you don't emit thin static files:


import { normalizeSpec } from '../src/utils/normalizeSpec';
import { openApiSpec } from '../src/data/openapi-spec';
import { operationToSlug } from '../src/features/developer/utils/operationSlug';

const API_KEYS = { 'gst-api':'gst-api', 'e-invoice-api':'e-invoice-api', 'e-way-bill-api':'e-way-bill-api', 'ksa-e-invoice-api':'ksa-e-invoice-api' };
for (const [key, slug] of Object.entries(API_KEYS))
  for (const op of normalizeSpec(openApiSpec(key)))
    if (op.description && !op.deprecated)          // only index substantive endpoints
      ROUTES.push({ url: `/developer/${slug}/${operationToSlug(op.method, op.path)}` });
4. Generate sitemap.xml from the same filtered list (only indexable URLs). Submit in Search Console.

5. Tune, don't mass-author. Add OVERRIDES entries only for your top-demand endpoints (verify GSTIN, generate IRN, generate e-way bill). Leave the rest on the baseline.

Want me to apply steps 1–3? I'd do it behind the thin-content guard so we start conservative and expand the indexed set as Search Console shows which pages earn impressions.

Sources: Google scaled content abuse policy · Programmatic SEO after the 2026 update · pSEO quality rules to avoid thin content · SEO for API docs (Redocly) · Surfacing API reference pages in search (SEO Blab)


========================================================================


One GST endpoint is fully rolled out end-to-end and verified, and the shared infrastructure auto-covers the rest.

Worked reference: GET /public/search (Search Taxpayer) — /developer/gst-api/get-public-search

Its spec description was too thin (32 chars) to index. I promoted it via a hand-authored OVERRIDES entry in apiSeo.ts — custom title, description, keywords, and aiSummary.
Confirmed in the prerendered HTML: correct <title>, description, keywords, robots: index, ai-summary, canonical, og:title/twitter:title (now inherit the override), plus TechArticle + BreadcrumbList JSON-LD, and it's in sitemap.xml.
Shared infra (built once, covers all 4 specs):

apiSeo.ts — buildApiEndpointSeo() generator + OVERRIDES + isEndpointIndexable() gate.
ApiDocPage.tsx — endpoint pages now use the generator.
entry-server.tsx → prerender.ts — spec-driven prerender + auto sitemap.xml.
npm run build:full → 219 pages prerendered, 95 thin GST endpoints correctly excluded, sitemap has only indexable URLs.
The anti-spam gate is the key safety valve: an endpoint is indexed only if it has a real description (≥40 chars) or a hand-authored override. Thin endpoints stay reachable but noindex and out of the sitemap — this is exactly the "index selectively" discipline that keeps you clear of scaled-content-abuse.

⚠️ Pre-existing bug to fix separately
Every prerendered page (home, /softwares/accounting, all of them — not just my new pages) emits two <title> tags: a homepage-default one first, then the correct page one. If Google reads the first, every page reports the homepage title. This predates my work and affects the whole site's SEO. Worth fixing before you scale up indexing — likely a root-level Helmet/SeoHead rendering alongside the page-level one. Want me to hunt it down?

Step-by-step for your team (per endpoint)
The baseline is automatic. The only manual work is curating which thin-but-valuable endpoints to promote, and hand-tuning high-demand ones:

Pick the endpoint. Get its slug: operationToSlug(method, path) (e.g. POST /gstr1/retsave → post-gstr1-retsave). Or just read it off the URL in the running app.
Decide: does it deserve indexing? If it has real search demand ("generate IRN API", "GSTR-2B API"), yes. Niche internal endpoints — leave them; the gate noindexs them automatically.
If the spec description is already good (≥40 chars), it's already indexed with a decent auto-generated baseline. Only add an override if you want better copy.
If it's thin but valuable, add an entry to OVERRIDES in apiSeo.ts keyed '<apiType>:<opSlug>'. Copy the get-public-search block as your template. Set at minimum title, description, keywords, aiSummary. Adding the override also flips it to indexable.
Write quality copy, don't pad. title ≤ 60 chars, description ~150–160 chars describing what the endpoint returns, aiSummary 2–3 factual sentences. Never AI-fluff to hit a word count — that's the exact trap.
Verify: npm run build:full, then check dist/developer/<apiSlug>/<opSlug>/index.html for your tags and confirm it appears in dist/sitemap.xml.
After deploy: submit sitemap.xml in Search Console and watch impressions per URL. Endpoints with no traction after ~6 months → drop the override (let them fall back to noindex).
Same process works identically for e-invoice-api, e-way-bill-api, and ksa-e-invoice-api — just change the apiType prefix in the override key.