import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SiteLogo } from '@/layouts/SiteShell';
import { ThemeToggle } from '@/shared/ui/ThemeToggle';
import DpIcon, { type IconName } from './DpIcon';
import { useMobileNav } from '../../contexts/MobileNavContext';
import MethodBadge from '../../components/api/MethodBadge';
import { searchOps } from './devSearch';
import type { NormalizedMethod } from '@/data/openapi-spec';
import { AuthButtons, ContactUsDropdown } from '@/layouts/Header';
import { LOGIN_URL } from '@/utils/contants';

/* ─── Route map ─────────────────────────────────────────────────────────── */

interface NavTab { id: string; label: string; path: string; icon: IconName }

const NAV_ITEMS: NavTab[] = [
  { id: 'guides', label: 'Guides', path: '/developer/overview', icon: 'book' },
  { id: 'reference', label: 'API Reference', path: '/developer/api-reference', icon: 'code' },
  { id: 'changelog', label: 'Changelog', path: '/developer/changelog', icon: 'activity' },
];

/* Sub-items surfaced in the hover dropdown of the "API Reference" tab —
   each deep-links to the first endpoint of its API. */
interface ReferenceSubItem { type: string; label: string; path: string; icon: IconName }

const REFERENCE_SUBITEMS: ReferenceSubItem[] = [
  { type: 'gst-api', label: 'GST API', path: '/developer/gst-api/get-public-search', icon: 'receipt' },
  { type: 'e-invoice-api', label: 'e-Invoice API', path: '/developer/e-invoice-api/get-einvoice-authenticate', icon: 'scroll' },
  { type: 'e-way-bill-api', label: 'e-Way Bill API', path: '/developer/e-way-bill-api/get-ewaybillapi-v1.03-authenticate', icon: 'truck' },
];

/* External resources surfaced in the far-right "Resources" dropdown of row 2.
   These mirror the developer hub's resource menu; swap the hrefs for the
   WhiteBooks equivalents as they come online. */
interface ResourceItem { icon: IconName; label: string; href: string; internal?: boolean }

const RESOURCE_ITEMS: ResourceItem[] = [
  { icon: 'book', label: 'Postman Collections', href: LOGIN_URL },
  { icon: 'package', label: 'SDKs & Clients', href: LOGIN_URL },
  // { icon: 'terminal', label: 'MCP Server', href: 'https://developer.sandbox.co.in/mcp' },
  { icon: 'activity', label: 'Status', href: '/status', internal: true },
  // { icon: 'wallet', label: 'Pricing', href: 'https://sandbox.co.in/pricing' },
  // { icon: 'star', label: 'Customer Stories', href: 'https://sandbox.co.in/customers' },
];

/* Routes that belong to the "API Reference" tab (the landing + the four API docs). */
const REFERENCE_ROOTS = [
  '/developer/api-reference',
  '/developer/gst-api',
  '/developer/e-invoice-api',
  '/developer/e-way-bill-api',
  '/developer/ksa-e-invoice-api',
];

function activeTabId(pathname: string): string {
  if (pathname.startsWith('/developer/changelog')) return 'changelog';
  if (REFERENCE_ROOTS.some(r => pathname === r || pathname.startsWith(r + '/'))) return 'reference';
  return 'guides'; // overview, quickstart, authentication, errors, /developer root
}

/* Pages that render their own left sub-navigation (and thus a mobile drawer). */
export function hasSubNav(pathname: string): boolean {
  if (pathname.startsWith('/developer/changelog')) return false;
  if (pathname === '/developer/api-reference') return false;
  return true;
}

/* ─── Command Palette ────────────────────────────────────────────────────── */

interface PaletteItem {
  icon: IconName;
  label: string;
  hint: string;
  group: string;
  path?: string;
}

