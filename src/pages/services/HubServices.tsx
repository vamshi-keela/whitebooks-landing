import React from 'react';
import Icon from '@/components/icons/Icon';
import { ButtonLink } from '@/shared/ui/Button';
import { Header, Footer, FluidBackground, Breadcrumb } from '@/layouts/SiteShell';
import { useReveal } from '@/shared/hooks/useReveal';
import EyebrowPill from '@/shared/ui/EyebrowPill';
import imgRegistration from '@/assets/services/services-register.png';
import imgCompliance from '@/assets/services/compliance.png';
import imgAudit from '@/assets/services/audit-services.png';
import imgManaged from '@/assets/services/managed-services.png';

interface ServiceItem {
  icon: React.ReactNode;
  image: string;
  name: string;
  tagline: string;
  points: string[];
  href: string;
}

const SERVICES: ServiceItem[] = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    image: imgRegistration,
    name: "Registration",
    tagline: "Every business registration your entity needs — handled end to end.",
    points: [
      "GST Registration",
      "Provident Fund (PF) Registration",
      "ESI Registration",
      "Professional Tax Registration",
      "Trade License & Labour License",
      "MSME Registration",
      "Startup India Registration",
      "Incorporation of all assessee types",
    ],
    href: "/services/registration",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    image: imgCompliance,
    name: "Compliance",
    tagline: "Ongoing statutory filings handled by experts — never miss a deadline.",
    points: [
      "GST Returns & Payments (incl. QRMP)",
      "E-Invoicing & e-Way Bill compliance",
      "TDS / TCS Returns & Payments",
      "PF, ESI & PT Returns",
      "Income Tax Filing",
      "ROC & LLP Annual Returns",
      "Transfer Pricing Report (3CEB)",
      "GST Annual Returns & LUT Renewal",
    ],
    href: "/services/compliance",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
    image: imgAudit,
    name: "Audit Services",
    tagline: "Thorough, independent audits performed by experienced professionals.",
    points: [
      "Statutory audit for companies",
      "Income tax audit",
      "GST audit",
      "Inventory audits",
      "Fixed assets audit",
      "Special purpose audits",
    ],
    href: "/services/audit",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
    image: imgManaged,
    name: "Managed Services",
    tagline: "Fully outsourced finance operations — your back-office, our responsibility.",
    points: [
      "Accounting & Bookkeeping",
      "Fixed Assets Management",
      "Year-End Support & Accounts Closure",
      "Financial Statements Preparation",
      "Ad hoc Advisory Services",
    ],
    href: "/services/managed",
  },
];

