import { IPrisma, prisma } from '../../../../prisma';

export function createUserLevel(args: IPrisma.UserLevelCreateArgs) {
  return prisma.userLevel.create(args);
}
