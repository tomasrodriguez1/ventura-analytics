import LinkButton from '../ui/LinkButton'
import Section from '../ui/Section'
import { LINKS } from '@/lib/constants'

export default function CTAFinal() {
  return (
    <Section variant="dark">
      <div className="text-center">
        <h2 className="font-[family-name:var(--font-inter)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 px-4">
          ¿Listo para transformar sus datos en decisiones?
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 md:mb-12 max-w-[800px] mx-auto px-4">
          Hable con un experto y descubra cómo zalantos puede generar ROI medible en su organización
        </p>
        
        <LinkButton
          href={LINKS.contact}
          variant="secondary"
          className="text-base sm:text-lg py-4 px-8 sm:px-12"
        >
          Solicitar consultoría gratuita
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </LinkButton>
        
        <p className="text-gray-400 text-xs sm:text-sm mt-6 px-4">
          Sin compromisos • Soporte en español • Servicio personalizado
        </p>
      </div>
    </Section>
  )
}
