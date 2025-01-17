import { NextFont } from 'next/dist/compiled/@next/font'
import Image from 'next/image'

interface AboutProps {
  playfair: NextFont;
}

export default function About({ playfair }: AboutProps) {
  return (
    <div className="flex flex-col items-center py-12 space-y-16">
      {/* Header Section */}
      <div className="text-center space-y-6 max-w-4xl">
        <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold text-white mb-8`}>
          Nuestro Equipo
        </h2>
        <p className="text-xl md:text-2xl text-gray-300">
          Conoce a los fundadores detrás de Ventura Analytic
        </p>
      </div>

      {/* Team Members Grid */}
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto px-4">
        {/* Juan Pablo Card */}
        <div className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-blue-500">
              <div className="absolute inset-0 bg-gray-600 flex items-center justify-center">
                <span className="text-6xl">👨‍💼</span>
              </div>
            </div>
            <div className="text-center">
              <h3 className={`${playfair.className} text-2xl font-bold text-white mb-2`}>
                Juan Pablo Rodríguez
              </h3>
              <p className="text-blue-400 text-lg mb-4">Co-Fundador & CEO</p>
              <p className="text-gray-300 leading-relaxed">
                Especialista en análisis de datos y estrategia empresarial con más de 10 años 
                de experiencia en el sector tecnológico. Apasionado por transformar datos 
                complejos en insights accionables para empresas.
              </p>
            </div>
          </div>
        </div>

        {/* Tomás Card */}
        <div className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-blue-500">
              <div className="absolute inset-0 bg-gray-600 flex items-center justify-center">
                <span className="text-6xl">👨‍💻</span>
              </div>
            </div>
            <div className="text-center">
              <h3 className={`${playfair.className} text-2xl font-bold text-white mb-2`}>
                Tomás Rodríguez
              </h3>
              <p className="text-blue-400 text-lg mb-4">Co-Fundador & CTO</p>
              <p className="text-gray-300 leading-relaxed">
                Ingeniero Civil Industrial con especialización en Tecnologías de las Información. 
                 Líder en el desarrollo de soluciones tecnológicas 
                innovadoras para análisis predictivo y automatización de procesos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="text-center max-w-4xl mx-auto px-4 mt-16">
        <h3 className={`${playfair.className} text-3xl font-bold text-white mb-6`}>
          Nuestra Misión
        </h3>
        <p className="text-xl text-gray-300 leading-relaxed">
          Empoderar a las empresas con herramientas de análisis inteligente que 
          transforman datos en decisiones estratégicas, impulsando su crecimiento 
          y eficiencia operativa.
        </p>
      </div>
    </div>
  )
}

