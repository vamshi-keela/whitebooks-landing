import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield, ShieldCheck, Zap, Globe, RefreshCw, ArrowRight,
  BookOpen, PlayCircle, FileText, CheckCircle, Lock, Clock,
  Key, ChevronRight, ExternalLink, Package, Layers, Server,
  Database, Terminal, Network, Activity, Users, Building2,
  BarChart3, Check, Code, GitBranch, Truck, QrCode,
  Headphones, TrendingUp, Star, Box, FileSpreadsheet, Braces,
  Eye, AlertCircle
} from 'lucide-react';
import GstResources from './GstResources';
import sdkPostman from '../../assets/logos/postman.svg';
import { SurfaceCard } from './DpComponents';
import { GST_FAQS, GST_RESOURCE_ITEMS } from '@/data/gst-api-page-data';
import { FinalCTA } from './EinvoiceApiOverview';
import { SIGNUP_URL } from '@/utils/contants';

// ─── Animation helpers ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

// ─── Shared primitives ────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] font-bold tracking-[0.1em] uppercase mb-3"
      style={{ color: 'var(--dp-accent-2)', fontFamily: 'var(--dp-font-mono)' }}
    >
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-3xl font-bold tracking-[-0.025em] leading-[1.1] m-0"
      style={{ fontFamily: 'var(--dp-font-display)', color: 'var(--dp-fg)' }}
    >
      {children}
    </h2>

  );
}

