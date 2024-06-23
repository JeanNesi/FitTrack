import { Request, Response } from 'express';
import { checkValues } from '../../../utils/validator';
import { collectUserMissionService } from '../../../services/usermissions/collectUserMissionService';

interface IBody {
  userMissionId: string;
}

export async function collectMissionController(req: Request, res: Response) {
  const userId = req.user.id;
  const { userMissionId } = req.body as IBody;

  // #region VALIDATIONS

  checkValues([
    {
      label: 'ID do usuário',
      type: 'string',
      value: userId,
    },
    {
      label: 'ID da missão',
      type: 'string',
      value: userMissionId,
    },
  ]);

  // #endregion

  await collectUserMissionService({
    userId,
    userMissionId,
  });

  return res.status(200).json({
    message: 'Missão coletada com sucesso',
  });
}
