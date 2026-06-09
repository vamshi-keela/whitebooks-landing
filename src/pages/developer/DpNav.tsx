import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SiteLogo } from '@/layouts/SiteShell';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import DpIcon, { type IconName } from './DpIcon';
import { useMobileNav } from '../../contexts/MobileNavContext';

/* ─── Route map ─────────────────────────────────────────────────────────── */

const NAV_ITEMS: { label: string; path: string }[] = [
  { label: 'GST API',        path: '/developer/gst-api' },
  { label: 'e-Invoice API',  path: '/developer/e-invoice-api' },
  { label: 'e-Way Bill API', path: '/developer/e-way-bill-api' },
  { label: 'KSA API',        path: '/developer/ksa-e-invoice-api' },
];

/* ─── Command Palette ────────────────────────────────────────────────────── */

interface PaletteItem {
  icon: IconName;
  label: string;
  hint: string;
  group: string;
  path?: string;
}

const PALETTE_ITEMS: PaletteItem[] = [
  { group: 'Jump to', icon: 'book',     label: 'GST API Overview',        hint: 'docs',  path: '/developer/gst-api' },
  { group: 'Jump to', icon: 'book',     label: 'e-Invoice API Overview',   hint: 'docs',  path: '/developer/e-invoice-api' },
  { group: 'Jump to', icon: 'book',     label: 'e-Way Bill API Overview',  hint: 'docs',  path: '/developer/e-way-bill-api' },
  { group: 'Jump to', icon: 'book',     label: 'KSA e-Invoice API',        hint: 'docs',  path: '/developer/ksa-e-invoice-api' },
  { group: 'Jump to', icon: 'key',      label: 'Authentication',           hint: 'guide', path: '/developer/gst-api' },
  { group: 'Jump to', icon: 'terminal', label: 'Sandbox',                  hint: 'env',   path: '/developer/gst-api' },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps): React.ReactElement | null {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

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
  const filtered = PALETTE_ITEMS.filter(
    item =>
      item.label.toLowerCase().includes(lq) ||
      item.group.toLowerCase().includes(lq) ||
      item.hint.toLowerCase().includes(lq),
  );
  const groups = ['Jump to'];

  const handleItemClick = (item: PaletteItem) => {
    if (item.path) navigate(item.path);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-start justify-center pt-20 sm:pt-[120px] bg-black/70 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[580px] bg-[var(--dp-surface-2)] border border-[var(--dp-border-strong)] rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
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
                  <div
                    key={item.label}
                    onClick={() => handleItemClick(item)}
                    className="flex items-center gap-2.5 px-4 py-2 hover:bg-[rgba(220,47,101,0.06)] cursor-pointer transition-colors duration-100"
                  >
                    <span className="w-7 h-7 flex items-center justify-center bg-[var(--dp-surface-3)] rounded-[7px] text-[var(--dp-fg-muted)] shrink-0">
                      <DpIcon name={item.icon} size={14} />
                    </span>
                    <span className="flex-1 text-sm text-[var(--dp-fg)]">{item.label}</span>
                    <span className="text-[11px] font-mono text-[var(--dp-fg-dim)] bg-[var(--dp-surface-3)] px-1.5 py-px rounded">
                      {item.hint}
                    </span>
                    <DpIcon name="chevron-right" size={13} style={{ color: 'var(--dp-fg-faint)' }} />
                  </div>
                ))}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="py-6 text-center text-[var(--dp-fg-dim)] text-sm">No results found</div>
          )}
        </div>

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

/* ─── DpNav ─────────────────────────────────────────────────────────────── */

interface DpNavProps {
  onOpenPalette: () => void;
}

export default function DpNav({ onOpenPalette }: DpNavProps): React.ReactElement {
  const { openNav } = useMobileNav();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[rgba(10,10,15,0.85)] border-b border-[var(--dp-border)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-[60px] flex items-center gap-2">
        <SiteLogo />

        <div className="w-px h-5 bg-[var(--dp-border)] mx-3 hidden lg:block shrink-0" />

        {/* Desktop nav items */}
        <div className="hidden lg:flex items-center gap-0.5 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-w-0">
          {NAV_ITEMS.map(item => {
            const isActive = pathname.startsWith(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={[
                  'whitespace-nowrap bg-transparent border-x-0 border-t-0 px-3 py-1.5 text-sm font-body cursor-pointer flex items-center gap-1 transition-colors duration-150',
                  'border-b-2',
                  isActive
                    ? 'text-[var(--dp-fg)] border-[var(--dp-accent)]'
                    : 'text-[var(--dp-fg-muted)] border-transparent hover:text-[var(--dp-fg)]',
                ].join(' ')}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* ⌘K shortcut button — desktop only */}
        <button
          onClick={onOpenPalette}
          className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-[7px] cursor-pointer border border-[var(--dp-border)] text-[11px] font-mono text-[var(--dp-fg-dim)] hover:border-[var(--dp-accent)] transition-colors duration-150"
          style={{ background: 'rgba(255,255,255,0.03)' }}
        >
          <DpIcon name="search" size={11} />
          Search
          <kbd className="ml-1 text-[10px]">⌘K</kbd>
        </button>

        <ThemeToggle size={24} />

        <div className="flex-1 lg:hidden" />

        {/* Mobile menu — opens unified nav drawer */}
        <button
          onClick={openNav}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-[8px] cursor-pointer border-0 transition-colors duration-150"
          style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--dp-fg-muted)' }}
          aria-label="Open navigation"
        >
          <DpIcon name="menu" size={17} />
        </button>
      </div>
    </nav>
  );
}
