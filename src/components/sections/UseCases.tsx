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
        <Card>
          <h3 className="text-lg sm:text-xl font-semibold text-[#0B2A3C] mb-3">
            Agentes de IA para soporte interno
          </h3>
          <p className="text-[#6F7A83] leading-relaxed text-sm sm:text-base">
            Asistentes para políticas, procesos, manuales y preguntas frecuentes del negocio.
          </p>
        </Card>

        {/* Caso 2 */}
        <Card>
          <h3 className="text-lg sm:text-xl font-semibold text-[#0B2A3C] mb-3">
            IA para insights de inteligencia de negocio
          </h3>
          <p className="text-[#6F7A83] leading-relaxed mb-3 text-sm sm:text-base">
            Consultas en lenguaje natural, alertas y hallazgos accionables sobre KPIs.
          </p>
          <Badge variant="success">Alto ROI</Badge>
        </Card>

        {/* Caso 3 */}
        <Card>
          <h3 className="text-lg sm:text-xl font-semibold text-[#0B2A3C] mb-3">
            Software de tracking con IA
          </h3>
          <p className="text-[#6F7A83] leading-relaxed text-sm sm:text-base">
            Seguimiento de tareas, proyectos, activos y operaciones con acceso rápido vía IA.
          </p>
        </Card>

        {/* Caso 4 */}
        <Card>
          <h3 className="text-lg sm:text-xl font-semibold text-[#0B2A3C] mb-3">
            Forecasting y planificación operacional
          </h3>
          <p className="text-[#6F7A83] leading-relaxed text-sm sm:text-base">
            Proyección de demanda, carga de trabajo y mantenciones para reducir incertidumbre.
          </p>
        </Card>

        {/* Caso 5 */}
        <Card>
          <h3 className="text-lg sm:text-xl font-semibold text-[#0B2A3C] mb-3">
            Monitoreo de performance y alertas ejecutivas
          </h3>
          <p className="text-[#6F7A83] leading-relaxed mb-3 text-sm sm:text-base">
            Semáforos, desviaciones y alertas automáticas para foco gerencial.
          </p>
          <Badge variant="success">Valor ejecutivo</Badge>
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
