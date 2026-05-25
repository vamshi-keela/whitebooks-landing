"use client";
import { useState } from "react";
import { PlainSection } from "./PlainSection";
import type { FAQSection as FAQSectionData } from "../../types/pages.ts";

interface Props {
  data: FAQSectionData;
}

export function FAQSection({ data }: Props) {
  const [open, setOpen] = useState(0);
  return (
    <PlainSection label="FAQ" heading={data.heading || "Frequently asked questions."}>
      <div className="wb-faq">
        {data.items.map((it, i) => (
          <div key={i} className={`wb-faq-item ${open === i ? "is-open" : ""}`}>
            <button
              className="wb-faq-q"
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
            >
              <span>{it.q}</span>
              <span className="wb-faq-icon">+</span>
            </button>
            <div className="wb-faq-a">{it.a}</div>
          </div>
        ))}
      </div>
    </PlainSection>
  );
}
