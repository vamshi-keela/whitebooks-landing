import React from 'react';
import { ButtonLink } from '@/shared/ui/Button';
import { Header, Footer, FluidBackground, Breadcrumb } from '@/layouts/SiteShell';
import { PlainSection, SubClose, FaqList } from '@/layouts/SubpageShell';
import { useReveal } from '@/shared/hooks/useReveal';
import EyebrowPill from '@/shared/ui/EyebrowPill';
import { ProofSection } from '@/sections/WbProof';
import Icon from '@/components/icons/Icon';

const SUPPORT_CHANNELS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    title: "FAQ's",
    body: "Browse our general knowledge base for quick answers to the most commonly asked questions about WhiteBooks products.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: "Customer Support",
    body: "Need support while using WhiteBooks? Get your queries resolved by our expert customer support executive round the clock.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Online Support",
    body: "Looking for quick resolution to your queries? Get online support anytime with WhiteBooks.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Technical Support",
    body: "For ASP/API developers needing integration assistance — our technical team is ready to help you with any implementation queries.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
    title: "Product Demos",
    body: "Request a one-to-one demo with our experts and see exactly how WhiteBooks fits into your compliance workflow.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    title: "Trainings",
    body: "Get step by step guidance and instructions with WhiteBooks experts to get the most out of every feature.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Domain Assistance",
    body: "Get expert help with tax filing and compliance — our domain specialists assist you with GST, e-Invoicing, and e-Way Bill workflows.",
  },
];

const FAQ_ITEMS = [
  {
    q: "What are the features offered by the WhiteBooks e-Invoicing Software?",
    a: "WhiteBooks e-Invoicing Software makes everything simple and easy for customers. You can quickly generate and manage all data at a time. Sync all the previous history and e-Invoice reports. You can also import e-Invoice data and export errors.",
  },
  {
    q: "What are the features offered by WhiteBooks GST Software?",
    a: "WhiteBooks GST Software allows you to Manage all your clients in one place. Automatic Reconciliation and Shows Mismatch of invoices, Bulk Data Import and Export Errors to Excel, Track by invoice-wise status, Role Based and Real-Time Data access Master Data Management and Reminders.",
  },
  {
    q: "What are the features offered by WhiteBooks e-Way Bill Software?",
    a: "WhiteBooks e-Way Bill Software allows you to Manage all your clients in one place. Generate e-Way Bill In One Click and e-Way Bill Reports.",
  },
  {
    q: "Is any renewal fee required for using WhiteBooks Software?",
    a: "WhiteBooks Software works based on a subscriptions & Renewals pricing model. Yes, You need to renew Your Software before its expiry date. Users may use the Software after expiry but only with basic features. Your renewal is valid for a year.",
  },
  {
    q: "Is my data safe with WhiteBooks?",
    a: "At WhiteBooks we care about privacy and security of your business and data. All your data is safe and secured on our cloud.",
  },
];

function SupportChannelCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <article
      className="p-7 max-sm:p-5 bg-[var(--bg-2)] border border-[var(--line)] rounded-[14px] transition-[border-color,background] duration-[180ms] ease hover:border-[var(--brand-border)] hover:bg-[var(--bg-elev)]"
      data-reveal
    >
      <div className="w-10 h-10 rounded-[10px] bg-[var(--brand-soft)] border border-[var(--brand-border)] flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-display font-medium text-[18px] tracking-[-0.005em] text-[var(--text)] mb-2">{title}</h3>
      <p className="text-[14px] text-[var(--muted-2)] leading-[1.6]">{body}</p>
    </article>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="flex items-start gap-4 p-5 rounded-xl bg-[var(--bg-2)] border border-[var(--line)] hover:border-[var(--brand-border)] transition-colors group"
    >
      <div className="w-10 h-10 rounded-[10px] bg-[var(--brand-soft)] border border-[var(--brand-border)] flex items-center justify-center shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-xs text-[var(--muted)] uppercase tracking-widest mb-1">{label}</p>
        <p className="text-[var(--text)] font-medium group-hover:text-[var(--brand)] transition-colors">
          {value}
        </p>
      </div>
    </a>
  );
}

