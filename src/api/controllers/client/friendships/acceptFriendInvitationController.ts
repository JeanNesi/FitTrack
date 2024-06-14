import { Response, Request } from 'express';
import { findFriendshipService, updateFriendshipService } from '../../../services/friendships';
import { checkNeedExists, checkValues } from '../../../utils/validator';

interface IBody {
  friendshipId: string;
}

export async function acceptFriendInvitationController(req: Request, res: Response) {
  const { friendshipId } = req.body as IBody;

  checkValues([{ label: 'ID da solicitação', type: 'string', value: friendshipId }]);

  const checkFriendshipExist = await findFriendshipService({
    where: { id: friendshipId, friendId: req.user.id },
  });

  checkNeedExists([{ label: 'Solicitação de amizade', value: checkFriendshipExist }]);

  await updateFriendshipService({
    data: {
      isAccepted: true,
    },
    where: { id: friendshipId },
  });

  return res.status(200).json({ message: 'Solicitação aceita com sucesso.' });
}
