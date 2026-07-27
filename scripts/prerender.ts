/**
 * Prerender script — generates static HTML for each public route.
 *
 * Usage (post-build):
 *   node --loader ts-node/esm scripts/prerender.ts
 *   or via: npm run prerender
 *
 * Steps:
 *   1. vite build (client)
 *   2. vite build --ssr (server bundle)
 *   3. This script renders each route using the SSR bundle
 *   4. Injects rendered HTML + Helmet tags into dist/index.html template
 *   5. Writes dist/[route]/index.html for each route
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const templatePath = path.resolve(distDir, 'index.html');

// `url` is rendered; `out` (when set) is where the file is written.
// '/developer' is a client-side redirect to '/developer/overview', so both
// URLs get the overview content — its canonical tag points crawlers to
// '/developer/overview' as the real page.
const ROUTES: { url: string; out?: string }[] = [
  { url: '/' },
  { url: '/softwares' },
  { url: '/softwares/accounting' },
  { url: '/softwares/gst' },
  { url: '/softwares/e-invoice' },
  { url: '/softwares/e-way-bill' },
  { url: '/softwares/ksa' },
  { url: '/apis' },
  { url: '/apis/gst' },
  { url: '/apis/e-invoice' },
  { url: '/apis/e-way-bill' },
  { url: '/apis/ksa' },
  { url: '/developer/overview' },
  { url: '/developer/overview', out: '/developer' },
];

async function prerender() {
  if (!fs.existsSync(templatePath)) {
    console.error('dist/index.html not found — run `vite build` first.');
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, 'utf-8');

  // Dynamically import the SSR bundle produced by `vite build --ssr`
  const serverEntry = path.resolve(distDir, 'server/entry-server.js');
  if (!fs.existsSync(serverEntry)) {
    console.error('SSR bundle not found — run `vite build --ssr` first.');
    process.exit(1);
  }

  const { render, apiEndpointRoutes } = await import(serverEntry) as {
    render: (url: string) => {
      html: string;
      helmetData: { context: { helmet: Record<string, { toString(): string }> } };
    };
    apiEndpointRoutes: () => string[];
  };

  // Append spec-derived, indexable API endpoint routes to the static route set.
  const endpointRoutes = apiEndpointRoutes();
  for (const url of endpointRoutes) ROUTES.push({ url });
  console.log(`  + ${endpointRoutes.length} indexable API endpoint routes\n`);

  let successCount = 0;
  const written: string[] = [];

  for (const { url, out } of ROUTES) {
    try {
      const route = out ?? url;
      const { html, helmetData } = render(url);
      const helmet = helmetData.context?.helmet ?? {};

      // Strip the template's fallback SEO tags (title/description/canonical/OG/…)
      // so the Helmet-managed route-specific tags below are the only copies —
      // duplicates confuse crawlers, and a stale homepage canonical is harmful.
      let output = template
        .replace(/[ \t]*<!-- @seo-fallback:start[\s\S]*?@seo-fallback:end -->\n?/, '')
        .replace('</head>', `${helmet.title?.toString() ?? ''}\n${helmet.meta?.toString() ?? ''}\n${helmet.link?.toString() ?? ''}\n${helmet.script?.toString() ?? ''}\n</head>`)
        .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

      // Write the file
      const routePath = route === '/' ? 'index.html' : `${route.slice(1)}/index.html`;
      const outPath = path.resolve(distDir, routePath);
      const outDir = path.dirname(outPath);

      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }

      fs.writeFileSync(outPath, output, 'utf-8');
      console.log(`  ✓ ${url} → dist/${routePath}`);
      written.push(route);
      successCount++;
    } catch (err) {
      console.warn(`  ✗ ${url} — ${(err as Error).message}`);
    }
  }

  console.log(`\nPrerender complete: ${successCount}/${ROUTES.length} routes.`);

  // ── Sitemap ────────────────────────────────────────────────────────────
  // Only prerendered (= indexable) routes go in the sitemap. Thin/noindex
  // endpoints are intentionally absent — do not list what you don't index.
  const BASE = 'https://whitebooks.in';
  const today = new Date().toISOString().slice(0, 10);
  const urls = [...new Set(written)]
    .map(r => (r === '/' ? BASE + '/' : BASE + r))
    .sort();
  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(u => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
      .join('\n') +
    `\n</urlset>\n`;
  fs.writeFileSync(path.resolve(distDir, 'sitemap.xml'), sitemap, 'utf-8');
  console.log(`Sitemap written: dist/sitemap.xml (${urls.length} URLs)`);
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
