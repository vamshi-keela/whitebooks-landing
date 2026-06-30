import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { Search, LayoutGrid } from 'lucide-react';
import { type ApiSpecKey, openApiSpec } from '../../data/openapi-spec';
import { environments } from '../../data/environments';
import type { Environment } from '../../data/environments';
import { normalizeSpec } from '../../utils/normalizeSpec';
import { groupByTag } from '../../utils/groupOperations';
import { SpecContext, makeSpecContext } from '../../contexts/SpecContext';
import ApiSidebar, { type StaticNavGroup } from '../../components/api/ApiSidebar';
import EnvironmentBar from '../../components/api/EnvironmentBar';
import OperationDetail from '../../components/api/OperationDetail';
import { SeoHead } from '../../seo/components/SeoHead';
import { StructuredData } from '../../seo/components/StructuredData';
import {
  buildJsonLd,
  buildWebPageSchema,
  buildBreadcrumbSchema,
  buildTechArticleSchema,
} from '../../seo/schema/generators';
import { SITE } from '../../seo/config/site';
import { operationToSlug, slugToOperation } from './utils/operationSlug';
import GstOverview from './GstOverview';
import InvoiceApiOverview from './EinvoiceApiOverview';
import EWayBillApiOverview from './EWayBillApiOverview';
import KsaApiOverview from './KsaApiOverview';
import MobileBreadcrumb from './MobileBreadcrumb';

/* ─── Constants ───────────────────────────────────────────────────────────── */

const OVERVIEW_ID = '__overview';

const API_CONFIG: Record<ApiSpecKey, { slug: string; label: string; description: string }> = {
  'gst-api': {
    slug: 'gst-api',
    label: 'GST API',
    description:
      'REST API for GST filing, GSTIN validation, GSTR-2A/2B retrieval, and HSN/SAC search. Built by a directly licensed GSP. Sandbox in 5 minutes. 99.95% uptime SLA.',
  },
  'e-invoice-api': {
    slug: 'e-invoice-api',
    label: 'e-Invoice API',
    description:
      'REST API for generating IRNs on India\'s IRP. Sub-200ms latency. Direct GSP pipe. Bulk operations and webhook alerts.',
  },
  'e-way-bill-api': {
    slug: 'e-way-bill-api',
    label: 'e-Way Bill API',
    description:
      'REST API for generating, extending, and cancelling e-way bills. Auto-populate from IRN. Bulk operations. 99.95% uptime SLA.',
  },
  'ksa-e-invoice-api': {
    slug: 'ksa-e-invoice-api',
    label: 'KSA e-Invoice API',
    description:
      'REST API for ZATCA Phase 2 e-invoice generation. FATOORAH submission, CSID management, bilingual invoicing, QR code generation.',
  },
};

/* ─── ApiDocPage ──────────────────────────────────────────────────────────── */

interface Props {
  apiType: ApiSpecKey;
}

