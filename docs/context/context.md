# Contexto del proyecto

## Qué hace el proyecto

`ventura-analytics` (nombre npm `zalantos-astro`) es el **sitio corporativo estático** de Zalantos, publicado en [zalantos.com](https://zalantos.com). Sirve para:

1. Marketing y SEO: HTML estático indexable por Google, Bing y bots de IA.
2. Conversión: propuesta de valor, casos de uso y CTA a "Sprint 0" (agendado vía Calendly).
3. Captación y atención de leads mediante un chat propio, el **Consultor IA** (`/consultor-ia/`).
4. Publicación de contenido de blog (Markdown vía Astro Content Collections).
5. Landings de campaña para tráfico pagado/orgánico de LinkedIn (`/lp/...`).

## Para quién es

- Prospects B2B que evalúan a Zalantos (visitantes del sitio).
- El propio equipo de Zalantos, que publica contenido (blog, landings) y da seguimiento a leads generados por el Consultor IA.
- Leads que interactúan directamente con el chat.

## Problema de negocio

Zalantos SPA es una consultoría en IA, automatización de procesos y análisis de datos para empresas (contacto: `contacto@zalantos.com`). Necesitaba un sitio rápido de cargar, indexable, fácil de mantener por una persona técnica, con captación de leads — sin el costo operativo de mantener un backend o base de datos propios.

## Main flows (flujos principales)

- **Visita → conversión:** home (`/`) → sección de contacto embebida con Calendly (`?section=contact`).
- **Visita → Consultor IA:** `/consultor-ia/` → registro de lead (`LeadGateModal`) → conversación con el asistente vía un Cloudflare Worker externo.
- **Visita → contenido:** `/blog/` → artículo (`/blog/{slug}/`).
- **Campaña → landing:** `/lp/{slug}/` con copy específico por campaña.

Detalle técnico de estos flujos: ver `docs/context/context-extended.md`.

## Stack (resumen)

Astro 4 (output estático) + React 18 (solo islas `client:load`) + Tailwind CSS 3 + TypeScript estricto. Sin backend propio, sin base de datos, sin autenticación de usuarios. Detalle completo en `docs/architecture/architecture.md`.

## Estado actual

En producción, desplegado automáticamente desde la rama `main` vía **Cloudflare Pages** (integración Git: build Astro + publish a CDN). GitHub Actions (`.github/workflows/ci.yml`) solo verifica el build. El sitio migró de **Next.js 15** a **Astro 4**; existe documentación obsoleta de la época Next.js (`docs/architecture.md`) que se conserva solo como referencia histórica.

## Qué NO debe cambiar sin autorización explícita

- El contrato de `POST /lead/register` y `POST /chat` contra el Cloudflare Worker (`WORKER_BASE_URL` en `src/lib/constants.ts`) — el backend real vive fuera de este repo.
- `CONSENT_VERSION` sin sincronizar con el texto legal en `src/pages/privacy.astro`.
- El pipeline de deploy de Cloudflare Pages (build settings / dominio custom) sin confirmar con el usuario; ver `docs/operations/deployment.md`.
- La decisión de mantener el sitio 100% estático (sin SSR, sin DB, sin backend propio) — ver `docs/architecture/decisions.md`.

## Decisiones clave

- Migración de Next.js (SSR/App Router) a Astro (estático) para maximizar SEO/velocidad y simplificar el hosting (sin servidor Node en producción).
- Hosting en **Cloudflare Pages** (DEC-005), sustituyendo cPanel/FTPS.
- Backend de leads/chat delegado a un Cloudflare Worker externo en vez de implementarlo en este repo.
- Formulario de contacto reemplazado por Calendly embebido (el webhook de n8n quedó legacy, sin uso).

## Gaps

- `GAP:` el repositorio/código del Cloudflare Worker (backend de leads y chat) no es accesible desde este repo; su modelo de datos y lógica de negocio no pueden documentarse con evidencia local.
- `GAP:` no hay changelog histórico anterior a esta estandarización (jul 2026); la única fuente de historia es `git log`.
- `GAP:` no hay tests automatizados, por lo que no hay evidencia de comportamiento esperado más allá de lectura de código.
