import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/contexts/ThemeContext';

const queryClient = new QueryClient();

/**
 * Core providers without a router — used by both the client entry (which adds
 * BrowserRouter) and the SSR entry (which adds StaticRouter).
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

/** Client-side entry: wraps AppProviders with BrowserRouter for SPA navigation. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProviders>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </AppProviders>
  );
}
