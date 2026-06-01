import React from 'react';
import { CodeBlock, SurfaceCard, Status, InlineCode, Pill, MethodBadge } from './DpComponents';
import DpIcon from './DpIcon';
import type { CodeTab } from './DpComponents';

/* ─── Hero code tabs ──────────────────────────────────────────────────────────── */
const heroTabs: CodeTab[] = [
  {
    label: 'Node.js',
    lines: [
      [['kw', 'import'], ['', ' '], ['fn', 'WhiteBooks'], ['', ' '], ['kw', 'from'], ['', ' '], ['str', "'@whitebooks/node'"]],
      [[]],
      [['kw', 'const'], ['', ' client = '], ['kw', 'new'], ['', ' '], ['fn', 'WhiteBooks'], ['pun', '({']],
      [['', '  apiKey: '], ['key', 'process'], ['pun', '.'], ['fn', 'env'], ['pun', '.'], ['key', 'WB_API_KEY'], ['pun', ',']],
      [['', '  sandbox: '], ['kw', 'false'], ['pun', ',']],
      [['pun', '});']],
      [[]],
      [['com', '// Generate an e-invoice (IRN)']],
      [['kw', 'const'], ['', ' irn = '], ['kw', 'await'], ['', ' client'], ['pun', '.'], ['fn', 'einvoice'], ['pun', '.'], ['fn', 'generate'], ['pun', '({']],
      [['', '  gstin: '], ['str', '"29AAGCW7302R1ZF"'], ['pun', ',']],
      [['', '  invoiceType: '], ['str', '"B2B"'], ['pun', ',']],
      [['', '  invoiceNumber: '], ['str', '"INV-001"'], ['pun', ',']],
      [['', '  invoiceDate: '], ['str', '"2024-01-15"'], ['pun', ',']],
      [['pun', '});']],
      [[]],
      [['fn', 'console'], ['pun', '.'], ['fn', 'log'], ['pun', '('], ['str', '"IRN:"'], ['', ', irn'], ['pun', '.'], ['key', 'irn'], ['pun', ')']],
    ],
  },
  {
    label: 'Python',
    lines: [
      [['kw', 'import'], ['', ' whitebooks']],
      [[]],
      [['fn', 'client'], ['', ' = whitebooks'], ['pun', '.'], ['fn', 'Client'], ['pun', '(']],
      [['', '  api_key='], ['str', '"sk_live_..."'], ['pun', ',']],
      [['', '  sandbox='], ['kw', 'False'], ['pun', ',']],
      [['pun', ')']],
      [[]],
      [['com', '# Generate an e-invoice (IRN)']],
      [['fn', 'irn'], ['', ' = client'], ['pun', '.'], ['fn', 'einvoice'], ['pun', '.'], ['fn', 'generate'], ['pun', '(']],
      [['', '  gstin='], ['str', '"29AAGCW7302R1ZF"'], ['pun', ',']],
      [['', '  invoice_type='], ['str', '"B2B"'], ['pun', ',']],
      [['', '  invoice_number='], ['str', '"INV-001"'], ['pun', ',']],
      [['pun', ')']],
      [[]],
      [['fn', 'print'], ['pun', '('], ['fn', 'irn'], ['pun', '.'], ['key', 'irn'], ['pun', ')']],
    ],
  },
  {
    label: 'cURL',
    lines: [
      [['fn', 'curl'], ['', ' -X POST \\']],
      [['str', '  "https://api.whitebooks.dev/v3/einvoice/generate"'], ['', ' \\']],
      [['', '  -H '], ['str', '"Authorization: Bearer sk_live_..."'], ['', ' \\']],
      [['', '  -H '], ['str', '"Content-Type: application/json"'], ['', ' \\']],
      [['', '  -d '], ['str', '\'{"gstin":"29AAGCW7302R1ZF",']],
      [['str', '    "invoiceType":"B2B",']],
      [['str', '    "invoiceNumber":"INV-001",']],
      [['str', '    "invoiceDate":"2024-01-15"}\'']],
    ],
  },
];

/* ─── Quickstart code tabs ──────────────────────────────────────────────────── */
const quickstartReqTabs: CodeTab[] = [
  {
    label: 'Request',
    lines: [
      [['com', '// 1. Install the SDK']],
      [['fn', 'npm'], ['', ' install @whitebooks/node']],
      [[]],
      [['com', '// 2. Initialize']],
      [['kw', 'const'], ['', ' wb = '], ['kw', 'new'], ['', ' '], ['fn', 'WhiteBooks'], ['pun', '({'], ['', ' apiKey '], ['pun', '})']],
      [[]],
      [['com', '// 3. Generate IRN']],
      [['kw', 'const'], ['', ' result = '], ['kw', 'await'], ['', ' wb'], ['pun', '.'], ['fn', 'einvoice'], ['pun', '.'], ['fn', 'generate'], ['pun', '(payload)']],
    ],
  },
];

const quickstartRespTabs: CodeTab[] = [
  {
    label: 'Response',
    lines: [
      [['pun', '{']],
      [['', '  '], ['key', '"irn"'], ['pun', ':'], ['', ' '], ['str', '"e9fc7b4b2c1a..."'], ['pun', ',']],
      [['', '  '], ['key', '"ackNo"'], ['pun', ':'], ['', ' '], ['num', '232410297398'], ['pun', ',']],
      [['', '  '], ['key', '"ackDt"'], ['pun', ':'], ['', ' '], ['str', '"2024-01-15T10:30:00"'], ['pun', ',']],
      [['', '  '], ['key', '"signedQRCode"'], ['pun', ':'], ['', ' '], ['str', '"MSME/2024/..."'], ['pun', ',']],
      [['', '  '], ['key', '"status"'], ['pun', ':'], ['', ' '], ['str', '"success"']],
      [['pun', '}']],
    ],
  },
];

