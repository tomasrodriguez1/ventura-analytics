[38 tools called]

# 1. Resumen visual general
- La web se siente como un sitio corporativo moderno y sobrio con un toque tecnológico (IA/consultor) enfocado en negocios: base blanca, mucho espacio negativo y elementos verdes/azules para resaltar valor y acción.  
- El hero usa tipografías grandes (hasta `text-8xl` en desktop) y un patrón cuadriculado sutil (`pattern-grid`) para dar sensación de precisión analítica.  
- La navegación fija superior combina isotipo + wordmark con enlaces mínimos (“Inicio”, “Nosotros”) y CTAs luminosos (botón verde y botón con degradado brillante) sin menus hamburguesa.  
- Cada sección “full-bleed” repite contenedores centrados (`max-w-[1400px]`, `px-6/px-12/px-16`) con cards rectangulares de bordes suaves y sombras muy ligeras para destacar bloques de contenido.  
- El lenguaje visual prioriza íconos simples (emoji, svg) y gradientes neón en los CTAs de IA, contrastando con textos neutros en gris `#6F7A83` y titulares en azul oscuro `#0B2A3C`.  
- Los cards usan bordes muy tenues (`border-[rgba(11,42,60,0.08)]`) y fondos blancos/gris claro, generando jerarquía sin romper la unidad visual.  
- Las secciones de casos y procesos se apoyan en grids responsivos (1/2/3 columnas según breakpoint) para mantener una lectura rápida.  
- La página de consultor IA despliega una tarjeta de chat con bordes gruesos y sombra elevada (`shadow-2xl`), y al abrirse el modal éste cubre la pantalla con overlay oscuro `bg-black/60`.  
- La página de privacy es un documento largo con columnas definidas por `max-w-3xl`, tipografías claras y listas numeradas para facilitar el escaneo legal.  
- Todo el sitio usa la familia `Inter` via `next/font` y variables CSS (`--font-inter`, `--z-*`) para asegurar consistencia en pesos/espaciamiento.  
- Los formularios (contacto y modal de lead) mantienen inputs con `border-gray-300`, radios suaves y estados de foco verdes; el texto de ayuda utiliza `text-sm` para no competir con labels.

# 2. Mapa del sitio (rutas/páginas)
- `/` → `app/page.tsx` (Home principal con `Hero`, `Pillars`, `Process`, `Clients`, `UseCases`, `CTAFinal` y vistas alternas para `section=about` y `section=contact`).  
- `/consultor-ia` → `app/consultor-ia/page.tsx` (landing del Consultor IA con `AiChatWidget`, `LeadGateModal`, CTAs y tarjetas de seguridad).  
- `/informe-apv-ventanas-oportunidades` → `app/informe-apv-ventanas-oportunidades/page.tsx` (iframe full-screen del informe).  
- `/privacy` → `app/privacy/page.tsx` bajo `app/privacy/layout.tsx` (documento de política con navegación fija y footer compartido).  

# 3. Layout global
## Header / Nav
- `Navbar` (`src/components/layout/Navbar.tsx`) es un `nav` fijo (`fixed top-0`) con fondo semitransparente `bg-white/80`, blur (`backdrop-blur-md`), borde inferior suave (`border-[rgba(11,42,60,0.08)]`) y altura `h-16 md:h-20`.  
- Logo: `LogoLockup` (icono + wordmark “zalantos”, `size="sm"`, link a `/`), accesible con foco (`focus-visible:ring`).  
- Navegación: dos enlaces principales “Inicio” y “Nosotros” que usan iconos (casa/personas) hasta `lg`, donde aparece el texto; el estado activo pinta `text-[#0B2A3C]` y `aria-current`.  
- CTAs en la derecha: `AiCtaButton` con degradado, sombra y animaciones (`hover:scale-105`) apuntando a `/consultor-ia`; versión texto visible `sm+` y versión icon-only en `sm:hidden`.  
- Botón “Contacto” (clase `btn-secondary`) visible en `sm+`; en mobile se reemplaza por un botón circular verde con ícono de chat.  
- Accesibilidad visual: focus rings verde/azul, tamaños mínimos `min-h-[44px]`, iconos semánticos y etiquetas `aria-label`.

