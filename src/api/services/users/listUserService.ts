import { IPrisma, prisma } from '../../../../prisma';

interface IFindManyUserService {
  take: number;
  page: number;
  filter: string;
  userId: string;
}

export async function listUserService({ page, take, filter, userId }: IFindManyUserService) {
  const where: IPrisma.UserWhereInput = {
    username: { contains: filter, mode: 'insensitive' },
    isBlocked: false,
  };

  const [users, count] = await prisma.$transaction([
    prisma.user.findMany({
      select: {
        id: true,
        username: true,
        profilePicture: true,
        level: true,
        friends: {
          select: {
            isAccepted: true,
          },
          where: {
            OR: [{ userId }, { friendId: userId }],
          },
        },
      },
      take,
      skip: (page - 1) * take,
      orderBy: { username: 'asc' },
      where,
    }),
    prisma.user.count({ where }),
  ]);

  return { users, count };
}
