/**
 * Integrations Ecosystem — content for the Stripe-ecosystem style section:
 * three layers — partner logos → WhiteBooks Integration Layer (animated hub
 * with API nodes) → destination systems.
 */

import sapLogo from "@/assets/logos/sap.svg";
import oracleLogo from "@/assets/logos/oracle.svg";
import dynamicsLogo from "@/assets/logos/Dynamics365_scalable.svg";
import tallyLogo from "@/assets/logos/tally.svg";
import margLogo from "@/assets/logos/marg-the-business-backbone-logo.png";
import odooLogo from "@/assets/logos/odoo.svg";

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

  partnersLabel: "Trusted Partners",
  partners: [
    { name: "SAP", src: sapLogo },
    { name: "Oracle", src: oracleLogo },
    { name: "Dynamics 365", src: dynamicsLogo },
    { name: "Tally", src: tallyLogo },
    { name: "Marg", src: margLogo },
    { name: "Odoo", src: odooLogo },
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
