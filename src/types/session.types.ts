/**
 * Tipos relacionados con la gestión de sesiones y consentimientos
 */

// Datos de consentimiento del usuario
export interface ConsentData {
  privacy: boolean
  consent_version: string
  consented_at: string
}

// Contexto completo del lead
export interface LeadContext {
  session_id: string
  lead_id: string
  lead_session_id: string
  consent: ConsentData
}

// Datos para guardar el contexto del lead
export interface SaveLeadContextData {
  session_id: string
  lead_id: string
  lead_session_id: string
  consent: ConsentData
}
