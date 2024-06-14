import { Response, Request } from 'express';
import { deleteFriendshipService, findFriendshipService } from '../../../services/friendships';
import { checkNeedExists, checkValues } from '../../../utils/validator';

export async function deleteFriendshipController(req: Request, res: Response) {
  const { friendshipId } = req.query as any as { friendshipId: string };

  checkValues([{ label: 'Amizade', type: 'string', value: friendshipId }]);

  const friendship = await findFriendshipService({ where: { id: friendshipId } });
  checkNeedExists([{ label: 'Amizade', value: friendship }]);

  await deleteFriendshipService({ where: { id: friendshipId } });

  return res
    .status(200)
    .json({ message: `Amizade ${friendship.isAccepted ? 'desfeita' : 'recusada'} com sucesso.` });
}
