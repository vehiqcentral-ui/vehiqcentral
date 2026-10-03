import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { success, unauthorized, serverError } from '@/lib/api-helpers';
import { getAuthenticatedUser } from '@/lib/auth-helpers';

/**
 * GET /api/dashboard/stats
 *
 * Returns aggregated KPIs for the dashboard homepage.
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

    const [
      totalVehicles,
      totalValuations,
      valuationsThisMonth,
      activeFraudAlerts,
      lookupsThisMonth,
      lookupsToday,
      recentLookups,
      vehiclesByBrand,
      vehiclesByFuel,
      recentFraudAlerts,
    ] = await Promise.all([
      // Total vehicles in system
      prisma.vehicle.count(),

      // Total valuations ever
      prisma.valuation.count(),

      // Valuations this month
      prisma.valuation.count({
        where: { createdAt: { gte: startOfMonth } },
      }),

      // Active fraud alerts
      prisma.fraudAlert.count({
        where: { status: 'ACTIVE' },
      }),

      // Lookups this month (for the current user)
      prisma.vehicleLookup.count({
        where: {
          userId: user.userId,
          createdAt: { gte: startOfMonth },
        },
      }),

      // Lookups today
      prisma.vehicleLookup.count({
        where: {
          userId: user.userId,
          createdAt: { gte: startOfDay },
        },
      }),

      // Recent lookups with vehicle data (last 10)
      prisma.vehicleLookup.findMany({
        where: { userId: user.userId },
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: {
          vehicle: {
            select: {
              id: true,
              matricula: true,
              marca: true,
              modelo: true,
              version: true,
              fechaMatricula: true,
            },
          },
        },
      }),

      // Vehicles grouped by brand (top 10)
      prisma.vehicle.groupBy({
        by: ['marca'],
        _count: true,
        orderBy: { _count: { marca: 'desc' } },
        take: 10,
      }),

      // Vehicles grouped by fuel type
      prisma.vehicle.groupBy({
        by: ['combustible'],
        _count: true,
        where: { combustible: { not: null } },
        orderBy: { _count: { combustible: 'desc' } },
      }),

      // Recent fraud alerts (last 5)
      prisma.fraudAlert.findMany({
        where: { status: 'ACTIVE' },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          vehicle: {
            select: {
              matricula: true,
              marca: true,
              modelo: true,
            },
          },
        },
      }),
    ]);

    return success({
      kpis: {
        totalVehicles,
        totalValuations,
        valuationsThisMonth,
        activeFraudAlerts,
        lookupsThisMonth,
        lookupsToday,
      },
      recentActivity: recentLookups.map((l: typeof recentLookups[number]) => ({
        id: l.id,
        type: l.lookupType,
        source: l.source,
        createdAt: l.createdAt.toISOString(),
        vehicle: {
          id: l.vehicle.id,
          matricula: l.vehicle.matricula,
          marca: l.vehicle.marca,
          modelo: l.vehicle.modelo,
          version: l.vehicle.version,
          year: l.vehicle.fechaMatricula?.getFullYear() ?? null,
        },
      })),
      vehiclesByBrand: vehiclesByBrand.map((v: typeof vehiclesByBrand[number]) => ({
        brand: v.marca,
        count: v._count,
      })),
      vehiclesByFuel: vehiclesByFuel.map((v: typeof vehiclesByFuel[number]) => ({
        fuel: v.combustible,
        count: v._count,
      })),
      recentAlerts: recentFraudAlerts.map((a: typeof recentFraudAlerts[number]) => ({
        id: a.id,
        alertType: a.alertType,
        severity: a.severity,
        title: a.title,
        description: a.description,
        createdAt: a.createdAt.toISOString(),
        vehicle: {
          matricula: a.vehicle.matricula,
          marca: a.vehicle.marca,
          modelo: a.vehicle.modelo,
        },
      })),
    });
  } catch (err) {
    console.error('Dashboard stats error:', err);
    return serverError();
  }
}
