import { prisma } from '../../../../prisma';
import { calculateConsecutiveDaysService } from '../workouts';

interface IUserMetricsService {
  userId: string;
}

export async function userMetricsService({ userId }: IUserMetricsService) {
  const [workoutsAverageTime, missionsCompleted, workoutsExecuted, user, userMissions] =
    await prisma.$transaction([
      prisma.workout.aggregate({
        _avg: {
          totalTime: true,
        },
        where: {
          userId,
        },
      }),
      prisma.userMission.count({
        where: {
          isCompleted: true,
          userId,
        },
      }),
      prisma.workout.count({
        where: {
          userId,
        },
      }),
      prisma.user.findFirst({
        select: {
          level: true,
          experiencePoints: true,
          experiencePointsToNextLevel: true,
        },
        where: {
          id: userId,
        },
      }),
      prisma.userMission.findMany({
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
      }),
    ]);

  const consecutiveDays = await calculateConsecutiveDaysService({ userId });
  const hasMissionsToCollect = userMissions.some((userMission) => {
    const isCollectible =
      userMission.mission.goal <= userMission.progress && !userMission.isCompleted;
    return isCollectible;
  });

  return {
    workoutsAverageTime,
    missionsCompleted,
    workoutsExecuted,
    user,
    consecutiveDays,
    hasMissionsToCollect,
  };
}
