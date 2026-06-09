import { useState, FormEvent, useRef } from 'react';
import { Header, Footer, Breadcrumb } from '@/layouts/SiteShell';
import { useReveal } from '@/hooks/useReveal';
import EyebrowPill from '@/components/ui/EyebrowPill';
import { FaqList, SubClose } from '@/layouts/SubpageShell';
import { ProofSection } from '@/sections/WbProof';
import {
  Search, CheckCircle, XCircle, Loader2, Building2,
  MapPin, Calendar, Tag, Users, AlertCircle, BadgeCheck,
  FileText, ShieldCheck, TrendingUp, Scale, Banknote,
} from 'lucide-react';

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface GstinResult {
  gstin: string;
  legalName: string;
  tradeName?: string;
  status: string;
  taxpayerType: string;
  constitutionOfBusiness: string;
  stateJurisdiction: string;
  centerJurisdiction: string;
  registrationDate: string;
  cancellationDate?: string;
  lastUpdatedDate: string;
  principalAddress: string;
  businessActivities: string[];
}

/* ─── Constants ──────────────────────────────────────────────────────────── */

const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

const WHY_VERIFY = [
  {
    icon: <BadgeCheck size={20} />,
    title: 'Ensuring Authenticity',
    body: 'Verify that your supplier or buyer is genuinely registered under GST before entering any business transaction.',
  },
  {
    icon: <Banknote size={20} />,
    title: 'Input Tax Credit Eligibility',
    body: 'Only registered and active GSTINs are eligible to pass on ITC. Verify before claiming credit to avoid rejection.',
  },
  {
    icon: <ShieldCheck size={20} />,
    title: 'Preventing Fraud',
    body: 'Fake or cancelled GSTINs are used in fraudulent invoices. Instant verification protects your business from such risks.',
  },
  {
    icon: <Scale size={20} />,
    title: 'Legal Compliance',
    body: 'Mentioning a valid and active GSTIN on every tax invoice is mandatory under the GST Act for all registered businesses.',
  },
  {
    icon: <TrendingUp size={20} />,
    title: 'Avoiding Penalties',
    body: 'Dealing with unregistered suppliers or fake GST numbers can attract heavy penalties and ITC reversal notices.',
  },
];

const FAQS = [
  {
    q: 'What is the GSTIN Verification Tool?',
    a: 'The GSTIN Verification Tool is a free online utility that lets you instantly verify and search any GST Identification Number against the official GSTN database. Enter a valid 15-digit GSTIN to retrieve the registered taxpayer\'s legal name, business type, registration status, address, and more — in real time.',
  },
  {
    q: 'What is GSTIN and why is it important?',
    a: 'GSTIN (Goods and Services Tax Identification Number) is a unique 15-digit alphanumeric code assigned to every GST-registered taxpayer in India. It is crucial for filing GST returns, claiming Input Tax Credit (ITC), generating e-Invoices, and ensuring compliance with the GST Act.',
  },
  {
    q: 'Why is verifying a GST Number important?',
    a: 'Verifying a GSTIN protects your business from fraud, ensures you can legitimately claim Input Tax Credit, and keeps you legally compliant. Dealing with unregistered or cancelled GSTINs can lead to ITC rejection, penalties, and legal notices from the GST department.',
  },
  {
    q: 'How do I use the GSTIN verification tool?',
    a: 'Simply type the 15-digit GSTIN in the search box and click "Search". The tool instantly fetches verified data from the GSTN database — including the taxpayer\'s legal name, status, registration date, jurisdiction, and principal place of business.',
  },
  {
    q: 'When is a GSTIN allocated?',
    a: 'A GSTIN is allocated when a business successfully completes its GST registration on the GSTN portal. Businesses with annual turnover exceeding ₹40 lakhs (₹20 lakhs in special category states) are mandatorily required to register and receive a GSTIN.',
  },
  {
    q: 'What are the different methods to verify a GSTIN?',
    a: 'You can verify a GSTIN through: (1) the official GSTN portal at gst.gov.in, (2) WhiteBooks\' free GSTIN verification tool on this page, (3) the GST mobile application, or (4) through a GSP-licensed compliance software like WhiteBooks.',
  },
  {
    q: 'Can a taxpayer have multiple GSTINs?',
    a: 'Yes. A taxpayer operating in multiple states gets a separate GSTIN for each state. Additionally, a taxpayer can hold multiple GSTINs within the same state for different business verticals, provided each vertical is treated as a separate business.',
  },
];

