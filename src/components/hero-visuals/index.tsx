/**
 * HeroVisual — resolves a `HeroVisualKey` from the page registry to the
 * component that renders it.
 *
 * The registries reference visuals by string so the data layer stays free of
 * React imports; this module is the single place where a key becomes a
 * component, which is what lets the engine change without touching page data.
 */
import { DeadlineTrack } from "./DeadlineTrack";
import { LedgerPost } from "./LedgerPost";
import { ProductFlow } from "./ProductFlow";
import { HERO_VISUALS } from "./specs";
import type { HeroVisualKey } from "./types";

export function HeroVisual({ name, className }: { name: HeroVisualKey; className?: string }) {
  const spec = HERO_VISUALS[name];
  switch (spec.kind) {
    case "flow":
      return <ProductFlow spec={spec} className={className} />;
    case "ledger":
      return <LedgerPost spec={spec} className={className} />;
    case "deadline":
      return <DeadlineTrack spec={spec} className={className} />;
  }
}

export { HERO_VISUALS };
export type { HeroVisualKey };
