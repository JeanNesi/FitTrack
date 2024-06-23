import { Request, Response } from 'express';
import { checkValues } from '../../../utils/validator';
import { userMetricsService } from '../../../services/home';

export async function listUserMetricsController(req: Request, res: Response) {
  const userId = req.user.id;

  // #region VALIDATIONS

  checkValues([
    {
      label: 'ID do usuário',
      type: 'string',
      value: userId,
    },
  ]);

  // #endregion

  const {
    missionsCompleted,
    user,
    workoutsAverageTime,
    workoutsExecuted,
    consecutiveDays,
    hasMissionsToCollect,
  } = await userMetricsService({
    userId,
  });

  return res.status(200).json({
    missionsCompleted,
    userLevel: user?.level,
    workoutsAverageTime: workoutsAverageTime._avg.totalTime,
    workoutsExecuted,
    experiencePoints: user?.experiencePoints,
    experiencePointsToNextLevel: user?.experiencePointsToNextLevel,
    consecutiveDays,
    hasMissionsToCollect,
  });
}
