import Section from '../ui/Section'
import LinkButton from '../ui/LinkButton'
import { LINKS } from '@/lib/constants'

const DELIVERABLES = [
  {
    icon: (
      <svg className="w-5 h-5 text-[#2FBF71] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: 'Claridad sobre tu problema real y sus causas raíz',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#2FBF71] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: 'Opciones de solución concretas, alineadas a tu operación',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-[#2FBF71] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: 'Próximos pasos y roadmap sugerido, sin compromiso',
  },
]

export default function Sprint0Section() {
  return (
    <Section id="sprint-0" variant="gray">
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-20 xl:gap-28 max-w-[1100px] mx-auto w-full">

        {/* Bloque izquierdo: eyebrow + título + descripción */}
        <div className="lg:flex-1 mb-14 lg:mb-0 lg:-translate-y-6 space-y-8 md:space-y-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2FBF71]/10 border border-[#2FBF71]/20">
            <span className="w-2 h-2 rounded-full bg-[#2FBF71]" aria-hidden="true" />
            <span className="text-xs font-semibold text-[#2FBF71] uppercase tracking-wide">
              Sin costo · Sin compromiso
            </span>
          </div>

          <h2 className="font-[family-name:var(--font-inter)] text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#0B2A3C] leading-tight">
            Prueba el Sprint&nbsp;0{' '}
            <span className="text-[#2FBF71]">(Gratis)</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-[#6F7A83] leading-relaxed max-w-lg">
            Una sesión de <strong className="text-[#0B2A3C]">1 hora</strong> para entender tu contexto
            y tu problema. Luego te entregamos un diagnóstico resumido y una propuesta
            a priori con las opciones más adecuadas para tu negocio.
          </p>
        </div>

        {/* Bloque derecho: bullets + CTAs */}
        <div className="lg:flex-1 space-y-8 md:space-y-10">
          <div className="mt-10 mb-4">
            <p className="text-sm sm:text-base font-semibold text-[#6F7A83] uppercase tracking-wider">
              Qué te llevás
            </p>
          </div>
          <ul className="space-y-5 md:space-y-6">
            {DELIVERABLES.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                {item.icon}
                <span className="text-[#0B2A3C] text-base sm:text-lg leading-snug">
                  {item.text}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3 pt-2">
            <LinkButton
              href={LINKS.contact}
              variant="primary"
              className="shadow-lg shadow-[#0B2A3C]/10 hover:shadow-xl hover:shadow-[#0B2A3C]/20 transition-all duration-300"
            >
              Agendar Sprint 0 (Gratis)
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </LinkButton>
          </div>
        </div>

      </div>
    </Section>
  )
}
