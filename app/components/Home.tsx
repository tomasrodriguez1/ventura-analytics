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
          Ventura Analytics
        </h1>
        <p className="text-2xl md:text-3xl text-blue-400 font-light mb-12">
          ¿Quieres obtener insights valiosos sobre tu negocio de una manera fácil y conversacional?
        </p>
      </div>

      {/* Main Feature Box */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 max-w-4xl w-full">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className={`${playfair.className} text-3xl font-bold text-white`}>
              Análisis Inteligente
            </h2>
            <p className="text-xl text-gray-300">
              Nuestro agente de IA procesa tus datos de ventas y costos en lenguaje natural, entregándote insights valiosos al instante.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-blue-400 text-xl mt-1">🎯</span>
                <p className="text-gray-300">Reportes inmediatos sin complejidad</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-blue-400 text-xl mt-1">📊</span>
                <p className="text-gray-300">Comparativas de costos vs. ingresos</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-blue-400 text-xl mt-1">🔔</span>
                <p className="text-gray-300">Alertas de fluctuaciones anómalas</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <p className="text-blue-400 mb-2">Pregunta:</p>
              <p className="text-white">"¿Qué producto me deja el mayor margen?"</p>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <p className="text-blue-400 mb-2">Respuesta:</p>
              <p className="text-white">Analizando tus datos de ventas y costos...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full">
        <div className="bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm">
          <span className="text-blue-400 text-2xl block mb-4">💡</span>
          <h3 className="text-xl font-bold text-white mb-3">Análisis Profundo</h3>
          <p className="text-gray-300">
            Descubre relaciones entre productos, clientes y canales de venta con análisis combinados.
          </p>
        </div>
        <div className="bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm">
          <span className="text-blue-400 text-2xl block mb-4">🔍</span>
          <h3 className="text-xl font-bold text-white mb-3">Insights Precisos</h3>
          <p className="text-gray-300">
            Obtén recomendaciones específicas basadas en el análisis de tus datos.
          </p>
        </div>
        <div className="bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm">
          <span className="text-blue-400 text-2xl block mb-4">📈</span>
          <h3 className="text-xl font-bold text-white mb-3">Tendencias Claras</h3>
          <p className="text-gray-300">
            Visualiza el comportamiento de tus ventas y detecta patrones importantes.
          </p>
        </div>
        <div className="bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm">
          <span className="text-blue-400 text-2xl block mb-4">⚡</span>
          <h3 className="text-xl font-bold text-white mb-3">Respuestas Rápidas</h3>
          <p className="text-gray-300">
            Obtén la información que necesitas en segundos, sin complicaciones.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-8 py-12 max-w-4xl">
        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
          ¡Deja que Ventura Analytics haga el trabajo duro por ti!
          <span className="block mt-2 text-blue-400">
            Obtén insights valiosos con solo preguntarlos
          </span>
        </p>
        
        <button
          onClick={() => setCurrentSection('demo')}
          className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-4 px-12 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          Probar Demo
        </button>
      </div>
    </div>
  )
}

