import { prisma } from '../../../../prisma';

interface UpdateManyUserMissiosProgressServiceProps {
  userId: string;
  totalTime: number;
}

export async function updateManyUserMissionsProgressService({
  userId,
  totalTime,
}: UpdateManyUserMissiosProgressServiceProps) {
  const userMissons = await prisma.userMission.findMany({
    include: {
      mission: true,
    },
    where: {
      userId,
    },
  });

  const getWorkoutTypesData = await prisma.workout.groupBy({
    by: ['workoutType'],
    orderBy: {
      _count: {
        id: 'desc',
      },
    },
    where: {
      userId,
    },
    _count: {
      _all: true,
    },
  });

  const getTotalMinutes = await prisma.userMission.findFirst({
    select: {
      progress: true,
    },
    where: {
      userId,
      mission: {
        type: 'TIME',
      },
    },
  });

  const mostRepetions = getWorkoutTypesData[0]._count._all ?? 0;
  const totalMinutes = (getTotalMinutes?.progress ?? 0) + totalTime;
  const totalWorkoutTypes = getWorkoutTypesData.length;

  const returnProgressValue = (mission: any) => {
    switch (mission.mission.type) {
      case 'REPETITION':
        return mostRepetions;
      case 'TIME':
        return totalMinutes;
      case 'WORKOUT_TYPE':
        return totalWorkoutTypes;
      default:
        return 0;
    }
  };

  return prisma.$transaction(
    userMissons.map((input) =>
      prisma.userMission.updateMany({
        data: {
          progress: returnProgressValue(input),
        },
        where: { id: input.id },
      }),
    ),
  );
}
