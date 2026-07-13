import React, { useState, useEffect } from 'react';
import DpIcon from './DpIcon';
import { SIDEBAR_GROUPS, TOC_ITEMS, type SidebarGroup } from './DpGuideData';

/* ─── Callout ──────────────────────────────────────────────────────────────── */

type CalloutVariant = 'info' | 'warn' | 'success' | 'note';

interface CalloutProps {
  variant: CalloutVariant;
  children: React.ReactNode;
}

const calloutConfig: Record<
  CalloutVariant,
  { bg: string; border: string; icon: React.ReactElement; iconColor: string }
> = {
  info: {
    bg: 'rgba(96,165,250,0.06)',
    border: 'rgba(96,165,250,0.2)',
    icon: <DpIcon name="info" size={14} />,
    iconColor: '#60a5fa',
  },
  warn: {
    bg: 'rgba(245,158,11,0.06)',
    border: 'rgba(245,158,11,0.2)',
    icon: <DpIcon name="warning" size={14} />,
    iconColor: '#f59e0b',
  },
  success: {
    bg: 'rgba(34,197,94,0.06)',
    border: 'rgba(34,197,94,0.2)',
    icon: <DpIcon name="check" size={14} />,
    iconColor: '#22c55e',
  },
  note: {
    bg: 'rgba(220,47,101,0.06)',
    border: 'rgba(220,47,101,0.2)',
    icon: <DpIcon name="info" size={14} />,
    iconColor: 'var(--dp-accent-2)',
  },
};

export function Callout({ variant, children }: CalloutProps): React.ReactElement {
  const cfg = calloutConfig[variant];
  return (
    <div
      style={{
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        borderRadius: 10,
        padding: '14px 16px',
        display: 'flex',
        gap: 12,
        margin: '20px 0',
      }}
    >
      <span style={{ color: cfg.iconColor, flexShrink: 0, marginTop: 2 }}>{cfg.icon}</span>
      <div style={{ fontSize: 14, color: 'var(--dp-fg-muted)', lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

/* ─── DocSidebar ───────────────────────────────────────────────────────────── */

interface DocSidebarProps {
  activeSlug: string;
  onSelect: (slug: string) => void;
}

export function DocSidebar({ activeSlug, onSelect }: DocSidebarProps): React.ReactElement {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState('');

  const toggleGroup = (heading: string) => {
    setCollapsed(c => ({ ...c, [heading]: !c[heading] }));
  };

  const filtered: SidebarGroup[] = search
    ? SIDEBAR_GROUPS.map(g => ({
        ...g,
        items: g.items.filter(i => i.label.toLowerCase().includes(search.toLowerCase())),
      })).filter(g => g.items.length > 0)
    : SIDEBAR_GROUPS;

  return (
    <aside
      style={{
        width: 260,
        flexShrink: 0,
        borderRight: '1px solid var(--dp-border)',
        padding: '24px 0',
        position: 'sticky',
        top: 'var(--dp-nav-h)',
        maxHeight: 'calc(100vh - var(--dp-nav-h))',
        overflowY: 'auto',
      }}
    >
      {/* Search */}
      <div
        style={{ padding: '0 16px 16px', borderBottom: '1px solid var(--dp-border)', marginBottom: 8 }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--dp-border)',
            borderRadius: 8,
            padding: '7px 10px',
          }}
        >
          <DpIcon name="search" size={13} style={{ color: 'var(--dp-fg-dim)', flexShrink: 0 }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search docs..."
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              fontSize: 13,
              color: 'var(--dp-fg)',
              fontFamily: 'var(--dp-font-body)',
              width: '100%',
            }}
          />
        </div>
      </div>

      {/* Groups */}
      {filtered.map(group => (
        <div key={group.heading} style={{ marginBottom: 4 }}>
          <button
            onClick={() => toggleGroup(group.heading)}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '7px 16px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--dp-fg-dim)',
              fontSize: 11,
              fontFamily: 'var(--dp-font-mono)',
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              textAlign: 'left',
            }}
          >
            {group.heading}
            <DpIcon name={collapsed[group.heading] ? 'chevron-right' : 'chevron-down'} size={12} />
          </button>

          {!collapsed[group.heading] && (
            <div>
              {group.items.map(item => {
                const isActive = item.slug === activeSlug;
                return (
                  <button
                    key={item.slug}
                    onClick={() => onSelect(item.slug)}
                    style={{
                      width: '100%',
                      display: 'block',
                      padding: '7px 16px 7px 28px',
                      background: isActive ? 'var(--dp-accent-soft)' : 'none',
                      border: 'none',
                      borderLeft: isActive
                        ? '2px solid var(--dp-accent)'
                        : '2px solid transparent',
                      cursor: 'pointer',
                      color: isActive ? 'var(--dp-accent-2)' : 'var(--dp-fg-muted)',
                      fontSize: 13,
                      fontFamily: 'var(--dp-font-body)',
                      textAlign: 'left',
                      transition: 'background 0.1s, color 0.1s',
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
}

/* ─── Table of Contents ────────────────────────────────────────────────────── */

export function TOC(): React.ReactElement {
  const [active, setActive] = useState('architecture');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-110px 0px -70% 0px' }
    );

    TOC_ITEMS.forEach(item => {
      const el = document.getElementById(item.slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside
      style={{
        width: 220,
        flexShrink: 0,
        padding: '24px 0',
        position: 'sticky',
        top: 'var(--dp-nav-h)',
        maxHeight: 'calc(100vh - var(--dp-nav-h))',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontFamily: 'var(--dp-font-mono)',
          color: 'var(--dp-fg-faint)',
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
          padding: '0 16px 12px',
          borderBottom: '1px solid var(--dp-border)',
          marginBottom: 8,
        }}
      >
        On this page
      </div>
      {TOC_ITEMS.map(item => {
        const isActive = item.slug === active;
        return (
          <a
            key={item.slug}
            href={`#${item.slug}`}
            style={{
              display: 'block',
              padding: '6px 16px',
              fontSize: 13,
              color: isActive ? 'var(--dp-accent-2)' : 'var(--dp-fg-dim)',
              borderLeft: isActive ? '2px solid var(--dp-accent)' : '2px solid transparent',
              transition: 'color 0.15s',
              lineHeight: 1.4,
            }}
          >
            {item.label}
          </a>
        );
      })}
    </aside>
  );
}
