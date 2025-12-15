import React from 'react'

interface TextareaProps {
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  required?: boolean
  className?: string
  rows?: number
}

export default function Textarea({ 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  className = '',
  rows = 4
}: TextareaProps) {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      rows={rows}
      className={`form-input resize-none ${className}`}
    />
  )
}
