import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Informe APV Ventanas de Oportunidades | Zalantos',
  description: 'Tablero de priorización de oportunidades elaborado por Zalantos para APV Ventanas.',
  robots: { index: false, follow: false },
}

export default function InformeApvVentanasOportunidadesPage() {
  return (
    <main style={{ height: "100vh" }}>
      <iframe
        src="/informe-apv-ventanas-oportunidades/index.html"
        style={{ width: "100%", height: "100%", border: "0" }}
        title="Informe APV Ventanas Oportunidades — Tablero de Priorización"
      />
    </main>
  );
}
