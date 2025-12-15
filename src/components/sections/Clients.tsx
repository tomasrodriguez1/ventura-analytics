import Image from 'next/image'
import Section from '../ui/Section'
import Card from '../ui/Card'

export default function Clients() {
  return (
    <Section variant="gray">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="font-[family-name:var(--font-inter)] text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B2A3C] mb-4 px-4">
          Clientes con los que hemos trabajado
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-[#6F7A83] max-w-[700px] mx-auto px-4">
          Resultados medibles en empresas líderes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-[1200px] mx-auto">
        {/* Cliente 1: Cruz Verde */}
        <Card className="group hover:shadow-md transition-all duration-200">
          <div className="flex flex-col sm:flex-row md:flex-row gap-4 sm:gap-6">
            {/* Logo Cruz Verde */}
            <Image 
              src="/images/icono_cruz_verde.png"
              alt="Logo de Cruz Verde"
              width={96}
              height={96}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain flex-shrink-0 mx-auto sm:mx-0"
            />
            
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-semibold text-[#0B2A3C] mb-3 group-hover:text-[#2FBF71] transition-colors">
                Cruz Verde
              </h3>
              <p className="text-[#6F7A83] leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                Sistema paralelo de control y trazabilidad de inventario farmacéutico para análisis operacional y comercial.
              </p>
              
              <ul className="space-y-3" role="list">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2FBF71] mt-2 flex-shrink-0" aria-hidden="true"></div>
                  <span className="text-[#6F7A83] leading-relaxed text-sm sm:text-base">Análisis de ventas y rotación de inventario</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2FBF71] mt-2 flex-shrink-0" aria-hidden="true"></div>
                  <span className="text-[#6F7A83] leading-relaxed text-sm sm:text-base">Detección de quiebres y sobrestock</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2FBF71] mt-2 flex-shrink-0" aria-hidden="true"></div>
                  <span className="text-[#6F7A83] leading-relaxed text-sm sm:text-base">Seguimiento de reclamos y eventos operativos</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Cliente 2: Colegio San Francisco de Machalí */}
        <Card className="group hover:shadow-md transition-all duration-200">
          <div className="flex flex-col sm:flex-row md:flex-row gap-4 sm:gap-6">
            {/* Logo Colegio San Francisco de Machalí */}
            <Image 
              src="/images/icono_colegio.jpeg"
              alt="Logo del Colegio San Francisco de Machalí"
              width={96}
              height={96}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain flex-shrink-0 mx-auto sm:mx-0"
            />
            
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-semibold text-[#0B2A3C] mb-3 group-hover:text-[#3FA9F5] transition-colors">
                Colegio San Francisco de Machalí
              </h3>
              <p className="text-[#6F7A83] leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                Agentes de inteligencia artificial para onboarding y acceso rápido a reglamentos, mejorando cumplimiento y autonomía del equipo.
              </p>
              
              <ul className="space-y-3" role="list">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2FBF71] mt-2 flex-shrink-0" aria-hidden="true"></div>
                  <span className="text-[#6F7A83] leading-relaxed text-sm sm:text-base">Onboarding guiado para docentes y administradores</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2FBF71] mt-2 flex-shrink-0" aria-hidden="true"></div>
                  <span className="text-[#6F7A83] leading-relaxed text-sm sm:text-base">Acceso instantáneo a normativa y procedimientos internos</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2FBF71] mt-2 flex-shrink-0" aria-hidden="true"></div>
                  <span className="text-[#6F7A83] leading-relaxed text-sm sm:text-base">Estandarización del cumplimiento del establecimiento</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  )
}
