# Zalantos - Sitio corporativo (Astro 4)

Sitio estático de [zalantos.com](https://zalantos.com) construido con **Astro 4 + React + Tailwind CSS**, optimizado para SEO (HTML puro indexable por Google y bots de IA) y desplegable por FTP a cPanel.

## Stack

- **Framework**: [Astro 4](https://astro.build) (output estático)
- **React**: únicamente para la isla interactiva del Consultor IA (`client:load`)
- **Estilos**: Tailwind CSS 3
- **Blog**: [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) (Markdown + HTML embebido)
- **Lenguaje**: TypeScript

## Estructura

```
src/
├── content/blog/        Artículos del blog (.md con frontmatter)
├── layouts/             BaseLayout, BlogLayout
├── components/
│   ├── sections/        Secciones de la home (.astro)
│   ├── chat/            Isla React del Consultor IA (.tsx)
│   ├── landing/         Landing de campañas LinkedIn (.astro)
│   └── ui/              Componentes reutilizables
├── lib/                 schemas JSON-LD, constants, api
├── services/            chatService (webhook del consultor IA)
├── types/               Tipos compartidos
├── styles/global.css    Variables --z-* y utilidades globales
└── pages/
    ├── index.astro                                           → /
    ├── blog/index.astro                                      → /blog/
    ├── blog/[slug].astro                                     → /blog/<slug>/
    ├── consultor-ia.astro                                    → /consultor-ia/
    ├── lp/no-todos-problemas-operativos-necesitan-ia.astro   → /lp/.../
    ├── privacy.astro                                         → /privacy/
    └── sitemap.xml.ts                                        → /sitemap.xml (dinámico)

public/
├── .htaccess            Reescrituras + HTTPS + cache para Apache/cPanel
├── robots.txt           Sitemap + permisos para bots de IA
├── site.webmanifest, humans.txt, icon.png, og-image.png
└── images/*             Assets estáticos
```

## Scripts

```bash
npm install        # instalar dependencias
npm run dev        # dev server http://localhost:4321
npm run build      # genera /dist estático
npm run preview    # previsualiza /dist
```

## Desarrollo local

```bash
npm install
npm run dev
```

El dev server corre en `http://localhost:4321`. Los cambios en `.astro`, `.tsx`, `.md` y `.css` se reflejan en caliente.

## Build de producción

```bash
npm run build
```

Genera la carpeta `dist/` con HTML puro, assets hashed en `dist/_astro/` y `sitemap.xml` generado con las 5 páginas estáticas + todos los artículos del blog.

Verifica con:

```bash
npm run preview
```

## Deploy a cPanel por FTP

1. Ejecuta `npm run build`.
2. Sube **TODO el contenido de `dist/`** (no la carpeta en sí, sino lo que está dentro) a la raíz `public_html/` de cPanel.
   - Incluye el archivo oculto `.htaccess` (asegúrate de que tu cliente FTP muestre archivos ocultos — FileZilla: *Servidor → Forzar archivos ocultos*).
   - Asegúrate de reemplazar el `index.html` anterior por el nuevo.
3. Conserva (o sube) `public_html/robots.txt` y `public_html/sitemap.xml` en la raíz.
4. Verifica que `https://zalantos.com/` responde 200 y muestra la home. Revisa también:
   - `https://zalantos.com/blog/`
   - `https://zalantos.com/consultor-ia/`
   - `https://zalantos.com/privacy/`
   - `https://zalantos.com/sitemap.xml` (debe listar las 12 URLs)
   - `https://zalantos.com/robots.txt`
5. Limpia caché del navegador y de Cloudflare si aplica.

### Checklist post-deploy

- [ ] `Ctrl+U` en la home muestra HTML real con el texto del Hero, no `<div id="__next">` vacío.
- [ ] `/blog/` lista los 7 artículos.
- [ ] `/consultor-ia/` carga la isla React y responde al chat.
- [ ] `/sitemap.xml` contiene las 12 URLs con `<loc>` `<lastmod>` `<changefreq>` `<priority>`.
- [ ] `/robots.txt` apunta a `Sitemap: https://zalantos.com/sitemap.xml`.
- [ ] No hay enlaces a `/*.html` rotos ni a rutas antiguas de Next.

## Reindexación en Google Search Console

Tras el deploy:

1. Entra a [Google Search Console](https://search.google.com/search-console) → propiedad `zalantos.com`.
2. **Sitemaps** → añade `https://zalantos.com/sitemap.xml` y envía.
3. **Inspección de URL** → prueba cada URL importante (`/`, `/blog/`, `/consultor-ia/`, `/privacy/`, cada `/blog/<slug>/`) y solicita "Solicitar indexación".
4. En **Ajustes → Análisis de cobertura** revisa que las URLs queden indexadas en 24-72 h.
5. Opcional: envía el sitemap también a [Bing Webmaster Tools](https://www.bing.com/webmasters/).

## Analytics

El GA4 ID ya está configurado en `src/layouts/BaseLayout.astro` como `G-X2L1QQ8X0D`.

## Notas

- El webhook del formulario de contacto ya no es necesario porque `ContactSection.astro` embebe Calendly directamente.
- El Consultor IA sigue usando el webhook configurado en `src/lib/constants.ts` (`CHAT_API_URL`, `LEAD_REGISTER_URL`).
