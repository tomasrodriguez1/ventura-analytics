import { Suspense } from 'react'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-inter)]">
      <Suspense fallback={<div className="h-16" aria-label="Cargando navegación" />}>
        <Navbar />
      </Suspense>
      <main className="flex-grow w-full bg-white pt-20">
        {children}
      </main>
      <Footer />
    </div>
  )
}
