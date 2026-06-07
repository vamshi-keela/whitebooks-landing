import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/contexts/ThemeContext';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    /*
     * ThemeProvider is outermost so every component tree node can call useTheme().
     * It reads localStorage + prefers-color-scheme on mount to reconcile with the
     * inline FOUC-prevention script that already set data-theme on <html>.
     */
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
