import { Response, Request } from 'express';
import { deleteFriendshipService } from '../../../services/friendships';
import { checkValues } from '../../../utils/validator'

export async function deleteFriendshipController(req: Request, res: Response) {
  const { friendshipId } = req.params as any as { friendshipId: string };

  checkValues([{ label: 'Amizade', type: 'string', value: friendshipId }]);

  await deleteFriendshipService({ where: { id: friendshipId } })

  return res.status(200).json({ message: 'Amizade excluído com sucesso.' });
}
