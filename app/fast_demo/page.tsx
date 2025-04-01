'use client'

import { useState, useEffect } from 'react'
import { Playfair_Display, Lato } from 'next/font/google'
import { motion } from 'framer-motion'
import Image from 'next/image'

const playfair = Playfair_Display({ subsets: ['latin'] })
const lato = Lato({ weight: ['400', '700'], subsets: ['latin'] })

export default function FastDemo() {
  const [copied, setCopied] = useState<string | null>(null)
  const [hoveredQuestion, setHoveredQuestion] = useState<string | null>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 2000) // Clear the copied state after 2 seconds
  }

  const questions = [
    {
      category: "Métricas Específicas",
      items: [
        "¿Cuál es el margen de ganancia promedio de los bolsos en la Sucursal 1?",
        "Muéstrame los 5 productos más vendidos en el último mes.",
        "¿Cuál ha sido el producto con mayor revenue en los últimos 7 días?"
      ]
    },
    {
      category: "Análisis Comparativo",
      items: [
        "Compara las ventas de la Sucursal 1 y la Sucursal 2 durante el último mes.",
        "¿Cuál es la diferencia en ventas entre el mejor día de la semana y el peor?"
      ]
    },
    {
      category: "Inventario y Almacenamiento",
      items: [
        "¿Cuál es el nivel actual de inventario de carteras en Storage S1?",
        "¿Qué productos tienen menos de 10 unidades en el Storage Principal?",
        "¿Que productos debería encargar y para que locación?"
      ]
    },
    {
      category: "Resúmenes",
      items: [
        "¿Cómo ha evolucionado el volumen de ventas por canal (Instagram, web, tienda física) en las últimas semanas?",
        "¿Qué método de pago ha sido el más utilizado en el último mes?"
      ]
    }
  ]

  return (
    <div className={`min-h-screen flex flex-col text-white ${lato.className} relative`}>
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url("./images/image.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: '0.2'
        }}
      />
      
      {/* Overlay gradient */}
      <div 
        className="fixed inset-0 z-0 bg-gradient-to-b from-black/50 to-black/70"
      />

      {/* Content */}
      <div className="relative z-10">
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto bg-gray-800/50 p-8 rounded-lg backdrop-blur-sm">
            {/* Título */}
            <div className="text-center mb-8">
              <h1 className={`${playfair.className} text-4xl font-bold mb-4 text-white`}>
                Ventura Analytics - Demo Rápida
              </h1>
              <p className="text-gray-300 text-lg">
                Descubre insights clave sobre tu negocio, preguntando lo que tú quieras.
              </p>
            </div>

            {/* Contexto Clave para el Uso Completo de la App */}
            <div className="mb-8 bg-blue-900/70 p-6 rounded-lg shadow-lg text-white">
              <h3 className="text-2xl font-bold mb-4">🚀 Contexto Clave</h3>
              <p className="text-gray-300 mb-4">
                La aplicación está diseñada para obtener insights valiosos de los negocios. Para efectos de esta demo, se ha utilizado una tienda de accesorios que vende carteras, neceseres y bolsos. Los datos disponibles abarcan desde marzo de 2024 hasta agosto del mismo año, permitiéndote obtener información valiosa a través de un chat en lenguaje natural.
              </p>
              
              <h4 className="text-xl font-semibold mb-2">📊 Datos Disponibles</h4>
              <p className="text-gray-300 mb-4">
                Puedes obtener métricas detalladas sobre:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-4">
                <li>Costos de productos y operaciones</li>
                <li>Niveles de inventario en tiempo real</li>
                <li>Historial de ventas por producto, categoría y período</li>
                <li>Métodos de pago utilizados por los clientes</li>
                <li>Rendimiento por ubicación de venta</li>
                <li>Rotación de productos y tendencias</li>
              </ul>
              
              <h4 className="text-xl font-semibold mb-2">📍 Locaciones de Almacenamiento</h4>
              <p className="text-gray-300 mb-4">
                El sistema considera 3 ubicaciones principales de almacenamiento:
              </p>
              <ul className="list-disc pl-6 text-gray-300 mb-4">
                <li><strong>Storage Principal:</strong> Almacén central donde se recibe y distribuye la mercancía</li>
                <li><strong>Storage S1:</strong> Almacén secundario para la primera sucursal</li>
                <li><strong>Storage S2:</strong> Almacén secundario para la segunda sucursal</li>
              </ul>
              
              <h4 className="text-xl font-semibold mb-2">💡 Consejos para Aprovechar la App</h4>
              <ul className="list-disc pl-6 text-gray-300">
                <li>
                  <strong>Consulta en Lenguaje Natural:</strong> Formula tus preguntas de forma directa, como si conversaras con una persona. Ejemplo: "¿Cuántas carteras se vendieron en abril?" o "Muéstrame un gráfico de ventas de bolsos por sucursal."
                </li>
                <li>
                  <strong>Métricas y Visualizaciones:</strong> Solicita reportes, gráficos y comparativas para explorar datos específicos. La app identifica si necesitas métricas, visualizaciones o reportes completos, procesando la información de manera automática.
                </li>
                <li>
                  <strong>Análisis de Inventario:</strong> Pregunta sobre niveles de stock en cada ubicación, como "¿Cuál es el inventario actual de neceseres en Storage S1?" o "¿Qué productos están por debajo del nivel mínimo de stock?"
                </li>
                <li>
                  <strong>Comparativas:</strong> Compara rendimiento entre productos, períodos o ubicaciones con preguntas como "Compara las ventas de bolsos entre marzo y agosto" o "¿Qué ubicación tiene mejor rotación de carteras?"
                </li>
                <li>
                  <strong>Soporte y Feedback:</strong> Si necesitas ayuda o deseas personalizar alguna consulta, utiliza la sección de ayuda o contacta al soporte para mejorar continuamente la experiencia.
                </li>
              </ul>
            </div>

            {/* Chat y Sugerencias */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-grow">
                <div className="bg-white rounded-2xl backdrop-blur-sm p-4 h-[600px] shadow-lg">
                <iframe src="https://app.relevanceai.com/agents/bcbe5a/fe7fd972a30e-4126-9e21-3a069a8e877c/ee05f801-b505-4863-954a-50cd3191fbc8/embed-chat?hide_tool_steps=false&hide_file_uploads=false&hide_conversation_list=true&bubble_style=agent&primary_color=%2388878c&bubble_icon=pd%2Fchat&input_placeholder_text=Type+your+message...&hide_logo=true"
                 width="100%" 
                 height="100%" 
                 frameBorder="0">
                 </iframe>
                </div>
              </div>

              <div className="w-full md:w-1/3 space-y-4">
                <div className="bg-gray-700/50 rounded-xl p-6 backdrop-blur-sm shadow-lg">
                  <h3 className="text-lg font-bold text-white mb-4">Prueba preguntar:</h3>
                  
                  <div className="space-y-6">
                    {questions.map((section, sectionIndex) => (
                      <div key={sectionIndex}>
                        <h4 className="text-blue-400 text-sm mb-2">{section.category}</h4>
                        <ul className="text-gray-300 text-sm space-y-2">
                          {section.items.map((question, index) => (
                            <li 
                              key={index}
                              onClick={() => copyToClipboard(question)}
                              onMouseEnter={() => setHoveredQuestion(question)}
                              onMouseLeave={() => setHoveredQuestion(null)}
                              className="relative cursor-pointer hover:text-blue-400 transition-colors"
                            >
                              • {question} {copied === question && <span className="text-green-400">(Copiado)</span>}
                              {hoveredQuestion === question && (
                                <span className="absolute left-full ml-2 bg-black text-white text-xs rounded px-2 py-1">
                                  Haz clic para copiar
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Limitaciones del Sistema - AHORA ABAJO */}
            <div className="mt-8 bg-gray-900/70 p-6 rounded-lg shadow-lg text-white">
              <h3 className="text-2xl font-bold mb-4">📌 Importante: Limitaciones del Sistema</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xl font-semibold">🔍 Disponibilidad de Datos</h4>
                  <ul className="list-disc pl-6 text-gray-300">
                    <li>✔️ Los datos están disponibles desde marzo hasta julio del 2024.</li>
                    <li>✔️ Se actualizan periódicamente, no en tiempo real.</li>
                    <li>⚠️ La integridad y precisión dependen de la fuente original.</li>
                    <li>⚠️ Pueden existir retrasos en la actualización en periodos de alta demanda.</li>
                  </ul>
                  <h4 className="text-xl font-semibold mt-4">🛍️ Productos Incluidos</h4>
                  <p className="text-gray-300">
                    El análisis está basado en los siguientes productos: ✅ Bolsos, Carteras y Neceseres. Solo se consideran estos productos definidos; actualizaciones de catálogo o nuevas categorías no están contempladas.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold">📈 Gráficos y Representación Visual</h4>
                  <ul className="list-disc pl-6 text-gray-300">
                    <li>✔️ Se muestran tendencias generales y métricas clave a partir de los datos disponibles.</li>
                    <li>⚠️ La precisión de los gráficos depende de la calidad y consistencia de los datos.</li>
                    <li>⚠️ Las opciones de personalización están limitadas a configuraciones predefinidas.</li>
                  </ul>
                  <h4 className="text-xl font-semibold mt-4">🌎 Factores Externos No Considerados</h4>
                  <ul className="list-disc pl-6 text-gray-300">
                    <li>⚠️ El análisis no incluye el impacto de promociones, cambios en la demanda o problemas de stock.</li>
                    <li>⚠️ No se consideran variables macroeconómicas ni acciones de la competencia.</li>
                    <li>⚠️ Eventos extraordinarios o contextos específicos del negocio no se reflejan en los reportes.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center text-gray-400 text-sm">
              <p>© 2023 Ventura Analytics. Todos los derechos reservados.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 