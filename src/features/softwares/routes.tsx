import { useEffect, useState } from 'react';
import { Route, useParams, Navigate } from 'react-router-dom';
import { BookDemoModal } from '@/components/modals/BookDemoModal';
import { SubPage } from '@/features/product-pages/components/SubPage';
import { SeoHead } from '@/seo/components/SeoHead';
import { StructuredData } from '@/seo/components/StructuredData';
import { getPageMeta } from '@/seo/metadata';
import { buildJsonLd, buildWebPageSchema, buildBreadcrumbSchema } from '@/seo/schema/generators';
import { pagesRegistry } from '@/features/product-pages/registry';
import type { SubPageData } from '@/shared/types/pages';
import { HubSoftwares } from '@/pages/hubs/HubSoftwares';
import GstLedgerReports from '@/pages/softwares/GstLedgerReports';
import NoticeManagement from '@/pages/notices/NoticeManagement';

const SOFTWARE_SLUG_MAP: Record<string, string> = {
  accounting: 'accounting',
  gst: 'gst-software',
  'e-invoice': 'e-invoice-software',
  'e-way-bill': 'e-way-bill-software',
  ksa: 'ksa-e-invoicing-software',
};

function SoftwareSubPageRoute() {
  const { product } = useParams<{ product: string }>();
  const registryKey = SOFTWARE_SLUG_MAP[product ?? ''];
  const pageDef = pagesRegistry[registryKey];
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    if (demoOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [demoOpen]);

  if (!pageDef) return <Navigate to="/softwares" replace />;

  return (
    <>
      <SubPage
        data={pageDef as SubPageData}
        productSlug={product}
        onPrimaryClick={() => { window.location.href = 'https://accounts.whitebooks.in/login'; }}
        onSecondaryClick={() => setDemoOpen(true)}
      />
      {demoOpen && <BookDemoModal onClose={() => setDemoOpen(false)} />}
    </>
  );
}

function SoftwaresHubRoute() {
  const meta = getPageMeta('/softwares');
  const schema = buildJsonLd(
    buildWebPageSchema({ canonicalUrl: meta.canonical, title: meta.title, description: meta.description }),
    buildBreadcrumbSchema([
      { label: 'Home', href: '/' },
      { label: 'Softwares' },
    ]),
  );
  return (
    <>
      <SeoHead {...meta} />
      <StructuredData schema={schema} />
      <HubSoftwares />
    </>
  );
}

export function renderSoftwareRoutes() {
  return (
    <>
      <Route path="/softwares" element={<SoftwaresHubRoute />} />
      <Route path="/softwares/gst-detailes" element={<GstLedgerReports />} />
      <Route path="/softwares/notice-management" element={<NoticeManagement />} />
      <Route path="/softwares/:product" element={<SoftwareSubPageRoute />} />
    </>
  );
}
