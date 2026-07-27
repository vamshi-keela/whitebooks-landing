import type { ApiSpecKey, NormalizedOperation } from '@/data/openapi-spec';
import type { SeoMeta } from '@/seo/types';
import { SITE } from './config/site';
import { CANONICAL_ROUTES } from './utils/canonical';
import { operationToSlug } from '@/features/developer/utils/operationSlug';

/**
 * Per-endpoint SEO for the developer API reference.
 *
 * Every one of the ~325 endpoint routes (`/developer/:apiSlug/:opSlug`) needs
 * its own <title>, description, canonical, and JSON-LD. Hand-authoring that many
 * `SeoMeta` objects is infeasible and drifts the moment a spec changes, so this
 * module DERIVES a strong baseline from the OpenAPI spec (deterministic, always
 * in sync) and lets you OVERRIDE individual fields for high-value endpoints.
 *
 *   final = { ...generated, ...OVERRIDES[`${apiType}:${opSlug}`] }
 *
 * Override merge is field-by-field, so an override may set just `title` and
 * inherit everything else. Add overrides only for endpoints that earn the
 * hand-tuning (real search demand) — the rest ride the generated baseline.
 */

/* ─── Per-API labelling ─────────────────────────────────────────────────────
   apiLabel: human name in titles/keywords.
   apiSlug:  URL segment (must match ApiDocPage's API_CONFIG slug).
   product:  short noun used in aiSummary sentences. */
const API_META: Record<ApiSpecKey, { label: string; slug: string; product: string }> = {
  'gst-api': { label: 'GST API', slug: 'gst-api', product: 'WhiteBooks GST API' },
  'e-invoice-api': { label: 'e-Invoice API', slug: 'e-invoice-api', product: 'WhiteBooks e-Invoice API' },
  'e-way-bill-api': { label: 'e-Way Bill API', slug: 'e-way-bill-api', product: 'WhiteBooks e-Way Bill API' },
  'ksa-e-invoice-api': { label: 'KSA e-Invoice API', slug: 'ksa-e-invoice-api', product: 'WhiteBooks KSA e-Invoice API' },
};

/* ─── Field-level overrides for high-value endpoints ─────────────────────────
   Key = `${apiType}:${opSlug}`. Partial — only the fields you want to pin.
   Example (leave commented until you actually tune an endpoint):

   const OVERRIDES: Record<string, Partial<SeoMeta>> = {
     'gst-api:get-public-search': { title: '…' },
   };
*/
const OVERRIDES: Record<string, Partial<SeoMeta>> = {
  /* ── Worked reference: GET /public/search (Search Taxpayer) ──────────────
     The spec description ("This API will be used to search taxpayer details")
     is too thin to index on its own, but the endpoint has real search demand
     ("verify GSTIN API", "search taxpayer API"). Hand-tuning it here both
     upgrades the copy AND marks it indexable (see isEndpointIndexable). */
  'gst-api:get-public-search': {
    title: 'Search Taxpayer by GSTIN — GST API Reference | WhiteBooks',
    description:
      'Look up any registered taxpayer by GSTIN via the WhiteBooks GST API: legal name, trade name, registration status, taxpayer type, and jurisdiction. GSP-licensed, sandbox in 5 minutes.',
    keywords:
      'search taxpayer API, GSTIN search API, verify GSTIN, GST number validation API, taxpayer lookup India, GSTIN details API, GST API reference',
    aiSummary:
      'The Search Taxpayer endpoint (GET /public/search) of the WhiteBooks GST API returns registered taxpayer details for a given GSTIN — legal name, trade name, registration status, constitution of business, taxpayer type, and jurisdiction. Authenticated with client_id and client_secret headers. Delivered over a directly licensed GSP connection to GSTN with a 99.95% uptime SLA. Covers request parameters, response schema, error codes, and code samples.',
  },
};

/* ─── Helpers ────────────────────────────────────────────────────────────── */

