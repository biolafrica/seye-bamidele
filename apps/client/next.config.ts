import { nextJsCacheHeaders } from "@seye-bamidele/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rdhymzuvqukzziqbcunt.supabase.co',
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