import { prisma } from '../../../../prisma';

interface CreateManyUserMissionOnRegisterServiceProps {
  userId: string;
}

export async function createManyUserMissionOnRegisterService({
  userId,
}: CreateManyUserMissionOnRegisterServiceProps) {
  const missions = await prisma.mission.findMany({
    where: {
      type: { in: ['REPETITION', 'TIME', 'WORKOUT_TYPE'] },
    },
  });

  const data = missions.map((mission) => ({
    userId,
    missionId: mission.id,
  }));

  const existingUserMissions = await prisma.userMission.findMany({
    where: {
      OR: data.map((input) => ({
        userId: input.userId,
        missionId: input.missionId,
      })),
    },
    select: {
      userId: true,
      missionId: true,
    },
  });

  const newData = data.filter(
    (input) =>
      !existingUserMissions.some(
        (um) => um.userId === input.userId && um.missionId === input.missionId,
      ),
  );

  return prisma.$transaction(newData.map((input) => prisma.userMission.create({ data: input })));
}
