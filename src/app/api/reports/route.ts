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
  type: z.enum(['VEHICLE_HISTORY', 'VALUATION', 'FRAUD_ANALYSIS', 'MARKET_REPORT', 'FLEET_OVERVIEW', 'CUSTOM']).optional(),
  q: z.string().optional(),
});

type ListQuery = z.infer<typeof listSchema>;

/**
 * GET /api/reports?page=1&perPage=20&type=VEHICLE_HISTORY
 *
 * List reports for the authenticated user with stats.
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

    const where: Record<string, unknown> = { userId: user.userId };
    if (query.type) where.type = query.type;
    if (query.q) {
      where.title = { contains: query.q, mode: 'insensitive' };
    }

    const [reports, total, byType] = await Promise.all([
      prisma.report.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      prisma.report.count({ where }),
      prisma.report.groupBy({
        by: ['type'],
        where: { userId: user.userId },
        _count: { type: true },
      }),
    ]);

    const totalReports = byType.reduce((sum: number, g: { _count: { type: number } }) => sum + g._count.type, 0);
    const typeStats: Record<string, number> = {};
    byType.forEach((g: { type: string; _count: { type: number } }) => {
      typeStats[g.type] = g._count.type;
    });

    return success({
      reports: reports.map((r: typeof reports[number]) => ({
        id: r.id,
        type: r.type,
        title: r.title,
        format: r.format,
        fileUrl: r.fileUrl,
        expiresAt: r.expiresAt?.toISOString() ?? null,
        createdAt: r.createdAt.toISOString(),
      })),
      stats: {
        total: totalReports,
        byType: typeStats,
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
    console.error('Reports list error:', err);
    return serverError();
  }
}

const createSchema = z.object({
  type: z.enum(['VEHICLE_HISTORY', 'VALUATION', 'FRAUD_ANALYSIS', 'MARKET_REPORT', 'FLEET_OVERVIEW', 'CUSTOM']),
  title: z.string().min(1).max(200),
  data: z.record(z.unknown()).default({}),
  format: z.enum(['pdf', 'xlsx', 'csv']).default('pdf'),
});

/**
 * POST /api/reports
 *
 * Create a new report. In production this would trigger async generation;
 * for now it creates the record immediately.
 */
export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return unauthorized('Autenticacion requerida');
    }

    const body = await req.json();
    const data = createSchema.parse(body);

    const report = await prisma.report.create({
      data: {
        userId: user.userId,
        type: data.type,
        title: data.title,
        data: data.data,
        format: data.format,
        // In production: fileUrl would be set after async generation
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    });

    return success({
      id: report.id,
      type: report.type,
      title: report.title,
      format: report.format,
      fileUrl: report.fileUrl,
      createdAt: report.createdAt.toISOString(),
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return error('VALIDATION_ERROR', 'Parametros no validos', 400);
    }
    console.error('Report create error:', err);
    return serverError();
  }
}
