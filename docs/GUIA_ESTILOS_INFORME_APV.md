# Guía de estilos del informe APV Ventanas

Esta guía resume los estilos, tokens visuales y comportamientos implementados en `public/informe-apv-ventanas-oportunidades/index.html`. Sirve para replicar la estética actual si se crean nuevas páginas o componentes relacionados con este informe.

## 1. Fundamentos visuales

- **Tipografía principal:** `Inter`, cargada desde Google Fonts. Se aplica a `body` y a la mayoría de textos para lograr un look moderno y legible.
- **Fondo base del documento:** `body.bg-stone-50`, con texto `text-slate-800`. Esto genera un lienzo claro con contraste suave.
- **Variables CSS** (en el `<style>` del header):
  - `--brand-green: #22C55E`
  - `--brand-navy: #0B1F36`
  - `--apv-orange: #F7941D`
  - `--apv-navy: #003366`
  Estas variables alimentan bordes, textos y fondos en toda la página para mantener coherencia cromática.

## 2. Paleta y contraste

- **Colores principales:** verde `#22C55E`, azul marino `#0B1F36` y naranja `#F7941D`. Se combinan con grises neutros (`stone`, `slate`) de Tailwind para jerarquizar.
- **Bordes y sombras suaves** (`border-stone-200`, `shadow-sm`, `shadow-lg`) realzan secciones sin saturarlas.
- **Gradientes de fondo:** se usan gradientes `bg-gradient-to-br` hacia azules y esmeraldas para las tarjetas de instrucciones.
- **Indicadores de impacto:** el texto de impacto se colorea en función del nivel (`text-red-600` para crítico, `text-emerald-600` para alto, `text-blue-600` para medio).

## 3. Layout general

- **Contenedor principal:** `main.max-w-7xl.mx-auto.px-4.sm:px-6.lg:px-8.py-8.space-y-12` centra el contenido y ofrece gutters consistentes.
- **Sistema de tarjetas:** se utilizan grids (`grid grid-cols-1 md:grid-cols-3`, `grid grid-cols-1 lg:grid-cols-2`) para mantener la alineación responsive.
- **Secciones destacadas** (introducción, oportunidades, feedback) están separadas por `space-y` y `border` ligeros para crear ritmo visual.
- **Footer y navigation** usan `border` y `shadow-sm` para delimitaciones claras sin perder frescura.

## 4. Componentes clave

- **Security overlay:** un modal oscuro (`#security-overlay`) cubre el contenido hasta que se valida la contraseña. El formulario usa `security-input` y `security-error` con validaciones y `box-shadow` sutil.
- **Navegación:** `nav.bg-white.border-b` con logo clickeable (`logo-hover`) y tipografía de título en `font-extrabold` y uso de `text-apvOrange`/`text-apvNavy`.
- **Header intro:** `h1.text-3xl.font-bold` y tarjetas de instrucciones con bordes `border-2` y gradientes `from-blue-50/to-blue-100`, `from-emerald-50/to-emerald-100`, `from-indigo-50/to-indigo-100`.
- **Tarjetas de oportunidades:** generadas dinámicamente desde JS, contienen:
  - cabecera con título `text-xl font-bold text-slate-800`.
  - chips de proceso con `bg-stone-100 text-stone-600`.
  - columnas de dolor/solución usando fondos `bg-red-50/50` y `bg-emerald-50/50`, iconografía simple (`!`, `✓`).
  - textarea con `focus:border-brandGreen focus:ring-1`.
- **Sección de feedback:** `section.rounded-xl.p-8.border-2.border-brandGreen` con fondo `#f0fdf4`, y tarjetas interiores con `border border-brandGreen`.
- **Botón principal:** `button.bg-brandGreen.text-white.px-10.py-4.rounded-lg.font-bold.shadow-lg.hover:opacity-90.transform.hover:-translate-y-1` (transiciones y sombras para interacción).
- **Prioritización:** filas `draggable` con `border-2 border-stone-300 hover:border-brandGreen`, `priority-badge` circular verde y control visual de arrastre (`drag-over`, `dragging`).
- **Side dots:** `scroll-nav` visible en pantallas `lg`, con `scroll-item`, `scroll-dot` y etiquetas `scroll-label` que aparecen al hacer hover.

## 5. Interacciones y animaciones

- **Animaciones CSS:** `animate-fade-in-up`, `slideIn` y `shake` se usan para aparecer y llamar la atención sobre errores o secciones.
- **Hover/Focus:** casi todos los elementos principales (botones, tarjetas drag, inputs) tienen transiciones suaves (`transition`, `hover:shadow-md`, `focus:ring`).
- **Drag & Drop:** el drag de priorización aplica clases `dragging`/`drag-over` y reorganiza el DOM con eventos (`dragstart`, `drop`).
- **Scroll Spy:** la navegación lateral cambia la clase `active` según `scrollY` y las secciones visibles, generando estados visuales con `opacity` y `transform`.

## 6. Recursos y assets

- **Logos y assets:** `public/informe-apv-ventanas-oportunidades/assets/` contiene logos de Zalantos y APV. Mantener tamaños similares (h=7/px) evita saltos.
- **Fonts y CDN:** se usa solo Tailwind CDN (`https://cdn.tailwindcss.com`) junto a Google Fonts. Si se agrega Tailwind en el proyecto, replicar las clases utilitarias sin añadir estilos nuevos innecesarios.

## 7. Recomendaciones para nuevas páginas

1. Reutiliza las variables de color (`--brand-*`) en tus estilos para mantener la paleta.
2. Usa el mismo `max-w-7xl` y `px`/`py` para lograr alineación horizontal uniforme.
3. Copia las clases de tarjetas y botones base (`rounded-lg`, `shadow-sm`, `border-2`) en nuevos componentes.
4. Introduce animaciones solo si replican las existentes (`fade-in-up`, `slideIn`) para evitar saltos de diseño.
5. Para nuevas interacciones (formularios, validaciones), sigue la lógica de `security-input` y `security-error` para mantener la accesibilidad y consistencia.
6. Siempre verifica que los enlaces, imágenes y scripts apunten a `public/informe-apv-ventanas-oportunidades` o que se coloquen en las carpetas correspondientes para que el build los incluya.

Con esta guía queda documentada la estética actual; se puede copiar y adaptar fácilmente cuando se vaya extendiendo el micrositio del informe APV Ventanas.

