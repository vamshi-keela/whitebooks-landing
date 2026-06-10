import { ButtonLink } from '@/components/ui/Button';
import { Header, Footer, FluidBackground, Breadcrumb } from '@/layouts/SiteShell';
import { PlainSection, SubClose, FaqList } from '@/layouts/SubpageShell';
import { useReveal } from '@/hooks/useReveal';
import EyebrowPill from '@/components/ui/EyebrowPill';
import { ProofSection } from '@/sections/WbProof';

const wrap = "max-w-[1240px] mx-auto px-8 max-sm:px-5";

const PRICING_FACTORS = [
  {
    title: 'Number of GSTINs',
    body: 'Pricing scales with how many GST registrations you manage from a single workspace — from a single entity to multi-state, multi-GSTIN groups.',
  },
  {
    title: 'Monthly e-Invoice / e-Way Bill volume',
    body: 'Your IRN and e-way bill volumes determine the throughput tier — with volume discounts for multi-entity and enterprise customers.',
  },
  {
    title: 'API access vs. dashboard-only',
    body: 'Choose the cloud dashboard for your finance team, or add direct API access for developers — or both, on one workspace.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'How is WhiteBooks priced?',
    a: 'WhiteBooks pricing is quote-based and scales with three variables: number of GSTINs, monthly e-Invoice / e-Way Bill volume, and whether you need API access or only the dashboard.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes — a free sandbox account is available after you schedule a demo with our team.',
  },
  {
    q: 'Are there hidden charges?',
    a: 'No. The quote covers the software plus GSP API calls within the agreed volume tier — no hidden fees.',
  },
  {
    q: 'Are annual or multi-year contracts available?',
    a: 'Annual contracts include a 10–15% discount, and 3-year contracts qualify for further enterprise pricing.',
  },
  {
    q: 'What payment methods are supported?',
    a: 'Bank transfer, UPI, and credit card for monthly plans; bank transfer for annual and enterprise plans. All invoices are GST-compliant.',
  },
];

export function Pricing() {
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
              <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Pricing' }]} />
            </div>
          </section>
          <div className={wrap}>
            <div className="max-w-[760px]">
              <EyebrowPill label="Company | Pricing" />
              <h1
                className="[font-family:var(--font-display)] font-medium leading-[1.05] tracking-[-0.025em] mt-[18px] [text-wrap:balance] text-[var(--text)]"
                style={{ fontSize: 'clamp(42px, 5.8vw, 72px)' }}
              >
                WhiteBooks <span className="text-[var(--brand)]">Pricing Plans.</span>
              </h1>
              <p className="mt-[22px] max-w-[620px] text-[17px] text-[var(--muted-2)] leading-[1.55]">
                Pricing ranges from <strong className="text-[var(--text)]">₹5,999 to ₹24,999</strong>,
                based on your GSTINs, filing volume, and feature needs. For an exact quote, talk to
                our sales team.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/about/contact-us" size="lg" arrow>
                  Schedule Demo
                </ButtonLink>
                <ButtonLink href="mailto:sales@whitebooks.in" variant="ghost" size="lg">
                  sales@whitebooks.in
                </ButtonLink>
                <ButtonLink href="tel:+919032111788" variant="ghost" size="lg">
                  +91 90321 11788
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing factors */}
        <PlainSection
          label=""
          heading={<>Pricing built around <span className="text-[var(--brand)]">your business.</span></>}
          sub="WhiteBooks doesn't lock you into rigid tiers. Your quote is built from three factors:"
        >
          <div className="grid grid-cols-3 max-[900px]:grid-cols-1 gap-[22px] max-[900px]:gap-[14px] mt-5 max-[900px]:mt-8">
            {PRICING_FACTORS.map((f, i) => (
              <article
                key={i}
                data-reveal
                className="p-7 max-[700px]:p-5 bg-[var(--bg-2)] border border-[var(--line)] rounded-[14px] transition-[border-color,background] duration-[180ms] hover:border-[var(--brand-border)] hover:bg-[var(--bg-elev)]"
              >
                <div className="w-8 h-8 rounded-full bg-[var(--brand-soft)] border border-[var(--brand-border)] flex items-center justify-center mb-4 [font-family:var(--font-display)] font-medium text-[var(--brand)] text-sm">
                  {i + 1}
                </div>
                <h3 className="[font-family:var(--font-display)] font-medium text-[18px] max-[700px]:text-[16px] tracking-[-0.005em] m-0 mb-[10px] text-[var(--text)]">
                  {f.title}
                </h3>
                <p className="m-0 text-sm text-[var(--muted-2)] leading-[1.6]">{f.body}</p>
              </article>
            ))}
          </div>
        </PlainSection>

        {/* FAQ */}
        <PlainSection
          label=""
          heading={<>Frequently asked <span className="text-[var(--brand)]">questions.</span></>}
        >
          <div className="mt-10">
            <FaqList items={FAQ_ITEMS} />
          </div>
        </PlainSection>

        <ProofSection />

        {/* Closing */}
        <SubClose
          h2="Get a quote tailored to your business."
          body="Schedule a 20-minute demo and walk away with a clear quote based on your GSTINs, volume, and access needs. Email sales@whitebooks.in or call +91 90321 11788."
          primaryCta={{ label: 'Schedule Demo', href: '/about/contact-us' }}
          secondaryCta={{ label: 'Talk to Sales: +91 90321 11788', href: 'tel:+919032111788' }}
        />

      </main>
      <Footer />
    </div>
  );
}
