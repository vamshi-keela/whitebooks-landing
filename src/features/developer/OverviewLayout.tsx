import React, { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Divider } from './GstShared';

export interface OverviewNavSection {
  /** Unique anchor id used for the jump link. */
  id: string;
  /** Label shown in the right navigation rail. */
  label: string;
  /** Icon shown next to the label. */
  icon: LucideIcon;
  /** Rendered section content. */
  element: React.ReactNode;
  /** Render the section but keep it out of the right nav (e.g. stats band). */
  hideFromNav?: boolean;
}

/**
 * Two-column shell for the API overview pages: the section stack on the left and
 * a sticky "On this page" rail on the right that scroll-spies the visible section
 * and lets users jump between sections. The rail is hidden below `xl`.
 */
export function OverviewLayout({ sections }: { sections: OverviewNavSection[] }): React.ReactElement {
  const navItems = sections.filter(s => !s.hideFromNav);
  const [activeId, setActiveId] = useState<string>(navItems[0]?.id ?? sections[0]?.id ?? '');
  const clickLockRef = useRef(false);

  useEffect(() => {
    const ids = sections.map(s => s.id);
    const observer = new IntersectionObserver(
      entries => {
        if (clickLockRef.current) return;
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          // Map the visible section onto its nearest nav entry (skip hidden ones).
          const id = visible[0].target.id;
          const idx = sections.findIndex(s => s.id === id);
          for (let i = idx; i >= 0; i--) {
            if (!sections[i].hideFromNav) {
              setActiveId(sections[i].id);
              break;
            }
          }
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    );

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  const handleJump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    // Briefly ignore the observer so the clicked item stays highlighted while scrolling.
    clickLockRef.current = true;
    setActiveId(id);
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => {
      clickLockRef.current = false;
    }, 700);
  };

  return (
    <div className="flex">
      {/* ── Section stack ─────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0">
        {sections.map((s, i) => (
          <React.Fragment key={s.id}>
            <div id={s.id} style={{ scrollMarginTop: 'calc(var(--dp-nav-h) + 60px)' }}>
              {s.element}
            </div>
            {i < sections.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </div>

      {/* ── Right "On this page" rail ─────────────────────────────────── */}
      <aside
        className="hidden xl:block shrink-0 w-[236px] sticky self-start overflow-y-auto px-6"
        style={{
          top: 'calc(var(--dp-nav-h) + 52px)',
          height: 'calc(100vh - var(--dp-nav-h) - 52px)',
          paddingTop: 28,
          paddingBottom: 28,
        }}
      >
        <div
          className="text-[10px] uppercase tracking-[0.12em] font-semibold mb-3.5 pl-3"
          style={{ color: 'var(--dp-fg-faint)', fontFamily: 'var(--dp-font-mono)' }}
        >
          On this page
        </div>
        <nav className="flex flex-col border-l" style={{ borderColor: 'var(--dp-border)' }}>
          {navItems.map(({ id, label, icon: Icon }) => {
            const active = id === activeId;
            return (
              <button
                key={id}
                type="button"
                onClick={() => handleJump(id)}
                className="group flex items-center gap-2 text-left pl-3 -ml-px py-[7px] cursor-pointer border-0 border-l-2 bg-transparent transition-colors duration-150"
                style={{
                  borderLeftColor: active ? 'var(--dp-accent-2)' : 'transparent',
                  color: active ? 'var(--dp-accent-2)' : 'var(--dp-fg-muted)',
                }}
                onMouseEnter={e => {
                  if (!active) (e.currentTarget as HTMLButtonElement).style.color = 'var(--dp-fg)';
                }}
                onMouseLeave={e => {
                  if (!active) (e.currentTarget as HTMLButtonElement).style.color = 'var(--dp-fg-muted)';
                }}
              >
                <Icon size={13} className="shrink-0" />
                <span className="text-[12.5px] leading-snug">{label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
