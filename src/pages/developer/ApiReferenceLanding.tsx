import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { openApiSpec } from '../../data/openapi-spec';
import { normalizeSpec } from '../../utils/normalizeSpec';
import { SeoHead } from '../../seo/components/SeoHead';
import { SITE } from '../../seo/config/site';
import DpIcon from './DpIcon';
import { DEV_PRODUCTS } from './devProducts';
import { InlineCode } from './guides/DocKit';

function useEndpointCounts(): Record<string, number> {
  return useMemo(() => {
    const out: Record<string, number> = {};
    for (const p of DEV_PRODUCTS) {
      try { out[p.key] = normalizeSpec(openApiSpec(p.key)).length; }
      catch { out[p.key] = 0; }
    }
    return out;
  }, []);
}

export default function ApiReferenceLanding(): React.ReactElement {
  const counts = useEndpointCounts();

  return (
    <div className="min-h-[calc(100vh_-_var(--dp-nav-h))] bg-[var(--dp-bg)]">
      <SeoHead
        title="API Reference — Whitebooks Developer Portal"
        description="Explore the Whitebooks API suite: GST, e-Invoice, e-Way Bill, and KSA e-Invoicing. Full endpoint reference with schemas and a live playground."
        canonical={`${SITE.baseUrl}/developer/api-reference`}
        robots={SITE.defaultRobots}
      />

      <div className="max-w-[1080px] mx-auto px-5 sm:px-8 lg:px-12 pt-10 lg:pt-14 pb-20">
        {/* Hero */}
        <div className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-[var(--dp-accent)] mb-2.5">
          API Reference
        </div>
        <h1 className="font-[family-name:var(--dp-font-display)] text-[30px] sm:text-[34px] font-semibold text-[var(--dp-fg)] m-0 leading-[1.15] tracking-[-0.02em]">
          The Whitebooks API suite
        </h1>
        <p className="text-[16px] leading-[1.7] text-[var(--dp-fg-muted)] mt-4 mb-0 max-w-[680px]">
          Four production REST APIs over a directly GSTN-licensed GSP channel. Pick an API to browse
          every endpoint with request and response schemas, code samples, and a live playground.
        </p>

        {/* Product cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-9">
          {DEV_PRODUCTS.map(p => (
            <Link
              key={p.key}
              to={`/developer/${p.slug}`}
              className="group flex flex-col p-5 rounded-2xl border border-[var(--dp-border)] bg-[var(--dp-surface)] transition-[border-color,box-shadow,transform] duration-150 hover:border-[var(--dp-accent-line)] hover:shadow-[0_10px_36px_-16px_rgba(220,47,101,0.3)]"
            >
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl flex items-center justify-center bg-[var(--dp-accent-soft)] text-[var(--dp-accent-2)] shrink-0">
                  <DpIcon name={p.icon} size={21} />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-[17px] font-semibold text-[var(--dp-fg)] leading-tight">{p.label}</div>
                  <div className="text-[12.5px] font-[family-name:var(--dp-font-mono)] text-[var(--dp-fg-faint)] mt-0.5">{p.basePath}</div>
                </div>
                <ArrowRight size={17} className="shrink-0 text-[var(--dp-fg-faint)] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-[var(--dp-accent)]" />
              </div>

              <p className="text-[14px] leading-[1.65] text-[var(--dp-fg-muted)] mt-3.5 mb-0">{p.description}</p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {p.highlights.map(h => (
                  <span key={h} className="text-[11.5px] font-medium text-[var(--dp-fg-dim)] bg-[var(--dp-surface-2)] border border-[var(--dp-border)] rounded-full px-2.5 py-0.5">
                    {h}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-3.5 border-t border-[var(--dp-border)] flex items-center justify-between">
                <span className="text-[12.5px] text-[var(--dp-fg-dim)]">
                  {counts[p.key] > 0 ? <><strong className="text-[var(--dp-fg)]">{counts[p.key]}</strong> endpoints</> : 'View endpoints'}
                </span>
                <span className="text-[12.5px] font-medium text-[var(--dp-accent-2)] flex items-center gap-1">
                  Explore reference <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Environments + auth */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4 mt-10">
          <div className="rounded-2xl border border-[var(--dp-border)] bg-[var(--dp-surface)] p-5">
            <h2 className="font-[family-name:var(--dp-font-display)] text-[16px] font-semibold text-[var(--dp-fg)] m-0 mb-3">Base URLs</h2>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--dp-success)] shrink-0" style={{ boxShadow: '0 0 6px var(--dp-success)' }} />
                <span className="text-[13px] text-[var(--dp-fg-muted)] w-[84px] shrink-0">Sandbox</span>
                <InlineCode>https://apisandbox.whitebooks.in</InlineCode>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--dp-accent)] shrink-0" style={{ boxShadow: '0 0 6px var(--dp-accent)' }} />
                <span className="text-[13px] text-[var(--dp-fg-muted)] w-[84px] shrink-0">Production</span>
                <InlineCode>https://api.whitebooks.in</InlineCode>
              </div>
            </div>
            <p className="text-[13px] leading-[1.6] text-[var(--dp-fg-dim)] mt-4 mb-0">
              Every request is authenticated with an OAuth 2.0 bearer token plus your{' '}
              <InlineCode>x-api-key</InlineCode>. New here? Start with the{' '}
              <Link to="/developer/quickstart" className="text-[var(--dp-accent-2)] font-medium">Quickstart</Link>.
            </p>
          </div>

          <Link
            to="/developer/authentication"
            className="group rounded-2xl border border-[var(--dp-border)] bg-[var(--dp-surface)] p-5 flex flex-col justify-between transition-colors hover:border-[var(--dp-accent-line)]"
          >
            <div>
              <span className="w-10 h-10 rounded-xl flex items-center justify-center bg-[var(--dp-accent-soft)] text-[var(--dp-accent-2)]">
                <DpIcon name="key" size={18} />
              </span>
              <h2 className="font-[family-name:var(--dp-font-display)] text-[16px] font-semibold text-[var(--dp-fg)] mt-3 mb-1">Authentication</h2>
              <p className="text-[13px] leading-[1.6] text-[var(--dp-fg-muted)] m-0">OAuth 2.0 tokens, refresh, and production security controls.</p>
            </div>
            <span className="text-[12.5px] font-medium text-[var(--dp-accent-2)] flex items-center gap-1 mt-4">
              Read the guide <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
