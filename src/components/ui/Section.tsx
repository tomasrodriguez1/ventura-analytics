import React from 'react'

interface SectionProps {
  variant?: 'white' | 'gray' | 'dark'
  hero?: boolean
  narrow?: boolean
  children: React.ReactNode
  className?: string
}

export default function Section({ 
  variant = 'white', 
  hero = false, 
  narrow = false, 
  children, 
  className = '' 
}: SectionProps) {
  const variantClasses = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    dark: 'bg-[#0B2A3C] text-white'
  }
  
  const sectionClass = hero ? 'section-full-hero' : 'section-full'
  const innerClass = narrow ? 'section-inner-narrow' : 'section-inner'
  
  return (
    <section className={`${sectionClass} ${variantClasses[variant]} ${className}`}>
      <div className={innerClass}>
        {children}
      </div>
    </section>
  )
}
