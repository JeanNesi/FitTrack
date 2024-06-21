import { IPrisma, prisma } from '../../../../prisma';

interface IFindManyFrindshipService {
  take: number;
  page: number;
  filter: string;
  pendingFriendships: boolean;
  userId: string;
}

export async function listFrindshipService({
  page,
  take,
  filter,
  pendingFriendships,
  userId,
}: IFindManyFrindshipService) {
  const where: IPrisma.FriendshipWhereInput = {
    user: {
      username: { contains: filter, mode: 'insensitive' },
    },
    friendId: pendingFriendships ? userId : undefined,
    OR: pendingFriendships ? [{ friendId: userId }, { userId }] : undefined,
    isAccepted: !pendingFriendships,
  };

  const [friendships, count] = await prisma.$transaction([
    prisma.friendship.findMany({
      select: {
        id: true,
        isAccepted: true,
        user: {
          select: {
            username: true,
            profilePicture: true,
            level: true,
          },
        },
      },
      take,
      skip: (page - 1) * take,
      orderBy: {
        user: {
          username: 'asc',
        },
      },
      where,
    }),
    prisma.friendship.count({ where }),
  ]);

  return { friendships, count };
}
