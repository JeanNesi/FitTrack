import { IPrisma, prisma } from '../../../../prisma';

interface IFindManyUserService {
  take: number;
  page: number;
  filter: string;
}

export async function listUserService({ page, take, filter }: IFindManyUserService) {
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
