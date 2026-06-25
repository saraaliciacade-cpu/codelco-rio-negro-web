# Estado actual del proyecto (solo lectura, nada se modificó)

Esto es un **reporte de auditoría**, no una implementación. Una vez que me digas qué querés hacer con cada punto, armo un plan de cambios.

## 1) Sección "Nuestros Clientes" (carrusel de logos)

**Sí, existe.**
- Componente: `src/components/Clients.tsx` (montado desde `src/pages/Index.tsx` justo debajo del `Hero`).
- También hay una página dedicada: `src/pages/ClientsPage.tsx` en la ruta `/clientes`.
- **30 logos reales** importados desde `src/assets/clients/*` (compresco.jpeg, tecpetrol-new.png, wintershall-new.png, san-antonio-new.png, etc.).
- Implementación: 3 filas con animación CSS infinita (`animate-infinite-scroll-smooth` y `animate-infinite-scroll-reverse`), fila 2 va en reversa. Los logos se duplican para loop continuo. En hover: pasan de `grayscale` a color y hacen `scale-110`.
- Título: `t('clients.title')` (i18n vía `LanguageContext`), partido en dos colores (#333333 + #d25840).

## 2) Galería con categorías y contador

**Sí, existe** en `src/components/Gallery.tsx` (id `#galeria`).
- **Filtros**: `Todas / Fábrica / Metalúrgica / Rental` (botones con `t('gallery.filter.*')`).
- **Contadores**: se calculan en vivo con `images.filter(...).length`. Conteo actual en el array:
  - Fábrica: **45** (17 "nuevas" en `/images/fabrica/` + `/images/novedad/`, 4 Crexell, 24 antiguas `/fabrica-XX.jpg`)
  - Metalúrgica: **20** (`/metalurgica-01.jpg` … `-20.jpg`)
  - Rental: **8** (`/rental-01.jpg` … `-08.jpg`)
  - Todas: **73** ✅ coincide con lo que mencionás
- **Badge "NUEVO"**: sí, se renderiza con `<Badge>` cuando `image.isNew === true` (las 17 nuevas de fábrica/novedad lo tienen).
- **Nombres/títulos**: cada imagen muestra `image.alt` como `<h3>` debajo. Los textos están **hardcodeados en el mismo array** (las nuevas) o vienen de `t('images.<cat>.NN>')` desde `LanguageContext` (las antiguas). No hay base de datos: todo el metadata vive en el array dentro de `Gallery.tsx`.
- **Archivos**: imágenes nuevas en `public/images/fabrica/` y `public/images/novedad/`; las viejas planas en `public/` (`/fabrica-XX.jpg`, `/metalurgica-XX.jpg`, `/rental-XX.jpg`). También hay un video `fabrica-29.mp4` con badge de play.

## 3) Botón de descarga

**Sí, ya existe**, pero **solo dentro del modal** al abrir una imagen (no en cada tarjeta del grid).
- Función `downloadImage(src, fileName)` en `Gallery.tsx` líneas 428–435.
- Se dispara desde un `<Button>` con ícono `<Download/>` que aparece arriba a la derecha del modal junto al botón cerrar (líneas 526–532). Nombre del archivo: `codelco-<categoria>-<id>.jpg`.
- Videos: el botón también está visible pero descarga con extensión `.jpg` (posible bug a corregir si querés permitir descarga de video).

## 4) Routing del sitio

**Es básicamente una landing única + 2 páginas auxiliares.** En `src/App.tsx`:
- `/` → `Index` (landing con secciones internas: Hero, Clients, Company, Services, Gallery, Contact, Footer; navegación por anchors `#company`, `#galeria`, etc.).
- `/clientes` → `ClientsPage` (grilla estática de logos).
- `/webmail` → `Webmail`.
- `*` → `NotFound`.

**No existen rutas separadas** para Fábrica, Metalúrgica, Rental, Grupos Electrógenos ni Novedades. Hoy todo eso vive como filtros dentro de la Galería única (y "Grupos Electrógenos" / "Novedades" no son categorías separadas: las imágenes de `/images/novedad/` están etiquetadas como `category: 'fabrica'`).

## 5) Botón de WhatsApp

**No existe.** Búsqueda en `src/`, `public/` e `index.html` por `whatsapp`, `wa.me`, etc. no devolvió ninguna coincidencia. El contacto actual usa email (`ventas@codelco.com.ar`) y teléfono (`Sebastian - 299 413 6453`) en `Footer.tsx`, sin link de WhatsApp ni botón flotante.

## 6) Sección "+30 empresas del sector petrolero confían en nosotros"

**No existe** como sección ni como copy. La búsqueda por `"30 empresas"`, `"+30"`, `"treinta empresas"` no devolvió nada. Lo más cercano es el `<h2>` "Nuestros Clientes" del componente `Clients.tsx`, sin subtítulo numérico ni claim sectorial.

---

## Qué decidir antes de avanzar

Decime cuáles de estos querés que arme y los priorizo:

1. ¿Agregar **botón de descarga en cada tarjeta** del grid (además del modal)?
2. ¿Crear **rutas separadas** para Fábrica / Metalúrgica / Rental / Grupos Electrógenos / Novedades, o sumar Novedades/Grupos como **categorías nuevas** en la galería actual?
3. ¿Botón de WhatsApp **flotante** (FAB esquina inferior) o también un botón inline en Hero/Contacto? Número y mensaje pre-cargado.
4. ¿Sumar un **subtítulo "+30 empresas del sector petrolero confían en nosotros"** debajo del H2 de Clientes (estilo y ubicación)?
5. ¿Migrar el metadata de imágenes a Lovable Cloud o lo dejamos hardcoded en el array?
