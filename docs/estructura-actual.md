# Estructura Actual del Proyecto - zalantos

**Fecha:** Diciembre 2025  
**Framework:** Next.js 15.1.6  
**Lenguaje:** TypeScript + React 19  
**Versión:** 2.0 (Reestructurado)

---

## 📁 Estructura de Directorios

```
ventura-analytics/
├── app/                          # App Router de Next.js
│   ├── api/                      # API Routes
│   │   ├── contact/
│   │   │   └── route.ts          # Endpoint de contacto
│   │   └── register/
│   │       └── route.ts          # Endpoint de registro (legacy)
│   ├── globals.css               # Estilos globales y sistema de clases
│   ├── layout.tsx                # Layout raíz (fuentes Inter)
│   ├── page.tsx                  # Página principal (composición de secciones)
│   ├── robots.ts                 # robots.txt dinámico
│   └── sitemap.ts                # sitemap.xml dinámico
├── docs/
│   ├── estructura-actual.md      # Este documento
│   ├── website-spec.md           # Especificación de diseño
│   └── architecture.md           # Arquitectura del proyecto [NUEVO]
├── public/
│   ├── images/                   # Imágenes estáticas
│   │   └── favicon.ico           # Favicon
│   └── logos/                    # Logos de clientes (vacío por ahora)
├── src/
│   ├── components/               # Componentes React
│   │   ├── ui/                   # Componentes UI base [NUEVO]
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Section.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Typography.tsx
│   │   │   ├── LinkButton.tsx
│   │   │   └── Container.tsx
│   │   ├── layout/               # Componentes de layout [NUEVO]
│   │   │   ├── Navbar.tsx        # Movido desde Common/
│   │   │   └── Footer.tsx        # Movido desde Common/
│   │   └── sections/             # Secciones de página [NUEVO]
│   │       ├── Hero.tsx          # Extraído de Home.tsx
│   │       ├── Pillars.tsx       # Extraído de Home.tsx
│   │       ├── Process.tsx       # Extraído de Home.tsx
│   │       ├── Clients.tsx      # Extraído de Home.tsx
│   │       ├── UseCases.tsx      # Extraído de Home.tsx
│   │       ├── CTAFinal.tsx      # Extraído de Home.tsx
│   │       ├── AboutSection.tsx  # Renombrado desde About.tsx
│   │       └── ContactSection.tsx # Renombrado desde Contact.tsx
│   ├── lib/                      # Helpers y utilidades
│   │   ├── constants.ts          # Constantes de marca [NUEVO]
│   │   └── seo.ts                # Helpers SEO [NUEVO]
│   ├── services/                 # Servicios de negocio
│   │   └── contactService.ts     # Servicio de contacto
│   └── utils/
│       └── emailTemplate.ts      # Plantilla de email
├── _quarantine/                  # Archivos en cuarentena [NUEVO]
│   ├── Register.tsx              # Componente legacy
│   └── README.md                 # Documentación de cuarentena
├── tailwind.config.ts            # Configuración de Tailwind CSS
├── tsconfig.json                 # Configuración de TypeScript
├── next.config.ts                # Configuración de Next.js
├── package.json                  # Dependencias del proyecto
└── README.md                     # Documentación del proyecto
```

---

## 🗺️ Rutas y Páginas

### Página Principal (`/`)
**Archivo:** `app/page.tsx`

**Sistema de Secciones:**
La página principal utiliza un sistema de secciones que se muestran mediante estado React, sin recargar la página.

**Secciones disponibles:**
- `home` (default) - Muestra componente `Home`
- `about` - Muestra componente `About` (accesible via `/?section=about`)
- `contact` - Muestra componente `Contact` (accesible via `/?section=contact`)

**Características:**
- Estado local `currentSection` controla qué sección mostrar
- Lee parámetro `section` de la URL al cargar
- Scroll automático al cambiar de sección
- Fondo oscuro con overlay gradient fijo
- Fuentes: Playfair Display (headlines) y Lato (body)

**Estructura:**
```tsx
<div className="min-h-screen flex flex-col text-white">
  <Overlay gradient />
  <Navbar />
  <main>
    {currentSection === 'home' && <Home />}
    {currentSection === 'about' && <About />}
    {currentSection === 'contact' && <Contact />}
  </main>
  <Footer />
</div>
```

