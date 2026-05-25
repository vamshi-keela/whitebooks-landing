import { Icon } from "../../components/icons/Icon";
import { FluidBackground } from "../../layouts/SiteShell";
import type { HeroConfig } from "../../types/pages.ts";
import EyebrowPill from "../ui/EyebrowPill.tsx";

interface SubHeroProps extends HeroConfig { }

export default function SubHero({ eyebrow, title, sub, primaryCta, secondaryCta, micro, visual }: SubHeroProps) {
  return (
    <section className="wb-subhero">
      <FluidBackground />
      <div className="wb-wrap wb-hero-inner">
        <div className="wb-subhero-grid">
          <div>
            <EyebrowPill label={eyebrow} />
            <h1 className="wb-display">{title}</h1>
            <p className="wb-subhero-sub">{sub}</p>
            <div className="wb-subhero-cta">
              {primaryCta && (
                <a className="wb-btn wb-btn-primary wb-btn-lg" href={primaryCta.href || "#"}>
                  {primaryCta.label} <Icon.ArrowRight width="14" height="14" />
                </a>
              )}
              {secondaryCta && (
                <a className="wb-btn wb-btn-ghost wb-btn-lg" href={secondaryCta.href || "#"}>
                  {secondaryCta.label}
                </a>
              )}
            </div>
            {micro && <p className="wb-subhero-micro" dangerouslySetInnerHTML={{ __html: micro }} />}
          </div>
          {visual && <div className="wb-subhero-visual">{visual}</div>}
        </div>
      </div>
    </section>
  );
}
