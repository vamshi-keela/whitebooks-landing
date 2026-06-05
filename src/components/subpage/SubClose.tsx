import { ButtonLink } from "../ui/Button";
import type { ClosingSection } from "../../types/pages.ts";

interface Props {
  data: ClosingSection;
}

export function SubClose({ data }: Props) {
  return (
    <section className="wb-subclose wb-reveal" data-reveal id="book-demo">
      <div className="wb-wrap wb-subclose-inner">
        <h2 className="wb-display">{data.h2}</h2>
        <p className="wb-subclose-body">{data.body}</p>
        <div className="wb-subclose-cta">
          {data.primaryCta && (
            <ButtonLink href={data.primaryCta.href || "#"} size="lg" arrow>
              {data.primaryCta.label}
            </ButtonLink>
          )}
          {data.secondaryCta && (
            <ButtonLink href={data.secondaryCta.href || "#"} variant="ghost" size="lg">
              {data.secondaryCta.label}
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
