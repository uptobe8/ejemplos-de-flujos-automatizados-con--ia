"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Zap,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Calendar,
  FileSearch,
  BarChart3,
  ClipboardList,
  Mail,
  Palette,
  ListTodo,
  TrendingUp,
  Megaphone,
  Lightbulb,
} from "lucide-react"
import { flows, categories } from "@/lib/flows-data"
import type { Flow } from "@/lib/flows-data"

const categoryColors: Record<string, string> = {
  marketing: "from-[#FF6B35] to-[#FF006E]",
  analisis: "from-[#00D9FF] to-[#9D4EDD]",
  creatividad: "from-[#9D4EDD] to-[#FF006E]",
  administracion: "from-[#00FFD9] to-[#00D9FF]",
}

const categoryLabels: Record<string, string> = {
  marketing: "Marketing",
  analisis: "Análisis",
  creatividad: "Creatividad",
  administracion: "Administración",
}

const flowIcons: Record<string, typeof Calendar> = {
  "1": Calendar,
  "2": FileSearch,
  "3": BarChart3,
  "4": ClipboardList,
  "5": Mail,
  "6": Palette,
  "7": ListTodo,
  "8": TrendingUp,
  "9": Megaphone,
  "10": Lightbulb,
}

function FlowCard({ flow, index, onSelect }: { flow: Flow; index: number; onSelect: () => void }) {
  const Icon = flowIcons[flow.id] || Zap
  const colorClass = categoryColors[flow.category]

  return (
    <Card className="glass border-0 overflow-hidden transition-all duration-300 hover:scale-[1.02]">
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colorClass} flex items-center justify-center flex-shrink-0 shadow-lg`}
          >
            <span className="text-white font-bold text-lg">{flow.id}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-gray-900 text-lg sm:text-xl">{flow.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${colorClass} text-white`}>
                {categoryLabels[flow.category]}
              </span>
            </div>
            <p className="text-sm text-gray-700 mt-2 leading-relaxed line-clamp-2">{flow.description}</p>
            <Button
              onClick={onSelect}
              className={`mt-4 w-full rounded-xl bg-gradient-to-r ${colorClass} hover:opacity-90 transition-opacity border-0 text-white`}
              size="sm"
            >
              Detalles del flujo
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

function FlowDetailView({ flow, onBack }: { flow: Flow; onBack: () => void }) {
  const [expandedSection, setExpandedSection] = useState<string | null>("explicacion")
  const Icon = flowIcons[flow.id] || Zap
  const colorClass = categoryColors[flow.category]

  const sections = [
    {
      id: "explicacion",
      title: "Explicación",
      content: <p className="text-sm text-gray-800 leading-relaxed">{flow.description}</p>,
    },
    {
      id: "plantilla",
      title: "Plantilla",
      content: (
        <div className="space-y-4">
          <div>
            <p className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">Objetivo</p>
            <p className="text-sm text-gray-800 leading-relaxed">{flow.template.objetivo}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">Datos que deberías darle</p>
            <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
              {flow.template.entradas.map((entrada, i) => (
                <li key={i}>{entrada}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wide">
              Qué información te debería dar
            </p>
            <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
              {flow.template.salidas.map((salida, i) => (
                <li key={i}>{salida}</li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "ejemplo",
      title: "Ejemplo",
      content: (
        <div className="space-y-3">
          <div>
            <p className="text-xs font-bold text-gray-900 mb-1 uppercase tracking-wide">Nombre</p>
            <p className="text-sm text-gray-800">{flow.example.nombre}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900 mb-1 uppercase tracking-wide">Descripción</p>
            <p className="text-sm text-gray-800">{flow.example.descripcion}</p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900 mb-1 uppercase tracking-wide">Instrucciones</p>
            <p className="text-sm text-gray-800">{flow.example.instrucciones}</p>
          </div>
        </div>
      ),
    },
    {
      id: "solicitudes",
      title: "Solicitudes típicas",
      content: (
        <ul className="space-y-2">
          {flow.solicitudes.map((solicitud, i) => (
            <li key={i} className="text-sm text-gray-800 bg-gray-100 rounded-lg p-3">
              "{solicitud}"
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "limitaciones",
      title: "Limitaciones",
      content: (
        <ul className="space-y-2">
          {flow.limitaciones.map((limitacion, i) => (
            <li key={i} className="text-sm text-gray-800 bg-amber-50 border border-amber-200 rounded-lg p-3">
              {limitacion}
            </li>
          ))}
        </ul>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass sticky top-0 z-10 border-b border-border">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center gap-3">
            <Button onClick={onBack} variant="ghost" size="icon" className="rounded-xl hover:bg-gray-200">
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Button>
            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${colorClass}`}>
              <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">{flow.name}</h1>
                <span className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${colorClass} text-white`}>
                  {categoryLabels[flow.category]}
                </span>
              </div>
              <p className="text-muted-foreground text-xs sm:text-sm truncate">{flow.title}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto space-y-3">
          {sections.map((section) => (
            <Card key={section.id} className="glass border-0 overflow-hidden transition-all duration-300">
              <button
                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                className="w-full text-left"
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-gray-900 text-lg">{section.title}</h3>
                    {expandedSection === section.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-600 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </button>

              {expandedSection === section.id && (
                <CardContent className="pt-0 pb-5 px-4 sm:px-5 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="border-t border-gray-300 pt-4">{section.content}</div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-6 glass">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Flujos automatizados basados en mejores prácticas de IA generativa.</p>
        </div>
      </footer>
    </div>
  )
}

export function FlowsGuide() {
  const [selectedFlow, setSelectedFlow] = useState<Flow | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredFlows = selectedCategory === "all" ? flows : flows.filter((flow) => flow.category === selectedCategory)

  if (selectedFlow) {
    return <FlowDetailView flow={selectedFlow} onBack={() => setSelectedFlow(null)} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass sticky top-0 z-10 border-b border-border">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#FF006E]">
              <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">Flujos Automatizados</h1>
              <p className="text-muted-foreground text-xs sm:text-sm">Casos de uso profesionales con IA</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* Title Section */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-gray-900">
            Casos de uso profesionales de flujos automatizados
          </h2>
          <p className="text-gray-700 text-sm sm:text-base">
            10 asistentes GPT especializados para automatizar tareas, generar informes y potenciar la creatividad
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8">
          {categories.map((category) => (
            <Button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              variant="ghost"
              className={`rounded-xl transition-all duration-300 ${
                selectedCategory === category.value
                  ? "bg-gradient-to-r from-[#FF6B35] to-[#FF006E] text-white hover:opacity-90"
                  : "glass text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Flows Grid */}
        <div className="grid gap-4 md:grid-cols-2">
          {filteredFlows.map((flow, index) => (
            <FlowCard key={flow.id} flow={flow} index={index} onSelect={() => setSelectedFlow(flow)} />
          ))}
        </div>

        {/* Empty State */}
        {filteredFlows.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No hay flujos en esta categoría</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-6 glass">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Flujos automatizados basados en mejores prácticas de IA generativa.</p>
        </div>
      </footer>
    </div>
  )
}
