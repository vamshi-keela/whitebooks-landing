import React from 'react';
import SectionLabel from '@/components/ui/SectionLabel';
import { QuoteCard } from '@/components/ui/QuoteCard';

export function ProofSection() {
  return (
    <section className="relative max-[700px]:py-[72px] py-24">
      <div className="w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4">
        <SectionLabel num="">Testimonials</SectionLabel>
        <div className="grid grid-cols-1 md:grid-cols-2 min-[1101px]:grid-cols-3 gap-[18px] mt-12">
          <QuoteCard
            big
            quote="We moved our entire India e-invoicing and e-way bill stack onto Whitebooks' SAP connector. What took three steps inside SAP plus a portal upload is now one button. The cost savings paid back the year-one license in six weeks."
            name="B V Srinivasababu"
            role="Senior Manager, IT Applications · NSL" />
          <div className="flex flex-col gap-5">
            <QuoteCard
              quote="Whitebooks made the GSP integration so much faster and smoother than the others we'd evaluated. Support is round-the-clock — not a ticket queue."
              name="Sahil Jain"
              role="Director · Smartbiz Technologies" />
            <QuoteCard
              quote="Whitebooks is solving the hard parts of GST — e-invoicing, e-way bills, IMS — with simple APIs. I'd recommend any finance team make their stack future-ready with it."
              name="CA Atul Garg"
              role="Finance Controller · WheelsEye" />
          </div>
        </div>
      </div>
    </section>
  );
}
