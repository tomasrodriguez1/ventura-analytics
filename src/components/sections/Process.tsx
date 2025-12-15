import Section from '../ui/Section'

export default function Process() {
  return (
    <Section variant="white">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="font-[family-name:var(--font-inter)] text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B2A3C] mb-4 px-4">
          De datos dispersos a decisiones accionables
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-[1200px] mx-auto">
        <div className="text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#2FBF71] text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 sm:mb-6" aria-label="Paso 1">
            1
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-[#0B2A3C] mb-3 sm:mb-4">Datos</h3>
          <p className="text-[#6F7A83] leading-relaxed text-sm sm:text-base">
            Integramos datos de múltiples fuentes (legacy, cloud, APIs)
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#2FBF71] text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 sm:mb-6" aria-label="Paso 2">
            2
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-[#0B2A3C] mb-3 sm:mb-4">Orden</h3>
          <p className="text-[#6F7A83] leading-relaxed text-sm sm:text-base">
            Estructuramos y gobernamos la información con modelos de IA transparentes
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#2FBF71] text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 sm:mb-6" aria-label="Paso 3">
            3
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold text-[#0B2A3C] mb-3 sm:mb-4">Decisión</h3>
          <p className="text-[#6F7A83] leading-relaxed text-sm sm:text-base">
            Entregamos insights accionables que generan ROI medible
          </p>
        </div>
      </div>
    </Section>
  )
}
