'use client'

import { useEffect, useState, Suspense } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ChatPanel from '@/components/chat/ChatPanel'
import OnboardingPanel from '@/components/chat/OnboardingPanel'
import LeadGateModal from '@/components/LeadGateModal'
import { getLeadContext } from '@/lib/zalantosSession'

export default function ConsultorIAPage() {
  const [isReady, setIsReady] = useState(false)
  const [pageUrl, setPageUrl] = useState('')
  const [exampleToFill, setExampleToFill] = useState<string | null>(null)

  // Forzar scroll al inicio cuando se monta la página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    
    // Verificar si el usuario ya está registrado
    const context = getLeadContext()
    setIsReady(!!context)
    
    // Capturar URL de la página
    setPageUrl(window.location.href)
  }, [])

  // Manejar clic en ejemplo desde el panel de onboarding
  const handleExampleClick = (example: string) => {
    if (!isReady) {
      // Si no está listo, guardar para después del registro
      setExampleToFill(example)
      return
    }
    // Pasar al ChatPanel a través de un key trick o callback
    setExampleToFill(example)
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Suspense fallback={<div className="h-16 md:h-20" />}>
        <Navbar />
      </Suspense>
      
      {/* Espacio para navbar fijo */}
      <div className="h-16 md:h-20" />
      
      <main className="flex-1 w-full px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-10">
        {/* Header de la página */}
        <div className="max-w-[1200px] mx-auto mb-6 md:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-cyan-100 to-violet-100 rounded-full w-fit mb-4">
            <svg
              className="w-5 h-5 text-violet-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wide text-violet-900">
              Consultor IA · beta
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B2A3C] leading-tight">
              Consultor IA de Zalantos
            </h1>
            <p className="text-base sm:text-lg text-[#6F7A83] max-w-[720px]">
              Resuelve tus dudas sobre análisis de datos, implementación de IA y transformación digital con un asistente que entiende tu contexto y responde con claridad.
            </p>
          </div>
        </div>

        {/* Layout principal - 2 columnas en desktop, stack en mobile */}
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[38%_1fr] gap-6 md:gap-8 items-stretch">
            {/* Mobile: Chat primero (order-1), Desktop: Panel onboarding a la izquierda */}
            <aside className="order-2 md:order-1">
              <OnboardingPanel onExampleClick={handleExampleClick} />
            </aside>

            {/* Mobile: Chat arriba (order-1), Desktop: Chat a la derecha (order-2) */}
            <section className={`order-1 md:order-2 ${!isReady ? 'pointer-events-none opacity-60' : 'opacity-100'} transition-opacity duration-300`}>
              <ChatPanel
                isReady={isReady}
                onRegistrationRequired={() => setIsReady(false)}
                exampleToFill={exampleToFill}
              />
            </section>
          </div>
        </div>

        <LeadGateModal 
          pageUrl={pageUrl} 
          onReady={() => {
            setIsReady(true)
            // Si había un ejemplo pendiente, se pasará automáticamente
          }} 
        />
      </main>

      <Footer />
    </div>
  )
}

