import React, { useState, useEffect, memo } from 'react';
import { ChevronDown, ChevronRight, X, Menu } from 'lucide-react';
import type { TagGroup } from '../../utils/groupOperations';
import type { NormalizedMethod } from '../../data/openapi-spec';
import MethodBadge from './MethodBadge';
import SearchBar from './SearchBar';

export interface StaticNavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface StaticNavGroup {
  heading: string;
  items: StaticNavItem[];
}

interface Props {
  groups: TagGroup[];
  searchQuery: string;
  onSearchChange: (v: string) => void;
  selectedOpId: string;
  onSelect: (id: string) => void;
  staticGroups?: StaticNavGroup[];
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
      {/* Group header */}
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

      {/* Operations */}
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
                  isActive ? 'bg-[var(--dp-accent-soft)]' : 'hover:bg-white/[0.04]',
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
  group, selectedOpId, onSelect,
}: {
  group: StaticNavGroup;
  selectedOpId: string;
  onSelect: (id: string) => void;
}): React.ReactElement {
  const [open, setOpen] = useState(true);
  const anyActive = group.items.some(item => item.id === selectedOpId);

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
          {group.items.map(item => {
            const isActive = selectedOpId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={[
                  'flex items-center gap-[7px] px-2 py-[5px] rounded-[6px] cursor-pointer',
                  'border-l-2 transition-[background] duration-[120ms]',
                  isActive ? 'bg-[var(--dp-accent-soft)]' : 'hover:bg-white/[0.04]',
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

/* ─── ApiSidebar ─────────────────────────────────────────────────────────── */
export default function ApiSidebar({
  groups, searchQuery, onSearchChange, selectedOpId, onSelect, staticGroups,
}: Props): React.ReactElement {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handle = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);

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
            onSelect={id => { onSelect(id); setMobileOpen(false); }}
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
            onSelect={id => { onSelect(id); setMobileOpen(false); }}
          />
        ))}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile FAB — hidden on desktop (lg+) */}
      <button
        className="lg:hidden fixed bottom-6 right-6 z-[100] flex items-center gap-1.5 bg-[var(--dp-accent)] rounded-[10px] px-3.5 py-2.5 text-white text-[13px] font-[family-name:var(--dp-font-body)] font-semibold cursor-pointer shadow-[0_4px_20px_rgba(220,47,101,0.4)]"
        style={{ border: 'none' }}
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={16} /> APIs
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={[
          'fixed top-0 left-0 bottom-0 w-[300px] z-[201]',
          'bg-[var(--dp-bg-2)] border-r border-[var(--dp-border)]',
          'flex flex-col transition-transform duration-[250ms] ease-in-out',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-[var(--dp-border)]">
          <span className="font-[family-name:var(--dp-font-display)] font-bold text-[14px] text-[var(--dp-fg)]">
            API Reference
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            className="bg-transparent p-0 text-[var(--dp-fg-dim)] cursor-pointer"
            style={{ background: 'none', border: 'none' }}
          >
            <X size={16} />
          </button>
        </div>
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
