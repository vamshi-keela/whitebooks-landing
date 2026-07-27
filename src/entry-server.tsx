/**
 * Server-side rendering entry point.
 * Used by scripts/prerender.ts to generate static HTML per route at build time.
 *
 * Build: vite build --mode ssr
 * Renders: renderToString with StaticRouter + HelmetProvider
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider, HelmetData } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AppRouter } from '@/app/router';
import { type ApiSpecKey, openApiSpec } from '@/data/openapi-spec';
import { normalizeSpec } from '@/utils/normalizeSpec';
import { operationToSlug } from '@/features/developer/utils/operationSlug';
import { isEndpointIndexable } from '@/seo/apiSeo';

export interface RenderResult {
  html: string;
  helmetData: HelmetData;
}

/**
 * All indexable developer API endpoint routes, derived from the OpenAPI specs.
 * Consumed by scripts/prerender.ts to emit one static HTML file (and sitemap
 * entry) per endpoint. Gated by isEndpointIndexable so thin/deprecated endpoints
 * stay out of the static build — the anti-scaled-content lever lives in one place.
 *
 * The apiSlug here MUST match ApiDocPage's API_CONFIG slug for each key.
 */
const API_SLUGS: Record<ApiSpecKey, string> = {
  'gst-api': 'gst-api',
  'e-invoice-api': 'e-invoice-api',
  'e-way-bill-api': 'e-way-bill-api',
  'ksa-e-invoice-api': 'ksa-e-invoice-api',
};

export function apiEndpointRoutes(): string[] {
  const routes: string[] = [];
  for (const [key, slug] of Object.entries(API_SLUGS) as [ApiSpecKey, string][]) {
    for (const op of normalizeSpec(openApiSpec(key))) {
      if (!isEndpointIndexable(key, op)) continue;
      routes.push(`/developer/${slug}/${operationToSlug(op.method, op.path)}`);
    }
  }
  return routes;
}

export function render(url: string): RenderResult {
  const helmetData = new HelmetData({});
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  const html = renderToString(
    <HelmetProvider context={helmetData.context}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <StaticRouter location={url}>
            <AppRouter />
          </StaticRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );

  return { html, helmetData };
}
