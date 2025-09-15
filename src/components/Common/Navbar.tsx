'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { NextFont } from 'next/dist/compiled/@next/font'

interface NavbarProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
  playfair: NextFont;
}

export default function Navbar({ currentSection, setCurrentSection, playfair }: NavbarProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const router = useRouter()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800/70 backdrop-blur-md rounded-full px-3 md:px-6 py-3 flex items-center justify-between">
          <h1 
            className={`${playfair.className} text-lg md:text-2xl cursor-pointer`}
            onClick={() => {
              if (currentSection === 'retail' || currentSection === 'callcenter') {
                router.push('/')
              } else {
                setCurrentSection('home')
              }
            }}
          >
            <span className="hidden sm:inline">Ventura Analytic</span>
            <span className="sm:hidden">VA</span>
          </h1>
          
          <div className="flex gap-2 md:gap-6 items-center">
            <button
              onClick={() => {
                if (currentSection === 'retail' || currentSection === 'callcenter') {
                  router.push('/')
                } else {
                  setCurrentSection('home')
                }
              }}
              className={`hover:text-blue-400 transition-colors px-2 md:px-0 ${currentSection === 'home' ? 'text-blue-400' : 'text-gray-300'}`}
            >
              <span className="hidden md:inline">Inicio</span>
              <svg className="w-5 h-5 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
            <button
              onClick={() => {
                if (currentSection === 'retail' || currentSection === 'callcenter') {
                  router.push('/?section=about')
                } else {
                  setCurrentSection('about')
                }
              }}
              className={`hover:text-blue-400 transition-colors px-2 md:px-0 ${currentSection === 'about' ? 'text-blue-400' : 'text-gray-300'}`}
            >
              <span className="hidden md:inline">Nosotros</span>
              <svg className="w-5 h-5 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
            <button
              onClick={() => {
                if (currentSection === 'retail' || currentSection === 'callcenter') {
                  router.push('/?section=contact')
                } else {
                  setCurrentSection('contact')
                }
              }}
              className={`hover:text-blue-400 transition-colors px-2 md:px-0 ${currentSection === 'contact' ? 'text-blue-400' : 'text-gray-300'}`}
            >
              <span className="hidden md:inline">Contacto</span>
              <svg className="w-5 h-5 md:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                className={`bg-blue-600 hover:bg-blue-700 px-2 md:px-4 py-1 rounded-full text-white transition-colors flex items-center gap-1 md:gap-2 text-sm md:text-base`}
              >
                <span className="hidden md:inline">Casos de Uso</span>
                <span className="md:hidden">Casos</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-gray-800 rounded-lg shadow-xl">
                  <button
                    onClick={() => {
                      router.push('/RetailDemo')
                      setShowDropdown(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Demo Retail
                  </button>
                  <button
                    onClick={() => {
                      router.push('/CallCenterDemo')
                      setShowDropdown(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Demo Call Center
                  </button>
                  <button
                    onClick={() => {
                      router.push('/DashboardMinero')
                      setShowDropdown(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Dashboard Minero
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

