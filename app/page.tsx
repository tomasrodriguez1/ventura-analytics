import { Suspense } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Pillars from '@/components/sections/Pillars'
import Process from '@/components/sections/Process'
import Clients from '@/components/sections/Clients'
import UseCases from '@/components/sections/UseCases'
import CTAFinal from '@/components/sections/CTAFinal'
import AboutSection from '@/components/sections/AboutSection'
import ContactSection from '@/components/sections/ContactSection'

interface PageProps {
  searchParams: Promise<{ section?: string }>
}

function PageContent({ section }: { section: string }) {
  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-inter)]">
      <Suspense fallback={<div className="h-16" aria-label="Cargando navegación" />}>
        <Navbar />
      </Suspense>
      <main id="main-content" className="flex-grow w-full pt-20">
        {section === 'home' && (
          <>
            <Hero />
            <Pillars />
            <Process />
            <Clients />
            <UseCases />
            <CTAFinal />
          </>
        )}
        {section === 'about' && <AboutSection />}
        {section === 'contact' && <ContactSection />}
      </main>
      <Footer />
    </div>
  )
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams
  const section = params.section && ['home', 'about', 'contact'].includes(params.section) 
    ? params.section 
    : 'home'

  return <PageContent section={section} />
}
