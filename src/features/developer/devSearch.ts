import { openApiSpec, type ApiSpecKey, type NormalizedMethod, type NormalizedOperation } from '@/data/openapi-spec';
import { normalizeSpec } from '../../utils/normalizeSpec';
import { operationToSlug } from './utils/operationSlug';

/**
 * Global, cross-API endpoint search index for the command palette.
 *
 * Performance strategy (built to scale to thousands of operations):
 *  - The index is built ONCE, lazily, and cached at module scope. Specs are
 *    normalised a single time — never per keystroke.
 *  - Every searchable field is pre-lowercased at build time, so matching is
 *    pure `String.includes` with zero per-query allocation for casing.
 *  - Search is a single O(n) pass with a cheap fast-reject, then a bounded
 *    sort and slice. Multi-term queries are AND-matched.
 */

export interface OpEntry {
  apiType: ApiSpecKey;
  apiLabel: string;
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

const API_LABELS: Record<ApiSpecKey, string> = {
  'gst-api': 'GST API',
  'e-invoice-api': 'e-Invoice API',
  'e-way-bill-api': 'e-Way Bill API',
  'ksa-e-invoice-api': 'KSA e-Invoice API',
};

let _index: OpEntry[] | null = null;

export function getOpIndex(): OpEntry[] {
  if (_index) return _index;
  const out: OpEntry[] = [];
  for (const key of Object.keys(API_LABELS) as ApiSpecKey[]) {
    let ops: ReturnType<typeof normalizeSpec> = [];
    try { ops = normalizeSpec(openApiSpec(key)); }
    catch { ops = []; }
    for (const op of ops) {
      const sumL = op.summary.toLowerCase();
      const pathL = op.path.toLowerCase();
      const tagL = (op.tag ?? '').toLowerCase();
      out.push({
        apiType: key,
        apiLabel: API_LABELS[key],
        method: op.method,
        path: op.path,
        summary: op.summary,
        route: `/developer/${key}/${operationToSlug(op.method, op.path)}`,
        op,
        sumL, pathL, tagL,
        hay: `${sumL} ${pathL} ${tagL}`,
      });
    }
  }
  _index = out;
  return out;
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

export function searchOps(query: string, limit = 40): ScoredOp[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  const idx = getOpIndex();
  const res: ScoredOp[] = [];
  for (let i = 0; i < idx.length; i++) {
    const s = scoreEntry(idx[i], q, terms);
    if (s > 0) res.push({ ...idx[i], score: s });
  }
  // Best score first; break ties by shorter summary (more specific match).
  res.sort((a, b) => b.score - a.score || a.summary.length - b.summary.length);
  return res.length > limit ? res.slice(0, limit) : res;
}
