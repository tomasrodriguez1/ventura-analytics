/**
 * Tipos relacionados con las respuestas de la API
 */

// Respuesta del registro de leads
export interface RegisterLeadResponse {
  ok: boolean
  session_id: string
  lead_id: string
  lead_session_id: string
  message?: string
  error?: string
}

// Respuesta de mensajes del chat
export interface ChatMessageResponse {
  ok?: boolean
  response?: string
  output?: string
  error?: string
  message?: string
  _handled_as_assistant?: boolean // Flag especial para out_of_scope y blocked_content
}

// Mapeo de errores a acciones de UI
export interface ErrorMapping {
  userMessage: string
  action: 'inline' | 'toast' | 'banner' | 'modal' | 'assistant_message' | 'rate_limit'
  shouldOpenModal?: boolean
  shouldRenderAsAssistant?: boolean
  assistantMessage?: string
}

// Respuesta genérica de fetch
export interface FetchResponse<T = unknown> {
  status: number
  data: T
}

// Payload normalizado (puede ser cualquier estructura válida de JSON)
export type NormalizedPayload = Record<string, unknown> | null

// Tipo para payloads desconocidos que necesitan normalización
export type UnknownApiPayload = unknown
