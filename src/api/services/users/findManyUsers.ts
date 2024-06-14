import { Prisma } from '@prisma/client';
import { prisma } from '../../../../prisma';

export function findManyUsers(args: Prisma.UserFindManyArgs) {
  return prisma.user.findMany(args);
}
