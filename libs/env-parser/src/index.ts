import { z } from 'zod';
import type { DatabaseConfig, ServerConfig, AuthConfig } from '@testwelbi/types';

// Base environment parser
export function parseEnv<T>(schema: z.ZodSchema<T>, env: Record<string, string | undefined> = process.env): T {
  try {
    return schema.parse(env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join('\n');
      throw new Error(`Environment validation failed:\n${formattedErrors}`);
    }
    throw error;
  }
}

// Common environment schemas
export const databaseConfigSchema = z.object({
  DATABASE_URL: z.string().refine(
    (url) => url.startsWith('postgresql://') || url.startsWith('sqlite:') || url.endsWith('.sqlite') || url.endsWith('.db'),
    { message: "DATABASE_URL must be a valid PostgreSQL URL or SQLite file path" }
  ),
  DATABASE_MAX_CONNECTIONS: z.coerce.number().int().positive().optional().default(10),
  DATABASE_DEBUG: z.coerce.boolean().optional().default(false),
}).transform((env): DatabaseConfig => ({
  url: env.DATABASE_URL,
  maxConnections: env.DATABASE_MAX_CONNECTIONS,
  debug: env.DATABASE_DEBUG,
}));

export const serverConfigSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  HOST: z.string().optional().default('0.0.0.0'),
  CORS_ORIGIN: z.string().optional(),
  CORS_CREDENTIALS: z.coerce.boolean().optional().default(true),
}).transform((env): ServerConfig => ({
  port: env.PORT,
  host: env.HOST,
  cors: env.CORS_ORIGIN ? {
    origin: env.CORS_ORIGIN.split(','),
    credentials: env.CORS_CREDENTIALS,
  } : undefined,
}));

export const authConfigSchema = z.object({
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('15m'),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default('7d'),
}).transform((env): AuthConfig => ({
  jwtSecret: env.JWT_SECRET,
  jwtExpiresIn: env.JWT_EXPIRES_IN,
  refreshTokenExpiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
}));

// Development/Production detection
export const nodeEnvSchema = z.enum(['development', 'test', 'production']).default('development');

// Convenience functions
export function parseDatabaseConfig(env?: Record<string, string | undefined>): DatabaseConfig {
  return databaseConfigSchema.parse(env || process.env);
}

export function parseServerConfig(env?: Record<string, string | undefined>): ServerConfig {
  return serverConfigSchema.parse(env || process.env);
}

export function parseAuthConfig(env?: Record<string, string | undefined>): AuthConfig {
  return authConfigSchema.parse(env || process.env);
}

export function parseNodeEnv(env?: Record<string, string | undefined>): 'development' | 'test' | 'production' {
  const result = z.object({ NODE_ENV: nodeEnvSchema }).parse(env || process.env);
  return result.NODE_ENV;
}

// Utility to check if running in development
export function isDevelopment(env?: Record<string, string | undefined>): boolean {
  return parseNodeEnv(env) === 'development';
}

// Utility to check if running in production
export function isProduction(env?: Record<string, string | undefined>): boolean {
  return parseNodeEnv(env) === 'production';
}

// Utility to check if running in test
export function isTest(env?: Record<string, string | undefined>): boolean {
  return parseNodeEnv(env) === 'test';
} 