/**
 * Enterprise Architecture — content for the Stripe-Radar / AWS-architecture
 * style section: an animated architecture canvas (left) paired with copy + CTA
 * (right), with floating capability cards around the canvas.
 */

export interface PipelineNode {
  /** Keyed to PIPELINE_ICON in the component. */
  icon: string;
  label: string;
  sublabel: string;
}

export interface CapabilityCardData {
  /** Keyed to CAPABILITY_ICON in the component. */
  icon: string;
  title: string;
  items: string[];
}

export const API_ARCHITECTURE = {
  eyebrow: "Enterprise Infrastructure",
  title: "Production-grade APIs built for scale, speed and compliance",
  subtitle:
    "Built to handle enterprise workloads with resilient infrastructure and built-in security.",
  cta: { label: "Try WhiteBooks APIs", href: "/apis/gst" },

  /** The architecture pipeline rendered in the canvas. */
  pipeline: [
    { icon: "requests", label: "Requests", sublabel: "Inbound traffic" },
    { icon: "balancer", label: "Load Balancer", sublabel: "Routing & failover" },
    { icon: "core", label: "WhiteBooks API Core", sublabel: "Processing engine" },
    { icon: "compliance", label: "Compliance Engine", sublabel: "GST / NIC rules" },
    { icon: "audit", label: "Audit Layer", sublabel: "Tamper-evident logs" },
    { icon: "monitoring", label: "Monitoring", sublabel: "Health & metrics" },
  ] as PipelineNode[],

  capabilities: [
    { icon: "security", title: "Security", items: ["TLS 1.2+", "OAuth2", "IP restrictions"] },
    { icon: "scaling", title: "Scaling", items: ["99.99% uptime SLA", "Auto scaling", "Multi-region"] },
    { icon: "compliance", title: "Compliance", items: ["Detailed logs", "Audit trails", "Evidence export"] },
    { icon: "teams", title: "Teams", items: ["Role-based access", "Maker-checker", "Permissions"] },
  ] as CapabilityCardData[],
};

export type ApiArchitectureData = typeof API_ARCHITECTURE;
