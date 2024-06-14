import { Prisma } from '@prisma/client';
import { prisma } from '../../../../prisma';

export function findManyFriendships(args: Prisma.FriendshipFindManyArgs) {
  return prisma.friendship.findMany(args);
}
