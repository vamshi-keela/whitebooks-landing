# React Architecture Migration Plan

## Goal

Move the app from a mixed page/component/section structure to a gradual feature-first structure while keeping the public routes and rendered behavior stable.

## Principles

- Migrate one route family at a time.
- Keep shared primitives small and boring.
- Move code only when ownership is clear.
- Preserve existing imports until a feature has a stable public module.
- Verify each slice with typecheck/build before continuing.

## Target Shape

```txt
src/
  app/
    App.tsx
    providers.tsx
    router.tsx
    routes/
      marketingRoutes.tsx
      developerRoutes.tsx

  features/
    home/
      HomeRoute.tsx
      components/
      data.ts

    softwares/
      routes.tsx
      components/
      data/

    apis/
      routes.tsx
      components/
      data/

    product-pages/
      components/
      registry/

    developer/
      routes.tsx
      layout/
      components/
      guides/
      reference/
      data/

    connectors/
      routes.tsx
      components/
      data.ts

  shared/
    ui/
    layout/
    hooks/
    lib/
    services/
    types/

  assets/
  seo/
  styles/
```

## Migration Slices

### Slice 1: Router Decomposition

Status: complete.

- Move the active homepage route out of `src/app/router.tsx`.
- Split marketing routes and developer routes into dedicated route modules.
- Keep `src/app/router.tsx` as the small composition root for scroll helpers, `Routes`, and fallback redirects.
- Remove duplicate route definitions during the split.

### Slice 2: Homepage Ownership

Status: complete.

- Move homepage-only sections from `src/sections` into `src/features/home/components`.
- Move homepage FAQ/schema constants into `src/features/home/data.ts`.
- Keep `WbProof` and `WbTrust` in `src/sections` for now because they are reused by non-home pages.
- Removed the legacy inactive `src/pages/home/PageHome.tsx` during the dead-code cleanup slice.

### Slice 3: Product and API Pages

Status: complete.

- Move software/API slug maps and subpage route wrappers into `src/features/softwares` and `src/features/apis`.
- Move `src/pages/registry` into `src/features/product-pages/registry` because both software and API product pages consume it.
- Move the `SubPage`/`APISubPage` product-page template into `src/features/product-pages/components`.
- Keep reusable subpage atoms in `src/components/subpage` for now because hubs, connectors, and other pages still consume them.

### Slice 4: Developer Portal

Status: complete.

- Move developer layout, navigation, guide pages, API reference pages, and docs components into `src/features/developer`.
- Keep API rendering primitives isolated from marketing/API landing pages.
- Co-locate developer search, products, and guide data with the developer feature.
- Update external consumers of developer primitives such as `DpIcon`, `DpComponents`, and `devSearch` to import from `@/features/developer`.

### Slice 5: Shared Layer Cleanup

Status: complete.

- Move reusable UI primitives from `src/components/ui` to `src/shared/ui`.
- Move generic hooks from `src/hooks` to `src/shared/hooks`.
- Move cross-feature services from `src/services` to `src/shared/services`.
- Leave domain-specific hooks/services inside their feature folders.
- Move shared type contracts from `src/types` to `src/shared/types`.
- Move `cn` and other generic helpers from `src/lib` to `src/shared/lib`.
- Move KSA API spec fetching into `src/features/developer`.
- Move design-canvas state persistence into `src/features/design-canvas`.

### Slice 6: Dead Code and Import Hygiene

Status: complete.

- Remove obsolete pages and unused route imports after each feature has a new owner.
- Standardize path aliases around `@/features/*` and `@/shared/*`.
- Import-boundary lint rules remain a future hardening task rather than a migration blocker.
- Remove legacy hash-route shell, old page variants, tweak controls, unused hero/docs component folders, unused design-canvas helpers, and platform junk files.
- Remove empty legacy directories left behind by the migration.

## Verification Checklist

- `npm run typecheck`
- `npm run build`
- Spot-check `/`, `/softwares`, `/apis`, `/developer/overview`, and one API reference route.
