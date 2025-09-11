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