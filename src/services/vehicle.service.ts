import { prisma } from '@/lib/prisma';
import type {
  VehicleSummary,
  VehicleDetail,
  VehicleHistoryResponse,
  HistoryEvent,
  MileagePoint,
  InspectionSummary,
  FraudAlertSummary,
} from '@/types/api';

// =============================================================================
// Vehicle Service — Core domain logic
// =============================================================================

export async function findVehicleByMatricula(matricula: string) {
  return prisma.vehicle.findUnique({
    where: { matricula: matricula.toUpperCase().replace(/\s/g, '') },
  });
}

export async function findVehicleByVin(vin: string) {
  return prisma.vehicle.findUnique({
    where: { vin: vin.toUpperCase() },
  });
}

export async function getVehicleSummary(vehicleId: string): Promise<VehicleSummary | null> {
  const v = await prisma.vehicle.findUnique({ where: { id: vehicleId } });
  if (!v) return null;

  return {
    id: v.id,
    matricula: v.matricula,
    vin: v.vin,
    marca: v.marca,
    modelo: v.modelo,
    version: v.version,
    year: v.fechaMatricula ? v.fechaMatricula.getFullYear() : null,
    combustible: v.combustible,
    potenciaCv: v.potenciaCv,
    color: v.color,
    provinciaActual: v.provinciaActual,
    dgtStatus: v.dgtStatus,
  };
}

export async function getVehicleDetail(vehicleId: string): Promise<VehicleDetail | null> {
  const v = await prisma.vehicle.findUnique({
    where: { id: vehicleId },
    include: {
      _count: {
        select: {
          histories: true,
          inspections: true,
          fraudAlerts: { where: { status: 'ACTIVE' } },
        },
      },
      inspections: {
        orderBy: { inspectionDate: 'desc' },
        take: 1,
      },
      mileageRecords: {
        orderBy: { recordDate: 'desc' },
        take: 1,
      },
    },
  });

  if (!v) return null;

  const lastInspection = v.inspections[0]
    ? {
        id: v.inspections[0].id,
        date: v.inspections[0].inspectionDate.toISOString(),
        result: v.inspections[0].result,
        mileage: v.inspections[0].mileage,
        stationName: v.inspections[0].stationName,
        nextInspection: v.inspections[0].nextInspection?.toISOString() ?? null,
      }
    : null;

  const latestMileage = v.mileageRecords[0]
    ? {
        date: v.mileageRecords[0].recordDate.toISOString(),
        mileage: v.mileageRecords[0].mileage,
        source: v.mileageRecords[0].source,
      }
    : null;

  return {
    id: v.id,
    matricula: v.matricula,
    vin: v.vin,
    marca: v.marca,
    modelo: v.modelo,
    version: v.version,
    year: v.fechaMatricula ? v.fechaMatricula.getFullYear() : null,
    combustible: v.combustible,
    potenciaCv: v.potenciaCv,
    color: v.color,
    provinciaActual: v.provinciaActual,
    dgtStatus: v.dgtStatus,
    carroceria: v.carroceria,
    cilindrada: v.cilindrada,
    potenciaKw: v.potenciaKw,
    co2Emissions: v.co2Emissions,
    euroNorm: v.euroNorm,
    transmision: v.transmision,
    traccion: v.traccion,
    puertas: v.puertas,
    plazas: v.plazas,
    pesoMax: v.pesoMax,
    tara: v.tara,
    uso: v.uso,
    historyCount: v._count.histories,
    inspectionCount: v._count.inspections,
    fraudAlertCount: v._count.fraudAlerts,
    lastInspection: lastInspection as InspectionSummary | null,
    latestMileage: latestMileage as MileagePoint | null,
  };
}

export async function getVehicleHistory(vehicleId: string): Promise<VehicleHistoryResponse | null> {
  const summary = await getVehicleSummary(vehicleId);
  if (!summary) return null;

  const [events, mileageRecords, inspections, fraudAlerts, ownerTransfers] =
    await Promise.all([
      prisma.vehicleHistory.findMany({
        where: { vehicleId },
        orderBy: { eventDate: 'desc' },
      }),
      prisma.mileageRecord.findMany({
        where: { vehicleId },
        orderBy: { recordDate: 'asc' },
      }),
      prisma.inspection.findMany({
        where: { vehicleId },
        orderBy: { inspectionDate: 'desc' },
      }),
      prisma.fraudAlert.findMany({
        where: { vehicleId, status: 'ACTIVE' },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.vehicleHistory.count({
        where: { vehicleId, eventType: 'TRANSFERENCIA' },
      }),
    ]);

  return {
    vehicle: summary,
    ownerCount: ownerTransfers + 1,
    events: events.map(
      (e: { id: string; eventType: string; eventDate: Date; description: string | null; source: string; province: string | null }): HistoryEvent => ({
        id: e.id,
        eventType: e.eventType,
        eventDate: e.eventDate.toISOString(),
        description: e.description,
        source: e.source,
        province: e.province,
      })
    ),
    mileageHistory: mileageRecords.map(
      (m: { recordDate: Date; mileage: number; source: string }): MileagePoint => ({
        date: m.recordDate.toISOString(),
        mileage: m.mileage,
        source: m.source,
      })
    ),
    inspections: inspections.map(
      (i: { id: string; inspectionDate: Date; result: 'FAVORABLE' | 'DESFAVORABLE' | 'NEGATIVA'; mileage: number | null; stationName: string | null; nextInspection: Date | null }): InspectionSummary => ({
        id: i.id,
        date: i.inspectionDate.toISOString(),
        result: i.result,
        mileage: i.mileage,
        stationName: i.stationName,
        nextInspection: i.nextInspection?.toISOString() ?? null,
      })
    ),
    fraudAlerts: fraudAlerts.map(
      (a: { id: string; alertType: string; severity: 'CRITICA' | 'ALTA' | 'MEDIA' | 'BAJA'; title: string; description: string; status: string; createdAt: Date }): FraudAlertSummary => ({
        id: a.id,
        alertType: a.alertType,
        severity: a.severity,
        title: a.title,
        description: a.description,
        status: a.status,
        createdAt: a.createdAt.toISOString(),
      })
    ),
  };
}

export async function recordLookup(
  vehicleId: string,
  userId: string,
  lookupType: 'HISTORY' | 'VALUATION' | 'FRAUD_CHECK' | 'FULL_REPORT',
  source?: string,
  ip?: string
) {
  return prisma.vehicleLookup.create({
    data: { vehicleId, userId, lookupType, source, ip },
  });
}
