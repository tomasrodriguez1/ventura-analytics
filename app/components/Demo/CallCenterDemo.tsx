'use client'

import { useState } from 'react'
import { NextFont } from 'next/dist/compiled/@next/font'

interface CallCenterDemoProps {
  playfair: NextFont
  lato: NextFont
}

export default function CallCenterDemo({ playfair, lato }: CallCenterDemoProps) {
  const [copied, setCopied] = useState<string | null>(null)
  const [openDropdown, setOpenDropdown] = useState<string | null>("Métricas Operacionales")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 2000)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 100; // Ajuste para scrollear un poco más abajo
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  const toggleDropdown = (categoryTitle: string) => {
    setOpenDropdown(openDropdown === categoryTitle ? null : categoryTitle)
  }
    

  const benefits = [
    {
      title: "Unificamos tus datos",
      description: "para que tus decisiones sean oportunas, con certeza y optimicen la operación con total precisión.",
      icon: "🎯"
    },
    {
      title: "Haz un \"doble click\"",
      description: "y descubre las causas de rellamadas, burnout de tus agentes o los puntos de fricción.",
      icon: "🔍"
    },
    {
      title: "Iluminamos los datos atrapados",
      description: "Descubre el mapa completo de tu operación y toma el control antes de intentar automatizar.",
      icon: "💡"
    }
  ]

  const capabilities = [
    "Volumen total de llamadas y resolución en primera llamada (FCR)",
    "Tasa de abandono y nivel de servicio",
    "Puntajes de satisfacción del cliente (CSAT) y NPS",
    "Tiempos de espera, conversación y post-llamada",
    "Desempeño de agentes y tasa de ocupación",
    "Backlog y resolución de tickets por prioridad y categoría"
  ]

  const questionCategories = [
    {
      title: "Métricas Operacionales",
      questions: [
        "¿Cuántas llamadas se resolvieron en la primera interacción esta semana?",
        "¿Cuál fue la tasa de abandono durante el mes actual?",
        "¿Cuál es el tiempo promedio de espera de los clientes?"
      ]
    },
    {
      title: "Satisfacción del Cliente",
      questions: [
        "¿Cuál es el puntaje CSAT promedio por zona?",
        "¿Qué agentes tienen el NPS más bajo este mes?"
      ]
    },
    {
      title: "Desempeño de Agentes",
      questions: [
        "¿Qué agente tuvo la mayor tasa de ocupación esta semana?",
        "Muéstrame cuántas llamadas atendió Juan Pérez ayer."
      ]
    },
    {
      title: "Resúmenes Ejecutivos",
      questions: [
        "Genérame un resumen de desempeño general del call center esta semana.",
        "¿Qué tendencias se observan en las encuestas de satisfacción recientes?"
      ]
    }
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-12 p-4">
      {/* Hero Section */}
      <div className="relative text-center bg-gradient-to-br from-gray-900/80 to-blue-900/60 p-12 md:p-16 rounded-3xl backdrop-blur-sm shadow-2xl border border-blue-500/30 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full translate-x-24 translate-y-24"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white px-6 py-2 rounded-full text-sm font-semibold mb-8">
            <span>🚀</span>
            <span>Demo Interactiva</span>
          </div>
          
          <h1 className={`${playfair.className} text-4xl md:text-6xl font-bold mb-6 text-white leading-tight drop-shadow-lg`}>
            ¿Pierdes horas buscando datos?
          </h1>
          <h2 className={`${playfair.className} text-2xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent leading-tight`}>
            Optimiza tu call center con respuestas oportunas ajustadas a tus necesidades.
          </h2>
          
          <p className={`${lato.className} text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-10`}>
            Ventura Analytics simplifica el acceso a información clave para la toma de decisiones, facilitando la obtención de insights con solo preguntar en lenguaje natural a través de su plataforma en línea.
          </p>
          
                     <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
             <button 
               onClick={() => scrollToSection('capabilities')}
               className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2"
             >
               <span className="group-hover:animate-pulse">🎯</span>
               <span>Comenzar ahora</span>
               <span className="group-hover:translate-x-1 transition-transform">→</span>
             </button>
             <button 
               onClick={() => scrollToSection('benefits')}
               className="border-2 border-blue-400/50 text-blue-300 hover:bg-blue-400/20 hover:text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 backdrop-blur-sm"
             >
               Ver más detalles
             </button>
           </div>
        </div>
      </div>
             {/* Benefits Section */}
       <div id="benefits" className="bg-gradient-to-br from-blue-900/30 to-purple-900/20 rounded-3xl p-8 md:p-12 backdrop-blur-sm shadow-2xl border border-blue-500/20">
         <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-center mb-4 text-white`}>
           ¿Por qué elegir Ventura Analytics?
         </h2>
         <p className="text-center text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
           Transforma la manera en que tu call center accede y utiliza la información
         </p>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {benefits.map((benefit, index) => (
             <div key={index} className="group relative">
               <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/60 p-8 rounded-2xl backdrop-blur-sm shadow-xl border border-gray-600/30 text-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:border-blue-400/50 group-hover:bg-gradient-to-br group-hover:from-blue-900/40 group-hover:to-purple-900/30">
                 {/* Decorative element */}
                 <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                 
                 <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{benefit.icon}</div>
                 
                 <h3 className={`${lato.className} text-xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300`}>
                   {benefit.title}
                 </h3>
                 
                 <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                   {benefit.description}
                 </p>
                 
                 {/* Bottom accent line */}
                 <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-3/4 transition-all duration-500"></div>
               </div>
             </div>
           ))}
         </div>
         
         {/* Call to Action */}
         
       </div>


      {/* Capabilities Section */}
      <div id="capabilities" className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-3xl p-8 md:p-12 backdrop-blur-sm shadow-2xl border border-purple-500/20 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
        <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/80 to-blue-600/80 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
              <span>🤖</span>
              <span>Capacidades de Cora</span>
            </div>
            
            <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-white mb-4`}>
              ¿Qué puede responderte Cora?
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Tu asistente de IA especializado en análisis de call center puede ayudarte con:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {capabilities.map((capability, index) => (
              <div key={index} className="group bg-gradient-to-br from-gray-800/60 to-gray-900/40 p-6 rounded-xl backdrop-blur-sm shadow-lg border border-gray-600/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-purple-400/50 hover:bg-gradient-to-br hover:from-purple-900/40 hover:to-blue-900/30">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-300 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
                      {capability}
                    </p>
                  </div>
                </div>
                {/* Bottom accent line */}
                <div className="mt-4 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
             {/* Call to Action - Try Demo */}
       <div className="text-center -mt-4">
             <div className="inline-flex flex-col items-center space-y-4">
               <div className="bg-gradient-to-r from-indigo-600/80 to-purple-600/80 text-white px-8 py-4 rounded-2xl backdrop-blur-sm border border-indigo-500/30">
                 <div className="flex items-center space-x-3">
                   <span className="text-2xl animate-bounce">👇</span>
                   <div className="text-left">
                     <p className="font-bold text-lg">¡Ahora pruébalo tú mismo!</p>
                     <p className="text-indigo-200 text-sm">Desliza hacia abajo para probar la demo interactiva</p>
                   </div>
                 </div>
               </div>
               <div className="flex flex-col items-center space-y-2 animate-pulse">
                 <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-transparent rounded-full"></div>
                 <div className="w-1 h-6 bg-gradient-to-b from-purple-400 to-transparent rounded-full"></div>
                 <div className="w-1 h-4 bg-gradient-to-b from-purple-300 to-transparent rounded-full"></div>
               </div>
             </div>
           </div>

       {/* Interactive Demo Section */}
       <div className="bg-gradient-to-br from-gray-900/80 to-indigo-900/60 rounded-3xl backdrop-blur-sm shadow-2xl border border-indigo-500/30 overflow-hidden relative">
         {/* Decorative background */}
         <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-blue-500/5"></div>
         <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full -translate-x-20 -translate-y-20"></div>
         
         {/* Header */}
         <div className="relative bg-gradient-to-r from-indigo-900/80 to-blue-900/60 p-8 border-b border-indigo-500/20">
           <div className="text-center">
             <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600/80 to-blue-600/80 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
               <span>💬</span>
               <span>Pruébalo Ahora</span>
             </div>
             <h2 className={`${playfair.className} text-3xl md:text-4xl font-bold text-white mb-2`}>
               Prueba la demo interactiva
             </h2>
             <p className="text-indigo-200 text-lg max-w-2xl mx-auto">
               Experimenta el poder de la IA conversacional aplicada a tu call center
             </p>
           </div>
         </div>

         {/* Main Content */}
         <div className="relative p-8">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
             
             {/* Chat Interface */}
             <div className="lg:col-span-2">
               <div className="bg-gradient-to-br from-indigo-800/40 to-blue-800/30 p-6 rounded-2xl border border-indigo-500/30 mb-6 backdrop-blur-sm">
                 <div className="flex items-center space-x-3 mb-3">
                   <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center">
                     <span className="text-white font-bold">🤖</span>
                   </div>
                   <div>
                     <h3 className={`${lato.className} text-xl font-semibold text-white`}>
                       Chat con Cora
                     </h3>
                     <p className="text-indigo-200 text-sm">
                       Asistente de Análisis Especializado
                     </p>
                   </div>
                 </div>
                 <p className="text-indigo-200 text-sm leading-relaxed">
                   Haz preguntas sobre métricas de call center en lenguaje natural. Cora está entrenada para entender tu contexto y proporcionar insights accionables.
                 </p>
               </div>
               
               <div className="bg-white rounded-2xl shadow-2xl h-[500px] border-4 border-indigo-500/20">
                 <iframe 
                   src="https://app.relevanceai.com/agents/bcbe5a/fe7fd972a30e-4126-9e21-3a069a8e877c/ee6865d9-ce3f-4623-a6ca-487524baa58b/embed-chat?starting_message_prompts=&hide_tool_steps=true&hide_file_uploads=true&hide_conversation_list=false&bubble_style=agent&primary_color=%23ffa861&bubble_icon=pd%2Fchat&input_placeholder_text=Type+your+message...&hide_logo=true&hide_description=false"
                   width="100%" 
                   height="100%" 
                   frameBorder="0"
                   className="rounded-2xl"
                 >
                 </iframe>
               </div>
             </div>

             {/* Examples Panel */}
             <div className="lg:col-span-1">
               <div className="bg-gradient-to-br from-indigo-800/40 to-blue-800/30 p-6 rounded-2xl border border-indigo-500/30 mb-6 backdrop-blur-sm">
                 <div className="flex items-center space-x-3 mb-3">
                   <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                     <span className="text-white text-sm">💡</span>
                   </div>
                   <h3 className={`${lato.className} text-lg font-semibold text-white`}>
                     Ejemplos de Consultas
                   </h3>
                 </div>
                 <p className="text-indigo-200 text-sm">
                   Haz clic en cualquier categoría de métricas, apreta cualquiera de las preguntas y pegalas en el chat
                 </p>
               </div>

               <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                 {questionCategories.map((category, categoryIndex) => (
                   <div key={categoryIndex} className="bg-gradient-to-br from-gray-800/60 to-indigo-900/40 rounded-xl border border-indigo-500/20 overflow-hidden backdrop-blur-sm shadow-lg">
                     {/* Category Header - Clickeable */}
                     <div 
                       className="bg-gradient-to-r from-indigo-700/50 to-blue-700/30 px-4 py-3 cursor-pointer hover:from-indigo-600/60 hover:to-blue-600/40 transition-all duration-300"
                       onClick={() => toggleDropdown(category.title)}
                     >
                       <div className="flex items-center justify-between">
                         <h4 className={`${lato.className} text-sm font-semibold text-indigo-200`}>
                           {category.title}
                         </h4>
                         <div className="flex items-center space-x-2">
                           <span className="text-indigo-300 text-xs">
                             ({category.questions.length} preguntas)
                           </span>
                           <span className={`text-indigo-200 text-sm transition-transform duration-300 ${
                             openDropdown === category.title ? 'rotate-180' : 'rotate-0'
                           }`}>
                             ▼
                           </span>
                         </div>
                       </div>
                     </div>
                     
                     {/* Questions List - Collapsible */}
                     <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                       openDropdown === category.title 
                         ? 'max-h-96 opacity-100' 
                         : 'max-h-0 opacity-0'
                     }`}>
                       <div className="p-4 space-y-3 border-t border-indigo-500/10">
                         {category.questions.map((question, questionIndex) => (
                           <div key={questionIndex} className="group">
                             <div 
                               className="flex items-start justify-between p-3 rounded-lg hover:bg-indigo-800/30 transition-all duration-300 cursor-pointer border border-transparent hover:border-indigo-500/30"
                               onClick={() => copyToClipboard(question)}
                             >
                               <p className="text-gray-300 text-xs leading-relaxed flex-1 pr-3 group-hover:text-white transition-colors">
                                 {question}
                               </p>
                               <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                 <span className="text-white text-xs">
                                   {copied === question ? "✓" : "📋"}
                                 </span>
                               </div>
                             </div>
                             {copied === question && (
                               <div className="px-3 pb-2">
                                 <span className="text-green-400 text-xs font-medium">✨ Copiado al portapapeles</span>
                               </div>
                             )}
                           </div>
                         ))}
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           </div>
         </div>

         {/* Footer Info */}
         <div className="relative bg-gradient-to-r from-indigo-900/60 to-blue-900/40 p-6 border-t border-indigo-500/20">
           <div className="flex flex-col md:flex-row justify-between items-center text-sm">
             <div className="mb-4 md:mb-0 flex items-center space-x-4">
               <div className="flex items-center space-x-2 text-indigo-200">
                 <span className="text-yellow-400">💡</span>
                 <span>Tip: Puedes hacer preguntas sobre cualquier métrica de call center</span>
               </div>
             </div>
             <div className="flex items-center space-x-6 text-indigo-200">
               <div className="flex items-center space-x-2">
                 <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                 <span>Datos actualizados</span>
               </div>
               <div className="flex items-center space-x-2">
                 <span>🔒</span>
                 <span>Información segura</span>
               </div>
             </div>
           </div>
           
           
         </div>
       </div>
    </div>
  )
} 