# SEO-REPORT — zalantos.com
**Fecha de implementación:** 2026-04-06  
**Framework:** Next.js 15 App Router · Export estático · TypeScript · Tailwind CSS

---

## 1. Archivos modificados

| Archivo | Tipo de cambio |
|---------|---------------|
| `app/layout.tsx` | Añadido `metadataBase`, nuevo title/description con palabras clave, `keywords`, `themeColor` en viewport, `manifest`, OG completo con `locale: 'es_CL'`, Twitter con `site` y `creator`, `googleBot` rules, 3 schemas JSON-LD (WebSite, LocalBusiness, Service), `preconnect` Fonts, `X-UA-Compatible` |
| `app/sitemap.ts` | Expandido de 2 a 11 URLs: homepage, blog index, 7 posts, consultor-ia, lp, privacy. Eliminado `?section=contact` (no es URL canónica). Excluido informe APV. |
| `app/robots.ts` | Añadido `Disallow: /informe-apv-ventanas-oportunidades/` |
| `app/consultor-ia/page.tsx` | Refactorizado a Server Component. Añadido `metadata` completo con canonical, OG, Twitter, keywords |
| `app/privacy/page.tsx` | Añadido `metadata` con `noindex`, canonical |
| `app/informe-apv-ventanas-oportunidades/page.tsx` | Añadido `metadata` con `noindex/nofollow`. Mejorado `title` del iframe. |
| `app/blog/page.tsx` | Mejorado title/description, añadido keywords, canonical, OG, Twitter |
| `app/blog/[slug]/page.tsx` | Añadido canonical, keywords, OG completo con imagen, Twitter image. Añadido JSON-LD Article y BreadcrumbList. Mejorado CTA "Ver todos" con `title`. |
| `src/components/layout/Footer.tsx` | Añadido `title` a todos los links. Añadido link a `/blog`. Actualizado copyright 2025 → 2026. |
| `src/components/sections/Clients.tsx` | Añadido `title` al botón CTA del sprint 0 |
| `public/informe-apv-ventanas-oportunidades/index.html` | Añadido: `X-UA-Compatible`, `robots: noindex`, `description`, `keywords`, `author`, `theme-color`, `canonical`, `preconnect` Google Fonts, `og:description`, `og:url`, Twitter Cards completas |

## 2. Archivos creados

| Archivo | Descripción |
|---------|-------------|
| `src/components/chat/ConsultorIAContent.tsx` | Componente cliente extraído de `consultor-ia/page.tsx` para permitir `metadata` export en la página |
| `public/humans.txt` | Información del equipo y tecnologías del proyecto |
| `public/.htaccess` | Reglas Apache: HTTPS redirect 301, www→no-www 301, GZIP, headers de caché y seguridad |
| `public/site.webmanifest` | Manifest PWA con nombre, colores corporativos, icono y categorías |
| `SEO-REPORT.md` | Este archivo |

---

## 3. Páginas y metadatos asignados

| Página | Title | Description | noindex |
|--------|-------|-------------|---------|
| `/` | Automatización IA para Empresas \| Zalantos | Zalantos diseña soluciones de inteligencia artificial, automatización de procesos y análisis de datos para empresas. Transformamos datos en decisiones y automatizamos flujos operativos. | No |
| `/blog/` | Insights & Casos de Automatización IA \| Zalantos | Artículos sobre automatización, inteligencia artificial y casos de éxito reales. Ingeniería aplicada a problemas reales de empresas en Chile. | No |
| `/blog/caso-colegio-rag-sistema-consultas-ia` | Cómo un colegio redujo en 70% el tiempo de respuesta a apoderados con IA \| Zalantos | (excerpt del post) | No |
| `/blog/insight-asistente-interno-ia-politicas-procesos-faqs` | Cómo diseñar un asistente interno con IA para políticas, procesos y FAQs \| Zalantos | (excerpt del post) | No |
| `/blog/insight-ia-kpis-hallazgos-lenguaje-natural` | Cómo usar IA para consultar KPIs y detectar hallazgos en lenguaje natural \| Zalantos | (excerpt del post) | No |
| `/blog/insight-sistema-tracking-operacional-acceso-rapido-ia` | Cómo construir un sistema de tracking operacional con acceso rápido vía IA \| Zalantos | (excerpt del post) | No |
| `/blog/insight-ia-forecasting-planificacion-reducir-incertidumbre-operacional` | Cómo aplicar IA a forecasting y planificación para reducir incertidumbre operacional \| Zalantos | (excerpt del post) | No |
| `/blog/insight-alertas-ejecutivas-inteligentes-desvios-criticos` | Cómo diseñar alertas ejecutivas inteligentes para anticipar desvíos críticos \| Zalantos | (excerpt del post) | No |
| `/blog/insight-automatizacion-procesos-trazabilidad-control-auditoria` | Cómo automatizar procesos críticos sin perder control, trazabilidad ni auditoría \| Zalantos | (excerpt del post) | No |
| `/consultor-ia/` | Consultor IA de Zalantos — Análisis y automatización \| Zalantos | Resuelve dudas sobre análisis de datos, IA y transformación digital con el Consultor IA de Zalantos. Respuestas claras y personalizadas para tu negocio. | No |
| `/lp/no-todos-problemas-operativos-necesitan-ia/` | Sprint 0 — Diagnóstico operativo \| Zalantos | Sprint 0 de bajo riesgo: entendemos el proceso, clarificamos los datos y proponemos la solución correcta antes de automatizar o aplicar IA. | No |
| `/privacy/` | Política de Privacidad \| Zalantos | Política de privacidad de Zalantos SPA. Conoce cómo recopilamos, tratamos y protegemos tus datos personales conforme a la Ley N° 19.628 de Chile. | Sí |
| `/informe-apv-ventanas-oportunidades/` | Informe APV Ventanas de Oportunidades \| Zalantos | (informe privado de cliente) | Sí |

