import { openApiSpec, type ApiSpecKey, type NormalizedMethod, type NormalizedOperation } from '@/data/openapi-spec';
import { API_TYPE_LABELS, API_TYPE_SHORT_LABELS, API_TYPE_ORDER } from '@/components/api/apiTypeLabels';
import { normalizeSpec } from '../../utils/normalizeSpec';
import { operationToSlug } from './utils/operationSlug';

/**
 * Global, cross-API endpoint search index for the command palette and the
 * playground's endpoint picker.
 *
 * Performance strategy (built to scale well past the current ~325 operations):
 *  - The index is built ONCE, lazily, and cached at module scope. Specs are
 *    normalised a single time — never per keystroke. `warmOpIndex()` moves that
 *    one-time cost into an idle callback so it never lands on an open frame.
 *  - Per-API slices are cached alongside the flat index, so scoped browsing is
 *    an O(1) lookup instead of a filter over every entry.
 *  - Every searchable field is pre-lowercased at build time, so matching is
 *    pure `String.includes` with zero per-query allocation for casing.
 *  - Search is a single O(n) pass with a cheap fast-reject. Matches are kept as
 *    parallel index/score arrays, so result objects are only allocated for the
 *    entries that survive the cap — not for every hit.
 */

export interface OpEntry {
  apiType: ApiSpecKey;
  apiLabel: string;
  /** Compact label ("GST", "e-Invoice") for tight rows. */
  apiShort: string;
  method: NormalizedMethod;
  path: string;
  summary: string;
  route: string;
  /** Full normalized operation — handed to the Playground so any API's
   *  endpoint can be loaded with its own parameters/body/responses. */
  op: NormalizedOperation;
  // Pre-lowercased fields for matching (never recomputed at query time):
  sumL: string;
  pathL: string;
  tagL: string;
  hay: string; // "summary path tag" lowercased — used for fast reject
}

export interface ScoredOp extends OpEntry { score: number }

/** Per-API hit counts for a query — drives the picker's scope chips. */
export type ApiCounts = Record<ApiSpecKey, number>;

export interface SearchResult {
  /** Globally ranked matches, capped at the requested limit. */
  ranked: ScoredOp[];
  /** Matches per API across the *whole* index, ignoring the cap. */
  counts: ApiCounts;
  /** Total matches across all APIs, ignoring the cap. */
  total: number;
}

const emptyCounts = (): ApiCounts => ({
  'gst-api': 0,
  'e-invoice-api': 0,
  'e-way-bill-api': 0,
  'ksa-e-invoice-api': 0,
});

let _index: OpEntry[] | null = null;
let _byApi: Map<ApiSpecKey, OpEntry[]> | null = null;

export function getOpIndex(): OpEntry[] {
  if (_index) return _index;
  const out: OpEntry[] = [];
  const byApi = new Map<ApiSpecKey, OpEntry[]>();
  for (const key of API_TYPE_ORDER) {
    let ops: ReturnType<typeof normalizeSpec> = [];
    try { ops = normalizeSpec(openApiSpec(key)); }
    catch { ops = []; }
    const bucket: OpEntry[] = [];
    for (const op of ops) {
      const sumL = op.summary.toLowerCase();
      const pathL = op.path.toLowerCase();
      const tagL = (op.tag ?? '').toLowerCase();
      const entry: OpEntry = {
        apiType: key,
        apiLabel: API_TYPE_LABELS[key],
        apiShort: API_TYPE_SHORT_LABELS[key],
        method: op.method,
        path: op.path,
        summary: op.summary,
        route: `/developer/${key}/${operationToSlug(op.method, op.path)}`,
        op,
        sumL, pathL, tagL,
        hay: `${sumL} ${pathL} ${tagL}`,
      };
      out.push(entry);
      bucket.push(entry);
    }
    byApi.set(key, bucket);
  }
  _index = out;
  _byApi = byApi;
  return out;
}

/** Operations for a single API, in spec order. O(1) after the first build. */
export function getOpsByApi(apiType: ApiSpecKey): OpEntry[] {
  if (!_byApi) getOpIndex();
  return _byApi?.get(apiType) ?? [];
}

/**
 * Build the index during idle time. The GST spec alone is ~3 MB of JSON, so
 * normalising on first keystroke (or on the frame a dropdown opens) is visible
 * jank. Call this when a surface that will search becomes reachable.
 */
export function warmOpIndex(): void {
  if (_index || typeof window === 'undefined') return;
  const run = () => { getOpIndex(); };
  const ric = (window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  }).requestIdleCallback;
  if (ric) ric(run, { timeout: 2000 });
  else setTimeout(run, 0);
}

/** Score a single entry against the lowercased query + its terms. 0 = no match. */
function scoreEntry(e: OpEntry, q: string, terms: string[]): number {
  // Fast reject: every term must appear somewhere in the haystack.
  for (let i = 0; i < terms.length; i++) {
    if (e.hay.indexOf(terms[i]) === -1) return 0;
  }
  // Rank on the full query against the most meaningful fields.
  let score = 1;
  if (e.sumL === q) score = 100;
  else if (e.sumL.startsWith(q)) score = 85;
  else if (e.sumL.indexOf(' ' + q) !== -1) score = 72; // word-boundary hit
  else if (e.sumL.indexOf(q) !== -1) score = 58;
  if (e.pathL.indexOf(q) !== -1) score = Math.max(score, 46);
  if (e.tagL.indexOf(q) !== -1) score = Math.max(score, 28);
  return score;
}

/**
 * Search every API at once, returning the global ranking *and* where the
 * matches live. Callers that show one API at a time can filter `ranked` by
 * `apiType` while still telling the user how many hits sit in the others.
 */
export function searchOpsScoped(query: string, limit = 300): SearchResult {
  const counts = emptyCounts();
  const q = query.trim().toLowerCase();
  if (!q) return { ranked: [], counts, total: 0 };

  const terms = q.split(/\s+/).filter(Boolean);
  const idx = getOpIndex();

  // Parallel arrays: no result object is allocated until we know it survives.
  const hits: number[] = [];
  const scores: number[] = [];
  for (let i = 0; i < idx.length; i++) {
    const s = scoreEntry(idx[i], q, terms);
    if (s > 0) {
      hits.push(i);
      scores.push(s);
      counts[idx[i].apiType]++;
    }
  }

  // Sort positions rather than entries — best score first, ties broken by the
  // shorter summary (the more specific match).
  const order = hits.map((_, k) => k);
  order.sort((a, b) => scores[b] - scores[a] || idx[hits[a]].summary.length - idx[hits[b]].summary.length);

  const n = Math.min(order.length, limit);
  const ranked: ScoredOp[] = new Array(n);
  for (let k = 0; k < n; k++) {
    const slot = order[k];
    ranked[k] = { ...idx[hits[slot]], score: scores[slot] };
  }
  return { ranked, counts, total: hits.length };
}

export function searchOps(query: string, limit = 40): ScoredOp[] {
  return searchOpsScoped(query, limit).ranked;
}
