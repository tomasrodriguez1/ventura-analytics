/**
 * Punto de entrada centralizado para todos los tipos de la aplicación
 * Siguiendo principios SOLID: Single Responsibility, cada archivo de tipos
 * tiene una única responsabilidad bien definida
 */

// API Types
export type {
  RegisterLeadResponse,
  ChatMessageResponse,
  ErrorMapping,
  FetchResponse,
  NormalizedPayload,
  UnknownApiPayload,
} from './api.types'

// Session Types
export type {
  ConsentData,
  LeadContext,
  SaveLeadContextData,
} from './session.types'

// Chat Types
export type {
  Message,
  ChatMessagePayload,
  RetryMessageData,
  AiChatWidgetProps,
} from './chat.types'
