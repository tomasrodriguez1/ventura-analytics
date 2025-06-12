'use client'

import { useState } from 'react'
import { Playfair_Display, Lato } from 'next/font/google'

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
      category: "Métricas Operacionales",
      items: [
        "¿Cuántas llamadas se resolvieron en la primera interacción esta semana?",
        "¿Cuál fue la tasa de abandono durante el mes actual?",
        "¿Cuál es el tiempo promedio de espera de los clientes?"
      ]
    },
    {
      category: "Satisfacción del Cliente",
      items: [
        "¿Cuál es el puntaje CSAT promedio por zona?",
        "¿Qué agentes tienen el NPS más bajo este mes?"
      ]
    },
    {
      category: "Desempeño de Agentes",
      items: [
        "¿Qué agente tuvo la mayor tasa de ocupación esta semana?",
        "Muéstrame cuántas llamadas atendió Juan Pérez ayer."
      ]
    },
    {
      category: "Resúmenes Ejecutivos",
      items: [
        "Genérame un resumen de desempeño general del call center esta semana.",
        "¿Qué tendencias se observan en las encuestas de satisfacción recientes?"
      ]
    }
  ];

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
                Esta aplicación está diseñada para líderes de centros de contacto que buscan tomar decisiones estratégicas a partir de datos reales. Se conecta a una base de datos operacional llamada <strong>venturanalytic_demo</strong> que contiene información completa sobre agentes, llamadas, tickets, encuestas de satisfacción y tiempos de atención. La app utiliza herramientas automáticas para generar métricas clave y ejecutar consultas SQL a partir de lenguaje natural.
            </p>

            <h4 className="text-xl font-semibold mb-2">📊 Datos Disponibles</h4>
            <p className="text-gray-300 mb-4">
                Puedes obtener métricas detalladas sobre:
            </p>
            <ul className="list-disc pl-6 text-gray-300 mb-4">
                <li>Volumen total de llamadas y resolución en primera llamada (FCR)</li>
                <li>Tasa de abandono y nivel de servicio</li>
                <li>Puntajes de satisfacción del cliente (CSAT) y NPS</li>
                <li>Tiempos de espera, conversación y post-llamada</li>
                <li>Desempeño de agentes y tasa de ocupación</li>
                <li>Backlog y resolución de tickets por prioridad y categoría</li>
            </ul>

            <h4 className="text-xl font-semibold mb-2">🧠 Herramientas Inteligentes</h4>
            <p className="text-gray-300 mb-4">
                La app usa dos herramientas clave:
            </p>
            <ul className="list-disc pl-6 text-gray-300 mb-4">
                <li><strong>Metric Generator and Save on Google Drive:</strong> Calcula automáticamente KPIs y los guarda para revisión.</li>
                <li><strong>Get Data From a SQL Query to the DB:</strong> Toma una pregunta en lenguaje natural, genera el query SQL, lo ejecuta, y devuelve el resultado.</li>
            </ul>

            <h4 className="text-xl font-semibold mb-2">💡 Consejos para Aprovechar la App</h4>
            <ul className="list-disc pl-6 text-gray-300">
                <li>
                <strong>Consulta en Lenguaje Natural:</strong> Formula preguntas como: "¿Cuál fue la tasa de abandono la semana pasada?" o "¿Qué agentes tienen menor FCR este mes?"
                </li>
                <li>
                <strong>Métricas y Visualizaciones:</strong> Pide métricas por zona, agente o período. Puedes decir: "Muéstrame el promedio de CSAT por zona este mes."
                </li>
                <li>
                <strong>Análisis de Rendimiento:</strong> Explora datos como "¿Qué día hubo más llamadas perdidas?" o "¿Cuál es la tasa de ocupación promedio por agente?"
                </li>
                <li>
                <strong>Comparativas:</strong> Realiza comparaciones temporales o por grupo: "Compara la satisfacción entre julio y agosto" o "¿Qué categoría tiene más tickets abiertos?"
                </li>
                <li>
                <strong>Soporte y Feedback:</strong> Si algo no se entiende o necesitas métricas más específicas, usa la sección de ayuda o contacta al equipo de soporte.
                </li>
            </ul>
            </div>

            {/* Chat y Sugerencias */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-grow">
                <div className="bg-white rounded-2xl backdrop-blur-sm p-4 h-[600px] shadow-lg">
                <iframe src="https://app.relevanceai.com/agents/bcbe5a/fe7fd972a30e-4126-9e21-3a069a8e877c/ee6865d9-ce3f-4623-a6ca-487524baa58b/embed-chat?starting_message_prompts=&hide_tool_steps=true&hide_file_uploads=true&hide_conversation_list=false&bubble_style=agent&primary_color=%23ffa861&bubble_icon=pd%2Fchat&input_placeholder_text=Type+your+message...&hide_logo=true&hide_description=false" width="100%" height="100%" frameBorder="0"></iframe>
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