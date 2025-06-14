import axios, { AxiosError } from 'axios'

export interface ContactFormData {
  nombre: string;
  empresa: string;
  email: string;
  mensaje: string;
}

export interface ContactServiceResponse {
  success: boolean;
  message: string;
}

export class ContactService {
  // Usar URL completa para evitar problemas de contexto
  private static readonly ENDPOINT = typeof window !== 'undefined' 
    ? `${window.location.origin}/api/contact`
    : '/api/contact';

  static async submitContactForm(formData: ContactFormData): Promise<ContactServiceResponse> {
    try {
      const response = await axios.post(this.ENDPOINT, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 15000, // 15 segundos de timeout
      });

      // La respuesta viene de nuestra API
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        
        if (axiosError.code === 'ECONNABORTED' || axiosError.message.includes('timeout')) {
          // Timeout
          return {
            success: false,
            message: 'La petición tardó demasiado tiempo. Por favor, inténtalo de nuevo.'
          };
        }
        
        if (axiosError.response) {
          // El servidor respondió con un status de error
          const errorData = axiosError.response.data as { message?: string };
          return {
            success: false,
            message: errorData?.message || `Error del servidor (${axiosError.response.status}). Por favor, inténtalo de nuevo.`
          };
        } else if (axiosError.request) {
          // La petición se hizo pero no se recibió respuesta
          return {
            success: false,
            message: 'No se pudo conectar con el servidor. Verifica tu conexión a internet.'
          };
        }
      }
      
      // Verificar si es el error específico "Failed to fetch"
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        return {
          success: false,
          message: 'Error de conexión. Por favor, contactanos directamente por email: remates.dev@gmail.com'
        };
      }
      
      // Error genérico
      return {
        success: false,
        message: 'Hubo un error al enviar tu solicitud. Por favor, contactanos directamente por email.'
      };
    }
  }

  static validateFormData(formData: ContactFormData): { isValid: boolean; message?: string } {
    if (!formData.nombre.trim()) {
      return { isValid: false, message: 'El nombre es requerido' };
    }
    
    if (!formData.empresa.trim()) {
      return { isValid: false, message: 'La empresa es requerida' };
    }
    
    if (!formData.email.trim()) {
      return { isValid: false, message: 'El email es requerido' };
    }
    
    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return { isValid: false, message: 'Por favor, ingresa un email válido' };
    }
    
    if (!formData.mensaje.trim()) {
      return { isValid: false, message: 'El mensaje es requerido' };
    }
    
    return { isValid: true };
  }
} 