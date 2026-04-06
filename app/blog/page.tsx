import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { blogPosts } from '@/data/blog'

export const metadata: Metadata = {
  title: 'Insights & Casos de Automatización IA | Zalantos',
  description:
    'Artículos sobre automatización, inteligencia artificial y casos de éxito reales. Ingeniería aplicada a problemas reales de empresas en Chile.',
  keywords: ['automatización IA', 'inteligencia artificial empresas', 'casos de éxito', 'insights tecnología', 'transformación digital', 'zalantos blog'],
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Insights & Casos de Automatización IA | Zalantos',
    description: 'Artículos sobre automatización, inteligencia artificial y casos de éxito reales.',
    url: '/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Insights & Casos de Automatización IA | Zalantos',
    description: 'Artículos sobre automatización, inteligencia artificial y casos de éxito reales.',
  },
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00')
  return date.toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const NAVBAR_FALLBACK = <div className="h-16 md:h-20" aria-label="Cargando navegación" />

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-inter)]">
      <Suspense fallback={NAVBAR_FALLBACK}>
        <Navbar />
      </Suspense>

      <main className="flex-grow w-full pt-20">
        {/* Header */}
        <section className="section-full bg-white">
          <div className="section-inner">
            <div className="max-w-2xl">
              <span
                className="inline-block text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: '#2FBF71' }}
              >
                Zalantos
              </span>
              <h1
                className="text-4xl sm:text-5xl font-bold leading-tight mb-4"
                style={{ color: '#0B2A3C' }}
              >
                Insights & Casos
              </h1>
              <p className="text-lg" style={{ color: '#6F7A83' }}>
                Ingeniería aplicada a problemas reales.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div
          className="w-full h-px"
          style={{ background: 'rgba(11,42,60,0.08)' }}
        />

        {/* Grid de artículos */}
        <section className="section-full bg-gray-50">
          <div className="section-inner">
            {blogPosts.length === 0 ? (
              <p className="text-center py-24" style={{ color: '#6F7A83' }}>
                Próximamente nuevos artículos.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                  <article
                    key={post.id}
                    className="card-flat flex flex-col group transition-all duration-200 hover:shadow-md"
                    style={{ borderColor: 'rgba(11,42,60,0.1)' }}
                  >
                    <div className="p-6 sm:p-8 flex flex-col flex-grow">
                      {/* Categoría */}
                      <span
                        className="text-xs font-semibold tracking-wider uppercase mb-3"
                        style={{ color: '#2FBF71' }}
                      >
                        {post.category}
                      </span>

                      {/* Título */}
                      <h2
                        className="text-xl font-bold leading-snug mb-3 group-hover:text-[#2FBF71] transition-colors duration-200"
                        style={{ color: '#0B2A3C' }}
                      >
                        {post.title}
                      </h2>

                      {/* Fecha */}
                      <p
                        className="text-xs mb-4"
                        style={{ color: '#6F7A83' }}
                      >
                        {formatDate(post.date)}
                      </p>

                      {/* Extracto */}
                      <p
                        className="text-sm leading-relaxed flex-grow"
                        style={{ color: '#6F7A83' }}
                      >
                        {post.excerpt}
                      </p>

                      {/* Link */}
                      <div className="mt-6 pt-4" style={{ borderTop: '1px solid rgba(11,42,60,0.08)' }}>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200"
                          style={{ color: '#0B2A3C' }}
                          aria-label={`Leer artículo: ${post.title}`}
                        >
                          Leer artículo
                          <svg
                            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
