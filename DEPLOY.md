# Guía de Deployment en Render.com

## 📋 Requisitos Previos

- Cuenta en [Render.com](https://render.com)
- Repositorio de Git con el código del proyecto
- Base de datos PostgreSQL configurada

## 🚀 Pasos para el Deployment

### 1. Configurar el Servicio Web en Render

1. Conecta tu repositorio de Git a Render
2. Crea un nuevo **Web Service**
3. Configura los siguientes parámetros:

**Build Settings:**
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Node Version:** `18.x` o superior

**Environment Variables:**
- `DATABASE_URL`: Tu URL de conexión PostgreSQL
- `NODE_ENV`: `production`

### 2. Variables de Entorno Requeridas

```bash
# Base de datos PostgreSQL
DATABASE_URL=postgresql://usuario:password@host:port/database

# Configuración de Node.js
NODE_ENV=production
```

### 3. Configuración de la Base de Datos

El proyecto está configurado para usar PostgreSQL con las siguientes características:

- **SSL habilitado** con `rejectUnauthorized: false` (necesario para Render)
- **Connection pooling** para mejor rendimiento
- **Fallback a datos de ejemplo** si la conexión falla

### 4. Estructura del Proyecto

```
ventura-analytics/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   └── DashboardMinero/   # Dashboard principal
├── src/
│   ├── components/        # Componentes React
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilidades y configuración DB
│   ├── services/         # Servicios de datos
│   └── types/            # Definiciones TypeScript
├── package.json          # Dependencias
└── next.config.ts        # Configuración Next.js
```

### 5. Comandos Importantes

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar en producción
npm start

# Linting
npm run lint
```

### 6. Features Implementadas

- ✅ Dashboard interactivo con 4 tabs principales
- ✅ Conexión PostgreSQL con fallback a datos de ejemplo
- ✅ Gráficos personalizados con CSS/SVG
- ✅ Modales interactivos para detalles
- ✅ Botón manual de actualización (sin auto-refresh)
- ✅ Diseño responsive con Tailwind CSS
- ✅ TypeScript para type safety

### 7. Troubleshooting

**Error de conexión a DB:**
- Verificar que `DATABASE_URL` esté configurada correctamente
- El sistema usa datos de ejemplo automáticamente si falla la conexión

**Error de build:**
- Verificar que todas las dependencias estén en `package.json`
- Ejecutar `npm run lint` para verificar errores de código

**Performance:**
- El proyecto usa connection pooling para optimizar conexiones DB
- Las imágenes están optimizadas automáticamente por Next.js

## 📱 URLs del Proyecto

- **Página principal:** `/`
- **Dashboard Minero:** `/DashboardMinero`
- **Demo Call Center:** `/CallCenterDemo`
- **Demo Retail:** `/RetailDemo`

## 🔧 Mantenimiento

Para actualizar el proyecto:

1. Hacer push de los cambios al repositorio
2. Render detectará automáticamente los cambios
3. Se ejecutará un nuevo build automáticamente
4. El servicio se reiniciará con la nueva versión

## 🎯 Consideraciones de Producción

- **Base de datos:** Configurada para Render PostgreSQL
- **SSL:** Habilitado para conexiones seguras
- **Environment:** Variables de entorno para configuración
- **Logging:** Logs detallados para debugging
- **Error handling:** Fallbacks robustos implementados
