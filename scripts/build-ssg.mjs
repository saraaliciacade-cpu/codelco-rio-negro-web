#!/usr/bin/env node
// Static Site Generation for Codelco.
// - Builds the Vite client bundle (dist/)
// - Builds the SSR entry to dist/server/entry-server.js
// - Prerenders every public route + one HTML file per published news article
// - Injects Helmet head tags + rendered markup into dist/index.html template

import { build } from 'vite';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const distDir = resolve(root, 'dist');
const serverDir = resolve(distDir, 'server');

// ---------- Browser API polyfills for Node ----------
// react-helmet-async, some libs, and lazy modules may touch these at import time.
function installBrowserPolyfills() {
  const g = globalThis;
  if (typeof g.window === 'undefined') g.window = g;
  if (typeof g.document === 'undefined') {
    g.document = {
      createElement: () => ({ style: {}, setAttribute() {}, appendChild() {} }),
      head: { appendChild() {} },
      body: { appendChild() {} },
      addEventListener() {},
      removeEventListener() {},
      getElementById: () => null,
      querySelector: () => null,
      querySelectorAll: () => [],
      documentElement: { style: {}, classList: { add() {}, remove() {}, toggle() {} } },
    };
  }
  if (typeof g.navigator === 'undefined') g.navigator = { userAgent: 'node' };
  if (typeof g.localStorage === 'undefined') {
    const store = new Map();
    g.localStorage = {
      getItem: (k) => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => store.set(k, String(v)),
      removeItem: (k) => store.delete(k),
      clear: () => store.clear(),
      key: (i) => Array.from(store.keys())[i] ?? null,
      get length() { return store.size; },
    };
  }
  if (typeof g.sessionStorage === 'undefined') g.sessionStorage = g.localStorage;
  if (typeof g.matchMedia === 'undefined') {
    g.matchMedia = () => ({
      matches: false, media: '', addListener() {}, removeListener() {},
      addEventListener() {}, removeEventListener() {}, dispatchEvent: () => false, onchange: null,
    });
  }
  if (typeof g.requestAnimationFrame === 'undefined') {
    g.requestAnimationFrame = (cb) => setTimeout(cb, 0);
    g.cancelAnimationFrame = (id) => clearTimeout(id);
  }
  if (typeof g.IntersectionObserver === 'undefined') {
    g.IntersectionObserver = class {
      observe() {} unobserve() {} disconnect() {} takeRecords() { return []; }
    };
  }
  if (typeof g.ResizeObserver === 'undefined') {
    g.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
  }
  if (typeof g.scrollTo === 'undefined') g.scrollTo = () => {};
}

installBrowserPolyfills();

async function loadPublishedNews() {
  // Read news.ts and extract slugs from published items. We can't safely import
  // news.ts here because it imports @/assets/*.asset.json aliases. So we read
  // slugs + status via light parsing after building the SSR bundle we could
  // dynamic-import — but the SSR entry doesn't re-export news. Simpler: use
  // a tiny regex parse of src/data/news.ts.
  const src = await readFile(resolve(root, 'src/data/news.ts'), 'utf8');
  // Match each object entry with slug + optional status.
  const entries = [];
  const re = /\{\s*id:\s*\d+[\s\S]*?slug:\s*['"]([^'"]+)['"][\s\S]*?\}/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const block = m[0];
    const slug = m[1];
    const statusMatch = block.match(/status:\s*['"](draft|published)['"]/);
    const status = statusMatch ? statusMatch[1] : 'published';
    if (status !== 'draft') entries.push(slug);
  }
  return entries;
}

async function runViteBuilds() {
  console.log('[ssg] building client bundle…');
  await build({
    root,
    mode: 'production',
    logLevel: 'warn',
    build: { outDir: 'dist', emptyOutDir: true, ssrManifest: true },
  });

  console.log('[ssg] building SSR entry…');
  await build({
    root,
    mode: 'production',
    logLevel: 'warn',
    build: {
      outDir: 'dist/server',
      emptyOutDir: true,
      ssr: 'src/entry-server.tsx',
      rollupOptions: { input: resolve(root, 'src/entry-server.tsx') },
    },
    ssr: { noExternal: true },
  });
}

async function loadRenderer() {
  const entryPath = resolve(serverDir, 'entry-server.js');
  const mod = await import(pathToFileURL(entryPath).href);
  return mod.render;
}

function injectIntoTemplate(template, { html, head, isDraft }) {
  let out = template;
  if (head) {
    out = out.replace('<!--ssg-head-->', head);
  }
  if (isDraft) {
    // Extra safety — should already come from Helmet, but ensure noindex present.
    if (!/name="robots"/i.test(out)) {
      out = out.replace('</head>', '<meta name="robots" content="noindex, follow" />\n</head>');
    }
  }
  out = out.replace(
    '<div id="root"><!--ssg-html--></div>',
    `<div id="root" data-ssg="true">${html}</div>`
  );
  return out;
}

async function prerender() {
  const render = await loadRenderer();
  const templatePath = resolve(distDir, 'index.html');
  const template = await readFile(templatePath, 'utf8');

  const staticRoutes = [
    '/',
    '/fabrica',
    '/metalurgica',
    '/rental',
    '/grupos-electrogenos',
    '/novedades',
    '/clientes',
  ];

  const slugs = await loadPublishedNews();
  const newsRoutes = slugs.map((s) => `/novedades/${s}`);
  const routes = [...staticRoutes, ...newsRoutes];

  for (const route of routes) {
    try {
      const { html, head } = render(route);
      const outHtml = injectIntoTemplate(template, { html, head, isDraft: false });
      const outPath =
        route === '/'
          ? resolve(distDir, 'index.html')
          : resolve(distDir, route.replace(/^\//, ''), 'index.html');
      await mkdir(dirname(outPath), { recursive: true });
      await writeFile(outPath, outHtml, 'utf8');
      console.log(`[ssg] ✓ ${route}`);
    } catch (err) {
      console.error(`[ssg] ✗ ${route}`, err);
      throw err;
    }
  }
}

async function cleanup() {
  if (existsSync(serverDir)) {
    await rm(serverDir, { recursive: true, force: true });
  }
}

async function main() {
  await runViteBuilds();
  await prerender();
  await cleanup();
  console.log('[ssg] done.');
}

main().catch((err) => {
  console.error('[ssg] build failed:', err);
  process.exit(1);
});
