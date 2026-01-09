import React from 'react'

interface InputProps {
  type?: 'text' | 'email' | 'tel' | 'password'
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  className?: string
  id?: string
  ariaInvalid?: boolean
  ariaDescribedBy?: string
}

export default function Input({
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  className = '',
  id,
  ariaInvalid,
  ariaDescribedBy,
}: InputProps) {
  const inputId = id || name
  return (
    <input
      type={type}
      name={name}
      id={inputId}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      aria-invalid={ariaInvalid ? 'true' : undefined}
      aria-describedby={ariaDescribedBy}
      className={`form-input ${className}`}
    />
  )
}
