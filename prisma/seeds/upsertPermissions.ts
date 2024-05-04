import { prisma } from '../prismaConfig';

export async function upsertPermissions() {
  const permissions = [{ name: 'admin', label: 'Admin' }];

  await prisma.$transaction(
    permissions.map((permission) =>
      prisma.permission.upsert({
        create: permission,
        update: {},
        where: { name: permission.name },
      }),
    ),
  );
}
