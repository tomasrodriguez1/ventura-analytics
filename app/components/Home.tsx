import { NextFont } from 'next/dist/compiled/@next/font'

interface HomeProps {
  playfair: NextFont;
  setCurrentSection: (section: string) => void;
}

export default function Home({ playfair, setCurrentSection }: HomeProps) {
  return (
    <div className="flex flex-col items-center min-h-screen py-20 px-4 md:px-8 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-4xl">
        <h1 className={`${playfair.className} text-5xl md:text-7xl font-bold text-white mb-8 leading-tight`}>
          Ventura Analytic
        </h1>
        <p className="text-2xl md:text-3xl text-blue-400 font-light">
          ¿Te gustaría conocer a fondo el desempeño de tus productos y descubrir oportunidades de crecimiento?
        </p>
      </div>

      {/* Main Content Section */}
      <div className="max-w-4xl space-y-8">
        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
          Nuestra plataforma impulsada por IA te brinda reportes automatizados y análisis inteligentes que facilitan la toma de decisiones. Con solo unos clics, obtendrás:
        </p>

        {/* Features List */}
        <ul className="grid md:grid-cols-2 gap-6 my-12">
          <li className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
            <span className="text-blue-400 text-xl">📊</span>
            <p className="text-lg md:text-xl mt-2">Visibilidad completa de tus ventas, márgenes y tendencias.</p>
          </li>
          <li className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
            <span className="text-blue-400 text-xl">💡</span>
            <p className="text-lg md:text-xl mt-2">Insights valiosos para identificar a los clientes más rentables y los productos estrella.</p>
          </li>
          <li className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
            <span className="text-blue-400 text-xl">📈</span>
            <p className="text-lg md:text-xl mt-2">Proyecciones de ventas basadas en datos históricos, para que planees tu próximo gran paso.</p>
          </li>
          <li className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
            <span className="text-blue-400 text-xl">🔔</span>
            <p className="text-lg md:text-xl mt-2">Alertas tempranas cuando algo necesita atención inmediata (ej.: inventario bajo, ventas anómalas).</p>
          </li>
        </ul>

        {/* Call to Action Section */}
        <div className="text-center space-y-8 py-12">
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            Mejora tu visión de negocio, ahorra tiempo y toma decisiones con confianza. 
            <span className="block mt-2 text-blue-400">
              ¡Dale a tu empresa el poder de la analítica avanzada!
            </span>
          </p>
          
          <button
            onClick={() => setCurrentSection('demo')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-4 px-12 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Ver Demo
          </button>
        </div>
      </div>
    </div>
  )
}

