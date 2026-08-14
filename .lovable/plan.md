# Etapa 2 — Migrar las noticias a Supabase

Objetivo: que las novedades se guarden en la base de datos y que la web las lea desde ahí, sin cambiar nada del diseño ni del formulario de contacto.

## 1. Tabla nueva: `news`

Campos (respetando lo que hoy tiene cada noticia en el archivo):

- título, título SEO (opcional), slug (único)
- categoría: Flota / Proyecto / Planta / Clientes / Sector
- fecha visible (texto, ej. "10 de agosto de 2026") y fecha real (para orden, sitemap y RSS)
- resumen / excerpt y meta descripción (opcional)
- imagen principal y posición de la imagen (opcional)
- cuerpo de la nota: se guarda tal cual está hoy (párrafos, títulos, imágenes, galerías, videos y bloque "te puede interesar") en un campo flexible, así no se pierde ningún formato
- pregunta del CTA, link y etiqueta de fuente (opcionales)
- estado: `draft` (borrador) o `published` (publicado), por defecto borrador
- fecha de creación y de última modificación

Reglas de acceso:
- Cualquier visitante puede ver **solo** las noticias publicadas.
- Nadie puede crear, editar ni borrar desde la web pública (eso queda para el panel de la Etapa 3, con login).

## 2. Migración de las 8 noticias existentes

Las noticias actuales se cargan una por una en la tabla, con su mismo slug, categoría, fecha, imágenes y cuerpo completo (incluida la que hoy está en borrador, que se carga como borrador). Las rutas de imágenes se mantienen iguales, así que las fotos siguen mostrándose exactamente igual.

## 3. La web lee desde Supabase

- `/novedades`: mismo diseño, mismos filtros por categoría y mismo badge "NUEVO"/"ÚLTIMA NOTICIA". Solo cambia el origen de los datos. Mientras carga se muestran placeholders del mismo tamaño de las tarjetas para que no salte el layout.
- `/novedades/:slug`: la nota se busca en la base. Si no existe, redirige a `/novedades` como ahora. Las notas relacionadas ("Te puede interesar") también salen de la base.
- Bloque de novedades en la home: igual, leyendo de la base.
- Solo se muestran las publicadas (los borradores siguen accesibles por link directo con `noindex`, como hoy).

## 4. Sitemap, RSS y prerenderizado (SSG)

En esta etapa se mantienen generándose desde `src/data/news.ts` para no romper el SEO ya logrado. El archivo se conserva como fuente para el build, sin que la web lo use para mostrar contenido. En la Etapa 3 (panel) se pasa la generación a leer desde Supabase.

## Detalles técnicos

- Migración SQL: `CREATE TABLE public.news` con `body jsonb`, `status text` con validación por trigger, índice único en `slug`, `GRANT SELECT` a `anon`/`authenticated`, `GRANT ALL` a `service_role`, RLS activada con política de lectura solo para `status = 'published'` y trigger de `updated_at`.
- Carga de datos con el tool de inserción (8 filas).
- Nuevo `src/hooks/useNews.ts` (React Query) con `fetchNews()` / `fetchNewsBySlug()` y mapeo de la fila de la base al tipo `NewsItem` ya existente, para no tocar el render.
- Archivos a modificar: `src/pages/NovedadesPage.tsx`, `src/pages/NewsDetailPage.tsx`, `src/components/NovedadesPreview.tsx`.
- Archivos que NO se tocan: `src/data/news.ts` (queda para sitemap/RSS/SSG), `scripts/generate-seo.ts`, `scripts/build-ssg.mjs`, `src/components/Contact.tsx` y la función `contact-submit`.
