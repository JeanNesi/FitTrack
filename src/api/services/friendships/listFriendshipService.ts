import { IPrisma, prisma } from '../../../../prisma';

interface IFindManyFrindshipService {
  take: number;
  page: number;
  filter: string;
  pendingFriendships: boolean;
}

export async function listFrindshipService({
  page,
  take,
  filter,
  pendingFriendships,
}: IFindManyFrindshipService) {
  const where: IPrisma.FriendshipWhereInput = {
    user: { username: { contains: filter, mode: 'insensitive' } },
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
