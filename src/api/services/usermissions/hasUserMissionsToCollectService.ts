import { prisma } from '../../../../prisma';

interface HasUserMissionsToCollectServiceProps {
  userId: string;
}

export async function hasUserMissionsToCollectService({
  userId,
}: HasUserMissionsToCollectServiceProps) {
  const userMissions = await prisma.userMission.findMany({
    select: {
      progress: true,
      isCompleted: true,
      mission: {
        select: {
          goal: true,
        },
      },
    },
    where: {
      userId,
    },
  });

  const hasMissionsToCollect = userMissions.some((userMission) => {
    const isCollectible =
      userMission.mission.goal <= userMission.progress && !userMission.isCompleted;
    return isCollectible;
  });

  return hasMissionsToCollect;
}
