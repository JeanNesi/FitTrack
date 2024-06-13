import { prisma, IPrisma } from '../../../../prisma';

export async function findFriendshipService<T extends IPrisma.FriendshipFindFirstArgs>(
  args: IPrisma.SelectSubset<T, IPrisma.FriendshipFindFirstArgs>,
) {
  const friendship = await prisma.friendship.findFirst<T>(args);

  return friendship!;
}
