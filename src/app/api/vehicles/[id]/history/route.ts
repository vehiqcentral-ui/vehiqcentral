import { NextRequest } from 'next/server';
import { success, notFound, unauthorized, serverError } from '@/lib/api-helpers';
import { getAuthenticatedUser } from '@/lib/auth-helpers';
import { getVehicleHistory, recordLookup } from '@/services/vehicle.service';

/**
 * GET /api/vehicles/:id/history
 *
 * Full vehicle history: ownership transfers, inspections, mileage timeline,
 * insurance claims, fraud alerts.
 * Requires authentication.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return unauthorized('Autenticación requerida');
    }

    const history = await getVehicleHistory(params.id);

    if (!history) {
      return notFound('Vehículo no encontrado');
    }

    // Record the lookup
    await recordLookup(
      params.id,
      user.userId,
      'HISTORY',
      user.source === 'api_key' ? 'api' : 'dashboard'
    );

    return success(history);
  } catch (err) {
    console.error('Vehicle history error:', err);
    return serverError();
  }
}
