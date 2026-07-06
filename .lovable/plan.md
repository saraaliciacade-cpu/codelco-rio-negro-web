## Objetivo
Modificar la barra de estadísticas (`StatsBar.tsx`) para que las tarjetas tengan fondo transparente por defecto y se vuelvan negras al pasar el mouse por encima (hover).

## Cambios propuestos

### 1. `src/components/StatsBar.tsx`
- **Fondo de la sección**: cambiar el `backgroundColor` del `<section>` de `#1A1A1A` (negro) a **transparente**.
- **Fondo de cada tarjeta**: agregar clase `hover:bg-[#1A1A1A]` a cada tarjeta individual (`<div>` del map de stats).
- **Bordes**: mantener el `borderTop` naranja de la sección y los bordes blancos entre tarjetas.
- **Transición**: agregar `transition-colors duration-300` para que el cambio de fondo sea suave.

### Notas
- El comportamiento actual en móvil y desktop de la grid (2 columnas / 4 columnas) y los divisores se mantienen sin cambios.
- Si al probar no le gusta, se revierte fácilmente volviendo a poner el fondo negro en la sección y quitando el hover de las tarjetas.