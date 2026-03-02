import LinkButton from '../ui/LinkButton'
import { LINKS } from '@/lib/constants'

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white min-h-[calc(100vh-5rem)] flex items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-white" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-72 h-72 bg-[#2FBF71]/5 rounded-full blur-3xl mix-blend-multiply animate-blob" />
        <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-[#0B2A3C]/5 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000" />
        <div className="absolute bottom-[20%] left-[20%] w-72 h-72 bg-blue-100/20 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Eyebrow / Tagline */}
       

        {/* Main Heading */}
        <h1 className="font-[family-name:var(--font-inter)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#0B2A3C] tracking-tight leading-[1.1] mb-8 max-w-4xl animate-fade-in-up animation-delay-100">
          ¿Estás apagando incendios y <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0B2A3C] to-[#2FBF71]">postergando lo importante?</span>
        </h1>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 mb-8 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2FBF71] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2FBF71]"></span>
          </span>
          <span className="text-xs sm:text-sm font-medium text-[#4D555D] tracking-wide uppercase">
            CUANDO TODO ES URGENTE, EL NEGOCIO DEJA DE AVANZAR
          </span>
        </div>
        <br />
        <br />

        {/* Description */}
        <p className="text-lg sm:text-xl md:text-2xl text-[#4D555D] leading-relaxed mb-10 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
          En <strong>zalantos</strong> diseñamos software a medida y automatización para que tus procesos fluyan y tus datos estén siempre a la mano. Haz que tus equipos operen sin trabas y recupera el tiempo para tomar decisiones estratégicas.
        </p>
        <br />
        
        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up animation-delay-300">
          <LinkButton href={LINKS.contact} variant="primary" className="shadow-lg shadow-[#0B2A3C]/10 hover:shadow-xl hover:shadow-[#0B2A3C]/20 transition-all duration-300">
            Contactanos
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </LinkButton>
        </div>
      </div>
    </section>
  )
}
