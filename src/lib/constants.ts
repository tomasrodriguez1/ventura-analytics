// Constantes centralizadas para zalantos

export const BRAND = 'zalantos'

export const COLORS = {
  primary: '#0B2A3C',
  value: '#2FBF71',
  neutral: '#6F7A83',
  white: '#FFFFFF',
  accent: '#3FA9F5',
} as const

export const CONTACT_EMAIL = 'remates.dev@gmail.com'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://zalantos.com'

export const LINKS = {
  home: '/',
  about: '/?section=about',
  contact: '/?section=contact',
} as const

export const SOCIAL_LINKS = {
  // TODO: Agregar cuando estén disponibles
  // twitter: '',
  // linkedin: '',
  // github: '',
} as const
