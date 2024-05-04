import { prisma, IPrisma } from '../../../../prisma';

export function findManyUsers(where: IPrisma.UserWhereInput) {
  return prisma.user.findMany({ where });
}
