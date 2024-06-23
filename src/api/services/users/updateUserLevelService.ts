import { prisma } from '../../../../prisma';
import { checkNeedExists } from '../../utils/validator';

interface UpdateUserLevelServiceProps {
  experiencePoints: number;
  userId: string;
}

export async function updateUserLevelService({
  userId,
  experiencePoints,
}: UpdateUserLevelServiceProps) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  checkNeedExists([{ label: 'Usuário', value: user }]);

  const userLevel = user!.level;
  const totalExperiencePoints = user!.experiencePoints + experiencePoints;

  if (totalExperiencePoints >= user!.experiencePointsToNextLevel) {
    await prisma.user.update({
      data: {
        level: userLevel + 1,
        experiencePoints: totalExperiencePoints,
        experiencePointsToNextLevel: (userLevel + 1) * 1000,
      },
      where: {
        id: userId,
      },
    });
  } else {
    await prisma.user.update({
      data: {
        experiencePoints: totalExperiencePoints,
      },
      where: {
        id: userId,
      },
    });
  }
}