/* ─── GSTIN Format Diagram ───────────────────────────────────────────────── */

function GstinFormatDiagram() {
  const segments = [
    { chars: '22', label: 'State Code', color: '#dc2f65', bg: 'rgba(220,47,101,0.12)', border: 'rgba(220,47,101,0.3)' },
    { chars: 'AAAAA', label: 'PAN – Letters', color: '#22d3ee', bg: 'rgba(34,211,238,0.1)', border: 'rgba(34,211,238,0.3)' },
    { chars: '1111', label: 'PAN – Digits', color: '#22d3ee', bg: 'rgba(34,211,238,0.1)', border: 'rgba(34,211,238,0.3)' },
    { chars: 'A', label: 'PAN – Check', color: '#22d3ee', bg: 'rgba(34,211,238,0.1)', border: 'rgba(34,211,238,0.3)' },
    { chars: '1', label: 'Entity No.', color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.3)' },
    { chars: 'Z', label: 'Default "Z"', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
    { chars: 'A', label: 'Check Digit', color: '#22c55e', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.3)' },
  ];

  return (
    <div className="rounded-2xl border border-[var(--line-2)] bg-[var(--bg-2)] p-6 lg:p-8">
      <p className="text-[12px] font-medium tracking-[0.18em] uppercase text-[var(--muted)] mb-6">GSTIN Format</p>
      <div className="flex flex-wrap gap-1.5 mb-8">
        {segments.map((seg, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <div className="flex gap-0.5">
              {seg.chars.split('').map((ch, j) => (
                <div
                  key={j}
                  className="w-8 h-10 flex items-center justify-center rounded-[6px] text-sm font-bold font-mono"
                  style={{ background: seg.bg, border: `1px solid ${seg.border}`, color: seg.color }}
                >
                  {ch}
                </div>
              ))}
            </div>
            <span className="text-[10px] text-[var(--muted)] text-center leading-tight max-w-[60px]">{seg.label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Digits 1–2', desc: 'State Code — identifies the state of registration (e.g. 27 = Maharashtra, 29 = Karnataka)', color: '#dc2f65' },
          { label: 'Digits 3–12', desc: 'PAN of the taxpayer — the core identity linked to income tax records', color: '#22d3ee' },
          { label: 'Digit 13', desc: 'Entity number — represents the number of registrations under the same PAN in the state', color: '#a78bfa' },
          { label: 'Digits 14–15', desc: '"Z" by default for all, followed by an alphanumeric check digit computed by GSTN', color: '#22c55e' },
        ].map((item, i) => (
          <div key={i} className="rounded-xl p-3 bg-[var(--bg-elev)] border border-[var(--line)]">
            <p className="text-[11px] font-semibold mb-1" style={{ color: item.color }}>{item.label}</p>
            <p className="text-[12px] text-[var(--muted-2)] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Result Card ────────────────────────────────────────────────────────── */

function ResultCard({ data }: { data: GstinResult }) {
  const isActive = data.status.toLowerCase() === 'active';

  const fields = [
    { icon: <Building2 size={14} />, label: 'Legal Name', value: data.legalName },
    ...(data.tradeName ? [{ icon: <Tag size={14} />, label: 'Trade Name', value: data.tradeName }] : []),
    { icon: <FileText size={14} />, label: 'GSTIN / UIN', value: data.gstin },
    {
      icon: isActive ? <CheckCircle size={14} /> : <XCircle size={14} />,
      label: 'Status',
      value: data.status,
      highlight: isActive ? 'success' : 'danger',
    },
    { icon: <Users size={14} />, label: 'Taxpayer Type', value: data.taxpayerType },
    { icon: <Tag size={14} />, label: 'Constitution of Business', value: data.constitutionOfBusiness },
    { icon: <MapPin size={14} />, label: 'State Jurisdiction', value: data.stateJurisdiction },
    { icon: <MapPin size={14} />, label: 'Center Jurisdiction', value: data.centerJurisdiction },
    { icon: <Calendar size={14} />, label: 'Date of Registration', value: data.registrationDate },
    ...(data.cancellationDate ? [{ icon: <Calendar size={14} />, label: 'Date of Cancellation', value: data.cancellationDate }] : []),
    { icon: <Calendar size={14} />, label: 'Last Updated', value: data.lastUpdatedDate },
    { icon: <MapPin size={14} />, label: 'Principal Place of Business', value: data.principalAddress },
  ];

  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{ background: 'var(--bg-2)', borderColor: 'var(--line-2)' }}
    >
      {/* Header strip */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--line-2)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--brand-soft)', border: '1px solid var(--brand-border)' }}>
            <Building2 size={18} style={{ color: 'var(--brand)' }} />
          </div>
          <div>
            <p className="font-semibold text-[var(--text)] text-[15px]">{data.legalName}</p>
            <p className="text-[12px] text-[var(--muted)]">{data.gstin}</p>
          </div>
        </div>
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold"
          style={isActive
            ? { background: 'rgba(34,197,94,0.12)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.25)' }
            : { background: 'rgba(239,68,68,0.12)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.25)' }
          }
        >
          {isActive ? <CheckCircle size={12} /> : <XCircle size={12} />}
          {data.status}
        </span>
      </div>

      {/* Fields grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 divide-y divide-x-0 sm:divide-y-0 sm:divide-x divide-[var(--line)]">
        {fields.filter(f => f.label !== 'GSTIN / UIN' && f.label !== 'Legal Name' && f.label !== 'Status').map((field, i) => (
          <div key={i} className="px-5 py-4 border-b border-[var(--line)] last:border-b-0">
            <div className="flex items-center gap-1.5 mb-1 text-[var(--muted)]">
              {field.icon}
              <span className="text-[11px] font-medium uppercase tracking-wider">{field.label}</span>
            </div>
            <p className="text-[13px] font-medium text-[var(--text)]">{field.value}</p>
          </div>
        ))}
      </div>

      {/* Business activities */}
      {data.businessActivities.length > 0 && (
        <div className="px-5 py-4 border-t border-[var(--line-2)]">
          <p className="text-[11px] font-medium uppercase tracking-wider text-[var(--muted)] mb-2">Nature of Business Activities</p>
          <div className="flex flex-wrap gap-2">
            {data.businessActivities.map((act, i) => (
              <span
                key={i}
                className="text-[12px] px-2.5 py-1 rounded-lg"
                style={{ background: 'var(--bg-elev)', border: '1px solid var(--line-2)', color: 'var(--muted-2)' }}
              >
                {act}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────────── */

export function GstNumberSearch() {
  useReveal();
  const [gstin, setGstin] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GstinResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  async function handleSearch(e: FormEvent) {
    e.preventDefault();
    const value = gstin.trim().toUpperCase();

    if (!value) {
      setError('Please enter a GSTIN to search.');
      return;
    }
    if (!GSTIN_REGEX.test(value)) {
      setError('Invalid GSTIN format. A valid GSTIN is 15 characters: e.g. 27AAPFU0939F1ZV');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/tools/gst-search?gstin=${value}`);
      if (res.status === 404) {
        setError('No taxpayer found for this GSTIN. Please check the number and try again.');
        return;
      }
      if (!res.ok) {
        throw new Error('Service temporarily unavailable. Please try again shortly.');
      }
      const data: GstinResult = await res.json();
      setResult(data);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header mode="resources" />
      <main>

        {/* Breadcrumb */}
        <section className="pt-[100px] pb-0">
          <div className="w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4">
            <Breadcrumb items={[
              { label: 'Home', href: '/' },
              { label: 'Tools', href: '/tools/gst-number-search' },
              { label: 'GST Number Search & Verification' },
            ]} />
          </div>
        </section>

        {/* Hero — search tool */}
        <section className="pt-[70px] pb-10 relative overflow-hidden">
          <div className="w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4">
            <div className="max-w-[760px] mx-auto text-center">
              <EyebrowPill label="Free Tool" subtitle="GSTIN Verification" />
              <h1 className="font-display font-medium tracking-[-0.025em] leading-[1.04] text-[clamp(32px,5vw,60px)] mt-5 mb-4">
                GST Number Search &amp; <span className="text-[var(--brand)]">GSTIN Verification</span>
              </h1>
              <p className="text-[var(--muted-2)] text-[16px] leading-relaxed mb-8 max-w-[560px] mx-auto">
                Instantly verify any GSTIN against the official GSTN database. Get taxpayer details, registration status, jurisdiction, and more — free.
              </p>

              {/* Search form */}
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-[580px] mx-auto">
                <div className="relative flex-1">
                  <Search
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: 'var(--muted)' }}
                  />
                  <input
                    type="text"
                    value={gstin}
                    onChange={e => { setGstin(e.target.value.toUpperCase()); setError(null); }}
                    placeholder="Enter GSTIN / UIN of the Taxpayer"
                    maxLength={15}
                    spellCheck={false}
                    autoComplete="off"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl text-base font-mono uppercase outline-none transition-all"
                    style={{
                      background: 'var(--bg-elev)',
                      border: error ? '1.5px solid var(--danger)' : '1.5px solid var(--line-2)',
                      color: 'var(--text)',
                    }}
                    onFocus={e => { if (!error) e.currentTarget.style.borderColor = 'var(--brand)'; }}
                    onBlur={e => { if (!error) e.currentTarget.style.borderColor = 'var(--line-2)'; }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-[14px] transition-all border-0 outline-none"
                  style={{
                    background: loading ? 'rgba(220,47,101,0.5)' : 'var(--brand)',
                    color: '#fff',
                    cursor: loading ? 'not-allowed' : 'pointer',
                  }}
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                  {loading ? 'Searching…' : 'Search'}
                </button>
              </form>

              {/* Error message */}
              {error && (
                <div className="mt-4 flex items-start gap-2.5 max-w-[580px] mx-auto px-4 py-3 rounded-xl text-left"
                  style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}>
                  <AlertCircle size={15} className="shrink-0 mt-0.5" style={{ color: 'var(--danger)' }} />
                  <p className="text-[14px]" style={{ color: 'var(--danger)' }}>{error}</p>
                </div>
              )}

              <p className="mt-4 text-[14px] text-[var(--muted)]">
                Example: <span className="font-mono text-[var(--muted-2)]">27AAPFU0939F1ZV</span>
              </p>
            </div>
          </div>
        </section>

        {/* Search results */}
        {result && (
          <section className="relative pt-0 pb-[120px] max-[700px]:pb-[72px]" ref={resultRef}>
            <div className="w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle size={18} style={{ color: 'var(--success)' }} />
                <p className="font-semibold text-[var(--text)]">GSTIN verified successfully</p>
              </div>
              <ResultCard data={result} />
            </div>
          </section>
        )}

        {/* What is GSTIN */}
        <section
          className="relative py-[120px] max-[700px]:py-[72px] transition-[opacity,transform] duration-[600ms] ease-in-out"
          data-reveal
        >
          <div className="w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4">
            <div className="grid grid-cols-1 gap-12 lg:gap-16 items-start">
              <div>
                <h2 className="font-display font-medium text-[clamp(28px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] m-0 max-w-[780px] text-balance mt-3 mb-5">
                  What is <span className="text-[var(--brand)]">GSTIN?</span>
                </h2>
                <p className="text-[var(--muted-2)] leading-relaxed mb-4">
                  GSTIN stands for <strong className="text-[var(--text)]">Goods and Services Tax Identification Number</strong>. It is a unique 15-digit alphanumeric code assigned by the Government of India to every business registered under the GST regime.
                </p>
                <p className="text-[var(--muted-2)] leading-relaxed mb-4">
                  The first two digits represent the state code. The next 10 digits are the taxpayer's PAN number. The 13th digit is the entity number for the same PAN in the same state. The 14th digit is "Z" by default, and the 15th is a check digit.
                </p>
                <p className="text-[var(--muted-2)] leading-relaxed">
                  Every registered taxpayer must display their GSTIN on all tax invoices, debit/credit notes, and other official documents. It is the primary identifier used for all GST compliance activities including return filing, e-Invoicing, and ITC claims.
                </p>
              </div>
              <GstinFormatDiagram />
            </div>
          </div>
        </section>

        {/* Why verify */}
        <section
          className="relative py-[120px] max-[700px]:py-[72px] transition-[opacity,transform] duration-[600ms] ease-in-out"
          data-reveal
        >
          <div className="w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4">
            <h2 className="font-display font-medium text-[clamp(28px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] m-0 max-w-[780px] text-balance mt-3 mb-10">
              Five reasons to verify a <span className="text-[var(--brand)]">GST Number.</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {WHY_VERIFY.map((item, i) => (
                <article
                  key={i}
                  className="px-7 pt-7 pb-[26px] max-sm:px-[18px] max-sm:py-5 bg-[var(--bg-2)] border border-[var(--line)] rounded-[14px] transition-[border-color,background] duration-150 ease-out hover:border-[var(--brand-border)] hover:bg-[var(--bg-elev)]"
                  data-reveal
                >
                  <div
                    className="w-10 h-10 rounded-[10px] flex items-center justify-center mb-4"
                    style={{ background: 'var(--brand-soft)', border: '1px solid var(--brand-border)', color: 'var(--brand)' }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="font-display font-medium text-[18px] max-sm:text-[16px] tracking-[-0.005em] m-0 mb-[10px]">{item.title}</h3>
                  <p className="m-0 text-[14px] text-[var(--muted-2)] leading-[1.6]">{item.body}</p>
                </article>
              ))}

              {/* Extra CTA card */}
              <article
                className="px-7 pt-7 pb-[26px] max-sm:px-[18px] max-sm:py-5 bg-[var(--bg-2)] border border-[var(--line)] rounded-[14px] transition-[border-color,background] duration-150 ease-out hover:border-[var(--brand-border)] hover:bg-[var(--bg-elev)] flex flex-col justify-between"
                style={{ background: 'var(--brand-softer)', borderColor: 'var(--brand-border)' }}
                data-reveal
              >
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--brand)' }}>
                    WhiteBooks GSP
                  </p>
                  <h3 className="font-display font-medium text-[18px] max-sm:text-[16px] tracking-[-0.005em] m-0 mb-[10px]">Need bulk GSTIN verification?</h3>
                  <p className="m-0 text-[14px] text-[var(--muted-2)] leading-[1.6]">Verify thousands of GSTINs at once with WhiteBooks' GST API — built for developers and finance teams.</p>
                </div>
                <a
                  href="/apis/gst"
                  className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold transition-opacity hover:opacity-70"
                  style={{ color: 'var(--brand)' }}
                >
                  Explore GST APIs →
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          className="relative py-[120px] max-[700px]:py-[72px] transition-[opacity,transform] duration-[600ms] ease-in-out"
          data-reveal
        >
          <div className="w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4">
            <h2 className="font-display font-medium text-[clamp(28px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] m-0 max-w-[780px] text-balance mt-3 mb-8">
              Frequently asked questions.<span className="text-[var(--brand)]">questions.</span>
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
