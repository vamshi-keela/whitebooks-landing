import { useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { NavItem } from './navConfig';
import { Button } from '../ui/Button';

interface Group {
  label: string;
  items: NavItem[];
}

interface MobileNavGroupProps {
  label: string;
  icon: ReactNode;
  items: NavItem[];
  onNavigate: () => void;
  secondaryGroup?: Group;
  /** Header shown above the primary list. Defaults to no header. */
  primaryLabel?: string;
  /** N-group mode: each group becomes its own labelled section. Takes
   *  precedence over `items` / `secondaryGroup` when provided. */
  groups?: Group[];
}

function MobileNavItemList({ items, onNavigate, accentColor = '#d33568', hoverBg = 'rgba(220,47,101,0.08)' }: {
  items: NavItem[];
  onNavigate: () => void;
  accentColor?: string;
  hoverBg?: string;
}) {
  return (
    <>
      {items.map(item => (
        <Link
          key={item.href}
          to={item.href}
          onClick={onNavigate}
          className="flex items-center gap-2.5 px-2 py-2 rounded-[6px] text-[var(--muted-2)] hover:text-[var(--text)] transition-colors duration-100 group"
          style={{ ['--hover-bg' as string]: hoverBg }}
          onMouseEnter={e => (e.currentTarget.style.background = hoverBg)}
          onMouseLeave={e => (e.currentTarget.style.background = '')}
        >
          <span className="opacity-60 group-hover:opacity-100 transition-opacity shrink-0" style={{ color: accentColor }}>
            {item.icon}
          </span>
          <span className="text-[13px] font-medium leading-none">
            {item.label}
          </span>
        </Link>
      ))}
    </>
  );
}

export function MobileNavGroup({ label, icon, items, onNavigate, secondaryGroup, primaryLabel, groups }: MobileNavGroupProps) {
  const [open, setOpen] = useState(false);

  // Unify layouts: N-group mode wins, else fall back to primary + optional secondary.
  const sections: Group[] = groups?.length
    ? groups
    : [
        ...(primaryLabel ? [{ label: primaryLabel, items }] : [{ label: '', items }]),
        ...(secondaryGroup ? [secondaryGroup] : []),
      ];

  return (
    <div>
      <Button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--text)] bg-[var(--bg-elev)]"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <span className="text-[var(--text)]">{icon}</span>
          {label}
        </span>
        <svg
          width="10" height="6" viewBox="0 0 10 6" fill="none"
          className={`opacity-40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Button>

      {open && (
        <div className="mt-1 ml-3 pl-3 border-l border-[var(--line-2)] flex flex-col gap-0.5">
          {sections.map((section, i) => (
            <div key={section.label || i}>
              {section.label && (
                <p className={`px-2 pb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#d33568] ${i === 0 ? 'pt-1' : 'pt-2'}`}>
                  {section.label}
                </p>
              )}
              <MobileNavItemList items={section.items} onNavigate={onNavigate} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
