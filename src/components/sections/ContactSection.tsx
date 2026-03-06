'use client'

import Script from 'next/script'

// Componente SVG inline simple y ligero para checkmark
const CheckIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

// Copy centralizado de la sección
const COPY = {
  hero: {
    headline: 'Agenda tu Sprint 0 Gratuitamente',
    description:
      'Una sesión de 1 hora para entender tu contexto y tu problema. Te entregamos un diagnóstico resumido y una propuesta con las opciones más adecuadas para tu negocio. Sin costo, sin compromiso.'
  },
  benefits: [
    'Claridad sobre tu problema real y sus causas raíz',
    'Opciones de solución concretas, alineadas a tu operación',
    'Próximos pasos y roadmap sugerido, sin compromiso'
  ],
  trustNote: 'Respuesta en menos de 24 horas.'
}

export default function ContactSection() {
  return (
    <section className="w-full bg-gray-50 py-16 sm:py-20 md:py-32" aria-labelledby="contact-heading">
      <div className="w-full px-4 sm:px-6 md:px-12 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* --- COLUMNA IZQUIERDA: Propuesta de Valor --- */}
          <div className="space-y-6 md:space-y-8">
            <h1 id="contact-heading" className="font-[family-name:var(--font-inter)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#0B2A3C] leading-[1.1] mb-6 md:mb-8">
              {COPY.hero.headline}
            </h1>
            
            <p className="text-lg sm:text-xl text-[#6F7A83] leading-relaxed">
              {COPY.hero.description}
            </p>

            {/* Lista de Beneficios */}
            <ul className="space-y-4" role="list">
              {COPY.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckIcon className="w-6 h-6 text-[#2FBF71] flex-shrink-0 mt-1" aria-hidden="true" />
                  <span className="font-medium text-[#0B2A3C]">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-sm text-[#6F7A83] mt-4 border-t border-gray-200 pt-4">
              Al agendar tu Sprint 0 deja en los comentarios del booking el nombre de tu compañía y una breve descripción del dolor que quieres resolver para que lleguemos preparados.
            </p>

            
          </div>

          <div className="space-y-6">
            {/* --- Calendly inline widget --- */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div
                className="calendly-inline-widget w-full"
                data-url="https://calendly.com/tomas-rodriguez-zalantos/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=058f2b"
                style={{ minWidth: '320px', height: '700px' }}
              />
            </div>
            <Script
              src="https://assets.calendly.com/assets/external/widget.js"
              strategy="afterInteractive"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
