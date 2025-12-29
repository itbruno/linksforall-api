import 'dotenv/config';
import * as z from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  NODE_ENV: z.enum(['development', 'production']).default('development')
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('ERROR: Invalid environment variables', _env.error.format);
  throw new Error('Invalid environment variables');
}

export const env = _env.data;
