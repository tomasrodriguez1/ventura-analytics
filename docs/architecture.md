# Arquitectura del Proyecto zalantos

**Versión:** 2.0  
**Fecha:** Diciembre 2025  
**Framework:** Next.js 15.1.6 (App Router)

---

## Visión General

Este proyecto sigue una arquitectura modular y escalable basada en componentes reutilizables, maximizando el uso de Server Components de Next.js para optimizar performance y SEO.

---

## Estructura de Directorios

```
/app                          # App Router de Next.js
  layout.tsx                  # Layout raíz con metadata y fuentes
  page.tsx                    # Página principal (Server Component)
  globals.css                 # Estilos globales y sistema de diseño
  robots.ts                   # robots.txt dinámico
  sitemap.ts                  # sitemap.xml dinámico
  /api                        # API Routes
    /contact/route.ts         # Endpoint de contacto

/src
  /components
    /ui                       # Componentes UI base reutilizables
      Button.tsx
      LinkButton.tsx
      Card.tsx
      Section.tsx
      Input.tsx
      Textarea.tsx
      Badge.tsx
      Typography.tsx
      Container.tsx
    /layout                   # Componentes de layout
      Navbar.tsx              # Navegación principal (Client Component)
      Footer.tsx              # Pie de página (Server Component)
    /sections                 # Secciones de la página principal
      Hero.tsx
      Pillars.tsx
      Process.tsx
      Clients.tsx
      UseCases.tsx
      CTAFinal.tsx
      AboutSection.tsx
      ContactSection.tsx      # Client Component (formulario)
  /lib
    constants.ts              # Constantes centralizadas (marca, colores, URLs)
    seo.ts                    # Helpers para metadata y SEO
  /services
    contactService.ts         # Servicio de contacto
  /utils
    emailTemplate.ts          # Plantilla de email HTML

/public
  /images                     # Imágenes estáticas
  /logos                      # Logos de clientes (preparado para futuro)

/docs                         # Documentación del proyecto
  website-spec.md
  estructura-actual.md
  architecture.md             # Este archivo

/_quarantine                  # Archivos legacy o dudosos
```

---

## Principios de Arquitectura

### 1. Componentización Máxima

**Todo lo visual vive en componentes:**
- **UI Base** (`/ui`): Componentes atómicos reutilizables (Button, Card, Input, etc.)
- **Layout** (`/layout`): Componentes estructurales (Navbar, Footer)
- **Secciones** (`/sections`): Componentes de contenido específico (Hero, Pillars, etc.)

**Regla:** Si algo se repite 2+ veces, debe ser un componente.

### 2. Server Components por Defecto

**Filosofía:** Minimizar JavaScript en el cliente.

- **Server Components** (por defecto): Hero, Pillars, Process, Clients, UseCases, CTAFinal, AboutSection, Footer
- **Client Components** (solo cuando necesario): Navbar (interactividad), ContactSection (formulario)

**Regla:** Solo usar `'use client'` cuando se necesita:
- Estado React (`useState`, `useEffect`)
- Eventos del navegador (`onClick`, `onChange`)
- Hooks del navegador (`useRouter`, `usePathname`)

### 3. Separación de Responsabilidades

- **Componentes**: Solo presentación y composición
- **Services** (`/services`): Lógica de negocio y comunicación con APIs
- **Lib** (`/lib`): Helpers y utilidades reutilizables
- **Utils** (`/utils`): Utilidades específicas (plantillas, formatters)

### 4. Sistema de Diseño Centralizado

- **Tokens CSS**: Variables en `app/globals.css` (`:root`)
- **Constantes TypeScript**: `src/lib/constants.ts` (colores, marca, URLs)
- **Clases utilitarias**: Tailwind CSS con clases personalizadas en `globals.css`

**Regla:** No hardcodear colores, usar tokens del sistema.

---

## Flujo de Datos

### Página Principal (`/`)