## Footer
- Pie (`Footer.tsx`): fondo `#0B2A3C`, texto gris claro y grid `md:grid-cols-3`.  
- Columna amplia con título “zalantos” y tagline “Convertimos datos en decisiones y monetizamos resultados”.  
- Navegación secundaria con mismos enlaces que el nav principal y foco/hover en verde `#2FBF71`, junto a link a `/privacy`.  
- Sección de contacto con email `soporte@zalantos.com` y borde superior/inferior `rgba(255,255,255,0.08)`.

## Contenedores / max-width / padding
- `Section` (`src/components/ui/Section.tsx`) abstrae `section-full` (`py-16/py-24`) y `section-full-hero` (`py-20/py-32`), con wrappers internos `section-inner` (`max-w-[1400px] px-6/px-16`).  
- `section-inner-narrow` reduce `max-w` a `900px` (uso en About / Mission).  
- `body` usa `overflow-x-hidden` y `scroll-behavior: smooth`; `main` de cada layout suma `pt-20` para no tapar el nav fijo.

## Tipografía (familias, tamaños, pesos)
- Fuente global `Inter` (variable `--font-inter` aplicada en `app/layout.tsx` y overrides con `font-[family-name:var(--font-inter)]`).  
- Titulares: desde `text-3xl` hasta `text-8xl` en hero/consultor, con `font-bold` y `leading-tight`.  
- Cuerpo: `text-base`/`text-lg` en párrafos; copy de listas `text-sm` o `text-xs uppercase` para badges y notas.  
- Labels y pequeñas ayudas usan `font-medium` y tracking ampliado (`tracking-wide`) en badges o destacadores (ej. `ContactSection`).

## Paleta de colores (hex si se encuentra)
- `--z-primary: #0B2A3C` (azul oscuro dominante en textos y bordes).  
- `--z-value: #2FBF71` (verde de valor/CTAs).  
- `--z-neutral: #6F7A83` (gris medio en párrafos).  
- `--z-white: #FFFFFF` (fondo y cards).  
- `--z-accent: #3FA9F5` (acento azul claro en algunos textos).  
- Gradiente `bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500` usado en botones `AiCtaButton`.  
- Cards y secciones dark (`CTAFinal`) usan fondo `#0B2A3C` con texto `gray-300`.  
- Sombras: `shadow-subtle 0 1px 2px rgba(11,42,60,0.04)` y `shadow-sm 0 2px 4px rgba(11,42,60,0.06)` moldeadas por variables.  

## Componentes repetidos (botones, cards, badges, etc.)
- `AiCtaButton` (degradado + glow + beta label) reutilizado en hero, navbar y consultor.  
- Botones normales (`LinkButton`, `Button`) usan clases `btn-primary/secondary/outline` definidas en `globals.css`.  
- `Card` (`card-flat`) aporta fondo blanco, padding `p-8`, `rounded-[var(--radius-lg)]`, borde y transición.  
- `Badge` con variantes `success/info/warning` (e.g. “Alto ROI”, “Valor ejecutivo”).  
- `Section` con variantes `white/gray/dark` y `narrow` toggles la anchura.  
- Formularios comparten clases `form-input`, `form-label`, y botones con foco visible.  
- `LogoLockup` (icono + wordmark) reusado en nav y footer, con `sizes` y `priority`.

# 4. Descripción por página (una subsección por página)
## Página: /
### Above the fold
- Hero (`Hero.tsx`): sección `pattern-grid` con fondo blanco y máximo `max-w-[1100px]`.  
- Título principal: “Convertimos los datos en decisiones” (`h1` en `text-3xl` a `text-8xl`, `leading-[1.1]`).  
- Subtítulo: “Ayudamos a líderes ejecutivos...” en gris `#6F7A83` y `text-lg`/`text-2xl`.  
- CTAs: `AiCtaButton` con texto “Habla con el Consultor IA” (gradient, `betaLabel="Beta"`, icono sparkles) y `LinkButton` “Habla con un experto” (botón `btn-primary` + flecha).  
- Layout: contenido alineado a la izquierda, espaciamiento amplio (`mb-6`, `gap-4`), sin imagen.

