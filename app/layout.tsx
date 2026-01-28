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
    default: 'zalantos.com',
    template: '%s | zalantos'
  },
  description: 'Ayudamos a visibilizar la información para mejorar la toma de decisiones, monitorear la gestión del negocio y aumentar el crecimiento.',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'zalantos',
    title: 'zalantos.com',
    description: 'En zalantos te ayudamos a visibilizar la información para mejorar la toma de decisiones, monitorear la gestión del negocio y aumentar el crecimiento.',
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
    title: 'zalantos.com',
    description: 'En zalantos te ayudamos a visibilizar la información para mejorar la toma de decisiones, monitorear la gestión del negocio y aumentar el crecimiento.',
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
