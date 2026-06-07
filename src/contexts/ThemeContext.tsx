import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type ThemePreference = 'dark' | 'light' | 'system';
export type ResolvedTheme = 'dark' | 'light';

interface ThemeContextValue {
  /** What the user explicitly chose (may be 'system') */
  theme: ThemePreference;
  /** The theme actually applied to the document */
  resolvedTheme: ResolvedTheme;
  setTheme: (t: ThemePreference) => void;
  /** Toggles between dark and light, clearing system preference */
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = 'wb-theme';

function getSystemPreference(): ResolvedTheme {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(pref: ThemePreference): ResolvedTheme {
  return pref === 'system' ? getSystemPreference() : pref;
}

function applyTheme(resolved: ResolvedTheme) {
  document.documentElement.setAttribute('data-theme', resolved);
}

function readStoredPreference(): ThemePreference {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'dark' || v === 'light' || v === 'system') return v;
  } catch {
    // localStorage blocked (Safari private, CSP, etc.)
  }
  return 'system';
}

function writeStoredPreference(pref: ThemePreference) {
  try {
    localStorage.setItem(STORAGE_KEY, pref);
  } catch {
    // ignore
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemePreference>(readStoredPreference);

  const resolvedTheme = resolveTheme(theme);

  const setTheme = useCallback((next: ThemePreference) => {
    setThemeState(next);
    writeStoredPreference(next);
    applyTheme(resolveTheme(next));
  }, []);

  const toggleTheme = useCallback(() => {
    // Explicit toggle always pins to a concrete value (not system)
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  // Sync on mount — reconciles any SSR/hydration mismatch with the inline script
  useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  // Track OS-level changes when the user has chosen 'system'
  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => applyTheme(e.matches ? 'dark' : 'light');
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
