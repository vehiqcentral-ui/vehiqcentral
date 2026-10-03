import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { unauthorized, forbidden } from '@/lib/api-helpers';
import type { NextRequest } from 'next/server';

/**
 * Get the current authenticated session or null.
 */
export async function getSession() {
  return getServerSession(authOptions);
}

/**
 * Require an authenticated session. Returns the session or a 401 response.
 */
export async function requireAuth() {
  const session = await getSession();
  if (!session?.user?.id) {
    return { session: null, error: unauthorized() };
  }
  return { session, error: null };
}

/**
 * Require a specific role. Returns the session or a 403 response.
 */
export async function requireRole(role: string | string[]) {
  const { session, error } = await requireAuth();
  if (error) return { session: null, error };

  const roles = Array.isArray(role) ? role : [role];
  if (!roles.includes(session!.user.role)) {
    return { session: null, error: forbidden('Rol insuficiente para esta acción') };
  }
  return { session: session!, error: null };
}

/**
 * Validate an API key from the request header.
 * Returns the API key record with user and organization info, or null.
 */
export async function validateApiKey(req: NextRequest) {
  const key = req.headers.get('x-api-key') || extractBearer(req);
  if (!key) return null;

  const apiKey = await prisma.apiKey.findUnique({
    where: { key },
    include: {
      user: {
        select: { id: true, role: true, plan: true, organizationId: true },
      },
    },
  });

  if (!apiKey || !apiKey.active) return null;

  // Update last used timestamp
  await prisma.apiKey.update({
    where: { id: apiKey.id },
    data: { lastUsedAt: new Date() },
  });

  // Log usage
  await prisma.apiUsageLog.create({
    data: {
      apiKeyId: apiKey.id,
      endpoint: req.nextUrl.pathname,
      method: req.method,
      statusCode: 200, // Will be updated if needed
      ip: req.headers.get('x-forwarded-for')?.split(',')[0] ?? null,
    },
  });

  return apiKey;
}

/**
 * Get the authenticated user — either via session (dashboard) or API key (external).
 */
export async function getAuthenticatedUser(req: NextRequest) {
  // Try session first (dashboard users)
  const session = await getSession();
  if (session?.user?.id) {
    return {
      userId: session.user.id,
      role: session.user.role,
      plan: session.user.plan,
      organizationId: session.user.organizationId,
      source: 'session' as const,
    };
  }

  // Try API key (external integrations)
  const apiKey = await validateApiKey(req);
  if (apiKey) {
    return {
      userId: apiKey.user.id,
      role: apiKey.user.role,
      plan: apiKey.user.plan,
      organizationId: apiKey.user.organizationId,
      source: 'api_key' as const,
    };
  }

  return null;
}

function extractBearer(req: NextRequest): string | null {
  const header = req.headers.get('authorization');
  if (header?.startsWith('Bearer ')) return header.slice(7);
  return null;
}
