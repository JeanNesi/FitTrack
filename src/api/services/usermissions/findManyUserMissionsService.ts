import { IPrisma, prisma } from '../../../../prisma';

interface IFindManyUserMissionsService {
  page: number;
  take: number;
  search?: string;
}

export async function findManyUserMissionsService({
  page,
  take,
  search = '',
}: IFindManyUserMissionsService) {
  const where: IPrisma.UserMissionWhereInput = {
    mission: {
      title: {
        contains: search,
        mode: 'insensitive',
      },
    },
  };

  const [usermissions, usermissionsCount] = await prisma.$transaction([
    prisma.userMission.findMany({
      take,
      skip: (page - 1) * take,

      where,

      orderBy: {
        mission: {
          title: 'asc',
        },
      },
    }),

    prisma.userMission.count({
      where,
    }),
  ]);

  return { usermissions, usermissionsCount };
}
