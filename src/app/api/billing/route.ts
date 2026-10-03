import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  success,
  error,
  unauthorized,
  serverError,
} from '@/lib/api-helpers';
import { getSession } from '@/lib/auth-helpers';

/**
 * GET /api/billing
 *
 * Returns subscription, usage quotas, and plan info for the authenticated user's org.
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return unauthorized('Autenticacion requerida');
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        plan: true,
        organizationId: true,
        organization: {
          select: {
            plan: true,
            subscription: true,
          },
        },
      },
    });

    if (!user) {
      return unauthorized('Usuario no encontrado');
    }

    const sub = user.organization?.subscription;
    const plan = user.organization?.plan ?? user.plan;

    // Count actual usage from DB
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [reportCount, valuationCount, lookupCount] = await Promise.all([
      prisma.report.count({
        where: {
          userId: session.user.id,
          createdAt: { gte: startOfMonth },
        },
      }),
      prisma.valuation.count({
        where: {
          userId: session.user.id,
          createdAt: { gte: startOfMonth },
        },
      }),
      prisma.vehicleLookup.count({
        where: {
          userId: session.user.id,
          createdAt: { gte: startOfMonth },
        },
      }),
    ]);

    // Plan quotas (these would come from a config in production)
    const planQuotas: Record<string, { reports: number; valuations: number; lookups: number; apiCalls: number }> = {
      FREE: { reports: 5, valuations: 10, lookups: 25, apiCalls: 100 },
      STARTER: { reports: 50, valuations: 100, lookups: 250, apiCalls: 5000 },
      PROFESSIONAL: { reports: 500, valuations: 1000, lookups: 2500, apiCalls: 50000 },
      ENTERPRISE: { reports: -1, valuations: -1, lookups: -1, apiCalls: -1 }, // unlimited
    };

    const quotas = planQuotas[plan] ?? planQuotas.FREE;

    return success({
      plan,
      subscription: sub
        ? {
            status: sub.status,
            currentPeriodEnd: sub.currentPeriodEnd?.toISOString() ?? null,
            cancelAtEnd: sub.cancelAtEnd,
            lookupQuota: sub.lookupQuota,
            lookupUsed: sub.lookupUsed,
            apiCallQuota: sub.apiCallQuota,
            apiCallUsed: sub.apiCallUsed,
          }
        : null,
      usage: {
        reports: { used: reportCount, limit: quotas.reports },
        valuations: { used: valuationCount, limit: quotas.valuations },
        lookups: { used: lookupCount, limit: quotas.lookups },
        apiCalls: { used: sub?.apiCallUsed ?? 0, limit: sub?.apiCallQuota ?? quotas.apiCalls },
      },
    });
  } catch (err) {
    console.error('Billing GET error:', err);
    return serverError();
  }
}
