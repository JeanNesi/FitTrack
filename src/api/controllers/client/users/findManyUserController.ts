import { Request, Response } from 'express';
import { checkIfNaN } from '../../../utils/validator';
import { forceAbsoluteNumber } from '../../../utils/dataHandler';
import { listUserService } from '../../../services/users';

interface IQuery {
  filter: string;
  page: string;
  take: string;
}

export async function findManyUserController(req: Request, res: Response) {
  const { filter, page, take } = req.query as any as IQuery;

  // #region VALIDATIONS

  checkIfNaN([
    { label: 'Número de registros', number: take },
    { label: 'Página', number: page },
  ]);

  // #endregion

  const { users, count } = await listUserService({
    page: forceAbsoluteNumber(page || '1'),
    take: forceAbsoluteNumber(take || '20'),
    filter,
    userId: req.user.id,
  });

  return res.status(200).json({ users, count });
}
