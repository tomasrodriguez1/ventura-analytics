import { useState } from 'react'
import { NextFont } from 'next/dist/compiled/@next/font'
import { useRouter } from 'next/navigation'

interface HomeProps {
  playfair: NextFont;
  setCurrentSection: (section: string) => void;
}

export default function Home({ playfair, setCurrentSection }: HomeProps) {
  const [showDemoMenu, setShowDemoMenu] = useState(false)
  const router = useRouter()

  const handleDemoOption = (demoType: string) => {
    if (demoType === 'callcenter') {
      router.push('/CallCenterDemo')
    } else if (demoType === 'retail') {
      router.push('/RetailDemo')
    }
    setShowDemoMenu(false)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12 p-4">
      
      {/* Hero Principal */}
      <div className="relative text-center bg-gradient-to-br from-gray-900/80 to-blue-900/60 p-12 md:p-16 rounded-3xl backdrop-blur-sm shadow-2xl border border-blue-500/30 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full translate-x-24 translate-y-24"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white px-6 py-2 rounded-full text-sm font-semibold mb-8">
            <span>🚀</span>
            <span>Ventura Analytics</span>
          </div>
          
          <h1 className={`${playfair.className} text-4xl md:text-6xl font-bold mb-12 text-white leading-tight drop-shadow-lg`}>
            ¿Tomas decisiones a ciegas porque tus datos están dispersos o llegan tarde?
            ¿Sabes realmente qué está pasando en tu negocio?
          </h1>
          
          <div className="space-y-8 mb-16">
            <p className="text-xl md:text-2xl text-gray-300 font-light">
              Las decisiones importantes no pueden esperar a que alguien te mande una planilla con los datos.
            </p>
            <p className="text-xl md:text-2xl bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent font-semibold">
              Con Ventura Analytics, haces preguntas en lenguaje natural a tu propio agente de IA y obtienes respuestas claras y al instante.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="relative">
              <button 
                onClick={() => setShowDemoMenu(!showDemoMenu)}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2"
              >
                <span className="group-hover:animate-pulse">🎯</span>
                <span>Probar gratis</span>
                <span className={`transition-transform duration-300 ${showDemoMenu ? 'rotate-90' : 'group-hover:translate-x-1'}`}>
                  {showDemoMenu ? '▼' : '→'}
                </span>
              </button>
              
              {/* Mini Menu */}
              {showDemoMenu && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-gray-900/95 to-blue-900/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-blue-500/30 p-4 min-w-[280px] z-50">
                  <div className="space-y-3">
                    <div className="text-center mb-4">
                      <h3 className="text-white font-semibold text-lg mb-1">Elige tu demo</h3>
                      <p className="text-gray-300 text-sm">Selecciona el caso de uso que más te interese</p>
                    </div>
                    
                    <button
                      onClick={() => handleDemoOption('callcenter')}
                      className="w-full bg-gradient-to-r from-indigo-600/80 to-blue-600/60 hover:from-indigo-700/90 hover:to-blue-700/70 text-white p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg border border-indigo-500/30 hover:border-indigo-400/50"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">📞</div>
                        <div className="text-left">
                          <div className="font-semibold">Call Center</div>
                          <div className="text-sm text-indigo-200">Análisis de operaciones y KPIs</div>
                        </div>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleDemoOption('retail')}
                      className="w-full bg-gradient-to-r from-purple-600/80 to-pink-600/60 hover:from-purple-700/90 hover:to-pink-700/70 text-white p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg border border-purple-500/30 hover:border-purple-400/50"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">🛒</div>
                        <div className="text-left">
                          <div className="font-semibold">Retail</div>
                          <div className="text-sm text-purple-200">Análisis de ventas y productos</div>
                        </div>
                      </div>
                    </button>
                    
                    <div className="text-center pt-2">
                      <button
                        onClick={() => setShowDemoMenu(false)}
                        className="text-gray-400 hover:text-white text-sm transition-colors"
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <button 
              onClick={() => setCurrentSection('contact')}
              className="border-2 border-blue-400/50 text-blue-300 hover:bg-blue-400/20 hover:text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              Solicitar demo personalizada
            </button>
          </div>
        </div>
      </div>

      {/* Sección de Beneficios */}
      <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/20 rounded-3xl p-8 md:p-12 backdrop-blur-sm shadow-2xl border border-blue-500/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group relative">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/60 p-8 rounded-2xl backdrop-blur-sm shadow-xl border border-gray-600/30 text-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:border-blue-400/50 group-hover:bg-gradient-to-br group-hover:from-blue-900/40 group-hover:to-purple-900/30">
              {/* Decorative element */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">📊</div>
              
              <h3 className={`${playfair.className} text-xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300`}>
                Respuestas instantáneas
              </h3>
              
              <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                Pregunta lo que necesites como si tuvieras un analista dedicado.
              </p>
              
              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-3/4 transition-all duration-500"></div>
            </div>
          </div>

          <div className="group relative">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/60 p-8 rounded-2xl backdrop-blur-sm shadow-xl border border-gray-600/30 text-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:border-blue-400/50 group-hover:bg-gradient-to-br group-hover:from-blue-900/40 group-hover:to-purple-900/30">
              {/* Decorative element */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">⚙️</div>
              
              <h3 className={`${playfair.className} text-xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300`}>
                Conexión sin fricción
              </h3>
              
              <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                Se integra fácilmente con tus herramientas existentes: Excel, Google Sheets, WhatsApp y bases SQL.
              </p>
              
              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-3/4 transition-all duration-500"></div>
            </div>
          </div>

          <div className="group relative">
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/60 p-8 rounded-2xl backdrop-blur-sm shadow-xl border border-gray-600/30 text-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:border-blue-400/50 group-hover:bg-gradient-to-br group-hover:from-blue-900/40 group-hover:to-purple-900/30">
              {/* Decorative element */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">🔒</div>
              
              <h3 className={`${playfair.className} text-xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300`}>
                Seguro y privado
              </h3>
              
              <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                Cifrado completo, sin uso de datos para entrenamiento externo.
              </p>
              
              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-3/4 transition-all duration-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección Cómo Funciona */}
      <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-3xl p-8 md:p-12 backdrop-blur-sm shadow-2xl border border-purple-500/20 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
        <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/80 to-blue-600/80 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
              <span>⚡</span>
              <span>Proceso Simple</span>
            </div>
            
            <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold text-white mb-4`}>
              Cómo funciona
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative">
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/60 p-8 rounded-2xl backdrop-blur-sm shadow-xl border border-gray-600/30 text-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:border-purple-400/50">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">Carga tus datos</h3>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  El equipo de Ventura Analytics te ayuda a cargar tus datos que esten en Excel, SQL, Google Drive o cualquier fuente de datos que uses.
                </p>
                <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/30 p-6 rounded-xl border border-blue-500/20 group-hover:border-purple-400/40 transition-colors">
                  <div className="text-4xl mb-2">📁</div>
                  <p className="text-sm text-gray-400">Excel, CSV, SQL, Sheets...</p>
                </div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/60 p-8 rounded-2xl backdrop-blur-sm shadow-xl border border-gray-600/30 text-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:border-purple-400/50">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">Haz preguntas naturales</h3>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  Una vez implementado, haz preguntas como estas: "¿Cómo van mis ventas esta semana?" o "¿Qué producto rinde más?"
                </p>
                <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/30 p-6 rounded-xl border border-blue-500/20 group-hover:border-purple-400/40 transition-colors">
                  <div className="text-4xl mb-2">💬</div>
                  <p className="text-sm text-gray-400">"¿Cuál es mi margen por producto?"</p>
                </div>
              </div>
            </div>
            
            <div className="group relative">
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/60 p-8 rounded-2xl backdrop-blur-sm shadow-xl border border-gray-600/30 text-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:border-purple-400/50">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">Recibe respuestas y gráficos</h3>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  De forma automática y clara, con visualizaciones que facilitan la toma de decisiones.
                </p>
                <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/30 p-6 rounded-xl border border-blue-500/20 group-hover:border-purple-400/40 transition-colors">
                  <div className="text-4xl mb-2">📈</div>
                  <p className="text-sm text-gray-400">Gráficos + Insights automáticos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección Casos de Uso */}
      <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/20 rounded-3xl p-8 md:p-12 backdrop-blur-sm shadow-2xl border border-blue-500/20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
            <span>🎯</span>
            <span>Casos de Uso</span>
          </div>
          
          <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold text-white mb-16`}>
            Nuestros casos de uso del momento
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <button 
            onClick={() => setCurrentSection('retail')}
            className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 border border-gray-600/30 hover:border-blue-400/50 hover:shadow-2xl hover:bg-gradient-to-br hover:from-blue-900/40 hover:to-purple-900/30"
          >
            {/* Decorative element */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">👜</div>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
              Retail de Accesorios y Carteras
            </h3>
            <p className="text-gray-300 text-lg mb-4 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
              Análisis de ventas, inventario y rentabilidad por producto en tiempo real.
            </p>
            <div className="text-blue-400 font-semibold group-hover:text-white transition-colors duration-300 flex items-center justify-center space-x-2">
              <span>Ver caso de uso</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
            
            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-3/4 transition-all duration-500"></div>
          </button>
          
          <button 
            onClick={() => setCurrentSection('callcenter')}
            className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 border border-gray-600/30 hover:border-blue-400/50 hover:shadow-2xl hover:bg-gradient-to-br hover:from-blue-900/40 hover:to-purple-900/30"
          >
            {/* Decorative element */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">📞</div>
            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
              Call Center
            </h3>
            <p className="text-gray-300 text-lg mb-4 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
              Monitoreo de KPIs, análisis de llamadas y optimización de procesos operativos.
            </p>
            <div className="text-blue-400 font-semibold group-hover:text-white transition-colors duration-300 flex items-center justify-center space-x-2">
              <span>Ver caso de uso</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
            
            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-3/4 transition-all duration-500"></div>
          </button>
        </div>
      </div>

      {/* CTA Final */}
      <div className="relative text-center bg-gradient-to-br from-gray-900/80 to-purple-900/60 p-12 md:p-16 rounded-3xl backdrop-blur-sm shadow-2xl border border-purple-500/30 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full -translate-x-24 translate-y-24"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white px-6 py-2 rounded-full text-sm font-semibold mb-8">
            <span>✨</span>
            <span>Transforma tu negocio</span>
          </div>
          
          <h2 className={`${playfair.className} text-4xl md:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-lg`}>
            ¿Listo para transformar tus datos en decisiones?
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-12">
            Únete a nuestra comunidad de empresas que ya toman mejores decisiones con Ventura Analytics
          </p>
          
          <button
            onClick={() => setCurrentSection('contact')}
            className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-2xl font-bold py-6 px-16 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-3 mx-auto"
          >
            <span className="group-hover:animate-pulse">🚀</span>
            <span>Empieza hoy con Ventura Analytics</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
          
          <p className="text-gray-400 text-sm mt-6">
            Sin compromisos • Soporte en español • Servicio personalizado
          </p>
        </div>
      </div>
    </div>
  )
}

