import { Response, Request } from 'express';
import { updateFriendshipService } from '../../../services/friendships';
import { checkValues } from '../../../utils/validator'

interface IBody {
  id: string;
}

export async function updateFriendshipController(req: Request, res: Response) {
  const { id } = req.body as IBody

  checkValues([
   { label: 'Amizade', type: 'string', value: id},
  ]);

  await updateFriendshipService({
    data: {},
    where: { id },
  });

  return res.status(200).json({ message: 'Amizade editado com sucesso.' });
}
