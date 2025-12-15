# 📦 Guía de Despliegue Estático (cPanel / BanaHosting)

Este proyecto está configurado para generar un **sitio estático** que se puede desplegar en cualquier hosting que soporte archivos estáticos (cPanel, BanaHosting, etc.).

---

## ✅ Configuración Realizada

El proyecto ha sido configurado con:

- ✅ **Export estático** (`output: "export"` en `next.config.ts`)
- ✅ **Imágenes sin optimización** (`images: { unoptimized: true }`)
- ✅ **Trailing slash** (`trailingSlash: true`) para compatibilidad con Apache
- ✅ **API routes eliminadas** (incompatibles con export estático)
- ✅ **Navegación client-side** (compatible con export estático)

---

## 🚀 Pasos para Build y Despliegue

### 1. Preparar el Entorno

Asegúrate de tener Node.js instalado (versión 18 o superior):

```bash
node --version  # Debe ser v18 o superior
```

### 2. Instalar Dependencias

```bash
npm ci
```

> **Nota:** `npm ci` instala las dependencias exactas del `package-lock.json`. Si prefieres, puedes usar `npm install`, pero `npm ci` es más rápido y confiable para producción.

### 3. Generar Build Estático

```bash
npm run build
```

Este comando:
- Compila el proyecto
- Genera la carpeta **`out/`** con todos los archivos estáticos listos para desplegar

### 4. Verificar la Carpeta `out/`

Después del build, deberías ver una carpeta `out/` en la raíz del proyecto con:
- `index.html`
- `_next/` (archivos estáticos de Next.js)
- `images/` (imágenes de `public/`)
- `robots.txt`
- `sitemap.xml`
- Y otros archivos estáticos necesarios

---

## 📤 Desplegar en cPanel / BanaHosting

### Opción 1: File Manager (Recomendado)

1. **Accede a cPanel** de tu hosting (BanaHosting)
2. **Abre File Manager**
3. **Navega a `public_html/`** (o la carpeta raíz de tu dominio)
4. **Elimina archivos existentes** (si hay):
   - `index.html` (si existe)
   - `default.htm` (si existe)
   - Cualquier otro archivo que no necesites
5. **Sube el contenido de `out/`**:
   - Selecciona **todos los archivos y carpetas** dentro de `out/`
   - Súbelos a `public_html/`
   - **Importante:** Sube el **contenido** de `out/`, no la carpeta `out/` misma

### Opción 2: FTP / SFTP

1. **Conecta** a tu servidor vía FTP/SFTP
2. **Navega a `public_html/`**
3. **Elimina archivos existentes** (si hay)
4. **Sube el contenido de `out/`** a `public_html/`

### Estructura Final en `public_html/`

```
public_html/
├── index.html
├── robots.txt
├── sitemap.xml
├── _next/
│   ├── static/
│   └── ...
├── images/
│   ├── favicon.ico
│   ├── icono_cruz_verde.png
│   └── icono_colegio.jpeg
└── ...
```

---

## ⚠️ Cambios Realizados para Export Estático

### Archivos Modificados

1. **`next.config.ts`**
   - Agregado `output: "export"`
   - Agregado `trailingSlash: true`
   - Cambiado `images` a `{ unoptimized: true }`

2. **`app/page.tsx`**
   - Convertido a Client Component (`'use client'`)
   - Cambiado de `searchParams` (servidor) a `useSearchParams()` (cliente)
   - Envuelto en `Suspense` para compatibilidad

3. **`app/api/contact/route.ts`** ❌ **ELIMINADO**
   - Incompatible con export estático
   - El formulario ahora llama directamente al webhook de N8N desde el cliente

### Funcionalidades que Siguen Funcionando

✅ **Formulario de contacto**: Llama directamente al webhook de N8N desde el navegador  
✅ **Navegación entre secciones**: Funciona con query params (`/?section=about`)  
✅ **Imágenes**: Se sirven directamente sin optimización  
✅ **SEO**: `robots.txt` y `sitemap.xml` se generan estáticamente  

### Limitaciones del Export Estático

❌ **No hay API routes**: No se pueden usar `/api/*`  
❌ **No hay SSR**: Todo se genera estáticamente en build time  
❌ **No hay ISR**: No hay regeneración incremental  
❌ **Imágenes sin optimización**: Se sirven tal cual están en `public/`  

---

## 🔍 Verificación Post-Despliegue

Después de subir los archivos, verifica:

1. **Página principal**: `https://tudominio.com/`
2. **Sección About**: `https://tudominio.com/?section=about`
3. **Sección Contact**: `https://tudominio.com/?section=contact`
4. **Formulario de contacto**: Debe enviar datos al webhook de N8N
5. **Imágenes**: Deben cargar correctamente
6. **Navegación**: Los links del navbar deben funcionar

---

## 🛠️ Troubleshooting

### Error: "404 Not Found" en rutas

- Verifica que subiste **todo el contenido** de `out/` a `public_html/`
- Verifica que `trailingSlash: true` está activado (ya está configurado)
- Algunos servidores requieren `.htaccess` para routing. Si es necesario, crea uno:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Error: Imágenes no cargan

- Verifica que la carpeta `images/` está en `public_html/images/`
- Verifica permisos de archivos (644 para archivos, 755 para carpetas)

### Error: Formulario no envía

- Verifica la consola del navegador para errores CORS
- El webhook de N8N debe aceptar peticiones desde el dominio desplegado
- Verifica que la URL del webhook en `contactService.ts` es correcta

---

## 📝 Comandos Rápidos

```bash
# Build completo
npm ci && npm run build

# Verificar contenido de out/
ls -la out/

# (Opcional) Probar localmente el export estático
npx serve out/
```

---

## 📚 Referencias

- [Next.js Static Export Documentation](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [cPanel File Manager Guide](https://www.cpanel.net/support/docs/file-manager/)

---

**Última actualización:** Diciembre 2025  
**Versión Next.js:** 15.1.6
