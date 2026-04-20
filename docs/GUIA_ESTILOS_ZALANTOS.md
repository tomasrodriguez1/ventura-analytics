# Guía de estilos Zalantos

Este documento consolida la paleta, los tokens y los componentes reutilizables que ya están definidos en la web de Zalantos para que cualquier presentación o pieza gráfica mantenga coherencia cromática, espacial y tipográfica.

## 1. Fundamentos visuales

### Paleta de colores principal
La identidad se apoya en cuatro colores clave y algunas derivadas para fondos y bordes suaves. Se declaran como variables CSS en `app/globals.css`, lo que facilita su uso tanto en clases utilitarias como en componentes React.

| Token | Hex | Uso recomendado |
| --- | --- | --- |
| `--z-primary` | `#0B2A3C` | Azul corporativo: títulos, texto principal, fondo oscuro de secciones y CTA primarios. |
| `--z-value` | `#2FBF71` | Verde positivo para CTA secundarios, estados de éxito y toques de valor/ROI. |
| `--z-neutral` | `#6F7A83` | Gris neutro para textos secundarios, leyendas y bordes suaves. |
| `--z-white` | `#FFFFFF` | Fondo principal. Siempre presente como lienzo neutral. |
| `--z-accent` | `#3FA9F5` | Acentos de innovación y énfasis limitado (iconografía, enlaces, resaltes sutiles). |
| `--z-border` | `rgba(11, 42, 60, 0.1)` | Borde ligero para tarjetas y formas planas. |
| `--z-surface` | `#FAFBFC` | Superficies elevadas/degradadas que requieren contraste suave. |

```5:46:app/globals.css
::root {
  /* Paleta zalantos - FUENTE ÚNICA DE VERDAD */
  --z-primary: #0B2A3C;        /* Azul primario */
  --z-value: #2FBF71;          /* Verde valor/ROI */
  --z-neutral: #6F7A83;        /* Gris neutro */
  --z-white: #FFFFFF;          /* Blanco */
  --z-accent: #3FA9F5;         /* Acento innovación (limitado) */
  
  /* Bordes y fondos derivados */
  --z-border: rgba(11, 42, 60, 0.1);
  --z-surface: #FAFBFC;
  
  /* Espaciado 8pt grid */
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;
  --space-6: 48px;
  --space-8: 64px;
  --space-12: 96px;
  
  /* Tipografía */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.75rem;   /* 28px */
  --text-3xl: 2.25rem;   /* 36px */
  --text-4xl: 3rem;      /* 48px */
  --text-5xl: 4rem;      /* 64px */
  
  /* Radios moderados (flat) */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-pill: 9999px;
  
  /* Sombras muy sutiles o none */
  --shadow-subtle: 0 1px 2px rgba(11, 42, 60, 0.04);
  --shadow-sm: 0 2px 4px rgba(11, 42, 60, 0.06);
}
```

### Tipografía global
`Inter` es la tipografía principal y se activa en `app/layout.tsx` con la variable `--font-inter`. El `body` hereda ese font y aplica suavizado (`font-sans antialiased`) para mantener legibilidad en todos los dispositivos. Los tamaños definidos en `--text-*` permiten mantener jerarquía clara del título al texto base.

### Espaciado y rejilla
Las unidades `--space-*` forman una grilla de 8 puntos: 8, 16, 24, 32, 48, 64 y 96 px. Úsalas para márgenes, rellenos y separación entre secciones; por ejemplo, `py-14` y `py-24` en clases de sección responden a este ritmo.

### Radios y sombras
Los bordes son suaves (`--radius-sm` a `--radius-lg`). Las formas más redondeadas (`--radius-pill`) se usan en pills y botones secundarios. Las sombras son muy discretas —`--shadow-subtle` para superficies planas, `--shadow-sm` cuando requieres un ligero levantado sin perder limpieza.

### Accesibilidad y comportamiento base
`body` usa `color: var(--z-primary)` y `background: var(--z-white)`. Se aplica `scroll-behavior: smooth` y se respeta `prefers-reduced-motion`, reduciendo animaciones y transiciones al mínimo cuando el usuario lo solicita. También se define `-webkit-font-smoothing` y `text-rendering: optimizeLegibility` para mejorar la lectura.

## 2. Layout y superficies
Las secciones se construyen con clases reutilizables:

- `.section-full` y `.section-full-hero`: ocupan todo el ancho, con rellenos verticales amplios (`py-14/py-24` y hero con `py-20/py-32`).
- `.section-inner` y `.section-inner-narrow`: centran contenido dentro de un ancho máximo (`max-w-[1400px]` o `900px`) con padding lateral responsivo (`px-4` a `px-16`).

