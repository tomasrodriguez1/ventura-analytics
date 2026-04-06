import type { Metadata } from 'next'
import ConsultorIAContent from '@/components/chat/ConsultorIAContent'

export const metadata: Metadata = {
  title: 'Consultor IA de Zalantos — Análisis y automatización',
  description: 'Resuelve dudas sobre análisis de datos, IA y transformación digital con el Consultor IA de Zalantos. Respuestas claras y personalizadas para tu negocio.',
  keywords: ['consultor IA', 'inteligencia artificial empresas', 'análisis de datos', 'automatización', 'zalantos'],
  alternates: { canonical: '/consultor-ia' },
  openGraph: {
    title: 'Consultor IA de Zalantos — Análisis y automatización',
    description: 'Resuelve dudas sobre análisis de datos, IA y transformación digital con el Consultor IA de Zalantos.',
    url: '/consultor-ia',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Consultor IA de Zalantos',
    description: 'Resuelve dudas sobre análisis de datos, IA y transformación digital con el Consultor IA de Zalantos.',
  },
  robots: { index: true, follow: true },
}

export default function ConsultorIAPage() {
  return <ConsultorIAContent />
}
