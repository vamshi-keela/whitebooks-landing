import { useState, useRef, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { NavItem } from './navConfig';

interface NavDropdownProps {
  label: string;
  triggerIcon: ReactNode;
  hubHref: string;
  items: NavItem[];
  isActive: boolean;
}

export function NavDropdown({ label, triggerIcon, hubHref, items, isActive }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const show = () => { clearTimeout(timer.current); setOpen(true); };
  const hide = () => { timer.current = setTimeout(() => setOpen(false), 150); };

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
        <svg
          width="10" height="6" viewBox="0 0 10 6" fill="none"
          className={`ml-0.5 opacity-50 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      {/* pt-[6px] bridges the gap between trigger and panel so hover stays active */}
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 pt-[6px] z-50 transition-all duration-150 ease-out
          ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div
          className={`relative w-[236px] transition-transform duration-150 ease-out ${open ? 'translate-y-0' : '-translate-y-1'}`}
          style={{
            background: 'rgba(8, 8, 14, 0.97)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.7), 0 4px 16px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          <div
            className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] rotate-45"
            style={{
              background: 'rgba(8, 8, 14, 0.97)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              borderLeft: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '2px 0 0 0',
            }}
          />

          <div className="p-1.5">
            {items.map(item => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-[10px] px-3 py-[9px] rounded-[8px]
                  text-[#9a9ab0] hover:text-[#e8e8f0] hover:bg-[rgba(220,47,101,0.08)]
                  transition-colors duration-100 group"
              >
                <span className="text-[#dc2f65] opacity-60 group-hover:opacity-100 transition-opacity shrink-0">
                  {item.icon}
                </span>
                <span className="text-[13px] font-medium leading-none whitespace-nowrap">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
