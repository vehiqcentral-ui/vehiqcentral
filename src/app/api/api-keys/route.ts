import { NextRequest } from 'next/server';
import { z } from 'zod';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import {
  success,
  error,
  unauthorized,
  serverError,
} from '@/lib/api-helpers';
import { getAuthenticatedUser } from '@/lib/auth-helpers';

/**
 * GET /api/api-keys
 *
 * List all API keys for the authenticated user, with usage counts.
 */
export async function GET(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return unauthorized('Autenticacion requerida');
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const keys = await prisma.apiKey.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { usageLogs: true },
        },
      },
    });

    // Get aggregate usage stats for this user's keys
    const keyIds = keys.map((k: typeof keys[number]) => k.id);

    const [todayCalls, monthCalls] = keyIds.length > 0
      ? await Promise.all([
          prisma.apiUsageLog.count({
            where: { apiKeyId: { in: keyIds }, createdAt: { gte: startOfDay } },
          }),
          prisma.apiUsageLog.count({
            where: { apiKeyId: { in: keyIds }, createdAt: { gte: startOfMonth } },
          }),
        ])
      : [0, 0];

    const activeCount = keys.filter((k: typeof keys[number]) => k.active).length;

    return success({
      keys: keys.map((k: typeof keys[number]) => ({
        id: k.id,
        name: k.name,
        // Only show first 12 and last 4 chars
        keyPreview: `${k.key.substring(0, 12)}...${k.key.substring(k.key.length - 4)}`,
        active: k.active,
        rateLimit: k.rateLimit,
        permissions: k.permissions,
        expiresAt: k.expiresAt?.toISOString() ?? null,
        lastUsedAt: k.lastUsedAt?.toISOString() ?? null,
        totalCalls: k._count.usageLogs,
        createdAt: k.createdAt.toISOString(),
      })),
      stats: {
        activeKeys: activeCount,
        callsToday: todayCalls,
        callsThisMonth: monthCalls,
      },
    });
  } catch (err) {
    console.error('API keys list error:', err);
    return serverError();
  }
}

const createSchema = z.object({
  name: z.string().min(1).max(100),
  permissions: z.array(z.string()).default(['read']),
  rateLimit: z.number().int().min(10).max(100000).default(1000),
});

/**
 * POST /api/api-keys
 *
 * Create a new API key. Returns the full key only once.
 */
export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return unauthorized('Autenticacion requerida');
    }

    const body = await req.json();
    const data = createSchema.parse(body);

    // Generate a secure API key
    const rawKey = `vhq_${crypto.randomBytes(24).toString('hex')}`;

    const apiKey = await prisma.apiKey.create({
      data: {
        key: rawKey,
        name: data.name,
        userId: user.userId,
        permissions: data.permissions,
        rateLimit: data.rateLimit,
      },
    });

    return success({
      id: apiKey.id,
      name: apiKey.name,
      key: rawKey, // Full key shown only on creation
      active: apiKey.active,
      rateLimit: apiKey.rateLimit,
      permissions: apiKey.permissions,
      createdAt: apiKey.createdAt.toISOString(),
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return error('VALIDATION_ERROR', 'Parametros no validos', 400);
    }
    console.error('API key create error:', err);
    return serverError();
  }
}