/* ─── Hero Section ───────────────────────────────────────────────────────────── */
function HeroSection(): React.ReactElement {
  return (
    <section className="relative px-4 pt-12 pb-16 md:px-6 md:pt-20 md:pb-[100px] max-w-[1280px] mx-auto overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(var(--dp-border) 1px, transparent 1px), linear-gradient(90deg, var(--dp-border) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 0%, black 20%, transparent 100%)',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 0%, black 20%, transparent 100%)',
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[60px] items-center relative">
        {/* Left */}
        <div>
          <Pill style={{ marginBottom: 16, display: 'inline-flex' }}>
            <span className="flex items-center gap-[5px]">
              <DpIcon name="bolt" size={11} />
              v3.4.0 — KSA Phase 3 support
            </span>
          </Pill>

          <h1 className="font-[family-name:var(--dp-font-display)] text-[32px] sm:text-[42px] md:text-[52px] font-extrabold leading-[1.1] text-[var(--dp-fg)] mb-4">
            The compliance{' '}
            <span className="relative inline-block">
              infrastructure
              <svg
                viewBox="0 0 280 14"
                fill="none"
                className="absolute bottom-[-6px] left-0 w-full h-[14px]"
              >
                <path
                  d="M4 9 C60 3, 140 13, 276 6"
                  stroke="var(--dp-accent)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
            {' '}for India.
          </h1>

          <p className="text-[15px] md:text-[17px] text-[var(--dp-fg-muted)] leading-[1.65] mb-6 md:mb-8 max-w-[460px]">
            GSP-licensed APIs for GST, E-Invoice, E-Way Bill and KSA e-Invoicing.
            Trusted by 12,000+ businesses. 99.98% uptime SLA.
          </p>

          <div className="flex gap-[10px] flex-wrap mb-8 md:mb-10">
            <button className="bg-[var(--dp-accent)] border-none rounded-[9px] px-[18px] md:px-[22px] py-[10px] text-[14px] font-semibold text-white cursor-pointer flex items-center gap-[7px]"
              onClick={() => window.location.href = 'https://accounts.whitebooks.in/signup?type=Developer&subscrid=&inviteId'}
            >
              Get API keys
              <DpIcon name="arrow-right" size={14} />
            </button>
            <button
              className="border border-[var(--dp-border)] rounded-[9px] px-[18px] md:px-[22px] py-[10px] text-[14px] text-[var(--dp-fg)] cursor-pointer flex items-center gap-[7px]"
              style={{ background: 'rgba(255,255,255,0.06)' }}
              onClick={() => window.location.href = '/WhiteBooks Developer Portal.html'}
            >
              <DpIcon name="book" size={14} />
              Read guides
            </button>
            <button className="bg-transparent border-none px-[14px] py-[10px] text-[14px] text-[var(--dp-fg-muted)] cursor-pointer hidden sm:flex items-center gap-[6px]"
              onClick={() => window.location.href = 'https://whitebooks.in/resources/product-videos/'}>
              <DpIcon name="play" size={13} />
              5-min quickstart
            </button>
          </div>

          {/* Metrics */}
          <div className="flex gap-5 md:gap-7">
            {[
              { value: '99.98%', label: 'Uptime SLA' },
              { value: '184ms', label: 'Median latency' },
              { value: '12.4M', label: 'Invoices / month' },
            ].map(m => (
              <div key={m.label}>
                <div className="font-[family-name:var(--dp-font-display)] text-[18px] md:text-[22px] font-bold text-[var(--dp-fg)]">
                  {m.value}
                </div>
                <div className="text-[11px] md:text-[12px] text-[var(--dp-fg-dim)] mt-[2px]">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — CodeBlock (hidden on mobile) */}
        <div className="relative hidden md:block">
          <CodeBlock tabs={heroTabs} />
          {/* 200 OK badge */}
          <div className="absolute bottom-[-16px] right-6 bg-[var(--dp-surface-2)] border border-[var(--dp-border)] rounded-full px-3 py-[5px] flex items-center gap-[7px] text-[12px] font-[family-name:var(--dp-font-mono)] shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
            <span className="text-[var(--dp-success)] font-semibold">200 OK</span>
            <span className="text-[var(--dp-fg-dim)]">·</span>
            <span className="text-[var(--dp-fg-muted)]">142ms</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Trust Strip ─────────────────────────────────────────────────────────────── */
const BRANDS = ['Tally Plus', 'ICICI Lombard', 'Razor Co.', 'Khatabook', 'Indus Pay', 'Niyo Bank', 'Vakil Search', 'Refyne'];

function TrustStrip(): React.ReactElement {
  return (
    <section
      className="border-t border-[var(--dp-border)] border-b py-4 md:py-6 px-4 md:px-6"
      style={{ background: 'rgba(255,255,255,0.01)' }}
    >
      <div className="max-w-[1280px] mx-auto flex items-center gap-4 md:gap-8 flex-wrap justify-center">
        <span className="text-[11px] font-[family-name:var(--dp-font-mono)] text-[var(--dp-fg-faint)] tracking-[0.08em] uppercase whitespace-nowrap">
          Trusted by
        </span>
        {BRANDS.map(name => (
          <span
            key={name}
            className="text-[12px] md:text-[13px] font-semibold text-[var(--dp-fg-faint)] tracking-[0.04em] whitespace-nowrap opacity-60"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ─── Ecosystem Section ───────────────────────────────────────────────────────── */
const ECOSYSTEM_APIS = [
  {
    icon: 'receipt' as const,
    name: 'GST API',
    description: 'End-to-end GST compliance — returns filing, reconciliation, and ledger management via a single RESTful interface.',
    endpoints: ['/gst/returns', '/gst/ledger', '/gst/reconcile'],
  },
  {
    icon: 'truck' as const,
    name: 'E-Way Bill API',
    description: 'Generate, extend, and cancel e-way bills programmatically with real-time GSTN sync.',
    endpoints: ['/eway/generate', '/eway/extend', '/eway/cancel'],
  },
  {
    icon: 'scroll' as const,
    name: 'E-Invoice API',
    description: 'IRN generation, signed QR codes, and bulk invoice management with GSP-grade reliability.',
    endpoints: ['/einvoice/generate', '/einvoice/cancel', '/einvoice/bulk'],
  },
  {
    icon: 'globe' as const,
    name: 'KSA E-Invoice',
    description: 'Phase 2 &amp; 3 ZATCA-compliant e-invoicing for Saudi Arabia with cryptographic signing.',
    endpoints: ['/ksa/einvoice', '/ksa/clearance', '/ksa/report'],
  },
];

function EcosystemSection(): React.ReactElement {
  return (
    <section className="max-w-[1280px] mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="mb-8 md:mb-10">
        <span className="text-[11px] font-[family-name:var(--dp-font-mono)] text-[var(--dp-accent-2)] tracking-[0.1em] uppercase">
          Ecosystem
        </span>
        <h2 className="font-[family-name:var(--dp-font-display)] text-[24px] md:text-[32px] font-bold text-[var(--dp-fg)] mt-2 mb-3">
          Every compliance API you need.
        </h2>
        <p className="text-[var(--dp-fg-muted)] text-[15px] md:text-[16px] max-w-[560px]">
          Four production-grade APIs, one developer experience, zero GSP complexity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ECOSYSTEM_APIS.map(api => (
          <SurfaceCard key={api.name} className="p-5 md:p-7">
            <div className="flex items-start justify-between mb-4">
              <span className="w-10 h-10 flex items-center justify-center bg-[var(--dp-accent-soft)] border border-[var(--dp-accent-line)] rounded-[10px] text-[var(--dp-accent-2)]">
                <DpIcon name={api.icon} size={18} />
              </span>
              <Pill>v3</Pill>
            </div>
            <h3 className="font-[family-name:var(--dp-font-display)] text-[17px] md:text-[18px] font-bold text-[var(--dp-fg)] mt-0 mb-2">
              {api.name}
            </h3>
            <p className="text-[var(--dp-fg-muted)] text-[13px] md:text-[14px] mb-4 leading-[1.6]">
              {api.description}
            </p>
            <div className="flex flex-wrap gap-[6px] mb-5">
              {api.endpoints.map(ep => (
                <InlineCode key={ep}>{ep}</InlineCode>
              ))}
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-[13px] text-[var(--dp-accent-2)] flex items-center gap-1 font-medium">
                Read guide <DpIcon name="arrow-right" size={12} />
              </a>
              <a href="#" className="text-[13px] text-[var(--dp-fg-muted)] flex items-center gap-1">
                API reference <DpIcon name="external" size={12} />
              </a>
            </div>
          </SurfaceCard>
        ))}
      </div>
    </section>
  );
}

/* ─── Quickstart Section ──────────────────────────────────────────────────────── */
const QS_FEATURES = [
  { icon: 'bolt' as const, text: 'SDKs for Node.js, Python, Go, Ruby, PHP, Java, and .NET' },
  { icon: 'shield' as const, text: 'Built-in retry logic, idempotency keys, and error parsing' },
  { icon: 'key' as const, text: 'Sandbox environment with test GSTINs included' },
  { icon: 'activity' as const, text: 'OpenAPI 3.1 spec + Postman collection included' },
];

function QuickstartSection(): React.ReactElement {
  return (
    <section className="bg-[var(--dp-bg-2)] border-t border-[var(--dp-border)] border-b py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[60px] items-center">
        {/* Code blocks — below text on mobile */}
        <div className="flex flex-col gap-3 order-2 md:order-1">
          <CodeBlock tabs={quickstartReqTabs} />
          <CodeBlock tabs={quickstartRespTabs} />
        </div>

        {/* Text — first on mobile */}
        <div className="order-1 md:order-2">
          <span className="text-[11px] font-[family-name:var(--dp-font-mono)] text-[var(--dp-accent-2)] tracking-[0.1em] uppercase">
            Quickstart
          </span>
          <h2 className="font-[family-name:var(--dp-font-display)] text-[24px] md:text-[30px] font-bold text-[var(--dp-fg)] mt-2 mb-4 leading-[1.2]">
            From npm install to first IRN in 5 minutes.
          </h2>
          <p className="text-[var(--dp-fg-muted)] text-[14px] md:text-[15px] mb-7 leading-[1.65]">
            Our SDK handles authentication, retries, and GSTN quirks so you can focus on your product.
            One API key, all compliance APIs.
          </p>
          <div className="flex flex-col gap-[14px]">
            {QS_FEATURES.map(f => (
              <div key={f.text} className="flex items-start gap-3">
                <span className="w-7 h-7 flex items-center justify-center bg-[var(--dp-accent-soft)] border border-[var(--dp-accent-line)] rounded-[7px] text-[var(--dp-accent-2)] shrink-0 mt-[1px]">
                  <DpIcon name={f.icon} size={13} />
                </span>
                <span className="text-[var(--dp-fg-muted)] text-[13px] md:text-[14px] leading-[1.5]">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Onboarding Section ──────────────────────────────────────────────────────── */
const STEPS = [
  {
    num: '01',
    title: 'Create account',
    description: 'Sign up and verify your business GSTIN in under 2 minutes.',
    snippet: '$ npx create-wb-app my-project',
    time: '2 min',
  },
  {
    num: '02',
    title: 'Get API keys',
    description: 'Instantly generate sandbox and production API keys from the dashboard.',
    snippet: '$ wb keys generate --env sandbox',
    time: '< 1 min',
  },
  {
    num: '03',
    title: 'Install SDK',
    description: 'Add our SDK to your project and configure your API key.',
    snippet: '$ npm install @whitebooks/node',
    time: '30 sec',
  },
  {
    num: '04',
    title: 'Go live',
    description: 'Switch to production keys and handle real compliance workloads.',
    snippet: '$ wb env use production',
    time: '5 min',
  },
];

function OnboardingSection(): React.ReactElement {
  return (
    <section className="px-4 md:px-6 py-12 md:py-20 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(220,47,101,0.06), transparent)',
        }}
      />
      <div className="max-w-[1280px] mx-auto relative">
        <div className="text-center mb-10 md:mb-12">
          <span className="text-[11px] font-[family-name:var(--dp-font-mono)] text-[var(--dp-accent-2)] tracking-[0.1em] uppercase">
            Get started
          </span>
          <h2 className="font-[family-name:var(--dp-font-display)] text-[24px] md:text-[32px] font-bold text-[var(--dp-fg)] mt-2 mb-0">
            Four steps to production.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 relative">
          {STEPS.map((step, i) => (
            <React.Fragment key={step.num}>
              <SurfaceCard className="p-5 md:p-6">
                <div className="text-[11px] font-[family-name:var(--dp-font-mono)] text-[var(--dp-accent)] tracking-[0.1em] mb-3">
                  STEP {step.num}
                </div>
                <h3 className="font-[family-name:var(--dp-font-display)] text-[16px] md:text-[17px] font-bold text-[var(--dp-fg)] mt-0 mb-2">
                  {step.title}
                </h3>
                <p className="text-[var(--dp-fg-muted)] text-[13px] mb-4 leading-[1.55]">
                  {step.description}
                </p>
                <div className="bg-[#0f0f17] border border-[var(--dp-border)] rounded-[7px] px-3 py-2 font-[family-name:var(--dp-font-mono)] text-[11px] md:text-[12px] text-[var(--dp-fg-muted)] mb-[14px] overflow-x-auto whitespace-nowrap">
                  {step.snippet}
                </div>
                <span
                  className="text-[11px] font-[family-name:var(--dp-font-mono)] text-[var(--dp-fg-dim)] px-2 py-[2px] rounded-full border border-[var(--dp-border)]"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  {step.time}
                </span>
              </SurfaceCard>
              {/* Arrow connectors only visible on desktop */}
              {i < STEPS.length - 1 && (
                <div
                  className="hidden md:block absolute top-1/2 z-[1] text-[var(--dp-fg-faint)] pointer-events-none"
                  style={{
                    left: `calc(${((i + 1) / STEPS.length) * 100}% - 12px)`,
                    transform: 'translateY(-50%)',
                  }}
                >
                  <DpIcon name="arrow-right" size={16} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Auth & Metrics Section ──────────────────────────────────────────────────── */
const API_KEYS = [
  { name: 'Production — Main', env: 'live', scope: 'All APIs', status: 'ok' as const },
  { name: 'Sandbox — Dev', env: 'sandbox', scope: 'E-Invoice only', status: 'ok' as const },
  { name: 'CI/CD — Test', env: 'sandbox', scope: 'Read only', status: 'warn' as const },
];

function AuthAndMetricsSection(): React.ReactElement {
  const uptimeBars = Array.from({ length: 60 }, (_, i) =>
    i === 14 || i === 38 ? 'warn' : 'ok'
  );

  return (
    <section className="bg-[var(--dp-bg-2)] border-t border-[var(--dp-border)] border-b py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* API Keys Card */}
        <SurfaceCard className="p-5 md:p-7">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-[family-name:var(--dp-font-display)] text-[17px] md:text-[18px] font-bold text-[var(--dp-fg)] m-0">
                API Keys
              </h3>
              <p className="text-[var(--dp-fg-dim)] text-[12px] md:text-[13px] mt-1 mb-0">
                Manage your authentication credentials
              </p>
            </div>
            <button className="bg-[var(--dp-accent-soft)] border border-[var(--dp-accent-line)] rounded-[8px] px-3 py-[6px] text-[12px] text-[var(--dp-accent-2)] cursor-pointer flex items-center gap-[5px] font-[family-name:var(--dp-font-body)]">
              <DpIcon name="plus" size={12} />
              New key
            </button>
          </div>

          <div className="flex flex-col gap-[1px]">
            {API_KEYS.map(k => (
              <div
                key={k.name}
                className="flex items-center justify-between px-3 md:px-[14px] py-3 rounded-[8px] gap-2 md:gap-3"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <DpIcon name="key" size={14} style={{ color: 'var(--dp-fg-dim)', flexShrink: 0 }} />
                  <span className="text-[12px] md:text-[13px] text-[var(--dp-fg)] font-medium truncate">{k.name}</span>
                </div>
                <span
                  className="text-[11px] font-[family-name:var(--dp-font-mono)] px-[7px] py-[1px] rounded-[4px] shrink-0"
                  style={{
                    background: k.env === 'live' ? 'rgba(220,47,101,0.1)' : 'rgba(255,255,255,0.06)',
                    color: k.env === 'live' ? 'var(--dp-accent-2)' : 'var(--dp-fg-dim)',
                    border: `1px solid ${k.env === 'live' ? 'var(--dp-accent-line)' : 'var(--dp-border)'}`,
                  }}
                >
                  {k.env}
                </span>
                <span className="hidden sm:block text-[12px] text-[var(--dp-fg-dim)] min-w-[90px]">{k.scope}</span>
                <Status kind={k.status} label={k.status === 'ok' ? 'Active' : 'Expiring'} />
              </div>
            ))}
          </div>
        </SurfaceCard>

        {/* Metrics Card */}
        <SurfaceCard className="p-5 md:p-7">
          <h3 className="font-[family-name:var(--dp-font-display)] text-[17px] md:text-[18px] font-bold text-[var(--dp-fg)] mt-0 mb-2">
            Platform Metrics
          </h3>
          <p className="text-[var(--dp-fg-dim)] text-[12px] md:text-[13px] mb-5 md:mb-6">
            Last 90 days — live production stats
          </p>

          <div className="grid grid-cols-2 gap-3 mb-5 md:mb-6">
            {[
              { value: '99.98%', label: 'Uptime', sub: '90-day rolling' },
              { value: '184ms', label: 'Median P50', sub: 'API latency' },
              { value: '12.4M', label: 'Invoices', sub: 'This month' },
              { value: '240Cr', label: 'Value processed', sub: 'INR' },
            ].map(m => (
              <div
                key={m.label}
                className="rounded-[9px] px-3 md:px-4 py-3 md:py-[14px] border border-[var(--dp-border)]"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <div className="font-[family-name:var(--dp-font-display)] text-[18px] md:text-[22px] font-bold text-[var(--dp-fg)]">
                  {m.value === '240Cr' ? <><span className="text-[13px] md:text-[14px] text-[var(--dp-fg-muted)]">&#8377;</span>{m.value}</> : m.value}
                </div>
                <div className="text-[11px] md:text-[12px] text-[var(--dp-fg-muted)] mt-[2px]">{m.label}</div>
                <div className="text-[10px] md:text-[11px] text-[var(--dp-fg-dim)] mt-[1px]">{m.sub}</div>
              </div>
            ))}
          </div>

          {/* Uptime bars */}
          <div>
            <div className="flex justify-between mb-[6px]">
              <span className="text-[11px] md:text-[12px] text-[var(--dp-fg-dim)] font-[family-name:var(--dp-font-mono)]">
                Uptime — 60 days
              </span>
              <Status kind="ok" label="Operational" />
            </div>
            <div className="flex gap-[2px]">
              {uptimeBars.map((status, i) => (
                <div
                  key={i}
                  className="flex-1 h-4 md:h-5 rounded-[3px] opacity-70"
                  style={{ background: status === 'ok' ? 'var(--dp-success)' : 'var(--dp-warning)' }}
                />
              ))}
            </div>
          </div>
        </SurfaceCard>
      </div>
    </section>
  );
}

/* ─── SDK Section ─────────────────────────────────────────────────────────────── */
const SDKS = [
  { name: 'Node.js', glyph: 'JS', install: 'npm install @whitebooks/node', color: '#4ade80' },
  { name: 'Python', glyph: 'PY', install: 'pip install whitebooks', color: '#60a5fa' },
  { name: 'Go', glyph: 'GO', install: 'go get whitebooks.dev/go', color: '#34d399' },
  { name: 'Ruby', glyph: 'RB', install: 'gem install whitebooks', color: '#f87171' },
  { name: 'PHP', glyph: 'PHP', install: 'composer require whitebooks/sdk', color: '#a78bfa' },
  { name: 'Java', glyph: 'JV', install: 'mvn whitebooks:whitebooks-java', color: '#fb923c' },
  { name: '.NET', glyph: '.NET', install: 'dotnet add package Whitebooks', color: '#818cf8' },
  { name: 'OpenAPI', glyph: 'OA', install: 'Download openapi.yaml', color: '#fbbf24' },
];

function SDKSection(): React.ReactElement {
  return (
    <section className="max-w-[1280px] mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="text-center mb-8 md:mb-10">
        <span className="text-[11px] font-[family-name:var(--dp-font-mono)] text-[var(--dp-accent-2)] tracking-[0.1em] uppercase">
          SDKs
        </span>
        <h2 className="font-[family-name:var(--dp-font-display)] text-[24px] md:text-[32px] font-bold text-[var(--dp-fg)] mt-2 mb-3">
          Your language, our compliance.
        </h2>
        <p className="text-[var(--dp-fg-muted)] text-[14px] md:text-[16px] max-w-[500px] mx-auto">
          Official SDKs with full TypeScript support, auto-retries, and idiomatic error handling.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {SDKS.map(sdk => (
          <SurfaceCard key={sdk.name} className="p-4 md:p-5" style={{ cursor: 'pointer' }}>
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-[14px]">
              <span
                className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-[8px] font-[family-name:var(--dp-font-mono)] text-[10px] md:text-[11px] font-bold shrink-0"
                style={{
                  background: `${sdk.color}15`,
                  border: `1px solid ${sdk.color}30`,
                  color: sdk.color,
                }}
              >
                {sdk.glyph}
              </span>
              <span className="font-[family-name:var(--dp-font-display)] text-[13px] md:text-[15px] font-semibold text-[var(--dp-fg)]">
                {sdk.name}
              </span>
            </div>
            <div className="font-[family-name:var(--dp-font-mono)] text-[10px] md:text-[11px] text-[var(--dp-fg-dim)] bg-[#0f0f17] border border-[var(--dp-border)] rounded-[6px] px-[8px] md:px-[10px] py-[6px] md:py-[7px] overflow-x-auto whitespace-nowrap">
              {sdk.install}
            </div>
          </SurfaceCard>
        ))}
      </div>
    </section>
  );
}

/* ─── Use Cases Section ───────────────────────────────────────────────────────── */
const USE_CASES = [
  {
    icon: 'layers' as const,
    industry: 'ERP & Accounting',
    companies: 'Tally, Busy, Zoho Books',
    features: ['Bulk e-invoice generation', 'Auto-reconciliation with GSTR-2A/2B', 'Multi-GSTIN management'],
  },
  {
    icon: 'wallet' as const,
    industry: 'Fintech & Payments',
    companies: 'Razorpay, BharatPe, Juspay',
    features: ['Real-time invoice validation', 'Embedded compliance in payment flows', 'Webhook-driven GST ledger sync'],
  },
  {
    icon: 'truck' as const,
    industry: 'Logistics',
    companies: 'Delhivery, Ecom Express, XpressBees',
    features: ['Automated e-way bill on shipment', 'Vehicle update and part-B APIs', 'EWB distance &amp; GSTIN lookup'],
  },
  {
    icon: 'globe' as const,
    industry: 'Marketplaces',
    companies: 'Amazon.in, Meesho, Flipkart sellers',
    features: ['Seller-wise IRN generation at scale', 'Batch invoice APIs (1000/request)', 'Compliance analytics dashboard'],
  },
];

function UseCasesSection(): React.ReactElement {
  return (
    <section className="bg-[var(--dp-bg-2)] border-t border-[var(--dp-border)] border-b py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <span className="text-[11px] font-[family-name:var(--dp-font-mono)] text-[var(--dp-accent-2)] tracking-[0.1em] uppercase">
            Use cases
          </span>
          <h2 className="font-[family-name:var(--dp-font-display)] text-[24px] md:text-[32px] font-bold text-[var(--dp-fg)] mt-2 mb-0">
            Built for every vertical.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {USE_CASES.map(uc => (
            <SurfaceCard key={uc.industry} className="p-5 md:p-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 flex items-center justify-center bg-[var(--dp-accent-soft)] border border-[var(--dp-accent-line)] rounded-[10px] text-[var(--dp-accent-2)] shrink-0">
                  <DpIcon name={uc.icon} size={18} />
                </span>
                <div>
                  <div className="font-[family-name:var(--dp-font-display)] text-[16px] md:text-[17px] font-bold text-[var(--dp-fg)]">
                    {uc.industry}
                  </div>
                  <div className="text-[11px] md:text-[12px] text-[var(--dp-fg-dim)] mt-[2px]">{uc.companies}</div>
                </div>
              </div>
              <ul className="list-none p-0 m-0 flex flex-col gap-2">
                {uc.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-[12px] md:text-[13px] text-[var(--dp-fg-muted)]">
                    <DpIcon name="check" size={13} style={{ color: 'var(--dp-success)', flexShrink: 0, marginTop: 2 }} />
                    {f}
                  </li>
                ))}
              </ul>
            </SurfaceCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Sandbox Section ─────────────────────────────────────────────────────────── */
type LogMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

const SANDBOX_LOG: Array<{ time: string; method: LogMethod; path: string; status: number; ms: number }> = [
  { time: '10:31:04', method: 'POST', path: '/v3/einvoice/generate', status: 200, ms: 142 },
  { time: '10:31:02', method: 'GET', path: '/v3/gst/returns?gstin=29AAG...', status: 200, ms: 89 },
  { time: '10:30:58', method: 'POST', path: '/v3/eway/generate', status: 200, ms: 213 },
  { time: '10:30:55', method: 'GET', path: '/v3/einvoice/29AAG.../INV-001', status: 404, ms: 34 },
  { time: '10:30:51', method: 'PUT', path: '/v3/eway/INV-001/part-b', status: 200, ms: 178 },
  { time: '10:30:44', method: 'DELETE', path: '/v3/einvoice/cancel/IRN-007', status: 200, ms: 98 },
  { time: '10:30:39', method: 'POST', path: '/v3/ksa/einvoice/clearance', status: 200, ms: 302 },
  { time: '10:30:35', method: 'GET', path: '/v3/gst/ledger?period=2024-01', status: 200, ms: 67 },
];

function SandboxSection(): React.ReactElement {
  return (
    <section className="max-w-[1280px] mx-auto px-4 md:px-6 py-12 md:py-20">
      <div
        className="rounded-[16px] md:rounded-[20px] border border-[var(--dp-border)] overflow-hidden bg-[var(--dp-surface)]"
        style={{
          backgroundImage: 'radial-gradient(ellipse 60% 60% at 30% 50%, rgba(220,47,101,0.07), transparent)',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left */}
          <div className="px-6 py-8 md:px-10 md:py-12 border-b md:border-b-0 md:border-r border-[var(--dp-border)]">
            <Pill style={{ marginBottom: 16, display: 'inline-flex' }}>
              <span className="flex items-center gap-[5px]">
                <DpIcon name="terminal" size={11} />
                Sandbox Environment
              </span>
            </Pill>
            <h2 className="font-[family-name:var(--dp-font-display)] text-[22px] md:text-[28px] font-bold text-[var(--dp-fg)] mt-0 mb-3 leading-[1.25]">
              Test everything before going live.
            </h2>
            <p className="text-[var(--dp-fg-muted)] text-[14px] md:text-[15px] mb-6 md:mb-7 leading-[1.65]">
              Full sandbox with pre-loaded test GSTINs, mock GSTN responses, and configurable error scenarios.
            </p>
            <div className="flex flex-col gap-3 mb-6 md:mb-8">
              {[
                'Test GSTINs with realistic GSTN data',
                'Trigger 4xx and 5xx error scenarios',
                'Inspect full request / response logs',
                'No rate limits in sandbox',
              ].map(f => (
                <div key={f} className="flex items-center gap-[10px] text-[13px] md:text-[14px] text-[var(--dp-fg-muted)]">
                  <DpIcon name="check" size={13} style={{ color: 'var(--dp-success)', flexShrink: 0 }} />
                  {f}
                </div>
              ))}
            </div>
            <div className="flex gap-[10px] flex-wrap">
              <button className="bg-[var(--dp-accent)] border-none rounded-[9px] px-4 md:px-5 py-[10px] text-[13px] font-semibold text-white cursor-pointer flex items-center gap-[6px]">
                Open sandbox <DpIcon name="arrow-right" size={13} />
              </button>
              <button
                className="border border-[var(--dp-border)] rounded-[9px] px-4 md:px-5 py-[10px] text-[13px] text-[var(--dp-fg)] cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                View docs
              </button>
            </div>
          </div>

          {/* Right — request log */}
          <div className="px-5 py-6 md:px-7 md:py-8">
            <div className="flex items-center gap-2 mb-4">
              <Status kind="ok" label="Sandbox live" />
              <span className="ml-auto text-[12px] text-[var(--dp-fg-dim)] font-[family-name:var(--dp-font-mono)]">
                Request log
              </span>
            </div>
            <div className="bg-[#0f0f17] rounded-[10px] border border-[var(--dp-border)] overflow-hidden overflow-x-auto">
              <table className="w-full border-collapse text-[12px] min-w-[420px]">
                <thead>
                  <tr className="border-b border-[var(--dp-border)]">
                    {['Time', 'Method', 'Path', 'Status', 'ms'].map(h => (
                      <th
                        key={h}
                        className="px-3 py-2 text-left font-[family-name:var(--dp-font-mono)] text-[10px] text-[var(--dp-fg-faint)] tracking-[0.06em] font-medium"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SANDBOX_LOG.map((row, i) => (
                    <tr
                      key={i}
                      className={i < SANDBOX_LOG.length - 1 ? 'border-b border-[var(--dp-border)]' : ''}
                    >
                      <td className="px-3 py-[7px] font-[family-name:var(--dp-font-mono)] text-[11px] text-[var(--dp-fg-dim)] whitespace-nowrap">
                        {row.time}
                      </td>
                      <td className="px-3 py-[7px]">
                        <MethodBadge method={row.method as LogMethod} />
                      </td>
                      <td className="px-3 py-[7px] font-[family-name:var(--dp-font-mono)] text-[11px] text-[var(--dp-fg-muted)] max-w-[160px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {row.path}
                      </td>
                      <td className="px-3 py-[7px]">
                        <span
                          className="font-[family-name:var(--dp-font-mono)] text-[11px] font-semibold"
                          style={{ color: row.status < 300 ? 'var(--dp-success)' : row.status < 500 ? 'var(--dp-warning)' : 'var(--dp-danger)' }}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="px-3 py-[7px] font-[family-name:var(--dp-font-mono)] text-[11px] text-[var(--dp-fg-dim)]">
                        {row.ms}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Section ─────────────────────────────────────────────────────────────── */
function CTASection(): React.ReactElement {
  return (
    <section className="px-4 md:px-6 py-16 md:py-[100px] text-center relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(220,47,101,0.12), transparent)',
        }}
      />
      <div className="relative max-w-[640px] mx-auto">
        <h2 className="font-[family-name:var(--dp-font-display)] text-[28px] sm:text-[36px] md:text-[42px] font-extrabold text-[var(--dp-fg)] mb-4 leading-[1.1]">
          Ship compliance at infrastructure speed.
        </h2>
        <p className="text-[var(--dp-fg-muted)] text-[15px] md:text-[17px] mb-8 md:mb-9 leading-[1.65]">
          Join 12,000+ businesses using WhiteBooks APIs to automate their compliance workflows.
          Free sandbox, no credit card required.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button className="bg-[var(--dp-accent)] border-none rounded-[10px] px-5 md:px-7 py-3 md:py-[13px] text-[14px] md:text-[15px] font-semibold text-white cursor-pointer flex items-center gap-2">
            Get API keys — free <DpIcon name="arrow-right" size={15} />
          </button>
          <button
            className="border border-[var(--dp-border)] rounded-[10px] px-5 md:px-7 py-3 md:py-[13px] text-[14px] md:text-[15px] text-[var(--dp-fg)] cursor-pointer flex items-center gap-2"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          >
            <DpIcon name="book" size={15} />
            Read the docs
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer Section ──────────────────────────────────────────────────────────── */
const FOOTER_LINKS = [
  {
    heading: 'Product',
    links: ['GST API', 'E-Invoice API', 'E-Way Bill API', 'KSA E-Invoice', 'Pricing'],
  },
  {
    heading: 'Developers',
    links: ['Documentation', 'API Reference', 'SDKs', 'Changelog', 'Status'],
  },
  {
    heading: 'Resources',
    links: ['Blog', 'Case Studies', 'Webinars', 'Partners', 'Support'],
  },
  {
    heading: 'Company',
    links: ['About', 'Careers', 'Press', 'Contact', 'Privacy'],
  },
  {
    heading: 'Legal',
    links: ['Terms', 'Privacy Policy', 'Data Processing', 'GDPR', 'Cookie Policy'],
  },
];

function FooterSection(): React.ReactElement {
  return (
    <footer className="border-t border-[var(--dp-border)] pt-10 pb-6 md:pt-[60px] md:pb-8 px-4 md:px-6 bg-[var(--dp-bg-2)]">
      <div className="max-w-[1280px] mx-auto">
        {/* Logo row + link columns */}
        <div className="mb-8 md:mb-12">
          {/* Logo + description — full width on mobile */}
          <div className="mb-8 md:hidden">
            <div className="mb-3">
              <span className="font-[family-name:var(--dp-font-display)] text-[16px] font-bold text-[var(--dp-fg)]">
                whitebooks<span className="text-[var(--dp-accent-2)]">.</span>dev
              </span>
            </div>
            <p className="text-[var(--dp-fg-dim)] text-[13px] leading-[1.65] mb-4 max-w-[280px]">
              GSP-licensed compliance APIs for India and the GCC. Built for developers.
            </p>
            <div className="flex gap-2">
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center border border-[var(--dp-border)] rounded-[7px] text-[var(--dp-fg-dim)]"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <DpIcon name="github" size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center border border-[var(--dp-border)] rounded-[7px] text-[var(--dp-fg-dim)]"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <DpIcon name="discord" size={14} />
              </a>
            </div>
          </div>

          {/* Link columns — 2-col on mobile, full grid on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:hidden">
            {FOOTER_LINKS.map(col => (
              <div key={col.heading}>
                <div className="text-[11px] font-[family-name:var(--dp-font-mono)] text-[var(--dp-fg-dim)] tracking-[0.07em] mb-3 uppercase">
                  {col.heading}
                </div>
                <ul className="list-none p-0 m-0 flex flex-col gap-2">
                  {col.links.map(l => (
                    <li key={l}>
                      <a href="#" className="text-[13px] text-[var(--dp-fg-muted)] transition-colors duration-150">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Desktop: full 6-col grid with logo */}
          <div className="hidden md:grid gap-10 mb-12" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr' }}>
            <div>
              <div className="mb-3">
                <span className="font-[family-name:var(--dp-font-display)] text-[16px] font-bold text-[var(--dp-fg)]">
                  whitebooks<span className="text-[var(--dp-accent-2)]">.</span>dev
                </span>
              </div>
              <p className="text-[var(--dp-fg-dim)] text-[13px] leading-[1.65] mb-5 max-w-[220px]">
                GSP-licensed compliance APIs for India and the GCC. Built for developers.
              </p>
              <div className="flex gap-2">
                <a
                  href="#"
                  className="w-8 h-8 flex items-center justify-center border border-[var(--dp-border)] rounded-[7px] text-[var(--dp-fg-dim)]"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  <DpIcon name="github" size={14} />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 flex items-center justify-center border border-[var(--dp-border)] rounded-[7px] text-[var(--dp-fg-dim)]"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  <DpIcon name="discord" size={14} />
                </a>
              </div>
            </div>
            {FOOTER_LINKS.map(col => (
              <div key={col.heading}>
                <div className="text-[12px] font-[family-name:var(--dp-font-mono)] text-[var(--dp-fg-dim)] tracking-[0.07em] mb-[14px] uppercase">
                  {col.heading}
                </div>
                <ul className="list-none p-0 m-0 flex flex-col gap-[9px]">
                  {col.links.map(l => (
                    <li key={l}>
                      <a href="#" className="text-[13px] text-[var(--dp-fg-muted)] transition-colors duration-150">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between border-t border-[var(--dp-border)] pt-5 flex-wrap gap-3">
          <span className="text-[12px] text-[var(--dp-fg-dim)]">
            &copy; 2024 WhiteBooks Technologies Pvt. Ltd. All rights reserved.
          </span>
          <div className="flex flex-wrap gap-3 md:gap-4">
            <Status kind="ok" label="API Operational" />
            <Status kind="ok" label="All Systems Normal" />
            <span className="hidden sm:inline-flex"><Status kind="ok" label="99.98% Uptime" /></span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── DpHome (default export) ────────────────────────────────────────────────── */
export default function DpHome(): React.ReactElement {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <EcosystemSection />
      <QuickstartSection />
      <OnboardingSection />
      <AuthAndMetricsSection />
      <SDKSection />
      <UseCasesSection />
      <SandboxSection />
      <CTASection />
      <FooterSection />
    </>
  );
}
