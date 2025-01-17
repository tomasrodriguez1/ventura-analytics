'use client'

import { useState, useRef, useEffect } from 'react'
import { NextFont } from 'next/dist/compiled/@next/font'

interface Message {
  type: 'user' | 'bot'
  content: string
}

interface DemoProps {
  playfair: NextFont
  userData: any
}

// Constantes para la API
const API_URL = 'https://api-bcbe5a.stack.tryrelevance.com/latest/agents/trigger'
const API_KEY = 'YOUR_API_KEY' // Reemplaza con tu API key real
const AGENT_ID = '5b877ece-829f-4cc4-a98a-8e961f2512df'

export default function Demo({ playfair, userData }: DemoProps) {
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // Función para obtener respuesta de la API
  const getAIResponse = async (userMessage: string) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': API_KEY
        },
        body: JSON.stringify({
          message: {
            role: 'user',
            content: userMessage
          },
          agent_id: AGENT_ID
        })
      })

      if (!response.ok) {
        throw new Error('Error en la respuesta de la API')
      }

      const data = await response.json()
      return data.output || 'Lo siento, no pude procesar tu pregunta.'
    } catch (error) {
      console.error('Error al llamar a la API:', error)
      return 'Lo siento, hubo un error al procesar tu pregunta. Por favor, intenta de nuevo.'
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    // Agregar mensaje del usuario
    setMessages(prev => [...prev, { type: 'user', content: inputMessage }])
    setInputMessage('')
    setIsLoading(true)

    try {
      // Obtener respuesta de la API
      const aiResponse = await getAIResponse(inputMessage)
      setMessages(prev => [...prev, { type: 'bot', content: aiResponse }])
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: 'Lo siento, hubo un error al procesar tu pregunta. Por favor, intenta de nuevo.' 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-scroll a último mensaje
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Mensaje inicial
  useEffect(() => {
    if (showChat) {
      const welcomeMessage = {
        type: 'bot' as const,
        content: `¡Bienvenido al asistente de análisis! 
        \nPuedes preguntarme sobre:
        \n• Productos más rentables
        \n• Items más vendidos
        \n• Tendencias y recomendaciones`
      }
      setMessages([welcomeMessage])
    }
  }, [showChat])

  if (!showChat) {
    return (
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold mb-6`}>
            Análisis de Ventas - Tienda de Accesorios
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Descubre el poder del análisis de datos en acción
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
            <h3 className={`${playfair.className} text-2xl font-bold mb-4`}>
              Contexto del Negocio
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li>• Tienda especializada en bolsos y carteras de alta calidad</li>
              <li>• Más de 500 ventas mensuales</li>
              <li>• Diversas líneas de productos: casual, premium y accesorios</li>
              <li>• Presencia en múltiples canales de venta</li>
            </ul>
          </div>

          <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
            <h3 className={`${playfair.className} text-2xl font-bold mb-4`}>
              Objetivos del Análisis
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li>• Identificar productos más rentables</li>
              <li>• Analizar tendencias de ventas</li>
              <li>• Optimizar inventario</li>
              <li>• Maximizar márgenes de ganancia</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-8 backdrop-blur-sm text-center">
          <h3 className={`${playfair.className} text-2xl font-bold mb-4`}>
            ¿Listo para explorar los datos?
          </h3>
          <p className="text-gray-300 mb-6">
            Interactúa con nuestro asistente IA para obtener insights valiosos sobre el desempeño de la tienda.
          </p>
          <button
            onClick={() => setShowChat(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-4 px-12 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Iniciar Análisis
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Chat Interface */}
      <div className="text-center mb-8">
        <h2 className={`${playfair.className} text-3xl font-bold mb-4`}>
          Asistente de Análisis
        </h2>
        <p className="text-gray-300 text-lg">
          Pregunta cualquier cosa sobre el desempeño de la tienda
        </p>
      </div>

      {/* Chat Interface */}
      <div className="bg-gray-800/50 rounded-2xl backdrop-blur-sm p-4 h-[600px] flex flex-col">
        {/* Messages Area */}
        <div className="flex-grow overflow-y-auto mb-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-100'
                }`}
              >
                <pre className="whitespace-pre-wrap font-sans">
                  {message.content}
                </pre>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Pregunta sobre tus métricas de ventas..."
            className="flex-grow px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`px-6 py-2 rounded-lg transition-colors ${
              isLoading 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  )
}

