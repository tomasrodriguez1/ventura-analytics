# Integraciones externas

## Resumen

| Servicio | Estado | Uso | Config / archivos |
|---|---|---|---|
| Cloudflare Worker | Activo | Registro de leads y chat del Consultor IA | `WORKER_BASE_URL`, `LEAD_REGISTER_URL`, `CHAT_API_URL` en `src/lib/constants.ts`; consumido en `src/lib/api.ts` |
| Calendly | Activo | Agendamiento de "Sprint 0" / contacto | Embebido en `src/components/sections/ContactSection.astro` (`https://calendly.com/tomas-rodriguez-zalantos/30min`) |
| Google Analytics 4 | Activo | Analítica de uso y CTAs de producto | ID `G-X2L1QQ8X0D` hardcodeado en `src/layouts/BaseLayout.astro` |
| n8n (webhook) | Legacy, sin uso activo | Contacto (formulario antiguo) | `CONTACT_WEBHOOK_URL` en `src/lib/constants.ts`, no invocado por la UI actual |
| LinkedIn | Activo (solo enlace) | Redes sociales / origen de tráfico de landings | `SOCIAL_LINKS.linkedin` en `constants.ts`; landings en `src/data/landingCampaigns/` |
| Google Fonts | Activo | Tipografía (Inter) | `src/layouts/BaseLayout.astro` |

Servicios explícitamente **no encontrados** en este repo: Supabase, Neon, Stripe, Resend/SendGrid/Nodemailer, PostHog/Vercel Analytics, S3/Supabase Storage, Clerk/NextAuth, proveedores de IA vía SDK directo (OpenAI/Anthropic solo se mencionan en el texto legal de `src/pages/privacy.astro`, no hay llamadas SDK en el código).

## Cloudflare Worker (leads + chat)

- **Base URL:** `https://silent-union-0457.tom-s-account-3d0.workers.dev`
- **Endpoints:**
  - `POST /lead/register` — body: `{ first_name, last_name, email, page, session_id, consent }`. Timeout: 20s.
  - `POST /chat` — body: `{ message, session_id, lead_session_id, page, consent }`. Timeout: 120s (respuestas de agente pueden tardar).
- **Cliente:** `src/lib/api.ts` (`registerLead`, `sendChatMessage`, `postJson`, `normalizeApiPayload`, `getErrorMapping`).
- **Credenciales requeridas:** ninguna expuesta en este repo (endpoint público desde el navegador). `GAP: confirmar si el Worker aplica algún tipo de rate limiting/autenticación server-to-server no visible desde el cliente.`
- **Riesgo:** el código y la infraestructura del Worker no están en este repositorio; cualquier cambio de contrato debe coordinarse manualmente.
- **Entornos:** no hay distinción visible de URL entre dev/staging/producción — el mismo `WORKER_BASE_URL` se usa siempre. `GAP: confirmar si existe un Worker separado para desarrollo.`

## Calendly

- **Uso:** agendar reuniones de 30 min ("Sprint 0") directamente desde `ContactSection.astro`, sin backend propio ni webhook.
- **Credenciales:** ninguna (embed público).
- **Riesgo:** bajo; si Calendly cae, solo afecta la sección de contacto, no el resto del sitio.

## Google Analytics 4

- **ID:** `G-X2L1QQ8X0D`, hardcodeado en `src/layouts/BaseLayout.astro`.
- **Riesgo:** el ID está en el código fuente público (HTML); es un dato público por diseño de GA4, no un secreto.
- **Uso:** medición de tráfico y conversiones del sitio.
- **Eventos de producto:** los enlaces marcados con `data-analytics` reportan `product_nav_click`, `product_card_cta_click`, `product_demo_click` y `product_secondary_cta_click`; el embed de Calendly reporta `demo_booking_completed` al recibir `calendly.event_scheduled`. El parámetro `product` se conserva como contexto de la conversión.

## n8n (legacy)

- **URL:** `https://n8n.venturanalytic.com/webhook/95513fc5-bf2c-4d4f-b5d8-e5ab229e8629` (`CONTACT_WEBHOOK_URL` en `constants.ts`).
- **Estado:** definido pero no invocado por ningún componente activo (el formulario de contacto usa Calendly). Candidato a limpieza si se confirma que no se reactivará.
- **Nota:** `normalizeApiPayload()` en `src/lib/api.ts` tolera formatos de respuesta típicos de n8n (arrays, `{ body }`, `{ data }`), lo que sugiere que el Cloudflare Worker podría reenviar/envolver respuestas de un flujo n8n aguas arriba. `GAP: confirmar arquitectura real detrás del Worker.`

## Credenciales requeridas (resumen)

Ninguna de las integraciones de este repo requiere credenciales gestionadas en `.env` — todo lo consumido desde el cliente es público por diseño (Worker público, Calendly embed público, GA4 ID público). El deploy a Cloudflare Pages no usa secrets de FTP; ver `docs/operations/env-vars.md` (`NODE_VERSION` en Pages; secrets `CPANEL_*` legacy a eliminar).

## Riesgos generales de integraciones

- Cambios de contrato en el Worker externo pueden romper el chat sin que ningún test lo detecte (no hay tests en este repo).
- Dependencia de disponibilidad de terceros (Calendly, GA4, Google Fonts, Cloudflare) sin fallback implementado.
- `GAP:` no hay documentación de SLA o contacto de soporte para el Cloudflare Worker.
