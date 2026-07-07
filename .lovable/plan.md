# Reemplazar carrusel del Hero por imagen + video

Igual que en la web de Organic Design: primero se ve una imagen fija (poster) instantáneamente, y encima carga el video que arranca solo, en loop y sin sonido. Mismo comportamiento en desktop y mobile — el poster asegura que en mobile no se vea vacío mientras el .mp4 termina de cargar.

## Cambios

**1. Subir los archivos como assets CDN (Lovable Assets)**
- `user-uploads://CodelcoWeb.mp4` → `src/assets/hero-codelco.mp4.asset.json`
- `user-uploads://CodelcoWeb.00_00_00_00.Imagen_fija001.jpg` → `src/assets/hero-codelco-poster.jpg.asset.json`

Se suben al CDN (no quedan como binarios en el repo).

**2. `src/components/Hero.tsx`**
- Eliminar el arreglo `HERO_IMAGES` y toda la lógica de rotación (`useState`, `useEffect`, `setInterval`, preload).
- Reemplazar el bloque de `HERO_IMAGES.map(...)` por un único `<video>` de fondo:
  - `src` = video del CDN
  - `poster` = imagen del CDN (aparece al instante, misma foto que el primer frame del video)
  - `autoPlay`, `muted`, `loop`, `playsInline`, `preload="metadata"` (para que en mobile no descargue todo el video antes de mostrar algo — se ve el poster mientras carga)
  - Mismas clases que las imágenes actuales: `absolute inset-0 h-full w-full object-cover object-center`
  - Mantener el `<img>` blureado detrás usando el poster, para conservar el efecto visual actual.
- Mantener intacto: overlay gradiente, contenido (h1, subtítulo, CTAs) y stats bar.

## Detalles técnicos

- `preload="metadata"` + `poster` es lo que hace que en mobile se vea la imagen primero y el video cargue después sin bloquear el render.
- `playsInline` es obligatorio para que iOS Safari no abra el video fullscreen.
- No se toca ningún otro componente ni la lógica de negocio.
