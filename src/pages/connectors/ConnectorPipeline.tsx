/**
 * ConnectorPipeline — the hero visual for every connector landing page.
 *
 * The engine moved to `@/components/hero-visuals/ProductFlow` when the product
 * pages (GST, e-Invoice, e-Way Bill) started using the same diagram; this is the
 * single-source adapter that keeps the eleven connector pages on their existing
 * `PipelineConfig` shape. New callers should use `<HeroVisual>` instead.
 */
import { ProductFlow } from "@/components/hero-visuals/ProductFlow";
import type { FlowNode } from "@/components/hero-visuals/types";

export type PipelineNode = FlowNode;

export interface PipelineConfig {
  source: PipelineNode;
  hub: PipelineNode;
  target: PipelineNode;
  /** Packet label per leg: [at source, inside hub, arriving at target] */
  packets: [string, string, string];
  receipt: { title: string; meta: string; qr?: boolean };
}

export function ConnectorPipeline({
  config,
  className,
}: {
  config: PipelineConfig;
  className?: string;
}) {
  const { source, ...rest } = config;
  return <ProductFlow spec={{ kind: "flow", sources: [source], ...rest }} className={className} />;
}
