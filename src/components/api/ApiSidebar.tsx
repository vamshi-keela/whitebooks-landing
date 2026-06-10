import React, { useState, useEffect, memo } from 'react';
import { ChevronDown, ChevronRight, X, Check, LayoutGrid } from 'lucide-react';
import type { TagGroup } from '../../utils/groupOperations';
import type { NormalizedMethod } from '../../data/openapi-spec';
import MethodBadge from './MethodBadge';
import SearchBar from './SearchBar';
import { useMobileNav } from '../../contexts/MobileNavContext';

export interface StaticNavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface StaticNavGroup {
  heading: string;
  items: StaticNavItem[];
}

interface ApiSwitchItem {
  type: string;
  label: string;
  path: string;
}

const API_SWITCH_ITEMS: ApiSwitchItem[] = [
  { type: 'gst-api',           label: 'GST API',         path: '/developer/gst-api' },
  { type: 'e-invoice-api',     label: 'e-Invoice API',   path: '/developer/e-invoice-api' },
  { type: 'e-way-bill-api',    label: 'e-Way Bill API',  path: '/developer/e-way-bill-api' },
  { type: 'ksa-e-invoice-api', label: 'KSA e-Invoice',   path: '/developer/ksa-e-invoice-api' },
];

interface Props {
  groups: TagGroup[];
  searchQuery: string;
  onSearchChange: (v: string) => void;
  selectedOpId: string;
  onSelect: (id: string) => void;
  staticGroups?: StaticNavGroup[];
  currentApiType?: string;
  onApiSwitch?: (path: string) => void;
}

