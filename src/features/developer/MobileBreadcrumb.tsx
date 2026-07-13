import React from 'react';
import { Menu, ChevronRight } from 'lucide-react';
import { useMobileNav } from '../../contexts/MobileNavContext';

interface Props {
  sectionLabel: string;
  pageLabel: string;
}

export default function MobileBreadcrumb({ sectionLabel, pageLabel }: Props): React.ReactElement {
  const { openNav } = useMobileNav();

  return (
    <div
      className="lg:hidden sticky top-[var(--dp-nav-h)] z-40 flex items-center h-[44px]"
      style={{
        background: 'var(--dp-bg-2)',
        borderBottom: '1px solid var(--dp-border)',
      }}
    >
      {/* Hamburger — dedicated tap target */}
      <button
        onClick={openNav}
        className="h-full flex items-center justify-center px-4 cursor-pointer border-0 shrink-0 transition-colors duration-150"
        style={{
          background: 'none',
          color: 'var(--dp-fg-muted)',
          borderRight: '1px solid var(--dp-border)',
        }}
        aria-label="Open navigation"
      >
        <Menu size={17} />
      </button>

      {/* Breadcrumb path — also triggers the drawer */}
      <button
        onClick={openNav}
        className="flex-1 flex items-center gap-1.5 px-4 h-full cursor-pointer border-0 min-w-0 overflow-hidden transition-opacity duration-150 hover:opacity-70"
        style={{ background: 'none' }}
        aria-label="Open navigation"
      >
        <span
          className="text-[13px] shrink truncate"
          style={{ color: 'var(--dp-fg-dim)' }}
        >
          {sectionLabel}
        </span>
        <ChevronRight
          size={12}
          className="shrink-0"
          style={{ color: 'var(--dp-fg-faint)' }}
        />
        <span
          className="text-[13px] font-medium shrink truncate"
          style={{ color: 'var(--dp-fg)' }}
        >
          {pageLabel}
        </span>
      </button>
    </div>
  );
}
