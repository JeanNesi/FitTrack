import { prisma, IPrisma } from '../../../../prisma';

export function findUser(where: IPrisma.UserWhereInput) {
  return prisma.user.findFirst({ where });
}
