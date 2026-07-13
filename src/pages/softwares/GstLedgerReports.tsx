import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock,
  CreditCard,
  Database,
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  Fingerprint,
  History,
  Layers,
  ListChecks,
  RefreshCw,
  ShieldCheck,
  Table2,
  Wallet,
  WalletCards,
} from 'lucide-react';
import { BookDemoModal } from '@/components/modals/BookDemoModal';
import { Button, ButtonLink } from '@/shared/ui/Button';
import EyebrowPill from '@/shared/ui/EyebrowPill';
import { Header, Footer, Breadcrumb } from '@/layouts/SiteShell';
import { LOGIN_URL } from '@/utils/contants';

const ACCENT = '#dc2f65';
const wrap = 'mx-auto w-full max-w-[1240px] px-16 max-lg:px-10 max-md:px-6 max-sm:px-4';

type IconItem = {
  icon: LucideIcon;
  title: string;
  text: string;
};

function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-[#101828]">
      <Header mode="softwares" />
      <main className="font-[var(--font-body)]">{children}</main>
      <Footer />
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  text,
  align = 'left',
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-[760px] text-center' : 'max-w-[760px]'}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#dc2f65]">{eyebrow}</p>
      )}
      <h2 className="m-0 font-[var(--font-display)] text-[clamp(30px,3.4vw,44px)] font-semibold leading-[1.08] tracking-[-0.02em] text-[#101828]">
        {title}
      </h2>
      {text && <p className="mt-4 text-[17px] leading-[1.7] text-[#667085]">{text}</p>}
    </div>
  );
}

function PlaceholderLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-[#f2a7bf] bg-[#fff1f6] px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.08em] text-[#dc2f65]">
      {children}
    </div>
  );
}

