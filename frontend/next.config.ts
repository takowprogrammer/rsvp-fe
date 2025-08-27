import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static exports for better deployment compatibility
  output: 'standalone',

  // Disable strict mode for deployment
  reactStrictMode: false,

  // Handle image optimization
  images: {
    unoptimized: true,
  },
};

export default nextConfig;