'use client'

import { useState } from 'react'
import { NextFont } from 'next/dist/compiled/@next/font'

interface RegisterProps {
  onRegister: (data: { name: string; email: string; reason: string }) => void;
  playfair: NextFont;
}

export default function Register({ onRegister, playfair }: RegisterProps) {
  const [formData, setFormData] = useState({ name: '', email: '', reason: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onRegister(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section className="space-y-4">
      <h2 className={`text-3xl font-bold text-white ${playfair.className}`}>Regístrate para ver la Demo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre"
          required
          className="w-full p-2 bg-black border border-white rounded text-white"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Correo"
          required
          className="w-full p-2 bg-black border border-white rounded text-white"
        />
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          placeholder="¿Por qué te interesa ver la demo?"
          required
          className="w-full p-2 bg-black border border-white rounded text-white h-32"
        ></textarea>
        <button type="submit" className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">
          Acceder a la Demo
        </button>
      </form>
    </section>
  )
}

