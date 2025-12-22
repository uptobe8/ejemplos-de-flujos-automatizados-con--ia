export interface Flow {
  id: string
  name: string
  title: string
  category: "marketing" | "analisis" | "creatividad" | "administracion"
  description: string
  template: {
    objetivo: string
    entradas: string[]
    salidas: string[]
  }
  example: {
    nombre: string
    descripcion: string
    instrucciones: string
  }
  solicitudes: string[]
  limitaciones: string[]
}

export const flows: Flow[] = [
  {
    id: "1",
    name: "Calendario Editorial",
    title: "Calendario Editorial de Redes Sociales",
    category: "marketing",
    description:
      "Genera un calendario de publicaciones en redes sociales. Proporciona información sobre eventos, promociones o temas mensuales, y obtén un plan de contenidos optimizado para cada plataforma.",
    template: {
      objetivo:
        "Crear calendario editorial mensual por canal (IG/LinkedIn/TikTok) con pilares, formatos, copies y CTAs.",
      entradas: ["marca", "objetivo de negocio", "público", "oferta", "tono", "frecuencia", "fechas clave"],
      salidas: ["tabla por semana/día", "checklist de producción"],
    },
    example: {
      nombre: "Calendario Social",
      descripcion: "Planifica y redacta un calendario editorial mensual multicanal.",
      instrucciones:
        "Primero define pilares → luego asigna formatos → luego genera tabla (fecha, canal, objetivo, hook, copy, CTA, assets).",
    },
    solicitudes: [
      "Crea calendario de 4 semanas para IG con 5 posts/semana y 3 reels.",
      'Dame 10 hooks para el pilar "educativo".',
    ],
    limitaciones: ["No publica ni programa; solo genera planificación y textos."],
  },
  {
    id: "2",
    name: "Consulta Documentos",
    title: "Asistente de Consulta de Documentos Internos",
    category: "administracion",
    description:
      "Responde preguntas basadas en documentos corporativos o archivos internos. Sube PDFs, manuales o políticas y obtén respuestas exactas a tus consultas.",
    template: {
      objetivo: 'Responder preguntas SOLO con documentos subidos; si no está, decir "no aparece" y pedir el documento.',
      entradas: ["PDFs/políticas/manuales"],
      salidas: ["respuesta", "referencia a sección/párrafo"],
    },
    example: {
      nombre: "Lector de Políticas",
      descripcion: "Responde preguntas usando solo documentación interna.",
      instrucciones:
        "Ante cada pregunta: (1) busca en Knowledge, (2) cita el fragmento, (3) si no hay evidencia, dilo.",
    },
    solicitudes: ["¿Cuál es el procedimiento de vacaciones?", "Resúmeme la política de gastos en 7 bullets."],
    limitaciones: [
      'Puede no recuperar siempre el fragmento correcto; pide que el GPT repregunte ("¿de qué documento/versión?") y que el usuario pegue el apartado si es crítico.',
    ],
  },
  {
    id: "3",
    name: "Análisis CRM",
    title: "Asistente de Análisis de Datos de CRM",
    category: "analisis",
    description:
      "Lee y analiza datos exportados de un CRM. Carga reportes de ventas, listados de clientes o métricas y obtén insights rápidos con conclusiones y listados.",
    template: {
      objetivo: "Analizar export de CRM (CSV/XLSX) y responder preguntas de pipeline, ventas, segmentación.",
      entradas: ["CSV/XLSX con datos de CRM", "herramientas: Data Analysis + File uploads"],
      salidas: ["KPIs", "tablas", "conclusiones", "próximos pasos"],
    },
    example: {
      nombre: "Analista CRM",
      descripcion: "Analiza exports de CRM y genera insights accionables.",
      instrucciones:
        "Si hay archivo, cárgalo y perfila columnas → limpia → calcula KPIs → responde con tablas y conclusiones.",
    },
    solicitudes: ["Top 20 cuentas por MRR y variación mensual.", "¿Dónde se cae más el funnel?"],
    limitaciones: ['Sin Actions no "lee" el CRM en vivo; requiere export.'],
  },
  {
    id: "4",
    name: "Minutas de Reunión",
    title: "Asistente para Resumir Reuniones y Generar Tareas",
    category: "administracion",
    description:
      "Apoya tareas administrativas tras reuniones. Proporciona notas o transcripciones y obtén un resumen estructurado con tareas asignadas a cada participante.",
    template: {
      objetivo: "Convertir notas/transcripción en resumen ejecutivo + acuerdos + tareas con responsables y fechas.",
      entradas: ["texto pegado o archivo"],
      salidas: ["acta", "lista de acciones (formato checklist)"],
    },
    example: {
      nombre: "Actas y Acciones",
      descripcion: "Convierte notas de reunión en actas estructuradas.",
      instrucciones: "Separar: decisiones, riesgos, próximos pasos; extraer tareas con verbo + dueño + deadline.",
    },
    solicitudes: ["Aquí va la transcripción: crea acta y tareas.", "Escribe email de seguimiento."],
    limitaciones: ['Si no hay responsables explícitos, debe preguntar o dejar "Pendiente de asignar".'],
  },
  {
    id: "5",
    name: "Redacción Profesional",
    title: "Asistente de Redacción de Correos y Documentos Profesionales",
    category: "administracion",
    description:
      "Crea comunicaciones escritas formales. Indica el propósito del correo o documento y obtén un borrador bien escrito con tono profesional y formato adecuado.",
    template: {
      objetivo:
        "Redactar con tono profesional; pedir briefing mínimo; entregar 2–3 versiones (formal/neutral/cercana).",
      entradas: ["objetivo", "audiencia", "tono deseado"],
      salidas: ["asunto", "email", "CTA", "versión corta"],
    },
    example: {
      nombre: "Redactor Pro",
      descripcion: "Redacta emails y documentos profesionales.",
      instrucciones: "Primero recopila objetivo/audiencia/tono → luego redacta → luego revisa claridad.",
    },
    solicitudes: ["Email para pedir reunión a un lead frío.", "Propuesta de 1 página para un servicio."],
    limitaciones: ["No conoce políticas internas salvo que se suban como Knowledge."],
  },
  {
    id: "6",
    name: "Recursos Visuales",
    title: "Asistente Creativo para Recursos Visuales",
    category: "creatividad",
    description:
      "Genera ideas visuales para proyectos de diseño o marketing. Describe la necesidad y obtén conceptos creativos, estilos gráficos, paletas de colores y prompts para generación de imágenes.",
    template: {
      objetivo:
        "Proponer conceptos creativos y generar prompts para imagen (y, si aplica, guías para video) sin usar apps externas.",
      entradas: ["descripción de necesidad creativa"],
      salidas: ["concepto", "composición", "variaciones", "prompts"],
    },
    example: {
      nombre: "Director Visual",
      descripcion: "Genera conceptos visuales y prompts para diseño.",
      instrucciones: "Entregar 3 conceptos → elegir 1 → generar prompts con parámetros y negativos.",
    },
    solicitudes: [
      "Necesito 5 ideas de creatividades para campaña de Navidad.",
      "Dame prompts para estilo minimalista.",
    ],
    limitaciones: ["Si no activas generación de imagen, solo entrega prompts/guías."],
  },
  {
    id: "7",
    name: "Planificador de Tareas",
    title: "Asistente de Seguimiento de Tareas y Agenda",
    category: "administracion",
    description:
      "Actúa como auxiliar administrativo personal para organizar pendientes. Introduce listas de tareas, fechas límite y eventos, y obtén resúmenes de prioridades y sugerencias de organización.",
    template: {
      objetivo: "Priorizar tareas (impacto/urgencia) y crear plan semanal con time-blocking.",
      entradas: ["listas de tareas", "fechas límite", "eventos del calendario"],
      salidas: ["matriz de prioridades", "plan semanal", "checklist diario"],
    },
    example: {
      nombre: "Planificador Semanal",
      descripcion: "Organiza tareas y optimiza tu agenda.",
      instrucciones: "Clasifica → estima tiempos → bloquea en calendario textual → revisa riesgos.",
    },
    solicitudes: ["Organiza mi semana con 25 tareas y 2 proyectos.", "Dame plan diario para hoy."],
    limitaciones: ['No puede acceder a tu calendario real sin integraciones; usa planificación "propuesta".'],
  },
  {
    id: "8",
    name: "Informes de Ventas",
    title: "Asistente para Generación de Informes de Ventas",
    category: "analisis",
    description:
      "Elabora informes a partir de datos de ventas. Proporciona datos en hojas de cálculo o CSV y obtén un informe narrativo con análisis de tendencias y recomendaciones.",
    template: {
      objetivo: "Generar informe ejecutivo a partir de CSV/Excel: KPIs, tendencias, insights y recomendaciones.",
      entradas: ["CSV/Excel con datos de ventas", "herramientas: Data Analysis"],
      salidas: ["informe de 1 página", "anexos con tablas"],
    },
    example: {
      nombre: "Informe Ventas",
      descripcion: "Genera informes ejecutivos de ventas con insights.",
      instrucciones: "Calcular KPIs → comparar periodos → explicar drivers → recomendar acciones.",
    },
    solicitudes: ["Informe de octubre vs septiembre con conclusiones.", "Segmenta por canal y región."],
    limitaciones: ["Calidad depende de columnas y consistencia del dataset."],
  },
  {
    id: "9",
    name: "Campañas de Marketing",
    title: "Asistente de Planificación de Campañas de Marketing",
    category: "marketing",
    description:
      "Estructura campañas publicitarias o de marketing paso a paso. Indica objetivos, público objetivo y presupuesto, y obtén un plan completo con canales, calendario y métricas.",
    template: {
      objetivo:
        "Crear plan de campaña: objetivo, audiencias, propuesta, funnel, calendario, copies base y plan de medición.",
      entradas: ["objetivos de campaña", "público objetivo", "presupuesto disponible"],
      salidas: ["documento estructurado", "checklist de ejecución"],
    },
    example: {
      nombre: "Planner Marketing",
      descripcion: "Planifica campañas de marketing completas.",
      instrucciones: "Brief mínimo → estrategia → assets por canal → KPIs + tests A/B.",
    },
    solicitudes: ["Campaña lead gen con presupuesto bajo para B2B.", "Genera copies para 3 anuncios."],
    limitaciones: ["Sin navegación, no valida datos externos; si activas Search, que cite fuentes."],
  },
  {
    id: "10",
    name: "Brainstorming Creativo",
    title: "Asistente de Brainstorming Creativo",
    category: "creatividad",
    description:
      "Genera ideas y soluciones creativas. Plantea una necesidad creativa (eslóganes, nombres de producto, temas para seminarios) y obtén varias propuestas innovadoras.",
    template: {
      objetivo: "Idear muchas opciones, evaluarlas con criterios y refinar top 3.",
      entradas: ["necesidad creativa", "contexto del proyecto"],
      salidas: ["lista de ideas", "scoring", "versiones finales refinadas"],
    },
    example: {
      nombre: "Brainstorm & Filtro",
      descripcion: "Genera y evalúa ideas creativas.",
      instrucciones: "Divergir (50 ideas) → converger (criterios) → refinar (top 3).",
    },
    solicitudes: ["20 nombres para un SaaS de RRHH.", "Slogan corto para marca eco."],
    limitaciones: ["No garantiza disponibilidad legal/dominio; debe advertir verificación manual."],
  },
]

export const categories = [
  { value: "all", label: "Todos" },
  { value: "marketing", label: "Marketing" },
  { value: "analisis", label: "Análisis" },
  { value: "creatividad", label: "Creatividad" },
  { value: "administracion", label: "Administración" },
]
