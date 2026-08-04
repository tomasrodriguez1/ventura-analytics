# Arquitectura actual

> Este documento describe la arquitectura **vigente** (Astro 4, jul 2026). El archivo `docs/architecture.md` (fuera de esta carpeta) describe la arquitectura **anterior** basada en Next.js y está obsoleto; se conserva solo como referencia histórica.

## Resumen

Sitio 100% estático generado en build time por Astro. No hay servidor de aplicación en producción: el hosting solo sirve archivos HTML/CSS/JS/estáticos vía **Cloudflare Pages** (CDN). La única lógica "dinámica" ocurre en el navegador (React islands) y contra un backend externo (Cloudflare Worker) que no forma parte de este repositorio.

## Frontend

- **Framework:** Astro 4 (`output: 'static'`, `build.format: 'directory'`) — `astro.config.mjs`.
- **Componentes:** mayoría `.astro` (HTML server-rendered en build, cero JS en cliente). React 18 se usa **solo como islas** (`client:load`) para la parte interactiva del Consultor IA y algunos componentes UI (`Button.tsx`, `Input.tsx`).
- **Estilos:** Tailwind CSS 3 (`@astrojs/tailwind`, `applyBaseStyles: false`) + tokens CSS `--z-*` en `src/styles/global.css`. Paleta en `tailwind.config.mjs` y duplicada como constantes TS en `src/lib/constants.ts` (`COLORS`).
- **Alias:** `@/` → `src/` (configurado en `astro.config.mjs` vía Vite y en `tsconfig.json`).
- **Contenido:** Astro Content Collections para el blog (`src/content/blog/`, schema en `src/content/config.ts`).

## Backend

No hay backend propio en este repositorio.

- La única "API route" de Astro es `src/pages/sitemap.xml.ts` (`export const GET: APIRoute`), que genera `sitemap.xml` en build a partir de páginas estáticas fijas + posts del blog. No hace CRUD, no tiene auth, no es un webhook.
- La lógica de negocio de leads y chat (registro, conversación con el asistente) vive en un **Cloudflare Worker externo**: `https://silent-union-0457.tom-s-account-3d0.workers.dev`. Su código e infraestructura no están en este repo (`GAP:` documentar si se obtiene acceso).

## Base de datos

No hay base de datos en este repositorio. Ver `docs/context/data_model_context.md` para el detalle de qué modelos de datos existen (contenido de blog vía Zod, sesión de cliente vía `localStorage`) y qué vive fuera del repo (Worker).

## Storage

No hay storage de archivos gestionado por este repo (sin S3, sin Supabase Storage). Los assets estáticos (imágenes, íconos, `_headers`, `robots.txt`) están en `public/` y se copian tal cual a `dist/` en build.

## Workers / jobs

No hay workers, colas ni cron jobs dentro de este repositorio. El único "worker" relevante al negocio es el Cloudflare Worker externo mencionado arriba.

## Integraciones

Ver detalle completo en `docs/architecture/integrations.md`. Resumen: Cloudflare Worker (leads/chat), Calendly (agendamiento embebido), Google Analytics 4 (analítica), n8n (webhook legacy sin uso).

## Auth

No hay autenticación de usuarios. El único control de acceso es el gate de registro de lead antes de habilitar el chat (ver `docs/context/data_model_context.md` y `docs/context/context-extended.md`).

## Entornos

| Entorno | Cómo se genera | Dónde vive |
|---|---|---|
| Local / desarrollo | `npm run dev` (`astro dev`, puerto 4321) | Máquina del desarrollador |
| Preview de build | `npm run build` + `npm run preview` | Máquina del desarrollador, sirviendo `dist/` |
| Producción | Push a `main` → Cloudflare Pages build + publish | `https://zalantos.com` (Cloudflare Pages) |

No hay entorno de staging separado; los previews de branch/PR en Pages (`*.pages.dev`) sirven de validación previa. `GAP: confirmar si se quiere un proyecto Pages de staging dedicado.`

## Flujo general de información

```
Contenido (.astro, .md, .tsx)
        │  npm run build (Astro) — en Cloudflare Pages
        ▼
      dist/ (HTML estático + assets hasheados + sitemap.xml + _headers)
        │  Cloudflare Pages CDN
        ▼
   https://zalantos.com
        │  HTTP(S)
        ▼
    Navegador del usuario
        │  fetch (solo Consultor IA)
        ▼
  Cloudflare Worker externo (leads + chat)
```

CI en GitHub Actions (`.github/workflows/ci.yml`) verifica el build en push/PR; **no** despliega.

## Riesgos

- Dependencia de un backend externo sin control de versiones ni tests desde este repo (ver `docs/context/context-extended.md` §Riesgos técnicos).
- Sin staging dedicado: los cambios se validan en local (`npm run preview`) y/o preview Pages, y se publican a producción al hacer push a `main`.
- Rollback vía dashboard de Pages (redeploy de un deployment anterior) o `git revert` en `main` (ver `docs/operations/deployment.md`).

## Decisiones pendientes

- `GAP:` no hay evidencia de plan para agregar staging, tests automatizados, o mover el backend del Worker a este repo. Si se decide, documentar como nueva entrada en `docs/architecture/decisions.md`.
