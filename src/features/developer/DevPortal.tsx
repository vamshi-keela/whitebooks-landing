import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DpNav, { CommandPalette, hasSubNav } from './DpNav';
import DpIcon from './DpIcon';
import { MobileNavContext } from '../../contexts/MobileNavContext';

/**
 * DevPortal is the persistent layout shell for all /developer/* routes.
 * It renders the top navigation bar and the command palette, then yields
 * to the active child route via <Outlet />.
 *
 * Route-level SEO (SeoHead + StructuredData) is handled by each child route,
 * so this layout only provides the chrome that is common to every doc page.
 */
export default function DevPortal(): React.ReactElement {
  const { pathname } = useLocation();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // The floating trigger only makes sense where a left drawer actually exists,
  // and should hide while that drawer is already open.
  const showDocsFab = hasSubNav(pathname) && !mobileNavOpen;

  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);
  const openNav = useCallback(() => setMobileNavOpen(true), []);
  const closeNav = useCallback(() => setMobileNavOpen(false), []);

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
    <MobileNavContext.Provider value={{ open: mobileNavOpen, openNav, closeNav }}>
      <div className="dp-root">
        <DpNav onOpenPalette={openPalette} />
        <CommandPalette open={paletteOpen} onClose={closePalette} />
        <Outlet />

        {/* Floating "API Docs" trigger — mobile only, opens the left drawer */}
        {showDocsFab && (
          <button
            onClick={openNav}
            aria-label="Open API docs navigation"
            className="lg:hidden fixed bottom-6 right-5 z-[150] flex items-center gap-1.5 pl-2.5 pr-3 py-3 rounded-full cursor-pointer border border-[var(--dp-border-strong)] text-[10px] font-medium text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-transform duration-150 active:scale-95"
            style={{ background: 'var(--dp-accent)' }}
          >
            <DpIcon name="menu" size={16} />
            API Docs
          </button>
        )}
      </div>
    </MobileNavContext.Provider>
  );
}
