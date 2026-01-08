# Sistema de Manejo de Errores - Frontend

## Descripción General

Este documento describe el sistema completo de manejo de errores implementado para el frontend de Ventura Analytics, que se comunica con endpoints n8n detrás de Cloudflare Workers.

## Arquitectura

### 1. Clase ApiError (`/src/lib/api.ts`)

```typescript
class ApiError extends Error {
  code: string        // Código de error (ej: 'rate_limited', 'network_error')
  status?: number     // HTTP status code
  detail?: string     // Detalles técnicos (no se muestran al usuario)
}
```

### 2. Helpers de Normalización

#### `normalizeApiPayload(payload: any): any`

Normaliza respuestas que pueden venir en diferentes formatos:
- **Array**: `[{ ok: true, output: "..." }]` → extrae `payload[0]`
- **Wrapper**: `{ body: {...} }` o `{ data: {...} }` → extrae el contenido
- **Objeto plano**: lo retorna tal cual

#### `postJson<T>(url, body, timeoutMs): Promise<{ status, data }>`

Helper para hacer POST con:
- **Timeout**: 20 segundos por defecto usando `AbortController`
- **Parsing seguro**: maneja JSON inválido
- **Errores de red**: detecta timeout, network failures, CORS

### 3. Mapper de Errores

#### `getErrorMapping(code, status, backendMessage, detail): ErrorMapping`

Mapea códigos de error a acciones UI:

| Código/Status | Acción UI | Comportamiento |
|---------------|-----------|----------------|
| `registration_required` (403) | `modal` | Abre LeadGateModal automáticamente |
| `out_of_scope` (422) | `assistant_message` | Renderiza como mensaje del asistente (NO error) |
| `blocked_content` (403) | `assistant_message` | Renderiza como mensaje del asistente (NO error) |
| `rate_limited` (429) | `rate_limit` | Banner + deshabilitar envío 30s |
| `invalid_request` (400) | `inline` | Error inline con detalle |
| `consent_required` (400) | `inline` | Marca checkbox + mensaje |
| `unauthorized` (401) | `banner` | Banner "Servicio no disponible" |
| `server_misconfig` / 5xx | `banner` | Banner "Servicio no disponible" |
| `network_error` | `inline` | Mensaje + botón "Reintentar" |
| `bad_response` | `banner` | Log técnico + mensaje genérico |

## Endpoints

### POST /lead/register

**Payload:**
```json
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "page": "string",
  "session_id": "string",
  "consent": {
    "privacy": true,
    "consent_version": "string",
    "consented_at": "ISO8601"
  }
}
```

**Respuesta exitosa:**
```json
{
  "ok": true,
  "lead_id": "string",
  "lead_session_id": "string",
  "session_id": "string"
}
```

**Respuesta de error:**
```json
{
  "ok": false,
  "error": "consent_required|invalid_request|...",
  "message": "Mensaje descriptivo",
  "detail": "Detalles técnicos (opcional)"
}
```

### POST /chat

**Payload:**
```json
{
  "message": "string",
  "session_id": "string",
  "lead_session_id": "string",
  "page": "string",
  "consent": { ... }
}
```

**Respuesta exitosa:**
```json
{
  "ok": true,
  "output": "string"  // o "response"
}
```

**Respuesta de error:**
```json
{
  "ok": false,
  "error": "out_of_scope|blocked_content|rate_limited|...",
  "message": "Mensaje descriptivo"
}
```

**Casos especiales (NO son errores):**
- `out_of_scope`: Se renderiza como mensaje del asistente
- `blocked_content`: Se renderiza como mensaje del asistente

## Componentes

### LeadGateModal

**Manejo de errores:**
- `consent_required`: Desmarca checkbox + mensaje inline
- `invalid_request`: Muestra detalle inline
- `network_error`: "Problema de conexión"
- `401` / `5xx`: "Servicio no disponible"
- **NO cierra el modal** si hay error

### AiChatWidget

**Estados:**
- `error`: Error inline (debajo del chat)
- `bannerError`: Banner persistente para errores graves
- `rateLimitedUntil`: Timestamp hasta cuando está bloqueado
- `rateLimitCountdown`: Contador visual en segundos

**Características:**

1. **Rate Limiting**
   - Al recibir 429, activa contador de 30 segundos
   - Deshabilita input y botón de envío
   - Muestra banner amarillo con countdown
   - Se auto-resetea al llegar a 0

2. **Retry de Mensajes**
   - Mensajes con `network_error` se marcan como `failed: true`
   - Cambia color de burbuja a rojo claro
   - Muestra botón "Reintentar" con ícono
   - Guarda `originalPayload` en el mensaje
   - Al reintentar, usa el mismo payload

3. **Mensajes del Asistente**
   - `out_of_scope` y `blocked_content` se renderizan como respuestas normales
   - NO se muestran como errores técnicos
   - Mantienen el flujo conversacional

