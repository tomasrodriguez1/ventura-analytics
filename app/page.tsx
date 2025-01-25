'use client'

import { useState } from 'react'
import { Playfair_Display, Lato } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'] })
const lato = Lato({ weight: ['400', '700'], subsets: ['latin'] })

import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Demo from './components/Demo'
import Footer from './components/Footer'

// Define tipos específicos en lugar de 'any'
interface SomeType {
  // Define las propiedades que realmente usas
}

export default function Page() {
  const [currentSection, setCurrentSection] = useState('home')

  // Función para manejar la navegación a demo
  const handleDemoNavigation = () => {
    setCurrentSection('demo')
  }

  return (
    <div className={`min-h-screen flex flex-col text-white ${lato.className} relative`}>
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url("./images/image.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: '0.2'
        }}
      />
      
      {/* Overlay gradient */}
      <div 
        className="fixed inset-0 z-0 bg-gradient-to-b from-black/50 to-black/70"
      />

      {/* Content */}
      <div className="relative z-10">
        <Navbar 
          currentSection={currentSection} 
          setCurrentSection={setCurrentSection}
          playfair={playfair} 
        />
        <main className="flex-grow container mx-auto px-4 pt-24 pb-8">
          {currentSection === 'home' && (
            <Home 
              playfair={playfair} 
              setCurrentSection={handleDemoNavigation}
            />
          )}
          {currentSection === 'about' && <About playfair={playfair} />}
          {currentSection === 'contact' && <Contact playfair={playfair} />}
          {currentSection === 'demo' && <Demo playfair={playfair} />}
        </main>
        <Footer />
      </div>
    </div>
  )
}

