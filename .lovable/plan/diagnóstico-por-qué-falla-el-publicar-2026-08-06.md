# Diagnóstico: por qué falla el publicar

## Resultado corto

- **No hay errores de código.** El chequeo de TypeScript pasa sin errores y no hay imports faltantes, componentes mal cerrados ni referencias a imágenes inexistentes.
- **El build sí genera todo bien**: sitemap, RSS, bundle del cliente y las 16 páginas prerenderizadas (`/`, las 4 divisiones, `/novedades`, `/clientes` y las 9 noticias) terminan con `[ssg] done.`
- **El problema es que el proceso de build no termina nunca.** Después de imprimir `[ssg] done.` el script queda "colgado" y la plataforma lo mata por timeout. En la consola se ve exactamente:

```text
[ssg] done.
error: script "build" was terminated by signal SIGTERM (Polite quit request)
```

Como el comando de build nunca devuelve código 0, el deploy se interpreta como fallido, aunque el sitio ya se generó completo. Eso explica que "no se solucione" desde hace 12 minutos: cada intento se queda esperando y termina cortado.

## Causa técnica

`scripts/build-ssg.mjs` prerenderiza las rutas dentro del mismo proceso de Node, usando polyfills falsos de `window`/`document`. Al renderizar, librerías como react-helmet-async y los widgets con temporizadores (por ejemplo el auto-abrir de WhatsApp) programan `setTimeout` / `requestAnimationFrame` que quedan como handles abiertos en el event loop. Node no puede cerrar el proceso mientras existan esos handles, así que `main()` termina pero el proceso sigue vivo indefinidamente.

El `main().catch(...)` final solo maneja el caso de error (`process.exit(1)`); no hay una salida explícita en el caso de éxito.

## Arreglo propuesto (1 línea, mínimo riesgo)

En `scripts/build-ssg.mjs`, hacer que el proceso salga explícitamente con éxito cuando terminó todo:

```js
main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('[ssg] build failed:', err);
    process.exit(1);
  });
```

Esto es seguro porque todas las escrituras a disco (`sitemap.xml`, `rss.xml`, HTML prerenderizado, `dist/`) ya están completadas y esperadas con `await` antes de `[ssg] done.`

Opcional, no bloqueante: limpiar el warning de Tailwind por la clase `ease-[cubic-bezier(0.22,1,0.36,1)]` (es solo advertencia, no rompe nada).

## Verificación después del cambio

1. Correr el build y confirmar que sale con código 0 y sin SIGTERM.
2. Confirmar que `dist/index.html` y los HTML de noticias siguen generándose con las metaetiquetas.
3. Publicar.
