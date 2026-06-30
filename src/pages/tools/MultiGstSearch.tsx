import { Header, Footer, Breadcrumb } from '@/layouts/SiteShell';
import { useReveal } from '@/hooks/useReveal';
import EyebrowPill from '@/components/ui/EyebrowPill';
import { FaqList, SubClose } from '@/layouts/SubpageShell';
import { ProofSection } from '@/sections/WbProof';
import { CheckCircle } from 'lucide-react';
import addImportImg from '@/assets/resources/add-import-multiple-gst-numbers.png';
import validateImg from '@/assets/resources/Validate-Multiple-GST-Numbers-in-One-Click.webp';
import viewDownloadImg from '@/assets/resources/view-download-complete-details.png';

/* ─── Constants ──────────────────────────────────────────────────────────── */

const GSTIN_DETAILS = [
  'Legal Name of Business',
  'State Jurisdiction',
  'Center Jurisdiction',
  'Date of Registration',
  'Constitution of Business',
  'Taxpayer Type',
  'GSTIN / UIN Status',
  'Date of Cancellation',
  'Last Updated Date',
  'Nature of Business Activities',
  'Nature of Principal Place of Business',
  'Nature of Additional Place of Business',
  'State Jurisdiction Code',
  'Center Jurisdiction Code',
  'Registration Trade Name',
  'Principal Place of Business Address',
  'Additional Place of Business Address',
];

const FAQS = [
  {
    q: 'What is the Multi GST Number Search Tool?',
    a: 'The Multi GST Number Search Tool lets you verify multiple GSTIN numbers simultaneously against the official GSTN database. Instead of searching one GSTIN at a time, you can add or import hundreds of GSTINs and retrieve verified details — legal name, status, taxpayer type, jurisdiction, address, and more — all in a single click.',
  },
  {
    q: 'How do I add multiple GSTINs?',
    a: 'There are two ways: (1) Type or paste GSTINs directly into the input box — one per line or comma-separated. (2) Import from Excel or CSV — click the upload button and select your file. The tool will automatically extract and list all GSTINs from the file.',
  },
  {
    q: 'What file formats are supported for import?',
    a: 'The tool accepts CSV (.csv) and Excel (.xlsx, .xls) files. Each GSTIN should be in a separate row. You can also paste comma-separated or line-separated GSTINs directly into the input box for quick batch entry.',
  },
  {
    q: 'What details are returned for each GSTIN?',
    a: 'For every valid and active GSTIN, the tool returns: Legal Name, Trade Name, GSTIN/UIN Status, Taxpayer Type, Constitution of Business, State & Center Jurisdiction, Date of Registration, Date of Cancellation (if applicable), Last Updated Date, Principal Place of Business Address, and Nature of Business Activities.',
  },
  {
    q: 'Can I download the verified results?',
    a: 'Yes. After validation is complete, you can export all results — including the verified details for each GSTIN — into a spreadsheet-ready Excel or CSV file.',
  },
  {
    q: 'Is there a limit on how many GSTINs I can search at once?',
    a: 'The tool supports bulk verification and can handle large lists. For enterprise-scale verification of thousands of GSTINs, consider using the WhiteBooks GST API, which offers programmatic batch access and higher rate limits.',
  },
  {
    q: 'What if a GSTIN is invalid or not found?',
    a: 'The tool validates the 15-digit GSTIN format before searching. Invalid formats are flagged immediately. For valid formats that return no data from GSTN, the tool shows a "Not Found" status for that specific GSTIN while continuing to display results for the others.',
  },
];

/* ─── Main Page ──────────────────────────────────────────────────────────── */

