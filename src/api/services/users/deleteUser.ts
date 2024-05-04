import { prisma, IPrisma } from '../../../../prisma';

export function deleteUser(where: IPrisma.UserWhereInput) {
  return prisma.user.deleteMany({ where });
}
