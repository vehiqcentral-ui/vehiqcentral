import { NextRequest } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import {
  success,
  error,
  unauthorized,
  serverError,
} from '@/lib/api-helpers';
import { getSession } from '@/lib/auth-helpers';

/**
 * GET /api/settings
 *
 * Returns the authenticated user's profile and organization data.
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return unauthorized('Autenticacion requerida');
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        locale: true,
        image: true,
        role: true,
        plan: true,
        createdAt: true,
        organization: {
          select: {
            id: true,
            name: true,
            type: true,
            taxId: true,
            address: true,
            city: true,
            province: true,
            postcode: true,
            country: true,
            phone: true,
            website: true,
            logo: true,
            plan: true,
          },
        },
      },
    });

    if (!user) {
      return unauthorized('Usuario no encontrado');
    }

    return success({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        locale: user.locale,
        image: user.image,
        role: user.role,
        plan: user.plan,
        createdAt: user.createdAt.toISOString(),
      },
      organization: user.organization
        ? {
            id: user.organization.id,
            name: user.organization.name,
            type: user.organization.type,
            taxId: user.organization.taxId,
            address: user.organization.address,
            city: user.organization.city,
            province: user.organization.province,
            postcode: user.organization.postcode,
            country: user.organization.country,
            phone: user.organization.phone,
            website: user.organization.website,
            logo: user.organization.logo,
            plan: user.organization.plan,
          }
        : null,
    });
  } catch (err) {
    console.error('Settings GET error:', err);
    return serverError();
  }
}

const updateProfileSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  phone: z.string().max(20).optional().nullable(),
  locale: z.enum(['es', 'en', 'nl']).optional(),
});

const updateOrgSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  type: z
    .enum([
      'DEALERSHIP',
      'INSURANCE_COMPANY',
      'FLEET_OPERATOR',
      'LEASING_COMPANY',
      'FINANCE_COMPANY',
      'INSPECTION_CENTER',
      'GOVERNMENT',
      'OTHER',
    ])
    .optional(),
  taxId: z.string().max(20).optional().nullable(),
  address: z.string().max(300).optional().nullable(),
  city: z.string().max(100).optional().nullable(),
  province: z.string().max(100).optional().nullable(),
  postcode: z.string().max(10).optional().nullable(),
  phone: z.string().max(20).optional().nullable(),
  website: z.string().max(200).optional().nullable(),
});

const updateSchema = z.object({
  profile: updateProfileSchema.optional(),
  organization: updateOrgSchema.optional(),
});

/**
 * PATCH /api/settings
 *
 * Update the authenticated user's profile and/or organization.
 */
export async function PATCH(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return unauthorized('Autenticacion requerida');
    }

    const body = await req.json();
    const data = updateSchema.parse(body);

    // Update profile
    if (data.profile) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: data.profile,
      });
    }

    // Update organization
    if (data.organization) {
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { organizationId: true, role: true },
      });

      if (!user?.organizationId) {
        return error('NO_ORGANIZATION', 'No tienes una organizacion asignada', 400);
      }

      // Only ADMIN / SUPER_ADMIN can edit org
      if (!['ADMIN', 'SUPER_ADMIN'].includes(user.role)) {
        return error('FORBIDDEN', 'No tienes permisos para editar la organizacion', 403);
      }

      await prisma.organization.update({
        where: { id: user.organizationId },
        data: data.organization,
      });
    }

    return success({ updated: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return error('VALIDATION_ERROR', 'Parametros no validos', 400);
    }
    console.error('Settings PATCH error:', err);
    return serverError();
  }
}
