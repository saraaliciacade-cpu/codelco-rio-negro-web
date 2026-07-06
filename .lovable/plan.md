## Objetivo

Que el logo de Codelco quede pegado al borde izquierdo de la pantalla y el botón "Solicitar presupuesto" al borde derecho, como estaba antes (segunda imagen), en lugar de estar centrados dentro del ancho del contenido.

## Cambio

En `src/components/Header.tsx` (línea 51), revertir el contenedor:

- Actual: `container mx-auto px-4 md:px-8 lg:px-12 max-w-7xl py-3`
- Nuevo: `w-full px-4 sm:px-6 lg:px-8 py-3`

Esto quita el `max-w-7xl` centrado y hace que el header ocupe todo el ancho, dejando solo un pequeño padding a los costados.

## Verificación

Screenshot del preview en desktop para confirmar que el logo queda pegado a la izquierda y el botón naranja pegado a la derecha.
