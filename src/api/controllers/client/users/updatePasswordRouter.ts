import { hashSync, compare } from 'bcrypt';
import { Request, Response } from 'express';
import { findUser, updateUser } from '../../../services/users';
import { ErrorMessage } from '../../../utils/error';
import { checkNeedExists, checkValues } from '../../../utils/validator';

export async function updateUserPasswordController(req: Request, res: Response) {
  const { password, newPassword } = req.body;

  const userId = req.user.id;

  checkValues([
    { label: 'senha', type: 'string', value: password },
    { label: 'nova senha', type: 'string', value: newPassword },
  ]);

  if ((newPassword as string).length < 6) {
    throw new ErrorMessage({
      message: 'A senha nova deve possuir mais do que 6 dígitos',
      statusCode: '422 UNPROCESSABLE CONTENT',
    });
  }

  const existingUser = await findUser({ where: { id: userId } });

  const passwordIsValid = await compare(password, existingUser?.password as string);

  checkNeedExists([{ label: 'usuário', value: existingUser }]);

  if (!passwordIsValid) {
    throw new ErrorMessage({
      message: 'Senha atual incorreta. Por favor, tente novamente.',
      statusCode: '422 UNPROCESSABLE CONTENT',
    });
  }

  await updateUser({ data: { password: hashSync(newPassword, 12) }, where: { id: userId } });

  return res.status(200).json({ message: 'Senha alterada com sucesso' });
}
