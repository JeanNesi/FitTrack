import { IPrisma, prisma } from '../../../../prisma';

export function countUsers(where: IPrisma.UserWhereInput) {
  return prisma.user.count({ where });
}
