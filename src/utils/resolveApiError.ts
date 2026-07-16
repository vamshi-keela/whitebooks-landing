import type { ApiSpecKey } from '../data/openapi-spec';
import {
  lookupErrorCode,
  lookupErrorMessage,
  lookupHttpFallback,
  type ErrorCatalogEntry,
} from '../data/error-catalog';

/* ─── Live-response error resolution ────────────────────────────────────────
 * The government systems behind these APIs report failures in several shapes,
 * frequently with HTTP 200:
 *   NIC e-invoice : { Status: 0, ErrorDetails: [{ ErrorCode, ErrorMessage }] }
 *   NIC e-way bill: { status: "0", error: { errorCodes: "238,101" } }
 *   GSTN          : { error: { error_cd: "AUTH4033", message: "..." } }
 *   Whitebooks    : { status_cd: "0", status_desc: "..." }
 * Some responses double-encode `error` as a JSON string. This resolver scans
 * the body defensively for all of these, so the ErrorExplainer can react to
 * any of them without knowing which upstream produced the response.
 * ────────────────────────────────────────────────────────────────────────── */

export interface ResolvedApiError {
  /* True when the response should be treated as a failure. */
  failed: boolean;
  /* Codes found in the body that have a catalog entry. */
  matches: ErrorCatalogEntry[];
  /* Codes found in the body that we haven't documented yet. */
  unknownCodes: string[];
  /* Raw upstream messages (ErrorMessage / status_desc / message). */
  rawMessages: string[];
  /* Generic HTTP-status entry, used when no body code matched. */
  httpFallback?: ErrorCatalogEntry;
}

const CODE_KEYS = ['errorcode', 'error_cd', 'errorcd', 'error_code'];
const MESSAGE_KEYS = ['errormessage', 'status_desc', 'message', 'error_desc', 'errordesc'];
const MAX_DEPTH = 6;

function isFailureFlag(key: string, value: unknown): boolean {
  if (!['status', 'status_cd', 'success'].includes(key)) return false;
  return value === 0 || value === '0' || value === false || value === 'false';
}

/* Success payloads often carry `error: null` / `ErrorDetails: null` — only a
   populated error field indicates failure. */
function hasContent(value: unknown): boolean {
  if (value == null) return false;
  if (typeof value === 'string') return value.trim() !== '';
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return Object.keys(value).length > 0;
  return true;
}

function tryParseJson(text: string): unknown {
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return undefined;
  }
}

interface ScanResult {
  codes: Set<string>;
  messages: string[];
  failureFlag: boolean;
}

function scan(node: unknown, out: ScanResult, depth = 0): void {
  if (depth > MAX_DEPTH || node == null) return;
  if (typeof node === 'string') {
    /* NIC sometimes nests a JSON-encoded string under `error`. */
    const trimmed = node.trim();
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
      const nested = tryParseJson(trimmed);
      if (nested !== undefined) scan(nested, out, depth + 1);
    }
    return;
  }
  if (Array.isArray(node)) {
    for (const item of node) scan(item, out, depth + 1);
    return;
  }
  if (typeof node !== 'object') return;

  for (const [rawKey, value] of Object.entries(node as Record<string, unknown>)) {
    const key = rawKey.toLowerCase();
    if (isFailureFlag(key, value)) out.failureFlag = true;
    if ((key === 'error' || key === 'errordetails' || key === 'errors') && hasContent(value)) out.failureFlag = true;

    if (key === 'errorcodes' && typeof value === 'string') {
      for (const c of value.split(',')) if (c.trim()) out.codes.add(c.trim());
    } else if (CODE_KEYS.includes(key) && (typeof value === 'string' || typeof value === 'number')) {
      const c = String(value).trim();
      if (c) out.codes.add(c);
    } else if (MESSAGE_KEYS.includes(key) && typeof value === 'string' && value.trim()) {
      out.messages.push(value.trim());
      /* Messages often lead with the code, e.g. "2150 : Duplicate IRN". */
      const m = /^(\d{3,4})\s*[:\-–]/.exec(value.trim());
      if (m) out.codes.add(m[1]);
    } else {
      scan(value, out, depth + 1);
    }
  }
}

export function resolveApiError(
  live: { status: number; body: string },
  apiType?: ApiSpecKey,
): ResolvedApiError {
  const out: ScanResult = { codes: new Set(), messages: [], failureFlag: false };
  const parsed = tryParseJson(live.body);
  if (parsed !== undefined) scan(parsed, out);

  const failed = live.status >= 400 || out.failureFlag;
  const matches: ErrorCatalogEntry[] = [];
  const unknownCodes: string[] = [];
  for (const code of out.codes) {
    const entry = lookupErrorCode(code, apiType);
    if (entry) matches.push(entry);
    else unknownCodes.push(code);
  }

  /* Code-less failures (status_cd "0" + prose status_desc): match the
     message text against the catalog's pattern entries. */
  if (failed && matches.length === 0) {
    for (const msg of out.messages) {
      const entry = lookupErrorMessage(msg);
      if (entry && !matches.includes(entry)) matches.push(entry);
    }
  }

  return {
    failed,
    matches,
    unknownCodes,
    rawMessages: out.messages,
    httpFallback: failed && matches.length === 0 ? lookupHttpFallback(live.status) : undefined,
  };
}
