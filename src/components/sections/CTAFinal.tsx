import LinkButton from '../ui/LinkButton'
import Section from '../ui/Section'
import { LINKS } from '@/lib/constants'

export default function CTAFinal() {
  return (
    <Section variant="dark">
      <div className="text-center">
        <h2 className="font-[family-name:var(--font-inter)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 px-4">
          ¿La falta de información te limita avanzar?
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 md:mb-12 max-w-[800px] mx-auto px-4">
          Agenda 45 minutos para iniciar diagnóstico y entender tu negocio; detectamos quick wins y definimos los próximos pasos contigo.
        </p>
        
        <LinkButton
          href={LINKS.contact}
          variant="secondary"
          className="text-base sm:text-lg py-4 px-8 sm:px-12"
        >
          Agendar sesión de diagnóstico
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </LinkButton>
        
        <p className="text-gray-400 text-xs sm:text-sm mt-6 px-4">
          Sin costo ni compromiso • Respuesta en menos de 24h • Equipo en español o ingles
        </p>
      </div>
    </Section>
  )
}