export default function ApiDocPage({ apiType }: Props): React.ReactElement {
  const { opSlug } = useParams<{ opSlug?: string }>();
  const navigate = useNavigate();
  const [selectedEnv, setSelectedEnv] = useState<Environment>(environments[0]);

  const { slug: apiSlug, label: apiLabel, description: apiDesc } = API_CONFIG[apiType];

  const apiSpec = useMemo(() => openApiSpec(apiType), [apiType]);
  const operations = useMemo(() => normalizeSpec(apiSpec), [apiSpec]);
  const groups = useMemo(
    () => groupByTag(operations, apiSpec.tags ?? []),
    [operations, apiSpec.tags],
  );
  const specCtx = useMemo(
    () => makeSpecContext(apiSpec, selectedEnv.baseUrl),
    [apiSpec, selectedEnv.baseUrl],
  );

  const isOverview = !opSlug;

  const selectedOp = useMemo(
    () => (opSlug ? (slugToOperation(opSlug, operations) ?? null) : null),
    [opSlug, operations],
  );

  /* If opSlug is given but no operation matches, redirect to overview */
  if (opSlug && !selectedOp) {
    return <Navigate to={`/developer/${apiSlug}`} replace />;
  }

  const selectedOpId = isOverview ? OVERVIEW_ID : (selectedOp?.id ?? OVERVIEW_ID);

  const staticGroups: StaticNavGroup[] = [
    {
      heading: apiLabel,
      items: [{ id: OVERVIEW_ID, label: 'Overview', icon: <LayoutGrid size={11} /> }],
    },
  ];

  const visibleOps = useMemo(
    () => groups.flatMap(g => g.operations),
    [groups],
  );

  const selectedIdx = selectedOp
    ? visibleOps.findIndex(op => op.id === selectedOp.id)
    : -1;

  /* ── Sidebar navigation (route-driven) ───────────────────────────────── */

  const handleSelect = (id: string) => {
    if (id === OVERVIEW_ID) {
      navigate(`/developer/${apiSlug}`);
      return;
    }
    const op = operations.find(o => o.id === id);
    if (op) navigate(`/developer/${apiSlug}/${operationToSlug(op.method, op.path)}`);
  };

  const goPrev = () => {
    if (selectedIdx > 0) {
      const prev = visibleOps[selectedIdx - 1];
      navigate(`/developer/${apiSlug}/${operationToSlug(prev.method, prev.path)}`);
    }
  };

  const goNext = () => {
    if (selectedIdx < visibleOps.length - 1) {
      const next = visibleOps[selectedIdx + 1];
      navigate(`/developer/${apiSlug}/${operationToSlug(next.method, next.path)}`);
    }
  };

  /* ── SEO ──────────────────────────────────────────────────────────────── */

  const canonicalUrl = selectedOp
    ? `${SITE.baseUrl}/developer/${apiSlug}/${opSlug}`
    : `${SITE.baseUrl}/developer/${apiSlug}`;

  const pageTitle = selectedOp
    ? `${selectedOp.summary} — ${apiLabel} Reference | WhiteBooks`
    : `${apiLabel} Documentation — WhiteBooks Developer Portal`;

  const pageDesc = selectedOp
    ? (selectedOp.description
      ? `${selectedOp.description.slice(0, 220).replace(/\n/g, ' ')}`
      : `${selectedOp.method} ${selectedOp.path} — ${apiLabel} endpoint. Request parameters, response schemas, and code examples.`)
    : apiDesc;

  const schema = selectedOp
    ? buildJsonLd(
      buildTechArticleSchema({
        canonicalUrl,
        title: pageTitle,
        description: pageDesc,
        keywords: `${apiLabel}, ${selectedOp.summary}, ${selectedOp.path}, API reference, WhiteBooks developer docs`,
      }),
      buildBreadcrumbSchema([
        { label: 'Home', href: '/' },
        { label: 'Developer', href: '/developer' },
        { label: apiLabel, href: `/developer/${apiSlug}` },
        { label: selectedOp.summary },
      ]),
    )
    : buildJsonLd(
      buildWebPageSchema({ canonicalUrl, title: pageTitle, description: pageDesc }),
      buildBreadcrumbSchema([
        { label: 'Home', href: '/' },
        { label: 'Developer', href: '/developer' },
        { label: apiLabel },
      ]),
    );

  /* ── Main content ─────────────────────────────────────────────────────── */

  function renderMain() {
    if (isOverview) {
      switch (apiType) {
        case 'gst-api': return <GstOverview />;
        case 'e-invoice-api': return <InvoiceApiOverview />;
        case 'e-way-bill-api': return <EWayBillApiOverview />;
        // case 'ksa-e-invoice-api': return <KsaApiOverview />;
      }
    }

    if (visibleOps.length === 0) {
      return (
        <div className="flex flex-col items-center pt-24 gap-3 text-[var(--dp-fg-muted)]">
          <Search size={32} color="var(--dp-fg-faint)" />
          <div className="text-base font-semibold text-[var(--dp-fg)]">No endpoints</div>
          <div className="text-sm">This API has no endpoints to display.</div>
        </div>
      );
    }

    if (selectedOp) {
      return (
        <OperationDetail
          operation={selectedOp}
          apiType={apiType}
          hasPrev={selectedIdx > 0}
          hasNext={selectedIdx < visibleOps.length - 1}
          onPrev={goPrev}
          onNext={goNext}
          prevLabel={selectedIdx > 0 ? visibleOps[selectedIdx - 1].summary : undefined}
          nextLabel={
            selectedIdx < visibleOps.length - 1
              ? visibleOps[selectedIdx + 1].summary
              : undefined
          }
        />
      );
    }

    return null;
  }

  return (
    <SpecContext.Provider value={specCtx}>
      <SeoHead
        title={pageTitle}
        description={pageDesc}
        canonical={canonicalUrl}
        robots={SITE.defaultRobots}
        og={{
          title: pageTitle,
          description: pageDesc,
          image: SITE.defaultOgImage,
          type: 'article',
        }}
        twitter={{
          card: 'summary_large_image',
          title: pageTitle,
          description: pageDesc,
          image: SITE.defaultOgImage,
        }}
      />
      <StructuredData schema={schema} />

      <div className="min-h-screen bg-[var(--dp-bg)]">
        <MobileBreadcrumb
          sectionLabel={isOverview ? apiLabel : (selectedOp?.tag ?? apiLabel)}
          pageLabel={isOverview ? 'Overview' : (selectedOp?.summary ?? '')}
        />
        {(
          <EnvironmentBar
            environments={environments}
            selected={selectedEnv}
            onChange={setSelectedEnv}
          />
        )}

        <div className="flex min-h-[calc(100vh-100px)]">
          <ApiSidebar
            groups={groups}
            selectedOpId={selectedOpId}
            onSelect={handleSelect}
            staticGroups={staticGroups}
            currentApiType={apiType}
            onApiSwitch={(path) => navigate(path)}
          />

          <main className="flex-1 min-w-0">{renderMain()}</main>
        </div>
      </div>
    </SpecContext.Provider>
  );
}
