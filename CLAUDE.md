# CLAUDE.md — Instrucciones para Claude Code (ventura-analytics / zalantos-astro)

Este archivo complementa `AGENTS.md` con instrucciones específicas para Claude Code trabajando en este repositorio. Las reglas de `AGENTS.md` aplican igual; léelo primero.

## Política de carga de contexto

No cargues todo `docs/` de una vez. Sigue la política progresiva definida en `AGENTS.md` §2: empieza por `docs/context/context.md`, `docs/context/data_model_context.md`, `docs/architecture/architecture.md` y `AGENTS.md`, y solo abre documentos adicionales cuando la tarea concreta los necesite.

## Expectativas de planificación

- Para tareas de **una sola línea o un solo archivo** (ej. corregir un texto, ajustar un color, arreglar un typo del blog): edita directamente, sin plan previo extenso.
- Para tareas que tocan **múltiples archivos o un flujo completo** (ej. nueva landing, cambio en el flujo del Consultor IA, nueva sección de home): antes de escribir código, resume en 3-6 líneas qué archivos vas a tocar y por qué, siguiendo los patrones existentes (ver `docs/context/context-extended.md`).
- Para tareas **arquitectónicas** (agregar backend, DB, auth, cambiar el hosting/deploy): usa modo de planificación explícito y valida con el usuario antes de ejecutar, y registra la decisión en `docs/architecture/decisions.md`.

## Reporte de archivos modificados

Al terminar cualquier tarea, indica explícitamente:

- Qué archivos se crearon, modificaron o eliminaron (rutas completas).
- Si se tocó algún contrato externo (Cloudflare Worker, GA4, Calendly, n8n) o el workflow de deploy.
- Cualquier `GAP:` detectado que no se pudo resolver con evidencia del repo.

## Tareas pequeñas vs. tareas grandes

- **Pequeñas** (copy, estilos puntuales, un componente): implementa directo, verifica visualmente si es posible, y listo.
- **Grandes** (nueva sección de arquitectura, refactor de `src/lib/api.ts`, cambio del pipeline de deploy): divide en pasos, usa todo list si el entorno lo soporta, y no mezcles con cambios no relacionados.

## Prohibiciones específicas para Claude Code

- No ejecutes comandos de deploy real (push a `main` que dispare Pages, Retry de production en Cloudflare) sin confirmación explícita del usuario.
- No modifiques `.github/workflows/ci.yml` ni la documentación de deploy de Pages sin explicar el impacto en producción.
- No agregues código de backend, base de datos o auth "por si acaso" — este proyecto es intencionalmente estático.
- No borres contenido de `docs/`, `context.md` ni de los `GUIA_ESTILOS_*.md` aunque parezca obsoleto; márcalo como `GAP:` o "obsoleto" en vez de eliminarlo.

## Requisitos de actualización de documentación

Si el cambio afecta:

- Rutas o estructura de páginas → actualizar `docs/context/context.md` y, si aplica, `src/pages/sitemap.xml.ts`.
- El modelo de contenido del blog o el modelo de sesión/lead → actualizar `docs/context/data_model_context.md`.
- Arquitectura o integraciones → actualizar `docs/architecture/architecture.md`, `docs/architecture/decisions.md` o `docs/architecture/integrations.md` según corresponda.
- Deploy o variables/secrets → actualizar `docs/operations/deployment.md` y `docs/operations/env-vars.md`.

Usa el checklist de `.github/pull_request_template.md` como referencia de qué documentos revisar antes de cerrar una tarea.
