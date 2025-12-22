"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Lightbulb,
  ListOrdered,
  Copy,
  Check,
  MessageSquare,
  Target,
  Layers,
  ArrowRight,
  Sparkles,
  HelpCircle,
  FileText,
  ChevronDown,
  ChevronUp,
  User,
  Crosshair,
  Database,
  ShieldCheck,
  ListChecks,
  LayoutList,
  BookOpen,
} from "lucide-react"

const templateText = `QUIÉN ERES
Actúa como: [profesional experto en el tema].

QUÉ QUIERO
Quiero que hagas: [una frase clara].

MI CASO (DATOS)
- Empresa: [ ]
- Qué vendo / a qué me dedico: [ ]
- Tipo de cliente: [ ]
- Tono al escribir: [ ]
- Detalles importantes: [ ]

REGLAS
- Si te falta información, hazme como máximo [5] preguntas cortas y después continúa.
- No inventes datos. Si algo no se puede saber, dilo claro.
- Usa un tono: [formal / cercano / directo].

PASOS (EN ORDEN)
1) [paso 1]
2) [paso 2]
3) [paso 3]

CÓMO QUIERO LA RESPUESTA
Devuélvemelo en este orden y con títulos:
1) [título 1]
2) [título 2]
3) [título 3]

EJEMPLOS
Ejemplo 1 de lo que te preguntaré: [ ]
Ejemplo 2 de lo que te preguntaré: [ ]`

// Datos de los tips expandidos
const tipsData = [
  {
    icon: MessageSquare,
    title: "Sé claro y específico",
    color: "from-[#FF6B35] to-[#FF006E]",
    glowClass: "glow-magenta",
    description:
      "Cuando escribas a la IA, imagina que le hablas a alguien que no te conoce de nada. Explica siempre el contexto: quién eres, en qué trabajas o qué estás estudiando y para qué necesitas la respuesta.",
    detail:
      'En lugar de pedir "ayúdame con marketing", di por ejemplo: "Soy una persona que empieza desde cero en marketing digital y quiero entender qué es, con ejemplos muy sencillos y sin tecnicismos". Cuantos más datos concretos des (tema, objetivo, público, formato), más fácil será que la IA acierte a la primera.',
    example:
      "\"No tengo conocimientos de IA. Explícame paso a paso y con ejemplos muy simples qué es un 'prompt' y cómo puedo escribir uno para pedirle a la IA que me ayude a redactar un email profesional.\"",
  },
  {
    icon: ArrowRight,
    title: "Trabaja por rondas",
    color: "from-[#00D9FF] to-[#9D4EDD]",
    glowClass: "glow-cyan",
    description:
      "No busques la respuesta perfecta en un solo intento. Pide primero un borrador, léelo con calma y luego dile a la IA qué cambiar.",
    detail:
      "Si quieres que sea más corto, más largo, más sencillo, con más ejemplos o con un tono distinto. Piensa en la conversación como si fuera un proceso de mejora continua: versión 1, versión 2, versión 3… hasta que estés satisfecho.",
    example:
      '1) "Hazme una explicación sencilla sobre qué es el marketing digital."\n2) "Ahora rehace la explicación usando ejemplos de una tienda online pequeña y ponlo en 5 pasos numerados."\n3) "Añade al final una mini lista de errores comunes que debería evitar."',
  },
  {
    icon: Target,
    title: "Define el tono",
    color: "from-[#9D4EDD] to-[#FF006E]",
    glowClass: "glow-purple",
    description:
      'El tono es la "personalidad" con la que la IA te responde: puede sonar muy formal y técnico, o muy cercana y coloquial.',
    detail:
      "Si no dices nada, la respuesta suele ser neutra y puede no encajar con tu público. Por eso conviene indicar siempre si quieres un tono educativo, amigable, profesional, motivador, etc.",
    example:
      '"Explícamelo con un tono de profesor paciente, paso a paso, evitando tecnicismos."\n"Usa un tono muy cercano, como si se lo contaras a un amigo que no sabe nada del tema."',
  },
  {
    icon: Layers,
    title: "Divide en pasos",
    color: "from-[#FF006E] to-[#FF6B35]",
    glowClass: "glow-magenta",
    description:
      "Si el tema es complejo, pide que la explicación se divida en pasos numerados. Esto ayuda a seguir el proceso sin perderse.",
    detail:
      'En lugar de una respuesta larga en un solo bloque, es mejor algo así: "Paso 1: … / Paso 2: … / Paso 3: …". Además, en cada paso la IA puede indicar qué debe hacer exactamente y por qué ese paso es importante.',
    example:
      '"Explícame cómo crear mi primer prompt dividido en pasos. En cada paso dime qué debo hacer, pon un ejemplo de frase y aclara qué error típico debería evitar."',
  },
  {
    icon: HelpCircle,
    title: "Pide preguntas primero",
    color: "from-[#00FFD9] to-[#00D9FF]",
    glowClass: "glow-cyan",
    description:
      "Si no sabes bien qué información dar, pídele a la IA que primero te haga unas cuantas preguntas antes de responder.",
    detail:
      "Así, el sistema detecta qué datos le faltan (por ejemplo, tu nivel, objetivo, tipo de proyecto) y luego te ofrece una respuesta más adaptada a tu caso. Esta técnica es ideal para principiantes.",
    example:
      '"Antes de explicarme cómo usar la IA en mi trabajo, hazme 5 preguntas muy sencillas para conocer mi nivel, a qué me dedico y qué quiero conseguir. Cuando te responda, dame una guía paso a paso adaptada a mi situación."',
  },
  {
    icon: FileText,
    title: "Usa ejemplos",
    color: "from-[#9D4EDD] to-[#00D9FF]",
    glowClass: "glow-purple",
    description: "Los ejemplos son la mejor forma de mostrarle a la IA qué tipo de resultado quieres.",
    detail:
      'Puedes copiar un texto que te guste y decirle: "Quiero algo parecido a esto, pero aplicado a [tu tema]". También puedes darle ejemplos de malas respuestas y aclarar lo que no quieres.',
    example:
      '"Te pego a continuación un texto que explica qué es el email marketing de forma simple. Usa un estilo muy parecido (nivel básico, frases cortas) para explicarme ahora qué es el SEO, como si se lo contaras a un alumno que empieza desde cero."',
  },
]

