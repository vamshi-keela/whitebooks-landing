import { useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { NavItem } from './navConfig';
import { Button } from '../ui/Button';

interface MobileNavGroupProps {
  label: string;
  icon: ReactNode;
  items: NavItem[];
  onNavigate: () => void;
}

export function MobileNavGroup({ label, icon, items, onNavigate }: MobileNavGroupProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg
          text-sm font-medium text-[#9a9ab0] bg-black"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <span className="text-[#dc2f65]">{icon}</span>
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
        <div className="mt-1 ml-3 pl-3 border-l border-white/[0.08] flex flex-col gap-0.5">
          {items.map(item => (
            <Link
              key={item.href}
              to={item.href}
              onClick={onNavigate}
              className="flex items-center gap-2.5 px-2 py-2 rounded-[6px]
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
      )}
    </div>
  );
}
