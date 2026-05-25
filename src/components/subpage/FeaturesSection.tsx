import type { FeaturesSection as FeaturesSectionData, FeatureItem } from "../../types/pages.ts";
import { FeatureGuide } from "@/components/feature-guide/FeatureGuide";
import { PlainSection } from "./PlainSection";

interface Props {
  data: FeaturesSectionData;
}

function FeatureGrid({ items }: { items: FeatureItem[] }) {
  return (
    <div className="wb-col-2">
      {items.map((it, i) => (
        <article key={i} className="wb-block">
          <h3>
            {it.endpoint ? <span className="endpoint">{it.endpoint}</span> : it.title}
          </h3>
          {it.endpoint && it.title && (
            <p style={{ marginTop: 6, fontFamily: "var(--font-display)", fontSize: 14, color: "var(--text)" }}>
              {it.title}
            </p>
          )}
          <p>{it.body}</p>
        </article>
      ))}
    </div>
  );
}

export function FeaturesSection({ data }: Props) {
  if (data.layout === "guide") {
    return <FeatureGuide heading={data.heading} items={data.items} navLabel={data.label || "What it does"} />;
  }
  return (
    <PlainSection label={data.label || "What it does"} heading={data.heading}>
      <FeatureGrid items={data.items} />
    </PlainSection>
  );
}
