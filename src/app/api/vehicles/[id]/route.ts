import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { success, notFound, unauthorized, serverError } from '@/lib/api-helpers';
import { getAuthenticatedUser } from '@/lib/auth-helpers';
import { getVehicleDetail, getVehicleHistory, recordLookup } from '@/services/vehicle.service';

/**
 * GET /api/vehicles/[id]
 *
 * Get full vehicle detail plus history by internal ID.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthenticatedUser(req);
    if (!user) {
      return unauthorized('Autenticacion requerida');
    }

    const { id } = await params;

    // Check vehicle exists
    const vehicle = await prisma.vehicle.findUnique({ where: { id } });
    if (!vehicle) {
      return notFound('Vehiculo no encontrado');
    }

    // Get detail + history in parallel
    const [detail, history] = await Promise.all([
      getVehicleDetail(id),
      getVehicleHistory(id),
    ]);

    if (!detail) {
      return notFound('Vehiculo no encontrado');
    }

    // Record lookup
    await recordLookup(
      id,
      user.userId,
      'HISTORY',
      user.source === 'api_key' ? 'api' : 'dashboard'
    );

    return success({
      ...detail,
      history: history ? {
        ownerCount: history.ownerCount,
        events: history.events,
        mileageHistory: history.mileageHistory,
        inspections: history.inspections,
        fraudAlerts: history.fraudAlerts,
      } : null,
    });
  } catch (err) {
    console.error('Vehicle detail error:', err);
    return serverError();
  }
}