export function SupportPage() {
  useReveal();

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header mode="resources" />
      <main>

        {/* Hero */}
        <section className="pt-[70px] pb-[72px] relative overflow-hidden">
          <FluidBackground />
          {/* Breadcrumb */}
          <section className="pt-[100px] pb-0">
            <div className="max-w-[1240px] mx-auto px-8 max-sm:px-5">
              <Breadcrumb
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Resources', href: '/resources/partners' },
                  { label: 'Support' },
                ]}
              />
            </div>
          </section>
          <div className="max-w-[1240px] mx-auto px-8 max-sm:px-5">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 w-full">
              <div className="flex-1 min-w-0">
                <EyebrowPill label="Resources | Support" />
                <h1 className="font-display font-medium tracking-[-0.025em] leading-[1.04] text-[clamp(42px,5.8vw,72px)] max-w-[820px]">
                  WhiteBooks <span className="text-[var(--brand)]">Support</span> and Resources
                </h1>
                <p className="mt-[22px] max-w-[620px] text-[17px] text-[var(--muted-2)] leading-[1.55]">
                  Get expert support for WhiteBooks GST accounting software. Our support team is available 24/7 to help you with any issues or questions.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href="tel:+919032111388" size="lg" arrow>
                    Call Support
                  </ButtonLink>
                  <ButtonLink href="mailto:sales@whitebooks.in" variant="ghost" size="lg">
                    Email Us
                  </ButtonLink>
                </div>
              </div>

              {/* Stats panel */}
              <div className="flex-1 flex justify-center items-center w-full max-lg:max-w-[480px]">
                <div className="w-full rounded-2xl bg-[var(--bg-2)] border border-[var(--line)] p-8 flex flex-col gap-6">
                  {[
                    { value: '25,000+', label: 'Active Clients', sub: 'Across India' },
                    { value: '24/7', label: 'Support Availability', sub: 'Round the clock' },
                    { value: 'GSP', label: 'Certified Platform', sub: 'Licensed by GSTN' },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center gap-4">
                      <div className="text-[36px] font-bold text-[var(--brand)] leading-none font-display min-w-[100px]">
                        {stat.value}
                      </div>
                      <div>
                        <div className="text-[var(--text)] font-medium text-sm">{stat.label}</div>
                        <div className="text-[var(--muted-2)] text-xs mt-0.5">{stat.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support channels */}
        <PlainSection
          label=""
          heading={
            <>
              Seven ways we have <span className="accent">got you covered.</span>
            </>
          }
        >
          <div className="grid gap-[22px] mt-10" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
            {SUPPORT_CHANNELS.map((ch, i) => (
              <SupportChannelCard key={i} {...ch} />
            ))}
          </div>
        </PlainSection>

        {/* FAQ */}
        <PlainSection
          label=""
          heading={
            <>
              Frequently asked questions.<span className="text-[var(--brand)]">questions.</span>
            </>
          }
        >
          <div className="mt-10">
            <FaqList items={FAQ_ITEMS} />
          </div>
        </PlainSection>

        {/* Contact info */}
        <section className="relative pb-[120px] max-sm:py-[72px] transition-[opacity,transform] duration-[600ms] ease-in-out" data-reveal>
          <div className="max-w-[1240px] mx-auto px-8 max-sm:px-5">
            <h2 className="font-display font-medium text-[clamp(32px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] text-[var(--text)]">
              Reach our team <span className="text-[var(--brand)]">directly.</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 max-w-[860px]">
              <ContactCard
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.86 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                }
                label="Support Line"
                value="+91 90321 11388"
                href="tel:+919032111388"
              />
              <ContactCard
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.86 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                }
                label="Sales Line"
                value="+91 90321 11788"
                href="tel:+919032111788"
              />
              <ContactCard
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                }
                label="Email Sales"
                value="sales@whitebooks.in"
                href="mailto:sales@whitebooks.in"
              />
            </div>
          </div>
        </section>

        <ProofSection />

        {/* Closing */}
        <SubClose
          h2="Still have questions?"
          body="Our support team is available 24/7. Call us at +91 90321 11388 or email sales@whitebooks.in — we'll get back to you promptly."
          primaryCta={{ label: 'Call Support', href: 'tel:+919032111388' }}
          secondaryCta={{ label: 'Email Us', href: 'mailto:sales@whitebooks.in' }}
        />
      </main>
      <Footer />
    </div>
  );
}
