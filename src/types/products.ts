export type ProductId = 'crm' | 'gestion-proyectos'

export type ProductAccent = 'blue' | 'green'

export interface ProductInsight {
  title: string
  href: string
}

export interface ProductContent {
  id: ProductId
  accent: ProductAccent
  name: string
  navLabel: string
  href: string
  contactHref: string
  shortHeadline: string
  headline: string
  subheadline: string
  supportLine?: string
  audience: string
  problemTitle: string
  problemText: string
  benefits: string[]
  capabilities: string[]
  heroImage: { src: string; alt: string; width: number; height: number }
  featureImage: { src: string; alt: string; width: number; height: number }
  workflowTitle: string
  workflowDescription: string
  workflow: string[]
  featureTitle: string
  featureDescription: string
  scenarioTitle: string
  scenarioText: string
  insights: ProductInsight[]
  meta: { title: string; description: string; ogImage: string }
}