function GlassCard({ children, className = '', style = {} }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded-[14px] border ${className}`}
      style={{
        background: 'var(--dp-surface-2)',
        borderColor: 'var(--dp-border)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Divider() {
  return <div className="h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />;
}

// ─── Hero: API visualization panel ───────────────────────────────────────────

function ApiPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 28, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="relative hidden lg:block flex-shrink-0"
      style={{ width: 400 }}
    >
      {/* Floating: uptime */}
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-18px] right-[-14px] z-10 rounded-[10px] px-3 py-2"
        style={{
          background: 'rgba(21,21,29,0.97)',
          border: '1px solid rgba(255,255,255,0.09)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}
      >
        <div className="text-lg font-bold leading-none" style={{ color: '#22c55e', fontFamily: 'var(--dp-font-mono)' }}>99.9%</div>
        <div className="text-[9px] mt-[3px]" style={{ color: 'var(--dp-fg-dim)' }}>Uptime SLA</div>
      </motion.div>

      {/* Floating: latency */}
      <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        className="absolute bottom-[-14px] left-[-14px] z-10 rounded-[10px] px-3 py-2"
        style={{
          background: 'rgba(21,21,29,0.97)',
          border: '1px solid rgba(255,255,255,0.09)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        }}
      >
        <div className="text-lg font-bold leading-none" style={{ color: 'var(--dp-accent-2)', fontFamily: 'var(--dp-font-mono)' }}>&lt;150ms</div>
        <div className="text-[9px] mt-[3px]" style={{ color: 'var(--dp-fg-dim)' }}>Median Latency</div>
      </motion.div>

      {/* Main glass card */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(10,10,15,0.94)',
          border: '1px solid rgba(220,47,101,0.18)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 0 80px rgba(220,47,101,0.07), 0 32px 64px rgba(0,0,0,0.55)',
        }}
      >
        {/* Titlebar */}
        <div
          className="px-3.5 py-2.5 flex items-center justify-between"
          style={{ background: 'rgba(0,0,0,0.25)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="flex items-center gap-[9px]">
            <div className="flex gap-[5px]">
              {['#ff5f56', '#febc2e', '#27c93f'].map(c => (
                <span key={c} className="block w-2 h-2 rounded-full" style={{ background: c }} />
              ))}
            </div>
            <span className="text-[10px]" style={{ color: 'var(--dp-fg-dim)', fontFamily: 'var(--dp-font-mono)' }}>
              GST API Explorer
            </span>
          </div>
          <div className="flex items-center gap-[5px]">
            <span className="block w-[6px] h-[6px] rounded-full" style={{ background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
            <span className="text-[9px]" style={{ color: '#22c55e', fontFamily: 'var(--dp-font-mono)' }}>LIVE · v2.4</span>
          </div>
        </div>

        {/* Request */}
        <div className="px-3.5 pt-3.5 pb-2.5">
          <div
            className="text-[9px] uppercase tracking-[0.09em] mb-[7px]"
            style={{ color: 'var(--dp-fg-faint)', fontFamily: 'var(--dp-font-mono)' }}
          >
            Request
          </div>
          <div
            className="rounded-lg px-3 py-2.5"
            style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.04)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                style={{ background: 'rgba(220,47,101,0.2)', color: 'var(--dp-accent-2)', fontFamily: 'var(--dp-font-mono)' }}
              >
                POST
              </span>
              <span className="text-[10px]" style={{ color: 'var(--dp-fg-muted)', fontFamily: 'var(--dp-font-mono)' }}>
                /api/v2/einvoice/generate
              </span>
            </div>
            <pre className="m-0 text-[10px] leading-[1.65]" style={{ color: 'var(--dp-fg-muted)', fontFamily: 'var(--dp-font-mono)' }}>{`{
  "gstin": "27AABCU9603R1ZX",
  "invoice_type": "B2B",
  "total_value": 118000,
  "tax_amount": 18000
}`}</pre>
          </div>
        </div>

        {/* Response */}
        <div className="px-3.5 pb-3.5">
          <div className="flex items-center justify-between mb-[7px]">
            <div className="text-[9px] uppercase tracking-[0.09em]" style={{ color: 'var(--dp-fg-faint)', fontFamily: 'var(--dp-font-mono)' }}>
              Response
            </div>
            <div className="flex items-center gap-[6px]">
              <span
                className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                style={{ background: 'rgba(34,197,94,0.12)', color: '#22c55e', fontFamily: 'var(--dp-font-mono)' }}
              >
                200 OK
              </span>
              <span className="text-[9px]" style={{ color: 'var(--dp-fg-faint)', fontFamily: 'var(--dp-font-mono)' }}>124ms</span>
            </div>
          </div>
          <div
            className="rounded-lg px-3 py-2.5"
            style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(34,197,94,0.1)' }}
          >
            <pre className="m-0 text-[10px] leading-[1.65]" style={{ color: 'var(--dp-fg-muted)', fontFamily: 'var(--dp-font-mono)' }}>{`{
  "irn": "a1b2c3d4e5f6789abc...",
  "status": "SIGNED",
  "ack_no": "232410293847561",
  "ack_date": "2024-01-15T10:30:00"
}`}</pre>
          </div>
        </div>

        {/* Status chips */}
        <div className="px-3.5 py-2.5 flex gap-1.5 flex-wrap" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          {['GSTIN Verified', 'IRN Generated', 'Compliant'].map(s => (
            <div
              key={s}
              className="flex items-center gap-1 rounded-full px-2 py-[3px]"
              style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)' }}
            >
              <Check size={8} color="#22c55e" />
              <span className="text-[9px]" style={{ color: 'var(--dp-fg-dim)', fontFamily: 'var(--dp-font-mono)' }}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section 1: Hero ──────────────────────────────────────────────────────────

export function HeroSection({ title, description }: { title: string; description: string; }) {
  return (
    <section className="relative px-6 sm:px-10 lg:px-12 pt-12 sm:pt-14 lg:pt-16 pb-12 sm:pb-14 lg:pb-[60px] overflow-hidden">
      {/* Ambient glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 15% 45%, rgba(220,47,101,0.06), transparent 65%), radial-gradient(ellipse 50% 40% at 85% 25%, rgba(220,47,101,0.04), transparent 60%)',
        }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
          maskImage: 'radial-gradient(ellipse 85% 70% at 25% 45%, black 25%, transparent 80%)',
        }}
      />

      <div className="relative z-[1] flex flex-col lg:flex-row gap-8 lg:gap-14 items-center max-w-[980px] mx-auto">
        {/* Left content */}
        <div className="flex-1 min-w-0 w-full">
          {/* Compliance badges */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex gap-2 mb-6 flex-wrap"
          >
            {['GST Suvidha Provider', 'ISO 27001:2013 Certified'].map(b => (
              <span
                key={b}
                className="inline-flex items-center gap-[5px] px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-[0.04em]"
                style={{
                  background: 'rgba(220,47,101,0.07)',
                  border: '1px solid rgba(220,47,101,0.2)',
                  color: 'var(--dp-accent-2)',
                  fontFamily: 'var(--dp-font-mono)',
                }}
              >
                <ShieldCheck size={10} />{b}
              </span>
            ))}
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(2rem,4vw,2.9rem)] font-bold tracking-[-0.03em] leading-[1.06] mb-5"
            style={{ fontFamily: 'var(--dp-font-display)', color: 'var(--dp-fg)' }}
          >
            {title}<br />
            <span style={{ color: 'var(--dp-accent-2)' }}>Modern Developers</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base leading-[1.75] mb-8 max-w-[480px]"
            style={{ color: 'var(--dp-fg-muted)' }}
          >
            {description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex gap-3 flex-wrap mb-8"
          >
            <button
              className="inline-flex items-center gap-2 px-[22px] py-[11px] rounded-[9px] text-[13px] font-semibold text-white border-0 cursor-pointer transition-opacity hover:opacity-80"
              style={{
                background: 'var(--dp-accent)',
                boxShadow: '0 0 28px rgba(220,47,101,0.28), 0 4px 14px rgba(0,0,0,0.3)',
              }}
              onClick={() => window.open('https://accounts.whitebooks.in/signup?type=Developer&subscrid=&inviteId', '_blank')}
            >
              Get API Access <ArrowRight size={14} />
            </button>
            <button
              className="inline-flex items-center gap-2 px-[22px] py-[11px] rounded-[9px] text-[13px] font-semibold cursor-pointer transition-all hover:opacity-80"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--dp-fg)',
              }}
              onClick={() => window.open('https://accounts.whitebooks.in/signup?type=Developer&subscrid=&inviteId', '_blank')}
            >
              Try in Sandbox <ArrowRight size={14} />
            </button>
          </motion.div>

          {/* Trust */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex gap-5 flex-wrap"
          >
            {[{ icon: Shield, label: 'TLS 1.3 Encrypted' }, { icon: Activity, label: 'Real-Time Processing' }, { icon: Globe, label: 'Direct GSTN Integration' }].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon size={12} color="var(--dp-fg-dim)" />
                <span className="text-[11px]" style={{ color: 'var(--dp-fg-dim)' }}>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: API panel */}
        <ApiPanel />
      </div>
    </section>
  );
}

// section 1.1: Architecture
export function GuideArchitecture(): React.ReactElement {
  return (
    <section id="architecture" className="px-6 sm:px-10 lg:px-12 pb-12 sm:pb-14 lg:pb-[60px]">
      <div className="max-w-[980px] mx-auto">
        <h2
          className="text-3xl font-bold mb-2"
          style={{ fontFamily: 'var(--dp-font-display)', color: 'var(--dp-fg)' }}
        >
          Architecture
        </h2>
        <p className="text-base leading-[1.65] mb-6" style={{ color: 'var(--dp-fg-muted)' }}>
          WhiteBooks sits between your application and GSTN, providing a reliable, GSP-licensed relay layer.
        </p>

        {/* SVG Architecture Diagram */}
        <SurfaceCard style={{ padding: 36, overflow: 'auto' }}>
          <svg viewBox="0 0 640 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 640 }}>
            {/* Boxes */}
            {/* Your App */}
            <rect x="20" y="90" width="110" height="48" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" />
            <text x="75" y="110" textAnchor="middle" fill="#9a9aae" fontSize="11" fontFamily="DM Sans, sans-serif">Your App</text>
            <text x="75" y="126" textAnchor="middle" fill="#6b6b80" fontSize="10" fontFamily="JetBrains Mono, monospace">SDK / REST</text>

            {/* WhiteBooks API */}
            <rect x="200" y="82" width="130" height="56" rx="8" fill="rgba(220,47,101,0.1)" stroke="rgba(220,47,101,0.3)" />
            <text x="265" y="106" textAnchor="middle" fill="#ff4d80" fontSize="11" fontFamily="DM Sans, sans-serif" fontWeight="600">WhiteBooks API</text>
            <text x="265" y="122" textAnchor="middle" fill="#9a9aae" fontSize="10" fontFamily="JetBrains Mono, monospace">api.whitebooks.dev</text>

            {/* GSP Layer */}
            <rect x="400" y="82" width="110" height="56" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" />
            <text x="455" y="106" textAnchor="middle" fill="#9a9aae" fontSize="11" fontFamily="DM Sans, sans-serif">GSP Layer</text>
            <text x="455" y="122" textAnchor="middle" fill="#6b6b80" fontSize="10" fontFamily="JetBrains Mono, monospace">Licensed GSP</text>

            {/* GSTN */}
            <rect x="560" y="90" width="68" height="48" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" />
            <text x="594" y="110" textAnchor="middle" fill="#9a9aae" fontSize="11" fontFamily="DM Sans, sans-serif">GSTN</text>
            <text x="594" y="126" textAnchor="middle" fill="#6b6b80" fontSize="10" fontFamily="JetBrains Mono, monospace">Gov. API</text>

            {/* Arrows between main nodes */}
            <line x1="130" y1="114" x2="198" y2="114" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" markerEnd="url(#ar)" />
            <line x1="330" y1="114" x2="398" y2="114" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" markerEnd="url(#ar)" />
            <line x1="510" y1="114" x2="558" y2="114" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" markerEnd="url(#ar)" />

            {/* Webhooks branch */}
            <line x1="265" y1="138" x2="265" y2="165" stroke="rgba(220,47,101,0.3)" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#ar2)" />
            <rect x="210" y="168" width="110" height="38" rx="6" fill="rgba(220,47,101,0.06)" stroke="rgba(220,47,101,0.2)" />
            <text x="265" y="185" textAnchor="middle" fill="#ff4d80" fontSize="10" fontFamily="DM Sans, sans-serif">Webhooks</text>
            <text x="265" y="198" textAnchor="middle" fill="#9a9aae" fontSize="9" fontFamily="JetBrains Mono, monospace">Events &amp; alerts</text>

            {/* Audit branch */}
            <line x1="265" y1="82" x2="265" y2="55" stroke="rgba(96,165,250,0.3)" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#ar3)" />
            <rect x="210" y="20" width="110" height="38" rx="6" fill="rgba(96,165,250,0.06)" stroke="rgba(96,165,250,0.2)" />
            <text x="265" y="37" textAnchor="middle" fill="#60a5fa" fontSize="10" fontFamily="DM Sans, sans-serif">Audit Logs</text>
            <text x="265" y="50" textAnchor="middle" fill="#9a9aae" fontSize="9" fontFamily="JetBrains Mono, monospace">Immutable trail</text>

            {/* Arrow markers */}
            <defs>
              <marker id="ar" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0 0 L6 3 L0 6 Z" fill="rgba(255,255,255,0.2)" />
              </marker>
              <marker id="ar2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0 0 L6 3 L0 6 Z" fill="rgba(220,47,101,0.4)" />
              </marker>
              <marker id="ar3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0 0 L6 3 L0 6 Z" fill="rgba(96,165,250,0.4)" />
              </marker>
            </defs>
          </svg>
        </SurfaceCard>
      </div>
    </section>
  );
}

// ─── Section 2: Stats ─────────────────────────────────────────────────────────

const STATS = [
  { icon: Code, value: '100+', label: 'API Endpoints' },
  { icon: ShieldCheck, value: 'ISO 27001', label: 'Certified Infrastructure' },
  { icon: CheckCircle, value: '100%', label: 'Compliance Ready' },
  { icon: Activity, value: 'Real-Time', label: 'Automation Engine' },
  { icon: TrendingUp, value: '5k+', label: 'Active Integrations' },
  { icon: Terminal, value: 'Free', label: 'Sandbox Environment' },
];

export function StatsSection() {
  return (
    <section className="px-6 sm:px-10 lg:px-12 pb-12 sm:pb-14 lg:pb-[60px]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={stagger}
        className="grid grid-cols-2 sm:grid-cols-3 gap-px rounded-[14px] overflow-hidden max-w-[980px] mx-auto"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        {STATS.map(({ icon: Icon, value, label }) => (
          <motion.div
            key={label}
            variants={fadeUp}
            className="flex flex-col gap-2 p-5 sm:p-6 cursor-default transition-colors duration-200"
            style={{ background: 'var(--dp-surface)' }}
            whileHover={{ background: 'var(--dp-surface-2)' }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(220,47,101,0.08)', border: '1px solid rgba(220,47,101,0.15)' }}
            >
              <Icon size={15} color="var(--dp-accent-2)" />
            </div>
            <div className="text-xl font-bold leading-none" style={{ color: 'var(--dp-fg)', fontFamily: 'var(--dp-font-mono)' }}>{value}</div>
            <div className="text-[11px]" style={{ color: 'var(--dp-fg-muted)' }}>{label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

// ─── Section 3: What You Can Build ───────────────────────────────────────────

const BUILD_CARDS = [
  { icon: FileSpreadsheet, title: 'GST Filing Platforms', body: 'Automate GSTR-1, GSTR-3B, and ITC reconciliation workflows for businesses of any scale.' },
  { icon: GitBranch, title: 'ERP Integrations', body: 'Plug into SAP, Oracle, Tally, and custom ERPs with a unified GST compliance layer.' },
  { icon: QrCode, title: 'e-Invoice Systems', body: 'Generate IRN, signed QR codes, and e-Invoice JSONs directly from your platform.' },
  { icon: BarChart3, title: 'Compliance Dashboards', body: 'Build real-time dashboards tracking filing status, tax liabilities, and GSTIN health.' },
  { icon: Zap, title: 'SaaS Automation', body: 'Embed auto-filing, invoice validation, and tax computation into any SaaS workflow.' },
  { icon: RefreshCw, title: 'Invoice Reconciliation', body: 'Match purchase and sales data against GSTR-2A/2B with programmatic precision.' },
];

function BuildSection() {
  return (
    <section className="px-6 sm:px-10 lg:px-12 py-12 sm:py-14 lg:py-[60px]">
      <div className="max-w-[980px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="mb-10"
        >
          <SectionLabel>Platform</SectionLabel>
          <SectionHeading>What You Can Build</SectionHeading>
          <p className="mt-3.5 text-[14px] max-w-[480px] leading-[1.7]" style={{ color: 'var(--dp-fg-muted)' }}>
            WhiteBooks GST APIs give you the building blocks for any compliance-critical product.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {BUILD_CARDS.map(({ icon: Icon, title, body }) => (
            <motion.div
              key={title}
              variants={scaleIn}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="rounded-[14px] p-5 sm:p-[22px] cursor-default transition-shadow duration-200"
              style={{ background: 'var(--dp-surface-2)', border: '1px solid rgba(255,255,255,0.06)' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(220,47,101,0.2)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 24px rgba(220,47,101,0.08)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
              }}
            >
              <div
                className="w-9 h-9 rounded-[9px] flex items-center justify-center mb-3.5"
                style={{ background: 'rgba(220,47,101,0.08)', border: '1px solid rgba(220,47,101,0.15)' }}
              >
                <Icon size={16} color="var(--dp-accent-2)" />
              </div>
              <div className="text-[13px] font-semibold mb-2" style={{ color: 'var(--dp-fg)', fontFamily: 'var(--dp-font-display)' }}>{title}</div>
              <p className="m-0 text-[12px] leading-[1.65]" style={{ color: 'var(--dp-fg-muted)' }}>{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 4: Core API Capabilities ────────────────────────────────────────

const CAPABILITIES = [
  {
    icon: FileText,
    title: 'GST Return Filing APIs',
    desc: 'Programmatically file GSTR-1, GSTR-3B, and manage ITC reconciliation with real-time GSTN acknowledgement.',
    bullets: ['GSTR-1 / GSTR-3B filing', 'ITC reconciliation (2A/2B)', 'Amendment APIs', 'JSON export ready'],
    snippet: 'POST /api/v2/gstr1/submit\nPOST /api/v2/gstr3b/file',
  },
  {
    icon: Key,
    title: 'Authentication APIs',
    desc: 'Secure taxpayer authentication via OTP, EVC, and DSC. Fully OAuth 2.0 compliant with token refresh support.',
    bullets: ['OTP / EVC authentication', 'DSC-based login', 'Token refresh flow', 'Session management'],
    snippet: 'POST /api/v2/auth/otp/request\nPOST /api/v2/auth/token',
  },
  {
    icon: FileSpreadsheet,
    title: 'Invoice APIs',
    desc: 'Upload, validate, and reconcile invoices against GSTN data. Supports B2B, B2C, exports, and debit/credit notes.',
    bullets: ['Bulk invoice upload', 'GSTN validation layer', '2A/2B matching', 'B2B / B2C / CDN / DBN'],
    snippet: 'POST /api/v2/invoices/upload\nGET  /api/v2/invoices/match',
  },
  {
    icon: QrCode,
    title: 'e-Invoice APIs',
    desc: 'Generate IRN numbers, sign e-Invoices, and embed QR codes compliant with NIC IRP specifications.',
    bullets: ['IRN generation', 'Signed JSON & QR code', 'Bulk e-Invoice support', 'Cancellation & amendment'],
    snippet: 'POST /api/v2/einvoice/generate\nPOST /api/v2/einvoice/cancel',
  },
  {
    icon: Truck,
    title: 'e-Way Bill APIs',
    desc: 'Create, update, cancel, and track e-Way Bills programmatically with real-time NIC portal sync.',
    bullets: ['EWB generation', 'Part-A / Part-B update', 'Multi-vehicle support', 'Cancellation & extension'],
    snippet: 'POST /api/v2/ewb/generate\nPUT  /api/v2/ewb/:ewbno/update',
  },
  {
    icon: Eye,
    title: 'GSTIN Verification APIs',
    desc: 'Real-time taxpayer validation, return filing status lookup, and business entity information from GSTN.',
    bullets: ['GSTIN status check', 'Taxpayer profile fetch', 'Return filing history', 'Bulk GSTIN lookup'],
    snippet: 'GET /api/v2/gstin/:gstin\nGET /api/v2/gstin/:gstin/returns',
  },
];

function CapabilitiesSection() {
  return (
    <section className="px-6 sm:px-10 lg:px-12 py-12 sm:py-14 lg:py-[60px]" style={{ background: 'rgba(13,13,19,0.5)' }}>
      <div className="max-w-[980px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="mb-10"
        >
          <SectionLabel>API Reference</SectionLabel>
          <SectionHeading>Core API Capabilities</SectionHeading>
          <p className="mt-3.5 text-[14px] max-w-[520px] leading-[1.7]" style={{ color: 'var(--dp-fg-muted)' }}>
            Forty-plus endpoints across six API domains, built for production compliance at any scale.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {CAPABILITIES.map(({ icon: Icon, title, desc, bullets, snippet }) => (
            <motion.div key={title} variants={fadeUp}>
              <GlassCard style={{ padding: '22px 20px', height: '100%' }}>
                <div className="flex gap-3 items-start mb-4">
                  <div
                    className="w-9 h-9 rounded-[9px] flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(220,47,101,0.08)', border: '1px solid rgba(220,47,101,0.15)' }}
                  >
                    <Icon size={16} color="var(--dp-accent-2)" />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold mb-[5px]" style={{ color: 'var(--dp-fg)', fontFamily: 'var(--dp-font-display)' }}>{title}</div>
                    <p className="m-0 text-[12px] leading-[1.6]" style={{ color: 'var(--dp-fg-muted)' }}>{desc}</p>
                  </div>
                </div>
                {/* Bullets */}
                <div className="flex flex-wrap gap-1.5 mb-3.5">
                  {bullets.map(b => (
                    <span
                      key={b}
                      className="inline-flex items-center gap-1 px-2 py-[3px] rounded-full text-[10px]"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        color: 'var(--dp-fg-muted)',
                      }}
                    >
                      <Check size={8} color="var(--dp-accent-2)" />{b}
                    </span>
                  ))}
                </div>
                {/* Snippet */}
                <div
                  className="rounded-[7px] px-3 py-2"
                  style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.04)' }}
                >
                  <pre className="m-0 text-[10px] leading-[1.7]" style={{ color: 'var(--dp-fg-dim)', fontFamily: 'var(--dp-font-mono)' }}>{snippet}</pre>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 5: Getting Started ───────────────────────────────────────────────

const STEPS_GST = [
  {
    n: '01',
    icon: Building2,
    title: 'Create GSTIN Sandbox',
    desc: 'Register for a GSTIN sandbox account. Please select GSP as "BVM IT Consulting Services India Pvt Ltd".',
    link: { label: 'Click Here', href: '' },
  },
  {
    n: '02',
    icon: Users,
    title: 'Sign-up with WhiteBooks',
    desc: 'Create your WhiteBooks developer account to access API credentials and the sandbox environment.',
    link: { label: 'Sign up', href: 'https://accounts.whitebooks.in/signup?type=Developer&subscrid=&inviteId=' },
  },
  {
    n: '03',
    icon: Key,
    title: 'Purchase Sandbox Access',
    desc: 'Login → Under GST API → Click on Buy Now to purchase Sandbox.',
    link: null,
  },
  {
    n: '04',
    icon: Zap,
    title: 'Start Using APIs',
    desc: 'Once you receive Sandbox Details from GSTIN, use your GSTIN Username & GSTIN Number along with WhiteBooks API Credentials.',
    link: null,
  },
  {
    n: '05',
    icon: Headphones,
    title: 'GST API Support Forum',
    desc: 'Join the GST Suvidha Provider discussion group for API support and community help.',
    link: { label: 'Click Here', href: 'https://groups.google.com/forum/#!forum/gst-suvidha-provider-gsp-discussion-group' },
  },
  {
    n: '06',
    icon: FileText,
    title: 'GSTIN API Documentation',
    desc: 'Access official GSTIN API Payload and Documentation for detailed integration guides.',
    link: { label: 'Click Here', href: 'https://developer.gst.gov.in/apiportal/taxpayer/returns' },
  },
];

export function GettingStartedSection({ steps }: { steps: typeof STEPS_GST }) {
  return (
    <section className="px-6 sm:px-10 lg:px-12 py-12 sm:py-14 lg:py-[60px]">
      <div className="max-w-[980px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="mb-10"
        >
          <SectionHeading>How To Start</SectionHeading>
          <p className="mt-3.5 text-[16px] max-w-[480px] leading-[1.7]" style={{ color: 'var(--dp-fg-muted)' }}>
            Follow these steps to get started with the GST API integration.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="flex flex-col"
        >
          {steps.map(({ n, icon: Icon, title, desc, link }, i) => (
            <motion.div key={n} variants={fadeUp} className="flex gap-4 relative">
              {i < steps.length - 1 && (
                <div
                  className="absolute left-[17px] top-10 bottom-[-20px] w-px z-0"
                  style={{ background: 'linear-gradient(to bottom, rgba(220,47,101,0.3), rgba(220,47,101,0.05))' }}
                />
              )}
              <div
                className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center z-[1] relative"
                style={{ background: 'rgba(220,47,101,0.1)', border: '1px solid rgba(220,47,101,0.25)' }}
              >
                <Icon size={15} color="var(--dp-accent-2)" />
              </div>
              <div className="pb-7">
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="text-[9px] font-bold"
                    style={{ color: 'var(--dp-accent-2)', fontFamily: 'var(--dp-font-mono)' }}
                  >
                    STEP {n}
                  </span>
                </div>
                <div
                  className="text-[15px] font-semibold mb-1.5"
                  style={{ color: 'var(--dp-fg)', fontFamily: 'var(--dp-font-display)' }}
                >
                  {title}
                </div>
                <p className="m-0 text-[14px] leading-[1.65] max-w-[560px]" style={{ color: 'var(--dp-fg-muted)' }}>
                  {desc}
                  {link && (
                    <>
                      {' '}
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium underline underline-offset-2 transition-opacity hover:opacity-80"
                        style={{ color: 'var(--dp-accent-2)' }}
                      >
                        {link.label}
                        <ExternalLink size={11} />
                      </a>
                    </>
                  )}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 6: Sandbox ───────────────────────────────────────────────────────

const SANDBOX_FEATURES = [
  'API request testing without real GSTN submissions',
  'Invoice simulation and validation dry-runs',
  'Mock IRN generation and e-Way Bill creation',
  'Integration verification before go-live',
  'Sample workflow testing end-to-end',
  'Full request/response logging and replay',
];

const GST_SANDBOX_SETUP_STEPS = [
  {
    n: 1,
    title: 'Sign up with WhiteBooks',
    desc: 'Create your developer account to get started.',
    link: { label: 'Sign up →', href: 'https://accounts.whitebooks.in/signup?type=Developer&subscrid=&inviteId=' },
    icon: Users,
  },
  {
    n: 2,
    title: 'Login to WhiteBooks',
    desc: 'Access your developer dashboard with your credentials.',
    link: { label: 'Login →', href: 'https://accounts.whitebooks.in' },
    icon: Key,
  },
  {
    n: 3,
    title: 'Create Credentials',
    desc: 'Click "Credentials" on the GST API card, then click "Create Credentials" button.',
    link: null,
    icon: Terminal,
  },
  {
    n: 4,
    title: 'Submit Details',
    desc: 'Fill in the required details in the popup and submit to receive your API keys.',
    link: null,
    icon: CheckCircle,
  },
];

export function SandboxSection({ title, subTitle, setupSteps, showOTPBlock = true }: { title: string, subTitle: string, setupSteps: any[], showOTPBlock?: boolean }) {
  return (
    <section
      className="px-6 sm:px-10 lg:px-12 py-12 sm:py-14 lg:py-[60px]"
      style={{ background: 'rgba(13,13,19,0.6)' }}
    >
      <div className="max-w-[980px] mx-auto">
        <SectionHeading>Sandbox API</SectionHeading>

        {/* ── Sandbox API Credential Setup ────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="mt-8"
        >
          {/* Container — dark glass, 3px top accent stripe */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              background: 'var(--dp-surface)',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 0 0 1px rgba(255,255,255,0.02), 0 24px 56px rgba(0,0,0,0.5)',
            }}
          >
            {/* Top accent stripe */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: 'linear-gradient(90deg, rgba(220,47,101,0.6) 0%, rgba(220,47,101,0.15) 55%, transparent 100%)' }}
            />

            {/* Very faint radial wash behind header text */}
            <div
              className="absolute top-0 left-0 w-[500px] h-[180px] pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at top left, rgba(220,47,101,0.04) 0%, transparent 70%)' }}
            />

            {/* ── Header ── */}
            <div className="relative flex flex-col sm:flex-row sm:items-start justify-between gap-4 px-7 pt-7 pb-5"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="flex items-start gap-4">
                {/* Icon block */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    background: 'rgba(220,47,101,0.08)',
                    border: '1px solid rgba(220,47,101,0.18)',
                  }}
                >
                  <Terminal size={16} color="var(--dp-accent-2)" />
                </div>
                <div>
                  <h3
                    className="text-[20px] font-semibold leading-snug m-0 mb-1.5"
                    style={{ color: 'var(--dp-fg)', fontFamily: 'var(--dp-font-display)' }}
                  >
                    {title}
                  </h3>
                  <p className="text-[14px] leading-[1.65] m-0 max-w-[520px]" style={{ color: 'var(--dp-fg-muted)' }}>
                    {subTitle}
                  </p>
                </div>
              </div>
            </div>

            {/* ── Steps grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px p-px"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              {setupSteps.map(({ n, title, desc, link, icon: Icon }) => (
                <div
                  key={n}
                  className="relative flex flex-col justify-between p-6 overflow-hidden transition-colors duration-200 cursor-default"
                  style={{ background: 'var(--dp-surface)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background = 'var(--dp-surface-2)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background = 'var(--dp-surface)';
                  }}
                >
                  {/* Ghosted step number — large, top-right */}
                  <span
                    className="absolute top-4 right-5 text-[40px] font-black tabular-nums select-none leading-none pointer-events-none"
                    style={{
                      color: 'rgba(255,255,255,0.04)',
                      fontFamily: 'var(--dp-font-mono)',
                    }}
                  >
                    {String(n).padStart(2, '0')}
                  </span>

                  {/* Top: icon + step label */}
                  <div className="flex items-center gap-2.5 mb-4">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'rgba(220,47,101,0.07)',
                        border: '1px solid rgba(220,47,101,0.15)',
                      }}
                    >
                      <Icon size={14} color="var(--dp-accent-2)" />
                    </div>
                    {/* <span
                      className="text-[9px] font-bold tracking-[0.1em] uppercase"
                      style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--dp-font-mono)' }}
                    >
                      Step {String(n).padStart(2, '0')}
                    </span> */}
                  </div>

                  {/* Title + desc */}
                  <div className="flex-1">
                    <div
                      className="text-base font-semibold mb-1.5 leading-snug"
                      style={{ color: 'var(--dp-fg)', fontFamily: 'var(--dp-font-display)' }}
                    >
                      {title}
                    </div>
                    <p className="m-0 text-sm leading-[1.65]" style={{ color: 'var(--dp-fg-muted)' }}>
                      {desc}
                    </p>
                  </div>

                  {/* Link — sits at bottom */}
                  {link ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold transition-opacity hover:opacity-70 w-fit"
                      style={{ color: 'var(--dp-accent-2)', fontFamily: 'var(--dp-font-mono)' }}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <div className="mt-4 h-[17px]" />
                  )}
                </div>
              ))}
            </div>

            {/* ── Footer ── */}
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-7 py-4"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.15)' }}
            >
              <div className="flex items-center gap-2">
                <Shield size={11} color="var(--dp-fg-faint)" />
                <span className="text-[11px]" style={{ color: 'var(--dp-fg-faint)', fontFamily: 'var(--dp-font-mono)' }}>
                  Sandbox credentials are isolated — no real GSTN data is touched
                </span>
              </div>
              <button
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-[12px] font-semibold cursor-pointer transition-all hover:opacity-80 whitespace-nowrap"
                style={{
                  background: 'var(--dp-accent)',
                  border: 'none',
                  color: '#fff',
                  boxShadow: '0 0 18px rgba(220,47,101,0.22), 0 2px 10px rgba(0,0,0,0.3)',
                }}
                onClick={() => window.open('https://accounts.whitebooks.in/signup?type=Developer&subscrid=&inviteId=', '_blank')}
              >
                <Zap size={14} /> Get Sandbox Access
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── OTP info tag ── */}
        {showOTPBlock && <div
          className="mt-4 flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{
            background: 'rgba(251,191,36,0.05)',
            border: '1px solid rgba(251,191,36,0.18)',
          }}
        >
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)' }}
          >
            <AlertCircle size={13} color="#fbbf24" />
          </div>
          <p className="m-0 text-[13px] leading-[1.6]" style={{ color: 'var(--dp-fg-muted)' }}>
            <span className="font-semibold" style={{ color: '#fbbf24' }}>Default OTP&nbsp;</span>
            for GSTR1 authentication in sandbox is&nbsp;
            <span style={{ color: '#fbbf24' }}>575757</span>
          </p>
        </div>}

      </div>
    </section>

  );
}

// ─── Section 7: Integration Workflow ─────────────────────────────────────────

const WORKFLOW = [
  { step: '01', title: 'Authenticate User', desc: 'OTP / EVC / DSC login via government portal credentials.', tag: 'Auth API', color: 'rgba(220,47,101,0.2)', tcolor: 'var(--dp-accent-2)' },
  { step: '02', title: 'Upload Invoice Data', desc: 'Push invoice records — B2B, B2C, exports — via batch or single API.', tag: 'Invoice API', color: 'rgba(96,165,250,0.15)', tcolor: '#60a5fa' },
  { step: '03', title: 'Save Return Data', desc: 'Draft return data is saved to GSTN staging before submission.', tag: 'Returns API', color: 'rgba(251,191,36,0.12)', tcolor: '#fbbf24' },
  { step: '04', title: 'Submit Return', desc: 'Trigger formal GSTR submission with idempotent request handling.', tag: 'Submit API', color: 'rgba(34,197,94,0.12)', tcolor: '#22c55e' },
  { step: '05', title: 'Proceed to File', desc: 'Confirm submission summary and queue for e-filing.', tag: 'File API', color: 'rgba(167,139,250,0.12)', tcolor: '#a78bfa' },
  { step: '06', title: 'Complete Filing via EVC', desc: 'Verify with OTP or EVC to finalize official GSTN filing.', tag: 'EVC API', color: 'rgba(34,197,94,0.15)', tcolor: '#22c55e' },
];

function WorkflowSection() {
  return (
    <section className="px-6 sm:px-10 lg:px-12 py-12 sm:py-14 lg:py-[60px]">
      <div className="max-w-[980px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="mb-10"
        >
          <SectionLabel>Integration</SectionLabel>
          <SectionHeading>Filing Workflow</SectionHeading>
          <p className="mt-3.5 text-[14px] max-w-[480px] leading-[1.7]" style={{ color: 'var(--dp-fg-muted)' }}>
            A six-step compliance pipeline from authentication to final e-filing confirmation.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
        >
          {WORKFLOW.map(({ step, title, desc, tag, color, tcolor }, i) => (
            <motion.div key={step} variants={fadeUp}>
              <GlassCard style={{ padding: '18px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: color, border: `1px solid ${tcolor}30` }}
                >
                  <span className="text-[10px] font-bold" style={{ color: tcolor, fontFamily: 'var(--dp-font-mono)' }}>{step}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-[5px]">
                    <span className="text-[13px] font-semibold" style={{ color: 'var(--dp-fg)', fontFamily: 'var(--dp-font-display)' }}>{title}</span>
                    <span
                      className="text-[9px] px-1.5 py-0.5 rounded font-semibold"
                      style={{ background: color, color: tcolor, fontFamily: 'var(--dp-font-mono)' }}
                    >
                      {tag}
                    </span>
                  </div>
                  <p className="m-0 text-[12px] leading-[1.6]" style={{ color: 'var(--dp-fg-muted)' }}>{desc}</p>
                </div>
                {i % 2 === 0 && i < WORKFLOW.length - 1 && (
                  <ChevronRight size={14} color="var(--dp-fg-faint)" className="flex-shrink-0 mt-2 hidden sm:block" />
                )}
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 8: API Categories ────────────────────────────────────────────────

const API_CATS = [
  {
    icon: Globe,
    title: 'Public APIs',
    desc: 'Open endpoints for GSTIN lookup, taxpayer search, and HSN/SAC code validation. No auth required.',
    tags: ['GSTIN lookup', 'HSN/SAC search', 'Rate finder'],
  },
  {
    icon: Users,
    title: 'Taxpayer APIs',
    desc: 'Authenticated APIs for filing returns, managing invoices, viewing ledger, and taxpayer profile operations.',
    tags: ['GSTR filing', 'ITC ledger', 'Taxpayer profile'],
  },
  {
    icon: QrCode,
    title: 'e-Invoice APIs',
    desc: 'NIC IRP-compliant APIs for IRN generation, signed invoice JSON, QR code attachment, and cancellation.',
    tags: ['IRN generation', 'Signed JSON', 'QR code', 'Cancel'],
  },
  {
    icon: Truck,
    title: 'e-Way Bill APIs',
    desc: 'End-to-end EWB lifecycle management — create, update, extend, verify, and cancel with real-time NIC sync.',
    tags: ['EWB create', 'Part-B update', 'Multi-vehicle', 'Cancel'],
  },
];

function CategoriesSection() {
  return (
    <section className="px-6 sm:px-10 lg:px-12 py-12 sm:py-14 lg:py-[60px]" style={{ background: 'rgba(13,13,19,0.5)' }}>
      <div className="max-w-[980px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="mb-10"
        >
          <SectionLabel>API Suite</SectionLabel>
          <SectionHeading>API Categories</SectionHeading>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {API_CATS.map(({ icon: Icon, title, desc, tags }) => (
            <motion.div
              key={title}
              variants={scaleIn}
              whileHover={{ y: -2, transition: { duration: 0.18 } }}
            >
              <GlassCard style={{ padding: '22px 20px' }}>
                <div className="flex items-center gap-3 mb-3.5">
                  <div
                    className="w-9 h-9 rounded-[9px] flex items-center justify-center"
                    style={{ background: 'rgba(220,47,101,0.08)', border: '1px solid rgba(220,47,101,0.15)' }}
                  >
                    <Icon size={16} color="var(--dp-accent-2)" />
                  </div>
                  <div className="text-[14px] font-bold" style={{ color: 'var(--dp-fg)', fontFamily: 'var(--dp-font-display)' }}>{title}</div>
                </div>
                <p className="m-0 mb-3.5 text-[12px] leading-[1.65]" style={{ color: 'var(--dp-fg-muted)' }}>{desc}</p>
                <div className="flex flex-wrap gap-[5px]">
                  {tags.map(t => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-[3px] rounded"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        color: 'var(--dp-fg-dim)',
                        fontFamily: 'var(--dp-font-mono)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 9: Why WhiteBooks ────────────────────────────────────────────────

const WHY_ITEMS = [
  { icon: Zap, title: 'Automated GST Compliance', body: 'Replace manual filing workflows with fully automated API-driven processes. Zero human error.' },
  { icon: RefreshCw, title: 'Reduced Manual Work', body: '80% reduction in compliance overhead with intelligent auto-mapping and reconciliation.' },
  { icon: TrendingUp, title: 'Scalable Architecture', body: 'Handle thousands of invoices per minute. Horizontal scaling with zero configuration.' },
  { icon: CheckCircle, title: 'Accurate Tax Computation', body: 'GST rate lookup, HSN mapping, and ITC matching done automatically with GSTN-sourced data.' },
  { icon: Server, title: 'Enterprise Integration Ready', body: 'Native connectors for SAP, Oracle, Tally, and open webhook/REST bridges for custom ERPs.' },
  { icon: Shield, title: 'Secure Infrastructure', body: 'TLS 1.3, SOC 2 Type II, data residency in India. GSTN-mandated signing flows built in.' },
];

function WhySection() {
  return (
    <section className="px-6 sm:px-10 lg:px-12 py-12 sm:py-14 lg:py-[60px]">
      <div className="max-w-[980px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="mb-10"
        >
          <SectionLabel>Why WhiteBooks</SectionLabel>
          <SectionHeading>Built for Production<br />Compliance at Scale</SectionHeading>
          <p className="mt-3.5 text-[14px] max-w-[500px] leading-[1.7]" style={{ color: 'var(--dp-fg-muted)' }}>
            WhiteBooks is the infrastructure layer for compliance-critical applications. Not just another API — a GSP-certified platform built for the demands of enterprise fintech.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {WHY_ITEMS.map(({ icon: Icon, title, body }) => (
            <motion.div key={title} variants={fadeUp}>
              <GlassCard style={{ padding: '20px' }}>
                <div
                  className="w-[34px] h-[34px] rounded-lg flex items-center justify-center mb-3.5"
                  style={{ background: 'rgba(220,47,101,0.08)', border: '1px solid rgba(220,47,101,0.15)' }}
                >
                  <Icon size={15} color="var(--dp-accent-2)" />
                </div>
                <div className="text-[12px] font-semibold mb-[7px]" style={{ color: 'var(--dp-fg)', fontFamily: 'var(--dp-font-display)' }}>{title}</div>
                <p className="m-0 text-[12px] leading-[1.65]" style={{ color: 'var(--dp-fg-muted)' }}>{body}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 10: Best Practices ───────────────────────────────────────────────

const BEST_PRACTICES = [
  {
    icon: Terminal,
    title: 'Use Sandbox Before Production',
    body: 'Always validate integration against the sandbox environment. The sandbox mirrors production schema exactly — no surprises at go-live.',
    tip: 'Set BASE_URL=https://sandbox.whitebooks.in/api/v2',
  },
  {
    icon: Clock,
    title: 'Handle Token Expiration',
    body: 'Access tokens expire after 3600 seconds. Implement automatic token refresh logic before expiry to avoid 401 errors mid-session.',
    tip: 'if (token.expires_in < 300) refreshToken()',
  },
  {
    icon: AlertCircle,
    title: 'Validate Invoice Data',
    body: 'Use the /validate endpoint before submission to catch GSTIN mismatches, invalid HSN codes, and tax computation errors upfront.',
    tip: 'POST /api/v2/invoices/validate',
  },
  {
    icon: Database,
    title: 'Maintain Audit Logs',
    body: 'Store all API request/response payloads with timestamps for compliance audit trails. Include IRN and ACK numbers in your records.',
    tip: 'Log: irn, ack_no, timestamp, gstin',
  },
];

export function BestPracticesSection() {
  return (
    <section className="px-6 sm:px-10 lg:px-12 py-12 sm:py-14 lg:py-[60px]" style={{ background: 'rgba(13,13,19,0.6)' }}>
      <div className="max-w-[980px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="mb-10"
        >
          <SectionHeading>Best Practices</SectionHeading>
          <p className="mt-3.5 text-base max-w-[480px] leading-[1.7]" style={{ color: 'var(--dp-fg-muted)' }}>
            Follow these patterns for production-grade, maintainable GST integrations.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {BEST_PRACTICES.map(({ icon: Icon, title, body, tip }) => (
            <motion.div key={title} variants={fadeUp} className="h-full">
              <GlassCard style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(220,47,101,0.08)', border: '1px solid rgba(220,47,101,0.15)' }}
                  >
                    <Icon size={14} color="var(--dp-accent-2)" />
                  </div>
                  <div className="text-lg font-semibold" style={{ color: 'var(--dp-fg)', fontFamily: 'var(--dp-font-display)' }}>{title}</div>
                </div>
                <p className="m-0 text-sm leading-[1.65] flex-1" style={{ color: 'var(--dp-fg-muted)' }}>{body}</p>
                <div
                  className="rounded-[6px] px-3 py-2 overflow-x-auto"
                  style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.04)' }}
                >
                  <code className="text-xs whitespace-nowrap" style={{ color: 'var(--dp-fg-dim)', fontFamily: 'var(--dp-font-mono)' }}>{tip}</code>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 11: Support & Resources ─────────────────────────────────────────

const RESOURCES = [
  { icon: BookOpen, title: 'API Reference', desc: 'Full endpoint documentation with request/response schemas, error codes, and examples.', tag: 'Docs' },
  { icon: QrCode, title: 'e-Invoice Docs', desc: 'Step-by-step guide for IRN generation, signed JSON structure, and QR code compliance.', tag: 'Guide' },
  { icon: FileText, title: 'Return Filing Guide', desc: 'Complete walkthrough for GSTR-1, GSTR-3B, and annual return API workflows.', tag: 'Guide' },
  { icon: PlayCircle, title: 'Sandbox Videos', desc: 'Video walkthroughs covering API testing, common error handling, and sandbox setup.', tag: 'Video' },
  { icon: Package, title: 'Developer Resources', desc: 'Postman collections, SDKs, sample apps, and integration starter kits.', tag: 'Downloads' },
];

function ResourcesSection() {
  return (
    <section className="px-6 sm:px-10 lg:px-12 py-12 sm:py-14 lg:py-[60px]">
      <div className="max-w-[980px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="mb-10"
        >
          <SectionLabel>Resources</SectionLabel>
          <SectionHeading>Support &amp; Documentation</SectionHeading>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5"
        >
          {RESOURCES.map(({ icon: Icon, title, desc, tag }) => (
            <motion.div
              key={title}
              variants={scaleIn}
              whileHover={{ y: -3, transition: { duration: 0.18 } }}
              className="cursor-pointer"
            >
              <GlassCard style={{ padding: '18px', height: '100%', transition: 'border-color 0.2s, box-shadow 0.2s' }}>
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-[34px] h-[34px] rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(220,47,101,0.08)', border: '1px solid rgba(220,47,101,0.15)' }}
                  >
                    <Icon size={15} color="var(--dp-accent-2)" />
                  </div>
                  <ExternalLink size={12} color="var(--dp-fg-faint)" />
                </div>
                <div className="text-[12px] font-semibold mb-1.5" style={{ color: 'var(--dp-fg)', fontFamily: 'var(--dp-font-display)' }}>{title}</div>
                <p className="m-0 mb-2.5 text-[11px] leading-[1.6]" style={{ color: 'var(--dp-fg-muted)' }}>{desc}</p>
                <span
                  className="text-[9px] px-[7px] py-0.5 rounded"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    color: 'var(--dp-fg-dim)',
                    fontFamily: 'var(--dp-font-mono)',
                  }}
                >
                  {tag}
                </span>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 12: Final CTA ────────────────────────────────────────────────────

export function CtaSection() {
  return (
    <section className="relative px-6 sm:px-10 lg:px-12 pt-16 pb-20 overflow-hidden">
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-[50%] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(220,47,101,0.1), transparent 65%)' }}
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={fadeUp}
        className="max-w-[620px] mx-auto text-center relative z-[1]"
      >
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-6"
          style={{ background: 'rgba(220,47,101,0.07)', border: '1px solid rgba(220,47,101,0.18)' }}
        >
          <span
            className="block w-[6px] h-[6px] rounded-full"
            style={{ background: 'var(--dp-accent)', boxShadow: '0 0 8px var(--dp-accent)' }}
          />
          <span
            className="text-[10px] font-bold tracking-[0.08em]"
            style={{ color: 'var(--dp-accent-2)', fontFamily: 'var(--dp-font-mono)' }}
          >
            GST SUVIDHA PROVIDER · ISO 27001:2013
          </span>
        </div>

        <h2
          className="text-[clamp(1.8rem,4vw,2.6rem)] font-bold tracking-[-0.03em] leading-[1.1] mb-[18px]"
          style={{ fontFamily: 'var(--dp-font-display)', color: 'var(--dp-fg)' }}
        >
          Start Building GST Automation<br />
          <span style={{ fontFamily: 'var(--dp-font-display)', color: 'var(--dp-accent-2)' }}>at Scale</span>
        </h2>

        <p className="text-[14px] leading-[1.75] mb-9" style={{ color: 'var(--dp-fg-muted)' }}>
          Join thousands of developers building the next generation of GST-compliant platforms. Production-ready. Enterprise-grade. Developer-first.
        </p>

        <div className="flex justify-center gap-3 flex-wrap mb-8">
          <button
            className="inline-flex items-center gap-2 px-7 py-[13px] rounded-[10px] text-[14px] font-semibold text-white border-0 cursor-pointer"
            style={{
              background: 'var(--dp-accent)',
              boxShadow: '0 0 32px rgba(220,47,101,0.3), 0 4px 16px rgba(0,0,0,0.3)',
            }}
          >
            Get API Access <ArrowRight size={15} />
          </button>
          <button
            className="inline-flex items-center gap-2 px-7 py-[13px] rounded-[10px] text-[14px] font-semibold cursor-pointer"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--dp-fg)',
            }}
          >
            <BookOpen size={15} /> Read the Docs
          </button>
        </div>

        {/* Trust row */}
        <div className="flex justify-center gap-6 flex-wrap">
          {[{ icon: Shield, label: 'Govt-Certified GSP' }, { icon: Star, label: 'Sandbox Included' }, { icon: Headphones, label: 'Developer Support' }].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <Icon size={12} color="var(--dp-fg-dim)" />
              <span className="text-[11px]" style={{ color: 'var(--dp-fg-dim)' }}>{label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─── Section: SDKs & Libraries ───────────────────────────────────────────────
export interface SdkType {
  name: string;
  version: string;
  logoUrl: string;
  href: string;
}
const GST_SDK_ITEMS: SdkType[] = [
  { name: 'Postman', version: 'v2.1.0', logoUrl: sdkPostman, href: '#' },
];

function SdkCard({ sdk }: { sdk: SdkType }) {
  const glowRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (glowRef.current) {
      glowRef.current.style.transform = `translate(${e.clientX - rect.left - rect.width / 2}px, ${e.clientY - rect.top - rect.height / 2}px)`;
    }
  };

  return (
    <div
      className="sdk-glass-card rounded-xl overflow-hidden flex flex-col items-center relative group cursor-pointer p-8"
      onMouseMove={handleMouseMove}
    >
      <div ref={glowRef} className="sdk-accent-glow absolute w-48 h-48 rounded-full opacity-0" />
      <div className="relative z-10 w-16 h-16 mb-7 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-300">
        <img
          src={sdk.logoUrl}
          alt={sdk.name}
          className="w-full h-full object-contain"
          style={{ filter: 'grayscale(100%) invert(1) brightness(1.1)' }}
        />
      </div>
      <h3
        className="font-bold text-base text-center mb-1"
        style={{ color: 'var(--dp-fg)', fontFamily: 'var(--dp-font-display)' }}
      >
        {sdk.name}
      </h3>
      <a
        href={sdk.href}
        className="sdk-download-btn w-full mt-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium transition-all no-underline"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.06)',
          color: 'var(--dp-fg)',
        }}
      >
        <span>Download SDK</span>
        <ExternalLink size={13} />
      </a>
    </div>
  );
}

export function SdkLibrariesSection({ sdkItems }: { sdkItems: SdkType[] }) {
  return (
    <section className="px-6 sm:px-10 lg:px-12 py-12 sm:py-14 lg:py-[60px]">
      <div className="max-w-[980px] mx-auto">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          className="mb-10"
        >
          <h2
            className="text-[clamp(1.8rem,4vw,2.6rem)] font-bold tracking-[-0.03em] leading-[1.1] mb-3"
            style={{ fontFamily: 'var(--dp-font-display)', color: 'var(--dp-fg)' }}
          >
            SDKs &amp; Libraries
          </h2>
          <p className="text-base leading-[1.75] mb-2" style={{ color: 'var(--dp-fg-muted)' }}>
            Integrate seamlessly with our collection of high-performance client libraries. Built for stability and
            optimized for developer productivity across your stack.
          </p>
          <p className="text-base leading-[1.75] mb-2" style={{ color: 'var(--dp-fg-muted)' }}>
            Download and unzip the file and open it with the related application.
            <span className="text-[#dc2f65] underline pl-1" >Please Login/Sign up to download the files.</span>
          </p>

        </motion.div>

        {/* SDK Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {sdkItems.map((sdk) => (
            <motion.div key={sdk.name} variants={fadeUp}>
              <SdkCard sdk={sdk} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────

export default function GstOverview(): React.ReactElement {
  return (
    <div className="min-h-screen" style={{ background: 'var(--dp-bg)' }}>
      <HeroSection title='GST APIs' description='The WhiteBooks GST API gives developers programmatic access to GSTR-1 / GSTR-3B / GSTR-9 filing, GSTR-2B fetch, GSTIN verification, and HSN/SAC lookup through the certified GSP channel to the GSTN.' />
      <Divider />
      <StatsSection />
      <Divider />
      <GuideArchitecture />
      <Divider />
      {/* <BuildSection />
      <Divider />
      <CapabilitiesSection />
      <Divider /> */}
      <GettingStartedSection steps={STEPS_GST} />
      <Divider />
      <SandboxSection
        title='WhiteBooks GST API Sandbox Information'
        subTitle='To use GST API Sandbox Credentials, follow the steps below to generate your API keys from the developer dashboard.'
        setupSteps={GST_SANDBOX_SETUP_STEPS}
      />
      {/* <Divider />
      <WorkflowSection /> */}
      {/* <Divider />
      <CategoriesSection /> */}
      {/* <Divider />
      <WhySection /> */}
      <Divider />
      <BestPracticesSection />
      {/* <Divider />
      <ResourcesSection /> */}
      {/* <Divider />
      <GstGetStarted /> */}
      <Divider />
      <SdkLibrariesSection sdkItems={GST_SDK_ITEMS} />
      <Divider />
      {/* gst resources */}
      <GstResources resources={GST_RESOURCE_ITEMS} faqs={GST_FAQS} />
      <Divider />
      {/* <CtaSection /> */}
      <FinalCTA
        eyebrowLabel="GST SUVIDHA PROVIDER | ISO 27001:2013"
        headingStart='Scale '
        headingAccent='GST Compliance'
        headingEnd='with Powerful APIs'
        description='Integrate WhiteBooks GST APIs into your ERP, accounting software, fintech platform, or SaaS application to automate GST filing, GSTIN verification, reconciliation, invoicing, and tax compliance workflows with scalable production-ready APIs.'
        trustItems={['GST Return Filing APIs', 'GSTIN Verification', 'Sandbox & Production Access']}
        primaryButton={{ label: 'Get API Access', href: SIGNUP_URL }}
        secondaryButton={{ label: 'Read the Docs', href: '#' }}
      />
    </div>
  );
}
