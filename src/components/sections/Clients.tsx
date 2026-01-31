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
              <ul className="space-y-3 mt-1 sm:mt-2" role="list">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2FBF71] mt-2 flex-shrink-0" aria-hidden="true"></div>
                  <span className="text-[#6F7A83] leading-relaxed text-sm sm:text-base">Control y trazabilidad de inventario en tiempo real (quiebres, sobrestock y rotación).</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2FBF71] mt-2 flex-shrink-0" aria-hidden="true"></div>
                  <span className="text-[#6F7A83] leading-relaxed text-sm sm:text-base">Alertas operativas y reportes accionables para decisiones comerciales más rápidas.</span>
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
              <ul className="space-y-3 mt-1 sm:mt-2" role="list">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2FBF71] mt-2 flex-shrink-0" aria-hidden="true"></div>
                  <span className="text-[#6F7A83] leading-relaxed text-sm sm:text-base">Agente de IA para acceso instantáneo a normativa y procedimientos internos.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2FBF71] mt-2 flex-shrink-0" aria-hidden="true"></div>
                  <span className="text-[#6F7A83] leading-relaxed text-sm sm:text-base">Onboarding guiado que estandariza el cumplimiento y mejora la autonomía del equipo.</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Cliente 3: Stem Inversiones */}
        <Card className="group hover:shadow-md transition-all duration-200">
          <div className="flex flex-col sm:flex-row md:flex-row gap-4 sm:gap-6">
            {/* Logo Stem Inversiones */}
            <Image 
              src="/images/icono_stem.png"
              alt="Logo de Stem Inversiones"
              width={96}
              height={96}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain flex-shrink-0 mx-auto sm:mx-0"
            />
            
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-semibold text-[#0B2A3C] mb-3 group-hover:text-[#6F7A83] transition-colors">
                Stem Inversiones
              </h3>
              <ul className="space-y-3 mt-1 sm:mt-2" role="list">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2FBF71] mt-2 flex-shrink-0" aria-hidden="true"></div>
                  <span className="text-[#6F7A83] leading-relaxed text-sm sm:text-base">Control financiero y trazabilidad de gastos en tiempo real.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2FBF71] mt-2 flex-shrink-0" aria-hidden="true"></div>
                  <span className="text-[#6F7A83] leading-relaxed text-sm sm:text-base">Seguimiento proactivo con clientes y apoyo a la gestión asistido por IA.</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Cliente 4: Cerro El Plomo */}
        <Card className="group hover:shadow-md transition-all duration-200">
          <div className="flex flex-col sm:flex-row md:flex-row gap-4 sm:gap-6">
            {/* Logo Cerro El Plomo */}
            <Image 
              src="/images/icono_cerro.png"
              alt="Logo de Cerro El Plomo"
              width={96}
              height={96}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain flex-shrink-0 mx-auto sm:mx-0"
            />
            
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-semibold text-[#0B2A3C] mb-3 group-hover:text-[#2FBF71] transition-colors">
                Cerro El Plomo
              </h3>
              <ul className="space-y-3 mt-1 sm:mt-2" role="list">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2FBF71] mt-2 flex-shrink-0" aria-hidden="true"></div>
                  <span className="text-[#6F7A83] leading-relaxed text-sm sm:text-base">Software de manejo de inventario con control y trazabilidad en tiempo real.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2FBF71] mt-2 flex-shrink-0" aria-hidden="true"></div>
                  <span className="text-[#6F7A83] leading-relaxed text-sm sm:text-base">Agentes de IA que comprenden y explican insights accionables del inventario.</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  )
}
