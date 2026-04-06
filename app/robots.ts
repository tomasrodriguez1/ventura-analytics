import { MetadataRoute } from 'next'

// ⚠️ Requerido para export estático
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://zalantos.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/informe-apv-ventanas-oportunidades/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
