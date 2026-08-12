/**
 * Hero visual specs — the data layer for animated product heroes.
 *
 * Everything here is plain serializable data. Components are resolved at the
 * edge (see index.tsx) so the page registries never import React visuals: they
 * reference a `HeroVisualKey` string instead, which keeps framer-motion out of
 * the shared registry chunk and lets the engine be swapped without touching
 * five data files.
 */

export interface FlowNode {
  label: string;
  sub: string;
  /** Short form for the narrow fan-in chips on mobile, where `label` won't fit. */
  short?: string;
}

/**
 * Source(s) → validate/transform hub → government target, with a receipt on
 * arrival. Covers GST, e-Invoice and e-Way Bill, and (via the 1-source case)
 * every connector landing page.
 */
export interface FlowSpec {
  kind: "flow";
  /** 1–3. The middle one carries the travelling packet; the rest fan in. */
  sources: FlowNode[];
  hub: FlowNode;
  target: FlowNode;
  /** Packet label per leg: [leaving source, inside hub, arriving at target] */
  packets: [string, string, string];
  receipt: { title: string; meta: string; qr?: boolean };
}

export type LedgerSide = "Dr" | "Cr";

/** A journal posting itself, line by line — the Accounting story. */
export interface LedgerSpec {
  kind: "ledger";
  title: string;
  /** Where the entry came from, shown as the trigger line. */
  source: string;
  rows: { account: string; side: LedgerSide; amount: string }[];
  footer: { label: string; value: string };
  stamp: string;
}

export type DeadlineState = "due" | "progress" | "replied";

/** Notices racing their response deadlines — the Notice Management story. */
export interface DeadlineSpec {
  kind: "deadline";
  title: string;
  rows: {
    portal: string;
    ref: string;
    /** Days remaining, out of `total` — drives the bar fill. */
    days: number;
    total: number;
    state: DeadlineState;
  }[];
  footer: string;
}

export type HeroVisualSpec = FlowSpec | LedgerSpec | DeadlineSpec;

export type HeroVisualKey =
  | "accounting-ledger"
  | "gst-filing"
  | "e-invoice-irn"
  | "e-way-bill"
  | "notice-deadlines";
