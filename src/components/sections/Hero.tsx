import LinkButton from '../ui/LinkButton'
import AiCtaButton from '../ui/AiCtaButton'
import { LINKS } from '@/lib/constants'

export default function Hero() {
  return (
    <section className="pattern-grid w-full relative bg-white min-h-[calc(100vh-5rem)] flex items-center justify-center">
      <div className="max-w-[1100px] text-center flex flex-col items-center px-6">
        <h1 className="font-[family-name:var(--font-inter)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-[#0B2A3C] leading-[1.1] mb-10 md:mb-14">
          ¿La falta de información te limita avanzar?
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-[#4D555D] leading-relaxed mb-12 md:mb-16 max-w-[800px]">
          En <strong>zalantos</strong> te ayudamos a visibilizar la información para mejorar la toma de decisiones, monitorear la gestión del negocio y aumentar el crecimiento.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center text-base sm:text-lg md:text-xl">
        <LinkButton href={LINKS.contact} variant="primary">
            ¿Quieres una sesión de diagnóstico con nosotros?
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </LinkButton>

          <AiCtaButton href={LINKS.aiConsultant} variant="hero" betaLabel="Beta">
            Prueba nuestro consultor IA
          </AiCtaButton>
          
          
        </div>
      </div>
    </section>
  )
}
