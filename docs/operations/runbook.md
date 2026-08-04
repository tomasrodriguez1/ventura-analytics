# Runbook

## Correr el proyecto localmente

```bash
npm install
npm run dev       # http://localhost:4321, hot reload para .astro, .tsx, .md, .css
```

## Build y verificación local

```bash
npm run build     # genera dist/
npm run preview   # sirve dist/ para verificar el resultado final antes de deploy
```

## Logs

- **Local/dev:** consola del terminal donde corre `npm run dev`, más la consola del navegador (los logs de `src/lib/api.ts` con prefijo `[API]` aparecen ahí).
- **Producción:** no hay logs de servidor propio (sitio estático en Cloudflare Pages). Los únicos logs de la app son del navegador del usuario final (no accesibles remotamente) y los eventos de Google Analytics 4. Logs de build: dashboard de Cloudflare Pages → Deployments.
- **CI:** logs del workflow `.github/workflows/ci.yml` en la pestaña "Actions" del repositorio de GitHub.

## Reiniciar / re-desplegar

- **Local:** `Ctrl+C` y volver a correr `npm run dev`.
- **Producción:** no hay proceso que "reiniciar" (es estático). Para forzar un nuevo deploy: hacer push a `main` (Cloudflare Pages reconstruye), o Retry del deployment en el dashboard de Pages.

## Migraciones

No aplica — no hay base de datos.

## Errores comunes

| Síntoma | Causa probable | Acción |
|---|---|---|
| `npm run build` falla con error de schema | Un archivo `.md` en `src/content/blog/` no cumple el schema Zod de `src/content/config.ts` | Revisar frontmatter del post nuevo/editado (campos requeridos: `title`, `description`, `pubDate`, `category`, `excerpt`) |
| El workflow CI falla en "Verify build output" | Falta algún archivo esperado en `dist/` (`index.html`, `_headers`, `robots.txt`, `sitemap.xml`, `blog/index.html`, `consultor-ia/index.html`, etc.) | Verificar que las rutas existan en `src/pages/` / `public/` y que el build local (`npm run build`) las genere |
| El build de Cloudflare Pages falla | Misma causa que CI local, o Node incorrecto | Revisar logs en Pages → Deployments; confirmar `NODE_VERSION=20` y build output `dist` |
| Trailing slash inesperado (`/blog` vs `/blog/`) | Pages redirige a la variante con slash cuando existe `blog/index.html` | Comportamiento esperado con `build.format: 'directory'`; los canónicos usan `/` al final |
| El Consultor IA no responde / muestra error de conexión | El Cloudflare Worker externo no responde, cambió de contrato, o hay un problema de red del usuario | Ver `getErrorMapping()` en `src/lib/api.ts`; si es `network_error` o 5xx, confirmar disponibilidad del Worker (`WORKER_BASE_URL` en `constants.ts`) fuera de este repo |
| Chat falla solo en `*.pages.dev` | CORS del Worker restringido al origen de producción | Validar chat en `zalantos.com`; si hace falta, permitir el origen preview en el Worker (`GAP: config del Worker fuera de este repo`) |
| El chat pide registro de nuevo aunque el usuario ya se registró | `getLeadContext()` no encontró alguna de las 5 claves en `localStorage`, o el usuario limpió datos de navegación | Comportamiento esperado por diseño; si es un bug, revisar `saveLeadContext()`/`clearLeadContext()` en `src/lib/zalantosSession.ts` |
| Una página nueva no aparece en `/sitemap.xml` | No se agregó a `staticPages` en `src/pages/sitemap.xml.ts` (para páginas estáticas fuera del blog) | Agregar la ruta correspondiente y volver a hacer build |
| Dominio custom no resuelve o muestra sitio viejo | DNS aún apunta a cPanel, o TTL alto | Verificar registros DNS / custom domains en Pages; esperar propagación |

## Setup Cloudflare Pages + cutover DNS

Pasos en el dashboard (una sola vez):

1. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git → este repositorio.
2. Build settings: command `npm run build`, output `dist`, production branch `main`, `NODE_VERSION=20`.
3. Esperar el primer deployment y abrir la URL `*.pages.dev`.
4. Custom domains: añadir `zalantos.com` y `www.zalantos.com`; configurar redirect **www → apex**.
5. Ajustar DNS según indique Cloudflare (si el dominio ya está en Cloudflare, suele ser automático).
6. Tras verificar producción: borrar secrets `CPANEL_*` de GitHub Actions Settings.

## Smoke test (preview `*.pages.dev` y producción)

- [ ] `/` — home 200, HTML con contenido real (`Ctrl+U`).
- [ ] `/blog/` — lista de artículos.
- [ ] `/blog/<slug>/` — al menos un post.
- [ ] `/productos/`, `/productos/crm/`, `/productos/gestion-de-proyectos/`.
- [ ] `/lp/no-todos-problemas-operativos-necesitan-ia/`, `/lp/datos-en-orden-automatizacion-ia/`.
- [ ] `/consultor-ia/` — registro de lead + un mensaje de chat (en preview puede fallar por CORS; obligatorio en `zalantos.com`).
- [ ] Sección contacto / Calendly (home o `?section=contact`).
- [ ] `/privacy/`.
- [ ] `/sitemap.xml` y `/robots.txt`.
- [ ] `/blog` sin slash redirige a `/blog/` (o sirve el mismo contenido de forma canónica).
- [ ] `https://www.zalantos.com/...` redirige a `https://zalantos.com/...` (solo tras cutover DNS).

## Validación en producción tras un deploy

Checklist (ver también `README.md`):

- [ ] `https://zalantos.com/` responde 200 y el HTML fuente (`Ctrl+U`) muestra contenido real, no un `<div>` vacío.
- [ ] `/blog/` lista todos los artículos esperados.
- [ ] `/consultor-ia/` carga la isla de React y permite completar el registro de lead + enviar un mensaje.
- [ ] `/productos/` y landings de producto responden 200.
- [ ] `/sitemap.xml` contiene todas las URLs esperadas (páginas estáticas + posts del blog).
- [ ] `/robots.txt` referencia el sitemap correcto.
- [ ] No hay enlaces rotos a rutas antiguas de Next.js.
- [ ] Reindexar en Google Search Console si hubo cambios de contenido/URLs relevantes (pasos detallados en `README.md`).

## Playbooks de fallas de integración

- **Cloudflare Worker caído:** el chat mostrará un banner de "servicio no disponible" (mapeo `server_misconfig`/5xx en `getErrorMapping()`). No hay acción posible desde este repo salvo esperar o contactar a quien administra el Worker (`GAP: no hay contacto/owner documentado`).
- **Calendly no carga:** afecta solo la sección de contacto (`ContactSection.astro`); el resto del sitio sigue funcionando. Verificar el embed y la disponibilidad del servicio de Calendly.
- **GA4 no registra eventos:** no afecta funcionalidad del sitio, solo analítica; verificar el ID `G-X2L1QQ8X0D` en `BaseLayout.astro` y la consola de Google Analytics.
- **Pages build rojo:** revisar logs del deployment; reproducir con `npm ci && npm run build` en local.

## Contactos / responsables

`GAP:` no hay tabla de responsables/on-call documentada en el repo. Se sugiere completar con el equipo de Zalantos (ej. quién administra Cloudflare Pages/DNS, quién administra el Cloudflare Worker, quién administra GA4/Search Console).
