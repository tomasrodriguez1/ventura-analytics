import Section from '../ui/Section'
import Card from '../ui/Card'

export default function Pillars() {
  return (
    <Section variant="gray">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="font-[family-name:var(--font-inter)] text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B2A3C] mb-4">
          Más allá del hype: Impacto Real
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-[#6F7A83] max-w-[700px] mx-auto px-4">
          Nuestra metodología se enfoca estrictamente en indicadores financieros y operativos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-[1200px] mx-auto">
        <Card className="text-center group">
          <div className="text-4xl sm:text-5xl mb-6" role="img" aria-label="Gráfico de análisis">📊</div>
          <h3 className="font-semibold text-lg sm:text-xl text-[#0B2A3C] mb-3">
            Estrategia ROI-First
          </h3>
          <p className="text-[#6F7A83] leading-relaxed text-sm sm:text-base">
            Cada iniciativa comienza con una proyección financiera clara y un caso de negocio validado por el CFO.
          </p>
        </Card>

        <Card className="text-center group">
          <div className="text-4xl sm:text-5xl mb-6" role="img" aria-label="Candado de seguridad">🔒</div>
          <h3 className="font-semibold text-lg sm:text-xl text-[#0B2A3C] mb-3">
            Gobernanza Ética
          </h3>
          <p className="text-[#6F7A83] leading-relaxed text-sm sm:text-base">
            Modelos transparentes y auditables que aseguran el cumplimiento normativo y protegen la reputación corporativa.
          </p>
        </Card>

        <Card className="text-center group">
          <div className="text-4xl sm:text-5xl mb-6" role="img" aria-label="Engranajes de integración">⚙️</div>
          <h3 className="font-semibold text-lg sm:text-xl text-[#0B2A3C] mb-3">
            Integración Legacy
          </h3>
          <p className="text-[#6F7A83] leading-relaxed text-sm sm:text-base">
            Orquestamos la innovación sobre su infraestructura actual, acelerando el time-to-market.
          </p>
        </Card>
      </div>
    </Section>
  )
}
