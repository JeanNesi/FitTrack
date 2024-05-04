import { prisma, IPrisma } from '../../../../prisma';

export function findManyPermissions(args: IPrisma.PermissionFindManyArgs) {
  return prisma.permission.findMany(args);
}
