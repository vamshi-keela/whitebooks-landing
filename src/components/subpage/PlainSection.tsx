import type { ReactNode } from "react";

interface PlainSectionProps {
  label?: string;
  heading?: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
}

export function PlainSection({ label, heading, sub, children }: PlainSectionProps) {
  return (
    <section className="wb-section wb-reveal" data-reveal>
      <div className="wb-wrap">
        {heading && <h2 className="wb-h2">{heading}</h2>}
        {sub && <p className="wb-section-sub">{sub}</p>}
        {children}
      </div>
    </section>
  );
}
