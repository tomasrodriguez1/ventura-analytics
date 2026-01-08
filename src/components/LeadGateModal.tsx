'use client'

import React, { useState, useEffect } from 'react'
import { registerLead, ApiError, getErrorMapping } from '@/lib/api'
import { getLeadContext } from '@/lib/zalantosSession'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface LeadGateModalProps {
  pageUrl: string
  onReady: () => void
}

export default function LeadGateModal({ pageUrl, onReady }: LeadGateModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Campos del formulario
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [consentAccepted, setConsentAccepted] = useState(false)

  // Verificar si ya existe contexto al montar
  useEffect(() => {
    const context = getLeadContext()
    
    if (context) {
      // Usuario ya registrado, no mostrar modal
      setIsVisible(false)
      onReady()
    } else {
      // Usuario no registrado, mostrar modal
      setIsVisible(true)
    }
  }, [onReady])

  // Validaciones
  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isFormValid = (): boolean => {
    return (
      firstName.trim().length >= 2 &&
      lastName.trim().length >= 2 &&
      isEmailValid(email) &&
      consentAccepted &&
      !isLoading
    )
  }

  // Manejar submit con manejo completo de errores
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isFormValid()) return

    setIsLoading(true)
    setError(null)

    try {
      await registerLead({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim().toLowerCase(),
        page: pageUrl,
      })

      // Registro exitoso
      setIsVisible(false)
      onReady()
    } catch (err) {
      console.error('Error en registro:', err)
      
      if (err instanceof ApiError) {
        // Usar el mapper para obtener mensaje amigable
        const mapping = getErrorMapping(err.code, err.status, err.message, err.detail)
        
        // Casos especiales según el código
        if (err.code === 'consent_required') {
          // Marcar checkbox como no aceptado y mostrar mensaje
          setConsentAccepted(false)
          setError('Debes aceptar la política de privacidad para continuar')
        } else if (err.code === 'invalid_request') {
          // Mostrar detalle si viene
          setError(mapping.userMessage)
        } else if (err.code === 'network_error') {
          setError('Problema de conexión. Verifica tu red e intenta nuevamente.')
        } else if (err.status === 401 || (err.status && err.status >= 500)) {
          setError('Servicio temporalmente no disponible. Intenta más tarde.')
        } else {
          // Usar mensaje del mapping
          setError(mapping.userMessage)
        }
      } else if (err instanceof Error) {
        setError('Error inesperado: ' + err.message)
      } else {
        setError('Error inesperado. Por favor, intenta nuevamente.')
      }
      
      // NO cerrar el modal si hay error
    } finally {
      setIsLoading(false)
    }
  }

  // No renderizar nada si no es visible
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-100 to-violet-100 rounded-full mb-4">
            <svg 
              className="w-5 h-5 text-violet-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
              />
            </svg>
            <span className="text-sm font-medium text-violet-900">
              Registro Requerido
            </span>
          </div>
          
          <h2 className="text-2xl font-bold text-[#0B2A3C] mb-2">
            Bienvenido al Consultor IA
          </h2>
          
          <p className="text-sm text-[#6F7A83]">
            Para acceder al chat, necesitamos algunos datos básicos.
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-[#0B2A3C] mb-1">
              Nombre <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Juan"
              required
              className="w-full"
            />
          </div>

          {/* Apellido */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-[#0B2A3C] mb-1">
              Apellido <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Pérez"
              required
              className="w-full"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#0B2A3C] mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="juan.perez@ejemplo.com"
              required
              className="w-full"
            />
          </div>

          {/* Consentimiento */}
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              id="consent"
              checked={consentAccepted}
              onChange={(e) => setConsentAccepted(e.target.checked)}
              className="mt-1 h-4 w-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
            />
            <label htmlFor="consent" className="text-sm text-[#6F7A83] flex-1">
              Acepto que Zalantos almacene mis datos para mejorar la experiencia del chat y enviar comunicaciones relevantes. Puedes consultar nuestra política de privacidad en{' '}
              <a 
                href="https://zalantos.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-violet-600 hover:text-violet-700 underline"
              >
                zalantos.com
              </a>
              .
            </label>
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Botón */}
          <Button
            type="submit"
            variant="primary"
            disabled={!isFormValid()}
            className="w-full"
          >
            {isLoading ? 'Registrando...' : 'Continuar al Chat'}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-xs text-center text-[#6F7A83] mt-4">
          Tus datos están protegidos y no serán compartidos con terceros.
        </p>
      </div>
    </div>
  )
}
