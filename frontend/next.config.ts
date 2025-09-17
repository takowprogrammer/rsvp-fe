import type { NextConfig } from "next";

const backendUrl = new URL(process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000');

const nextConfig: NextConfig = {
  // Enable static exports for better deployment compatibility
  output: 'standalone',

  // Disable strict mode for deployment
  reactStrictMode: false,

  // Handle image optimization
  images: {
    // Allow optimized loading for local/public images only
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/invitations/**',
      },
      {
        protocol: 'https',
        hostname: '*.vercel.app',
        pathname: '/api/invitations/image/**',
      },
    ],
  },

  // Handle static file serving
  async headers() {
    return [
      {
        source: '/photos/story/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;