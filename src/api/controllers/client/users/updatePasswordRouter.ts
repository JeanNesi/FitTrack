import { hashSync } from 'bcrypt';
import { Request, Response } from 'express';
import { findUser, updateUser } from '../../../services/users';
import { ErrorMessage } from '../../../utils/error';
import { checkNeedExists, checkValues } from '../../../utils/validator';

export async function updateUserPasswordController(req: Request, res: Response) {
  const { newPassword, userId } = req.body;

  checkValues([
    { label: 'nova senha', type: 'string', value: newPassword },
    { label: 'id de usuário', type: 'string', value: userId },
  ]);

  if ((newPassword as string).length < 6) {
    throw new ErrorMessage({
      message: 'A senha nova deve possuir mais do que 6 dígitos',
      statusCode: '422 UNPROCESSABLE CONTENT',
    });
  }

  const existingUser = await findUser({ id: userId });

  checkNeedExists([{ label: 'usuário', value: existingUser }]);

  await updateUser({ data: { password: hashSync(newPassword, 12) }, where: { id: userId } });

  return res.status(200).json({ message: 'Senha alterada com sucesso' });
}
