import { Request, Response } from 'express';
import { checkUserEmailAlreadyUsedService, findUser, updateUser } from '../../../services/users';

import { checkValues } from '../../../utils/validator';
import { createInitialsAvatar } from '../../../utils/api/createInitialsAvatar';
import { ErrorMessage } from '../../../utils/error';

interface IBody {
  username: string;
  email: string;
  weight: number;
  height: number;
}

export async function updateUserController(req: Request, res: Response) {
  const { username, email, weight, height }: IBody = req.body;

  const userId = req.user.id;

  // #region VALIDATIONS
  checkValues([
    { label: 'Email', type: 'string', value: email },
    { label: 'Nome de usuário', type: 'string', value: username },
    { label: 'Altura', type: 'float', value: height, allowZero: true, required: false },
    { label: 'Peso', type: 'float', value: weight, allowZero: true, required: false },
  ]);

  const lowerCaseEmail = email.toLowerCase();
  await checkUserEmailAlreadyUsedService({ email: lowerCaseEmail, idToIgnore: userId });

  const checkUsername = await findUser({
    where: {
      username: { equals: username, mode: 'insensitive' },
      id: { not: userId },
    },
  });

  if (checkUsername) {
    throw new ErrorMessage({
      message: 'Nome de usuário já está sendo utilizado.',
      statusCode: '422 UNPROCESSABLE CONTENT',
    });
  }

  // #endregion

  await updateUser({
    data: {
      email: lowerCaseEmail,
      username,
      profilePicture: createInitialsAvatar(username),
      weight,
      height,
    },
    where: { id: userId },
  });

  return res.status(201).json({
    message: 'Perfil atualizado com sucesso!',
  });
}
