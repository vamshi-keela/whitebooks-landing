import type { ApiSpecKey } from './openapi-spec';

/* ─── Error catalog ─────────────────────────────────────────────────────────
 * Curated plain-language explanations for the error codes the government
 * systems (GSTN, NIC IRP, NIC EWB) and Whitebooks return. Surfaced in the
 * Playground's ErrorExplainer so users can self-serve instead of calling
 * support.
 *
 * STARTER SET — wording drafted from the NIC/GSTN published error lists;
 * verify each entry against the current master lists before shipping, and
 * grow this from the "unknown code" logs.
 * ────────────────────────────────────────────────────────────────────────── */

export type ErrorSource = 'gstn' | 'nic-einvoice' | 'nic-ewaybill' | 'whitebooks';

export interface ErrorCatalogEntry {
  code: string;
  source: ErrorSource;
  title: string;
  /* Plain-language explanation of what happened. */
  meaning: string;
  /* Actionable steps, in order of likelihood. */
  fix: string[];
  /* Whether retrying the same request unchanged can succeed. */
  retryable: boolean;
  docUrl?: string;
}

export const SOURCE_LABELS: Record<ErrorSource, string> = {
  gstn: 'GST Portal · GSTN',
  'nic-einvoice': 'e-Invoice IRP · NIC',
  'nic-ewaybill': 'e-Way Bill System · NIC',
  whitebooks: 'Whitebooks',
};

/* Sources other than 'whitebooks' tell the user the error originated on the
   government side — the single fact that deflects the most support calls. */
export function isGovernmentSource(source: ErrorSource): boolean {
  return source !== 'whitebooks';
}

const E_INVOICE: ErrorCatalogEntry[] = [
  {
    code: '1005',
    source: 'nic-einvoice',
    title: 'Invalid or expired auth token',
    meaning:
      'The e-invoice authentication token sent with this request is invalid or has expired. IRP tokens are valid for a limited session window.',
    fix: [
      'Call the Authenticate endpoint to get a fresh token.',
      'Retry this request with the new token in the auth header.',
      'If it recurs immediately, check that the token is not being truncated or re-encoded by your HTTP client.',
    ],
    retryable: true,
  },
  {
    code: '2150',
    source: 'nic-einvoice',
    title: 'Duplicate IRN',
    meaning:
      'An IRN has already been generated for this document (same supplier GSTIN, document type, number, and financial year). The IRP will not register the same invoice twice.',
    fix: [
      'If you need the existing IRN, call Get IRN by document details instead of generating again.',
      'If this is genuinely a new invoice, check that your document number is not being reused.',
      'Do not retry the same payload — it will always return this error.',
    ],
    retryable: false,
  },
  {
    code: '2176',
    source: 'nic-einvoice',
    title: 'Invalid HSN code',
    meaning:
      'One or more item HSN codes in the payload are not present in the IRP’s HSN master.',
    fix: [
      'Verify each HSN/SAC code against the GST portal’s HSN search.',
      'Check for typos and correct code length (4, 6, or 8 digits).',
    ],
    retryable: false,
  },
  {
    code: '2182',
    source: 'nic-einvoice',
    title: 'Taxable value mismatch',
    meaning:
      'The sum of the item-level taxable values does not match the document-level total taxable value.',
    fix: [
      'Recompute the document total as the exact sum of item taxable values.',
      'Check rounding — compute totals from unrounded item values, then round once at the end.',
    ],
    retryable: false,
  },
  {
    code: '2189',
    source: 'nic-einvoice',
    title: 'Invalid total invoice value',
    meaning:
      'The total invoice value does not equal the sum of taxable value, taxes, and other charges within the permitted tolerance.',
    fix: [
      'Recompute: total = taxable value + CGST + SGST + IGST + cess + other charges − discount.',
      'Keep the difference within the IRP’s ±1 rounding tolerance.',
    ],
    retryable: false,
  },
  {
    code: '2211',
    source: 'nic-einvoice',
    title: 'Supplier and recipient GSTIN are the same',
    meaning:
      'The supplier and buyer GSTIN in the payload are identical. Self-invoicing is not allowed on the IRP except for specific transaction types.',
    fix: [
      'Check that the buyer GSTIN field is not accidentally filled with the seller’s GSTIN.',
      'For stock transfers between branches, use the branch’s distinct GSTIN.',
    ],
    retryable: false,
  },
  {
    code: '2240',
    source: 'nic-einvoice',
    title: 'Invalid GST rate',
    meaning:
      'The GST rate on one or more items is not a valid slab rate recognised by the IRP.',
    fix: [
      'Use only notified slab rates (0, 0.1, 0.25, 1, 1.5, 3, 5, 7.5, 12, 18, 28).',
      'For inter-state supplies send the full rate as IGST; for intra-state split it equally between CGST and SGST.',
    ],
    retryable: false,
  },
  {
    code: '3028',
    source: 'nic-einvoice',
    title: 'Recipient GSTIN not available in e-invoice system',
    meaning:
      'The buyer’s GSTIN is valid on the GST portal but has not yet been synced into the IRP’s local database.',
    fix: [
      'Call the Sync GSTIN from common portal endpoint for the buyer’s GSTIN.',
      'Retry IRN generation after the sync succeeds.',
    ],
    retryable: true,
  },
  {
    code: '3029',
    source: 'nic-einvoice',
    title: 'Recipient GSTIN is not active',
    meaning:
      'The buyer’s GSTIN exists but is cancelled or suspended on the GST portal, so an e-invoice cannot be registered against it.',
    fix: [
      'Verify the GSTIN’s status using the GSTIN search endpoint.',
      'Ask the buyer for their current, active GSTIN.',
    ],
    retryable: false,
  },
];

