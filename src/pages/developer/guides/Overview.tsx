import React from 'react';
import { SeoHead } from '../../../seo/components/SeoHead';
import { SITE } from '../../../seo/config/site';
import { DEV_PRODUCTS } from '../devProducts';
import {
  DocArticle, DocEyebrow, DocTitle, DocLead, DocH2,
  CardGrid, DocCard, DocPager,
} from './DocKit';

const HIGHLIGHTS = [
  { label: 'GSTN-licensed GSP', value: 'Direct pipe' },
  { label: 'Uptime SLA', value: '99.9%' },
  { label: 'Sandbox', value: 'Free' },
  { label: 'Certified', value: 'ISO 27001' },
];

export default function Overview(): React.ReactElement {
  return (
    <DocArticle>
      <SeoHead
        title="Developer Docs — Whitebooks Developer Portal"
        description="Integrate GST, e-Invoice, e-Way Bill, and KSA e-Invoicing compliance into your product with REST APIs from a directly GSTN-licensed GSP."
        canonical={`${SITE.baseUrl}/developer/overview`}
        robots={SITE.defaultRobots}
      />

      <DocEyebrow>Documentation</DocEyebrow>
      <DocTitle>Whitebooks Developer Docs</DocTitle>
      <DocLead>
        Build GST, e-Invoice, e-Way Bill, and KSA e-Invoicing compliance directly into your
        product. Our REST APIs run over a directly GSTN-licensed GSP channel — no intermediaries,
        a free sandbox, and a 99.9% uptime SLA.
      </DocLead>

      {/* Highlights strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
        {HIGHLIGHTS.map(h => (
          <div key={h.label} className="rounded-xl border border-[var(--dp-border)] bg-[var(--dp-surface)] px-4 py-3">
            <div className="text-[16px] font-semibold text-[var(--dp-fg)] leading-tight">{h.value}</div>
            <div className="text-[12px] text-[var(--dp-fg-dim)] mt-0.5">{h.label}</div>
          </div>
        ))}
      </div>

      <DocH2>Get started</DocH2>
      <CardGrid>
        <DocCard
          icon="bolt"
          title="Quickstart"
          description="Authenticate and make your first API call in under five minutes."
          to="/developer/quickstart"
        />
        <DocCard
          icon="code"
          title="API Reference"
          description="Browse every endpoint with request/response schemas and a live playground."
          to="/developer/api-reference"
        />
      </CardGrid>

      <DocH2>Explore the APIs</DocH2>
      <CardGrid>
        {DEV_PRODUCTS.map(p => (
          <DocCard
            key={p.key}
            icon={p.icon}
            title={p.label}
            description={p.tagline}
            to={`/developer/${p.slug}`}
            meta={p.basePath}
          />
        ))}
      </CardGrid>

      <DocH2>Resources</DocH2>
      <CardGrid cols={3}>
        <DocCard icon="package" title="Postman Collection" description="Import every endpoint and start testing immediately." to="https://www.postman.com" />
        <DocCard icon="terminal" title="SDKs" description="Official client libraries for Java, Node.js, and Python." to="/developer/quickstart" />
        <DocCard icon="activity" title="Status" description="Live uptime and incident history for every API." to="https://whitebooks.in" />
        <DocCard icon="key" title="Authentication" description="OAuth 2.0 tokens, API keys, and security best practices." to="/developer/authentication" />
        <DocCard icon="warning" title="Errors" description="HTTP status codes and the standard error envelope." to="/developer/errors" />
        <DocCard icon="scroll" title="Changelog" description="API releases, fixes, and breaking-change notices." to="/developer/changelog" />
      </CardGrid>

      <DocPager next={{ label: 'Quickstart', to: '/developer/quickstart' }} />
    </DocArticle>
  );
}
