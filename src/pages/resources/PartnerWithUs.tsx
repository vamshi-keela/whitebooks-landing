import React from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { Header, Footer, FluidBackground, Breadcrumb } from '@/layouts/SiteShell';
import { PlainSection, SubClose } from '@/layouts/SubpageShell';
import { useReveal } from '@/hooks/useReveal';
import EyebrowPill from '@/components/ui/EyebrowPill';
import { ProofSection } from '@/sections/WbProof';
import partnerImg from '@/assets/resources/partner.webp';

const GUARANTEES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    title: "Trustworthy & Reliable",
    body: "We deliver what we promise. At WhiteBooks we always provide you the solution you are looking for.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Transparency in Relationship",
    body: "At WhiteBooks we care about our relationships and help you in your businesses by keeping our contracts transparent.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.86 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    title: "Unparalleled Support",
    body: "The WhiteBooks team is always there to help you round the clock.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Guaranteed Share",
    body: "We appreciate your efforts, and we at WhiteBooks offer you a guaranteed share for your efforts.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <polyline points="9 16 11 18 15 14" />
      </svg>
    ),
    title: "Timely Payments",
    body: "We ensure on time payments of your share.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 7h3M7 11h3" />
        <path d="M14 7h3M14 11h3" />
      </svg>
    ),
    title: "Complete Control Over Your Data",
    body: "You can control all your clients with your partner login and check your data at your convenience.",
  },
];

function GuaranteeCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <article className="wb-block" data-reveal>
      <div className="w-10 h-10 rounded-[10px] bg-[var(--brand-soft)] border border-[var(--brand-border)] flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="mb-2">{title}</h3>
      <p>{body}</p>
    </article>
  );
}

export function PartnerWithUs() {
  useReveal();

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header mode="resources" />
      <main>
        {/* Breadcrumb */}
        <section className="pt-[100px] pb-0">
          <div className="wb-wrap">
            <Breadcrumb items={[
              { label: "Home", href: "/" },
              { label: "Resources", href: "/resources/partners" },
              { label: "Partner With Us" },
            ]} />
          </div>
        </section>

        {/* Hero — two-column row with image */}
        <section className="wb-subhero">
          {/* <FluidBackground /> */}
          <div className="wb-wrap">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 w-full">
              <div className="flex-1 min-w-0">
                <EyebrowPill label="Resources | Partner Program" />
                <h1 className="wb-display text-[clamp(42px,5.8vw,72px)] max-w-[820px]">
                  Partner With <span className="accent">WhiteBooks.</span>
                </h1>
                <p className="wb-subhero-sub max-w-[600px]">
                  Are you an individual or an agency looking to partner with us? Join India's leading GSP-licensed compliance platform and build a rewarding partnership.
                </p>
                <div className="wb-subhero-cta">
                  <ButtonLink href="mailto:sales@whitebooks.in" size="lg" arrow>
                    Let's Talk
                  </ButtonLink>
                  <ButtonLink href="tel:+919032111788" variant="ghost" size="lg">
                    +91 90321 11788
                  </ButtonLink>
                </div>
              </div>

              <div className="flex-1 flex justify-center items-center w-full max-lg:max-w-[480px]">
                <img
                  src={partnerImg}
                  alt="Partner with WhiteBooks"
                  className="w-full rounded-2xl object-cover shadow-[0_24px_80px_-16px_rgba(0,0,0,0.5)]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CEO Quote */}
        <section className="wb-section wb-reveal" data-reveal>
          <div className="wb-wrap">
            <p className="wb-section-label">From our CEO</p>
            <div className="max-w-[860px] mt-8">
              <div className="wb-quote-card">
                <span className="wb-quote-mark">"</span>
                <p className="wb-quote-text">
                  I Think That Everything And Everyone Has A Unique Talent That No Other Person Or Thing Possesses. This Is Something That We Never Understand, But We Use It And Get Benefits. Partnership, To Me, Is The Similar Thing That Helps Two Individuals, Companies, Business Enterprises, And Entrepreneurs Fill The Gap.
                </p>
                <div className="wb-quote-attr">
                  <strong>Mallikharjuna Rao Chittabathina</strong> — CEO, WhiteBooks
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section className="wb-section wb-reveal !pt-0" data-reveal>
          <div className="wb-wrap">
            <div className="flex flex-wrap items-center gap-8 lg:gap-12 px-8 lg:px-10 py-8 bg-[var(--bg-2)] border border-[var(--line)] border-l-[3px] border-l-[var(--brand)] rounded-r-[14px]">
              <div>
                <div className="text-[48px] font-bold text-[var(--brand)] leading-none font-[var(--font-display)]">
                  25,000+
                </div>
                <div className="text-sm text-[var(--muted-2)] mt-1.5">Customers across India</div>
              </div>
              <div className="flex-1 min-w-[200px]">
                <p className="text-[15px] text-[var(--muted-2)] leading-relaxed m-0">
                  Join a growing ecosystem of partners who help businesses across India achieve seamless GST, e-Invoicing, and compliance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Partner — 6 guarantees */}
        <PlainSection
          label="Why partner with us"
          heading={<>Six reasons partners <span className="accent">choose WhiteBooks.</span></>}
        >
          <div className="wb-col-3 mt-10">
            {GUARANTEES.map((g, i) => (
              <GuaranteeCard key={i} {...g} />
            ))}
          </div>
        </PlainSection>

        <ProofSection />

        {/* Closing */}
        <SubClose
          h2="Ready to grow together?"
          body="Reach out to our partnerships team and let's explore how we can build a rewarding relationship. Email us at sales@whitebooks.in or call us at +91 90321 11788."
          primaryCta={{ label: "Email Us", href: "mailto:sales@whitebooks.in" }}
          secondaryCta={{ label: "Call Sales: +91 90321 11788", href: "tel:+919032111788" }}
        />
      </main>
      <Footer />
    </div>
  );
}
