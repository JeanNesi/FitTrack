import { Response, Request } from 'express';
import { findFriendshipService } from '../../../services/friendships';
import { checkValues } from '../../../utils/validator';

export async function findFriendshipController(req: Request, res: Response) {
  const { friendshipId } = req.params as any as { friendshipId: string };

  checkValues([{ label: 'Amizade', type: 'string', value: friendshipId }]);

  const friendship = await findFriendshipService({ where: { id: friendshipId } });

  return res.status(200).json({ friendship });
}