Las texturas suaves vienen de `.pattern-grid` y `.pattern-dots`, que añaden rejillas y puntos con transparencias ligeras. Son ideales como capas de fondo sobre `var(--z-surface)` sin competir con el contenido.

## 3. Componentes clave

### Botones
Existen tres variantes principales:

- `.btn-primary`: fondo `var(--z-primary)`, texto blanco, sombra profunda, transformación al pasar el cursor y ring amarillo suave en foco.
- `.btn-secondary`: fondo `var(--z-value)` con `border-radius` tipo `pill` y respuesta táctil más redonda.
- `.btn-outline`: borde `var(--z-primary)` y texto del mismo color con fondo transparente.

La envoltura `LinkButton` (y la contraparte `Button`) combina esas clases con una base de altura mínima y `gap-2` para iconos. Así se garantiza consistencia en CTAs de hero, footer o cards.

```17:32:src/components/ui/LinkButton.tsx
  const baseClasses = 'inline-flex items-center justify-center gap-2 transition-all duration-150 min-h-[44px] min-w-[44px] touch-manipulation'
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline'
  }
  
  return (
    <Link 
      href={href}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Link>
  )
}
```

### Tarjetas planas
`card-flat` crea tarjetas limpias con fondo blanco, padding generoso (`p-5` a `p-8`), bordes ligeros y transición suave. Úsalas para resúmenes de servicios, estadísticas o testimonios sin dobles sombras.

### Formularios
`.`form-input` define campos con padding moderado, borde gris tenue y foco en azul claro (`#3FA9F5`). `form-label` usa texto gris oscuro, `font-medium` y `mb-2`. Los componentes `Input` y `Textarea` reutilizan `form-input`; `Textarea` añade `resize-none` para control.

### Contenido editorial
`.blog-content` aplica texto base en gris muy oscuro, encabezados con `font-bold`, listas con `space-y-2`, y enlaces subrayados que pasan de verde a azul oscuro. Sirve como estilo base para posts y secciones de conocimiento.

### Badges
El componente `Badge` ofrece variantes para estados de éxito, información o warning con fondos semitransparentes.

```10:17:src/components/ui/Badge.tsx
  const variantClasses = {
    success: 'bg-[#2FBF71]/10 text-[#2FBF71]',
    info: 'bg-[#3FA9F5]/10 text-[#3FA9F5]',
    warning: 'bg-yellow-500/10 text-yellow-700'
  }
  
  return (
    <span className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}
```

## 4. Patrones gráficos y animaciones

- `.pattern-grid` y `.pattern-dots` emplean gradientes lineales y radiales con opacidades mínimas (3–4 %) sobre fondos claros.
- `.animate-blob`, `.animate-fade-in-up` y las clases `.animation-delay-*` ajustan la entrada de elementos con keyframes `blob`, `fade-in-up` y `fadeIn`. Son perfectas para hero y ofertas donde el movimiento debe sentirse orgánico.
- `.backdrop-blur-sm` y las transparencias mezcladas con `mix-blend-multiply` recrean vitrinas brillantes (como en hero) sin sobrecargar el contenido.

## 5. Recomendaciones para presentaciones

- Usa `var(--z-primary)` para títulos y fondos hero; reserva `var(--z-value)` para botones de acción y llamadas al valor.
- Añade `var(--z-accent)` a íconos o links cuando quieras comunicar innovación, pero evita saturar con él.
- Mantén fondos en blanco o en `var(--z-surface)` y aplica `pattern-grid`/`pattern-dots` cuando necesites textura.
- Trabaja con la escala de espacios (`--space-*`) antes que valores arbitrarios para mantener consistencia (ej. separaciones entre secciones con `32px` o `48px`).
- Usa `section-inner`/`section-inner-narrow` para limitar el ancho en slides y evita el scroll horizontal con `section-full`.
- Para CTA en slides, combina `LinkButton` con una sombra leve y `animation-delay-200` para que aparezca con ritmo.
- Anima suavemente las formas de fondo con `animate-blob` y gradientes radiales (los degradados de hero muestran cómo usar `bg-gradient-to-r` y `text-transparent bg-clip-text`).

## 6. Referencias técnicas

Tailwind hereda la paleta desde CSS y expone los tokens principales bajo la clave `z`, manteniendo `background` y `foreground` en variables para estilos personalizados. De esta manera se pueden invocar clases tipo `bg-z-primary`, `text-z-value`, `border-z-border` o incluso `text-z-neutral` sin reescribir colores.

```3:26:tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        z: {
          primary: '#0B2A3C',
          value: '#2FBF71',
          neutral: '#6F7A83',
          white: '#FFFFFF',
          accent: '#3FA9F5',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
```

Usa esta guía como referencia rápida cuando prepares presentaciones, documentos de producto o actualizaciones de marketing; así garantizas que todos hablen el mismo lenguaje visual de Zalantos.