### Sección 1: Más allá del hype: Impacto Real
- Título centrado “Más allá del hype: Impacto Real” + párrafo `Nuestra metodología...`.  
- Grid `grid-cols-1 md:grid-cols-3` con cards centradas.  
- Cada card muestra icono emoji (`📊`, `🔒`, `⚙️`), título (`Estrategia ROI-First`, `Gobernanza Ética`, `Integración Legacy`) y copy explicativo.

### Sección 2: De datos dispersos a decisiones accionables
- Título centrado y grid `md:grid-cols-3` con tres pasos numerados dentro de círculos verdes (`1`, `2`, `3`).  
- Cada bloque tiene título (`Datos`, `Orden`, `Decisión`) y texto `Integramos datos...`, `Estructuramos...`, `Entregamos insights...`.

### Sección 3: Clientes con los que hemos trabajado
- Grid `grid-cols-1 lg:grid-cols-2` con dos cards (Cruz Verde + Colegio San Francisco de Machalí).  
- Cada card usa `Image` de `/images/icono_cruz_verde.png` y `/images/icono_colegio.jpeg`, encabezado, párrafo y lista de bullets (`Análisis de ventas...`, etc.).  
- Cards tienen hover `group-hover:text` y sombra `hover:shadow-md`.

### Sección 4: Casos de uso que implementamos
- Título “Casos de uso que implementamos” + subtítulo.  
- Grid responsivo `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` con seis cards y breve texto; algunos incluyen `Badge` (“Alto ROI”, “Valor ejecutivo”).

### Sección 5: ¿Listo para transformar sus datos en decisiones?
- Fondo oscuro (`Section variant="dark"`), texto centrado y CTA `LinkButton variant="secondary"` con texto “Solicitar consultoría gratuita”.  
- Subcopy “Sin compromisos • Soporte en español • Servicio personalizado”.

### Sección 6: Fundador / Nosotros (`?section=about` controla renderizado)
- Header con título “Fundador” y subtítulo “Conoce al creador detrás de zalantos”.  
- Card central (max width 700px) con avatar circular (emoji `👨‍💻`), nombre “Tomás Rodríguez”, cargo “Fundador & CTO” y párrafo sobre su background.  
- Sección de misión con título “Mi Misión” y párrafo extenso.

### Sección 7: Contacto (`?section=contact`)
- Layout `grid grid-cols-1 lg:grid-cols-2` con columna izquierda de propuesta de valor, columna derecha formulario.  
- Copy principal: “Transforma tus Datos en Decisiones Rentables” y descripción detallada.  
- Lista de beneficios con iconos `CheckIcon` (SVG) y textos:  
  - “Diagnóstico de quick wins en tus datos actuales”  
  - “Roadmap inicial con ROI estimado por iniciativa”  
  - “Documento con próximos pasos y recomendaciones”  
- Nota de confianza: “Respuesta en menos de 24 horas.”  
- Formulario con campos `Nombre completo`, `Empresa`, `Email corporativo`, `Contexto de tu empresa (opcional)`; placeholders exactos.  
- Botón “Solicitar sesión estratégica” / “Enviando solicitud…” y nota de privacidad “Tus datos son confidenciales...”  
- Mensajes de estado muestran cajas verdes/rojas según respuesta (clase condicional).  
- Inputs y textarea usan `border-gray-300`, foco verde, `disabled` states.

### Responsive
- Hero: `text-3xl` escala hasta `text-8xl`, `max-w` se mantiene, botones pasan de `flex-wrap` en mobile a `gap-4`.  
- Grids (Pillars, Process, Clients, UseCases) cambian de 1 columna en móviles a 2/3 columnas en `md/lg`.  
- Contact section cambia de `grid-cols-1` a `lg:grid-cols-2` y el formulario se extiende horizontalmente; botones ocupan `w-full`.  
- Navbar es horizontal en desktop; en mobile (“sm”) sólo muestra iconos + CTA icon-only; `Link` textual aparece en `lg`.  
- Footer se apila en una sola columna en móviles y se divide en 3 `md`.  

