/**
 * Developer Experience — content for the Stripe-Docs / Vercel style section:
 * three columns — copy + language SDKs (left) · animated code window (center) ·
 * floating feature cards (right).
 */

import nodejsLogo from "@/assets/logos/nodejs-logo.svg";
import pythonLogo from "@/assets/logos/python.png";
import swaggerLogo from "@/assets/logos/Swagger.svg";

export interface DeveloperFeature {
  /** Keyed to DEV_ICON in the component. */
  icon: string;
  title: string;
  detail: string;
}

export interface LanguageSdk {
  name: string;
  /** PLACEHOLDER — drop the real language icon here. */
  src?: string;
}

export const DEVELOPER_EXPERIENCE = {
  eyebrow: "Developer Experience",
  title: "Built for developers. Designed for speed.",
  subtitle:
    "Launch integrations in hours with SDKs, documentation, sandbox access and live diagnostics.",
  cta: { label: "Access Developer Portal", href: "/developer" },

  features: [
    { icon: "openapi", title: "OpenAPI specs", detail: "Swagger / OpenAPI 3.0" },
    { icon: "sdk", title: "SDK support", detail: "First-class client libraries" },
    { icon: "sandbox", title: "Sandbox validation", detail: "Real-time test environment" },
    { icon: "versioned", title: "Versioned APIs", detail: "Backward-compatible releases" },
    { icon: "errors", title: "Error diagnostics", detail: "Smart codes + debugging hints" },
    { icon: "monitoring", title: "Usage monitoring", detail: "Live dashboard for usage & issues" },
  ] as DeveloperFeature[],

  languages: [
    { name: "Node.js", src: nodejsLogo },
    { name: "Python", src: pythonLogo },
    // { name: "Swagger", src: swaggerLogo },
  ] as LanguageSdk[],

  /** Request → response flow for the code animation placeholder. */
  flow: [
    { icon: "request", label: "API Request", sublabel: "POST /v1/invoices" },
    { icon: "response", label: "JSON Response", sublabel: "200 OK" },
    { icon: "success", label: "Success", sublabel: "IRN generated" },
  ],
};

export type DeveloperExperienceData = typeof DEVELOPER_EXPERIENCE;
