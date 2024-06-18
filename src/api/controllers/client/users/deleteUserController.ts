import { Response, Request } from 'express';
import { checkNeedExists, checkValues } from '../../../utils/validator';
import { deleteUser, findUser } from '../../../services/users';

export async function deleteUserController(req: Request, res: Response) {
  const userId = req.user.id;

  checkValues([{ label: 'ID do usuário', type: 'string', value: userId }]);

  const user = await findUser({ where: { id: userId } });
  checkNeedExists([{ label: 'Usuário', value: user }]);

  await deleteUser({ id: userId });

  return res.status(200).json({ message: `Usuário deletado com sucesso!` });
}
