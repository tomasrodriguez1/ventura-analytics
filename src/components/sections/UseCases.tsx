import Link from 'next/link'
import Section from '../ui/Section'
import Card from '../ui/Card'
import Badge from '../ui/Badge'

export default function UseCases() {
  return (
    <Section variant="white">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="font-[family-name:var(--font-inter)] text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B2A3C] mb-4 px-4">
          Casos de uso que implementamos
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-[#6F7A83] max-w-[700px] mx-auto px-4">
          Soluciones de IA adaptadas a las necesidades reales de su operación
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-[1200px] mx-auto">
        {/* Caso 1 */}
        <Card className="flex flex-col">
          <h3 className="text-lg sm:text-xl font-semibold text-[#0B2A3C] mb-3">
            Agentes de IA para soporte interno
          </h3>
          <p className="text-[#6F7A83] leading-relaxed text-sm sm:text-base flex-1">
            Asistentes para políticas, procesos, manuales y preguntas frecuentes del negocio.
          </p>
          <Link
            href="/blog/insight-asistente-interno-ia-politicas-procesos-faqs"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#2BA8DC] hover:text-[#0B2A3C] transition-colors"
          >
            Leer insight <span aria-hidden="true">→</span>
          </Link>
        </Card>

        {/* Caso 2 */}
        <Card className="flex flex-col">
          <h3 className="text-lg sm:text-xl font-semibold text-[#0B2A3C] mb-3">
            IA para insights de inteligencia de negocio
          </h3>
          <p className="text-[#6F7A83] leading-relaxed mb-3 text-sm sm:text-base flex-1">
            Consultas en lenguaje natural, alertas y hallazgos accionables sobre KPIs.
          </p>
          <div className="flex items-center justify-between">
            <Badge variant="success">Alto ROI</Badge>
            <Link
              href="/blog/insight-ia-kpis-hallazgos-lenguaje-natural"
              className="inline-flex items-center gap-1 text-sm font-medium text-[#2BA8DC] hover:text-[#0B2A3C] transition-colors"
            >
              Leer insight <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Card>

        {/* Caso 3 */}
        <Card className="flex flex-col">
          <h3 className="text-lg sm:text-xl font-semibold text-[#0B2A3C] mb-3">
            Software de tracking con IA
          </h3>
          <p className="text-[#6F7A83] leading-relaxed text-sm sm:text-base flex-1">
            Seguimiento de tareas, proyectos, activos y operaciones con acceso rápido vía IA.
          </p>
          <Link
            href="/blog/insight-sistema-tracking-operacional-acceso-rapido-ia"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#2BA8DC] hover:text-[#0B2A3C] transition-colors"
          >
            Leer insight <span aria-hidden="true">→</span>
          </Link>
        </Card>

        {/* Caso 4 */}
        <Card className="flex flex-col">
          <h3 className="text-lg sm:text-xl font-semibold text-[#0B2A3C] mb-3">
            Forecasting y planificación operacional
          </h3>
          <p className="text-[#6F7A83] leading-relaxed text-sm sm:text-base flex-1">
            Proyección de demanda, carga de trabajo y mantenciones para reducir incertidumbre.
          </p>
          <Link
            href="/blog/insight-ia-forecasting-planificacion-reducir-incertidumbre-operacional"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#2BA8DC] hover:text-[#0B2A3C] transition-colors"
          >
            Leer insight <span aria-hidden="true">→</span>
          </Link>
        </Card>

        {/* Caso 5 */}
        <Card className="flex flex-col">
          <h3 className="text-lg sm:text-xl font-semibold text-[#0B2A3C] mb-3">
            Monitoreo de performance y alertas ejecutivas
          </h3>
          <p className="text-[#6F7A83] leading-relaxed mb-3 text-sm sm:text-base flex-1">
            Semáforos, desviaciones y alertas automáticas para foco gerencial.
          </p>
          <div className="flex items-center justify-between">
            <Badge variant="success">Valor ejecutivo</Badge>
            <Link
              href="/blog/insight-alertas-ejecutivas-inteligentes-desvios-criticos"
              className="inline-flex items-center gap-1 text-sm font-medium text-[#2BA8DC] hover:text-[#0B2A3C] transition-colors"
            >
              Leer insight <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Card>

        {/* Caso 6 */}
        <Card>
          <h3 className="text-lg sm:text-xl font-semibold text-[#0B2A3C] mb-3">
            Automatización de procesos con trazabilidad
          </h3>
          <p className="text-[#6F7A83] leading-relaxed text-sm sm:text-base">
            Flujos aprobatorios, auditoría y registro de decisiones para control y gobierno.
          </p>
        </Card>
      </div>
    </Section>
  )
}
