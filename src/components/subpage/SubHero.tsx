import DpIcon from "@/features/developer/DpIcon.tsx";
import { FluidBackground } from "../../layouts/SiteShell";
import { SeoBreadcrumb } from "@/seo/components/SeoBreadcrumb";
import type { HeroConfig } from "@/shared/types/pages";
import { Button } from "@/shared/ui/Button";
import EyebrowPill from "@/shared/ui/EyebrowPill";
import PhotoRoom from "@/assets/Photoroom.png";
import { HeroVisual } from "@/components/hero-visuals";
import { CodeBlock } from "@/features/developer/DpComponents";
import { heroTabs } from "@/features/developer/DpHomeData";

interface SubHeroProps extends HeroConfig {
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const wrap = "w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4";

/**
 * Product-render stage — the hero's right column. Two modes:
 *
 * - `image` given (product screenshots, from the page registry): the stage has
 *   no height of its own. The shot sits in the flow at width:100%, so the panel
 *   ends up exactly as tall as the image's own aspect ratio makes it — whatever
 *   its pixel dimensions are. Nothing is cropped, nothing is letterboxed.
 * - no `image`: the legacy render, authored bleeding off its own bottom edge
 *   (laptop on a chrome plinth), anchored to the stage's bottom rim and clipped
 *   there so the crop reads as intentional.
 *
 * Styles live in design-system-wb.css under `.wb-substage`.
 */
function HeroStage({ image, imageAlt }: { image?: string; imageAlt?: string }) {
  const fit = Boolean(image);
  return (
    <div className={`wb-substage${fit ? " wb-substage--fit" : ""}`}>
      <div className="wb-substage-glow" aria-hidden="true" />
      <div className="wb-substage-artwrap">
        <img
          src={image ?? PhotoRoom}
          alt={imageAlt ?? "WhiteBooks dashboard showing income, expenses, receivables and cash flow"}
          className="wb-substage-art"
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  );
}

export default function SubHero({ eyebrow, title, sub, primaryCta, secondaryCta, micro, visual, visualKey, image, imageAlt, breadcrumb, onPrimaryClick, onSecondaryClick }: SubHeroProps) {
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

          {/* Precedence: an explicit node beats the animated visual, which beats a screenshot. */}
          <div className="max-[1080px]:mt-2">
            {visual ??
              (visualKey ? <HeroVisual name={visualKey} /> : <HeroStage image={image} imageAlt={imageAlt} />)}
          </div>
        </div>
      </div>
    </section>
  );
}



export function APISubHero({ eyebrow, title, sub, primaryCta, secondaryCta, micro, codeTabs, breadcrumb, onPrimaryClick, onSecondaryClick }: SubHeroProps) {
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

          {/* Right — CodeBlock (hidden on mobile). The sample is per-API and
              comes from the page registry; heroTabs is the generic fallback. */}
          <div className="relative md:block">
            <CodeBlock tabs={codeTabs ?? heroTabs} />
            {/* 200 OK badge */}
            <div className="absolute bottom-[-16px] right-6 bg-[var(--dp-surface-2)] border border-[var(--dp-border)] rounded-full px-3 py-[5px] flex items-center gap-[7px] text-[0.75rem] font-[var(--font-mono)] shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
              <span className="text-[var(--dp-success)] font-semibold">200 OK</span>
              <span className="text-[var(--dp-fg-dim)]">·</span>
              <span className="text-[var(--dp-fg-muted)]">142ms</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
