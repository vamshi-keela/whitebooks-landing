---
name: project-design-system
description: "Design system architecture — token strategy, font choices, theme system, CSS variable structure"
metadata: 
  node_type: memory
  type: project
  originSessionId: ae793ae1-c0b5-4378-b173-cc2fe41783c1
---

# Whitebooks Landing — Design System Architecture

## Font System
- **Display/Heading font**: Poppins (migrated from Syne, June 2025)
- **Body font**: DM Sans
- **Mono font**: JetBrains Mono
- Loaded via Google Fonts in index.html (single import, no duplicates)
- CSS vars: `--font-display`, `--font-body`, `--font-mono` + legacy `--font-serif`, `--font-sans`
- Tailwind `font-serif` / `font-display` both point to `var(--font-serif)` / `var(--font-display)` → Poppins
- Poppins typography tuning: hero h1 at `-0.03em` tracking, section h2 at `-0.02em`

## Theme System
- **Architecture**: data-theme attribute on `<html>`, dark is default (no class needed for dark)
- **FOUC prevention**: inline sync script in `<head>` of index.html sets data-theme before first paint
- **Storage key**: `localStorage: 'wb-theme'` — values: `'dark' | 'light' | 'system'`
- **Context**: `src/contexts/ThemeContext.tsx` — exports `ThemeProvider`, `useTheme`
- **Toggle UI**: `src/components/ui/ThemeToggle.tsx` — drop into any header
- **Wired in**: `src/app/providers.tsx` wraps everything in `<ThemeProvider>`
- **Tailwind**: `darkMode: ['class', '[data-theme="dark"]']` in tailwind.config.ts

## Token Structure
- Primary tokens in `:root` (dark defaults) at top of `src/styles/design-system-wb.css`
- Light overrides in `[data-theme="light"]` blocks (two blocks: primary tokens + legacy aliases)
- Hardcoded color overrides (grid, glass, mesh) appended at bottom of design-system-wb.css
- Devportal tokens: `--dp-*` prefix in `src/styles/devportal.css` — same dark/light pattern
- Hero glass utilities: `src/styles/hero.css` — `.glass` / `.glass-hover` both themed

## Two CSS Token Namespaces
1. `--*` prefix: main site (design-system-wb.css)
2. `--dp-*` prefix: developer portal (devportal.css)

**Why:** — dual-namespace was pre-existing; kept to avoid breaking the large dev portal codebase.

**How to apply:** Use `--dp-*` for devportal pages, `--*` for main site. Both are theme-aware.
