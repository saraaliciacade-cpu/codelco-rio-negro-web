
## Objetivo
Evitar contenido duplicado en Search Console, asegurar que Google rastree todo el sitio y enviar el sitemap.

## Estado actual (verificado)
- `public/robots.txt`: permite todos los bots y ya declara `Sitemap: https://codelco.com.ar/sitemap.xml`. ✅
- `src/components/SEO.tsx`: cada página emite `canonical` y `og:url` absolutos hacia `https://codelco.com.ar{path}`. ✅
- `index.html`: `og:url` sitewide apunta a `https://codelco.com.ar/`. ✅
- `sitemap.xml` se regenera en cada build desde `scripts/generate-seo.ts`. ✅

O sea: canónicos, robots y sitemap ya están bien. Falta cerrar HTTPS/redirects (server) y hacer el envío en Search Console.

## Cambios de código (mínimos)
1. **`index.html`** — agregar `<link rel="canonical" href="https://codelco.com.ar/" />` como fallback estático para crawlers que no ejecutan JS (hoy solo está el `og:url`). En rutas internas, Helmet lo sobreescribe.
2. **`public/robots.txt`** — dejar un único bloque `User-agent: *` con `Allow: /` (los bloques por bot repiten lo mismo y ensucian). Mantener la línea `Sitemap:`.

No se toca nada más de código: los canónicos por ruta ya están, y forzar HTTPS/redirects `www → apex` es tarea del servidor (SIS), no de la SPA.

## Acciones fuera del código (las hace el usuario en SIS y en Search Console)

**En SISargentina (una sola vez):**
- Activar "Forzar HTTPS" / redirect 301 de `http://` a `https://` para `codelco.com.ar` y `www.codelco.com.ar`.
- Configurar redirect 301 de `www.codelco.com.ar` → `codelco.com.ar` (dominio canónico sin www, que es el que usa el sitemap y los canonical tags).

**En Google Search Console:**
- Propiedad de Dominio `codelco.com.ar` (la que estás verificando por TXT).
- Menú **Sitemaps** → agregar `https://codelco.com.ar/sitemap.xml` → Enviar.
- Opcional: en **Inspección de URL** probar `https://codelco.com.ar/` y pedir indexación.

## Detalle técnico
- El canonical estático de `index.html` no entra en conflicto con Helmet: `react-helmet-async` deduplica `<link rel="canonical">` reemplazando el del head al hidratar la ruta.
- El redirect HTTPS + apex es obligatorio para que Google no vea 4 versiones (`http://`, `https://`, con/sin www) del mismo contenido. Los canonical tags ayudan pero no reemplazan al 301.

## Resultado esperado
- Una sola URL canónica por página (`https://codelco.com.ar/...`).
- Robots limpio y sitemap enviado.
- Sin duplicados en Search Console una vez propagados los 301.
