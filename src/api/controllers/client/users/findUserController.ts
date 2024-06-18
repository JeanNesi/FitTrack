import { Response, Request } from 'express';
import { checkValues } from '../../../utils/validator';
import { findUser } from '../../../services/users';

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

  return res.status(200).json({ user });
}
