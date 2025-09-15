'use client';

import { useEffect } from 'react';
import { Playfair_Display, Lato } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'] });
const lato = Lato({ weight: ['400', '700'], subsets: ['latin'] });

import Navbar from '../../src/components/Common/Navbar';
import Dashboard from '../../src/components/Dashboard/Dashboard';
import Footer from '../../src/components/Common/Footer';

export default function DashboardMineroPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className={`min-h-screen flex flex-col text-white ${lato.className} relative`}>
      {/* Overlay gradient con colores más sutiles */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-gray-800/70 to-gray-900/80" />

      {/* Content */}
      <div className="relative z-10">
        <Navbar 
          currentSection="dashboard" 
          setCurrentSection={() => {}}
          playfair={playfair} 
        />
        <main className="flex-grow pt-20">
          <Dashboard playfair={playfair} />
        </main>
      </div>
      <Footer />
    </div>
  );
}