// Datos de los pasos expandidos
const stepsData = [
  {
    icon: User,
    title: "Quién es",
    subtitle: "Qué papel tiene (rol experto)",
    color: "from-[#FF6B35] to-[#FF006E]",
    description:
      'Empieza siempre diciendo qué papel quieres que tenga la IA: por ejemplo, "actúa como profesor de marketing para principiantes", "actúa como tutor de matemáticas de secundaria" o "actúa como experto en atención al cliente que explica las cosas con mucha paciencia".',
    example:
      '"Actúa como profesor de IA para personas que no tienen conocimientos técnicos y que necesitan explicaciones muy claras y paso a paso."',
  },
  {
    icon: Crosshair,
    title: "Qué quieres",
    subtitle: "Una frase muy clara del objetivo",
    color: "from-[#00D9FF] to-[#9D4EDD]",
    description:
      'En una sola frase, explica con claridad qué quieres conseguir con ese mensaje. Evita frases genéricas como "ayúdame con esto" y di cosas concretas como "quiero que me diseñes un pequeño ejercicio para practicar".',
    example:
      '"Quiero que me expliques cómo escribir mi primer prompt para pedir a la IA que me resuma un texto largo de forma sencilla."',
  },
  {
    icon: Database,
    title: "Tu caso",
    subtitle: "Datos de tu empresa/situación",
    color: "from-[#9D4EDD] to-[#FF006E]",
    description:
      "Añade algunos datos básicos sobre tu situación: a qué te dedicas, qué nivel tienes, para qué vas a usar la respuesta. No hace falta escribir mucho, pero sí lo suficiente para que la IA se pueda adaptar.",
    example:
      '"Soy profesor de personas adultas que casi no han usado nunca herramientas de IA. Necesito explicaciones muy sencillas, con ejemplos del día a día y sin tecnicismos."',
  },
  {
    icon: ShieldCheck,
    title: "Reglas",
    subtitle: "Qué hacer / qué evitar",
    color: "from-[#FF006E] to-[#FF6B35]",
    description:
      'Indica qué cosas quieres que la IA haga y cuáles quieres que evite. Por ejemplo: "no inventes datos", "si faltan datos, pregúntame antes de responder", "usa frases cortas", "no uses inglés".',
    example:
      '"Si te falta información, hazme como máximo 3 preguntas cortas y luego continúa."\n"No inventes números ni estadísticas; si no sabes algo, indícalo claramente."',
  },
  {
    icon: ListChecks,
    title: "Pasos",
    subtitle: "Instrucciones en orden",
    color: "from-[#00FFD9] to-[#00D9FF]",
    description:
      'Si quieres que la IA te dé un procedimiento, pídelo explícitamente: "dame los pasos en orden, del 1 al X, explicados de forma sencilla". Esto es ideal para guías prácticas, tutoriales e instrucciones de uso.',
    example:
      '"Dame los pasos, numerados, para que un alumno que nunca ha usado IA pueda crear y probar su primer prompt en clase. En cada paso pon un ejemplo concreto."',
  },
  {
    icon: LayoutList,
    title: "Formato",
    subtitle: "Cómo lo quieres ver",
    color: "from-[#9D4EDD] to-[#00D9FF]",
    description:
      "Indica cómo quieres ver la respuesta: en lista, en tabla, en bloques con títulos, en formato tipo email, en bullet points, etc. El mismo contenido puede ser mucho más fácil de entender si está bien ordenado visualmente.",
    example:
      '"Organiza todo en una lista numerada con títulos en negrita y, debajo de cada título, una explicación corta más un ejemplo."',
  },
  {
    icon: BookOpen,
    title: "Ejemplos",
    subtitle: "2-3 ejemplos de preguntas",
    color: "from-[#FF6B35] to-[#9D4EDD]",
    description:
      "Cierra el prompt pidiendo 2–3 ejemplos concretos relacionados con tu caso. Estos ejemplos servirán como modelo para copiar, adaptar y practicar.",
    example:
      '"Al final, dame 3 ejemplos de prompts completos que pueda usar en clase con alumnos principiantes, relacionados con [tu tema]. Pon cada ejemplo en un bloque separado."',
  },
]

