// Constantes centralizadas para zalantos

export const BRAND = 'zalantos'

export const COLORS = {
  primary: '#0B2A3C',
  value: '#2FBF71',
  neutral: '#6F7A83',
  white: '#FFFFFF',
  accent: '#3FA9F5',
} as const

export const CONTACT_EMAIL = 'contacto@zalantos.com'

export const SITE_URL = 'https://zalantos.com'

export const LINKS = {
  home: '/',
  about: '/?section=about',
  contact: '/?section=contact',
  aiConsultant: '/consultor-ia',
} as const

export const SOCIAL_LINKS = {
  // TODO: Agregar cuando estén disponibles
  // twitter: '',
  // linkedin: '',
  // github: '',
} as const

// Worker API endpoints (hardcoded para static export)
export const WORKER_BASE_URL = 'https://silent-union-0457.tom-s-account-3d0.workers.dev'
export const LEAD_REGISTER_URL = `${WORKER_BASE_URL}/lead/register`
export const CHAT_API_URL = `${WORKER_BASE_URL}/chat`

// Versión de consentimiento
export const CONSENT_VERSION = '2026-01-07'

// Keys de localStorage para sesión
export const STORAGE_KEYS = {
  SESSION_ID: 'zalantos_session_id',
  LEAD_ID: 'zalantos_lead_id',
  LEAD_SESSION_ID: 'zalantos_lead_session_id',
  CONSENT_VERSION: 'zalantos_consent_version',
  CONSENTED_AT: 'zalantos_consented_at',
} as const