const E_WAY_BILL: ErrorCatalogEntry[] = [
  {
    code: '100',
    source: 'nic-ewaybill',
    title: 'Invalid JSON',
    meaning:
      'The e-way bill system could not parse the request payload — it is not valid JSON or does not match the expected structure.',
    fix: [
      'Validate the request body with a JSON linter.',
      'Compare field names and nesting against the sample payload for this endpoint.',
    ],
    retryable: false,
  },
  {
    code: '101',
    source: 'nic-ewaybill',
    title: 'Invalid username',
    meaning:
      'The e-way bill API username in this request is not recognised by the NIC system.',
    fix: [
      'Use the API credentials created on the e-way bill portal (For GSP registration), not your portal login.',
      'Check the username for typos and confirm it is registered against Whitebooks as your GSP.',
    ],
    retryable: false,
  },
  {
    code: '102',
    source: 'nic-ewaybill',
    title: 'Invalid password',
    meaning: 'The e-way bill API password does not match the username provided.',
    fix: [
      'Re-enter the API password set on the e-way bill portal for this GSTIN.',
      'If recently changed on the portal, update it in your integration too.',
    ],
    retryable: false,
  },
  {
    code: '238',
    source: 'nic-ewaybill',
    title: 'Invalid or expired auth token',
    meaning:
      'The authentication token sent with this request is no longer valid. E-way bill tokens expire after a fixed session window.',
    fix: [
      'Call the Authenticate endpoint to get a fresh token.',
      'Retry this request with the new token.',
    ],
    retryable: true,
  },
];

const GST: ErrorCatalogEntry[] = [
  {
    code: 'RETOTPREQ',
    source: 'gstn',
    title: 'OTP verification required',
    meaning:
      'The GST portal session for this GSTIN has expired or was never established, so it is asking for OTP verification before serving return data.',
    fix: [
      'Call the Request OTP endpoint — the taxpayer receives an OTP on their registered mobile/email.',
      'Verify the OTP to establish a new session, then retry this request.',
    ],
    retryable: true,
  },
  {
    code: 'AUTH4033',
    source: 'gstn',
    title: 'Invalid session',
    meaning:
      'The auth token for this GSTIN’s session is invalid or has expired on the GST portal.',
    fix: [
      'Re-authenticate (request and verify OTP) to establish a new session.',
      'Retry with the fresh auth token.',
    ],
    retryable: true,
  },
  {
    code: 'AUTH4034',
    source: 'gstn',
    title: 'Invalid OTP',
    meaning: 'The OTP submitted does not match, or it has expired (OTPs are valid ~10 minutes).',
    fix: [
      'Ask the taxpayer to re-check the latest OTP received.',
      'If expired, request a fresh OTP and verify again.',
    ],
    retryable: true,
  },
];

