import React from 'react'
import Link from 'next/link'

interface AiCtaButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'navbar' | 'hero'
  className?: string
  betaLabel?: string
}

export default function AiCtaButton({ 
  href, 
  children, 
  variant = 'hero',
  className = '',
  betaLabel,
}: AiCtaButtonProps) {
  
  const baseClasses = 'inline-flex items-center justify-center gap-2 transition-all duration-300 min-h-[44px] touch-manipulation font-medium rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
  
  // Estilos específicos por variante
  const variantClasses = {
    navbar: 'text-xs sm:text-sm px-3 sm:px-4 lg:px-5 py-2.5 whitespace-nowrap',
    hero: 'text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4'
  }
  
  // Estilos AI con gradiente y glow effect
  const aiStyles = `
    bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500
    text-white
    shadow-lg shadow-violet-500/30
    hover:shadow-xl hover:shadow-violet-500/50
    hover:scale-105
    active:scale-100
    focus-visible:ring-violet-500
    relative
    overflow-hidden
    before:absolute before:inset-0
    before:bg-gradient-to-r before:from-cyan-400 before:via-violet-400 before:to-fuchsia-400
    before:opacity-0 before:transition-opacity before:duration-300
    hover:before:opacity-30
  `
  
  return (
    <Link
      href={href}
      className={`${baseClasses} ${variantClasses[variant]} ${aiStyles} ${className}`}
      aria-label={`Hablar con el Consultor IA${betaLabel ? ` (${betaLabel})` : ''}`}
    >
      {/* Icono de IA / Sparkles */}
      <svg
        className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {betaLabel && (
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/90">
            {betaLabel}
          </span>
        )}
      </span>
    </Link>
  )
}

