import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Activar react strict mode para mejor debugging en desarrollo
  reactStrictMode: true,
  
  // ⚠️ CONFIGURACIÓN PARA EXPORT ESTÁTICO (cPanel/BanaHosting)
  // Genera carpeta 'out/' lista para subir a public_html
  output: "export",
  
  // Trailing slash recomendado para Apache/cPanel
  trailingSlash: true,
  
  // Desactivar optimización de imágenes (requerido para export estático)
  // Las imágenes se servirán directamente sin procesamiento del servidor
  images: {
    unoptimized: true,
  },
  
  // Configuración de webpack para optimización
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Optimizaciones de producción
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
      };
    }
    return config;
  },
};

export default nextConfig;
