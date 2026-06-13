import React, { useEffect, useRef, useState } from 'react';
import { Header, Footer, HeroFluidBackground } from '@/layouts/SiteShell';
import { ButtonLink } from '@/components/ui/Button';
import EyebrowPill from '@/components/ui/EyebrowPill';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { FAQ } from '@/components/ui/FAQ';
import CodeBlock from '@/components/ui/CodeBlock';
import ClosingCTA from '@/components/ui/ClosingCTA';
import { Icon } from '@/components/icons/Icon';
import DpIcon from '@/pages/developer/DpIcon';
import { cn } from '@/lib/cn';
import './api-suite.css';
import '@/styles/hero.css';

/* ════════════════════════════════════════════════════════════════════════════
   WhiteBooks API Suite — enterprise redesign (enhanced visual layer)
   Built on the Whitebooks design system + scoped `aps-*` animation layer.
   All imagery uses <Placeholder/> / <BrowserFrame/> blocks — swap in real art.
   ════════════════════════════════════════════════════════════════════════════ */

const WRAP = 'w-full max-w-[1280px] mx-auto px-16 max-lg:px-10 max-md:px-6 max-sm:px-4';
const SECTION = 'relative border-b border-[var(--hairline)] py-24 max-md:py-16 max-sm:py-12';

/* ─── In-view hook + reveal wrappers ────────────────────────────────────────── */

function useInView<T extends HTMLElement>(opts?: IntersectionObserverInit) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      opts ?? { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView] as const;
}

function Reveal({
  className = '',
  stagger = false,
  style,
  children,
}: {
  className?: string;
  stagger?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} style={style} className={cn(stagger ? 'aps-stagger' : 'aps-reveal', inView && 'in', className)}>
      {children}
    </div>
  );
}

const stagIndex = (i: number) => ({ '--i': i } as React.CSSProperties);

/* ─── Animated count-up number ──────────────────────────────────────────────── */

function AnimatedNumber({ value, run }: { value: string; run: boolean }) {
  const m = value.match(/^([\d.,]+)(.*)$/);
  const numStr = m ? m[1] : value;
  const rest = m ? m[2] : '';
  const target = parseFloat(numStr.replace(/,/g, ''));
  const decimals = numStr.includes('.') ? numStr.split('.')[1]?.length ?? 0 : 0;
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!run || isNaN(target)) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1300;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);

  if (isNaN(target)) return <>{value}</>;
  const formatted = val.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return (
    <>
      {formatted}
      {rest}
    </>
  );
}

/* ─── Gradient icon tile ────────────────────────────────────────────────────── */

function IconTile({ children, size = 'md' }: { children: React.ReactNode; size?: 'sm' | 'md' | 'lg' }) {
  const dims = size === 'lg' ? 'w-12 h-12 rounded-[12px]' : size === 'sm' ? 'w-9 h-9 rounded-[8px]' : 'w-11 h-11 rounded-[10px]';
  return (
    <span
      className={cn(
        'shrink-0 inline-flex items-center justify-center text-[var(--brand)] ring-1 ring-[rgba(220,47,101,0.22)]',
        'bg-[linear-gradient(140deg,rgba(220,47,101,0.20),rgba(255,168,120,0.10))]',
        dims,
      )}
      aria-hidden
    >
      {children}
    </span>
  );
}

/* ─── Image placeholder ─────────────────────────────────────────────────────── */

function Placeholder({ label, className = '', ratio = '16 / 10' }: { label: string; className?: string; ratio?: string }) {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-[14px] border border-dashed border-[var(--hairline-strong)] bg-[var(--bg-2)]',
        className,
      )}
      style={{ aspectRatio: ratio }}
      aria-label={`${label} (image placeholder)`}
    >
      <div className="absolute inset-0 [background:repeating-linear-gradient(135deg,transparent,transparent_10px,rgba(220,47,101,0.04)_10px,rgba(220,47,101,0.04)_20px)]" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6">
        <IconTile size="sm">
          <Icon.Box width={18} height={18} />
        </IconTile>
        <span className="[font-family:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--fg-tertiary)]">
          {label}
        </span>
      </div>
    </div>
  );
}

/* ─── Browser chrome frame (wraps a screenshot placeholder) ─────────────────── */

function BrowserFrame({ label, url = 'app.whitebooks.in', ratio = '16 / 10', className = '' }: { label: string; url?: string; ratio?: string; className?: string }) {
  return (
    <div className={cn('glass glass-hover rounded-[16px] overflow-hidden aps-grad-border', className)}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--hairline)]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]/70" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]/70" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]/70" />
        <span className="ml-3 flex-1 truncate rounded-[6px] bg-[var(--bg)]/60 px-3 py-1 [font-family:var(--font-mono)] text-[11px] text-[var(--fg-tertiary)]">
          {url}
        </span>
      </div>
      <div className="p-3">
        <Placeholder label={label} ratio={ratio} className="!border-solid" />
      </div>
    </div>
  );
}

/* ─── Section heading (two-column) ──────────────────────────────────────────── */

function SectionHead({ num, label, title, body }: { num: string; label: string; title: React.ReactNode; body?: React.ReactNode }) {
  return (
    <Reveal className="grid grid-cols-1 gap-3 items-end mb-12 max-md:mb-9 md:grid-cols-[1.3fr_0.7fr] md:gap-16">
      <div>
        <SectionLabel num={num}>{label}</SectionLabel>
        <h2 className="mt-5 font-serif font-semibold text-[clamp(28px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] m-0 max-w-[820px] text-balance">
          {title}
        </h2>
      </div>
      {body && (
        <p className="text-[15px] md:text-[17px] text-[var(--fg-secondary)] leading-[1.6] m-0 md:max-w-[460px] md:justify-self-end">
          {body}
        </p>
      )}
    </Reveal>
  );
}

/* ─── Check row + feature card ──────────────────────────────────────────────── */

function Check() {
  return (
    <span className="shrink-0 inline-flex w-5 h-5 mt-px items-center justify-center rounded-full bg-[var(--brand-soft)] text-[var(--brand)] text-[11px] ring-1 ring-[rgba(220,47,101,0.18)]">
      ✓
    </span>
  );
}

