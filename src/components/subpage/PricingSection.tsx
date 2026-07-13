import { cn } from "@/shared/lib/cn";
import { ButtonLink } from "@/shared/ui/Button";
import type { PricingSection as PricingSectionData } from "@/shared/types/pages";

interface Props {
  data: PricingSectionData;
}

const wrap = "w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4";

export function PricingSection({ data }: Props) {
  return (
    <section className={`${wrap} relative py-[72px] sm:py-[120px]`}>
      <h2 className="font-display font-medium text-[clamp(32px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] max-w-[780px] text-balance m-0 text-[var(--fg-primary)]">
        {data.heading || "Pricing"}
      </h2>
      {data.body && (
        <p className="mt-4 text-base md:text-lg text-[var(--muted-2)] max-w-[640px] leading-[1.55]">
          {data.body}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[18px] mt-12">
        {data.tiers.map((t, i) => (
          <div
            key={i}
            className={cn(
              "py-7 px-[26px] border border-solid rounded-[14px] flex flex-col",
              t.featured
                ? "border-brand-border bg-[linear-gradient(180deg,rgba(220,47,101,0.06),var(--bg-2))] shadow-[0_0_40px_-16px_rgba(220,47,101,0.3)]"
                : "bg-[var(--bg-2)] border-hairline"
            )}
          >
            <span className="font-mono text-[11.5px] tracking-[0.16em] uppercase text-[var(--brand)]">
              {t.name}
            </span>

            <div className="mt-2 font-display font-medium text-[30px] tracking-[-0.02em] text-[var(--text)]">
              {t.price}
              {t.cycle && (
                <span className="font-body text-sm text-[var(--muted)] font-normal ml-1">
                  {t.cycle}
                </span>
              )}
            </div>

            <ul className="my-[18px] mb-6 p-0 list-none flex flex-col gap-[10px] text-[13.5px] text-[var(--muted-2)] leading-[1.5] grow">
              {t.points.map((p, j) => (
                <li key={j} className="relative pl-[22px]">
                  <span
                    aria-hidden
                    className="absolute left-0 top-[7px] w-3 h-3 rounded-full bg-[var(--brand-soft)] shadow-[inset_0_0_0_1px_var(--brand-border)] flex items-center justify-center"
                  >
                    <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
                      <path
                        d="M1 2.5L2.8 4L6 1"
                        stroke="var(--brand)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <ButtonLink
                href="#"
                variant={t.featured ? "primary" : "ghost"}
                arrow
                className="w-full cursor-pointer"
              >
                {t.cta || "Get started"}
              </ButtonLink>
            </div>
          </div>
        ))}
      </div>
      {/* 

      {data.cta && (
        <div className="mt-7">
          <ButtonLink href={data.cta.href || "#"} variant="ghost" arrow>
            {data.cta.label}
          </ButtonLink>
        </div>
      )} */}
    </section>
  );
}
