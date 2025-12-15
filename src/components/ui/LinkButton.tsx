import React from 'react'
import Link from 'next/link'

interface LinkButtonProps {
  href: string
  variant?: 'primary' | 'secondary' | 'outline'
  children: React.ReactNode
  className?: string
}

export default function LinkButton({ 
  href, 
  variant = 'primary', 
  children, 
  className = '' 
}: LinkButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 transition-all duration-150 min-h-[44px] min-w-[44px] touch-manipulation'
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline'
  }
  
  return (
    <Link 
      href={href}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Link>
  )
}
