'use client'

import { useState } from 'react'
import { Playfair_Display } from 'next/font/google'
import { ContactService, ContactFormData } from '../../services/contactService'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
})

// Componente SVG inline simple y ligero para checkmark
const CheckIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)

// Copy centralizado de la sección
const COPY = {
  hero: {
    headline: 'Transforma tus Datos en Decisiones Rentables',
    description: 'En 45 minutos analizamos tu situación actual y te mostramos oportunidades concretas para monetizar tus datos. Sin costo, sin compromiso.'
  },
  benefits: [
    'Diagnóstico de quick wins en tus datos actuales',
    'Roadmap inicial con ROI estimado por iniciativa',
    'Documento con próximos pasos y recomendaciones'
  ],
  trustNote: 'Respuesta en menos de 24 horas.',
  form: {
    title: 'Solicita tu sesión',
    fields: {
      nombre: {
        label: 'Nombre completo',
        placeholder: 'Ej: María González'
      },
      empresa: {
        label: 'Empresa',
        placeholder: 'Ej: TechCorp'
      },
      email: {
        label: 'Email corporativo',
        placeholder: 'maria@techcorp.com'
      },
      mensaje: {
        label: 'Contexto de tu empresa (opcional)',
        placeholder: 'Ej: Somos una empresa de logística en el área de la minería. Tenemos muchos datos sobre la operación pero no sabemos ocuparlos...'
      }
    },
    button: {
      idle: 'Solicitar sesión estratégica',
      loading: 'Enviando solicitud...'
    },
    privacyNote: 'Tus datos son confidenciales. No compartimos información con terceros.'
  }
}

export default function ContactSection() {
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
    
    const validation = ContactService.validateFormData(formData)
    if (!validation.isValid) {
      setSubmitMessage(validation.message || 'Por favor, completa todos los campos correctamente')
      return
    }

    setIsSubmitting(true)
    setSubmitMessage('')

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
    <section className="w-full bg-gray-50 py-16 sm:py-20 md:py-32" aria-labelledby="contact-heading">
      <div className="w-full px-4 sm:px-6 md:px-12 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* --- COLUMNA IZQUIERDA: Propuesta de Valor --- */}
          <div className="space-y-6 md:space-y-8">
            <h1 id="contact-heading" className="font-[family-name:var(--font-inter)] text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold text-[#0B2A3C] leading-[1.1] mb-6 md:mb-8">
              {COPY.hero.headline}
            </h1>
            
            <p className="text-lg sm:text-xl text-[#6F7A83] leading-relaxed">
              {COPY.hero.description}
            </p>

            {/* Lista de Beneficios */}
            <ul className="space-y-4" role="list">
              {COPY.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckIcon className="w-6 h-6 text-[#2FBF71] flex-shrink-0 mt-1" aria-hidden="true" />
                  <span className="font-medium text-[#0B2A3C]">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            {/* Trust Note */}
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-[#6F7A83]">
                {COPY.trustNote}
              </p>
            </div>
          </div>

          {/* --- COLUMNA DERECHA: Tarjeta de Formulario --- */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B2A3C] mb-6">
              {COPY.form.title}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Grid para campos cortos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Input Nombre */}
                <div className="space-y-2">
                  <label htmlFor="nombre" className="block text-sm font-medium text-[#6F7A83]">
                    {COPY.form.fields.nombre.label}
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder={COPY.form.fields.nombre.placeholder}
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 min-h-[44px] rounded-lg bg-white border border-gray-300 text-[#0B2A3C] focus:outline-none focus:border-[#2FBF71] focus:ring-2 focus:ring-[#2FBF71]/20 transition-all touch-manipulation"
                  />
                </div>

                {/* Input Empresa */}
                <div className="space-y-2">
                  <label htmlFor="empresa" className="block text-sm font-medium text-[#6F7A83]">
                    {COPY.form.fields.empresa.label}
                  </label>
                  <input
                    type="text"
                    id="empresa"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    placeholder={COPY.form.fields.empresa.placeholder}
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 min-h-[44px] rounded-lg bg-white border border-gray-300 text-[#0B2A3C] focus:outline-none focus:border-[#2FBF71] focus:ring-2 focus:ring-[#2FBF71]/20 transition-all touch-manipulation"
                  />
                </div>
              </div>

              {/* Input Email Corporativo */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-[#6F7A83]">
                  {COPY.form.fields.email.label}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={COPY.form.fields.email.placeholder}
                  required
                  aria-required="true"
                  autoComplete="email"
                  className="w-full px-4 py-3 min-h-[44px] rounded-lg bg-white border border-gray-300 text-[#0B2A3C] focus:outline-none focus:border-[#2FBF71] focus:ring-2 focus:ring-[#2FBF71]/20 transition-all touch-manipulation"
                />
              </div>

              {/* Textarea Contexto */}
              <div className="space-y-2">
                <label htmlFor="mensaje" className="block text-sm font-medium text-[#6F7A83]">
                  {COPY.form.fields.mensaje.label}
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder={COPY.form.fields.mensaje.placeholder}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-[#0B2A3C] focus:outline-none focus:border-[#2FBF71] focus:ring-2 focus:ring-[#2FBF71]/20 transition-all resize-none touch-manipulation"
                />
              </div>

              {/* Mensaje de estado */}
              {submitMessage && (
                <div 
                  className={`p-4 rounded-lg ${
                    submitMessage.includes('Gracias') || submitMessage.includes('exitosamente')
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                  role="alert"
                  aria-live="polite"
                >
                  {submitMessage}
                </div>
              )}

              {/* Botón Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#2FBF71] hover:bg-[#25a05e] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 min-h-[44px] rounded-lg shadow-md transition-all duration-200 touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FBF71] focus-visible:ring-offset-2"
                aria-label={isSubmitting ? COPY.form.button.loading : COPY.form.button.idle}
              >
                {isSubmitting ? COPY.form.button.loading : COPY.form.button.idle}
              </button>

              {/* Nota privacidad */}
              <p className="text-center text-xs text-gray-400 mt-4">
                {COPY.form.privacyNote}
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}
