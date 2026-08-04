# Estrategia de testing

## Estado actual

`GAP:` este repositorio **no tiene tests automatizados**. No hay `*.test.ts`, `*.spec.ts`, carpetas `__tests__`/`e2e`, ni configuración de Jest, Vitest, Playwright o Cypress. No hay script `test` en `package.json`.

## Qué debe probarse siempre (manualmente, hoy)

Ante cualquier cambio, verificar manualmente antes de mergear/desplegar:

1. **Build limpio:** `npm run build` termina sin errores (Astro falla el build si un `.md` de blog no cumple el schema Zod, o si hay errores de TypeScript en código usado).
2. **Rutas clave cargan:** `npm run preview` y revisar `/`, `/blog/`, `/consultor-ia/`, `/privacy/`, `/sitemap.xml`, `/robots.txt`.
3. **Flujo del Consultor IA:** registrar un lead de prueba y enviar un mensaje de chat, confirmando que no hay errores en la consola del navegador y que la respuesta se renderiza.
4. **Sitemap actualizado:** si se agregó/quitó una página o post, confirmar que aparece/desaparece en `/sitemap.xml` tras el build.
5. **Sin regresiones visuales evidentes:** revisar responsive (mobile/desktop) de cualquier sección tocada.

## Qué puede probarse manualmente al principio (antes de invertir en automatización)

- Copys nuevos de blog o landings: revisión visual + lectura de contenido.
- Cambios de estilos/tokens: comparación visual antes/después.
- Cambios menores de UI (`src/components/ui/`): probar en al menos una página que los use.

## Cómo correr verificaciones hoy

```bash
npm install
npm run dev       # http://localhost:4321, verificación en caliente
npm run build     # valida que el build completo no falle
npm run preview   # sirve dist/ para probar el resultado final
```

No hay comando de "test" — `npm test` no existe en `package.json`.

## Casos críticos a vigilar manualmente

- **Registro de lead + chat:** es el flujo con más lógica (`src/lib/api.ts`, `LeadGateModal.tsx`, `zalantosSession.ts`). Cualquier cambio ahí debe probarse end-to-end manualmente contra el Worker real (o confirmar con el usuario si hay un entorno de pruebas del Worker).
- **Manejo de errores del chat:** verificar que los códigos de error (`registration_required`, `out_of_scope`, `blocked_content`, `rate_limited`, etc.) siguen mapeando a la acción de UI esperada tras cualquier cambio en `getErrorMapping()`.
- **Consentimiento:** si cambia `CONSENT_VERSION` o el texto de `privacy.astro`, confirmar que usuarios con consentimiento previo (versión antigua en `localStorage`) son tratados correctamente (hoy, cualquier mismatch de versión no está explícitamente validado más allá de la presencia del valor — revisar `getLeadContext()` antes de asumir comportamiento).
- **Build de sitemap:** cambios en `src/pages/sitemap.xml.ts` o en el listado de posts deben verificarse contra el conteo real de URLs esperado (el `README.md` y el workflow de CI mencionan un número de URLs esperado).

## Criterios mínimos antes de mergear

- El build (`npm run build`) pasa sin errores ni warnings de TypeScript nuevos.
- Las rutas afectadas se probaron manualmente en `npm run preview`.
- Si se tocó `src/lib/api.ts` o el flujo de leads/chat, se probó al menos un ciclo completo de registro + mensaje.
- La verificación de build del workflow de CI (`.github/workflows/ci.yml`, paso "Verify build output") sigue pasando — no eliminar archivos que ese paso valida (`dist/index.html`, `dist/_headers`, `dist/robots.txt`, `dist/sitemap.xml`, `dist/blog/index.html`, `dist/consultor-ia/index.html`, etc.) sin actualizar también el workflow.

## Gaps

- `GAP:` no hay tests automatizados de ningún tipo; toda validación es manual.
- `GAP:` no hay entorno de staging para probar contra un Worker de pruebas antes de producción.
- `GAP:` no hay linter configurado explícitamente más allá del `tsc` implícito de Astro (`GAP: confirmar si hay ESLint/Prettier configurado; no se encontró archivo de configuración en la raíz`).
