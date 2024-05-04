import { IPrisma, prisma } from '../../../../prisma';

export function createPermission(args: IPrisma.PermissionCreateArgs) {
  return prisma.permission.create(args);
}
