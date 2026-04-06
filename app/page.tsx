import type { Metadata } from 'next'
import { Suspense } from 'react'
import HomeContent from '@/components/layout/HomeContent'

const title = 'Automatización IA para Empresas | Zalantos'
const description =
  'Zalantos diseña soluciones de inteligencia artificial, automatización de procesos y análisis de datos para empresas. Transformamos datos en decisiones.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://zalantos.com/' },
  keywords: [
    'inteligencia artificial empresas',
    'automatización procesos',
    'análisis datos',
    'IA para negocios',
    'zalantos',
  ],
  openGraph: { title, description, url: '/', type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <HomeContent />
    </Suspense>
  )
}
