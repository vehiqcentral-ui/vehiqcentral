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
  severity: z.enum(['CRITICA', 'ALTA', 'MEDIA', 'BAJA']).optional(),
  status: z.enum(['ACTIVE', 'INVESTIGATING', 'RESOLVED', 'DISMISSED']).optional(),
  q: z.string().optional(),
});

type ListQuery = z.infer<typeof listSchema>;

/**
 * GET /api/fraud/alerts?page=1&perPage=20&severity=CRITICA
 *
 * List fraud alerts with vehicle data, filterable by severity and status.
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

    const where: Record<string, unknown> = {};
    if (query.severity) where.severity = query.severity;
    if (query.status) where.status = query.status;
    if (query.q) {
      where.vehicle = {
        OR: [
          { matricula: { contains: query.q, mode: 'insensitive' } },
          { marca: { contains: query.q, mode: 'insensitive' } },
          { modelo: { contains: query.q, mode: 'insensitive' } },
        ],
      };
    }

    const [alerts, total, activeCount, investigatingCount, resolvedCount] = await Promise.all([
      prisma.fraudAlert.findMany({
        where,
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
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      prisma.fraudAlert.count({ where }),
      prisma.fraudAlert.count({ where: { status: 'ACTIVE' } }),
      prisma.fraudAlert.count({ where: { status: 'INVESTIGATING' } }),
      prisma.fraudAlert.count({ where: { status: 'RESOLVED' } }),
    ]);

    return success({
      alerts: alerts.map((a: typeof alerts[number]) => ({
        id: a.id,
        alertType: a.alertType,
        severity: a.severity,
        title: a.title,
        description: a.description,
        status: a.status,
        createdAt: a.createdAt.toISOString(),
        vehicle: {
          id: a.vehicle.id,
          matricula: a.vehicle.matricula,
          marca: a.vehicle.marca,
          modelo: a.vehicle.modelo,
          version: a.vehicle.version,
          year: a.vehicle.fechaMatricula?.getFullYear() ?? null,
        },
      })),
      stats: {
        active: activeCount,
        investigating: investigatingCount,
        resolved: resolvedCount,
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
    console.error('Fraud alerts list error:', err);
    return serverError();
  }
}
