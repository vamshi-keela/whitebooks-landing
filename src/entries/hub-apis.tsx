import React from 'react';
import ReactDOM from 'react-dom/client';
import { HubAPIs } from '@/pages/hubs/HubAPIs';
import '@/styles/design-system-wb.css';
import '@/styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HubAPIs />
  </React.StrictMode>
);
