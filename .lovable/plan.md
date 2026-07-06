## Problema

Ahora el logo/botón están pegados a los bordes de la pantalla, pero vos querés que arranquen y terminen en la misma línea vertical donde arranca el título "Módulos Habitacionales..." y donde termina el contenido del Hero.

## Cambio

En `src/components/Header.tsx` (línea 51), usar el mismo contenedor que usa el Hero para que el logo quede alineado con el título:

- Actual: `w-full px-4 sm:px-6 lg:px-8 py-3`
- Nuevo: `container mx-auto px-6 sm:px-10 lg:px-16 py-3`

Así el logo de Codelco queda alineado a la izquierda con "Módulos Habitacionales" y el botón "Solicitar presupuesto" queda alineado a la derecha con el borde derecho del hero.

## Verificación

Screenshot desktop para confirmar la alineación con el hero.
