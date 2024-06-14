import { Request, Response } from 'express';

import { findManyFriendships } from '../../../services/friendships';

export async function listFriendRakingController(req: Request, res: Response) {
  const friendships = await findManyFriendships({
    select: {
      friend: {
        select: {
          username: true,
          level: true,
          profilePicture: true,
        },
      },
    },
    where: {
      userId: req.user.id,
      isAccepted: true,
    },
    take: 100,
    orderBy: {
      friend: {
        level: 'desc',
      },
    },
  });

  return res.status(200).json({ friendships });
}
