'use client'

import { useState, useEffect } from 'react'
import { NextFont } from 'next/dist/compiled/@next/font'
import { motion } from 'framer-motion'
import Register from './Register'
import Image from 'next/image'

// Define un tipo específico en lugar de 'any'
// interface UserData {
//   // Define las propiedades que realmente usas
// }

interface DemoProps {
  playfair: NextFont
  // Eliminar userData si no se usa
  // userData: UserData
}

export default function Demo({ playfair }: DemoProps) {
  const [showDemo, setShowDemo] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [hoveredQuestion, setHoveredQuestion] = useState<string | null>(null)

  useEffect(() => {
    // Asegurar que la página se cargue desde la parte superior
    window.scrollTo(0, 0)

    // Verificar si el usuario se registró en la última hora
    const lastRegisterTime = localStorage.getItem('lastRegisterTime')
    if (lastRegisterTime) {
      const currentTime = new Date().getTime()
      const timeDifference = currentTime - parseInt(lastRegisterTime, 10)
      const oneHour = 60 * 60 * 1000

      if (timeDifference < oneHour) {
        setShowDemo(true)
      }
    }
  }, [])

  const handleStartDemo = () => {
    setShowRegister(true)
  }

  const handleRegisterComplete = () => {
    setShowRegister(false)
    setShowDemo(true)
    // Guardar el tiempo actual como el último registro
    localStorage.setItem('lastRegisterTime', new Date().getTime().toString())
  }

  // Variantes para las animaciones
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    viewport: { once: true, margin: "-100px" }
  }

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
      category: "Resúmenes y Tendencias",
      items: [
        "¿Qué tendencias de venta se observan en el último trimestre?",
        "¿Cómo ha evolucionado el volumen de ventas por canal (Instagram, web, tienda física) en las últimas semanas?",
        "¿Qué método de pago ha sido el más utilizado en el último mes?"
      ]
    },
    {
      category: "Preguntas con Gráficos para Insights Visuales",
      items: [
        "Muestra un heatmap de ventas por día de la semana en la Sucursal 1.",
        "¿Qué material ha sido más rentable en los últimos tres meses?",
        "¿Cuál ha sido el rendimiento de cada vendedor por mes?",
        "¿Cómo ha cambiado la rotación de categorías en los últimos tres meses?"
      ]
    }
  ]

  // Si estamos mostrando la demo, solo mostramos el chat
  if (showDemo) {
    return (
      <div className="max-w-6xl mx-auto bg-gray-800/50 p-8 rounded-lg backdrop-blur-sm">
        {/* Limitaciones del Sistema de Análisis de Ventas */}
        <div className="mb-8 bg-gray-900/70 p-6 rounded-lg shadow-lg text-white">
          <h3 className="text-2xl font-bold mb-4">📌 Importante: Limitaciones del Sistema</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-xl font-semibold">🔍 Disponibilidad de Datos</h4>
              <ul className="list-disc pl-6 text-gray-300">
                <li>✔️ Los datos están disponibles desde marzo hasta julio.</li>
                <li>✔️ Se actualizan periódicamente, no en tiempo real.</li>
                <li>⚠️ Si el período de ventas aún no ha concluido, los datos pueden estar incompletos.</li>
              </ul>
              <h4 className="text-xl font-semibold mt-4">🛍️ Productos Incluidos</h4>
              <p className="text-gray-300">El análisis está basado en los siguientes productos: ✅ Bolsos, Carteras, Gorros, Neceseres, Shoppers y Sombreros.</p>
              <h4 className="text-xl font-semibold mt-4">📊 Alcance del Análisis</h4>
              <ul className="list-disc pl-6 text-gray-300">
                <li>✔️ Puedes comparar ventas entre sucursales y plataformas de venta.</li>
                <li>✔️ Puedes ver tendencias de productos, colores, tamaños y materiales.</li>
                <li>⚠️ No se incluyen datos por hora ni combinaciones avanzadas de filtros.</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold">📈 Gráficos y Representación Visual</h4>
              <ul className="list-disc pl-6 text-gray-300">
                <li>✔️ Se muestran tendencias generales y métricas clave.</li>
                <li>⚠️ Algunas métricas pueden no ser aptas para gráficos si los datos son insuficientes.</li>
              </ul>
              <h4 className="text-xl font-semibold mt-4">🌎 Factores Externos No Considerados</h4>
              <ul className="list-disc pl-6 text-gray-300">
                <li>⚠️ El análisis no incluye impacto de promociones, cambios de demanda o problemas de stock.</li>
                <li>⚠️ Para una interpretación completa, es importante considerar el contexto del negocio.</li>
              </ul>
              <h4 className="text-xl font-semibold mt-4">⚙️ Cálculo de Métricas y Tendencias</h4>
              <ul className="list-disc pl-6 text-gray-300">
                <li>✔️ Se usan fórmulas predefinidas para márgenes, rotaciones y tendencias.</li>
                <li>⚠️ No se reflejan descuentos específicos ni costos ocultos.</li>
                <li>⚠️ Las tendencias están basadas en datos históricos y no garantizan proyecciones futuras.</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-gray-300">📞 ¿Tienes dudas? Si necesitas más información, contacta a nuestro equipo de soporte.</p>
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="text-blue-400 text-lg font-bold mb-2">⬇️ Desliza hacia abajo para ver el chat ⬇️</p>
          <h2 className={`${playfair.className} text-4xl font-bold mb-4 text-white`}>
            Agente de Inteligencia Artificial
          </h2>
          <p className="text-gray-300 text-lg">
            Descubre insights clave sobre la boutique de moda, preguntando lo que tú quieras.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-grow">
            <div className="bg-white rounded-2xl backdrop-blur-sm p-4 h-[800px] shadow-lg">
              <iframe 
                src="https://app.relevanceai.com/agents/bcbe5a/fe7fd972a30e-4126-9e21-3a069a8e877c/5b877ece-829f-4cc4-a98a-8e961f2512df/embed-chat?hide_tool_steps=false&hide_file_uploads=false&hide_conversation_list=false&bubble_style=agent&primary_color=%23685FFF&bubble_icon=pd%2Fchat&input_placeholder_text=Type+your+message...&hide_logo=false" 
                className="w-full h-full bg-white rounded-lg"
                frameBorder="0"
                title="Chat con Asistente IA"
              />
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
      </div>
    )
  }

  // Si no estamos mostrando la demo, mostramos la introducción
  return (
    <div className="w-full">
      {/* Título principal */}
      <div className="text-center py-2 bg-transparent"> {/* Reducido el padding */}
        <h2 className={`${playfair.className} text-4xl md:text-6xl font-bold text-white`}>
          Caso de Ejemplo de Uso
        </h2>
      </div>

      {/* Hero Section */}
      <motion.section 
        className="min-h-screen w-full flex items-center justify-center mb-4"
        {...fadeInUp}
      >
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="bg-black/50 p-8 rounded-lg flex flex-col md:flex-row w-full gap-8">
            <div className="w-full md:w-1/2">
              <Image 
                src="/images/img_tiena.png" 
                alt="Imagen de Tienda" 
                className="w-full h-auto rounded-lg shadow-lg"
                width={500}
                height={300}
              />
            </div>
            <div className="w-full md:w-1/2 text-left text-gray-200">
              <h3 className={`${playfair.className} text-3xl font-bold mb-6`}>
                Imagina que diriges una boutique de moda
              </h3>
              <p className="text-xl leading-relaxed mb-4">
                Imagina que diriges una boutique de moda con dos sucursales. Tus días transcurren entre coordinar vendedores, gestionar el inventario de ambas tiendas y mantener activas tus ventas en Instagram, WhatsApp y otras plataformas. Con más de 150 ventas mensuales distribuidas entre todos estos canales de ventas, mantener el control se vuelve cada vez más desafiante.
              </p>
              <p className="text-xl leading-relaxed mb-4">
                Las preguntas se acumulan día a día:
              </p>
              <ul className="list-disc pl-6 mb-4 text-xl">
                <li>¿Qué colores y tallas tienen mejor rotación en cada sucursal?</li>
                <li>¿Cuál vendedor está generando más ingresos y por qué?</li>
                <li>¿Qué categorías de productos dan mejor margen de ganancia?</li>
                <li>¿Las ventas por Instagram superan a las de la tienda física?</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Desafíos Section */}
      <motion.section 
        className="w-full flex items-center justify-center py-16 mb-4"
        {...fadeInUp}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
          
          <div className="w-full md:w-1/2 bg-gray-700/50 p-6 rounded-xl text-gray-300">
            <h4 className="text-xl font-bold text-white mb-3">
              El desafío de los datos dispersos
            </h4>
            <p className="text-xl leading-relaxed mb-4">
              Aunque cuentas con los datos necesarios, estos suelen estar dispersos y desorganizados: ventas registradas en hojas de cálculo, conversaciones en WhatsApp, interacciones en Instagram y las notas de los vendedores. Sin una perspectiva integral, tomar decisiones pasa de ser un proceso estratégico a uno basado únicamente en la intuición.            </p>
            <h4 className="text-xl font-bold text-white mb-3">
              Decisiones críticas pendientes:
            </h4>
            <ul className="list-disc pl-6 mb-4 text-xl leading-relaxed">
              <li>¿Es más rentable invertir en inventario de bolsos o accesorios?</li>
              <li>¿Cuál sucursal necesita refuerzo en personal de ventas?</li>
              <li>¿Qué productos deberías promocionar más en redes sociales?</li>
              <li>¿Vale la pena mantener todas las tallas y colores en ambas sucursales?</li>
            </ul>
          </div>
          <div className="w-full md:w-1/2">
            <Image 
              src="/images/imagen_desafios.png" 
              alt="Imagen de Desafíos" 
              className="w-full h-auto rounded-lg shadow-lg"
              width={500}
              height={300}
            />
          </div>
        </div>
      </motion.section>

      {/* Soluciones Section */}
      <motion.section 
        className="w-full flex items-center justify-center py-16 mb-4"
        {...fadeInUp}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
            <Image 
              src="/images/image_solucion.png" 
              alt="Imagen de Soluciones" 
              className="w-full h-auto rounded-lg shadow-lg"
              width={500}
              height={300}
            />
          </div>
          <div className="w-full md:w-1/2 bg-gray-700/50 p-6 rounded-xl text-gray-300">
            <h4 className="text-xl font-bold text-white mb-3">
              Aquí es donde nuestro asistente de IA transforma tu negocio:
            </h4>
            <ul className="list-disc pl-6 mb-4 text-xl leading-relaxed">
              <li>Analiza ventas por categoría, color, talla y material en todas tus sucursales y canales.</li>
              <li>Identifica qué vendedores tienen mejor desempeño con ciertos tipos de productos.</li>
              <li>Compara el rendimiento entre sucursales y canales de venta.</li>
              <li>Detecta patrones de compra y preferencias por temporada.</li>
              <li>Calcula márgenes de ganancia por producto y categoría.</li>
            </ul>
            <p className="text-xl leading-relaxed mb-4 text-white">
              Ya no más decisiones basadas en corazonadas. Con nuestro asistente, podrás preguntar específicamente lo que necesitas saber: "¿Qué bolsos tienen mejor margen de ganancia en la sucursal norte?" o "¿Cuál es mi vendedor estrella en accesorios?" y obtener respuestas precisas al instante.
            </p>
          </div>
          
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="w-full bg-gray-900 py-20 text-center"
        {...fadeInUp}
      >
        <div className="container mx-auto px-4">
          <h3 className={`${playfair.className} text-4xl font-bold mb-4 text-white`}>
            ¿Listo para analizar tu boutique?
          </h3>
          <p className="text-xl mb-8 text-gray-300">
            Nuestro asistente está listo para responder todas tus preguntas. Prueba preguntando:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-300">&quot;¿Cuál es el margen de ganancia promedio en bolsos de la sucursal 1?&quot;</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-300">"¿Qué vendedor tiene mejor desempeño en ventas de accesorios?"</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-300">"¿Cuáles son los colores más vendidos en Instagram vs tienda física?"</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-300">"¿Qué categorías de productos tienen mejor rotación este mes?"</p>
            </div>
          </div>
          <button
            onClick={handleStartDemo}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-4 px-12 rounded-lg 
                     transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Comenzar a Preguntar
          </button>
        </div>
      </motion.section>

      {/* Modal de Registro */}
      {showRegister && (
        <Register
          playfair={playfair}
          onRegisterComplete={handleRegisterComplete}
          onClose={() => setShowRegister(false)}
        />
      )}
    </div>
  )
}

