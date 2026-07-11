import type { FAQSection as FAQSectionData } from "../../types/pages.ts";
import FAQ from "../ui/FAQ.tsx";

interface Props {
  data: FAQSectionData;
  centered?: boolean;
}
const wrap = "w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4";

export function FAQSection({ data, centered = false }: Props) {
  return (
    <section className={`${wrap} relative py-[72px] sm:py-[120px]`}>

      <h2 className={`font-serif font-semibold text-[clamp(32px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] m-0 max-w-[780px] text-balance ${centered ? "mx-auto text-center" : ""}`}>
        Frequently asked <span className="text-[var(--brand)]">Questions.</span>
      </h2>
      <div className={`mt-10 max-w-[880px] ${centered ? "mx-auto" : ""}`}>
        <FAQ items={data.items} />
      </div>
    </section>
  );
}
