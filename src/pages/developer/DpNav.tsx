import React, { useState, useEffect, useRef } from 'react';
import { Logo } from './DpComponents';
import DpIcon, { type IconName } from './DpIcon';
import { SiteLogo } from '@/layouts/SiteShell';

type ViewName = 'gst-api' | 'e-invoice-api' | 'e-way-api' | 'ksa-api';//'guide'|

interface NavItem {
  label: string;
  view?: ViewName;
  external?: boolean;
}

const navItems: NavItem[] = [
  // { label: 'Guides', view: 'guide' },
  { label: 'GST API', view: 'gst-api' },
  { label: 'E-Invoice API', view: 'e-invoice-api' },
  { label: 'E-Way Bill API', view: 'e-way-api' },
  { label: 'KSA API', view: 'ksa-api' },
];

/* ─── Command Palette Items ─────────────────────────────────────────────────── */
interface PaletteItem {
  icon: IconName;
  label: string;
  hint: string;
  group: string;
}

const paletteItems: PaletteItem[] = [
  { group: 'Jump to', icon: 'book', label: 'Getting Started Guide', hint: 'guide' },
  { group: 'Jump to', icon: 'code', label: 'API Reference', hint: 'reference' },
  { group: 'Jump to', icon: 'key', label: 'Authentication', hint: 'guide' },
  { group: 'Jump to', icon: 'terminal', label: 'Sandbox', hint: 'home' },
  { group: 'Endpoints', icon: 'globe', label: 'GET /gst/returns', hint: 'GST Returns' },
  { group: 'Endpoints', icon: 'globe', label: 'POST /einvoice/generate', hint: 'E-Invoice' },
  { group: 'Endpoints', icon: 'globe', label: 'GET /eway/status', hint: 'E-Way Bill' },
  { group: 'Endpoints', icon: 'globe', label: 'POST /ksa/einvoice', hint: 'KSA E-Invoice' },
];

