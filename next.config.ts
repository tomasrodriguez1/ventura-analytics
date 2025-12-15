import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Activar react strict mode para mejor debugging en desarrollo
  reactStrictMode: true,
  
  // Optimizaciones de imágenes
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 768, 1024, 1280, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
