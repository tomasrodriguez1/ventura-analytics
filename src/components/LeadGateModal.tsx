'use client'

import React, { useEffect, useState } from 'react'
import { registerLead, ApiError, getErrorMapping } from '@/lib/api'
import { getLeadContext } from '@/lib/zalantosSession'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

type FieldName = 'firstName' | 'lastName' | 'email' | 'privacy'
type FieldErrors = Record<FieldName, string | null>

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const ERROR_IDS: Record<FieldName, string> = {
  firstName: 'lead-first-name-error',
  lastName: 'lead-last-name-error',
  email: 'lead-email-error',
  privacy: 'lead-privacy-error',
}

const initialFieldErrors: FieldErrors = {
  firstName: null,
  lastName: null,
  email: null,
  privacy: null,
}

function getFieldError(field: FieldName, value: string | boolean): string | null {
  if (field === 'firstName') {
    return typeof value === 'string' && value.trim() === '' ? 'Completa tu nombre' : null
  }

  if (field === 'lastName') {
    return typeof value === 'string' && value.trim() === '' ? 'Completa tu apellido' : null
  }

  if (field === 'email') {
    const emailValue = typeof value === 'string' ? value.trim() : ''
    if (emailValue === '') {
      return 'Ingresa tu correo'
    }
    if (!EMAIL_REGEX.test(emailValue)) {
      return 'Ingresa un email válido (ej: nombre@empresa.com)'
    }
    return null
  }

  if (field === 'privacy') {
    return value === true ? null : 'Debes aceptar la política para continuar'
  }

  return null
}

interface LeadGateModalProps {
  pageUrl: string
  onReady: () => void
}

