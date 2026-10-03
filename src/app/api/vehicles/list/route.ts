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
  marca: z.string().optional(),
  combustible: z.string().optional(),
  provinciaActual: z.string().optional(),
  yearFrom: z.coerce.number().int().optional(),
  yearTo: z.coerce.number().int().optional(),
  sort: z.enum(['matricula', 'marca', 'fechaMatricula', 'createdAt']).default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
});

type ListQuery = z.infer<typeof listSchema>;

/**
 * GET /api/vehicles/list?q=BMW&page=1&perPage=20
 *
 * Browse / search vehicles with pagination and filters.
 */
export async function GET(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return unauthorized('Autenticacion requerida');
    }

    const raw = parseQuery(req, listSchema);
    const query = raw as Required<Pick<ListQuery, 'page' | 'perPage' | 'sort' | 'order'>> & Omit<ListQuery, 'page' | 'perPage' | 'sort' | 'order'>;
    const page = query.page;
    const perPage = query.perPage;
    const { skip, take } = paginate(page, perPage);

    // Build dynamic where clause
    const where: Record<string, unknown> = {};

    if (query.q) {
      where.OR = [
        { matricula: { contains: query.q, mode: 'insensitive' } },
        { vin: { contains: query.q, mode: 'insensitive' } },
        { marca: { contains: query.q, mode: 'insensitive' } },
        { modelo: { contains: query.q, mode: 'insensitive' } },
      ];
    }

    if (query.marca) {
      where.marca = { equals: query.marca, mode: 'insensitive' };
    }

    if (query.combustible) {
      where.combustible = query.combustible;
    }

    if (query.provinciaActual) {
      where.provinciaActual = query.provinciaActual;
    }

    if (query.yearFrom || query.yearTo) {
      where.fechaMatricula = {};
      if (query.yearFrom) {
        (where.fechaMatricula as Record<string, unknown>).gte = new Date(query.yearFrom, 0, 1);
      }
      if (query.yearTo) {
        (where.fechaMatricula as Record<string, unknown>).lte = new Date(query.yearTo, 11, 31);
      }
    }

    const [vehicles, total] = await Promise.all([
      prisma.vehicle.findMany({
        where,
        select: {
          id: true,
          matricula: true,
          vin: true,
          marca: true,
          modelo: true,
          version: true,
          combustible: true,
          potenciaCv: true,
          color: true,
          fechaMatricula: true,
          provinciaActual: true,
          dgtStatus: true,
          createdAt: true,
          _count: {
            select: {
              fraudAlerts: { where: { status: 'ACTIVE' } },
              valuations: true,
              histories: true,
            },
          },
        },
        orderBy: { [query.sort as string]: query.order },
        skip,
        take,
      }),
      prisma.vehicle.count({ where }),
    ]);

    return success({
      vehicles: vehicles.map((v: typeof vehicles[number]) => ({
        id: v.id,
        matricula: v.matricula,
        vin: v.vin,
        marca: v.marca,
        modelo: v.modelo,
        version: v.version,
        combustible: v.combustible,
        potenciaCv: v.potenciaCv,
        color: v.color,
        year: v.fechaMatricula?.getFullYear() ?? null,
        fechaMatricula: v.fechaMatricula?.toISOString() ?? null,
        provinciaActual: v.provinciaActual,
        dgtStatus: v.dgtStatus,
        activeAlerts: v._count.fraudAlerts,
        totalValuations: v._count.valuations,
        totalEvents: v._count.histories,
        createdAt: v.createdAt.toISOString(),
      })),
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
    console.error('Vehicle list error:', err);
    return serverError();
  }
}
