import { useState, FormEvent, useRef } from 'react';
import { Header, Footer, Breadcrumb } from '@/layouts/SiteShell';
import { useReveal } from '@/hooks/useReveal';
import EyebrowPill from '@/components/ui/EyebrowPill';
import { FaqList, SubClose } from '@/layouts/SubpageShell';
import { ProofSection } from '@/sections/WbProof';
import {
  Search, Loader2, AlertCircle, Globe,
  BarChart3, FileCheck, TrendingUp,
} from 'lucide-react';

/* ─── Types ───────────────────────────────────────────────────────────────── */

interface HsnSacResult {
  type: 'HSN' | 'SAC';
  code: string;
  description: string;
  gstRate?: string;
}

/* ─── Constants ───────────────────────────────────────────────────────────── */

const WHY_HSN = [
  {
    icon: <FileCheck size={20} />,
    title: 'GST Compliance',
    body: 'HSN codes are mandatory for registered taxpayers exceeding ₹1.5 crore turnover. Accurate codes ensure every invoice is compliant with the GST Act and auto-populated return data stays error-free.',
  },
  {
    icon: <BarChart3 size={20} />,
    title: 'Tax Standardisation',
    body: 'HSN codes remove subjectivity in tax calculation. Each code maps to a fixed GST rate slab, reducing calculation errors and eliminating disputes with tax authorities.',
  },
  {
    icon: <TrendingUp size={20} />,
    title: 'Data & Analytics',
    body: 'The government uses HSN data to track trade patterns and industry output. Accurate HSN coding keeps your business data aligned with government records and simplifies audits.',
  },
  {
    icon: <Globe size={20} />,
    title: 'International Trade',
    body: 'HSN is internationally recognized under WCO standards and used in 200+ countries. The same codes used for Indian GST apply to customs classification on all imports and exports.',
  },
];

const FAQS = [
  {
    q: 'What is an HSN Code?',
    a: 'HSN stands for Harmonized System of Nomenclature — a standardized international system of names and numbers used to classify goods in trade. In India\'s GST framework, HSN codes determine the applicable tax rate for every product. Codes are 6 to 8 digits long.',
  },
  {
    q: 'What is a SAC Code?',
    a: 'SAC stands for Service Accounting Code — a unique 6-digit numerical code used to classify services under India\'s GST system. The first two digits represent the major service category, the next two the sub-category, and the final two digits the specific service type.',
  },
  {
    q: 'Who needs to quote HSN codes on invoices?',
    a: 'Businesses with annual turnover under ₹1.5 crore are exempt. Those with ₹1.5 crore to ₹5 crore must mention 2-digit HSN codes. Businesses above ₹5 crore must use 4-digit codes. Import and export transactions always require 8-digit codes.',
  },
  {
    q: 'What are the GST rate slabs under HSN?',
    a: 'GST rates are fixed in five slabs based on the HSN or SAC code: 0% (exempted goods), 5%, 12%, 18%, and 28%. Some goods also attract an additional cess on top of the 28% slab.',
  },
  {
    q: 'How do I search for an HSN or SAC code?',
    a: 'Use the search tool on this page. Enter the HSN or SAC code directly to look up its description and GST rate, or type a keyword describing your product or service to find the matching classification.',
  },
  {
    q: 'How many HSN codes exist?',
    a: 'The HSN hierarchy contains 21 sections, 99 chapters, approximately 1,244 headings, and 5,224 subheadings. India extends this to an 8-digit level for domestic classification, adding sub-categories specific to Indian trade.',
  },
  {
    q: 'Are HSN codes the same for GST and customs?',
    a: 'The 6-digit HSN codes are internationally harmonized and apply to both GST and customs. For customs (import/export), India uses the 8-digit ITC-HS code extending the 6-digit base. For domestic GST, 4- or 8-digit codes apply based on the turnover threshold.',
  },
];

const GST_THRESHOLDS = [
  { turnover: 'Under ₹1.5 crore', required: 'Not required', color: '#22c55e' },
  { turnover: '₹1.5 crore – ₹5 crore', required: '2-digit HSN', color: '#f59e0b' },
  { turnover: 'Above ₹5 crore', required: '4-digit HSN', color: '#dc2f65' },
  { turnover: 'Import / Export', required: '8-digit mandatory', color: '#a78bfa' },
];

