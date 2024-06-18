import { prisma, IPrisma } from '../../../../prisma';

export function findUser(args: IPrisma.UserFindFirstArgs) {
  return prisma.user.findFirst(args);
}
