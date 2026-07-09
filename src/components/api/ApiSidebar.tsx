import React, { useState, useEffect, memo } from 'react';
import { ChevronDown, ChevronRight, X, Check, LayoutGrid } from 'lucide-react';
import type { TagGroup } from '../../utils/groupOperations';
import type { NormalizedMethod } from '../../data/openapi-spec';
import MethodBadge from './MethodBadge';
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
  { type: 'gst-api', label: 'GST API', path: '/developer/gst-api/get-public-search' },
  { type: 'e-invoice-api', label: 'e-Invoice API', path: '/developer/e-invoice-api/get-einvoice-authenticate' },
  { type: 'e-way-bill-api', label: 'e-Way Bill API', path: '/developer/e-way-bill-api/get-ewaybillapi-v1.03-authenticate' },
  // { type: 'ksa-e-invoice-api', label: 'KSA e-Invoice', path: '/developer/ksa-e-invoice-api' },
];

interface Props {
  groups: TagGroup[];
  selectedOpId: string;
  onSelect: (id: string) => void;
  staticGroups?: StaticNavGroup[];
  currentApiType?: string;
  onApiSwitch?: (path: string) => void;
}

/* ─── Sidebar group ──────────────────────────────────────────────────────── */
const SidebarGroup = memo(function SidebarGroup({
  group, selectedOpId, onSelect,
}: {
  group: TagGroup;
  selectedOpId: string;
  onSelect: (id: string) => void;
}): React.ReactElement {
  const [open, setOpen] = useState(true);

  const ops = group.operations;
  if (ops.length === 0) return <></>;

  const anyActive = ops.some(op => op.id === selectedOpId);

  return (
    <div className="mb-1">
      <div
        onClick={() => setOpen(o => !o)}
        className={[
          'group flex items-center gap-1.5 px-2.5 py-[7px] rounded-lg cursor-pointer select-none',
          'transition-colors duration-100 hover:bg-[var(--dp-sidebar-hover)]',
        ].join(' ')}
      >
        <span className={[
          'text-[13px] font-semibold flex-1 leading-[1.3]',
          anyActive && !open ? 'text-[var(--dp-accent-2)]' : 'text-[var(--dp-fg)]',
        ].join(' ')}>
          {group.tag.name}
        </span>
        <ChevronRight
          size={13}
          color="var(--dp-fg-faint)"
          className="shrink-0 transition-transform duration-150"
          style={{ transform: open ? 'rotate(90deg)' : 'none' }}
        />
      </div>

      {open && (
        <div className="ml-[13px] pl-[7px] mt-0.5 border-l border-[var(--dp-border)] flex flex-col gap-px">
          {ops.map(op => {
            const isActive = selectedOpId === op.id;
            return (
              <div
                key={op.id}
                data-op-id={op.id}
                onClick={() => onSelect(op.id)}
                className={[
                  'flex items-center gap-2 pl-2.5 pr-1.5 py-[6px] rounded-md cursor-pointer',
                  'transition-colors duration-100',
                  isActive
                    ? 'bg-[var(--dp-accent-soft)]'
                    : 'hover:bg-[var(--dp-sidebar-hover)]',
                ].join(' ')}
              >
                <span className={[
                  'text-[13px] flex-1 font-body',
                  'overflow-hidden text-ellipsis whitespace-nowrap leading-[1.45]',
                  isActive
                    ? 'text-[var(--dp-accent-2)] font-medium'
                    : 'text-[var(--dp-fg-muted)] font-normal',
                ].join(' ')}>
                  {op.summary}
                </span>
                <MethodBadge method={op.method as NormalizedMethod} size="sm" />
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
  group, selectedOpId, onSelect,
}: {
  group: StaticNavGroup;
  selectedOpId: string;
  onSelect: (id: string) => void;
}): React.ReactElement {
  const [open, setOpen] = useState(true);

  const items = group.items;
  if (items.length === 0) return <></>;

  const anyActive = items.some(op => op.id === selectedOpId);
  return (
    <div className="mb-1">
      {group.items.length > 1 && <div
        onClick={() => setOpen(o => !o)}
        className={[
          'flex items-center gap-1.5 px-2.5 py-[7px] rounded-lg cursor-pointer select-none',
          'transition-colors duration-100 hover:bg-[var(--dp-sidebar-hover)]',
        ].join(' ')}
      >
        <span className={[
          'text-[13px] font-semibold flex-1 leading-[1.3]',
          anyActive && !open ? 'text-[var(--dp-accent-2)]' : 'text-[var(--dp-fg)]',
        ].join(' ')}>
          {group.heading}
        </span>
        <ChevronRight
          size={13}
          color="var(--dp-fg-faint)"
          className="shrink-0 transition-transform duration-150"
          style={{ transform: open ? 'rotate(90deg)' : 'none' }}
        />
      </div>}
      {open && (
        <div className="flex flex-col gap-px">
          {items.map(item => {
            const isActive = selectedOpId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={[
                  'flex items-center gap-2 px-2.5 py-[6px] rounded-md cursor-pointer',
                  'transition-colors duration-100',
                  isActive ? 'bg-[var(--dp-accent-soft)]' : 'hover:bg-[var(--dp-sidebar-hover)]',
                ].join(' ')}
              >
                {item.icon && (
                  <span className="shrink-0 flex items-center" style={{ color: isActive ? 'var(--dp-accent-2)' : 'var(--dp-fg-faint)' }}>
                    {item.icon}
                  </span>
                )}
                <span className={[
                  'text-[13px] font-body',
                  'overflow-hidden text-ellipsis whitespace-nowrap leading-[1.45]',
                  isActive ? 'text-[var(--dp-accent-2)] font-medium' : 'text-[var(--dp-fg-muted)] font-normal',
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
  groups, selectedOpId, onSelect, staticGroups,
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

  // Bring the active operation into view when it changes — e.g. when deep-linked
  // from the overview "Jump into the API" cards. Scrolls each sidebar instance's
  // own scroll container (desktop aside + mobile drawer) only if the item is
  // off-screen, so an already-visible selection doesn't jump.
  useEffect(() => {
    if (!selectedOpId) return;
    const raf = requestAnimationFrame(() => {
      document.querySelectorAll<HTMLElement>('[data-op-id]').forEach(el => {
        if (el.dataset.opId !== selectedOpId) return;
        const container = el.closest<HTMLElement>('[data-sidebar-scroll]');
        if (!container) return;
        const cRect = container.getBoundingClientRect();
        const eRect = el.getBoundingClientRect();
        if (eRect.top >= cRect.top && eRect.bottom <= cRect.bottom) return; // already visible
        const target = eRect.top - cRect.top + container.scrollTop - container.clientHeight / 2 + eRect.height / 2;
        container.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [selectedOpId]);

  const sidebarContent = (
    <>
      {/* API switcher — shown on both desktop sidebar and mobile drawer */}
      {/* <ApiSwitcher
        currentApiType={currentApiType}
        onApiSwitch={onApiSwitch}
        onClose={closeNav}
      /> */}
      <div className="mx-4 mb-1" style={{ height: 1, background: 'var(--dp-border)' }} />

      <div data-sidebar-scroll className="px-3 pt-2 pb-6 overflow-y-auto flex-1">
        {staticGroups?.map(group => (
          <StaticGroup
            key={group.heading}
            group={group}
            selectedOpId={selectedOpId}
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

        {/* API switcher + operations */}
        {sidebarContent}
      </div>

      {/* Desktop sidebar — hidden on mobile, shown on lg+ */}
      <aside className={[
        'hidden lg:flex flex-col',
        'lg:w-[240px] xl:w-[272px] 2xl:w-[312px] shrink-0',
        'sticky top-[var(--dp-nav-h)] h-[calc(100vh_-_var(--dp-nav-h))]',
        'overflow-y-auto',
        'border-r border-[var(--dp-border)] bg-[var(--dp-bg-2)]',
      ].join(' ')}>
        {sidebarContent}
      </aside>
    </>
  );
}
