/**
 * Compliance & Support — content for the Stripe-Atlas / Vercel-Enterprise style
 * section: headline + CTA + infrastructure animation (left, 40%) paired with a
 * staggered stack of floating glass feature cards (right, 60%).
 */

export interface ComplianceFeature {
  /** Keyed to ASSURANCE_ICON in the component. */
  icon: string;
  title: string;
  detail: string;
}

export const COMPLIANCE_SUPPORT = {
  eyebrow: "Compliance & Support",
  title: "Enterprise-grade API infrastructure backed by experts",
  subtitle:
    "Go live faster with certified GST, e-Invoice, e-Way Bill and Notice Management APIs, guided onboarding and support designed for scale.",
  cta: { label: "Schedule Integration Help", href: "/about/contact-us" },
  features: [
    { icon: "gsp", title: "GSP-certified infrastructure", detail: "Direct GSTN-licensed gateway" },
    { icon: "gateway", title: "NIC-compliant API gateway", detail: "Aligned with NIC standards" },
    { icon: "onboarding", title: "Guided onboarding & assisted integration", detail: "Hands-on go-live support" },
    { icon: "success", title: "Dedicated enterprise success team", detail: "Named account ownership" },
    { icon: "support", title: "24×7 technical support", detail: "Ticket or Teams, always on" },
  ] as ComplianceFeature[],
  /** Infrastructure flow for the left animation placeholder. */
  flow: [
    { icon: "request", label: "Request", sublabel: "Inbound API call" },
    { icon: "gateway", label: "GST Gateway", sublabel: "WhiteBooks GSP" },
    { icon: "nic", label: "NIC", sublabel: "Government network" },
    { icon: "success", label: "Success", sublabel: "Signed & returned" },
  ],
};

export type ComplianceSupportData = typeof COMPLIANCE_SUPPORT;
