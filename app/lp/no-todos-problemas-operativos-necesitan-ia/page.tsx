import type { Metadata } from 'next'
import LinkedInCampaignLanding from '@/components/landing/LinkedInCampaignLanding'
import { landingContent } from '@/data/landingCampaigns/no-todos-problemas-operativos-necesitan-ia'

export const metadata: Metadata = {
  title: landingContent.meta?.title ?? 'Campaña Zalantos',
  description:
    landingContent.meta?.description ??
    'Landing enfocada en Sprint 0 y diagnóstico operativo de Zalantos.',
  openGraph: landingContent.meta
    ? {
        title: landingContent.meta.title,
        description: landingContent.meta.description,
      }
    : undefined,
}

export default function NoTodosProblemasOperativosLanding() {
  return <LinkedInCampaignLanding content={landingContent} />
}
