export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  isProduction: process.env.NODE_ENV === 'production',
};