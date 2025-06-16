export function generarHtmlParaCorreo(contacto: {
  nombre: string;
  empresa: string;
  email: string;
  mensaje: string;
  timestamp?: string;
}) {
  const estilos = `
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        background: linear-gradient(135deg, #0f1419 0%, #1a1a2e 50%, #16213e 100%);
        margin: 0;
        padding: 20px;
        color: #ffffff;
        line-height: 1.6;
        min-height: 100vh;
      }
      
      .container {
        max-width: 600px;
        margin: 0 auto;
        background: linear-gradient(135deg, rgba(31, 41, 55, 0.9) 0%, rgba(17, 24, 39, 0.8) 100%);
        border-radius: 24px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(75, 85, 99, 0.3);
        backdrop-filter: blur(16px);
        overflow: hidden;
        position: relative;
      }
      
      .container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
        pointer-events: none;
      }
      
      .header {
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(139, 92, 246, 0.6) 100%);
        padding: 32px;
        text-align: center;
        position: relative;
        overflow: hidden;
      }
      
      .header::before {
        content: '';
        position: absolute;
        top: -20px;
        left: -20px;
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
      }
      
      .header::after {
        content: '';
        position: absolute;
        bottom: -30px;
        right: -30px;
        width: 120px;
        height: 120px;
        background: linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(192, 132, 252, 0.2) 100%);
        border-radius: 50%;
      }
      
      .title {
        font-size: 24px;
        font-weight: 700;
        margin: 0 0 8px 0;
        color: #ffffff;
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
      }
      
      .subtitle {
        font-size: 16px;
        font-weight: 400;
        margin: 0;
        color: rgba(255, 255, 255, 0.8);
        position: relative;
        z-index: 1;
      }
      
      .content {
        padding: 32px;
        position: relative;
        z-index: 1;
      }
      
      .field {
        margin-bottom: 24px;
        background: linear-gradient(135deg, rgba(55, 65, 81, 0.6) 0%, rgba(31, 41, 55, 0.4) 100%);
        border-radius: 16px;
        padding: 20px;
        border: 1px solid rgba(75, 85, 99, 0.3);
        transition: all 0.3s ease;
      }
      
      .field:hover {
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%);
        border-color: rgba(59, 130, 246, 0.3);
      }
      
      .label {
        font-weight: 600;
        font-size: 14px;
        color: rgba(147, 197, 253, 1);
        margin-bottom: 8px;
        display: block;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .value {
        font-size: 16px;
        color: #ffffff;
        margin: 0;
        word-wrap: break-word;
        font-weight: 400;
      }
      
      .message-field {
        background: linear-gradient(135deg, rgba(55, 65, 81, 0.8) 0%, rgba(31, 41, 55, 0.6) 100%);
        border-radius: 16px;
        padding: 24px;
        border: 1px solid rgba(75, 85, 99, 0.4);
        margin-bottom: 24px;
      }
      
      .message-field .value {
        line-height: 1.7;
        font-size: 15px;
        white-space: pre-wrap;
      }
      
      .timestamp {
        text-align: center;
        padding: 20px;
        background: linear-gradient(135deg, rgba(17, 24, 39, 0.8) 0%, rgba(31, 41, 55, 0.6) 100%);
        border-radius: 16px;
        border: 1px solid rgba(75, 85, 99, 0.2);
        margin-top: 24px;
      }
      
      .timestamp-text {
        font-size: 14px;
        color: rgba(156, 163, 175, 1);
        margin: 0;
        font-weight: 500;
      }
      
      .footer {
        background: linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.7) 100%);
        padding: 24px 32px;
        text-align: center;
        border-top: 1px solid rgba(75, 85, 99, 0.3);
      }
      
      .footer-text {
        font-size: 13px;
        color: rgba(156, 163, 175, 0.8);
        margin: 0;
        font-weight: 400;
      }
      
      .brand {
        background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-weight: 700;
        font-size: 16px;
      }
      
      .icon {
        font-size: 20px;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
      }
    </style>
  `;

  const html = `
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Nuevo mensaje de contacto - Ventura Analytics</title>
      ${estilos}
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 class="title">
            <span class="icon">📩</span>
            Nuevo mensaje de contacto
          </h1>
          <p class="subtitle">Se ha recibido una nueva consulta desde tu sitio web</p>
        </div>
        
        <div class="content">
          <div class="field">
            <span class="label">Nombre completo</span>
            <p class="value">${contacto.nombre}</p>
          </div>
          
          <div class="field">
            <span class="label">Empresa / Organización</span>
            <p class="value">${contacto.empresa}</p>
          </div>
          
          <div class="field">
            <span class="label">Correo electrónico</span>
            <p class="value">${contacto.email}</p>
          </div>
          
          <div class="message-field">
            <span class="label">Mensaje</span>
            <p class="value">${contacto.mensaje}</p>
          </div>
          
          <div class="timestamp">
            <p class="timestamp-text">
              📅 Recibido el ${new Date(contacto.timestamp || Date.now()).toLocaleString('es-CL', {
                dateStyle: 'full',
                timeStyle: 'medium',
                timeZone: 'America/Santiago'
              })}
            </p>
          </div>
        </div>
        
        <div class="footer">
          <p class="footer-text">
            Este mensaje fue enviado desde el formulario de contacto de 
            <span class="brand">Ventura Analytics</span>
          </p>
        </div>
      </div>
    </body>
  </html>
  `;

  return html;
} 