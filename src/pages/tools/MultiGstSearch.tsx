import { useState, useRef, ChangeEvent } from 'react';
import { Header, Footer, Breadcrumb } from '@/layouts/SiteShell';
import { useReveal } from '@/hooks/useReveal';
import EyebrowPill from '@/components/ui/EyebrowPill';
import { FaqList, SubClose } from '@/layouts/SubpageShell';
import { ProofSection } from '@/sections/WbProof';
import {
  Search, CheckCircle, XCircle, Loader2, Building2,
  MapPin, Calendar, Tag, Users, AlertCircle, Upload,
  Download, Hash, ClipboardList, ShieldCheck, Banknote,
  BadgeCheck, Scale, TrendingUp, FileSpreadsheet, Trash2,
  Plus,
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

type RowState = 'idle' | 'loading' | 'success' | 'error' | 'invalid';

interface GstRow {
  id: string;
  gstin: string;
  state: RowState;
  result?: GstinResult;
  error?: string;
}

/* ─── Constants ──────────────────────────────────────────────────────────── */

const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

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

const WHY_VERIFY = [
  {
    icon: <BadgeCheck size={20} />,
    title: 'Ensuring Authenticity',
    body: 'Verify that your suppliers or buyers are genuinely registered under GST before entering any business transaction.',
  },
  {
    icon: <Banknote size={20} />,
    title: 'Input Tax Credit Eligibility',
    body: 'Only registered and active GSTINs are eligible to pass on ITC. Batch-verify all vendors before claiming credit to avoid rejections.',
  },
  {
    icon: <ShieldCheck size={20} />,
    title: 'Preventing Fraud',
    body: 'Fake or cancelled GSTINs are used in fraudulent invoices. Bulk verification protects your business at scale.',
  },
  {
    icon: <Scale size={20} />,
    title: 'Legal Compliance',
    body: 'Mentioning valid and active GSTINs on every tax invoice is mandatory under the GST Act for all registered businesses.',
  },
  {
    icon: <TrendingUp size={20} />,
    title: 'Avoiding Penalties',
    body: 'Dealing with unregistered suppliers or fake GST numbers can attract heavy penalties and ITC reversal notices.',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: <Plus size={22} />,
    title: 'Add / Import Multiple GST Numbers',
    body: 'Enter GSTINs directly into the input box (one per line or comma-separated), or import them in bulk by uploading a CSV / Excel file.',
  },
  {
    step: '02',
    icon: <CheckCircle size={22} />,
    title: 'Validate Multiple GST Numbers in One Click',
    body: 'Click "Search All" and the tool validates every GSTIN format, then fetches verified data from the GSTN database for each valid number simultaneously.',
  },
  {
    step: '03',
    icon: <Download size={22} />,
    title: 'View / Download Complete Details',
    body: 'See legal name, status, taxpayer type, jurisdiction, registration dates, and business activities for every GSTIN — and export the full results as CSV.',
  },
];

const FAQS = [
  {
    q: 'What is the Multi GST Number Search Tool?',
    a: 'The Multi GST Number Search Tool lets you verify multiple GSTIN numbers simultaneously against the official GSTN database. Instead of searching one GSTIN at a time, you can add or import hundreds of GSTINs and retrieve verified details — legal name, status, taxpayer type, jurisdiction, address, and more — all in a single click.',
  },
  {
    q: 'How do I add multiple GSTINs?',
    a: 'There are two ways: (1) Type or paste GSTINs directly into the text box — enter one GSTIN per line or separate them with commas. (2) Import from Excel or CSV — click the upload button and select your file. The tool will automatically extract and list all GSTINs found in the file.',
  },
  {
    q: 'What file formats are supported for import?',
    a: 'The tool accepts CSV (.csv) files. Each GSTIN should be in a separate row. You can also paste comma-separated or line-separated GSTINs directly into the input box for quick batch entry without needing a file.',
  },
  {
    q: 'What details are returned for each GSTIN?',
    a: 'For every valid and active GSTIN, the tool returns: Legal Name, Trade Name, GSTIN/UIN Status, Taxpayer Type, Constitution of Business, State & Center Jurisdiction, Date of Registration, Date of Cancellation (if applicable), Last Updated Date, Principal Place of Business Address, and Nature of Business Activities.',
  },
  {
    q: 'Can I download the verified results?',
    a: 'Yes. After the search is complete, click the "Download CSV" button to export all results — including the verified details for each GSTIN — into a spreadsheet-ready CSV file.',
  },
  {
    q: 'Is there a limit on how many GSTINs I can search at once?',
    a: 'The tool is designed for bulk verification and can handle large lists. For enterprise-scale verification of thousands of GSTINs, consider using the WhiteBooks GST API, which offers programmatic batch access and higher rate limits.',
  },
  {
    q: 'What if a GSTIN is invalid or not found?',
    a: 'The tool validates the 15-digit GSTIN format before searching. Invalid formats are flagged immediately without making an API call. For valid formats that return no data from GSTN, the tool shows a "Not Found" status for that specific GSTIN while continuing to display results for the others.',
  },
];

/* ─── Helpers ────────────────────────────────────────────────────────────── */

function uid() {
  return Math.random().toString(36).slice(2);
}

function parseGstinsFromText(text: string): string[] {
  return text
    .split(/[\n,]+/)
    .map(s => s.trim().toUpperCase())
    .filter(s => s.length > 0);
}

function downloadCsv(rows: GstRow[]) {
  const headers = [
    'GSTIN', 'Status', 'Legal Name', 'Trade Name', 'Taxpayer Type',
    'Constitution of Business', 'State Jurisdiction', 'Center Jurisdiction',
    'Date of Registration', 'Date of Cancellation', 'Last Updated',
    'Principal Address', 'Business Activities',
  ];

  const lines = rows.map(r => {
    if (r.state !== 'success' || !r.result) {
      return [r.gstin, r.state === 'invalid' ? 'Invalid Format' : r.error ?? r.state, ...Array(headers.length - 2).fill('')].join(',');
    }
    const d = r.result;
    return [
      d.gstin, d.status, d.legalName, d.tradeName ?? '',
      d.taxpayerType, d.constitutionOfBusiness,
      d.stateJurisdiction, d.centerJurisdiction,
      d.registrationDate, d.cancellationDate ?? '',
      d.lastUpdatedDate, `"${d.principalAddress}"`,
      `"${d.businessActivities.join('; ')}"`,
    ].join(',');
  });

  const csv = [headers.join(','), ...lines].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'gstin-verification-results.csv';
  a.click();
  URL.revokeObjectURL(url);
}

/* ─── Row status badge ───────────────────────────────────────────────────── */

function StatusBadge({ state, status }: { state: RowState; status?: string }) {
  if (state === 'loading') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
        style={{ background: 'rgba(167,139,250,0.1)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.25)' }}>
        <Loader2 size={11} className="animate-spin" /> Searching…
      </span>
    );
  }
  if (state === 'invalid') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
        style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.25)' }}>
        <AlertCircle size={11} /> Invalid Format
      </span>
    );
  }
  if (state === 'error') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
        style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.25)' }}>
        <XCircle size={11} /> Not Found
      </span>
    );
  }
  if (state === 'success' && status) {
    const isActive = status.toLowerCase() === 'active';
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold"
        style={isActive
          ? { background: 'rgba(34,197,94,0.12)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.25)' }
          : { background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.25)' }}>
        {isActive ? <CheckCircle size={11} /> : <XCircle size={11} />}
        {status}
      </span>
    );
  }
  return null;
}