export function MultiGstSearch() {
  useReveal();

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header mode="resources" />
      <main>

        {/* Breadcrumb */}
        <section className="pt-[100px] pb-0">
          <div className="max-w-[1240px] mx-auto px-8 max-sm:px-5">
            <Breadcrumb items={[
              { label: 'Home', href: '/' },
              { label: 'Tools', href: '/tools/gst-number-search' },
              { label: 'Multi GST Number Search' },
            ]} />
          </div>
        </section>

        {/* Hero */}
        <section className="wb-subhero">
          <div className="max-w-[1240px] mx-auto px-8 max-sm:px-5">
            <div className="max-w-[760px] mx-auto text-center">
              <EyebrowPill label="Free Tool" subtitle="Bulk GSTIN Verification" />
              <h1 className="wb-display text-[clamp(30px,5vw,58px)] mt-5 mb-5">
                One Click To Check And{' '}
                <span className="accent">Verify GST Numbers</span>
              </h1>
              <p className="text-[var(--muted-2)] text-[16px] leading-relaxed mb-8 max-w-[560px] mx-auto">
                Add or import multiple GSTINs, validate all at once, and download complete verified details — straight from the official GSTN database.
              </p>
              <a
                href="https://accounts.whitebooks.in/signupall"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-[15px] text-white bg-[var(--brand)] hover:opacity-90 transition-opacity"
              >
                Search Here
              </a>
            </div>
          </div>
        </section>

        {/* Step 1 — Add / Import */}
        <section className="wb-section border-t border-[var(--hairline)]" data-reveal>
          <div className="max-w-[1240px] mx-auto px-8 max-sm:px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* Text */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--brand)] mb-4">Step 01</p>
                <h2 className="wb-h2 mb-5">
                  Add / Import Multiple <span className="accent">GST Numbers</span>
                </h2>
                <p className="text-[var(--muted-2)] leading-relaxed mb-8">
                  There are two easy ways to get your GST numbers into the tool — choose whichever fits your workflow.
                </p>
                <div className="flex flex-col gap-5">
                  <div className="flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-[var(--brand-soft)] border border-[var(--brand-border)] text-[var(--brand)] text-[13px] font-bold">1</div>
                    <div>
                      <p className="font-semibold text-[var(--text)] mb-1">By adding directly in the box</p>
                      <p className="text-[14px] text-[var(--muted-2)] leading-relaxed">Type or paste multiple GST numbers directly into the input box — one per line or comma-separated.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-[var(--brand-soft)] border border-[var(--brand-border)] text-[var(--brand)] text-[13px] font-bold">2</div>
                    <div>
                      <p className="font-semibold text-[var(--text)] mb-1">By importing Excel</p>
                      <p className="text-[14px] text-[var(--muted-2)] leading-relaxed">Upload a CSV or Excel file containing your list of GSTINs for instant bulk processing.</p>
                    </div>
                  </div>
                </div>
                <a
                  href="https://accounts.whitebooks.in/signupall"
                  className="mt-8 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--brand)] hover:opacity-70 transition-opacity"
                >
                  Get started free →
                </a>
              </div>

              {/* Image */}
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                <img
                  src={addImportImg}
                  alt="Add or import multiple GST numbers into WhiteBooks"
                  className="w-full h-auto  aspect-[4/2] object-fill"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Step 2 — Validate */}
        <section className="wb-section border-t border-[var(--hairline)]" data-reveal>
          <div className="max-w-[1240px] mx-auto px-8 max-sm:px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* Image — left on desktop */}
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/20 order-2 lg:order-1">
                <img
                  src={validateImg}
                  alt="Validate multiple GST numbers in one click"
                  className="w-full h-auto"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Text — right on desktop */}
              <div className="order-1 lg:order-2">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--brand)] mb-4">Step 02</p>
                <h2 className="wb-h2 mb-5">
                  Validate Multiple GST Numbers{' '}
                  <span className="accent">in One Click</span>
                </h2>
                <p className="text-[var(--muted-2)] leading-relaxed mb-5">
                  By doing the verification it will check the added or imported GST numbers are valid or not. If the GST Numbers are valid it will give all the details of the GSTIN.
                </p>
                <p className="text-[var(--muted-2)] leading-relaxed">
                  The tool runs all GSTINs through the official GSTN database simultaneously — invalid formats are flagged instantly, while valid numbers return complete, verified taxpayer information in seconds.
                </p>
                <a
                  href="https://accounts.whitebooks.in/signupall"
                  className="mt-8 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--brand)] hover:opacity-70 transition-opacity"
                >
                  Try it free →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Step 3 — View / Download */}
        <section className="wb-section border-t border-[var(--hairline)]" data-reveal>
          <div className="max-w-[1240px] mx-auto px-8 max-sm:px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* Text */}
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--brand)] mb-4">Step 03</p>
                <h2 className="wb-h2 mb-5">
                  View / Download Complete Details{' '}
                  <span className="accent">of GST Numbers</span>
                </h2>
                <p className="text-[var(--muted-2)] leading-relaxed mb-6">
                  For every valid GSTIN, the tool retrieves comprehensive registration details directly from the GSTN database — and lets you export everything as Excel or CSV.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-8">
                  {GSTIN_DETAILS.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle size={13} className="text-[var(--brand)] shrink-0" />
                      <span className="text-[13px] text-[var(--muted-2)]">{detail}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="https://accounts.whitebooks.in/signupall"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[14px] text-white bg-[var(--brand)] hover:opacity-90 transition-opacity"
                >
                  Sign Up Now
                </a>
              </div>

              {/* Image */}
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                <img
                  src={viewDownloadImg}
                  alt="View and download complete GST number details"
                  className="w-full h-auto  aspect-[4/2] object-fill"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="wb-section border-t border-[var(--hairline)] wb-reveal" data-reveal>
          <div className="max-w-[1240px] mx-auto px-8 max-sm:px-5">
            <p className="wb-section-label">FAQs</p>
            <h2 className="wb-h2 mt-3 mb-8">
              Frequently asked <span className="accent">questions.</span>
            </h2>
            <div className="max-w-[800px]">
              <FaqList items={FAQS} />
            </div>
          </div>
        </section>

        <ProofSection />

        <SubClose
          h2="Verify, file, and automate — all in one place."
          body="WhiteBooks is a GSP-licensed compliance platform used by 25,000+ businesses. Automate GST filing, e-Invoicing, e-Way Bills, and ITC reconciliation from a single workspace."
          primaryCta={{ label: 'Start Free Trial', href: 'https://accounts.whitebooks.in/signupall' }}
          secondaryCta={{ label: 'Talk to Sales: +91 90321 11788', href: 'tel:+919032111788' }}
        />
      </main>
      <Footer />
    </div>
  );
}
