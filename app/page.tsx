'use client'

import { useState, useEffect } from 'react'
import { Playfair_Display, Lato } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'] })
const lato = Lato({ weight: ['400', '700'], subsets: ['latin'] })

import Navbar from './components/Common/Navbar'
import Home from './components/Home/Home'
import About from './components/Home/About'
import Contact from './components/Home/Contact'
import RetailDemoCompleta from './components/Demo/RetailDemoCompleta'
import CallCenterDemo from './components/Demo/CallCenterDemo'
import Footer from './components/Common/Footer'

export default function Page() {
  const [currentSection, setCurrentSection] = useState('home')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentSection])

  return (
    <div className={`min-h-screen flex flex-col text-white ${lato.className} relative`}>
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
              setCurrentSection={setCurrentSection}
            />
          )}
          {currentSection === 'about' && <About playfair={playfair} />}
          {currentSection === 'contact' && <Contact playfair={playfair} />}
          {currentSection === 'retail' && <RetailDemoCompleta playfair={playfair}/>}
          {currentSection === 'callcenter' && <CallCenterDemo playfair={playfair} lato={lato} />}
        </main>
        <Footer />
      </div>
    </div>
  )
}