/* ─── Command Palette ───────────────────────────────────────────────────────── */
interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps): React.ReactElement | null {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [open, onClose]);

  if (!open) return null;

  const lq = query.toLowerCase();
  const filtered = paletteItems.filter(
    item =>
      item.label.toLowerCase().includes(lq) ||
      item.group.toLowerCase().includes(lq) ||
      item.hint.toLowerCase().includes(lq)
  );

  const groups = ['Jump to', 'Endpoints', 'Resources'];

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-start justify-center pt-20 sm:pt-[120px] bg-black/70 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[580px] bg-[var(--dp-surface-2)] border border-[var(--dp-border-strong)] rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-[var(--dp-border)]">
          <DpIcon name="search" size={16} style={{ color: 'var(--dp-fg-dim)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search docs, endpoints, guides..."
            className="flex-1 bg-transparent border-0 outline-none text-[var(--dp-fg)] text-[15px] font-body placeholder:text-[var(--dp-fg-dim)]"
          />
          <button
            onClick={onClose}
            className="bg-white/[0.06] border-0 text-[var(--dp-fg-dim)] rounded-[5px] px-1.5 py-0.5 text-[11px] font-mono cursor-pointer"
          >
            Esc
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[360px] sm:max-h-[400px] overflow-y-auto py-2">
          {groups.map(group => {
            const items = filtered.filter(i => i.group === group);
            if (items.length === 0) return null;
            return (
              <div key={group}>
                <div className="px-4 pt-2 pb-1 text-[11px] font-mono text-[var(--dp-fg-faint)] tracking-[0.08em] uppercase">
                  {group}
                </div>
                {items.map(item => (
                  <PaletteRow key={item.label} item={item} />
                ))}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="py-6 text-center text-[var(--dp-fg-dim)] text-sm">
              No results found
            </div>
          )}
        </div>

        {/* Footer hints */}
        <div className="flex gap-5 px-4 py-2.5 border-t border-[var(--dp-border)] bg-white/[0.01]">
          {[['↵', 'Select'], ['↑↓', 'Navigate'], ['Esc', 'Close']].map(([key, label]) => (
            <span key={label} className="flex items-center gap-1.5 text-xs text-[var(--dp-fg-dim)]">
              <kbd className="bg-[var(--dp-surface-3)] border border-[var(--dp-border)] rounded px-1.5 py-px text-[11px] font-mono text-[var(--dp-fg-muted)]">
                {key}
              </kbd>
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function PaletteRow({ item }: { item: PaletteItem }): React.ReactElement {
  return (
    <div className="flex items-center gap-2.5 px-4 py-2 hover:bg-[rgba(220,47,101,0.06)] cursor-pointer transition-colors duration-100">
      <span className="w-7 h-7 flex items-center justify-center bg-[var(--dp-surface-3)] rounded-[7px] text-[var(--dp-fg-muted)] shrink-0">
        <DpIcon name={item.icon} size={14} />
      </span>
      <span className="flex-1 text-sm text-[var(--dp-fg)]">{item.label}</span>
      <span className="text-[11px] font-mono text-[var(--dp-fg-dim)] bg-[var(--dp-surface-3)] px-1.5 py-px rounded">
        {item.hint}
      </span>
      <DpIcon name="chevron-right" size={13} style={{ color: 'var(--dp-fg-faint)' }} />
    </div>
  );
}

/* ─── Mobile Nav Drawer ─────────────────────────────────────────────────────── */
interface NavDrawerProps {
  open: boolean;
  onClose: () => void;
  activeView: ViewName;
  setView: (v: ViewName) => void;
}

function NavDrawer({ open, onClose, activeView, setView }: NavDrawerProps): React.ReactElement {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
      />

      {/* Drawer panel */}
      <div
        className="fixed top-0 right-0 z-[70] h-full w-[72vw] max-w-[300px] flex flex-col"
        style={{
          background: 'rgba(12,12,18,0.97)',
          borderLeft: '1px solid var(--dp-border-strong)',
          backdropFilter: 'blur(24px)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: open ? '-24px 0 80px rgba(0,0,0,0.6)' : 'none',
        }}
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-5 h-[60px] shrink-0"
          style={{ borderBottom: '1px solid var(--dp-border)' }}
        >
          <span className="text-[13px] font-mono text-[var(--dp-fg-dim)] tracking-[0.08em] uppercase">
            Navigation
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-[7px] cursor-pointer border-0 transition-colors duration-150"
            style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--dp-fg-muted)' }}
          >
            <DpIcon name="close" size={15} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          {navItems.map(item => {
            const isActive = item.view === activeView;
            return (
              <button
                key={item.label}
                onClick={() => { if (item.view) { setView(item.view); onClose(); } }}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-[9px] mb-1 cursor-pointer border-0 text-left transition-all duration-150"
                style={{
                  background: isActive ? 'rgba(220,47,101,0.1)' : 'transparent',
                  color: isActive ? 'var(--dp-fg)' : 'var(--dp-fg-muted)',
                }}
              >
                {/* Active indicator bar */}
                <span
                  className="w-[3px] h-5 rounded-full shrink-0 transition-all duration-150"
                  style={{ background: isActive ? 'var(--dp-accent)' : 'transparent' }}
                />
                <span className="text-[14px] font-body">{item.label}</span>
                {item.external && <DpIcon name="arrow-up-right" size={12} style={{ color: 'var(--dp-fg-dim)', marginLeft: 'auto' }} />}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}

/* ─── DpNav ─────────────────────────────────────────────────────────────────── */
interface DpNavProps {
  activeView: ViewName;
  setView: (v: ViewName) => void;
  onOpenPalette: () => void;
}

export default function DpNav({ activeView, setView, onOpenPalette }: DpNavProps): React.ReactElement {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[rgba(10,10,15,0.85)] border-b border-[var(--dp-border)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-[60px] flex items-center gap-2">
          {/* Logo */}
          <SiteLogo />

          {/* Divider */}
          <div className="w-px h-5 bg-[var(--dp-border)] mx-3 hidden sm:block shrink-0" />

          {/* Nav items — desktop only */}
          <div className="hidden sm:flex items-center gap-0.5 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-w-0">
            {navItems.map(item => {
              const isActive = item.view === activeView;
              return (
                <button
                  key={item.label}
                  onClick={() => item.view && setView(item.view)}
                  className={[
                    'whitespace-nowrap bg-transparent border-x-0 border-t-0 px-3 py-1.5 text-sm font-body cursor-pointer flex items-center gap-1 transition-colors duration-150',
                    'border-b-2',
                    isActive
                      ? 'text-[var(--dp-fg)] border-[var(--dp-accent)]'
                      : 'text-[var(--dp-fg-muted)] border-transparent hover:text-[var(--dp-fg)]',
                  ].join(' ')}
                >
                  {item.label}
                  {item.external && <DpIcon name="arrow-up-right" size={12} style={{ color: 'var(--dp-fg-dim)' }} />}
                </button>
              );
            })}
          </div>

          {/* Mobile spacer */}
          <div className="flex-1 sm:hidden" />

          {/* Mobile menu button — top right */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="sm:hidden w-9 h-9 flex items-center justify-center rounded-[8px] cursor-pointer border-0 transition-colors duration-150"
            style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--dp-fg-muted)' }}
            aria-label="Open navigation"
          >
            <DpIcon name="menu" size={17} />
          </button>
        </div>
      </nav>

      <NavDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeView={activeView}
        setView={setView}
      />
    </>
  );
}