/* ─── Sidebar group ──────────────────────────────────────────────────────── */
const SidebarGroup = memo(function SidebarGroup({
  group, selectedOpId, searchQuery, onSelect,
}: {
  group: TagGroup;
  selectedOpId: string;
  searchQuery: string;
  onSelect: (id: string) => void;
}): React.ReactElement {
  const [open, setOpen] = useState(true);

  const filteredOps = group.operations.filter(op => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return op.path.toLowerCase().includes(q) || op.summary.toLowerCase().includes(q);
  });

  if (filteredOps.length === 0) return <></>;

  const anyActive = filteredOps.some(op => op.id === selectedOpId);

  return (
    <div className="mb-0.5">
      <div
        onClick={() => setOpen(o => !o)}
        className={[
          'flex items-center gap-1.5 px-2 py-1.5 rounded-[7px] cursor-pointer select-none',
          anyActive && !open ? 'bg-[var(--dp-accent-soft)]' : '',
        ].join(' ')}
      >
        {open
          ? <ChevronDown size={11} color="var(--dp-fg-faint)" className="shrink-0" />
          : <ChevronRight size={11} color="var(--dp-fg-faint)" className="shrink-0" />
        }
        <span className={[
          'text-[11px] font-semibold flex-1 tracking-[0.01em]',
          anyActive && !open ? 'text-[var(--dp-accent-2)]' : 'text-[var(--dp-fg-dim)]',
        ].join(' ')}>
          {group.tag.name}
        </span>
        <span className="text-[10px] font-[family-name:var(--dp-font-mono)] text-[var(--dp-fg-faint)] bg-[var(--dp-surface-2)] border border-[var(--dp-border)] rounded-[4px] px-1">
          {filteredOps.length}
        </span>
      </div>

      {open && (
        <div className="pl-1.5 mt-px">
          {filteredOps.map(op => {
            const isActive = selectedOpId === op.id;
            return (
              <div
                key={op.id}
                onClick={() => onSelect(op.id)}
                className={[
                  'flex items-center gap-[7px] px-2 py-[5px] rounded-[6px] cursor-pointer',
                  'border-l-2 transition-[background] duration-[120ms]',
                  isActive ? 'bg-[var(--dp-accent-soft)]' : 'hover:bg-[var(--dp-sidebar-hover)]',
                ].join(' ')}
                style={{ borderLeftColor: isActive ? 'var(--dp-accent)' : 'transparent' }}
              >
                <MethodBadge method={op.method as NormalizedMethod} size="sm" />
                <span className={[
                  'text-[11px] font-[family-name:var(--dp-font-mono)]',
                  'overflow-hidden text-ellipsis whitespace-nowrap leading-[1.4]',
                  isActive ? 'text-[var(--dp-fg)]' : 'text-[var(--dp-fg-muted)]',
                ].join(' ')}>
                  {op.summary}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});

/* ─── Static nav group ───────────────────────────────────────────────────── */
const StaticGroup = memo(function StaticGroup({
  group, selectedOpId, searchQuery, onSelect,
}: {
  group: StaticNavGroup;
  selectedOpId: string;
  searchQuery: string;
  onSelect: (id: string) => void;
}): React.ReactElement {
  const [open, setOpen] = useState(true);

  const filteredOps = group.items.filter(op => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return op.label.toLowerCase().includes(q);
  });

  if (filteredOps.length === 0) return <></>;

  const anyActive = filteredOps.some(op => op.id === selectedOpId);
  return (
    <div className="mb-0.5">
      {group.items.length > 1 && <div
        onClick={() => setOpen(o => !o)}
        className={[
          'flex items-center gap-1.5 px-2 py-1.5 rounded-[7px] cursor-pointer select-none',
          anyActive && !open ? 'bg-[var(--dp-accent-soft)]' : '',
        ].join(' ')}
      >
        {open
          ? <ChevronDown size={11} color="var(--dp-fg-faint)" className="shrink-0" />
          : <ChevronRight size={11} color="var(--dp-fg-faint)" className="shrink-0" />
        }
        <span className={[
          'text-[11px] font-semibold flex-1 tracking-[0.01em]',
          anyActive && !open ? 'text-[var(--dp-accent-2)]' : 'text-[var(--dp-fg-dim)]',
        ].join(' ')}>
          {group.heading}
        </span>
      </div>}
      {open && (
        <div className="pl-1.5 mt-px">
          {filteredOps.map(item => {
            const isActive = selectedOpId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={[
                  'flex items-center gap-[7px] px-2 py-[5px] rounded-[6px] cursor-pointer',
                  'border-l-2 transition-[background] duration-[120ms]',
                  isActive ? 'bg-[var(--dp-accent-soft)]' : 'hover:bg-[var(--dp-sidebar-hover)]',
                ].join(' ')}
                style={{ borderLeftColor: isActive ? 'var(--dp-accent)' : 'transparent' }}
              >
                {item.icon && (
                  <span className="shrink-0 flex items-center" style={{ color: isActive ? 'var(--dp-accent-2)' : 'var(--dp-fg-faint)' }}>
                    {item.icon}
                  </span>
                )}
                <span className={[
                  'text-[11px]',
                  'overflow-hidden text-ellipsis whitespace-nowrap leading-[1.4]',
                  isActive ? 'text-[var(--dp-fg)] font-medium' : 'text-[var(--dp-fg-muted)]',
                ].join(' ')}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});

/* ─── API Switcher ───────────────────────────────────────────────────────── */
function ApiSwitcher({
  currentApiType, onApiSwitch, onClose,
}: {
  currentApiType?: string;
  onApiSwitch?: (path: string) => void;
  onClose: () => void;
}): React.ReactElement {
  const [open, setOpen] = useState(false);
  const currentLabel = API_SWITCH_ITEMS.find(a => a.type === currentApiType)?.label ?? 'Select API';

  return (
    <div className="px-4 pt-4 pb-3">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-150 cursor-pointer border-0"
        style={{
          background: 'var(--dp-surface-3)',
          border: '1px solid var(--dp-border)',
          color: 'var(--dp-fg)',
        }}
      >
        <span>{currentLabel}</span>
        <ChevronDown
          size={15}
          style={{
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.15s',
            color: 'var(--dp-fg-dim)',
          }}
        />
      </button>

      {open && (
        <div
          className="mt-1.5 rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--dp-border)', background: 'var(--dp-surface-2)' }}
        >
          {API_SWITCH_ITEMS.map((item, i) => {
            const isActive = item.type === currentApiType;
            return (
              <button
                key={item.type}
                onClick={() => {
                  onApiSwitch?.(item.path);
                  setOpen(false);
                  onClose();
                }}
                className="w-full flex items-center justify-between px-4 py-3 transition-colors duration-100 text-sm cursor-pointer border-0"
                style={{
                  background: isActive ? 'rgba(220,47,101,0.06)' : 'transparent',
                  color: isActive ? 'var(--dp-accent-2)' : 'var(--dp-fg)',
                  borderBottom: i < API_SWITCH_ITEMS.length - 1 ? '1px solid var(--dp-border)' : 'none',
                }}
              >
                <span className="flex items-center gap-2">
                  <LayoutGrid size={13} style={{ color: isActive ? 'var(--dp-accent)' : 'var(--dp-fg-faint)' }} />
                  {item.label}
                </span>
                {isActive && <Check size={14} style={{ color: 'var(--dp-accent)', flexShrink: 0 }} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── ApiSidebar ─────────────────────────────────────────────────────────── */
export default function ApiSidebar({
  groups, searchQuery, onSearchChange, selectedOpId, onSelect, staticGroups,
  currentApiType, onApiSwitch,
}: Props): React.ReactElement {
  const { open: mobileOpen, closeNav } = useMobileNav();

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

  const sidebarContent = (
    <>
      <div className="px-3 pt-3 pb-2">
        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </div>
      <div className="px-2 pt-1 overflow-y-auto flex-1">
        {staticGroups?.map(group => (
          <StaticGroup
            key={group.heading}
            group={group}
            selectedOpId={selectedOpId}
            searchQuery={searchQuery}
            onSelect={id => { onSelect(id); closeNav(); }}
          />
        ))}
        {staticGroups && staticGroups.length > 0 && groups.length > 0 && (
          <div className="my-2 mx-1" style={{ height: 1, background: 'var(--dp-border)' }} />
        )}
        {groups.map(group => (
          <SidebarGroup
            key={group.tag.name}
            group={group}
            selectedOpId={selectedOpId}
            searchQuery={searchQuery}
            onSelect={id => { onSelect(id); closeNav(); }}
          />
        ))}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile overlay */}
      <div
        className="lg:hidden fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: mobileOpen ? 1 : 0, pointerEvents: mobileOpen ? 'auto' : 'none' }}
        onClick={closeNav}
      />

      {/* Mobile drawer — slides in from left */}
      <div
        className={[
          'lg:hidden fixed top-0 left-0 bottom-0 w-[300px] z-[201]',
          'flex flex-col transition-transform duration-[250ms] ease-in-out',
        ].join(' ')}
        style={{
          background: 'var(--dp-bg-2)',
          borderRight: '1px solid var(--dp-border)',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          boxShadow: mobileOpen ? '16px 0 48px rgba(0,0,0,0.4)' : 'none',
        }}
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-5 h-[60px] shrink-0"
          style={{ borderBottom: '1px solid var(--dp-border)' }}
        >
          <span className="text-[13px] font-mono text-[var(--dp-fg-dim)] tracking-[0.08em] uppercase">
            API Reference
          </span>
          <button
            onClick={closeNav}
            className="w-8 h-8 flex items-center justify-center rounded-[7px] cursor-pointer border-0 transition-colors duration-150"
            style={{ background: 'var(--dp-sidebar-hover)', color: 'var(--dp-fg-muted)' }}
          >
            <X size={15} />
          </button>
        </div>

        {/* API switcher */}
        <ApiSwitcher
          currentApiType={currentApiType}
          onApiSwitch={onApiSwitch}
          onClose={closeNav}
        />

        <div className="mx-5 mb-3" style={{ height: 1, background: 'var(--dp-border)' }} />

        {/* Search + operations */}
        {sidebarContent}
      </div>

      {/* Desktop sidebar — hidden on mobile, shown on lg+ */}
      <aside className={[
        'hidden lg:flex flex-col',
        'lg:w-[240px] xl:w-[272px] 2xl:w-[312px] shrink-0',
        'sticky top-[60px] h-[calc(100vh-60px)]',
        'overflow-y-auto',
        'border-r border-[var(--dp-border)] bg-[var(--dp-bg-2)]',
      ].join(' ')}>
        {sidebarContent}
      </aside>
    </>
  );
}
