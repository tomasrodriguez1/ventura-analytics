'use client'

import Image from 'next/image'
import Link from 'next/link'
import { LINKS } from '@/lib/constants'

/**
 * LogoLockup - Componente reutilizable para el logo lockup de zalantos
 * 
 * Renderiza el isotipo a la izquierda + wordmark "zalantos" con next/image,
 * alineados al centro, con espaciado y tamaños responsivos.
 * 
 * @example
 * // Uso básico en navbar
 * <LogoLockup size="md" priority asLinkHref="/" />
 * 
 * @example
 * // Solo icono en footer
 * <LogoLockup size="sm" variant="iconOnly" />
 * 
 * @example
 * // Hero section
 * <LogoLockup size="lg" className="mb-8" />
 */
interface LogoLockupProps {
  /** Tamaño del lockup: sm (~28px), md (~32px), lg (~44px) */
  size?: 'sm' | 'md' | 'lg'
  /** Clases CSS adicionales */
  className?: string
  /** Mostrar texto "zalantos" (default: true) */
  showText?: boolean
  /** Variante: default (isotipo + texto), iconOnly (solo isotipo) */
  variant?: 'default' | 'iconOnly'
  /** Prioridad de carga para next/image (usar en navbar principal) */
  priority?: boolean
  /** URL para envolver el lockup con Link (opcional) */
  asLinkHref?: string
}

const SIZE_CONFIG = {
  sm: {
    height: 40,
    gap: 10,
    iconHeight: 40, // Icono más pequeño
    textSize: 'text-3xl', // Texto más grande
    sizes: '(max-width: 768px) 50px, 70px',
  },
  md: {
    height: 32,
    gap: 10,
    iconHeight: 24, // Icono más pequeño
    textSize: 'text-xl', // Texto más grande
    sizes: '(max-width: 768px) 70px, 100px',
  },
  lg: {
    height: 44,
    gap: 12,
    iconHeight: 32, // Icono más pequeño
    textSize: 'text-2xl', // Texto más grande
    sizes: '(max-width: 768px) 100px, 150px',
  },
} as const

export default function LogoLockup({
  size = 'md',
  className = '',
  showText = true,
  variant = 'default',
  priority = false,
  asLinkHref,
}: LogoLockupProps) {
  const config = SIZE_CONFIG[size]
  
  // Usar la imagen icono_zalantos_sf.png para todos los casos (light mode y dark mode)
  const iconSrc = '/images/icono_zalantos_sf.png'
  
  // Si variant es iconOnly, forzar showText a false
  const shouldShowText = variant === 'iconOnly' ? false : showText
  
  const lockupContent = (
    <div
      className={`flex items-center ${className}`}
      style={{ gap: shouldShowText ? `${config.gap}px` : 0 }}
      aria-label="Zalantos"
    >
      {/* Isotipo */}
      <div
        className="flex-shrink-0 relative"
        style={{ height: `${config.iconHeight}px`, width: `${config.iconHeight}px` }}
      >
        <Image
          src={iconSrc}
          alt="Zalantos"
          width={config.iconHeight}
          height={config.iconHeight}
          sizes={config.sizes}
          priority={priority}
          className="object-contain"
          style={{ 
            width: `${config.iconHeight}px`,
            height: `${config.iconHeight}px`,
            maxWidth: `${config.iconHeight}px`,
            maxHeight: `${config.iconHeight}px`
          }}
        />
      </div>
      
      {/* Wordmark "zalantos" */}
      {shouldShowText && (
        <span
          className={`${config.textSize} font-bold text-[#0B2A3C] flex-shrink-0`}
          style={{
            fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            lineHeight: 1,
          }}
        >
          zalantos
        </span>
      )}
    </div>
  )

  // Si se proporciona asLinkHref, envolver con Link
  if (asLinkHref) {
    return (
      <Link
        href={asLinkHref}
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B2A3C] focus-visible:ring-offset-2 rounded"
        aria-label="zalantos - Inicio"
      >
        {lockupContent}
      </Link>
    )
  }

  return lockupContent
}
