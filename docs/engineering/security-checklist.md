# Checklist de seguridad

Adaptado a un sitio estático sin backend/DB propios. Muchos ítems típicos (RLS, auth de sesión server-side, etc.) no aplican; se marcan como N/A con justificación.

## Datos sensibles

- [x] Datos personales manejados: nombre, apellido, email (capturados en `LeadGateModal.tsx`, enviados directo al Worker externo vía `registerLead()`).
- [x] Este repo **no persiste** datos personales — no hay DB ni logs de servidor propios que los almacenen.
- [ ] `GAP:` confirmar política de retención/borrado de datos en el Cloudflare Worker externo (fuera del alcance de este repo).
- [x] No commitear el archivo `mock_pagina_web.pdf` ni ningún archivo con datos reales de leads/clientes al repo (verificar antes de cualquier commit de adjuntos).
- [x] `.gitignore` excluye `.env` y `.env.production` (aunque hoy no se usan, se mantiene la protección por si se introducen).

## Autenticación

- [ ] N/A — no hay autenticación de usuarios en este proyecto (sitio de marketing sin login).
- [x] El único "gate" es el registro de lead antes de habilitar el chat; no es autenticación, es captura de contacto + consentimiento.

## Autorización

- [ ] N/A — no hay roles ni permisos en este repo.

## Base de datos

- [ ] N/A — no hay base de datos en este repositorio.

## Storage

- [ ] N/A — no hay storage de archivos de usuario gestionado por este repo.
- [x] Assets en `public/` son solo estáticos de marca (imágenes, íconos); no subir ahí archivos con datos de clientes.

## APIs

- [x] Las únicas llamadas HTTP salientes van al Cloudflare Worker (leads/chat), con timeout y `AbortController` (`postJson()` en `src/lib/api.ts`).
- [x] No se envían credenciales ni tokens desde el cliente hacia el Worker (endpoint público).
- [ ] `GAP:` confirmar si el Worker valida origen/CORS o aplica rate limiting — no verificable desde este repo.
- [x] Todas las respuestas del backend se parsean de forma segura (`try/catch` al hacer `JSON.parse`, ver `postJson()`); no se asume estructura sin validar antes de usar campos.

## Logs

- [x] Los logs actuales (`console.log`/`console.error` en `src/lib/api.ts`) no incluyen el contenido completo de mensajes de chat, solo metadata (`message_length`, ids, status).
- [x] No loggear el email/nombre completo del lead más allá de lo ya presente (`isDev` gate para logs detallados en desarrollo).
- [ ] Antes de agregar nuevos logs: verificar que no se registre PII innecesaria, incluso en modo desarrollo.

## Proveedores de IA

- [ ] N/A directo — este repo no llama a proveedores de IA (OpenAI/Anthropic) por SDK; la lógica del "Consultor IA" vive en el Worker externo. `src/pages/privacy.astro` menciona proveedores de IA en el texto legal — verificar que ese texto siga siendo preciso si cambia el backend.

## Variables de entorno

- [x] No hay secretos de aplicación en `.env` (el sitio no los necesita).
- [x] El deploy a Cloudflare Pages no requiere secrets FTP; `NODE_VERSION` en Pages no es un secreto.
- [x] Los secrets legacy `CPANEL_*` deben eliminarse de GitHub Actions tras el cutover (ya no se usan).
- [ ] Verificar periódicamente que ningún commit futuro incluya secretos en texto plano.

## Checklist de producción

- [ ] Antes de cada deploy: confirmar que `CONSENT_VERSION` (`constants.ts`) está sincronizada con el texto vigente de `src/pages/privacy.astro`.
- [ ] Confirmar que `WORKER_BASE_URL` apunta al Worker correcto (no a un entorno de pruebas) antes de mergear a `main`.
- [ ] Confirmar que no se subieron archivos temporales o de datos reales de leads a `public/` o al repo.

## Checklist de despliegue

- [ ] El proyecto Cloudflare Pages está conectado a este repo, branch `main`, build `npm run build`, output `dist`, Node 20.
- [ ] Custom domains `zalantos.com` / `www` + redirect www → apex configurados.
- [ ] Secrets `CPANEL_*` eliminados de GitHub Actions (si aún existían).
- [ ] CI (`.github/workflows/ci.yml`) en verde en el commit desplegado.
