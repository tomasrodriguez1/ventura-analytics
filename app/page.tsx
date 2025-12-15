'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Pillars from '@/components/sections/Pillars'
import Process from '@/components/sections/Process'
import Clients from '@/components/sections/Clients'
import UseCases from '@/components/sections/UseCases'
import CTAFinal from '@/components/sections/CTAFinal'
import AboutSection from '@/components/sections/AboutSection'
import ContactSection from '@/components/sections/ContactSection'

function PageContent() {
  // ⚠️ MODIFICADO: Usar useSearchParams() del cliente para compatibilidad con export estático
  // En export estático, los searchParams del servidor no están disponibles
  const searchParams = useSearchParams()
  const sectionParam = searchParams.get('section')
  const section = sectionParam && ['home', 'about', 'contact'].includes(sectionParam)
    ? sectionParam
    : 'home'

  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-inter)]">
      <Suspense fallback={<div className="h-16" aria-label="Cargando navegación" />}>
        <Navbar />
      </Suspense>
      <main id="main-content" className="flex-grow w-full pt-20">
        {section === 'home' && (
          <>
            <Hero />
            <Pillars />
            <Process />
            <Clients />
            <UseCases />
            <CTAFinal />
          </>
        )}
        {section === 'about' && <AboutSection />}
        {section === 'contact' && <ContactSection />}
      </main>
      <Footer />
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <PageContent />
    </Suspense>
  )
}
