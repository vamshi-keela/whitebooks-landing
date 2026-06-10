import React from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { Header, Footer, FluidBackground, Breadcrumb } from '@/layouts/SiteShell';
import { PlainSection, SubClose } from '@/layouts/SubpageShell';
import { useReveal } from '@/hooks/useReveal';
import EyebrowPill from '@/components/ui/EyebrowPill';
import { ProofSection } from '@/sections/WbProof';

const wrap = "max-w-[1240px] mx-auto px-8 max-sm:px-5";

const STATS = [
  { value: '10,000+', label: 'Users across India' },
  { value: '1M+', label: 'Invoices generated' },
  { value: '₹5,000Cr+', label: 'Annual transactions processed' },
  { value: '99.9%', label: 'Uptime, secure cloud hosting' },
];

const VALUES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    title: 'Integrity',
    body: 'We build for accuracy and reliability — your filings and books should always be right.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
    title: 'Transparency',
    body: 'Clear, upfront pricing with no hidden costs — what you see is what you pay.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h7v8l10-12h-7z" />
      </svg>
    ),
    title: 'Innovation',
    body: 'Continuous compliance updates so you are always ready for the next regulatory change.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: 'Customer Success',
    body: 'Every feature is designed around the real-world challenges of finance teams and CA firms.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: 'Security First',
    body: 'Enterprise-grade encryption protects your tax and financial data at every step.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.86 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    title: 'Support',
    body: 'Dedicated help and training, so your team gets the most out of every feature.',
  },
];

const INDUSTRIES = [
  'Retail & wholesale',
  'Manufacturing & distribution',
  'Healthcare & pharma',
  'Logistics & supply chain',
  'Freelancers & service providers',
];

function ValueCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <article
      data-reveal
      className="p-7 max-[700px]:p-5 bg-[var(--bg-2)] border border-[var(--line)] rounded-[14px] transition-[border-color,background] duration-[180ms] hover:border-[var(--brand-border)] hover:bg-[var(--bg-elev)]"
    >
      <div className="w-10 h-10 rounded-[10px] bg-[var(--brand-soft)] border border-[var(--brand-border)] flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="[font-family:var(--font-display)] font-medium text-[18px] max-[700px]:text-[16px] tracking-[-0.005em] m-0 mb-[10px] text-[var(--text)]">
        {title}
      </h3>
      <p className="m-0 text-sm text-[var(--muted-2)] leading-[1.6]">{body}</p>
    </article>
  );
}

