import { NextFunction, Request, Response } from 'express';
import { ErrorMessage } from '../error';
import { findUser } from '../../services/users';

export async function adminPermissionMiddleware(req: Request, _res: Response, next: NextFunction) {
  const { user } = req;

  if (!user) {
    throw new ErrorMessage({
      statusCode: '404 NOT FOUND',
      message: 'Usuário não encontrado no req.',
    });
  }

  const userWithPermission = await findUser({
    where: {
      id: user.id,
      UserPermission: { some: { permission: { name: 'admin' } } },
    },
  });

  if (!userWithPermission) {
    throw new ErrorMessage({
      statusCode: '403 FORBIDDEN',
      message: 'Você não tem permissão para executar esta ação.',
    });
  }

  next();
}
