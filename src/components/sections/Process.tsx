import Section from '../ui/Section'
import { Search, Wrench, Rocket } from 'lucide-react'

export default function Process() {
  const steps = [
    {
      badge: '01',
      icon: Search,
      title: 'Discovery',
      subtitle: 'Primero entender, después resolver',
      bullets: [
        'Nos sumergimos en tu negocio para entender tu operación actual, desafíos clave y tus necesidades.',
        'Convertimos ese análisis en oportunidades de mejora priorizadas por impacto, con información clara para decidir y avanzar.',
      ]
    },
    {
      badge: '02',
      icon: Wrench,
      title: 'Diseño e Implementación',
      subtitle: 'Soluciones a medida, desarrolladas colaborativamente',
      bullets: [
        'Desarrollamos e implementamos una solución a medida de forma ágil, entregando valor desde el primer sprint y alineada a cómo opera tu negocio.',
        'Validamos con usuarios durante la construcción, iterando con feedback y datos reales para asegurar adopción y resultados antes de escalar.'
      ]
    },
    {
      badge: '03',
      icon: Rocket,
      title: 'Monitoreo y Soporte',
      subtitle: 'Mejora continua, alineada a tu negocio',
      bullets: [
        'Lanzamos a producción con métricas de éxito claras y salvaguardas, y dejamos monitoreo activo para asegurar estabilidad y performance.',
        'Nos encargamos del soporte y mantenimiento continuo, recogiendo feedback y optimizando la solución para que evolucione junto a tu negocio.'
      ]
    }
  ]

  return (
    <Section variant="white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0B2A3C] mb-6">
            Nuestra Metodología
          </h2>
          <p className="text-[#6F7A83] text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Un enfoque metódico que parte por entender tu negocio, tus problemas y tus necesidades.
          </p>
        </div>

        {/* Process Cards */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="relative">
                  {/* Card */}
                  <div className="relative bg-white rounded-2xl border border-black/10 shadow-sm p-6 md:p-8 h-full">
                    {/* Top Row: Icon and Badge */}
                    <div className="flex items-start justify-between mb-6">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-full border-2 border-[#2FBF71] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-[#2FBF71]" />
                      </div>
                      {/* Badge */}
                      <div className="rounded-full border-2 border-[#2FBF71] px-3 py-1">
                        <span className="text-[#2FBF71] text-sm font-semibold">
                          {step.badge}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-2xl font-bold text-[#0B2A3C] mb-3">
                        {step.title}
                      </h3>
                      <p className="text-[#2FBF71] font-medium mb-6">
                        {step.subtitle}
                      </p>
                      <ul className="space-y-4">
                        {step.bullets.map((bullet, bulletIndex) => (
                          <li key={bulletIndex} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2FBF71] flex-shrink-0 mt-2" />
                            <span className="text-[#6F7A83] text-sm leading-relaxed">
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Section>
  )
}
