# Etapa 3 — Panel de administración con login (/panel)

Objetivo: una página privada en `/panel` donde solo 3 personas autorizadas pueden leer los mensajes del formulario y crear/editar/publicar noticias. La web pública no se toca.

## 1. Acceso y seguridad

- Login con email + contraseña usando Supabase Auth, en `/panel/login`.
- **Sin auto-registro**: el panel no tiene pantalla de "crear cuenta". Las 3 cuentas se crean una sola vez desde el dashboard de Supabase (Users → Add user, con email confirmado):
  - codelcoweb@gmail.com
  - hola@organicdesign.com.ar
  - guerraignaciojavier@gmail.com
- Tabla de roles separada (`user_roles`), nunca un campo en el perfil, para que las policies no se puedan burlar.
- Doble candado:
  1. **Base de datos**: las policies solo dejan pasar a quien tiene rol `admin`. Aunque alguien se cree una cuenta por otra vía, no ve ni un dato.
  2. **Interfaz**: si el usuario logueado no es admin, el panel muestra "No tenés permisos" y ofrece cerrar sesión.
- Además dejo activado en Supabase Auth el bloqueo de registros públicos (disable signups), así nadie puede crear cuenta desde afuera.
- `/panel` y `/panel/login` quedan con `noindex` y excluidas de robots.txt, sitemap y del prerenderizado.

## 2. Cambios en la base de datos

- Tipo `app_role` con el valor `admin`.
- Tabla `user_roles` (usuario + rol, único por combinación), con lectura solo para el propio usuario autenticado y escritura reservada al servidor.
- Función de seguridad `has_role(usuario, rol)` para usar dentro de las policies sin bucles.
- Función que, al confirmarse un alta de usuario con uno de los 3 emails de la lista, le asigna automáticamente el rol admin. Si el email no está en la lista, no recibe ningún rol.
- Policies nuevas:
  - `contact_submissions`: los admins pueden **leer** los mensajes (hoy nadie puede). Se mantiene el envío público del formulario y sigue prohibido editar/borrar.
  - `news`: los admins pueden **ver todas** (incluidos borradores), **crear**, **editar** y **borrar**. Se mantiene la lectura pública solo de las publicadas.

## 3. El panel adentro

Encabezado simple con el logo, el email del usuario y botón "Cerrar sesión". Dos pestañas.

### Mensajes
- Lista de los envíos de `contact_submissions`, del más nuevo al más viejo.
- Cada fila: fecha y hora, nombre, empresa, email, teléfono, "qué necesita" (subject) y un adelanto del mensaje.
- Al hacer clic se abre el detalle completo, con el mensaje entero legible y links directos para responder por mail o llamar. Solo lectura.
- Buscador por nombre/email/empresa y contador de mensajes.

### Noticias
- Lista de las 10 noticias actuales con título, categoría, fecha y estado (Borrador / Publicada).
- Acciones: **Nueva noticia**, **Editar**, **Publicar / Pasar a borrador** y **Eliminar** (con confirmación).
- Formulario de edición con: título, título SEO, slug (se sugiere solo desde el título), categoría (Flota / Proyecto / Planta / Clientes / Sector), fecha visible y fecha real, resumen, meta descripción, imagen principal, cuerpo/contenido y estado.
- El cuerpo se edita por bloques (párrafo, título, imagen, galería, video, HTML), con la opción de ver/editar el contenido crudo para las notas ya migradas que tienen formatos complejos. Así no se pierde nada de lo que ya está publicado.
- Al guardar, la web pública `/novedades` y la nota refrescan solos (se invalida la caché de datos).

Nota: el sitemap, el RSS y el prerenderizado siguen generándose desde `src/data/news.ts` (como quedó en la Etapa 2). Una noticia creada desde el panel aparece en la web al instante, pero para que entre al sitemap/RSS hace falta el paso de la Etapa 4 (pasar esa generación a leer de Supabase). Lo aviso para que no sorprenda.

## Detalles técnicos

- Migración SQL: `create type app_role`, tabla `public.user_roles` con GRANT a `authenticated` (select) y `service_role`, RLS activada, `has_role()` security definer con `search_path = public`, trigger `on_auth_user_created` que inserta el rol admin cuando el email está en la lista, y policies nuevas sobre `contact_submissions` (select para admin) y `news` (select/insert/update/delete para admin).
- Archivos nuevos: `src/hooks/useAuth.ts` (listener `onAuthStateChange` + `getUser`), `src/hooks/useIsAdmin.ts`, `src/pages/panel/PanelLogin.tsx`, `src/pages/panel/PanelLayout.tsx`, `src/pages/panel/MessagesPanel.tsx`, `src/pages/panel/NewsPanel.tsx`, `src/components/panel/NewsForm.tsx`, `src/components/panel/RequireAdmin.tsx`.
- Rutas nuevas en `src/App.tsx`: `/panel/login` y `/panel` (lazy, fuera del prerender de `scripts/build-ssg.mjs`).
- `public/robots.txt`: `Disallow: /panel`.
- Se reutilizan los componentes shadcn ya presentes (card, table, tabs, dialog, input, textarea, select, badge, toast).
- No se modifican `src/components/Contact.tsx`, la función `contact-submit`, `src/data/news.ts`, `NovedadesPage`, `NewsDetailPage` ni `NovedadesPreview` (salvo la invalidación de caché de React Query, que no cambia el diseño).
