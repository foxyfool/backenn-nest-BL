import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createAdminUser() {
  try {
    const adminEmail = '';
    const adminPassword = '';
    const adminName = '';

    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      console.log(`Admin user with email ${adminEmail} already exists.`);
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const newAdmin = await prisma.user.create({
      data: {
        email: adminEmail,
        name: adminName,
        password: hashedPassword,
        role: Role.ADMIN,
      },
    });

    console.log('Admin user created successfully:');
    console.log({
      id: newAdmin.id,
      email: newAdmin.email,
      name: newAdmin.name,
      role: newAdmin.role,
    });
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
