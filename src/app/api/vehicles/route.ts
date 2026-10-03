import { NextRequest } from 'next/server';
import { z } from 'zod';
import { success, error, notFound, unauthorized, serverError, parseQuery } from '@/lib/api-helpers';
import { getAuthenticatedUser } from '@/lib/auth-helpers';
import { findVehicleByMatricula, findVehicleByVin, getVehicleDetail, recordLookup } from '@/services/vehicle.service';

const lookupSchema = z.object({
  matricula: z.string().optional(),
  vin: z.string().optional(),
}).refine((d) => d.matricula || d.vin, {
  message: 'Provide either matricula or vin',
});

/**
 * GET /api/vehicles?matricula=1234ABC
 * GET /api/vehicles?vin=WVWZZZ3CZWE123456
 *
 * Look up a vehicle by license plate or VIN.
 * Returns full vehicle detail including latest inspection, mileage, and alert counts.
 * Requires authentication (session or API key).
 */
export async function GET(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return unauthorized('Autenticación requerida. Usa tu sesión o API key.');
    }

    const query = parseQuery(req, lookupSchema);

    const vehicle = query.matricula
      ? await findVehicleByMatricula(query.matricula)
      : await findVehicleByVin(query.vin!);

    if (!vehicle) {
      return notFound('Vehículo no encontrado. Verifica la matrícula o VIN.');
    }

    const detail = await getVehicleDetail(vehicle.id);

    // Record the lookup for audit trail
    await recordLookup(
      vehicle.id,
      user.userId,
      'HISTORY',
      user.source === 'api_key' ? 'api' : 'dashboard',
      req.headers.get('x-forwarded-for')?.split(',')[0] ?? undefined
    );

    return success(detail);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return error('VALIDATION_ERROR', 'Parámetros de búsqueda no válidos', 400, {
        fields: err.errors.map((e) => e.message),
      });
    }
    console.error('Vehicle lookup error:', err);
    return serverError();
  }
}
