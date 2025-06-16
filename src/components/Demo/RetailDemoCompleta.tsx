'use client'

import { useState, useEffect } from 'react'
import { NextFont } from 'next/dist/compiled/@next/font'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface DemoProps {
  playfair: NextFont
}

export default function Demo({ playfair }: DemoProps) {
  const [copied, setCopied] = useState<string | null>(null)
  const [openDropdown, setOpenDropdown] = useState<string | null>("Análisis de Ventas")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 2000)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  const toggleDropdown = (categoryTitle: string) => {
    setOpenDropdown(openDropdown === categoryTitle ? null : categoryTitle)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    viewport: { once: true, margin: "-100px" }
  }



  const capabilities = [
    "Análisis de ventas por producto, categoría y canal de venta",
    "Comparación de desempeño entre sucursales o puntos de venta",
    "Identificación de patrones de compra y tendencias estacionales",
    "Cálculo de márgenes de ganancia y rentabilidad por línea de negocio",
    "Evaluación del rendimiento de vendedores y equipos de trabajo",
    "Análisis de inventario, rotación de stock y productos estrella"
  ]

  const questionCategories = [
    {
      title: "Análisis de Ventas",
      questions: [
        "¿Cuáles son mis productos más rentables este mes?",
        "¿Qué canal de venta genera más ingresos?",
        "¿Cuál es mi ticket promedio por cliente?"
      ]
    },
    {
      title: "Comparación de Canales",
      questions: [
        "¿Cómo se comparan las ventas online vs tienda física?",
        "¿Qué productos funcionan mejor en cada canal?",
        "¿Cuál sucursal tiene mejor desempeño este trimestre?"
      ]
    },
    {
      title: "Gestión de Inventario",
      questions: [
        "¿Qué productos tienen baja rotación?",
        "¿Cuáles son mis productos estrella por temporada?",
        "¿Qué stock necesito reponer urgentemente?"
      ]
    },
    {
      title: "Insights Estratégicos",
      questions: [
        "¿Qué tendencias veo en el comportamiento de mis clientes?",
        "¿En qué debería enfocar mis esfuerzos de marketing?",
        "Dame un resumen del desempeño general de mi negocio"
      ]
    }
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-12 p-4">
      {/* Hero Section */}
      <div className="relative text-center bg-gradient-to-br from-gray-900/80 to-purple-900/60 p-12 md:p-16 rounded-3xl backdrop-blur-sm shadow-2xl border border-purple-500/30 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full translate-x-24 translate-y-24"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white px-6 py-2 rounded-full text-sm font-semibold mb-8">
            <span>🛍️</span>
            <span>Caso de Ejemplo de Uso</span>
          </div>
          
          <h1 className={`${playfair.className} text-4xl md:text-6xl font-bold mb-6 text-white leading-tight drop-shadow-lg`}>
            ¿Tienes un negocio retail y te cuesta tomar decisiones?
          </h1>
          <h2 className={`${playfair.className} text-2xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent leading-tight`}>
            Transforma datos dispersos en insights claros al instante.
          </h2>
          
          <p className={`text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-10`}>
            Descubre qué productos, canales y estrategias impulsan realmente tu negocio con nuestro asistente de IA especializado en retail.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => scrollToSection('context')}
              className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2"
            >
              <span className="group-hover:animate-pulse">🎯</span>
              <span>Ver el ejemplo</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button 
              onClick={() => scrollToSection('capabilities')}
              className="border-2 border-purple-400/50 text-purple-300 hover:bg-purple-400/20 hover:text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              Ver capacidades
            </button>
          </div>
        </div>
      </div>

      {/* Capabilities Section */}
      <div id="capabilities" className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 rounded-3xl p-8 md:p-12 backdrop-blur-sm shadow-2xl border border-pink-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5"></div>
        <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-600/80 to-purple-600/80 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
              <span>🤖</span>
              <span>Capacidades del Asistente</span>
            </div>
            
            <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-white mb-4`}>
              ¿Qué puede analizar para tu negocio retail?
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Tu asistente de IA especializado en retail puede ayudarte con:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {capabilities.map((capability, index) => (
              <div key={index} className="group bg-gradient-to-br from-gray-800/60 to-gray-900/40 p-6 rounded-xl backdrop-blur-sm shadow-lg border border-gray-600/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-pink-400/50 hover:bg-gradient-to-br hover:from-pink-900/40 hover:to-purple-900/30">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-300 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
                      {capability}
                    </p>
                  </div>
                </div>
                <div className="mt-4 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Context Section - Boutique Scenario */}
      <motion.section 
        id="context"
        className="bg-gradient-to-br from-gray-900/80 to-purple-900/60 rounded-3xl p-8 md:p-12 backdrop-blur-sm shadow-2xl border border-gray-500/30"
        {...fadeInUp}
      >
        <div className="text-center mb-8">
          <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-white mb-4`}>
            El Escenario: Eres dueño de una tienda de moda
          </h2>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <Image 
              src="/images/img_tiena.png" 
              alt="Imagen de Tienda" 
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="text-gray-200">
            <h3 className={`${playfair.className} text-2xl font-bold mb-6 text-white`}>
              Tu Realidad Diaria
            </h3>
            <p className="text-lg leading-relaxed mb-4">
              Diriges un negocio retail con múltiples canales de venta: tienda física, online, redes sociales. Cada día gestionas inventario, coordinas equipos y buscas maximizar la rentabilidad.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Con cientos de transacciones y múltiples puntos de contacto con clientes, mantener el control de qué funciona y qué no se vuelve cada vez más complejo.
            </p>
            
            <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/30 p-6 rounded-xl border border-purple-500/30">
              <h4 className="text-lg font-bold text-white mb-3">Las preguntas que te haces todos los días:</h4>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>¿Qué productos generan más rentabilidad?</li>
                <li>¿Cuál canal de venta es más efectivo?</li>
                <li>¿Cómo optimizar mi inventario para evitar excesos o faltantes?</li>
                <li>¿Qué estrategias debo implementar para crecer?</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Challenge Section */}
      <motion.section 
        className="bg-gradient-to-br from-red-900/30 to-gray-900/60 rounded-3xl p-8 md:p-12 backdrop-blur-sm shadow-2xl border border-red-500/20"
        {...fadeInUp}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-gray-300">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-600/80 to-orange-600/80 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
              <span>⚠️</span>
              <span>El Desafío</span>
            </div>
            
            <h3 className={`${playfair.className} text-2xl font-bold text-white mb-6`}>
              La realidad de los datos dispersos
            </h3>
            <p className="text-lg leading-relaxed mb-6">
              Tienes los datos, pero están dispersos: ventas en sistemas diferentes, inventario en hojas de cálculo, interacciones de clientes en múltiples plataformas. Sin una visión unificada, tomar decisiones estratégicas se vuelve un desafío constante.
            </p>
            
            <div className="bg-gradient-to-r from-red-900/40 to-orange-900/30 p-6 rounded-xl border border-red-500/30">
              <h4 className="text-lg font-bold text-white mb-3">Decisiones críticas que enfrentas:</h4>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>¿En qué productos o servicios deberías invertir más?</li>
                <li>¿Cuáles canales de venta merecen más recursos?</li>
                <li>¿Cómo optimizar tu estrategia de precios y promociones?</li>
                <li>¿Qué cambios necesitas hacer para aumentar la rentabilidad?</li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <Image 
              src="/images/imagen_desafios.png" 
              alt="Imagen de Desafíos" 
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </motion.section>

      {/* Solution Section */}
      <motion.section 
        className="bg-gradient-to-br from-green-900/30 to-blue-900/60 rounded-3xl p-8 md:p-12 backdrop-blur-sm shadow-2xl border border-green-500/20"
        {...fadeInUp}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center">
            <Image 
              src="/images/image_solucion.png" 
              alt="Imagen de Soluciones" 
              width={600}
              height={400}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          
          <div className="text-gray-300">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600/80 to-blue-600/80 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
              <span>✨</span>
              <span>La Solución</span>
            </div>
            
            <h3 className={`${playfair.className} text-2xl font-bold text-white mb-6`}>
              Aquí es donde nuestro asistente de IA transforma tu negocio:
            </h3>
            
            <div className="bg-gradient-to-r from-green-900/40 to-blue-900/30 p-6 rounded-xl border border-green-500/30 mb-6">
              <ul className="list-disc pl-6 space-y-3 text-gray-300">
                <li>Unifica datos de todos tus canales de venta en una sola vista</li>
                <li>Identifica patrones de compra y comportamiento de clientes</li>
                <li>Analiza la rentabilidad real por producto, canal y período</li>
                <li>Optimiza tu inventario basándose en datos históricos y tendencias</li>
                <li>Compara el desempeño entre diferentes puntos de venta o canales</li>
              </ul>
            </div>
            
            <p className="text-lg leading-relaxed text-white bg-gradient-to-r from-green-800/30 to-blue-800/30 p-4 rounded-lg border border-green-500/20">
              Transforma tu negocio con decisiones basadas en datos. Pregunta específicamente lo que necesitas saber y obtén respuestas claras y accionables al instante.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <div className="text-center -mt-4">
        <div className="inline-flex flex-col items-center space-y-4">
          <div className="bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white px-8 py-4 rounded-2xl backdrop-blur-sm border border-purple-500/30">
            <div className="flex items-center space-x-3">
              <span className="text-2xl animate-bounce">👇</span>
              <div className="text-left">
                <p className="font-bold text-lg">¡Ahora pruébalo tú mismo!</p>
                <p className="text-purple-200 text-sm">Experimenta el poder del análisis inteligente</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2 animate-pulse">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-transparent rounded-full"></div>
            <div className="w-1 h-6 bg-gradient-to-b from-purple-400 to-transparent rounded-full"></div>
            <div className="w-1 h-4 bg-gradient-to-b from-purple-300 to-transparent rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Interactive Demo Section - Now at the end */}
      <div className="bg-gradient-to-br from-gray-900/80 to-purple-900/60 rounded-3xl backdrop-blur-sm shadow-2xl border border-purple-500/30 overflow-hidden relative">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5"></div>
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -translate-x-20 -translate-y-20"></div>
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-purple-900/80 to-pink-900/60 p-8 border-b border-purple-500/20">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
              <span>🛍️</span>
              <span>Demo Interactiva de Retail</span>
            </div>
            <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-white mb-2`}>
              Agente de IA para tu Negocio
            </h2>
            <p className="text-purple-200 text-lg max-w-2xl mx-auto">
              Descubre insights clave sobre tu negocio retail, preguntando lo que tú quieras
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-purple-800/40 to-pink-800/30 p-6 rounded-2xl border border-purple-500/30 mb-6 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">🤖</span>
                  </div>
                  <div>
                    <h3 className={`${playfair.className} text-xl font-semibold text-white`}>
                      Chat con tu Asistente de Retail
                    </h3>
                    <p className="text-purple-200 text-sm">
                      Especializado en Análisis de Negocios
                    </p>
                  </div>
                </div>
                <p className="text-purple-200 text-sm leading-relaxed">
                  Haz preguntas sobre ventas, inventario, canales y rentabilidad en lenguaje natural. Tu asistente entiende el contexto de tu negocio y proporciona insights accionables.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-2xl h-[600px] border-4 border-purple-500/20">
                <iframe src="https://app.relevanceai.com/agents/bcbe5a/fe7fd972a30e-4126-9e21-3a069a8e877c/ee05f801-b505-4863-954a-50cd3191fbc8/embed-chat?hide_tool_steps=true&hide_file_uploads=true&hide_conversation_list=false&bubble_style=agent&primary_color=%2388878c&bubble_icon=pd%2Fchat&input_placeholder_text=Type+your+message...&hide_logo=true&hide_description=false" width="100%" height="100%" frameBorder="0"></iframe>              </div>
            </div>

            {/* Examples Panel */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-purple-800/40 to-pink-800/30 p-6 rounded-2xl border border-purple-500/30 mb-6 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">💡</span>
                  </div>
                  <h3 className={`${playfair.className} text-lg font-semibold text-white`}>
                    Ejemplos de Consultas
                  </h3>
                </div>
                <p className="text-purple-200 text-sm">
                  Haz clic en cualquier categoría, selecciona una pregunta y pégala en el chat
                </p>
              </div>

              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {questionCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="bg-gradient-to-br from-gray-800/60 to-purple-900/40 rounded-xl border border-purple-500/20 overflow-hidden backdrop-blur-sm shadow-lg">
                    {/* Category Header - Clickeable */}
                    <div 
                      className="bg-gradient-to-r from-purple-700/50 to-pink-700/30 px-4 py-3 cursor-pointer hover:from-purple-600/60 hover:to-pink-600/40 transition-all duration-300"
                      onClick={() => toggleDropdown(category.title)}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className={`${playfair.className} text-sm font-semibold text-purple-200`}>
                          {category.title}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-purple-300 text-xs">
                            ({category.questions.length} preguntas)
                          </span>
                          <span className={`text-purple-200 text-sm transition-transform duration-300 ${
                            openDropdown === category.title ? 'rotate-180' : 'rotate-0'
                          }`}>
                            ▼
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Questions List - Collapsible */}
                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      openDropdown === category.title 
                        ? 'max-h-96 opacity-100' 
                        : 'max-h-0 opacity-0'
                    }`}>
                      <div className="p-4 space-y-3 border-t border-purple-500/10">
                        {category.questions.map((question, questionIndex) => (
                          <div key={questionIndex} className="group">
                            <div 
                              className="flex items-start justify-between p-3 rounded-lg hover:bg-purple-800/30 transition-all duration-300 cursor-pointer border border-transparent hover:border-purple-500/30"
                              onClick={() => copyToClipboard(question)}
                            >
                              <p className="text-gray-300 text-xs leading-relaxed flex-1 pr-3 group-hover:text-white transition-colors">
                                {question}
                              </p>
                              <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                <span className="text-white text-xs">
                                  {copied === question ? "✓" : "📋"}
                                </span>
                              </div>
                            </div>
                            {copied === question && (
                              <div className="px-3 pb-2">
                                <span className="text-green-400 text-xs font-medium">✨ Copiado al portapapeles</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="relative bg-gradient-to-r from-purple-900/60 to-pink-900/40 p-6 border-t border-purple-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="mb-4 md:mb-0 flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-purple-200">
                <span className="text-yellow-400">💡</span>
                <span>Tip: Puedes hacer preguntas sobre cualquier aspecto de tu boutique</span>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-purple-200">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span>Datos actualizados</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🔒</span>
                <span>Información segura</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}