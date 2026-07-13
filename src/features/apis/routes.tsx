import { Route, useParams, Navigate } from 'react-router-dom';
import { APISubPage } from '@/features/product-pages/components/SubPage';
import { SeoHead } from '@/seo/components/SeoHead';
import { StructuredData } from '@/seo/components/StructuredData';
import { getPageMeta } from '@/seo/metadata';
import { buildJsonLd, buildWebPageSchema, buildBreadcrumbSchema } from '@/seo/schema/generators';
import { pagesRegistry } from '@/features/product-pages/registry';
import type { SubPageData } from '@/shared/types/pages';
import DpHome from '@/features/developer/DpHome';

const API_SLUG_MAP: Record<string, string> = {
  gst: 'gst-api',
  'e-invoice': 'e-invoice-api',
  'e-way-bill': 'e-way-bill-api',
  ksa: 'ksa-e-invoice-api',
};

function ApiSubPageRoute() {
  const { product } = useParams<{ product: string }>();
  const registryKey = API_SLUG_MAP[product ?? ''];
  const pageDef = pagesRegistry[registryKey];

  if (!pageDef) return <Navigate to="/apis" replace />;

  return (
    <APISubPage
      data={pageDef as SubPageData}
      onPrimaryClick={() => { window.location.href = 'https://accounts.whitebooks.in/signup?type=Developer&subscrid=&inviteId'; }}
    />
  );
}

function ApisHubRoute() {
  const meta = getPageMeta('/apis');
  const schema = buildJsonLd(
    buildWebPageSchema({ canonicalUrl: meta.canonical, title: meta.title, description: meta.description }),
    buildBreadcrumbSchema([
      { label: 'Home', href: '/' },
      { label: 'APIs' },
    ]),
  );
  return (
    <>
      <SeoHead {...meta} />
      <StructuredData schema={schema} />
      <DpHome />
    </>
  );
}

export function renderApiRoutes() {
  return (
    <>
      <Route path="/apis" element={<ApisHubRoute />} />
      <Route path="/apis/:product" element={<ApiSubPageRoute />} />
    </>
  );
}
