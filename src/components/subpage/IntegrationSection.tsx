import { ButtonLink } from "../ui/Button";
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
        <div className="mt-7 flex flex-wrap gap-4">
          {data.cta && (
            <ButtonLink href={data.cta.href || "#"} variant="ghost" arrow>
              {data.cta.label}
            </ButtonLink>
          )}
          {data.secondaryCta && (
            <ButtonLink href={data.secondaryCta.href || "#"} variant="ghost" arrow>
              {data.secondaryCta.label}
            </ButtonLink>
          )}
        </div>
      )}
    </PlainSection>
  );
}