function FeatureCard({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="aps-glow aps-shine group flex items-start gap-3 p-5 rounded-[14px] border border-[var(--brand-border)] bg-[var(--bg-2)]">
      <IconTile size="sm">{icon}</IconTile>
      <span className="text-[14px] text-[var(--fg-secondary)] leading-[1.5] pt-[6px]">{children}</span>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   HERO
   ════════════════════════════════════════════════════════════════════════════ */

const AI_ENGINES = ['ChatGPT', 'Perplexity', 'Claude', 'Gemini', 'Copilot'];

function HeroSection() {
  return (
    <section className="relative bg-[var(--bg-2)] pt-[9rem] pb-28 max-md:pb-16 overflow-hidden border-b border-[var(--hairline)]">
      <HeroFluidBackground variant="right" gradientOpacity={0.5} />
      <div className="aps-aurora" />
      <div className="absolute inset-0 aps-dotgrid opacity-60 pointer-events-none" />

      <div className={cn('relative z-10', WRAP)}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-16 max-lg:gap-12 items-center">
          {/* Copy column */}
          <div className="aps-reveal in">
            <EyebrowPill label="GST Suvidha Provider" subtitle="ISO 27001 Certified" />
            <h1 className="font-display font-semibold text-[clamp(34px,4.4vw,64px)] leading-[1.05] tracking-[-0.03em] mt-6 text-[var(--text)]">
              Enterprise-grade GST, e-Invoice &amp;{' '}
              <span className="aps-grad-text">e-Way Bill APIs.</span>
            </h1>
            <p className="[font-family:var(--font-mono)] text-[12px] tracking-[0.08em] uppercase text-[var(--fg-tertiary)] mt-6">
              GST · e-Invoice · e-Way Bill · Vendor Intelligence · Reconciliation
            </p>
            <p className="mt-5 text-[17px] max-sm:text-[15px] text-[var(--fg-secondary)] leading-[1.6] max-w-[560px]">
              GST APIs, e-Invoice APIs, and e-Way Bill APIs — secure, scalable, and developer-friendly. Built on a direct
              GSP license from GSTN.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="https://accounts.whitebooks.in/signup?type=Developer" size="lg" arrow>
                Get API Access
              </ButtonLink>
              <ButtonLink href="/developer/gst-api" size="lg" variant="ghost">
                View Documentation
              </ButtonLink>
              <ButtonLink href="#demos" size="lg" variant="ghost">
                See Live Demo
              </ButtonLink>
            </div>

            {/* AI query row */}
            <div className="mt-9 flex flex-wrap items-center gap-2">
              <span className="[font-family:var(--font-mono)] text-[11px] uppercase tracking-[0.12em] text-[var(--fg-tertiary)] mr-1">
                Ask an AI engine
              </span>
              {AI_ENGINES.map((e) => (
                <a
                  key={e}
                  href="#"
                  className="px-3 py-1.5 rounded-full border border-[var(--hairline-strong)] bg-[var(--bg)]/40 text-[12px] text-[var(--fg-secondary)] no-underline transition-all hover:-translate-y-0.5 hover:border-[rgba(220,47,101,0.5)] hover:text-[var(--brand)]"
                >
                  {e}
                </a>
              ))}
            </div>

            {/* Inline trust badges */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              {[
                { k: '99.99%', v: 'uptime SLA' },
                { k: 'Sub-200ms', v: 'IRN p50' },
                { k: '25,000+', v: 'businesses' },
              ].map((s) => (
                <div key={s.v} className="flex items-baseline gap-1.5">
                  <span className="font-serif font-semibold text-[18px] text-[var(--text)] tracking-[-0.01em]">{s.k}</span>
                  <span className="[font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.1em] text-[var(--fg-tertiary)]">
                    {s.v}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual column — floating glass composition */}
          <div className="relative">
            <div className="animate-float-slow">
              <BrowserFrame label="API dashboard screenshot" url="app.whitebooks.in/dashboard" ratio="16 / 11" />
            </div>

            {/* Floating live IRN chip */}
            <div className="absolute -left-4 max-sm:left-0 top-8 glass rounded-[12px] px-4 py-3 animate-float-d2 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.4)]">
              <div className="flex items-center gap-2">
                <span className="aps-ping inline-flex w-2 h-2 rounded-full bg-[#28c840]" />
                <span className="[font-family:var(--font-mono)] text-[11px] text-[var(--fg-secondary)]">200 OK · 182ms</span>
              </div>
              <div className="mt-1 [font-family:var(--font-mono)] text-[12px] text-[var(--text)]">IRN a4f2c91e8b7d…</div>
            </div>

            {/* Floating mini stat card */}
            <div className="absolute -right-4 max-sm:right-0 -bottom-6 glass rounded-[12px] px-4 py-3 animate-float-d4 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.4)]">
              <div className="font-serif font-semibold text-[22px] text-[var(--text)] tracking-[-0.02em]">9 Cr+</div>
              <div className="[font-family:var(--font-mono)] text-[10px] uppercase tracking-[0.1em] text-[var(--fg-tertiary)]">
                IRNs / year
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   METRICS STRIP (animated count-up)
   ════════════════════════════════════════════════════════════════════════════ */

const METRICS = [
  { v: '25,000+', l: 'Active Clients' },
  { v: '9 Cr+', l: 'e-Invoices Generated' },
  { v: '7 Cr+', l: 'e-Way Bills Generated' },
  { v: '30 Cr+', l: 'GST Filings' },
  { v: '95%+', l: 'Customer Retention' },
  { v: '4.9/5', l: 'Average Rating' },
];

function MetricsSection() {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <section className="relative border-b border-[var(--hairline)] py-16 max-sm:py-12 overflow-hidden">
      <div className="absolute inset-x-0 top-0 aps-rule" />
      <div className={WRAP}>
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-6">
          {METRICS.map((m) => (
            <div key={m.l} className="group relative">
              <div className="font-serif font-semibold text-[clamp(26px,3vw,38px)] tracking-[-0.02em] text-[var(--text)]">
                <AnimatedNumber value={m.v} run={inView} />
              </div>
              <div className="mt-1 [font-family:var(--font-mono)] text-[11px] uppercase tracking-[0.1em] text-[var(--fg-tertiary)]">
                {m.l}
              </div>
              <div className="mt-3 h-px w-10 bg-[linear-gradient(90deg,var(--brand),transparent)] transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   LOGO WALL (marquee)
   ════════════════════════════════════════════════════════════════════════════ */

const LOGOS_A = ['P&G', 'KIA', 'IBM', 'Unilever', 'KPMG', 'Coca-Cola', 'Razorpay', 'Odoo', 'Protiviti', 'SBI', 'INOX'];
const LOGOS_B = ['WheelsEye', 'Accenture', 'Yamaha', 'PharmEasy', 'Cars24', 'TVS', 'Philips', 'Aditya Birla', 'PepsiCo', 'EaseMyTrip', 'Grant Thornton'];

function LogoChip({ name }: { name: string }) {
  return (
    <div className="mx-2 flex items-center justify-center h-[68px] min-w-[150px] px-6 rounded-[12px] border border-[var(--hairline)] bg-[var(--bg-2)] text-[var(--fg-tertiary)] text-[14px] font-medium transition-colors hover:text-[var(--fg-primary)] hover:border-[var(--hairline-strong)]">
      {name}
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="aps-marquee-mask">
      <div className={cn('aps-marquee', reverse && 'aps-marquee--rev')}>
        {doubled.map((n, i) => (
          <LogoChip key={`${n}-${i}`} name={n} />
        ))}
      </div>
    </div>
  );
}

function LogoWallSection() {
  return (
    <section className={SECTION}>
      <div className={WRAP}>
        <p className="text-center [font-family:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--fg-tertiary)] mb-10">
          Trusted by 25,000+ businesses — from compliance-first startups to global enterprises
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <MarqueeRow items={LOGOS_A} />
        <MarqueeRow items={LOGOS_B} reverse />
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   DEVELOPER INTEGRATION (+ code block)
   ════════════════════════════════════════════════════════════════════════════ */

const DEV_BADGES = ['GSP Licensed', '99.99% uptime', 'Sandbox + Production', 'Java / Node.js / Python SDKs', 'Enterprise SLAs', 'AI-Ready', 'Secure & Scalable'];
const DEV_DOCS = ['Comprehensive API Documentation', 'Sandbox Environment', 'Multiple Language SDKs', 'Error Codes & Diagnostics', 'Postman Collections', 'Webhook Events', 'OAuth 2.0 & IP Restrictions'];

function DeveloperSection() {
  return (
    <section className={SECTION}>
      <div className={WRAP}>
        <SectionHead
          num="01"
          label="Developer Experience"
          title="Developer-friendly integration, GSP-certified gateway."
          body="India's GSP-certified gateway for tax compliance. Public OpenAPI 3.0 specs, Java / Node.js / Python SDKs, free sandbox, 99.99% uptime SLA. Integrate in hours."
        />

        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 items-start">
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-8">
              {DEV_BADGES.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--brand-soft)] text-[var(--brand)] [font-family:var(--font-mono)] text-[11px] tracking-[0.02em] ring-1 ring-[rgba(220,47,101,0.14)]"
                >
                  {b}
                </span>
              ))}
            </div>
            <ul className="flex flex-col">
              {DEV_DOCS.map((d) => (
                <li key={d} className="flex items-center gap-3 py-3.5 border-b border-[var(--hairline)] text-[15px] text-[var(--fg-secondary)]">
                  <Check />
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="aps-grad-border rounded-[16px]">
            <CodeBlock
              samples={{
                node: `<span class="kw">import</span> { WhiteBooks } <span class="kw">from</span> <span class="str">'@whitebooks/sdk'</span>;

<span class="kw">const</span> wb = <span class="kw">new</span> <span class="fn">WhiteBooks</span>({
  apiKey: process.env.WHITEBOOKS_KEY,
  env:    <span class="str">'sandbox'</span>,
});

<span class="kw">const</span> { irn, qr_code } = <span class="kw">await</span> wb.einvoice.<span class="fn">generate</span>({
  supplier_gstin: <span class="str">'29AAACR5055K1Z5'</span>,
  autoSubmit:     <span class="kw">true</span>,
});`,
                python: `<span class="kw">from</span> whitebooks <span class="kw">import</span> WhiteBooks

wb = <span class="fn">WhiteBooks</span>(api_key=os.environ[<span class="str">'WHITEBOOKS_KEY'</span>])

result = wb.einvoice.<span class="fn">generate</span>(
    supplier_gstin=<span class="str">'29AAACR5055K1Z5'</span>,
    auto_submit=<span class="kw">True</span>,
)
print(result.irn, result.qr_code)`,
                curl: `<span class="com"># 1. fetch an OAuth 2.0 bearer token</span>
<span class="kw">curl</span> -X POST https://api.whitebooks.in/oauth/token \\
  -d <span class="str">'grant_type=client_credentials'</span>

<span class="com"># 2. generate an IRN</span>
<span class="kw">curl</span> https://api.whitebooks.in/einvoice/api/v1/irn/generate \\
  -H <span class="str">"Authorization: Bearer $TOKEN"</span> \\
  -d <span class="str">'{ "supplier_gstin": "29AAACR5055K1Z5" }'</span>`,
              }}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   PRODUCT SECTIONS — GST / e-Invoice / e-Way Bill
   ════════════════════════════════════════════════════════════════════════════ */

interface ProductBlock {
  num: string;
  label: string;
  title: string;
  desc: string;
  cta: { text: string; href: string };
  features: string[];
  icon: React.ReactNode;
  url: string;
  reverse?: boolean;
}

const PRODUCTS: ProductBlock[] = [
  {
    num: '02',
    label: 'GST APIs',
    title: 'Simplify your GST filing & reconciliation.',
    desc: 'Automate monthly GST compliance with filing, reconciliation, and real-time validation.',
    cta: { text: 'Explore GST APIs', href: '/apis/gst' },
    icon: <Icon.GstApi width={22} height={22} />,
    url: 'app.whitebooks.in/gst',
    features: [
      'File GSTR-1, GSTR-3B, GSTR-9 via API',
      'Auto ITC matching from GSTR-2B',
      'Secure, compliant, and audit-ready',
      'GST Number Search (public APIs)',
      'Generate / cancel IRNs via e-Invoice APIs',
      'Real-time signed JSON & QR code retrieval',
      'Auto-push to accounting / ERP platforms',
      'Bulk IRN support for high-volume orgs',
    ],
  },
  {
    num: '03',
    label: 'e-Invoice APIs',
    title: 'Seamless e-Invoicing at scale.',
    desc: 'Generate IRNs, QR codes, and digitally signed invoices directly from your ERP.',
    cta: { text: 'Try e-Invoice APIs', href: '/apis/e-invoice' },
    icon: <Icon.EInvoice width={22} height={22} />,
    url: 'app.whitebooks.in/e-invoice',
    reverse: true,
    features: [
      'Generate & cancel IRNs in milliseconds',
      'Digitally signed JSON + QR code retrieval',
      'Direct IRP integration, no middleware',
      'Bulk IRN endpoints for billing systems',
      'Auto-retry on IRP outages',
      'Webhook on successful generation',
      '30-day reporting window enforced',
      'Sub-200ms p50 latency',
    ],
  },
  {
    num: '04',
    label: 'e-Way Bill APIs',
    title: 'Automate e-Way Bill generation and management.',
    desc: 'From invoice to shipment, streamline your logistics with real-time e-Way Bill APIs.',
    cta: { text: 'Get e-Way Bill API Access', href: '/apis/e-way-bill' },
    icon: <Icon.EWayBill width={22} height={22} />,
    url: 'app.whitebooks.in/e-way-bill',
    features: [
      'Create, update, cancel or extend e-Way Bills',
      'Sync with invoice & transport details',
      'Alerts for expiring bills',
      'Support for transporters, consignors & consignees',
      'Auto-populate from existing IRN',
      'Part-B vehicle updates via API',
      'Webhooks 4h before expiry',
      'Direct NIC integration',
    ],
  },
];

function ProductSection({ block }: { block: ProductBlock }) {
  const visual = (
    <Reveal className="relative">
      <div className="absolute -inset-6 aps-aurora !blur-[70px] !opacity-30" />
      <div className="relative animate-float-slow">
        <BrowserFrame label={`${block.label} preview`} url={block.url} ratio="16 / 11" />
      </div>
      <div className="relative mt-4 inline-flex w-fit items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-soft)] text-[var(--brand)] ring-1 ring-[rgba(220,47,101,0.16)]">
        {block.icon}
        <span className="[font-family:var(--font-mono)] text-[11px] uppercase tracking-[0.1em]">{block.label}</span>
      </div>
    </Reveal>
  );

  const copy = (
    <Reveal stagger>
      <div style={stagIndex(0)}>
        <SectionLabel num={block.num}>{block.label}</SectionLabel>
      </div>
      <h2 style={stagIndex(1)} className="mt-5 font-serif font-semibold text-[clamp(26px,3.4vw,40px)] leading-[1.1] tracking-[-0.02em] m-0 max-w-[520px] text-balance">
        {block.title}
      </h2>
      <p style={stagIndex(2)} className="mt-5 text-[16px] text-[var(--fg-secondary)] leading-[1.6] max-w-[520px]">
        {block.desc}
      </p>
      <div style={stagIndex(3)} className="mt-7">
        <ButtonLink href={block.cta.href} arrow>
          {block.cta.text}
        </ButtonLink>
      </div>
      <div style={stagIndex(4)} className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {block.features.map((f) => (
          <div key={f} className="flex items-start gap-2.5 text-[14px] text-[var(--fg-secondary)] leading-[1.45]">
            <Check />
            {f}
          </div>
        ))}
      </div>
    </Reveal>
  );

  return (
    <section className={SECTION}>
      <div className={WRAP}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 max-lg:gap-12 items-center">
          {block.reverse ? (
            <>
              <div className="max-lg:order-2">{visual}</div>
              <div className="max-lg:order-1">{copy}</div>
            </>
          ) : (
            <>
              {copy}
              {visual}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   ENTERPRISE ARCHITECTURE / SECURITY
   ════════════════════════════════════════════════════════════════════════════ */

const SECURITY = ['TLS 1.2+, OAuth 2.0, IP restrictions', '99.99% uptime SLA', 'Role-based access for teams', 'Multi-region deployment with auto-scaling', 'Detailed logs and immutable audit trail'];
const INFRA = [
  'Encrypted API communication (TLS 1.2+)',
  'Token-based authentication (OAuth 2.0)',
  'Role-based access controls',
  'Audit logging (immutable, 7-year retention)',
  'Retry & queue mechanisms',
  'High availability (multi-AZ active-active)',
  'Continuous monitoring (24×7 NOC)',
  'Secure cloud infrastructure (ISO 27001)',
  'Disaster recovery (RPO < 5 min)',
  'Production-grade deployment pipelines',
];

function ArchitectureSection() {
  return (
    <section className={cn(SECTION, 'overflow-hidden')}>
      <div className="aps-aurora !opacity-25" />
      <div className={cn('relative', WRAP)}>
        <SectionHead
          num="05"
          label="Enterprise-Grade Architecture"
          title="Production-grade GST APIs — built for scale, speed, and compliance."
          body="Our platform serves enterprises with high volumes, critical compliance needs, and secure data practices."
        />
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <Reveal stagger className="flex flex-col gap-3">
            {SECURITY.map((s, i) => (
              <div
                key={s}
                style={stagIndex(i)}
                className="aps-glow flex items-center gap-3 p-4 rounded-[14px] border border-[var(--brand-border)] bg-[var(--bg-2)]"
              >
                <IconTile size="sm">
                  <Icon.Seal width={18} height={18} />
                </IconTile>
                <span className="text-[15px] text-[var(--fg-primary)]">{s}</span>
              </div>
            ))}
            <div className="mt-3">
              <ButtonLink href="https://accounts.whitebooks.in/signup?type=Developer" arrow>
                Try our WhiteBooks APIs
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal className="aps-grad-border glass rounded-[16px] p-8 max-sm:p-6">
            <div className="[font-family:var(--font-mono)] text-[11px] uppercase tracking-[0.12em] text-[var(--fg-tertiary)] mb-5">
              Infrastructure highlights
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {INFRA.map((i) => (
                <div key={i} className="flex items-start gap-2.5 text-[14px] text-[var(--fg-secondary)] leading-[1.45]">
                  <Check />
                  {i}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   DEVELOPER EXPERIENCE TOOLS GRID
   ════════════════════════════════════════════════════════════════════════════ */

const DEV_TOOLS = [
  'Swagger (OpenAPI 3.0) specs',
  'Java SDK',
  'Node.js SDK',
  'Python SDK',
  'Sandbox with real-time validation',
  'Smart error codes + debugging hints',
  'Versioned APIs, backward compatible',
  'Live dashboard for usage & issues',
  'Postman collections',
];

function DevToolsSection() {
  return (
    <section className={SECTION}>
      <div className={WRAP}>
        <SectionHead
          num="06"
          label="Developer Experience"
          title="Built for developers. Backed by tools."
          body="Get up and running in hours with complete documentation, sandbox access, and live support."
        />
        <Reveal stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEV_TOOLS.map((t, i) => (
            <div key={t} style={stagIndex(i)}>
              <FeatureCard icon={<Icon.Code width={18} height={18} />}>{t}</FeatureCard>
            </div>
          ))}
        </Reveal>
        <div className="mt-9">
          <ButtonLink href="/developer/gst-api" arrow>
            Access developer portal
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   INTEGRATION PARTNERS
   ════════════════════════════════════════════════════════════════════════════ */

const ERP_LOGOS = ['SAP', 'Oracle', 'Dynamics', 'Marg', 'Tally', 'Odoo'];
const INTEGRATION_CATS = ['POS, ASP solutions & other integrations', 'Integration with all ERPs', 'All accounting software & platforms'];

function PartnersSection() {
  return (
    <section className={SECTION}>
      <div className={WRAP}>
        <SectionHead
          num="07"
          label="Use Cases & Integration Partners"
          title="Trusted by platforms, ERPs, and fintechs."
          body="Serving businesses across India and beyond — from compliance-first startups to global enterprises."
        />
        <Reveal stagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {ERP_LOGOS.map((l, i) => (
            <div
              key={l}
              style={stagIndex(i)}
              className="aps-glow aps-shine flex items-center justify-center h-[96px] rounded-[14px] border border-[var(--hairline)] bg-[var(--bg-2)] text-[var(--fg-secondary)] text-[16px] font-semibold"
            >
              {l}
            </div>
          ))}
        </Reveal>
        <Reveal stagger className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {INTEGRATION_CATS.map((c, i) => (
            <div key={c} style={stagIndex(i)}>
              <FeatureCard icon={<Icon.Box width={18} height={18} />}>{c}</FeatureCard>
            </div>
          ))}
        </Reveal>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="#" arrow>
            Other ERP integrations
          </ButtonLink>
          <ButtonLink href="https://accounts.whitebooks.in/signup?type=Developer" variant="ghost">
            Try our WhiteBooks APIs
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   INDUSTRY USE CASES
   ════════════════════════════════════════════════════════════════════════════ */

const INDUSTRIES = [
  { n: 'Logistics', d: 'EWB at scale, transporter sync, vehicle updates' },
  { n: 'Retail', d: 'High-volume POS IRN + GSTR-1 auto-filing' },
  { n: 'Manufacturing', d: 'Multi-GSTIN, branch-wise reconciliation' },
  { n: 'Fintech', d: 'GSTIN verify, vendor risk, KYC enrichment' },
  { n: 'Pharma', d: 'Distributor EWB, batch + expiry compliance' },
  { n: 'E-Commerce', d: 'Marketplace IRN, TCS, returns reconciliation' },
  { n: 'SaaS', d: 'Embedded GST automation in vertical SaaS' },
  { n: 'CA Firms', d: 'Multi-client GSTR-1 / 3B / 9 batch filing' },
  { n: 'ERP Providers', d: 'White-label GSP gateway for SAP / Oracle / Tally' },
  { n: 'Hospitality', d: 'Hotels, QSR — sub-100ms POS IRN at counter throughput' },
  { n: 'Healthcare', d: 'Hospitals, clinics — exempt vs taxable splits' },
  { n: 'Banking', d: 'Banks, NBFCs — fee GST, RCM automation' },
  { n: 'Insurance', d: 'Policy-level IRN, claim reverse-IRN' },
  { n: 'Real Estate', d: 'Developers + brokers — RERA-aware GST' },
  { n: 'Automotive', d: 'OEMs + dealers — vehicle IRN, EWB, dealer DMS' },
  { n: 'Telecom', d: 'Telcos, ISPs — high-volume monthly subscriber IRN' },
  { n: 'Media', d: 'Print, OTT, digital — GST on subscriptions + ads' },
  { n: 'Energy & Utilities', d: 'Power, gas, water — bulk subscriber IRN + RCM' },
];

function IndustriesSection() {
  return (
    <section className={SECTION}>
      <div className={WRAP}>
        <SectionHead
          num="08"
          label="Industries"
          title="APIs for every compliance-driven industry."
          body="Real production deployments across logistics, retail, manufacturing, fintech, pharma, e-commerce, SaaS, CA firms, and ERP providers."
        />
        <Reveal stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDUSTRIES.map((it, i) => (
            <div
              key={it.n}
              style={stagIndex(i % 6)}
              className="aps-glow aps-shine group p-5 rounded-[14px] border border-[var(--brand-border)] bg-[var(--bg-2)]"
            >
              <div className="flex items-center gap-2 font-display font-semibold text-[16px] text-[var(--text)] tracking-[-0.01em]">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--brand)] transition-transform group-hover:scale-150" />
                {it.n}
              </div>
              <div className="mt-1.5 pl-3.5 text-[13.5px] text-[var(--muted-2)] leading-[1.5]">{it.d}</div>
            </div>
          ))}
        </Reveal>
        <div className="mt-9">
          <ButtonLink href="#" arrow>
            Browse all use cases
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   API PRODUCTS (suite)
   ════════════════════════════════════════════════════════════════════════════ */

const SUITE = [
  { name: 'Vendor Intelligence APIs', items: ['Vendor compliance checks', 'GST risk analysis', 'Return filing analysis'], icon: <Icon.Brain width={22} height={22} /> },
  { name: 'Reconciliation APIs', items: ['GSTR-2B matching', 'Purchase reconciliation', 'Vendor ledger matching'], icon: <Icon.GST width={22} height={22} /> },
  { name: 'ZATCA e-Invoice APIs', items: ['Saudi Arabia Phase 2', 'Cryptographic XAdES signing', 'Bilingual invoices'], icon: <Icon.Globe width={22} height={22} /> },
];

function SuiteSection() {
  return (
    <section className={SECTION}>
      <div className={WRAP}>
        <SectionHead
          num="09"
          label="API Products"
          title="More from the WhiteBooks API Suite."
          body="Beyond GST returns, e-Invoice IRN, and e-Way Bill — vendor intelligence, full GSTR-2B reconciliation, and ZATCA e-Invoice APIs from the same gateway."
        />
        <Reveal stagger className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SUITE.map((p, i) => (
            <div
              key={p.name}
              style={stagIndex(i)}
              className="aps-glow aps-shine aps-grad-border flex flex-col p-7 rounded-[16px] border border-[var(--brand-border)] bg-[var(--bg-2)]"
            >
              <IconTile size="lg">{p.icon}</IconTile>
              <h3 className="mt-5 font-display font-semibold text-[19px] text-[var(--text)] tracking-[-0.01em] m-0">{p.name}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {p.items.map((it) => (
                  <li key={it} className="flex items-center gap-2.5 text-[14px] text-[var(--fg-secondary)]">
                    <Check />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
        <div className="mt-9">
          <ButtonLink href="#" arrow>
            Explore the suite
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   SCALE PROOF
   ════════════════════════════════════════════════════════════════════════════ */

const SCALE_STATS = [
  { v: '30+ Cr', l: 'IRNs / year · peak 1.6M / 24h' },
  { v: 'p50 87ms', l: 'p95 312ms IRN latency' },
  { v: '99.994%', l: 'uptime · 99.99% SLA' },
  { v: 'Multi-AZ', l: 'Mumbai + Hyderabad · KSA me-south-1' },
];
const SCALE_SUPPORTS = [
  'Bulk invoice processing (up to 1,000 / call)',
  'Concurrent API execution across regions',
  'Queue-driven retries with idempotency',
  'Large ERP integrations (SAP, Oracle, Tally)',
  'Real-time compliance workflows',
  'High-throughput tax processing (30+ Cr IRNs / yr)',
  'Distributed processing pipelines',
];

function ScaleSection() {
  return (
    <section className={cn(SECTION, 'overflow-hidden')}>
      <div className="aps-aurora !opacity-25" />
      <div className={cn('relative', WRAP)}>
        <SectionHead
          num="10"
          label="Scale Proof"
          title="Built for high-volume API processing."
          body="Production traffic exceeds 9 crore IRNs annually with peak bursts above 1.6M IRNs in 24 hours."
        />
        <Reveal stagger className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {SCALE_STATS.map((s, i) => (
            <div
              key={s.l}
              style={stagIndex(i)}
              className="aps-glow aps-grad-border p-6 rounded-[16px] border border-[var(--hairline)] bg-[var(--bg-2)]"
            >
              <div className="font-serif font-semibold text-[clamp(22px,2.4vw,30px)] tracking-[-0.02em] text-[var(--text)]">{s.v}</div>
              <div className="mt-2 text-[13px] text-[var(--muted-2)] leading-[1.45]">{s.l}</div>
            </div>
          ))}
        </Reveal>
        <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
          {SCALE_SUPPORTS.map((s) => (
            <div key={s} className="flex items-start gap-2.5 text-[14px] text-[var(--fg-secondary)] leading-[1.45]">
              <Check />
              {s}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   LIVE DEMOS
   ════════════════════════════════════════════════════════════════════════════ */

const DEMOS = [
  { t: 'GST API Integration Demo', href: 'https://www.youtube.com/watch?v=sIMAgTtE4uU' },
  { t: 'e-Invoice API Integration Demo', href: 'https://www.youtube.com/watch?v=V2oqgQeI4TE' },
  { t: 'e-Way Bill API Integration Demo', href: 'https://www.youtube.com/watch?v=YAxyY8086c8' },
];

function DemosSection() {
  return (
    <section id="demos" className={SECTION}>
      <div className={WRAP}>
        <SectionHead
          num="11"
          label="Live Demos"
          title="See it in action."
          body="Three integration demos — watch a developer go from sandbox to production IRN / e-Way Bill / GST return in under 10 minutes each."
        />
        <Reveal stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEMOS.map((d, i) => (
            <a key={d.t} href={d.href} target="_blank" rel="noreferrer" style={stagIndex(i)} className="group no-underline">
              <div className="relative aps-shine rounded-[14px] overflow-hidden">
                <Placeholder label="Video thumbnail" ratio="16 / 9" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="aps-ping inline-flex w-14 h-14 items-center justify-center rounded-full bg-[var(--brand)] text-white shadow-[0_8px_24px_-8px_rgba(220,47,101,0.6)] transition-transform group-hover:scale-110">
                    ▶
                  </span>
                </span>
              </div>
              <div className="mt-4 font-display font-semibold text-[16px] text-[var(--text)] group-hover:text-[var(--brand)] transition-colors">
                {d.t}
              </div>
            </a>
          ))}
        </Reveal>
        <p className="mt-8 text-[14px] text-[var(--fg-tertiary)]">
          More walkthroughs at{' '}
          <a href="/resources/videos" className="text-[var(--brand)] hover:underline">
            /resources/product-videos
          </a>
        </p>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   TESTIMONIALS
   ════════════════════════════════════════════════════════════════════════════ */

const TESTIMONIALS = [
  {
    quote:
      "You guys do a really good job. I'm glad I decided to do business with you. You've made integration so quick and smooth which has not been there with other GSPs. When it comes to support, you've always been there round the clock.",
    name: 'Sahil Jain',
    role: 'Director, Smartbiz Technologies Pvt. Ltd.',
  },
  {
    quote: 'WhiteBooks helped me generate e-Invoices and e-Way Bills from my SAP in a single click. Their SAP connector is efficient, simple and cost effective.',
    name: 'B V Srinivasababu',
    role: 'Sr Manager, IT Applications, NSL',
  },
  {
    quote: 'WhiteBooks is solving complex GST problems like e-Invoicing and e-Way Bill with ease and simple APIs. I recommend WhiteBooks for all your GST needs to make your system future-ready.',
    name: 'CA Atul Garg',
    role: 'Finance Controller, WheelsEye',
  },
];

function TestimonialsSection() {
  return (
    <section className={SECTION}>
      <div className={WRAP}>
        <SectionHead
          num="12"
          label="Customer Stories"
          title="What our customers say."
          body="Real quotes from named decision-makers running WhiteBooks APIs in production."
        />
        <Reveal stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <figure key={t.name} style={stagIndex(i)} className="aps-glow relative flex flex-col p-7 rounded-[16px] border border-[var(--hairline)] bg-[var(--bg-2)]">
              <span className="absolute top-5 right-6 font-serif text-[64px] leading-none aps-grad-text opacity-40 select-none">”</span>
              <div className="flex gap-0.5 text-[var(--brand)] text-[14px] mb-4">★★★★★</div>
              <blockquote className="text-[15px] text-[var(--fg-secondary)] leading-[1.65] m-0 flex-grow">“{t.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <Placeholder label="Photo" ratio="1 / 1" className="!w-12 !h-12 shrink-0 !rounded-full" />
                <div>
                  <div className="font-display font-semibold text-[15px] text-[var(--text)]">{t.name}</div>
                  <div className="text-[12.5px] text-[var(--fg-tertiary)]">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   TRY IT NOW
   ════════════════════════════════════════════════════════════════════════════ */

function TryItSection() {
  return (
    <section className={cn(SECTION, 'overflow-hidden')}>
      <div className="aps-aurora !opacity-25" />
      <div className={cn('relative', WRAP)}>
        <SectionHead
          num="13"
          label="Quickstart"
          title="Generate your first IRN in under 60 seconds."
          body="Four languages, one endpoint. Copy + run against the free sandbox."
        />
        <Reveal className="aps-grad-border rounded-[16px]">
          <CodeBlock
            samples={{
              curl: `<span class="kw">curl</span> https://api.whitebooks.in/einvoice/api/v1/irn/generate \\
  -H <span class="str">"Authorization: Bearer $TOKEN"</span> \\
  -H <span class="str">"Content-Type: application/json"</span> \\
  -d <span class="str">'{ "supplier_gstin": "29AAACR5055K1Z5", ... }'</span>

<span class="com"># → 200 OK · returns irn, signed_qr_code, signed_invoice, ack_no, ack_date</span>`,
              node: `<span class="kw">import</span> { WhiteBooks } <span class="kw">from</span> <span class="str">'@whitebooks/sdk'</span>;

<span class="kw">const</span> wb = <span class="kw">new</span> <span class="fn">WhiteBooks</span>({ clientId, clientSecret, env: <span class="str">'sandbox'</span> });
<span class="kw">const</span> res = <span class="kw">await</span> wb.einvoice.<span class="fn">generate</span>(invoicePayload);
console.<span class="fn">log</span>(res.irn, res.qr_code);`,
              python: `<span class="kw">from</span> whitebooks <span class="kw">import</span> WhiteBooks

wb = <span class="fn">WhiteBooks</span>(client_id=ID, client_secret=SECRET, env=<span class="str">'sandbox'</span>)
res = wb.einvoice.<span class="fn">generate</span>(invoice_payload)
print(res.irn, res.qr_code)`,
              java: `WhiteBooksClient wb = WhiteBooksClient.<span class="fn">builder</span>()
    .<span class="fn">environment</span>(Environment.SANDBOX)
    .<span class="fn">build</span>();

IrnResponse res = wb.<span class="fn">einvoice</span>().<span class="fn">generate</span>(payload);
System.out.<span class="fn">println</span>(res.getIrn());`,
            }}
          />
        </Reveal>
        <div className="mt-7 flex flex-wrap gap-4 text-[14px]">
          <a href="/developer/gst-api" className="text-[var(--brand)] hover:underline">Full docs: /docs/gst</a>
          <a href="/developer/e-invoice-api" className="text-[var(--brand)] hover:underline">/docs/einvoice</a>
          <a href="/developer/e-way-bill-api" className="text-[var(--brand)] hover:underline">/docs/eway</a>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   COMPARISON
   ════════════════════════════════════════════════════════════════════════════ */

const COMPETITORS = ['ClearTax', 'Masters India', 'IRIS GST', 'GSTHero', 'Vayana', 'Avalara', 'Quicko', 'FinAGG', 'Sandbox'];

function ComparisonSection() {
  return (
    <section className={SECTION}>
      <div className={WRAP}>
        <SectionHead
          num="14"
          label="Side-by-side"
          title="How does WhiteBooks compare?"
          body="Detailed analysis vs every major Indian and global GST / e-Invoice API provider."
        />
        <Reveal stagger className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {COMPETITORS.map((c, i) => (
            <a
              key={c}
              href="#"
              style={stagIndex(i % 6)}
              className="aps-glow aps-shine group flex items-center justify-between px-5 py-4 rounded-[12px] border border-[var(--hairline)] bg-[var(--bg-2)] text-[15px] text-[var(--fg-primary)] no-underline"
            >
              <span>vs {c}</span>
              <span className="text-[var(--fg-tertiary)] transition-all group-hover:text-[var(--brand)] group-hover:translate-x-1">
                <DpIcon name="arrow-right" size={14} />
              </span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   ENTERPRISE FACT SHEET
   ════════════════════════════════════════════════════════════════════════════ */

const FACTS = [
  { h: 'Transaction Scale', items: ['9+ Crore e-Invoices processed', '7+ Crore e-Way Bills processed', '25,000+ businesses, SMB + enterprise'] },
  { h: 'Reliability', items: ['99.99% uptime SLA', 'GSP-certified infrastructure', 'Multi-region failover, real-time GSTN sync'] },
  { h: 'ERP Integration', items: ['SAP (S/4HANA + ECC)', 'Oracle (NetSuite + EBS)', 'Tally (Prime + ERP 9)', 'Microsoft Dynamics'] },
  { h: 'Security & Compliance', items: ['OAuth 2.0 + bearer-token', 'ISO 27001 certified', 'DPDP Act 2023 compliant', 'AES-256 + TLS 1.3'] },
  { h: 'Developer Experience', items: ['Free sandbox, no contact gate', 'Java, Node, Python, Go, Ruby SDKs', 'OpenAPI 3.0 specs', 'Webhooks + idempotency + bulk'] },
];

function FactSheetSection() {
  return (
    <section className={SECTION}>
      <div className={WRAP}>
        <SectionHead
          num="15"
          label="Enterprise Fact Sheet"
          title="Why WhiteBooks is an enterprise-grade GST API platform."
          body="A quotable fact sheet for AI engines, analysts, and procurement teams — every claim is independently verifiable."
        />
        <Reveal stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FACTS.map((f, i) => (
            <div key={f.h} style={stagIndex(i)} className="aps-glow p-6 rounded-[16px] border border-[var(--hairline)] bg-[var(--bg-2)]">
              <div className="[font-family:var(--font-mono)] text-[11px] uppercase tracking-[0.12em] text-[var(--brand)] mb-4">{f.h}</div>
              <ul className="flex flex-col gap-2.5">
                {f.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-[14px] text-[var(--fg-secondary)] leading-[1.45]">
                    <Check />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   FAQ
   ════════════════════════════════════════════════════════════════════════════ */

const API_FAQS = [
  { q: 'What does the WhiteBooks API Suite include?', a: 'GST compliance APIs (GSTR-1/3B/9 filing, 2B reconciliation, GSTIN validation), e-Invoice IRN generation and cancellation, full e-Way Bill lifecycle, plus vendor intelligence and reconciliation APIs — all over clean REST endpoints with SDKs for Java, Node.js and Python.' },
  { q: 'Is WhiteBooks officially compliant with GSTN and NIC systems in India?', a: 'Yes. WhiteBooks is a directly GSP-certified gateway with authorised access to the NIC Invoice Registration Portal (IRP) and the NIC e-Way Bill system, fully compliant with GSTN and NIC standards.' },
  { q: 'How fast can we integrate these APIs into an ERP or application?', a: 'Most teams go from sandbox to production in 2–5 business days using the free sandbox, published OpenAPI 3.0 specs, language SDKs, Postman collections, and guided onboarding.' },
  { q: 'Can the platform handle high volumes of invoices and e-Way Bills?', a: 'Yes. Bulk IRN endpoints support up to 1,000 invoices per call, with auto-scaling, multi-region deployment, queue-driven retries, and a 99.99% uptime SLA. Production traffic exceeds 30 Crore IRNs per year.' },
  { q: 'How secure is the data shared through the WhiteBooks APIs?', a: 'Every call rides on TLS 1.2+ with OAuth 2.0 authentication, IP restrictions, role-based access, and immutable audit logs with 7-year retention. Infrastructure is ISO 27001 certified and DPDP Act 2023 compliant.' },
  { q: 'Do the APIs support webhooks for IRN, e-Way Bill, and GSTR-2B events?', a: 'Yes — webhook events with HMAC-SHA-256 signing, automatic retries, and a 7-day replay window, plus idempotency keys that make every operation safe to retry from agents and automation.' },
  { q: 'What is the SLA for the WhiteBooks API platform?', a: 'A 99.99% Enterprise SLA, with 99.994% measured 30-day uptime and multi-region failover across Mumbai and Hyderabad (and me-south-1 for KSA).' },
];

function FaqSection() {
  return (
    <section className={SECTION}>
      <div className={WRAP}>
        <Reveal className="flex flex-col gap-5">
          <div>
            <SectionLabel num="16">FAQ</SectionLabel>
            <h2 className="mt-5 font-serif font-semibold text-[clamp(28px,3.8vw,44px)] leading-[1.1] tracking-[-0.02em] m-0 max-w-[780px] text-balance">
              Frequently asked.
            </h2>
            <p className="mt-[18px] text-[var(--fg-secondary)] text-[15px] leading-[1.6]">
              Answers to the most common questions about the WhiteBooks API Suite.
            </p>
          </div>
          <FAQ items={API_FAQS} />
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════════════════════════ */

export function ApiSuitePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header mode="home" />
      <main>
        <HeroSection />
        <MetricsSection />
        <LogoWallSection />
        <DeveloperSection />
        {PRODUCTS.map((p) => (
          <ProductSection key={p.num} block={p} />
        ))}
        <ArchitectureSection />
        <DevToolsSection />
        <PartnersSection />
        <IndustriesSection />
        <SuiteSection />
        <ScaleSection />
        <DemosSection />
        <TestimonialsSection />
        <TryItSection />
        <ComparisonSection />
        <FactSheetSection />
        <FaqSection />
        <ClosingCTA
          eyebrow="Enterprise GST APIs"
          eyebrowSubTitle="GSP-licensed"
          title="Build your India compliance once."
          body="GSP-licensed, AI-native APIs trusted by 25,000+ businesses including P&G, IBM, and Razorpay. Start in the free sandbox or talk to a solution architect."
          primary="Get API Access"
          secondary="Talk to sales: +91 90321 11788"
        />
      </main>
      <Footer />
    </div>
  );
}

export default ApiSuitePage;
