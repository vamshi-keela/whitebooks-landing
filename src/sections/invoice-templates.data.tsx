/**
 * Invoice Templates — content for the premium template-gallery section.
 */

import classicPreview from "@/assets/product-images/softwares/print-page-template-one.png";
import modernPreview from "@/assets/product-images/softwares/print-page-template-two.png";
import minimalPreview from "@/assets/product-images/softwares/print-page-template-three.png";
import boldPreview from "@/assets/product-images/softwares/print-page-template-four.png";
import { ReactNode } from "react";

export type TemplateId = "classic" | "modern" | "minimal" | "bold";

export interface InvoiceTemplate {
  id: TemplateId;
  name: string;
  /** Short tagline shown on the selector card. */
  tagline: string;
  /** Longer copy shown in the info panel below the stage. */
  description: string;
  /** Mini gradient strip colors, light → dark, used on the card and as the preview accent. */
  colors: [string, string, string];
  usedBy: string;
  /** Rendered invoice screenshot shown in the stage preview. */
  image: string;
}

export const TEMPLATES: InvoiceTemplate[] = [
  {
    id: "classic",
    name: "Classic",
    tagline: "Traditional and export-friendly",
    description:
      "A timeless layout built for clarity — structured tables, bold totals and a print-ready format trusted by accountants everywhere.",
    colors: ["#aab4d4", "#3a3f5c", "#1c1e2e"],
    usedBy: "12,000+",
    image: classicPreview,
  },
  {
    id: "modern",
    name: "Modern",
    tagline: "Balanced typography and spacing",
    description:
      "Perfect for growing businesses with balanced spacing and professional typography.",
    colors: ["#ff8ab8", "#d33568", "#7a1640"],
    usedBy: "8,000+",
    image: modernPreview,
  },
  {
    id: "minimal",
    name: "Minimal",
    tagline: "Elegant and distraction free",
    description:
      "Stripped back to the essentials — generous whitespace and quiet typography that let your brand do the talking.",
    colors: ["#f3f3f6", "#c7c7d6", "#8a8aa0"],
    usedBy: "6,500+",
    image: minimalPreview,
  },
  {
    id: "bold",
    name: "Bold",
    tagline: "High contrast and strong branding",
    description:
      "Strong colour blocks and confident type for businesses that want their invoices to stand out.",
    colors: ["#ffb84d", "#ff5a8e", "#15151c"],
    usedBy: "4,200+",
    image: boldPreview,
  },
];

export const SUPPORTED_PILLS = [
  "GST",
  "Digital signature",
  "Custom branding",
  "QR codes",
  "Export ready",
];

export const FEATURE_CHIPS = [
  "Print Friendly",
  "Custom Branding",
  "Digital Signature",
  "QR Codes",
  "PDF Export",
  "Stamp Support",
  "GST Ready",
  "Responsive Layout",
];

export const CUSTOMIZATION_ITEMS = [
  "Logo",
  "Signature",
  "Stamp",
  "Brand Color",
  "QR Code",
  "GST Ready",
];

export const SECTION_HEADER: { eyebrow: string; heading: ReactNode; subtitle: string } = {
  eyebrow: "Invoice templates",
  heading: <><span className="text-[var(--brand)]">Professional invoices</span> that look as good as your business</>,
  subtitle:
    "Choose from beautifully designed layouts that are ready for branding, GST compliance, exports and digital signatures.",
};