/* Fallbacks keyed by HTTP status when the body carries no recognisable code. */
const HTTP_FALLBACKS: Record<number, ErrorCatalogEntry> = {
  401: {
    code: 'HTTP 401',
    source: 'whitebooks',
    title: 'Unauthorized',
    meaning:
      'The Whitebooks gateway rejected the request credentials — the subscription headers are missing or wrong.',
    fix: [
      'Check the client id / client secret headers against your Whitebooks dashboard.',
      'Confirm the values belong to the environment you selected (sandbox vs production keys differ).',
    ],
    retryable: false,
  },
  403: {
    code: 'HTTP 403',
    source: 'whitebooks',
    title: 'Access denied',
    meaning:
      'Your credentials are valid but this request is not allowed — usually the calling IP is not whitelisted, or your plan does not include this API.',
    fix: [
      'Check that your server’s public IP is whitelisted in the Whitebooks dashboard.',
      'Confirm your subscription covers this API.',
    ],
    retryable: false,
  },
  404: {
    code: 'HTTP 404',
    source: 'whitebooks',
    title: 'Not found',
    meaning: 'The endpoint path or the requested resource does not exist.',
    fix: [
      'Compare the request URL against the endpoint path shown above.',
      'Check path parameters — a wrong IRN, EWB number, or GSTIN in the path returns 404.',
    ],
    retryable: false,
  },
  429: {
    code: 'HTTP 429',
    source: 'whitebooks',
    title: 'Rate limit exceeded',
    meaning: 'You have sent more requests than your plan allows in this window.',
    fix: [
      'Slow down and retry after a short back-off.',
      'If you consistently hit the limit, consider a higher-throughput plan.',
    ],
    retryable: true,
  },
  500: {
    code: 'HTTP 500',
    source: 'whitebooks',
    title: 'Server error',
    meaning:
      'Something failed while processing the request — often the upstream government system erroring or timing out. This is not a problem with your request.',
    fix: [
      'Retry after a minute — upstream glitches are usually transient.',
      'If it persists, contact support with the request time and endpoint.',
    ],
    retryable: true,
  },
  502: {
    code: 'HTTP 502',
    source: 'whitebooks',
    title: 'Upstream unavailable',
    meaning:
      'The government system (GSTN / NIC) did not respond to the gateway. This is a portal-side outage, not a problem with your request.',
    fix: ['Retry after a few minutes.', 'Portal load is highest near filing deadlines — expect intermittent errors then.'],
    retryable: true,
  },
  503: {
    code: 'HTTP 503',
    source: 'whitebooks',
    title: 'Service temporarily unavailable',
    meaning:
      'The service (or the government portal behind it) is temporarily down or under maintenance. This is not a problem with your request.',
    fix: ['Retry after a few minutes.'],
    retryable: true,
  },
};

/* Whitebooks gateway failures often carry no error code — just status_cd "0"
   and a prose status_desc. These match on the message text instead. Synthetic
   codes (WB-*) keep them addressable in docs and logs. */
const MESSAGE_PATTERNS: Array<{ pattern: RegExp; entry: ErrorCatalogEntry }> = [
  {
    pattern: /email is not registered/i,
    entry: {
      code: 'WB-EMAIL-UNREGISTERED',
      source: 'whitebooks',
      title: 'Email not registered with Whitebooks',
      meaning:
        'The email sent in this request is not linked to any Whitebooks account, so the gateway cannot resolve your subscription.',
      fix: [
        'Use the exact email address you registered on the Whitebooks dashboard (check for typos and old addresses).',
        'If you don’t have an account yet, sign up on the dashboard first — API access is tied to a registered account.',
      ],
      retryable: false,
    },
  },
  {
    pattern: /not subscribed|subscription.*(expired|not found|inactive)/i,
    entry: {
      code: 'WB-SUBSCRIPTION',
      source: 'whitebooks',
      title: 'No active subscription for this API',
      meaning:
        'Your account was found, but it has no active subscription covering this API in the selected environment.',
      fix: [
        'Check your plan on the Whitebooks dashboard — sandbox and production are subscribed separately.',
        'If the plan recently expired, renew it and retry.',
      ],
      retryable: false,
    },
  },
];

export function lookupErrorMessage(message: string): ErrorCatalogEntry | undefined {
  return MESSAGE_PATTERNS.find(({ pattern }) => pattern.test(message))?.entry;
}

const byCode = (entries: ErrorCatalogEntry[]): Map<string, ErrorCatalogEntry> =>
  new Map(entries.map(e => [e.code.toUpperCase(), e]));

const CATALOG: Partial<Record<ApiSpecKey, Map<string, ErrorCatalogEntry>>> = {
  'e-invoice-api': byCode(E_INVOICE),
  'e-way-bill-api': byCode(E_WAY_BILL),
  'gst-api': byCode(GST),
};

export function lookupErrorCode(code: string, apiType?: ApiSpecKey): ErrorCatalogEntry | undefined {
  const key = code.trim().toUpperCase();
  if (!key) return undefined;
  if (apiType) return CATALOG[apiType]?.get(key);
  for (const map of Object.values(CATALOG)) {
    const hit = map?.get(key);
    if (hit) return hit;
  }
  return undefined;
}

export function lookupHttpFallback(status: number): ErrorCatalogEntry | undefined {
  return HTTP_FALLBACKS[status] ?? (status >= 500 ? HTTP_FALLBACKS[500] : undefined);
}
