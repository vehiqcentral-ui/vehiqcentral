import { prisma } from '@/lib/prisma';
import type { ValuationRequest, ValuationResponse, ValuationFactor } from '@/types/api';
import { getVehicleSummary } from './vehicle.service';

// =============================================================================
// Valuation Service — AI-powered vehicle valuations
// =============================================================================

const MODEL_VERSION = 'vehiq-val-v1.0';

/**
 * Generate an AI-powered valuation for a vehicle.
 *
 * In production this calls the ML microservice. For now it uses a rule-based
 * estimation based on market data, depreciation curves, and vehicle attributes.
 */
export async function createValuation(
  vehicleId: string,
  input: ValuationRequest,
  userId?: string
): Promise<ValuationResponse | null> {
  const summary = await getVehicleSummary(vehicleId);
  if (!summary) return null;

  // Get comparable market listings
  const comparables = await prisma.marketListing.findMany({
    where: {
      marca: summary.marca,
      modelo: summary.modelo,
      active: true,
      mileage: {
        gte: input.mileage - 30000,
        lte: input.mileage + 30000,
      },
      ...(summary.year && {
        year: {
          gte: summary.year - 1,
          lte: summary.year + 1,
        },
      }),
    },
    orderBy: { scrapedAt: 'desc' },
    take: 50,
  });

  // Calculate base valuation from comparables or depreciation model
  const { low, mid, high, confidence, factors } = calculateValuation(
    summary,
    input,
    comparables
  );

  // Determine market trend
  const trend = await getMarketTrend(summary.marca, summary.modelo);
  const avgListingPrice =
    comparables.length > 0
      ? Math.round(comparables.reduce((s: number, c: { price: number }) => s + c.price, 0) / comparables.length)
      : mid;

  // Persist the valuation
  const valuation = await prisma.valuation.create({
    data: {
      vehicleId,
      userId,
      mileage: input.mileage,
      condition: input.condition,
      province: input.province,
      extras: input.extras ?? [],
      valuationLow: low,
      valuationMid: mid,
      valuationHigh: high,
      confidence,
      modelVersion: MODEL_VERSION,
      factors,
      marketTrend: trend,
      daysToSell: estimateDaysToSell(comparables.length),
      similarListings: comparables.length,
      avgListingPrice,
    },
  });

  return {
    vehicle: summary,
    valuation: {
      low: valuation.valuationLow,
      mid: valuation.valuationMid,
      high: valuation.valuationHigh,
      confidence: valuation.confidence,
      modelVersion: valuation.modelVersion,
    },
    market: {
      trend: trend ?? 'ESTABLE',
      daysToSell: valuation.daysToSell ?? 45,
      similarListings: comparables.length,
      avgListingPrice,
    },
    factors: (factors as ValuationFactor[]) ?? [],
  };
}

// --- Internal helpers (simplified rule-based model) ---

function calculateValuation(
  vehicle: { marca: string; modelo: string; year: number | null },
  input: ValuationRequest,
  comparables: { price: number }[]
) {
  let basePrice: number;
  let confidence: number;

  if (comparables.length >= 5) {
    const prices = comparables.map((c) => c.price).sort((a, b) => a - b);
    basePrice = prices[Math.floor(prices.length / 2)]; // Median
    confidence = Math.min(0.95, 0.6 + comparables.length * 0.007);
  } else {
    // Fallback: rough depreciation estimate (placeholder for ML model)
    const age = vehicle.year ? new Date().getFullYear() - vehicle.year : 5;
    basePrice = Math.max(200000, 3000000 - age * 350000 - input.mileage * 3);
    confidence = 0.4;
  }

  const factors: ValuationFactor[] = [];

  // Condition adjustment
  const conditionMultiplier: Record<string, number> = {
    COMO_NUEVO: 1.1,
    MUY_BUENO: 1.05,
    BUENO: 1.0,
    ACEPTABLE: 0.9,
    NECESITA_REPARACION: 0.75,
  };
  const condMult = conditionMultiplier[input.condition] ?? 1.0;
  factors.push({
    name: 'Condicion del vehiculo',
    impact: Math.round((condMult - 1) * 100),
    direction: condMult >= 1 ? 'positive' : 'negative',
    description: `Estado ${input.condition.toLowerCase().replace(/_/g, ' ')}`,
  });

  // Mileage adjustment
  const avgMileagePerYear = vehicle.year
    ? input.mileage / Math.max(1, new Date().getFullYear() - vehicle.year)
    : 15000;
  const mileageFactor = avgMileagePerYear > 20000 ? -0.05 : avgMileagePerYear < 10000 ? 0.05 : 0;
  factors.push({
    name: 'Kilometraje',
    impact: Math.round(mileageFactor * 100),
    direction: mileageFactor >= 0 ? 'positive' : 'negative',
    description: `${input.mileage.toLocaleString('es-ES')} km — ${Math.round(avgMileagePerYear).toLocaleString('es-ES')} km/ano`,
  });

  const adjustedPrice = Math.round(basePrice * condMult * (1 + mileageFactor));
  const spread = Math.round(adjustedPrice * (1 - confidence) * 0.3);

  return {
    low: adjustedPrice - spread,
    mid: adjustedPrice,
    high: adjustedPrice + spread,
    confidence,
    factors,
  };
}

async function getMarketTrend(
  marca: string,
  modelo: string
): Promise<'SUBIENDO' | 'ESTABLE' | 'BAJANDO' | null> {
  // Simplified: compare avg price last 30 days vs previous 30 days
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 86400000);
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 86400000);

  const [recent, previous] = await Promise.all([
    prisma.marketListing.aggregate({
      where: { marca, modelo, scrapedAt: { gte: thirtyDaysAgo } },
      _avg: { price: true },
    }),
    prisma.marketListing.aggregate({
      where: { marca, modelo, scrapedAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo } },
      _avg: { price: true },
    }),
  ]);

  if (!recent._avg.price || !previous._avg.price) return null;

  const change = (recent._avg.price - previous._avg.price) / previous._avg.price;
  if (change > 0.03) return 'SUBIENDO';
  if (change < -0.03) return 'BAJANDO';
  return 'ESTABLE';
}

function estimateDaysToSell(comparableCount: number): number {
  // Higher supply = faster sales (more active market)
  if (comparableCount > 30) return 25;
  if (comparableCount > 15) return 35;
  if (comparableCount > 5) return 50;
  return 70;
}
