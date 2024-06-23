import { IPrisma, prisma } from '../../../../prisma';

interface IFindManyWorkoutService {
  take: number;
  page: number;
  filter: string;
  completedWorkouts: boolean;
}

export async function listWorkoutService({
  page,
  take,
  filter,
  completedWorkouts,
}: IFindManyWorkoutService) {
  const where: IPrisma.WorkoutWhereInput = {
    user: { username: { contains: filter, mode: 'insensitive' } },
    finalDateTime: completedWorkouts ? { not: null } : { equals: null },
    isDeleted: false,
  };

  const [workouts, count] = await prisma.$transaction([
    prisma.workout.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        initialDateTime: true,
        finalDateTime: true,
        createdAt: true,
        workoutType: true,
        totalTime: true,
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
    prisma.workout.count({ where }),
  ]);

  return { workouts, count };
}
