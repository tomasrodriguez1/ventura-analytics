import { Suspense } from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import LinkButton from '@/components/ui/LinkButton'
import { blogPosts } from '@/data/blog'
import { LINKS } from '@/lib/constants'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return { title: 'Artículo no encontrado | Zalantos' }
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: ['zalantos', post.category.toLowerCase(), 'inteligencia artificial', 'automatización', 'transformación digital'],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url: `/blog/${post.slug}`,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: ['/og-image.png'],
    },
  }
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

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Zalantos',
      url: 'https://zalantos.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://zalantos.com/icon.png',
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://zalantos.com/blog/${post.slug}/`,
    },
    image: 'https://zalantos.com/icon.png',
    articleSection: post.category,
    inLanguage: 'es-CL',
    url: `https://zalantos.com/blog/${post.slug}/`,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://zalantos.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Insights & Casos',
        item: 'https://zalantos.com/blog/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://zalantos.com/blog/${post.slug}/`,
      },
    ],
  }

  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-inter)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Suspense fallback={NAVBAR_FALLBACK}>
        <Navbar />
      </Suspense>

      <main className="flex-grow w-full pt-20">
        {/* Hero del artículo */}
        <section className="section-full bg-white">
          <div className="section-inner">
            <div className="max-w-3xl mx-auto text-center">
              {/* Breadcrumb */}
              <nav className="flex items-center justify-center gap-2 text-xs mb-8" aria-label="Navegación de migas de pan">
                <Link
                  href={LINKS.blog}
                  className="transition-colors duration-150"
                  style={{ color: '#6F7A83' }}
                  title="Ver todos los artículos de Zalantos"
                >
                  Insights & Casos
                </Link>
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  style={{ color: '#6F7A83' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span style={{ color: '#0B2A3C' }}>{post.category}</span>
              </nav>

              {/* Categoría */}
              <span
                className="inline-block text-xs font-semibold tracking-widest uppercase mb-4"
                style={{ color: '#2FBF71' }}
              >
                {post.category}
              </span>

              {/* Título */}
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6"
                style={{ color: '#0B2A3C' }}
              >
                {post.title}
              </h1>

              {/* Meta */}
              <div
                className="flex items-center justify-center gap-4 text-sm"
                style={{ color: '#6F7A83' }}
              >
                <span>{post.author}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full h-px" style={{ background: 'rgba(11,42,60,0.08)' }} />

        {/* Cuerpo del artículo */}
        <section className="section-full bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* CTA Final */}
            <div
              className="mt-16 mb-8 rounded-2xl p-8 sm:p-10"
              style={{
                background: 'rgba(47,191,113,0.06)',
                border: '1.5px solid rgba(47,191,113,0.3)',
              }}
            >
              <p
                className="text-xs font-semibold tracking-widest uppercase mb-3"
                style={{ color: '#2FBF71' }}
              >
                ¿Te identificas con este problema?
              </p>
              <h2
                className="text-2xl sm:text-3xl font-bold leading-snug mb-3"
                style={{ color: '#0B2A3C' }}
              >
                Agenda un Sprint 0 sin costo y diseñemos la solución en 1 semana.
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: '#6F7A83' }}>
                En 5 días de trabajo conjunto diagnosticamos el problema, definimos la arquitectura
                y te entregamos un plan de acción concreto sin compromisos.
              </p>
              <LinkButton href={LINKS.contact} variant="primary" className="px-8 py-3 text-sm">
                Agenda tu Sprint 0 gratuito
              </LinkButton>
            </div>

            {/* Volver al blog */}
            <div className="pb-12">
              <Link
                href={LINKS.blog}
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-150"
                style={{ color: '#6F7A83' }}
                title="Ver todos los artículos de Insights & Casos"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Ver todos los artículos
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