```
app/page.tsx (Server Component)
  ↓
  Importa secciones desde /sections
  ↓
  Hero, Pillars, Process, Clients, UseCases, CTAFinal
  ↓
  Cada sección usa componentes UI base
```

### Formulario de Contacto

```
ContactSection (Client Component)
  ↓
  contactService.ts
  ↓
  /api/contact/route.ts
  ↓
  Webhook externo (N8N)
```

---

## Reglas de Componentes

### Naming Conventions

- **Componentes UI**: PascalCase simple (`Button.tsx`, `Card.tsx`)
- **Secciones**: PascalCase descriptivo (`Hero.tsx`, `AboutSection.tsx`)
- **Archivos**: PascalCase para componentes, camelCase para utilidades

### Props

- **Tipadas siempre**: Usar interfaces TypeScript
- **Opcionales con default**: `variant?: 'primary' | 'secondary' = 'primary'`
- **Children cuando aplica**: Para componentes contenedores

### Estilos

- **Clases del sistema**: Usar clases de `globals.css` (`.btn-primary`, `.card-flat`)
- **Tailwind utilitario**: Para espaciado, layout, responsive
- **Sin estilos inline**: Excepto para valores dinámicos

---

## Performance

### Optimizaciones Implementadas

1. **Server Components**: Máximo contenido renderizado en servidor
2. **Code Splitting**: Automático por ruta con Next.js
3. **Font Optimization**: `next/font` para fuentes optimizadas
4. **Image Optimization**: `next/image` cuando se agreguen imágenes

### Métricas Objetivo

- **LCP**: < 2.5s
- **INP**: < 200ms
- **CLS**: < 0.1

---

## SEO

### Metadata

- **Centralizado**: `src/lib/seo.ts` con helper `generateMetadata()`
- **Por página**: Exportar `metadata` en cada página/ruta
- **Open Graph**: Configurado para redes sociales
- **Twitter Cards**: Configurado

### Estructura Semántica

- **H1 único**: Solo en Hero
- **H2 por sección**: Una por sección principal
- **H3 para subsecciones**: Dentro de cards o listas

---

## Mantenibilidad

### Agregar Nueva Sección

1. Crear componente en `/src/components/sections/`
2. Importar en `app/page.tsx`
3. Usar componentes UI base cuando aplique
4. Mantener consistencia con sistema de diseño

### Agregar Nuevo Componente UI

1. Crear en `/src/components/ui/`
2. Tipar con interface TypeScript
3. Usar clases del sistema de diseño
4. Documentar props y variantes

### Agregar Nueva Ruta

1. Crear `app/[ruta]/page.tsx`
2. Exportar `metadata` usando `generateMetadata()` de `seo.ts`
3. Agregar a `sitemap.ts` si es pública
4. Actualizar Navbar si aplica

---

## Convenciones de Código

### TypeScript

- **Strict mode**: Habilitado
- **Interfaces sobre types**: Para props de componentes
- **Export named**: Para utilidades y helpers
- **Export default**: Para componentes React

### Imports

- **Orden**: React → Next.js → Componentes locales → Utilidades
- **Alias**: Usar `@/` cuando esté configurado
- **Absolutos**: Preferir rutas absolutas desde `src/`

### Comentarios

- **TODO**: Marcar con `// TODO:` y descripción
- **Documentación**: JSDoc para funciones públicas
- **Complejidad**: Comentar lógica compleja, no código obvio

---

## Testing (Futuro)

### Estructura Propuesta

```
/src
  /components
    /ui
      Button.test.tsx
      Card.test.tsx
  /sections
    Hero.test.tsx
```

### Estrategia

- **Unit tests**: Componentes UI base
- **Integration tests**: Flujos completos (formulario de contacto)
- **E2E tests**: Rutas principales

---

## Changelog

### v2.0 (Diciembre 2025)
- Reestructuración completa del repositorio
- Eliminación de demos y dashboard
- Componentización máxima
- Optimización con Server Components
- Sistema de diseño centralizado

---

**Fin del Documento**
