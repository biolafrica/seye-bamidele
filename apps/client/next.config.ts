import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xzarjtbowlqapykhzjyr.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;