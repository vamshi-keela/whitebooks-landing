import React, { useState } from 'react';
import {
  Download, Shield, FileText, AlertCircle, ChevronDown,
  Phone, ExternalLink, Braces, Building2, MapPin, Users, Eye,
  type LucideIcon,
  Building,
} from 'lucide-react';

/* ─── Types ─────────────────────────────────────────────────────────────────── */

type ResourceVariant = 'download' | 'guide' | 'online' | 'join';

interface ResourceAction {
  label: string;
  href: string;
  variant: ResourceVariant;
}

interface ResourceItem {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  desc?: string;
  actions: ResourceAction[];
  wide?: boolean;
  accent?: boolean;
}

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const RESOURCE_ITEMS: ResourceItem[] = [
  {
    icon: Shield,
    title: 'SSL Certificate',
    subtitle: '.CRT',
    actions: [{ label: 'Download', href: '/static/pdfs/whitebooks-Certificate.crt', variant: 'download' }],
  },
  {
    icon: FileText,
    title: 'GST API Reference Docs',
    subtitle: '.DOCX',
    actions: [{ label: 'Download', href: '/static/pdfs/whitebooks-gst-api-documentation.docx', variant: 'download' }],
  },
  {
    icon: AlertCircle,
    title: 'Error Codes Schema',
    subtitle: '.PDF',
    actions: [{ label: 'Download', href: '/static/pdfs/gst-api-error-codes.pdf', variant: 'download' }],
  },
  {
    icon: Braces,
    title: 'New GSTR1 Returns Filing Approach.',
    subtitle: '.PDF',
    actions: [{ label: 'Download', href: '/static/pdfs/new-reurn-file-doc.pdf', variant: 'download' }],
  },
  {
    icon: Building,
    title: 'Return Filing Through API',
    subtitle: '.PDF',
    actions: [
      { label: 'Download', href: '/static/pdfs/return-filing-through-api-v1.1.pdf', variant: 'download' },
    ],
  },
  {
    icon: Building2,
    title: 'GSTIN API Documentation',
    desc: 'Visit GST Gov Portal for GSTIN API Documentation',
    actions: [
      { label: 'Visit', href: 'https://developer.gst.gov.in/apiportal/taxpayer/returns', variant: 'online' },
    ],
  },
  {
    icon: Users,
    title: 'Join GSP/ASP Community',
    subtitle: 'GOOGLE GROUP',
    actions: [{ label: 'Join', href: 'https://groups.google.com/forum/#!forum/gst-suvidha-provider-gsp-discussion-group', variant: 'join' }],
    accent: true,
  },
];

const FAQS = [
  {
    q: 'Is this API compliant with the latest GST laws?',
    a: 'Yes. WhiteBooks GST API is updated within 24 hours of any GSTN notification or legal amendment. Our compliance team monitors all GST council updates and the API schema is versioned to ensure backward compatibility during transitions.',
  },
  {
    q: 'How is API security and data privacy handled?',
    a: 'All API communication is encrypted via TLS 1.3. Client credentials are stored as salted hashes. We maintain SOC 2 Type II compliance and conduct quarterly penetration tests. Taxpayer data is never stored beyond the session window and is processed in ISO 27001-certified data centers.',
  },
  {
    q: 'Do you support global compliance formats?',
    a: 'In addition to the Indian GST API, WhiteBooks offers a dedicated KSA e-Invoice API compliant with ZATCA Phase 2 requirements, with ZatcaXML generation and cryptographic stamp verification built in.',
  },
  {
    q: 'What rate limits apply to the Sandbox environment?',
    a: 'The Sandbox tier has no rate limits on test requests. Production API limits depend on your subscription plan — Starter plans include 10,000 requests/month, while Enterprise plans offer custom quotas with SLA guarantees.',
  },
  {
    q: 'Can I use the API for bulk GSTR filing?',
    a: 'Yes. The GST API supports bulk operations for GSTR-1, GSTR-3B, and reconciliation workflows. You can submit up to 1,000 invoice records in a single batch request using the /bulk endpoints documented in the API reference.',
  },
];

/* ─── Sub-components ────────────────────────────────────────────────────────── */

function ActionBtn({ label, href, variant }: ResourceAction) {
  const isExternal = href.startsWith('http') || href.endsWith('.crt') || href.endsWith('.pdf') || href.endsWith('.docx') || href.endsWith('.csv');

  if (variant === 'guide') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-[7px] rounded-[7px] text-[11px] font-semibold no-underline transition-opacity hover:opacity-80"
        style={{
          background: 'rgba(220,47,101,0.14)',
          border: '1px solid rgba(220,47,101,0.28)',
          color: 'var(--dp-accent-2)',
          fontFamily: 'var(--dp-font-display)',
        }}
      >
        <Download size={11} />
        {label}
      </a>
    );
  }

  if (variant === 'online') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-[7px] rounded-[7px] text-[11px] font-semibold no-underline transition-opacity hover:opacity-80"
        style={{
          background: 'transparent',
          border: '1px solid rgba(255,255,255,0.12)',
          color: 'var(--dp-fg-muted)',
          fontFamily: 'var(--dp-font-display)',
        }}
      >
        <Eye size={11} />
        {label}
      </a>
    );
  }

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel="noopener noreferrer"
      className="inline-flex items-center gap-[7px] text-[10px] font-semibold uppercase tracking-[0.09em] no-underline transition-opacity hover:opacity-70"
      style={{ color: 'var(--dp-fg-dim)', fontFamily: 'var(--dp-font-mono)' }}
    >
      {label}
      {variant === 'join' ? <ExternalLink size={11} /> : <Download size={11} />}
    </a>
  );
}

