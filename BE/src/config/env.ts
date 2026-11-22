import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// Root directory of BE project (resolved relative to this file)
const projectRoot = path.resolve(__dirname, '../../');

const resolveDir = (configuredPath: string | undefined, defaultDir: string): string => {
  if (!configuredPath) return path.join(projectRoot, defaultDir);
  return path.isAbsolute(configuredPath) ? configuredPath : path.join(projectRoot, configuredPath);
};

const rawAdmins = process.env.ADMIN_GMAIL || 'admin.luna@gmail.com';
const adminEmails = rawAdmins
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export const ENV = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'luna_handmade_galaxy_nebula_secret_key_2025',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  DATA_DIR: resolveDir(process.env.DATA_DIR, 'data'),
  UPLOAD_DIR: resolveDir(process.env.UPLOAD_DIR, 'uploads'),
  BASE_URL: process.env.BASE_URL || 'http://localhost:5000',
  ADMIN_GMAIL: rawAdmins,
  ADMIN_EMAILS: adminEmails,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'LunaCraft2025@',
};
