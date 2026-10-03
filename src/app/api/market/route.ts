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
  marca: z.string().optional(),
  modelo: z.string().optional(),
  source: z.string().optional(),
  province: z.string().optional(),
  yearMin: z.coerce.number().int().optional(),
  yearMax: z.coerce.number().int().optional(),
  priceMin: z.coerce.number().int().optional(),
  priceMax: z.coerce.number().int().optional(),
  fuelType: z.string().optional(),
  q: z.string().optional(),
});

type ListQuery = z.infer<typeof listSchema>;

/**
 * GET /api/market
 *
 * Market intelligence: scraped listings with filters and aggregate stats.
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
    const where: Record<string, unknown> = { active: true };
    if (query.marca) where.marca = { contains: query.marca, mode: 'insensitive' };
    if (query.modelo) where.modelo = { contains: query.modelo, mode: 'insensitive' };
    if (query.source) where.source = query.source;
    if (query.province) where.province = { contains: query.province, mode: 'insensitive' };
    if (query.fuelType) where.fuelType = query.fuelType;
    if (query.yearMin || query.yearMax) {
      where.year = {
        ...(query.yearMin ? { gte: query.yearMin } : {}),
        ...(query.yearMax ? { lte: query.yearMax } : {}),
      };
    }
    if (query.priceMin || query.priceMax) {
      where.price = {
        ...(query.priceMin ? { gte: query.priceMin * 100 } : {}),
        ...(query.priceMax ? { lte: query.priceMax * 100 } : {}),
      };
    }
    if (query.q) {
      where.OR = [
        { marca: { contains: query.q, mode: 'insensitive' } },
        { modelo: { contains: query.q, mode: 'insensitive' } },
        { version: { contains: query.q, mode: 'insensitive' } },
      ];
    }

    const [listings, total] = await Promise.all([
      prisma.marketListing.findMany({
        where,
        orderBy: { scrapedAt: 'desc' },
        skip,
        take,
      }),
      prisma.marketListing.count({ where }),
    ]);

    // Aggregate stats for active listings
    const [
      totalListings,
      bySource,
      byFuel,
      topBrands,
      avgPrice,
    ] = await Promise.all([
      prisma.marketListing.count({ where: { active: true } }),
      prisma.marketListing.groupBy({
        by: ['source'],
        where: { active: true },
        _count: { source: true },
        orderBy: { _count: { source: 'desc' } },
        take: 10,
      }),
      prisma.marketListing.groupBy({
        by: ['fuelType'],
        where: { active: true },
        _count: { fuelType: true },
        orderBy: { _count: { fuelType: 'desc' } },
      }),
      prisma.marketListing.groupBy({
        by: ['marca'],
        where: { active: true },
        _count: { marca: true },
        _avg: { price: true },
        orderBy: { _count: { marca: 'desc' } },
        take: 10,
      }),
      prisma.marketListing.aggregate({
        where: { active: true },
        _avg: { price: true, mileage: true, year: true },
        _min: { price: true },
        _max: { price: true },
      }),
    ]);

    return success({
      listings: listings.map((l: typeof listings[number]) => ({
        id: l.id,
        source: l.source,
        marca: l.marca,
        modelo: l.modelo,
        version: l.version,
        year: l.year,
        mileage: l.mileage,
        price: l.price,
        fuelType: l.fuelType,
        province: l.province,
        city: l.city,
        dealerName: l.dealerName,
        url: l.url,
        scrapedAt: l.scrapedAt.toISOString(),
      })),
      stats: {
        totalListings,
        avgPrice: Math.round(avgPrice._avg.price ?? 0),
        minPrice: avgPrice._min.price ?? 0,
        maxPrice: avgPrice._max.price ?? 0,
        avgMileage: Math.round(avgPrice._avg.mileage ?? 0),
        avgYear: Math.round(avgPrice._avg.year ?? 0),
        bySource: bySource.map((s: typeof bySource[number]) => ({
          source: s.source,
          count: s._count.source,
        })),
        byFuel: byFuel.map((f: typeof byFuel[number]) => ({
          fuel: f.fuelType,
          count: f._count.fuelType,
        })),
        topBrands: topBrands.map((b: typeof topBrands[number]) => ({
          brand: b.marca,
          count: b._count.marca,
          avgPrice: Math.round(b._avg.price ?? 0),
        })),
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
    console.error('Market list error:', err);
    return serverError();
  }
}
