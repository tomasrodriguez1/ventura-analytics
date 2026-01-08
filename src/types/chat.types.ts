/**
 * Tipos relacionados con el chat widget
 */

import type { ConsentData } from './session.types'

// Mensaje individual del chat
export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  failed?: boolean // Marca si el mensaje falló al enviarse
  originalPayload?: ChatMessagePayload // Para poder reintentar
}

// Payload para enviar un mensaje al chat
export interface ChatMessagePayload {
  message: string
  session_id: string
  lead_session_id?: string
  page: string
  consent: ConsentData
}

// Datos para reintentar un mensaje
export interface RetryMessageData {
  messageId: string
  payload: ChatMessagePayload
}

// Props del componente AiChatWidget
export interface AiChatWidgetProps {
  isReady: boolean
  onRegistrationRequired: () => void
}
