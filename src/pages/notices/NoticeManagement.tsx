// NoticeManagement.tsx — WhiteBooks Notice Management product page.
// Themed against the WhiteBooks design system (src/styles/design-system-wb.css):
// all colors are CSS-variable tokens so the page adapts to both light & dark
// modes, and typography uses the Poppins display/body font variables.

import { useState } from 'react';
import {
  Zap,
  FolderOpen,
  BellRing,
  FileText,
  Users,
  BarChart3,
  Inbox,
  Clock,
  CalendarClock,
  CheckCircle2,
  Check,
  Plus,
} from 'lucide-react';
import { Header, Footer, FluidBackground } from '@/layouts/SiteShell';
import { ButtonLink } from '@/components/ui/Button';
import { LOGIN_URL } from '@/utils/contants';
import gstDashboard1 from '@/assets/product-images/gst-software/gst-dashboard-1.png';
import { SeoBreadcrumb } from '@/seo/components/SeoBreadcrumb';
import { BreadcrumbItem } from '@/types/pages';
import EyebrowPill from '@/components/ui/EyebrowPill';

/* ─── Data ─────────────────────────────────────────────────────────────────── */

interface Notice {
  id: string;
  type: 'GST' | 'Income Tax' | 'TDS';
  portal: string;
  title: string;
  gstin?: string;
  pan?: string;
  issued: string;
  due: string;
  status: 'Pending' | 'In Progress' | 'Replied' | 'Open';
  daysLeft: number | null;
  section: string;
  priority: 'high' | 'medium' | 'low';
}

const notices: Notice[] = [
  { id: 'GST-2024-0142', type: 'GST', portal: 'GSTN', title: 'GSTR-3B Mismatch Notice', gstin: '29AABCU9603R1ZX', issued: '12 Jun 2025', due: '02 Jul 2025', status: 'Pending', daysLeft: 8, section: 'Section 73', priority: 'high' },
  { id: 'IT-2024-0087', type: 'Income Tax', portal: 'ITD', title: 'Scrutiny Assessment — AY 2023-24', pan: 'AABCU9603R', issued: '01 Jun 2025', due: '15 Jul 2025', status: 'In Progress', daysLeft: 21, section: 'Section 143(2)', priority: 'medium' },
  { id: 'TDS-2024-0033', type: 'TDS', portal: 'TRACES', title: 'TDS Default Notice — Q2 FY24', pan: 'AABCU9603R', issued: '20 May 2025', due: '30 Jun 2025', status: 'Replied', daysLeft: null, section: 'Section 200A', priority: 'low' },
  { id: 'GST-2024-0143', type: 'GST', portal: 'GSTN', title: 'ITC Reversal — Rule 42', gstin: '29AABCU9603R1ZX', issued: '15 Jun 2025', due: '05 Jul 2025', status: 'Pending', daysLeft: 11, section: 'Rule 42/43', priority: 'high' },
  { id: 'IT-2024-0088', type: 'Income Tax', portal: 'ITD', title: 'High-Value Transaction — Form 26AS', pan: 'AABCU9603R', issued: '08 Jun 2025', due: '28 Jul 2025', status: 'Open', daysLeft: 34, section: 'Section 133(6)', priority: 'medium' },
];

const stats = [
  { label: 'Total Notices', value: '24', icon: Inbox, color: 'var(--text)' },
  { label: 'Pending Action', value: '8', icon: Clock, color: 'var(--warn)' },
  { label: 'Due This Week', value: '3', icon: CalendarClock, color: 'var(--danger)' },
  { label: 'Closed / Replied', value: '13', icon: CheckCircle2, color: 'var(--success)' },
];

