import { Response, Request } from 'express';
import { createFriendshipService, findFriendshipService } from '../../../services/friendships';
import { checkValues } from '../../../utils/validator';
import { ErrorMessage } from '../../../utils/error';

interface IBody {
  userId: string;
}

export async function sendFriendInvitationController(req: Request, res: Response) {
  const { userId } = req.body as IBody;

  checkValues([{ label: 'id do usuário', type: 'string', value: userId }]);

  if (userId === req.user.id) {
    throw new ErrorMessage({
      message: 'Você não pode adicionar a si mesmo como amigo.',
      statusCode: '400 BAD REQUEST',
    });
  }

  const checkIfExistFriendship = await findFriendshipService({
    where: {
      userId: req.user.id,
      friendId: userId,
    },
  });

  if (checkIfExistFriendship) {
    throw new ErrorMessage({
      message: 'Você já é amigo ou possui um convite pendente de amizade para esse usuário.',
      statusCode: '400 BAD REQUEST',
    });
  }

  await createFriendshipService({
    data: {
      friendId: userId,
      userId: req.user.id,
    },
  });

  return res.status(201).json({ message: 'Convite de amizade enviado com sucesso.' });
}
