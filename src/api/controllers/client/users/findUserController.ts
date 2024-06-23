import { Response, Request } from 'express';
import { checkNeedExists, checkValues } from '../../../utils/validator';
import { findUser } from '../../../services/users';
import { hasUserMissionsToCollectService } from '../../../services/usermissions';

export async function findUserController(req: Request, res: Response) {
  const userId = req.user.id;

  checkValues([{ label: 'Usuário', type: 'string', value: userId }]);

  const user = await findUser({
    select: {
      id: true,
      username: true,
      email: true,
      weight: true,
      height: true,
      level: true,
      experiencePoints: true,
      experiencePointsToNextLevel: true,
      profilePicture: true,
    },
    where: { id: userId },
  });

  checkNeedExists([{ label: 'Usuário', value: user }]);

  const hasMissionsToCollect = await hasUserMissionsToCollectService({ userId });

  return res.status(200).json({ user, hasMissionsToCollect });
}
