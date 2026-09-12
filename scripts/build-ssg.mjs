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
  // NOTE: `window` is intentionally NOT set to globalThis. react-helmet-async
  // treats `window.document` as "we are in a browser" and then writes head tags
  // straight into the DOM instead of the SSR context, which would leave every
  // prerendered page with the generic template <title>. So `window` exposes the
  // few APIs modules touch at import time, but no `document`.
  if (typeof g.document === 'undefined') {
    const makeNode = () => ({
      style: {},
      sheet: { insertRule() {}, cssRules: [] },
      classList: { add() {}, remove() {}, toggle() {}, contains: () => false },
      dataset: {},
      setAttribute() {},
      getAttribute: () => null,
      removeAttribute() {},
      appendChild() {},
      removeChild() {},
      insertBefore() {},
      addEventListener() {},
      removeEventListener() {},
      childNodes: [],
      firstChild: null,
      parentNode: null,
      querySelector: () => null,
      querySelectorAll: () => [],
      getElementsByTagName: () => [],
    });
    g.document = {
      createElement: makeNode,
      createElementNS: makeNode,
      createTextNode: (text) => ({ nodeValue: String(text ?? ''), textContent: String(text ?? '') }),
      createDocumentFragment: makeNode,
      createComment: () => ({ nodeValue: '' }),
      head: makeNode(),
      body: makeNode(),
      styleSheets: [],
      getElementsByTagName: () => [makeNode()],
      getElementsByClassName: () => [],
      addEventListener() {},
      removeEventListener() {},
      getElementById: () => null,
      querySelector: () => null,
      querySelectorAll: () => [],
      documentElement: makeNode(),
    };
  }
  if (typeof g.navigator === 'undefined') g.navigator = { userAgent: 'node' };
  if (typeof g.location === 'undefined') {
    g.location = {
      hostname: 'localhost',
      host: 'localhost',
      href: 'http://localhost/',
      origin: 'http://localhost',
      protocol: 'http:',
      pathname: '/',
      search: '',
      hash: '',
      ancestorOrigins: [],
      assign() {}, replace() {}, reload() {},
      toString: () => 'http://localhost/',
    };
  }
  if (g.document && typeof g.document.referrer === 'undefined') g.document.referrer = '';
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
  if (typeof g.getComputedStyle !== 'function') {
    g.getComputedStyle = () => ({ getPropertyValue: () => '', setProperty() {} });
  }
  if (typeof g.HTMLElement === 'undefined') g.HTMLElement = class {};
  if (typeof g.Element === 'undefined') g.Element = class {};
  if (typeof g.Node === 'undefined') g.Node = class {};
}

installBrowserPolyfills();

const HOME_TITLE = 'Codelco S.A. | Soluciones Industriales para Oil &amp; Gas';
const HOME_TITLE_RAW = 'Codelco S.A. | Soluciones Industriales para Oil & Gas';

async function loadPrerenderRoutes() {
  const routesPath = resolve(root, 'src/data/prerender-routes.json');
  let raw;
  try {
    raw = await readFile(routesPath, 'utf8');
  } catch {
    throw new Error(
      `[ssg] src/data/prerender-routes.json no existe. Corré "npm run generate-seo" (o el hook prebuild) antes del SSG.`
    );
  }
  let routes;
  try {
    routes = JSON.parse(raw);
  } catch (err) {
    throw new Error(`[ssg] src/data/prerender-routes.json es JSON inválido: ${err.message}`);
  }
  if (!Array.isArray(routes) || routes.length === 0) {
    throw new Error('[ssg] src/data/prerender-routes.json está vacío — abortando para no publicar rutas incompletas.');
  }
  return [...new Set(routes)];
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
      minify: false,
      rollupOptions: {
        input: resolve(root, 'src/entry-server.tsx'),
        output: {
          // The client config splits vendor chunks (icons/animations/…). That
          // splitting breaks module init order in the SSR bundle, so keep the
          // server build as a single inlined module.
          manualChunks: () => 'entry-server',
        },
      },
    },

    ssr: { noExternal: true },
  });
}

async function loadRenderer() {
  const entryPath = resolve(serverDir, 'entry-server.js');
  const mod = await import(pathToFileURL(entryPath).href);
  return mod.renderPage ?? mod.render;
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

  const routes = await loadPrerenderRoutes();

  const outPathFor = (route) =>
    route === '/'
      ? resolve(distDir, 'index.html')
      : resolve(distDir, route.replace(/^\//, ''), 'index.html');

  for (const route of routes) {
    try {
      const { html, head } = await render(route);
      const outHtml = injectIntoTemplate(template, { html, head, isDraft: false });
      const localizedHtml = outHtml.replace('<html lang="en">', '<html lang="es">');
      const outPath = outPathFor(route);
      await mkdir(dirname(outPath), { recursive: true });
      await writeFile(outPath, localizedHtml, 'utf8');
      console.log(`[ssg] ✓ ${route}`);
    } catch (err) {
      console.error(`[ssg] ✗ ${route}`, err);
      throw err;
    }
  }

  // ---- Verificación: cada ruta tiene su HTML y las notas tienen title propio ----
  const failures = [];
  for (const route of routes) {
    const outPath = outPathFor(route);
    let html;
    try {
      html = await readFile(outPath, 'utf8');
    } catch {
      failures.push(`${route} → falta ${outPath}`);
      continue;
    }
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';
    if (!title) {
      failures.push(`${route} → sin <title>`);
      continue;
    }
    if (route.startsWith('/novedades/') && (title === HOME_TITLE || title === HOME_TITLE_RAW)) {
      failures.push(`${route} → title genérico del home ("${title}")`);
    }
  }

  if (failures.length > 0) {
    throw new Error(
      `[ssg] verificación fallida en ${failures.length} ruta(s):\n  - ${failures.join('\n  - ')}`
    );
  }

  console.log(`[ssg] verificación OK (${routes.length} rutas)`);
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

main()
  .then(() => {
    // Exit explicitly: SSR rendering leaves timers/handles open in the event loop.
    process.exit(0);
  })
  .catch((err) => {
    console.error('[ssg] build failed:', err);
    process.exit(1);
  });