function ResourceCard({ item }: { item: ResourceItem }) {
  const Icon = item.icon;
  return (
    <div
      className="flex items-center gap-4 px-5 py-[15px] rounded-[10px] h-full transition-colors duration-200"
      style={{ background: 'var(--dp-surface-2)', border: '1px solid var(--dp-border)' }}
    >
      <div
        className="w-10 h-10 rounded-[9px] flex items-center justify-center shrink-0"
        style={{
          background: item.accent ? 'rgba(220,47,101,0.12)' : 'rgba(255,255,255,0.04)',
          border: item.accent ? '1px solid rgba(220,47,101,0.22)' : '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <Icon size={16} style={{ color: item.accent ? 'var(--dp-accent-2)' : 'var(--dp-fg-dim)' }} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold leading-snug m-0" style={{ color: 'var(--dp-fg)' }}>
          {item.title}
        </p>
        {item.subtitle && (
          <p
            className="text-[10px] uppercase tracking-[0.07em] mt-[3px] m-0"
            style={{ color: 'var(--dp-fg-dim)', fontFamily: 'var(--dp-font-mono)' }}
          >
            {item.subtitle}
          </p>
        )}
        {item.desc && (
          <p className="text-[12px] leading-[1.6] mt-[5px] m-0" style={{ color: 'var(--dp-fg-muted)' }}>
            {item.desc}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {item.actions.map(a => <ActionBtn key={a.label} {...a} />)}
      </div>
    </div>
  );
}

function FaqItem({ item }: { item: typeof FAQS[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-[10px] overflow-hidden transition-all duration-200"
      style={{ border: '1px solid var(--dp-border)', background: 'var(--dp-surface-2)' }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
        style={{ background: 'none', border: 'none' }}
      >
        <span className="text-base font-semibold pr-4" style={{ color: 'var(--dp-fg)' }}>
          {item.q}
        </span>
        <ChevronDown
          size={15}
          className="shrink-0 transition-transform duration-200"
          style={{
            color: 'var(--dp-fg-dim)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>
      {open && (
        <div
          className="px-5 pb-4 text-base leading-relaxed"
          style={{ color: 'var(--dp-fg-muted)', borderTop: '1px solid var(--dp-border)' }}
        >
          <div className="pt-3">{item.a}</div>
        </div>
      )}
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────────── */

export default function GstResources(): React.ReactElement {
  return (
    <section className="py-10 px-4 sm:px-0 max-w-[980px] sm:mx-auto">
      {/* Header */}
      <div className="mb-5">
        <h1
          className="text-[2rem] font-bold leading-tight mb-3"
          style={{ fontFamily: 'var(--dp-font-display)', color: 'var(--dp-fg)' }}
        >
          Additional Resources
        </h1>
      </div>

      {/* Resource cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
        {RESOURCE_ITEMS.map(item => (
          <div key={item.title} className={item.wide ? 'sm:col-span-2' : ''}>
            <ResourceCard item={item} />
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="mb-12">
        <h2
          className="text-3xl sm:text-2xl font-bold mb-6"
          style={{ fontFamily: 'var(--dp-font-display)', color: 'var(--dp-fg)' }}
        >
          Frequently Asked Questions
        </h2>
        <div className="space-y-2">
          {FAQS.map(faq => (
            <FaqItem key={faq.q} item={faq} />
          ))}
        </div>
      </div>

      {/* Support CTA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          className="rounded-[12px] p-5 flex items-start gap-4"
          style={{ background: 'var(--dp-surface-2)', border: '1px solid var(--dp-border)' }}
        >
          <div
            className="w-9 h-9 rounded-[9px] flex items-center justify-center shrink-0"
            style={{ background: 'rgba(220,47,101,0.1)', border: '1px solid rgba(220,47,101,0.2)' }}
          >
            <Phone size={16} style={{ color: 'var(--dp-accent-2)' }} />
          </div>
          <div>
            <div className="font-semibold text-base sm:text-sm mb-1" style={{ color: 'var(--dp-fg)' }}>
              Talk to Sales
            </div>
            <div className="text-base sm:text-sm mb-2" style={{ color: 'var(--dp-fg-muted)' }}>
              Need enterprise limits or custom integration support?
            </div>
            <a
              href="tel:+919032111788"
              className="text-base sm:text-xs font-semibold"
              style={{ color: 'var(--dp-accent-2)', textDecoration: 'none' }}
            >
              +91 9032111788
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
