import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'success' | 'info' | 'warning'
  className?: string
}

export default function Badge({ children, variant = 'success', className = '' }: BadgeProps) {
  const variantClasses = {
    success: 'bg-[#2FBF71]/10 text-[#2FBF71]',
    info: 'bg-[#3FA9F5]/10 text-[#3FA9F5]',
    warning: 'bg-yellow-500/10 text-yellow-700'
  }
  
  return (
    <span className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}
