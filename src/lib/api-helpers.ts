import { NextRequest, NextResponse } from 'next/server';
import { z, ZodSchema } from 'zod';
import type { ApiResponse, ApiError } from '@/types/api';

// --- Standard API response helpers ---

export function success<T>(data: T, status = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, data }, { status });
}

export function error(
  code: string,
  message: string,
  status = 400,
  details?: Record<string, string[]>
): NextResponse<ApiResponse<never>> {
  const err: ApiError = { code, message, ...(details && { details }) };
  return NextResponse.json({ success: false, error: err }, { status });
}

export function notFound(message = 'Resource not found') {
  return error('NOT_FOUND', message, 404);
}

export function unauthorized(message = 'Authentication required') {
  return error('UNAUTHORIZED', message, 401);
}

export function forbidden(message = 'Insufficient permissions') {
  return error('FORBIDDEN', message, 403);
}

export function rateLimited(message = 'Rate limit exceeded') {
  return error('RATE_LIMITED', message, 429);
}

export function serverError(message = 'Internal server error') {
  return error('INTERNAL_ERROR', message, 500);
}

// --- Input validation ---

export async function parseBody<T>(req: NextRequest, schema: ZodSchema<T>): Promise<T> {
  const body = await req.json();
  return schema.parse(body);
}

export function parseQuery<T>(req: NextRequest, schema: ZodSchema<T>): T {
  const params = Object.fromEntries(req.nextUrl.searchParams.entries());
  return schema.parse(params);
}

// --- Pagination ---

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().min(1).max(100).default(20),
});

export type PaginationParams = z.infer<typeof paginationSchema>;

export function paginate(page: number, perPage: number) {
  return {
    skip: (page - 1) * perPage,
    take: perPage,
  };
}

// --- API Key extraction ---

export function extractApiKey(req: NextRequest): string | null {
  const header = req.headers.get('x-api-key');
  if (header) return header;

  const bearer = req.headers.get('authorization');
  if (bearer?.startsWith('Bearer ')) return bearer.slice(7);

  return null;
}
