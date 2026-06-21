/**
 * Integrations Ecosystem — content for the Stripe-ecosystem style section:
 * three layers — partner logos → WhiteBooks Integration Layer (animated hub
 * with API nodes) → destination systems.
 *
 * Partner logos & destination icons reference placeholders; replace the `src`
 * paths and icon assets with the real marks.
 */

export interface ApiNode {
  /** Keyed to API_ICON in the component. */
  icon: string;
  label: string;
}

export interface DestinationNode {
  /** Keyed to DEST_ICON in the component. */
  icon: string;
  label: string;
}

export const INTEGRATION_PARTNERS = {
  eyebrow: "Integrations",
  title: "Connect WhiteBooks with your existing ecosystem",
  subtitle:
    "Integrate with ERPs, accounting software, POS systems and custom applications.",
  cta: { label: "Explore Integrations", href: "/apis" },

  // PLACEHOLDER partner logos — replace `src` with real marks.
  partners: [
    { name: "SAP", src: "/assets/logos/sap.svg" },
    { name: "Oracle", src: "/assets/logos/oracle.svg" },
    { name: "Dynamics", src: "/assets/logos/dynamics-365.svg" },
    { name: "Tally", src: "/assets/logos/tally.svg" },
    { name: "Marg", src: "/assets/logos/marg.svg" },
    { name: "Odoo", src: "/assets/logos/odoo.svg" },
  ],

  hubTitle: "WhiteBooks Integration Layer",
  apiNodes: [
    { icon: "gst", label: "GST APIs" },
    { icon: "einvoice", label: "eInvoice APIs" },
    { icon: "eway", label: "eWay Bill APIs" },
  ] as ApiNode[],

  destinations: [
    { icon: "erp", label: "ERP Systems" },
    { icon: "pos", label: "POS Platforms" },
    { icon: "accounting", label: "Accounting Software" },
    { icon: "custom", label: "Custom Apps" },
    { icon: "marketplace", label: "Marketplace Platforms" },
  ] as DestinationNode[],

  /** Flow for the integration animation placeholder. */
  flow: [
    { icon: "erp", label: "ERP", sublabel: "Source system" },
    { icon: "hub", label: "WhiteBooks", sublabel: "Integration layer" },
    { icon: "gst", label: "GST APIs", sublabel: "Compliance calls" },
    { icon: "success", label: "Success", sublabel: "Filed & synced" },
  ],
};

export type IntegrationPartnersData = typeof INTEGRATION_PARTNERS;
