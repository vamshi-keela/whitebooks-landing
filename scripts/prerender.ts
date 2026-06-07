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

const ROUTES = [
  '/',
  '/softwares',
  '/softwares/accounting',
  '/softwares/gst',
  '/softwares/e-invoice',
  '/softwares/e-way-bill',
  '/softwares/ksa',
  '/apis',
  '/apis/gst',
  '/apis/e-invoice',
  '/apis/e-way-bill',
  '/apis/ksa',
  '/developer',
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

  const { render } = await import(serverEntry) as {
    render: (url: string) => {
      html: string;
      helmetData: { context: { helmet: Record<string, { toString(): string }> } };
    }
  };

  let successCount = 0;

  for (const route of ROUTES) {
    try {
      const { html, helmetData } = render(route);
      const helmet = helmetData.context?.helmet ?? {};

      // Inject Helmet-managed head tags and rendered body into the template
      let output = template
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
      console.log(`  ✓ ${route} → dist/${routePath}`);
      successCount++;
    } catch (err) {
      console.warn(`  ✗ ${route} — ${(err as Error).message}`);
    }
  }

  console.log(`\nPrerender complete: ${successCount}/${ROUTES.length} routes.`);
}

prerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
