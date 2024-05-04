import { IPrisma, prisma } from '../../../../prisma';

interface IFindManyUserService {
  take: number;
  page: number;
  filter: string;
}

export async function listUserService({ page, take, filter }: IFindManyUserService) {
  const where: IPrisma.UserWhereInput = {
    username: { contains: filter, mode: 'insensitive' },
  };

  const [users, count] = await prisma.$transaction([
    prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        profilePicture: true,
        isBlocked: true,
        userAccessLogs: {
          select: { createdAt: true },
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
        UserPermission: { select: { permission: { select: { name: true, label: true } } } },
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
