import React, { useState } from 'react';
import type { FaqItem } from '@/types/components';

interface FAQProps {
  items: FaqItem[];
}

export function FAQ({ items }: FAQProps) {
  const [open, setOpen] = useState(0);

  return (
    <div>
      {items.map((it, i) => (
        <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
          <div className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{it.q}</span>
            <span className="toggle">+</span>
          </div>
          <div className="faq-a">{it.a}</div>
        </div>
      ))}
    </div>
  );
}

export default FAQ;
