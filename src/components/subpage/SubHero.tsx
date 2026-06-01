import { Icon } from "../../components/icons/Icon";
import { FluidBackground } from "../../layouts/SiteShell";
import type { HeroConfig } from "../../types/pages.ts";
import EyebrowPill from "../ui/EyebrowPill.tsx";
import PhotoRoom from "@/assets/Photoroom.png";

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

      <img
        src={PhotoRoom}
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 right-0 h-full w-auto max-w-[50%] object-contain object-[bottom_right] pointer-events-none z-0 max-[1024px]:max-w-[40%] max-[1024px]:opacity-70 max-[700px]:hidden"
      />
    </section>
  );
}
