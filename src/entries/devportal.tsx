import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DevPortal from '@/pages/developer/DevPortal';
import '@/styles/globals.css';
import '@/styles/devportal.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DevPortal />
    </QueryClientProvider>
  </React.StrictMode>
);
