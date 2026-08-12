/**
 * Per-product hero visual specs.
 *
 * This is the file to edit to customise a page's hero animation — labels,
 * packet stages, ledger lines, deadlines. Adding a product means adding a key
 * here and setting `visualKey` on that page's hero in the registry; no new
 * component unless the product needs a genuinely different story.
 */
import type { HeroVisualKey, HeroVisualSpec } from "./types";

export const HERO_VISUALS: Record<HeroVisualKey, HeroVisualSpec> = {
  /* Accounting — the entry posts itself from a sales invoice + bank feed. */
  "accounting-ledger": {
    kind: "ledger",
    title: "Journal — posted automatically",
    source: "Sales invoice #1182 · HDFC ••4471",
    rows: [
      { account: "Trade Receivables", side: "Dr", amount: "₹2,14,760" },
      { account: "Sales — Domestic", side: "Cr", amount: "₹1,82,000" },
      { account: "Output IGST @18%", side: "Cr", amount: "₹32,760" },
      { account: "Bank — HDFC ••4471", side: "Dr", amount: "₹2,14,760" },
    ],
    footer: { label: "Entry balanced", value: "₹2,14,760" },
    stamp: "Posted · audit trail recorded",
  },

  /* GST — purchase register reconciled against 2B, then filed to GSTN. */
  "gst-filing": {
    kind: "flow",
    // Middle source carries the packet — 2B is what drives the reconciliation.
    sources: [
      { label: "Purchase Register", sub: "1,284 invoices", short: "Purchase" },
      { label: "GSTR-2B", sub: "Auto-fetched daily", short: "GSTR-2B" },
      { label: "Sales Register", sub: "GSTR-1 source data", short: "Sales" },
    ],
    hub: { label: "WhiteBooks", sub: "Reconcile · 47-point validate" },
    target: { label: "GSTN", sub: "GSTR-1 · 3B · 9" },
    packets: ["2B DATA", "MATCHED", "FILED ✓"],
    receipt: { title: "GSTR-3B filed", meta: "ARN AA2707260012345" },
  },

  /* e-Invoice — one billing document, one IRN. */
  "e-invoice-irn": {
    kind: "flow",
    sources: [{ label: "Your ERP", sub: "Billing Document · JSON" }],
    hub: { label: "WhiteBooks", sub: "Validate · Transform · Sign" },
    target: { label: "NIC IRP", sub: "IRN + Signed QR" },
    packets: ["INVOICE", "SIGNED", "IRN ✓"],
    receipt: { title: "IRN generated", meta: "0.8s · ACK 112510144782611", qr: true },
  },

  /* e-Way Bill — despatch document to a bill with Part-B. */
  "e-way-bill": {
    kind: "flow",
    sources: [{ label: "Your ERP", sub: "Despatch Document · XML" }],
    hub: { label: "WhiteBooks", sub: "Distance · Validity · Part-B" },
    target: { label: "NIC EWB", sub: "EWB No. + Part-B" },
    packets: ["DESPATCH", "VALIDATED", "EWB ✓"],
    receipt: { title: "e-Way Bill generated", meta: "0.9s · EWB 4813 0042 7719" },
  },

  /* Notice Management — three portals, one deadline clock. */
  "notice-deadlines": {
    kind: "deadline",
    title: "Notice inbox — 3 portals",
    rows: [
      { portal: "GSTN", ref: "Sec 73 · GSTR-3B mismatch", days: 8, total: 30, state: "due" },
      { portal: "ITD", ref: "Sec 143(2) · Scrutiny AY 23-24", days: 21, total: 45, state: "progress" },
      { portal: "TRACES", ref: "Sec 200A · TDS default Q2", days: 4, total: 30, state: "due" },
    ],
    footer: "Deadlines synced to your calendar · alerts before every due date",
  },
};
