const definitions = [
  {
    term: 'Dato Personal',
    description: 'Cualquier información vinculada o referida a una persona natural identificada o identificable.',
  },
  {
    term: 'Dato Sensible',
    description:
      'Datos personales que se refieren a características físicas, morales o circunstancias de la vida privada (ej. salud, hábitos, origen racial).',
  },
  {
    term: 'Tratamiento de Datos',
    description:
      'Cualquier operación o conjunto de operaciones técnicas, automatizadas o no, que permitan recolectar, organizar, transmitir o cancelar datos personales.',
  },
  {
    term: 'Consultor AI',
    description: 'La herramienta basada en Modelos de Lenguaje Grande (LLM) que Zalantos utiliza para interacción automatizada.',
  },
]

const purposes = [
  'Operar, mantener y entregar todas las funcionalidades del sitio y del Consultor AI.',
  'Gestionar consultas comerciales, enviar propuestas y cumplir la relación contractual.',
  'Analizar métricas de uso y calidad del servicio para detectar oportunidades de mejora y depurar errores.',
  'Detectar, prevenir y responder a riesgos técnicos, fraudes o amenazas.',
  'Cumplir con obligaciones legales, contables y tributarias vigentes en Chile.',
]

const treatmentBases = [
  'Consentimiento expreso cuando el usuario acepta esta política o inicia una conversación con el Consultor AI.',
  'Ejecución contractual para cumplir los términos de servicio o contratos de desarrollo acordados.',
  'Interés legítimo orientado a mantener la seguridad, prevenir fraudes y mejorar nuestros servicios siempre protegidos los derechos fundamentales.',
]

const rights = [
  'Acceso: Saber qué información procesamos sobre el titular.',
  'Rectificación: Corregir datos inexactos o desactualizados.',
  'Cancelación: Eliminar datos que ya no son necesarios o cuando se retira el consentimiento.',
  'Oposición: Oponerse a tratamientos específicos como marketing.',
]

