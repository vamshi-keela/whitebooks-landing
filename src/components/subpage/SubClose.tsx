import { Icon } from "../icons/Icon";
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
            <a className="wb-btn wb-btn-primary wb-btn-lg" href={data.primaryCta.href || "#"}>
              {data.primaryCta.label} <Icon.ArrowRight width="14" height="14" />
            </a>
          )}
          {data.secondaryCta && (
            <a className="wb-btn wb-btn-ghost wb-btn-lg" href={data.secondaryCta.href || "#"}>
              {data.secondaryCta.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
