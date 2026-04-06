import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0B2A3C',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://zalantos.com'),
  title: {
    default: 'Automatización IA para Empresas | Zalantos',
    template: '%s | Zalantos'
  },
  description: 'Zalantos diseña soluciones de inteligencia artificial, automatización de procesos y análisis de datos para empresas. Transformamos datos en decisiones y automatizamos flujos operativos.',
  keywords: ['inteligencia artificial empresas', 'automatización procesos', 'análisis datos', 'IA para negocios', 'transformación digital Chile', 'Sprint 0', 'zalantos'],
  authors: [{ name: 'Zalantos SPA', url: 'https://zalantos.com' }],
  creator: 'Zalantos SPA',
  publisher: 'Zalantos SPA',
  manifest: '/site.webmanifest',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    siteName: 'Zalantos',
    title: 'Automatización IA para Empresas | Zalantos',
    description: 'Zalantos diseña soluciones de inteligencia artificial, automatización de procesos y análisis de datos para empresas en Chile.',
    url: 'https://zalantos.com',
    images: [
      {
        url: '/icon.png',
        width: 512,
        height: 512,
        alt: 'Zalantos — Automatización IA para empresas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@zalantos',
    creator: '@zalantos',
    title: 'Automatización IA para Empresas | Zalantos',
    description: 'Zalantos diseña soluciones de inteligencia artificial, automatización de procesos y análisis de datos para empresas en Chile.',
    images: ['/icon.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Zalantos',
  url: 'https://zalantos.com',
  description: 'Soluciones de inteligencia artificial, automatización de procesos y análisis de datos para empresas en Chile.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://zalantos.com/blog?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://zalantos.com/#organization',
  name: 'Zalantos SPA',
  url: 'https://zalantos.com',
  logo: 'https://zalantos.com/icon.png',
  image: 'https://zalantos.com/icon.png',
  description: 'Empresa chilena de tecnología especializada en inteligencia artificial, automatización de procesos y análisis de datos para empresas.',
  email: 'contacto@zalantos.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Padre Mariano 210, Oficina 405',
    addressLocality: 'Providencia',
    addressRegion: 'Región Metropolitana',
    postalCode: '7500000',
    addressCountry: 'CL',
  },
  priceRange: '$$',
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Automatización IA y Análisis de Datos para Empresas',
  serviceType: 'Consultoría en Tecnología e Inteligencia Artificial',
  provider: {
    '@type': 'Organization',
    name: 'Zalantos SPA',
    url: 'https://zalantos.com',
  },
  description: 'Diseñamos e implementamos soluciones de inteligencia artificial, automatización de procesos y análisis de datos para empresas en Chile.',
  areaServed: {
    '@type': 'Country',
    name: 'Chile',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios Zalantos',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Sistemas de Gestión de Información y BI',
          description: 'Tableros de control con datos consistentes y fuente única de información para tomar mejores decisiones.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Automatización de Procesos',
          description: 'Integración de sistemas y automatización de flujos operativos para eliminar carga manual y errores.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Soluciones de Inteligencia Artificial',
          description: 'Asistentes internos, sistemas RAG y automatizaciones inteligentes con IA aplicada al negocio.',
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
