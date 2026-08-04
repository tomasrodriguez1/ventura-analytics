# Modelo de datos

## Resumen

Este proyecto **no tiene base de datos** ni ORM (no hay Prisma, Drizzle, Supabase, Neon, ni archivos `.sql` de schema/migraciones). No hay tablas ni colecciones persistentes gestionadas por este repo.

Existen dos "modelos de datos" reales, ambos sin persistencia server-side en este repositorio:

1. **Modelo de contenido** (blog), validado con Zod y persistido como archivos Markdown.
2. **Modelo de sesión/lead del cliente**, persistido en `localStorage` del navegador.

El modelo de datos real de leads y conversaciones del chat vive en el **Cloudflare Worker externo** (`GAP:` no accesible desde este repo).

## 1. Modelo de contenido — Blog

Definido en `src/content/config.ts` (Astro Content Collections + Zod):

| Campo | Tipo | Requerido | Notas |
|---|---|---|---|
| `title` | `string` | Sí | |
| `description` | `string` | Sí | |
| `pubDate` | `date` (coerced) | Sí | |
| `updatedDate` | `date` (coerced) | No | |
| `author` | `string` | No | Default: `'Zalantos SPA'` |
| `category` | `string` | Sí | |
| `excerpt` | `string` | Sí | |
| `image` | `string` | No | |
| `featured` | `boolean` | No | Default: `false` |
| `tags` | `string[]` | No | Default: `[]` |

**Reglas de negocio:**

- El slug de cada artículo es el nombre del archivo `.md` en `src/content/blog/`.
- Un artículo nuevo aparece automáticamente en `/blog/` y en `sitemap.xml` (vía `src/pages/sitemap.xml.ts`) al hacer build; no requiere registrar el slug en ningún otro lugar.
- No hay estados de publicación (borrador/publicado); todo lo que existe en `src/content/blog/` se publica en el próximo build.

**Constraints:** los definidos por el schema Zod (`defineCollection`); si un `.md` no cumple el schema, el build de Astro falla.

**Artículos actuales (8):** `caso-colegio-rag-sistema-consultas-ia`, `datos-ai-ready-proyecto-ia-fracaso`, `insight-alertas-ejecutivas-inteligentes-desvios-criticos`, `insight-asistente-interno-ia-politicas-procesos-faqs`, `insight-automatizacion-procesos-trazabilidad-control-auditoria`, `insight-ia-forecasting-planificacion-reducir-incertidumbre-operacional`, `insight-ia-kpis-hallazgos-lenguaje-natural`, `insight-sistema-tracking-operacional-acceso-rapido-ia`.

## 2. Modelo de sesión/lead — Cliente (localStorage)

Definido por `STORAGE_KEYS` en `src/lib/constants.ts` y gestionado por `src/lib/zalantosSession.ts`:

| Clave localStorage | Campo lógico | Descripción |
|---|---|---|
| `zalantos_session_id` | `session_id` | Generado localmente (`sess_<timestamp>_<random>`) si no existe; persiste entre visitas del mismo navegador |
| `zalantos_lead_id` | `lead_id` | Devuelto por el Worker tras `POST /lead/register` |
| `zalantos_lead_session_id` | `lead_session_id` | Devuelto por el Worker; requerido para poder chatear |
| `zalantos_consent_version` | `consent.consent_version` | Debe coincidir con `CONSENT_VERSION` (`constants.ts`) para considerarse válido |
| `zalantos_consented_at` | `consent.consented_at` | ISO timestamp del consentimiento |

**Reglas de negocio:**

- `getLeadContext()` retorna `null` si falta **cualquiera** de los 5 valores — eso dispara el `LeadGateModal` de nuevo.
- `clearLeadContext()` borra lead/consentimiento pero **conserva** `session_id` (se documenta explícitamente en el código: "mantener tracking de sesión").
- El consentimiento tiene versión (`CONSENT_VERSION = '2026-01-07'`); si cambia el texto legal de privacidad, esta constante debe actualizarse (ver `AGENTS.md`).

**Tipos relacionados:** `src/types/session.types.ts`, `src/types/chat.types.ts`, `src/types/api.types.ts`.

## 3. Modelo de datos del backend externo (Cloudflare Worker)

`GAP: no se pudo inspeccionar el código del Worker (silent-union-0457.tom-s-account-3d0.workers.dev), por lo que su modelo real de datos (tablas de leads, historial de conversación, rate limiting, etc.) no puede documentarse con evidencia. Lo que se conoce es únicamente el contrato HTTP consumido desde src/lib/api.ts y src/types/api.types.ts:`

- `POST /lead/register` — request: `{ first_name, last_name, email, page, session_id, consent }`; response esperada: `{ ok, lead_id, lead_session_id, session_id?, error?, message? }`.
- `POST /chat` — request: `{ message, session_id, lead_session_id, page, consent }`; response esperada: `{ ok, output? | response?, error?, message? }`.
- El cliente tolera respuestas en array (`[{...}]`) o envueltas en `{ body }` / `{ data }` (`normalizeApiPayload()`), un patrón típico de automatizaciones tipo n8n — sugiere que el Worker podría reenviar/envolver respuestas de otro sistema aguas arriba. `GAP: confirmar arquitectura real del Worker.`

## 4. Cosas que no deben romperse

- El contrato de request/response de `/lead/register` y `/chat` (cambiarlo sin coordinar con el owner del Worker rompe el chat en producción).
- Las 5 claves de `STORAGE_KEYS`: cambiar sus nombres invalida sesiones ya guardadas en navegadores de usuarios reales.
- El schema Zod del blog: cambiarlo de forma incompatible con artículos `.md` existentes rompe el build.
- `CONSENT_VERSION` debe mantenerse sincronizada con `src/pages/privacy.astro`.

## 5. Permisos / RLS

No aplica — no hay base de datos ni políticas de Row Level Security en este repo.
