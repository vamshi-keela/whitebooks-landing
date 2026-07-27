import DpIcon from "@/features/developer/DpIcon.tsx";
import { FluidBackground } from "../../layouts/SiteShell";
import { SeoBreadcrumb } from "@/seo/components/SeoBreadcrumb";
import type { HeroConfig } from "@/shared/types/pages";
import { Button } from "@/shared/ui/Button";
import EyebrowPill from "@/shared/ui/EyebrowPill";
import PhotoRoom from "@/assets/Photoroom.png";

interface SubHeroProps extends HeroConfig {
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const wrap = "w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4";

/**
 * Product-render stage — the hero's right column.
 *
 * The render is authored bleeding off its own bottom edge (laptop on a chrome
 * plinth), so it is anchored to the stage's bottom rim and clipped there: the
 * crop becomes intentional instead of looking like a stray floating cutout.
 * Styles live in design-system-wb.css under `.wb-substage`.
 */
function HeroStage() {
  return (
    <div className="wb-substage">
      <div className="wb-substage-glow" aria-hidden="true" />
      <div className="wb-substage-artwrap">
        <img
          src={PhotoRoom}
          alt="WhiteBooks dashboard showing income, expenses, receivables and cash flow"
          className="wb-substage-art"
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  );
}

export default function SubHero({ eyebrow, title, sub, primaryCta, secondaryCta, micro, visual, breadcrumb, onPrimaryClick, onSecondaryClick }: SubHeroProps) {
  return (
    <section className="pt-[70px] pb-[56px] relative overflow-hidden font-[var(--font-display)] bg-[var(--bg-2)]">
      <FluidBackground />

      {breadcrumb && (
        <div className={`${wrap} relative z-[2] pt-[26px] pb-[18px]`}>
          <SeoBreadcrumb items={breadcrumb} />
        </div>
      )}

      <div className={`${wrap} relative z-[2]`}>
        <div className="grid grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] gap-14 items-center max-[1080px]:grid-cols-1 max-[1080px]:gap-10">
          <div className="max-[1080px]:max-w-[720px]">
            <EyebrowPill label={eyebrow} />
            <h1
              className="font-[var(--font-display)] font-semibold leading-[1.06] tracking-[-0.025em] mt-5 mb-0 text-balance max-[1080px]:max-w-[18ch]"
              style={{ fontSize: "clamp(34px, 3.6vw, 58px)" }}
            >
              {title}
            </h1>
            <p className="mt-5 mb-0 max-w-[46ch] text-base md:text-[17px] text-[var(--muted-2)] leading-[1.6] [&_strong]:text-[var(--text)] [&_strong]:font-medium max-md:max-w-full">
              {sub}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryCta && (
                <Button variant="developerPrimary" onClick={onPrimaryClick}>
                  {primaryCta.label}
                  <DpIcon name="arrow-right" size={14} />
                </Button>
              )}
              {secondaryCta && (
                <Button variant="ghost" className="border-2 border-solid" onClick={onSecondaryClick}>
                  <DpIcon name="arrow-right" size={14} />
                  {secondaryCta.label}
                </Button>
              )}
            </div>
            {micro && (
              <p
                className="mt-[18px] text-[13.5px] italic text-[var(--muted)] [&_a]:text-[var(--brand)] [&_a]:not-italic [&_a:hover]:underline"
                dangerouslySetInnerHTML={{ __html: micro }}
              />
            )}
          </div>

          <div className="max-[1080px]:mt-2">{visual ?? <HeroStage />}</div>
        </div>
      </div>
    </section>
  );
}
