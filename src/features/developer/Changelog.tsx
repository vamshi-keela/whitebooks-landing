import React from 'react';
import { SeoHead } from '../../seo/components/SeoHead';
import { SITE } from '../../seo/config/site';

type EntryType = 'Added' | 'Fixed' | 'Improved' | 'Changed' | 'Deprecated' | 'Breaking';

interface Release {
  version: string;
  date: string;
  entries: { type: EntryType; text: string }[];
}

const RELEASES: Release[] = [
  {
    version: 'v3.4.0',
    date: 'Jun 3, 2026',
    entries: [
      { type: 'Added', text: '45 API endpoint reference landing pages across the GST, e-Invoice, and e-Way Bill namespaces, each with schema markup.' },
      { type: 'Added', text: 'Embedded product demos on the /apis hub and a 12-brand customer logo strip.' },
      { type: 'Added', text: 'Public JSON error catalog at /docs/errors documenting 14 error codes.' },
      { type: 'Fixed', text: 'Mobile responsive layout issues across 320px–1024px viewports.' },
      { type: 'Fixed', text: 'Double-slash blog URLs and favicon declarations on 31 use-case pages.' },
    ],
  },
  {
    version: 'v3.2.0',
    date: 'May 22, 2026',
    entries: [
      { type: 'Added', text: 'Public OpenAPI 3.0 specifications at stable URLs for all APIs.' },
      { type: 'Added', text: 'Comparison pages versus Masters India, ClearTax, and Quicko Sandbox.' },
      { type: 'Added', text: 'Public status page with 30/90-day uptime and incident history.' },
    ],
  },
  {
    version: 'v3.1.2',
    date: 'May 10, 2026',
    entries: [
      { type: 'Fixed', text: 'e-Invoice API p95 latency regression — IRN response time back below 350ms.' },
      { type: 'Fixed', text: 'e-Way Bill NIC transient 5xx handling now retries with exponential backoff.' },
    ],
  },
  {
    version: 'v3.1.1',
    date: 'Apr 18, 2026',
    entries: [
      { type: 'Added', text: 'SDK releases for Node.js, Python, and Java with webhook callback support.' },
    ],
  },
  {
    version: 'v3.1.0',
    date: 'Mar 25, 2026',
    entries: [
      { type: 'Added', text: 'KSA ZATCA Phase-2 reporting-mode endpoint for simplified tax invoices.' },
      { type: 'Added', text: 'Bulk e-Way Bill endpoint accepting up to 1,000 EWBs per call.' },
      { type: 'Deprecated', text: 'Legacy GSTR-2B endpoint — removal scheduled for Jul 1, 2026.' },
    ],
  },
  {
    version: 'v3.0.0',
    date: 'Feb 12, 2026',
    entries: [
      { type: 'Breaking', text: 'Access-token expiry reduced from 24h to 1h. Official SDKs handle refresh automatically.' },
    ],
  },
];

const typeStyle: Record<EntryType, { color: string; bg: string; border: string }> = {
  Added: { color: 'var(--dp-success)', bg: 'rgba(34,197,94,0.10)', border: 'rgba(34,197,94,0.28)' },
  Improved: { color: 'var(--dp-info)', bg: 'rgba(96,165,250,0.10)', border: 'rgba(96,165,250,0.28)' },
  Fixed: { color: 'var(--dp-info)', bg: 'rgba(96,165,250,0.10)', border: 'rgba(96,165,250,0.28)' },
  Changed: { color: 'var(--dp-warning)', bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.28)' },
  Deprecated: { color: 'var(--dp-warning)', bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.28)' },
  Breaking: { color: 'var(--dp-danger)', bg: 'rgba(239,68,68,0.10)', border: 'rgba(239,68,68,0.28)' },
};

function Badge({ type }: { type: EntryType }): React.ReactElement {
  const s = typeStyle[type];
  return (
    <span
      className="shrink-0 text-[11px] font-semibold rounded-md px-2 py-0.5 font-[family-name:var(--dp-font-body)] mt-0.5"
      style={{ color: s.color, background: s.bg, border: `1px solid ${s.border}` }}
    >
      {type}
    </span>
  );
}

export default function Changelog(): React.ReactElement {
  return (
    <div className="min-h-[calc(100vh_-_var(--dp-nav-h))] bg-[var(--dp-bg)]">
      <SeoHead
        title="Changelog — WhiteBooks Developer Portal"
        description="API releases, fixes, deprecations, and breaking-change notices for the WhiteBooks developer platform."
        canonical={`${SITE.baseUrl}/developer/changelog`}
        robots={SITE.defaultRobots}
      />

      <div className="max-w-[860px] mx-auto px-5 sm:px-8 lg:px-12 pt-10 lg:pt-14 pb-20">
        <div className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-[var(--dp-accent)] mb-2.5">
          Changelog
        </div>
        <h1 className="font-[family-name:var(--dp-font-display)] text-[30px] sm:text-[34px] font-semibold text-[var(--dp-fg)] m-0 leading-[1.15] tracking-[-0.02em]">
          What’s new
        </h1>
        <p className="text-[16px] leading-[1.7] text-[var(--dp-fg-muted)] mt-4 mb-0 max-w-[640px]">
          Releases, fixes, deprecations, and breaking changes across the WhiteBooks APIs. Breaking
          changes are always announced here before they ship.
        </p>

        <div className="mt-10">
          {RELEASES.map(release => (
            <div
              key={release.version}
              className="grid grid-cols-1 md:grid-cols-[170px_1fr] gap-x-10 gap-y-4 py-9 border-t border-[var(--dp-border)]"
            >
              {/* Date / version rail */}
              <div className="md:sticky md:top-[calc(var(--dp-nav-h)_+_24px)] h-fit">
                <div className="text-[14px] font-semibold text-[var(--dp-fg)]">{release.date}</div>
                <div className="inline-block mt-1.5 text-[11.5px] font-[family-name:var(--dp-font-mono)] text-[var(--dp-fg-dim)] bg-[var(--dp-surface-2)] border border-[var(--dp-border)] rounded-md px-2 py-0.5">
                  {release.version}
                </div>
              </div>

              {/* Entries */}
              <div className="flex flex-col gap-3.5">
                {release.entries.map((e, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <Badge type={e.type} />
                    <p className="text-[14.5px] leading-[1.65] text-[var(--dp-fg-muted)] m-0">{e.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
