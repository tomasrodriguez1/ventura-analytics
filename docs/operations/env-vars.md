# Variables de entorno

Este proyecto **no usa un archivo `.env`** en build ni en runtime de la aplicación (sitio 100% estático). No existen `.env`, `.env.local` ni `.env.production` en el repo (están en `.gitignore` como protección preventiva, aunque hoy no se usan).

## Variables de aplicación

| Variable | Servicio | Entorno | Requerida | Ejemplo seguro | Propósito | Fuente |
|---|---|---|---|---|---|---|
| `NODE_ENV` | Node / Astro | Local, CI | No (la define el runtime automáticamente) | `development` / `production` | Solo se lee (`process.env.NODE_ENV`) en `src/lib/api.ts` para habilitar logs adicionales en desarrollo | `src/lib/api.ts` |

No hay más variables `process.env.*` ni `import.meta.env.*` en el código fuente (`GAP: re-verificar si se introducen nuevas en el futuro`).

## Variables de build en Cloudflare Pages

Estas se configuran en el dashboard del proyecto Pages (Settings → Environment variables). No van en el repo.

| Variable | Servicio | Entorno | Requerida | Ejemplo seguro | Propósito |
|---|---|---|---|---|---|
| `NODE_VERSION` | Cloudflare Pages | Production / Preview | Recomendada | `20` | Fija Node 20 para el build de Astro |

## Secrets de despliegue (legacy)

Los secrets `CPANEL_HOST`, `CPANEL_USER`, `CPANEL_PASS`, `CPANEL_PATH` de GitHub Actions **ya no se usan** (el deploy FTPS a cPanel fue reemplazado por Cloudflare Pages). Deben eliminarse del repositorio en Settings → Secrets tras el cutover.

## URLs de servicios externos (hardcodeadas, no son env vars)

Estas URLs **no** están parametrizadas por entorno; están fijas en el código fuente. Se listan aquí para visibilidad, no porque sean variables de entorno:

| Valor | Dónde vive | Propósito |
|---|---|---|
| `WORKER_BASE_URL` = `https://silent-union-0457.tom-s-account-3d0.workers.dev` | `src/lib/constants.ts` | Backend de leads/chat (Cloudflare Worker) |
| `CONTACT_WEBHOOK_URL` (n8n) | `src/lib/constants.ts` | Legacy, sin uso activo |
| GA4 ID `G-X2L1QQ8X0D` | `src/layouts/BaseLayout.astro` | Analítica |
| Calendly URL | `src/components/sections/ContactSection.astro` | Agendamiento embebido |

`GAP:` si en el futuro se decide parametrizar estas URLs por entorno (dev/staging/prod), se debe introducir un mecanismo de env vars real (`import.meta.env` en Astro) y actualizar este documento, `docs/operations/deployment.md` y `.env.example`.

## Reglas

- Nunca incluir secretos reales en código, commits, PRs o esta documentación.
- Cualquier nueva variable de entorno debe agregarse a `.env.example` con un comentario explicativo y a esta tabla.
