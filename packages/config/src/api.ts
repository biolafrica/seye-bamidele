export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  timeout: 10000,
  retries: 3,
  

  rateLimit: {
    public: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // requests per window
    },
    authenticated: {
      windowMs: 15 * 60 * 1000,
      max: 1000,
    },
  },
  
  pagination: {
    defaultLimit: 10,
    maxLimit: 100,
  },
};