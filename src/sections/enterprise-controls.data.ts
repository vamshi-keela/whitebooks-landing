/**
 * Enterprise Controls — typed content for the "Built for teams. Ready for
 * scale." section. Two full-width accent-bar control cards (Role-Based
 * Access & Control / Audit Trail & Compliance), mirroring the legacy
 * whitebooks.in layout restyled onto the app's dark/light theme tokens.
 *
 * Copy is carried over verbatim from the legacy section so the claims
 * stay accurate.
 */

export const SECTION_SUBTITLE =
  "A unified platform experience that empowers collaboration, ensures transparency, and delivers performance at scale.";

export type ControlAccent = "brand" | "indigo";

export type ControlTileIcon = "user-check" | "shield-check";

export type ControlFeatureIcon =
  | "users"
  | "invoice-check"
  | "audit-logs"
  | "shield-user"
  | "maker-checker-flow"
  | "change-history"
  | "filing-evidence"
  | "export-reports";

export interface ControlFeature {
  icon: ControlFeatureIcon;
  title: string;
  sub: string;
}

export interface ControlCardData {
  id: string;
  accent: ControlAccent;
  icon: ControlTileIcon;
  heading: string;
  description: string;
  features: ControlFeature[];
}

export const CONTROL_CARDS: ControlCardData[] = [
  {
    id: "access-control",
    accent: "brand",
    icon: "user-check",
    heading: "Role-Based Access & Control",
    description: "Work with your team. Keep control.",
    features: [
      { icon: "users", title: "Multiple users", sub: "with access roles" },
      { icon: "invoice-check", title: "Maker-Checker", sub: "for invoice & payments" },
      { icon: "audit-logs", title: "Audit trail &", sub: "activity logs" },
    ],
  },
  {
    id: "audit-trail",
    accent: "indigo",
    icon: "shield-check",
    heading: "Audit Trail & Compliance",
    description: "Track every action with tamper-evident logs and exportable evidence.",
    features: [
      { icon: "shield-user", title: "Multiple users", sub: "with access roles" },
      { icon: "maker-checker-flow", title: "Maker-Checker", sub: "for invoice & payments" },
      { icon: "change-history", title: "Tamper-evident", sub: "change history" },
      { icon: "filing-evidence", title: "Filing & ITC", sub: "compliance evidence" },
      { icon: "export-reports", title: "User-action audit", sub: "& export reports" },
    ],
  },
];
