import dotenv from 'dotenv';

dotenv.config();

const toNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const env = {
  port: toNumber(process.env.PORT, 3001),
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  appUrl: process.env.APP_URL || 'http://localhost:3001',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  uploadDir: process.env.UPLOAD_DIR || 'uploads',
};

if (!env.databaseUrl) {
  throw new Error('DATABASE_URL nao configurada.');
}

if (!env.jwtSecret) {
  throw new Error('JWT_SECRET nao configurado.');
}
