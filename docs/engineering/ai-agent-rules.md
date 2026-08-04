# Reglas para agentes de IA (detalle técnico)

Este documento complementa `AGENTS.md` (reglas generales) con el detalle técnico de cómo un agente debe operar en este repositorio. Si hay conflicto, `AGENTS.md` es la fuente de verdad de alto nivel; este archivo es el detalle operativo.

## Reglas de carga de contexto

Ver política completa en `AGENTS.md` §2. Regla base: nunca leer todo `docs/` de entrada; leer `docs/context/context.md` + `docs/context/data_model_context.md` + `docs/architecture/architecture.md` + `AGENTS.md`, y expandir solo según el tipo de tarea.

## Protocolo de modificación de código

1. Leer completo cualquier archivo antes de editarlo (no fragmentos).
2. Identificar el patrón existente más cercano (sección de home, landing de campaña, componente UI, etc.) y seguirlo.
3. Preferir editar archivos existentes sobre crear nuevos, salvo que la tarea explícitamente requiera un archivo nuevo (nueva página, nuevo componente, nuevo artículo de blog).
4. No tocar `src/services/chatService.ts` (legacy) — la capa activa es `src/lib/api.ts`.
5. Si el cambio afecta tipos compartidos (`src/types/`), actualizarlos junto con el código que los usa.

## Reglas de reporte

Al finalizar una tarea, un agente debe reportar:

- Lista de archivos creados/modificados/eliminados con ruta completa.
- Si se tocó algún contrato externo (Worker, GA4, Calendly) o el pipeline de deploy.
- Cualquier `GAP:` o supuesto (`(supuesto: ...)`) introducido.
- Si corresponde, qué documentos de `docs/` se actualizaron como consecuencia.

## Prohibiciones

- No inventar campos de datos, endpoints o entidades que no existan en el código.
- No modificar dependencias (`package.json`) sin justificación explícita y sin que el usuario lo apruebe.
- No modificar `.github/workflows/ci.yml` ni disparar despliegues reales a Cloudflare Pages sin confirmación.
- No exponer secretos en código, logs o documentación.
- No eliminar documentación existente; marcar contenido obsoleto en vez de borrarlo.
- No mezclar refactors grandes con features o fixes puntuales en el mismo cambio, salvo pedido explícito.

## Reglas de documentación

- Cambios de rutas/páginas → reflejar en `docs/context/context.md` y en `src/pages/sitemap.xml.ts` si es una página pública estática.
- Cambios en el modelo de contenido de blog o en el modelo de sesión/lead → reflejar en `docs/context/data_model_context.md`.
- Cambios de arquitectura, dependencias, infraestructura o integraciones → reflejar en `docs/architecture/decisions.md` y/o `docs/architecture/integrations.md`.
- Cambios significativos → agregar entrada en `CHANGELOG.md` bajo `Unreleased`.

## Reglas de testing

No existe suite de tests en este repo (ver `docs/engineering/testing-strategy.md`). Un agente que agregue lógica no trivial (ej. nuevas validaciones en `api.ts`, nuevos flujos de error) debe:

- Verificar manualmente con `npm run dev` y, si aplica, `npm run build && npm run preview`.
- Documentar en su reporte qué se verificó manualmente, ya que no hay cobertura automatizada que lo confirme.

## Reglas de seguridad

Ver `docs/engineering/security-checklist.md` para el detalle. Puntos clave para un agente:

- Nunca hardcodear secretos en código; la config de Pages (`NODE_VERSION`) no es un secreto. Los legacy `CPANEL_*` no deben reintroducirse.
- El único dato personal manejado por el frontend es el que el usuario ingresa en `LeadGateModal` (nombre, apellido, email) y se envía directamente al Worker — no se persiste en este repo ni en ningún log de servidor propio.
- No registrar (`console.log`) datos personales completos en producción sin necesidad; revisar que los logs de `src/lib/api.ts` sean razonables (actualmente registran metadata, no el contenido íntegro de mensajes salvo `message_length`).

## Reglas de modelo de datos

Ver `docs/context/data_model_context.md`. Un agente no debe:

- Agregar campos al schema de blog (`src/content/config.ts`) sin actualizar `docs/context/data_model_context.md`.
- Cambiar las claves de `STORAGE_KEYS` sin considerar el impacto en sesiones ya guardadas de usuarios reales.

## Reglas de IA / prompts

No aplica directamente: este repo no contiene lógica de IA/LLM propia (el "Consultor IA" es solo el frontend; la lógica del asistente vive en el Worker externo, fuera de este repo). Si en el futuro se agrega lógica de prompts o llamadas a proveedores de IA dentro de este repo, debe documentarse aquí y en `docs/architecture/integrations.md`.
