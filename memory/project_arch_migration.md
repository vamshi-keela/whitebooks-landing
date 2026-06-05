---
name: project-arch-migration
description: Architecture migration from multi-page MPA to single-entry SPA — what was done, what's left
metadata:
  type: project
---

Architecture migration is complete through Phase 5.

**Why:** The project had 16 separate HTML entry points (MPA pattern), window.location.href navigation, and no lint tooling. The goal was to turn it into a clean React SPA with React Router.

---

**Phase 1: Stabilize structure — DONE (2026-06-04)**
- Created `src/app/App.tsx`, `src/app/router.tsx`, `src/app/providers.tsx`
- Created `src/main.tsx` as single entry point (QueryClient + BrowserRouter + AppRouter)
- Updated `index.html` to use `src/main.tsx`
- Updated `vite.config.ts` to single entry (removed all 16 HTML inputs)
- All `.html` hrefs converted to React Router paths
- Added ESLint (.eslintrc.cjs) + Prettier (.prettierrc) configs

**Route map (defined in src/app/router.tsx):**
- `/` → HomeRoute (homepage sections)
- `/softwares` → HubSoftwares
- `/softwares/:product` → SoftwareSubPageRoute (slug→registry key map)
- `/apis` → HubAPIs
- `/apis/:product` → ApiSubPageRoute (slug→registry key map)
- `/developer/*` → DevPortal
- `/whitebooks` → AppShell (design canvas with tweaks)
- `*` → redirect to /

---

**Phase 2: Tailwind-first styling — DONE (2026-06-04)**
- Converted `wb-page` className usages to `min-h-screen bg-[var(--bg)]` in:
  router.tsx, SubPage.tsx, SubpageShell.tsx, HubAPIs.tsx
- Removed `.wb-page` rule from design-system-wb.css

---

**Phase 3: Component extraction — DONE (2026-06-04)**
- Created `src/pages/developer/GstShared.tsx` — animation variants (fadeUp, stagger, scaleIn) + shared primitives (SectionLabel, SectionHeading, GlassCard, Divider)
- GstOverview.tsx imports from GstShared.tsx and re-exports Divider for backward compat
- Split DpGuide.tsx:
  - `DpGuideData.ts` — SIDEBAR_GROUPS, TOC_ITEMS, authCodeTabs, firstRequestTabs (pure data)
  - `DpGuideComponents.tsx` — Callout, DocSidebar, TOC components
  - DpGuide.tsx now ~600 lines (was 994)
- Split DpHome.tsx:
  - `DpHomeData.ts` — heroTabs, quickstartReqTabs, quickstartRespTabs (code tab data)
  - DpHome.tsx imports from DpHomeData.ts, uses useNavigate for internal /developer link
  - External window.location.href calls (https://) left intentionally

---

**Phase 4: Tailwind token expansion — DONE (2026-06-04)**
- Updated tailwind.config.ts with semantic tokens:
  - Colors: surface, surface-raised, surface-card, primary, secondary, muted, subtle
  - Brand: brand, brand-soft, brand-softer, brand-border, brand-glow
  - Status: ok, warn, crit
  - Box shadows: shadow-brand, shadow-glow, shadow-card, shadow-card-hover

---

**Phase 5: Cleanup — DONE (2026-06-04)**
- Created `.gitignore` (dist/, node_modules/, .DS_Store, .env, .tmp/)
- Deleted all 7 dead `src/entries/` files (MPA entry points)
- Deleted `src/components/Icons.tsx` (all consumers already use `src/components/icons/Icon.tsx`)
- Fixed `src/components/Header.tsx` import: `./Icons` → `@/components/icons/Icon`

---

**Remaining known tech debt:**
- Bundle size: 1.4MB JS bundle — needs code splitting (dynamic imports or manualChunks)
- design-system-wb.css still 5500+ lines — further CSS→Tailwind migration deferred
- DpHome.tsx is dead code (not in SPA router) — could be deleted or wired up to a route
- DesignCanvas.tsx is dead code (only was used in deleted hero-variations entry) — could be deleted
- TypeScript: could enable `noUnusedLocals` / `noUnusedParameters` in tsconfig.app.json

**How to apply:** When adding new pages/routes, add to `src/app/router.tsx`. All navigation must use React Router `<Link>` or `useNavigate`. New shared primitives for the dev portal should go in `GstShared.tsx` or `DpComponents.tsx`.
