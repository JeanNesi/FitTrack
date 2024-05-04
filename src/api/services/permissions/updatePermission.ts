import { IPrisma, prisma } from '../../../../prisma';

export async function updatePermission(args: IPrisma.PermissionUpdateArgs) {
  return prisma.permission.update(args);
}
