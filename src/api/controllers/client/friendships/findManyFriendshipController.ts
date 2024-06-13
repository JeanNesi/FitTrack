import { Request, Response } from 'express';
import { checkIfNaN, checkValues } from '../../../utils/validator';
import { forceAbsoluteNumber } from '../../../utils/dataHandler';
import { listFrindshipService } from '../../../services/friendships';

interface IBody {
  filter: string;
  page: string;
  take: string;
  pendingFriendships: boolean;
}

export async function findManyFriendshipController(req: Request, res: Response) {
  const { filter, page, take, pendingFriendships } = req.body as any as IBody;

  // #region VALIDATIONS

  checkValues([
    {
      label: 'Convites pendentes',
      type: 'boolean',
      value: pendingFriendships,
      required: false,
    },
  ]);

  checkIfNaN([
    { label: 'Número de registros', number: take },
    { label: 'Página', number: page },
  ]);

  // #endregion

  const { friendships, count } = await listFrindshipService({
    page: forceAbsoluteNumber(page || '1'),
    take: forceAbsoluteNumber(take || '20'),
    filter,
    pendingFriendships,
  });

  return res.status(200).json({ friendships, count });
}
