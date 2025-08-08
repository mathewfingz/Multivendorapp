import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await hash('password123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@griffe.local' },
    update: {},
    create: {
      email: 'admin@griffe.local',
      name: 'Admin',
      passwordHash: password,
      role: 'ADMIN' as Role,
    },
  });

  const storeOwner = await prisma.user.upsert({
    where: { email: 'store@griffe.local' },
    update: {},
    create: {
      email: 'store@griffe.local',
      name: 'Store Owner',
      passwordHash: password,
      role: 'STORE' as Role,
      stores: {
        create: [{ name: 'Demo Store' }],
      },
    },
  });

  console.log({ admin: admin.email, storeOwner: storeOwner.email });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});




