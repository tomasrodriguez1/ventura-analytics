import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

const WEBHOOK_URL = 'https://venturanalytics.app.n8n.cloud/webhook/e95f8f28-fd1e-4e41-9fc0-3676382f1bd3'

export async function POST(request: NextRequest) {
  try {
    // Obtener los datos del formulario
    const formData = await request.json()
    
    // Validar que tengamos los campos requeridos
    if (!formData.nombre || !formData.empresa || !formData.email || !formData.mensaje) {
      return NextResponse.json(
        { success: false, message: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    // Preparar datos para enviar
    const dataToSend = {
      ...formData,
      timestamp: new Date().toISOString(),
      source: 'website-contact-form'
    }

    // Enviar datos al webhook de N8N desde el servidor
    await axios.post(WEBHOOK_URL, dataToSend, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'VenturaAnalytics-Website/1.0'
      },
      timeout: 15000,
      validateStatus: (status) => status < 500 // Aceptar códigos < 500
    })

    // Respuesta exitosa
    return NextResponse.json({
      success: true,
      message: '¡Gracias! Tu solicitud ha sido enviada exitosamente. Te contactaremos pronto.'
    })

  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500
      
      if (status === 404) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'El webhook de N8N no está disponible. Por favor, contactanos directamente por email.' 
          },
          { status: 200 } // Cambiamos a 200 para que el frontend no trate esto como error de red
        )
      }
      
      return NextResponse.json(
        { 
          success: false, 
          message: `Error del webhook (${status}). Por favor, contactanos directamente por email.` 
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Error interno del servidor. Por favor, contactanos directamente por email: remates.dev@gmail.com' 
      },
      { status: 200 }
    )
  }
}

// Agregar método GET para testing
export async function GET() {
  return NextResponse.json({
    message: 'API de contacto funcionando correctamente',
    timestamp: new Date().toISOString()
  })
} 