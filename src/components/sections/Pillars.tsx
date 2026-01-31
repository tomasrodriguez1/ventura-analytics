import Image from 'next/image'
import Section from '../ui/Section'
import Card from '../ui/Card'

export default function Pillars() {
  return (
    <Section variant="gray">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="font-[family-name:var(--font-inter)] text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B2A3C] mb-4">
          Soluciones para gestionar tu negocio
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-[#6F7A83] max-w-[700px] mx-auto px-4">
          Nos adaptamos a tus necesidades para implementar sistemas que resuelven tus problemas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-[1200px] mx-auto">
        <Card className="text-center group">
          <div className="mb-6 flex justify-center">
            <Image src="/images/control_gestion.png" alt="Sistemas de Gestión de Información" width={120} height={120} className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain" />
          </div>
          <h3 className="font-semibold text-lg sm:text-xl text-[#0B2A3C] mb-3">
            Sistemas de Gestión de Información
          </h3>
          <p className="text-[#6F7A83] leading-relaxed text-sm sm:text-base">
          Organiza tus datos para monitorear los <strong>indicadores clave</strong> de tu negocio desde un solo lugar y <strong>tomar decisiones estratégicas con información confiable.</strong> 

          </p>
        </Card>

        <Card className="text-center group">
          <div className="mb-6 flex justify-center">
            <Image src="/images/automtizacion.png" alt="Automatización de Procesos" width={120} height={120} className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain" />
          </div>
          <h3 className="font-semibold text-lg sm:text-xl text-[#0B2A3C] mb-3">
            Automatización de Procesos
          </h3>
          <p className="text-[#6F7A83] leading-relaxed text-sm sm:text-base">
            <strong>Ahorra tiempo</strong> mediante la automatización de actividades, flujos y tareas operativas, <strong>impulsando la productividad</strong> y la eficiencia de tu equipo.
          </p>
        </Card>

        <Card className="text-center group">
          <div className="mb-6 flex justify-center">
            <Image src="/images/ia.png" alt="Soluciones de IA" width={120} height={120} className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain" />
          </div>
          <h3 className="font-semibold text-lg sm:text-xl text-[#0B2A3C] mb-3">
            Soluciones de Inteligencia Artificial
          </h3>
          <p className="text-[#6F7A83] leading-relaxed text-sm sm:text-base">
          <strong>Adaptamos la IA a las necesidades de tu negocio</strong>, desde agentes que atienden consultas de clientes hasta herramientas que generan insights estratégicos, entre otras soluciones.
          </p>
        </Card>
      </div>
    </Section>
  )
}
