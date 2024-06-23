import { Request, Response } from 'express';
import { checkValues } from '../../../utils/validator';
import { createManyUserMissionOnRegisterService } from '../../../services/usermissions';

export async function teste(req: Request, res: Response) {
  const { userId } = req.query;

  // #region VALIDATIONS

  checkValues([
    {
      label: 'ID do usuário',
      type: 'string',
      value: userId,
    },
  ]);

  // #endregion

  await createManyUserMissionOnRegisterService({ userId: userId as string });

  return res.status(200).json({
    message: '200 OK',
  });
}
