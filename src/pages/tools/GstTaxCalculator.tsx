import { useState } from 'react';
import { Header, Footer, Breadcrumb } from '@/layouts/SiteShell';
import { useReveal } from '@/hooks/useReveal';
import EyebrowPill from '@/components/ui/EyebrowPill';
import { FaqList, SubClose } from '@/layouts/SubpageShell';
import { ProofSection } from '@/sections/WbProof';
import { Calculator, ChevronDown, RefreshCw, ArrowRight } from 'lucide-react';

/* ─── Constants ──────────────────────────────────────────────────────────── */

const TAX_RATES = [
  { label: '0%', value: 0 },
  { label: '0.1%', value: 0.1 },
  { label: '0.25%', value: 0.25 },
  { label: '1%', value: 1 },
  { label: '1.5%', value: 1.5 },
  { label: '3%', value: 3 },
  { label: '5%', value: 5 },
  { label: '7.5%', value: 7.5 },
  { label: '12%', value: 12 },
  { label: '18%', value: 18 },
  { label: '28%', value: 28 },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Select Place of Supply',
    body: 'Choose "Within the State" for intra-state transactions (CGST + SGST applies) or "Out of State" for inter-state transactions (IGST applies).',
  },
  {
    step: '02',
    title: 'Enter Invoice Amount',
    body: 'Enter the net price of your goods or services — the amount before tax is applied. Do not include any existing taxes.',
  },
  {
    step: '03',
    title: 'Select Tax Rate',
    body: 'Pick the applicable GST slab from the dropdown: 0%, 0.1%, 0.25%, 1%, 1.5%, 3%, 5%, 7.5%, 12%, 18%, or 28%.',
  },
];

const WHY_USE = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="13 2 13 9 20 9" />
        <path d="M20 9L13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2z" />
        <line x1="9" y1="14" x2="15" y2="14" />
        <line x1="9" y1="18" x2="15" y2="18" />
      </svg>
    ),
    title: 'Accurate Tax Breakdown',
    body: 'Instantly splits GST into CGST, SGST, or IGST depending on the transaction type — eliminating manual errors.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'Saves Time',
    body: 'Calculate GST for any invoice amount in seconds. No spreadsheets, no manual formulas — just instant results.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
    title: 'Compliance Ready',
    body: 'Results align with India\'s GST Act — covering all official slabs from 0% to 28% including special rates.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 9h6M9 12h6M9 15h4" />
      </svg>
    ),
    title: 'All GST Slabs Covered',
    body: 'From exempted goods (0%) to sin goods (28%), every official slab is available including the special 0.1%, 0.25%, 1.5%, and 7.5% rates.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: 'Intra & Inter-State',
    body: 'Automatically distinguishes between intra-state (CGST + SGST) and inter-state (IGST) transactions based on your supply selection.',
  },
];

const FAQS = [
  {
    q: 'What is a GST Tax Calculator?',
    a: 'A GST Tax Calculator is a free online tool that computes the Goods and Services Tax payable on any transaction. Enter the invoice amount and applicable GST rate, and it instantly calculates CGST, SGST, or IGST and the total payable amount — based on whether the supply is intra-state or inter-state.',
  },
  {
    q: 'What is the formula for GST calculation?',
    a: 'GST Amount = (Original Cost × GST%) ÷ 100. Total Amount = Original Cost + GST Amount. For intra-state: CGST = GST Amount ÷ 2, SGST = GST Amount ÷ 2. For inter-state: IGST = full GST Amount.',
  },
  {
    q: 'What is the difference between CGST, SGST, and IGST?',
    a: 'CGST (Central GST) and SGST (State GST) are levied on intra-state supplies — both at half the total GST rate, collected by the Centre and State respectively. IGST (Integrated GST) applies to inter-state supplies at the full GST rate, collected entirely by the Centre and shared with the destination state.',
  },
  {
    q: 'Which GST rate should I apply?',
    a: 'GST rates vary by goods and services: 0% for essentials like fresh food; 5% for items of mass consumption; 12% and 18% for standard goods and services; 28% for luxury and sin goods. Use the HSN/SAC code for your product to identify the correct slab.',
  },
  {
    q: 'Is this GST calculator free to use?',
    a: 'Yes. The WhiteBooks GST Tax Calculator is completely free with no registration required. For advanced features like bulk calculations, GST filing, ITC reconciliation, and e-Invoicing, explore WhiteBooks GST Software.',
  },
];

