import { IPrisma, prisma } from '../../../../prisma';
import { findFriendshipService } from './findFriendshipService';

export async function updateFriendshipService<T extends IPrisma.FriendshipUpdateArgs>(
  args: IPrisma.SelectSubset<T, IPrisma.FriendshipUpdateArgs>,
) {
  await findFriendshipService({ where: { id: args.where.id || '' } });

  return prisma.friendship.update(args);
}
