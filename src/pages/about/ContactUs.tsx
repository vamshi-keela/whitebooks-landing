import React, { useState } from 'react';
import { ButtonLink, Button } from '@/components/ui/Button';
import { Header, Footer, FluidBackground, Breadcrumb } from '@/layouts/SiteShell';
import { PlainSection, SubClose } from '@/layouts/SubpageShell';
import { useReveal } from '@/hooks/useReveal';
import EyebrowPill from '@/components/ui/EyebrowPill';
import { ProofSection } from '@/sections/WbProof';
import { BookDemoModal } from '@/components/modals/BookDemoModal';

const wrap = "max-w-[1240px] mx-auto px-8 max-sm:px-5";

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
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
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

function OfficeCard({ title, address }: { title: string; address: string }) {
  return (
    <article
      data-reveal
      className="p-7 max-[700px]:p-5 bg-[var(--bg-2)] border border-[var(--line)] rounded-[14px]"
    >
      <div className="w-10 h-10 rounded-[10px] bg-[var(--brand-soft)] border border-[var(--brand-border)] flex items-center justify-center mb-4">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18" />
          <path d="M5 21V7l8-4v18" />
          <path d="M19 21V11l-6-4" />
        </svg>
      </div>
      <h3 className="[font-family:var(--font-display)] font-medium text-[18px] tracking-[-0.005em] m-0 mb-2 text-[var(--text)]">
        {title}
      </h3>
      <p className="m-0 text-sm text-[var(--muted-2)] leading-[1.6]">{address}</p>
    </article>
  );
}

export function ContactUs() {
  useReveal();
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header mode="resources" />
      <main>

        {/* Hero */}
        <section className="pt-[70px] pb-[72px] relative overflow-hidden">
          <FluidBackground />
          <section className="pt-[100px] pb-0">
            <div className={wrap}>
              <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]} />
            </div>
          </section>
          <div className={wrap}>
            <div className="max-w-[820px]">
              <EyebrowPill label="Company | Contact Us" />
              <h1
                className="[font-family:var(--font-display)] font-medium leading-[1.06] tracking-[-0.025em] mt-[18px] [text-wrap:balance] text-[var(--text)]"
                style={{ fontSize: 'clamp(36px, 5vw, 60px)' }}
              >
                We're a global technology company, ready to support you{' '}
                <span className="text-[var(--brand)]">at any stage of your business journey.</span>
              </h1>
              <p className="mt-[22px] max-w-[620px] text-[17px] text-[var(--muted-2)] leading-[1.55]">
                WhiteBooks is India's GSP-certified, cloud-first platform for GST compliance,
                accounting, e-invoicing, and e-way bills — trusted by 25,000+ active clients. Reach
                out and our team will get back to you.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" arrow onClick={() => setDemoOpen(true)}>
                  Schedule Demo
                </Button>
                <ButtonLink href="tel:+919032111788" variant="ghost" size="lg">
                  Talk to Sales: +91 90321 11788
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>

        {/* Contact info */}
        <PlainSection
          label=""
          heading={<>Reach our team <span className="text-[var(--brand)]">directly.</span></>}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
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
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              }
              label="Email Sales"
              value="sales@whitebooks.in"
              href="mailto:sales@whitebooks.in"
            />
          </div>
        </PlainSection>

        {/* Offices */}
        <section className="relative pb-[120px] max-[700px]:pb-[72px]" data-reveal>
          <div className={wrap}>
            <h2 className="[font-family:var(--font-display)] font-medium text-[clamp(28px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] text-[var(--text)] mb-8">
              Our offices.
            </h2>
            <div className="grid grid-cols-2 max-[800px]:grid-cols-1 gap-[22px] max-[800px]:gap-[14px]">
              <OfficeCard
                title="Registered Office"
                address="8-2-682/3/A/24, Road No 12, Banjara Hills, Hyderabad, Telangana 500034, India"
              />
              <OfficeCard
                title="Corporate Office"
                address="Flat No: 303, Gayathri Heights, Jubilee Enclave, HITECH City, Hyderabad, Telangana 500081, India"
              />
            </div>
          </div>
        </section>

        <ProofSection />

        {/* Closing */}
        <SubClose
          h2="Let's talk."
          body="Tell us about your business and we'll get back to you within 24 hours. Email us at sales@whitebooks.in or call +91 90321 11788."
          primaryCta={{ label: 'Email Us', href: 'mailto:sales@whitebooks.in' }}
          secondaryCta={{ label: 'Call Sales: +91 90321 11788', href: 'tel:+919032111788' }}
        />

      </main>
      <Footer />

      {demoOpen && <BookDemoModal onClose={() => setDemoOpen(false)} />}
    </div>
  );
}
