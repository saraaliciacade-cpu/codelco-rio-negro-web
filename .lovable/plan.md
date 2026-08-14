# Guardar los mensajes de contacto en base de datos (Etapa 1)

## Buena noticia: casi todo ya está hecho

El proyecto **ya está conectado a Supabase** (no necesitás activar nada de tu lado) y el formulario de contacto **ya guarda los mensajes en una tabla** llamada `contact_submissions`, además de enviar los mails. Eso lo verifiqué en el código del formulario y en la base.

Hoy se guardan: nombre, email, teléfono, división/qué necesita (campo `subject`), mensaje, fecha/hora, más IP y navegador (para control de spam).

## Lo único que falta

El campo **Empresa** existe en el formulario y se valida, pero **no se guarda** en la base: la tabla no tiene esa columna y la función que graba no la envía. Eso es lo que hay que completar.

## Qué haría

1. **Migración de base de datos**: agregar la columna `company` (texto, opcional) a la tabla `contact_submissions`. No se toca ninguna otra tabla ni dato existente.
2. **Guardado**: en la función que recibe el formulario, incluir `company` al grabar el registro (con límite de largo, igual que los otros campos).
3. **Sin cambios visuales**: el formulario queda idéntico y sigue mostrando el mensaje de "gracias, te contactamos".
4. **Sin tocar el correo**: no modifico configuración de mail, remitentes ni destinatarios. Los mails a `codelcoweb@gmail.com` y la confirmación al usuario siguen exactamente igual (opcionalmente puedo sumar la línea "Empresa" al mail interno, decime si lo querés).

## Reglas de acceso

Se mantienen como están hoy y son las correctas para esta etapa:
- Cualquier visitante puede enviar el formulario.
- Nadie puede leer, modificar ni borrar los mensajes desde la web pública. Solo el servidor (la función interna) escribe, y los mensajes se leen desde el panel de Supabase.

## Etapa 2 (no incluida ahora)

Panel interno con login para ver y gestionar los mensajes. Cuando lo hagamos, ahí se definen los usuarios y los permisos de lectura.

## Detalle técnico

- Migración: `ALTER TABLE public.contact_submissions ADD COLUMN company text;`
- Edge function `contact-submit`: agregar `company` al `insert` y al límite de validación (máx. 120 caracteres).
- Sin cambios en `src/components/Contact.tsx` (ya envía `company` en el body).