**Nota:** Las demos (RetailDemo, CallCenterDemo, DashboardMinero) fueron eliminadas en la reestructuración v2.0.

---

## 🧩 Componentes

### Componentes UI Base (`src/components/ui/`)

**Propósito:** Componentes reutilizables sin lógica de negocio.

**Componentes disponibles:**
- `Button.tsx` - Botones (variantes: primary, secondary, outline)
- `Card.tsx` - Cards planas con estilo `card-flat`
- `Section.tsx` - Wrappers de secciones full-bleed
- `Input.tsx` - Inputs de formulario
- `Textarea.tsx` - Textareas
- `Badge.tsx` - Badges/tags (variantes: success, info, warning)
- `Typography.tsx` - Componentes tipográficos (H1, H2, H3, Text)
- `LinkButton.tsx` - Botones con Link de Next.js
- `Container.tsx` - Contenedores con espaciado consistente

**Características:**
- Props tipadas con TypeScript
- Sin dependencias de estado (salvo excepciones)
- Estilos usando clases del sistema (`globals.css`)
- Máxima reutilización

---

### Componentes Layout (`src/components/layout/`)

#### `Navbar.tsx`
**Propósito:** Navegación principal del sitio

**Tipo:** Client Component (`'use client'`)

**Props:**
- `currentSection: string` - Sección actual activa
- `setCurrentSection: (section: string) => void` - Función para cambiar sección

**Características:**
- Sticky navigation (fixed top)
- Links: Inicio, Nosotros, Contacto
- Responsive
- Estado activo visual en link actual

#### `Footer.tsx`
**Propósito:** Pie de página

**Tipo:** Server Component

**Contenido:**
- Logo y tagline "zalantos"
- Navegación (Inicio, Nosotros, Contacto)
- Email de contacto: remates.dev@gmail.com
- Copyright "© 2025 zalantos"
- Links legales (Privacidad, Términos)
- Fondo dark (`bg-[#0B2A3C]`)

---

### Componentes Sections (`src/components/sections/`)

**Propósito:** Secciones completas de la página, extraídas de `Home.tsx` para mejor organización.

#### `Hero.tsx`
**Tipo:** Client Component (botón con onClick)

**Contenido:**
- Título grande: "Convertimos los datos en decisiones"
- Propuesta de valor
- Botón "Habla con un experto"
- Fondo: `bg-white` con `pattern-grid`

#### `Pillars.tsx`
**Tipo:** Server Component

**Contenido:**
- Título: "Más allá del hype: Impacto Real"
- 3 cards: Estrategia ROI-First, Gobernanza Ética, Integración Legacy
- Fondo: `bg-gray-50`

#### `Process.tsx`
**Tipo:** Server Component