function ServiceCard({ s }: { s: ServiceItem }) {
  return (
    <article
      data-reveal
      className="flex flex-col rounded-[14px] border border-[var(--line)] bg-[var(--bg-2)] overflow-hidden transition-[border-color,background,transform] duration-200 hover:border-[var(--brand-border)] hover:bg-[var(--bg-elev)] hover:-translate-y-0.5"
    >
      {/* Image */}
      <div className="w-full aspect-video overflow-hidden bg-[var(--bg-3)] border-b border-[var(--line-2)] shrink-0">
        <img
          src={s.image}
          alt={s.name}
          className="w-full h-full object-cover object-top block"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Head */}
        <div className="flex items-center gap-[14px] mb-3">
          <span className="w-11 h-11 inline-flex items-center justify-center rounded-[10px] bg-[var(--brand-soft)] text-[var(--brand)] border border-[var(--brand-border)] shrink-0">
            {s.icon}
          </span>
          <h3 className="[font-family:var(--font-display)] font-medium text-xl tracking-[-0.01em] m-0 text-[var(--text)]">
            {s.name}
          </h3>
        </div>

        {/* Tagline */}
        <p className="m-0 mb-4 text-[15px] text-[var(--muted-2)] leading-[1.55]">
          {s.tagline}
        </p>

        {/* Points */}
        <ul className="m-0 p-0 list-none flex flex-col gap-[7px] flex-1">
          {s.points.map((pt, i) => (
            <li key={i} className="flex items-start gap-2 text-[13px] text-[var(--muted-2)] leading-[1.5]">
              <svg
                width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="var(--brand)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                className="mt-[2px] shrink-0"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {pt}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-5">
          <ButtonLink href={s.href} variant="outline">
            Learn more <Icon.ArrowRight width="13" height="13" />
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}

export function HubServices() {
  useReveal();

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header mode="services" />
      <main>

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-[70px] pb-[72px] max-sm:pt-12 max-sm:pb-12">
          <FluidBackground />

          {/* Breadcrumb */}
          <section className="pt-[30px] pb-[40px]">
            <div className="w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4">
              <Breadcrumb items={[
                { label: "Home", href: "/" },
                { label: "Services" },
              ]} />
            </div>
          </section>
          <div className="w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4 relative z-[2]">
            <div className="grid grid-cols-1 gap-8 items-end min-[1000px]:grid-cols-[1.05fr_1fr] min-[1000px]:gap-10">

              {/* Left: copy */}
              <div>
                <EyebrowPill label="WhiteBooks Services" />
                <h1
                  className="[font-family:var(--font-display)] font-medium leading-[1.05] tracking-[-0.025em] mt-[18px] max-w-[880px] text-[var(--text)]"
                  style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}
                >
                  Expert services for{' '}
                  <span className="text-[var(--brand)]">every compliance obligation.</span>
                </h1>
                <p className="mt-[22px] max-w-[620px] text-[17px] max-sm:text-[15px] text-[var(--muted-2)] leading-[1.55]">
                  From business registration to ongoing compliance, audit, and outsourced
                  accounting — handled by specialists who live inside the same platform
                  your finance team uses every day.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href="tel:+919032111788" size="lg" arrow>Talk to our team</ButtonLink>
                  <ButtonLink href="mailto:sales@whitebooks.in" variant="ghost" size="lg">Email us</ButtonLink>
                </div>
              </div>

              {/* Right: stats card */}
              <div className="mt-[10px]">
                <div className="bg-[var(--bg-2)] border border-[var(--brand-border)] rounded-[14px] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] overflow-hidden p-6 sm:p-7 flex flex-col gap-4">
                  <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--muted)] m-0">
                    Why choose WhiteBooks Services
                  </p>
                  {[
                    { stat: "25,000+", label: "Active clients on the platform" },
                    { stat: "9 Cr+", label: "e-Invoices generated" },
                    { stat: "8,000+", label: "CA firms and finance teams" },
                    { stat: "99.99%", label: "Uptime SLA" },
                  ].map(({ stat, label }) => (
                    <div
                      key={stat}
                      className="flex items-center gap-[14px] px-[14px] py-[10px] rounded-[10px] bg-[var(--bg-3)] border border-[var(--line-2)]"
                    >
                      <span className="text-[22px] font-bold text-[var(--brand)] [font-family:var(--font-display)] leading-none shrink-0">
                        {stat}
                      </span>
                      <span className="text-[13px] text-[var(--muted-2)] leading-[1.4]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Four services grid ────────────────────────────────────────── */}
        <section className="relative py-[120px] max-[700px]:py-[72px]" data-reveal>
          <div className="w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4">
            <p className="block text-xs font-medium tracking-[0.18em] uppercase text-[var(--muted)] mb-4">
              Our services
            </p>
            <h2
              className="[font-family:var(--font-display)] font-medium leading-[1.1] tracking-[-0.02em] m-0 max-w-[780px] text-[var(--text)]"
              style={{ fontSize: 'clamp(28px, 3.8vw, 44px)' }}
            >
              Four practice areas.{' '}
              <span className="text-[var(--brand)]">Every statutory obligation covered.</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[18px] mt-12">
              {SERVICES.map((s, i) => <ServiceCard key={i} s={s} />)}
            </div>
          </div>
        </section>

        {/* ── Why WhiteBooks Services ───────────────────────────────────── */}
        <section className="relative py-[120px] max-[700px]:py-[72px]" data-reveal>
          <div className="w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4">
            <p className="block text-xs font-medium tracking-[0.18em] uppercase text-[var(--muted)] mb-4">
              Why WhiteBooks Services
            </p>
            <h2
              className="[font-family:var(--font-display)] font-medium leading-[1.1] tracking-[-0.02em] m-0 max-w-[780px] text-[var(--text)]"
              style={{ fontSize: 'clamp(28px, 3.8vw, 44px)' }}
            >
              Specialists who work{' '}
              <span className="text-[var(--brand)]">inside the same platform as your team.</span>
            </h2>
            <div className="grid grid-cols-1 min-[900px]:grid-cols-3 gap-[22px] mt-12 max-[900px]:mt-8 max-[900px]:gap-[14px]">
              {[
                {
                  title: "Platform-native, not a separate engagement",
                  body: "Your WhiteBooks services team works directly inside your WhiteBooks account. Filings, documents, and compliance status are visible to you in real time — not buried in email threads.",
                },
                {
                  title: "GSP-licensed infrastructure underneath",
                  body: "Every compliance service runs on WhiteBooks' directly-licensed GSP infrastructure. Faster turnaround, fewer errors, and an independent channel to GSTN — not routed through a third party.",
                },
                {
                  title: "Fixed-team ownership, not ticket queues",
                  body: "You get a dedicated compliance manager, not a rotating support queue. They know your entity structure, your GSTIN portfolio, and your deadlines before you ask.",
                },
              ].map((item, i) => (
                <article
                  key={i}
                  className="p-7 max-[700px]:p-5 bg-[var(--bg-2)] border border-[var(--line)] rounded-[14px] transition-[border-color,background] duration-[180ms] hover:border-[var(--brand-border)] hover:bg-[var(--bg-elev)]"
                >
                  <h3 className="[font-family:var(--font-display)] font-medium text-[18px] max-[700px]:text-[16px] tracking-[-0.005em] m-0 mb-[10px] text-[var(--text)]">
                    {item.title}
                  </h3>
                  <p className="m-0 text-sm text-[var(--muted-2)] leading-[1.6]">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Who we serve ─────────────────────────────────────────────── */}
        <section className="bg-[var(--bg-3)] relative py-[120px] max-[700px]:py-[72px]" data-reveal>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <div className="w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4 relative z-[1]">
            <p className="block text-xs font-medium tracking-[0.18em] uppercase text-[var(--muted)] mb-4">
              Who we serve
            </p>
            <h2
              className="[font-family:var(--font-display)] font-medium leading-[1.1] tracking-[-0.02em] m-0 max-w-[780px] text-[var(--text)]"
              style={{ fontSize: 'clamp(28px, 3.8vw, 44px)' }}
            >
              Built for businesses that{' '}
              <span className="text-[var(--brand)]">can't afford compliance gaps.</span>
            </h2>
            <div className="grid grid-cols-1 min-[900px]:grid-cols-3 gap-[22px] mt-12 max-[900px]:mt-8 max-[900px]:gap-[14px]">
              {[
                {
                  title: "Startups & SMBs",
                  body: "From incorporation to ongoing compliance — get everything set up right the first time. Registrations, GST, PF/ESI, and ROC handled by experts from day one.",
                },
                {
                  title: "Mid-market companies",
                  body: "Multi-GSTIN filings, transfer pricing reports, statutory audits, and year-end closings. Managed by a dedicated team that integrates with your finance function.",
                },
                {
                  title: "CA firms & finance teams",
                  body: "White-label compliance services for your clients, powered by WhiteBooks' platform. Scale your practice without scaling headcount.",
                },
              ].map((item, i) => (
                <article
                  key={i}
                  className="p-7 max-[700px]:p-5 bg-[var(--bg-2)] border border-[var(--line)] rounded-[14px] transition-[border-color,background] duration-[180ms] hover:border-[var(--brand-border)] hover:bg-[var(--bg-elev)]"
                >
                  <h3 className="[font-family:var(--font-display)] font-medium text-[18px] max-[700px]:text-[16px] tracking-[-0.005em] m-0 mb-[10px] text-[var(--text)]">
                    {item.title}
                  </h3>
                  <p className="m-0 text-sm text-[var(--muted-2)] leading-[1.6]">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Get started CTA ──────────────────────────────────────────── */}
        <section className="relative py-[120px] max-[700px]:py-[72px]" data-reveal>
          <div className="w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4">
            <p className="block text-xs font-medium tracking-[0.18em] uppercase text-[var(--muted)] mb-4">
              Get started
            </p>
            <h2
              className="[font-family:var(--font-display)] font-medium leading-[1.1] tracking-[-0.02em] m-0 max-w-[780px] text-[var(--text)]"
              style={{ fontSize: 'clamp(28px, 3.8vw, 44px)' }}
            >
              Talk to a compliance specialist today.
            </h2>
            <p className="mt-4 text-[16.5px] text-[var(--muted-2)] max-w-[640px] leading-[1.55]">
              Tell us about your business. We'll recommend the right combination of
              services and set up onboarding within 2 business days.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <ButtonLink href="tel:+919032111788" size="lg" arrow>Call +91 90321 11788</ButtonLink>
              <ButtonLink href="mailto:sales@whitebooks.in" variant="ghost" size="lg">sales@whitebooks.in</ButtonLink>
            </div>
          </div>
        </section>

        {/* ── Closing ──────────────────────────────────────────────────── */}
        <section className="relative py-[90px] max-sm:py-16 border-t border-[var(--line)] overflow-hidden" data-reveal>
          {/* radial glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px]"
            style={{ background: 'radial-gradient(ellipse at center, rgba(220,47,101,0.12), transparent 60%)' }}
          />
          <div className="w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4 relative z-[1] text-center">
            <h2
              className="[font-family:var(--font-display)] font-medium leading-[1.1] tracking-[-0.02em] m-0 mx-auto max-w-[720px] text-[var(--text)]"
              style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
            >
              Registration to reconciliation.{' '}
              <span className="text-[var(--brand)]">One team, one platform.</span>
            </h2>
            <p className="mx-auto mt-[18px] mb-7 max-w-[580px] text-[var(--muted-2)] text-[16px] leading-[1.55]">
              WhiteBooks Services pairs expert compliance professionals with the same
              GSP-licensed platform your finance team already runs on. No handoffs, no
              gaps, no surprises at filing time.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <ButtonLink href="tel:+919032111788" size="lg" arrow>Talk to our team</ButtonLink>
              <ButtonLink href="mailto:sales@whitebooks.in" variant="ghost" size="lg">Email sales</ButtonLink>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