/* ─── Shared layout token ────────────────────────────────────────────────── */

const wrap = 'w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4';

/* ─── Formula Block ──────────────────────────────────────────────────────── */

function FormulaBlock() {
  return (
    <div className="rounded-2xl border border-[var(--line-2)] bg-[var(--bg-2)] p-6 lg:p-8">
      <p className="text-[12px] font-medium tracking-[0.18em] uppercase text-[var(--muted)] mb-6">
        Calculation Formula
      </p>
      <div className="flex flex-col gap-4">
        {[
          { label: 'GST Amount', formula: '( Original Cost  ×  GST% )  ÷  100', color: '#d33568' },
          { label: 'Total Amount', formula: 'Original Cost  +  GST Amount', color: '#22d3ee' },
          { label: 'CGST (Intra-state)', formula: 'GST Amount  ÷  2', color: '#a78bfa' },
          { label: 'SGST (Intra-state)', formula: 'GST Amount  ÷  2', color: '#a78bfa' },
          { label: 'IGST (Inter-state)', formula: 'Full GST Amount', color: '#f59e0b' },
        ].map((row) => (
          <div
            key={row.label}
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 rounded-xl px-4 py-3 bg-[var(--bg-elev)] border border-[var(--line)]"
          >
            <span className="text-[12px] font-semibold uppercase tracking-wider min-w-[160px]" style={{ color: row.color }}>
              {row.label}
            </span>
            <span className="text-[13px] font-mono text-[var(--muted-2)]">=</span>
            <span className="text-[13px] font-mono text-[var(--text)]">{row.formula}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Output Row ─────────────────────────────────────────────────────────── */

function OutputRow({
  label,
  value,
  highlight = false,
  muted = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between px-5 py-4 rounded-xl border ${highlight
        ? 'bg-[var(--brand-soft)] border-[var(--brand-border)]'
        : 'bg-[var(--bg-elev)] border-[var(--line)]'
        }`}
    >
      <span className={`text-[13px] font-medium ${muted ? 'text-[var(--muted-2)]' : 'text-[var(--text)]'}`}>
        {label}
      </span>
      <span className={`text-[15px] font-bold font-display ${highlight ? 'text-[var(--brand)]' : 'text-[var(--text)]'}`}>
        {value}
      </span>
    </div>
  );
}

/* ─── Calculator Widget ──────────────────────────────────────────────────── */

function GstCalculatorWidget() {
  const [supplyType, setSupplyType] = useState<'intra' | 'inter'>('intra');
  const [amount, setAmount] = useState('');
  const [rateIdx, setRateIdx] = useState<number | null>(null);
  const [calculated, setCalculated] = useState(false);

  const selectedRate = rateIdx !== null ? TAX_RATES[rateIdx] : null;

  function fmt(n: number) {
    return '₹ ' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  const base = parseFloat(amount.replace(/,/g, '')) || 0;
  const gstAmt = (base * (selectedRate?.value ?? 0)) / 100;
  const cgst = supplyType === 'intra' ? gstAmt / 2 : 0;
  const sgst = supplyType === 'intra' ? gstAmt / 2 : 0;
  const igst = supplyType === 'inter' ? gstAmt : 0;
  const total = base + gstAmt;

  const canCalculate = base > 0 && selectedRate !== null;

  function handleCalculate() {
    if (canCalculate) setCalculated(true);
  }

  function handleReset() {
    setAmount('');
    setRateIdx(null);
    setCalculated(false);
    setSupplyType('intra');
  }

  return (
    <div className="rounded-2xl border border-[var(--line-2)] bg-[var(--bg-2)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[var(--line-2)]">
        <div className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 bg-[var(--brand-soft)] [border:1px_solid_var(--brand-border)]">
          <Calculator size={16} className="text-[var(--brand)]" />
        </div>
        <div>
          <p className="text-[14px] font-semibold text-[var(--text)]">GST Tax Calculator</p>
          <p className="text-[12px] text-[var(--muted)]">India — all slabs supported</p>
        </div>
      </div>

      {/* Form */}
      <div className="p-6 flex flex-col gap-5">
        {/* Place of Supply */}
        <div>
          <label className="block text-[12px] font-semibold uppercase tracking-wider text-[var(--muted)] mb-3">
            Place of Supply
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'intra', label: 'Within the State', sub: 'CGST + SGST' },
              { id: 'inter', label: 'Out of State', sub: 'IGST' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => { setSupplyType(opt.id as 'intra' | 'inter'); setCalculated(false); }}
                className={`flex flex-col items-start px-4 py-3 rounded-xl border text-left transition-all ${supplyType === opt.id
                  ? 'bg-[var(--brand-soft)] border-[var(--brand-border)]'
                  : 'bg-[var(--bg-elev)] border-[var(--line)]'
                  }`}
              >
                <span className={`text-[13px] font-semibold ${supplyType === opt.id ? 'text-[var(--brand)]' : 'text-[var(--text)]'}`}>
                  {opt.label}
                </span>
                <span className="text-[11px] text-[var(--muted)] mt-0.5">{opt.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Invoice Amount */}
        <div>
          <label className="block text-[12px] font-semibold uppercase tracking-wider text-[var(--muted)] mb-2">
            Invoice Amount (₹)
          </label>
          <input
            type="number"
            min="0"
            step="any"
            value={amount}
            onChange={(e) => { setAmount(e.target.value); setCalculated(false); }}
            placeholder="e.g. 10000"
            className="w-full px-4 py-3.5 rounded-xl text-[14px] outline-none transition-all bg-[var(--bg-elev)] [border:1.5px_solid_var(--line-2)] text-[var(--text)] focus:[border-color:var(--brand)]"
          />
        </div>

        {/* Tax Rate */}
        <div>
          <label className="block text-[12px] font-semibold uppercase tracking-wider text-[var(--muted)] mb-2">
            GST Rate
          </label>
          <div className="relative">
            <select
              value={rateIdx ?? ''}
              onChange={(e) => { setRateIdx(e.target.value === '' ? null : Number(e.target.value)); setCalculated(false); }}
              className={`w-full appearance-none px-4 py-3.5 rounded-xl text-[14px] outline-none transition-all cursor-pointer bg-[var(--bg-elev)] [border:1.5px_solid_var(--line-2)] focus:[border-color:var(--brand)] ${rateIdx === null ? 'text-[var(--muted)]' : 'text-[var(--text)]'
                }`}
            >
              <option value="">— Select Tax Rate —</option>
              {TAX_RATES.map((r, i) => (
                <option key={i} value={i}>{r.label}</option>
              ))}
            </select>
            <ChevronDown
              size={15}
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--muted)]"
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleCalculate}
            disabled={!canCalculate}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-[14px] transition-all ${canCalculate
              ? 'bg-[var(--brand)] text-white cursor-pointer'
              : 'bg-[var(--bg-elev)] text-[var(--muted)] cursor-not-allowed [border:1.5px_solid_var(--line)]'
              }`}
          >
            <Calculator size={16} />
            Calculate GST
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl text-[14px] font-medium transition-all bg-[var(--bg-elev)] [border:1.5px_solid_var(--line)] text-[var(--muted-2)]"
            title="Reset"
          >
            <RefreshCw size={15} />
          </button>
        </div>
      </div>

      {/* Results */}
      <div className={`border-t border-[var(--line-2)] px-6 py-5 flex flex-col gap-3 transition-all ${calculated ? 'opacity-100 pointer-events-auto' : 'opacity-[0.38] pointer-events-none'
        }`}>
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)] mb-1">
          Tax Breakdown
        </p>

        {supplyType === 'intra' ? (
          <>
            <OutputRow label="CGST" value={calculated ? fmt(cgst) : '₹ —'} muted />
            <OutputRow label="SGST" value={calculated ? fmt(sgst) : '₹ —'} muted />
            <OutputRow label="IGST" value="₹ 0.00" muted />
          </>
        ) : (
          <>
            <OutputRow label="CGST" value="₹ 0.00" muted />
            <OutputRow label="SGST" value="₹ 0.00" muted />
            <OutputRow label="IGST" value={calculated ? fmt(igst) : '₹ —'} muted />
          </>
        )}

        <div className="mt-1">
          <OutputRow label="Total Amount (incl. GST)" value={calculated ? fmt(total) : '₹ —'} highlight />
        </div>

        {calculated && (
          <p className="text-[11px] text-[var(--muted)] text-center mt-1">
            Base: {fmt(base)} + GST ({selectedRate?.label}): {fmt(gstAmt)}
          </p>
        )}
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────────── */

export function GstTaxCalculator() {
  useReveal();

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header mode="resources" />
      <main>

        {/* Breadcrumb */}
        <section className="pt-[100px] pb-0">
          <div className={wrap}>
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Tools', href: '/tools/gst-number-search' },
                { label: 'GST Tax Calculator' },
              ]}
            />
          </div>
        </section>

        {/* Hero — two-column */}
        <section className="pt-[70px] pb-10 relative overflow-hidden">
          <div className={wrap}>
            <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16 w-full">

              {/* Left: copy */}
              <div className="flex-1 min-w-0 pt-2">
                <EyebrowPill label="Free Tool" subtitle="GST Calculator" />
                <h1 className="font-display font-medium tracking-[-0.025em] leading-[1.04] text-[clamp(36px,5vw,64px)] mt-5 mb-4">
                  GST Tax Calculator — <span className="text-[var(--brand)]">Calculate Indian GST</span> in Seconds
                </h1>
                <p className="text-[var(--muted-2)] text-[16px] leading-relaxed mb-6 max-w-[520px]">
                  Instantly compute CGST, SGST, or IGST for any invoice amount. Select your supply type and GST slab — get a full tax breakdown in one click.
                </p>

                {/* How it works inline steps */}
                <div className="flex flex-col gap-3">
                  {HOW_IT_WORKS.map((step) => (
                    <div key={step.step} className="flex items-start gap-4">
                      <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold mt-0.5 bg-[var(--brand-soft)] [border:1px_solid_var(--brand-border)] text-[var(--brand)]">
                        {step.step}
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-[var(--text)]">{step.title}</p>
                        <p className="text-[13px] text-[var(--muted-2)] leading-relaxed">{step.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: calculator widget */}
              <div className="w-full lg:w-[440px] shrink-0">
                <GstCalculatorWidget />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="relative py-[120px] max-[700px]:py-[72px] wb-reveal" data-reveal>
          <div className={wrap}>
            <p className="text-[12px] font-medium tracking-[0.18em] uppercase text-[var(--muted)]">Why use this tool</p>
            <h2 className="font-display font-medium text-[clamp(32px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] m-0 max-w-[780px] mt-3 mb-10">
              Benefits of the <span className="text-[var(--brand)]">GST Calculator.</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {WHY_USE.map((item, i) => (
                <article
                  key={i}
                  className="p-7 pb-[26px] bg-[var(--bg-2)] border border-[var(--line)] rounded-[14px] transition-[border-color,background] duration-[180ms] hover:border-[var(--brand-border)] hover:bg-[var(--bg-elev)] max-[700px]:px-[18px] max-[700px]:py-5"
                  data-reveal
                >
                  <div className="w-10 h-10 rounded-[10px] flex items-center justify-center mb-4 bg-[var(--brand-soft)] [border:1px_solid_var(--brand-border)]">
                    {item.icon}
                  </div>
                  <h3 className="font-display font-medium text-[18px] tracking-[-0.005em] m-0 mb-[10px] max-[700px]:text-[16px]">{item.title}</h3>
                  <p className="m-0 text-[14px] text-[var(--muted-2)] leading-[1.6]">{item.body}</p>
                </article>
              ))}

              {/* CTA card */}
              <article
                className="p-7 pb-[26px] rounded-[14px] border flex flex-col justify-between bg-[var(--brand-softer)] border-[var(--brand-border)] max-[700px]:px-[18px] max-[700px]:py-5"
                data-reveal
              >
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-wider text-[var(--brand)] mb-3">
                    WhiteBooks GSP
                  </p>
                  <h3 className="font-display font-medium text-[18px] tracking-[-0.005em] m-0 mb-[10px] max-[700px]:text-[16px]">
                    Need full GST filing automation?
                  </h3>
                  <p className="m-0 text-[14px] text-[var(--muted-2)] leading-[1.6]">
                    Go beyond calculations — file returns, reconcile ITC, and generate e-Invoices with WhiteBooks GST Software.
                  </p>
                </div>
                <a
                  href="/softwares/gst"
                  className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold transition-opacity hover:opacity-70 text-[var(--brand)]"
                >
                  Explore GST Software <ArrowRight size={13} />
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* Formula + What is GST */}
        <section className="relative py-[120px] max-[700px]:py-[72px] wb-reveal" data-reveal>
          <div className={wrap}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <p className="text-[12px] font-medium tracking-[0.18em] uppercase text-[var(--muted)]">Understanding GST</p>
                <h2 className="font-display font-medium text-[clamp(32px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] m-0 max-w-[780px] mt-3 mb-5">
                  What is a <span className="text-[var(--brand)]">GST Tax Calculator?</span>
                </h2>
                <p className="text-[var(--muted-2)] leading-relaxed mb-4">
                  A GST Tax Calculator is a free online tool that computes the Goods and Services Tax payable on any transaction in India. Depending on whether a sale is intra-state or inter-state, GST is split into CGST + SGST or charged as IGST.
                </p>
                <p className="text-[var(--muted-2)] leading-relaxed mb-4">
                  GST rates in India range from <strong className="text-[var(--text)]">0% to 28%</strong>. Essential goods are taxed at 0–5%, standard goods and services at 12–18%, and luxury/sin goods at 28%.
                </p>
                <p className="text-[var(--muted-2)] leading-relaxed">
                  This tool supports all official GST slabs: 0%, 0.1%, 0.25%, 1%, 1.5%, 3%, 5%, 7.5%, 12%, 18%, and 28% — and automatically applies the correct formula based on your supply type.
                </p>
              </div>
              <FormulaBlock />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-[120px] max-[700px]:py-[72px] wb-reveal" data-reveal>
          <div className={wrap}>
            <p className="text-[12px] font-medium tracking-[0.18em] uppercase text-[var(--muted)]">FAQs</p>
            <h2 className="font-display font-medium text-[clamp(32px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] m-0 max-w-[780px] mt-3 mb-8">
              Frequently asked <span className="text-[var(--brand)]">questions.</span>
            </h2>
            <div className="max-w-[800px]">
              <FaqList items={FAQS} />
            </div>
          </div>
        </section>

        <ProofSection />

        <SubClose
          h2="From calculating to filing — one platform."
          body="WhiteBooks is a GSP-licensed compliance platform used by 25,000+ businesses. Automate GST filing, e-Invoicing, e-Way Bills, and ITC reconciliation from a single workspace."
          primaryCta={{ label: 'Start Free Trial', href: 'https://accounts.whitebooks.in/signupall' }}
          secondaryCta={{ label: 'Talk to Sales: +91 90321 11788', href: 'tel:+919032111788' }}
        />
      </main>
      <Footer />
    </div>
  );
}
