# Especificación de Diseño Web - Zalantos

**Versión:** 1.1  
**Fecha:** Diciembre 2025  
**Objetivo:** Rediseño completo del sitio web con enfoque enterprise + startup

## 📋 Changelog v1.1

**Cambios principales:**
- **Marca actualizada**: "Ventura Analytics" → "Zalantos" en todo el documento
- **Tema unificado**: Cambio de fondo oscuro a **LIGHT predominante** (secciones y cards claras, dark solo en Hero/CTA final/Footer si aporta contraste premium)
- **Sistema de tokens**: Redefinición completa con CSS variables + mapeo a Tailwind
- **Guía práctica**: Sección 10 reescrita con fases de implementación y tabla de mapeo de clases
- **Performance**: Nueva sección 11 con estándares de performance y profesionalismo
- **Eliminación de contradicciones**: Una sola verdad sobre colores, fondos y componentes

---

## 📋 Sobre Este Documento

Este documento es una **guía de estilo de diseño** que define cómo debe verse y sentirse el sitio web de **Zalantos**. Es un **contrato de diseño** ejecutable que especifica:

- **Cómo aplicar** los principios de diseño en cada componente
- **Qué estilos usar** para cada tipo de elemento usando las clases existentes en `app/globals.css`
- **Cuándo usar** cada variante de color, tipografía y espaciado
- **Por qué** cada decisión de diseño (para mantener consistencia)

**Estructura del Proyecto Actual:**
- Página principal (`/`) con sistema de secciones (home, about, contact)
- Sistema de clases CSS en `app/globals.css` (`.section-full`, `.card-flat`, `.btn-primary`, etc.)
- Fuentes: Inter (via `next/font`)
- **Tema LIGHT predominante** con dark solo en elementos estratégicos (CTA final, Footer)

**Cómo Usar Esta Guía:**
1. Consulta la sección relevante antes de diseñar/implementar un componente
2. Sigue la guía de aplicación (sección 10) para reestilizar usando clases existentes
3. Usa el checklist de calidad para validar implementaciones
4. Mantén consistencia con el sistema de clases CSS existente

---

## 📐 ESTILOS ACTUALES IMPLEMENTADOS (v2.0)

**Esta sección documenta TODOS los estilos que están actualmente implementados en el proyecto, listos para que una IA los entienda y replique.**

### Paleta de Colores (CSS Variables + Tailwind)

**Colores Principales (definidos en `app/globals.css` y `src/lib/constants.ts`):**

```css
--z-primary: #0B2A3C        /* Azul oscuro - Títulos, navbar, texto principal */
--z-value: #2FBF71          /* Verde - CTAs, métricas, acentos de éxito */
--z-neutral: #6F7A83        /* Gris neutro - Texto secundario, descripciones */
--z-white: #FFFFFF          /* Blanco - Fondos principales */
--z-accent: #3FA9F5         /* Azul claro - Acentos limitados, hover states */
```

**Uso en Tailwind:**
- `text-[#0B2A3C]` - Texto principal
- `text-[#6F7A83]` - Texto secundario
- `bg-[#0B2A3C]` - Fondos oscuros (Footer, CTA final)
- `bg-[#2FBF71]` - Botones secundarios, acentos
- `bg-gray-50` - Fondos alternos de secciones
- `bg-white` - Fondos principales

**Colores de Estado:**
- Verde éxito: `#2FBF71` (usado en bullets, badges, hover states)
- Azul info: `#3FA9F5` (usado en acentos, hover states)
- Gris neutro: `#6F7A83` (texto descriptivo)

### Tipografía

**Fuente Principal:**
- **Inter** (via `next/font/google`)
- Variable CSS: `--font-inter`
- Uso: `font-[family-name:var(--font-inter)]`
- Pesos disponibles: 400 (regular), 700 (bold)

**Escala Tipográfica Implementada:**

```css
/* H1 - Hero (Display) */
text-5xl md:text-7xl lg:text-8xl
font-bold
text-[#0B2A3C]
leading-[1.1]

/* H2 - Títulos de sección */
text-4xl md:text-5xl
font-bold
text-[#0B2A3C]
mb-4

/* H3 - Subtítulos, títulos de cards */
text-2xl
font-semibold
text-[#0B2A3C]
mb-3

/* Body Large - Subtítulos descriptivos */
text-xl md:text-2xl
text-[#6F7A83]
leading-relaxed

/* Body - Texto principal */
text-[#6F7A83]
leading-relaxed

/* Small - Texto secundario */
text-sm
text-[#6F7A83] o text-gray-400
```

### Sistema de Espaciado (8pt Grid)

**Espaciado Vertical entre Secciones:**
- `py-16 md:py-24` - Secciones estándar (`.section-full`)
- `py-20 md:py-32` - Hero section (`.section-full-hero`)

**Espaciado Horizontal:**
- `px-6 md:px-12 lg:px-16` - Contenedor estándar (`.section-inner`)
- `px-6 md:px-12` - Contenedor estrecho (`.section-inner-narrow`)
- `max-w-[1400px]` - Ancho máximo contenido estándar
- `max-w-[1200px]` - Ancho máximo para grids de contenido
- `max-w-[900px]` - Ancho máximo contenido estrecho

**Gaps en Grids:**
- `gap-8` - Grids de 3 columnas (Pillars, Process)
- `gap-12` - Grids de 2 columnas (Clients)
- `gap-4` - Espaciado entre botones/CTAs

**Márgenes Internos:**
- `mb-16` - Espaciado después de headers de sección
- `mb-8` - Espaciado después de títulos principales
- `mb-6` - Espaciado después de subtítulos
- `mb-4` - Espaciado después de títulos de cards
- `mb-3` - Espaciado entre elementos relacionados

### Componentes UI Base

#### Button (`src/components/ui/Button.tsx`)

**Variantes:**
- `primary`: `.btn-primary` - Fondo `#0B2A3C`, texto blanco
- `secondary`: `.btn-secondary` - Fondo `#2FBF71`, texto blanco, pill shape
- `outline`: `.btn-outline` - Borde `#0B2A3C`, texto `#0B2A3C`, fondo transparente

**Clases CSS (definidas en `globals.css`):**
```css
.btn-primary {
  bg-[#0B2A3C]
  hover:bg-[#0B2A3C]/90
  text-white
  font-semibold
  px-8 py-3.5
  rounded-[var(--radius-lg)]  /* 12px */
  transition-all duration-150
  inline-flex items-center gap-2
}

.btn-secondary {
  bg-[#2FBF71]
  hover:bg-[#2FBF71]/90
  text-white
  font-semibold
  px-8 py-3.5
  rounded-[var(--radius-pill)]  /* 9999px */
  transition-all duration-150
  inline-flex items-center gap-2
}

.btn-outline {
  border-2 border-[#0B2A3C]
  text-[#0B2A3C]
  hover:bg-[#0B2A3C] hover:text-white
  font-semibold
  px-8 py-3.5
  rounded-[var(--radius-lg)]
  transition-all duration-150
  inline-flex items-center gap-2
}
```

**Estados:**
- `disabled`: `opacity-50 cursor-not-allowed`
- Hover: Transición de 150ms
- Focus: Outline verde (implementar si necesario)

#### LinkButton (`src/components/ui/LinkButton.tsx`)

**Mismo estilo que Button pero con `Link` de Next.js**
- Mismas variantes: `primary`, `secondary`, `outline`
- Mismas clases CSS

#### Card (`src/components/ui/Card.tsx`)

**Clase CSS:**
```css
.card-flat {
  bg-white
  p-8
  rounded-[var(--radius-lg)]  /* 12px */
  border border-[rgba(11,42,60,0.08)]
  transition-all duration-150
}
```

**Uso con Hover:**
- `hover:shadow-md` - Sombra al hover (en Clients)
- `group` - Para efectos hover coordinados
- `transition-all duration-200` - Transiciones suaves

#### Section (`src/components/ui/Section.tsx`)

**Variantes:**
- `white`: `bg-white`
- `gray`: `bg-gray-50`
- `dark`: `bg-[#0B2A3C] text-white`

**Props:**
- `hero`: Usa `.section-full-hero` (más padding vertical)
- `narrow`: Usa `.section-inner-narrow` (menor ancho máximo)

**Clases CSS:**
```css
.section-full {
  w-full
  relative
  py-16 md:py-24
}

.section-full-hero {
  w-full
  relative
  py-20 md:py-32
}

.section-inner {
  w-full
  px-6 md:px-12 lg:px-16
  max-w-[1400px]
  mx-auto
}

.section-inner-narrow {
  w-full
  px-6 md:px-12
  max-w-[900px]
  mx-auto
}
```

#### Input (`src/components/ui/Input.tsx`)

**Clase CSS:**
```css
.form-input {
  w-full
  px-4 py-3
  rounded-[var(--radius-md)]  /* 8px */
  bg-white
  border border-[rgba(11,42,60,0.15)]
  text-[#0B2A3C]
  focus:outline-none
  focus:border-[#3FA9F5]
  focus:ring-2 focus:ring-[#3FA9F5]/10
  transition-colors duration-150
}
```

#### Textarea (`src/components/ui/Textarea.tsx`)

**Mismo estilo que Input + `resize-none`**

#### Badge (`src/components/ui/Badge.tsx`)

