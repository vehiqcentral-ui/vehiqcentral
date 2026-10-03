import { RateLimiterMemory } from 'rate-limiter-flexible';

// In production, use RateLimiterRedis with ioredis
const rateLimiters = new Map<string, RateLimiterMemory>();

export function getRateLimiter(key: string, points: number, duration: number) {
  if (!rateLimiters.has(key)) {
    rateLimiters.set(
      key,
      new RateLimiterMemory({ keyPrefix: key, points, duration })
    );
  }
  return rateLimiters.get(key)!;
}

// Default API rate limiter: 60 requests per minute
export const apiLimiter = getRateLimiter('api', 60, 60);

// Lookup rate limiter: tied to user plan
export const lookupLimiter = getRateLimiter('lookup', 100, 3600);

// Auth rate limiter: 5 attempts per 15 minutes
export const authLimiter = getRateLimiter('auth', 5, 900);
