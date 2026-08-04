# Estándares de código

Adaptado al stack real del proyecto: Astro 4 + React 18 (islas) + TypeScript estricto + Tailwind CSS 3.

## Naming

- **Componentes** (`.astro`, `.tsx`): `PascalCase` — ej. `ContactSection.astro`, `LeadGateModal.tsx`.
- **Utilidades / helpers** (`.ts`): `camelCase` — ej. `zalantosSession.ts`, aunque el archivo `api.ts` es descriptivo genérico.
- **Constantes exportadas:** `UPPER_SNAKE_CASE` o `PascalCase` para objetos de configuración — ej. `CONSENT_VERSION`, `STORAGE_KEYS`, `COLORS`.
- **Slugs de blog / landing:** `kebab-case` descriptivo, en español, orientado a SEO — ej. `datos-ai-ready-proyecto-ia-fracaso`.

## Estructura de carpetas

Seguir la organización existente (ver `docs/context/context-extended.md`):

- `src/pages/` — solo rutas; lógica compleja se delega a componentes o a `src/lib/`.
- `src/components/sections/` — secciones de home, un archivo `.astro` por sección.
- `src/components/chat/` — todo lo del Consultor IA.
- `src/components/ui/` — componentes atómicos reutilizables, sin lógica de negocio.
- `src/lib/` — helpers puros y capa de API; sin JSX.
- `src/types/` — tipos compartidos; re-exportados desde `src/types/index.ts`.
- `src/content/blog/` — contenido, no código.
- `src/data/landingCampaigns/` — copy tipado, no componentes.

No crear carpetas nuevas de alto nivel (`app/`, `server/`, `pages/api/`, etc.) sin que el usuario lo pida — no aplican al patrón Astro estático de este proyecto.

## Manejo de errores

Seguir el patrón de `src/lib/api.ts`:

- Errores de red/negocio se representan con la clase `ApiError` (código, mensaje, status, detalle opcional).
- La traducción de código de error → acción de UI se centraliza en `getErrorMapping()`, no se duplica lógica de mapeo en los componentes.
- Usar `AbortController` + timeout para cualquier llamada `fetch` nueva a servicios externos (siguiendo `postJson()`).
- No usar `try/catch` silencioso: siempre relanzar como `ApiError` o loggear con `console.error` con contexto suficiente para depurar.

## Validación

- El único punto de validación estructurada hoy es el schema Zod del blog (`src/content/config.ts`). Si se agrega un formulario o payload nuevo, preferir Zod para mantener consistencia, aunque hoy `LeadGateModal` valida de forma simple en el componente.
- Validar siempre `typeof window !== 'undefined'` antes de tocar `localStorage` (patrón ya usado en `zalantosSession.ts` para seguridad SSR/build).

## Logging

- `console.log`/`console.error` con prefijo `[API]` es el patrón actual en `src/lib/api.ts`. Mantenerlo para nuevos logs relacionados a la capa de API.
- No loggear contenido completo de mensajes de usuario o datos personales innecesarios; preferir metadata (longitudes, ids, status codes), como ya se hace.
- No hay servicio de logging centralizado (Sentry, etc.); los logs solo son visibles en la consola del navegador del usuario final. Tenerlo en cuenta al decidir qué es útil loggear.

## Tipos / interfaces

- TypeScript estricto (`astro/tsconfigs/strict`). No usar `any` salvo con justificación clara (hoy existen algunos `unknown`/casts explícitos en `api.ts`, documentados con comentarios).
- Tipos compartidos van en `src/types/*.types.ts` y se re-exportan desde `src/types/index.ts`. Importar desde `@/types`, no desde el archivo interno directamente, para mantener el patrón existente.
- Preferir `interface` para props de componentes React/Astro; `type` para uniones y alias.

## Servicios / capas

- `src/lib/api.ts` es la única capa de comunicación con el backend externo. No duplicar llamadas `fetch` sueltas en componentes.
- `src/lib/zalantosSession.ts` es la única fuente de verdad para leer/escribir `localStorage` relacionado a sesión/lead.
- No reintroducir ni extender `src/services/chatService.ts` (legacy).

## Migraciones

No aplica — no hay base de datos ni ORM en este repo.

## Variables de entorno

- El proyecto no usa variables de entorno de build/runtime salvo `process.env.NODE_ENV` (lectura, no configuración). No agregar nuevas variables de entorno para configurar URLs de servicios: seguir el patrón de constantes explícitas en `src/lib/constants.ts`, salvo que el usuario pida explícitamente introducir un mecanismo de env vars (lo cual implicaría también actualizar `docs/operations/env-vars.md` y el pipeline de build).

## Estilo (commits / PRs)

- Commits en español, en modo imperativo/descriptivo breve, consistente con el historial (`git log`) — ej. "cambios en logo", "blog post nuevo".
- Un PR/commit por tipo de cambio: no mezclar cambios de contenido marketing con cambios de infraestructura/deploy en el mismo commit salvo que sean inseparables.
- Usar `.github/pull_request_template.md` para todo PR — ver checklist de documentación a actualizar.