/* ─── Result row (expanded detail) ──────────────────────────────────────── */

function ResultDetail({ result }: { result: GstinResult }) {
  const fields = [
    { label: 'Taxpayer Type', value: result.taxpayerType },
    { label: 'Constitution', value: result.constitutionOfBusiness },
    { label: 'State Jurisdiction', value: result.stateJurisdiction },
    { label: 'Center Jurisdiction', value: result.centerJurisdiction },
    { label: 'Registered On', value: result.registrationDate },
    { label: 'Last Updated', value: result.lastUpdatedDate },
    ...(result.cancellationDate ? [{ label: 'Cancelled On', value: result.cancellationDate }] : []),
    { label: 'Principal Address', value: result.principalAddress },
  ];

  return (
    <div className="mt-3 pt-3 border-t border-[var(--line)]">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3">
        {fields.map((f, i) => (
          <div key={i}>
            <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--muted)] mb-0.5">{f.label}</p>
            <p className="text-[12px] text-[var(--text)] font-medium leading-snug">{f.value}</p>
          </div>
        ))}
      </div>
      {result.businessActivities.length > 0 && (
        <div className="mt-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--muted)] mb-1.5">Business Activities</p>
          <div className="flex flex-wrap gap-1.5">
            {result.businessActivities.map((act, i) => (
              <span key={i} className="text-[11px] px-2 py-0.5 rounded-md"
                style={{ background: 'var(--bg-elev)', border: '1px solid var(--line-2)', color: 'var(--muted-2)' }}>
                {act}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Result table row ───────────────────────────────────────────────────── */

function ResultRow({ row }: { row: GstRow }) {
  const [expanded, setExpanded] = useState(false);
  const hasDetail = row.state === 'success' && !!row.result;

  return (
    <div
      className="rounded-xl border border-[var(--line-2)] overflow-hidden transition-all"
      style={{ background: 'var(--bg-2)' }}
    >
      <div
        className={`flex items-center gap-4 px-4 py-3.5 ${hasDetail ? 'cursor-pointer hover:bg-[var(--bg-elev)] transition-colors' : ''}`}
        onClick={() => hasDetail && setExpanded(v => !v)}
      >
        {/* Index dot */}
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[11px] font-bold font-mono"
          style={{ background: 'var(--bg-elev)', border: '1px solid var(--line-2)', color: 'var(--muted)' }}>
          {row.state === 'loading' ? <Loader2 size={13} className="animate-spin" style={{ color: 'var(--brand)' }} /> : <Hash size={13} />}
        </div>

        {/* GSTIN */}
        <span className="font-mono text-[13px] font-semibold text-[var(--text)] shrink-0 w-[165px]">{row.gstin}</span>

        {/* Legal Name */}
        <span className="text-[13px] text-[var(--muted-2)] flex-1 truncate hidden sm:block">
          {row.result?.legalName ?? (row.state === 'invalid' ? 'Invalid GSTIN format' : row.error ?? '—')}
        </span>

        {/* Status badge */}
        <div className="shrink-0 ml-auto">
          <StatusBadge state={row.state} status={row.result?.status} />
        </div>

        {/* Chevron */}
        {hasDetail && (
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 text-[var(--muted)] transition-transform ${expanded ? 'rotate-180' : ''}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        )}
      </div>

      {expanded && row.result && (
        <div className="px-4 pb-4">
          <ResultDetail result={row.result} />
        </div>
      )}
    </div>
  );
}

/* ─── Summary stats ──────────────────────────────────────────────────────── */

function SearchSummary({ rows }: { rows: GstRow[] }) {
  const total = rows.length;
  const active = rows.filter(r => r.result?.status.toLowerCase() === 'active').length;
  const inactive = rows.filter(r => r.state === 'success' && r.result?.status.toLowerCase() !== 'active').length;
  const invalid = rows.filter(r => r.state === 'invalid' || r.state === 'error').length;

  const stats = [
    { label: 'Total', value: total, color: 'var(--text)' },
    { label: 'Active', value: active, color: '#22c55e' },
    { label: 'Inactive', value: inactive, color: '#ef4444' },
    { label: 'Invalid / Not Found', value: invalid, color: '#f59e0b' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      {stats.map((s, i) => (
        <div key={i} className="rounded-xl px-4 py-3 border border-[var(--line-2)]" style={{ background: 'var(--bg-2)' }}>
          <p className="text-[22px] font-bold" style={{ color: s.color }}>{s.value}</p>
          <p className="text-[11px] text-[var(--muted)] mt-0.5">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────────────────── */

export function MultiGstSearch() {
  useReveal();

  const [inputText, setInputText] = useState('');
  const [rows, setRows] = useState<GstRow[]>([]);
  const [searching, setSearching] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  function addGstinsFromText(text: string) {
    const parsed = parseGstinsFromText(text);
    if (parsed.length === 0) return;
    const newRows: GstRow[] = parsed.map(g => ({ id: uid(), gstin: g, state: 'idle' }));
    setRows(prev => {
      const existing = new Set(prev.map(r => r.gstin));
      return [...prev, ...newRows.filter(r => !existing.has(r.gstin))];
    });
    setInputText('');
  }

  function handleFileImport(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const text = ev.target?.result as string;
      addGstinsFromText(text);
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  async function handleSearchAll() {
    const pending = rows.filter(r => r.state === 'idle' || r.state === 'error' || r.state === 'invalid');
    const toSearch = rows.map(r => {
      if (!pending.find(p => p.id === r.id)) return r;
      if (!GSTIN_REGEX.test(r.gstin)) return { ...r, state: 'invalid' as RowState };
      return { ...r, state: 'loading' as RowState };
    });
    setRows(toSearch);
    setSearching(true);
    setGlobalError(null);

    const validRows = toSearch.filter(r => r.state === 'loading');
    if (validRows.length === 0) {
      setSearching(false);
      return;
    }

    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);

    await Promise.allSettled(
      validRows.map(async (row) => {
        try {
          const res = await fetch(`/api/tools/gst-search?gstin=${row.gstin}`);
          if (res.status === 404) {
            setRows(prev => prev.map(r => r.id === row.id ? { ...r, state: 'error', error: 'No data found' } : r));
            return;
          }
          if (!res.ok) throw new Error('Service unavailable');
          const data: GstinResult = await res.json();
          setRows(prev => prev.map(r => r.id === row.id ? { ...r, state: 'success', result: data } : r));
        } catch {
          setRows(prev => prev.map(r => r.id === row.id ? { ...r, state: 'error', error: 'Failed to fetch' } : r));
        }
      })
    );

    setSearching(false);
  }

  function handleRemove(id: string) {
    setRows(prev => prev.filter(r => r.id !== id));
  }

  function handleClearAll() {
    setRows([]);
    setInputText('');
    setGlobalError(null);
  }

  const hasResults = rows.some(r => r.state !== 'idle');
  const doneCount = rows.filter(r => r.state === 'success' || r.state === 'error' || r.state === 'invalid').length;
  const allDone = rows.length > 0 && doneCount === rows.length;

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
              { label: 'Multi GST Number Search' },
            ]} />
          </div>
        </section>

        {/* Hero — tool widget */}
        <section className="wb-subhero !pb-10">
          <div className="wb-wrap">
            <div className="max-w-[820px] mx-auto text-center">
              <EyebrowPill label="Free Tool" subtitle="Bulk GSTIN Verification" />
              <h1 className="wb-display text-[clamp(30px,5vw,58px)] mt-5 mb-4">
                One Click To Check And <span className="accent">Verify GST Numbers</span>
              </h1>
              <p className="text-[var(--muted-2)] text-[16px] leading-relaxed mb-10 max-w-[580px] mx-auto">
                Verify multiple GSTIN numbers simultaneously. Paste a list, import from CSV/Excel, and get verified taxpayer details for all — in one click.
              </p>

              {/* Input widget */}
              <div className="rounded-2xl border border-[var(--line-2)] overflow-hidden text-left" style={{ background: 'var(--bg-2)' }}>

                {/* Toolbar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--line-2)]">
                  <div className="flex items-center gap-2">
                    <Hash size={15} style={{ color: 'var(--brand)' }} />
                    <span className="text-[13px] font-semibold text-[var(--text)]">GST Numbers</span>
                    {rows.length > 0 && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: 'var(--brand-soft)', color: 'var(--brand)', border: '1px solid var(--brand-border)' }}>
                        {rows.length} added
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      ref={fileRef}
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      className="hidden"
                      onChange={handleFileImport}
                    />
                    <button
                      onClick={() => fileRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all"
                      style={{ background: 'var(--bg-elev)', border: '1px solid var(--line-2)', color: 'var(--muted-2)' }}
                    >
                      <FileSpreadsheet size={13} />
                      Import Excel / CSV
                    </button>
                    {rows.length > 0 && (
                      <button
                        onClick={handleClearAll}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all"
                        style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }}
                      >
                        <Trash2 size={13} />
                        Clear All
                      </button>
                    )}
                  </div>
                </div>

                {/* Text input */}
                <div className="p-4">
                  <div className="flex gap-3">
                    <textarea
                      value={inputText}
                      onChange={e => { setInputText(e.target.value.toUpperCase()); setGlobalError(null); }}
                      placeholder={"Enter GST numbers — one per line or comma-separated\ne.g.\n27AAPFU0939F1ZV\n29GGGGG1314R9Z6\n07AAACB2895H1Z1"}
                      rows={4}
                      spellCheck={false}
                      autoComplete="off"
                      className="flex-1 resize-none rounded-xl text-[13px] font-mono px-4 py-3 outline-none transition-all leading-relaxed"
                      style={{
                        background: 'var(--bg-elev)',
                        border: globalError ? '1.5px solid var(--danger)' : '1.5px solid var(--line-2)',
                        color: 'var(--text)',
                      }}
                      onFocus={e => { if (!globalError) e.currentTarget.style.borderColor = 'var(--brand)'; }}
                      onBlur={e => { if (!globalError) e.currentTarget.style.borderColor = 'var(--line-2)'; }}
                      onKeyDown={e => {
                        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                          e.preventDefault();
                          if (inputText.trim()) addGstinsFromText(inputText);
                        }
                      }}
                    />
                    <div className="flex flex-col gap-2 shrink-0">
                      <button
                        onClick={() => {
                          if (!inputText.trim()) { setGlobalError('Enter at least one GSTIN to add.'); return; }
                          addGstinsFromText(inputText);
                        }}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all"
                        style={{ background: 'var(--bg-elev)', border: '1.5px solid var(--line-2)', color: 'var(--text)' }}
                      >
                        <Plus size={14} />
                        Add
                      </button>
                    </div>
                  </div>

                  {globalError && (
                    <div className="mt-3 flex items-center gap-2 px-3 py-2.5 rounded-xl"
                      style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}>
                      <AlertCircle size={14} style={{ color: 'var(--danger)' }} />
                      <p className="text-[12px]" style={{ color: 'var(--danger)' }}>{globalError}</p>
                    </div>
                  )}
                </div>

                {/* Added GSTINs preview chips */}
                {rows.length > 0 && !hasResults && (
                  <div className="px-4 pb-4">
                    <p className="text-[11px] font-medium text-[var(--muted)] uppercase tracking-wider mb-2">Added GSTINs</p>
                    <div className="flex flex-wrap gap-2">
                      {rows.map(r => (
                        <div key={r.id} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[12px] font-mono font-medium"
                          style={{ background: 'var(--bg-elev)', border: '1px solid var(--line-2)', color: 'var(--text)' }}>
                          {r.gstin}
                          <button onClick={() => handleRemove(r.id)} className="text-[var(--muted)] hover:text-[var(--danger)] transition-colors">
                            <XCircle size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Search button */}
                <div className="px-4 pb-4 pt-2 flex items-center gap-3">
                  <button
                    onClick={handleSearchAll}
                    disabled={searching || rows.length === 0}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[14px] transition-all"
                    style={{
                      background: rows.length === 0 || searching ? 'rgba(220,47,101,0.4)' : 'var(--brand)',
                      color: '#fff',
                      cursor: rows.length === 0 || searching ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {searching ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
                    {searching ? 'Verifying…' : `Search ${rows.length > 0 ? `${rows.length} GSTIN${rows.length !== 1 ? 's' : ''}` : 'All'}`}
                  </button>

                  {allDone && (
                    <button
                      onClick={() => downloadCsv(rows)}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-[14px] transition-all"
                      style={{ background: 'var(--bg-elev)', border: '1.5px solid var(--line-2)', color: 'var(--text)' }}
                    >
                      <Download size={15} />
                      Download CSV
                    </button>
                  )}

                  <p className="text-[12px] text-[var(--muted)] ml-auto">
                    ⌘ + Enter to add
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results */}
        {hasResults && (
          <section className="wb-section !pt-0" ref={resultsRef}>
            <div className="wb-wrap">
              <div className="max-w-[820px] mx-auto">
                <SearchSummary rows={rows} />
                <div className="flex flex-col gap-2">
                  {rows.map(row => (
                    <ResultRow key={row.id} row={row} />
                  ))}
                </div>
                {allDone && (
                  <div className="mt-5 flex justify-end">
                    <button
                      onClick={() => downloadCsv(rows)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-[13px] transition-all"
                      style={{ background: 'var(--bg-2)', border: '1.5px solid var(--line-2)', color: 'var(--text)' }}
                    >
                      <Download size={14} />
                      Export All Results as CSV
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* How it works */}
        <section className="wb-section wb-reveal" data-reveal>
          <div className="wb-wrap">
            <p className="wb-section-label">How it works</p>
            <h2 className="wb-h2 mt-3 mb-10">
              Three steps to verify <span className="accent">all your GSTINs.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {HOW_IT_WORKS.map((step, i) => (
                <article key={i} className="wb-block" data-reveal>
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
                      style={{ background: 'var(--brand-soft)', border: '1px solid var(--brand-border)', color: 'var(--brand)' }}
                    >
                      {step.icon}
                    </div>
                    <span className="text-[38px] font-bold leading-none mt-1 tabular-nums"
                      style={{ color: 'var(--line-2)', fontVariantNumeric: 'tabular-nums' }}>
                      {step.step}
                    </span>
                  </div>
                  <h3 className="mb-2 text-[15px]">{step.title}</h3>
                  <p className="text-[13px]">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* What details you get */}
        <section className="wb-section wb-reveal" data-reveal>
          <div className="wb-wrap">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <p className="wb-section-label">Data returned</p>
                <h2 className="wb-h2 mt-3 mb-5">
                  View / Download <span className="accent">Complete Details</span> of GST Numbers.
                </h2>
                <p className="text-[var(--muted-2)] leading-relaxed mb-6">
                  Every valid GSTIN returned from the GSTN database includes comprehensive taxpayer information. The tool surfaces all official registration details so you have full context for every business you verify.
                </p>
                <a
                  href="https://accounts.whitebooks.in/signupall"
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold transition-opacity hover:opacity-70"
                  style={{ color: 'var(--brand)' }}
                >
                  Get started free →
                </a>
              </div>
              <div className="rounded-2xl border border-[var(--line-2)] overflow-hidden" style={{ background: 'var(--bg-2)' }}>
                <div className="px-5 py-3.5 border-b border-[var(--line-2)]">
                  <div className="flex items-center gap-2">
                    <ClipboardList size={14} style={{ color: 'var(--brand)' }} />
                    <p className="text-[12px] font-semibold text-[var(--text)]">Details returned per GSTIN</p>
                  </div>
                </div>
                <ul className="divide-y divide-[var(--line)]">
                  {GSTIN_DETAILS.map((detail, i) => (
                    <li key={i} className="flex items-center gap-3 px-5 py-2.5">
                      <CheckCircle size={13} style={{ color: 'var(--brand)', flexShrink: 0 }} />
                      <span className="text-[13px] text-[var(--muted-2)]">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why verify */}
        <section className="wb-section wb-reveal" data-reveal>
          <div className="wb-wrap">
            <p className="wb-section-label">Why it matters</p>
            <h2 className="wb-h2 mt-3 mb-10">
              Five reasons to verify your <span className="accent">GST Numbers.</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {WHY_VERIFY.map((item, i) => (
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

              {/* CTA card */}
              <article
                className="wb-block flex flex-col justify-between"
                style={{ background: 'var(--brand-softer)', borderColor: 'var(--brand-border)' }}
                data-reveal
              >
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--brand)' }}>
                    WhiteBooks GSP
                  </p>
                  <h3 className="mb-2">Need API-scale verification?</h3>
                  <p>Verify millions of GSTINs programmatically with WhiteBooks' GST API — built for developers and enterprise finance teams.</p>
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
