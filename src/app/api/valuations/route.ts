import { NextRequest } from 'next/server';
import { z } from 'zod';
import { success, error, notFound, unauthorized, serverError, parseBody } from '@/lib/api-helpers';
import { getAuthenticatedUser } from '@/lib/auth-helpers';
import { findVehicleByMatricula, findVehicleByVin, recordLookup } from '@/services/vehicle.service';
import { createValuation } from '@/services/valuation.service';

const valuationSchema = z.object({
  matricula: z.string().optional(),
  vin: z.string().optional(),
  mileage: z.number().int().min(0).max(2000000),
  condition: z.enum([
    'COMO_NUEVO',
    'MUY_BUENO',
    'BUENO',
    'ACEPTABLE',
    'NECESITA_REPARACION',
  ]),
  province: z.string().optional(),
  extras: z.array(z.string()).optional(),
}).refine((d) => d.matricula || d.vin, {
  message: 'Provide either matricula or vin',
});

/**
 * POST /api/valuations
 *
 * Request an AI-powered vehicle valuation.
 * Requires mileage and condition; returns price range with confidence score.
 * Requires authentication.
 */
export async function POST(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return unauthorized('Autenticación requerida');
    }

    const body = await parseBody(req, valuationSchema);

    const vehicle = body.matricula
      ? await findVehicleByMatricula(body.matricula)
      : await findVehicleByVin(body.vin!);

    if (!vehicle) {
      return notFound('Vehículo no encontrado. Registra el vehículo primero o verifica el identificador.');
    }

    const result = await createValuation(vehicle.id, body, user.userId);

    if (!result) {
      return serverError('No se pudo generar la valoración');
    }

    // Record the lookup
    await recordLookup(
      vehicle.id,
      user.userId,
      'VALUATION',
      user.source === 'api_key' ? 'api' : 'dashboard'
    );

    return success(result, 201);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return error('VALIDATION_ERROR', 'Solicitud de valoración no válida', 400, {
        fields: err.errors.map((e) => `${e.path.join('.')}: ${e.message}`),
      });
    }
    console.error('Valuation error:', err);
    return serverError();
  }
}
