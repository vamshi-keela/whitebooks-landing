import React from 'react';
import ReactDOM from 'react-dom/client';
import { SubPage } from '@/components/subpage/SubPage.tsx';
import { pagesRegistry } from '@/pages/registry/index';
import { useReveal } from '@/hooks/useReveal';
import '@/styles/design-system-wb.css';
import '@/styles/globals.css';
import { SubPageData } from '@/types/pages';

function SubpageApp(): React.ReactElement | null {
  const root = document.getElementById('root');
  const pageKey = root?.dataset['page'] ?? '';
  const pageDef = pagesRegistry[pageKey];
  useReveal();

  if (!pageDef) {
    return (
      <div style={{ padding: 40, fontFamily: 'monospace', color: 'red' }}>
        Page "{pageKey}" not found in registry.
      </div>
    );
  }

  return <SubPage data={pageDef as SubPageData} />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SubpageApp />
  </React.StrictMode>
);
