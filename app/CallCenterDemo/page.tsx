'use client'

import { useEffect } from 'react'
import { Playfair_Display, Lato } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'] })
const lato = Lato({ weight: ['400', '700'], subsets: ['latin'] })

import Navbar from '../../src/components/Common/Navbar'
import CallCenterDemo from '../../src/components/Demo/CallCenterDemo'
import Footer from '../../src/components/Common/Footer'

export default function Page() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className={`min-h-screen flex flex-col text-white ${lato.className} relative`}>
      {/* Overlay gradient */}
      <div 
        className="fixed inset-0 z-0 bg-gradient-to-b from-black/50 to-black/70"
      />

      {/* Content */}
      <div className="relative z-10">
        <Navbar 
          currentSection="callcenter" 
          setCurrentSection={() => {}}
          playfair={playfair} 
        />
        <main className="flex-grow container mx-auto px-4 pt-24 pb-8">
          <CallCenterDemo playfair={playfair} lato={lato} />
        </main>
      </div>
      <Footer />
    </div>
  )
}

