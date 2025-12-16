import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Ejemplo de uso de LogoLockup (ya integrado en Navbar en app/page.tsx):
// import LogoLockup from '@/components/Brand/LogoLockup'
// <LogoLockup size="md" priority asLinkHref="/" />

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
}

export const metadata: Metadata = {
  title: {
    default: 'zalantos - Convertimos datos en decisiones',
    template: '%s | zalantos'
  },
  description: 'Ayudamos a líderes ejecutivos a transformar la complejidad de la información en rentabilidad medible mediante Inteligencia Artificial gobernada y estructuras de datos escalables',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'zalantos',
    title: 'zalantos - Convertimos datos en decisiones',
    description: 'Ayudamos a líderes ejecutivos a transformar datos en rentabilidad medible mediante IA gobernada',
    images: [
      {
        url: '/icon.png',
        width: 512,
        height: 512,
        alt: 'zalantos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'zalantos - Convertimos datos en decisiones',
    description: 'Transformamos datos en rentabilidad medible mediante IA gobernada',
    images: ['/icon.png'],
  },
  robots: { 
    index: true, 
    follow: true 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