export function AboutUs() {
  useReveal();

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header mode="resources" />
      <main>

        {/* Hero */}
        <section className="pt-[70px] pb-[72px] relative overflow-hidden">
          <FluidBackground />
          <section className="pt-[100px] pb-0">
            <div className={wrap}>
              <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />
            </div>
          </section>
          <div className={wrap}>
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 w-full">
              <div className="flex-1 min-w-0">
                <EyebrowPill label="Company | About Us" />
                <h1
                  className="[font-family:var(--font-display)] font-medium leading-[1.05] tracking-[-0.025em] mt-[18px] max-w-[820px] [text-wrap:balance] text-[var(--text)]"
                  style={{ fontSize: 'clamp(42px, 5.8vw, 72px)' }}
                >
                  India's most trusted{' '}
                  <span className="text-[var(--brand)]">compliance platform.</span>
                </h1>
                <p className="mt-[22px] max-w-[620px] text-[17px] text-[var(--muted-2)] leading-[1.55]">
                  WhiteBooks is a next-generation, cloud-based accounting and GST compliance company,
                  dedicated to simplifying business finance and compliance for Indian enterprises.
                  We're a GST Suvidha Provider (GSP) licensed directly by GSTN, headquartered in
                  Hyderabad, Telangana.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href="/about/contact-us" size="lg" arrow>
                    Schedule Demo
                  </ButtonLink>
                  <ButtonLink href="tel:+919032111788" variant="ghost" size="lg">
                    +91 90321 11788
                  </ButtonLink>
                </div>
              </div>

              {/* Stats panel */}
              <div className="flex-1 flex justify-center items-center w-full max-lg:max-w-[480px]">
                <div className="w-full rounded-2xl bg-[var(--bg-2)] border border-[var(--line)] p-8 grid grid-cols-2 gap-6">
                  {STATS.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-[28px] font-bold text-[var(--brand)] leading-none [font-family:var(--font-display)]">
                        {stat.value}
                      </div>
                      <div className="text-[var(--muted-2)] text-xs mt-1.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="relative pb-[120px] max-[700px]:pb-[72px]" data-reveal>
          <div className={wrap}>
            <div className="grid grid-cols-2 max-[800px]:grid-cols-1 gap-[22px] max-[800px]:gap-[14px]">
              <div className="p-8 max-[700px]:p-6 bg-[var(--bg-2)] border border-[var(--line)] border-l-[3px] border-l-[var(--brand)] rounded-r-[14px]">
                <p className="text-xs font-medium tracking-[0.18em] uppercase text-[var(--muted)] mb-3">
                  Our Mission
                </p>
                <p className="[font-family:var(--font-display)] font-medium text-[20px] leading-[1.5] tracking-[-0.005em] text-[var(--text)] m-0">
                  To transform accounting and compliance for Indian businesses through technology,
                  automation, and cloud innovation — making financial management seamless,
                  affordable, and scalable.
                </p>
              </div>
              <div className="p-8 max-[700px]:p-6 bg-[var(--bg-2)] border border-[var(--line)] border-l-[3px] border-l-[var(--brand)] rounded-r-[14px]">
                <p className="text-xs font-medium tracking-[0.18em] uppercase text-[var(--muted)] mb-3">
                  Our Vision
                </p>
                <p className="[font-family:var(--font-display)] font-medium text-[20px] leading-[1.5] tracking-[-0.005em] text-[var(--text)] m-0">
                  To become India's most trusted accounting and GST software platform — enabling
                  millions of businesses to stay compliant, make smarter financial decisions, and
                  achieve sustainable growth.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core values */}
        <PlainSection
          label=""
          heading={<>What we <span className="text-[var(--brand)]">stand for.</span></>}
        >
          <div className="grid grid-cols-3 max-[900px]:grid-cols-1 gap-[22px] max-[900px]:gap-[14px] mt-5 max-[900px]:mt-8">
            {VALUES.map((v, i) => (
              <ValueCard key={i} {...v} />
            ))}
          </div>
        </PlainSection>

        {/* Products + Industries */}
        <section className="relative pb-[120px] max-[700px]:pb-[72px]" data-reveal>
          <div className={wrap}>
            <div className="grid grid-cols-2 max-[800px]:grid-cols-1 gap-[22px] max-[800px]:gap-[14px]">
              <div className="p-8 max-[700px]:p-6 bg-[var(--bg-2)] border border-[var(--line)] rounded-[14px]">
                <h3 className="[font-family:var(--font-display)] font-medium text-[20px] tracking-[-0.005em] text-[var(--text)] mb-3">
                  What we build
                </h3>
                <p className="text-[15px] text-[var(--muted-2)] leading-[1.6] m-0">
                  GST billing, e-invoicing, e-way bill generation, multi-user access with role-based
                  permissions, and analytics dashboards — all on a single GSP-licensed cloud platform.
                </p>
              </div>
              <div className="p-8 max-[700px]:p-6 bg-[var(--bg-2)] border border-[var(--line)] rounded-[14px]">
                <h3 className="[font-family:var(--font-display)] font-medium text-[20px] tracking-[-0.005em] text-[var(--text)] mb-3">
                  Who we serve
                </h3>
                <ul className="text-[15px] text-[var(--muted-2)] leading-[1.8] m-0 pl-5 list-disc">
                  {INDUSTRIES.map((ind) => <li key={ind}>{ind}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <ProofSection />

        {/* Closing */}
        <SubClose
          h2="Ready to see WhiteBooks in action?"
          body="WhiteBooks is a product of BVM IT Consulting Services India Pvt Ltd, a GSP (GST Suvidha Provider) license holder from GSTN (Govt.). Talk to our team or schedule a demo to see it on your own data."
          primaryCta={{ label: 'Schedule Demo', href: '/about/contact-us' }}
          secondaryCta={{ label: 'Talk to Sales: +91 90321 11788', href: 'tel:+919032111788' }}
        />

      </main>
      <Footer />
    </div>
  );
}
