'use client'

import { NextFont } from 'next/dist/compiled/@next/font'
import { useState } from 'react'
import { ContactService, ContactFormData } from '../../services/contactService'

interface ContactProps {
  playfair: NextFont;
}

export default function Contact({ playfair }: ContactProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    nombre: '',
    empresa: '',
    email: '',
    mensaje: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar usando el servicio
    const validation = ContactService.validateFormData(formData)
    if (!validation.isValid) {
      setSubmitMessage(validation.message || 'Por favor, completa todos los campos correctamente')
      return
    }

    setIsSubmitting(true)
    setSubmitMessage('')

    // Usar el servicio para enviar los datos
    const result = await ContactService.submitContactForm(formData)
    
    setSubmitMessage(result.message)
    
    if (result.success) {
      setFormData({
        nombre: '',
        empresa: '',
        email: '',
        mensaje: ''
      })
    }
    
    setIsSubmitting(false)
  }

  return (
    <div className="flex flex-col items-center py-12 space-y-16">
      {/* Header Section */}
      <div className="text-center space-y-6 max-w-4xl">
        <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold text-white mb-8`}>
          Agenda una Reunión
        </h2>
        <p className="text-xl md:text-2xl text-blue-400 font-light">
          Descubre cómo podemos transformar tus datos en decisiones estratégicas
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 mb-12">
        <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
          <div className="text-blue-400 text-3xl mb-4">🎯</div>
          <h3 className="text-xl font-bold text-white mb-3">Demo Interactiva</h3>
          <p className="text-gray-300">
            Interactúa con nuestro agente IA usando datos reales de una boutique de moda para ver cómo puede ayudarte.
          </p>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
          <div className="text-blue-400 text-3xl mb-4">💡</div>
          <h3 className="text-xl font-bold text-white mb-3">Análisis de Necesidades</h3>
          <p className="text-gray-300">
            Evaluaremos juntos tus desafíos específicos en gestión de datos, ventas y toma de decisiones.
          </p>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
          <div className="text-blue-400 text-3xl mb-4">📊</div>
          <h3 className="text-xl font-bold text-white mb-3">Insights en Tiempo Real</h3>
          <p className="text-gray-300">
            Descubre cómo el agente puede responder preguntas específicas sobre ventas, inventario y rendimiento.
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-gray-800/50 rounded-2xl p-8 backdrop-blur-sm max-w-2xl w-full mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
                placeholder="Tu nombre"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Empresa</label>
              <input
                type="text"
                name="empresa"
                value={formData.empresa}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
                placeholder="Nombre de tu empresa"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500"
              placeholder="tu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Mensaje</label>
            <textarea
              name="mensaje"
              value={formData.mensaje}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-blue-500 h-32"
              placeholder="Cuéntanos sobre tu empresa y tus necesidades..."
              required
            />
          </div>

          {/* Mensaje de respuesta */}
          {submitMessage && (
            <div className={`p-4 rounded-lg ${submitMessage.includes('Gracias') || submitMessage.includes('exitosamente') 
              ? 'bg-green-800/50 text-green-300' 
              : 'bg-red-800/50 text-red-300'
            }`}>
              {submitMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
              isSubmitting 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isSubmitting ? 'Enviando...' : 'Agendar Demostración'}
          </button>
        </form>
      </div>

      {/* Additional Info */}
      <div className="text-center max-w-2xl mx-auto px-4">
        <p className="text-gray-300 mb-4">
          ¿Prefieres contactarnos directamente?
        </p>
        <div className="flex justify-center space-x-8">
          <a href="mailto:remates.dev@gmail.com" className="text-blue-400 hover:text-blue-300 flex items-center">
            <span className="mr-2">✉️</span> remates.dev@gmail.com
          </a>
          <a href="tel:+56981538112" className="text-blue-400 hover:text-blue-300 flex items-center">
            <span className="mr-2">📱</span> +56 9 8153 8112
          </a>
        </div>
      </div>
    </div>
  )
}

