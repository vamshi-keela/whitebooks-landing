import React, { useState, useEffect, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import DpNav, { CommandPalette } from './DpNav';
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
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
      </div>
    </MobileNavContext.Provider>
  );
}
