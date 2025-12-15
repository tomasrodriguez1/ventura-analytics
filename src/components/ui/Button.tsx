import React from 'react'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  children: React.ReactNode
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

export default function Button({ 
  variant = 'primary', 
  children, 
  onClick, 
  className = '', 
  type = 'button',
  disabled = false 
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 transition-all duration-150 min-h-[44px] min-w-[44px] touch-manipulation'
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline'
  }
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : ''
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
      aria-disabled={disabled}
    >
      {children}
    </button>
  )
}
