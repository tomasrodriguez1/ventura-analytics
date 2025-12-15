import React from 'react'

interface InputProps {
  type?: 'text' | 'email' | 'tel' | 'password'
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  className?: string
}

export default function Input({ 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  className = '' 
}: InputProps) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`form-input ${className}`}
    />
  )
}
