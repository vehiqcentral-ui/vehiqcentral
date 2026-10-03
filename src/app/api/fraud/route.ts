import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { success, error, notFound, unauthorized, serverError, parseQuery } from '@/lib/api-helpers';
import { getAuthenticatedUser } from '@/lib/auth-helpers';
import { findVehicleByMatricula, findVehicleByVin, getVehicleSummary, recordLookup } from '@/services/vehicle.service';
import type { FraudCheckResponse, FraudCheck, FraudAlertSummary } from '@/types/api';

const fraudQuerySchema = z.object({
  matricula: z.string().optional(),
  vin: z.string().optional(),
}).refine((d) => d.matricula || d.vin, {
  message: 'Provide either matricula or vin',
});

/**
 * GET /api/fraud?matricula=1234ABC
 *
 * Run a comprehensive fraud check on a vehicle.
 * Returns risk score, active alerts, and individual check results.
 */
export async function GET(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return unauthorized('Autenticación requerida');
    }

    const query = parseQuery(req, fraudQuerySchema);

    const vehicle = query.matricula
      ? await findVehicleByMatricula(query.matricula)
      : await findVehicleByVin(query.vin!);

    if (!vehicle) {
      return notFound('Vehicle not found');
    }

    const [summary, alerts, mileageRecords, histories] = await Promise.all([
      getVehicleSummary(vehicle.id),
      prisma.fraudAlert.findMany({
        where: { vehicleId: vehicle.id },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.mileageRecord.findMany({
        where: { vehicleId: vehicle.id },
        orderBy: { recordDate: 'asc' },
      }),
      prisma.vehicleHistory.findMany({
        where: { vehicleId: vehicle.id },
        orderBy: { eventDate: 'desc' },
      }),
    ]);

    if (!summary) return notFound('Vehicle not found');

    // Run fraud checks
    const checks: FraudCheck[] = [];

    // 1. Odometer check — look for rollbacks
    const odometerOk = checkOdometer(mileageRecords);
    checks.push(odometerOk);

    // 2. Theft check
    const theftEvents = histories.filter((h: { eventType: string }) => h.eventType === 'ROBO');
    checks.push({
      name: 'Verificacion de robo',
      status: theftEvents.length > 0 ? 'FAIL' : 'PASS',
      detail: theftEvents.length > 0
        ? `${theftEvents.length} reporte(s) de robo encontrado(s)`
        : 'Sin reportes de robo',
    });

    // 3. Lien/embargo check
    const embargoEvents = histories.filter((h: { eventType: string }) => h.eventType === 'EMBARGO');
    checks.push({
      name: 'Verificacion de embargos',
      status: embargoEvents.length > 0 ? 'WARNING' : 'PASS',
      detail: embargoEvents.length > 0
        ? `${embargoEvents.length} embargo(s) registrado(s)`
        : 'Sin embargos',
    });

    // 4. Finance reservation check
    const reservaDominio = histories.filter((h: { eventType: string }) => h.eventType === 'RESERVA_DOMINIO');
    checks.push({
      name: 'Reserva de dominio',
      status: reservaDominio.length > 0 ? 'WARNING' : 'PASS',
      detail: reservaDominio.length > 0
        ? 'Vehiculo con reserva de dominio activa'
        : 'Sin reserva de dominio',
    });

    // 5. Accident history
    const siniestros = histories.filter((h: { eventType: string }) => h.eventType === 'SINIESTRO');
    checks.push({
      name: 'Historial de siniestros',
      status: siniestros.length > 0 ? 'WARNING' : 'PASS',
      detail: siniestros.length > 0
        ? `${siniestros.length} siniestro(s) registrado(s)`
        : 'Sin siniestros registrados',
    });

    // Calculate risk score
    const activeAlerts = alerts.filter((a: { status: string }) => a.status === 'ACTIVE');
    const riskScore = calculateRiskScore(checks, activeAlerts);
    const riskLevel = riskScore >= 80 ? 'CRITICAL' : riskScore >= 60 ? 'HIGH' : riskScore >= 40 ? 'MEDIUM' : riskScore >= 20 ? 'LOW' : 'SAFE';

    const response: FraudCheckResponse = {
      vehicle: summary,
      riskScore,
      riskLevel,
      alerts: activeAlerts.map(
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
      checks,
    };

    // Record the lookup
    await recordLookup(
      vehicle.id,
      user.userId,
      'FRAUD_CHECK',
      user.source === 'api_key' ? 'api' : 'dashboard'
    );

    return success(response);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return error('VALIDATION_ERROR', 'Invalid query', 400);
    }
    console.error('Fraud check error:', err);
    return serverError();
  }
}

// --- Internal helpers ---

function checkOdometer(
  records: { mileage: number; recordDate: Date }[]
): FraudCheck {
  if (records.length < 2) {
    return {
      name: 'Verificacion de odometro',
      status: 'UNAVAILABLE',
      detail: 'Datos insuficientes para verificar el odometro',
    };
  }

  for (let i = 1; i < records.length; i++) {
    if (records[i].mileage < records[i - 1].mileage - 500) {
      return {
        name: 'Verificacion de odometro',
        status: 'FAIL',
        detail: `Posible manipulacion detectada: ${records[i - 1].mileage.toLocaleString('es-ES')} km → ${records[i].mileage.toLocaleString('es-ES')} km`,
      };
    }
  }

  return {
    name: 'Verificacion de odometro',
    status: 'PASS',
    detail: `${records.length} lecturas verificadas — sin anomalias`,
  };
}

function calculateRiskScore(
  checks: FraudCheck[],
  activeAlerts: { severity: string }[]
): number {
  let score = 0;

  for (const check of checks) {
    if (check.status === 'FAIL') score += 25;
    else if (check.status === 'WARNING') score += 10;
  }

  for (const alert of activeAlerts) {
    if (alert.severity === 'CRITICA') score += 30;
    else if (alert.severity === 'ALTA') score += 20;
    else if (alert.severity === 'MEDIA') score += 10;
    else score += 5;
  }

  return Math.min(100, score);
}