**Contenido:**
- Título: "De datos dispersos a decisiones accionables"
- 3 pasos: Datos → Orden → Decisión
- Numeración con círculos verdes (#2FBF71)
- Fondo: `bg-white`

#### `Clients.tsx`
**Tipo:** Server Component

**Contenido:**
- Título: "Clientes con los que hemos trabajado"
- 2 clientes: cruz verde, Colegio San Francisco de Machalí
- Placeholders para logos en `/public/logos/`
- Fondo: `bg-gray-50`

#### `UseCases.tsx`
**Tipo:** Server Component

**Contenido:**
- Título: "Casos de uso que implementamos"
- 6 tarjetas con casos de uso
- Badges "Alto ROI" y "Valor ejecutivo"
- Fondo: `bg-white`

#### `CTAFinal.tsx`
**Tipo:** Client Component (botón con onClick)

**Contenido:**
- Título: "¿Listo para transformar sus datos en decisiones?"
- Botón "Solicitar consultoría gratuita"
- Fondo: `bg-[#0B2A3C]` (dark)

#### `AboutSection.tsx`
**Tipo:** Server Component

**Contenido:**
- Header "Fundador"
- Card con información de Tomás Rodríguez
- Sección "Mi Misión"

#### `ContactSection.tsx`
**Tipo:** Client Component (formulario con estado)

**Contenido:**
- Header "Agenda una Reunión"
- Grid de 3 beneficios
- Formulario de contacto (Nombre, Empresa, Email, Mensaje)
- Integración con `ContactService`
- Email directo: remates.dev@gmail.com

---

## 🔌 API Routes

### `/api/contact`
**Archivo:** `app/api/contact/route.ts`

**Método:** POST

**Body:**
```typescript
{
  nombre: string;
  empresa: string;
  email: string;
  mensaje: string;
}
```

**Funcionalidad:**
- Recibe datos del formulario de contacto
- Valida y procesa la información
- Envía email (probablemente usando `emailTemplate.ts`)
- Retorna respuesta de éxito/error

### `/api/register`
**Archivo:** `app/api/register/route.ts`

**Funcionalidad:** Endpoint legacy, mantenido por compatibilidad.

---

## 🎨 Estilos y Diseño

### Sistema de Estilos zalantos
**Archivo:** `app/globals.css`

**Paleta de Colores (FUENTE ÚNICA DE VERDAD):**
- `--z-primary: #0B2A3C` - Azul primario (títulos, navbar)
- `--z-value: #2FBF71` - Verde valor/ROI (CTAs, métricas)
- `--z-neutral: #6F7A83` - Gris neutro (texto descriptivo)
- `--z-white: #FFFFFF` - Blanco (fondos)
- `--z-accent: #3FA9F5` - Acento innovación (uso limitado)

**Sistema de Clases Full-Bleed:**
- **Secciones**: `.section-full`, `.section-full-hero`, `.section-inner`, `.section-inner-narrow`
- **Botones**: `.btn-primary`, `.btn-secondary`, `.btn-outline`
- **Cards**: `.card-flat` (borde sutil, sin sombras pesadas)
- **Formularios**: `.form-input`, `.form-label`
- **Patrones**: `.pattern-grid`, `.pattern-dots`

**Características:**
- **Filosofía**: Minimalista, geométrico, corporativo, mucho blanco
- **Espaciado**: Sistema 8pt grid (`--space-1` a `--space-12`)
- **Radios**: Moderados (`--radius-sm` a `--radius-pill`)
- **Sombras**: Muy sutiles o none (`--shadow-subtle`, `--shadow-sm`)
- **Sin gradientes pesados**: Diseño flat

### Tailwind CSS
**Configuración:** `tailwind.config.ts`

**Colores personalizados zalantos:**
```typescript
z: {
  primary: '#0B2A3C',   // Azul primario
  value: '#2FBF71',     // Verde valor/ROI
  neutral: '#6F7A83',   // Gris neutro
  white: '#FFFFFF',     // Blanco
  accent: '#3FA9F5',    // Acento innovación
}
```

### Fuentes
**Implementación:**
- **Layout raíz:** Inter (via `next/font/google` en `app/layout.tsx`)
- **Variable CSS:** `var(--font-inter)`
- **Uso**: `font-[family-name:var(--font-inter)]`
- **Jerarquía**: H1 único (hero) → H2 (secciones) → H3 (items)

---

## 📚 Helpers y Utilidades

### `constants.ts`
**Archivo:** `src/lib/constants.ts`

**Contenido:**
- `BRAND` - Marca "zalantos"
- `COLORS` - Paleta de colores zalantos
- `CONTACT_EMAIL` - Email de contacto
- `LINKS` - Links internos del sitio

### `seo.ts`
**Archivo:** `src/lib/seo.ts`

**Funcionalidad:**
- Helper `generateMetadata()` para generar metadata SEO por página
- Soporte para Open Graph y Twitter Cards

---

## 🔧 Servicios

### `ContactService`
**Archivo:** `src/services/contactService.ts`

**Clase:** `ContactService`

**Métodos:**
- `validateFormData(data: ContactFormData): ValidationResult`
- `submitContactForm(data: ContactFormData): Promise<ContactServiceResponse>`

**Funcionalidad:**
- Validación de datos del formulario
- Envío de datos a `/api/contact`
- Manejo de errores y timeouts


---

## 📦 Dependencias Principales

### Producción
- **next**: ^15.1.6 - Framework React
- **react**: ^19.0.0 - Biblioteca React
- **react-dom**: ^19.0.0 - React DOM
- **tailwindcss**: ^4.0.0 - Framework CSS
- **axios**: ^1.9.0 - Cliente HTTP
- **framer-motion**: ^12.0.5 - Animaciones

### Desarrollo
- **typescript**: ^5 - TypeScript
- **eslint**: ^9.19.0 - Linter
- **@types/react**: ^19 - Tipos para React

---

## 🔄 Flujo de Navegación

### Flujo Principal
```
/ (Página Principal)
├── Sección Home (default)
│   ├── Hero → Botón "Probar gratis" → Menú desplegable
│   │   ├── Demo Retail → /RetailDemo
│   │   └── Demo Call Center → /CallCenterDemo
│   ├── Casos de Uso → Click en card
│   │   ├── Retail → /RetailDemo
│   │   └── Call Center → /CallCenterDemo
│   └── CTA Final → setCurrentSection('contact')
├── Sección About (/?section=about)
│   └── Navbar → Click "Nosotros"
└── Sección Contact (/?section=contact)
    ├── Navbar → Click "Contacto"
    ├── Formulario → Submit → /api/contact
    └── Email directo → remates.dev@gmail.com
```

### Navegación desde Navbar
- **Inicio**: Cambia sección a 'home' (si está en /) o navega a /
- **Nosotros**: Cambia sección a 'about' o navega a /?section=about
- **Contacto**: Cambia sección a 'contact' o navega a /?section=contact

---

## 🎯 Características Técnicas

### Arquitectura
- **App Router** de Next.js 15
- **Server Components** y **Client Components** (`'use client'`)
- **API Routes** para backend
- **TypeScript** para type safety

### Estado
- **Estado local** con `useState` en componentes
- **Estado de sección** en página principal
- **URL parameters** para navegación entre secciones

### Estilos
- **Tailwind CSS** para estilos utilitarios
- **Clases CSS personalizadas** en `globals.css`
- **Fondo oscuro** con overlay gradient
- **Backdrop blur** para efectos de profundidad

### Performance
- **Font optimization** con `next/font/google`
- **Lazy loading** implícito con Next.js
- **Client-side routing** para navegación fluida

---

## 📝 Notas de Implementación

### Estructura de Componentes
- Componentes organizados por tipo: UI base, Layout, Sections
- Props tipadas con TypeScript
- Máximo uso de Server Components para performance

### Patrones de Diseño
- **Sistema de secciones** en lugar de páginas separadas para Home/About/Contact
- **Componentes UI reutilizables** (Button, Card, Section, etc.)
- **Servicios** para lógica de negocio separada de componentes
- **Separación Server/Client Components** para optimizar performance

---

## 🚀 Próximos Pasos Sugeridos

1. **Agregar logos de clientes**:
   - `/public/logos/cruz-verde.svg`
   - `/public/logos/colegio-san-francisco-machali.svg`
   - Actualizar `Clients.tsx` para usar `next/image` cuando estén disponibles

2. **Revisar componente en cuarentena**:
   - `/_quarantine/Register.tsx` - Determinar si se necesita o eliminar

3. **Mejorar accesibilidad** (ARIA labels, keyboard navigation)
4. **Optimizar SEO** con metadata específica por sección usando `src/lib/seo.ts`

---

## 📋 Changelog Reciente

### Diciembre 2025 - Reestructuración v2.0

#### ✅ Componentización Completa
- **Componentes UI base creados**: Button, Card, Section, Input, Textarea, Badge, Typography, LinkButton, Container
- **Secciones extraídas**: Hero, Pillars, Process, Clients, UseCases, CTAFinal
- **Reorganización**: Navbar y Footer movidos a `/layout`, About y Contact a `/sections`

#### ✅ Limpieza y Optimización
- **Demos eliminadas**: Todos los componentes Dashboard y API routes relacionados eliminados
- **Assets limpiados**: SVGs e imágenes no usadas eliminadas
- **Archivos legacy**: Register.tsx movido a `/_quarantine`

#### ✅ Helpers Centralizados
- **constants.ts**: Constantes de marca, colores, links
- **seo.ts**: Helpers para metadata SEO

#### ✅ Branding Corregido
- "Ventura Analytics" → "zalantos" en emailTemplate.ts

#### ✅ Documentación
- **architecture.md**: Nueva documentación de arquitectura
- **estructura-actual.md**: Actualizado con nueva estructura

---

**Fin del Documento**

