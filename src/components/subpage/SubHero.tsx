import DpIcon from "@/features/developer/DpIcon.tsx";
import { FluidBackground } from "../../layouts/SiteShell";
import { SeoBreadcrumb } from "@/seo/components/SeoBreadcrumb";
import type { HeroConfig } from "@/shared/types/pages";
import { Button } from "@/shared/ui/Button";
import EyebrowPill from "@/shared/ui/EyebrowPill";
import PhotoRoom from "@/assets/Photoroom.png";
import { useNavigate } from "react-router-dom";

interface SubHeroProps extends HeroConfig {
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const wrap = "w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4";

export default function SubHero({ eyebrow, title, sub, primaryCta, secondaryCta, micro, visual, breadcrumb, onPrimaryClick, onSecondaryClick }: SubHeroProps) {
  const navigate = useNavigate();

  return (
    <section className="pt-[70px] pb-[72px] relative overflow-hidden font-[var(--font-display)] bg-[var(--bg-2)] max-xl:min-h-screen">
      <FluidBackground />

      {breadcrumb && (
        <section style={{ paddingTop: 30, paddingBottom: 20 }}>
          <div className={wrap}>
            <SeoBreadcrumb items={breadcrumb} />
          </div>
        </section>
      )}

      <div className={`${wrap} relative z-[2]`}>
        <div className="grid grid-cols-[1.05fr_1fr] gap-10 items-end max-[1000px]:grid-cols-1">
          <div>
            <EyebrowPill label={eyebrow} />
            <h1 className="font-[var(--font-display)] font-semibold leading-[1.05] tracking-[-0.025em] mb-0 max-w-[880px] text-balance"
              style={{ fontSize: "clamp(36px, 4vw, 101px)" }}>
              {title}
            </h1>
            <p className="mt-[22px] mb-0 max-w-[620px] text-base md:text-lg text-[var(--muted-2)] leading-[1.55] [&_strong]:text-[var(--text)] [&_strong]:font-medium max-md:max-w-full">
              {sub}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryCta && (
                <Button
                  variant="developerPrimary"
                  onClick={onPrimaryClick}
                >
                  {primaryCta.label}
                  <DpIcon name="arrow-right" size={14} />
                </Button>
              )}
              {secondaryCta && (
                <Button
                  variant="ghost"
                  className="border-2"
                  onClick={onSecondaryClick}
                >
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

          {visual && (
            <div className="mt-[10px] max-[1000px]:mt-0">
              {visual}
            </div>
          )}
        </div>
      </div>

      <img
        src={PhotoRoom}
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 right-0 h-full w-auto max-w-[55%] object-contain object-[bottom_right] pointer-events-none z-0 max-[1024px]:max-w-[40%] max-[1024px]:opacity-70 max-[700px]:hidden"
      />
    </section>
  );
}
