
# Verificar Google Search Console

Google acepta dos métodos para probar que el dominio es tuyo. Los dos funcionan con SIS y **no tocan** MX/SPF/DKIM, así que el correo sigue intacto.

## Opción A — Meta tag en el `<head>` (recomendada, la hago yo)

Es la más simple: agrego una línea en `index.html` y listo. No requiere tocar nada en SIS.

**Cambio en `index.html`** (dentro del `<head>`):

```html
<meta name="google-site-verification" content="FkDSP312-DahP2PCmnYNlhkuu23xY5Uy_AFQ379GN3w" />
```

**Después:**
1. Publicás la web (o esperás a que se propague el deploy en SIS si estás sirviendo desde ahí).
2. En Google Search Console, en la propiedad **URL-prefix** `https://codelco.com.ar/`, apretás **Verificar**.
3. Google lee el meta y queda verificado.

Limitación: sirve solo para la propiedad tipo **URL-prefix** (`https://codelco.com.ar/`). Si querés una propiedad de **Dominio** (cubre subdominios y http/https), necesitás sí o sí la Opción B.

## Opción B — Registro TXT en SIS (para propiedad de Dominio)

Le pedís a SIS que agregue este registro en la zona DNS de `codelco.com.ar`:

| Campo | Valor |
|---|---|
| Tipo | `TXT` |
| Nombre / Host | `@` (o `codelco.com.ar.`) |
| Valor | `google-site-verification=FkDSP312-DahP2PCmnYNlhkuu23xY5Uy_AFQ379GN3w` |
| TTL | 3600 (por defecto) |

**Mensaje sugerido para SIS:**

> Hola, necesito agregar un registro TXT en la zona DNS de codelco.com.ar para verificar Google Search Console. Es un TXT adicional en el root del dominio (@), no reemplaza ningún registro existente (no afecta MX, SPF, ni DKIM).
> - Tipo: TXT
> - Nombre: @
> - Valor: `google-site-verification=FkDSP312-DahP2PCmnYNlhkuu23xY5Uy_AFQ379GN3w`
> - TTL: 3600
> Gracias.

**Después:** en Search Console, propiedad tipo **Dominio** → apretás **Verificar**. Puede tardar hasta unas horas en propagar.

## Recomendación

Ir con **A + B en paralelo**:
- Yo dejo el meta tag ahora → verificás la propiedad URL-prefix en minutos.
- Le pedís a SIS el TXT → cuando esté, verificás también la propiedad Dominio (más completa para SEO).

## Confirmame

¿Aplico ya la **Opción A** (meta tag en `index.html`)? Si querés solo la B, no toco código y te quedás con el mensaje para SIS.
