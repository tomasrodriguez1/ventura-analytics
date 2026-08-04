import type { ProductContent, ProductId } from '../types/products'

export const products: ProductContent[] = [
  {
    id: 'crm',
    accent: 'blue',
    name: 'CRM Zalantos',
    navLabel: 'CRM Zalantos',
    href: '/productos/crm/',
    contactHref: '/?section=contact&product=crm',
    shortHeadline: 'Un CRM que convierte reuniones en avance comercial',
    headline: 'Un CRM que convierte reuniones en avance comercial',
    subheadline:
      'Pipeline, contexto e IA en un solo lugar, con revisión humana antes de cada cambio.',
    audience: 'Equipos comerciales B2B, vendedores, account executives y responsables de operación comercial.',
    problemTitle: 'El seguimiento comercial pierde fuerza cuando el contexto está disperso',
    problemText:
      'Centraliza pipeline, notas de reunión y seguimiento para que cada conversación se transforme en un próximo paso claro, sin renunciar al criterio del equipo.',
    benefits: [
      'Pipeline bajo control.',
      'Las reuniones generan acciones concretas sin actualización manual.',
      'Velocidad mediante IA, manteniendo aprobación humana.',
    ],
    capabilities: [
      'Empresas, personas, oportunidades, actividades y notas.',
      'Pipeline configurable, responsables y próximos pasos.',
      'Análisis de reuniones y propuestas de actualización.',
      'Copiloto comercial contextual en web y Telegram.',
      'Documentos, evidencia, workflows e integraciones con canales externos.',
    ],
    heroImage: {
      src: '/images/products/crm-hero-oportunidad-copiloto.webp',
      alt: 'Ficha de oportunidad CRM con una propuesta de actualización pendiente de aprobación.',
      width: 1600,
      height: 1000,
    },
    featureImage: {
      src: '/images/products/crm-pipeline-revision.webp',
      alt: 'Pipeline comercial con una propuesta revisable de cambio de etapa y responsable.',
      width: 1600,
      height: 1000,
    },
    workflowTitle: 'La IA propone. La persona aprueba.',
    workflowDescription:
      'El sistema convierte el contexto de una reunión en una propuesta concreta. Ningún cambio se aplica hasta que una persona lo revise.',
    workflow: ['Reunión', 'Análisis IA', 'Propuesta CRM', 'Aprobación humana'],
    featureTitle: 'Un contexto comercial que se puede revisar y operar',
    featureDescription:
      'Cada propuesta deja visible la etapa sugerida, el responsable y el siguiente paso para que el equipo decida qué aplicar.',
    scenarioTitle: 'Escenario ilustrativo',
    scenarioText:
      'Después de una reunión de seguimiento, el CRM propone actualizar la etapa, asignar un responsable y agendar el siguiente paso. El equipo comercial revisa la propuesta y decide si la incorpora al registro.',
    insights: [
      {
        title: 'Automatización de procesos con trazabilidad',
        href: '/blog/insight-automatizacion-procesos-trazabilidad-control-auditoria/',
      },
      {
        title: 'IA para insights de inteligencia de negocio',
        href: '/blog/insight-ia-kpis-hallazgos-lenguaje-natural/',
      },
    ],
    meta: {
      title: 'CRM con IA para equipos B2B',
      description:
        'CRM Zalantos reúne pipeline, reuniones e IA con revisión humana para equipos comerciales B2B.',
      ogImage: '/images/products/og-crm-zalantos.png',
    },
  },
  {
    id: 'gestion-proyectos',
    accent: 'green',
    name: 'Zalantos Gestión de Proyectos',
    navLabel: 'Gestión de Proyectos',
    href: '/productos/gestion-de-proyectos/',
    contactHref: '/?section=contact&product=gestion-proyectos',
    shortHeadline: 'El gestor de proyectos para consultoras',
    headline: 'El gestor de proyectos para consultoras',
    subheadline:
      'Clientes, avance y salud del portafolio en un solo sistema, pensado para firmas multiempresa.',
    supportLine: 'Menos Excel. Más control. Mejor entrega.',
    audience: 'Consultoras, boutiques de advisory y firmas de servicios profesionales que gestionan varios clientes simultáneamente.',
    problemTitle: 'Un portafolio no se controla desde planillas, chats y carpetas aisladas',
    problemText:
      'Reúne clientes, proyectos y ejecución para dar visibilidad compartida a equipos, project managers y liderazgo.',
    benefits: [
      'Visibilidad ejecutiva del portafolio.',
      'Entrega más predecible.',
      'Menos fricción entre equipo, project managers y liderazgo.',
    ],
    capabilities: [
      'Gestión de clientes y proyectos por organización.',
      'Etapas, hitos, tareas, prioridades, responsables y dependencias.',
      'Progreso por tareas, hitos o actualización manual.',
      'Semáforo de salud del proyecto y dashboard operativo del portafolio.',
      'Carga de trabajo, próximos vencimientos, comentarios, archivos y actividad reciente.',
    ],
    heroImage: {
      src: '/images/products/project-manager-dashboard-portafolio.webp',
      alt: 'Dashboard de portafolio para una consultora con salud y avance de proyectos.',
      width: 1600,
      height: 1000,
    },
    featureImage: {
      src: '/images/products/project-manager-ficha-proyecto.webp',
      alt: 'Ficha de proyecto con salud, progreso, tareas e hitos.',
      width: 1600,
      height: 1000,
    },
    workflowTitle: 'De cliente a entrega, con una vista común',
    workflowDescription:
      'La operación se organiza con una jerarquía clara, sin reducir el control del portafolio a una lista de tareas.',
    workflow: ['Cliente', 'Proyecto', 'Etapas e hitos', 'Tareas y responsables'],
    featureTitle: 'Control operativo de cada proyecto y del portafolio completo',
    featureDescription:
      'Revisa salud, avance, dependencias y próximos hitos desde el proyecto, sin perder de vista bloqueos y vencimientos del portafolio.',
    scenarioTitle: 'Escenario ilustrativo',
    scenarioText:
      'En una revisión semanal, el liderazgo prioriza proyectos bloqueados, revisa hitos cercanos y confirma responsables desde una visión compartida del portafolio.',
    insights: [
      {
        title: 'Software de tracking operacional con acceso rápido',
        href: '/blog/insight-sistema-tracking-operacional-acceso-rapido-ia/',
      },
      {
        title: 'Monitoreo de performance y alertas ejecutivas',
        href: '/blog/insight-alertas-ejecutivas-inteligentes-desvios-criticos/',
      },
    ],
    meta: {
      title: 'Software de gestión de proyectos para consultoras',
      description:
        'Zalantos Gestión de Proyectos reúne clientes, avance y salud del portafolio para consultoras multiempresa.',
      ogImage: '/images/products/og-gestion-proyectos-zalantos.png',
    },
  },
]

export function getProduct(id: ProductId) {
  const product = products.find((item) => item.id === id)
  if (!product) throw new Error(`Producto no encontrado: ${id}`)
  return product
}
