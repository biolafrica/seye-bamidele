export const config = {
  apiUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001',
  adminSecret: process.env.ADMIN_SECRET_KEY,
  isProduction: process.env.NODE_ENV === 'production',
};