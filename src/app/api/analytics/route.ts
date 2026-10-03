import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { success, error, unauthorized, serverError, parseQuery } from '@/lib/api-helpers';
import { getAuthenticatedUser } from '@/lib/auth-helpers';
import type { MarketAnalytics, PriceTrendPoint } from '@/types/api';

const analyticsSchema = z.object({
  marca: z.string(),
  modelo: z.string(),
  province: z.string().optional(),
  yearFrom: z.coerce.number().int().optional(),
  yearTo: z.coerce.number().int().optional(),
});

/**
 * GET /api/analytics?marca=Volkswagen&modelo=Golf
 *
 * Market analytics for a specific make/model.
 * Returns price distribution, trends, and regional breakdown.
 */
export async function GET(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return unauthorized('Autenticación requerida');
    }

    const query = parseQuery(req, analyticsSchema);

    const where = {
      marca: { equals: query.marca, mode: 'insensitive' as const },
      modelo: { contains: query.modelo, mode: 'insensitive' as const },
      active: true,
      ...(query.province && { province: query.province }),
      ...(query.yearFrom && { year: { gte: query.yearFrom } }),
      ...(query.yearTo && { year: { lte: query.yearTo } }),
    };

    const [aggregate, listings] = await Promise.all([
      prisma.marketListing.aggregate({
        where,
        _avg: { price: true, mileage: true, year: true },
        _min: { price: true },
        _max: { price: true },
        _count: true,
      }),
      prisma.marketListing.findMany({
        where,
        select: { price: true, province: true, scrapedAt: true },
        orderBy: { scrapedAt: 'desc' },
        take: 500,
      }),
    ]);

    if (aggregate._count === 0) {
      return success({
        marca: query.marca,
        modelo: query.modelo,
        avgPrice: 0,
        medianPrice: 0,
        minPrice: 0,
        maxPrice: 0,
        totalListings: 0,
        avgMileage: 0,
        avgAge: 0,
        priceByProvince: {},
        priceTrend: [],
      } satisfies MarketAnalytics);
    }

    // Price by province
    const priceByProvince: Record<string, number> = {};
    const provinceCounts: Record<string, number> = {};
    for (const l of listings) {
      if (l.province) {
        priceByProvince[l.province] = (priceByProvince[l.province] ?? 0) + l.price;
        provinceCounts[l.province] = (provinceCounts[l.province] ?? 0) + 1;
      }
    }
    for (const prov of Object.keys(priceByProvince)) {
      priceByProvince[prov] = Math.round(priceByProvince[prov] / provinceCounts[prov]);
    }

    // Monthly price trend (last 12 months)
    const trendMap = new Map<string, { total: number; count: number }>();
    for (const l of listings) {
      const month = l.scrapedAt.toISOString().slice(0, 7); // YYYY-MM
      const entry = trendMap.get(month) ?? { total: 0, count: 0 };
      entry.total += l.price;
      entry.count += 1;
      trendMap.set(month, entry);
    }
    const priceTrend: PriceTrendPoint[] = Array.from(trendMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, { total, count }]) => ({
        month,
        avgPrice: Math.round(total / count),
        volume: count,
      }));

    // Median price
    const sortedPrices = listings.map((l: { price: number }) => l.price).sort((a: number, b: number) => a - b);
    const medianPrice = sortedPrices[Math.floor(sortedPrices.length / 2)];

    const currentYear = new Date().getFullYear();

    const analytics: MarketAnalytics = {
      marca: query.marca,
      modelo: query.modelo,
      avgPrice: Math.round(aggregate._avg.price ?? 0),
      medianPrice,
      minPrice: aggregate._min.price ?? 0,
      maxPrice: aggregate._max.price ?? 0,
      totalListings: aggregate._count,
      avgMileage: Math.round(aggregate._avg.mileage ?? 0),
      avgAge: Math.round(currentYear - (aggregate._avg.year ?? currentYear)),
      priceByProvince,
      priceTrend,
    };

    return success(analytics);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return error('VALIDATION_ERROR', 'Invalid query', 400);
    }
    console.error('Analytics error:', err);
    return serverError();
  }
}
