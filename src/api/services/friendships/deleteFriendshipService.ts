import { IPrisma, prisma } from '../../../../prisma';
import { findFriendshipService } from './findFriendshipService';

export async function deleteFriendshipService<T extends IPrisma.FriendshipDeleteArgs>(
  args: IPrisma.SelectSubset<T, IPrisma.FriendshipDeleteArgs>,
) {
  await findFriendshipService({ where: { id: args.where.id || '' } });

  return prisma.friendship.delete(args);
}
