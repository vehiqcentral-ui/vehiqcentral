import { NextRequest } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { success, error, serverError } from '@/lib/api-helpers';

const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email no válido'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número'),
  company: z.string().optional(),
  phone: z.string().optional(),
});

/**
 * POST /api/auth/register
 *
 * Creates a new user account with hashed password.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = registerSchema.parse(body);

    // Check if email is already taken
    const existing = await prisma.user.findUnique({
      where: { email: data.email.toLowerCase().trim() },
    });

    if (existing) {
      return error('EMAIL_EXISTS', 'Este email ya está registrado', 409);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(data.password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email.toLowerCase().trim(),
        passwordHash,
        name: data.name,
        company: data.company,
        phone: data.phone,
        role: 'USER',
        plan: 'FREE',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        plan: true,
        createdAt: true,
      },
    });

    return success(user, 201);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return error('VALIDATION_ERROR', 'Datos de registro no válidos', 400, {
        fields: err.errors.map((e) => `${e.path.join('.')}: ${e.message}`),
      });
    }
    console.error('Registration error:', err);
    return serverError();
  }
}
