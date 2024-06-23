import { prisma } from '../../../../prisma';
import { ErrorMessage } from '../../utils/error';
import { checkNeedExists } from '../../utils/validator';
import { updateUserLevelService } from '../users/updateUserLevelService';

interface CollectUserMissionServiceProps {
  userMissionId: string;
  userId: string;
}

export async function collectUserMissionService({
  userId,
  userMissionId,
}: CollectUserMissionServiceProps) {
  const mission = await prisma.userMission.findFirst({
    include: {
      mission: true,
    },
    where: {
      userId,
      id: userMissionId,
    },
  });

  checkNeedExists([{ label: 'Missão', value: mission }]);

  if (mission!.isCompleted) {
    throw new ErrorMessage({
      message: 'Missão já coletada',
      statusCode: '400 BAD REQUEST',
    });
  }

  const isCollectible = mission!.mission.goal <= mission!.progress;

  if (!isCollectible) {
    throw new ErrorMessage({
      message: 'Missão não concluída',
      statusCode: '400 BAD REQUEST',
    });
  }

  await prisma.userMission.update({
    data: {
      isCompleted: true,
    },
    where: {
      id: userMissionId,
    },
  });

  await updateUserLevelService({
    experiencePoints: mission!.mission.experiencePoints,
    userId,
  });
}