4. **Banners**
   - Errores graves (401, 5xx) → banner rojo persistente
   - Rate limiting → banner amarillo con countdown
   - Botón X para cerrar banner de errores graves

## Flujo de Errores

### Registro (LeadGateModal)

```
Usuario envía formulario
  ↓
registerLead() en api.ts
  ↓
postJson() con timeout 20s
  ↓
normalizeApiPayload()
  ↓
¿Éxito?
  ├─ SÍ → Guardar contexto → Cerrar modal
  └─ NO → ApiError
           ↓
         getErrorMapping()
           ↓
         Mostrar error según mapping
         (NO cerrar modal)
```

### Chat (AiChatWidget)

```
Usuario envía mensaje
  ↓
Verificar rate limiting
  ↓
sendChatMessage() en api.ts
  ↓
postJson() con timeout 20s
  ↓
normalizeApiPayload()
  ↓
¿out_of_scope o blocked_content?
  ├─ SÍ → Retornar como respuesta válida
  │        con _handled_as_assistant: true
  │        ↓
  │      Renderizar como mensaje del asistente
  │
  └─ NO → ¿Éxito?
           ├─ SÍ → Renderizar respuesta
           └─ NO → ApiError
                    ↓
                  getErrorMapping()
                    ↓
                  ¿Qué acción?
                    ├─ modal → Abrir LeadGateModal
                    ├─ rate_limit → Activar contador 30s
                    ├─ network_error → Marcar mensaje failed + botón retry
                    ├─ banner → Mostrar banner persistente
                    └─ inline → Mostrar error debajo del chat
```

## Mensajes al Usuario

### ✅ Mensajes Amigables (NO técnicos)

- "Debes aceptar la política de privacidad para continuar"
- "Problema de conexión. Verifica tu red e intenta nuevamente."
- "Demasiados mensajes. Espera 30 segundos e intenta nuevamente."
- "Servicio temporalmente no disponible. Intenta más tarde."
- "Este consultor está limitado a IA, automatización, datos y eficiencia..."

### ❌ NUNCA Mostrar

- Stack traces
- Mensajes SQL
- Detalles de implementación (ej: "lead_id inválido en respuesta")
- JSON raw del backend
- Errores de parsing

Los detalles técnicos se guardan en `ApiError.detail` y se loguean en consola, pero NO se muestran al usuario.

## Testing

### Casos a Probar

1. **Registro exitoso**
   - Respuesta como objeto plano
   - Respuesta como array `[{ ok: true, ... }]`

2. **Registro fallido**
   - `consent_required`: checkbox desmarcado + mensaje
   - `invalid_request`: mensaje inline con detalle
   - `network_error`: mensaje de conexión
   - `401` / `500`: mensaje de servicio no disponible

3. **Chat exitoso**
   - Respuesta con `output`
   - Respuesta con `response`
   - Respuesta como array

4. **Chat con casos especiales**
   - `out_of_scope`: renderiza como asistente
   - `blocked_content`: renderiza como asistente

5. **Chat con errores**
   - `registration_required`: abre modal
   - `rate_limited`: banner + contador 30s
   - `network_error`: mensaje failed + botón retry
   - `401` / `500`: banner persistente

6. **Rate Limiting**
   - Deshabilita input y botón
   - Muestra countdown
   - Se auto-resetea a los 30s

7. **Retry**
   - Mensaje marcado como failed
   - Botón "Reintentar" visible
   - Reenvía mismo payload
   - Desmarca failed al reintentar

## Logs

### Desarrollo

```javascript
console.log('[API] Registrando lead:', { ... })
console.log('[API] Respuesta registro (raw):', rawData)
console.log('[API] Registro exitoso:', { lead_id, ... })
console.error('[API] Error en registro:', error)
```

### Producción

Solo errores críticos:
```javascript
console.error('[API] bad_response - detail:', detail)
console.error('[API] Payload normalizado inválido:', normalized)
```

## Seguridad

1. **Sanitización HTML**: Todos los mensajes del asistente pasan por `DOMPurify.sanitize()`
2. **No exponer detalles técnicos**: `ApiError.detail` solo en consola
3. **Validación de campos**: Verificar `lead_id`, `lead_session_id`, etc.
4. **Timeout**: Prevenir requests colgados (20s máximo)

## Mantenimiento

### Agregar Nuevo Código de Error

1. Agregar caso en `getErrorMapping()` en `/src/lib/api.ts`
2. Definir `userMessage` y `action`
3. Si es caso especial, manejar en componente correspondiente
4. Actualizar esta documentación

### Cambiar Timeout

Modificar el tercer parámetro de `postJson()`:
```typescript
await postJson(url, body, 30000) // 30 segundos
```

### Cambiar Duración de Rate Limiting

En `AiChatWidget.tsx`:
```typescript
setRateLimitedUntil(Date.now() + 60000) // 60 segundos
```