### Comportamiento
- Navbar es sticky con `pt-20` en `main` para evitar solaparse; `useSearchParams` mantiene `aria-current`.  
- No hay animaciones complejas en home más allá de `hover` en cards y botones.

## Página: /consultor-ia
### Above the fold
- Badge “Consultor IA · beta” en cápsula gradient `from-cyan-100 to-violet-100`.  
- Título “Consultor IA de Zalantos” (`text-5xl`) y párrafo “Resuelve tus dudas...” con `text-[#6F7A83]`.  
- Botones: `AiCtaButton` “Conversar ahora” (degradado) y `Link` `btn-secondary` “Habla con un experto”.  
- Dos tarjetas informativas (`Tiempo real`, `Privacidad`) con fondo gris claro y border `border-gray-200`.

### Sección 1: Panel del chat IA
- Layout `grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]`.  
- Columna derecha tiene una caja blanca redondeada con `shadow-2xl`, `border-gray-200` y mínimo `min-h-[520px]`.  
- Dentro resalta `AiChatWidget` (`src/components/chat/AiChatWidget.tsx`): título “Consultor AI Beta”, banners de rate limiting y errores, panel scrollable `max-h-[55vh]`, mensajes diferenciados (user en gradiente, assistant en gris) y animaciones `animate-bounce`/`animate-pulse` para el loader.  
- Input multiline con placeholder dinámico (“Escribe tu mensaje...” o “Espera Xs...”), botón gradient `from-cyan-500 to-violet-500` con texto “Enviar” y `disabled` según estado.  
- Botón “Resetear chat” aparece tras mensajes.

### Sección 2: Preferencia de contacto humano
- Texto “¿Prefieres hablar con un experto humano?” con link subrayado “Contáctanos aquí” apuntando a `/?section=contact`.

### Sección 3: LeadGate modal
- Componente `LeadGateModal` (`src/components/LeadGateModal.tsx`) aparece como overlay `fixed inset-0 bg-black/60` si `getLeadContext()` no existe.  
- El modal tiene título “Bienvenido al Consultor IA”, formulario con inputs para nombre, apellido, email y checkbox de consentimiento (link a `zalantos.com`), y botón `Registrarme`.  
- Muestra errores debajo de cada campo (ej. “Completa tu nombre”) y mensajes generales (p.ej. “Debes aceptar la política para continuar”).  
- Si ya se registró, aparece pequeño toast fijo “Ya estás registrado”.  

### Responsive
- Grid principal pasa de una sola columna en `md` a `lg:grid-cols-[0.95fr,1.05fr]`; la tarjeta del chat conserva `min-h` y `max-h` relativos a viewport.  
- Los cards informativos y botones se organizan en `flex-wrap gap-3` en mobile.  
- Modal ocupa el 100% del viewport en pantallas pequeñas gracias a `p-4` y `max-w-md`.  

### Comportamiento
- `useEffect` en `app/consultor-ia/page.tsx` invoca `window.scrollTo` al cargar y obtiene `getLeadContext()` para habilitar el chat.  
- `AiChatWidget` auto-guarda historial en `localStorage` (`zalantos_ai_chat_history`), auto-scrollea (`chatContainerRef.scrollTo`) y maneja rate limiting/errores con banners (líneas referenciadas).  
- Mensajes fallidos muestran botón “Reintentar (Beta)” que reenvía la carga.  
- El modal de lead se dispara cuando la API indica `registration_required` (`LeadGateModal` + `getErrorMapping`).  
- Los CTAs `AiCtaButton` animan con `hover:scale-105` y `shadow`.

## Página: /informe-apv-ventanas-oportunidades
### Above the fold
- Container `main` de altura `100vh` con iframe que ocupa `width:100% height:100% border:0`.  
- Título o copy depende del PDF embebido (no hay texto HTML aparte).

