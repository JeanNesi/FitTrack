import { prisma } from '../../../../prisma';

interface IUserMetricsService {
  userId: string;
}

export async function userMetricsService({ userId }: IUserMetricsService) {
  const [workoutsAverageTime, missionsCompleted, workoutsExecuted, user] =
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
        },
        where: {
          id: userId,
        },
      }),
    ]);

  return { workoutsAverageTime, missionsCompleted, workoutsExecuted, user };
}
