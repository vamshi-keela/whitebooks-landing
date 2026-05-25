import { Icon } from "../icons/Icon";
import { PlainSection } from "./PlainSection";
import type { IntegrationSection as IntegrationSectionData } from "../../types/pages.ts";

interface Props {
  data: IntegrationSectionData;
}

export function IntegrationSection({ data }: Props) {
  return (
    <PlainSection label="Integrations" heading={data.heading} sub={data.body}>
      <div className="wb-int-logos">
        {data.logos.map((l, i) => (
          <span key={i} className="wb-int-chip">{l}</span>
        ))}
      </div>
      {(data.cta || data.secondaryCta) && (
        <div style={{ marginTop: 28, display: "flex", gap: 16, flexWrap: "wrap" }}>
          {data.cta && (
            <a href={data.cta.href || "#"} className="wb-btn wb-btn-ghost">
              {data.cta.label} <Icon.ArrowRight width="13" height="13" />
            </a>
          )}
          {data.secondaryCta && (
            <a href={data.secondaryCta.href || "#"} className="wb-btn wb-btn-ghost">
              {data.secondaryCta.label} <Icon.ArrowRight width="13" height="13" />
            </a>
          )}
        </div>
      )}
    </PlainSection>
  );
}
