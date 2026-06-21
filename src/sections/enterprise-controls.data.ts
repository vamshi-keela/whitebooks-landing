/**
 * Enterprise Controls — typed content for the "Built for teams. Ready for
 * scale." section. Replaces the old diamond-card layout with a workflow
 * timeline hero + an icon-led bento grid of access/audit/compliance pillars,
 * in the spirit of Stripe Radar, Linear, Mercury and Rippling.
 *
 * Capability/metric/feed copy is carried over from the legacy whitebooks.in
 * "Built for Teams. Ready for Scale." section (Role-Based Access & Control /
 * Audit Trail & Compliance cards) so the claims stay accurate.
 */

export const SECTION_HEADER = {
  eyebrow: "ENTERPRISE CONTROLS",
  heading: "Built for teams. Ready for scale.",
  subtitle:
    "Role permissions, approvals, audit trails and exportable evidence ensure your business stays secure as your team grows.",
};

export type TimelineStatus = "created" | "pending" | "approved" | "logged" | "exported";

export interface TimelineEvent {
  time: string;
  title: string;
  status: TimelineStatus;
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  { time: "09:45 AM", title: "Invoice INV-2384 created by John", status: "created" },
  { time: "09:47 AM", title: "Pending approval", status: "pending" },
  { time: "09:49 AM", title: "Approved by Sarah", status: "approved" },
  { time: "09:50 AM", title: "Audit log generated", status: "logged" },
  { time: "09:51 AM", title: "Evidence exported", status: "exported" },
];

export type MetricSlot = "top-right" | "bottom-left" | "bottom-right";
export type MetricIconKind = "audit" | "maker-checker" | "team";

export interface FloatingMetric {
  slot: MetricSlot;
  icon: MetricIconKind;
  title: string;
  value: string;
  note?: string;
}

export const FLOATING_METRICS: FloatingMetric[] = [
  { slot: "top-right", icon: "audit", title: "Audit Trail", value: "Immutable logs", note: "99.9% integrity" },
  { slot: "bottom-left", icon: "maker-checker", title: "Maker Checker", value: "Enabled" },
  { slot: "bottom-right", icon: "team", title: "24 Team Members", value: "Role based access" },
];

export type BentoSize = "large" | "wide" | "small";
export type BentoVariant = "capabilities" | "stat" | "feed";

export interface BentoCardData {
  id: string;
  size: BentoSize;
  variant: BentoVariant;
  eyebrow?: string;
  heading: string;
  description?: string;
  capabilities?: string[];
  stat?: { value: string; label: string };
}

export const BENTO_CARDS: BentoCardData[] = [
  {
    id: "access-control",
    size: "large",
    variant: "capabilities",
    eyebrow: "Access control",
    heading: "Role-Based Access & Control",
    description: "Work with your team. Keep control.",
    capabilities: ["Multiple users with access roles", "Maker-Checker for invoices & payments", "Approval workflows"],
  },
  {
    id: "evidence-export",
    size: "small",
    variant: "stat",
    heading: "Evidence Export",
    stat: { value: "1-click", label: "PDF & CSV exports" },
  },
  {
    id: "audit-trail",
    size: "wide",
    variant: "capabilities",
    eyebrow: "Audit trail",
    heading: "Audit Trail & Compliance",
    description: "Track every action with tamper-evident logs and exportable evidence.",
    capabilities: ["Audit trail & activity logs", "Tamper-evident change history", "User-action audit & export reports"],
  },
  {
    id: "audit-reports",
    size: "small",
    variant: "stat",
    heading: "Audit Reports",
    stat: { value: "100%", label: "Reconciled monthly" },
  },
  {
    id: "compliance",
    size: "wide",
    variant: "capabilities",
    eyebrow: "Compliance & security",
    heading: "Compliance & Security",
    description: "Maintain confidence with maker-checker workflows and GST evidence.",
    capabilities: ["Filing & ITC compliance evidence", "GST evidence trail", "ITC reconciliation records"],
  },
  {
    id: "activity-feed",
    size: "large",
    variant: "feed",
    eyebrow: "Activity feed",
    heading: "Every action, in real time",
  },
];

export type FeedIconKind = "invoice" | "approval" | "export";

export interface ActivityFeedEvent {
  title: string;
  subtitle: string;
  time: string;
  icon: FeedIconKind;
}

export const ACTIVITY_FEED_EVENTS: ActivityFeedEvent[] = [
  { title: "Invoice INV-2384", subtitle: "Created by John", time: "11:42 AM", icon: "invoice" },
  { title: "Payment Approved", subtitle: "By Sarah", time: "11:45 AM", icon: "approval" },
  { title: "Evidence Generated", subtitle: "PDF Exported", time: "11:46 AM", icon: "export" },
];
