import { useState } from 'react';
import type { FaqItem } from '@/shared/types/components';

interface FAQProps {
  items: FaqItem[];
}

export function FAQ({ items }: FAQProps) {
  const [open, setOpen] = useState(0);

  return (
    <div>
      {items.map((it, i) => (
        <div key={i} className="border-t border-[var(--hairline)] last:border-b last:border-[var(--hairline)]">
          <div
            className="flex justify-between items-center py-5 cursor-pointer font-display font-medium text-[17px] tracking-[-0.005em] text-[var(--fg-primary)] transition-colors duration-[160ms] gap-4 select-none bg-transparent border-none w-full text-left"
            style={{ color: open == i ? 'var(--accent)' : 'var(--fg-primary)' }}
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            <span>{it.q}</span>
            <span className={`shrink-0 w-6 h-6 rounded-full border inline-flex items-center justify-center font-mono text-[14px] transition-all duration-[180ms] ${open === i ? 'bg-[var(--accent)] border-[var(--accent)] text-white rotate-45' : 'border-[var(--hairline-strong)] text-[var(--fg-tertiary)]'}`}>
              +
            </span>
          </div>
          <div className={`overflow-hidden text-[15px] text-[var(--fg-secondary)] leading-[1.65] [transition:max-height_240ms_ease,padding_240ms_ease,opacity_240ms_ease] ${open === i ? 'max-h-[500px] pb-[22px] opacity-100' : 'max-h-0 opacity-0'}`}>
            {it.a}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FAQ;