const GST_SLABS = [
  { rate: '0%', label: 'Exempt', desc: 'Essential goods — milk, fresh vegetables, education', color: '#22c55e' },
  { rate: '5%', label: 'Low Rate', desc: 'Packaged food, economy transport, healthcare', color: '#22d3ee' },
  { rate: '12%', label: 'Standard', desc: 'Processed food, computers, business services', color: '#a78bfa' },
  { rate: '18%', label: 'Standard+', desc: 'IT services, electronics, hotel accommodation', color: '#f59e0b' },
  { rate: '28%', label: 'Luxury', desc: 'Automobiles, tobacco, luxury goods + cess', color: '#dc2f65' },
];

/* ─── HSN Format Diagram ──────────────────────────────────────────────────── */

function HsnFormatDiagram() {
  const segments = [
    { chars: 'XX', label: 'Chapter', color: '#dc2f65', bg: 'rgba(220,47,101,0.12)', border: 'rgba(220,47,101,0.3)' },
    { chars: 'XX', label: 'Heading', color: '#22d3ee', bg: 'rgba(34,211,238,0.1)', border: 'rgba(34,211,238,0.3)' },
    { chars: 'XX', label: 'Product', color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.3)' },
    { chars: 'XX', label: 'Subdivision', color: '#22c55e', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.3)' },
  ];

  return (
    <div className="rounded-2xl border border-[var(--line-2)] bg-[var(--bg-2)] p-6 lg:p-8 h-full">
      <p className="wb-section-label mb-2">HSN Code</p>
      <p className="text-[13px] text-[var(--muted)] mb-6">8-digit structure for goods</p>
      <div className="flex flex-wrap items-end gap-2 mb-8">
        {segments.map((seg, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <div className="flex gap-0.5">
              {seg.chars.split('').map((ch, j) => (
                <div
                  key={j}
                  className="w-9 h-11 flex items-center justify-center rounded-[6px] text-sm font-bold font-mono"
                  style={{ background: seg.bg, border: `1px solid ${seg.border}`, color: seg.color }}
                >
                  {ch}
                </div>
              ))}
            </div>
            <span className="text-[10px] text-[var(--muted)] text-center leading-tight max-w-[56px]">{seg.label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { label: 'Digits 1–2', desc: 'Chapter — broad goods category (e.g. Ch. 85: Electrical machinery)', color: '#dc2f65' },
          { label: 'Digits 3–4', desc: 'Heading — specific product group (e.g. 8528: Monitors & projectors)', color: '#22d3ee' },
          { label: 'Digits 5–6', desc: 'Subheading — international 6-digit level used in 200+ countries', color: '#a78bfa' },
          { label: 'Digits 7–8', desc: 'National tariff — India-specific extension of the international code', color: '#22c55e' },
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

/* ─── SAC Format Diagram ──────────────────────────────────────────────────── */

function SacFormatDiagram() {
  const segments = [
    { chars: 'XX', label: 'Major Category', color: '#dc2f65', bg: 'rgba(220,47,101,0.12)', border: 'rgba(220,47,101,0.3)' },
    { chars: 'XX', label: 'Sub-Category', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
    { chars: 'XX', label: 'Specific Service', color: '#22c55e', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.3)' },
  ];

  return (
    <div className="rounded-2xl border border-[var(--line-2)] bg-[var(--bg-2)] p-6 lg:p-8 h-full">
      <p className="wb-section-label mb-2">SAC Code</p>
      <p className="text-[13px] text-[var(--muted)] mb-6">6-digit structure for services</p>
      <div className="flex flex-wrap items-end gap-2 mb-8">
        {segments.map((seg, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <div className="flex gap-0.5">
              {seg.chars.split('').map((ch, j) => (
                <div
                  key={j}
                  className="w-9 h-11 flex items-center justify-center rounded-[6px] text-sm font-bold font-mono"
                  style={{ background: seg.bg, border: `1px solid ${seg.border}`, color: seg.color }}
                >
                  {ch}
                </div>
              ))}
            </div>
            <span className="text-[10px] text-[var(--muted)] text-center leading-tight max-w-[62px]">{seg.label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: 'Digits 1–2', desc: 'Major service category (all services begin with 99)', color: '#dc2f65' },
          { label: 'Digits 3–4', desc: 'Sub-category identifies the type of service', color: '#f59e0b' },
          { label: 'Digits 5–6', desc: 'Specific service — most granular classification level', color: '#22c55e' },
        ].map((item, i) => (
          <div key={i} className="rounded-xl p-3 bg-[var(--bg-elev)] border border-[var(--line)]">
            <p className="text-[11px] font-semibold mb-1" style={{ color: item.color }}>{item.label}</p>
            <p className="text-[12px] text-[var(--muted-2)] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl px-4 py-3 border border-[var(--line)]" style={{ background: 'var(--bg-elev)' }}>
        <p className="text-[12px] text-[var(--muted-2)] leading-relaxed">
          <strong className="text-[var(--text)]">Example:</strong> SAC 998311 = Management consulting services. The prefix 99 identifies it as a service; 8311 narrows it to consulting under professional services.
        </p>
      </div>
    </div>
  );
}

/* ─── Results Table ───────────────────────────────────────────────────────── */

function ResultsTable({ results }: { results: HsnSacResult[] }) {
  return (
    <div className="rounded-2xl border border-[var(--line-2)] overflow-hidden" style={{ background: 'var(--bg-2)' }}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--line-2)]" style={{ background: 'var(--bg-elev)' }}>
              <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">Type</th>
              <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">Code</th>
              <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">Description</th>
              <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">GST Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)]">
            {results.map((row, i) => (
              <tr key={i} className="hover:bg-[var(--bg-elev)] transition-colors">
                <td className="px-5 py-3.5">
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                    style={row.type === 'HSN'
                      ? { background: 'rgba(34,211,238,0.1)', color: '#22d3ee', border: '1px solid rgba(34,211,238,0.25)' }
                      : { background: 'rgba(167,139,250,0.1)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.25)' }
                    }
                  >
                    {row.type}
                  </span>
                </td>
                <td className="px-5 py-3.5 font-mono text-[13px] font-semibold text-[var(--text)]">{row.code}</td>
                <td className="px-5 py-3.5 text-[13px] text-[var(--muted-2)] max-w-[400px] leading-relaxed">{row.description}</td>
                <td className="px-5 py-3.5">
                  {row.gstRate ? (
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-semibold"
                      style={{ background: 'rgba(220,47,101,0.1)', color: 'var(--brand)', border: '1px solid var(--brand-border)' }}
                    >
                      {row.gstRate}
                    </span>
                  ) : (
                    <span className="text-[var(--muted)] text-[12px]">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Main Page ───────────────────────────────────────────────────────────── */

export function GstHsnSacSearch() {
  useReveal();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<HsnSacResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  async function handleSearch(e: FormEvent) {
    e.preventDefault();
    const value = query.trim();

    if (!value) {
      setError('Please enter an HSN/SAC code or product keyword to search.');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch(`/api/tools/hsn-search?q=${encodeURIComponent(value)}`);
      if (res.status === 404 || res.status === 204) {
        setError('No results found. Try a different code or keyword.');
        return;
      }
      if (!res.ok) {
        throw new Error('Service temporarily unavailable. Please try again shortly.');
      }
      const data: HsnSacResult[] = await res.json();
      if (!data.length) {
        setError("Search didn't return any results. Try a different code or keyword.");
        return;
      }
      setResults(data);
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
          <div className="wb-wrap">
            <Breadcrumb items={[
              { label: 'Home', href: '/' },
              { label: 'Tools', href: '/tools/gst-number-search' },
              { label: 'GST HSN SAC Code Search' },
            ]} />
          </div>
        </section>

        {/* Hero — search tool */}
        <section className="wb-subhero !pb-10">
          <div className="wb-wrap">
            <div className="max-w-[800px] mx-auto text-center">
              <EyebrowPill label="Free Tool" subtitle="HSN & SAC Code Search" />
              <h1 className="wb-display text-[clamp(32px,5vw,58px)] mt-5 mb-4">
                GST HSN &amp; SAC <span className="accent">Code Search</span>
              </h1>
              <p className="text-[var(--muted-2)] text-[16px] leading-relaxed mb-8 max-w-[580px] mx-auto">
                Search for GST HSN and SAC codes for your products and services. Get GST rates, descriptions, and classifications — free, instant, no login required.
              </p>

              {/* Search form */}
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-[640px] mx-auto">
                <div className="relative flex-1">
                  <Search
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: 'var(--muted)' }}
                  />
                  <input
                    type="text"
                    value={query}
                    onChange={e => { setQuery(e.target.value); setError(null); }}
                    placeholder="Enter HSN/SAC Code or product description"
                    spellCheck={false}
                    autoComplete="off"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl text-[14px] outline-none transition-all"
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
                  className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-[14px] transition-all"
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

              {/* Error */}
              {error && (
                <div
                  className="mt-4 flex items-start gap-2.5 max-w-[640px] mx-auto px-4 py-3 rounded-xl text-left"
                  style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}
                >
                  <AlertCircle size={15} className="shrink-0 mt-0.5" style={{ color: 'var(--danger)' }} />
                  <p className="text-[13px]" style={{ color: 'var(--danger)' }}>{error}</p>
                </div>
              )}

              <p className="mt-4 text-[12px] text-[var(--muted)]">
                Examples:{' '}
                <span className="font-mono text-[var(--muted-2)]">8528</span>
                {' · '}
                <span className="font-mono text-[var(--muted-2)]">998311</span>
                {' · '}
                <span className="font-mono text-[var(--muted-2)]">computer monitor</span>
                {' · '}
                <span className="font-mono text-[var(--muted-2)]">consulting</span>
              </p>

              {/* Quick stats */}
              <div className="mt-10 flex flex-wrap justify-center gap-8">
                {[
                  { value: '21', label: 'Sections' },
                  { value: '99', label: 'Chapters' },
                  { value: '1,244+', label: 'Headings' },
                  { value: '5,224+', label: 'Subheadings' },
                  { value: '5 Slabs', label: 'GST Rates' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-[20px] font-bold text-[var(--text)]">{stat.value}</p>
                    <p className="text-[12px] text-[var(--muted)] mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Search results */}
        {results && (
          <section className="wb-section !pt-0" ref={resultRef}>
            <div className="wb-wrap">
              <div className="flex items-center gap-2 mb-6">
                <p className="font-semibold text-[var(--text)]">
                  {results.length} result{results.length !== 1 ? 's' : ''} found
                </p>
              </div>
              <ResultsTable results={results} />
            </div>
          </section>
        )}

        {/* Code structure diagrams */}
        <section className="wb-section wb-reveal" data-reveal>
          <div className="wb-wrap">
            <p className="wb-section-label">Code Structure</p>
            <h2 className="wb-h2 mt-3 mb-10">
              How HSN &amp; SAC codes are <span className="accent">structured.</span>
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HsnFormatDiagram />
              <SacFormatDiagram />
            </div>
          </div>
        </section>

        {/* What is HSN / SAC */}
        <section className="wb-section wb-reveal" data-reveal>
          <div className="wb-wrap">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* HSN */}
              <div>
                <p className="wb-section-label">Understanding HSN</p>
                <h2 className="wb-h2 mt-3 mb-5">What is an <span className="accent">HSN Code?</span></h2>
                <p className="text-[var(--muted-2)] leading-relaxed mb-4">
                  <strong className="text-[var(--text)]">HSN stands for Harmonized System of Nomenclature</strong> — a standardized international system of names and numbers used to classify goods in trade. Developed by the World Customs Organization (WCO), it is recognized in over 200 countries.
                </p>
                <p className="text-[var(--muted-2)] leading-relaxed mb-4">
                  In India's GST framework, HSN codes are 6 to 8 digits long. Each code identifies a product category and maps it to a specific GST rate slab. The hierarchy starts broad — from a chapter (2 digits) — and narrows to a specific product subdivision at 8 digits.
                </p>
                <p className="text-[var(--muted-2)] leading-relaxed">
                  Example: Chapter 85 covers "Electrical machinery." Heading 8528 within it covers "Monitors and projectors." Further digits identify the exact sub-type — colour vs monochrome, size class, and so on.
                </p>
              </div>

              {/* SAC */}
              <div>
                <p className="wb-section-label">Understanding SAC</p>
                <h2 className="wb-h2 mt-3 mb-5">What is a <span className="accent">SAC Code?</span></h2>
                <p className="text-[var(--muted-2)] leading-relaxed mb-4">
                  <strong className="text-[var(--text)]">SAC stands for Service Accounting Code</strong> — a unique 6-digit numerical code used to classify services under India's GST regime. While HSN applies to goods, SAC is its equivalent for services.
                </p>
                <p className="text-[var(--muted-2)] leading-relaxed mb-4">
                  All service codes begin with the prefix 99. The next two digits represent the major service category (e.g. 9983 for other professional services), the following two digits identify the sub-category, and the final two digits pinpoint the specific service type.
                </p>
                <p className="text-[var(--muted-2)] leading-relaxed">
                  Mentioning the correct SAC code on invoices is mandatory under GST for all service providers above the prescribed turnover threshold, just as HSN codes are required for goods suppliers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Compliance thresholds */}
        <section className="wb-section wb-reveal" data-reveal>
          <div className="wb-wrap">
            <p className="wb-section-label">Compliance requirements</p>
            <h2 className="wb-h2 mt-3 mb-8">
              When do you need to quote <span className="accent">HSN codes?</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {GST_THRESHOLDS.map((t, i) => (
                <div
                  key={i}
                  className="rounded-2xl border p-5"
                  style={{ background: 'var(--bg-2)', borderColor: `${t.color}28` }}
                >
                  <div
                    className="w-9 h-9 rounded-[10px] flex items-center justify-center mb-4 text-sm font-bold"
                    style={{ background: `${t.color}18`, border: `1px solid ${t.color}40`, color: t.color }}
                  >
                    {i + 1}
                  </div>
                  <p className="font-semibold text-[var(--text)] text-[14px] mb-1">{t.turnover}</p>
                  <p className="text-[13px] font-semibold" style={{ color: t.color }}>{t.required}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl px-5 py-4 border border-[var(--line-2)]" style={{ background: 'var(--bg-elev)' }}>
              <p className="text-[13px] text-[var(--muted-2)] leading-relaxed">
                <strong className="text-[var(--text)]">Note on auto-population:</strong> GST returns are partially automated — HSN codes are picked from your registration details and auto-populated into filings. Incorrect or missing codes cause mismatches in auto-populated returns and may trigger scrutiny notices.
              </p>
            </div>
          </div>
        </section>

        {/* GST rate slabs */}
        <section className="wb-section wb-reveal" data-reveal>
          <div className="wb-wrap">
            <p className="wb-section-label">Tax Rates</p>
            <h2 className="wb-h2 mt-3 mb-8">
              Five GST rate slabs — determined by <span className="accent">HSN / SAC code.</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {GST_SLABS.map((slab, i) => (
                <div
                  key={i}
                  className="rounded-2xl border p-5 flex flex-col items-center gap-3 text-center"
                  style={{ background: 'var(--bg-2)', borderColor: `${slab.color}30` }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-[20px] font-bold"
                    style={{ background: `${slab.color}15`, border: `1px solid ${slab.color}35`, color: slab.color }}
                  >
                    {slab.rate}
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--text)] text-[13px] mb-1">{slab.label}</p>
                    <p className="text-[11px] text-[var(--muted)] leading-relaxed">{slab.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[12px] text-[var(--muted)] text-center">
              Based on the HSN or SAC code, GST rates are fixed in these five slabs. Some goods in the 28% bracket also attract an additional cess.
            </p>
          </div>
        </section>

        {/* Why HSN matters */}
        <section className="wb-section wb-reveal" data-reveal>
          <div className="wb-wrap">
            <p className="wb-section-label">Why it matters</p>
            <h2 className="wb-h2 mt-3 mb-10">
              Four reasons accurate HSN codes <span className="accent">matter for your business.</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {WHY_HSN.map((item, i) => (
                <article key={i} className="wb-block" data-reveal>
                  <div
                    className="w-10 h-10 rounded-[10px] flex items-center justify-center mb-4"
                    style={{ background: 'var(--brand-soft)', border: '1px solid var(--brand-border)', color: 'var(--brand)' }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="mb-2">{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="wb-section wb-reveal" data-reveal>
          <div className="wb-wrap">
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
          h2="Built-in HSN codes. Automated GST filing."
          body="WhiteBooks GST Software includes a complete HSN/SAC code database built into the invoice workflow — no manual lookup needed. Codes are auto-suggested from your product catalogue, and GST rates are applied automatically."
          primaryCta={{ label: 'Start Free Trial', href: 'https://accounts.whitebooks.in/signupall' }}
          secondaryCta={{ label: 'Talk to Sales: +91 90321 11788', href: 'tel:+919032111788' }}
        />
      </main>
      <Footer />
    </div>
  );
}
