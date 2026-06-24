import { useState, useRef, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { NavItem } from './navConfig';

interface SecondaryGroup {
  label: string;
  items: NavItem[];
}

interface NavDropdownProps {
  label: string;
  triggerIcon: ReactNode;
  hubHref: string;
  items: NavItem[];
  isActive: boolean;
  secondaryGroup?: SecondaryGroup;
  /** Header for the primary column in two-column mode. Defaults to `label`. */
  primaryLabel?: string;
}

function NavItemLink({ item, accentColor, hoverBg, onClose }: {
  item: NavItem;
  accentColor: string;
  hoverBg: string;
  onClose: () => void;
}) {
  return (
    <Link
      to={item.href}
      onClick={onClose}
      className="flex items-center gap-[10px] px-3 py-[9px] rounded-[8px] transition-colors duration-100 group"
      style={{ color: 'var(--muted-2)' }}
      onMouseEnter={e => (e.currentTarget.style.background = hoverBg)}
      onMouseLeave={e => (e.currentTarget.style.background = '')}
    >
      <span className="opacity-60 group-hover:opacity-100 transition-opacity shrink-0" style={{ color: accentColor }}>
        {item.icon}
      </span>
      <span className="text-[13px] font-medium leading-none whitespace-nowrap group-hover:text-[var(--text)] transition-colors">
        {item.label}
      </span>
    </Link>
  );
}

export function NavDropdown({ label, triggerIcon, hubHref, items, isActive, secondaryGroup, primaryLabel }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const show = () => { clearTimeout(timer.current); setOpen(true); };
  const hide = () => { timer.current = setTimeout(() => setOpen(false), 150); };
  const close = () => setOpen(false);

  const twoColumn = !!secondaryGroup;

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <Link
        role="tab"
        aria-selected={isActive}
        to={hubHref}
        className={`wb-toggle-btn ${isActive ? 'is-active' : ''}`}
      >
        {triggerIcon}
        {label}
        {items.length > 0 && <svg
          width="10" height="6" viewBox="0 0 10 6" fill="none"
          className={`ml-0.5 opacity-50 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>}
      </Link>

      {/* pt-[6px] bridges the gap between trigger and panel */}
      {items.length > 0 && <div
        className={`absolute top-full left-1/2 -translate-x-1/2 pt-[6px] z-50 transition-all duration-150 ease-out
          ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div
          className={`relative transition-transform duration-150 ease-out ${open ? 'translate-y-0' : '-translate-y-1'}`}
          style={{
            width: twoColumn ? 540 : 236,
            background: 'var(--bg-3)',
            border: '1px solid var(--line-2)',
            borderRadius: '12px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.2)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          {/* Arrow tip */}
          <div
            className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] rotate-45"
            style={{
              background: 'var(--bg-3)',
              borderTop: '1px solid var(--line-2)',
              borderLeft: '1px solid var(--line-2)',
              borderRadius: '2px 0 0 0',
            }}
          />

          {twoColumn ? (
            <div className="flex p-1.5 gap-0">
              {/* Primary column — Resources */}
              <div className="flex-1 min-w-0">
                <p className="px-3 pt-[10px] pb-[6px] text-[10px] font-semibold uppercase tracking-[0.12em]"
                  style={{ color: 'var(--brand)' }}>
                  {primaryLabel ?? label}
                </p>
                {items.map(item => (
                  <NavItemLink
                    key={item.href}
                    item={item}
                    accentColor="#dc2f65"
                    hoverBg="rgba(220,47,101,0.08)"
                    onClose={close}
                  />
                ))}
              </div>

              {/* Divider */}
              <div className="w-px my-2 shrink-0" style={{ background: 'var(--line-2)' }} />

              {/* Secondary column — Tools */}
              <div className="flex-1 min-w-0">
                <p className="px-3 pt-[10px] pb-[6px] text-[10px] font-semibold uppercase tracking-[0.12em]"
                  style={{ color: '#dc2f65' }}>
                  {secondaryGroup.label}
                </p>
                {secondaryGroup.items.map(item => (
                  <NavItemLink
                    key={item.href}
                    item={item}
                    accentColor="#dc2f65"
                    hoverBg="rgba(220,47,101,0.08)"
                    onClose={close}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="p-1.5">
              {items.map(item => (
                <NavItemLink
                  key={item.href}
                  item={item}
                  accentColor="#dc2f65"
                  hoverBg="rgba(220,47,101,0.08)"
                  onClose={close}
                />
              ))}
            </div>
          )}
        </div>
      </div>}
    </div>
  );
}
