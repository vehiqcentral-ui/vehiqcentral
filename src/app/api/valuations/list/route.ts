import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import {
  success,
  error,
  unauthorized,
  serverError,
  parseQuery,
  paginationSchema,
  paginate,
} from '@/lib/api-helpers';
import { getAuthenticatedUser } from '@/lib/auth-helpers';

const listSchema = paginationSchema.extend({
  q: z.string().optional(),
});

type ListQuery = z.infer<typeof listSchema>;

/**
 * GET /api/valuations/list?page=1&perPage=20&q=BMW
 *
 * List recent valuations with vehicle data.
 */
export async function GET(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return unauthorized('Autenticacion requerida');
    }

    const raw = parseQuery(req, listSchema);
    const query = raw as Required<Pick<ListQuery, 'page' | 'perPage'>> & Omit<ListQuery, 'page' | 'perPage'>;
    const page = query.page;
    const perPage = query.perPage;
    const { skip, take } = paginate(page, perPage);

    // Build where clause
    const where: Record<string, unknown> = {};

    // Scope to current user's valuations
    where.userId = user.userId;

    if (query.q) {
      where.vehicle = {
        OR: [
          { matricula: { contains: query.q, mode: 'insensitive' } },
          { marca: { contains: query.q, mode: 'insensitive' } },
          { modelo: { contains: query.q, mode: 'insensitive' } },
        ],
      };
    }

    const [valuations, total, todayCount, monthCount] = await Promise.all([
      prisma.valuation.findMany({
        where,
        select: {
          id: true,
          mileage: true,
          condition: true,
          valuationLow: true,
          valuationMid: true,
          valuationHigh: true,
          confidence: true,
          marketTrend: true,
          avgListingPrice: true,
          createdAt: true,
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
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      prisma.valuation.count({ where }),
      prisma.valuation.count({
        where: {
          userId: user.userId,
          createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
        },
      }),
      prisma.valuation.count({
        where: {
          userId: user.userId,
          createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) },
        },
      }),
    ]);

    return success({
      valuations: valuations.map((v: typeof valuations[number]) => ({
        id: v.id,
        matricula: v.vehicle.matricula,
        vehicleName: `${v.vehicle.marca} ${v.vehicle.modelo} ${v.vehicle.version ?? ''}`.trim(),
        year: v.vehicle.fechaMatricula?.getFullYear() ?? null,
        vehicleId: v.vehicle.id,
        mileage: v.mileage,
        condition: v.condition,
        valuationLow: v.valuationLow,
        valuationMid: v.valuationMid,
        valuationHigh: v.valuationHigh,
        confidence: v.confidence,
        marketTrend: v.marketTrend,
        avgListingPrice: v.avgListingPrice,
        createdAt: v.createdAt.toISOString(),
      })),
      stats: {
        today: todayCount,
        thisMonth: monthCount,
        total,
      },
      pagination: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return error('VALIDATION_ERROR', 'Parametros no validos', 400);
    }
    console.error('Valuations list error:', err);
    return serverError();
  }
}