function DashboardMockup() {
  const rows = [
    ['Cash payment', 'Debit', '18,450', 'Cash'],
    ['ITC adjusted', 'Credit', '42,100', 'Credit'],
    ['Liability posted', 'Debit', '31,880', 'Liability'],
  ];

  return (
    <div className="relative">
      {['Cash Ledger', 'Credit Ledger', 'Liability Ledger', 'Excel Export'].map((label, index) => (
        <div
          key={label}
          className={[
            'absolute z-10 hidden rounded-2xl border border-[#e5e7eb] bg-white px-4 py-3 text-sm font-semibold text-[#101828] shadow-[0_18px_40px_rgba(16,24,40,0.12)] lg:block',
            index === 0 ? '-left-10 top-10' : '',
            index === 1 ? '-right-8 top-20' : '',
            index === 2 ? '-left-6 bottom-20' : '',
            index === 3 ? 'right-8 -bottom-5' : '',
          ].join(' ')}
        >
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#dc2f65]" />
          {label}
        </div>
      ))}

      <div className="rounded-[28px] border border-[#e5e7eb] bg-white p-5 shadow-[0_28px_80px_rgba(16,24,40,0.14)]">
        <div className="mb-5 flex items-center justify-between border-b border-[#eef0f3] pb-4">
          <div>
            <p className="m-0 text-xs font-semibold uppercase tracking-[0.12em] text-[#98a2b3]">GST Ledger Command</p>
            <h3 className="m-0 mt-1 text-xl font-semibold text-[#101828]">Ledger Reports</h3>
          </div>
          <span className="rounded-full bg-[#ecfdf3] px-3 py-1 text-xs font-semibold text-[#027a48]">Synced</span>
        </div>

        <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1">
          {[
            ['Cash Ledger Balance', '₹8.42L'],
            ['ITC Available', '₹14.8L'],
            ['Liability Pending', '₹3.16L'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-[#edf0f3] bg-[#fafafa] p-4">
              <p className="m-0 text-[11px] font-medium text-[#667085]">{label}</p>
              <p className="m-0 mt-2 text-2xl font-semibold tracking-[-0.02em] text-[#101828]">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#fff1f6] px-4 py-3 text-sm">
          <span className="font-semibold text-[#dc2f65]">Last synced timestamp</span>
          <span className="font-medium text-[#475467]">02 Jul 2026, 10:42 AM</span>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-[#e5e7eb]">
          <div className="grid grid-cols-4 bg-[#f8f9fb] px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#667085]">
            <span>Description</span>
            <span>Movement</span>
            <span>Amount</span>
            <span>Type</span>
          </div>
          {rows.map((row) => (
            <div key={row.join('-')} className="grid grid-cols-4 border-t border-[#eef0f3] px-4 py-3 text-sm text-[#344054]">
              {row.map((cell, cellIndex) => <span key={`${cell}-${cellIndex}`}>{cell}</span>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroSection({ onDemo }: { onDemo: () => void }) {
  return (
    <section className="relative overflow-hidden bg-[#f8f9fb] pt-[70px]">
      <div className={`${wrap} py-8`}>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Softwares', href: '/softwares' }, { label: 'GST Ledger Reports' }]} />
      </div>
      <div className={`${wrap} grid grid-cols-[0.95fr_1.05fr] items-center gap-12 pb-24 pt-6 max-lg:grid-cols-1 max-md:pb-16`}>
        <div>
          <EyebrowPill label="GST Ledger Reports" />
          <h1 className="mt-5 max-w-[720px] font-[var(--font-display)] text-[clamp(32px,6vw,56px)] font-semibold leading-[1.04] tracking-[-0.025em] text-[#101828]">
            Track Every GST Ledger Without Guesswork
          </h1>
          <p className="mt-6 max-w-[620px] text-[18px] leading-[1.7] text-[#667085]">
            Monitor Cash Ledger, Input Tax Credit, Liability, transactions, timestamps, and exports from one audit-ready workspace.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={LOGIN_URL} size="lg" className="bg-[#dc2f65] hover:bg-[#c72759]">
              Start Free <ArrowRight size={16} />
            </ButtonLink>
            <Button onClick={onDemo} variant="outline" size="lg" className="border-[#dc2f65] text-[#dc2f65] hover:bg-[#dc2f65]">
              Book Demo
            </Button>
          </div>
        </div>
        <DashboardMockup />
      </div>
    </section>
  );
}

function LedgerCard({ icon: Icon, title, text }: IconItem) {
  return (
    <article className="rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_14px_36px_rgba(16,24,40,0.06)] transition-all duration-200 hover:-translate-y-1 hover:border-[#f2a7bf] hover:shadow-[0_20px_50px_rgba(16,24,40,0.1)]">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff1f6] text-[#dc2f65]">
        <Icon size={22} />
      </div>
      <h3 className="m-0 text-xl font-semibold tracking-[-0.01em] text-[#101828]">{title}</h3>
      <p className="m-0 mt-3 text-[15px] leading-[1.65] text-[#667085]">{text}</p>
    </article>
  );
}

function LedgerOverviewCards() {
  const cards: IconItem[] = [
    { icon: Wallet, title: 'Cash Ledger', text: 'Track deposits, GST payments, and running balances.' },
    { icon: CreditCard, title: 'Credit Ledger', text: 'Monitor available, used, and blocked input tax credit.' },
    { icon: FileText, title: 'Liability Ledger', text: 'View outstanding GST liability across tax components.' },
    { icon: Download, title: 'Export Reports', text: 'Download audit-ready ledger reports in Excel.' },
  ];

  return (
    <section className="bg-white py-24 max-md:py-16">
      <div className={wrap}>
        <SectionHeader
          align="center"
          eyebrow="Ledger overview"
          title="Every GST balance, surfaced clearly"
          text="Review the ledgers your finance team depends on without switching tabs, formats, or portals."
        />
        <div className="mt-12 grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {cards.map((card) => <LedgerCard key={card.title} {...card} />)}
        </div>
      </div>
    </section>
  );
}

function UnifiedDashboardSection() {
  return (
    <section className="bg-[#fafafa] py-24 max-md:py-16">
      <div className={`${wrap} grid grid-cols-2 items-center gap-14 max-lg:grid-cols-1`}>
        <div>
          <SectionHeader
            eyebrow="Unified workspace"
            title="One workspace for every GST balance"
            text="WhiteBooks brings Cash, Credit, and Liability ledgers together so finance teams can review balances, reconcile transactions, and prepare reports without jumping between portals."
          />
          <ul className="mt-8 grid gap-4 p-0">
            {[
              'View opening and closing balances',
              'Track transaction-wise debit and credit movement',
              'Filter by date, type, and tax period',
              'Verify GST components like IGST, CGST, SGST, and CESS',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-[16px] text-[#344054]">
                <CheckCircle2 className="mt-0.5 shrink-0 text-[#dc2f65]" size={20} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative rounded-[28px] border border-[#e5e7eb] bg-white p-6 shadow-[0_24px_70px_rgba(16,24,40,0.1)]">
          <div className="grid min-h-[360px] place-items-center rounded-[22px] border border-dashed border-[#d0d5dd] bg-[#f8f9fb] p-8">
            <PlaceholderLabel>[PLACEHOLDER: Ledger dashboard screenshot / redesigned UI mockup]</PlaceholderLabel>
          </div>
          {['Running Balance', 'Date Filter', 'Transaction Details'].map((label, index) => (
            <span
              key={label}
              className={[
                'absolute rounded-full border border-[#f2a7bf] bg-white px-4 py-2 text-xs font-semibold text-[#dc2f65] shadow-[0_14px_36px_rgba(16,24,40,0.1)]',
                index === 0 ? 'left-10 top-10' : '',
                index === 1 ? 'right-10 top-24' : '',
                index === 2 ? 'bottom-10 left-1/2 -translate-x-1/2' : '',
              ].join(' ')}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkflowStep({ step, title, active }: { step: string; title: string; active?: boolean }) {
  return (
    <div className="relative flex min-w-0 flex-1 flex-col items-center text-center max-md:flex-row max-md:items-start max-md:text-left">
      <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border text-sm font-semibold ${active ? 'border-[#dc2f65] bg-[#dc2f65] text-white' : 'border-[#e5e7eb] bg-white text-[#667085]'}`}>
        {step}
      </div>
      <h3 className="mt-4 text-base font-semibold text-[#101828] max-md:ml-4 max-md:mt-2">{title}</h3>
    </div>
  );
}

function WorkflowSection() {
  const steps = ['Transactions sync', 'Ledgers update', 'Reconcile balances', 'Export reports', 'Audit-ready records'];
  return (
    <section className="bg-white py-24 max-md:py-16">
      <div className={wrap}>
        <SectionHeader align="center" title="From GST transactions to audit-ready reports" />
        <div className="relative mt-14 flex items-start gap-4 max-md:flex-col max-md:gap-6">
          <div className="absolute left-[10%] right-[10%] top-6 h-px bg-[#e5e7eb] max-md:bottom-0 max-md:left-6 max-md:right-auto max-md:top-0 max-md:h-full max-md:w-px" />
          {steps.map((title, index) => (
            <WorkflowStep key={title} step={`0${index + 1}`} title={title} active={index === steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CashLedgerSection() {
  return (
    <section className="bg-[#f8f9fb] py-24 max-md:py-16">
      <div className={`${wrap} grid grid-cols-2 items-center gap-14 max-lg:grid-cols-1`}>
        <div className="rounded-[28px] border border-[#e5e7eb] bg-white p-6 shadow-[0_22px_60px_rgba(16,24,40,0.08)]">
          <PlaceholderLabel>[PLACEHOLDER: Cash Ledger UI preview]</PlaceholderLabel>
          <div className="mt-6 grid gap-3">
            {[
              ['Opening Balance', '₹4.28L'],
              ['Deposits', '₹2.10L'],
              ['GST Payments', '₹1.46L'],
              ['Closing Balance', '₹4.92L'],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between rounded-2xl bg-[#fafafa] px-5 py-4">
                <span className="text-sm font-medium text-[#667085]">{label}</span>
                <span className="text-lg font-semibold text-[#101828]">{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionHeader
            eyebrow="Cash Ledger"
            title="Cash Ledger visibility for every GST payment"
            text="Track cash deposits, tax payments, challans, and running balances in one clear view."
          />
          <ul className="mt-8 grid gap-4 p-0">
            {['Track GST cash payments', 'Verify deposits and challans', 'Review daily balance movement', 'Export cash ledger data'].map((item) => (
              <li key={item} className="flex items-center gap-3 text-[#344054]">
                <CheckCircle2 size={20} className="text-[#dc2f65]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function MetricCard({ label, value, icon: Icon }: { label: string; value: string; icon: LucideIcon }) {
  return (
    <div className="rounded-[22px] border border-[#e5e7eb] bg-white p-5 shadow-[0_14px_36px_rgba(16,24,40,0.06)]">
      <Icon size={20} className="mb-5 text-[#dc2f65]" />
      <p className="m-0 text-sm font-medium text-[#667085]">{label}</p>
      <p className="m-0 mt-2 text-3xl font-semibold tracking-[-0.02em] text-[#101828]">{value}</p>
    </div>
  );
}

function CreditLedgerSection() {
  const components = [
    ['IGST', '76%'],
    ['CGST', '58%'],
    ['SGST', '54%'],
    ['CESS', '28%'],
  ];

  return (
    <section className="bg-white py-24 max-md:py-16">
      <div className={wrap}>
        <SectionHeader align="center" eyebrow="Credit Ledger" title="Know exactly how much ITC is available" />
        <div className="mt-12 grid grid-cols-3 gap-5 max-md:grid-cols-1">
          <MetricCard label="Available ITC" value="₹14.8L" icon={WalletCards} />
          <MetricCard label="Used ITC" value="₹8.6L" icon={RefreshCw} />
          <MetricCard label="Blocked / Ineligible ITC" value="₹1.2L" icon={ShieldCheck} />
        </div>
        <div className="mt-8 rounded-[28px] border border-[#e5e7eb] bg-[#fafafa] p-6">
          <PlaceholderLabel>[PLACEHOLDER: Credit Ledger breakdown chart]</PlaceholderLabel>
          <div className="mt-6 grid gap-4">
            {components.map(([label, width]) => (
              <div key={label}>
                <div className="mb-2 flex justify-between text-sm font-semibold text-[#344054]">
                  <span>{label}</span>
                  <span>{width}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#e5e7eb]">
                  <div className="h-full rounded-full bg-[#dc2f65]" style={{ width }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LiabilityLedgerSection() {
  const rows = ['IGST', 'CGST', 'SGST', 'CESS', 'Interest / Penalty'];
  return (
    <section className="bg-[#fafafa] py-24 max-md:py-16">
      <div className={`${wrap} grid grid-cols-[0.9fr_1.1fr] items-center gap-14 max-lg:grid-cols-1`}>
        <div>
          <SectionHeader
            eyebrow="Liability Ledger"
            title="Stay ahead of GST liability before filing"
            text="Review outstanding tax liability across components before filing returns or making payments."
          />
        </div>
        <div className="rounded-[28px] border border-[#e5e7eb] bg-white p-6 shadow-[0_22px_60px_rgba(16,24,40,0.08)]">
          <PlaceholderLabel>[PLACEHOLDER: Liability Ledger report preview]</PlaceholderLabel>
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#e5e7eb]">
            {rows.map((row, index) => (
              <div key={row} className="grid grid-cols-[1fr_auto] border-b border-[#eef0f3] px-5 py-4 last:border-b-0">
                <span className="font-medium text-[#344054]">{row}</span>
                <span className={`font-semibold ${index === rows.length - 1 ? 'text-[#dc2f65]' : 'text-[#101828]'}`}>₹{['82,400', '44,210', '44,210', '5,720', '9,860'][index]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BentoCard({ icon: Icon, title, text, wide }: IconItem & { wide?: boolean }) {
  return (
    <article className={`rounded-[24px] border border-[#e5e7eb] bg-white p-6 shadow-[0_14px_36px_rgba(16,24,40,0.05)] transition-all hover:-translate-y-1 hover:border-[#f2a7bf] ${wide ? 'lg:col-span-2' : ''}`}>
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff1f6] text-[#dc2f65]">
        <Icon size={20} />
      </div>
      <h3 className="m-0 text-lg font-semibold text-[#101828]">{title}</h3>
      <p className="m-0 mt-2 text-sm leading-[1.6] text-[#667085]">{text}</p>
    </article>
  );
}

function BentoFeatureGrid() {
  const items = [
    { icon: BarChart3, title: 'Running Balance', text: 'Track opening, movement, and closing value.', wide: true },
    { icon: Filter, title: 'Date Filters', text: 'Review by period, day, or transaction window.' },
    { icon: History, title: 'Transaction History', text: 'Trace every debit and credit entry.' },
    { icon: Layers, title: 'Tax Component Split', text: 'Separate IGST, CGST, SGST, and CESS.' },
    { icon: FileSpreadsheet, title: 'Excel Export', text: 'Download structured XLS reports.' },
    { icon: Clock, title: 'Timestamped Records', text: 'Keep sync and update timing visible.' },
    { icon: Fingerprint, title: 'Audit Trail', text: 'Make review trails easier to verify.', wide: true },
    { icon: Table2, title: 'Summary + Detail View', text: 'Move from totals to transaction rows.' },
  ];

  return (
    <section className="bg-white py-24 max-md:py-16">
      <div className={wrap}>
        <SectionHeader align="center" title="Everything finance teams need for ledger reporting" />
        <div className="mt-12 grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {items.map((item) => <BentoCard key={item.title} {...item} />)}
        </div>
      </div>
    </section>
  );
}

function ReportPreview() {
  const rows = [
    ['02 Jul', 'GST cash payment', '₹42,000', '-', '₹8.42L', 'Cash'],
    ['01 Jul', 'ITC utilization', '-', '₹1.12L', '₹14.8L', 'Credit'],
    ['30 Jun', 'Liability posted', '₹86,400', '-', '₹3.16L', 'Liability'],
    ['29 Jun', 'Challan deposit', '-', '₹2.50L', '₹8.84L', 'Cash'],
  ];

  return (
    <section className="bg-[#f8f9fb] py-24 max-md:py-16">
      <div className={wrap}>
        <div className="rounded-[28px] border border-[#e5e7eb] bg-white p-6 shadow-[0_24px_70px_rgba(16,24,40,0.08)]">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <SectionHeader title="Export reports that are ready for review" />
            <button className="inline-flex items-center gap-2 rounded-lg border border-[#dc2f65] bg-[#dc2f65] px-4 py-2.5 text-sm font-semibold text-white">
              <Download size={16} /> Export XLS
            </button>
          </div>
          <PlaceholderLabel>[PLACEHOLDER: Real ledger export/report screenshot can be inserted here]</PlaceholderLabel>
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#e5e7eb]">
            <div className="overflow-x-auto">
              <div className="grid min-w-[720px] grid-cols-6 bg-[#f8f9fb] px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#667085]">
                {['Date', 'Description', 'Debit', 'Credit', 'Balance', 'Type'].map((head) => <span key={head}>{head}</span>)}
              </div>
              {rows.map((row, index) => (
                <div key={row.join('-')} className={`grid min-w-[720px] grid-cols-6 border-t border-[#eef0f3] px-5 py-4 text-sm text-[#344054] ${index > 1 ? 'opacity-55' : ''}`}>
                  {row.map((cell, cellIndex) => <span key={`${cell}-${cellIndex}`}>{cell}</span>)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustChecklist() {
  const items = ['Timestamp', 'Transaction type', 'Tax period', 'Reference number', 'Component-wise split', 'Running balance', 'Exportable record'];
  return (
    <section className="bg-white py-24 max-md:py-16">
      <div className={`${wrap} grid grid-cols-2 items-center gap-14 max-lg:grid-cols-1`}>
        <div>
          <SectionHeader
            eyebrow="Audit and trust"
            title="Audit-ready records, every time"
            text="Every ledger entry should be easy to verify, trace, and export when your finance team or CA needs it."
          />
          <div className="mt-8 grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            {items.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-[#e5e7eb] bg-[#fafafa] px-4 py-3 text-sm font-medium text-[#344054]">
                <CheckCircle2 size={18} className="text-[#dc2f65]" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="grid min-h-[420px] place-items-center rounded-[28px] border border-[#e5e7eb] bg-[#101828] p-8 shadow-[0_24px_70px_rgba(16,24,40,0.14)]">
          <ShieldCheck size={76} color={ACCENT} />
          <PlaceholderLabel>[PLACEHOLDER: Shield + ledger audit illustration]</PlaceholderLabel>
        </div>
      </div>
    </section>
  );
}

function ComparisonCard({ title, items, strong }: { title: string; items: string[]; strong?: boolean }) {
  return (
    <article className={`rounded-[28px] border p-7 ${strong ? 'border-[#f2a7bf] bg-[#fff1f6] shadow-[0_24px_70px_rgba(220,47,101,0.12)]' : 'border-[#e5e7eb] bg-white'}`}>
      <h3 className="m-0 text-2xl font-semibold tracking-[-0.01em] text-[#101828]">{title}</h3>
      <ul className="mt-6 grid gap-4 p-0">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[#344054]">
            <CheckCircle2 size={19} className={strong ? 'mt-0.5 text-[#dc2f65]' : 'mt-0.5 text-[#98a2b3]'} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function BeforeAfterSection() {
  return (
    <section className="bg-[#fafafa] py-24 max-md:py-16">
      <div className={wrap}>
        <div className="grid grid-cols-2 gap-6 max-lg:grid-cols-1">
          <ComparisonCard
            title="Without WhiteBooks"
            items={['Multiple GST portal checks', 'Manual Excel reconciliation', 'Missing transaction visibility', 'Difficult audit preparation', 'Time-consuming exports']}
          />
          <ComparisonCard
            strong
            title="With WhiteBooks"
            items={['Unified ledger workspace', 'Cash, Credit, and Liability in one place', 'Date-wise transaction history', 'Export-ready reports', 'Audit-friendly records']}
          />
        </div>
      </div>
    </section>
  );
}

function StatsBand() {
  const stats = [
    { value: '25,000+', label: 'Businesses' },
    { value: '30 Cr+', label: 'GST filings' },
    { value: '99.9%', label: 'Platform reliability' },
    { value: '8,000+', label: 'Cities served' },
  ];
  return (
    <section className="bg-[#101828] py-14 text-white">
      <div className={`${wrap} grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1`}>
        {stats.map((stat) => {
          return (
            <div key={stat.label} className="text-center">
              <p className="m-0 text-[clamp(30px,4vw,44px)] font-semibold tracking-[-0.02em]">{stat.value}</p>
              <p className="m-0 mt-2 text-sm font-medium text-white/70">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function FAQAccordion() {
  const [open, setOpen] = useState(0);
  const faqs = [
    ['What are GST ledger reports?', 'GST ledger reports summarize Cash Ledger, Credit Ledger, Liability Ledger, and transaction movement for review, reconciliation, and filing preparation.'],
    ['What is included in Cash Ledger?', 'Cash Ledger includes deposits, challans, GST payments, debit or credit movement, and running cash balance.'],
    ['What is Credit Ledger used for?', 'Credit Ledger helps teams monitor available, utilized, and blocked input tax credit across GST components.'],
    ['What is Liability Ledger?', 'Liability Ledger shows outstanding tax dues, interest, penalty, and component-wise liability before filing or payment.'],
    ['Can I export ledger reports?', 'Yes. WhiteBooks supports export-ready ledger reports for finance, CA, and audit review workflows.'],
    ['How does this help during audits?', 'Timestamped entries, reference numbers, component splits, and running balances make ledger records easier to verify and share.'],
  ];

  return (
    <section className="bg-white py-24 max-md:py-16">
      <div className="mx-auto max-w-[820px] px-8 max-sm:px-4">
        <SectionHeader align="center" title="Frequently asked questions" />
        <div className="mt-10 grid gap-3">
          {faqs.map(([question, answer], index) => (
            <div key={question} className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white">
              <button
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-semibold text-[#101828]"
                onClick={() => setOpen(open === index ? -1 : index)}
              >
                {question}
                <ChevronDown size={18} className={`shrink-0 text-[#dc2f65] transition-transform ${open === index ? 'rotate-180' : ''}`} />
              </button>
              {open === index && <div className="border-t border-[#eef0f3] px-5 py-5 text-[15px] leading-[1.7] text-[#667085]">{answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ onDemo }: { onDemo: () => void }) {
  return (
    <section className="bg-[#f8f9fb] px-6 pb-24 max-md:pb-16">
      <div className="mx-auto max-w-[1120px] overflow-hidden rounded-[28px] border border-[#e5e7eb] bg-[#dc2f65] p-10 text-center shadow-[0_24px_70px_rgba(220,47,101,0.18)] max-sm:p-7">
        <div className="mx-auto mb-8 max-w-[640px] rounded-2xl border border-white/30 bg-white/10 p-5">
          <PlaceholderLabel>[PLACEHOLDER: Soft ledger dashboard illustration behind CTA]</PlaceholderLabel>
        </div>
        <h2 className="mx-auto m-0 max-w-[760px] font-[var(--font-display)] text-[clamp(30px,4vw,44px)] font-semibold leading-[1.08] tracking-[-0.02em] text-white">
          Simplify GST ledger reconciliation with WhiteBooks
        </h2>
        <p className="mx-auto mt-4 max-w-[660px] text-[17px] leading-[1.7] text-white/85">
          Track balances, verify transactions, and export audit-ready reports from one workspace.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href={LOGIN_URL} variant="white" size="lg">Start Free</ButtonLink>
          <Button onClick={onDemo} variant="whiteOutline" size="lg">Talk to GST Expert</Button>
        </div>
      </div>
    </section>
  );
}

export default function GstLedgerReports() {
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = demoOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [demoOpen]);

  return (
    <PageWrapper>
      <HeroSection onDemo={() => setDemoOpen(true)} />
      <LedgerOverviewCards />
      <UnifiedDashboardSection />
      <WorkflowSection />
      <CashLedgerSection />
      <CreditLedgerSection />
      <LiabilityLedgerSection />
      <BentoFeatureGrid />
      <ReportPreview />
      <TrustChecklist />
      <BeforeAfterSection />
      <StatsBand />
      <FAQAccordion />
      <CTASection onDemo={() => setDemoOpen(true)} />
      {demoOpen && <BookDemoModal onClose={() => setDemoOpen(false)} />}
    </PageWrapper>
  );
}
