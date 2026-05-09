import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

const prisma = new PrismaClient({
  // @ts-ignore - for prisma+postgres protocol
  accelerateUrl: process.env.DATABASE_URL,
} as any);

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@lapor.id' },
    update: {},
    create: {
      email: 'admin@lapor.id',
      password: hashedPassword,
      name: 'Admin Utama',
      role: 'ADMIN',
    },
  });

  console.log({ admin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