const PALETTE_ITEMS: PaletteItem[] = [
  { group: 'Guides', icon: 'compass', label: 'Overview', hint: 'guide', path: '/developer/overview' },
  { group: 'Guides', icon: 'bolt', label: 'Quickstart', hint: 'guide', path: '/developer/quickstart' },
  { group: 'Guides', icon: 'key', label: 'Authentication', hint: 'guide', path: '/developer/authentication' },
  { group: 'Guides', icon: 'warning', label: 'Errors & Status Codes', hint: 'guide', path: '/developer/errors' },
  { group: 'API Reference', icon: 'receipt', label: 'GST API', hint: 'docs', path: '/developer/gst-api' },
  { group: 'API Reference', icon: 'scroll', label: 'e-Invoice API', hint: 'docs', path: '/developer/e-invoice-api' },
  { group: 'API Reference', icon: 'truck', label: 'e-Way Bill API', hint: 'docs', path: '/developer/e-way-bill-api' },
  { group: 'API Reference', icon: 'globe', label: 'KSA e-Invoice API', hint: 'docs', path: '/developer/ksa-e-invoice-api' },
  { group: 'API Reference', icon: 'code', label: 'API Reference home', hint: 'docs', path: '/developer/api-reference' },
  { group: 'Resources', icon: 'activity', label: 'Changelog', hint: 'updates', path: '/developer/changelog' },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

/* Unified result row — either a curated shortcut or an API endpoint. */
type PaletteRow =
  | { kind: 'static'; group: string; label: string; hint: string; icon: IconName; path: string }
  | { kind: 'op'; group: string; label: string; method: NormalizedMethod; path: string; route: string };

export function CommandPalette({ open, onClose }: CommandPaletteProps): React.ReactElement | null {
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQuery('');
      setDebounced('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  /* Debounce the query feeding search so fast typing never blocks the input,
     even with thousands of endpoints in the index. */
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 70);
    return () => clearTimeout(t);
  }, [query]);

  /* Static shortcut matches (few items — a plain filter is fine). */
  const staticRows = useMemo<PaletteRow[]>(() => {
    const q = debounced.trim().toLowerCase();
    const items = q
      ? PALETTE_ITEMS.filter(i =>
        i.label.toLowerCase().includes(q) ||
        i.group.toLowerCase().includes(q) ||
        i.hint.toLowerCase().includes(q))
      : PALETTE_ITEMS;
    return items.map(i => ({ kind: 'static', group: i.group, label: i.label, hint: i.hint, icon: i.icon, path: i.path ?? '/developer' }));
  }, [debounced]);

  /* Global endpoint matches across all four APIs (indexed + scored). */
  const opRows = useMemo<PaletteRow[]>(() => {
    if (!debounced.trim()) return [];
    return searchOps(debounced, 50).map(op => ({
      kind: 'op', group: op.apiLabel, label: op.summary, method: op.method, path: op.path, route: op.route,
    }));
  }, [debounced]);

  /* Group, preserving order: shortcuts first, then endpoints by API. */
  const sections = useMemo(() => {
    const secs: { group: string; rows: PaletteRow[] }[] = [];
    const byGroup = new Map<string, PaletteRow[]>();
    const push = (row: PaletteRow) => {
      let arr = byGroup.get(row.group);
      if (!arr) { arr = []; byGroup.set(row.group, arr); secs.push({ group: row.group, rows: arr }); }
      arr.push(row);
    };
    staticRows.forEach(push);
    opRows.forEach(push);
    return secs;
  }, [staticRows, opRows]);

  const flat = useMemo(() => sections.flatMap(s => s.rows), [sections]);

  useEffect(() => { setActive(0); }, [debounced]);
  useEffect(() => { rowRefs.current[active]?.scrollIntoView({ block: 'nearest' }); }, [active]);

  const select = (row: PaletteRow) => {
    navigate(row.kind === 'op' ? row.route : row.path);
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, flat.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
      else if (e.key === 'Enter') { e.preventDefault(); const r = flat[active]; if (r) select(r); }
    };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, flat, active, onClose]);

  if (!open) return null;

  let rowIndex = -1; // running absolute index across sections for keyboard nav
  rowRefs.current = [];

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
            placeholder="Search endpoints, guides, APIs..."
            className="flex-1 bg-transparent border-0 outline-none text-[var(--dp-fg)] text-[15px] font-body placeholder:text-[var(--dp-fg-dim)]"
          />
          <button
            onClick={onClose}
            className="bg-[var(--dp-surface-3)] border border-solid border-[var(--dp-border)] text-[var(--dp-fg-dim)] rounded-[5px] px-1.5 py-0.5 text-[11px] font-mono cursor-pointer"
          >
            Esc
          </button>
        </div>

        <div className="max-h-[380px] sm:max-h-[440px] overflow-y-auto py-2">
          {sections.map(section => (
            <div key={section.group}>
              <div className="px-4 pt-2 pb-1 text-[11px] font-mono text-[var(--dp-fg-faint)] tracking-[0.08em] uppercase">
                {section.group}
              </div>
              {section.rows.map(row => {
                rowIndex++;
                const i = rowIndex;
                const isActive = i === active;
                return (
                  <div
                    key={row.kind === 'op' ? row.route : `${row.group}-${row.label}`}
                    ref={el => { rowRefs.current[i] = el; }}
                    onClick={() => select(row)}
                    onMouseEnter={() => setActive(i)}
                    className="flex items-center gap-2.5 px-4 py-2 cursor-pointer transition-colors duration-100"
                    style={{ background: isActive ? 'var(--dp-accent-soft)' : 'transparent' }}
                  >
                    {row.kind === 'op' ? (
                      <>
                        <MethodBadge method={row.method} size="sm" />
                        <span className="flex-1 min-w-0">
                          <span className="block truncate text-[13.5px] text-[var(--dp-fg)]">{row.label}</span>
                          <span className="block truncate text-[11px] font-[family-name:var(--dp-font-mono)] text-[var(--dp-fg-faint)]">{row.path}</span>
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="w-7 h-7 flex items-center justify-center bg-[var(--dp-surface-3)] rounded-[7px] text-[var(--dp-fg-muted)] shrink-0">
                          <DpIcon name={row.icon} size={14} />
                        </span>
                        <span className="flex-1 text-sm text-[var(--dp-fg)] truncate">{row.label}</span>
                        <span className="text-[11px] font-mono text-[var(--dp-fg-dim)] bg-[var(--dp-surface-3)] px-1.5 py-px rounded">
                          {row.hint}
                        </span>
                      </>
                    )}
                    <DpIcon name="chevron-right" size={13} style={{ color: isActive ? 'var(--dp-accent-2)' : 'var(--dp-fg-faint)', flexShrink: 0 }} />
                  </div>
                );
              })}
            </div>
          ))}
          {flat.length === 0 && (
            <div className="py-8 text-center text-[var(--dp-fg-dim)] text-sm">No results found</div>
          )}
        </div>

        <div className="flex gap-5 px-4 py-2.5 border-t border-[var(--dp-border)] bg-[var(--dp-surface)]">
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

