// import Link from 'next/link'
import { NextFont } from 'next/dist/compiled/@next/font'

interface NavbarProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
  playfair: NextFont;
}

export default function Navbar({ currentSection, setCurrentSection, playfair }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800/70 backdrop-blur-md rounded-full px-6 py-3 flex items-center justify-between">
          <h1 
            className={`${playfair.className} text-2xl cursor-pointer`}
            onClick={() => setCurrentSection('home')}
          >
            Ventura Analytic
          </h1>
          
          <div className="flex gap-6">
            <button
              onClick={() => setCurrentSection('home')}
              className={`hover:text-blue-400 transition-colors ${currentSection === 'home' ? 'text-blue-400' : 'text-gray-300'}`}
            >
              Inicio
            </button>
            <button
              onClick={() => setCurrentSection('about')}
              className={`hover:text-blue-400 transition-colors ${currentSection === 'about' ? 'text-blue-400' : 'text-gray-300'}`}
            >
              Nosotros
            </button>
            <button
              onClick={() => setCurrentSection('contact')}
              className={`hover:text-blue-400 transition-colors ${currentSection === 'contact' ? 'text-blue-400' : 'text-gray-300'}`}
            >
              Contacto
            </button>
            <button
              onClick={() => setCurrentSection('demo')}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-full text-white transition-colors"
            >
              Demo
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

