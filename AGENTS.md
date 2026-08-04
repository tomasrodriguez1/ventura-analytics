# AGENTS.md — Reglas para agentes de IA (ventura-analytics / zalantos-astro)

Este archivo aplica a **cualquier agente de IA** (Cursor, Claude Code, Codex, etc.) que trabaje en este repositorio. `CLAUDE.md` añade instrucciones específicas para Claude Code, pero las reglas de este archivo son la base común.

## 1. Qué es este proyecto (resumen)

Sitio corporativo estático de **Zalantos** (`https://zalantos.com`), construido con **Astro 4 + React (islas) + Tailwind CSS + TypeScript**. No tiene base de datos, no tiene backend propio (la lógica de leads/chat del "Consultor IA" vive en un Cloudflare Worker externo) y no tiene autenticación de usuarios. Para más detalle, ver `docs/context/context.md`.

## 2. Política de carga progresiva de contexto

No cargues toda la documentación por defecto. Para cualquier tarea, lee primero:

- `docs/context/context.md`
- `docs/context/data_model_context.md`
- `docs/architecture/architecture.md`
- `AGENTS.md` (este archivo)

Lee documentos adicionales solo cuando la tarea lo requiera:

- `docs/context/context-extended.md` — si tocas lógica de negocio central o flujos principales (Consultor IA, registro de leads, blog, landings).
- `docs/architecture/decisions.md` — si cambias arquitectura, dependencias, infraestructura, storage, auth, colas, workers o integraciones.
- `docs/architecture/integrations.md` — si tocas APIs, webhooks, emails, IA, OCR, storage, pagos, bancos, automatizaciones o servicios de terceros.
- `docs/engineering/security-checklist.md` — si tocas auth, permisos, datos personales, archivos, logs, prompts, producción o datos de clientes.
- `docs/engineering/testing-strategy.md` — si agregas o cambias lógica de negocio, workers, integraciones, cálculos, permisos o transformaciones de datos.
- `docs/operations/deployment.md`, `docs/operations/env-vars.md`, `docs/operations/runbook.md` — si tocas deploy, Cloudflare Pages, GitHub Actions, variables de entorno, cron, colas, workers o comportamiento de producción.

## 3. Archivos requeridos antes de trabajar

Antes de editar código, un agente debe haber leído (según aplique por la política de arriba):

1. `docs/context/context.md`
2. `docs/architecture/architecture.md`
3. Este `AGENTS.md`
4. El/los archivo(s) concreto(s) que va a modificar, completos, no solo fragmentos.

## 4. Acciones prohibidas por defecto

Salvo pedido explícito del usuario:

- No inventar campos, endpoints o contratos de API que no existan en el código o en `docs/`.
- No modificar el contrato del Cloudflare Worker (`src/lib/constants.ts`: `WORKER_BASE_URL`, `LEAD_REGISTER_URL`, `CHAT_API_URL`) sin confirmar con el usuario, ya que el backend real vive fuera de este repo.
- No cambiar `CONSENT_VERSION` en `src/lib/constants.ts` sin que el usuario confirme que el texto legal de privacidad (`src/pages/privacy.astro`) también se actualizó.
- No añadir dependencias nuevas sin justificarlo (este proyecto es intencionalmente liviano: Astro, React solo como islas, Tailwind).
- No introducir SSR, un backend propio, o una base de datos sin que el usuario lo pida explícitamente — es una decisión de arquitectura documentada en `docs/architecture/decisions.md`.
- No eliminar ni sobreescribir documentación existente sin preservar su contenido útil.
- No exponer secretos (tokens, credenciales de servicios) en código, commits o documentación.

## 5. Comportamiento requerido antes de editar

1. Identificar si el cambio es de contenido marketing (`.astro` en `src/components/sections/` o `src/pages/`), del chat/leads (`src/components/chat/`, `LeadGateModal.tsx`, `src/lib/api.ts`, `src/lib/zalantosSession.ts`), del blog (`src/content/blog/` + `src/content/config.ts`), de SEO/sitemap, de estilos globales, o de infraestructura/deploy.
2. Leer el/los archivo(s) afectados completos antes de modificarlos.
3. Revisar si existe un patrón ya establecido (por ejemplo, landings de campaña: `src/data/landingCampaigns/{slug}.ts` + `src/pages/lp/{slug}.astro` + `LinkedInCampaignLanding.astro`) y seguirlo en vez de crear uno nuevo.
4. Para cambios en `src/lib/api.ts`, usar ese archivo como fuente de verdad; **no** tocar `src/services/chatService.ts` (legacy, sin usar).

## 6. Comportamiento requerido después de editar

1. Si el cambio agrega una ruta pública, actualizar `staticPages` en `src/pages/sitemap.xml.ts` cuando corresponda.
2. Ejecutar (o pedir al usuario ejecutar) `npm run build` para validar que el sitio compila y la nueva ruta aparece en `dist/`.
3. Si el cambio afecta la arquitectura, el modelo de contenido, las integraciones o el flujo de deploy, actualizar la documentación relevante en `docs/` (ver checklist del PR template).
4. Actualizar `CHANGELOG.md` con una entrada breve en `Unreleased` si el cambio es significativo.

## 7. Formato de respuesta esperado de un agente

- Explicar en lenguaje simple qué se cambió y por qué.
- Citar rutas de archivo concretas modificadas.
- Señalar explícitamente cualquier `GAP:` encontrado o cualquier supuesto asumido.
- No mezclar refactors grandes con features/fixes sin que el usuario lo pida.

## 8. Reglas específicas por tipo de cambio

- **Modelo de datos / contenido:** el "modelo de datos" de este repo es principalmente el schema de blog (`src/content/config.ts`, Zod) y el modelo de sesión en `localStorage` (`STORAGE_KEYS` en `src/lib/constants.ts`). No inventar campos nuevos sin actualizar `docs/context/data_model_context.md`.
- **Arquitectura:** cualquier cambio que agregue backend propio, base de datos, auth o SSR debe registrarse como una nueva decisión en `docs/architecture/decisions.md`.
- **Auth/permisos:** este proyecto no tiene auth de usuarios; el único "gate" es el registro de lead antes del chat (`LeadGateModal.tsx`). No agregar lógica de autenticación sin pedido explícito.
- **Integraciones:** cualquier nueva integración externa (nuevo webhook, nuevo proveedor de IA, nuevo analytics) debe documentarse en `docs/architecture/integrations.md`.
- **Deploy:** cambios al workflow de CI (`.github/workflows/ci.yml`), a la config de Cloudflare Pages o a variables/secrets deben reflejarse en `docs/operations/deployment.md` y `docs/operations/env-vars.md`.
