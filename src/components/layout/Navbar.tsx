'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { LINKS } from '@/lib/constants'
import LogoLockup from '@/components/Brand/LogoLockup'

export default function Navbar() {
  const searchParams = useSearchParams()
  const currentSection = searchParams.get('section') || 'home'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[rgba(11,42,60,0.08)]" role="navigation" aria-label="Navegación principal">
      <div className="w-full px-2 sm:px-4 md:px-12 lg:px-16">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between h-16 md:h-20">
          {/* Logo Lockup */}
          <LogoLockup 
            size="sm" 
            priority 
            asLinkHref={LINKS.home}
            className="flex-shrink-0"
          />
          
          {/* Links y CTA */}
          <div className="flex gap-1.5 sm:gap-2 lg:gap-8 items-center flex-shrink-0">
            {/* Links con iconos hasta tablets, texto solo en desktop grande */}
            <div className="flex gap-1 sm:gap-2 lg:gap-8 flex-shrink-0">
              {/* Link Inicio */}
              <Link
                href={LINKS.home}
                className={`text-sm font-medium transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2A3C] focus-visible:ring-offset-2 rounded px-1.5 sm:px-2 lg:px-0 flex-shrink-0 ${currentSection === 'home' ? 'text-[#0B2A3C]' : 'text-[#6F7A83] hover:text-[#0B2A3C]'}`}
                aria-current={currentSection === 'home' ? 'page' : undefined}
                aria-label="Inicio"
              >
                {/* Icono casa - visible hasta 1024px, oculto en desktop grande */}
                <svg 
                  className="w-5 h-5 block lg:hidden flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                {/* Texto - oculto hasta 1024px, visible en desktop grande */}
                <span className="hidden lg:block">Inicio</span>
              </Link>
              
              {/* Link Nosotros */}
              <Link
                href={LINKS.about}
                className={`text-sm font-medium transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2A3C] focus-visible:ring-offset-2 rounded px-1.5 sm:px-2 lg:px-0 flex-shrink-0 ${currentSection === 'about' ? 'text-[#0B2A3C]' : 'text-[#6F7A83] hover:text-[#0B2A3C]'}`}
                aria-current={currentSection === 'about' ? 'page' : undefined}
                aria-label="Nosotros"
              >
                {/* Icono personas - visible hasta 1024px, oculto en desktop grande */}
                <svg 
                  className="w-5 h-5 block lg:hidden flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {/* Texto - oculto hasta 1024px, visible en desktop grande */}
                <span className="hidden lg:block">Nosotros</span>
              </Link>
            </div>

            {/* CTA Pill Verde */}
            <Link
              href={LINKS.contact}
              className="btn-secondary text-xs sm:text-sm px-3 sm:px-4 lg:px-6 py-2.5 whitespace-nowrap flex-shrink-0"
              aria-label="Ir a página de contacto"
            >
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
