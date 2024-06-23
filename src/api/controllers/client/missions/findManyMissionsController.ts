import { Request, Response } from 'express';
import { checkValues } from '../../../utils/validator';
import { listUserMissionsService } from '../../../services/usermissions';

export async function findManyMissionsController(req: Request, res: Response) {
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

  const { userMissions } = await listUserMissionsService({ userId });

  return res.status(200).json({
    userMissions,
  });
}