function TipCard({ tip, index }: { tip: (typeof tipsData)[0]; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = tip.icon

  return (
    <Card
      className={`glass border-0 overflow-hidden transition-all duration-300 hover:scale-[1.02] ${expanded ? tip.glowClass : ""}`}
    >
      <button onClick={() => setExpanded(!expanded)} className="w-full text-left">
        <div className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${tip.color} flex-shrink-0`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-bold text-gray-900 text-lg sm:text-xl">{tip.title}</h3>
                {expanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600 flex-shrink-0" />
                )}
              </div>
              <p className="text-sm text-gray-700 mt-2 leading-relaxed">{tip.description}</p>
            </div>
          </div>
        </div>
      </button>

      {expanded && (
        <CardContent className="pt-0 pb-5 px-4 sm:px-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="border-t border-gray-300 pt-4">
            <p className="text-sm text-gray-800 leading-relaxed">{tip.detail}</p>
          </div>
          <div className={`p-4 rounded-xl bg-gradient-to-br ${tip.color} bg-opacity-10 border border-gray-200`}>
            <p className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">Ejemplo</p>
            <p className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">{tip.example}</p>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

function StepCard({ step, index }: { step: (typeof stepsData)[0]; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = step.icon

  return (
    <Card className="glass border-0 overflow-hidden transition-all duration-300">
      <button onClick={() => setExpanded(!expanded)} className="w-full text-left">
        <div className="p-4 sm:p-5">
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
            >
              <span className="text-white font-bold text-lg">{index + 1}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg sm:text-xl">{step.title}</h3>
                  <p className="text-sm text-gray-700 mt-1">{step.subtitle}</p>
                </div>
                {expanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-600 flex-shrink-0" />
                )}
              </div>
            </div>
          </div>
        </div>
      </button>

      {expanded && (
        <CardContent className="pt-0 pb-5 px-4 sm:px-5 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="border-t border-gray-300 pt-4 ml-16">
            <p className="text-sm text-gray-800 leading-relaxed">{step.description}</p>
          </div>
          <div className="ml-16 p-4 rounded-xl bg-cyan-50 border border-gray-200">
            <p className="text-xs font-bold text-cyan-700 mb-2 uppercase tracking-wide">Ejemplo</p>
            <p className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">{step.example}</p>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

export function PromptGuide() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(templateText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header con fondo adaptado */}
      <header className="glass sticky top-0 z-10 border-b border-border">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#FF006E]">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">Guía de Prompts</h1>
              <p className="text-muted-foreground text-xs sm:text-sm">Aprende a escribir mensajes efectivos para IA</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <Tabs defaultValue="practicas" className="space-y-6 sm:space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 glass border-0 p-1 rounded-2xl h-auto">
            <TabsTrigger
              value="practicas"
              className="gap-1.5 sm:gap-2 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6B35] data-[state=active]:to-[#FF006E] data-[state=active]:text-white data-[state=inactive]:text-gray-700 transition-all duration-300"
            >
              <Lightbulb className="h-4 w-4" />
              <span className="text-xs sm:text-sm font-semibold">Tips</span>
            </TabsTrigger>
            <TabsTrigger
              value="estructura"
              className="gap-1.5 sm:gap-2 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00D9FF] data-[state=active]:to-[#9D4EDD] data-[state=active]:text-white data-[state=inactive]:text-gray-700 transition-all duration-300"
            >
              <ListOrdered className="h-4 w-4" />
              <span className="text-xs sm:text-sm font-semibold">Pasos</span>
            </TabsTrigger>
            <TabsTrigger
              value="plantilla"
              className="gap-1.5 sm:gap-2 py-3 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#9D4EDD] data-[state=active]:to-[#FF006E] data-[state=active]:text-white data-[state=inactive]:text-gray-700 transition-all duration-300"
            >
              <Copy className="h-4 w-4" />
              <span className="text-xs sm:text-sm font-semibold">Plantilla</span>
            </TabsTrigger>
          </TabsList>

          {/* Tab Tips */}
          <TabsContent value="practicas" className="space-y-4 sm:space-y-6">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-gray-900">Mejores Prácticas</h2>
              <p className="text-gray-700 text-sm sm:text-base">
                Consejos respaldados por fuentes fiables para obtener mejores resultados
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {tipsData.map((tip, index) => (
                <TipCard key={index} tip={tip} index={index} />
              ))}
            </div>
          </TabsContent>

          {/* Tab Estructura */}
          <TabsContent value="estructura" className="space-y-4 sm:space-y-6">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-gray-900">Estructura Recomendada</h2>
              <p className="text-gray-700 text-sm sm:text-base">Los 7 elementos clave para un mensaje efectivo</p>
            </div>
            <div className="max-w-2xl mx-auto space-y-3">
              {stepsData.map((step, index) => (
                <StepCard key={index} step={step} index={index} />
              ))}
            </div>
          </TabsContent>

          {/* Tab Plantilla */}
          <TabsContent value="plantilla" className="space-y-4 sm:space-y-6">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold mb-2 text-white">Plantilla Lista para Usar</h2>
              <p className="text-muted-foreground text-sm">
                Copia esta plantilla y rellena los campos con tu información
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <Card className="glass border-0 overflow-hidden glow-purple">
                <div className="p-4 sm:p-5 border-b border-border flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-[#9D4EDD] to-[#FF006E]">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium text-foreground text-sm sm:text-base">Plantilla de Prompt</span>
                  </div>
                  <Button
                    onClick={copyToClipboard}
                    className="gap-2 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#FF006E] hover:opacity-90 transition-opacity border-0 text-white"
                    size="sm"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span className="hidden sm:inline">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span className="hidden sm:inline">Copiar</span>
                      </>
                    )}
                  </Button>
                </div>
                <CardContent className="p-0">
                  <pre
                    className="p-4 sm:p-6 text-xs sm:text-sm font-mono whitespace-pre-wrap overflow-x-auto leading-relaxed text-foreground"
                    style={{ background: "rgba(0,0,0,0.3)" }}
                  >
                    {templateText}
                  </pre>
                </CardContent>
              </Card>

              <div className="mt-6 p-4 rounded-xl glass border-0 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#00D9FF] to-[#9D4EDD] flex-shrink-0">
                  <Lightbulb className="h-4 w-4 text-white" />
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  <strong className="text-white">Consejo:</strong> Rellena los campos entre corchetes con tu información
                  específica. No necesitas completar todos los campos, solo los relevantes para tu caso.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border mt-12 py-6 glass">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Guía basada en mejores prácticas de OpenAI, Microsoft y otras fuentes fiables.</p>
        </div>
      </footer>
    </div>
  )
}
