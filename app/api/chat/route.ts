export const maxDuration = 30

interface Message {
  role: string
  content: string
}

// Sistema de respuestas inteligente por categorías
function generateResponse(messages: Message[]): string {
  const lastMessage = messages[messages.length - 1].content.toLowerCase()
  const conversationContext = messages.slice(-3) // Últimos 3 mensajes para contexto

  // Detectar categoría y responder según especialización

  // TAREAS DIARIAS: redacción, emails, resúmenes
  if (
    lastMessage.includes("email") ||
    lastMessage.includes("redact") ||
    lastMessage.includes("escrib") ||
    lastMessage.includes("resum") ||
    lastMessage.includes("carta") ||
    lastMessage.includes("mensaje")
  ) {
    if (lastMessage.includes("profesional") || lastMessage.includes("formal")) {
      return `Para redactar un email profesional efectivo, sigue esta estructura:

**Asunto**: Debe ser claro y específico
**Saludo**: Formal pero cercano (Buenos días/Estimado/a)
**Cuerpo**: 
- Contexto breve en primer párrafo
- Información principal clara y directa
- Call-to-action específico
**Cierre**: Cordial y con disponibilidad

¿Necesitas que te ayude a redactar algo específico? Cuéntame el contexto y el objetivo del email.`
    }
    return `Claro, puedo ayudarte con la redacción. Para darte el mejor resultado, necesito saber:

1. ¿Cuál es el objetivo del texto? (informar, persuadir, solicitar)
2. ¿A quién va dirigido? (cliente, equipo, superior)
3. ¿Qué tono prefieres? (formal, semiformal, cercano)

Con esa información podré ayudarte mejor.`
  }

  // FORMACIÓN: conceptos digitales, IA, aprendizaje
  if (
    lastMessage.includes("qué es") ||
    lastMessage.includes("explic") ||
    lastMessage.includes("aprend") ||
    lastMessage.includes("concept") ||
    lastMessage.includes("digital") ||
    lastMessage.includes("ia") ||
    lastMessage.includes("inteligencia artificial") ||
    lastMessage.includes("cómo funcion")
  ) {
    if (lastMessage.includes("ia") || lastMessage.includes("inteligencia artificial")) {
      return `La **Inteligencia Artificial (IA)** es tecnología que permite a las máquinas realizar tareas que normalmente requieren inteligencia humana.

**Tipos principales:**
• **IA Generativa**: Crea contenido nuevo (textos, imágenes, código)
• **IA Predictiva**: Analiza patrones y hace predicciones
• **IA de Procesamiento**: Entiende y procesa lenguaje o imágenes

**Aplicaciones prácticas en tu día a día:**
- Asistentes como yo para automatizar tareas
- Resúmenes automáticos de documentos
- Análisis de datos y reportes
- Creación de contenido y propuestas

¿Te gustaría que profundice en algún aspecto específico o te muestre casos de uso concretos?`
    }
    return `Me encanta explicar conceptos. ¿Sobre qué tema específico quieres aprender? 

Puedo ayudarte con:
• Transformación digital y herramientas
• Automatización de procesos
• Marketing digital y redes sociales
• Productividad y gestión del tiempo
• Tecnologías emergentes (IA, cloud, etc.)

¿Cuál te interesa?`
  }

  // AUTOMATIZACIÓN: mejoras de procesos, optimización
  if (
    lastMessage.includes("automat") ||
    lastMessage.includes("proces") ||
    lastMessage.includes("optimiz") ||
    lastMessage.includes("mejor") ||
    lastMessage.includes("eficien") ||
    lastMessage.includes("productiv")
  ) {
    return `Perfecto, la automatización puede transformar tu eficiencia. Para proponerte mejoras específicas, cuéntame:

**1. ¿Qué proceso quieres optimizar?**
   (Ej: gestión de emails, reportes, seguimiento clientes)

**2. ¿Cuánto tiempo te toma actualmente?**

**3. ¿Qué pasos implica?**

**4. ¿Usas alguna herramienta ya?**

Con esta información podré diseñar una solución de automatización adaptada a tu caso.`
  }

  // PROMPTS: creación y mejora de prompts
  if (lastMessage.includes("prompt") || lastMessage.includes("pregunta a ia") || lastMessage.includes("chatgpt")) {
    return `Para crear prompts efectivos, usa esta estructura:

**ROL**: Define quién debe actuar la IA
Ejemplo: "Eres un experto en marketing digital"

**CONTEXTO**: Proporciona información relevante
Ejemplo: "Tengo una empresa de servicios B2B"

**TAREA**: Sé específico sobre qué quieres
Ejemplo: "Crea 5 ideas de contenido para LinkedIn"

**FORMATO**: Indica cómo quieres el resultado
Ejemplo: "En formato de lista con titular y descripción breve"

¿Quieres que te ayude a crear un prompt para algo específico?`
  }

  // Respuesta por defecto con contexto conversacional
  if (conversationContext.length > 1) {
    return `Entiendo que estamos hablando sobre tu consulta. Para poder ayudarte mejor, ¿podrías darme más detalles sobre lo que necesitas?

Recuerda que puedo asistirte en:
• **Tareas diarias**: Redacción, emails, resúmenes
• **Formación**: Explicar conceptos digitales y tecnología
• **Automatización**: Optimizar tus procesos de trabajo

¿Con cuál de estas áreas puedo ayudarte ahora?`
  }

  return `Hola, estoy aquí para ayudarte con:

✍️ **Tareas Diarias**
Redacción de emails, resúmenes, contenido profesional

📚 **Formación** 
Explicación de conceptos digitales, IA y tecnología

⚙️ **Automatización**
Mejoras en procesos y optimización de trabajo

¿En qué área necesitas ayuda hoy?`
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Convertir formato de mensajes
    const formattedMessages: Message[] = messages.map((msg: any) => ({
      role: msg.role,
      content: msg.parts?.map((p: any) => (p.type === "text" ? p.text : "")).join("") || "",
    }))

    const response = generateResponse(formattedMessages)

    // Simular streaming con chunks para mejor UX
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        // Formato de respuesta para @ai-sdk/react
        const words = response.split(" ")
        for (let i = 0; i < words.length; i++) {
          const chunk = words[i] + (i < words.length - 1 ? " " : "")
          const data = `0:${JSON.stringify([{ type: "text-delta", textDelta: chunk }])}\n`
          controller.enqueue(encoder.encode(data))
          // Pequeño delay para efecto de escritura
          await new Promise((resolve) => setTimeout(resolve, 30))
        }
        // Mensaje final
        controller.enqueue(encoder.encode(`d:{"finishReason":"stop"}\n`))
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Vercel-AI-Data-Stream": "v1",
      },
    })
  } catch (error) {
    console.error("Error en chat:", error)
    return new Response(JSON.stringify({ error: "Error al procesar el mensaje" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
