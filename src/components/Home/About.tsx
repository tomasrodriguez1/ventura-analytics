import { NextFont } from 'next/dist/compiled/@next/font'

interface AboutProps {
  playfair: NextFont;
}

export default function About({ playfair }: AboutProps) {
  return (
    <div className="flex flex-col items-center py-16 space-y-16">
      {/* Header Section */}
      <div className="text-center space-y-6 max-w-4xl">
        <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold text-white mb-8`}>
          Fundador
        </h2>
        <p className="text-xl md:text-2xl text-gray-300">
          Conoce al creador detrás de Ventura Analytic
        </p>
      </div>

      {/* Founder Section */}
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-gray-800/50 rounded-2xl p-10 backdrop-blur-sm">
          <div className="flex flex-col items-center space-y-8">
            <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-blue-500">
              <div className="absolute inset-0 bg-gray-600 flex items-center justify-center">
                <span className="text-7xl">👨‍💻</span>
              </div>
            </div>
            <div className="text-center">
              <h3 className={`${playfair.className} text-3xl font-bold text-white mb-3`}>
                Tomás Rodríguez
              </h3>
              <p className="text-blue-400 text-xl mb-6">Fundador & CTO</p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Ingeniero Civil Industrial con especialización en Tecnologías de la Información. 
                Apasionado por el desarrollo de soluciones tecnológicas innovadoras, 
                especializado en análisis predictivo y automatización de procesos. 
                Mi visión es transformar la manera en que las empresas toman decisiones 
                a través de la inteligencia artificial y el análisis de datos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="text-center max-w-4xl mx-auto px-4 mt-8">
        <h3 className={`${playfair.className} text-3xl font-bold text-white mb-6`}>
          Mi Misión
        </h3>
        <p className="text-xl text-gray-300 leading-relaxed">
          Empoderar a las empresas con herramientas de análisis inteligente que 
          transforman datos en decisiones estratégicas, impulsando su crecimiento 
          y eficiencia operativa a través de soluciones tecnológicas innovadoras.
        </p>
      </div>
    </div>
  )
}