export default function LeadGateModal({ pageUrl, onReady }: LeadGateModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [consentAccepted, setConsentAccepted] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>(initialFieldErrors)
  const [generalError, setGeneralError] = useState<string | null>(null)
  const [isRegistered, setIsRegistered] = useState(false)

  useEffect(() => {
    const context = getLeadContext()

    if (context) {
      setIsRegistered(true)
      onReady()
    } else {
      setIsVisible(true)
    }
  }, [onReady])

  const validateForm = (): {
    errors: FieldErrors
    isValid: boolean
    invalidCount: number
  } => {
    const errors: FieldErrors = {
      firstName: getFieldError('firstName', firstName),
      lastName: getFieldError('lastName', lastName),
      email: getFieldError('email', email),
      privacy: getFieldError('privacy', consentAccepted),
    }

    const invalidCount = Object.values(errors).filter(Boolean).length

    return {
      errors,
      isValid: invalidCount === 0,
      invalidCount,
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLoading) return

    const validation = validateForm()
    setFieldErrors(validation.errors)

    if (!validation.isValid) {
      if (validation.invalidCount >= 2) {
        setGeneralError('Corrige los campos marcados para continuar')
      }
      return
    }

    setGeneralError(null)
    setIsLoading(true)

    try {
      await registerLead({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim().toLowerCase(),
        page: pageUrl,
      })

      setFieldErrors(initialFieldErrors)
      setIsVisible(false)
      setIsRegistered(true)
      onReady()
    } catch (err) {
      console.error('Error en registro:', err)

      if (err instanceof ApiError) {
        const mapping = getErrorMapping(err.code, err.status, err.message, err.detail)

        if (err.code === 'consent_required') {
          setFieldErrors((prev) => ({
            ...prev,
            privacy: 'Debes aceptar la política para continuar',
          }))
        }

        setGeneralError(mapping.userMessage || 'Error al registrar. Intenta nuevamente.')
      } else if (err instanceof Error) {
        setGeneralError('Error inesperado: ' + err.message)
      } else {
        setGeneralError('Error inesperado. Por favor, intenta nuevamente.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleFieldUpdate = (field: FieldName, value: string | boolean) => {
    const updatedError = getFieldError(field, value)
    setFieldErrors((prev) => ({
      ...prev,
      [field]: updatedError,
    }))

    if (generalError) {
      setGeneralError(null)
    }
  }

  if (!isVisible && isRegistered) {
    return (
      <div className="fixed bottom-4 right-4 z-50 max-w-sm rounded-2xl border border-green-200 bg-white/90 shadow-2xl p-4">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-green-900 flex items-center gap-2">
            <span className="text-base">✓</span>
            Ya estás registrado
          </p>
          <p className="text-xs text-gray-600">
            Puedes continuar al chat sin volver a registrarte.
          </p>
        </div>
      </div>
    )
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8">
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
            <span className="text-sm font-medium text-violet-900">Registro Requerido</span>
          </div>

          <h2 className="text-2xl font-bold text-[#0B2A3C] mb-2">Bienvenido al Consultor IA</h2>

          <p className="text-sm text-[#6F7A83]">
            Para acceder al chat, necesitamos algunos datos básicos.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-[#0B2A3C] mb-1">
              Nombre <span className="text-red-500">*</span>
            </label>
            <Input
              id="firstName"
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
                handleFieldUpdate('firstName', e.target.value)
              }}
              placeholder="Juan"
              required
              ariaInvalid={Boolean(fieldErrors.firstName)}
              ariaDescribedBy={fieldErrors.firstName ? ERROR_IDS.firstName : undefined}
              className={`w-full ${fieldErrors.firstName ? 'ring-1 ring-red-400 focus:ring-red-500' : ''}`}
            />
            {fieldErrors.firstName && (
              <p id={ERROR_IDS.firstName} className="mt-1 text-xs text-red-600">
                {fieldErrors.firstName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-[#0B2A3C] mb-1">
              Apellido <span className="text-red-500">*</span>
            </label>
            <Input
              id="lastName"
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
                handleFieldUpdate('lastName', e.target.value)
              }}
              placeholder="Pérez"
              required
              ariaInvalid={Boolean(fieldErrors.lastName)}
              ariaDescribedBy={fieldErrors.lastName ? ERROR_IDS.lastName : undefined}
              className={`w-full ${fieldErrors.lastName ? 'ring-1 ring-red-400 focus:ring-red-500' : ''}`}
            />
            {fieldErrors.lastName && (
              <p id={ERROR_IDS.lastName} className="mt-1 text-xs text-red-600">
                {fieldErrors.lastName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#0B2A3C] mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                handleFieldUpdate('email', e.target.value)
              }}
              placeholder="juan.perez@ejemplo.com"
              required
              ariaInvalid={Boolean(fieldErrors.email)}
              ariaDescribedBy={fieldErrors.email ? ERROR_IDS.email : undefined}
              className={`w-full ${fieldErrors.email ? 'ring-1 ring-red-400 focus:ring-red-500' : ''}`}
            />
            {fieldErrors.email && (
              <p id={ERROR_IDS.email} className="mt-1 text-xs text-red-600">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              id="consent"
              checked={consentAccepted}
              onChange={(e) => {
                setConsentAccepted(e.target.checked)
                handleFieldUpdate('privacy', e.target.checked)
              }}
              className="mt-1 h-4 w-4 text-violet-600 border-gray-300 rounded focus:ring-violet-500"
              aria-invalid={Boolean(fieldErrors.privacy)}
              aria-describedby={fieldErrors.privacy ? ERROR_IDS.privacy : undefined}
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
          {fieldErrors.privacy && (
            <p id={ERROR_IDS.privacy} className="text-xs text-red-600">
              {fieldErrors.privacy}
            </p>
          )}

          {generalError && (
            <div
              className="p-3 bg-red-50 border border-red-200 rounded-lg"
              role="alert"
              aria-live="assertive"
            >
              <p className="text-sm text-red-700">{generalError}</p>
            </div>
          )}

          <Button type="submit" variant="primary" disabled={isLoading} className="w-full">
            {isLoading && (
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            )}
            {isLoading ? 'Registrando...' : 'Registrarme'}
          </Button>
        </form>

        <p className="text-xs text-center text-[#6F7A83] mt-4">
          Tus datos están protegidos y no serán compartidos con terceros.
        </p>
      </div>
    </div>
  )
}
