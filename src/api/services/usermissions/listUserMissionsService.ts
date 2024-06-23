import { prisma } from '../../../../prisma';

interface IListUserMissionsService {
  userId: string;
}

export async function listUserMissionsService({ userId }: IListUserMissionsService) {
  const userMissions = await prisma.userMission.findMany({
    select: {
      id: true,
      isCompleted: true,
      mission: {
        select: {
          id: true,
          title: true,
          description: true,
          experiencePoints: true,
          goal: true,
        },
      },
      progress: true,
    },
    orderBy: {
      mission: {
        experiencePoints: 'asc',
      },
    },
    where: {
      user: {
        id: userId,
      },
    },
  });

  const userMissionsFormatted = userMissions.map((userMission) => {
    const isCollectible =
      userMission.mission.goal <= userMission.progress && !userMission.isCompleted;
    const newProgress = isCollectible ? userMission.mission.goal : userMission.progress;

    return {
      ...userMission,
      progress: newProgress,
      isCollectible,
    };
  });

  return { userMissions: userMissionsFormatted };
}
