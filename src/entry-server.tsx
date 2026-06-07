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

export interface RenderResult {
  html: string;
  helmetData: HelmetData;
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
