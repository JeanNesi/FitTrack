import { Request, Response } from 'express';
import { findManyUsers } from '../../../services/users';

export async function listGeneralRakingController(_: Request, res: Response) {
  const users = await findManyUsers({
    select: {
      username: true,
      level: true,
      profilePicture: true,
    },
    orderBy: {
      level: 'desc',
    },
    take: 100,
  });

  return res.status(200).json({ users });
}
