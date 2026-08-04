import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'

const SITE_URL = 'https://zalantos.com'

const staticPages = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/blog/', changefreq: 'weekly', priority: '0.9' },
  { path: '/consultor-ia/', changefreq: 'monthly', priority: '0.8' },
  { path: '/productos/', changefreq: 'monthly', priority: '0.8' },
  { path: '/productos/crm/', changefreq: 'monthly', priority: '0.8' },
  { path: '/productos/gestion-de-proyectos/', changefreq: 'monthly', priority: '0.8' },
  { path: '/lp/no-todos-problemas-operativos-necesitan-ia/', changefreq: 'monthly', priority: '0.7' },
  { path: '/lp/datos-en-orden-automatizacion-ia/', changefreq: 'monthly', priority: '0.7' },
  { path: '/privacy/', changefreq: 'yearly', priority: '0.3' },
]

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog')
  const now = new Date().toISOString()

  const urls: string[] = []

  for (const page of staticPages) {
    urls.push(
      `  <url>\n    <loc>${SITE_URL}${page.path}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>`
    )
  }

  for (const post of posts) {
    const lastmod = (post.data.updatedDate ?? post.data.pubDate).toISOString()
    urls.push(
      `  <url>\n    <loc>${SITE_URL}/blog/${post.slug}/</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
    )
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
