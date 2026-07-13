import { PlainSection } from "@/layouts/SubpageShell.tsx";
import type { FeaturesSection as FeaturesSectionData, FeatureItem } from "@/shared/types/pages";
import { FeatureGuide } from "@/components/feature-guide/FeatureGuide";
import { PlatformShowcase } from "@/sections/PlatformShowcase";

interface Props {
  data: FeaturesSectionData;
}

function FeatureGrid({ items }: { items: FeatureItem[] }) {
  return (
    <div className="wb-col-2">
      {items.map((it, i) => {
        const inner = (
          <>
            <h3>
              {it.endpoint ? <span className="endpoint">{it.endpoint}</span> : it.title}
            </h3>
            {it.endpoint && it.title && (
              <p style={{ marginTop: 6, fontFamily: "var(--font-display)", fontSize: 14, color: "var(--text)" }}>
                {it.title}
              </p>
            )}
            <p>{it.body}</p>
          </>
        );
        return it.href ? (
          <a key={i} href={it.href} className="wb-block wb-block--link">
            {inner}
          </a>
        ) : (
          <article key={i} className="wb-block">
            {inner}
          </article>
        );
      })}
    </div>
  );
}

export function FeaturesSection({ data }: Props) {
  if (data.layout === "showcase") {
    return <>
      {/* <PlatformShowcase heading={data.heading} /> */}
      <FeatureGuide heading={data.heading} items={data.items} navLabel={data.label || "What it does"} />
    </>;
  }
  if (data.layout === "guide") {
    return <FeatureGuide heading={data.heading} items={data.items} navLabel={data.label || "What it does"} />;
  }
  return (
    <PlainSection heading={data.heading}>
      <FeatureGrid items={data.items} />
    </PlainSection>
  );
}