---

## 4. Schemas JSON-LD implementados

### En `app/layout.tsx` (todas las páginas)
- **WebSite** — nombre, URL, descripción, SearchAction hacia `/blog`
- **LocalBusiness** — Zalantos SPA, dirección Padre Mariano 210 Of. 405, Providencia, email
- **Service** — descripción de los 3 servicios principales con OfferCatalog

### En `app/blog/[slug]/page.tsx` (artículos individuales)
- **Article** — headline, author, publisher, datePublished, dateModified, image, articleSection
- **BreadcrumbList** — 3 niveles: Inicio → Insights & Casos → Artículo

---

## 5. Lo que NO se pudo implementar y por qué

| Ítem | Razón |
|------|-------|
| ~~**Imagen OG 1200×630**~~ | ✅ **Resuelto 2026-04-06** — `/public/og-image.png` generado (1200×630 px) con identidad visual Zalantos: fondo `#0B2A3C`, wordmark en blanco, tagline verde `#2FBF71`, dominio y pill de keywords. |
| ~~**`canonical` en homepage `/`**~~ | ✅ **Resuelto** — `app/page.tsx` refactorizado a Server Component. Lógica cliente movida a `src/components/layout/HomeContent.tsx`. `metadata` con canonical exportado correctamente. |
| **`twitter:site` con handle real** | No existe cuenta de Twitter/X verificada para zalantos. Se usó `@zalantos` como placeholder. Actualizar cuando esté disponible. |
| **favicon.ico** | Solo existe `/icon.png`. Para mayor compatibilidad, generar un `favicon.ico` (16×16, 32×32, 48×48) y referenciarlo en `layout.tsx`. |
| **apple-touch-icon.png dedicado** | Se usa `/icon.png` para todos los casos. Para mejor experiencia iOS, crear un `/apple-touch-icon.png` de 180×180 px. |
| **Verificación Google Search Console** | Requiere añadir meta tag `google-site-verification` o subir archivo de verificación. Hacerlo desde la consola una vez el dominio esté activo. |
| **Hreflang** | El sitio es solo en español (es-CL). Si en el futuro se agregan versiones en inglés, añadir etiquetas `hreflang`. |
| **Breadcrumb visual en homepage** | La homepage es una SPA con secciones, sin jerarquía de URL adicional. No aplica breadcrumb. |

---

## 6. Score estimado de mejora SEO

| Categoría | Antes | Después | Mejora |
|-----------|-------|---------|--------|
| **Metaetiquetas básicas** | 4/10 | 9/10 | +5 |
| **Open Graph / Twitter Cards** | 5/10 | 9/10 | +4 |
| **Schema JSON-LD** | 0/10 | 8/10 | +8 |
| **Sitemap** | 2/10 | 9/10 | +7 |
| **robots.txt** | 6/10 | 9/10 | +3 |
| **Canonical URLs** | 0/10 | 7/10 | +7 |
| **Performance (lazy/preconnect)** | 6/10 | 8/10 | +2 |
| **Semántica HTML** | 7/10 | 9/10 | +2 |
| **Seguridad / buenas prácticas** | 5/10 | 9/10 | +4 |
| **Archivos auxiliares** | 0/10 | 9/10 | +9 |
| **PROMEDIO GLOBAL** | **3.5/10** | **8.6/10** | **+5.1** |

---

## 7. Top 5 recomendaciones adicionales

### 1. Crear imagen OG (1200×630 px) — ALTA PRIORIDAD
El `og:image` actual es `/icon.png` (512×512). Las redes sociales muestran imágenes recortadas o sin previsualización correcta. Crear un `/public/og-image.png` branded de 1200×630 px con logo, tagline y colores corporativos. Actualizar en `app/layout.tsx` y en `generateMetadata` de cada página.

### 2. Refactorizar `app/page.tsx` a Server Component
Mover la lógica de `PageContent` a `src/components/layout/HomeContent.tsx` (con `'use client'`) y eliminar la directiva del archivo raíz. Esto permitirá:
- Exportar `metadata` con `alternates.canonical` para la homepage
- Mejorar el SEO de la página más importante del sitio
- Posibilitar `generateMetadata` con datos dinámicos futuros

### 3. Implementar Google Search Console
- Verificar la propiedad `https://zalantos.com` en [Search Console](https://search.google.com/search-console)
- Enviar `sitemap.xml` manualmente
- Monitorear impresiones, clics y posición media para las palabras clave objetivo

### 4. Agregar más artículos al blog con keyword targeting
El blog tiene 7 artículos, todos de Marzo 2026. Para mejorar posicionamiento orgánico:
- Publicar al menos 2 artículos por mes
- Cada artículo debe apuntar a una keyword de cola larga específica (ej: "sistema RAG para empresas Chile", "automatización n8n Chile")
- Interlincar artículos relacionados con `<Link>` y texto ancla descriptivo

### 5. Optimizar Core Web Vitals con imágenes WebP
Las imágenes en `/public/images/` son PNG/JPEG. Para reducir peso:
- Convertir a WebP (herramientas: `cwebp`, Squoosh, ImageOptim)
- Agregar `blurDataURL` a `next/image` para placeholder mientras carga
- Considerar habilitar la optimización de imágenes de Next.js si se migra a un hosting con soporte Node.js (actualmente desactivada con `unoptimized: true`)

---

*Reporte generado por implementación SEO sistemática — Zalantos 2026*
