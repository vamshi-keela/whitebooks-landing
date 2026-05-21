import React from 'react';
import SectionLabel from '@/components/ui/SectionLabel';
import { FAQ } from '@/components/ui/FAQ';

export function FAQSection() {
  return (
    <section className="section hairline">
      <div className="container" style={{ paddingLeft: 30, paddingRight: 30 }}>
        <div className="wb-faq-layout">
          <div>
            <h2 className="h2">Frequently<br className="wb-br-desktop" /> asked.</h2>
            <p className="" style={{ marginTop: 18 }}>
              "Signup to Explore the Features of WhiteBooks —<br className="wb-br-desktop" /> A GST Software - A licensed GSP"
            </p>
          </div>
          <FAQ items={[
            { q: 'Is Whitebooks a licensed GSP or a reseller?', a: 'Whitebooks is a directly licensed GST Suvidha Provider (GSP) under GSTN. The license is held by BVM IT Consulting Services India Private Limited, the parent entity. No intermediary, no resold infrastructure.' },
            { q: 'How is Whitebooks different from ClearTax, Tally, or Zoho Books?', a: 'Three differences. First, Whitebooks holds its own GSP license — most competitors resell GSP capacity. Second, Whitebooks has native SAP S/4HANA and Tally connectors built in-house, not third-party. Third, Whitebooks operates KSA e-invoicing on the same platform, which no Indian-headquartered competitor currently does.' },
            { q: 'Can I migrate from ClearTax TaxCloud to Whitebooks?', a: 'Yes. ClearTax discontinued TaxCloud access for many CA firms in late 2025. Whitebooks runs a guided migration that imports all prior-year GSTR records, working papers, and client masters. Most firms migrate in under 45 minutes.' },
            { q: 'Does Whitebooks support the new GST 2.0 rates (5%, 18%, 40%)?', a: 'Yes. Whitebooks applied the GST 2.0 rate structure from September 22, 2025, in line with the 56th GST Council notifications. HSN-level rate mapping, post-sale discount handling (revised Section 15), and the new refund mechanisms are all live.' },
            { q: 'Is e-invoicing mandatory for my business?', a: 'From 1st April 2026, e-invoicing is mandatory for any business with AATO above ₹5 crore in FY 2025–26. For businesses above ₹10 crore AATO, invoices must be reported to the IRP within 30 days of the invoice date — invoices reported later are invalid for ITC. Whitebooks enforces this window automatically.' },
            { q: 'Where is my data stored?', a: 'All data is stored in ISO 27001-certified Indian data centers. Whitebooks is a GSP under direct GSTN oversight, audited annually. Data is encrypted at rest (AES-256) and in transit (TLS 1.3). No data is shared with third parties. No data is used to train AI models without explicit opt-in.' },
            { q: 'Do you have a free trial?', a: 'Yes — 14 days, full features, no card required. CA firms get an extended 30-day trial including white-glove migration support.' },
            { q: "What's the typical onboarding time?", a: 'Self-serve SMB: same day. CA firm with up to 100 clients: 1–2 days. Enterprise with SAP integration: 2–4 weeks including UAT.' },
          ]} />
        </div>
      </div>
    </section>
  );
}
