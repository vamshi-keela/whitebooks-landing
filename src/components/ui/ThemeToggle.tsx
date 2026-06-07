import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  size?: number;
}

export function ThemeToggle({ className, size = 36 }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: 8,
        border: '1px solid var(--line)',
        background: 'var(--bg-elev)',
        color: 'var(--muted-2)',
        cursor: 'pointer',
        flexShrink: 0,
        padding: 0,
        transition: 'border-color 0.2s ease, color 0.2s ease, background 0.2s ease',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.borderColor = 'var(--brand-border)';
        el.style.color = 'var(--text)';
        el.style.background = 'var(--bg-3)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.borderColor = 'var(--line)';
        el.style.color = 'var(--muted-2)';
        el.style.background = 'var(--bg-elev)';
      }}
    >
      {isDark ? <SunIcon size={size * 0.44} /> : <MoonIcon size={size * 0.44} />}
    </button>
  );
}

function SunIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
