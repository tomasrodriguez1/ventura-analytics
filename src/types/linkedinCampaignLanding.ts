/**
 * Definición compartida para plantillas LinkedIn.
 * El layout se construye en `LinkedInCampaignLanding`; aquí solo describes contenido.
 */

export type LinkedInCampaignCta = {
  label: string
  href: string
}

export type LinkedInCampaignVisualStep = {
  label: string
  detail?: string
}

export type LinkedInCampaignContent = {
  eyebrow: string
  headline: string
  subheadline: string
  /** Mostrar hasta 3 bullets en el layout. Si pasas más, se muestran los 3 primeros. */
  bullets: string[]
  primaryCta: LinkedInCampaignCta
  secondaryCta?: LinkedInCampaignCta
  chips: string[]
  trustLine?: string
  visual: {
    title: string
    subtitle?: string
    badge?: string
    steps: LinkedInCampaignVisualStep[]
  }
  links: {
    siteUrl?: string
    /**
     * Texto del enlace discreto del header.
     * Para ocultarlo, deja esta propiedad como cadena vacía.
     */
    backToSiteLabel?: string
  }
  meta?: {
    title: string
    description: string
  }
  footerLine?: string
}