const features = [
  {
    icon: Zap,
    title: 'Auto-fetch from portals',
    desc: 'WhiteBooks auto-syncs notices from GSTN, Income Tax (ITD), and TRACES. No manual login. Every new notice appears in your dashboard within hours.',
    tags: ['GSTN', 'ITD', 'TRACES'],
  },
  {
    icon: FolderOpen,
    title: 'Centralised notice repository',
    desc: 'All notices across all your GSTINs, PANs, and clients in one place. Filter by type, portal, status, date range, or assigned team member.',
    tags: ['Multi-GSTIN', 'Multi-PAN', 'Multi-client'],
  },
  {
    icon: BellRing,
    title: 'Smart deadline tracking',
    desc: 'Response due dates tracked automatically with priority flags. Get reminders via email, and sync deadlines directly to your Google or Outlook calendar.',
    tags: ['Email alerts', 'Calendar sync'],
  },
  {
    icon: FileText,
    title: 'Document management',
    desc: 'Attach notices, replies, orders, and supporting documents to each case. Full audit trail — every action timestamped and logged.',
    tags: ['PDF storage', 'Audit trail'],
  },
  {
    icon: Users,
    title: 'CA & team collaboration',
    desc: 'Assign notices to team members, set internal notes, and track who replied and when. Built for CA firms managing dozens of clients.',
    tags: ['Role-based access', 'Assignment'],
  },
  {
    icon: BarChart3,
    title: 'Compliance reporting',
    desc: 'Generate notice status reports for internal reviews or client updates. Export to PDF or share directly with stakeholders in a click.',
    tags: ['PDF export', 'Client reports'],
  },
];

type TabKey = 'GST' | 'Income Tax' | 'TDS';

const tabContent: Record<TabKey, {
  color: string;
  bg: string;
  headline: string;
  subline: string;
  points: string[];
  pill: string;
}> = {
  GST: {
    color: 'var(--brand)',
    bg: 'rgba(220,47,101,0.12)',
    headline: 'GST Notice Management',
    subline: 'Handle GSTR-3B mismatches, ITC reversals, scrutiny notices, and Section 73/74 demands — all pulled directly from the GSTN portal.',
    points: [
      'Auto-fetch from GSTN across all registered GSTINs',
      'Track Section 73, 74, Rule 42/43, and GSTR-9 notices',
      'ITC reconciliation discrepancy alerts',
      'Bulk notice download for multiple GSTINs in one click',
      'Deadline-based priority flagging with escalation alerts',
    ],
    pill: 'GST Portal (GSTN)',
  },
  'Income Tax': {
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.14)',
    headline: 'Income Tax Notice Management',
    subline: 'Manage scrutiny assessments, high-value transaction alerts, e-proceedings, and outstanding demands from the Income Tax portal.',
    points: [
      'Auto-sync from Income Tax Portal (ITD) via PAN',
      'Track Sec 142(1), 143(2), 133(6), 148, and 156 notices',
      'e-Proceedings dashboard with notice + response + final order',
      'Outstanding demand monitoring with interest accrual info',
      'Legal Heir notices tracked separately',
    ],
    pill: 'Income Tax Portal (ITD)',
  },
  TDS: {
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.16)',
    headline: 'TDS Notice Management',
    subline: 'Track TDS defaults, late filing notices, and deduction mismatches from TRACES — across multiple deductors and quarters.',
    points: [
      'Auto-fetch from TRACES by PAN/TAN',
      'Section 200A, 201, and TRACES default notices',
      'Quarter-wise mismatch tracking',
      'Bulk notice processing for high-volume deductors',
      'Automated reminders before response deadlines',
    ],
    pill: 'TRACES Portal',
  },
};

const faqs = [
  { q: 'How does WhiteBooks fetch notices automatically?', a: 'WhiteBooks uses your registered credentials (GST portal, ITD, TRACES) to pull notices on a scheduled basis. You authorise access once — WhiteBooks handles the rest, syncing new notices within hours of issuance.' },
  { q: 'Can I manage multiple GSTINs and clients from one account?', a: 'Yes. WhiteBooks is designed for CA firms and businesses with multiple registrations. Add all your GSTINs and PANs once; every notice flows into a single unified dashboard.' },
  { q: 'How do reminders and calendar sync work?', a: 'Every notice due date is tracked automatically. You receive email reminders as the deadline approaches, and can add any deadline to Google Calendar or Outlook with one click.' },
  { q: 'Is my data secure?', a: 'WhiteBooks is a GSP-licensed platform. All portal credentials are stored with AES-256 encryption. Notice PDFs and documents are stored in secure cloud storage with role-based access control.' },
  { q: 'Can my team members collaborate on notices?', a: 'Yes. You can assign notices to specific team members, add internal notes, and track every action in an audit log — with timestamps for who did what and when.' },
  { q: 'Does WhiteBooks support TDS notice management too?', a: 'Yes — WhiteBooks handles GST, Income Tax, and TDS notices from TRACES, all from the same dashboard. No need to log in to three portals separately.' },
];

