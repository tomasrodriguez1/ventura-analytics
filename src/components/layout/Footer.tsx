import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-[#0B2A3C] text-gray-300 border-t border-[rgba(255,255,255,0.08)]" role="contentinfo">
      <div className="section-inner py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Logo y Tagline */}
          <div className="md:col-span-2">
            <h3 className="font-[family-name:var(--font-inter)] text-xl md:text-2xl font-bold text-white mb-3">
              zalantos
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Convertimos datos en decisiones y monetizamos resultados
            </p>
          </div>

          {/* Navegación */}
          <nav aria-label="Navegación del pie de página">
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="text-gray-400 hover:text-[#2FBF71] transition-colors text-sm inline-block min-h-[44px] flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FBF71] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B2A3C] rounded"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link 
                  href="/?section=about" 
                  className="text-gray-400 hover:text-[#2FBF71] transition-colors text-sm inline-block min-h-[44px] flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FBF71] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B2A3C] rounded"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link 
                  href="/?section=contact" 
                  className="text-gray-400 hover:text-[#2FBF71] transition-colors text-sm inline-block min-h-[44px] flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FBF71] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B2A3C] rounded"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Contacto */}
        <div className="border-t border-[rgba(255,255,255,0.08)] pt-6 mb-6">
          <p className="text-gray-400 text-sm">
            <span className="text-white font-semibold">Email:</span>{' '}
            <a 
              href="mailto:soporte@zalantos.com" 
              className="text-[#2FBF71] hover:text-[#2FBF71]/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FBF71] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B2A3C] rounded"
            >
              soporte@zalantos.com
            </a>
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-[rgba(255,255,255,0.08)] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 zalantos. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <a 
              href="#" 
              className="text-gray-500 hover:text-[#2FBF71] transition-colors min-h-[44px] flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FBF71] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B2A3C] rounded"
            >
              Privacidad
            </a>
            <a 
              href="#" 
              className="text-gray-500 hover:text-[#2FBF71] transition-colors min-h-[44px] flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FBF71] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B2A3C] rounded"
            >
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
