import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Desactivar react strict mode para evitar re-renders dobles
  reactStrictMode: false,
  
  // Configuración mínima para desactivar auto-refresh sin romper webpack
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Solo desactivar watch polling para reducir auto-refresh
      config.watchOptions = {
        poll: false,
        ignored: /node_modules/,
      };
    }
    return config;
  },
};

export default nextConfig;
