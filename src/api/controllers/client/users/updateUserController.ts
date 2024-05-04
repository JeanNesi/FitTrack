import { Request, Response } from 'express';
import { checkUserEmailAlreadyUsedService, findUser, updateUser } from '../../../services/users';

import { checkNeedExists, checkValues } from '../../../utils/validator';
import { TPermissions } from '../../../../types/permissions';
import { createInitialsAvatar } from '../../../utils/api/createInitialsAvatar';
import { findPermission } from '../../../services/permissions';

interface IBody {
  userId: string;
  username: string;
  profilePicture: string;
  email: string;
  isBlocked: boolean;
  permission: TPermissions;
}

export async function updateUserController(req: Request, res: Response) {
  const { userId, username, profilePicture, email, isBlocked, permission }: IBody = req.body;

  // #region VALIDATIONS
  checkValues([
    {
      label: 'ID do usuário',
      type: 'string',
      value: userId,
    },
    {
      label: 'nome de usuário',
      type: 'string',
      value: username,
    },
    {
      label: 'email',
      type: 'string',
      value: email,
    },
    {
      label: 'Status',
      type: 'boolean',
      value: isBlocked,
    },
    {
      label: 'permission',
      type: 'string',
      value: permission,
    },
    {
      label: 'imagem',
      type: 'string',
      value: profilePicture,
      required: false,
    },
  ]);

  const lowerCaseEmail = email.toLowerCase();
  await checkUserEmailAlreadyUsedService({ email: lowerCaseEmail, idToIgnore: userId });
  await findUser({ id: userId });

  // #endregion

  const isYourself = req.user.id === userId;
  let UserPermission;

  if (!isYourself) {
    const existingPermission = await findPermission({ name: permission });

    checkNeedExists([{ label: 'permissão', value: existingPermission }]);

    UserPermission = {
      deleteMany: {},
      create: {
        permission: { connect: { id: existingPermission!.id } },
      },
    };
  }

  const user = await updateUser({
    data: {
      email: lowerCaseEmail,
      username,
      isBlocked: isYourself ? false : isBlocked,
      profilePicture: profilePicture || createInitialsAvatar(username),
      UserPermission,
    },
    where: { id: userId },
  });

  return res.status(201).json({
    user,
    message: 'Usuário atualizado com sucesso!',
  });
}
