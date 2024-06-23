import { prisma } from '../../../../prisma';
import { calculateConsecutiveDaysService } from '../workouts';

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
          experiencePoints: true,
          experiencePointsToNextLevel: true,
        },
        where: {
          id: userId,
        },
      }),
    ]);

  const consecutiveDays = await calculateConsecutiveDaysService({ userId });

  return { workoutsAverageTime, missionsCompleted, workoutsExecuted, user, consecutiveDays };
}
