# Decisiones de arquitectura (ADRs)

Formato: cada decisión documentada según evidencia disponible en el repo (commits, `context.md`, `README.md`, configuración). Donde no hay evidencia directa de las alternativas consideradas, se marca como `GAP:`.

## DEC-001 - Migrar de Next.js (SSR/App Router) a Astro estático

Date: (supuesto: entre diciembre 2025 y abril 2026, según fechas de `docs/architecture.md` v2.0 "Diciembre 2025" y commit `6661ee0 cambio a astro`)
Status: active
Context: El sitio se construyó originalmente en Next.js 15 (App Router), con Server Components, `/app/api/contact/route.ts` y un servicio de contacto vía webhook N8N (ver `docs/architecture.md`, obsoleto). Era un sitio de marketing sin necesidad real de SSR ni de un servidor Node en producción.
Decision: Migrar a **Astro 4** con `output: 'static'`, manteniendo React solo como islas (`client:load`) para la parte interactiva (Consultor IA). El hosting pasó a ser estático servido por Apache/cPanel vía FTP, sin servidor Node en producción.
Alternatives considered: `GAP: no hay evidencia documentada de alternativas evaluadas (ej. mantener Next.js con export estático, usar otro SSG).`
Consequences: Mejor rendimiento y SEO (HTML puro indexable). Se perdieron las API routes de servidor propio; la lógica de contacto pasó a Calendly embebido y la de leads/chat se delegó a un Cloudflare Worker externo. `docs/architecture.md` quedó obsoleto y se conserva solo como referencia histórica.

## DEC-002 - Delegar leads y chat del Consultor IA a un Cloudflare Worker externo

Date: `GAP: fecha exacta no determinable desde el repo; posterior a DEC-001.`
Status: active
Context: Sin servidor Node en producción (sitio estático), el registro de leads y la lógica conversacional del "Consultor IA" necesitaban un backend en algún lugar.
Decision: Implementar esa lógica en un **Cloudflare Worker** externo (`silent-union-0457.tom-s-account-3d0.workers.dev`), consumido desde el cliente vía `fetch` en `src/lib/api.ts`, con sesión y estado de lead persistidos en `localStorage` del navegador (`src/lib/zalantosSession.ts`).
Alternatives considered: `GAP: no hay evidencia de si se evaluaron alternativas (ej. Supabase Edge Functions, un backend Node separado, integraciones directas con n8n).` Se sabe que existió una integración previa con **n8n** (`CONTACT_WEBHOOK_URL` en `constants.ts`, y tolerancia a formatos de respuesta tipo array/`{body}` en `normalizeApiPayload()`), que quedó legacy.
Consequences: El repo no tiene control de versiones ni tests sobre la lógica de negocio más crítica (leads/chat). Cambios de contrato del Worker requieren coordinación manual con quien mantiene ese sistema, fuera de este repositorio.

## DEC-003 - Reemplazar el formulario de contacto con webhook por Calendly embebido

Date: `GAP: no determinable con precisión; visible en README.md como nota vigente.`
Status: active
Context: El formulario de contacto original enviaba datos a un webhook de n8n (`CONTACT_WEBHOOK_URL`).
Decision: `ContactSection.astro` embebe directamente el widget de Calendly (`https://calendly.com/tomas-rodriguez-zalantos/30min`) para agendar reuniones de "Sprint 0", eliminando la necesidad de procesar el formulario en un backend propio.
Alternatives considered: `GAP: no documentado.`
Consequences: `CONTACT_WEBHOOK_URL` permanece definida en `constants.ts` pero sin uso activo — deuda técnica menor (ver `docs/context/context-extended.md`).

## DEC-004 - No implementar autenticación de usuarios ni base de datos

Date: Vigente desde el origen del proyecto como sitio de marketing.
Status: active
Context: El sitio es una herramienta de marketing/conversión, no una aplicación con usuarios registrados o datos persistentes propios.
Decision: No agregar auth (NextAuth/Clerk/Supabase Auth) ni base de datos (Prisma/Supabase/Neon) a este repositorio. Toda persistencia de negocio (leads, conversaciones) queda delegada al Worker externo; la única persistencia local es `localStorage` para sesión/consentimiento del navegador.
Alternatives considered: `GAP: no documentado explícitamente, pero es consistente con el objetivo de mantener el sitio 100% estático (DEC-001).`
Consequences: Simplicidad operativa alta (sin servidor que mantener, sin backups de DB que gestionar desde este repo). Cualquier reporting o analítica de leads debe hacerse desde el sistema del Worker, no desde este repo.

## DEC-005 - Migrar hosting de cPanel/FTPS a Cloudflare Pages

Date: 2026-08-04
Status: active
Context: El sitio se publicaba con GitHub Actions + FTPS (`lftp`) hacia cPanel/Apache, con reglas en `public/.htaccess`. Eso acoplaba el deploy a credenciales FTP, Apache y un workflow frágil, sin previews de branch.
Decision: Hospedar el artefacto estático (`dist/`) en **Cloudflare Pages** conectando el repositorio GitHub (build en Pages desde `main`). GitHub Actions pasa a ser solo CI de verificación (`.github/workflows/ci.yml`). Las reglas de cache pasan a `public/_headers`; HTTPS y redirect www→apex se gestionan en Cloudflare. Se elimina `public/.htaccess` y el workflow FTPS.
Alternatives considered: Railway (contenedor/nginx para un SSG puro, más complejidad), Netlify/Vercel (también válidos para estáticos). Se eligió Pages por encajar con el Worker ya en Cloudflare y el modelo “repo conectado → build → CDN” sin servidor Node.
Consequences: Ya no hacen falta secrets `CPANEL_*`. El cutover DNS a Pages es un paso operativo manual. Los previews `*.pages.dev` pueden fallar el chat si el Worker tiene CORS restringido a `zalantos.com`. Rollback vía dashboard de Pages o revert en `main`.

---

`GAP: decisiones adicionales por documentar si se identifican con más historia de git o con acceso al repositorio del Cloudflare Worker (ej. elección específica de Cloudflare Workers vs. otras plataformas serverless, esquema de rate limiting, versión de CONSENT_VERSION y su relación con cambios legales).`