/* ─── Resources dropdown ─────────────────────────────────────────────────── */

function ResourcesDropdown(): React.ReactElement {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  /* Close on outside click / Escape — covers both pointer and keyboard users. */
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative flex items-center shrink-0">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={[
          'flex items-center gap-2 whitespace-nowrap bg-transparent border-0 px-2 sm:px-3 h-full',
          'text-[14px] font-body cursor-pointer transition-colors duration-150',
          open ? 'text-[var(--dp-fg)]' : 'text-[var(--dp-fg-dim)] hover:text-[var(--dp-fg)]',
        ].join(' ')}
      >
        <DpIcon name="layers" size={15} style={{ color: open ? 'var(--dp-accent)' : 'currentColor' }} />
        <span className="hidden sm:inline">Resources</span>
        <DpIcon
          name="chevron-down"
          size={14}
          className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        role="menu"
        className={[
          'absolute right-0 top-full pt-2 z-50 transition-all duration-150 ease-out',
          open ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-1',
        ].join(' ')}
      >
        <div className="w-56 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-[var(--dp-border)] bg-[var(--dp-surface-2)] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] p-1">
          {RESOURCE_ITEMS.map(item => (
            <a
              key={item.label}
              href={item.href}
              {...(item.internal ? {} : { target: '_blank', rel: 'noreferrer' })}
              role="menuitem"
              onClick={e => {
                setOpen(false);
                if (item.internal) { e.preventDefault(); navigate(item.href); }
              }}
              className="group flex items-center gap-2.5 rounded-xl px-2.5 py-2 no-underline text-[var(--dp-fg-muted)] hover:text-[var(--dp-fg)] hover:bg-[var(--dp-accent-soft)] focus-visible:bg-[var(--dp-accent-soft)] focus:outline-none transition-colors duration-100"
            >
              <DpIcon name={item.icon} size={16} className="shrink-0" style={{ color: 'var(--dp-fg-dim)' }} />
              <span className="flex-1 min-w-0 text-sm font-medium">{item.label}</span>
              <DpIcon
                name={item.internal ? 'arrow-right' : 'arrow-up-right'}
                size={14}
                className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── API Reference tab (with hover dropdown) ────────────────────────────── */

function ReferenceTab({ isActive }: { isActive: boolean }): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ left: number; top: number }>({ left: 0, top: 0 });
  const navigate = useNavigate();
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => { if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; } };
  const scheduleClose = () => { cancelClose(); closeTimer.current = setTimeout(() => setOpen(false), 120); };
  useEffect(() => cancelClose, []);

  /* The tab strip uses overflow-x-auto, which clips a normally-positioned
     dropdown. Anchor a fixed-position menu to the button's viewport rect so
     it escapes the scroll container. */
  const openMenu = () => {
    const r = btnRef.current?.getBoundingClientRect();
    if (r) setPos({ left: r.left, top: r.bottom });
    cancelClose();
    setOpen(true);
  };

  /* Click toggles the dropdown (in addition to hover) — no navigation. */
  const onButtonClick = () => {
    if (open) setOpen(false);
    else openMenu();
  };

  /* Outside-click / Escape dismissal for the click-opened state (hover leave
     is handled separately by the mouse handlers). */
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!btnRef.current?.contains(e.target as Node) &&
        !menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div
      className="relative flex items-stretch"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <button
        ref={btnRef}
        onClick={onButtonClick}
        aria-haspopup="menu"
        aria-expanded={open}
        className={[
          'relative whitespace-nowrap bg-transparent border-0 px-3 text-[14px] font-body cursor-pointer',
          'flex items-center gap-2 transition-colors duration-150',
          isActive
            ? 'text-[var(--dp-fg)] font-medium'
            : 'text-[var(--dp-fg-dim)] font-normal hover:text-[var(--dp-fg)]',
        ].join(' ')}
      >
        <DpIcon name="code" size={15} style={{ color: isActive ? 'var(--dp-accent)' : 'currentColor' }} />
        API Reference
        <DpIcon
          name="chevron-down"
          size={13}
          className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
        {isActive && <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-[var(--dp-accent)]" />}
      </button>

      <div
        ref={menuRef}
        role="menu"
        style={{ left: pos.left, top: pos.top }}
        className={[
          'fixed z-[60] transition-all duration-150 ease-out',
          open ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-1',
        ].join(' ')}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        <div className="w-56 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-[var(--dp-border)] bg-[var(--dp-surface-2)] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] p-1">
          {REFERENCE_SUBITEMS.map(item => (
            <button
              key={item.type}
              role="menuitem"
              onClick={() => { setOpen(false); navigate(item.path); }}
              className="group w-full flex items-center gap-2.5 rounded-xl px-2.5 py-2 bg-transparent border-0 cursor-pointer text-left text-[var(--dp-fg-muted)] hover:text-[var(--dp-fg)] hover:bg-[var(--dp-accent-soft)] focus-visible:bg-[var(--dp-accent-soft)] focus:outline-none transition-colors duration-100"
            >
              <DpIcon name={item.icon} size={16} className="shrink-0" style={{ color: 'var(--dp-fg-dim)' }} />
              <span className="flex-1 min-w-0 text-sm font-medium">{item.label}</span>
              <DpIcon
                name="arrow-right"
                size={14}
                className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-100"
              />
            </button>
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
  const activeId = activeTabId(pathname);
  const showHamburger = hasSubNav(pathname);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[var(--dp-nav-bg)] border-b border-[var(--dp-border)]">
      {/* ── Row 1: logo · centered search · actions ──────────────────────── */}
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 h-[56px] flex items-center justify-between gap-3">
        {/* Logo */}
        <div className="flex items-center shrink-0">
          <SiteLogo />
          <span className=" md:inline-block ml-1 pl-1 border-l border-[var(--dp-border-strong)] md:text-lg sm:text-base font-medium text-[var(--dp-fg-dim)]">
            | Developer Hub
          </span>
        </div>

        {/* Centered search — desktop */}
        <button
          onClick={onOpenPalette}
          className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-2.5 w-full max-w-[460px] px-4 py-[9px] rounded-xl cursor-pointer border border-solid border-[var(--dp-border-strong)] text-[14px] font-body text-[var(--dp-fg-dim)] hover:border-[var(--dp-fg-faint)] transition-colors duration-150"
          style={{ background: 'var(--dp-surface)' }}
        >
          <DpIcon name="search" size={15} />
          <span className="flex-1 text-left">Search...</span>
          <kbd className="text-[11px] font-mono px-1.5 py-0.5 rounded-[5px] border border-solid border-[var(--dp-border)] bg-[var(--dp-surface-2)] text-[var(--dp-fg-faint)]">⌘K</kbd>
        </button>

        {/* Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Mobile search trigger */}
          <button
            onClick={onOpenPalette}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer border border-solid border-[var(--dp-border)] text-[var(--dp-fg-muted)] transition-colors duration-150"
            style={{ background: 'var(--dp-surface)' }}
            aria-label="Search"
          >
            <DpIcon name="search" size={16} />
          </button>
          <AuthButtons className="hidden sm:flex" />
          <ContactUsDropdown cardType='API Team' />
          <ThemeToggle size={32} />

          {/* Mobile menu — only when the page has a left sub-nav */}
          {/* {showHamburger && (
            <button
              onClick={openNav}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer border border-[var(--dp-border)] transition-colors duration-150"
              style={{ background: 'var(--dp-surface)', color: 'var(--dp-fg-muted)' }}
              aria-label="Open navigation"
            >
              <DpIcon name="menu" size={17} />
            </button>
          )} */}
        </div>
      </div>

      {/* ── Row 2: section tabs with icons + active underline (all viewports) ─── */}
      <div className="border-t border-[var(--dp-border)] lg:border-t-0">
        <div className="max-w-[1440px] mx-auto px-2 sm:px-6 h-[48px] flex items-stretch justify-between gap-2">
          {/* Section tabs — scroll horizontally on narrow viewports */}
          <div className="flex items-stretch gap-0.5 sm:gap-1 min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {NAV_ITEMS.map(item => {
              const isActive = activeId === item.id;
              if (item.id === 'reference') {
                return <ReferenceTab key={item.id} isActive={isActive} />;
              }
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={[
                    'relative whitespace-nowrap bg-transparent border-0 px-3 text-[14px] font-body cursor-pointer',
                    'flex items-center gap-2 transition-colors duration-150',
                    isActive
                      ? 'text-[var(--dp-fg)] font-medium'
                      : 'text-[var(--dp-fg-dim)] font-normal hover:text-[var(--dp-fg)]',
                  ].join(' ')}
                >
                  <DpIcon
                    name={item.icon}
                    size={15}
                    style={{ color: isActive ? 'var(--dp-accent)' : 'currentColor' }}
                  />
                  {item.label}
                  {isActive && (
                    <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-[var(--dp-accent)]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Far-right resources menu */}
          <ResourcesDropdown />
        </div>
      </div>
    </nav>
  );
}
