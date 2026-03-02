import LinkButton from '../ui/LinkButton'
import AiCtaButton from '../ui/AiCtaButton'
import Section from '../ui/Section'
import { LINKS } from '@/lib/constants'

export default function CTAFinal() {
  return (
    <Section variant="dark" id="cierre-cta">
      <div className="text-center">
        <h2 className="font-[family-name:var(--font-inter)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 px-4">
          ¿No tienes claro por dónde empezar?
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 md:mb-12 max-w-[800px] mx-auto px-4">
          Conversemos. El Sprint 0 es una sesión breve para entender tu caso y proponerte un roadmap inicial. Si no avanzamos, igual te quedas con claridad del problema y próximos pasos.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
          <LinkButton
            href={LINKS.contact}
            variant="primary"
            className="w-full sm:w-auto text-base sm:text-lg py-4 px-8 sm:px-12"
            aria-label="Ir a contacto para conversar con Zalantos"
          >
            Conversemos
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </LinkButton>
          <AiCtaButton
            href={LINKS.aiConsultant}
            variant="navbar"
            className="w-full sm:w-auto text-base sm:text-lg py-4 px-8 sm:px-12"
          >
            Consultor IA
          </AiCtaButton>
        </div>

        <p className="text-gray-400 text-sm mt-4 px-4" aria-live="polite">
          Te respondemos a la brevedad.
        </p>
        <p className="text-gray-500 text-xs mt-2 max-w-[560px] mx-auto px-4">
          El Consultor IA es un asistente que te ayuda a ordenar tu problema y explorar caminos de solución, como si hablaras con un consultor de Zalantos.
        </p>
      </div>
    </Section>
  )
}