/** First 1–2 sentences of a spec description, whitespace-collapsed, capped. */
function cleanDescription(raw: string | undefined, max = 155): string {
  if (!raw) return '';
  const flat = raw.replace(/\s+/g, ' ').trim();
  if (flat.length <= max) return flat;
  // Prefer cutting at a sentence boundary, else at the last word before `max`.
  const slice = flat.slice(0, max);
  const lastStop = Math.max(slice.lastIndexOf('. '), slice.lastIndexOf('? '));
  if (lastStop > max * 0.5) return slice.slice(0, lastStop + 1);
  return slice.slice(0, slice.lastIndexOf(' ')).trim() + '…';
}

/** Readable path tokens: /public/{gstin}/rettrack → "public rettrack". */
function pathKeywords(path: string): string {
  return path
    .replace(/[{}]/g, '')
    .split('/')
    .filter(Boolean)
    .join(' ');
}

/** Dedupe + join keyword candidates. */
function joinKeywords(parts: string[]): string {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const p of parts.map(s => s.trim()).filter(Boolean)) {
    const k = p.toLowerCase();
    if (!seen.has(k)) { seen.add(k); out.push(p); }
  }
  return out.join(', ');
}

/* ─── Indexability (anti-spam lever) ────────────────────────────────────────
   Google penalizes MASS-INDEXING thin, near-duplicate template pages ("scaled
   content abuse"). API reference pages are legitimate ONLY when each indexed
   page carries real, unique reference value. So we index an endpoint only when
   it has a meaningful spec description OR a hand-authored override — everything
   else stays reachable but `noindex, follow`. Deprecated endpoints never index.

   This is also the single source of truth for which routes get prerendered and
   which land in the sitemap (see steps 3–4). Keep the three in sync by importing
   THIS function everywhere. */
const MIN_DESCRIPTION_LEN = 40;

export function isEndpointIndexable(
  apiType: ApiSpecKey,
  op: NormalizedOperation,
): boolean {
  if (op.deprecated) return false;
  if (OVERRIDES[`${apiType}:${operationToSlug(op.method, op.path)}`]) return true;
  return (op.description?.trim().length ?? 0) >= MIN_DESCRIPTION_LEN;
}

/* ─── Generator ──────────────────────────────────────────────────────────── */

/** Full SeoMeta for a single API endpoint route. Deterministic. */
export function buildApiEndpointSeo(
  apiType: ApiSpecKey,
  op: NormalizedOperation,
): SeoMeta {
  const { label, slug, product } = API_META[apiType];
  const opSlug = operationToSlug(op.method, op.path);
  const canonical = CANONICAL_ROUTES.developerEndpoint(slug, opSlug);

  const title = `${op.summary} — ${label} Reference | WhiteBooks`;

  const desc = cleanDescription(op.description);
  const description = desc
    || `${op.method} ${op.path} — ${label} endpoint. Request parameters, response schema, and code examples.`;

  const keywords = joinKeywords([
    label,
    op.summary,
    op.tag,
    `${label} ${op.summary}`,
    pathKeywords(op.path),
    'API reference',
    'WhiteBooks developer docs',
  ]);

  const aiSummary =
    `${op.summary} (${op.method} ${op.path}) in the ${product}. `
    + (desc ? `${desc} ` : '')
    + `Covers request parameters, request/response schemas, error codes, and copy-paste code samples. Part of WhiteBooks' GSP-licensed compliance API suite.`;

  // Merge core fields with any override FIRST, so OG/Twitter (derived below)
  // inherit the final title/description rather than the raw generated ones.
  const override = OVERRIDES[`${apiType}:${opSlug}`] ?? {};
  const core = {
    title: override.title ?? title,
    description: override.description ?? description,
    canonical: override.canonical ?? canonical,
    keywords: override.keywords ?? keywords,
    // Thin/deprecated endpoints stay reachable but drop out of the index.
    robots: override.robots ?? (isEndpointIndexable(apiType, op) ? SITE.defaultRobots : 'noindex, follow'),
    aiSummary: override.aiSummary ?? aiSummary,
  };

  return {
    ...core,
    og: {
      title: core.title,
      description: core.description,
      image: SITE.defaultOgImage,
      type: 'article',
      ...override.og,
    },
    twitter: {
      card: 'summary_large_image',
      title: core.title,
      description: core.description,
      image: SITE.defaultOgImage,
      ...override.twitter,
    },
  };
}
