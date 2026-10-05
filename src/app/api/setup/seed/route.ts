import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// One-time setup endpoint — creates admin user if none exists
// DELETE this file after first use!
export async function POST(req: Request) {
  const secret = req.headers.get('x-setup-secret');
  if (secret !== process.env.NEXTAUTH_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const existing = await prisma.user.findUnique({
    where: { email: 'admin@vehiqcentral.es' },
  });

  if (existing) {
    return NextResponse.json({ message: 'Admin already exists', email: existing.email });
  }

  const passwordHash = await bcrypt.hash('Vehiq2024!', 12);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@vehiqcentral.es',
      passwordHash,
      name: 'Admin Demo',
      role: 'ADMIN',
      plan: 'ENTERPRISE',
      company: 'VehiqCentral',
    },
  });

  return NextResponse.json({
    message: 'Admin created successfully',
    email: admin.email,
    id: admin.id,
  });
}
