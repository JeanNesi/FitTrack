import { IPrisma, prisma } from '../../../../prisma';

export async function createFriendshipService<T extends IPrisma.FriendshipCreateArgs>(
  args: IPrisma.SelectSubset<T, IPrisma.FriendshipCreateArgs>,
) {
  return prisma.friendship.create(args);
}
