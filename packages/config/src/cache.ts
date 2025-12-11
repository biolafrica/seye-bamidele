import { NextResponse } from "next/server";

export function applyCacheHeaders(
  response: NextResponse,
  headers: Record<string, string>
) {
  Object.entries(headers).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

export const CACHE_TIMES = {
  YEAR: 31536000,
  MONTH: 2592000,
  WEEK: 604800,
  DAY: 86400,
  HOUR: 3600,
  MINUTE: 60,
} as const;

export const cacheHeaders = {
  // No caching at all
  noStore: {
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
  
  // Static assets (images, fonts, icons)
  staticLong: {
    'Cache-Control': `public, max-age=${CACHE_TIMES.YEAR}, immutable`,
  },
  
  // CSS and JS files
  staticMedium: {
    'Cache-Control': `public, max-age=${CACHE_TIMES.WEEK}, stale-while-revalidate=${CACHE_TIMES.DAY}`,
  },
  
  // Frequently changing API data
  apiShort: {
    'Cache-Control': `public, max-age=${CACHE_TIMES.MINUTE}, stale-while-revalidate=30`,
  },
  
  // Moderately changing data (articles, events)
  apiMedium: {
    'Cache-Control': `public, max-age=${CACHE_TIMES.MINUTE * 5}, stale-while-revalidate=${CACHE_TIMES.MINUTE * 2}`,
  },
  
  // Rarely changing data (categories, tags)
  apiLong: {
    'Cache-Control': `public, max-age=${CACHE_TIMES.HOUR}, stale-while-revalidate=${CACHE_TIMES.MINUTE * 30}`,
  },
  
  // User-specific data
  apiPrivate: {
    'Cache-Control': 'private, max-age=0, must-revalidate',
  },
  
  // Admin/authenticated routes
  authenticated: {
    'Cache-Control': 'private, no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
  },
  
  // Search results
  search: {
    'Cache-Control': `public, max-age=${CACHE_TIMES.MINUTE * 2}, stale-while-revalidate=${CACHE_TIMES.MINUTE}`,
  },

} as const;


export function customCache(maxAge: number, staleWhileRevalidate?: number) {
  const headers: Record<string, string> = {
    'Cache-Control': `public, max-age=${maxAge}`,
  };
  
  if (staleWhileRevalidate) {
    headers['Cache-Control'] += `, stale-while-revalidate=${staleWhileRevalidate}`;
  }
  
  return headers;
}

export function getCacheHeaders(type: keyof typeof cacheHeaders) {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // No caching in development
  if (isDevelopment) {
    return cacheHeaders.noStore;
  }
  
  return cacheHeaders[type];
}

export const nextJsCacheHeaders = {
  staticLong: [
    {
      key: "Cache-Control",
      value: "public, max-age=31536000, immutable"
    }
  ]
};