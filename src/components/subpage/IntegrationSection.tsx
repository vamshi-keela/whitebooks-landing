import { ButtonLink } from "../ui/Button";
import type { IntegrationSection as IntegrationSectionData } from "../../types/pages.ts";
import { useNavigate } from "react-router-dom";

interface Props {
  data: IntegrationSectionData;
}

const wrap = "w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4";

export function IntegrationSection({ data }: Props) {
  const navigate = useNavigate();
  return (
    <section className={`${wrap} relative py-[72px] sm:py-[120px]`}>
      {data.heading && (
        <h2 className="font-display font-medium text-[clamp(28px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] max-w-[780px] text-balance m-0 text-[var(--fg-primary)]">
          {data.heading}
        </h2>
      )}
      {data.body && (
        <p className="mt-4 text-[16.5px] text-[var(--muted-2)] max-w-[640px] leading-[1.55]">
          {data.body}
        </p>
      )}

      <div className="mt-9 flex flex-wrap gap-3">
        {data.logos.map((l, i) => (
          <span
            key={i}
            className="py-[10px] px-4 bg-[var(--bg-2)] border border-solid border-hairline rounded-full font-body text-[13px] font-medium text-[var(--muted-2)] transition-colors duration-[160ms] hover:text-[var(--text)] hover:border-brand-border cursor-default"
          >
            {l}
          </span>
        ))}
      </div>

      {(data.cta || data.secondaryCta) && (
        <div className="mt-7 flex flex-wrap gap-4">
          {data.cta && (
            <ButtonLink onClick={() => navigate('/developer')} href={data.cta.href || "#"} variant="ghost" arrow>
              {data.cta.label}
            </ButtonLink>
          )}
          {/* {data.secondaryCta && (
            <ButtonLink href={data.secondaryCta.href || "#"} variant="ghost" arrow>
              {data.secondaryCta.label}
            </ButtonLink>
          )} */}
        </div>
      )}
    </section>
  );
}