**Variantes:**
- `success`: `bg-[#2FBF71]/10 text-[#2FBF71]`
- `info`: `bg-[#3FA9F5]/10 text-[#3FA9F5]`
- `warning`: `bg-yellow-500/10 text-yellow-700`

**Clase base:**
```css
inline-block
text-xs
px-3 py-1
rounded-full
font-medium
```

### Componentes Layout

#### Navbar (`src/components/layout/Navbar.tsx`)

**Estilos:**
```css
/* Contenedor principal */
fixed top-0 left-0 right-0
z-50
bg-white/80
backdrop-blur-md
border-b border-[rgba(11,42,60,0.08)]

/* Contenedor interno */
w-full
px-6 md:px-12 lg:px-16
max-w-[1400px] mx-auto
flex items-center justify-between
h-16

/* Logo */
text-xl md:text-2xl
font-bold
text-[#0B2A3C]

/* Links de navegación */
text-sm
font-medium
transition-colors
/* Estado activo: text-[#0B2A3C] */
/* Estado inactivo: text-[#6F7A83] hover:text-[#0B2A3C] */

/* CTA botón */
btn-secondary
text-sm
px-6 py-2.5
```

#### Footer (`src/components/layout/Footer.tsx`)

**Estilos:**
```css
/* Contenedor principal */
w-full
bg-[#0B2A3C]
text-gray-300
border-t border-[rgba(255,255,255,0.08)]

/* Grid interno */
grid grid-cols-1 md:grid-cols-3
gap-12
mb-8

/* Título zalantos */
text-2xl
font-bold
text-white
mb-3

/* Links de navegación */
text-gray-400
hover:text-[#2FBF71]
transition-colors
text-sm

/* Email */
text-[#2FBF71]
hover:text-[#2FBF71]/80
transition-colors

/* Copyright */
text-gray-500
text-sm
```

### Patrones de Diseño Específicos

#### Hero Section

**Estructura:**
```tsx
<Section variant="white" hero className="pattern-grid relative overflow-hidden">
  <div className="max-w-[1100px]">
    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#0B2A3C] leading-[1.1] mb-8">
      {/* Título */}
    </h1>
    <p className="text-xl md:text-2xl text-[#6F7A83] leading-relaxed mb-12 max-w-[800px]">
      {/* Subtítulo */}
    </p>
    <div className="flex flex-wrap gap-4">
      <LinkButton variant="primary">{/* CTA */}</LinkButton>
    </div>
  </div>
</Section>
```

**Patrón de fondo:** `.pattern-grid` - Grilla sutil con opacidad 0.03

#### Cards de Contenido (Pillars, UseCases)

**Estructura:**
```tsx
<Card className="text-center group">
  {/* Icono o emoji */}
  <div className="text-5xl mb-6">📊</div>
  
  {/* Título */}
  <h3 className="font-semibold text-xl text-[#0B2A3C] mb-3">
    {/* Título */}
  </h3>
  
  {/* Descripción */}
  <p className="text-[#6F7A83] leading-relaxed">
    {/* Texto */}
  </p>
</Card>
```

**Grid:**
- 3 columnas: `grid-cols-1 md:grid-cols-3 gap-8`
- 2-3 columnas: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`

#### Cards de Clientes

**Estructura mejorada:**
```tsx
<Card className="group hover:shadow-md transition-all duration-200">
  <div className="flex flex-col md:flex-row gap-6">
    {/* Logo placeholder con gradiente */}
    <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#2FBF71]/10 to-[#2FBF71]/5 rounded-xl flex items-center justify-center flex-shrink-0 border border-[#2FBF71]/20 group-hover:border-[#2FBF71]/40 transition-colors">
      {/* Contenido del logo */}
    </div>
    
    <div className="flex-1">
      <h3 className="text-2xl font-semibold text-[#0B2A3C] mb-3 group-hover:text-[#2FBF71] transition-colors">
        {/* Nombre cliente */}
      </h3>
      <p className="text-[#6F7A83] leading-relaxed mb-6">
        {/* Descripción */}
      </p>
      
      {/* Bullets con círculos */}
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#2FBF71] mt-2 flex-shrink-0"></div>
          <span className="text-[#6F7A83] leading-relaxed">{/* Texto */}</span>
        </div>
      </div>
    </div>
  </div>
</Card>
```

#### Proceso (3 pasos numerados)

**Estructura:**
```tsx
<div className="text-center">
  {/* Círculo numerado */}
  <div className="w-16 h-16 bg-[#2FBF71] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
    {/* Número */}
  </div>
  
  {/* Título */}
  <h3 className="text-2xl font-semibold text-[#0B2A3C] mb-4">
    {/* Título paso */}
  </h3>
  
  {/* Descripción */}
  <p className="text-[#6F7A83] leading-relaxed">
    {/* Texto */}
  </p>
</div>
```

#### CTA Final (Dark Section)

**Estructura:**
```tsx
<Section variant="dark">
  <div className="text-center">
    <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
      {/* Título */}
    </h2>
    <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-[800px] mx-auto">
      {/* Subtítulo */}
    </p>
    
    <LinkButton variant="secondary" className="text-lg py-4 px-12">
      {/* CTA */}
    </LinkButton>
    
    <p className="text-gray-400 text-sm mt-6">
      {/* Texto pequeño */}
    </p>
  </div>
</Section>
```

### Efectos y Transiciones

**Transiciones estándar:**
- `transition-all duration-150` - Botones, links
- `transition-all duration-200` - Cards, hover effects
- `transition-colors` - Cambios de color

**Efectos hover comunes:**
- Botones: `hover:bg-[color]/90` (opacidad 90%)
- Links: `hover:text-[#0B2A3C]` o `hover:text-[#2FBF71]`
- Cards: `hover:shadow-md` (elevación sutil)
- Títulos en cards: `group-hover:text-[#2FBF71]` o `group-hover:text-[#3FA9F5]`

**Backdrop blur:**
- Navbar: `backdrop-blur-md` con `bg-white/80`

### Bordes y Radios

**Radios implementados:**
- `rounded-[var(--radius-lg)]` (12px) - Cards, botones primary/outline
- `rounded-[var(--radius-pill)]` (9999px) - Botones secondary
- `rounded-xl` (12px) - Logo placeholders
- `rounded-full` - Badges, círculos numerados

**Bordes:**
- Cards: `border border-[rgba(11,42,60,0.08)]` (muy sutil)
- Inputs: `border border-[rgba(11,42,60,0.15)]`
- Logo placeholders: `border border-[#2FBF71]/20` con hover `border-[#2FBF71]/40`

### Sombras

**Sombras implementadas:**
- Cards estándar: Sin sombra (flat design)
- Cards con hover: `hover:shadow-md`
- Avatar About: `shadow-[var(--shadow-sm)]` (muy sutil)

**Variables CSS:**
```css
--shadow-subtle: 0 1px 2px rgba(11, 42, 60, 0.04)
--shadow-sm: 0 2px 4px rgba(11, 42, 60, 0.06)
```

### Patrones de Fondo

**Pattern Grid (Hero):**
```css
.pattern-grid {
  background-image: 
    linear-gradient(rgba(11, 42, 60, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(11, 42, 60, 0.03) 1px, transparent 1px);
  background-size: 32px 32px;
}
```

**Gradientes en Logo Placeholders:**
- Verde: `bg-gradient-to-br from-[#2FBF71]/10 to-[#2FBF71]/5`
- Azul: `bg-gradient-to-br from-[#3FA9F5]/10 to-[#3FA9F5]/5`

### Responsive Breakpoints

**Breakpoints Tailwind estándar:**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

**Uso común:**
- `text-5xl md:text-7xl lg:text-8xl` - Títulos hero
- `grid-cols-1 md:grid-cols-3` - Grids de 3 columnas
- `grid-cols-1 lg:grid-cols-2` - Grids de 2 columnas
- `px-6 md:px-12 lg:px-16` - Padding horizontal
- `py-16 md:py-24` - Padding vertical

### Estados Interactivos

**Estados de Links:**
- Default: `text-[#6F7A83]`
- Hover: `hover:text-[#0B2A3C]` o `hover:text-[#2FBF71]`
- Active: `text-[#0B2A3C]` (sección actual)

**Estados de Botones:**
- Default: Color base según variante
- Hover: `hover:bg-[color]/90`
- Disabled: `opacity-50 cursor-not-allowed`
- Focus: `focus:outline-none focus:ring-2 focus:ring-[#3FA9F5]/10`

**Estados de Cards:**
- Default: Sin sombra, borde sutil
- Hover: `hover:shadow-md` (elevación)
- Group hover: Títulos cambian de color

### Iconos y Emojis

**Uso de Emojis:**
- Pillars: 📊 🔒 ⚙️ (text-5xl)
- Process: Números en círculos verdes
- Clients: 💊 🎓 (text-2xl md:text-3xl)
- About: 👨‍💻 (text-7xl)

**SVG Icons:**
- Flechas en botones: `w-4 h-4` o `w-5 h-5`
- Stroke: `strokeWidth={2}`
- Color: `currentColor` (hereda del texto)

### Espaciado Específico por Componente

**Hero:**
- Padding vertical: `py-20 md:py-32`
- Max width contenido: `max-w-[1100px]`
- Gap entre título y subtítulo: `mb-8`
- Gap entre subtítulo y CTA: `mb-12`

**Secciones estándar:**
- Header centrado: `text-center mb-16`
- Grid max width: `max-w-[1200px] mx-auto`
- Gap entre cards: `gap-8`

**Cards:**
- Padding interno: `p-8`
- Gap interno flex: `gap-6`
- Espaciado entre elementos: `mb-3`, `mb-4`, `mb-6`

**Formularios:**
- Gap entre campos: `space-y-6` o `gap-6`
- Label spacing: `mb-2`
- Input padding: `px-4 py-3`
- Grid de 2 columnas: `grid md:grid-cols-2 gap-6` (para campos lado a lado)
- Textarea rows: `rows={8}` (default 4, pero ContactSection usa 8)

#### Formulario de Contacto

**Estructura:**
```tsx
<Section variant="white" narrow>
  <Card className="max-w-[700px] mx-auto">
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Grid de 2 columnas para Nombre y Empresa */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">Nombre</label>
          <Input type="text" name="nombre" ... />
        </div>
        <div>
          <label className="form-label">Empresa</label>
          <Input type="text" name="empresa" ... />
        </div>
      </div>
      
      {/* Campo único Email */}
      <div>
        <label className="form-label">Email</label>
        <Input type="email" name="email" ... />
      </div>
      
      {/* Textarea Mensaje */}
      <div>
        <label className="form-label">Mensaje</label>
        <Textarea name="mensaje" rows={8} ... />
      </div>
      
      {/* Mensaje de estado */}
      {submitMessage && (
        <div className={`p-4 rounded-[var(--radius-md)] ${
          submitMessage.includes('Gracias') || submitMessage.includes('exitosamente')
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {submitMessage}
        </div>
      )}
      
      {/* Botón submit */}
      <Button type="submit" variant="primary" className="w-full justify-center">
        {isSubmitting ? 'Enviando...' : 'Agendar Demostración'}
      </Button>
    </form>
  </Card>