### Sección 1: Informe embebido
- Solo el iframe (`src="/informe-apv-ventanas-oportunidades/index.html"`) que carga un informe estático con scroll propio.  
- El layout no incluye header adicional; una importación simple.

### Responsive
- El iframe escala con la altura del `main`, no hay breakpoints adicionales.

## Página: /privacy
### Above the fold
- Header con “Política de privacidad” (caps `text-xs uppercase tracking-[0.4em]`), título principal “Confianza, transparencia...” y párrafo explicativo (mención Ley N° 19.628).  
- Layout en `max-w-3xl` centrado y `space-y-12`.

### Sección 1: Introducción y compromiso
- Título “1. Introducción y compromiso” y dos párrafos que mencionan domicilio y ámbito de aplicación.

### Sección 2: Definiciones clave
- Lista `dl` con términos (“Dato Personal”, “Dato Sensible”, “Tratamiento de Datos”, “Consultor AI”) y sus descripciones exactas.

### Sección 3: Datos que recopilamos
- Explica los tipos (3.1, 3.2, 3.3) con `ul` y un sub-bloque resaltado (`bg-[#f8fafc]`) para datos del Consultor AI, incluyendo recomendaciones de no ingresar info sensible.

### Secciones 4–11
- Cada sección numérica cubre fines del tratamiento, bases legales, inteligencia artificial, plazos de conservación, seguridad, derechos ARCO (`mención soporte@zalantos.com`), gestión de incidentes y modificaciones; todas con listas `list-disc`.

### Responsive
- Columnas únicas con `px-4 sm:px-6 lg:px-0`, el contenido se adapta mediante `space-y-4` y `leading-relaxed`.

# 5. CTAs y conversiones (solo inventario, no análisis)
- “Habla con el Consultor IA” → Hero (`Hero.tsx`, sección principal sobre datos), `href` `/consultor-ia`, botón `AiCtaButton` con `betaLabel="Beta"`.  
- “Habla con un experto” → Hero, `LinkButton variant="primary"`, apunta a `LINKS.contact` (`/?section=contact`).  
- “Consultor IA” → Navbar `AiCtaButton` (texto o icon-only) a `/consultor-ia`.  
- “Contacto” → Navbar botón `btn-secondary` en desktop (`/?section=contact`); en mobile botón circular verde con icono chat.  
- “Solicitar consultoría gratuita” → CTA final (`LinksButton variant="secondary"`) a `/?section=contact`.  
- “Conversar ahora” → `/consultor-ia`, `AiCtaButton` en la sección hero de la página.  
- “Habla con un experto” → consultor (`/consultor-ia`), botón `btn-secondary` hacia `/?section=contact`.  
- Formulario “Solicitar sesión estratégica” → `ContactSection`, botón `type="submit"` en el formulario, presenta estados “Enviando solicitud...” cuando `isSubmitting`.  
- “Registrarme” → `LeadGateModal`, botón `Button variant="primary"` que dispara `registerLead` (`src/components/LeadGateModal.tsx`).

# 6. Elementos visuales y assets
- Logo “zalantos” + isotipo (`/images/icono_zalantos_sf.png`) usado en nav y footer (`LogoLockup.tsx`).  
- Logos de clientes: `/images/icono_cruz_verde.png` y `/images/icono_colegio.jpeg` dentro de los cards de `Clients`.  
- Informe en iframe (`/informe-apv-ventanas-oportunidades/index.html`).  
- Iconos SVG definidos inline: casa/personas en nav, sparkles del botón IA, checkmark en `ContactSection`, badges de rate limiting y errores en `AiChatWidget`.  
- Gradient “AI” (`from-cyan-500 via-violet-500 to-fuchsia-500`) usado en `AiCtaButton` y botones de envío de chat.  
- Background pattern `pattern-grid` (lineas muy finas) reutilizado en hero.  
- Emojis de pasos y fundador (`📊`, `🔒`, `⚙️`, `👨‍💻`) para reforzar narrativa sin imágenes pesadas.

_No se ejecutaron pruebas; este análisis es descriptivo._