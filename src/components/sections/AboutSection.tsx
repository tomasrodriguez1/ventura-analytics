import Section from '../ui/Section'
import Card from '../ui/Card'

export default function AboutSection() {
  return (
    <div className="w-full">
      {/* Header */}
      <Section variant="white">
        <div className="text-center">
          <h1 className="font-[family-name:var(--font-inter)] text-4xl sm:text-5xl md:text-6xl font-bold text-[#0B2A3C] mb-6 px-4">
            Fundador
          </h1>
          <p className="text-lg sm:text-xl text-[#6F7A83] px-4">
            Conoce al creador detrás de zalantos
          </p>
        </div>
      </Section>

      {/* Founder Info */}
      <Section variant="gray" narrow>
        <Card className="max-w-[700px] mx-auto">
          <div className="flex flex-col items-center space-y-6 md:space-y-8 text-center">
            <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#2FBF71] shadow-[var(--shadow-sm)]">
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-5xl sm:text-6xl md:text-7xl" role="img" aria-label="Desarrollador">👨‍💻</span>
              </div>
            </div>
            
            <div>
              <h2 className="font-[family-name:var(--font-inter)] text-2xl sm:text-3xl font-bold text-[#0B2A3C] mb-2">
                Tomás Rodríguez
              </h2>
              <p className="text-[#2FBF71] text-lg sm:text-xl font-semibold mb-4 md:mb-6">Fundador & CTO</p>
              <p className="text-[#6F7A83] text-base sm:text-lg leading-relaxed">
                Ingeniero Civil Industrial con especialización en Tecnologías de la Información. 
                Apasionado por el desarrollo de soluciones tecnológicas innovadoras, 
                especializado en análisis predictivo y automatización de procesos. 
                Mi visión es transformar la manera en que las empresas toman decisiones 
                a través de la inteligencia artificial y el análisis de datos.
              </p>
            </div>
          </div>
        </Card>
      </Section>

      {/* Mission */}
      <Section variant="white" narrow>
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-inter)] text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B2A3C] mb-6 px-4">
            Mi Misión
          </h2>
          <p className="text-lg sm:text-xl text-[#6F7A83] leading-relaxed max-w-[600px] mx-auto px-4">
            Empoderar a las empresas con herramientas de análisis inteligente que 
            transforman datos en decisiones estratégicas, impulsando su crecimiento 
            y eficiencia operativa a través de soluciones tecnológicas innovadoras.
          </p>
        </div>
      </Section>
    </div>
  )
}
