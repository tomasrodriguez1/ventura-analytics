import { STORAGE_KEYS } from './constants'
import type { LeadContext, SaveLeadContextData } from '@/types'

/**
 * Genera o recupera el session_id persistente
 */
export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return '' // SSR safety

  let sessionId = localStorage.getItem(STORAGE_KEYS.SESSION_ID)
  
  if (!sessionId) {
    // Generar nuevo session_id: sess_timestamp_random
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 15)
    sessionId = `sess_${timestamp}_${random}`
    localStorage.setItem(STORAGE_KEYS.SESSION_ID, sessionId)
  }
  
  return sessionId
}

/**
 * Recupera el contexto completo del lead desde localStorage
 * Retorna null si falta algún dato requerido
 */
export function getLeadContext(): LeadContext | null {
  if (typeof window === 'undefined') return null // SSR safety

  const session_id = localStorage.getItem(STORAGE_KEYS.SESSION_ID)
  const lead_id = localStorage.getItem(STORAGE_KEYS.LEAD_ID)
  const lead_session_id = localStorage.getItem(STORAGE_KEYS.LEAD_SESSION_ID)
  const consent_version = localStorage.getItem(STORAGE_KEYS.CONSENT_VERSION)
  const consented_at = localStorage.getItem(STORAGE_KEYS.CONSENTED_AT)

  // Si falta algún dato crítico, retornar null
  if (!session_id || !lead_id || !lead_session_id || !consent_version || !consented_at) {
    return null
  }

  return {
    session_id,
    lead_id,
    lead_session_id,
    consent: {
      privacy: true,
      consent_version,
      consented_at,
    },
  }
}

/**
 * Guarda el contexto del lead en localStorage
 */
export function saveLeadContext(data: SaveLeadContextData): void {
  if (typeof window === 'undefined') return // SSR safety

  localStorage.setItem(STORAGE_KEYS.SESSION_ID, data.session_id)
  localStorage.setItem(STORAGE_KEYS.LEAD_ID, data.lead_id)
  localStorage.setItem(STORAGE_KEYS.LEAD_SESSION_ID, data.lead_session_id)
  localStorage.setItem(STORAGE_KEYS.CONSENT_VERSION, data.consent.consent_version)
  localStorage.setItem(STORAGE_KEYS.CONSENTED_AT, data.consent.consented_at)
}

/**
 * Limpia el contexto del lead (útil para debug o logout)
 */
export function clearLeadContext(): void {
  if (typeof window === 'undefined') return // SSR safety

  localStorage.removeItem(STORAGE_KEYS.LEAD_ID)
  localStorage.removeItem(STORAGE_KEYS.LEAD_SESSION_ID)
  localStorage.removeItem(STORAGE_KEYS.CONSENT_VERSION)
  localStorage.removeItem(STORAGE_KEYS.CONSENTED_AT)
  // Nota: no borramos SESSION_ID para mantener tracking de sesión
}
