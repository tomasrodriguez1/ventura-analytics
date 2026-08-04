# Zalantos - Sitio corporativo (Astro 4)

Sitio estático de [zalantos.com](https://zalantos.com) construido con **Astro 4 + React + Tailwind CSS**, optimizado para SEO (HTML puro indexable por Google y bots de IA) y desplegado en **Cloudflare Pages**.

## Sobre el proyecto

- **Problema de negocio:** dar a Zalantos SPA (consultoría en IA, automatización de procesos y análisis de datos para empresas) un sitio de marketing rápido, indexable y con captación de leads, sin depender de un backend propio.
- **Usuarios principales:**
  - Visitantes / prospects B2B que llegan por SEO, LinkedIn o campañas y evalúan a Zalantos.
  - Equipo de Zalantos, que gestiona contenido (blog, landings) y sigue leads del Consultor IA.
  - Leads que interactúan con el chat "Consultor IA" (`/consultor-ia/`).
- **Qué NO es este proyecto:** no es una app autenticada, no tiene base de datos ni backend propio (la lógica de leads/chat vive en un Cloudflare Worker externo, fuera de este repo), no usa SSR en producción.

## Stack

- **Framework**: [Astro 4](https://astro.build) (output estático)
- **React**: únicamente para la isla interactiva del Consultor IA (`client:load`)
- **Estilos**: Tailwind CSS 3
- **Blog**: [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) (Markdown + HTML embebido)
- **Hosting**: Cloudflare Pages (integración Git)
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
│   ├── products/        Landings de productos (.astro)
│   └── ui/              Componentes reutilizables
├── lib/                 schemas JSON-LD, constants, api
├── services/            chatService (legacy, sin uso)
├── types/               Tipos compartidos
├── styles/global.css    Variables --z-* y utilidades globales
└── pages/
    ├── index.astro                                           → /
    ├── blog/index.astro                                      → /blog/
    ├── blog/[slug].astro                                     → /blog/<slug>/
    ├── consultor-ia.astro                                    → /consultor-ia/
    ├── productos/                                            → /productos/...
    ├── lp/...                                                → /lp/.../
    ├── privacy.astro                                         → /privacy/
    └── sitemap.xml.ts                                        → /sitemap.xml (dinámico)

public/
├── _headers             Cache-Control para Cloudflare Pages
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

Genera la carpeta `dist/` con HTML puro, assets hashed en `dist/_astro/`, `sitemap.xml` y `_headers`.

Verifica con:

```bash
npm run preview
```

## Deploy (Cloudflare Pages)

El deploy de producción lo hace **Cloudflare Pages** al hacer push (o merge) a `main`. GitHub Actions (`.github/workflows/ci.yml`) solo verifica el build.

### Configurar el proyecto Pages (una vez)

1. Cloudflare Dashboard → Workers & Pages → Create → Connect to Git → este repositorio.
2. Settings:
   - Production branch: `main`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variable: `NODE_VERSION=20`
3. Esperar el primer deployment y abrir la URL `*.pages.dev`.
4. Custom domains: `zalantos.com` + `www.zalantos.com`, con redirect **www → apex**.
5. Ajustar DNS según indique Cloudflare.
6. Tras el cutover: eliminar secrets legacy `CPANEL_*` de GitHub Actions (ya no se usan).

Detalle: [`docs/operations/deployment.md`](./docs/operations/deployment.md) y [`docs/operations/runbook.md`](./docs/operations/runbook.md).

### Smoke test post-deploy

Validar en preview (`*.pages.dev`) y luego en `https://zalantos.com`:

- [ ] `/` — HTML real con el Hero (`Ctrl+U`).
- [ ] `/blog/` y al menos un `/blog/<slug>/`.
- [ ] `/productos/`, `/productos/crm/`, `/productos/gestion-de-proyectos/`.
- [ ] `/lp/no-todos-problemas-operativos-necesitan-ia/`, `/lp/datos-en-orden-automatizacion-ia/`.
- [ ] `/consultor-ia/` — registro + un mensaje de chat (obligatorio en producción; en preview puede fallar por CORS).
- [ ] Contacto / Calendly.
- [ ] `/privacy/`, `/sitemap.xml`, `/robots.txt`.
- [ ] `www` → apex (tras cutover DNS).

## Reindexación en Google Search Console

Tras el deploy / cutover de dominio:

1. Entra a [Google Search Console](https://search.google.com/search-console) → propiedad `zalantos.com`.
2. **Sitemaps** → añade `https://zalantos.com/sitemap.xml` y envía.
3. **Inspección de URL** → prueba cada URL importante y solicita "Solicitar indexación".
4. En **Ajustes → Análisis de cobertura** revisa que las URLs queden indexadas en 24-72 h.
5. Opcional: envía el sitemap también a [Bing Webmaster Tools](https://www.bing.com/webmasters/).

## Analytics

El GA4 ID ya está configurado en `src/layouts/BaseLayout.astro` como `G-X2L1QQ8X0D`.

## Notas

- El webhook del formulario de contacto ya no es necesario porque `ContactSection.astro` embebe Calendly directamente.
- El Consultor IA sigue usando el Worker configurado en `src/lib/constants.ts` (`CHAT_API_URL`, `LEAD_REGISTER_URL`).

## Documentación

Este repo sigue el estándar de documentación Zalantos. No cargues todo por defecto: lee primero `docs/context/context.md`, `docs/context/data_model_context.md`, `docs/architecture/architecture.md` y `AGENTS.md`; el resto según la tarea (ver `AGENTS.md`).

| Documento | Contenido |
|---|---|
| [`AGENTS.md`](./AGENTS.md) | Reglas generales para agentes de IA |
| [`CLAUDE.md`](./CLAUDE.md) | Instrucciones específicas para Claude Code |
| [`context.md`](./context.md) | Contexto histórico detallado (mayo 2026), preservado como referencia; su contenido vigente fue reorganizado en `docs/context/` |
| [`docs/context/context.md`](./docs/context/context.md) | Contexto breve del proyecto |
| [`docs/context/context-extended.md`](./docs/context/context-extended.md) | Contexto técnico extendido |
| [`docs/context/data_model_context.md`](./docs/context/data_model_context.md) | Modelo de datos / contenido |
| [`docs/architecture/architecture.md`](./docs/architecture/architecture.md) | Arquitectura actual (Astro) |
| [`docs/architecture/decisions.md`](./docs/architecture/decisions.md) | Decisiones de arquitectura (ADRs) |
| [`docs/architecture/integrations.md`](./docs/architecture/integrations.md) | Integraciones externas |
| [`docs/engineering/`](./docs/engineering/) | Reglas para agentes IA, estándares de código, seguridad, testing |
| [`docs/operations/`](./docs/operations/) | Deploy, variables de entorno, runbook |
| [`docs/architecture.md`](./docs/architecture.md) | **Obsoleto** — describe la arquitectura Next.js anterior a la migración a Astro. Se conserva como referencia histórica |
| [`docs/GUIA_ESTILOS_ZALANTOS.md`](./docs/GUIA_ESTILOS_ZALANTOS.md) | Guía de estilos visuales de marca |
| [`docs/GUIA_ESTILOS_INFORME_APV.md`](./docs/GUIA_ESTILOS_INFORME_APV.md) | Guía de estilos para informes APV (marca, no el sitio web) |

## Estado del proyecto

En producción en [zalantos.com](https://zalantos.com), desplegado desde `main` vía Cloudflare Pages. Mantenimiento activo: contenido de blog, landings de campaña/productos y el Consultor IA (beta) se siguen iterando.

## Gaps conocidos

- No hay tests automatizados (unit, integration ni e2e).
- El código del Cloudflare Worker (backend de leads/chat) no vive en este repositorio — `GAP: ubicación y repo del Worker`.
- `src/services/chatService.ts` es lógica legacy sin usar; pendiente de limpieza o eliminación.
- `axios` está en `package.json` pero no se usa en `src/` — dependencia sin uso confirmado.
- No hay changelog histórico previo a esta estandarización — ver `CHANGELOG.md`.
