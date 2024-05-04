import { prisma, IPrisma } from '../../../../prisma';

export function deletePermission(where: IPrisma.PermissionWhereInput) {
  return prisma.permission.deleteMany({ where });
}
