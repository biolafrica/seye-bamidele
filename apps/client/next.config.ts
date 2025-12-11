import { nextJsCacheHeaders } from "@seye-bamidele/config";
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
  
  headers: async () => [
    {
      source: "/_next/static/:path*",
      headers: nextJsCacheHeaders.staticLong
    }
  ]

};

export default nextConfig;