</Section>
```

**Estados del formulario:**
- Success message: `bg-green-50 text-green-700 border border-green-200`
- Error message: `bg-red-50 text-red-700 border border-red-200`
- Botón disabled: `opacity-50 cursor-not-allowed` (manejado por componente Button)

**Label CSS:**
```css
.form-label {
  block
  text-[#6F7A83]
  mb-2
  font-medium
  text-sm
}
```

### Sección About

**Estructura:**
```tsx
{/* Header */}
<Section variant="white">
  <div className="text-center">
    <h1 className="text-5xl md:text-6xl font-bold text-[#0B2A3C] mb-6">
      Fundador
    </h1>
    <p className="text-xl text-[#6F7A83]">
      Conoce al creador detrás de zalantos
    </p>
  </div>
</Section>

{/* Founder Card */}
<Section variant="gray" narrow>
  <Card className="max-w-[700px] mx-auto">
    <div className="flex flex-col items-center space-y-8 text-center">
      {/* Avatar */}
      <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#2FBF71] shadow-[var(--shadow-sm)]">
        {/* Contenido avatar */}
      </div>
      
      {/* Información */}
      <div>
        <h2 className="text-3xl font-bold text-[#0B2A3C] mb-2">
          Tomás Rodríguez
        </h2>
        <p className="text-[#2FBF71] text-xl font-semibold mb-6">
          Fundador & CTO
        </p>
        <p className="text-[#6F7A83] text-lg leading-relaxed">
          {/* Descripción */}
        </p>
      </div>
    </div>
  </Card>
</Section>

{/* Misión */}
<Section variant="white" narrow>
  <div className="text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-[#0B2A3C] mb-6">
      Mi Misión
    </h2>
    <p className="text-xl text-[#6F7A83] leading-relaxed max-w-[600px] mx-auto">
      {/* Texto misión */}
    </p>
  </div>
</Section>
```

### Sección Contact (Header y Beneficios)

**Header:**
```tsx
<Section variant="white">
  <div className="text-center">
    <h1 className="text-5xl md:text-6xl font-bold text-[#0B2A3C] mb-6">
      Agenda una Reunión
    </h1>
    <p className="text-xl md:text-2xl text-[#2FBF71] font-semibold">
      Descubre cómo podemos transformar tus datos en decisiones estratégicas
    </p>
  </div>
</Section>
```

**Nota:** El subtítulo usa `text-[#2FBF71]` (verde) en lugar del gris neutro estándar.

**Contact Info (footer de sección):**
```tsx
<Section variant="gray" narrow>
  <div className="text-center">
    <p className="text-[#6F7A83] mb-4 font-medium">
      ¿Prefieres contactarnos directamente?
    </p>
    <a href="mailto:..." className="text-[#2FBF71] hover:text-[#2FBF71]/80 text-lg font-semibold transition-colors inline-flex items-center gap-2">
      <span>✉️</span> remates.dev@gmail.com
    </a>
  </div>
</Section>
```

### Resumen de Clases CSS Personalizadas

**Todas las clases definidas en `app/globals.css`:**

```css
/* Secciones */
.section-full              /* py-16 md:py-24 */
.section-full-hero         /* py-20 md:py-32 */
.section-inner             /* px-6 md:px-12 lg:px-16, max-w-[1400px] */
.section-inner-narrow       /* px-6 md:px-12, max-w-[900px] */

/* Botones */
.btn-primary               /* bg-[#0B2A3C], rounded-lg */
.btn-secondary             /* bg-[#2FBF71], rounded-pill */
.btn-outline               /* border-2 border-[#0B2A3C] */

/* Cards */
.card-flat                 /* bg-white, p-8, rounded-lg, border sutil */

/* Formularios */
.form-input                /* Input estilizado con focus states */
.form-label                /* Label con estilo consistente */

/* Patrones */
.pattern-grid              /* Grilla sutil para fondos */
.pattern-dots              /* Puntos sutil para fondos */
```

### Valores Específicos de Tamaños

**Anchos máximos:**
- Contenido hero: `max-w-[1100px]`
- Grids de contenido: `max-w-[1200px]`
- Contenido estrecho: `max-w-[900px]`
- Formularios: `max-w-[700px]`
- Texto centrado: `max-w-[800px]` o `max-w-[600px]`

**Alturas:**
- Navbar: `h-16` (64px)
- Logo placeholders: `w-20 h-20 md:w-24 md:h-24` (80px/96px)
- Avatar About: `w-48 h-48` (192px)
- Círculos numerados: `w-16 h-16` (64px)

**Tamaños de texto específicos:**
- Logo navbar: `text-xl md:text-2xl`
- Links navbar: `text-sm`
- Email contacto: `text-lg`
- Texto pequeño footer: `text-sm`

---

**Fin de la Sección de Estilos Actuales Implementados**

---

## 1. Objetivo del Rediseño

### Objetivo Visual
Transformar la identidad visual del sitio para proyectar una imagen que combine:
- **Confianza empresarial**: Diseño sobrio, claro y profesional que inspire credibilidad en ejecutivos C-level
- **Energía de startup**: Interfaz moderna, directa y ágil que comunique innovación y agilidad
- **Claridad ejecutiva**: Información estructurada que permita decisiones rápidas sin ruido visual

### Objetivo de Negocio
1. **Aumentar conversión de leads calificados**: Atraer específicamente a tomadores de decisión (C-level, gerentes de área) con mensajes orientados a ROI
2. **Posicionar expertise en IA gobernada**: Diferenciarse de competidores que venden "hype" vs. resultados medibles
3. **Facilitar el proceso de venta**: Reducir fricción en el funnel con información clara y casos de éxito concretos
4. **Construir credibilidad técnica**: Demostrar capacidad de integración con sistemas legacy y gobernanza ética

---

## 2. Audiencia y Mensajes Clave

### Perfil de Audiencia Primaria

**C-Level (CEO, CFO, CTO)**
- Necesidades: ROI medible, reducción de riesgo, gobernanza, escalabilidad
- Puntos de dolor: Proyectos de IA que no generan valor, falta de transparencia, costos ocultos
- Tiempo de atención: 30-60 segundos por sección

**Gerentes de Área (Operaciones, IT, Analytics)**
- Necesidades: Implementación práctica, integración con sistemas existentes, resultados operativos
- Puntos de dolor: Complejidad técnica, tiempo de implementación, resistencia al cambio
- Tiempo de atención: 2-3 minutos por página

### Mensajes Clave

1. **"Más allá del hype: Impacto Real"**
   - No vendemos experimentación, vendemos resultados financieros medibles
   - Cada iniciativa comienza con proyección financiera validada por CFO

2. **"Convertimos datos en decisiones y monetizamos resultados"**
   - Enfoque en transformación de datos en valor de negocio, no en tecnología por sí misma
   - Énfasis en monetización y ROI, no en features técnicas

3. **"Gobernanza Ética y Transparencia"**
   - Modelos auditables ("White Box AI") que cumplen normativas
   - Protección de reputación corporativa mediante transparencia

4. **"Integración Legacy sin Rip-and-Replace"**
   - Orquestamos innovación sobre infraestructura existente
   - Evitamos costos de reemplazo total, aceleramos time-to-market

---

## 3. Principios de Diseño

### 3.1 Jerarquía y Claridad
- **Una sola idea por sección**: Cada sección comunica un único concepto, sin competencia visual
- **Jerarquía tipográfica estricta**: Display → H1 → H2 → Body → Small. Máximo 3 niveles de jerarquía visible simultáneamente
- **Evidencia primero**: Casos de éxito, métricas y testimonios antes de promesas genéricas

### 3.2 Espaciado y Ritmo
- **Espaciado generoso**: Mínimo 64px entre secciones principales, 32px entre elementos relacionados
- **Respiro visual**: Cada elemento tiene espacio para "respirar", evitando saturación
- **Ritmo consistente**: Misma escala de espaciado en toda la página (ver Sistema de Diseño)

### 3.3 Color y Contraste
- **Acento verde estratégico**: Solo para CTAs primarios, métricas clave y elementos de éxito. NO para decoración
- **Base LIGHT predominante**: Fondo blanco/gris claro para secciones y cards. Color solo donde aporta significado
- **Contraste accesible**: Mínimo 4.5:1 para texto normal sobre fondo claro, 3:1 para texto grande (WCAG AA)
- **Dark estratégico**: Solo en Hero (opcional), CTA final y Footer si aporta contraste premium

### 3.4 Tipografía
- **Legibilidad sobre estilo**: Fuentes sans-serif modernas para body, serif elegante solo para headlines
- **Tamaños consistentes**: Usar escala tipográfica del sistema, no valores arbitrarios
- **Line-height generoso**: Mínimo 1.5 para body, 1.2 para headlines

### 3.5 Interactividad
- **Feedback inmediato**: Estados hover/active claros en todos los elementos interactivos
- **Transiciones sutiles**: Animaciones de 200-300ms, easing natural (ease-out)
- **Sin sorpresas**: Comportamiento predecible, sin animaciones distractoras

### 3.6 Contenido
- **Copy ejecutivo**: Frases cortas, verbos activos, sin jerga técnica innecesaria
- **Números concretos**: Métricas específicas (ej: "30% reducción de costos") sobre adjetivos ("significativo")
- **Beneficios sobre features**: "Aumenta ROI" no "Usa machine learning"

### 3.7 Responsive
- **Mobile-first**: Diseño pensado primero para móvil, luego escalado a desktop
- **Breakpoints claros**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Contenido prioritario**: En móvil, solo lo esencial. Desktop muestra contexto adicional

### 3.8 Performance
- **Carga rápida**: LCP < 2.5s, INP < 200ms (ver sección 11)
- **Imágenes optimizadas**: WebP/AVIF, lazy loading, tamaños responsivos
- **Sin bloqueo**: JavaScript no bloqueante, CSS crítico inline

---

## 4. Arquitectura del Sitio

### Mapa de Páginas Actual

```
/
├── / (Página Principal)
│   ├── Sección Home (default)
│   │   └── Hero, Pilares, Proceso, Casos destacados, CTA final
│   ├── Sección About (/?section=about)
│   │   └── Información del fundador, misión
│   └── Sección Contact (/?section=contact)
│       └── Formulario de contacto, beneficios de agendar demo
├── /RetailDemo
│   └── Demo interactiva de análisis de retail (boutique de moda)
├── /CallCenterDemo
│   └── Demo interactiva de análisis de call center
└── /DashboardMinero
    └── Dashboard de análisis minero
```

**Nota:** La página principal (`/`) utiliza un sistema de secciones que se muestran mediante estado React, no páginas separadas. Esto permite navegación fluida sin recargar la página.

### Objetivo de Cada Página/Sección

**Home (Sección principal en /)**  
Objetivo: Convertir visitantes en leads calificados mediante propuesta de valor clara y evidencia de resultados.  
Métrica objetivo: 3-5% tasa de conversión a formulario de contacto.  
**Estilo:** Hero impactante (puede ser dark), pilares claros, proceso visual, casos destacados.

**About (Sección en /?section=about)**  
Objetivo: Humanizar la marca y construir confianza mediante transparencia sobre el fundador.  
Métrica objetivo: Reducir fricción percibida, aumentar confianza en proceso de venta.  
**Estilo:** Diseño centrado, card destacada con información del fundador, misión clara.

**Contact (Sección en /?section=contact)**  
Objetivo: Convertir interés en lead mediante formulario optimizado y beneficios claros de agendar demo.  
Métrica objetivo: Tasa de abandono < 30%, tasa de envío > 70%.  
**Estilo:** Grid de beneficios (3 cards), formulario centrado, información de contacto visible.

**RetailDemo (/RetailDemo)**  
Objetivo: Demostrar capacidades mediante demo interactiva con datos reales de retail.  
**Estilo:** Interfaz funcional, enfocada en la demo, mantener consistencia visual con el resto del sitio.

**CallCenterDemo (/CallCenterDemo)**  
Objetivo: Demostrar capacidades mediante demo interactiva con datos de call center.  
**Estilo:** Interfaz funcional, enfocada en la demo, mantener consistencia visual con el resto del sitio.

**DashboardMinero (/DashboardMinero)**  
Objetivo: Mostrar dashboard de análisis minero como caso de uso.  
**Estilo:** Dashboard funcional, mantener paleta de colores consistente.

---

## 5. Estructura de la Home

### Orden de Secciones (de arriba a abajo)

#### 5.1 Hero Section
**Propósito:** Captar atención inmediata con propuesta de valor clara y CTA primario.

**Contenido:**
- Headline principal: "Convertimos los datos en decisiones y monetizamos los resultados"
- Subheadline: "Ayudamos a líderes ejecutivos a transformar la complejidad de la información en rentabilidad medible mediante Inteligencia Artificial gobernada y estructuras de datos escalables"
- CTA primario: "Habla con un experto" (botón verde acento)
- CTA secundario: "Ver casos de éxito" (botón outline)
- Imagen/ilustración opcional: Diagrama conceptual "Datos → Orden → Decisión" (sutil, no distractora)

**Estilo:** Hero puede usar fondo dark (opcional) para contraste premium. Si usa dark, texto claro. Si usa light, texto oscuro.

**CTA:** Botón primario verde acento, botón secundario outline verde

---

#### 5.2 Sección "Más allá del hype: Impacto Real"
**Propósito:** Diferenciarse de competidores que venden experimentación sin resultados.

**Contenido:**
- Headline: "Más allá del hype: Impacto Real"
- Subheadline: "Nuestra metodología se aleja de la experimentación sin rumbo para enfocarse estrictamente en indicadores financieros y operativos"
- Tres pilares en cards horizontales:
  1. **Estrategia ROI-First**
     - Descripción: "No implementamos tecnología por moda. Cada iniciativa comienza con una proyección financiera clara y un caso de negocio validado por el CFO."
     - Icono: Gráfico de barras ascendente / calculadora
  2. **Gobernanza Ética**
     - Descripción: "Modelos transparentes y auditables ("White Box AI") que aseguran el cumplimiento normativo y protegen la reputación corporativa."
     - Icono: Escudo / checkmark en círculo
  3. **Integración Legacy**
     - Descripción: "Orquestamos la innovación sobre su infraestructura actual, evitando costosos "rip-and-replace" y acelerando el time-to-market."
     - Icono: Engranajes conectados / puzzle

**Estilo:** Fondo light, cards blancas con sombra sutil, texto oscuro.

**CTA:** Ninguno (sección informativa)

---

#### 5.3 Trust Bar / Social Proof
**Propósito:** Construir credibilidad mediante logos de clientes o métricas agregadas.

**Contenido:**
- Opción A: Logos de clientes (si disponibles) en escala de grises, hover a color
- Opción B: Métricas agregadas: "X empresas confían en Zalantos" / "Y% ROI promedio" / "Z proyectos implementados"
- Opción C: Combinación de ambas

**Estilo:** Fondo light, logos/métricas con texto oscuro.

**CTA:** Ninguno (elemento de confianza)

---

#### 5.4 Proceso "Datos → Orden → Decisión"
**Propósito:** Explicar de forma visual y simple cómo funciona la metodología.

**Contenido:**
- Headline: "De datos dispersos a decisiones accionables"
- Tres pasos visuales (horizontal en desktop, vertical en mobile):
  1. **Datos**
     - Descripción: "Integramos datos de múltiples fuentes (legacy, cloud, APIs)"
     - Visual: Icono de base de datos / nube
  2. **Orden**
     - Descripción: "Estructuramos y gobernamos la información con modelos de IA transparentes"
     - Visual: Icono de organización / estructura
  3. **Decisión**
     - Descripción: "Entregamos insights accionables que generan ROI medible"
     - Visual: Icono de gráfico / checkmark

**Estilo:** Fondo light, cards blancas, texto oscuro.

**CTA:** "Ver cómo funciona" (link a sección de servicios o página dedicada)

---

#### 5.5 Casos de Éxito Destacados
**Propósito:** Proporcionar evidencia concreta de resultados mediante casos reales.

**Contenido:**
- Headline: "Casos de éxito"
- Subheadline: "Resultados medibles en empresas líderes"
- 2-3 casos en cards:
  - Título del caso (ej: "Retail: Optimización de inventario")
  - Métrica principal destacada (ej: "30% reducción de costos de inventario") en verde acento
  - Descripción breve (2-3 líneas)
  - Testimonial opcional (1 línea)
  - Link "Ver caso completo"

**Estilo:** Fondo light, cards blancas, métricas en verde acento.

**CTA:** "Ver todos los casos" (link a /casos - TODO: crear si necesario)

---

#### 5.6 CTA Final
**Propósito:** Convertir visitantes que llegaron al final de la página.

**Contenido:**
- Headline: "¿Listo para transformar sus datos en decisiones?"
- Subheadline: "Hable con un experto y descubra cómo Zalantos puede generar ROI medible en su organización"
- Formulario corto inline (opcional): Nombre, Email, Empresa
- O botón grande: "Solicitar consultoría gratuita"

**Estilo:** Puede usar fondo dark para contraste premium. Si dark, texto claro. Si light, texto oscuro.

**CTA:** Botón verde acento grande, formulario opcional

---

#### 5.7 Footer
**Propósito:** Navegación secundaria, información legal, contacto.

**Contenido:**
- Logo y tagline breve: "Zalantos - Convertimos datos en decisiones"
- Links de navegación (Inicio, About, Contact, Demos)
- Información de contacto (email: remates.dev@gmail.com)
- Links legales (Privacidad, Términos) - TODO: implementar si necesario
- Copyright: "© 2025 Zalantos"

**Estilo:** Fondo dark (gray-900) para contraste premium, texto claro.

**CTA:** Links de navegación, email de contacto

---

### 5.8 Sección About (Ya Implementada)

**Propósito:** Humanizar la marca mediante información del fundador.

**Contenido Actual:**
- Información del fundador (Tomás Rodríguez)
- Título y rol (Fundador & CTO)
- Descripción profesional
- Misión personal

**Estilo de Aplicación (Mejoras para Rediseño):**
- Fondo light, card blanca centrada con `section-card`
- Tipografía según escala (Playfair para títulos)
- Espaciado generoso

---

### 5.9 Sección Contact (Ya Implementada)

**Propósito:** Convertir interés en lead mediante formulario optimizado.

**Contenido Actual:**
- Grid de 3 beneficios (Demo Interactiva, Análisis de Necesidades, Insights en Tiempo Real)
- Formulario de contacto (Nombre, Empresa, Email, Mensaje)
- Email de contacto directo

**Estilo de Aplicación (Mejoras para Rediseño):**
- Fondo light, cards blancas con `content-card` para beneficios
- Botón de submit con verde acento: usar clase `.btn-primary` actualizada
- Mantener estructura actual pero mejorar espaciado y tipografía según guía

---

## 6. Sistema de Diseño (Design Tokens)

### 6.1 Tokens de Color

#### Implementación: CSS Variables + Tailwind

**Estrategia:** Definir tokens como CSS variables en `:root` y mapearlos a Tailwind en `tailwind.config.ts`.

```css
/* En app/globals.css - :root */
:root {
  /* Verde Acento (Primary CTA) */
  --color-accent-500: #10B981;
  --color-accent-600: #059669;
  --color-accent-700: #047857;
  
  /* Neutros Base (Light Theme) */
  --color-white: #FFFFFF;
  --color-gray-50: #F9FAFB;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-300: #D1D5DB;
  --color-gray-400: #9CA3AF;
  --color-gray-500: #6B7280;
  --color-gray-600: #4B5563;
  --color-gray-700: #374151;
  --color-gray-800: #1F2937;
  --color-gray-900: #111827;
  
  /* Texto */
  --color-text-primary: #111827;
  --color-text-secondary: #6B7280;
  --color-text-tertiary: #9CA3AF;
  
  /* Estados */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;
  
  /* Bordes */
  --color-border-light: #E5E7EB;
  --color-border-medium: #D1D5DB;
  --color-border-focus: #10B981;
}
```

**Mapeo en `tailwind.config.ts`:**
```typescript
colors: {
  accent: {
    500: 'var(--color-accent-500)',
    600: 'var(--color-accent-600)',
    700: 'var(--color-accent-700)',
  },
  // ... otros colores usando variables
}
```

#### Reglas de Uso del Color Acento Verde

**SÍ usar verde acento para:**
- Botones CTA primarios ("Habla con un experto", "Solicitar consultoría")
- Métricas positivas destacadas (ej: "30% aumento")
- Estados de éxito (checkmarks, confirmaciones)
- Links de acción principal (máximo 2-3 por página)
- Focus states en inputs

**NO usar verde acento para:**
- Decoración o elementos no interactivos
- Texto body o headlines (excepto métricas específicas)
- Bordes o fondos de secciones
- Más de 3 elementos simultáneos en viewport

#### Colores por Contexto

**Fondo LIGHT (Predominante):**
- Secciones: `white` o `gray-50`
- Cards: `white` con sombra
- Navbar: `white` con sombra sutil
- Texto: `gray-900` (primario), `gray-600` (secundario)

**Fondo DARK (Estratégico - Solo Hero/CTA Final/Footer):**
- Hero (opcional): `gray-900` con overlay sutil
- CTA Final (opcional): `gray-900`
- Footer: `gray-900`
- Texto: `white` (primario), `gray-300` (secundario)

---

### 6.2 Tipografía

#### Familias de Fuentes

- **Display/Headlines**: **Playfair Display** (serif elegante)
  - Uso: H1, H2 principales, taglines
  - Implementación: `Playfair_Display({ subsets: ['latin'] })` desde `next/font/google`
  - Clase: `${playfair.className}` en componentes
  
- **Body/UI**: **Lato** (sans-serif moderna)
  - Uso: Body text, botones, navegación, UI general
  - Implementación: `Lato({ weight: ['400', '700'], subsets: ['latin'] })` desde `next/font/google`
  - Clase: `${lato.className}` aplicada al contenedor principal

**Limitación de Pesos:** Solo usar 400 (regular) y 700 (bold) para Lato. Solo 400 para Playfair Display.

#### Escala Tipográfica

**Display (Hero headlines)**
- Tamaño: `48px` (3rem) desktop, `36px` (2.25rem) mobile
- Peso: `700` (bold)
- Line-height: `1.1`
- Letter-spacing: `-0.02em`

**H1 (Títulos de sección)**
- Tamaño: `36px` (2.25rem) desktop, `28px` (1.75rem) mobile
- Peso: `700` (bold)
- Line-height: `1.2`
- Letter-spacing: `-0.01em`

**H2 (Subtítulos de sección)**
- Tamaño: `28px` (1.75rem) desktop, `24px` (1.5rem) mobile
- Peso: `700` (bold) - usar bold ya que no hay semibold disponible
- Line-height: `1.3`
- Letter-spacing: `0`

**H3 (Títulos de cards)**
- Tamaño: `20px` (1.25rem)
- Peso: `700` (bold)
- Line-height: `1.4`
- Letter-spacing: `0`

**Body Large (Lead text)**
- Tamaño: `18px` (1.125rem)
- Peso: `400` (regular)
- Line-height: `1.6`
- Letter-spacing: `0`

**Body (Texto principal)**
- Tamaño: `16px` (1rem)
- Peso: `400` (regular)
- Line-height: `1.6`
- Letter-spacing: `0`

**Body Small (Texto secundario)**
- Tamaño: `14px` (0.875rem)
- Peso: `400` (regular)
- Line-height: `1.5`
- Letter-spacing: `0`

**Small (Captions, labels)**
- Tamaño: `12px` (0.75rem)
- Peso: `400` (regular)
- Line-height: `1.4`
- Letter-spacing: `0.01em`

---

### 6.3 Espaciado

#### Escala Base (múltiplos de 4px)
- `4px` (0.25rem) - Espaciado mínimo entre elementos relacionados
- `8px` (0.5rem) - Padding interno de badges, espaciado tight
- `12px` (0.75rem) - Espaciado entre elementos en lista
- `16px` (1rem) - Padding estándar de botones, espaciado base
- `24px` (1.5rem) - Espaciado entre elementos en grid
- `32px` (2rem) - Espaciado entre secciones relacionadas
- `48px` (3rem) - Espaciado entre secciones principales
- `64px` (4rem) - Espaciado entre secciones grandes (desktop)
- `96px` (6rem) - Espaciado hero/footer (desktop)

#### Aplicación
- Padding de secciones: `48px` vertical (mobile), `96px` vertical (desktop)
- Gap en grids: `24px` (mobile), `32px` (desktop)
- Margin entre elementos relacionados: `16px` (mobile), `24px` (desktop)

---

### 6.4 Radio de Bordes

- **Small**: `4px` (0.25rem) - Badges, pills, inputs pequeños
- **Medium**: `8px` (0.5rem) - Botones, cards pequeñas, inputs
- **Large**: `12px` (0.75rem) - Cards grandes, containers
- **XLarge**: `16px` (1rem) - Hero sections, secciones destacadas
- **Full**: `9999px` - Pills, badges redondeados

---

### 6.5 Sombras

- **Small**: `0 1px 2px 0 rgba(0, 0, 0, 0.05)` - Cards sutiles, inputs
- **Medium**: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)` - Cards estándar
- **Large**: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)` - Cards destacadas, modals
- **XLarge**: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)` - Hero, CTAs grandes

---

### 6.6 Bordes

- **Thin**: `1px solid` - Separadores, inputs, cards sutiles
- **Medium**: `2px solid` - Botones outline, elementos destacados
- **Color**: Usar `gray-200` para separadores, `gray-300` para inputs, verde acento (`accent-500`) para elementos activos/focus

---

### 6.7 Reglas de Accesibilidad

#### Contraste (Sobre Fondo LIGHT)
- **Texto normal sobre fondo claro**: Mínimo 4.5:1 (WCAG AA)
  - Ejemplo: Texto `gray-900` (#111827) sobre `white` (#FFFFFF) = 15.8:1 ✓
- **Texto grande (18px+) sobre fondo claro**: Mínimo 3:1 (WCAG AA)
- **Elementos interactivos**: Contraste suficiente para distinguir estados (hover, active, focus)
- **Botones**: Texto blanco sobre verde acento = contraste verificado

#### Legibilidad
- **Ancho de línea**: Máximo 75 caracteres (aproximadamente 65-70ch)
- **Espaciado entre párrafos**: Mínimo 1.5x line-height
- **Tamaño mínimo de texto**: 14px para body, 12px solo para labels

#### Interactividad
- **Área de click mínimo**: 44x44px (touch targets)
- **Estados visibles**: Hover, focus, active claramente diferenciados
- **Focus visible**: Outline claro en navegación por teclado (no solo mouse)
  - Usar: `focus:outline-2 focus:outline-accent-500 focus:outline-offset-2`

---

## 7. Componentes Base (UI Kit)

### 7.1 Navbar

**Propósito:** Navegación principal, branding, acceso rápido a CTAs.

**Variantes:**
- **Default**: Fondo blanco con sombra sutil, sticky en scroll

**Estados:**
- **Default**: Links en `gray-700`, hover en `gray-900`
- **Active**: Link actual en verde acento (`accent-500`)
- **Hover**: Transición de color suave (200ms)

**Contenido:**
- Logo izquierda (texto "Zalantos" o logo SVG)
- Links centro: Inicio, Nosotros, Contacto
- CTA derecha: "Contacto" (botón verde acento)
- Mobile: Hamburger menu con drawer

**Clases sugeridas:**
- Usar clases existentes del sistema, ajustar en `globals.css`:
  - Fondo: `bg-white shadow-sm`
  - Links: `text-gray-700 hover:text-gray-900`
  - Active: `text-accent-500`

**Especificaciones:**
- Altura: `64px` (desktop), `56px` (mobile)
- Padding horizontal: `24px` (desktop), `16px` (mobile)
- Z-index: `50` (sobre todo el contenido)

---

### 7.2 Hero

**Propósito:** Captar atención y comunicar propuesta de valor principal.

**Variantes:**
- **Centered**: Contenido centrado, imagen/ilustración opcional fondo
- **Dark (opcional)**: Fondo dark para contraste premium

**Estados:**
- N/A (sección estática)

**Contenido:**
- Headline (H1/Display)
- Subheadline (Body Large)
- 2 CTAs (primario verde acento, secundario outline)
- Imagen/ilustración opcional

**Clases sugeridas:**
- Si dark: `bg-gray-900 text-white`
- Si light: `bg-white text-gray-900`
- Usar `section-card-primary` actualizada en `globals.css`

**Especificaciones:**
- Padding vertical: `96px` (desktop), `64px` (mobile)
- Max-width contenido: `1200px`
- Altura mínima: `600px` (desktop), `500px` (mobile)

---

### 7.3 Button

**Propósito:** Acciones principales y secundarias.

**Variantes:**
- **Primary**: Fondo verde acento, texto blanco
- **Secondary**: Borde verde acento, fondo transparente, texto verde acento
- **Tertiary**: Texto verde acento, sin borde, hover con fondo sutil

**Estados:**
- **Default**: Color base
- **Hover**: Darker shade (accent-600), escala 1.02, sombra medium
- **Active**: Darker shade (accent-700), escala 0.98
- **Disabled**: Opacidad 0.5, cursor not-allowed
- **Focus**: Outline verde acento (2px, offset 2px)

**Clases sugeridas:**
- Actualizar `.btn-primary` en `globals.css`:
  ```css
  .btn-primary {
    @apply bg-accent-500 hover:bg-accent-600 active:bg-accent-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 focus:outline-2 focus:outline-accent-500 focus:outline-offset-2;
  }
  ```
- Actualizar `.btn-outline` para usar verde acento

**Especificaciones:**
- Padding: `16px 32px` (desktop), `14px 24px` (mobile)
- Border-radius: `8px` (medium)
- Font-size: `16px` (body)
- Font-weight: `700` (bold)
- Transición: `all 200ms ease-out`

---

### 7.4 Card

**Propósito:** Contenedor para contenido relacionado (pilares, casos, servicios).

**Variantes:**
- **Default**: Fondo blanco, borde sutil, sombra small
- **Highlighted**: Borde verde acento sutil (2px), sombra medium
- **Hover**: Elevación de sombra, escala 1.02 (opcional)

**Estados:**
- **Default**: Sombra small, borde `gray-200`
- **Hover**: Sombra medium, borde `gray-300` (si aplica)

**Clases sugeridas:**
- Actualizar `.content-card` en `globals.css`:
  ```css
  .content-card {
    @apply bg-white border border-gray-200 rounded-xl p-8 shadow-sm transition-all duration-200;
  }
  ```
- Actualizar `.content-card-interactive` para hover sutil

**Especificaciones:**
- Padding: `32px` (desktop), `24px` (mobile)
- Border-radius: `12px` (large)
- Gap interno: `16px` entre elementos

---

### 7.5 Section / Container

**Propósito:** Wrapper para secciones con espaciado y ancho consistentes.

**Variantes:**
- **Default**: Fondo blanco
- **Alternate**: Fondo `gray-50`
- **Dark**: Fondo `gray-900` (solo para Hero/CTA final/Footer)

**Estados:**
- N/A (contenedor estático)

**Clases sugeridas:**
- Actualizar `.section-card` en `globals.css` para fondo light:
  ```css
  .section-card {
    @apply bg-white rounded-3xl p-8 md:p-12 shadow-lg;
  }
  ```

**Especificaciones:**
- Max-width: `1200px` (centrado)
- Padding horizontal: `24px` (desktop), `16px` (mobile)
- Padding vertical: `64px` (desktop), `48px` (mobile)

---

### 7.6 Trust Bar

**Propósito:** Construir credibilidad mediante logos de clientes o métricas.

**Variantes:**
- **Logos**: Grid de logos en escala de grises, hover a color
- **Métricas**: Números grandes con labels descriptivos

**Estados:**
- **Default**: Logos en `gray-400`, opacidad 0.6
- **Hover**: Logos en `gray-700`, opacidad 1

**Contenido:**
- Logos de clientes (SVG/PNG) o
- Métricas: "X empresas confían en Zalantos" / "Y% ROI promedio" / "Z proyectos"

**Especificaciones:**
- Padding vertical: `48px` (desktop), `32px` (mobile)
- Gap entre elementos: `48px` (desktop), `32px` (mobile)
- Altura logos: `40px` (máximo)

---

### 7.7 Pillars (3 Cards)

**Propósito:** Comunicar los tres pilares de la metodología (ROI-First, Gobernanza, Legacy).

**Variantes:**
- **Grid 3 columnas** (desktop), **1 columna** (mobile)
- Cards con icono, título, descripción

**Estados:**
- **Default**: Card estándar
- **Hover**: Elevación sutil (opcional, no requerido)

**Clases sugeridas:**
- Usar `.content-card-interactive` actualizada

**Contenido:**
- Icono (arriba, centrado)
- Título (H3)
- Descripción (Body, 2-3 líneas)

**Especificaciones:**
- Gap entre cards: `32px` (desktop), `24px` (mobile)
- Icono tamaño: `48px` (desktop), `40px` (mobile)

---

### 7.8 Case Study

**Propósito:** Mostrar casos de éxito con métricas y resultados.

**Variantes:**
- **Destacado**: Card grande con imagen, métrica grande, descripción extendida
- **Compacto**: Card pequeña para grid, métrica mediana, descripción breve

**Estados:**
- **Default**: Card estándar
- **Hover**: Link visible, elevación sutil

**Contenido:**
- Título del caso (H3)
- Métrica destacada (Display/H1 en verde acento)
- Descripción (Body, 2-4 líneas)
- Testimonial opcional (cursiva, 1 línea)
- Link "Ver caso completo"

**Especificaciones:**
- Padding: `32px` (destacado), `24px` (compacto)
- Métrica: Tamaño `36px`, color verde acento (`accent-500`), peso `700`

---

### 7.9 Footer

**Propósito:** Navegación secundaria, información legal, contacto.

**Variantes:**
- **Default**: Fondo `gray-900`, texto `gray-300`

**Estados:**
- Links: Hover en `white` o verde acento

**Contenido:**
- Columna 1: Logo "Zalantos", tagline breve
- Columna 2: Links navegación (Inicio, Nosotros, Contacto)
- Columna 3: Información contacto (email)
- Columna 4: Links legales (Privacidad, Términos) - TODO
- Fila inferior: Copyright "© 2025 Zalantos"

**Especificaciones:**
- Padding vertical: `64px` (desktop), `48px` (mobile)
- Gap entre columnas: `48px` (desktop), `32px` (mobile)
- Border-top: `1px solid gray-800`

---

### 7.10 Formulario de Contacto

**Propósito:** Capturar leads calificados con información relevante.

**Variantes:**
- **Inline (Hero)**: Campos mínimos (Nombre, Email, Empresa)
- **Completo (Página Contacto)**: Todos los campos + mensaje

**Estados:**
- **Default**: Input con borde `gray-300`
- **Focus**: Borde verde acento, outline verde sutil
- **Error**: Borde rojo, mensaje de error debajo
- **Success**: Mensaje de confirmación verde

**Clases sugeridas:**
- Actualizar `.form-input` en `globals.css`:
  ```css
  .form-input {
    @apply w-full px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 transition-colors duration-200;
  }
  ```

**Contenido:**
- Campos: Nombre, Email, Empresa, Teléfono (opcional), Mensaje
- Checkbox: "Acepto política de privacidad" (requerido)
- Botón submit: "Enviar" (verde acento)

**Especificaciones:**
- Input padding: `12px 16px`
- Input border-radius: `8px` (medium)
- Gap entre campos: `16px`
- Label: `14px`, peso `400`, color `gray-700`

---

### 7.11 Badges / Pills

**Propósito:** Etiquetas, categorías, estados.

**Variantes:**
- **Default**: Fondo `gray-100`, texto `gray-700`
- **Success**: Fondo verde claro (`green-50`), texto verde (`green-700`)
- **Info**: Fondo azul claro (`blue-50`), texto azul (`blue-700`)

**Estados:**
- N/A (elemento estático)

**Clases sugeridas:**
- Actualizar `.badge-primary` para usar verde acento si aplica

**Contenido:**
- Texto corto (1-3 palabras)

**Especificaciones:**
- Padding: `6px 12px`
- Border-radius: `9999px` (full)
- Font-size: `12px` (small)
- Font-weight: `400` (regular)

---

## 8. Guía de Copywriting

### 8.1 Tono

**Ejecutivo, sin jerga, claro**
- Hablar como un consultor senior, no como un vendedor
- Evitar superlativos vacíos ("revolucionario", "único", "mejor")
- Usar lenguaje directo y específico
- Respetar la inteligencia del lector (C-level)

### 8.2 Reglas

1. **Frases cortas**: Máximo 20 palabras por oración, preferir 10-15
2. **Verbos activos**: "Transformamos" no "Somos capaces de transformar"
3. **Evitar tecnicismos**: "Modelos de IA transparentes" no "Algoritmos de machine learning con explicabilidad"
4. **Números concretos**: "30% reducción" no "reducción significativa"
5. **Beneficios sobre features**: "Aumenta ROI" no "Usa machine learning"
6. **Sin jerga de marketing**: Evitar "disruptivo", "innovador", "cutting-edge"

### 8.3 Ejemplos de Titulares y Subtítulos

#### Hero
- **Headline**: "Convertimos los datos en decisiones y monetizamos los resultados"
- **Subheadline**: "Ayudamos a líderes ejecutivos a transformar la complejidad de la información en rentabilidad medible mediante Inteligencia Artificial gobernada y estructuras de datos escalables"

#### Pilares
- **Headline**: "Más allá del hype: Impacto Real"
- **Subheadline**: "Nuestra metodología se aleja de la experimentación sin rumbo para enfocarse estrictamente en indicadores financieros y operativos"
- **Pilar 1**: "Estrategia ROI-First" / "No implementamos tecnología por moda. Cada iniciativa comienza con una proyección financiera clara y un caso de negocio validado por el CFO."
- **Pilar 2**: "Gobernanza Ética" / "Modelos transparentes y auditables ("White Box AI") que aseguran el cumplimiento normativo y protegen la reputación corporativa."
- **Pilar 3**: "Integración Legacy" / "Orquestamos la innovación sobre su infraestructura actual, evitando costosos "rip-and-replace" y acelerando el time-to-market."

#### Casos
- **Headline**: "Casos de éxito con resultados medibles"
- **Subheadline**: "Empresas líderes ya están generando ROI con la metodología de Zalantos"

#### CTA Final
- **Headline**: "¿Listo para transformar sus datos en decisiones?"
- **Subheadline**: "Hable con un experto y descubra cómo Zalantos puede generar ROI medible en su organización"

### 8.4 Palabras Recomendadas vs. Palabras a Evitar

#### ✅ Palabras Recomendadas
- **Resultados, ROI, rentabilidad, impacto financiero**
- **Gobernanza, transparencia, auditabilidad**
- **Integración, orquestación, escalabilidad**
- **Metodología, proceso, enfoque**
- **Medible, concreto, específico**
- **Ejecutivo, líder, organización**
- **Decisión, insight, acción**

#### ❌ Palabras a Evitar
- **Revolucionario, disruptivo, innovador** (demasiado genérico)
- **Único, exclusivo, mejor** (no demostrable)
- **Cutting-edge, state-of-the-art** (jerga técnica innecesaria)
- **Solucionamos, resolvemos todo** (promesas vacías)
- **Big Data, AI/ML, algoritmos** (jerga técnica, usar "Inteligencia Artificial" o "IA" si necesario)
- **Hype, buzzwords** (evitar completamente)

---

## 9. Checklist de Calidad

### 9.1 Diseño Visual

- [ ] Paleta de colores aplicada correctamente (verde acento solo en CTAs y métricas)
- [ ] Tema LIGHT predominante (secciones y cards claras)
- [ ] Tipografía consistente (escala respetada, no valores arbitrarios)
- [ ] Espaciado generoso y consistente (escala de 4px respetada)
- [ ] Jerarquía visual clara (máximo 3 niveles simultáneos)
- [ ] Contraste accesible (mínimo 4.5:1 para texto normal)
- [ ] Sin elementos decorativos innecesarios
- [ ] Imágenes optimizadas (WebP/AVIF, lazy loading)
- [ ] Responsive funcional en todos los breakpoints (sm, md, lg, xl)

### 9.2 Contenido y Mensaje

- [ ] Propuesta de valor clara en hero (máximo 10 segundos de lectura)
- [ ] Mensajes clave presentes (ROI-First, Gobernanza, Legacy)
- [ ] Copy ejecutivo (frases cortas, verbos activos, sin jerga)
- [ ] Números concretos donde aplica (métricas, casos de éxito)
- [ ] Beneficios sobre features en toda la página
- [ ] CTAs claros y accionables (máximo 2-3 por página)
- [ ] Sin superlativos vacíos o jerga de marketing
- [ ] Marca "Zalantos" consistente en todo el sitio

### 9.3 Componentes y UX

- [ ] Navbar sticky funcional con estados hover/active
- [ ] Botones con estados claros (hover, active, disabled, focus)
- [ ] Formularios con validación y mensajes de error claros
- [ ] Links con estados hover visibles
- [ ] Cards con espaciado y jerarquía correcta
- [ ] Footer completo con navegación y links legales
- [ ] Áreas de click mínimas (44x44px para touch)

### 9.4 Performance y Técnico

- [ ] LCP < 2.5s (Largest Contentful Paint)
- [ ] INP < 200ms (Interaction to Next Paint)
- [ ] CSS crítico inline, resto cargado async
- [ ] JavaScript no bloqueante
- [ ] Imágenes con tamaños responsivos (srcset)
- [ ] Sin recursos bloqueantes innecesarios
- [ ] Fuentes optimizadas con `next/font`

### 9.5 Accesibilidad

- [ ] Navegación por teclado funcional (Tab, Enter, Esc)
- [ ] Focus visible en todos los elementos interactivos
- [ ] Alt text en todas las imágenes
- [ ] Contraste de colores verificado (herramienta automática)
- [ ] Estructura semántica correcta (h1, h2, nav, main, footer)
- [ ] Labels en todos los inputs de formulario

### 9.6 Enterprise + Startup Balance

- [ ] Diseño sobrio pero no aburrido (energía sutil)
- [ ] Confianza construida (casos de éxito, métricas, testimonios)
- [ ] Claridad ejecutiva (información estructurada, sin ruido)
- [ ] Modernidad sin exceso (tecnología presente pero no protagonista)
- [ ] Copy profesional (tono ejecutivo, sin jerga)
- [ ] CTAs directos (sin presión de venta agresiva)

### 9.7 Alineación con Objetivos

- [ ] Mensaje de ROI-First presente y claro
- [ ] Gobernanza ética comunicada (transparencia, cumplimiento)
- [ ] Integración legacy mencionada (evitar rip-and-replace)
- [ ] Concepto "Datos → Orden → Decisión" visualizado
- [ ] Enfoque en analítica/IA/gobernanza (no features técnicas genéricas)
- [ ] Sin abreviaturas técnicas innecesarias

---

## 10. Guía de Aplicación de Estilos

### 10.1 Fase 1: Definir Tokens CSS

**Objetivo:** Establecer variables CSS en `:root` y mapearlas a Tailwind.

**Pasos:**
1. Abrir `app/globals.css`
2. Agregar variables CSS en `:root` (ver sección 6.1)
3. Actualizar `tailwind.config.ts` para usar variables CSS
4. Verificar que Tailwind reconoce los colores

**Ejemplo:**
```css
/* En app/globals.css */
:root {
  --color-accent-500: #10B981;
  --color-accent-600: #059669;
  /* ... más variables */
}
```

```typescript
// En tailwind.config.ts
colors: {
  accent: {
    500: 'var(--color-accent-500)',
    600: 'var(--color-accent-600)',
  },
}
```

---

### 10.2 Fase 2: Redefinir Clases en globals.css

**Objetivo:** Actualizar las clases existentes para reflejar el tema LIGHT y verde acento.

**Tabla de Mapeo: Clase Actual → Nuevo Propósito/Estilo**

| Clase Actual | Nuevo Propósito | Nuevo Estilo |
|-------------|-----------------|--------------|
| `.section-card` | Secciones estándar (light) | `bg-white rounded-3xl p-8 md:p-12 shadow-lg` |
| `.section-card-primary` | Hero/CTA destacado (puede ser dark) | `bg-gray-900 text-white` (si dark) o `bg-white` (si light) |
| `.content-card` | Cards de contenido (light) | `bg-white border border-gray-200 rounded-xl p-8 shadow-sm` |
| `.content-card-interactive` | Cards con hover (light) | `.content-card` + `hover:shadow-md hover:border-gray-300 transition-all` |
| `.btn-primary` | CTA primario (verde acento) | `bg-accent-500 hover:bg-accent-600 text-white font-bold py-4 px-8 rounded-lg focus:outline-2 focus:outline-accent-500` |
| `.btn-secondary` | CTA secundario (opcional) | Mantener gradiente o cambiar a outline verde |
| `.btn-outline` | CTA outline (verde acento) | `border-2 border-accent-500 text-accent-500 hover:bg-accent-500 hover:text-white` |
| `.badge-primary` | Badge destacado | Usar verde acento si aplica: `bg-accent-50 text-accent-700` |
| `.badge-success` | Badge éxito | `bg-green-50 text-green-700` |
| `.form-input` | Input de formulario (light) | `bg-white border border-gray-300 text-gray-900 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20` |
| `.form-label` | Label de formulario (light) | `text-gray-700` |

**Pasos:**
1. Abrir `app/globals.css`
2. Localizar cada clase en la tabla
3. Reemplazar estilos según nueva especificación
4. Mantener nombres de clases (no cambiar estructura)
5. Probar en componentes existentes

---

### 10.3 Fase 3: Ajustes Mínimos en Componentes

**Objetivo:** Aplicar clases actualizadas y ajustar texto/marca.

**Componentes a Ajustar:**

**Navbar (`src/components/Common/Navbar.tsx`):**
- Cambiar "Ventura Analytics" → "Zalantos"
- Asegurar que usa fondo blanco
- Verificar estados hover/active

**Footer (`src/components/Common/Footer.tsx`):**
- Cambiar "Ventura Analytics" → "Zalantos"
- Asegurar fondo dark (`bg-gray-900`)
- Actualizar copyright

**Home (`src/components/Home/Home.tsx`):**
- Cambiar referencias a marca → "Zalantos"
- Aplicar clases actualizadas (`.section-card`, `.content-card-interactive`)
- Verificar que Hero puede ser dark (opcional)
- Asegurar que secciones usan fondo light

**About (`src/components/Home/About.tsx`):**
- Aplicar clases actualizadas
- Asegurar fondo light

**Contact (`src/components/Home/Contact.tsx`):**
- Aplicar clases actualizadas
- Botón submit usar `.btn-primary` actualizado
- Asegurar fondo light

**Pasos:**
1. Abrir cada componente
2. Buscar y reemplazar "Ventura Analytics" → "Zalantos"
3. Verificar que usa clases del sistema (no estilos inline)
4. Ajustar clases si es necesario según nueva especificación
5. Probar visualmente

---

### 10.4 Estructura de Archivos (Sin Cambios)

```
app/
├── page.tsx              # Página principal con secciones
├── layout.tsx            # Layout raíz con fuentes
├── globals.css           # Sistema de clases CSS (ACTUALIZAR)
├── RetailDemo/
│   └── page.tsx
├── CallCenterDemo/
│   └── page.tsx
└── DashboardMinero/
    └── page.tsx