const retentionPeriods = [
  'Clientes y leads: Mientras dure la relación o hasta 24 meses después del último contacto, salvo solicitud de eliminación.',
  'Logs de conversación (IA): Conservación entre 6 y 24 meses para auditoría y mejora continua, luego se anonimizan o eliminan.',
  'Logs de seguridad: Entre 3 y 12 meses para análisis forense según criticidad.',
]

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 px-4 text-gray-800">
      <div className="mx-auto max-w-3xl space-y-12 sm:px-6 lg:px-0">
        <header className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-500">Política de privacidad</p>
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Confianza, transparencia y control sobre tus datos</h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Zalantos SPA reconoce la importancia de proteger los datos personales de sus usuarios, clientes y visitantes.
            Esta Política explica cómo recopilamos, tratamos, almacenamos y compartimos la información en cumplimiento con la Ley
            N° 19.628 sobre Protección de la Vida Privada y otras buenas prácticas internacionales.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">1. Introducción y compromiso</h2>
          <p className="leading-relaxed">
            Zalantos SPA, sociedad legalmente constituida en Chile con RUT 76.882.235-2 y domicilio en Padre mariano 210 Of.
            405, Providencia, se compromete a manejar la información personal con responsabilidad, confidencialidad y rigurosos
            estándares de seguridad.
          </p>
          <p className="leading-relaxed">
            Esta Política regula el tratamiento de datos en nuestros sitios corporativos, plataformas SaaS, servicios de consultoría,
            desarrollo a medida e interacciones con el Consultor AI.
          </p>
        </section>

        <section className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-900">2. Definiciones clave</h2>
            <p className="text-gray-600 leading-relaxed">
              Para facilitar la comprensión del documento definimos los principales conceptos utilizados a lo largo de esta política.
            </p>
          </div>
          <dl className="space-y-4 border-l-2 border-gray-200 pl-5">
            {definitions.map((definition) => (
              <div key={definition.term}>
                <dt className="text-base font-semibold text-gray-900">{definition.term}</dt>
                <dd className="text-gray-700 leading-relaxed">{definition.description}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">3. Datos que recopilamos</h2>
          <p className="leading-relaxed">
            Zalantos limita la recolección de datos a lo estrictamente necesario para la prestación del servicio y para fines legítimos
            de operación y seguridad.
          </p>
          <div className="space-y-4">
            <article className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">3.1 Datos proporcionados por el Usuario</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 leading-relaxed">
                <li>Información de identificación y contacto: nombre completo, correo, teléfono, cargo y empresa.</li>
                <li>Contenido de comunicaciones compartidas en formularios, correos o sesiones con el Consultor AI.</li>
                <li>Datos de facturación (razón social, RUT, giro, dirección) en caso de contratación.</li>
              </ul>
            </article>
            <article className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">3.2 Datos de navegación y uso</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 leading-relaxed">
                <li>Datos técnicos: dirección IP anonimizada o hasheada, navegador, sistema operativo, ISP.</li>
                <li>Datos de interacción: timestamps, páginas visitadas, tiempo de permanencia, session_id y flujos.</li>
                <li>Logs de seguridad: intentos de acceso, limitación de tasas y detección de anomalías.</li>
              </ul>
            </article>
            <article className="space-y-2 bg-[#f8fafc] border border-gray-200 rounded-lg p-4 text-gray-800">
              <h3 className="text-lg font-semibold text-gray-900">3.3 Datos en el Consultor AI</h3>
              <p className="leading-relaxed">
                Al interactuar con el Consultor AI, los textos ingresados son procesados para generar respuestas. No se recomienda incluir
                información sensible (claves bancarias, contraseñas, datos de salud o RUT de terceros sin autorización), ya que la responsabilidad
                por su divulgación recae en el Usuario. Zalantos aplica filtros de seguridad, pero no garantiza la completa eliminación de esos datos
                cuando se ingresan en campos de texto libre.
              </p>
            </article>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">4. Finalidad del tratamiento</h2>
          <p className="leading-relaxed">
            Los datos recopilados se usan exclusivamente para los fines indicados a continuación y no se emplean para propósitos distintos sin previo aviso.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 leading-relaxed">
            {purposes.map((purpose) => (
              <li key={purpose}>{purpose}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">5. Bases legales</h2>
          <p className="leading-relaxed">
            El tratamiento se fundamenta en consentimiento expreso, ejecución contractual e interés legítimo cuando se activan medidas de seguridad y mejora.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 leading-relaxed">
            {treatmentBases.map((base) => (
              <li key={base}>{base}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">6. Inteligencia artificial y terceros procesadores</h2>
          <article className="space-y-3">
            <p className="leading-relaxed">
              Para ofrecer servicios punteros, Zalantos integra proveedores de IA (ej. OpenAI, Anthropic). Las APIs empresariales utilizadas
              no entrenan los modelos públicos sin consentimiento adicional y retienen registros hasta 30 días únicamente para monitoreo de abusos.
            </p>
            <p className="leading-relaxed">
              Compartimos datos estrictamente necesarios con proveedores de infraestructura (hosting, bases de datos, automatización) que han firmado
              acuerdos de confidencialidad y cumplimiento de seguridad.
            </p>
            <p className="leading-relaxed">
              El usuario acepta que los datos pueden procesarse o almacenarse fuera de Chile (principalmente en Estados Unidos o la Unión Europea), siempre
              que se elijan proveedores con certificaciones robustas (ISO 27001, SOC 2, etc.).
            </p>
          </article>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">7. Plazos de conservación</h2>
          <p className="leading-relaxed">
            Conservamos los datos solo durante el tiempo necesario para cumplir los fines o según lo exige la ley. Pasados estos plazos, los datos
            se eliminan de forma segura o se anonimizan para fines estadísticos.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 leading-relaxed">
            {retentionPeriods.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">8. Seguridad de la información</h2>
          <p className="leading-relaxed">
            Implementamos cifrado TLS para datos en tránsito, controles de acceso estrictos y monitoreo continuo para detectar amenazas.
          </p>
          <p className="leading-relaxed">
            Aunque ningún sistema es 100% invulnerable, Zalantos actúa con diligencia ante incidentes y mantiene protocolos de respuesta inmediata.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">9. Derechos ARCO</h2>
          <p className="leading-relaxed">
            En cumplimiento de la Ley N° 19.628, el titular puede ejercer derechos de acceso, rectificación, cancelación u oposición.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 leading-relaxed">
            {rights.map((right) => (
              <li key={right}>{right}</li>
            ))}
          </ul>
          <p className="leading-relaxed">
            Las solicitudes deben enviarse al correo <span className="font-semibold text-gray-900">soporte@zalantos.com</span> con el asunto "Solicitud ARCO". Respondemos dentro de los plazos legales.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">10. Gestión de incidentes</h2>
          <p className="leading-relaxed">
            Ante una brecha que afecte los derechos patrimoniales o morales, Zalantos activa mecanismos de mitigación y notifica a los afectados y autoridades cuando corresponde.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">11. Modificaciones</h2>
          <p className="leading-relaxed">
            Nos reservamos el derecho de actualizar esta política para reflejar cambios legales o de industria. La última versión siempre estará publicada
            en esta página y el uso continuado implica su aceptación.
          </p>
        </section>

        <section className="space-y-4 pb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Contacto</h2>
          <p className="leading-relaxed text-gray-700">
            Dudas o solicitudes pueden dirigirse a <span className="font-semibold text-gray-900">soporte@zalantos.com</span> o a nuestra oficina en Padre mariano 210 Of. 405, Providencia.
          </p>
        </section>
      </div>
    </div>
  )
}

