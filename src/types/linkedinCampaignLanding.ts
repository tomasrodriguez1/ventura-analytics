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
    backToSiteLabel?: string
  }
  meta?: {
    title: string
    description: string
  }
  footerLine?: string
  qualifySection?: {
    title: string
    bullets: string[]
  }
}
