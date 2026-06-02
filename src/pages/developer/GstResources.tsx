import React, { useState } from 'react';
import {
  Download, ChevronDown,
  Phone, ExternalLink, Eye,
} from 'lucide-react';
import { FaqType, GST_FAQS, GST_RESOURCE_ITEMS, ResourceAction, ResourceItem } from '@/data/gst-api-page-data';


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

function FaqItem({ item, }: { item: FaqType }) {
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

export default function GstResources({ resources, faqs }: { resources: ResourceItem[], faqs: FaqType[] }): React.ReactElement {

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
        {resources.map(item => (
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
          {faqs.map(faq => (
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
