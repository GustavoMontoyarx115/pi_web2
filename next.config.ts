import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 🚀 Ignora ESLint en producción
  },
  experimental: {
    optimizeCss: false, // ⚙️ Desactiva LightningCSS que causa el error en Vercel
  },
};

export default nextConfig;
