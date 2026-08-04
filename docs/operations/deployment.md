# Deploy

## Entornos

| Entorno | Descripción |
|---|---|
| Local | `npm run dev` — dev server Astro en `http://localhost:4321` |
| Preview local | `npm run build && npm run preview` — sirve el `dist/` generado |
| Preview remoto | Deploys de branch/PR en Cloudflare Pages (`*.pages.dev`) |
| Producción | `https://zalantos.com`, Cloudflare Pages + CDN |

No existe un entorno de staging separado más allá de los previews de Pages. `GAP: confirmar si se quiere un proyecto Pages de staging dedicado.`

## Plataforma de despliegue

**Cloudflare Pages** (integración Git con este repositorio). No hay cPanel, FTPS, Vercel, Netlify, Railway ni contenedores propios (no hay `Dockerfile`/`docker-compose.yml`).

## Servicios involucrados

- **Cloudflare Pages** — build de Astro y publicación de `dist/` en el CDN de Cloudflare.
- **GitHub Actions** (`.github/workflows/ci.yml`) — verificación de build en push/PR a `main` (no despliega).
- **GitHub** — fuente de verdad; Pages construye desde la rama `main`.

## Build command

```bash
npm ci
npm run build
```

`npm run build` ejecuta `astro build`, generando `dist/` con HTML puro, assets con hash en `dist/_astro/`, `sitemap.xml`, y `public/_headers` copiado a `dist/_headers`.

## Start command

No aplica en producción (no hay servidor Node corriendo) — Cloudflare Pages sirve los archivos estáticos. Para verificación local del build: `npm run preview` (`astro preview`).

## Configuración del proyecto Pages (dashboard)

| Setting | Valor |
|---|---|
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` (raíz del repo) |
| Node version | `20` (variable de entorno `NODE_VERSION=20` en Pages) |

## Migraciones

No aplica — no hay base de datos.

## Variables de entorno

Ninguna requerida para el build de la aplicación. En Pages se puede definir `NODE_VERSION=20`. Ver `docs/operations/env-vars.md`.

Los antiguos secrets `CPANEL_*` de GitHub Actions ya no se usan; deben eliminarse del repo tras el cutover.

## Proceso de deploy (automático)

1. Push a la rama `main` (o merge de PR) dispara el build de **Cloudflare Pages** (integración Git).
2. Pages ejecuta `npm run build` con Node 20 y publica el contenido de `dist/`.
3. En paralelo, `.github/workflows/ci.yml` verifica el build en GitHub Actions (no despliega).
4. HTTPS y CDN los gestiona Cloudflare.

## Dominio custom y DNS

1. En el proyecto Pages: Custom domains → `zalantos.com` y `www.zalantos.com`.
2. Configurar redirección **www → apex** (`https://zalantos.com`) vía Redirect Rule o redirect del hostname www en Cloudflare.
3. Si el DNS del dominio ya está en Cloudflare, enlazar el proyecto Pages; si no, crear los registros que indique Pages y planificar el cutover (TTL bajo).
4. Validar primero en la URL `*.pages.dev` antes de apuntar el dominio de producción.

## Headers y trailing slash

- Cache y revalidación: `public/_headers` (copiado a `dist/_headers`). Sustituye las reglas de cache del antiguo `.htaccess` de Apache.
- Trailing slash: el sitio usa `build.format: 'directory'` y canónicos con `/`. Cloudflare Pages, al encontrar `ruta/index.html`, suele redirigir `/ruta` → `/ruta/` (308). Comportamiento alineado con el SEO actual.
- HTTPS: lo fuerza Cloudflare (ya no hace falta `.htaccess`).

## Proceso de rollback

1. En Cloudflare Pages → Deployments: promover un deployment anterior a producción, o
2. Revertir el commit problemático en `main` (`git revert`) y dejar que Pages vuelva a construir.

## Cutover desde cPanel (checklist operativo)

Ver también `docs/operations/runbook.md` y `README.md`.

1. Merge a `main` de los cambios de Pages (`_headers`, CI, docs).
2. Conectar el repo en Cloudflare Pages con la config de la tabla de arriba.
3. Confirmar build verde y smoke test en `*.pages.dev`.
4. Adjuntar custom domain + redirect www → apex + DNS.
5. Smoke test en `https://zalantos.com`.
6. Borrar secrets `CPANEL_*` de GitHub Actions.
7. Confirmar que cPanel ya no recibe deploys (el workflow FTPS fue eliminado).

## Gaps

- `GAP:` no hay staging remoto dedicado (solo previews `*.pages.dev`).
- `GAP:` no hay notificación automática (Slack/email) de éxito o falla del deploy de Pages más allá del dashboard de Cloudflare y el estado de CI en GitHub Actions.
