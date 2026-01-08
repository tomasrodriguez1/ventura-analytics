import LinkButton from '../ui/LinkButton'
import Section from '../ui/Section'
import AiCtaButton from '../ui/AiCtaButton'
import { LINKS } from '@/lib/constants'

export default function Hero() {
  return (
    <Section variant="white" hero className="pattern-grid relative overflow-hidden">
      <div className="max-w-[1100px]">
        <h1 className="font-[family-name:var(--font-inter)] text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold text-[#0B2A3C] leading-[1.1] mb-6 md:mb-8">
          Convertimos los datos en decisiones
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-[#6F7A83] leading-relaxed mb-8 md:mb-12 max-w-[800px]">
          Ayudamos a líderes ejecutivos a transformar la complejidad de la información en rentabilidad medible mediante Inteligencia Artificial gobernada.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <AiCtaButton href={LINKS.aiConsultant} variant="hero">
            Habla con el Consultor IA
          </AiCtaButton>
          
          <LinkButton href={LINKS.contact} variant="primary">
            Habla con un experto
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </LinkButton>
        </div>
      </div>
    </Section>
  )
}
