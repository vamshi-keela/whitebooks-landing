import React from 'react';
import SectionLabel from '@/components/ui/SectionLabel';
import { StatStrip } from '@/components/ui/StatStrip';
import { Counter } from '@/components/ui/Counter';
import { QuoteCard } from '@/components/ui/QuoteCard';

export function ProofSection() {
  return (
    <section className="section">
      <div className="container">
        <SectionLabel num="07">Proof</SectionLabel>
        <StatStrip stats={[
          { value: <Counter value={10} format={(n) => n.toFixed(0)} />, unit: 'cr+', label: 'Invoices filed via Whitebooks' },
          { value: <Counter value={12000} />, unit: '+', label: '12,000+ businesses · 5,000+ CA firms' },
          { value: <Counter value={30000} />, unit: '+', label: 'Users across 8,000+ Indian cities' },
          { prefix: '₹', value: '0', label: 'Customer data shared with third parties' },
        ]} />
        <div className="grid-3" style={{ marginTop: 48 }}>
          <QuoteCard
            big
            quote="We moved our entire India e-invoicing and e-way bill stack onto Whitebooks' SAP connector. What took three steps inside SAP plus a portal upload is now one button. The cost savings paid back the year-one license in six weeks."
            name="B V Srinivasababu"
            role="Senior Manager, IT Applications · NSL" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
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
