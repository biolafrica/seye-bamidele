import { nextJsCacheHeaders } from "@seye-bamidele/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true
  },
  headers: async () => [
    {
      source: "/_next/static/:path*",
      headers: nextJsCacheHeaders.staticLong
    }
  ]
};

export default nextConfig;