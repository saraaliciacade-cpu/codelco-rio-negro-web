## Objetivo

Mantener `/clientes` (los nombres de empresas conocidas del sector petrolero suman para SEO a largo plazo), pero convertirla en una página completa y consistente con el resto del sitio, no una grilla suelta de logos.

## Estructura propuesta de `/clientes`

```text
┌────────────────────────────────────────────┐
│ Header (mismo del resto del sitio)         │
├────────────────────────────────────────────┤
│ HERO / H1                                  │
│   PRUEBA SOCIAL                            │
│   +30 empresas del sector petrolero        │
│   confían en nosotros                      │
│   Operadoras, contratistas y empresas de   │
│   servicios trabajan con Codelco en Vaca   │
│   Muerta y toda la Patagonia.              │
├────────────────────────────────────────────┤
│ GRILLA DE CLIENTES (30 logos + nombres)    │
├────────────────────────────────────────────┤
│ NUESTRAS DIVISIONES                        │
│   Cards con enlace a:                      │
│   /fabrica  /metalurgica  /rental          │
│   /grupos-electrogenos                     │
├────────────────────────────────────────────┤
│ CONTACTO (mismo componente que la home)    │
│   "Contanos tu proyecto y te respondemos   │
│    en menos de 24 horas"                   │
├────────────────────────────────────────────┤
│ Footer                                     │
└────────────────────────────────────────────┘
```

## Cambios técnicos

1. **`src/pages/ClientsPage.tsx`** — rediseñar:
   - Agregar `<Header />` arriba y `<Footer />` abajo.
   - Reemplazar el `<h1>Nuestros Clientes</h1>` por el mismo bloque de la sección Prueba Social (eyebrow "PRUEBA SOCIAL" + H1 "+30 empresas del sector petrolero confían en nosotros" + subtítulo).
   - Mantener la grilla de 30 clientes con logos y nombres (esto es lo que aporta SEO: nombres de empresas conocidas indexables en texto).
   - Agregar un bloque nuevo "Nuestras Divisiones" con 4 cards enlazando a `/fabrica`, `/metalurgica`, `/rental`, `/grupos-electrogenos` (reutilizando estilo visual de `Services.tsx`).
   - Incluir el componente `<Contact />` antes del footer.

2. **SEO en `<Helmet>`**:
   - `<title>`: "+30 empresas del sector petrolero confían en Codelco S.A."
   - `<meta description>`: reflejar Vaca Muerta / Patagonia + servicios.
   - Mantener JSON-LD `CollectionPage` con la lista de organizaciones (bueno para que Google asocie a Codelco con esos nombres).
   - Canonical ya está.

3. **Home (`src/components/Clients.tsx`)** — dejar como está. La sección Prueba Social sigue en la home; `/clientes` es la versión ampliada indexable.

4. **Sitemap** (`public/sitemap.xml`) — verificar que `/clientes` ya esté listado; si no, agregarlo.

## Por qué esto sí puede aportar SEO

- Cada nombre de cliente ("Tecpetrol", "Wintershall", "San Antonio Internacional", etc.) es texto indexable → Codelco empieza a aparecer en búsquedas del estilo *"proveedores de Tecpetrol"*, *"empresas metalúrgicas Vaca Muerta"*.
- Agregar el bloque de divisiones enlaza internamente las 4 páginas de servicio desde otra URL indexada → mejor arquitectura de links internos.
- El componente Contact repetido no penaliza (es una CTA, no contenido duplicado principal).

## Riesgos / expectativas

Esto no dispara tráfico de un día para otro. Es una jugada a mediano plazo: le da a Google más superficie de texto relevante y más contexto sobre a qué se dedica Codelco y con quién trabaja.

## Fuera de alcance

- No toco Header, Footer, Contact ni las páginas de divisiones.
- No modifico la sección Prueba Social de la home.
