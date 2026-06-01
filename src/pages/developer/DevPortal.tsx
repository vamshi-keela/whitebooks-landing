import React, { useState, useEffect, useCallback } from 'react';
import DpNav, { CommandPalette } from './DpNav';
import DpGuide from './DpGuide';
import DpGSTAPI from './DpGSTAPI';
import DpKsaEInvoiceAPI from './DpKsaEInvoice';

type ViewName = 'gst-api' | 'e-invoice-api' | 'e-way-api' | 'ksa-api';//'guide' |

function ComingSoon({ title }: { title: string }): React.ReactElement {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 60px)', gap: 12, color: 'var(--dp-fg-dim)', fontFamily: 'var(--dp-font-body)' }}>
      <span style={{ fontSize: 32 }}>🚧</span>
      <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--dp-fg)', margin: 0 }}>{title}</h2>
      <p style={{ margin: 0, fontSize: 14 }}>Documentation coming soon.</p>
    </div>
  );
}

export default function DevPortal(): React.ReactElement {
  const [view, setView] = useState<ViewName>('gst-api');
  const [paletteOpen, setPaletteOpen] = useState(false);

  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  // ⌘K handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen(open => !open);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="dp-root">
      <DpNav
        activeView={view}
        setView={setView}
        onOpenPalette={openPalette}
      />

      <CommandPalette open={paletteOpen} onClose={closePalette} />

      {/* {view === 'guide' && <DpGuide />} */}
      {view === 'gst-api' && <DpGSTAPI apiType="gst-api" />}
      {view === 'e-invoice-api' && <DpGSTAPI apiType="e-invoice-api" />}
      {view === 'e-way-api' && <DpGSTAPI apiType="e-way-bill-api" />}
      {view === 'ksa-api' && <DpKsaEInvoiceAPI />}
    </div>
  );
}
