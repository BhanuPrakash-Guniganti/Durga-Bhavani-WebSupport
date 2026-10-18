import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('5000').transform((val) => parseInt(val, 10)),
  TRUST_PROXY: z
    .string()
    .default('1')
    .transform((val) => {
      const num = parseInt(val, 10);
      return Number.isNaN(num) ? val : num;
    }),
  MONGODB_URI: z.string().default('mongodb://127.0.0.1:27017/durga_bhavani_dodlapahad'),
  FRONTEND_ORIGIN: z.string().default('http://localhost:5173'),
  JWT_SECRET: z.string().default('development_insecure_jwt_secret_min_32_chars_long'),
  CLOUDINARY_CLOUD_NAME: z.string().optional().default(''),
  CLOUDINARY_API_KEY: z.string().optional().default(''),
  CLOUDINARY_API_SECRET: z.string().optional().default(''),
  ADMIN_ALLOWED_EMAILS: z.string().default('admin@durgabhavani-dodlapahad.org,admin@dodlapahad.org'),
  INITIAL_ADMIN_EMAIL: z.string().default('admin@durgabhavani-dodlapahad.org'),
  INITIAL_ADMIN_PASSWORD: z.string().default('DurgaBhavani@2025'),
  INITIAL_ADMIN_NAME: z.string().default('Super Administrator')
});

export const env = envSchema.parse(process.env);
