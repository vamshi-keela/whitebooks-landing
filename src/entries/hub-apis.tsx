import React from 'react';
import ReactDOM from 'react-dom/client';
import { Header, Footer } from '@/layouts/SiteShell';
import DpHome from '@/pages/developer/DpHome';
import '@/styles/design-system-wb.css';
import '@/styles/globals.css';
import '@/styles/devportal.css';

function HubAPIsPage() {
  return (
    <div className="wb-page">
      <Header mode="apis" />
      <main>
        <DpHome />
      </main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HubAPIsPage />
  </React.StrictMode>
);
