'use client'

import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AiChatWidget from '@/components/chat/AiChatWidget'
import LeadGateModal from '@/components/LeadGateModal'
import { getLeadContext } from '@/lib/zalantosSession'

export default function ConsultorIAPage() {
  const [isReady, setIsReady] = useState(false)
  const [pageUrl, setPageUrl] = useState('')

  // Forzar scroll al inicio cuando se monta la página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    
    // Verificar si el usuario ya está registrado
    const context = getLeadContext()
    setIsReady(!!context)
    
    // Capturar URL de la página
    setPageUrl(window.location.href)
  }, [])
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Suspense fallback={<div className="h-16 md:h-20" />}>
        <Navbar />
      </Suspense>
      
      {/* Espacio para navbar fijo */}
      <div className="h-16 md:h-20" />
      
      <main className="flex-1 w-full px-4 sm:px-6 md:px-12 lg:px-16 py-8 md:py-12">
        <div className="max-w-[1000px] mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-100 to-violet-100 rounded-full mb-4">
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
              <span className="text-sm font-medium text-violet-900">
                Inteligencia Artificial
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B2A3C] mb-4">
              Consultor IA de Zalantos
            </h1>
            
            <p className="text-lg text-[#6F7A83] max-w-[700px] mx-auto">
              Resuelve tus dudas sobre análisis de datos, implementación de IA y transformación digital con nuestro asistente inteligente.
            </p>
          </div>

          {/* Chat Widget */}
          <div 
            className={`bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 md:p-8 transition-opacity ${
              !isReady ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            <AiChatWidget 
              isReady={isReady}
              onRegistrationRequired={() => setIsReady(false)}
            />
          </div>

          {/* Lead Gate Modal */}
          <LeadGateModal 
            pageUrl={pageUrl}
            onReady={() => setIsReady(true)}
          />

          {/* Información adicional */}
          <div className="mt-8 text-center text-sm text-[#6F7A83]">
            <p>
              ¿Prefieres hablar con un experto humano?{' '}
              <Link 
                href="/?section=contact" 
                className="text-violet-600 hover:text-violet-700 underline font-medium"
              >
                Contáctanos aquí
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

