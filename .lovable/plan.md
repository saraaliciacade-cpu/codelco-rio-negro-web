## Mejorar animación de tarjetas de clientes (PRUEBA SOCIAL)

Ajustes en `src/components/LogoCarousel.tsx` y su CSS asociado (probablemente en `src/index.css` o `tailwind.config.ts` donde vive `animate-infinite-scroll-smooth`).

### Cambios

1. **Velocidad del carrusel un poco más rápida**
   - Reducir la `animation-duration` de `animate-infinite-scroll-smooth` y `animate-infinite-scroll-reverse` (ej: de ~40s a ~30s) para que fluya un poco más ágil sin marear.

2. **Efecto "spotlight" al pasar el mouse sobre una fila**
   - Al hacer hover sobre la fila (`group/row`), todas las tarjetas de esa fila bajan a `grayscale` completo + `opacity-40` (efecto gris tenue).
   - La tarjeta específica sobre la que está el mouse (`hover:` en el ítem) recupera `grayscale-0`, `opacity-100`, un leve `scale-105` y una sombra más marcada + borde naranja sutil (`#e65b2a`).
   - Transición suave (`duration-300 ease-out`) para que se sienta refinado, no brusco.

3. **Pausar el scroll al hacer hover en la fila**
   - Añadir `hover:[animation-play-state:paused]` al contenedor animado para que el usuario pueda apreciar la tarjeta destacada sin que se mueva.

4. **Texto del nombre**
   - En estado "no destacado" el nombre también baja a `opacity-50`; el destacado vuelve a `opacity-100` y color primario.

### Nada más se toca
- No se cambian logos, orden, cantidad de filas, ni el copy del header.
- No se toca lógica ni datos.

### Archivos afectados
- `src/components/LogoCarousel.tsx` (clases hover/group)
- `src/index.css` o `tailwind.config.ts` (duración de keyframes, si aplica)
