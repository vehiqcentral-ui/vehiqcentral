// Auto-seeds admin user during build — safe to run repeatedly (idempotent)
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findUnique({
    where: { email: 'admin@vehiqcentral.es' },
  });

  if (existing) {
    console.log('✓ Admin user already exists — skipping seed');
    return;
  }

  const passwordHash = await bcrypt.hash('Vehiq2024!', 12);

  await prisma.user.create({
    data: {
      email: 'admin@vehiqcentral.es',
      passwordHash,
      name: 'Admin Demo',
      role: 'ADMIN',
      plan: 'ENTERPRISE',
      company: 'VehiqCentral',
    },
  });

  console.log('✓ Admin user created: admin@vehiqcentral.es');
}

main()
  .catch((e) => {
    console.error('⚠ Seed error:', e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
