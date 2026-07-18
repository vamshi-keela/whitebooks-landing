import React, { useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import DpIcon, { type IconName } from '../DpIcon';
import { useMobileNav } from '../../../contexts/MobileNavContext';
import MobileBreadcrumb from '../MobileBreadcrumb';

interface GuideItem { label: string; path: string; icon: IconName; }
interface GuideSection { heading: string; items: GuideItem[]; }

export const GUIDE_NAV: GuideSection[] = [
  {
    heading: 'Get Started',
    items: [
      { label: 'Overview', path: '/developer/overview', icon: 'compass' },
      { label: 'Quickstart', path: '/developer/quickstart', icon: 'bolt' },
    ],
  },
  {
    heading: 'Essentials',
    items: [
      { label: 'Authentication', path: '/developer/authentication', icon: 'key' },
      { label: 'Errors & Status Codes', path: '/developer/errors', icon: 'warning' },
    ],
  },
  {
    heading: 'API Reference',
    items: [
      { label: 'Overview', path: '/developer/api-reference', icon: 'code' },
      { label: 'GST APIs', path: '/developer/gst-api', icon: 'receipt' },
      { label: 'e-Invoice API', path: '/developer/e-invoice-api', icon: 'scroll' },
      { label: 'e-Way Bill API', path: '/developer/e-way-bill-api', icon: 'truck' },
    ]
  },
];

const ALL_GUIDE_ITEMS = GUIDE_NAV.flatMap(s => s.items);

function NavList({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }): React.ReactElement {
  return (
    <div className="px-3 pt-4 pb-8">
      {GUIDE_NAV.map(section => (
        <div key={section.heading} className="mb-5">
          <div className="px-2.5 mb-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-[var(--dp-fg-faint)]">
            {section.heading}
          </div>
          <div className="flex flex-col gap-px">
            {section.items.map(item => {
              const active = pathname === item.path || pathname.startsWith(item.path + '/');
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onNavigate}
                  className={[
                    'flex items-center gap-2.5 px-2.5 py-[7px] rounded-lg transition-colors duration-100',
                    active ? 'bg-[var(--dp-accent-soft)]' : 'hover:bg-[var(--dp-sidebar-hover)]',
                  ].join(' ')}
                >
                  <DpIcon
                    name={item.icon}
                    size={15}
                    style={{ color: active ? 'var(--dp-accent-2)' : 'var(--dp-fg-faint)' }}
                  />
                  <span className={[
                    'text-[13.5px] font-body',
                    active ? 'text-[var(--dp-accent-2)] font-medium' : 'text-[var(--dp-fg-muted)]',
                  ].join(' ')}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function GuidesLayout(): React.ReactElement {
  const { pathname } = useLocation();
  const { open: mobileOpen, closeNav } = useMobileNav();

  const activePage = ALL_GUIDE_ITEMS.find(i => pathname === i.path || pathname.startsWith(i.path + '/'));

  useEffect(() => {
    const handle = () => { if (window.innerWidth >= 1024) closeNav(); };
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, [closeNav]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') closeNav(); };
    if (mobileOpen) document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [mobileOpen, closeNav]);

  return (
    <div className="min-h-screen bg-[var(--dp-bg)]">
      <MobileBreadcrumb sectionLabel="Guides" pageLabel={activePage?.label ?? 'Overview'} />

      {/* Mobile overlay */}
      <div
        className="lg:hidden fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: mobileOpen ? 1 : 0, pointerEvents: mobileOpen ? 'auto' : 'none' }}
        onClick={closeNav}
      />

      {/* Mobile drawer */}
      <div
        className="lg:hidden fixed top-0 left-0 bottom-0 w-[300px] z-[201] flex flex-col transition-transform duration-[250ms] ease-in-out"
        style={{
          background: 'var(--dp-bg-2)',
          borderRight: '1px solid var(--dp-border)',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          boxShadow: mobileOpen ? '16px 0 48px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        <div className="flex items-center justify-between px-5 h-[60px] shrink-0 border-b border-[var(--dp-border)]">
          <span className="text-[13px] font-mono text-[var(--dp-fg-dim)] tracking-[0.08em] uppercase">Guides</span>
          <button
            onClick={closeNav}
            className="w-8 h-8 flex items-center justify-center rounded-[7px] cursor-pointer border-0"
            style={{ background: 'var(--dp-sidebar-hover)', color: 'var(--dp-fg-muted)' }}
          >
            <X size={15} />
          </button>
        </div>
        <div className="overflow-y-auto flex-1">
          <NavList pathname={pathname} onNavigate={closeNav} />
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto flex min-h-[calc(100vh_-_var(--dp-nav-h))]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex flex-col lg:w-[240px] xl:w-[272px] shrink-0 sticky top-[var(--dp-nav-h)] h-[calc(100vh_-_var(--dp-nav-h))] overflow-y-auto border-r border-[var(--dp-border)] bg-[var(--dp-bg-2)]">
          <NavList pathname={pathname} />
        </aside>

        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