src/
├── components/
│   ├── Common/
│   │   ├── Navbar.tsx    # AJUSTAR: marca, clases
│   │   └── Footer.tsx     # AJUSTAR: marca, clases
│   ├── Home/
│   │   ├── Home.tsx      # AJUSTAR: marca, clases
│   │   ├── About.tsx     # AJUSTAR: clases
│   │   └── Contact.tsx   # AJUSTAR: clases
│   └── Demo/
│       ├── RetailDemoCompleta.tsx
│       └── CallCenterDemo.tsx
```

---

## 11. Estándares de Performance y Profesionalismo

### 11.1 Performance (Next.js 15)

#### Core Web Vitals - Presupuestos Recomendados

- **LCP (Largest Contentful Paint)**: < 2.5s
  - Hero debe cargar rápido
  - Usar `next/image` con tamaños explícitos
  - Preload fuentes críticas

- **CLS (Cumulative Layout Shift)**: < 0.1
  - Reservar espacio para imágenes (aspect-ratio)
  - Evitar contenido que se mueve durante carga
  - Dimensiones explícitas para embeds

- **INP (Interaction to Next Paint)**: < 200ms
  - Minimizar JavaScript en componentes interactivos
  - Usar Server Components cuando sea posible
  - Evitar re-renders innecesarios

#### Imágenes

- **Usar `next/image` siempre**:
  ```tsx
  <Image
    src="/images/hero.jpg"
    alt="Descripción"
    width={1200}
    height={600}
    priority // Solo para hero
    placeholder="blur" // Si aplica
  />
  ```

- **Formatos**: WebP/AVIF preferidos, fallback a JPEG/PNG
- **Tamaños explícitos**: Siempre definir width/height
- **Lazy loading**: Automático con `next/image`, excepto hero (usar `priority`)
- **Evitar imágenes enormes**: Comprimir antes de subir, máximo 200KB por imagen

#### Fuentes

- **Usar `next/font` siempre**:
  ```tsx
  import { Playfair_Display, Lato } from 'next/font/google'
  
  const playfair = Playfair_Display({ 
    subsets: ['latin'],
    display: 'swap', // Evitar FOIT
  })
  ```

- **Limitar familias**: Solo Playfair Display y Lato (ya implementado)
- **Limitar pesos**: Solo 400 y 700 (ya implementado)
- **Preload crítico**: Next.js lo hace automáticamente
- **Evitar FOIT**: Usar `display: 'swap'`

#### JavaScript

- **Minimizar Client Components**: Usar `'use client'` solo cuando necesario
- **Preferir Server Components**: Por defecto en Next.js 15
- **Dynamic import para módulos pesados**:
  ```tsx
  const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
    loading: () => <Skeleton />,
  })
  ```

- **Evitar librerías grandes para animaciones**: Usar CSS transitions (200ms) en lugar de librerías pesadas
- **Code splitting por ruta**: Automático con Next.js, pero evitar cargar recursos de demos en Home

#### CSS

- **Evitar duplicación**: Usar clases del sistema, no estilos inline
- **Usar tokens/clases del sistema**: `.btn-primary`, `.content-card`, etc.
- **Minimizar overrides**: Si necesitas override, revisar si el sistema necesita ajuste

#### Caché y SEO Técnico

- **Rendering estático**: Usar cuando aplique (páginas sin datos dinámicos)
- **Compresión**: Habilitar gzip/brotli en servidor
- **Preconnect solo si es necesario**: Para Google Fonts, Next.js lo maneja
- **Metadata por página**: Usar `metadata` export en Next.js 15
  ```tsx
  export const metadata = {
    title: 'Zalantos - Convertimos datos en decisiones',
    description: '...',
  }
  ```

#### Demos

- **Code splitting**: Las demos (`/RetailDemo`, `/CallCenterDemo`) no deben cargar recursos en Home
- **Lazy load componentes pesados**: Usar `dynamic` import si es necesario

---

### 11.2 Profesionalismo

#### Jerarquía Tipográfica Estricta

- **H1 único**: Solo uno por página (en Hero)
- **H2 por sección**: Un H2 por sección principal
- **H3 para cards**: Títulos dentro de cards
- **No saltar niveles**: H1 → H2 → H3, no H1 → H3

#### Consistencia Visual

- **Grilla**: Usar grid de Tailwind consistentemente (grid-cols-1 md:grid-cols-3)
- **Espaciado**: Respetar escala de 4px (ver sección 6.3)
- **Alineación**: Texto alineado según contexto (centrado en hero, izquierda en body)
- **Radios**: Usar escala consistente (8px botones, 12px cards)
- **Sombras**: Usar escala consistente (small, medium, large)

#### Contenido "Enterprise"

- **Prueba social**: 
  - TODO: Agregar logos de clientes si disponibles
  - TODO: Agregar métricas agregadas si disponibles ("X empresas", "Y% ROI")
  
- **Casos con números**: 
  - TODO: Asegurar que casos de éxito incluyen métricas concretas
  - Ejemplo: "30% reducción de costos" no "reducción significativa"

#### Accesibilidad

- **Focus visible**: Todos los elementos interactivos deben tener focus visible
  ```css
  focus:outline-2 focus:outline-accent-500 focus:outline-offset-2
  ```

- **Teclado**: Navegación completa por teclado (Tab, Enter, Esc)
- **Labels**: Todos los inputs deben tener `<label>` asociado
- **Contrastes**: Verificar con herramienta automática (ej: WebAIM)

#### SEO Básico

- **Metadata**: Título y descripción por página
- **Open Graph**: TODO: Agregar og:image, og:title, og:description
- **Títulos por página**: H1 único con keyword relevante
- **Estructura H1/H2**: Semántica correcta
- **Alt text**: Todas las imágenes con alt descriptivo

#### Calidad Percibida

- **Skeletons/Estados de loading**: 
  - TODO: Agregar skeletons para contenido async
  - Evitar "Cargando..." genérico

- **Estados de error**: 
  - Mensajes claros y accionables
  - No solo "Error" genérico

- **Microinteracciones sutiles**: 
  - Transiciones <= 200ms
  - Hover states claros pero no exagerados
  - Feedback inmediato en acciones

---

**Fin del Documento**
