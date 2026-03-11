import Image from 'next/image'
import Section from '../ui/Section'

interface ClientStory {
  name: string
  logo: string
  alt: string
  accentColor: string
  pain: string
  solution: string
  result: string
}

const featured: ClientStory = {
  name: 'Colegio San Francisco de Machalí',
  logo: '/images/icono_colegio.jpeg',
  alt: 'Logo del Colegio San Francisco de Machalí',
  accentColor: '#3FA9F5',
  pain: 'El equipo docente y administrativo perdía horas buscando protocolos y normativas en carpetas dispersas. Riesgo alto de información desactualizada.',
  solution: 'Agente IA (RAG) entrenado exclusivamente con la documentación oficial del colegio.',
  result: 'Respuestas precisas en segundos. Se eliminó la incertidumbre operativa y se estandarizó el cumplimiento.',
}

const secondary: ClientStory[] = [
  {
    name: 'Cruz Verde',
    logo: '/images/icono_cruz_verde.png',
    alt: 'Logo de Cruz Verde',
    accentColor: '#2FBF71',
    pain: 'Falta de visibilidad sobre quiebres de stock y rotación.',
    solution: 'Trazabilidad con alertas operativas automáticas.',
    result: 'Decisiones comerciales más rápidas y control de sobrestock.',
  },
  {
    name: 'Stem Inversiones',
    logo: '/images/icono_stem.png',
    alt: 'Logo de Stem Inversiones',
    accentColor: '#3FA9F5',
    pain: 'Dificultad para trazar gastos y gestionar clientes.',
    solution: 'Plataforma de control financiero asistida por IA.',
    result: 'Trazabilidad total y gestión proactiva de cartera.',
  },
  {
    name: 'Cerro El Plomo',
    logo: '/images/icono_cerro.png',
    alt: 'Logo de Cerro El Plomo',
    accentColor: '#2FBF71',
    pain: 'Inventario opaco y datos difíciles de interpretar.',
    solution: 'Agentes de IA que explican los insights del inventario.',
    result: 'El equipo entiende el inventario en lenguaje natural.',
  },
]

export default function Clients() {
  return (
    <Section variant="gray">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="font-[family-name:var(--font-inter)] text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B2A3C] mb-4 px-4">
          Nuestras Soluciones Aplicadas
        </h2>
      </div>

      <div className="max-w-[1200px] mx-auto space-y-6 sm:space-y-8">
        {/* Featured card — estilo claro que se integra con la página */}
        <div className="relative overflow-hidden rounded-2xl bg-white border border-[rgba(11,42,60,0.08)] p-5 sm:p-8 md:p-12 shadow-[0_2px_8px_rgba(11,42,60,0.04)]">
          {/* Borde acento lateral */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
            style={{ backgroundColor: featured.accentColor }}
          />

          <div className="relative flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-xl bg-[#0B2A3C]/[0.04] p-3 mx-auto md:mx-0">
              <Image
                src={featured.logo}
                alt={featured.alt}
                width={96}
                height={96}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2"
                style={{ color: featured.accentColor }}
              >
                Caso destacado
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-[#0B2A3C] mb-8 leading-tight">
                {featured.name}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#6F7A83] block">
                    Desafío
                  </span>
                  <p className="text-[#0B2A3C]/90 text-sm leading-relaxed">
                    {featured.pain}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#6F7A83] block">
                    Solución
                  </span>
                  <p className="text-[#0B2A3C]/90 text-sm leading-relaxed">
                    {featured.solution}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span
                    className="text-[10px] font-semibold uppercase tracking-widest block"
                    style={{ color: featured.accentColor }}
                  >
                    Impacto
                  </span>
                  <p className="text-[#0B2A3C] font-medium text-sm leading-relaxed">
                    {featured.result}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {secondary.map((client) => (
            <div
              key={client.name}
              className="bg-white rounded-xl border border-[rgba(11,42,60,0.08)] p-5 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center p-1.5">
                  <Image
                    src={client.logo}
                    alt={client.alt}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-sm font-semibold text-[#0B2A3C] leading-tight">
                  {client.name}
                </h3>
              </div>

              <div className="space-y-2.5 border-t border-[rgba(11,42,60,0.06)] pt-4">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#6F7A83] block mb-0.5">
                    Desafío
                  </span>
                  <p className="text-[#0B2A3C]/85 text-xs leading-relaxed">{client.pain}</p>
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#6F7A83] block mb-0.5">
                    Solución
                  </span>
                  <p className="text-[#0B2A3C]/85 text-xs leading-relaxed">{client.solution}</p>
                </div>
                <div>
                  <span
                    className="text-[9px] font-bold uppercase tracking-widest block mb-0.5"
                    style={{ color: client.accentColor }}
                  >
                    Impacto
                  </span>
                  <p className="text-[#0B2A3C] text-xs leading-relaxed font-medium">{client.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 md:mt-16 text-center">
        <a href="#sprint-0" className="btn-primary w-full sm:w-auto">
          ¿Tienes un dolor operativo similar? Agenda tu Sprint 0
        </a>
      </div>
    </Section>
  )
}
