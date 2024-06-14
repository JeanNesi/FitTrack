import { IPrisma, prisma } from '../../../../prisma';

export async function deleteFriendshipService<T extends IPrisma.FriendshipDeleteArgs>(
  args: IPrisma.SelectSubset<T, IPrisma.FriendshipDeleteArgs>,
) {
  return prisma.friendship.delete(args);
}
