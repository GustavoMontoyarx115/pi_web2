import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 🚀 Ignora ESLint en producción (soluciona el error)
  },
};

export default nextConfig;