// Status / type chips use translucent tints of saturated hues so they read on
// both light and dark surfaces without relying on solid pastel backgrounds.
const statusColors: Record<Notice['status'], { bg: string; text: string; dot: string }> = {
  Pending: { bg: 'rgba(245,158,11,0.14)', text: '#f59e0b', dot: '#f59e0b' },
  'In Progress': { bg: 'rgba(59,130,246,0.14)', text: '#3b82f6', dot: '#3b82f6' },
  Open: { bg: 'rgba(34,197,94,0.14)', text: '#22c55e', dot: '#22c55e' },
  Replied: { bg: 'rgba(148,163,184,0.16)', text: 'var(--muted-2)', dot: '#94a3b8' },
};

const typeColors: Record<Notice['type'], { bg: string; text: string }> = {
  GST: { bg: 'rgba(220,47,101,0.12)', text: 'var(--brand)' },
  'Income Tax': { bg: 'rgba(59,130,246,0.14)', text: '#3b82f6' },
  TDS: { bg: 'rgba(139,92,246,0.16)', text: '#8b5cf6' },
};

/* ─── Page ─────────────────────────────────────────────────────────────────── */
const wrap = "w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4";

export default function NoticeManagement() {
  const breadcrumb: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: "Softwares", href: "/softwares" },
    { label: "Notice Management", },
  ]
  const [activeTab, setActiveTab] = useState<TabKey>('GST');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [filter, setFilter] = useState<'All' | TabKey>('All');

  const filtered = filter === 'All' ? notices : notices.filter((n) => n.type === filter);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header mode="softwares" />

      <main className="font-[var(--font-body)] leading-relaxed text-[var(--text)]">
        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-[var(--line)] bg-[var(--bg-2)] pt-[70px] pb-[72px]">
          <FluidBackground />

          {breadcrumb && (
            <section style={{ paddingTop: 30, paddingBottom: 20 }}>
              <div className={wrap}>
                <SeoBreadcrumb items={breadcrumb} />
              </div>
            </section>
          )}
          <div className={`${wrap} relative z-[2]`}>
            <div className="grid grid-cols-[1.05fr_1fr] gap-10 items-end max-[1000px]:grid-cols-1">
              <div>
                {/* <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--brand-border)] bg-[var(--brand-soft)] px-[14px] py-1.5">
                  <span className="inline-block h-[7px] w-[7px] rounded-full bg-[var(--brand)]" />
                  <span className="text-xs font-medium tracking-[0.04em] text-[var(--brand)]">NEW FEATURE</span>
                </div> */}
                <EyebrowPill label="Notice Management" />

                <h1 className="font-[var(--font-display)] font-semibold leading-[1.05] tracking-[-0.025em] mb-0 max-w-[880px] text-balance"
                  style={{ fontSize: "clamp(32px, 4.5vw, 68px)" }}>
                  Never miss a<br />
                  <span className="text-[var(--brand)]">tax notice</span> again.
                </h1>
                <p className="m-0 mb-8 max-w-[460px] text-lg text-[var(--muted-2)]">
                  WhiteBooks auto-fetches GST, Income Tax, and TDS notices from government portals — tracks
                  deadlines, sends alerts, and keeps your entire team aligned.
                </p>
                <div className="flex flex-wrap gap-3">
                  <ButtonLink className="cursor-pointer rounded-lg border-none bg-[var(--brand)] px-7 py-[13px] text-[15px] font-medium text-white transition-colors hover:bg-[#e8447a]"
                    href={LOGIN_URL}>
                    Try Notice Management Free
                  </ButtonLink>
                </div>
                <p className="mt-4 text-[13px] text-[var(--muted)]">
                  No setup fees · Works with your existing WhiteBooks account
                </p>
              </div>

              {/* Live inbox preview */}
              <div className="mt-[10px] max-[1000px]:mt-0">
                <img
                  src={gstDashboard1}
                  alt="WhiteBooks Notice Inbox dashboard"
                  className="w-full rounded-2xl border border-[var(--line)] object-cover aspect-[1.62/1]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats bar ─────────────────────────────────────────────────────── */}
        <section className="border-b border-[var(--line)] bg-[var(--bg-2)]">
          <div className="mx-auto grid max-w-[1180px] grid-cols-2 px-8 lg:grid-cols-4">
            {stats.map((s, i) => {
              const StatIcon = s.icon;
              return (
                <div
                  key={i}
                  className={`px-4 py-6 text-center ${i < 3 ? 'lg:border-r lg:border-[var(--line)]' : ''}`}
                >
                  <div className="mb-1 flex justify-center">
                    <StatIcon size={20} style={{ color: s.color }} />
                  </div>
                  <div className="font-[var(--font-display)] text-[28px] font-semibold tracking-[-0.02em]" style={{ color: s.color }}>{s.value}</div>
                  <div className="mt-0.5 text-[13px] text-[var(--muted-2)]">{s.label}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Features grid ─────────────────────────────────────────────────── */}
        <section className="bg-[var(--bg)] py-20">
          <div className="mx-auto max-w-[1180px] px-8">
            <div className="mb-14 text-center">
              <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--brand)]">Full-stack notice management</p>
              <h2 className="m-0 mb-4 font-[var(--font-display)] text-4xl font-semibold tracking-[-0.025em] text-[var(--text)]">Everything your CA firm needs</h2>
              <p className="mx-auto max-w-[540px] text-[17px] text-[var(--muted-2)]">From auto-fetching to deadline tracking to response filing — WhiteBooks handles the full notice lifecycle.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => {
                const FeatureIcon = f.icon;
                return (
                  <div key={i} className="rounded-xl border border-[var(--line)] bg-[var(--bg-elev)] px-6 py-7 transition-colors hover:border-[var(--brand-border)]">
                    <div className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-[10px] bg-[var(--brand-soft)] text-[var(--brand)]">
                      <FeatureIcon size={22} />
                    </div>
                    <h3 className="m-0 mb-2.5 font-[var(--font-display)] text-base font-semibold text-[var(--text)]">{f.title}</h3>
                    <p className="m-0 mb-4 text-sm leading-[1.7] text-[var(--muted-2)]">{f.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {f.tags.map((t) => (
                        <span key={t} className="rounded bg-[var(--brand-soft)] px-[9px] py-[3px] text-[11px] font-semibold text-[var(--brand)]">{t}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Tabbed portal section ─────────────────────────────────────────── */}
        <section className="border-y border-[var(--line)] bg-[var(--bg-2)] py-20">
          <div className="mx-auto max-w-[1180px] px-8">
            <div className="mb-12 text-center">
              <h2 className="m-0 mb-3 font-[var(--font-display)] text-4xl font-semibold tracking-[-0.025em] text-[var(--text)]">One dashboard. Three portals.</h2>
              <p className="text-[17px] text-[var(--muted-2)]">GST, Income Tax, and TDS notices — managed from a single WhiteBooks screen.</p>
            </div>

            <div className="mx-auto mb-10 flex max-w-[420px] gap-0 rounded-[10px] border border-[var(--line)] bg-[var(--bg-3)] p-1">
              {(['GST', 'Income Tax', 'TDS'] as TabKey[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 rounded-lg border-none py-[9px] text-sm font-semibold transition-all ${activeTab === tab
                    ? 'bg-[var(--bg-elev)] text-[var(--text)] shadow-[0_1px_4px_rgba(0,0,0,0.12)]'
                    : 'bg-transparent text-[var(--muted)]'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {(Object.entries(tabContent) as [TabKey, (typeof tabContent)[TabKey]][]).map(([key, tc]) =>
              activeTab === key ? (
                <div key={key} className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                  <div>
                    <span
                      className="rounded px-2.5 py-1 text-[11px] font-bold tracking-[0.05em]"
                      style={{ background: tc.bg, color: tc.color }}
                    >
                      {tc.pill}
                    </span>
                    <h3 className="m-0 mb-3 mt-4 font-[var(--font-display)] text-[28px] font-semibold tracking-[-0.02em] text-[var(--text)]">{tc.headline}</h3>
                    <p className="mb-7 text-base text-[var(--muted-2)]">{tc.subline}</p>
                    <ul className="m-0 flex list-none flex-col gap-3 p-0">
                      {tc.points.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-[var(--text)]">
                          <span
                            className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                            style={{ background: tc.bg, color: tc.color }}
                          >
                            <Check size={11} strokeWidth={3} />
                          </span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Notice detail mock */}
                  <div className="overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--bg-elev)]">
                    <div className="flex items-center justify-between border-b border-[var(--line)] bg-[var(--bg-2)] px-5 py-3.5">
                      <span className="text-sm font-semibold text-[var(--text)]">Notice Detail</span>
                      <span className="rounded px-2.5 py-[3px] text-[11px] font-bold" style={{ background: tc.bg, color: tc.color }}>{key}</span>
                    </div>
                    <div className="p-5">
                      <div className="mb-1 text-[15px] font-bold text-[var(--text)]">{tc.headline.replace(' Management', ' — Q3 FY 2024-25')}</div>
                      <div className="mb-5 text-xs text-[var(--muted)]">{tc.pill}</div>
                      {([
                        ['Section', key === 'GST' ? 'Section 73' : key === 'Income Tax' ? 'Section 143(2)' : 'Section 200A'],
                        ['Issue Date', '12 Jun 2025'],
                        ['Due Date', '02 Jul 2025'],
                        ['Status', 'Pending Response'],
                        ['Assigned To', 'CA Priya Sharma'],
                      ] as [string, string][]).map(([label, val]) => (
                        <div key={label} className="flex justify-between border-b border-[var(--line)] py-2 text-[13px]">
                          <span className="text-[var(--muted)]">{label}</span>
                          <span className="font-medium text-[var(--text)]">{val}</span>
                        </div>
                      ))}
                      <div className="mt-5 flex gap-2.5">
                        <button className="flex-1 cursor-pointer rounded-md border-none py-[9px] text-[13px] font-semibold text-white" style={{ background: tc.color }}>View Notice PDF</button>
                        <button className="flex-1 cursor-pointer rounded-md border border-[var(--line)] bg-[var(--bg-2)] py-[9px] text-[13px] font-semibold text-[var(--text)]">File Response</button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </section>

        {/* ── Live notice table ─────────────────────────────────────────────── */}
        <section className="bg-[var(--bg)] py-20">
          <div className="mx-auto max-w-[1180px] px-8">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="m-0 mb-2 font-[var(--font-display)] text-[32px] font-semibold tracking-[-0.025em] text-[var(--text)]">Your notice inbox</h2>
                <p className="text-[15px] text-[var(--muted-2)]">Real-time view of notices across all registered GSTINs and PANs.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {(['All', 'GST', 'Income Tax', 'TDS'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`cursor-pointer rounded-md border px-3.5 py-[7px] text-[13px] font-medium transition-colors ${filter === f
                      ? 'border-[var(--brand)] bg-[var(--brand-soft)] text-[var(--brand)]'
                      : 'border-[var(--line)] bg-[var(--bg-elev)] text-[var(--muted)]'
                      }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[var(--line)]">
              <div className="min-w-[760px]">
                <div className="grid grid-cols-[1fr_2fr_1.2fr_1fr_1fr_1.2fr] gap-2 border-b border-[var(--line)] bg-[var(--bg-2)] px-5 py-3">
                  {['Notice ID', 'Notice Title', 'Section', 'Issued', 'Due Date', 'Status'].map((h) => (
                    <span key={h} className="text-[11px] font-bold uppercase tracking-[0.06em] text-[var(--muted)]">{h}</span>
                  ))}
                </div>
                {filtered.map((n, i) => {
                  const sc = statusColors[n.status];
                  const tc = typeColors[n.type];
                  return (
                    <div key={i} className="grid grid-cols-[1fr_2fr_1.2fr_1fr_1fr_1.2fr] items-center gap-2 border-b border-[var(--line)] bg-[var(--bg-elev)] px-5 py-3.5 last:border-b-0">
                      <div>
                        <div className="mb-0.5 text-xs font-semibold text-[var(--text)]">{n.id}</div>
                        <span className="rounded-[3px] px-1.5 py-0.5 text-[10px] font-bold" style={{ background: tc.bg, color: tc.text }}>{n.type}</span>
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold text-[var(--text)]">{n.title}</div>
                        <div className="text-[11px] text-[var(--muted)]">{n.gstin || n.pan}</div>
                      </div>
                      <div className="text-xs text-[var(--muted)]">{n.section}</div>
                      <div className="text-xs text-[var(--muted)]">{n.issued}</div>
                      <div>
                        <div className="text-xs font-semibold" style={{ color: n.daysLeft && n.daysLeft <= 10 ? 'var(--danger)' : 'var(--text)' }}>{n.due}</div>
                        {n.daysLeft && (
                          <div className="text-[10px] font-medium" style={{ color: n.daysLeft <= 10 ? 'var(--danger)' : 'var(--muted)' }}>{n.daysLeft}d left</div>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-[5px] rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: sc.bg, color: sc.text }}>
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: sc.dot }} />
                          {n.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── How it works ──────────────────────────────────────────────────── */}
        <section className="border-y border-[var(--line)] bg-[var(--bg-2)] py-20">
          <div className="mx-auto max-w-[1180px] px-8">
            <div className="mb-14 text-center">
              <h2 className="m-0 mb-3 font-[var(--font-display)] text-4xl font-semibold tracking-[-0.025em] text-[var(--text)]">Up and running in minutes</h2>
              <p className="text-[17px] text-[var(--muted-2)]">No complex setup. Add your credentials, and WhiteBooks does the rest.</p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { step: '01', title: 'Add your credentials', desc: 'Authorise WhiteBooks to access your GST, ITD, and TRACES portals. One-time setup per entity.' },
                { step: '02', title: 'Notices auto-sync', desc: 'WhiteBooks fetches all existing and new notices. PDFs, due dates, and section details — all populated automatically.' },
                { step: '03', title: 'Get alerts', desc: 'Receive email notifications the moment a new notice arrives. Deadlines sync to your calendar.' },
                { step: '04', title: 'Respond & close', desc: 'Attach replies, file responses, and mark notices as closed — full audit trail maintained for every action.' },
              ].map((s, i) => (
                <div key={i} className="rounded-xl border border-[var(--line)] bg-[var(--bg-elev)] px-6 py-7">
                  <div className="mb-3 font-[var(--font-display)] text-[32px] font-semibold leading-none text-[var(--brand)]">{s.step}</div>
                  <h3 className="m-0 mb-2.5 font-[var(--font-display)] text-base font-semibold text-[var(--text)]">{s.title}</h3>
                  <p className="m-0 text-sm leading-[1.7] text-[var(--muted-2)]">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section className="bg-[var(--bg)] py-20">
          <div className="mx-auto max-w-[760px] px-8">
            <div className="mb-12 text-center">
              <h2 className="m-0 mb-3 font-[var(--font-display)] text-4xl font-semibold tracking-[-0.025em] text-[var(--text)]">Frequently asked questions</h2>
              <p className="text-base text-[var(--muted-2)]">Everything you need to know about notice management in WhiteBooks.</p>
            </div>
            <div className="flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <div key={i} className="overflow-hidden rounded-[10px] border border-[var(--line)] bg-[var(--bg-elev)]">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className={`flex w-full cursor-pointer items-center justify-between gap-3 border-none px-5 py-[18px] transition-colors ${openFaq === i ? 'bg-[var(--bg-2)]' : 'bg-transparent'}`}
                  >
                    <span className="text-left text-[15px] font-semibold text-[var(--text)]">{faq.q}</span>
                    <Plus
                      size={18}
                      className="shrink-0 text-[var(--brand)] transition-transform"
                      style={{ transform: openFaq === i ? 'rotate(45deg)' : 'none' }}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="border-t border-[var(--line)] bg-[var(--bg-2)] px-5 py-[18px] text-sm leading-[1.75] text-[var(--muted-2)]">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section className="bg-[var(--brand)] px-8 py-20 text-center">
          <h2 className="m-0 mb-4 font-[var(--font-display)] text-[38px] font-semibold tracking-[-0.025em] text-white">Stop chasing notices. Start managing them.</h2>
          <p className="mx-auto mb-9 max-w-[520px] text-lg text-[rgba(255,255,255,0.85)]">
            WhiteBooks Notice Management works alongside your existing GST, e-Invoice, and accounting
            workflows — no new logins, no extra apps.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <button className="cursor-pointer rounded-lg border-none bg-white px-8 py-3.5 text-base font-semibold text-[var(--brand)] transition-transform hover:-translate-y-px">Get Started Free</button>
            <button className="cursor-pointer rounded-lg border-2 border-[rgba(255,255,255,0.6)] bg-transparent px-7 py-3.5 text-base font-semibold text-white transition-colors hover:border-white hover:bg-[rgba(255,255,255,0.1)]">Talk to Sales</button>
          </div>
          <p className="mt-5 text-[13px] text-[rgba(255,255,255,0.7)]">
            Already on WhiteBooks? Notice Management is available in your account under Compliance → Notices.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
