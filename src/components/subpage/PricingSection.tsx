import { Icon } from "../icons/Icon";
import { PlainSection } from "./PlainSection";
import type { PricingSection as PricingSectionData } from "../../types/pages.ts";

interface Props {
  data: PricingSectionData;
}

export function PricingSection({ data }: Props) {
  return (
    <PlainSection label="Pricing" heading={data.heading || "Pricing"} sub={data.body}>
      <div className="wb-tier-grid">
        {data.tiers.map((t, i) => (
          <div key={i} className={`wb-tier ${t.featured ? "featured" : ""}`}>
            <span className="wb-tier-name">{t.name}</span>
            <div className="wb-tier-price">
              {t.price}
              {t.cycle && <span className="wb-tier-cycle">{t.cycle}</span>}
            </div>
            <ul className="wb-tier-points">
              {t.points.map((p, j) => (
                <li key={j}>{p}</li>
              ))}
            </ul>
            <div className="wb-tier-cta">
              <a href="#" className={`wb-btn ${t.featured ? "wb-btn-primary" : "wb-btn-ghost"}`}>
                {t.cta || "Get started"} <Icon.ArrowRight width="13" height="13" />
              </a>
            </div>
          </div>
        ))}
      </div>
      {data.note && <p className="wb-tier-note">{data.note}</p>}
      {data.cta && (
        <div style={{ marginTop: 28 }}>
          <a href={data.cta.href || "#"} className="wb-btn wb-btn-ghost">
            {data.cta.label} <Icon.ArrowRight width="13" height="13" />
          </a>
        </div>
      )}
    </PlainSection>
  );
}
