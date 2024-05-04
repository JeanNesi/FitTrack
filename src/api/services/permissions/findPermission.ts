import { prisma, IPrisma } from '../../../../prisma';

export function findPermission(where: IPrisma.PermissionWhereInput) {
  return prisma.permission.findFirst({ where });
}
